module Lib
    ( imgStart
    , parseRules
    , stepProgram
    , countOnPixels
    ) where

import Data.List.Split (splitOn)
import Data.List (find, foldl')

imgStart :: [String]
imgStart = [ ".#."
           , "..#"
           , "###"
           ]

stepProgram :: [([String], [String])] -> [String] -> [String]
stepProgram rules program =
  let x = if (mod (length program) 2 == 0) then 2 else 3
      sections = sectionUp x program
   in recombine $ map (map $ findRule rules) $ sections

countOnPixels :: [String] -> Int
countOnPixels = length . filter (== '#') . concat

sectionUp :: Int -> [String] -> [[[String]]]
sectionUp x l = map (\sec ->
                       map (\s ->
                              map (\l' -> take x . snd . splitAt s $ l') sec
                           ) $ init [0,x..(length l)]
                    ) sections
  where sections = map (\s -> (take x . snd . splitAt s) l) $ init [0,x..(length l)]

recombine :: [[[String]]] -> [String]
recombine [] = []
recombine (x:xs) =
  let combinedSection = map (\i -> foldl' (\acc s -> acc ++ (s !! i)) "" x) [0..length (head x) - 1]
   in combinedSection ++ recombine xs

parseRules :: [String] -> [([String], [String])]
parseRules [] = []
parseRules (r:rs) = let match = splitOn "/" . head . splitOn " => " $ r
                        rule = splitOn "/" . last . splitOn " => " $ r
                     in (match, rule) : parseRules rs

findRule :: [([String], [String])] -> [String] -> [String]
findRule rules section =
  case find (\(m, _) -> m `elem` sectionPermutations section) rules of
    Just (_, r) -> r
    Nothing -> []

sectionPermutations :: [String] -> [[String]]
sectionPermutations str =
  (take 4 . iterate rotateSection $ str) ++ (take 4 . iterate rotateSection $ flipSection str)

rotateSection :: [String] -> [String]
rotateSection (x:y:[]) = [(y!!0:x!!0:""), (y!!1:x!!1:"")]
rotateSection (x:y:z:[]) =
  [(z!!0:y!!0:x!!0:""), (z!!1:y!!1:x!!1:""), (z!!2:y!!2:x!!2:"")]
rotateSection _ = []

flipSection :: [String] -> [String]
flipSection (x:y:[]) = [(x!!1:x!!0:""), (y!!1:y!!0:"")]
flipSection (x:y:z:[]) = [(x!!2:x!!1:x!!0:""), (y!!2:y!!1:y!!0:""), (z!!2:z!!1:z!!0:"")]
flipSection _ = []
