const JS_BANNER = createBanner(`This JavaScript file is minified by DLVR using esbuild@${ESBUILD_VERSION}.`);
export const JSMinifier = defineMinifier(async (code: string) => JS_BANNER + await esbuildMinify(code));
