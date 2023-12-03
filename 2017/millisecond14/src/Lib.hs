module Lib
    ( diskFromKey
    , countOnBits
    , countRegions
    ) where

import KnotHash
import Data.List
import Data.Char
import Numeric (showIntAtBase)

diskFromKey :: String -> [String]
diskFromKey key = [ diskRow key x | x <- [0..127] ]

countOnBits :: [String] -> Int
countOnBits = length . filter (== '1') . concat

diskRow :: String -> Int -> String
diskRow key x = hashToBin hash
  where hash = knotHash (key ++ "-" ++ show x)

hashToBin :: String -> String
hashToBin = foldl' (\b c -> b ++ hexDigitToBin c) ""

hexDigitToBin :: Char -> String
hexDigitToBin = intToBinary . digitToInt

intToBinary :: Int -> String
intToBinary n =
  let base = showIntAtBase 2 ("01" !!) n ""
   in (replicate (4 - length base) '0') ++ base

coords :: [(Int, Int)]
coords = [ (x, y) | x <- [0..127], y <- [0..127] ]

countRegions :: [String] -> Int
countRegions disk = go 0 $ filter (isOn disk) coords
  where go :: Int -> [(Int, Int)] -> Int
        go count []     = count
        go count (c:cs) = let region = getRegion cs c
                           in go (count + 1) (cs \\ region)

getRegion :: [(Int, Int)] -> (Int, Int) -> [(Int, Int)]
getRegion coordsToCheck c = go [c] coordsToCheck
  where go :: [(Int, Int)] -> [(Int, Int)] -> [(Int, Int)]
        go region [] = region
        go region cs = let adjacents = nub . (concatMap $ getAdjacents cs) $ region
                        in if length adjacents > 0
                           then go (region ++ adjacents) (cs \\ adjacents)
                           else region

getAdjacents :: [(Int, Int)] -> (Int, Int) -> [(Int, Int)]
getAdjacents list c = list `intersect` adjacentsFor c

adjacentsFor :: (Int, Int) -> [(Int, Int)]
adjacentsFor (x, y) = [(x-1, y), (x+1, y), (x, y-1), (x, y+1)]

isOn :: [String] -> (Int, Int) -> Bool
isOn d (x, y) = d !! y !! x == '1'
