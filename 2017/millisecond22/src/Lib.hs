module Lib
    ( parseGrid
    , initCarrier
    , doBurst
    , getCount
    ) where

import qualified Data.Map.Strict as M
import Data.List (foldl')

data Dir = N | E | S | W deriving (Show)

data Carrier = Carrier (Int, Int) Dir Int deriving (Show)

type Grid = M.Map (Int, Int) Int

parseGrid :: [String] -> Grid
parseGrid strs =
  let coords = [ (x, y) | x <- [0..length strs - 1], y <- [0..length strs - 1] ]
   in foldl' (\m c@(x, y) -> let v = if strs!!y!!x == '#' then 1 else 0
                              in M.insert c v m
             ) M.empty coords

startingPos :: Grid -> (Int, Int)
startingPos grid = case M.lookupMax grid of
  Just ((x, y), _) -> ((div x 2), (div y 2))
  Nothing -> (0, 0)

initCarrier :: Grid -> Carrier
initCarrier g = Carrier (startingPos g) N 0

doBurst :: (Grid, Carrier) -> (Grid, Carrier)
doBurst (grid, c@(Carrier pos _ _)) =
  case M.lookup pos grid of
    Just v -> case v of
      0 -> (M.adjust (\_ -> updateNodeState v) pos grid, move . turnLeft $ c)
      1 -> (M.adjust (\_ -> updateNodeState v) pos grid, move . turnRight $ c)
      2 -> (M.adjust (\_ -> updateNodeState v) pos grid, increaseCount . move $ c)
      _ -> (M.adjust (\_ -> updateNodeState v) pos grid, move . turnRight . turnRight $ c)
    Nothing -> (M.insert pos (updateNodeState 0) grid, move . turnLeft $ c)

increaseCount :: Carrier -> Carrier
increaseCount (Carrier pos dir count) = Carrier pos dir (count + 1)

updateNodeState :: Int -> Int
updateNodeState 0 = 2 -- Cleaned -> Weakened
updateNodeState 2 = 1 -- Weakened -> Infected
updateNodeState 1 = 3 -- Infected -> Flagged
updateNodeState 3 = 0 -- Flagged -> Cleaned
updateNodeState _ = 0 -- ??? -> Cleaned

getCount :: Carrier -> Int
getCount (Carrier _ _ c) = c

move :: Carrier -> Carrier
move (Carrier (x, y) N count) = Carrier (x, y - 1) N count
move (Carrier (x, y) W count) = Carrier (x + 1, y) W count
move (Carrier (x, y) S count) = Carrier (x, y + 1) S count
move (Carrier (x, y) E count) = Carrier (x - 1, y) E count

turnRight :: Carrier -> Carrier
turnRight (Carrier pos N count) = Carrier pos W count
turnRight (Carrier pos W count) = Carrier pos S count
turnRight (Carrier pos S count) = Carrier pos E count
turnRight (Carrier pos E count) = Carrier pos N count

turnLeft :: Carrier -> Carrier
turnLeft (Carrier pos N count) = Carrier pos E count
turnLeft (Carrier pos E count) = Carrier pos S count
turnLeft (Carrier pos S count) = Carrier pos W count
turnLeft (Carrier pos W count) = Carrier pos N count


   -- if current infected, turn right, otherwise turn left
   -- if infected
