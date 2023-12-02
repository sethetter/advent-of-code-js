const input = await Deno.readFile("input").then((bytes) =>
  new TextDecoder().decode(bytes),
);
const lines = input.trim().split("\n");
