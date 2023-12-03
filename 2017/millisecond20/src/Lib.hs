module Lib
    ( parseParticles
    , closestToZeroOverXSteps
    , stepParticles
    , removeCollisions
    ) where

import Data.List.Split (splitOn)
import Data.List

data Particle = Particle
  { pos :: (Int, Int, Int)
  , vel :: (Int, Int, Int)
  , acc :: (Int, Int, Int)
  } deriving (Eq, Show)

parseParticles :: [String] -> [Particle]
parseParticles = map parseParticle

stepParticles :: [Particle] -> [Particle]
stepParticles = map stepParticle

closestToZeroOverXSteps :: Int -> [Particle] -> Int
closestToZeroOverXSteps steps = go 0 []
  where getMostOccurring = head . maximumBy (\x y -> compare (length x) (length y)) . group . sort
        go :: Int -> [Int] -> [Particle] -> Int
        go step maxes particles
          | step == steps = getMostOccurring maxes
          | otherwise = go (step + 1) (closestToZero particles : maxes) (stepParticles particles)

removeCollisions :: [Particle] -> [Particle]
removeCollisions = concat . filter (\g -> length g == 1) . groupBy collidesWith

collidesWith :: Particle -> Particle -> Bool
collidesWith Particle { pos = p1 }
             Particle { pos = p2 }
  = p1 == p2

closestToZero :: [Particle] -> Int
closestToZero [] = -1
closestToZero (p:ps) = go (0, distanceToZero p) 1 ps
  where go :: (Int, Int) -> Int -> [Particle] -> Int
        go (i, _) _  []           = i
        go (i, d) ci (p':ps')
          | distanceToZero p' < d = go (ci, distanceToZero p') (ci + 1) ps'
          | otherwise             = go (i, d) (ci + 1) ps'

distanceToZero :: Particle -> Int
distanceToZero Particle { pos = (x, y, z) } = abs x + abs y + abs z

stepParticle :: Particle -> Particle
stepParticle Particle { pos = (px, py, pz)
                      , vel = (vx, vy, vz)
                      , acc = (ax, ay, az)
                      } =
  Particle { pos = (px + (vx + ax), py + (vy + ay), pz + (vz + az))
           , vel = (vx + ax, vy + ay, vz + az)
           , acc = (ax, ay, az) }

parseParticle :: String -> Particle
parseParticle str =
  let parts = splitOn ", " str
      p = parseXYZ $ parts !! 0
      v = parseXYZ $ parts !! 1
      a = parseXYZ $ parts !! 2
   in Particle { pos = p, vel = v, acc = a }

parseXYZ :: String -> (Int, Int, Int)
parseXYZ str =
  let parts = map strToInt . splitOn "," . last . splitOn "=<" $ init str
   in (parts !! 0, parts !! 1, parts !! 2)

strToInt :: String -> Int
strToInt s = (read s :: Int)
