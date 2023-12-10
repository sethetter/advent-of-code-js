import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import * as p1 from "./part1.ts";
import * as p2 from "./part2.ts";

Deno.test("part1", () => {
  const examples = [
    "0 3 6 9 12 15",
    "1 3 6 10 15 21",
    "10 13 16 21 30 45",
  ].join("\n");
  assertEquals(p1.answer(examples), 114);
});

Deno.test("part2", () => {
  const examples = [
    "0 3 6 9 12 15",
    "1 3 6 10 15 21",
    "10 13 16 21 30 45",
  ].join("\n");
  assertEquals(p2.answer(examples), 2);
});
