import { JSMinifier } from "./js";
import { CSSMinifier } from "./css";
import { JSONMinifier } from "./json";

const minifierMap = {
  "application/javascript": JSMinifier,
  "text/css": CSSMinifier,
  "application/json": JSONMinifier,
};

export const SUPPORTED_MINIFY_MIMES = Object.keys(minifierMap);
type SupportedMinifyMimes = keyof typeof minifierMap;

export const minify = async (content: Uint8Array, mime: SupportedMinifyMimes) =>
  stringToUint8Array(await minifierMap[mime](uint8ArrayToString(content)));
