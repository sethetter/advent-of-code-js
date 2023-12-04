if (import.meta.main) {
  const input = (
    await Deno.readFile("input").then((bytes) =>
      new TextDecoder().decode(bytes),
    )
  ).trim();
  console.log(answer(input));
}

export function answer(input: string): number {
  return input.split("\n").reduce((sum, line) => {
    const [wNums, nums] = line
      .substring(line.indexOf(":") + 1)
      .split(" | ")
      .map((part) =>
        part
          .trim()
          .split(" ")
          .filter((s) => s.trim().match(/\d+/))
          .map((n) => {
            return parseInt(n.trim());
          }),
      );
    const numMatches = nums.filter((n) => wNums.includes(n)).length;
    return numMatches > 0 ? sum + Math.pow(2, numMatches - 1) : sum;
  }, 0);
}
