import AutoImport from "unplugin-auto-import/vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [
		AutoImport({
			dirs: ["./src/utils/*.ts", "./src/utils/*/index.ts"],
			dts: "./src/auto-imports.d.ts",
		}),
	],
});
