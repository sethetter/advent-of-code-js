import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import * as p1 from "./part1.ts";
import * as p2 from "./part2.ts";

// ..F7.
// .FJ|.
// SJ.L7
// |F--J
// LJ...
const examples = ["..F7.", ".FJ|.", "SJ.L7", "|F--J", "LJ..."].join("\n");
const examples2 = [
  "FF7FSF7F7F7F7F7F---7",
  "L|LJ||||||||||||F--J",
  "FL-7LJLJ||||||LJL-77",
  "F--JF--7||LJLJ7F7FJ-",
  "L---JF-JLJ.||-FJLJJ7",
  "|F|F-JF---7F7-L7L|7|",
  "|FFJF7L7F-JF7|JL---7",
  "7-L-JL7||F7|L7F-7F7|",
  "L.L7LFJ|||||FJL7||LJ",
  "L7JLJL-JLJLJL--JLJ.L",
].join("\n");
Deno.test("part1", () => {
  assertEquals(p1.answer(examples), 8);
  assertEquals(p2.answer(examples2), 10);
});

Deno.test("part2", () => {
  assertEquals(p2.answer(examples), 1);
  assertEquals(p2.answer(examples2), 10);
});
