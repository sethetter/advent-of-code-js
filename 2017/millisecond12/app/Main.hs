module Main where

import Data.List.Split
import Lib

main :: IO ()
main = do
  inputStr <- readFile "input.txt"
  let input = splitOn "\n" $ init inputStr
      connections = parsePipes input
      -- group0 = getGroup 0 connections
      totalGroups = countGroups connections
   in print totalGroups
