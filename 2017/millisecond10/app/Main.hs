module Main where

import Lib
import Data.List.Split (splitOn)

main :: IO ()
main = do
  inputStr <- readFile "input.txt"
  -- part 1
  -- let input = map (\s -> read s :: Int) . splitOn "," $ init inputStr
  --  in print $ foldl (*) 1 $ take 2 $ processLengths input
  -- part 2
  let input = init inputStr
      hash = denseHash $ sparseHash input
   in print $ hash
