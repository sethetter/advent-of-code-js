import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import * as p1 from "./part1.ts";
import * as p2 from "./part2.ts";

Deno.test("part1", () => {
  const examples = [
    "32T3K 765",
    "T55J5 684",
    "KK677 28",
    "KTJJT 220",
    "QQQJA 483",
  ].join("\n");
  assertEquals(p1.answer(examples), 6440);
});

// Deno.test("part2", () => {
//   const examples = ["abc", "def"].join("\n");
//   assertEquals(p2.answer(examples), 42);
// });
