/**
 * This was where I reverse engineered the assembly steps into
 * JS so I could inspect values along the way.
 *
 * The translated version of this in haskell is in /millisecond23/app/Main.hs
 */

let b = 0
let c = 0
let d = 0
let e = 0
let f = 0
let g = 0
let h = 0

// for numbers `b`, in steps of 17 from b to b+17000
for (b = 108400; b < b + 17000; b += 17) {
  f = 1

  // Check if any two numbers between 2..b == b, meaning *not* prime
  for (d = 2; d - b !== 0; d++) {
    for (e = 2; e - b !== 0; e++) {
      if (d * e - b == 0) {
        f = 0
      }
    }
  }

  // If not prime, add 1 to h
  if (!f) h+= 1

  b += 17
}

console.log(h) // Obviously this didn't run to completion..
