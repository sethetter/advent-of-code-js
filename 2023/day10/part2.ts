export function answer(input: string): number {
  const m = input.split("\n").map((l) => l.split(""));
  const loop = findMainLoop(m);

  // Update the S tile to what it should actually be
  m[loop[0].y][loop[0].x] = tileFromDirs([
    dirFromCoord(loop[0], loop[loop.length - 1])!,
    dirFromCoord(loop[0], loop[1])!,
  ]);

  const isInPath = ({ x, y }: Coord, p: Path): boolean =>
    p.some((s) => s.x === x && s.y === y);

  const inCache = new Array(m.length)
    .fill(null)
    .map(() => new Array(m[0].length).fill(null));

  for (const [y, row] of m.entries()) {
    let inBounds = false;
    let state: "out" | "in" | "on" = "out";
    let lastFlip;
    for (const [x, curr] of row.entries()) {
      if (isInPath({ x, y }, loop)) {
        state = "on";
        if ("|J7LF".includes(curr)) {
          if (
            !lastFlip ||
            curr === "|" ||
            ("|L".includes(lastFlip) && curr === "J") ||
            ("|F".includes(lastFlip) && curr === "7")
          ) {
            inBounds = !inBounds;
            lastFlip = curr;
          }
        }
      } else {
        state = inBounds ? "in" : "out";
      }
      inCache[y][x] = state;
    }
  }
  console.log(
    inCache
      .map((row, y) =>
        row
          .map((c, x) => {
            if (c === "on") return newChar(m[y][x]);
            if (c === "in") return "x";
            return ".";
          })
          .join(""),
      )
      .join("\n"),
  );
  return inCache
    .map((row) => row.map((c) => (c === "in" ? 1 : 0)))
    .flat()
    .reduce<number>((sum, x) => sum + x, 0);
}

const newChar = (c: string): string => {
  switch (c) {
    case "F":
      return "┌";
    case "7":
      return "┐";
    case "L":
      return "└";
    case "J":
      return "┘";
    case "-":
      return "─";
    case "|":
      return "│";
  }
  return c;
};

const tileFromDirs = (dirs: [Dir, Dir]): string => {
  switch (dirs.sort().join("")) {
    case "EN":
      return "L";
    case "ES":
      return "F";
    case "EW":
      return "-";
    case "NS":
      return "|";
    case "NW":
      return "J";
    case "SW":
      return "7";
  }
  throw "invalid dirs";
};

type Dir = "N" | "S" | "E" | "W";
const dirs: Dir[] = ["N", "S", "E", "W"];

type Map = string[][];
type Coord = { x: number; y: number };
type Path = [Coord, Coord, ...Coord[]];

const findStart = (m: Map): Coord => {
  for (const [y, row] of m.entries()) {
    for (const [x, c] of row.entries()) {
      if (c === "S") return { x, y };
    }
  }
  throw "no start?!";
};

const findMainLoop = (m: Map): Path => {
  const start = findStart(m);

  const paths: Path[] = new Array(4)
    .fill(null)
    .map((_, i) => [start, move(start, dirs[i])]);

  for (const pathStart of paths) {
    const path = followPath(m, pathStart);
    if (isLoop(m, path)) return path;
  }
  throw "did not find main loop";
};

const possibleDirs = (m: Map, c: Coord): Dir[] => {
  switch (m[c.y][c.x]) {
    case "|":
      return ["N", "S"];
    case "-":
      return ["W", "E"];
    case "L":
      return ["N", "E"];
    case "J":
      return ["N", "W"];
    case "7":
      return ["S", "W"];
    case "F":
      return ["S", "E"];
    case ".":
    case "S":
    default:
      return [];
  }
};

const dirFromCoord = (curr: Coord, target: Coord): Dir | null => {
  if (sameCoords(move(curr, "N"), target)) return "N";
  if (sameCoords(move(curr, "S"), target)) return "S";
  if (sameCoords(move(curr, "E"), target)) return "E";
  if (sameCoords(move(curr, "W"), target)) return "W";
  return null;
};

const isInBounds = (m: Map, c: Coord): boolean =>
  c.x < m[0].length && c.y < m.length;

const sameCoords = (c1: Coord, c2: Coord) => c1.x === c2.x && c1.y === c2.y;
const isLoop = (m: Map, p: Path) => {
  const next = nextStep(m, p);
  if (next === "end") return false;
  return sameCoords(next, p[0]);
};

const move = ({ x, y }: Coord, d: Dir): Coord => {
  switch (d) {
    case "N":
      return { x, y: y - 1 };
    case "S":
      return { x, y: y + 1 };
    case "E":
      return { x: x + 1, y };
    case "W":
      return { x: x - 1, y };
  }
};

const nextStep = (m: Map, p: Path): Coord | "end" => {
  const last = p[p.length - 1];
  const secondToLast = p[p.length - 2];
  const dir = possibleDirs(m, last).filter(
    (d) => d !== dirFromCoord(last, secondToLast),
  );
  if (dir.length !== 1) return "end";
  return move(last, dir[0]);
};

function followPath(m: Map, path: Path): Path {
  let curr: Coord | "end" = path[1];
  do {
    curr = nextStep(m, path);
    if (curr === "end" || !isInBounds(m, curr) || isLoop(m, path)) break;
    path.push(curr);
  } while (!isLoop(m, path) || !isInBounds(m, curr));

  return path;
}

if (import.meta.main) {
  const input = (
    await Deno.readFile("input").then((bytes) =>
      new TextDecoder().decode(bytes),
    )
  ).trim();
  console.log(answer(input));
}
