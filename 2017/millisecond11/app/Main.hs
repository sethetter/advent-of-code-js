module Main where

import Data.List.Split
import Lib

main :: IO ()
main = do
  inputStr <- readFile "input.txt"
  let input = splitOn "," $ init inputStr
      -- finalPosition = processMoves input
      -- distance = distanceFromZero finalPosition -- part 1
      furthest = furthestPointInJourney input
      furthestDistance = distanceFromZero furthest -- part 2
   in print $ furthestDistance
