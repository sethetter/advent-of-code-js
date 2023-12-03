fn main() {
    let input = std::fs::read_to_string("input.txt").unwrap();
    let lines: Vec<&str> = input.split("\n").into_iter().collect();

    let (num_depth_increases, _) =
        lines
            .clone()
            .into_iter()
            .fold((-1, 0), |(mut sum, prev), d_str| {
                let d = d_str.parse::<i32>().unwrap();
                if d > prev {
                    sum += 1;
                }
                (sum, d)
            });

    println!("Part 1: {}", num_depth_increases);

    let (num_depth_increases, _) =
        lines
            .clone()
            .as_slice()
            .windows(3)
            .fold((-1, 0), |(mut sum, prev), window| {
                let d = window.into_iter().map(|s| s.parse::<i32>().unwrap()).sum();
                if d > prev {
                    sum += 1;
                }
                (sum, d)
            });

    println!("Part 2: {}", num_depth_increases);
}
