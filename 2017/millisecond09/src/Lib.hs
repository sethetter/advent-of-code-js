module Lib
    ( countGroupScore
    , countAllGarbage
    ) where

countGroupScore :: Int -> Int -> String -> Int
countGroupScore score _     []     = score
countGroupScore score level (c:cs) = case c of
  '!' -> countGroupScore score level $ tail cs
  '<' -> countGroupScore score level $ removeGarbageFromFront (c:cs)
  '{' -> countGroupScore (score + level + 1) (level + 1) cs
  '}' -> countGroupScore score (level - 1) cs
  _   -> countGroupScore score level cs

removeGarbageFromFront :: String -> String
removeGarbageFromFront []     = ""
removeGarbageFromFront (c:cs) = case c of
  '!' -> removeGarbageFromFront $ tail cs
  '>' -> cs
  _   -> removeGarbageFromFront cs

countAllGarbage :: String -> Int
countAllGarbage = go 0
  where go :: Int -> String -> Int
        go count []     = count
        go count (x:xs) = case x of
          '<' -> go (count + (countNextGarbageChunk xs)) $ removeGarbageFromFront xs
          _   -> go count xs

countNextGarbageChunk :: String -> Int
countNextGarbageChunk = go 0
  where go :: Int -> String -> Int
        go count (c:cs) = case c of
          '!' -> go count $ tail cs
          '>' -> count
          _   -> go (count + 1) cs
