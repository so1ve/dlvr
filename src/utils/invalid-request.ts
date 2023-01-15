export const invalidRequestPath = eventHandler((_event) => {
  throw createError({ message: "Invalid request path", status: 400, fatal: true });
});
