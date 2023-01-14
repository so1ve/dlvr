import { defineNitroConfig } from "nitropack";
import AutoImport from "unplugin-auto-import/rollup";

export default defineNitroConfig({
  srcDir: "./src",
  routeRules: {
    "/npm/**": { cors: true, headers: { "access-control-allowed-methods": "GET" } },
    "/gh/**": { cors: true, headers: { "access-control-allowed-methods": "GET" } },
  },
  rollupConfig: {
    plugins: [
      AutoImport({
        dts: "./src/auto-imports.d.ts",
        dirs: [
          "./src/utils/**",
        ],
      }),
    ],
  },
});
