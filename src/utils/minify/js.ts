import type { Minifier } from "../../types";

const JS_BANNER = `/**
 * This file is minified by DLVR using esbuild.
 */
`;
export const JSMinifier: Minifier = async (code: string) => {
  return await esbuildMinify(code).then(r => JS_BANNER + r);
};
