import { defineNitroConfig } from "nitropack";
import AutoImport from "unplugin-auto-import/rollup";

import { DenoFixPlugin } from "./plugins/deno-fix";

export default defineNitroConfig({
  srcDir: "./src",
  routeRules: {
    "/npm/**": { cors: true, headers: { "access-control-allowed-methods": "GET" } },
    "/gh/**": { cors: true, headers: { "access-control-allowed-methods": "GET" } },
    // "/": { prerender: true, swr: true },
  },
  rollupConfig: {
    plugins: [
      // Cannot use built-in unimport since it lacks support of subdir import.
      AutoImport({
        dts: "./src/auto-imports.d.ts",
        dirs: [
          "./src/utils/**",
        ],
      }),
      DenoFixPlugin(),
    ],
    external: [
      "@swc/core",
      "esbuild",
    ],
  },
});
