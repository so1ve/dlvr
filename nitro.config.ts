import { defineNitroConfig } from "nitropack/config";

import { externals } from "./src/deps";

const external = process.env.NITRO_PRESET === "deno" ? externals : [];

export default defineNitroConfig({
	srcDir: "./src",
	routeRules: {
		"/npm/**": {
			cors: true,
			headers: { "access-control-allowed-methods": "GET" },
		},
		"/gh/**": {
			cors: true,
			headers: { "access-control-allowed-methods": "GET" },
		},
		"/": { swr: true },
	},
	rollupConfig: {
		external,
	},
	experimental: {
		wasm: true,
	},
	minify: true,
});
