import * as Terser from "terser";
import CleanCSS from "clean-css";
import type { MaybePromise } from "../types";

type Minifier = (code: string) => MaybePromise<string>;

const JSMinifier: Minifier = async (code: string) =>
  await Terser.minify(
    code,
    { compress: true },
  ).then(r => r.code!);
const CSSMinifier: Minifier = (content: string) => content;

const minifierMap = {
  "application/javascript": JSMinifier,
  "text/css": CSSMinifier,
};

export const SUPPORTED_MINIFY_MIMES = Object.keys(minifierMap);
type SupportedMinifyMimes = keyof typeof minifierMap;

export const minify = async (content: Uint8Array, mime: SupportedMinifyMimes) => stringToUint8Array(await minifierMap[mime](uint8ArrayToString(content)));
