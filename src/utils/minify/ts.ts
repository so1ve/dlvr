const TS_BANNER = createBanner(`This TypeScript file is minified by DLVR using esbuild@${ESBUILD_VERSION}.`);
export const TSMinifier = defineMinifier(async (code: string) => TS_BANNER + await esbuildMinify(code, { loader: "ts" }));
