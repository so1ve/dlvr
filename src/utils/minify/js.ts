import type { Minifier } from "../../types";

const JS_BANNER = createBanner(`This JavaScript file is minified by DLVR using esbuild@${ESBUILD_VERSION}.`);
export const JSMinifier: Minifier = async (code: string) => await esbuildMinify(code).then(r => JS_BANNER + r);
