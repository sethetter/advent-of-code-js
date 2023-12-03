module AocDay02Part2Spec (main, spec) where

import Test.Hspec
import Test.QuickCheck

import Data.List.Split

import AocDay02Part2

-- `main` is here so that this module can be run from GHCi on its own.  It is
-- not needed for automatic spec discovery.
main :: IO ()
main = hspec spec

spec :: Spec
spec = let start = locationFromChar '5' in do
  describe "locationFromLine" $ do
   it "handles single lines" $ do
     locationFromLine start "U" `shouldBe` (0, 2)
     locationFromLine start "D" `shouldBe` (0, 2)
     locationFromLine start "L" `shouldBe` (0, 2)
     locationFromLine start "R" `shouldBe` (1, 2)

   it "ignores unknown characters" $ do
     locationFromLine start "X" `shouldBe` (0, 2)
     locationFromLine start "*" `shouldBe` (0, 2)

   it "handles multiple moves" $ do
     locationFromLine start "X" `shouldBe` (0, 2)
     locationFromLine start "RR" `shouldBe` (2, 2)
     locationFromLine start "RRUUU" `shouldBe` (2, 0)
     locationFromLine start "RRUUUL" `shouldBe` (2, 0)

  describe "codeFromLines" $ do
    it "handles single lines" $ do
      codeFromLines ["UL"] `shouldBe` "5"
      codeFromLines ["RRRU"] `shouldBe` "4"

    it "handles two lines" $ do
      codeFromLines ["UL", "RRRU"] `shouldBe` "54"
      codeFromLines ["RD", "RRRULUU"] `shouldBe` "A1"

    it "handles example input from AoC" $
      let lines = "ULL\nRRDDD\nLURDL\nUUUUD"
       in codeFromLines (splitOn "\n" lines) `shouldBe` "5DB3"
