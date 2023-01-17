import mimeDetector from "mime";

import { BANNED_NPM_PACKAGES, MAX_CACHE, resolveNPMURL } from "../../config";
import type { ParsedNPMURL } from "../../utils/parse";

export default eventHandler(async (event) => {
  const query = getQuery(event);
  const shouldMinify = query.minify !== undefined || query.min !== undefined;
  const requestPath = event.path || "";
  let parsed: ParsedNPMURL;
  try {
    parsed = parseNPMURL(getPathOnly(requestPath));
  } catch (e: any) {
    throw fatalError({ message: e.message, status: 400 });
  }
  if (BANNED_NPM_PACKAGES.includes(parsed.package)) {
    throw fatalError({ message: `Banned package: ${parsed.package}`, status: 403 });
  }
  const requestURL = resolveNPMURL(parsed);
  let originalMime!: string;
  let res = await fetch(requestURL)
    .then((r) => {
      if (r.status === 404) {
        throw fatalError({ message: `Package not found: ${parsed.package}`, status: 404 });
      }
      if (r.headers.has("Content-Type")) {
        originalMime = r.headers.get("Content-Type")!;
      }
      originalMime = mimeDetector.getType(r.url) || originalMime;
      return r.arrayBuffer();
    })
    .then(r => new Uint8Array(r));
  const contentMime = getContentMime(originalMime);
  const extension = getExtension(parsed.path) || mimeDetector.getExtension(contentMime);
  if (shouldMinify && extension && SUPPORTED_MINIFY_EXTENSIONS.includes(extension)) {
    res = await minify(res, extension as any);
  }
  event.node.res.setHeader("Content-Type", originalMime);
  if (parsed.version !== "latest") {
    event.node.res.setHeader("Cache-Control", MAX_CACHE);
  }
  return res;
});
