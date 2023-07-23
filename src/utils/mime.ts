export const getContentMime = (m: string) => m.split(";")[0];
export const getExtraMime = (m: string): string | undefined =>
	m.split(";")[1]?.trim();
