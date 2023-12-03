module AocDay06
  ( codeFromLines
  , codeFromLines2
  , mostOccurring
  , leastOccurring
  ) where

import Data.List (transpose, sortBy, minimumBy, maximumBy)
import Data.List.Unique as Unique
import Data.Function


codeFromLines :: [String] -> String
codeFromLines strs = map mostOccurring (transpose strs)


codeFromLines2 :: [String] -> String
codeFromLines2 strs = map leastOccurring (transpose strs)


mostOccurring :: String -> Char
mostOccurring = fst . minimumBy (flip compare `on` snd) . Unique.count


leastOccurring :: String -> Char
leastOccurring = fst . maximumBy (flip compare `on` snd) . Unique.count
