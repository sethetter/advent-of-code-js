module Main where

import AocDay04
import Data.List.Split (splitOn)

main :: IO ()
main = do
  inputStr <- readFile "input.txt"
  let validRooms = filter checkValidRoom $ map roomFromString $ init (splitOn "\n" inputStr)
      validRoomNames = map decryptRoomName validRooms
   in putStr $ "Sector sum of valid rooms: " ++ show (sectorSumOfValidRooms validRooms) ++ "\n\n" ++
     "Names: \n\n" ++ show (zip validRoomNames $ map sector validRooms) ++ "\n"
