import { defineConfig } from "tsup";

export default defineConfig({
  format: ["esm"],
  entry: ["src/", "!test/", "!**/**.test.ts?(x)", "!src/test"],
  outDir: "dist/",
  treeshake: true,
  sourcemap: true,
  minify: false,
  clean: true,
  dts: true,
  splitting: false,
});
