type Node = { L: string; R: string };
type Network = Record<string, Node>;

export function answer(input: string): number {
  const [instructions, , ...networkRaw] = input.split("\n");

  const network: Network = networkRaw.reduce((network, line) => {
    const [id, leftAndRight] = line.split(" = ");
    const [L, R] = leftAndRight.replaceAll(/[\(\)]/g, "").split(", ");
    return { ...network, [id]: { L, R } };
  }, {});

  const pathsFinished = (paths: string[]): boolean =>
    paths.every((p) => p.endsWith("Z"));

  const step = (paths: string[], dir: keyof Node): string[] =>
    paths.map((c) => network[c][dir]);

  let paths = Object.keys(network).filter((n) => n.endsWith("A"));
  let stepCount = 0;

  console.log(`network: ${Object.keys(network).length}`);
  console.log(`paths: ${paths.length}`);

  while (!pathsFinished(paths)) {
    for (const dir of instructions.split("")) {
      logPaths(stepCount, paths);
      paths = step(paths, dir as keyof Node);
      stepCount++;
      if (pathsFinished(paths)) break;
    }
  }

  return stepCount;
}

function logPaths(stepCount: number, paths: string[]) {
  console.log(
    `${stepCount.toString().padStart(20, "0")} ${paths
      .map((p) => (p.endsWith("Z") ? "x" : "."))
      .join("")}`,
  );
}

if (import.meta.main) {
  const input = (
    await Deno.readFile("input").then((bytes) =>
      new TextDecoder().decode(bytes),
    )
  ).trim();
  console.log(answer(input));
}
