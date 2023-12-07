import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import * as p1 from "./part1.ts";
import * as p2 from "./part2.ts";

Deno.test("part1", () => {
  const examples = ["Time:      7  15   30", "Distance:  9  40  200"].join(
    "\n",
  );
  assertEquals(p1.answer(examples), 288);
});

Deno.test("part2", () => {
  const examples = ["abc", "def"].join("\n");
  assertEquals(p2.answer(examples), 42);
});
