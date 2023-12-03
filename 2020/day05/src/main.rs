use std::{cmp, fs};

fn main() {
    let lines = fs::read_to_string("input.txt").unwrap();

    let seats = lines.trim().split("\n").map(seat_from_line);
    let taken_seats: Vec<usize> = seats.clone().map(seat_id).collect();

    println!("Part 1: {}", taken_seats.clone().into_iter().fold(0, |max, id| cmp::max(max, id)));
    println!("Part 2: {}", find_my_seat(taken_seats.clone()));
}

fn find_my_seat(taken_ids: Vec<usize>) -> usize {
    all_seat_ids().into_iter()
        .skip_while(|id| !seat_taken(&taken_ids, &id))
        .skip_while(|id| seat_taken(&taken_ids, &id))
        .nth(0).unwrap()
}

fn seat_taken(taken_ids: &Vec<usize>, id: &usize) -> bool {
    taken_ids.into_iter().any(|tid| tid == id)
}

fn seat_id((x, y): (usize, usize)) -> usize { (x * 8) + y }

fn all_seat_ids() -> Vec<usize> {
    (0..128).flat_map(
        |r| (0..8).map(move |c| seat_id((r, c)))
    ).collect()
}

fn seat_from_line(line: &str) -> (usize, usize) {
    let row_dirs: Vec<char> = line.chars().take(7).collect();
    let col_dirs: Vec<char> = line.chars().skip(7).collect();
    (locate(row_dirs, (0..128).collect()), locate(col_dirs, (0..8).collect()))
}

fn locate(dirs: Vec<char>, seats: Vec<usize>) -> usize {
    let result = dirs.iter().fold(seats, |s, c| {
        let half  = s.clone().into_iter().count() / 2;
        match c {
            'F' | 'L' => s.clone().into_iter().take(half).collect(),
            'B' | 'R' => s.clone().into_iter().skip(half).collect(),
            _ => panic!("Invalid character encountered"),
        }
    });
    result[0]
}

#[test]
fn test_seat_from_line() {
    assert_eq!(seat_from_line("BFFFBBFRRR"), (70, 7));
    assert_eq!(seat_from_line("FFFBBBFRRR"), (14, 7));
    assert_eq!(seat_from_line("BBFFBBFRLL"), (102, 4));
}