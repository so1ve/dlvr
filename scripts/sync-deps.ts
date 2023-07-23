import fsp from "node:fs/promises";
import { format } from "node:util";

type ImportsVersionsDeps = Record<string, string>;
interface PackageJSON {
	version: string;
}

const depsNeedReplace: ImportsVersionsDeps = {
	esbuild: "https://deno.land/x/esbuild@v%s/wasm.js",
};

const depsVersionOnly: string[] = ["html-minifier-terser"];

async function generateImportMap(imports: ImportsVersionsDeps) {
	const importMap = { imports };
	const importMapStr = `${JSON.stringify(importMap, null, "\t")}\n`;
	await fsp.writeFile("import_map.json", importMapStr);
}

async function generateDepsFile(
	versions: ImportsVersionsDeps,
	imports: ImportsVersionsDeps,
) {
	const externals = Object.keys(imports);
	const shouldQuote = Object.keys(versions).some(
		(external) => external.includes("-") || external.includes("@"),
	);
	const stringVersions = Object.entries(versions)
		.map(([dep, version]) => `${shouldQuote ? `"${dep}"` : dep}: "${version}",`)
		.join("\n\t");
	const stringExternals = externals
		.map((external) => `"${external}", // Avoid bad format`)
		.join("\n\t");
	const template = `export const versions = {
\t${stringVersions}
};

export const externals = [
\t${stringExternals}
];
`;
	await fsp.writeFile("src/deps.ts", template);
}

async function main() {
	const imports: ImportsVersionsDeps = {};
	const versions: ImportsVersionsDeps = {};
	for (const [dep, depURL] of Object.entries(depsNeedReplace)) {
		const { version } = (await import(`${dep}/package.json`)) as PackageJSON;
		const formattedURL = format(depURL, version);
		imports[dep] = formattedURL;
		versions[dep] = version;
	}
	for (const dep of depsVersionOnly) {
		const { version } = (await import(`${dep}/package.json`)) as PackageJSON;
		versions[dep] = version;
	}
	generateImportMap(imports);
	generateDepsFile(versions, imports);
}

main();
