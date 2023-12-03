module Lib
    ( doSpin
    , doExchange
    , doPartner
    , performDance
    , parseMoves
    , programStart
    , loopsAt
    ) where

import Data.List
import Data.List.Split (splitOn)

programStart :: String
programStart = "abcdefghijklmnop"

parseMoves :: [String] -> [(String -> String)]
parseMoves = map parseMove

parseMove :: String -> (String -> String)
parseMove m = case head m of
  's' -> doSpin (strToInt $ tail m)
  'x' -> doExchange (strToInt $ head . splitOn "/" $ tail m)
                    (strToInt $ last . splitOn "/" $ tail m)
  'p' -> doPartner (head . head . splitOn "/" $ tail m)
                   (last . last . splitOn "/" $ tail m)
  _   -> id

performDance :: [(String -> String)] -> String -> String
performDance moves start = foldl' (\r f -> f r) start moves

strToInt :: String -> Int
strToInt s = (read s :: Int)

doSpin :: Int -> String -> String
doSpin x ps = drop (length ps - x) ps ++ take (length ps - x) ps

doExchange :: Int -> Int -> String -> String
doExchange pos1 pos2 ps =
  let firstPos = min pos1 pos2
      secondPos = max pos1 pos2
      p1 = ps !! firstPos
      p2 = ps !! secondPos
   in take firstPos ps ++ [p2]
      ++ (take (secondPos - firstPos - 1) . drop (firstPos + 1) $ ps)
      ++ [p1] ++ drop (secondPos + 1) ps

doPartner :: Char -> Char -> String -> String
doPartner p1 p2 ps = case elemIndex p1 ps of
  Just pos1 -> case elemIndex p2 ps of
    Just pos2 -> doExchange pos1 pos2 ps
    Nothing -> ps
  Nothing -> ps

loopsAt :: [String] -> Int
loopsAt = length . takeWhile (/= programStart)
