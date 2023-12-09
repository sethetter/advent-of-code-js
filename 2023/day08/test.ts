import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import * as p1 from "./part1.ts";
import * as p2 from "./part2.ts";

Deno.test("part1", () => {
  const examples = [
    "RL",
    "",
    "AAA = (BBB, CCC)",
    "BBB = (DDD, EEE)",
    "CCC = (ZZZ, GGG)",
    "DDD = (DDD, DDD)",
    "EEE = (EEE, EEE)",
    "GGG = (GGG, GGG)",
    "ZZZ = (ZZZ, ZZZ)",
  ].join("\n");
  const examples2 = [
    "LLR",
    "",
    "AAA = (BBB, BBB)",
    "BBB = (AAA, ZZZ)",
    "ZZZ = (ZZZ, ZZZ)",
    "EEE = (EEE, EEE)",
    "GGG = (GGG, GGG)",
    "ZZZ = (ZZZ, ZZZ)",
  ].join("\n");
  assertEquals(p1.answer(examples), 2);
  assertEquals(p1.answer(examples2), 6);
});

Deno.test("part2", () => {
  const examples = [
    "LR",
    "",
    "11A = (11B, XXX)",
    "11B = (XXX, 11Z)",
    "11Z = (11B, XXX)",
    "22A = (22B, XXX)",
    "22B = (22C, 22C)",
    "22C = (22Z, 22Z)",
    "22Z = (22B, 22B)",
    "XXX = (XXX, XXX)",
  ].join("\n");
  assertEquals(p2.answer(examples), BigInt(6));
});
