import chalk from "chalk";

export function reportResults(results, projectWarnings = []) {
  let warningCount = 0;

  console.log(chalk.bold("\n🔎 SEO Lint Report"));
  console.log(chalk.gray("────────────────────────────────────────────────"));

 
  if (projectWarnings.length > 0) {
    console.log(chalk.magenta.bold("\nProject-Level Issues"));
    for (const w of projectWarnings) {
      warningCount++;
      console.log(
        chalk.yellow(`\n  ⚠  ${chalk.bold(w.message.split("\n")[0])}`)
      );

      const lines = w.message.split("\n").slice(1);
      lines.forEach((line) => {
        console.log(chalk.gray("     " + line));
      });
    }
  }

  // PAGE WARNINGS
  const pagesWithIssues = results.filter((p) => p.violations.length > 0);

  if (pagesWithIssues.length > 0) {
    console.log(chalk.cyan.bold("\nPage-Level Issues"));

    for (const page of pagesWithIssues) {
      console.log(chalk.cyan(`\n  📄 ${page.file}`));

      for (const v of page.violations) {
        warningCount++;

        // Title line
        const [title, ...rest] = v.message.split("\n");
        console.log(chalk.yellow(`    ⚠  ${chalk.bold(title)}`));

        // Explanation lines
        rest.forEach((line) => {
          console.log(chalk.gray("       " + line));
        });
      }
    }
  }

  console.log(chalk.gray("\n────────────────────────────────────────────────"));

  
  if (warningCount > 0) {
    console.log(
      chalk.yellow.bold(`⚠  ${warningCount} SEO warning${warningCount > 1 ? "s" : ""} found`)
    );
  } else {
    console.log(chalk.green.bold("✓ No SEO issues found"));
  }

  process.exit(0);
}

