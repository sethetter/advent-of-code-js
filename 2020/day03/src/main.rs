fn main() {
    let input = std::fs::read_to_string("input.txt").unwrap();
    let trees: Vec<Vec<bool>> = input.trim().split("\n").map(line_to_trees).collect();

    println!("Part 1: {}", count_for_slope(trees.clone(), (3, 1)));

    let slopes = vec![(1, 1), (3, 1), (5, 1), (7, 1), (1, 2)];

    let mut total = 1;
    for slope in slopes {
        total *= count_for_slope(trees.clone(), slope);
    }

    println!("Part 2: {}", total);
}

fn line_to_trees(line: &str) -> Vec<bool> {
    line.chars().map(|c| c == '#').collect()
}

fn count_for_slope(trees: Vec<Vec<bool>>, slope: (usize, usize)) -> usize {
    let mut pos = (0, 0);
    let mut count = 0;

    let row_length = trees.clone().first().unwrap().iter().count();
    let row_count = trees.clone().iter().count();

    while pos.1 < row_count {
        let row = trees.iter().clone().nth(pos.1).unwrap();

        let x = pos.0 % row_length;
        match row.iter().nth(x) {
            Some(_) => if row[x] { count += 1; },
            None => panic!("Woops!"),
        }

        pos.0 += slope.0;
        pos.1 += slope.1;
    }

    count
}
