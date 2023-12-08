type Node = {
  left: string;
  right: string;
};

type Network = Record<string, Node>;

export function answer(input: string): number {
  const [instructions, , ...networkRaw] = input.split("\n");

  const network: Network = networkRaw.reduce((network, line) => {
    const [id, leftAndRight] = line.split(" = ");
    const [left, right] = leftAndRight.replaceAll(/[\(\)]/g, "").split(", ");
    return {
      ...network,
      [id]: { left: left, right: right },
    };
  }, {});

  let currentNode = "AAA";
  let stepCount = 0;
  while (currentNode !== "ZZZ") {
    for (const dir of instructions.split("")) {
      currentNode = network[currentNode][dir === "L" ? "left" : "right"];
      stepCount++;
      if (currentNode === "ZZZ") break;
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
