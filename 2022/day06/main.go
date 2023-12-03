package main

import (
	"bytes"
	"fmt"

	"github.com/samber/lo"
	h "github.com/sethetter/aoc-2022/helpers"
)

func main() {
	input := bytes.TrimSpace(h.GetInput("day06"))
	fmt.Println("part 1:", firstUniqCharBySize(input, 4))
	fmt.Println("part 2:", firstUniqCharBySize(input, 14))
}

func firstUniqCharBySize(in []byte, windowSize int) int {
	for i := windowSize; i < len(in); i += 1 {
		if len(lo.Uniq(windowBackwards(in, i, windowSize))) == windowSize {
			return i + 1
		}
	}
	return -1
}

func windowBackwards(in []byte, pos int, size int) []byte {
	out := []byte{}
	for i := size - 1; i >= 0; i -= 1 {
		if pos-i < 0 {
			continue
		}
		out = append(out, in[pos-i])
	}
	return out
}
