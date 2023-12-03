module Lib
    ( howManyMuls
    ) where

import qualified Data.Map.Strict as M

type Registers = M.Map Char Int
type RQITuple = (Int, [Int], Registers)

initRegisters :: Registers
initRegisters = M.fromList
  [ ('a', 0)
  , ('b', 0)
  , ('c', 0)
  , ('d', 0)
  , ('e', 0)
  , ('f', 0)
  , ('g', 0)
  , ('h', 0)
  ]

howManyMuls :: [String] -> Int
howManyMuls instructions = go 0 (0, [], initRegisters)
  where outOfBounds :: Int -> Bool
        outOfBounds i = i < 0 || i >= length instructions

        doJnz :: RQITuple -> RQITuple
        doJnz (i, q, r) =
          let v = getVorR 1 (instructions !! i) r
           in if v == 0 then (i + 1, q, r)
                        else let offset = getVorR 2 (instructions !! i) r
                              in (i + offset, q, r)

        go :: Int -> RQITuple -> Int
        go mulCount p@(i, _, _)
          -- p1 clear to proceed
          | not (outOfBounds i) = case head $ words (instructions !! i) of
              "jnz" -> go mulCount (doJnz p)
              _     -> let operation = parseOp (instructions !! i)
                           isMul = (head $ words (instructions !! i)) == "mul"
                        in go (if isMul then mulCount + 1 else mulCount) (operation p)
          | otherwise = mulCount


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
  "sub" -> doOp (-) (getR str) (getVorR 2 str registers) p
  "mul" -> doOp (*) (getR str) (getVorR 2 str registers) p
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
