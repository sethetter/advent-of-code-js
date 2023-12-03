fn main() {
    let input = std::fs::read_to_string("input.txt").unwrap();

    let heatmap = build_heatmap(input.clone(), false);
    println!("Part 1: {}", count_dangerous_points(heatmap));

    let heatmap = build_heatmap(input.clone(), true);
    println!("Part 2: {}", count_dangerous_points(heatmap));
}

#[test]
fn test_part_1() {
    let input = std::fs::read_to_string("sample.txt").unwrap();
    assert_eq!(build_heatmap(input, false), vec![
        vec![0,0,0,0,0,0,0,1,0,0],
        vec![0,0,1,0,0,0,0,1,0,0],
        vec![0,0,1,0,0,0,0,1,0,0],
        vec![0,0,0,0,0,0,0,1,0,0],
        vec![0,1,1,2,1,1,1,2,1,1],
        vec![0,0,0,0,0,0,0,0,0,0],
        vec![0,0,0,0,0,0,0,0,0,0],
        vec![0,0,0,0,0,0,0,0,0,0],
        vec![0,0,0,0,0,0,0,0,0,0],
        vec![2,2,2,1,1,1,0,0,0,0],
    ]);
}

#[test]
fn test_part_2() {
    let input = std::fs::read_to_string("sample.txt").unwrap();
    assert_eq!(build_heatmap(input, true), vec![
        vec![1,0,1,0,0,0,0,1,1,0],
        vec![0,1,1,1,0,0,0,2,0,0],
        vec![0,0,2,0,1,0,1,1,1,0],
        vec![0,0,0,1,0,2,0,2,0,0],
        vec![0,1,1,2,3,1,3,2,1,1],
        vec![0,0,0,1,0,2,0,0,0,0],
        vec![0,0,1,0,0,0,1,0,0,0],
        vec![0,1,0,0,0,0,0,1,0,0],
        vec![1,0,0,0,0,0,0,0,1,0],
        vec![2,2,2,1,1,1,0,0,0,0],
    ]);
}

type HeatMap = Vec<Vec<usize>>;
type Point = (usize, usize);
type Line = (Point, Point);

fn build_heatmap(input: String, part_2: bool) -> HeatMap {
    let parsed_coords: Vec<Line> = input.lines().map(|l| parse_line(l)).collect();

    let max_x = parsed_coords.clone().into_iter().flat_map(|((x1, _), (x2, _))| vec![x1, x2]).max().unwrap();
    let max_y = parsed_coords.clone().into_iter().flat_map(|((_, y1), (_, y2))| vec![y1, y2]).max().unwrap();

    let mut heatmap: HeatMap = vec![vec![0; max_x+1]; max_y+1];
    for line in parsed_coords {
        heatmap = add_line_to_heatmap(heatmap, line, part_2);
    }

    heatmap
}

fn parse_line(line: &str) -> ((usize, usize), (usize, usize)) {
    let parts: Vec<&str> = line.split(" -> ").collect();
    if parts.len() != 2 { panic!("Error parsing line"); }

    let first: Vec<usize> = parts[0].split(",").map(|p| p.parse().unwrap()).collect();
    let second: Vec<usize> = parts[1].split(",").map(|p| p.parse().unwrap()).collect();

    ((first[0], first[1]), (second[0], second[1]))
}

#[test]
fn test_parse_line() {
    assert_eq!(parse_line("0,9 -> 5,9"), ((0, 9), (5, 9)));
    assert_eq!(parse_line("5,1 -> 9,8"), ((5, 1), (9, 8)));
}

fn add_line_to_heatmap(mut heatmap: HeatMap, ((x1, y1), (x2, y2)): Line, part_2: bool) -> HeatMap {
    let vertical = x1 == x2;
    let horizontal = y1 == y2;

    if vertical {
        let mut sorted = vec![y1, y2];
        sorted.sort();
        for i in sorted[0]..=sorted[1] {
            heatmap[i][x1] += 1;
        }
    }

    if horizontal {
        let mut sorted = vec![x1, x2];
        sorted.sort();
        for i in sorted[0]..=sorted[1] {
            heatmap[y1][i] += 1;
        }
    }

    if part_2 && !vertical && !horizontal {
        let mut x = x1;
        let mut y = y1;

        loop {
            heatmap[y][x] += 1;

            if x1 < x2 && x >= x2 { break; }
            if y1 < y2 && y >= y2 { break; }
            if x1 > x2 && x <= x2 { break; }
            if y1 > y2 && y <= y2 { break; }

            if x1 < x2 { x += 1 } else { x -= 1};
            if y1 < y2 { y += 1 } else { y -= 1};

        }
    }

    heatmap
}

fn count_dangerous_points(heatmap: HeatMap) -> usize {
    let points: Vec<usize> = heatmap.into_iter().flatten().filter(|x| x > &1).collect();
    points.len()
}