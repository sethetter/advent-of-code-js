type Node = { L: string; R: string; stepsToZCache: Record<string, number> };
type Network = Record<string, Node>;
type Path = { checkpoint: string; sinceCheckpoint: number; current: string };

export function answer(input: string): number {
  const [instructionsRaw, , ...networkRaw] = input.split("\n");

  const network: Network = networkRaw.reduce((network, line) => {
    const [id, leftAndRight] = line.split(" = ");
    const [L, R] = leftAndRight.replaceAll(/[\(\)]/g, "").split(", ");
    return { ...network, [id]: { L, R, stepsToZCache: {} } };
  }, {});

  const paths: Path[] = Object.keys(network)
    .filter((n) => n.endsWith("A"))
    .map((n) => ({ checkpoint: n, sinceCheckpoint: 0, current: n }));

  let step = -1;
  const instructions = instructionsRaw.split("");

  while (true) {
    step++;
    for (let instIdx = 0; instIdx < instructions.length; instIdx++) {
      // console.log(`step: ${step}`);
      paths.forEach((p, _pathIdx) => {
        p.sinceCheckpoint++;

        p.current = network[p.current][instructions[instIdx] as "L" | "R"];

        if (p.current.endsWith("Z")) {
          network[p.checkpoint].stepsToZCache[`${instIdx}`] = p.sinceCheckpoint;

          p.checkpoint = p.current;
          p.sinceCheckpoint = 0;
        }
      });

      const stepsToZ = paths.map(
        (p) => network[p.current].stepsToZCache[`${instIdx}`],
      );

      if (stepsToZ.every((s) => s !== undefined)) {
        return stepsToZ.reduce((product, x) => (product *= x), 1);
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
