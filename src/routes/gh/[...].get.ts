import mimeDetector from "mime";

import { MAX_CACHE, resolveGitHubURL } from "../../config";

export default eventHandler(async (event) => {
  const query = getQuery(event);
  const shouldMinify = query.minify !== undefined || query.min !== undefined;
  const requestPath = event.path || "";
  let parsed;
  try {
    parsed = parseGithubURL(requestPath);
  } catch (e: any) {
    throw createError({ message: e.message, status: 400 });
  }
  const requestURL = resolveGitHubURL(parsed);
  let originalMime!: string;
  let res = await fetch(requestURL)
    .then((r) => {
      if (r.headers.has("Content-Type")) {
        originalMime = r.headers.get("Content-Type")!;
      }
      originalMime = mimeDetector.getType(r.url) || originalMime;
      return r.arrayBuffer();
    })
    .then(r => new Uint8Array(r));
  const contentMime = getContentMime(originalMime);
  if (shouldMinify && SUPPORTED_MINIFY_MIMES.includes(contentMime)) {
    res = await minify(res, contentMime as any);
  }
  event.node.res.setHeader("Content-Type", originalMime);
  event.node.res.setHeader("Cache-Control", MAX_CACHE);
  return res;
});
