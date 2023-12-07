if (import.meta.main) {
  const input = (
    await Deno.readFile("input").then((bytes) =>
      new TextDecoder().decode(bytes),
    )
  ).trim();
  console.log(answer(input));
}

export function answer(input: string): number {
  const [raceDuration, record] = input
    .split("\n")
    .map((l) => parseInt(l.split(/\s+/).slice(1).join("")));
  const [min, max] = minMaxHoldsToWin(raceDuration, record);
  return max - min + 1;
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
