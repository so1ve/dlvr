export interface ParsedGithubURL {
	owner: string;
	repo: string;
	branch: string;
	path: string;
}

export const GITHUB_MATCHER = /^([^/]+)\/([^/@]+)(?:@([^/]+))?\/(.*)$/;

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

export const generateGitHubURL = ({
	owner,
	repo,
	branch,
	path,
}: ParsedGithubURL) => `${owner}/${repo}@${branch}/${path}`;

export interface ParsedNPMURL {
	pkg: string;
	version: string;
	path: string;
}

export const NPM_MATCHER =
	/^((?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*)(?:@([^/]+))?(?:\/(.*))?$/;

export function parseNPMURL(url: string): ParsedNPMURL {
	const match = NPM_MATCHER.exec(url);
	if (!match) {
		throw fatalError({ message: `Invalid NPM url: ${url}`, status: 400 });
	}

	return {
		pkg: match[1],
		version: match[2] || "latest",
		path: getPathOnly(match[3] || ""),
	};
}

export const generateNPMURL = ({ pkg, version, path }: ParsedNPMURL) =>
	`${pkg}@${version}/${path}`;
