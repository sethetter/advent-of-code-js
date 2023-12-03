use itertools::Itertools;
use std::collections::HashMap;

fn main() {
    let input = std::fs::read_to_string("input.txt").unwrap();
    println!("Part 1: {}", part1(input));
}

type SegmentMap = HashMap<Vec<char>, u32>;

fn wires_to_segments(entry: &str) -> SegmentMap {
    let patterns = entry.split(" | ").into_iter().nth(0).unwrap().split(" ").map(|p| p.chars().sorted());
    patterns.into_iter().fold(HashMap::new(), |mut segment_map, pattern| {
        match pattern.len() {
            2 => {
                segment_map.insert(pattern.collect(), 1);
                return segment_map;
            },
            4 => {
                segment_map.insert(pattern.collect(), 4);
                return segment_map;
            },
            3 => {
                segment_map.insert(pattern.collect(), 7);
                return segment_map;
            },
            7 => {
                segment_map.insert(pattern.collect(), 8);
                return segment_map;
            },
            _ => { return segment_map; },
        };
    })
}

fn count_digits(input: String) -> HashMap<u32, u32> {
    input.lines().fold(HashMap::new(), |mut count_map, entry| {
        let seg_map = wires_to_segments(entry);
        let connections = entry.split(" | ").into_iter().nth(1).unwrap().split(" ").map(|p| p.chars().sorted());
        for conn in connections {
            if let Some(digit) = seg_map.get::<Vec<char>>(&conn.collect()) {
                let curr = count_map.entry(*digit).or_insert(0);
                *curr += 1;
            }
        }
        count_map
    })
}

fn part1(input: String) -> u32 {
    let counts = count_digits(input);
    vec![1, 4, 7, 8].iter().fold(0, |sum, digit| {
        let digit_count = counts.get(digit).unwrap();
        sum + digit_count
    })
}

#[test]
fn test_part1() {
    let input = std::fs::read_to_string("sample.txt").unwrap();
    assert_eq!(part1(input), 26);
}