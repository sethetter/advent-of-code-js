module Lib
    ( findBottomProgram
    , buildProgramTower
    , findImbalancedProgram
    ) where

import Data.List.Split
import Data.List

data Program = Program String Int [Program]

findBottomProgram :: [String] -> String
findBottomProgram input =
  let programs = map programParts input
      psWithChildren = nub . concat $ map (\(_, _, parents) -> parents) programs
      names = map (\(name, _, _) -> name) programs
   in head $ names \\ psWithChildren

programParts :: String -> (String, Int, [String])
programParts s = let name = head . words $ s
                     weight = getWeightFromStr s
                     parents = splitOn ", " . last . splitOn " -> " $ s
                  in (name, weight, parents)

getWeightFromStr :: String -> Int
getWeightFromStr s = read (last . splitOn "(" . head . splitOn ")" $ s) :: Int

getWeightFromProgram :: Program -> Int
getWeightFromProgram (Program _ w _) = w

findByName :: String -> [(String, Int, [String])] -> Maybe (String, Int, [String])
findByName name = find (\(n, _, _) -> n == name)

parseProgramNode :: String -> [(String, Int, [String])] -> Program
parseProgramNode currentName programs =
  let (_, weight, pNames) = case findByName currentName programs of
        Nothing -> ("", 0, [])
        Just p -> p
   in Program currentName weight (map (\n -> parseProgramNode n programs) pNames)

buildProgramTower :: [String] -> Program
buildProgramTower input =
  let programs = map programParts input
      bottomName = findBottomProgram input
      (_, weight, pNames) = case findByName bottomName programs of
        Nothing -> ("", 0, [])
        Just p -> p
   in Program bottomName weight (map (\n -> parseProgramNode n programs) pNames)

calculateProgramWeight :: Program -> Int
calculateProgramWeight (Program _ w []) = w
calculateProgramWeight (Program n w ps) =
  w + (sum . map calculateProgramWeight $ ps)

-- Returns weights of found imbalanced program
findImbalancedProgram :: Program -> ([Int], Maybe Int)
findImbalancedProgram (Program _ _ []) = ([], Nothing)
findImbalancedProgram (Program _ _ ps) =
  let pWeights = map calculateProgramWeight ps
      mUniqueWeightIdx = findUniqueOccurenceIdx pWeights
   in case mUniqueWeightIdx of
      Just i -> let imbalancedNode = ps !! i
                 in case snd . findImbalancedProgram $ imbalancedNode of
                      Nothing -> (pWeights, Just (getWeightFromProgram imbalancedNode))
                      Just _ -> findImbalancedProgram imbalancedNode
      Nothing -> (concat $ map (fst . findImbalancedProgram) ps, Nothing)

findUniqueOccurenceIdx :: [Int] -> Maybe Int
findUniqueOccurenceIdx ints =
  if length (nub ints) /= 1
  then if length uniqueIndex == 1
       then Just (head . head $ uniqueIndex)
       else Nothing
  else Nothing
  where indices = map (\u -> elemIndices u ints) $ nub ints
        uniqueIndex = filter (\is -> length is == 1) indices
