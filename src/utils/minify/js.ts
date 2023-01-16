import * as SWC from "@swc/core";
import { version as SWC_VERSION } from "@swc/core/package.json";

import type { Minifier } from "../../types";

const JS_BANNER = `/**
 * This file is minified by DLVR using @swc/core@${SWC_VERSION}.
 */
`;
export const JSMinifier: Minifier = async (code: string) => {
  return await SWC.minify(
    code,
    { compress: true },
  ).then((r: any) => JS_BANNER + r.code!);
};
