module Main where

import Data.List.Split
import Lib

main :: IO ()
main = do
  inputStr <- readFile "input.txt"
  let input = splitOn "\n" $ init inputStr
      part1 = findBottomProgram input
      tower = buildProgramTower input
      (weights, w) = findImbalancedProgram tower
   in do
    print weights
    print w
