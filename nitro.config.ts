import { defineNitroConfig } from "nitropack";
import AutoImport from "unplugin-auto-import/rollup";

export default defineNitroConfig({
  srcDir: "./src",
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
