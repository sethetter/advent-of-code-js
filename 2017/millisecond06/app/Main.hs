module Main where

import Millisecond06

main :: IO ()
main = do
  inputStr <- readFile "input.txt"
  let input = map (\l -> read l :: Int) . words $ init inputStr
      (part1, part2) = solve input
   in putStrLn $ "Part 1: " ++ (show part1) ++ "\n" ++ "Part 2: " ++ (show part2)
