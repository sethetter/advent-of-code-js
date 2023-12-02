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

  return games
    .map((g) => minCubes(g.rounds))
    .reduce((sum, r) => sum + power(r), 0);
}

function minCubes(rounds: Round[]): Round {
  return {
    r: Math.max(...rounds.map(({ r }) => r)),
    g: Math.max(...rounds.map(({ g }) => g)),
    b: Math.max(...rounds.map(({ b }) => b)),
  };
}

function power({ r, g, b }: Round): number {
  return r * g * b;
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
