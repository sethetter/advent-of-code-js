import { assert } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { MapRanges } from "./part2.ts";

type MessageData = {
  range: [number, number];
  mapRanges: MapRanges[];
};

self.onmessage = ({ data: { range, mapRanges } }: { data: MessageData }) => {
  const [from, to] = range;
  console.log(`(start) worker ${from}-${to}`);
  let minLocNum = Infinity;
  for (let j = 0; j < to - from; j++) {
    const seed = from + j;
    const locNum = getLocationNumber(seed, mapRanges);
    if (locNum < minLocNum) minLocNum = locNum;
  }
  self.postMessage({ minLocNum });
  console.log(`(end) worker ${from}-${to}: ${minLocNum}`);
  self.close();
};

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
