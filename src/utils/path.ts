import { basename } from "node:path";

export const removeTrailingSlash = (url: string) => url.replace(/\/$/, "");
export const removeQuery = (url: string) => url.replace(/\?.*$/, "");
export const removeHash = (url: string) => url.replace(/#.*$/, "");
export const getPathOnly = (url: string) => removeQuery(removeHash(url));

export function getExtension(path: string) {
	const filename = basename(path);
	const splited = filename.split(".");
	if (splited.length <= 1) {
		return null;
	}

	return splited[splited.length - 1];
}
