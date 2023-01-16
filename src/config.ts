import type { GitHubURLResolver, NPMURLResolver } from "./types";

const GITHUBRAW = "https://raw.githubusercontent.com";
const UNPKG = "https://unpkg.com";

export const resolveGitHubURL: GitHubURLResolver = ({ owner, repo, branch, path }) => `${GITHUBRAW}/${owner}/${repo}/${branch}/${path}`;
export const resolveNPMURL: NPMURLResolver = parsed => `${UNPKG}/${parsed.package}@${parsed.version}${parsed.path ? `/${removeTrailingSlash(parsed.path)}` : ""}`;
export const MAX_CACHE = "public, max-age=31536000, immutable";
