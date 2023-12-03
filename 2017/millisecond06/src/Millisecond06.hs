module Millisecond06
    ( solve
    ) where

import Data.List
import qualified Data.Sequence as S

-- (Part1, Part2)
solve :: [Int] -> (Int, Int)
solve banks = go [] $ S.fromList banks
  where go :: [S.Seq Int] -> S.Seq Int -> (Int, Int)
        go perms banks'
          | banks' `elem` perms = case elemIndex banks' perms of
              Just idx -> (length perms, length perms - idx)
              Nothing -> (0, 0)
          | otherwise = let nextStep = redistribute banks'
                         in go (perms ++ [banks']) nextStep

-- Pick biggest bank, reallocate to other banks
redistribute :: S.Seq Int -> S.Seq Int
redistribute banks = case maybeMaxIdx of
    Just idx ->
      let newBanks = S.update idx 0 banks
       in go maxBank (idx + 1) newBanks
    Nothing -> S.empty
  where maxBank = maximum banks
        maybeMaxIdx = S.findIndexL (== maxBank) banks
        go :: Int -> Int -> S.Seq Int -> S.Seq Int
        go 0 _   banks' = banks'
        go x idx banks' =
          if idx == (S.length banks')
          then go (x - 1) 1         (S.adjust (+1) 0   banks')
          else go (x - 1) (idx + 1) (S.adjust (+1) idx banks')
