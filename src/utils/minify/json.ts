import type { Minifier } from "../../types";

export const JSONMinifier: Minifier = (content: string) => JSON.stringify(JSON.parse(content));
