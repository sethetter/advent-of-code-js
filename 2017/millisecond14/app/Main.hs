module Main where

import Lib

main :: IO ()
main = let disk = diskFromKey "vbqugkhl"
           -- onBits = countOnBits disk
           regions = countRegions disk
        in print regions
