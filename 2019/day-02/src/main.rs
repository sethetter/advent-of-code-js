use std::fs;
use itertools::iproduct;

struct State {
    pos: usize,
    codes: Vec<usize>,
}

impl Iterator for State {
    type Item = Vec<usize>;

    fn next(&mut self) -> Option<Self::Item> {
        let (x, y) = (self.codes[self.pos+1], self.codes[self.pos+2]);
        let update_at = self.codes[self.pos+3];

        match self.codes[self.pos] {
            99 => return None,
            1 => self.codes[update_at] = self.codes[x] + self.codes[y],
            2 => self.codes[update_at] = self.codes[x] * self.codes[y],
            _ => unreachable!(),
        }

        self.pos += 4;
        Some(self.codes.clone())
    }
}

impl State {
    fn set_init_params(&mut self, x: usize, y: usize) {
        self.codes[1] = x;
        self.codes[2] = y;
    }
}

fn main() {
    let raw_contents = fs::read_to_string("input.txt").expect("Error reading the file.");
    let contents = raw_contents.trim(); // get rid of trailing \n

    let intcodes: Vec<usize> = contents.split(",").map(|x| x.parse().unwrap()).collect();

    // Part 1
    let mut s1: State = State{pos: 0, codes: intcodes.clone()};
    s1.set_init_params(12, 2);

    let final_state: Vec<usize> = s1.last().unwrap();
    println!("Part 1: {}", final_state[0]);

    // Part 2
    let target = 19690720;

    let (x, y) = iproduct!(0..100, 0..100).find(|(x, y)| {
        let mut state: State = State{ pos: 0, codes: intcodes.clone() };

        state.set_init_params(*x, *y);
        let final_state: Vec<usize> = state.last().unwrap();

        final_state[0] == target
    }).unwrap();

    println!("Part 2: {}", (x * 100) + y);
}
