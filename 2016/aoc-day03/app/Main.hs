module Main where

import AocDay03
import Data.List.Split

main :: IO ()
main = do
  inputStr <- readFile "input.txt"
  {-let valid = filter validTriangle $ map lineToSides $ init $ splitOn "\n" inputStr -- drop last blank line-}
  let valid = filter validTriangle $ sideListToColumnGroups $ map lineToSides $ init $ splitOn "\n" inputStr -- drop last blank line
   in putStr $ "Valid Triangles: " ++ show (length valid) ++ "\n"
