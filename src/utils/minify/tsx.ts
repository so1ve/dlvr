import type { Minifier } from "../../types";

const TSX_BANNER = generateBanner(`This TSX file is minified by DLVR using esbuild@${ESBUILD_VERSION}.`);
export const TSXMinifier: Minifier = async (code: string) => await esbuildMinify(code, { loader: "tsx" }).then(r => TSX_BANNER + r);
