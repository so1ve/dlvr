import { toArray } from ".";
import type { MaybeArray } from "../types";

export function createBanner(_text: MaybeArray<string>) {
  const text = toArray(_text);
  let str = "/**\n";
  str += text.map((t) => ` * ${t}\n`).join("");
  str += " */\n";

  return str;
}

export function createHTMLBanner(_text: MaybeArray<string>) {
  const text = toArray(_text);
  let str = "<!--\n";
  str += text.map((t) => `  ${t}\n`).join("");
  str += "-->\n";

  return str;
}
