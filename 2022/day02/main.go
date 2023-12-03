package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"strings"
)

func main() {
	input, err := ioutil.ReadFile("day02/input.txt")
	if err != nil {
		log.Fatal("failed to read input file")
	}

	fmt.Println(calculateScore(string(input)))
	fmt.Println(calculateScore2(string(input)))
}

type play int

const (
	rock play = iota
	paper
	scissors
)

func letterToPlay(l string) play {
	switch strings.ToUpper(strings.TrimSpace(l)) {
	case "A":
		return rock
	case "X":
		return rock
	case "B":
		return paper
	case "Y":
		return paper
	case "C":
		return scissors
	case "Z":
		return scissors
	}
	panic(fmt.Sprintf("unexpected play: %s", l))
}

type result int

const (
	win result = iota
	lose
	draw
)

func whoWon(mine, opponent play) result {
	if mine == opponent {
		return draw
	}

	switch mine {
	case rock:
		switch opponent {
		case paper:
			return lose
		case scissors:
			return win
		}
	case paper:
		switch opponent {
		case rock:
			return win
		case scissors:
			return lose
		}
	case scissors:
		switch opponent {
		case rock:
			return lose
		case paper:
			return win
		}
	}
	panic("unreachable")
}

func scoreForPlay(p play) int {
	switch p {
	case rock:
		return 1
	case paper:
		return 2
	case scissors:
		return 3
	}
	panic("unexpected play")
}

func calculateScore(strategy string) int {
	rounds := strings.Split(strings.TrimSpace(strategy), "\n")

	score := 0
	for _, round := range rounds {
		plays := strings.Split(round, " ")
		opponent, me := letterToPlay(plays[0]), letterToPlay(plays[1])

		score += scoreForPlay(me)

		switch whoWon(me, opponent) {
		case win:
			score += 6
		case draw:
			score += 3
		}
	}

	return score
}

func letterToResult(l string) result {
	switch l {
	case "X":
		return lose
	case "Y":
		return draw
	case "Z":
		return win
	}
	panic("unreachable")
}

func calculateScore2(strategy string) int {
	rounds := strings.Split(strings.TrimSpace(strategy), "\n")

	score := 0
	for _, round := range rounds {
		plays := strings.Split(round, " ")
		opponent, want := letterToPlay(plays[0]), letterToResult(plays[1])

		me := choosePlayForResult(opponent, want)
		score += scoreForPlay(me)

		switch whoWon(me, opponent) {
		case win:
			score += 6
		case draw:
			score += 3
		}
	}

	return score
}

func choosePlayForResult(opponent play, want result) play {
	if want == draw {
		return opponent
	}

	switch opponent {
	case rock:
		switch want {
		case win:
			return paper
		case lose:
			return scissors
		}
	case paper:
		switch want {
		case win:
			return scissors
		case lose:
			return rock
		}
	case scissors:
		switch want {
		case win:
			return rock
		case lose:
			return paper
		}
	}
	panic("unreachable")
}
