import fs from "fs";
import * as cheerio from "cheerio";

import titleRule from "./rules/title.rule.js";
import metaRule from "./rules/metaDescription.rule.js";
import h1Rule from "./rules/h1.rule.js";
import canonicalRule from "./rules/canonical.rule.js";
import ogRule from "./rules/openGraph.rule.js";


const rules = [
  titleRule,
  metaRule,
  h1Rule,
  canonicalRule,
  ogRule
];


export function parseHtml(filePath) {
  const html = fs.readFileSync(filePath, "utf-8");
  const $ = cheerio.load(html);

  const violations = [];

  for (const rule of rules) {
    const result = rule.check($);
    if (result) violations.push(result);
  }

  return {
    file: filePath,
    violations
  };
}


