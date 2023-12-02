const intWords = [
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
const numRegex = new RegExp(`(\\d|${intWords.join("|")})`, "g");

export const calibrationValue = (line: string): number => {
  const ints = line.match(numRegex)?.map((iStr) => {
    if (iStr.match(/^\d$/)) return iStr;

    const wordIdx = intWords.indexOf(iStr);
    if (wordIdx !== -1) return (wordIdx + 1).toString();

    throw new Error(`no digit for match: ${iStr}`);
  });

  if (!ints) throw new Error(`no ints in line: ${line}`);

  const numStr = `${ints[0]}${ints[ints.length - 1]}`;
  console.log(`${line}: ${ints} -- ${numStr}`);
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
