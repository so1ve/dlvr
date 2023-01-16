import { defineNitroConfig } from "nitropack";
import AutoImport from "unplugin-auto-import/rollup";

const external = process.env.NITRO_PRESET === "deno"
  ? ["esbuild"]
  : [];

export default defineNitroConfig({
  srcDir: "./src",
  routeRules: {
    "/npm/**": { cors: true, headers: { "access-control-allowed-methods": "GET" } },
    "/gh/**": { cors: true, headers: { "access-control-allowed-methods": "GET" } },
    "/": { prerender: true, swr: true },
  },
  rollupConfig: {
    external,
    plugins: [
      AutoImport({
        dirs: [
          "./src/utils/*.ts",
          "./src/utils/*/index.ts",
        ],
        dts: "./src/auto-imports.d.ts",
      }),
    ],
  },
  experimental: {
    wasm: true,
  },
  minify: true,
});
