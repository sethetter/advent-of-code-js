module Main where

import Data.List.Split (splitOn)
import Lib

main :: IO ()
main = do
  inputStr <- readFile "input.txt"
  let input    = splitOn "\n" $ init inputStr
      firewall = parseFirewall input
      -- severity = calculateTripSeverity firewall
      delay = calculateDelay firewall
    in print delay
