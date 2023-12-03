module Millisecond04 where

import Data.List
import Data.List.Split

isValidPassphrase :: String -> Bool
isValidPassphrase str =
  (length $ nub . words $ str) == (length $ words str)

isValidPassphrase2 :: String -> Bool
isValidPassphrase2 str =
  (length $ nub sortedWords) == (length sortedWords)
  where sortedWords = map sort $ words str

main :: IO ()
main = do
  inputStr <- readFile "input.txt"
  let input = init inputStr -- Drops the \n at the end
      answer = length $ filter isValidPassphrase2 $ splitOn "\n" input
   in print answer
