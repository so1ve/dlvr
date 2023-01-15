const decoder = new TextDecoder();
const encoder = new TextEncoder();

export const uint8ArrayToString = (arr: Uint8Array) => decoder.decode(arr);
export const stringToUint8Array = (str: string) => encoder.encode(str);
