import type { H3Error } from "h3";

type Input = Omit<
	Partial<H3Error> & {
		status?: number | undefined;
		statusText?: string | undefined;
	},
	"fatal" | "statusCode"
>;

// TODO: use a npm library
const statusTextMap: Record<number, string> = {
	400: "Bad Request",
	403: "Forbidden",
	500: "Internal Server Error",
};

export const fatalError = (input: Input) =>
	createError({
		statusMessage: input.status ? statusTextMap[input.status] : undefined,
		...input,
		fatal: true,
	});
