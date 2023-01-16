import { isNode } from "is-platform";

const ESM_SH = "https://esm.sh/";

export const iImport = async<T = any>(specifier: string, denoSpecifier = ESM_SH + specifier): Promise<T> =>
  isNode()
    ? await import(specifier)
    : await import(denoSpecifier);
