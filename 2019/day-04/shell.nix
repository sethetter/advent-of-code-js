{ pkgs ? import <nixpkgs> {} }:
pkgs.mkShell {
  buildInputs = [
    pkgs.ghc
    pkgs.haskellPackages.ghcid
  ];
}