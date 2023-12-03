module Lib
    ( processLengths
    , sparseHash
    , denseHash
    ) where

import Data.List.Grouping (splitEvery)
import Data.Bits (xor)
import Data.Char
import Numeric (showHex)

-- Part 1
processLengths :: [Int] -> [Int]
processLengths = go 0 0 [0..255]
  where go :: Int -> Int -> [Int] -> [Int] -> [Int]
        go _ _    rope []     = rope
        go p skip rope (l:ls) =
          go (mod (p + l + skip) 256) (skip + 1) (twistRope p l rope) ls

-- Part 2
sparseHash :: String -> [Int]
sparseHash str = go 1 0 0 [0..255] lengths
  where lengths = (map ord str) ++ [17,31,73,47,23]
        go :: Int -> Int -> Int -> [Int] -> [Int] -> [Int]
        go 64 _ _    rope []     = rope
        go r  p s    rope []     = go (r + 1) p s rope lengths
        go r  p s rope (l:ls) =
          go r (mod (p + l + s) 256) (s + 1) (twistRope p l rope) ls

denseHash :: [Int] -> String
denseHash ints = concatMap getHex nums
  where nums :: [Int]
        nums = map (\g -> foldl1 xor g) $ splitEvery 16 ints

getHex :: Int -> String
getHex i = let h = showHex i ""
            in if length h == 2 then h else "0" ++ h

twistRope :: Int -> Int -> [Int] -> [Int]
twistRope p l rope =
  let frontEnd = (p + l) - 256
      newSection = reverse . take l . drop p $ cycle rope
   in (drop (l - frontEnd) newSection) ++ (drop frontEnd . take p $ rope) ++
      (take (l - frontEnd) newSection) ++ (drop (p + l) rope)
