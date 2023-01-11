interface ParsedGithubURL {
  owner: string
  repo: string
  branch: string
  path: string
}

// Parse github url.
// Example:
// Given: /gh/owner/repo@branch/path/to/file
// Return: { owner: 'owner', repo: 'repo', branch: 'branch', path: 'path/to/file' }
// Given: /gh/owner/repo/path/to/file
// Return: { owner: 'owner', repo: 'repo', branch: 'master' (or main - this is the default branch), path: 'path/to/file' }
// Given: /gh/owner/repo
// Return: { owner: 'owner', repo: 'repo', branch: 'master' (or main - this is the default branch), path: '' }
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
