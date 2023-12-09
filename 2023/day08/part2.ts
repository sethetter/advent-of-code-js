type Node = { L: string; R: string };
type Network = Record<string, Node>;

export function answer(input: string) {
  const [instructions, , ...networkRaw] = input.split("\n");

  const network: Network = networkRaw.reduce((network, line) => {
    const [id, leftAndRight] = line.split(" = ");
    const [L, R] = leftAndRight.replaceAll(/[\(\)]/g, "").split(", ");
    return { ...network, [id]: { L, R } };
  }, {});

  const paths = Object.keys(network).filter((n) => n.endsWith("A"));
  return BigInt(
    paths
      .map((p) => countSteps(p, network, instructions))
      .reduce((total, x) => (total *= x), 1),
  );
}

function countSteps(
  start: string,
  network: Network,
  instructions: string,
): number {
  let currentNode = start;
  let stepCount = 0;
  while (!currentNode.endsWith("Z")) {
    for (const dir of instructions.split("")) {
      currentNode = network[currentNode][dir as keyof Node];
      stepCount++;
      if (currentNode.endsWith("Z")) break;
    }
  }

  return stepCount;
}

if (import.meta.main) {
  const input = (
    await Deno.readFile("input").then((bytes) =>
      new TextDecoder().decode(bytes),
    )
  ).trim();
  console.log(answer(input));
}
