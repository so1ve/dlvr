import mimeDetector from "mime";

import { BANNED_GITHUB, MAX_CACHE, resolveGitHubURL } from "../../config";
import type { ParsedGithubURL } from "../../utils/parse";

const PREFIX = "/gh/";

export default eventHandler(async (event) => {
	const query = getQuery(event);
	const shouldMinify = query.minify !== undefined || query.min !== undefined;
	const requestPath = event.path ?? "";
	let parsed: ParsedGithubURL;
	try {
		parsed = parseGithubURL(getPathOnly(requestPath).slice(PREFIX.length));
	} catch (e: any) {
		throw fatalError({ message: e.message, status: 400 });
	}
	const normalizedPath = generateGitHubURL(parsed);
	if (isBanned(BANNED_GITHUB, normalizedPath)) {
		throw fatalError({
			message: "This owner / repo / branch / file is banned.",
			status: 403,
		});
	}
	const requestURL = resolveGitHubURL(parsed);
	let originalMime = "";
	let res = await fetch(requestURL)
		.then((r) => {
			if (r.status === 400 && parsed.owner && !parsed.repo) {
				throw fatalError({
					message: `Bad request: ${parsed.owner}`,
					status: 400,
				});
			}
			if (r.status === 400 && parsed.owner && parsed.repo) {
				throw fatalError({
					message: `Repo not found: ${parsed.owner}/${parsed.repo}`,
					status: 400,
				});
			}
			if (r.status === 404 && parsed.path) {
				throw fatalError({
					message: `File not found: ${parsed.owner}/${parsed.repo}/${parsed.path}`,
					status: 404,
				});
			}
			if (r.headers.has("Content-Type")) {
				originalMime = r.headers.get("Content-Type")!;
			}
			const extraMime = getExtraMime(originalMime);
			originalMime = mimeDetector.getType(r.url) ?? originalMime;
			if (extraMime) {
				originalMime += `; ${extraMime}`;
			}

			return r.arrayBuffer();
		})
		.then((r) => new Uint8Array(r));
	const contentMime = getContentMime(originalMime);
	const extension =
		getExtension(parsed.path) ?? mimeDetector.getExtension(contentMime);
	if (
		shouldMinify &&
		extension &&
		SUPPORTED_MINIFY_EXTENSIONS.includes(extension)
	) {
		res = await minify(res, extension as any);
	}
	event.node.res.setHeader("Content-Type", originalMime);
	event.node.res.setHeader("Cache-Control", MAX_CACHE);

	return res;
});
