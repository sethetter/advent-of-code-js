module Lib
    ( checksumAfterXSteps
    ) where

import qualified Data.Map.Strict as M
import Data.Maybe

checksumAfterXSteps :: Int -> Int
checksumAfterXSteps steps = go 0 'A' 0 $ M.singleton 0 False
  where go :: Int -> Char -> Int -> M.Map Int Bool -> Int
        go step state pos tape
          | step == steps = length $ filter (==True) $ map snd $ M.toList tape
          | otherwise = case state of
            'A' -> let val = fromMaybe False (M.lookup pos tape)
                       newVal = not val
                       newPos = if not val then (pos + 1) else (pos - 1)
                       newState = 'B'
                       newTape = case M.lookup pos tape of
                         Just _ -> M.adjust (\_ -> newVal) pos tape
                         Nothing -> M.insert pos newVal tape
                    in go (step + 1) newState newPos newTape
            'B' -> let val = fromMaybe False (M.lookup pos tape)
                       newVal = val
                       newPos = if not val then (pos + 1) else (pos - 1)
                       newState = if not val then 'C' else 'B'
                       newTape = case M.lookup pos tape of
                         Just _ -> M.adjust (\_ -> newVal) pos tape
                         Nothing -> M.insert pos newVal tape
                    in go (step + 1) newState newPos newTape
            'C' -> let val = fromMaybe False (M.lookup pos tape)
                       newVal = not val
                       newPos = if not val then (pos + 1) else (pos - 1)
                       newState = if not val then 'D' else 'A'
                       newTape = case M.lookup pos tape of
                         Just _ -> M.adjust (\_ -> newVal) pos tape
                         Nothing -> M.insert pos newVal tape
                    in go (step + 1) newState newPos newTape
            'D' -> let val = fromMaybe False (M.lookup pos tape)
                       newVal = True
                       newPos = (pos - 1)
                       newState = if not val then 'E' else 'F'
                       newTape = case M.lookup pos tape of
                         Just _ -> M.adjust (\_ -> newVal) pos tape
                         Nothing -> M.insert pos newVal tape
                    in go (step + 1) newState newPos newTape
            'E' -> let val = fromMaybe False (M.lookup pos tape)
                       newVal = not val
                       newPos = (pos - 1)
                       newState = if not val then 'A' else 'D'
                       newTape = case M.lookup pos tape of
                         Just _ -> M.adjust (\_ -> newVal) pos tape
                         Nothing -> M.insert pos newVal tape
                    in go (step + 1) newState newPos newTape
            'F' -> let val = fromMaybe False (M.lookup pos tape)
                       newVal = True
                       newPos = if not val then (pos + 1) else (pos - 1)
                       newState = if not val then 'A' else 'E'
                       newTape = case M.lookup pos tape of
                         Just _ -> M.adjust (\_ -> newVal) pos tape
                         Nothing -> M.insert pos newVal tape
                    in go (step + 1) newState newPos newTape
            _ -> 0
