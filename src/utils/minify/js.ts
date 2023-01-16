import * as Terser from "terser";
import { version as TERSER_VERSION } from "terser/package.json";

import type { Minifier } from "../../types";

const JS_BANNER = `/**
 * This file is minified by DLVR using Terser@${TERSER_VERSION}.
 */
`;
export const JSMinifier: Minifier = async (code: string) =>
  await Terser.minify(code, { output: { comments: false } })
    .then(r => JS_BANNER + r.code!);
