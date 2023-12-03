module AocDay01Spec (main, spec) where

import AocDay01
import Test.Hspec

main :: IO ()
main = hspec spec

spec :: Spec
spec = do

  describe "navigateFromStr - single instructions" $ do
    it "handles right turn with single digits" $
      let instructions = "R5"
          finalStatus  = last $ navigateFromStr instructions
       in showStatus finalStatus `shouldBe` "(5, 0), Facing: East\n"
    it "handles right turn with double digits" $
      let instructions = "R52"
          finalStatus  = last $ navigateFromStr instructions
       in showStatus finalStatus `shouldBe` "(52, 0), Facing: East\n"
    it "handles left turn with single digits" $
      let instructions = "L2"
          finalStatus  = last $ navigateFromStr instructions
       in showStatus finalStatus `shouldBe` "(-2, 0), Facing: West\n"
    it "handles left turn with double digits" $
      let instructions = "L25"
          finalStatus  = last $ navigateFromStr instructions
       in showStatus finalStatus `shouldBe` "(-25, 0), Facing: West\n"

  describe "navigateFromStr - circles" $ do
    it "handles going in a circle to the right" $
      let instructions = "R5, R5, R5, R5"
          finalStatus = last $ navigateFromStr instructions
       in showStatus finalStatus `shouldBe` "(0, 0), Facing: North\n"
    it "handles going in a circle to the left" $
      let instructions = "L5, L5, L5, L5"
          finalStatus = last $ navigateFromStr instructions
       in showStatus finalStatus `shouldBe` "(0, 0), Facing: North\n"

  describe "navigateFromStr - test input from AoC" $
    it "handles R5, L5, R5, R3" $
      let instructions = "R5, L5, R5, R3"
          history = navigateFromStr instructions
          finalStatus = last history
       in showStatus finalStatus `shouldBe` "(10, 2), Facing: South\n"

  describe "showFirstVisitedTwice" $
    it "does what it's supposed to do" $
      let instructions = "R8, R4, R4, R8"
          history = navigateFromStr instructions
       in showFirstVisitedTwice history `shouldBe` "First visited twice: (4, 0)\n"
