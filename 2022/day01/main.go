package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"sort"
	"strconv"
	"strings"
)

func main() {
	input, err := ioutil.ReadFile("day01/input.txt")
	if err != nil {
		log.Fatal("failed to read input file")
	}

	counts := calorieCounts(string(input))
	sort.Sort(sort.Reverse(sort.IntSlice(counts)))

	fmt.Printf("part 1: %d\n", counts[0])

	part2 := counts[0] + counts[1] + counts[2]
	fmt.Printf("part 2: %d\n", part2)
}

func calorieCounts(input string) []int {
	itemLists := strings.Split(
		strings.TrimSpace(string(input)),
		"\n\n",
	)

	counts := make([]int, len(itemLists))

	for i, list := range itemLists {
		items := strings.Split(list, "\n")
		for _, item := range items {
			x, err := strconv.Atoi(item)
			if err != nil {
				log.Fatalf("failed to parse as int: %s", item)
			}
			counts[i] += x
		}
	}

	return counts
}
