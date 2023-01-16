import * as esbuild from "esbuild";

export const esbuildMinify = async (code: string, options?: esbuild.TransformOptions) => {
  await esbuild.initialize({
    worker: false,
  });
  return await esbuild.transform(code, {
    ...options,
    minify: true,
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true,
  }).then(r => r.code);
};
