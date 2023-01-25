import { minify } from "html-minifier";
import { versions } from "../../deps";

const HTML_MINIFIER_VERSION = versions["html-minifier"];
const HTML_MINIFIER_LINK_BANNER = [
  "DLVR: https://github.com/so1ve/dlvr",
  "html-minifier: https://github.com/kangax/html-minifier",
];

const HTML_BANNER = createHTMLBanner([
  `This HTML file is minified by DLVR using html-minifier@${HTML_MINIFIER_VERSION}.`,
  ...HTML_MINIFIER_LINK_BANNER,
]);
export const HTMLMinifier = defineMinifier(async (code: string) => HTML_BANNER + await minify(code, {
  removeAttributeQuotes: true,
  removeComments: true,
  removeRedundantAttributes: true,
}));
