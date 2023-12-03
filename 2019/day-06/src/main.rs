use std::fs;
use std::collections::HashMap;

fn main() {
    let raw_contents = fs::read_to_string("input.txt").expect("File not found");
    let contents = raw_contents.trim(); // remove trailing \n

    let orbits = input_to_orbits(contents);

    // Part 1. Count the distance to COM for each individual planet.
    let num_orbits = orbits.keys().clone().fold(0, |sum, planet| {
        sum + count_to_center(orbits.clone(), *planet, 0)
    });
    println!("Part 1: {}", num_orbits);

    // Part 2. Count distance until common orbital ancestor.
    let dist_from_san = count_to_destination(orbits.clone(), vec!["YOU"], vec!["SAN"]);
    println!("Part 2: {}", dist_from_san);
}

fn input_to_orbits(input: &str) -> HashMap<&str, &str> {
    input.split('\n').fold(HashMap::new(), |mut m, line| {
        let pair = line.split(')').into_iter();
        m.insert(pair.clone().nth(1).unwrap(), pair.clone().nth(0).unwrap()); m
    })
}

fn count_to_center(orbits: HashMap<&str, &str>, planet: &str, sum: usize) -> usize {
    match orbits.get(planet) {
        Some(&"COM") => sum + 1,
        Some(p) => count_to_center(orbits.clone(), p, sum + 1),
        None => unreachable!(),
    }
}

fn count_to_destination(orbits: HashMap<&str, &str>, from: Vec<&str>, to: Vec<&str>) -> usize {
    let f = from.iter().last().unwrap();
    let t = to.iter().last().unwrap();

    let f_next = orbits.get(f).unwrap_or(&f);
    let t_next = orbits.get(t).unwrap_or(&t);

    match (from.iter().position(|x| x == t_next), to.iter().position(|x| x == f_next)) {
        (Some(_), Some(_)) => from.len() + to.len() - 2,
        (Some(i), None) => i + to.len() - 2,
        (None, Some(i)) => from.len() + i - 2,
        (None, None) => count_to_destination(
            orbits.clone(),
            [from.clone(), vec![f_next]].concat(),
            [to.clone(), vec![t_next]].concat()
        ),
    }
}
