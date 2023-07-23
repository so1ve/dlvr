import destr from "destr";

export const JSONMinifier = defineMinifier((code: string) =>
	JSON.stringify(destr(code, { strict: true })),
);
