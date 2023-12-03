build:
	nix-shell --run "hpack && cabal new-build"

watch:
	nix-shell --run "ghcid --test Spec.run"

lint:
	nix-shell --run "hlint"

run:
	nix-shell --run "hpack && cabal new-run aoc2019-day01"
