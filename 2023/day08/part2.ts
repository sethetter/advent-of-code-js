type Node = { L: string; R: string };
type Network = Record<string, Node>;

export function answer(input: string) {
  const [instructionsRaw, , ...networkRaw] = input.split("\n");

  const network: Network = networkRaw.reduce((network, line) => {
    const [id, leftAndRight] = line.split(" = ");
    const [L, R] = leftAndRight.replaceAll(/[\(\)]/g, "").split(", ");
    return { ...network, [id]: { L, R } };
  }, {});

  const instructions = instructionsRaw.split("") as ("L" | "R")[];

  const paths = Object.keys(network).filter((n) => n.endsWith("A"));

  const stepsToZ = (node: string) => {
    let step = 0;
    while (!node.endsWith("Z")) {
      for (const dir of instructions) {
        node = network[node][dir];
        step++;
        if (node.endsWith("Z")) break;
      }
    }
    return step;
  };

  return lcm(paths.map((p) => stepsToZ(p)));
}

function lcm(nums: number[]): number {
  const [a, b, ...rest] = nums;
  const c = (a * b) / gcf(a, b);
  if (rest.length === 0) return c;
  return lcm([c, ...rest]);
}

function gcf(a: number, b: number): number {
  if (b === 0) return a;
  return gcf(b, a % b);
}

if (import.meta.main) {
  const input = (
    await Deno.readFile("input").then((bytes) =>
      new TextDecoder().decode(bytes),
    )
  ).trim();
  console.log(answer(input));
}
