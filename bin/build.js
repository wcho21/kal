#!/usr/bin/env bun

await Bun.build({
  entrypoints: ["./src/index.ts"],
  outdir: "./dist",
  naming: "[dir]/[name].min.[ext]",
  target: "browser",
  splitting: false,
  sourcemap: "none",
  minify: {
    whitespace: true,
    identifiers: true,
    syntax: true,
  },
});