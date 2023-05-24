import { defineConfig } from "vitest/config";
import AutoImport from "unplugin-auto-import/vite";

export default defineConfig({
  plugins: [
    AutoImport({
      dirs: ["./src/utils/*.ts", "./src/utils/*/index.ts"],
      dts: "./src/auto-imports.d.ts",
    }),
  ],
});
