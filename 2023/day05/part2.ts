import { assert } from "https://deno.land/std@0.208.0/assert/mod.ts";

if (import.meta.main) {
  const input = (
    await Deno.readFile("input").then((bytes) =>
      new TextDecoder().decode(bytes),
    )
  ).trim();
  console.log(await answer(input));
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

export async function answer(input: string): Promise<number> {
  const [seedLine, _, ...mapLines] = input.split("\n");
  const seedRangeLines = seedLine
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

  const seedRanges: [number, number][] = [];
  for (let i = 0; i < seedRangeLines.length; i += 2) {
    const from = seedRangeLines[i];
    const to = from + seedRangeLines[i + 1];
    seedRanges.push([from, to]);
  }
  const rangeMins = await Promise.all(
    seedRanges.map(
      ([from, to]) =>
        new Promise<number>((resolve) => {
          let minLocNum = Infinity;
          for (let j = 0; j < to - from; j++) {
            const seed = from + j;
            const locNum = getLocationNumber(seed, mapRanges);
            if (locNum < minLocNum) minLocNum = locNum;
          }
          return resolve(minLocNum);
        }),
    ),
  );

  return Math.min(...rangeMins);
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
