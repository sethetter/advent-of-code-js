use std::fs;
use std::collections::HashSet;
use num_rational::Ratio;

type Coord = (isize, isize);

fn main() {
    let raw_input = fs::read_to_string("input.txt").expect("Failed to read input file.");
    let contents = raw_input.trim(); // drop tailing \n

    let asteroids = find_asteroids(contents);

    let best_asteroid = asteroids.iter().max_by(|a1, a2| {
        let a1_visible = count_visible(*a1.clone(), asteroids.clone());
        let a2_visible = count_visible(*a2.clone(), asteroids.clone());
        a1_visible.cmp(&a2_visible)
    }).unwrap();

    println!("Part 1: {:?}", best_asteroid);
    println!("Part 1 Count: {}", count_visible(best_asteroid.clone(), asteroids.clone()));
}

fn find_asteroids(contents: &str) -> HashSet<Coord> {
    contents.lines().enumerate().fold(HashSet::new(), |a, (x, l)| {
        l.chars().enumerate().fold(a, |mut aa, (y, c)| match c {
            '.' => aa,
            '#' => { aa.insert((x as isize, y as isize)); aa },
            _ => unreachable!(),
        })
    })
}

fn count_visible(base: Coord, asteroids: HashSet<Coord>) -> usize {
    asteroids.iter().fold(HashSet::new(), |mut set, target| {
        set.insert(slope(base, target.clone()));
        set.clone()
    }).len() - 1 // Subtract 1 for self
}

fn slope((x1, y1): Coord, (x2, y2): Coord) -> (isize, isize) {
    let y_diff = y2 - y1;
    let x_diff = x2 - x1;

    if x_diff == 0 && y_diff == 0 { return (0, 0); }
    if x_diff == 0 && y_diff < 0 { return (-1, 0); }
    if x_diff == 0 && y_diff > 0 { return (1, 0); }
    if y_diff == 0 && x_diff < 0 { return (0, -1); }
    if y_diff == 0 && x_diff > 0 { return (0, 1); }

    let ratio = Ratio::new(y_diff, x_diff);
    if x_diff > 0 {
        return (*ratio.numer(), *ratio.denom());
    } else {
        return (*ratio.numer(), -*ratio.denom());
    }
}

#[test]
fn test_slope() {
    assert_eq!(slope((0, 0), (41, 1)), (1, 41));
}
