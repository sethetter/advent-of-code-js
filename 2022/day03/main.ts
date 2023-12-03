import {
  chunk,
  intersection,
} from "https://raw.githubusercontent.com/lodash/lodash/4.17.21-es/lodash.js";

const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const valForLetter = (l: string): number => letters.indexOf(l) + 1;

export const splitStr = (str: string): [string, string] => {
  if (str.length % 2 !== 0) throw `can't split string of length ${str.length}`;
  return [str.slice(0, str.length / 2), str.slice(str.length / 2)];
};

export const findCommonItem = (s1: string, s2: string): string => {
  const [a1, a2] = [s1.split(""), s2.split("")];
  const found = Array.from(new Set(a1.filter((c: string) => a2.includes(c))));
  if (found.length !== 1) {
    throw `found more than one match: ${
      Array.from(found)
    }; s1: ${s1}; s2: ${s2}`;
  }
  return found[0];
};

if (import.meta.main) {
  const input = await Deno.readTextFile("./input.txt");
  const lines = input.trim().split("\n");

  console.log(
    "part 1:",
    lines.map(splitStr).map(([c1, c2]) => findCommonItem(c1, c2)).map(
      valForLetter,
    ).reduce((sum, x) => sum + x, 0),
  );

  console.log(
    "part 2:",
    chunk(lines, 3).map((
      [e1, e2, e3],
    ) => intersection(e1.split(""), e2.split(""), e3.split(""))).map(
      (common) => {
        if (common.length > 1) throw `found more than one match: ${common}`;
        return common[0];
      },
    ).reduce((sum, x) => sum + valForLetter(x), 0),
  );
}
