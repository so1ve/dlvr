export default defineEventHandler(async (event) => {
  const data = await useStorage().getItem("assets/server/index.html");
  event.node.res.setHeader("Content-Type", "text/html; charset=utf-8");
  return data;
});
