module AocDay07
  ( containsAbba
  , findAllAba
  , containsBabMatchForAba
  , getNonHvsStrings
  , findAllHvs
  , supportsTLS
  , supportsSLS
  ) where

import Text.Regex.PCRE
import Data.List.Split
import Data.List        (foldl', isInfixOf)


supportsTLS :: String -> Bool
supportsTLS input =
  let hvSequences       = findAllHvs input
      nonHvsParts       = getNonHvsStrings input hvSequences []
      abbaFoundInHvs    = any containsAbba hvSequences
      abbaFoundInNonHvs = any containsAbba nonHvsParts
   in abbaFoundInNonHvs && not abbaFoundInHvs


-- TODO: Reverse this, search for ALL ABA's in nonHsParts, then loop through
-- them and search for a matching BAB in the hvs parts.
supportsSLS :: String -> Bool
supportsSLS input =
  let hvSequences       = findAllHvs input
      nonHvsParts       = getNonHvsStrings input hvSequences []
      allAbaInNonHvs    = foldl' findAllAba [] nonHvsParts
   in or $ fmap (containsBabForAnyAba allAbaInNonHvs) hvSequences


getNonHvsStrings :: String -> [String] -> [String] -> [String]
getNonHvsStrings input [] result         = result ++ [input]
getNonHvsStrings input (hvs:rest) result =
  getNonHvsStrings (last $ splitOn hvs input) rest $ result ++ [head $ splitOn hvs input]


findAllHvs :: String -> [String]
findAllHvs str = getAllTextMatches (str =~ "\\[(.*?)\\]" :: AllTextMatches [] String)


containsAbba :: String -> Bool
containsAbba [] = False
containsAbba (a : b : xs)
  | (a : [b]) == (reverse . take 2) xs && a /= b = True
  | otherwise = containsAbba (b : xs)
containsAbba (a : xs) = False


-- Returns (True, "bab") or (False, input)
findAllAba :: [String] -> String -> [String]
findAllAba found [] = found
findAllAba found (a : b : c : xs)
  | a == c    = findAllAba (found ++ [[a,b,c]]) (b : c : xs)
  | otherwise = findAllAba found (b : c : xs)
findAllAba found (a : b : xs) = found


containsBabForAnyAba :: [String] -> String -> Bool
containsBabForAnyAba abas str = any (containsBabMatchForAba str) abas

containsBabMatchForAba :: String -> String -> Bool
containsBabMatchForAba str bab =
  let aba = head (tail bab) : head bab : [head (tail bab)]
   in isInfixOf aba str
