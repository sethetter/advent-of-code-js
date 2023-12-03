module Lib
    ( judgeMatchCount
    ) where

import Data.Bits

nextVal :: Int -> Int -> Int
nextVal factor x = rem (x * factor) 2147483647

nextVal2 :: Int -> Int -> Int -> Int
nextVal2 factor multOf x =
  let v = nextVal factor x
  in if rem v multOf == 0 then v else nextVal2 factor multOf v

judgeMatchCount :: Int -> Int -> Int -> Int
judgeMatchCount startA startB total = go startA startB 0 0
  where first16 x = x .&. 0xffff
        go :: Int -> Int -> Int -> Int -> Int
        go prevA prevB n count
          | n == total = count
          | otherwise  = let nextA = nextVal2 16807 4 prevA
                             nextB = nextVal2 48271 8 prevB
                          in case (first16 nextA == first16 nextB) of
                               True  -> go nextA nextB (n + 1) (count + 1)
                               False -> go nextA nextB (n + 1) count
