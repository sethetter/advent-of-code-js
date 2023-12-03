package main

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

var testInput = `
1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
`

func Test_calorieCounts(t *testing.T) {
	counts := calorieCounts(testInput)
	assert.Equal(t, []int{6000, 4000, 11000, 24000, 10000}, counts)
}
