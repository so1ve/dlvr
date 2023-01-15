import type { ParsedGithubURL, ParsedNPMURL } from "../utils/parse";

export type MaybePromise<T> = T | Promise<T>;

export type GitHubURLResolver = (parsed: ParsedGithubURL) => string;
export type NPMURLResolver = (parsed: ParsedNPMURL) => string;
