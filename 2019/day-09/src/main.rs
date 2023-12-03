use std::fs;

type IntCodes = Vec<isize>;

#[derive(Clone)]
struct IntCodeComp {
    pos: usize,
    rel_base: isize,
    codes: IntCodes,
    inputs: Vec<isize>,
    done: bool,
}

impl IntCodeComp {
    fn new(codes: IntCodes, rel_base: isize, inputs: Vec<isize>) -> IntCodeComp {
        IntCodeComp{ codes, inputs, rel_base, pos: 0, done: false }
    }

    fn val_param(&mut self, t: char, v: isize) -> isize {
        match t {
            '0' => { // Position mode
                self.grow(v as usize);
                return self.codes[v as usize];
            },
            '1' => { // Absolute mode
                return v;
            },
            '2' => { // Relative mode
                let dest = (self.rel_base + v) as usize;
                self.grow(dest);
                return self.codes[dest];
            },
            _ => unreachable!(),
        }
    }

    fn write_param(&self, opcode: String, idx: usize) -> isize {
        let param_type = opcode.chars().nth(4-idx).unwrap();
        let v = self.codes[self.pos+idx];

        match param_type {
            '0' | '1' => v,
            '2' => self.rel_base + v,
            _ => unreachable!(),
        }
    }

    fn n_params(&mut self, opcode: String, num: usize) -> Vec<isize> {
        let out = (1..=num).fold(vec![], |mut out, i| {
            let param_type = opcode.chars().nth(4-i).unwrap();
            let param = self.val_param(param_type, self.codes[self.pos+i]);
            out.push(param);
            out.clone()
        });
        out
    }

    fn grow(&mut self, pos: usize) {
        while self.codes.len() < pos+1 {
            self.codes.push(0);
        }
    }

    fn set_val(&mut self, dest: isize, val: isize) {
        self.grow(dest as usize);
        self.codes[dest as usize] = val;
    }

    fn set_pos(&mut self, dest: isize) {
        self.grow(dest as usize);
        self.pos = dest as usize;
    }

    fn advance_pos(&mut self, offset: usize) {
        let new_pos = self.pos + offset;
        self.grow(new_pos);
        self.pos = new_pos;
    }
}

impl Iterator for IntCodeComp {
    type Item = isize;

    fn next(&mut self) -> Option<Self::Item> {
        if self.done { return None; }
        loop {
            if self.codes[self.pos] == 99 { return None; }

            let opcode = format!("{:0>6}", self.codes[self.pos]);
            match opcode.chars().nth(5) {
                Some('1') => { // Add
                    let params = self.n_params(opcode.clone(), 2);
                    let dest = self.write_param(opcode.clone(), 3);
                    self.set_val(dest, params[0] + params[1]);
                    self.advance_pos(4);
                },
                Some('2') => { // Mult
                    let params = self.n_params(opcode.clone(), 2);
                    let dest = self.write_param(opcode.clone(), 3);
                    self.set_val(dest, params[0] * params[1]);
                    self.advance_pos(4);
                },
                Some('3') => { // Input
                    let dest = self.write_param(opcode.clone(), 3);
                    let v = match self.inputs.pop() {
                        Some(i) => i,
                        None => return None,
                    };
                    self.set_val(dest, v);
                    self.advance_pos(2);
                },
                Some('4') => { // Output
                    let x = *self.n_params(opcode, 1).first().unwrap();
                    self.advance_pos(2);
                    return Some(x);
                },
                Some('5') => { // Jump If True
                    let params = self.n_params(opcode, 2);
                    if params[0] > 0 {
                        self.set_pos(params[1]);
                    } else {
                        self.advance_pos(3);
                    }
                },
                Some('6') => { // Jump If False
                    let params = self.n_params(opcode, 2);
                    if params[0] == 0 {
                        self.set_pos(params[1]);
                    } else {
                        self.advance_pos(3);
                    }
                },
                Some('7') => { // Less Than
                    let params = self.n_params(opcode.clone(), 2);
                    let dest = self.write_param(opcode.clone(), 3);
                    if params[0] < params[1] {
                        self.set_val(dest, 1);
                    } else {
                        self.set_val(dest, 0);
                    }
                    self.advance_pos(4);
                },
                Some('8') => { // Equals
                    let params = self.n_params(opcode.clone(), 2);
                    let dest = self.write_param(opcode.clone(), 3);
                    if params[0] == params[1] {
                        self.set_val(dest, 1);
                    } else {
                        self.set_val(dest, 0);
                    }
                    self.advance_pos(4);
                },
                Some('9') => { // Relative Base Offset
                    let params = self.n_params(opcode, 1);
                    self.rel_base += params[0];
                    self.advance_pos(2);
                },
                Some(_) => return None,
                None => return None,
            }
        }
    }
}

fn main() {
    let raw_contents = fs::read_to_string("input.txt").expect("Error reading the file.");
    let contents = raw_contents.trim(); // get rid of trailing \n

    let intcodes: IntCodes = contents.split(',').map(|x| x.parse().unwrap()).collect();

    // let comp = IntCodeComp::new(intcodes.clone(), 0, vec![2]); // Part 1
    let comp = IntCodeComp::new(intcodes.clone(), 0, vec![2]); // Part 2

    comp.for_each(|out| println!("{}", out));
}
