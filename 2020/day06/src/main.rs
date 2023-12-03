use itertools::Itertools;
use std::fs;

fn main() {
    let input = fs::read_to_string("input.txt").unwrap();

    let groups: Vec<&str> = input.split("\n\n").collect();
    // Part 1
    let group_answers: Vec<String> = groups
        .clone()
        .into_iter()
        .map(unique_answers_from_group)
        .collect();
    let sum_of_unique_counts = group_answers.into_iter().fold(0, |sum, g| sum + g.len());
    println!("Part 1: {}", sum_of_unique_counts);

    // Part 2
    let group_answers: Vec<String> = groups
        .clone()
        .into_iter()
        .map(inclusive_answers_from_group)
        .collect();
    let sum_of_unique_counts = group_answers.into_iter().fold(0, |sum, g| sum + g.len());
    println!("Part 2: {}", sum_of_unique_counts);
}

fn unique_answers_from_group(group_str: &str) -> String {
    let letters: Vec<String> = group_str
        .to_owned()
        .replace("\n", "")
        .split("")
        .map(|s| s.to_owned())
        .collect();
    letters.into_iter().unique().collect()
}

fn inclusive_answers_from_group(group_str: &str) -> String {
    let unique_answers = unique_answers_from_group(group_str);
    unique_answers
        .split("")
        .into_iter()
        .filter(|letter| {
            group_str
                .split("\n")
                .fold(true, |acc, person| acc && person.contains(letter))
        })
        .join("")
}

#[test]
fn test_unique_answers_from_group() {
    let input = vec![
        ("abc", "abc"),
        ("a\nb\nc", "abc"),
        ("ab", "ab"),
        ("ac", "ac"),
        ("a\na\na\na", "a"),
        ("b", "b"),
    ];

    input.into_iter().for_each(|(group_str, expected)| {
        assert_eq!(unique_answers_from_group(group_str), expected);
    });
}
