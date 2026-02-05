import chalk from "chalk";

export function reportResults(results, projectWarnings = []) {
  let warningCount = 0;

  console.log(chalk.bold("\n🔎 SEO Lint Report"));

  for (const page of results) {
    console.log(chalk.gray("────────────────────────────────────────────────"));
    console.log(chalk.cyan.bold(`  📄 Page: ${page.file}`));
    
    // Show Score
    const score = page.score !== undefined ? page.score : 0;
    let scoreColor = chalk.red;
    if (score >= 90) scoreColor = chalk.green;
    else if (score >= 70) scoreColor = chalk.yellow;
    
    console.log(chalk.white.bold(`  🏆 SEO Score: ${scoreColor(score + "/100")}`));
    console.log(chalk.gray("────────────────────────────────────────────────"));

    // 1. Metadata
    console.log(chalk.white.bold("\n  Captured Tags:"));
    const tags = [
      { label: "Title", val: page.meta?.title },
      { label: "Description", val: page.meta?.description },
      { label: "H1", val: page.meta?.h1 },
      { label: "H2 Count", val: page.meta?.h2Count ? `${page.meta.h2Count} found` : null },
      { label: "OG Title", val: page.meta?.ogTitle },
      { label: "OG Desc", val: page.meta?.ogDescription },
      { label: "Keywords", val: page.meta?.keywords },
      { label: "Author", val: page.meta?.author }
    ];

    tags.forEach(t => {
      if (t.val) {
        console.log(`    ${chalk.green("✓")} ${chalk.gray(t.label.padEnd(12))} : ${chalk.white(t.val)}`);
      }
    });

    // 2. Violations (if any)
    if (page.violations && page.violations.length > 0) {
       console.log(chalk.yellow.bold("\n  Issues Found:"));
       for (const v of page.violations) {
          warningCount++;
          const [title, ...rest] = v.message.split("\n");
          console.log(`    ${chalk.red("✖")} ${chalk.yellow(title)}`);
          rest.forEach((line) => {
            console.log(chalk.gray("       " + line));
          });
       }
    }

    // 3. Passed Rules (if any)
    if (page.passedRules && page.passedRules.length > 0) {
      console.log(chalk.white.bold("\n  Passed Rules:"));
      const ruleNames = {
        "missing-title": "Title tag present",
        "missing-meta-description": "Meta description present",
        "multiple-h1": "Single H1 tag structure",
        "missing-canonical": "Canonical link present",
        "missing-open-graph": "Open Graph tags present",
        "missing-meta-keywords": "Meta keywords present",
        "missing-meta-author": "Meta author present",
        "missing-img-alt": "All images have alt text"
      };

      page.passedRules.forEach(ruleId => {
        const name = ruleNames[ruleId] || ruleId;
        // Don't show "passed" if it failed length check (which is same rule ID usually? NO, length check returns violation with same ID)
        // Wait, if a rule returns a violation, it is NOT in passedRules. Correct.
        console.log(`    ${chalk.green("✓")} ${chalk.cyan(name)}`);
      });
    }
  }

  console.log(chalk.gray("\n────────────────────────────────────────────────"));

  if (warningCount > 0) {
     console.log(chalk.yellow.bold(`⚠  ${warningCount} SEO warning${warningCount > 1 ? "s" : ""} found`));
  } else {
     console.log(chalk.green.bold("✓ No SEO issues found"));
  }

  process.exit(0);
}



