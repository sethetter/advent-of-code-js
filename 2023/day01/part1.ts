const codePoint = (c: string): number => {
  const cp = c.codePointAt(0);
  if (!cp) throw new Error(`no code point at 0: ${c}`);
  return cp;
};
const numCodePoints = "01234567890".split("").map(codePoint);

export const calibrationValue = (line: string) => {
  const ints = line
    .split("")
    .filter((c) => numCodePoints.includes(codePoint(c)));
  const numStr = `${ints[0]}${ints[ints.length - 1]}`;
  return parseInt(numStr);
};

export const answer = (lines: string[]): number =>
  lines.map(calibrationValue).reduce((sum, x) => sum + x, 0);

if (import.meta.main) {
  const input = await Deno.readFile("input").then((bytes) =>
    new TextDecoder().decode(bytes),
  );
  const lines = input.trim().split("\n");
  console.log(answer(lines));
}
