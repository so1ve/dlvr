import mimeDetector from "mime/lite";

import { resolveNPMURL } from "../../config";

export default eventHandler(async (event) => {
  const query = getQuery(event);
  const shouldMinify = !!query.minify || !!query.min;
  let parsed;
  try {
    parsed = parseNPMURL(event.path!);
  } catch (e: any) {
    throw createError({ message: e.message, status: 400 });
  }
  const requestURL = resolveNPMURL(parsed);
  let mime = mimeDetector.getType(requestURL) || "text/plain";
  let res = await fetch(requestURL)
    .then((r) => {
      if (r.headers.has("Content-Type")) {
        mime = r.headers.get("Content-Type")!;
      }
      return r.arrayBuffer();
    })
    .then(r => new Uint8Array(r));
  if (shouldMinify && SUPPORTED_MINIFY_MIMES.includes(mime)) {
    res = await minify(res, getContentMime(mime) as any);
  }
  event.node.res.setHeader("Content-Type", mime);
  if (parsed.version !== "latest") {
    event.node.res.setHeader("Cache-Control", MAX_CACHE);
  }
  return res;
});
