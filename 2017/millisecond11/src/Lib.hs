module Lib
    ( processMoves
    , distanceFromZero
    , furthestPointInJourney
    ) where

type Pos = (Int, Int)

processMoves :: [String] -> Pos
processMoves = foldl move (0, 0)

furthestPointInJourney :: [String] -> Pos
furthestPointInJourney = go (0, 0) (0, 0)
  where go :: Pos -> Pos -> [String] -> Pos
        go _   furthest []     = furthest
        go cur furthest (m:ms) =
          let next = move cur m
              newMax = if distanceFromZero furthest < distanceFromZero next
              then next else furthest
           in go next newMax ms

move :: Pos -> String -> Pos
move (x, y) dir = case dir of
  "nw" -> (x - 1, y)
  "n"  -> (x, y + 1)
  "ne" -> (x + 1, y + 1)
  "se" -> (x + 1, y)
  "s"  -> (x, y - 1)
  "sw" -> (x - 1, y - 1)
  _    -> (x, y)

distanceFromZero :: Pos -> Int
distanceFromZero (x, y) = abs x + abs y
