module AocDay03Spec (main, spec) where


import Test.Hspec
import Test.QuickCheck

import AocDay03


main :: IO ()
main = hspec spec


spec :: Spec
spec = do
  describe "validTrangle" $ do
    it "returns True for valid triangle sides" $ do
      validTriangle [5, 6, 10] `shouldBe` True
      validTriangle [10, 6, 5] `shouldBe` True
      validTriangle [3, 2, 3] `shouldBe` True

    it "returns False from invalid triangle sides" $ do
      validTriangle [5, 10, 25] `shouldBe` False
      validTriangle [10, 5, 30] `shouldBe` False

  describe "lineToSides" $
    it "splits a line on spaces into a Sides tuple" $ do
      lineToSides "  34   456  23  " `shouldBe` [34, 456, 23]
      lineToSides "34 46  23 " `shouldBe` [34, 46, 23]
      lineToSides " 34     46  23" `shouldBe` [34, 46, 23]

  describe "sideListToColumnGroups" $ do
    it "switches row groups to column groups" $ do
      sideListToColumnGroups [[1,1,1], [2,2,2], [3,3,3]] `shouldBe` [[1,2,3], [1,2,3], [1,2,3]]
      sideListToColumnGroups [[4,4,4], [2,2,2], [3,3,3]] `shouldBe` [[4,2,3], [4,2,3], [4,2,3]]

    it "ignores trailing groups of < 3" $ do
      sideListToColumnGroups [[1,1,1], [2,2,2], [3,3,3], [9,9,9]] `shouldBe` [[1,2,3], [1,2,3], [1,2,3]]
      sideListToColumnGroups [[4,4,4], [2,2,2], [3,3,3], [9,9,9], [0,0,0]] `shouldBe` [[4,2,3], [4,2,3], [4,2,3]]
