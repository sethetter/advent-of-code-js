type Node = { L: string; R: string; stepsToZCache: Record<string, number> };
type Network = Record<string, Node>;
type Path = {
  checkpoint: string;
  sinceCheckpoint: number;
  zsSeen: string[];
  current: string;
};

// for every node in the network, calculate the steps

export function answer(input: string): number {
  const [instructionsRaw, , ...networkRaw] = input.split("\n");
  const instructions = instructionsRaw.split("");

  const network: Network = networkRaw.reduce((network, line) => {
    const [id, leftAndRight] = line.split(" = ");
    const [L, R] = leftAndRight.replaceAll(/[\(\)]/g, "").split(", ");
    return { ...network, [id]: { L, R, stepsToZCache: {} } };
  }, {});

  const cacheKey = (instIdx: number, endNode: string) =>
    `${endNode}.${instIdx}`;

  const allPaths: Path[] = Object.keys(network).map((n) => ({
    checkpoint: n,
    sinceCheckpoint: 0,
    current: n,
    zsSeen: [],
  }));

  walkPaths(allPaths, instructions, network);

  // const startPaths: Path[] = Object.keys(network)
  //   .filter((n) => n.endsWith("A"))
  //   .map((n) => ({ checkpoint: n, sinceCheckpoint: 0, current: n, zsSeen: [] }));

  // const endNodes = Object.keys(network).filter((n) => n.endsWith("Z"));

  // MATH?!!!
  // - permutations of `stepsToZ`
  // - what operation can I perform with these numbers to know that it is the right answer?

  return 1;
}

function walkPaths(paths: Path[], instructions: string[], network: Network) {
  const endNodes = Object.keys(network).filter((n) => n.endsWith("Z"));

  let step = -1;
  while (true) {
    step++;
    for (let instIdx = 0; instIdx < instructions.length; instIdx++) {
      paths.forEach((p, _pathIdx) => {
        p.sinceCheckpoint++;

        p.current = network[p.current][instructions[instIdx] as "L" | "R"];

        if (p.current.endsWith("Z")) {
          console.log(
            `found path to z! ${p.checkpoint} from inst ${instIdx} takes ${p.sinceCheckpoint} steps`,
          );
          network[p.checkpoint].stepsToZCache[`${instIdx}`] = p.sinceCheckpoint;

          p.checkpoint = p.current;
          p.sinceCheckpoint = 0;
        }
      });

      // const stepsToZ = paths
      //   .map((p) =>
      //     endNodes.map(
      //       (n) => network[p.current].stepsToZCache[`${n}.${instIdx}`],
      //     ),
      //   )
      //   .flat();
      const stepsToZ = paths.map(
        (p) => network[p.current].stepsToZCache[`${instIdx}`],
      );

      console.log(
        Object.keys(network).map(
          (n) => `${n}: ${JSON.stringify(network[n].stepsToZCache)}`,
        ),
      );

      if (
        Object.values(network).every(
          (n) => Object.values(n.stepsToZCache).length === endNodes.length,
        )
      ) {
        return;
        // return stepsToZ.reduce((product, x) => (product *= x), 1);
      }
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
