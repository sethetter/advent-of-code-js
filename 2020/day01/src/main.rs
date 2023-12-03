fn main() {
    let input = std::fs::read_to_string("input.txt").unwrap();
    let nums: Vec<u32> = input.split("\n").map(|l| l.parse().unwrap()).collect();
    let (x, y) = find_2020_pair(nums.clone()).unwrap();
    println!("Part 1: {}", x*y);
    let (x, y, z) = find_2020_pair2(nums).clone().unwrap();
    println!("Part 2: {}", x*y*z);
}

fn find_2020_pair(nums: Vec<u32>) -> Option<(u32, u32)> {
    for x in nums.clone() {
        for y in nums.clone() {
            if x + y == 2020 { return Some((x, y)); }
        }
    }
    None
}

fn find_2020_pair2(nums: Vec<u32>) -> Option<(u32, u32, u32)> {
    for x in nums.clone() {
        for y in nums.clone() {
            for z in nums.clone() {
                if x + y + z == 2020 { return Some((x, y, z)); }
            }
        }
    }
    None
}