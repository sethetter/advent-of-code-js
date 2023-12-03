use std::collections::HashMap;
// use itertools::Itertools;
use regex::Regex;

type Rules = HashMap<String, HashMap<String, u32>>;
type Rule = HashMap<String, u32>;

fn main() {
    let input = std::fs::read_to_string("input.txt").unwrap();
    let rules = parse_rules(input);
    println!("Part 1: {}", possible_outer_bag_colors(rules.clone(), "shiny gold".to_owned()).len());
    println!("Part 2: {}", total_required_bags(rules.clone(), "shiny gold".to_owned()));
}

fn parse_rules(input: String) -> Rules {
    let mut rules = HashMap::new();
    input.split("\n").into_iter().for_each(|line| {
        let (key, bag_counts) = parse_rule(line.to_owned());
        rules.insert(key, bag_counts);
    });
    rules
}

fn parse_rule(line: String) -> (String, Rule) {
    let mut parts = line.split(" bags contain ");
    let key = parts.next().unwrap();
    let rest = parts.next().unwrap();

    let mut bag_counts = HashMap::new();

    if rest == "no other bags." {
        return (key.to_owned(), bag_counts);
    }

    let parts_re = Regex::new(r"(\d+) (.+) bags?$").unwrap();
    for part in rest.replace(".", "").split(", ") {
        let captures = parts_re.captures(part).unwrap();

        let num: u32 = captures.get(1).unwrap().as_str().parse().unwrap();
        let color = captures.get(2).unwrap().as_str().to_owned();

        bag_counts.insert(color, num);
    }

    (key.to_owned(), bag_counts)
}

#[test]
fn test_parse_rules() {
    let input = std::fs::read_to_string("sample.txt").unwrap();
    let expected = HashMap::from([
        ("light red".to_owned(), HashMap::from([
            ("bright white".to_owned(), 1),
            ("muted yellow".to_owned(), 2),
        ])),
        ("dark orange".to_owned(), HashMap::from([
            ("bright white".to_owned(), 3),
            ("muted yellow".to_owned(), 4),
        ])),
        ("bright white".to_owned(), HashMap::from([
            ("shiny gold".to_owned(), 1),
        ])),
        ("muted yellow".to_owned(), HashMap::from([
            ("shiny gold".to_owned(), 2),
            ("faded blue".to_owned(), 9),
        ])),
        ("shiny gold".to_owned(), HashMap::from([
            ("dark olive".to_owned(), 1),
            ("vibrant plum".to_owned(), 2)
        ])),
        ("dark olive".to_owned(), HashMap::from([
            ("faded blue".to_owned(), 3),
            ("dotted black".to_owned(), 4),
        ])),
        ("vibrant plum".to_owned(), HashMap::from([
            ("faded blue".to_owned(), 5),
            ("dotted black".to_owned(), 6),
        ])),
        ("faded blue".to_owned(), HashMap::from([])),
        ("dotted black".to_owned(), HashMap::from([])),
    ]);
    assert_eq!(parse_rules(input), expected);
}

fn possible_outer_bag_colors(rules: Rules, search_color: String) -> Vec<String> {
    let mut all_possible_colors: Vec<String> = vec![];
    let mut last_found_colors: Vec<String> = vec![search_color.clone()];

    while last_found_colors.len() > 0 {
        let colors_to_search = last_found_colors.clone();
        last_found_colors = vec![];
        for (c, rule) in rules.clone().into_iter() {
            for color in colors_to_search.clone().into_iter() {
                if rule.contains_key(&(color.clone())) && !all_possible_colors.contains(&c) {
                    all_possible_colors.push(c.clone());
                    last_found_colors.push(c.clone());
                }
            }
        }
    }

    all_possible_colors
}

#[test]
fn test_possible_outer_bag_colors() {
    let input = std::fs::read_to_string("sample.txt").unwrap();
    let rules = parse_rules(input);
    assert_eq!(possible_outer_bag_colors(rules, "shiny gold".to_owned()).len(), 4);
}

fn total_required_bags(rules: Rules, starting_color: String) -> u32 {
    let mut total = 0;
    let mut next_layer = vec![starting_color];
    loop {
        let layer = next_layer.clone();
        next_layer = vec![];

        for color in layer.into_iter() {
            let rule_for_color = rules.get(&color).unwrap();
            for (c, n) in rule_for_color.into_iter() {
                total += n;
                for _ in 0..(n.to_owned()) {
                    next_layer.push(c.to_owned());
                }
            }
        }
        if next_layer.len() == 0 { break; }
    }
    total
}

#[test]
fn test_total_required_bags() {
    let input = std::fs::read_to_string("sample.txt").unwrap();
    let rules = parse_rules(input);
    assert_eq!(total_required_bags(rules, "shiny gold".to_owned()), 32);
}