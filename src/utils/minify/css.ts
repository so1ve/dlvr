import type { Minifier } from "../../types";

const CSS_BANNER = generateBanner(`This CSS file is minified by DLVR using esbuild@${ESBUILD_VERSION}.`);
export const CSSMinifier: Minifier = async (code: string) => CSS_BANNER + await esbuildMinify(code, { loader: "css" }).then(r => r);
