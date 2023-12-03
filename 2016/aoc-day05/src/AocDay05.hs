module AocDay05
  ( passForDoor
  , buildPassword
  , buildPassword2
  , getHash
  , putCharAt
  ) where

import Data.Digest.Pure.MD5
import Data.ByteString.Lazy.Char8 (pack)
import Control.Lens.Traversal
import Control.Lens.Operators     ((.~))
import Text.Read


type BuildFunction = (String -> String -> String -> Int -> String)

passForDoor :: String -> String -> BuildFunction -> String
passForDoor door start buildFunc = buildFunc door "" start 0


buildPassword :: String -> String -> String -> Int -> String
buildPassword door currentHash password index
  | length password == 8 = password
  | otherwise =
    let nextHash  = getHash door (index + 1)
        sixthChar = (last . take 6) currentHash
        nextIndex = index + 1
     in if take 5 currentHash == "00000"
           then buildPassword door nextHash (password ++ [sixthChar]) nextIndex
           else buildPassword door nextHash password nextIndex


buildPassword2 :: String -> String -> String -> Int -> String
buildPassword2 door currentHash password index
  | length (filter (=='-') password) == 0 = password
  | otherwise =
    let nextHash  = getHash door (index + 1)
        nextIndex = index + 1
     in if take 5 currentHash == "00000"
           then let sixthChar     = (last . take 6) currentHash
                    seventhChar   = (last . take 7) currentHash
                    maybePosition = readMaybe [sixthChar] :: Maybe Int
                 in case maybePosition of
                      Nothing  -> buildPassword2 door nextHash password nextIndex
                      Just pos ->
                        let nextPassword =
                              if pos < 8 && (password !! pos) == '-'
                                 then putCharAt seventhChar pos password
                                 else password
                         in buildPassword2 door nextHash nextPassword nextIndex
           else buildPassword2 door nextHash password nextIndex


putCharAt :: Char -> Int -> String -> String
putCharAt char index str = (element index .~ char) str


getHash :: String -> Int -> String
getHash id i = show $ md5 $ pack $ id ++ show i

