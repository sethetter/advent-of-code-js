use std::fs;

type IntCodes = Vec<isize>;

struct State {
    pos: usize,
    codes: IntCodes,
    input: isize,
    output: Vec<isize>,
}

impl State {
    fn param(&self, t: char, v: isize) -> isize {
        match t {
            '0' => self.codes[v as usize],
            '1' => v,
            _ => unreachable!(),
        }
    }

    fn n_params(&self, opcode: String, num: usize) -> Vec<isize> {
        (1..=num).fold(vec![], |mut out, i| {
            let param_type = opcode.chars().nth(4-i).unwrap();
            out.push(self.param(param_type, self.codes[self.pos+i]));
            out.clone()
        })
    }
}

impl Iterator for State {
    type Item = Vec<isize>;

    fn next(&mut self) -> Option<Self::Item> {
        if self.codes[self.pos] == 99 { return None }

        let opcode = format!("{:0>6}", self.codes[self.pos]);
        match opcode.chars().nth(5) {
            Some('1') => { // Add
                let params = self.n_params(opcode, 2);
                let dest = self.codes[self.pos+3] as usize;
                self.codes[dest] = params[0] + params[1];
                self.pos += 4;
            },
            Some('2') => { // Mult
                let params = self.n_params(opcode, 2);
                let dest = self.codes[self.pos+3] as usize;
                self.codes[dest] = params[0] * params[1];
                self.pos += 4;
            },
            Some('3') => { // Input
                let dest = self.codes[self.pos+1] as usize;
                self.codes[dest] = self.input;
                self.pos += 2;
            },
            Some('4') => { // Output
                self.output.push(*self.n_params(opcode, 1).first().unwrap());
                self.pos += 2;
            },
            Some('5') => { // Jump If True
                let params = self.n_params(opcode, 2);
                if params[0] > 0 {
                    self.pos = params[1] as usize;
                } else {
                    self.pos += 3;
                }
            },
            Some('6') => { // Jump If False
                let params = self.n_params(opcode, 2);
                if params[0] == 0 {
                    self.pos = params[1] as usize;
                } else {
                    self.pos += 3;
                }
            },
            Some('7') => { // Less Than
                let params = self.n_params(opcode, 2);
                let dest = self.codes[self.pos+3] as usize;
                if params[0] < params[1] {
                    self.codes[dest] = 1;
                } else {
                    self.codes[dest] = 0;
                }
                self.pos += 4;
            },
            Some('8') => { // Equals
                let params = self.n_params(opcode, 2);
                let dest = self.codes[self.pos+3] as usize;
                if params[0] == params[1] {
                    self.codes[dest] = 1;
                } else {
                    self.codes[dest] = 0;
                }
                self.pos += 4;
            },
            Some(_) => return None,
            None => return None,
        }
        Some(self.output.clone())
    }
}

fn main() {
    let raw_contents = fs::read_to_string("input.txt").expect("Error reading the file.");
    let contents = raw_contents.trim(); // get rid of trailing \n

    let intcodes: IntCodes = contents.split(',').map(|x| x.parse().unwrap()).collect();

    let state = State{
        codes: intcodes,
        pos: 0,
        // input: 1, // Part 1
        input: 5, // Part 2
        output: vec![],
    };

    let out = state.last().unwrap();

    println!("{}", out.last().unwrap());
}
