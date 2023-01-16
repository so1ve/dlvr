import type { Minifier } from "../../types";

const TS_BANNER = createBanner(`This TypeScript file is minified by DLVR using esbuild@${ESBUILD_VERSION}.`);
export const TSMinifier: Minifier = async (code: string) => await esbuildMinify(code, { loader: "ts" }).then(r => TS_BANNER + r);
