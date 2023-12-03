module Main where

import Lib
-- import Data.List

main :: IO ()
main = do
  inputStr <- readFile "input.txt"
  -- let testComponents = [(0,2), (2,2), (2,3), (3,4), (3,5), (0,1), (10,1), (9,10)]
  --  in print $ maximumBy (\a b -> compare (bridgeStrength a) (bridgeStrength b)) $ validBridges testComponents
  let input = lines $ inputStr
      components = parseComponents input
   -- in print $ strongestBridge $ validBridges components
   in print $ strongestBridge . longestBridges $ validBridges components
