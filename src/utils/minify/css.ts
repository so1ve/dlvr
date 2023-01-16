import type { Minifier } from "../../types";

const CSS_BANNER = `/**
  * This file is minified by DLVR using esbuild.
  */
`;
export const CSSMinifier: Minifier = async (code: string) => CSS_BANNER + await esbuildMinify(code, { loader: "css" }).then(r => r);
