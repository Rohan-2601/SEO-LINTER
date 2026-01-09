import fs from "fs";
import path from "path";
import { parseHtml } from "./parser.js";
import { reportResults } from "./reporter.js";

export async function runScan(rootDir) {
  const htmlFiles = [];
  const projectWarnings = [];

  function walk(dir) {
    for (const file of fs.readdirSync(dir)) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) walk(fullPath);
      else if (file.endsWith(".html")) htmlFiles.push(fullPath);
    }
  }

  walk(rootDir);

  
  const robotsPath = path.join(rootDir, "robots.txt");
  if (!fs.existsSync(robotsPath)) {
   projectWarnings.push({
  level: "warn",
  message:
    "robots.txt not found\n" +
    "   → Fix: Add a robots.txt file at the root of your site\n" +
    "   → Why: robots.txt tells search engines which pages they can or cannot crawl."
});

  }

  const sitemapPath = path.join(rootDir, "sitemap.xml");
  if (!fs.existsSync(sitemapPath)) {
    projectWarnings.push({
  level: "warn",
  message:
    "sitemap.xml not found\n" +
    "   → Fix: Add a sitemap.xml file listing important URLs\n" +
    "   → Why: Sitemaps help search engines discover your pages faster and more reliably."
});

  }

  if (htmlFiles.length === 0) {
    reportResults([], projectWarnings);
    process.exit(0);
  }

  const results = htmlFiles.map(parseHtml);

  
  reportResults(results, projectWarnings);
}
