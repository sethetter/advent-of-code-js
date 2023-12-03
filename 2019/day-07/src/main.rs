use std::fs;
use std::cmp::max;
use permutohedron::Heap;

type IntCodes = Vec<isize>;

#[derive(Clone)]
struct IntCodeComp {
    pos: usize,
    codes: IntCodes,
    inputs: Vec<isize>,
    done: bool,
}

impl IntCodeComp {
    fn new(codes: IntCodes, inputs: Vec<isize>) -> IntCodeComp {
        IntCodeComp{
            codes: codes,
            inputs: inputs,
            pos: 0,
            done: false,
        }
    }

    fn input(&mut self, v: Option<isize>) {
        match v {
            None => { self.done = true; },
            Some(x) => { self.inputs.splice(0..0, vec![x].iter().cloned()); },
        }
    }

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

impl Iterator for IntCodeComp {
    type Item = isize;

    fn next(&mut self) -> Option<Self::Item> {
        if self.done { return None; }
        loop {
            if self.pos >= self.codes.len() { return None; }
            if self.codes[self.pos] == 99 { return None; }

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
                    let v = match self.inputs.pop() {
                        Some(i) => i,
                        None => return None,
                    };
                    self.codes[dest] = v;
                    self.pos += 2;
                },
                Some('4') => { // Output
                    let x = *self.n_params(opcode, 1).first().unwrap();
                    self.pos += 2;
                    return Some(x);
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
        }
    }
}

fn main() {
    let raw_contents = fs::read_to_string("input.txt").expect("Error reading the file.");
    let contents = raw_contents.trim(); // get rid of trailing \n

    let intcodes: IntCodes = contents.split(',').map(|x| x.parse().unwrap()).collect();

    let max_out_perm = permutations(vec![5,6,7,8,9]).iter().fold(0, |prev_max, perms| {
        let mut amp1 = IntCodeComp::new(intcodes.clone(), vec![perms[0]]);
        let mut amp2 = IntCodeComp::new(intcodes.clone(), vec![perms[1]]);
        let mut amp3 = IntCodeComp::new(intcodes.clone(), vec![perms[2]]);
        let mut amp4 = IntCodeComp::new(intcodes.clone(), vec![perms[3]]);
        let mut amp5 = IntCodeComp::new(intcodes.clone(), vec![perms[4]]);

        let mut input: Option<isize> = Some(0);

        loop {
            amp1.input(input);
            amp2.input(amp1.next());
            amp3.input(amp2.next());
            amp4.input(amp3.next());
            amp5.input(amp4.next());
            match amp5.next() {
                Some(x) => input = Some(x),
                None => break,
            }
        }

       max(prev_max, input.unwrap())
    });

    println!("Part1 : {}", max_out_perm);
}

fn permutations(mut v: Vec<isize>) -> Vec<Vec<isize>> {
    let heap = Heap::new(&mut v);
    heap.into_iter().collect()
}
