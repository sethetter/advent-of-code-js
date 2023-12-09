type Node = { L: string; R: string };

type Network = Record<string, Node>;

type Path = {
  possiblePaths: string[];
};

//

export function answer(input: string) {
  const [instructions, , ...networkRaw] = input.split("\n");

  const parseNetwork = (lines: string[]): Network =>
    lines.reduce((network, line) => {
      const [id, leftAndRight] = line.split(" = ");
      const [L, R] = leftAndRight.replaceAll(/[\(\)]/g, "").split(", ");
      return { ...network, [id]: { L, R } };
    }, {});

  const network: Network = parseNetwork(networkRaw);

  // build the paths to X for each starting path
  // step forward by longest path
  // new positions are stepSize % pathSize

  const paths = Object.keys(network)
    .filter((n) => n.endsWith("A"))
    .map((p) => {
      const path = buildPath(p, network, instructions);
      console.log(`plength: ${path.length}, last: ${path[path.length - 1]}`);
      return { current: path.length - 1, path };
    });

  const stepSize = Math.max(...paths.map(({ path }) => path.length));
  let stepTotal = stepSize;

  while (!paths.every((p) => p.path[p.current] === "Z")) {
    console.log(`step by ${stepSize}`);
    paths.forEach((p) => {
      p.current += stepSize;
      p.current = p.path.length % p.current;
      console.log(p);
    });
    stepTotal += stepSize;
  }

  return stepTotal;
}

function buildPath(
  start: string,
  network: Network,
  instructions: string,
): string[] {
  let currentNode = start;
  let stepCount = 0;
  const endingChars = [start[2]];
  while (!currentNode.endsWith("Z")) {
    for (const dir of instructions.split("")) {
      currentNode = network[currentNode][dir as keyof Node];
      stepCount++;
      endingChars.push(currentNode[2]);
      if (currentNode.endsWith("Z")) break;
    }
  }

  return endingChars;
}

if (import.meta.main) {
  const input = (
    await Deno.readFile("input").then((bytes) =>
      new TextDecoder().decode(bytes),
    )
  ).trim();
  console.log(answer(input));
}
