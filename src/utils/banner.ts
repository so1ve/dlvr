import type { MaybeArray } from "../types";

export const createBanner = (_text: MaybeArray<string>) => {
  const text = toArray(_text);
  let str = "/**\n";
  str += text.map(t => ` * ${t}\n`)
    .join("");
  str += " */\n";
  return str;
};

export const createHTMLBanner = (_text: MaybeArray<string>) => {
  const text = toArray(_text);
  let str = "<!--\n";
  str += text.map(t => `  ${t}\n`)
    .join("");
  str += "-->\n";
  return str;
};
