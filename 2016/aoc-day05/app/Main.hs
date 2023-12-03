module Main where

import AocDay05

main :: IO ()
main = putStr $ "Password2: " ++ (passForDoor "uqwqemis" "--------" buildPassword2) ++ "\n\n"
