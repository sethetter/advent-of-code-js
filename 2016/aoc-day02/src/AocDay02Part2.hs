module AocDay02Part2
  ( locationFromLine
  , codeFromLines
  , charFromLocation
  , locationFromChar
  ) where


import Data.List (foldl')


type Location = (Integer, Integer)


data Move
  = U | D | L | R | Unknown
  deriving (Show, Eq)


codeFromLines :: [String] -> String
codeFromLines lines =
  let locationsList = foldl' (\locations line -> locations ++ [locationFromLine (last locations) line]) [locationFromChar '5'] lines
   in map charFromLocation (tail locationsList) -- tail to remove the starting 5


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
processMove start move =
  let newLocation = applyMove start move
   in if validLocation newLocation then newLocation else start



validLocation :: Location -> Bool
validLocation location =
  location `elem` [ (2, 0) -- 1
                  , (1, 1) -- 2
                  , (2, 1) -- 3
                  , (3, 1) -- 4
                  , (0, 2) -- 5
                  , (1, 2) -- 6
                  , (2, 2) -- 7
                  , (3, 2) -- 8
                  , (4, 2) -- 9
                  , (1, 3) -- A
                  , (2, 3) -- B
                  , (3, 3) -- C
                  , (2, 4) -- D
                  ]


applyMove :: Location -> Move -> Location
applyMove (startX, startY) move =
  case move of
    U -> (startX, startY - 1)
    D -> (startX, startY + 1)
    L -> (startX - 1, startY)
    R -> (startX + 1, startY)
    Unknown -> (startX, startY)


charFromLocation :: Location -> Char
charFromLocation location =
  case location of
    (2, 0) -> '1'
    (1, 1) -> '2'
    (2, 1) -> '3'
    (3, 1) -> '4'
    (0, 2) -> '5'
    (1, 2) -> '6'
    (2, 2) -> '7'
    (3, 2) -> '8'
    (4, 2) -> '9'
    (1, 3) -> 'A'
    (2, 3) -> 'B'
    (3, 3) -> 'C'
    (2, 4) -> 'D'

locationFromChar :: Char -> Location
locationFromChar char =
  case char of
    '1' -> (2, 0)
    '2' -> (1, 1)
    '3' -> (2, 1)
    '4' -> (3, 1)
    '5' -> (0, 2)
    '6' -> (1, 2)
    '7' -> (2, 2)
    '8' -> (3, 2)
    '9' -> (4, 2)
    'A' -> (1, 3)
    'B' -> (2, 3)
    'C' -> (3, 3)
    'D' -> (2, 4)
