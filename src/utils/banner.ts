import { LINK_BANNER } from "../config";
import type { MaybeArray } from "../types";

export const createBanner = (_text: MaybeArray<string>) => {
  const text = [
    ...toArray(_text),
    ...LINK_BANNER,
  ];
  let str = "/**\n";
  str += text.map(t => ` * ${t}\n`)
    .join("");
  str += " */";
  return str;
};
