import type { Plugin } from "rollup";

export const DenoFixPlugin = () => ({
  name: "deno-fix",
  transform(code, id) {
    if (!id.endsWith("#internal/nitro/virtual/public-assets-deno")) { return; }
    code = code.replace("'.'", "'..'");
    return code;
  },
}) as Plugin;
