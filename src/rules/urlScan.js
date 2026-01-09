import * as cheerio from "cheerio";
import { reportResults } from "./reporter.js";
import { runRulesOnHtml } from "./urlUtils.js";

export async function runUrlScan(url) {
  let html;

  try {
    const res = await fetch(url);
    html = await res.text();
  } catch (err) {
    console.error(`Failed to fetch URL: ${url}`);
    process.exit(1);
  }

  const result = runRulesOnHtml(html, url);

  reportResults([result], []);
}
