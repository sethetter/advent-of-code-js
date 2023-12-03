module Lib
    ( spinlockValues
    ) where

import qualified Data.Sequence as S

type SpinlockValues = S.Seq Int

spinlockValues :: Int -> Int -> SpinlockValues
spinlockValues steps m = go 1 0 $ S.singleton 0
  where go :: Int -> Int -> SpinlockValues -> SpinlockValues
        go step pos vals
          | step == (m + 1) = vals
          | otherwise       = let (newVals, newPos) = insertVal step steps pos vals
                               in go (step + 1) newPos newVals

insertVal :: Int -> Int -> Int -> SpinlockValues -> (SpinlockValues, Int)
insertVal step steps pos vals =
  let realSteps = rem steps $ length vals
      insertPos = case pos + realSteps > length vals of
        True  -> (pos + realSteps) - length vals
        False -> pos + realSteps
      newVals   = S.insertAt insertPos step vals
   in (newVals, insertPos + 1)
