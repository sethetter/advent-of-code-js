module Main where

import Data.List.Split
import qualified Data.Sequence as S

jumpsOutInXSteps :: Int -> Int -> S.Seq Int -> Int
jumpsOutInXSteps steps pos ints
  | pos < 0  || pos >= (S.length ints) = steps
  | otherwise = let jump = S.index ints pos
                    newList = if jump > 2 then S.update pos (jump - 1) ints
                                          else S.update pos (jump + 1) ints
                    newPos = (+) pos jump
                 in jumpsOutInXSteps (steps + 1) newPos newList

main :: IO ()
main = do
  inputStr <- readFile "input.txt"
  let input = map (\l -> read l :: Int) . splitOn "\n" $ init inputStr
      answer = jumpsOutInXSteps 0 0 $ S.fromList input
   in print answer
