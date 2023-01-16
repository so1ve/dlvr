import type { GitHubBanned, GitHubURLResolver, NPMBanned, NPMURLResolver } from "./types";

const GITHUBRAW = "https://raw.githubusercontent.com";
const UNPKG = "https://unpkg.com";

export const resolveGitHubURL: GitHubURLResolver = ({ owner, repo, branch, path }) => `${GITHUBRAW}/${owner}/${repo}/${branch}/${path}`;
export const resolveNPMURL: NPMURLResolver = parsed => `${UNPKG}/${parsed.package}@${parsed.version}${parsed.path ? `/${removeTrailingSlash(parsed.path)}` : ""}`;
export const MAX_CACHE = "public, max-age=31536000, immutable";
export const LINK_BANNER = [
  "DLVR: https://github.com/so1ve/dlvr",
  "esbuild: https://esbuild.github.io",
];
export const BANNED_NPM_PACKAGES: NPMBanned = [

];
export const BANNED_GITHUB: GitHubBanned = [
  {
    owner: "foo",
    repo: "bar",
  },
];
