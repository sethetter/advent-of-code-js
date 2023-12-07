import { assert } from "https://deno.land/std@0.208.0/assert/assert.ts";

if (import.meta.main) {
  const input = (
    await Deno.readFile("input").then((bytes) =>
      new TextDecoder().decode(bytes),
    )
  ).trim();
  console.log(answer(input));
}

export function answer(input: string): number {
  const [raceDurations, records] = input.split("\n").map((l) => {
    return l
      .split(/\s+/)
      .slice(1)
      .map((x) => parseInt(x));
  });

  let errorMargin = 1;
  for (let i = 0; i < raceDurations.length; i++) {
    const [min, max] = minMaxHoldsToWin(raceDurations[i], records[i]);
    errorMargin *= max - min + 1;
  }

  return errorMargin;
}

function minMaxHoldsToWin(
  raceDuration: number,
  record: number,
): [number, number] {
  let min = 0;
  let max = 0;
  for (let hold = 0; hold < raceDuration; hold++) {
    const distance = hold * (raceDuration - hold);
    if (min === 0 && distance > record) min = hold;
    if (min !== 0 && distance > record) max = hold;
    if (min !== 0 && max !== 0 && distance < record) break;
  }
  return [min, max];
}
