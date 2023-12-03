module Lib
    ( parseFirewall
    , calculateTripSeverity
    , calculateDelay
    ) where

import Data.List.Split (splitOn)
import qualified Data.Sequence as S

type Layer = (Int, Int, Int)
type Firewall = S.Seq Layer

parseFirewall :: [String] -> Firewall
parseFirewall strs = go pairs $ S.fromList (replicate (lastLayer + 1) (1, 1, 0))
  where pairs = map (toIntPair . splitOn ": ") strs
        lastLayer = maximum $ map fst pairs
        go :: [(Int, Int)] -> Firewall -> Firewall
        go []          firewall = firewall
        go ((d, r):ps) firewall = go ps $ S.update d (1, 1, r) firewall

toIntPair :: [String] -> (Int, Int)
toIntPair strs = (strToInt $ head strs, strToInt $ (head . tail) strs)

calculateTripSeverity :: Firewall -> Int
calculateTripSeverity = go 0 0
  where go :: Int -> Int -> Firewall -> Int
        go step severity firewall
          | step >= S.length firewall = severity
          | otherwise = if isCaughtAt step firewall
                        then go (step + 1) (severity + (severityFor step firewall)) (stepFirewall firewall)
                        else go (step + 1) severity (stepFirewall firewall)

isSafeTrip :: Firewall -> Bool
isSafeTrip = go 0
  where go :: Int -> Firewall -> Bool
        go step firewall
          | step >= S.length firewall = True
          | otherwise = not (isCaughtAt step firewall) && go (step + 1) (stepFirewall firewall)

calculateDelay :: Firewall -> Int
calculateDelay = go 0
  where go :: Int -> Firewall -> Int
        go delay firewall
          | isSafeTrip firewall = delay
          | otherwise =  go (delay + 1) (stepFirewall firewall)

isCaughtAt :: Int -> Firewall -> Bool
isCaughtAt step firewall = (getPos $ S.index firewall step) == 1

severityFor :: Int -> Firewall -> Int
severityFor depth firewall = depth * (getRange $ S.index firewall depth)

getPos :: Layer -> Int
getPos (pos, _, _) = pos

getRange :: Layer -> Int
getRange (_, _, range) = range

stepFirewall :: Firewall -> Firewall
stepFirewall = fmap stepLayer

stepLayer :: Layer -> Layer
stepLayer (pos, dir, range)
  | pos == range = (pos - 1, -1, range)
  | pos == 1     = (pos + 1, 1, range)
  | otherwise    = (pos + dir, dir, range)

strToInt :: String -> Int
strToInt s = (read s :: Int)
