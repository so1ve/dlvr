interface ParsedGithubURL {
  owner: string
  repo: string
  branch: string
  path: string
}

const MATCHER = /^\/gh\/([^/]+)\/([^/@]+)(?:@([^/]+))?(?:\/(.*))?$/;

export function parseGithubURL(url: string): ParsedGithubURL {
  const match = MATCHER.exec(url);
  if (!match) {
    throw new Error(`Invalid github url: ${url}`);
  }
  return {
    owner: match[1],
    repo: match[2],
    branch: match[3] || "master",
    path: match[4] || "",
  };
}
