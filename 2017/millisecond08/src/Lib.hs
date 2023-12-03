module Lib
    ( processInstructions
    , findLargestValue
    , largestEver
    ) where

import qualified Data.Map.Strict as M

type Instruction = (String, (Int -> Int), String, (Int -> Bool))
type RegisterMap = M.Map String Int

processInstructions :: [String] -> RegisterMap
processInstructions strs =
  let instructions = map parseInstruction strs
   in foldl updateRegisters (M.singleton "MAX" 0) instructions

findLargestValue :: RegisterMap -> Int
findLargestValue m = maximum . map snd . M.toList $ m

largestEver :: RegisterMap -> Int
largestEver m = case M.lookup "MAX" m of
  Just x -> x
  Nothing -> 0

updateRegisters :: RegisterMap -> Instruction -> RegisterMap
updateRegisters m (target, operation, testTarget, test) =
  let testValue = getRegisterValue testTarget m
      targetValue = getRegisterValue target m
      registerMap = if testValue == 0 then M.insert testTarget 0 m else m
      registerMap' = if targetValue == 0 then M.insert target 0 registerMap else registerMap
   in if test $ getRegisterValue testTarget registerMap'
      then let newMap = M.adjust operation target registerMap'
            in M.adjust (\_ -> findLargestValue newMap) "MAX" newMap
      else registerMap'

getRegisterValue :: String -> RegisterMap -> Int
getRegisterValue register m = case M.lookup register m of
  Just x -> x
  Nothing -> 0

parseInstruction :: String -> Instruction
parseInstruction str =
  let target = head . words $ str
      testTarget = words str !! 4
   in (target, parseOperation str, testTarget, parseTest str)

parseOperation :: String -> (Int -> Int)
parseOperation str =
  let opStr = head . drop 1 $ words str
      amt = read (head . drop 2 $ words str) :: Int
   in case opStr of
    "inc" -> (+) amt
    "dec" -> (\x -> x - amt)
    otherwise -> id

parseTest :: String -> (Int -> Bool)
parseTest str =
  let opStr = words str !! 5
      amt = read (words str !! 6) :: Int
   in case opStr of
    "==" -> (== amt)
    "!=" -> (/= amt)
    ">" -> (> amt)
    ">=" -> (>= amt)
    "<" -> (< amt)
    "<=" -> (<= amt)
    otherwise -> (\_ -> False)
