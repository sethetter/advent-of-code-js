module Main where

import Lib
import Data.List.Split (splitOn)

main :: IO ()
main = do
  inputStr <- readFile "input.txt"
  let input = splitOn "\n" $ init inputStr
      particles = parseParticles input
      -- closest = closestToZeroOverXSteps 1000 particles
      leftAfter = last $ map length . take 100 $ iterate (removeCollisions . stepParticles) particles
   in print $ leftAfter
