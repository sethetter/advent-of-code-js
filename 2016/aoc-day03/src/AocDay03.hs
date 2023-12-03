module AocDay03
  ( validTriangle
  , lineToSides
  , sideListToColumnGroups
  ) where

import Data.List.Split
import Data.List        (foldl')


type Sides = [Integer]


validTriangle :: Sides -> Bool
validTriangle sides =
  let a = head sides; b = head $ tail sides; c = last sides
   in (a + b) > c && (a + c) > b && (b + c) > a


lineToSides :: String -> Sides
lineToSides line =
  let sidesList = (read :: String -> Integer) <$> words line
   in [head sidesList, head (tail sidesList), last sidesList]


sideListToColumnGroups :: [Sides] -> [Sides]
sideListToColumnGroups sides =
  let groupsOfThree = chunksOf 3 sides
   in foldl' (\acc group -> acc ++ threeSidesToColumnGroups group) [] groupsOfThree


threeSidesToColumnGroups :: [Sides] -> [Sides]
threeSidesToColumnGroups sides
  | length sides < 3 = []
  | otherwise = [map head sides, map (head . tail) sides, map last sides]
