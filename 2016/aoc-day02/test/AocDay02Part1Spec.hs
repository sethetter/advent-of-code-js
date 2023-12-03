module AocDay02Part1Spec (main, spec) where

import Test.Hspec
import Test.QuickCheck

import Data.List.Split

import AocDay02Part1

-- `main` is here so that this module can be run from GHCi on its own.  It is
-- not needed for automatic spec discovery.
main :: IO ()
main = hspec spec

spec :: Spec
spec = let start = locationFromNum 5 in do
  describe "locationFromLine" $ do
   it "handles single lines" $ do
     locationFromLine start "U" `shouldBe` (1, 0)
     locationFromLine start "D" `shouldBe` (1, 2)
     locationFromLine start "L" `shouldBe` (0, 1)
     locationFromLine start "R" `shouldBe` (2, 1)

   it "ignores unknown characters" $ do
     locationFromLine start "X" `shouldBe` (1, 1)
     locationFromLine start "*" `shouldBe` (1, 1)

   it "handles multiple moves" $ do
     locationFromLine start "X" `shouldBe` (1, 1)
     locationFromLine start "UL" `shouldBe` (0, 0)
     locationFromLine start "DR" `shouldBe` (2, 2)

  describe "codeFromLines" $ do
    it "handles single lines" $ do
      codeFromLines ["UL"] `shouldBe` "1"
      codeFromLines ["DR"] `shouldBe` "9"

    it "handles two lines" $ do
      codeFromLines ["DR", "LL"] `shouldBe` "97"
      codeFromLines ["UL", "RRR"] `shouldBe` "13"

    it "handles example input from AoC" $
      let lines = "ULL\nRRDDD\nLURDL\nUUUUD"
       in codeFromLines (splitOn "\n" lines) `shouldBe` "1985"
