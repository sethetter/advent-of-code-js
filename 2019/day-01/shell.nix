{ pkgs ? import <nixpkgs> {} }:
let
  project = pkgs.haskellPackages.callPackage ./default.nix {};
in
  pkgs.stdenv.mkDerivation {
    name = "shell";
    buildInputs = with pkgs; project.env.nativeBuildInputs ++ [
      haskellPackages.hoogle
      haskellPackages.hpack
      haskellPackages.hlint
      haskellPackages.ghcid
    ];
  }
