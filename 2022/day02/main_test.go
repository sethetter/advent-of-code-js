package main

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

var testInput = `
A Y
B X
C Z
`

func Test_calculateScore(t *testing.T) {
	got := calculateScore(testInput)
	assert.Equal(t, 15, got)
}

func Test_calculateScore2(t *testing.T) {
	got := calculateScore2(testInput)
	assert.Equal(t, 12, got)
}
