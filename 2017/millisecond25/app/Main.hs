module Main where

import Lib

main :: IO ()
main =
  let answer1 = checksumAfterXSteps 12586542
   in print answer1
