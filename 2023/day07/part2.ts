export function answer(input: string): number {
  const handsAndBids = input.split("\n").map(parseHand);

  handsAndBids.sort(([handA], [handB]) => {
    const [typeA, typeB] = [handType(handA), handType(handB)];
    if (typeA !== typeB) {
      return HAND_TYPES.indexOf(typeA) > HAND_TYPES.indexOf(typeB) ? 1 : -1;
    } else {
      for (let i = 0; i < handA.length; i++) {
        if (handA[i] !== handB[i]) {
          return CARDS.indexOf(handA[i]) > CARDS.indexOf(handB[i]) ? 1 : -1;
        }
      }
    }
    throw `hands are the same!: ${handA} ${handB}`;
  });

  return handsAndBids.reduce(
    (sum, [_hand, bid], rank) => sum + bid * (rank + 1),
    0,
  );
}

const CARDS = "J23456789TQKA";
const HAND_TYPES = [
  "high card",
  "1 pair",
  "2 pair",
  "3 of a kind",
  "full house",
  "4 of a kind",
  "5 of a kind",
];

function parseHand(l: string): [string, number] {
  const [hand, bidStr] = l.split(" ");
  return [hand, parseInt(bidStr)];
}

const cardCounts = (hand: string[]) => ({
  "2": hand.filter((c) => c === "2").length,
  "3": hand.filter((c) => c === "3").length,
  "4": hand.filter((c) => c === "4").length,
  "5": hand.filter((c) => c === "5").length,
  "6": hand.filter((c) => c === "6").length,
  "7": hand.filter((c) => c === "7").length,
  "8": hand.filter((c) => c === "8").length,
  "9": hand.filter((c) => c === "9").length,
  T: hand.filter((c) => c === "T").length,
  J: hand.filter((c) => c === "J").length,
  Q: hand.filter((c) => c === "Q").length,
  K: hand.filter((c) => c === "K").length,
  A: hand.filter((c) => c === "A").length,
});

const isFiveOfAKind = (cards: string[]): boolean => new Set(cards).size === 1;

const isFourOfAKind = (cards: string[]): boolean => {
  const uniqueCards = new Set(cards);
  return (
    uniqueCards.size >= 2 &&
    [...uniqueCards].some((c) => cards.filter((cc) => cc === c).length === 4)
  );
};

const isThreeOfAKind = (cards: string[]): boolean => {
  const uniqueCards = new Set(cards);
  return (
    uniqueCards.size >= 2 &&
    [...uniqueCards].some((c) => cards.filter((cc) => cc === c).length === 3)
  );
};

const isFullHouse = (cards: string[]): boolean => {
  const uniqueCards = new Set(cards);
  return (
    uniqueCards.size === 2 &&
    Object.values(cardCounts(cards)).filter((c) => c > 1).length === 2
  );
};

const pairs = (cards: string[]): number =>
  Object.values(cardCounts(cards)).filter((c) => c === 2).length;
const isTwoPair = (cards: string[]): boolean => pairs(cards) === 2;
const isOnePair = (cards: string[]): boolean => pairs(cards) === 1;

function handType(hand: string): string {
  function possibleHandTypes(h: string[], typesSoFar: string[] = []): string[] {
    if (h.includes("J")) {
      return [
        ...typesSoFar,
        ...CARDS.slice(1)
          .split("")
          .map((c) =>
            possibleHandTypes(h.join("").replace("J", c).split(""), typesSoFar),
          )
          .flat(),
      ];
    }
    if (isFiveOfAKind(h)) return [...typesSoFar, "5 of a kind"];
    if (isFourOfAKind(h)) return [...typesSoFar, "4 of a kind"];
    if (isFullHouse(h)) return [...typesSoFar, "full house"];
    if (isThreeOfAKind(h)) return [...typesSoFar, "3 of a kind"];
    if (isTwoPair(h)) return [...typesSoFar, "2 pair"];
    if (isOnePair(h)) return [...typesSoFar, "1 pair"];
    return [...typesSoFar, "high card"];
  }

  const possibleTypes = [...new Set(possibleHandTypes(hand.split("")))].sort(
    (a, b) => (HAND_TYPES.indexOf(a) > HAND_TYPES.indexOf(b) ? -1 : 1),
  );
  return possibleTypes[0];
}

if (import.meta.main) {
  const input = (
    await Deno.readFile("input").then((bytes) =>
      new TextDecoder().decode(bytes),
    )
  ).trim();
  console.log(answer(input));
}
