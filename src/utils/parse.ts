export interface ParsedGithubURL {
  owner: string
  repo: string
  branch: string
  path: string
}

const GITHUB_MATCHER = /^\/gh\/([^/]+)\/([^/@]+)(?:@([^/]+))?(?:\/(.*))?$/;

export function parseGithubURL(url: string): ParsedGithubURL {
  const match = GITHUB_MATCHER.exec(url);
  if (!match) {
    throw fatalError({ message: `Invalid GitHub url: ${url}`, status: 400 });
  }
  return {
    owner: match[1],
    repo: match[2],
    branch: match[3] || "master",
    path: getPathOnly(match[4] || ""),
  };
}

export interface ParsedNPMURL {
  package: string
  version: string
  path: string
}

// TODO: Support org package (@org/pkg)
const NPM_MATCHER = /^\/npm\/([^/@]+)(?:@([^/]+))?(?:\/(.*))?$/;

export function parseNPMURL(url: string): ParsedNPMURL {
  const match = NPM_MATCHER.exec(url);
  if (!match) {
    throw fatalError({ message: `Invalid NPM url: ${url}`, status: 400 });
  }
  return {
    package: match[1],
    version: match[2] || "latest",
    path: getPathOnly(match[3] || ""),
  };
}
