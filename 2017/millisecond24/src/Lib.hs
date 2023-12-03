module Lib
    ( parseComponents
    , validBridges
    , strongestBridge
    , bridgeStrength
    , longestBridges
    ) where

import Data.List.Split (splitOn)
import Data.List

parseComponents :: [String] -> [(Int, Int)]
parseComponents = map (\s -> let p1 = read (head $ splitOn "/" s) :: Int
                                 p2 = read (head . tail $ splitOn "/" s) :: Int
                              in (p1, p2))

strongestBridge :: [[(Int, Int)]] -> Int
strongestBridge = maximum . map bridgeStrength

longestBridges :: [[(Int, Int)]] -> [[(Int, Int)]]
longestBridges bs = let maxLength = maximum . map (length) $ bs
                     in filter (\b -> length b == maxLength) bs

bridgeStrength :: [(Int, Int)] -> Int
bridgeStrength [] = 0
bridgeStrength ((x,y):xs) = x + y + bridgeStrength xs

validBridges :: [(Int, Int)] -> [[(Int, Int)]]
validBridges components = go zeroPorts
  where zeroPorts = map (\c -> [c]) $ findZeroPorts components

        go :: [[(Int, Int)]] -> [[(Int, Int)]]
        go bridges = let newBridges = (concatMap nextSteps bridges) \\ bridges
                      in if length newBridges > 0 then go (bridges ++ newBridges)
                                                  else bridges

        nextSteps :: [(Int, Int)] -> [[(Int, Int)]]
        nextSteps [] = []
        nextSteps bridge
          | length bridge == 1 = let portToMatch = bridgeStrength bridge
                                  in map (\c -> c:bridge) $ componentsForPort portToMatch (components \\ bridge)
          | otherwise = let (p1, p2) = head bridge
                            (p1', p2') = head . tail $ bridge
                            portToMatch = if p1 == p1' || p1 == p2' then p2 else p1
                         in map (\c -> c:bridge) $ componentsForPort portToMatch (components \\ bridge)

componentsForPort :: Int -> [(Int, Int)] -> [(Int, Int)]
componentsForPort 0 _ = []
componentsForPort p components = filter (\c -> fst c == p || snd c == p) components

findZeroPorts :: [(Int, Int)] -> [(Int, Int)]
findZeroPorts = filter (\c -> fst c == 0 || snd c == 0)
