import livereload from "rollup-plugin-livereload";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import cleaner from "rollup-plugin-cleaner";
import svelte from "rollup-plugin-svelte";
import alias from "@rollup/plugin-alias";
import css from "rollup-plugin-css-only";
import tailwind from "./rollup-tailwind";
import json from "@rollup/plugin-json";
import serve from "./rollup-serve";
import path from "path";

const watch = process.env.ROLLUP_WATCH;

const serverPath = "server/index.js";
const cssOutputPath = "client/styles/index.css";
const outputPath = path.join(__dirname, "client");
const inputPath = path.join(__dirname, "client-src");
const outputScripts = path.join(outputPath, "scripts");

export default {
  input: path.join(inputPath, "index.js"),
  output: {
    dir: outputScripts,
    sourcemap: true,
    format: "es",
  },
  plugins: [
    json(),
    alias({
      entries: [{ find: "@", replacement: inputPath }],
    }),
    css({ output: cssOutputPath }),
    resolve({ browser: true, dedupe: ["svelte"] }),
    commonjs(),
    svelte({ compilerOptions: { dev: watch } }),
    cleaner({ targets: [outputScripts] }),
    watch && livereload(outputPath),
    watch && serve(serverPath),
    !watch && terser(),
    tailwind(),
  ],
};
