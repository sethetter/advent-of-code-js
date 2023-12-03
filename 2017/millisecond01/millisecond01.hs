module Millisecond01 where

import Data.Char

processDigitStr :: String -> Int
processDigitStr str =
  let pairs = zip str (tail str ++ [head str])
   in sum . map (digitToInt . fst) . filter (uncurry (==)) $ pairs

processDigitStr2 :: String -> Int
processDigitStr2 str =
  let halfStrLength = div (length str) 2
      pairs = zip str ((drop halfStrLength str) ++ (take halfStrLength str))
   in sum . map (digitToInt . fst) . filter (uncurry (==)) $ pairs

main :: IO ()
main = do
  inputStr <- readFile "input.txt"
  let input = init inputStr -- Drops the \n at the end
      answer = processDigitStr2 input
   in print answer
