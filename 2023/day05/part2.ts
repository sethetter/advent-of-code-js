import { assert } from "https://deno.land/std@0.208.0/assert/mod.ts";

if (import.meta.main) {
  const input = (
    await Deno.readFile("input").then((bytes) =>
      new TextDecoder().decode(bytes),
    )
  ).trim();
  console.log(answer(input));
}

type Range = {
  fromStart: number;
  toStart: number;
  range: number;
};

type MapRanges = {
  from: string;
  to: string;
  ranges: Range[];
};

export function answer(input: string): number {
  const [seedLine, _, ...mapLines] = input.split("\n");
  const seedRanges = seedLine
    .replace("seeds: ", "")
    .split(" ")
    .map((x) => parseInt(x));

  const mapRanges: MapRanges[] = mapLines
    .join("\n")
    .split("\n\n")
    .map((mapLine) => {
      const [fromToLine, ...rangeLines] = mapLine.split("\n");
      const [_, from, to] = fromToLine.match(/([a-z]+)-to-([a-z]+) map/)!;
      const ranges = rangeLines.map((rangeLine) => {
        const [toStart, fromStart, range] = rangeLine
          .split(" ")
          .map((n) => parseInt(n));
        return { fromStart, toStart, range };
      });

      return { from, to, ranges };
    });

  let minLocNum = Infinity;
  for (let i = 0; i < seedRanges.length; i += 2) {
    const from = seedRanges[i];
    const to = from + seedRanges[i + 1];
    for (let j = 0; j < to - from; j++) {
      const seed = seedRanges[i] + j;
      const locNum = getLocationNumber(seed, mapRanges);
      if (locNum < minLocNum) minLocNum = locNum;
    }
  }

  return minLocNum;
}

function getLocationNumber(seed: number, mapRanges: MapRanges[]): number {
  let current = "seed";
  let currentNum = seed;
  while (current !== "location") {
    const mapRange = mapRanges.find(({ from }) => from === current);
    assert(mapRange, `mapRange not found for: ${current}`);

    const range = mapRange.ranges.find(
      (r) => currentNum >= r.fromStart && currentNum <= r.fromStart + r.range,
    );
    if (range) currentNum = currentNum + (range.toStart - range.fromStart);

    current = mapRange.to;
  }
  return currentNum;
}
