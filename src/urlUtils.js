import * as cheerio from "cheerio";

import titleRule from "./rules/title.rule.js";
import metaRule from "./rules/metaDescription.rule.js";
import h1Rule from "./rules/h1.rule.js";
import canonicalRule from "./rules/canonical.rule.js";
import ogRule from "./rules/openGraph.rule.js";
import keywordsRule from "./rules/metaKeywords.rule.js";
import authorRule from "./rules/metaAuthor.rule.js";
import imgAltRule from "./rules/imgAlt.rule.js";

export function runRulesOnHtml(html, identifier) {
  const $ = cheerio.load(html);
  const violations = [];

  const rules = [
    titleRule,
    metaRule,
    h1Rule,
    canonicalRule,
    ogRule,
    keywordsRule,
    authorRule,
    imgAltRule
  ];

 
  const passedRules = [];

  for (const rule of rules) {
    const result = rule.check($);
    if (result) {
      violations.push(result);
    } else {
      passedRules.push(rule.id);
    }
  }

  // Scoring Logic
  let score = 100;
  const deductions = {
    "missing-title": 20,
    "missing-h1": 20,
    "missing-meta-description": 20,
    "missing-canonical": 10,
    "missing-open-graph": 10,
    "missing-meta-keywords": 5,
    "missing-meta-author": 5,
    "missing-img-alt": 5,
    "multiple-h1": 5
    // Default for others (length warnings)
  };

  violations.forEach(v => {
    const deduct = deductions[v.rule] || 5; // Default 5 points for warnings not listed
    score -= deduct;
  });

  if (score < 0) score = 0;

  // Check if page is empty effectively
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

  const meta = {
    title: $("title").text().trim(),
    description: $('meta[name="description"]').attr("content"),
    h1: $("h1").first().text().trim(),
    h2Count: $("h2").length,
    ogTitle: $('meta[property="og:title"]').attr("content"),
    ogDescription: $('meta[property="og:description"]').attr("content"),
    keywords: $('meta[name="keywords"]').attr("content"),
    author: $('meta[name="author"]').attr("content")
  };

  return {
    file: identifier,
    violations,
    passedRules,
    score,
    meta
  };
}
