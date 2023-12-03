module Millisecond02 where

import Data.List.Split

checksum :: [String] -> Integer
checksum =
  sum . map (\l -> let maxVal = maximum $ lineToInts l
                       minVal = minimum $ lineToInts l
                    in maxVal - minVal)

lineToInts :: String -> [Integer]
lineToInts = map (\w -> read w :: Integer) . words

sumEvenlyDivisible :: [String] -> Integer
sumEvenlyDivisible =
  sum . map (\l -> let pair = getEvenlyDivisiblePair $ lineToInts l
                    in case pair of
                         Nothing -> 0
                         Just (x, y) -> div x y)

getEvenlyDivisiblePair :: [Integer] -> Maybe (Integer, Integer)
getEvenlyDivisiblePair ints =
  let pairs = [ (x, y) | x <- ints, y <- ints ]
      go :: [(Integer, Integer)] -> Maybe (Integer, Integer)
      go [] = Nothing
      go ((x, y):xs)
        | (x `mod` y) == 0 = Just (x, y)
        | otherwise        = go xs
   in go $ filter (\(x, y) -> x /= y) pairs


main :: IO ()
main = do
  inputStr <- readFile "input.txt"
  let input = init inputStr -- Drops the \n at the end
      -- answer = checksum $ splitOn "\n" input
      answer = sumEvenlyDivisible $ splitOn "\n" input
   in print answer
