use std::fs;
use std::collections::HashSet;

fn main() {
    let raw_contents = fs::read_to_string("input.txt").expect("Error reading the file.");
    let contents: Vec<&str> = raw_contents.trim().split("\n").collect(); // get rid of trailing \n

    let w1: Path = parse_path(contents[0]);
    let w2: Path = parse_path(contents[1]);
    println!("Paths parsed.");

    let intersections = find_intersections(w1.clone(), w2.clone());
    println!("Found intersections.");

    let (x, y) = closest_intersection(intersections.clone());
    println!("Part 1: ({},{}) {}", x, y, x.abs() + y.abs());

    let cheapest = cheapest_intersection_cost(intersections.clone(), w1.clone(), w2.clone());
    println!("Part 2: {}", cheapest);
}

type Point = (isize, isize);
type Path = Vec<Point>;

fn parse_path(path_str: &str) -> Path {
    path_str.split(",").fold(vec![(0, 0)], add_steps_to_path)
}

#[test]
fn test_parse_path() {
    assert_eq!(
        parse_path("U3,L4,D4"),
        vec![(0, 0), (0, 1), (0, 2), (0, 3), (-1, 3), (-2, 3), (-3, 3), (-4, 3), (-4, 2), (-4, 1), (-4, 0), (-4, -1)]
    )
}

fn add_steps_to_path(path: Path, step: &str) -> Path {
    let (dir, n) = parse_step(step);
    let &(last_x, last_y) = path.last().unwrap();

    // determine if we are going backwards or forwards
    let new_steps: Path = match dir {
        Direction::Up => (last_y + 1..=last_y + n).map(|y| (last_x, y)).collect(),
        Direction::Down => (last_y - n..=last_y - 1).map(|y| (last_x, y)).rev().collect(),
        Direction::Left => (last_x - n..=last_x - 1).map(|x| (x, last_y)).rev().collect(),
        Direction::Right => (last_x + 1..=last_x + n).map(|x| (x, last_y)).collect(),
        Direction::Invalid => vec![],
    };

    let mut new_path = path.clone();
    new_path.append(&mut new_steps.clone());
    new_path
}

#[test]
fn test_add_steps_to_path() {
    assert_eq!(
        add_steps_to_path(vec![(0, 0), (-1, 0)], "U2"),
        vec![(0, 0), (-1, 0), (-1, 1), (-1, 2)]
    )
}

#[derive(Debug, PartialEq)]
enum Direction {
    Up,
    Down,
    Left,
    Right,
    Invalid,
}

fn parse_step(step: &str) -> (Direction, isize) {
    let mut chars = step.chars();

    let dir = chars.next();
    let n = chars.as_str().parse::<isize>();

    match (dir, n) {
        (Some('U'), Ok(x)) => (Direction::Up, x),
        (Some('D'), Ok(x)) => (Direction::Down, x),
        (Some('L'), Ok(x)) => (Direction::Left, x),
        (Some('R'), Ok(x)) => (Direction::Right, x),

        // Error cases
        (Some(_), _) => (Direction::Invalid, 0),
        (_, Err(_)) => (Direction::Invalid, 0),
        (None, _) => (Direction::Invalid, 0),
    }
}

#[test]
fn test_parse_step() {
    assert_eq!(parse_step("U2"), (Direction::Up, 2));
    assert_eq!(parse_step("L3"), (Direction::Left, 3));
    assert_eq!(parse_step("R31"), (Direction::Right, 31));
    assert_eq!(parse_step("D99"), (Direction::Down, 99));
}

fn find_intersections(p1: Path, p2: Path) -> Path {
    let h1: HashSet<Point> = p1.into_iter().collect();
    let h2: HashSet<Point> = p2.into_iter().collect();
    let mut ret: Path = h1.intersection(&h2).into_iter().cloned().collect();
    ret.sort();
    ret
}

#[test]
fn test_find_intersections() {
    let p1 = vec![(0,0), (0,1), (1,1), (1,2)];
    let p2 = vec![(0,0), (1,0), (1,1), (2,1)];
    assert_eq!(find_intersections(p1, p2), vec![(0,0), (1,1)]);
}

fn closest_intersection(ints: Path) -> Point {
    // skip the (0, 0) first intersection
    ints.into_iter().skip(1).fold((0, 0), |(prev_x, prev_y), (x, y)| {
        if prev_x == 0 && prev_y == 0 { return (x, y); }
        let prev_dist = prev_x.abs() + prev_y.abs();
        let dist = x.abs() + y.abs();
        if dist < prev_dist { (x, y) } else { (prev_x, prev_y) }
    })
}

#[test]
fn test_closest_intersection() {
    assert_eq!(closest_intersection(vec![(0,0), (4,5), (3,2), (5,10)]), (3,2));
}

fn cheapest_intersection_cost(intersections: Path, p1: Path, p2: Path) -> usize {
    intersections.into_iter().fold(0, |min, (int_x, int_y)| {
        let steps_p1 = p1.iter().position(|&(x, y)| x == int_x && y == int_y).unwrap();
        let steps_p2 = p2.iter().position(|&(x, y)| x == int_x && y == int_y).unwrap();
        let cost = steps_p1 + steps_p2;
        if cost < min || min == 0 { cost } else { min }
    })
}

#[test]
fn test_cheapest_intersection_cost() {
    let p1 = parse_path("R75,D30,R83,U83,L12,D49,R71,U7,L72");
    let p2 = parse_path("U62,R66,U55,R34,D71,R55,D58,R83");
    let intersections = find_intersections(p1.clone(), p2.clone());
    assert_eq!(cheapest_intersection_cost(intersections, p1, p2), 610)
}
