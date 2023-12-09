type Node = { L: string; R: string };
type Network = Record<string, Node>;

type Path = {
  start: string;
  current: string;
  history: string[];
};

export function answer(input: string): number {
  const [instructionsRaw, , ...networkRaw] = input.split("\n");

  const network: Network = networkRaw.reduce((network, line) => {
    const [id, leftAndRight] = line.split(" = ");
    const [L, R] = leftAndRight.replaceAll(/[\(\)]/g, "").split(", ");
    return { ...network, [id]: { L, R } };
  }, {});

  const instructions = instructionsRaw.split("");

  const next = (node: string, i: number): string =>
    network[node][instructions[i] as "L" | "R"];

  const startNodes = Object.keys(network).filter((n) => n.endsWith("A"));
  const endNodes = Object.keys(network).filter((n) => n.endsWith("Z"));

  const paths: Path[] = startNodes.map((n) => ({
    start: n,
    current: n,
    history: [],
  }));

  const stepsToZCache: Record<string, number> = {};

  const stepPath = (p: Path, instIdx: number, step: number) => {
    p.history.push(p.current);
    p.current = next(p.current, instIdx);

    if (p.current.endsWith("Z")) {
      p.history.forEach((prev, i) => {
        console.log(`${instIdx}.${prev}.${p.current} = ${step - i + 1}`);
        stepsToZCache[`${instIdx}.${prev}.${p.current}`] = step - i + 1;
      });
    }
  };

  let step = 0;
  while (true) {
    for (let instIdx = 0; instIdx < instructions.length; instIdx++) {
      const stepsToZFromCurrent: number[] = [];

      paths.forEach((p) => {
        stepPath(p, instIdx, step);
        for (const en of endNodes) {
          const steps = stepsToZCache[`${instIdx}.${p.current}.${en}`];
          if (steps) stepsToZFromCurrent.push(steps);
        }
      });

      const pathsToZ = paths.map((p) =>
        endNodes
          .map((en) => stepsToZCache[`${instIdx}.${p.current}.${en}`])
          .filter((s) => s !== undefined),
      );

      if (pathsToZ.every((p) => p.length > 0)) {
        return pathsToZ.reduce((product, x) => (product *= x[x.length - 1]), 1);
      }

      step++;
    }
  }
}

if (import.meta.main) {
  const input = (
    await Deno.readFile("input").then((bytes) =>
      new TextDecoder().decode(bytes),
    )
  ).trim();
  console.log(answer(input));
}
