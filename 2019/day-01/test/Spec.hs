module Spec where

import Test.Hspec
import Lib

run :: IO ()
run = hspec $ do

  describe "fuelFromMass" $ do
    it "calculates fuel from mass" $ do
      fuelFromMass 1969 `shouldBe` 654
      fuelFromMass 100756 `shouldBe` 33583

  describe "addRemainingFuel" $ do
    it "recursively adds the necessary remaining fuel" $ do
      addRemainingFuel 2 `shouldBe` 2
      addRemainingFuel 654 `shouldBe` 966
