module AocDay05Spec (main, spec) where

import Test.Hspec
import Test.QuickCheck

import AocDay05


main :: IO ()
main = hspec spec


spec :: Spec
spec = do

  describe "getHash" $
    it "gets the hash" $
      getHash "abc" 3231929 `shouldBe` "00000155f8105dff7f56ee10fa9b9abd"

  describe "passForDoor" $
    it "gets the right password" $
      passForDoor "abc" `shouldBe` "18f47a30"
