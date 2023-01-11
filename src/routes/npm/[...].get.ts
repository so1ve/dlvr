export default eventHandler(async (event) => {
  // Proxies unpkg
  const requestPath = event.path!.slice("/npm".length);
  const url = `https://unpkg.com${requestPath}`;
  let mime!: string;
  const res = await fetch(url)
    .then(async (r) => {
      if (r.redirected) {
        await sendRedirect(event, r.url.replace("https://unpkg.com", "/npm"));
      }
      return r;
    })
    .then((r) => {
      mime = r.headers.get("Content-Type") || "text/plain";
      return r.arrayBuffer();
    })
    .then(r => new Uint8Array(r));
  event.node.res.setHeader("Content-Type", mime);
  event.node.res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
  return res;
});
