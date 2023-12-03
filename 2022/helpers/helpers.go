package helpers

import (
	"fmt"
	"io/ioutil"
	"log"
	"strconv"
)

func GetInput(day string) []byte {
	input, err := ioutil.ReadFile(fmt.Sprintf("%s/input.txt", day))
	if err != nil {
		log.Fatal("failed to read input file")
	}
	return input
}

func BytesToInt(str []byte) int {
	out, err := strconv.Atoi(string(str))
	if err != nil {
		log.Fatalf("failed to parse as int: %s", str)
	}
	return out
}
