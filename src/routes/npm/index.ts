export default eventHandler((_event) => {
  throw createError({ message: "Invalid request path", status: 400 });
});
