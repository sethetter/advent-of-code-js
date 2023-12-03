module Main where

import AocDay01
import Data.List.Split

main :: IO ()
main = do
  inputStr <- readFile "input.txt"
  let history = navigateFromStr inputStr
      finalStatus = last history
   in putStr $ showStatus finalStatus ++
               showDistanceFromZero finalStatus ++
               showFirstVisitedTwice history
