import type { GitHubURLResolver, NPMURLResolver } from "./types";

const GITHUBRAW = "https://raw.githubusercontent.com";
export const resolveGitHubURL: GitHubURLResolver = ({ owner, repo, branch, path }) => `${GITHUBRAW}/${owner}/${repo}/${branch}/${path}`;

const UNPKG = "https://unpkg.com";
export const resolveNPMURL: NPMURLResolver = parsed => `${UNPKG}/${parsed.package}@${parsed.version}${parsed.path ? `/${removeTrailingSlash(parsed.path)}` : ""}`;
