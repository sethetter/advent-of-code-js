export function answer(input: string): number {
  const m = input.split("\n").map((l) => l.split(""));
  console.log(`map: ${m[0].length}x${m.length}`);

  const mainLoop = findMainLoop(m);

  return Math.floor(mainLoop.length / 2);
}

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

  for (const [i, pathStart] of paths.entries()) {
    const path = followPath(m, pathStart);
    console.log(i, path);
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
    if (curr === "end" || isLoop(m, path)) break;
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
