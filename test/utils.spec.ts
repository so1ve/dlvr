import { describe, expect, it } from "vitest";

describe("utils", () => {
	describe("minify", () => {
		it("js", async () => {
			const js = `import * as kons from 'kons'
  const foo = 'bar'
  kons.log(foo)`;

			await expect(minifyString(js, "js")).resolves.toMatchInlineSnapshot(`
				"/**
				 * This JavaScript file is minified by DLVR using esbuild@0.20.1.
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

			await expect(minifyString(css, "css")).resolves.toMatchInlineSnapshot(`
				"/**
				 * This CSS file is minified by DLVR using esbuild@0.20.1.
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

			await expect(minifyString(json, "json")).resolves.toMatchInlineSnapshot(
				'"{\\"foo\\":{\\"bar\\":[\\"baz\\",{\\"qux\\":\\"test\\"}]}}"',
			);
		});

		it("html", async () => {
			const html = `<html>
  <head>
    <title>Test</title>
  </head>
  <body>
    <div class="foo">
      <p>bar</p>
    </div>
  </body>
</html>`;

			await expect(minifyString(html, "html")).resolves.toMatchInlineSnapshot(`
        "<!--
          This HTML file is minified by DLVR using html-minifier-terser@7.2.0.
          DLVR: https://github.com/so1ve/dlvr
          html-minifier-terser: https://github.com/terser/html-minifier-terser
        -->
        <html><head><title>Test</title></head><body><div class=foo><p>bar</p></div></body></html>"
      `);
		});
	});
});
