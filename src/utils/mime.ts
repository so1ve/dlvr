// e.g text/css; charset=utf-8 -> text/css
export const getContentMime = (m: string) => m.split(";")[0];
