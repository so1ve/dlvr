const CSS_BANNER = createBanner(`This CSS file is minified by DLVR using esbuild@${ESBUILD_VERSION}.`);
export const CSSMinifier = defineMinifier(async (code: string) => CSS_BANNER + await esbuildMinify(code, { loader: "css" }));
