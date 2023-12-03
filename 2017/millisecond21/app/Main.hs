module Main where

import Lib
import Data.List.Split (splitOn)

main :: IO ()
main = do
  inputStr <- readFile "input.txt"
  let input = splitOn "\n" $ init inputStr
      rules = parseRules input
      programAfterXIterations x = (iterate (stepProgram rules) imgStart) !! x
   in print $ countOnPixels $ programAfterXIterations 18

