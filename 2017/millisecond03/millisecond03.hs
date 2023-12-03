module Millisecond03 where

import Data.List
import qualified Data.Map.Strict as M

data Direction = R | U | L | D deriving (Show)

move :: (Int, Int) -> Direction -> (Int, Int)
move (x, y) R = (x + 1, y)
move (x, y) U = (x, y + 1)
move (x, y) L = (x - 1, y)
move (x, y) D = (x, y - 1)

directions :: [Direction]
directions = [R, U, L, D]

moves :: [Direction]
moves = concat $ zipWith replicate (concat $ zipWith (\a b -> [a,b]) [1..] [1..]) (cycle directions)

part1 :: Int -> Int
part1 i = (\(x, y) -> x + y) $ last $ take i path
  where path :: [(Int, Int)]
        path = snd $ mapAccumL (\c d -> (move c d, move c d)) (-1, 0) moves

buildSpiralMapUntil :: Int -> (M.Map (Int, Int) Int) -> (Int, Int) -> [Direction] -> Int
buildSpiralMapUntil _ _ _ [] = 0
buildSpiralMapUntil i m c@(x, y) (d:ds) =
  case sumAdjacents > i of
    True -> sumAdjacents
    False -> buildSpiralMapUntil i (M.insert c sumAdjacents m) nextCoord ds
  where nextCoord = move c d
        adjacents = [ (x', y') | x' <- [(x-1)..(x+1)], y' <- [(y-1)..(y+1)], (x, y) /= (x', y') ]
        sumAdjacents = sum $ map (\c -> case M.lookup c m of
                                              Nothing -> 0
                                              Just i' -> i' ) adjacents

part2 :: Int -> Int
part2 i = buildSpiralMapUntil i (M.singleton (0, 0) 1) (1, 0) $ tail moves

main :: IO ()
main = do
  -- let answer1 = part1 361527
  --  in print answer1
  let answer2 = part2 361527
   in print answer2
