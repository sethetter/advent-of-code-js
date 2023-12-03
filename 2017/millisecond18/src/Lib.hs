module Lib
    ( howManyDidP1Send
    ) where

import qualified Data.Map.Strict as M

type Registers = M.Map Char Int
type RQITuple = (Int, [Int], Registers)

howManyDidP1Send :: [String] -> Int
howManyDidP1Send instructions = go 0 (0, [], M.singleton 'p' 0) (0, [], M.singleton 'p' 1)
  where outOfBounds :: Int -> Bool
        outOfBounds i = i < 0 || i >= length instructions

        waiting :: RQITuple -> Bool
        waiting (i, [], _) = (head $ words (instructions !! i)) == "rcv"
        waiting (_, _, _)  = False

        doRcv :: RQITuple -> RQITuple
        doRcv (i, [], r) = (i, [], r)
        doRcv (i, q:qs, r) = doSet (getR (instructions !! i)) q (i, qs, r)

        doJgz :: RQITuple -> RQITuple
        doJgz (i, q, r) =
          let v = getVorR 1 (instructions !! i) r
           in if v <= 0 then (i + 1, q, r)
                        else let offset = getVorR 2 (instructions !! i) r
                              in (i + offset, q, r)

        go :: Int -> RQITuple -> RQITuple -> Int
        go p1count p1@(i1, q1, r1) p2@(i2, q2, r2)
          -- p1 clear to proceed
          | not (waiting p1) && not (outOfBounds i1)  = case head $ words (instructions !! i1) of
              "snd" -> let r = head $ words (instructions !! i1) !! 1
                           v = M.findWithDefault 0 r r1
                        in go p1count (i1 + 1, q1, r1) (i2, q2 ++ [v], r2)
              "rcv" -> go p1count (doRcv p1) p2
              "jgz" -> go p1count (doJgz p1) p2
              _     -> let operation = parseOp (instructions !! i1)
                        in go p1count (operation p1) p2

          -- p2 clear to proceed
          | not (waiting p2) && not (outOfBounds i2) = case head $ words (instructions !! i2) of
              "snd" -> let r = head $ words (instructions !! i2) !! 1
                           v = M.findWithDefault 0 r r2
                        in go (p1count + 1) (i1, q1 ++ [v], r1) (i2 + 1, q2, r2)
              "rcv" -> go p1count p1 (doRcv p2)
              "jgz" -> go p1count p1 (doJgz p2)
              _     -> let operation = parseOp (instructions !! i2)
                        in go p1count p1 (operation p2)

          | otherwise = p1count


getR :: String -> Char
getR i = head $ (words i) !! 1

getVorR :: Int -> String -> Registers -> Int
getVorR idx i registers =
  let wrd = (words i) !! idx
   in if (head wrd) `elem` ['a'..'z'] then M.findWithDefault 0 (head wrd) registers
                                      else strToInt wrd

parseOp :: String -> RQITuple -> RQITuple
parseOp str p@(_, _, registers) = case head $ words str of
  "set" -> doSet (getR str) (getVorR 2 str registers) p
  "add" -> doOp (+) (getR str) (getVorR 2 str registers) p
  "mul" -> doOp (*) (getR str) (getVorR 2 str registers) p
  "mod" -> doOp mod (getR str) (getVorR 2 str registers) p
  _     -> p

doSet :: Char -> Int -> RQITuple -> RQITuple
doSet r v (i, q, registers) =
  if M.member r registers then (i + 1, q, M.adjust (\_ -> v) r registers)
                          else (i + 1, q, M.insert r v registers)

doOp :: (Int -> Int -> Int) -> Char -> Int -> RQITuple -> RQITuple
doOp op r v (i, q, registers) =
  case M.lookup r registers of
    Just _  -> (i + 1, q, M.adjust (\x -> op x v) r registers)
    Nothing -> (i + 1, q, M.insert r (op 0 v) registers)

strToInt :: String -> Int
strToInt s = (read s :: Int)
