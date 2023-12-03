module Main where

import AocDay06
import Data.List.Split

main :: IO ()
main = do
  inputStr <- readFile "input.txt"
  putStr $ "Code 1: " ++ codeFromLines (init $ splitOn "\n" inputStr) ++ "\n" ++
           "Code 2: " ++ codeFromLines2 (init $ splitOn "\n" inputStr) ++ "\n"
