module Main where

import Lib

main :: IO ()
main = do
  inputStr <- readFile "input.txt"
  let input = init inputStr -- Drops the \n at the end
      answer = fuelNeeded (lines input)
   in putStrLn $ show answer
