import { format } from "node:util";
import fsp from "node:fs/promises";

type ImportsVersionsDeps = Record<string, string>;
interface PackageJSON { version: string }

const deps: ImportsVersionsDeps = {
  esbuild: "https://deno.land/x/esbuild@v%s/wasm.js",
};

const generateImportMap = async (imports: ImportsVersionsDeps) => {
  const importMap = { imports };
  const importMapStr = `${JSON.stringify(importMap, null, 2)}\n`;
  await fsp.writeFile("import_map.json", importMapStr);
};

const generateDepsFile = async (versions: ImportsVersionsDeps) => {
  const externals = Object.keys(versions);
  const shouldQuote = externals.some(external => external.includes("-") || external.includes("@"));
  const stringVersions = Object.entries(versions)
    .map(([dep, version]) => `${shouldQuote ? `"${dep}"` : dep}: "${version}",`)
    .join("\n");
  const stringExternals = externals.map(external => `"${external}",`)
    .join("\n");
  const template = `export const versions = {
  ${stringVersions}
};

export const externals = [
  ${stringExternals}
];
`;
  await fsp.writeFile("src/deps.ts", template);
};

async function main() {
  const imports: ImportsVersionsDeps = {};
  const versions: ImportsVersionsDeps = {};
  for (const [dep, depURL] of Object.entries(deps)) {
    const { version } = await import(`${dep}/package.json`) as PackageJSON;
    const formattedURL = format(depURL, version);
    imports[dep] = formattedURL;
    versions[dep] = version;
  }
  generateImportMap(imports);
  generateDepsFile(versions);
}

main();
