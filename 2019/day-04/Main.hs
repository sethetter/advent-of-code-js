import Data.Char (digitToInt)

validPasswords :: Int -> Int -> [Int]
validPasswords l u = filter isValid [l..u]

isValid :: Int -> Bool
-- isValid p = onlyIncreases digits && hasDouble digits -- Part 1
isValid p = onlyIncreases digits && hasStrictDouble digits -- Part 2
  where digits = map digitToInt . show $ p

-- Part 1
hasDouble :: [Int] -> Bool
hasDouble is = foldr (\i p -> p || is!!i == is!!(i+1)) False [0..(length is)-2]

-- Part 2
hasStrictDouble :: [Int] -> Bool
hasStrictDouble is = go 0
  where go :: Int -> Bool
        go i
          | i >= (length is) - 1 = False
          | (consecOccurs (is!!i) $ drop i is) == 2 = True
          | otherwise = go $ i + (consecOccurs (is!!i) $ drop i is)

consecOccurs :: Int -> [Int] -> Int
consecOccurs x = length . takeWhile (== x)

onlyIncreases :: [Int] -> Bool
onlyIncreases is = foldr (\i p -> p && is!!i >= is!!(i-1)) True [1..(length is)-1]

main :: IO ()
main = putStrLn $ show $ length (validPasswords 137683 596253)
