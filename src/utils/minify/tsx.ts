const TSX_BANNER = createBanner(`This TSX file is minified by DLVR using esbuild@${ESBUILD_VERSION}.`);
export const TSXMinifier = defineMinifier(async (code: string) => TSX_BANNER + await esbuildMinify(code, { loader: "tsx" }));
