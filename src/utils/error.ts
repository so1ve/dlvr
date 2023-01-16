import type { H3Error } from "h3";

type Input = Omit<Partial<H3Error> & {
  status?: number | undefined
  statusText?: string | undefined
}, "fatal">;

export const fatalError = (input: Input) => createError({
  ...input,
  fatal: true,
});
