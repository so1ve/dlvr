import {} from "type-fest";

import type { ParsedGithubURL, ParsedNPMURL } from "../utils/parse";

export type MaybePromise<T> = T | Promise<T>;
export type MaybeArray<T> = T | T[];

export type GitHubURLResolver = (parsed: ParsedGithubURL) => string;
export type NPMURLResolver = (parsed: ParsedNPMURL) => string;

export type Minifier = (code: string) => MaybePromise<string>;

export type NPMBannedList = string[];
export type GitHubBannedList = string[];
