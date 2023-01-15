import type { Minifier } from "../../types";

const JSON_BANNER = `/**
  * This file is minified by DLVR.
  */
`;
export const JSONMinifier: Minifier = (content: string) => JSON_BANNER + JSON.stringify(JSON.parse(content));
