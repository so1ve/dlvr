import { describe, expect, it } from "vitest";

describe("utils", () => {
  describe("minify", () => {
    it("js", async () => {
      const js = `import * as kons from 'kons'
  const foo = 'bar'
  kons.log(foo)`;
      expect(await minifyString(js, "js")).toMatchInlineSnapshot(`
        "/**
         * This JavaScript file is minified by DLVR using esbuild@0.17.3.
         * DLVR: https://github.com/so1ve/dlvr
         * esbuild: https://esbuild.github.io
         */
        import*as o from\\"kons\\";const r=\\"bar\\";o.log(r);
        "
      `);
    });
    it("css", async () => {
      const css = `div.foo * {
  display: block;
}`;
      expect(await minifyString(css, "css")).toMatchInlineSnapshot(`
        "/**
         * This CSS file is minified by DLVR using esbuild@0.17.3.
         * DLVR: https://github.com/so1ve/dlvr
         * esbuild: https://esbuild.github.io
         */
        div.foo *{display:block}
        "
      `);
    });
    it("json", async () => {
      const json = `{
  "foo": {
    "bar": [
      "baz",
      {
        "qux": "test"
      }
    ]
  }
}`;
      expect(await minifyString(json, "json")).toMatchInlineSnapshot("\"{\\\"foo\\\":{\\\"bar\\\":[\\\"baz\\\",{\\\"qux\\\":\\\"test\\\"}]}}\"");
    });
  });
});
