import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import * as p1 from "./part1.ts";
import * as p2 from "./part2.ts";

Deno.test("part 1", () => {
  const lines = {
    "1abc2": 12,
    pqr3stu8vwx: 38,
    a1b2c3d4e5f: 15,
    treb7uchet: 77,
  };

  assertEquals(p1.answer(Object.keys(lines)), 142);

  Object.entries(lines).forEach(([line, expected]) => {
    assertEquals(p1.calibrationValue(line), expected);
  });
});

Deno.test("part 2", () => {
  const lines = {
    two1nine: 29,
    eightwothree: 83,
    abcone2threexyz: 13,
    xtwone3four: 24,
    "4nineeightseven2": 42,
    zoneight234: 14,
    "7pqrstsixteen": 76,
    abone40ijone2onefds: 11,
    oneight: 18,
  };

  Object.entries(lines).forEach(([line, expected]) => {
    assertEquals(p2.calibrationValue(line), expected);
  });

  assertEquals(
    p2.answer(Object.keys(lines)),
    Object.values(lines).reduce((sum, x) => sum + x, 0),
  );
});

// Deno.test("frames", () => {
//   assertEquals(p2.frames("abc", 2), ["ab", "bc", "c"]);
// });
