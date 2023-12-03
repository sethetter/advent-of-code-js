module AocDay01
  ( navigateFromStr
  , showStatus
  , showHistory
  , showDistanceFromZero
  , showFirstVisitedTwice
  ) where


import Data.List.Split
import Data.List (foldl')


data Direction = North | South | East | West
  deriving (Show)

data Turn = L | R
  deriving (Show)

data Instruction
  = Instruction Turn Integer
  | Unknown
  deriving (Show)

type Coordinates = (Integer, Integer)

type Status = (Direction, Coordinates)


navigateFromStr :: String -> [Status]
navigateFromStr input =
  let instructionStrings = splitOn ", " input
      instructions       = map parseInstruction instructionStrings
   in navigate instructions


navigate :: [Instruction] -> [Status]
navigate = foldl' move [(North, (0, 0))]


move :: [Status] -> Instruction -> [Status]
move history instruction = history ++ statusesFrom (last history) instruction


statusesFrom :: Status -> Instruction -> [Status]
statusesFrom (facing, (x, y)) (Instruction turn blocks) =
  case turn of
    L -> case facing of
      North -> fmap (\i -> (West,  (i, y))) [(x-1), (x-2)..(x-blocks)]
      East  -> fmap (\i -> (North, (x, i))) [(y+1)..(y+blocks)]
      South -> fmap (\i -> (East, (i, y))) [(x+1)..(x+blocks)]
      West  -> fmap (\i -> (South, (x, i))) [(y-1), (y-2)..(y-blocks)]
    R -> case facing of
      North -> fmap (\i -> (East, (i, y))) [(x+1)..(x+blocks)]
      East  -> fmap (\i -> (South, (x, i))) [(y-1), (y-2)..(y-blocks)]
      South -> fmap (\i -> (West,  (i, y))) [(x-1), (x-2)..(x-blocks)]
      West  -> fmap (\i -> (North, (x, i))) [(y+1)..(y+blocks)]


showFirstVisitedTwice :: [Status] -> String
showFirstVisitedTwice history =
  case findFirstDupCoords (map snd history) [] of
    Just (x, y) -> "First visited twice: (" ++ show x ++ ", " ++ show y ++ ")\n"
    Nothing     -> "No location visited twice!\n"


findFirstDupCoords :: [Coordinates] -> [Coordinates] -> Maybe Coordinates
findFirstDupCoords [] _ = Nothing
findFirstDupCoords (current:rest) history =
  if current `elem` history then Just current
                            else findFirstDupCoords rest (history ++ [current])


parseInstruction :: String -> Instruction
parseInstruction string =
  case take 1 string of
    "R" -> Instruction R (read $ tail string :: Integer)
    "L" -> Instruction L (read $ tail string :: Integer)
    _   -> Unknown


showHistory :: [Status] -> String
showHistory = foldl' (\str status -> str ++ showStatus status) ""


showStatus :: Status -> String
showStatus (facing, (x, y)) =
  "(" ++ show x ++ ", " ++ show y ++ "), Facing: " ++ show facing ++ "\n"


showDistanceFromZero :: Status -> String
showDistanceFromZero (_, (x, y)) =
  let distance = abs x + abs y
   in "Blocks away: " ++ show distance ++ "\n"
