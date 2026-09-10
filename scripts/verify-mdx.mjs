import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { runInNewContext } from "node:vm";
import { compileMDX } from "@content-collections/mdx";
const coreRequire = createRequire(import.meta.resolve("@content-collections/core"));
const serialize = coreRequire("serialize-javascript");
const value = { text: "</script> Привет", date: new Date("2026-09-08T00:00:00Z"), nested: [1, true] };
const result = runInNewContext("(" + serialize(value) + ")");
assert.equal(result.text, value.text);
assert.equal(result.date.toISOString(), value.date.toISOString());
const code = await compileMDX({ cache: (document, compile) => compile(document) }, {
  _meta: { path: "verification.mdx", fileName: "verification.mdx", directory: ".", extension: "mdx" },
  content: "# Проверка MDX\n\n**Portfolio** with JSX: <span>RU / EN</span>.",
});
assert.ok(code.includes("Portfolio"));
const mdxRequire = createRequire(import.meta.resolve("@content-collections/mdx"));
const bundlerRequire = createRequire(mdxRequire.resolve("mdx-bundler"));
const { v4 } = bundlerRequire("uuid");
assert.match(v4(), /^[0-9a-f-]{36}$/);
const frontmatterRequire = createRequire(bundlerRequire.resolve("remark-mdx-frontmatter"));
const toml = frontmatterRequire("toml");
assert.equal(toml.parse('title = "Portfolio"').title, "Portfolio");
console.log("PASS MDX compilation, serialization, UUID and TOML compatibility");
