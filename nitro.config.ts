import { defineNitroConfig } from "nitropack";
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
  },
  imports: {
    dirs: [
      "./src/utils/**",
    ],
    dts: "./src/auto-imports.d.ts",
  },
  experimental: {
    wasm: true,
  },
});
