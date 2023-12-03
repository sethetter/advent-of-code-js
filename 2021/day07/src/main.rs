fn main() {
    let input = std::fs::read_to_string("input.txt").unwrap();
    println!("Part 1: {}", best_position(input.as_str(), false).1);
    println!("Part 2: {}", best_position(input.as_str(), true).1);
}

fn best_position(input: &str, part2: bool) -> (u32, u32) {
    let starts: Vec<u32> = input
        .split(",")
        .map(|x| x.parse::<u32>().unwrap())
        .collect();
    let min = starts.clone().into_iter().min().unwrap();
    let max = starts.clone().into_iter().max().unwrap();
    (min..max)
        .into_iter()
        .map(|pos| {
            let fuel = if part2 {
                calculate_fuel2(starts.clone(), pos)
            } else {
                calculate_fuel1(starts.clone(), pos)
            };
            (pos, fuel)
        })
        .min_by(|(_, f1), (_, f2)| f1.cmp(f2))
        .unwrap()
}

fn calculate_fuel1(starts: Vec<u32>, pos: u32) -> u32 {
    starts
        .iter()
        .map(|s| if s > &pos { s - pos } else { pos - s })
        .sum()
}

fn calculate_fuel2(starts: Vec<u32>, pos: u32) -> u32 {
    starts
        .iter()
        .map(|s| {
            let steps = if s > &pos { s - pos } else { pos - s };
            ((f64::from(steps) / 2.0) * f64::from(1 + steps)) as u32
        })
        .sum()
}

#[test]
fn test_part() {
    println!(" 5 / 2 = {}", 5 / 2);
    let input = "16,1,2,0,4,2,7,1,2,14";
    assert_eq!(best_position(input, false), (2, 37));
    assert_eq!(best_position(input, true), (5, 168));
}
