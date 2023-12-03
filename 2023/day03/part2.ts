if (import.meta.main) {
  const input = (
    await Deno.readFile("input").then((bytes) =>
      new TextDecoder().decode(bytes),
    )
  ).trim();
  console.log(answer(input));
}

type Coord = [number, number];
type PartNum = { num: number; coords: Coord[] };
type Symbol = { c: string; coord: Coord };

export function answer(input: string): number {
  const grid = input.split("\n").map((l) => l.split(""));
  const [maybePartNums, symbols] = getPartsAndSymbols(grid);

  const partNums = maybePartNums.filter(({ coords }) =>
    isSymbolAdjacent(
      coords,
      symbols.map((s) => s.coord),
    ),
  );

  return symbols.reduce((sum, { c, coord }) => {
    if (c !== "*") return sum;

    const parts = partNums.filter(({ coords }) =>
      isSymbolAdjacent(coords, [coord]),
    );
    if (parts.length !== 2) return sum;

    const gearRatio = parts[0].num * parts[1].num;
    return sum + gearRatio;
  }, 0);
}

function isSymbolAdjacent(coords: Coord[], symbols: Coord[]): boolean {
  return coords.some(([x, y]) =>
    adjacentCoords([x, y]).some(([ax, ay]) =>
      symbols.some(([sx, sy]) => ax === sx && ay === sy),
    ),
  );
}

function adjacentCoords([x, y]: Coord): Coord[] {
  return [
    [x - 1, y - 1],
    [x + 1, y + 1],
    [x - 1, y + 1],
    [x + 1, y - 1],
    [x, y + 1],
    [x, y - 1],
    [x + 1, y],
    [x - 1, y],
  ];
}

function getPartsAndSymbols(grid: string[][]): [PartNum[], Symbol[]] {
  const isSymbol = (c: string) => !c.match(/([0-9]|\.)/);
  const isNum = (c: string) => !!c.match(/[0-9]/);

  const partNums: PartNum[] = [];
  const symbols: Symbol[] = [];

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const c = grid[y][x];
      if (isSymbol(c)) {
        symbols.push({ c, coord: [x, y] });
      } else if (isNum(c)) {
        const coords: Coord[] = [];
        let numStr = "";
        let current = c;
        while (current && isNum(current)) {
          coords.push([x, y]);
          numStr += current;
          current = grid[y][++x];
        }
        x--;
        partNums.push({ num: parseInt(numStr), coords });
      }
    }
  }

  return [partNums, symbols];
}
