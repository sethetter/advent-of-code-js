module Main where

import Lib

main :: IO ()
main =
  -- let answer1 = judgeMatchCount 703 516 40000000
  --  in print answer1
  let answer2 = judgeMatchCount 703 516 5000000
   in print answer2
