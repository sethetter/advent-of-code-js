struct Rules<'a> {
    letter: &'a str,
    x: usize,
    y: usize,
}

fn main() {
    let input = std::fs::read_to_string("input.txt").expect("Couldn't read file");
    let num_valid = input
        .split("\n")
        .filter(|line| {
            let parts: Vec<&str> = line.splitn(2, ":").collect();
            let (rules_str, pass) = (parts[0], parts[1]);
            let rules = parse_rules(rules_str);

            // Part 1
            // check_pass_1(rules, pass)

            // Part 2
            check_pass_2(rules, pass.trim())
        })
        .count();

    println!("Part 1: {}", num_valid);
}

fn parse_rules(input: &str) -> Rules {
    let parts: Vec<&str> = input.splitn(2, " ").collect();
    let (range, letter) = (parts[0], parts[1]);

    let range_parts: Vec<usize> = range.split("-").map(|p| p.parse().unwrap()).collect();
    let (x, y) = (range_parts[0], range_parts[1]);

    Rules { letter, x, y }
}

fn check_pass_1(rules: Rules, input: &str) -> bool {
    let c = input.to_owned().matches(rules.letter).count();
    c >= rules.x && c <= rules.y
}

fn check_pass_2(rules: Rules, input: &str) -> bool {
    // Get characters at the two indices specified by rules
    let c1_opt = input.to_owned().chars().nth(rules.x - 1);
    let c2_opt = input.to_owned().chars().nth(rules.y - 1);

    // Ensure only 1 is a match
    match (c1_opt, c2_opt) {
        (Some(c1c), Some(c2c)) => {
            let (c1, c2) = (c1c.to_string(), c2c.to_string());
            (c1 == rules.letter && c2 != rules.letter) || (c2 == rules.letter && c1 != rules.letter)
        }
        (Some(c1c), None) => c1c.to_string() == rules.letter,
        (None, Some(c2c)) => c2c.to_string() == rules.letter,
        (None, None) => false,
    }
}
