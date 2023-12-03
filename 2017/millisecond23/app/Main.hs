module Main where

import Lib
import Data.Numbers.Primes

main :: IO ()
main = do
  inputStr <- readFile "input.txt"

  -- Part1
  -- let input = lines $ init inputStr
  --     answer1 = howManyMuls input
  --  in print answer1

  -- Part 2, reverse engineered into JS in /millisecond23/part2.js, then optimized here
  let b = 108400
   in print $ length $ filter (not . isPrime) [b,b+17..b+17000]

