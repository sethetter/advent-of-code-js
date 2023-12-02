const digitWords = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];
const digits = "123456789".split("");
const wordsAndDigits = [...digitWords, ...digits];
const frameSize = Math.max(...wordsAndDigits.map((s) => s.length));

const charsFromTo = (str: string, from: number, to: number) => {
  const strs = [];
  for (let i = from; i <= to; i++) {
    if (i >= str.length) continue;
    strs.push(str.slice(from, i + 1));
  }
  return strs;
};

export const frames = (str: string, maxSize: number): string[] =>
  str
    .split("")
    .reduce<string[]>(
      (acc, _, idx) => [...acc, ...charsFromTo(str, idx, idx + maxSize - 1)],
      [],
    );

export const calibrationValue = (line: string): number => {
  const digits = frames(line, frameSize)
    .filter((f) => wordsAndDigits.includes(f))
    .map((digitStr) => {
      if (digitStr.match(/^\d$/)) return digitStr;

      const wordIdx = digitWords.indexOf(digitStr);
      return (wordIdx + 1).toString();
    });

  return parseInt(`${digits[0]}${digits[digits.length - 1]}`);
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
