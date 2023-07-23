import * as esbuild from "esbuild";

import { versions } from "../deps";

export const ESBUILD_VERSION = versions.esbuild;
export const ESBUILD_LINK_BANNER = [
	"DLVR: https://github.com/so1ve/dlvr",
	"esbuild: https://esbuild.github.io",
];

let initialized = false;

export async function esbuildMinify(
	code: string,
	options?: esbuild.TransformOptions,
) {
	if (!initialized) {
		// @ts-expect-error Deno
		if (typeof Deno !== "undefined") {
			await esbuild.initialize({
				worker: false,
			});
		}
		initialized = true;
	}

	return await esbuild
		.transform(code, {
			...options,
			minify: true,
			keepNames: false,
		})
		.then((r) => r.code);
}
