package main

import (
	"bytes"
	"testing"

	"github.com/stretchr/testify/assert"
)

var testInput = []byte(`
2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8
`)

func Test_part1(t *testing.T) {
	got := part1(bytes.TrimSpace(testInput))
	assert.Equal(t, 2, got)
}
