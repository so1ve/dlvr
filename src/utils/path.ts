export const removeTrailingSlash = (url: string) => url.replace(/\/$/, "");
export const removeQuery = (url: string) => url.replace(/\?.*$/, "");
export const removeHash = (url: string) => url.replace(/#.*$/, "");
export const getPathOnly = (url: string) => removeQuery(removeHash(url));
