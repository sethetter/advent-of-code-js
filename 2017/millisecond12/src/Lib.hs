module Lib
    ( parsePipes
    , getGroup
    , countGroups
    ) where

import Data.List.Split (splitOn)
import Data.List (foldl', nub, (\\))
import qualified Data.Map.Strict as M

parsePipes :: [String] -> M.Map Int [Int]
parsePipes = foldl' updateConnMap M.empty

updateConnMap :: M.Map Int [Int] -> String -> M.Map Int [Int]
updateConnMap m s = M.insert program connections m
  where program = read (head $ words s) :: Int
        connectionStrs = splitOn ", " . head . tail . splitOn " <-> " $ s
        connections = map (\cstr -> read cstr :: Int) connectionStrs

getGroup :: Int -> M.Map Int [Int] -> [Int]
getGroup p = go [p]
  where go :: [Int] -> M.Map Int [Int] -> [Int]
        go group m =
          let conns = nub . concatMap (\p' -> case M.lookup p' m of
                                         Just ps -> ps
                                         Nothing -> []
                                ) $ group
           in if (conns \\ group) == [] then group
                                        else go (nub $ group ++ conns) m

countGroups :: M.Map Int [Int] -> Int
countGroups m = let firstGroup = getGroup 0 m
                 in go [firstGroup] (removePrograms firstGroup m) 1
  where go :: [[Int]] -> M.Map Int [Int] -> Int -> Int
        go groups m' count
          | m' == M.empty = count
          | otherwise    = go (groups ++ [nextGroup]) (removePrograms nextGroup m') (count + 1)
              where nextGroup = getGroup (fst . head . take 1 . M.toAscList $ m') m'

removePrograms :: [Int] -> M.Map Int [Int] -> M.Map Int [Int]
removePrograms [] m     = m
removePrograms (p:ps) m = removePrograms ps $ M.delete p m
