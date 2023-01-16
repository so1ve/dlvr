import { format } from "node:util";
import fsp from "node:fs/promises";

type Deps = [string, string][];
type ImportsOrVersions = Record<string, string>;
interface PackageJSON { version: string }

const deps: Deps = [
  ["esbuild", "https://deno.land/x/esbuild@v%s/wasm.js"],
];

async function main() {
  const imports: ImportsOrVersions = {};
  const versions: ImportsOrVersions = {};
  for (const [dep, depURL] of deps) {
    const { version } = await import(`${dep}/package.json`) as PackageJSON;
    const formattedURL = format(depURL, version);
    imports[dep] = formattedURL;
    versions[dep] = version;
  }
  const importMap = { imports };
  const importMapStr = `${JSON.stringify(importMap, null, 2)}\n`;
  const versionsStr = `${JSON.stringify(versions, null, 2)}\n`;
  await fsp.writeFile("import_map.json", importMapStr);
  await fsp.writeFile("versions.json", versionsStr);
}

main();
