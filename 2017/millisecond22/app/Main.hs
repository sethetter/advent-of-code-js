module Main where

import Lib
import Data.List.Split (splitOn)

main :: IO ()
main = do
  inputStr <- readFile "input.txt"
  let input = splitOn "\n" $ init inputStr
      grid = parseGrid input
      carrier = initCarrier grid
      burstXTimes x = (iterate doBurst (grid, carrier)) !! x
   in print $ getCount . snd $ burstXTimes 10000000
