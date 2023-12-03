use std::fs;

fn main() {
    let raw_contents = fs::read_to_string("input.txt").expect("Error reading the file.");
    let contents = raw_contents.trim();

    let masses = contents.split("\n").map(|l| l.parse::<i32>().unwrap());

    let mass_to_fuel = |m: i32| -> i32 {
        let x: f64 = (m / 3).into();
        return (x.floor() - 2.0) as i32;
    };

    let total: i32 = masses.clone().map(mass_to_fuel).sum();

    println!("Part 1: {}\n", total);

    let mass_to_fuel_2 = |m: i32| -> i32 {
        let mut xs: Vec<i32> = vec![];
        let mut y: i32 = mass_to_fuel(m);

        while y > 0 {
            xs.push(y);
            y = mass_to_fuel(y);
        }

        xs.iter().sum()
    };

    let total_2: i32 = masses.clone().map(mass_to_fuel_2).sum();

    println!("Part 2: {}\n", total_2);
}
