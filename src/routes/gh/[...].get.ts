export default eventHandler(async (event) => {
  const requestPath = event.path!;
  let parsed;
  try {
    parsed = parseGithubURL(requestPath);
  } catch (e: any) {
    throw createError({ message: e.message, status: 400 });
  }
  const { owner, repo, branch, path } = parsed;
  const url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;
  let mime!: string;
  const res = await fetch(url)
    .then((r) => {
      mime = r.headers.get("Content-Type") || "text/plain";
      return r.arrayBuffer();
    })
    .then(r => new Uint8Array(r));
  event.node.res.setHeader("Content-Type", mime);
  event.node.res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
  return res;
});
