use itertools::Itertools;

type Board = Vec<Vec<(String, bool)>>;

fn main() {
    let input = std::fs::read_to_string("input.txt").unwrap();
    let mut all_lines = input.lines().filter(|l| l != &"");

    let moves = all_lines.next().unwrap().split(",");

    let mut boards: Vec<Board> = vec![];
    for lines in all_lines.filter(|l| l != &"").chunks(5).into_iter() {
        let mut board = vec![];
        for line in lines {
            let row: Vec<(String, bool)> = line
                .split(' ')
                .filter(|p| p != &"")
                .map(|s| (s.to_owned(), false))
                .collect();
            board.push(row);
        }
        boards.push(board);
    }

    let mut winning_boards: Vec<(Board, u32)> = vec![];
    for m in moves {
        for b in 0..boards.len() {
            for x in 0..boards[b].len() {
                for y in 0..boards[b][x].len() {
                    if m == boards[b][x][y].0 {
                        boards[b][x][y].1 = true;
                    }
                }
            }
            if board_wins(&boards[b].clone()) && board_not_in_collection(winning_boards.clone().into_iter().map(|(b, _)| b).collect(), boards[b].clone()){
                winning_boards.push((boards[b].clone(), m.parse().unwrap()));
            }
        }
    }

    println!("Part 1: {}", final_score(winning_boards.first().unwrap().clone()));
    println!("Part 2: {}", final_score(winning_boards.last().unwrap().clone()));
}

fn board_not_in_collection(boards: Vec<Board>, board: Board) -> bool {
    let board_str = board_to_string(board);
    boards.into_iter().find(|b| board_to_string(b.clone()) == board_str) == None
}

fn board_to_string(board: Board) -> String {
    board.into_iter().flatten().map(|(x, _)| x).join(",")
}

fn final_score((board, winning_number): (Board, u32)) -> u32 {
    println!("Board nums {}", board.clone().into_iter().flatten().filter_map(|(x, marked)| if !marked { Some(x) } else { None }).join(","));
    let sum_of_unmarked_numbers: u32 = board.clone()
        .into_iter()
        .flatten()
        .filter(|(_, marked)| !*marked)
        .map(|(x, _)| x.parse::<u32>().unwrap())
        .sum();

    println!("Sum {}", sum_of_unmarked_numbers);
    println!("Num {}", winning_number);
    return sum_of_unmarked_numbers * winning_number;
}

fn board_wins(board: &Board) -> bool {
    for i in 0..5 {
        let row_match = board
            .clone()
            .into_iter()
            .nth(i)
            .unwrap()
            .into_iter()
            .all(|(_, marked)| marked);
        let col_match = board
            .clone()
            .into_iter()
            .map(|r| r[i].clone())
            .all(|(_, marked)| marked);
        if row_match || col_match {
            return true;
        }
    }
    false
}
