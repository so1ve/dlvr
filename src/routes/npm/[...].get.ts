import mimeDetector from "mime";

import { BANNED_NPM, MAX_CACHE, resolveNPMURL } from "../../config";
import type { ParsedNPMURL } from "../../utils/parse";

const PREFIX = "/npm/";

export default eventHandler(async (event) => {
	const query = getQuery(event);
	const shouldMinify = query.minify !== undefined || query.min !== undefined;
	const requestPath = event.path ?? "";
	let parsed: ParsedNPMURL;
	try {
		parsed = parseNPMURL(getPathOnly(requestPath).slice(PREFIX.length));
	} catch (e: any) {
		throw fatalError({ message: e.message, status: 400 });
	}
	const normalizedPath = generateNPMURL(parsed);
	if (isBanned(BANNED_NPM, normalizedPath)) {
		throw fatalError({
			message: "This package / version / file is banned.",
			status: 403,
		});
	}
	const requestURL = resolveNPMURL(parsed);
	let originalMime!: string;
	let res = await fetch(requestURL)
		.then(async (r) => {
			const res = await r.arrayBuffer();
			if (!r.ok) {
				const message = uint8ArrayToString(new Uint8Array(res));
				throw fatalError({ message, status: r.status });
			}
			if (r.headers.has("Content-Type")) {
				originalMime = r.headers.get("Content-Type")!;
			}
			originalMime = mimeDetector.getType(r.url) ?? originalMime;

			return res;
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
	if (parsed.version !== "latest") {
		event.node.res.setHeader("Cache-Control", MAX_CACHE);
	}

	return res;
});
