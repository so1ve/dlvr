import { CSSMinifier } from "./css";
import { HTMLMinifier } from "./html";
import { JSMinifier } from "./js";
import { JSONMinifier } from "./json";

const minifierMap = {
	js: JSMinifier,
	cjs: JSMinifier,
	mjs: JSMinifier,
	css: CSSMinifier,
	json: JSONMinifier,
	html: HTMLMinifier,
	htm: HTMLMinifier,
};

export const SUPPORTED_MINIFY_EXTENSIONS = Object.keys(minifierMap);
type SupportedMinifyExtensions = keyof typeof minifierMap;

export const minify = async (
	content: Uint8Array,
	mime: SupportedMinifyExtensions,
) => stringToUint8Array(await minifierMap[mime](uint8ArrayToString(content)));

export const minifyString = async (
	code: string,
	mime: SupportedMinifyExtensions,
) => await minifierMap[mime](code);
