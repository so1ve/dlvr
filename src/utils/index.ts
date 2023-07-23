import type { MaybeArray } from "../types";

export const toArray = <T>(arr: MaybeArray<T>) =>
	Array.isArray(arr) ? arr : [arr];
