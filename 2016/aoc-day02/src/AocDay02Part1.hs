module AocDay02Part1
  ( locationFromLine
  , codeFromLines
  , numFromLocation
  , locationFromNum
  ) where


import Data.List (foldl')


type Location = (Integer, Integer)

data Move
  = U | D | L | R | Unknown
  deriving (Show, Eq)


codeFromLines :: [String] -> String
codeFromLines lines =
  let locationsList = foldl' (\locations line -> locations ++ [locationFromLine (last locations) line]) [locationFromNum 5] lines
      codeNums = map numFromLocation (tail locationsList) -- tail to remove the starting 5
   in foldl' (++) "" (map show codeNums)


locationFromLine :: Location -> String -> Location
locationFromLine start line = processMoves start (parseLine line)


parseLine :: String -> [Move]
parseLine = map parseSingle


parseSingle :: Char -> Move
parseSingle letter =
  case letter of
    'U' -> U
    'D' -> D
    'L' -> L
    'R' -> R
    _   -> Unknown


processMoves :: Location -> [Move] ->  Location
processMoves start [] = start
processMoves start moves = foldl' processMove start moves


processMove :: Location -> Move -> Location
processMove start Unknown = start
processMove (startX, startY) U
  | startY == 0 = (startX, 0)
  | otherwise   = (startX, startY - 1)
processMove (startX, startY) D
  | startY == 2 = (startX, 2)
  | otherwise   = (startX, startY + 1)
processMove (startX, startY) L
  | startX == 0 = (0, startY)
  | otherwise   = (startX - 1, startY)
processMove (startX, startY) R
  | startX == 2 = (2, startY)
  | otherwise   = (startX + 1, startY)

numFromLocation :: Location -> Integer
numFromLocation location =
  case location of
    (0, 0) -> 1
    (1, 0) -> 2
    (2, 0) -> 3
    (0, 1) -> 4
    (1, 1) -> 5
    (2, 1) -> 6
    (0, 2) -> 7
    (1, 2) -> 8
    (2, 2) -> 9

locationFromNum :: Integer -> Location
locationFromNum num =
  case num of
    1 -> (0, 0)
    2 -> (1, 0)
    3 -> (2, 0)
    4 -> (0, 1)
    5 -> (1, 1)
    6 -> (2, 1)
    7 -> (0, 2)
    8 -> (1, 2)
    9 -> (2, 2)
