module Main where

import AocDay02Part2
import Data.List.Split

main :: IO ()
main = do
  inputStr <- readFile "input.txt"
  let lines   = splitOn "\n" inputStr
      codeStr = codeFromLines (init lines) -- drop blank line at end
   in putStr $ "Code: " ++ codeStr ++ "\n"
