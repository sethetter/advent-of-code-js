export function answer(input: string): number {
  const seqs = input
    .split("\n")
    .map((l) => l.split(" ").map((x) => parseInt(x)));

  return seqs.reduce((sum, seq) => (sum += prevNum(seq)), 0);
}

function prevNum(seq: number[]): number {
  const seqs = [seq];
  const reduce = (s: number[]): number[] => {
    let [prev, ...rest] = s;
    return rest.map((x) => {
      const next = x - prev;
      prev = x;
      return next;
    });
  };

  while (!seqs[0].every((x) => x === 0)) {
    // console.log(reduce(seqs[0]));
    seqs.unshift(reduce(seqs[0]));
  }
  for (const [i, s] of seqs.entries()) {
    if (i === 0) continue;
    const prevSeq = seqs[i - 1];
    s.unshift(s[0] - prevSeq[0]);
  }
  return seq[0];
}

if (import.meta.main) {
  const input = (
    await Deno.readFile("input").then((bytes) =>
      new TextDecoder().decode(bytes),
    )
  ).trim();
  console.log(answer(input));
}
