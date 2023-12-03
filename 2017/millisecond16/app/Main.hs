module Main where

import Lib
import Data.List.Split (splitOn)

main :: IO ()
main = do
  inputStr <- readFile "input.txt"
  let input = splitOn "," $ init inputStr
      moves = parseMoves input
      oneLoop = loopsAt $ tail $ iterate (performDance moves) programStart
      dancesLeft = rem 1000000000 (oneLoop + 1)
      finalPositions = foldl (\c _ -> performDance moves c) programStart [1..dancesLeft]
   in print finalPositions
