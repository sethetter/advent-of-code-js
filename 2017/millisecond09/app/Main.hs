module Main where

import Lib

main :: IO ()
main = do
  inputStr <- readFile "input.txt"
  let input = init inputStr
   -- in print $ parseGroups 0 0 input
   in print $ countAllGarbage input
