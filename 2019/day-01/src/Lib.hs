module Lib where

fuelNeeded :: [String] -> Int
fuelNeeded = sum . map (addRemainingFuel . fuelFromMass) . map (\w -> read w :: Int)

fuelFromMass :: Int -> Int
fuelFromMass x = (x `div` 3) - 2

addRemainingFuel :: Int -> Int
addRemainingFuel x = sum $ go [x] x
  where go :: [Int] -> Int -> [Int]
        go xs x'
          | fuelFromMass x' > 0 = go (xs ++ [fuelFromMass x']) $ fuelFromMass x'
          | otherwise = xs
