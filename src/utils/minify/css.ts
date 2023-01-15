import CleanCSS from "clean-css";
import { version as CLEANCSS_VERSION } from "clean-css/package.json";

import type { Minifier } from "../../types";

const cleanCSSInstance = new CleanCSS();
const CSS_BANNER = `/**
  * This file is minified by DLVR using CleanCSS@${CLEANCSS_VERSION}.
  */
`;
export const CSSMinifier: Minifier = (content: string) => CSS_BANNER + cleanCSSInstance.minify(content).styles!;
