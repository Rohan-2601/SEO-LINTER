import fs from "fs";
import { reportResults } from "./reporter.js";
import { runRulesOnHtml } from "./urlUtils.js";

export async function runUrlScan(url) {
  let html;

  try {
    const res = await fetch(url);
    html = await res.text();
  } catch (err) {
    console.error(` Failed to fetch URL: ${url}`);
    return {
      file: url,
      violations: [{ message: "Failed to fetch URL (network error)" }]
    };
  }

  return runRulesOnHtml(html, url);
}

export async function runMultipleUrlScan(filePath) {
  const urls = fs
    .readFileSync(filePath, "utf-8")
    .split("\n")
    .map((u) => u.trim())
    .filter(Boolean);

  const results = [];

  for (const url of urls) {
    console.log(`\n🔍 Checking: ${url}`);
    const result = await runUrlScan(url);
    results.push(result);
  }


  
  reportResults(results, []);
}

