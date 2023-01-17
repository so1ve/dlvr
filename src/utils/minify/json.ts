export const JSONMinifier = defineMinifier((code: string) => JSON.stringify(JSON.parse(code)));
