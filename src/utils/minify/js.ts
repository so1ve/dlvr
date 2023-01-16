import type { Minifier } from "../../types";

const JS_BANNER = `/**
 * This file is minified by DLVR using esbuild.
 */
`;
export const JSMinifier: Minifier = async (code: string) =>
  await Terser.minify(code, { compress: { reduce_vars: false }, output: { comments: false } })
    .then(r => JS_BANNER + r.code!);
