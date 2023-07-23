export const invalidRequestPath = eventHandler((_event) => {
	throw fatalError({ message: "Invalid request path", status: 400 });
});
