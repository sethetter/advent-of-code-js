package main

import (
	"bytes"
	"fmt"

	h "github.com/sethetter/aoc-2022/helpers"
)

func main() {
	input := h.GetInput("day05")

	parts := bytes.Split(input, []byte("\n\n"))
	initialState, instructionsStr := parts[0], parts[1]

	stacks := getInitialState(initialState)
	instructions := parseInstructions(instructionsStr)

	stacks.runInstructions(instructions)

	fmt.Println(stacks.topBoxes())
}

type stacks [][]byte

func newStacks(num int) stacks {
	stacks := make(stacks, num)
	for i := 0; i < num; i++ {
		stacks[i] = make([]byte, 0)
	}
	return stacks
}

func (s stacks) String() string {
	out := ""
	for i, stack := range s {
		out += fmt.Sprintf("%d: %s\n", i+1, string(stack))
	}
	return out
}

func (s stacks) topBoxes() string {
	out := []byte{}
	for _, stack := range s {
		out = append(out, stack[len(stack)-1])
	}
	return string(out)
}

func (s stacks) loadLine(line []byte) {
	numStacks := len(s)
	for i := 1; i < numStacks+1; i++ {
		box := line[(i*4)-3]
		if isLetter(box) {
			s[i-1] = append([]byte{box}, s[i-1]...)
		}
	}
}

func (s stacks) move(num, from, to int) {
	from, to = from-1, to-1
	for i := 0; i < num; i += 1 {
		s[to] = append(s[to], s[from][len(s[from])-1])
		s[from] = s[from][:len(s[from])-1]
	}
}

func (s stacks) move2(num, from, to int) {
	from, to = from-1, to-1

	startIdx := len(s[from]) - num
	if startIdx < 0 {
		startIdx = 0
	}

	s[to] = append(s[to], s[from][startIdx:]...)
	s[from] = s[from][:startIdx]
}

func (s stacks) runInstructions(instructions []instruction) {
	for _, instruction := range instructions {
		s.move2(instruction[0], instruction[1], instruction[2])
	}
}

func isLetter(c byte) bool {
	return int(c) >= int('A') && int(c) <= int('Z')
}

func getInitialState(in []byte) stacks {
	numStacks := (bytes.Index(in, []byte("\n")) + 1) / 4
	stacks := newStacks(numStacks)

	lines := bytes.Split(in, []byte("\n"))
	for _, line := range lines {
		stacks.loadLine(line)
	}

	return stacks
}

type instruction [3]int

func parseInstructions(in []byte) []instruction {
	instructions := make([]instruction, 0)
	for _, line := range bytes.Split(bytes.TrimSpace(in), []byte("\n")) {
		words := bytes.Split(line, []byte(" "))
		num, from, to := h.BytesToInt(words[1]), h.BytesToInt(words[3]), h.BytesToInt(words[5])
		instructions = append(instructions, instruction{num, from, to})
	}
	return instructions
}
