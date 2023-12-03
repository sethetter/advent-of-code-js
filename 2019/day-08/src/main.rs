use std::fs;

fn main() {
    let raw_input = fs::read_to_string("input.txt").expect("Failed to read input file.");
    let input = raw_input.trim(); // get rid of tailing \n

    const W: usize = 25;
    const H: usize = 6;
    let size = W * H;

    let nums: Vec<u32> = input.chars().map(|c| c.to_digit(10).unwrap()).collect();
    let layers = nums.chunks(size);

    // Part 1

    let layer_w_fewest_zeros = layers.clone().min_by(|f1, f2| {
        let f1_0s = f1.iter().filter(|x| *x == &0).count();
        let f2_0s = f2.iter().filter(|x| *x == &0).count();
        f1_0s.cmp(&f2_0s)
    }).unwrap();

    let count_1s = layer_w_fewest_zeros.iter().filter(|x| *x == &1).count();
    let count_2s = layer_w_fewest_zeros.iter().filter(|x| *x == &2).count();

    println!("Part 1: {}", count_1s * count_2s);

    // Part 2
    let final_img: Vec<u32> = layers.clone().fold(vec![2; size], |img, l| {
        img.iter().zip(l.iter()).map(|(ip, lp)| match ip {
            2 => *lp,
            _ => *ip,
        }).collect()
    });

    show(final_img, W);
}

fn show(img: Vec<u32>, w: usize) {
    img.chunks(w).for_each(|l| {
        let line: String = l.iter().map(|p| match p {
            1 => '#',
            _ => ' ',
        }).collect();
        println!("{}", line);
    })
}
