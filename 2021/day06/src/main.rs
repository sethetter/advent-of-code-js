fn main() {
    let input = std::fs::read_to_string("input.txt").unwrap();
    let start: Vec<usize> = input.split(",").map(|str| str.parse().unwrap()).collect();

    println!("Part 1: {}", iterate_fish(start.clone(), 80));
    println!("Part 2: {}", iterate_fish(start.clone(), 256));
}

#[test]
fn test_part1() {
    let start: Vec<usize> = vec![3,4,3,1,2];
    assert_eq!(iterate_fish(start.clone(), 18), 26);
    assert_eq!(iterate_fish(start.clone(), 80), 5934);
}

fn iterate_fish(fish: Vec<usize>, n: usize) -> u64 {
    let mut counts: Vec<u64> = vec![0; 9];
    for f in fish {
        counts[f] += 1;
    }

    for _ in 0..n {
        let mut new_counts = counts.clone();
        for i in (1..=8).rev() {
            new_counts[i-1] = counts[i];
        }
        new_counts[6] += counts[0];
        new_counts[8] = counts[0];
        counts = new_counts;
    }

    counts.iter().sum()
}