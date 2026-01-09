import * as cheerio from "cheerio";

import titleRule from "./rules/title.rule.js";
import metaRule from "./rules/metaDescription.rule.js";
import h1Rule from "./rules/h1.rule.js";
import canonicalRule from "./rules/canonical.rule.js";
import ogRule from "./rules/openGraph.rule.js";

export function runRulesOnHtml(html, identifier) {
  const $ = cheerio.load(html);
  const violations = [];

  const rules = [
    titleRule,
    metaRule,
    h1Rule,
    canonicalRule,
    ogRule
  ];

 
  for (const rule of rules) {
    const result = rule.check($);
    if (result) violations.push(result);
  }

 
  const hasAnySeoTag =
    $("title").length ||
    $('meta[name="description"]').length ||
    $("h1").length ||
    $('link[rel="canonical"]').length ||
    $('meta[property^="og:"]').length;

  if (!hasAnySeoTag) {
    violations.push({
      message:
        "Page returned no SEO-relevant HTML\n" +
        "   → Fix: This page might be an SSR error, API failure, or fully client-side rendered.\n" +
        "   → Why: Search engines cannot index pages that do not include metadata in the initial HTML."
    });
  }

  return {
    file: identifier,
    violations
  };
}
