import { version as NODE_SWC_VERSION } from "@swc/core/package.json";
import { isNode } from "is-platform";

import type { Minifier } from "../../types";

const DENO_SWC_VERSION = "0.3.2";
const SWC_VERSION = isNode() ? NODE_SWC_VERSION : DENO_SWC_VERSION;

const JS_BANNER = `/**
 * This file is minified by DLVR using @swc/core@${SWC_VERSION}.
 */
`;
export const JSMinifier: Minifier = async (code: string) => {
  const SWC = await iImport("@swc/core", "https://x.nest.land/swc@0.3.2/mod.ts");
  return await SWC.minify(
    code,
    { compress: true },
  ).then((r: any) => JS_BANNER + r.code!);
};
