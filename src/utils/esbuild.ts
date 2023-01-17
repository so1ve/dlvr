import * as esbuild from "esbuild";

import { versions } from "../deps";

export const ESBUILD_VERSION = versions.esbuild;

let initialized = false;

export const esbuildMinify = async (code: string, options?: esbuild.TransformOptions) => {
  if (!initialized) {
    // @ts-expect-error Deno
    if (typeof Deno !== "undefined") {
      await esbuild.initialize({
        worker: false,
      });
    }
    initialized = true;
  }
  return await esbuild.transform(code, {
    ...options,
    minify: true,
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true,
    keepNames: false,
  }).then(r => r.code);
};
