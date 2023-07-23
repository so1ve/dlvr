import type { MaybeArray } from "../types";
import { toArray } from ".";

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
