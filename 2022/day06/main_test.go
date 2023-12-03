package main

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func Test_part1(t *testing.T) {
	cases := []struct {
		in     []byte
		expect int
	}{
		{[]byte("bvwbjplbgvbhsrlpgdmjqwftvncz"), 5},
		{[]byte("nppdvjthqldpwncqszvftbrmjlhg"), 6},
		{[]byte("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg"), 10},
		{[]byte("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"), 11},
	}
	for _, tc := range cases {
		assert.Equal(t, tc.expect, firstUniqCharBySize(tc.in, 4))
	}
}

func Test_part2(t *testing.T) {
	cases := []struct {
		in     []byte
		expect int
	}{
		{[]byte("mjqjpqmgbljsphdztnvjfqwrcgsmlb"), 19},
		{[]byte("bvwbjplbgvbhsrlpgdmjqwftvncz"), 23},
		{[]byte("nppdvjthqldpwncqszvftbrmjlhg"), 23},
		{[]byte("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg"), 29},
		{[]byte("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"), 26},
	}
	for _, tc := range cases {
		assert.Equal(t, tc.expect, firstUniqCharBySize(tc.in, 14))
	}
}
