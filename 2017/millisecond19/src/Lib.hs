module Lib
    ( countSteps
    , getAt
    ) where

import Data.List

countSteps :: [String] -> Int
countSteps grid = go (initX, 0) (0, 1) 0
  where initX = getInitX grid
        go :: (Int, Int) -> (Int, Int) -> Int -> Int
        go c@(x, y) d@(mx, my) count
          | charAt == '|' || charAt == '-' = go (x + mx, y + my) d (count + 1)
          | charAt `elem` ['A'..'Z']       = go (x + mx, y + my) d (count + 1)
          | charAt == '+'                  = let newD@(mx', my') = getNewD grid c d
                                              in go (x + mx', y + my') newD (count+1)
          | otherwise                      = count
          where charAt = getAt c grid

getInitX :: [String] -> Int
getInitX str = head $ elemIndices '|' $ head str

getNewD :: [String] -> (Int, Int) -> (Int, Int) -> (Int, Int)
getNewD grid (x, y) (mx, my)
  | mx == 0 && getAt (x - 1, y) grid == '-' = (-1, 0)
  | mx == 0 && getAt (x + 1, y) grid == '-' = (1, 0)
  | my == 0 && getAt (x, y - 1) grid == '|' = (0, -1)
  | my == 0 && getAt (x, y + 1) grid == '|' = (0, 1)
  | otherwise                               = (mx, my)

getAt :: (Int, Int) -> [String] -> Char
getAt (x, y) grid = grid !! y !! x
