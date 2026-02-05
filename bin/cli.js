#!/usr/bin/env node
import { Command } from "commander";
import { reportResults } from "../src/reporter.js";
import { runScan } from "../src/scan.js";
import { runUrlScan, runMultipleUrlScan } from "../src/urlScan.js";

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pkg = require("../package.json");

const program = new Command();

program
  .name("seo-lint-cli")
  .description("SEO linter for built HTML or live URLs")
  .argument("[path]", "Path to built HTML folder")
  .version(pkg.version)    
  .option("--url <url>", "Lint a live URL")
  .option("--urls <file>", "Lint multiple URLs from a text file")
  .parse(process.argv);

const options = program.opts();
const [targetPath] = program.args;

// Multiple URLs mode
if (options.urls) {
  await runMultipleUrlScan(options.urls);
  process.exit(0);
}

// Single URL mode
if (options.url) {
  const result = await runUrlScan(options.url);
  
  reportResults([result], []);
}

// Folder mode
if (!targetPath) {
  console.error(" Please provide a path, --url, or --urls");
  process.exit(1);
}

await runScan(targetPath);


