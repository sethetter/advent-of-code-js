if (import.meta.main) {
  const input = (
    await Deno.readFile("input").then((bytes) =>
      new TextDecoder().decode(bytes),
    )
  ).trim();
  console.log(answer(input));
}

export function answer(input: string): number {
  const games = input.split("\n").map(parseGame);

  const bag = { r: 12, g: 13, b: 14 };
  return games
    .filter((g) => isGamePossible(g, bag))
    .reduce((sum, g) => sum + g.id, 0);
}

function isGamePossible(g: Game, bag: Round): boolean {
  const colors: ColorShort[] = ["r", "g", "b"];
  return colors.every((c) => g.rounds.every((r: Round) => r[c] <= bag[c]));
}

type Game = { id: number; rounds: Round[] };
type Round = Record<ColorShort, number>;
type ColorShort = "r" | "g" | "b";
type Color = "red" | "green" | "blue";

function parseGame(l: string): Game {
  const id = parseInt(l.substring(4, l.indexOf(":")));
  return { id, rounds: parseRounds(l) };
}

function parseRounds(l: string): Round[] {
  return l
    .substring(l.indexOf(": ") + 1)
    .split("; ")
    .map(parseRound);
}

function parseRound(rStr: string): Round {
  const countForColor = (c: Color) =>
    parseInt(
      rStr
        .trim()
        .split(", ")
        .find((draw) => draw.endsWith(c))
        ?.replace(` ${c}`, "") ?? "0",
    );
  return {
    r: countForColor("red"),
    b: countForColor("blue"),
    g: countForColor("green"),
  };
}
