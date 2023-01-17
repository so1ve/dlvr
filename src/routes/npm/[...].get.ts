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
  let status!: number;
  let res = await fetch(requestURL)
    .then(async (r) => {
      status = r.status;
      if (r.headers.has("Content-Type")) {
        originalMime = r.headers.get("Content-Type")!;
      }
      originalMime = mimeDetector.getType(r.url) || originalMime;
      return r.arrayBuffer();
    })
    .then((r) => {
      const res = new Uint8Array(r);
      const text = uint8ArrayToString(res);
      if (status === 404) {
        if (text.startsWith("Cannot find package")) {
          throw fatalError({ message: text, status: 404 });
        } else {
          throw fatalError({ message: `File not found: ${parsed.package}@${parsed.version}/${parsed.path}`, status: 404 });
        }
      }
      return res;
    });
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
