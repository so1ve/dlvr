import { CSSMinifier } from "./css";
import { JSMinifier } from "./js";
import { JSONMinifier } from "./json";
// import { TSMinifier } from "./ts";
// import { TSXMinifier } from "./tsx";

const minifierMap = {
  js: JSMinifier,
  css: CSSMinifier,
  json: JSONMinifier,
  // Disable TS minifiers because esbuild will remove all the types
  // ts: TSMinifier,
  // tsx: TSXMinifier,
};

export const SUPPORTED_MINIFY_EXTENSIONS = Object.keys(minifierMap);
type SupportedMinifyExtensions = keyof typeof minifierMap;

export const minify = async (content: Uint8Array, mime: SupportedMinifyExtensions) =>
  stringToUint8Array(await minifierMap[mime](uint8ArrayToString(content)));
