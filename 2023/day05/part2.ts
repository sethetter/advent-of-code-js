import { assert } from "https://deno.land/std@0.208.0/assert/mod.ts";

if (import.meta.main) {
  const input = (
    await Deno.readFile("input").then((bytes) =>
      new TextDecoder().decode(bytes),
    )
  ).trim();
  console.log(await answer(input));
}

export type Range = {
  fromStart: number;
  toStart: number;
  range: number;
};

export type MapRanges = {
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
  // TODO: see if there are overlapping ranges we can cut down to reduce the amount of work
  // for (const [from, to] of seedRanges) {
  //   for (const [from2, to2] of seedRanges) {
  //     if (from === from2 && to === to2) continue;
  //     if (from >= from2 && )
  //   }
  // }

  const rangeMins: number[] = await Promise.all(
    splitRanges(splitRanges(seedRanges)).map(
      (range) =>
        new Promise((resolve, reject) => {
          const worker = new Worker(
            new URL("./part2-worker.ts", import.meta.url).href,
            {
              type: "module",
            },
          );
          worker.postMessage({ range, mapRanges });
          worker.onmessage = ({ data }) => {
            if (typeof data?.minLocNum !== "number") {
              return reject(new Error(`invalid message: ${data}`));
            }
            return resolve(data.minLocNum);
          };
        }),
    ),
  );

  return Math.min(...rangeMins);
}

function splitRanges(ranges: [number, number][]): [number, number][] {
  const newRanges: [number, number][] = [];
  for (const [from, to] of ranges) {
    const middle = Math.ceil(from + (to - from) / 2);
    newRanges.push([from, middle]);
    newRanges.push([middle + 1, to]);
  }
  return newRanges;
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
