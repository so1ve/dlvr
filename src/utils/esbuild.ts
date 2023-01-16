import * as esbuild from "esbuild";

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
  }).then(r => r.code);
};
