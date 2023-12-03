module AocDay04Spec (main, spec) where


import Test.Hspec
import AocDay04


main :: IO ()
main = hspec spec


spec :: Spec
spec = do

  describe "roomFromString" $ let room = roomFromString "aaaaa-bbb-z-y-x-123[abxyz]" in
    it "extracts info from valid string into room" $ do
      name room `shouldBe` "aaaaa-bbb-z-y-x"
      sector room `shouldBe` 123
      checksum room `shouldBe` "abxyz"

  describe "checkValidRoom" $ let goodRoom = roomFromString "aaaaa-bbb-z-y-x-123[abxyz]"
                                  badRoom  = roomFromString "totally-real-room-200[decoy]" in
    it "returns True for valid room" $ do
      checkValidRoom goodRoom `shouldBe` True
      checkValidRoom badRoom `shouldBe` False

  describe "sectorSumOfValidRooms" $ let rooms = [ roomFromString "aaaaa-bbb-z-y-x-123[abxyz]"
                                                 , roomFromString "uuuuu-bbb-z-y-x-123[ubxyz]"
                                                 , roomFromString "ubuuu-bub-y-z-x-j-f-t-123[ubfjt]"
                                                 , roomFromString "totally-real-room-200[decoy]"
                                                 ] in
    it "returns True for valid room" $
      sectorSumOfValidRooms rooms `shouldBe` 369


  describe "decryptRoomName" $ let room = roomFromString "qzmt-zixmtkozy-ivhz-343[abcde]" in
    it "decrypts a room name" $
      decryptRoomName room `shouldBe` "very encrypted name"

