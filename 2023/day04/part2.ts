if (import.meta.main) {
  const input = (
    await Deno.readFile("input").then((bytes) =>
      new TextDecoder().decode(bytes),
    )
  ).trim();
  console.log(answer(input));
}

type card = { wNums: number[]; nums: number[]; copies: number };

export function answer(input: string): number {
  const cards = input.split("\n").map(parseCard);

  for (let c = 0; c < cards.length; c++) {
    const matches = numMatches(cards[c]);
    for (let i = 0; i < cards[c].copies; i++) {
      for (let cn = 1; cn <= matches; cn++) {
        cards[c + cn].copies++;
      }
    }
  }

  return cards.reduce((sum, c) => sum + c.copies, 0);
}

function numMatches({ wNums, nums }: card): number {
  return nums.filter((n) => wNums.includes(n)).length;
}

function parseCard(line: string): card {
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
  return { wNums, nums, copies: 1 };
}
