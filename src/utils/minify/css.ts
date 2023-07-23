const CSS_BANNER = createBanner([
	`This CSS file is minified by DLVR using esbuild@${ESBUILD_VERSION}.`,
	...ESBUILD_LINK_BANNER,
]);
export const CSSMinifier = defineMinifier(
	async (code: string) =>
		CSS_BANNER + (await esbuildMinify(code, { loader: "css" })),
);
