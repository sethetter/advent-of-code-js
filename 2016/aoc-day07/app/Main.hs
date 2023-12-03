module Main where

import AocDay07
import Data.List.Split

main :: IO ()
main = do
  inputStr <- readFile "input.txt"
  let inputLines = init $ lines inputStr
   in do
     putStr $ "Num Valid TLS: " ++ show (length $ filter supportsTLS inputLines) ++ "\n"
     putStr $ "Num Valid SLS: " ++ show (length $ filter supportsSLS inputLines) ++ "\n\n"
