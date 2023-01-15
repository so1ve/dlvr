import mimeDetector from "mime/lite";

import { resolveGitHubURL } from "../../config";

export default eventHandler(async (event) => {
  const query = getQuery(event);
  const shouldMinify = !!query.minify || !!query.min;
  const requestPath = event.path!;
  let parsed;
  try {
    parsed = parseGithubURL(requestPath);
  } catch (e: any) {
    throw createError({ message: e.message, status: 400 });
  }
  const requestURL = resolveGitHubURL(parsed);
  const mime = mimeDetector.getType(requestPath) || "text/plain";
  let res = await fetch(requestURL)
    .then(r => r.arrayBuffer())
    .then(r => new Uint8Array(r));
  if (shouldMinify && SUPPORTED_MINIFY_MIMES.includes(mime)) {
    res = await minify(res, getContentMime(mime) as any);
  }
  event.node.res.setHeader("Content-Type", mime);
  event.node.res.setHeader("Cache-Control", MAX_CACHE);
  return res;
});
