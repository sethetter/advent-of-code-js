import { assertEquals } from "https://deno.land/std@0.165.0/testing/asserts.ts";
import { findCommonItem, splitStr } from "./main.ts";

const testInput = `
vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
`.trim();

Deno.test(function splitStrTest() {
  assertEquals(splitStr("1234"), ["12", "34"]);
});

Deno.test(function foundCommonItmeTest() {
  assertEquals(findCommonItem(...splitStr("vJrwpWtwJgWrhcsFMMfFFhFp")), "p");
});
