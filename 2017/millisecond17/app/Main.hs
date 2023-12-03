module Main where

import qualified Data.Sequence as S
import Lib

main :: IO ()
main =
  -- let answer1 = valueAfter 2017 $ spinlockValues 324 2017
  --  in print answer1
  let answer2 = valueAfter 0 $ spinlockValues 324 50000000
   in print answer2

valueAfter :: Int -> S.Seq Int -> Int
valueAfter v vals =
  let idx = head $ S.elemIndicesL v vals
   in vals `S.index` (idx + 1)
