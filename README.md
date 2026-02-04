# SEO Lint CLI 🚀

[![npm version](https://img.shields.io/npm/v/seo-lint-cli.svg)](https://www.npmjs.com/package/seo-lint-cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm downloads](https://img.shields.io/npm/dt/seo-lint-cli.svg)](https://www.npmjs.com/package/seo-lint-cli)

> A developer-friendly SEO linting tool for keeping your static sites and live URLs search-engine optimized.

`seo-lint-cli` checks your HTML files or live URLs for common SEO mistakes, such as missing titles, meta descriptions, canonical tags, and Open Graph tags. It's designed to be simple, fast, and easy to integrate into your CI/CD pipeline.

## Features ✨

- **📦 Local File Scanning**: Scan a folder of built HTML files (great for SSG sites).
- **🌐 Live URL Scanning**: Check any public URL for SEO issues.
- **📜 Bulk Scanning**: Scan a list of URLs from a text file.
- **⚡ Fast & Lightweight**: parse HTML efficiently using `cheerio`.
- **🎨 Pretty Output**: Clear, colored terminal output using `chalk`.

## Installation 📦

You can run it directly using `npx` or install it globally via `npm`.

### Run with npx (Recommended)

```bash
npx seo-lint-cli <path-to-folder>
```

### Install Globally

```bash
npm install -g seo-lint-cli
```

## Usage 🛠️

### 1. Scan a Local Directory
Scan a directory containing HTML files (e.g., your build output folder):

```bash
seo-lint ./dist
```

### 2. Scan a Live URL
Check a single live URL for SEO violations:

```bash
seo-lint --url https://example.com
```

### 3. Bulk Scan URLs
Scan multiple URLs defined in a text file (one URL per line):

```bash
seo-lint --urls urls.txt
```

**Example `urls.txt`:**
```
https://example.com
https://example.com/about
https://example.com/blog
```

## Rules Checked 🔍

The tool currently checks for the following SEO best practices:

| Rule ID | Description | Why it matters |
| :--- | :--- | :--- |
| `missing-title` | Checks for the `<title>` tag. | Essential for search results and browser tabs. |
| `missing-meta-description` | Checks for `<meta name="description">`. | Improves click-through rates in SERPs. |
| `missing-h1` | Checks for a single `<h1>` tag. | Helps search engines understand the page's main topic. |
| `missing-canonical` | Checks for `<link rel="canonical">`. | Prevents duplicate content issues. |
| `missing-og-tags` | Checks for Open Graph tags (`og:title`, `og:description`, `og:image`). | customized sharing on social media. |

## CLI Options

```bash
Usage: seo-lint-cli [options] [path]

Arguments:
  path                 Path to built HTML folder

Options:
  -V, --version        output the version number
  --url <url>          Lint a live URL
  --urls <file>        Lint multiple URLs from a text file
  -h, --help           display help for command
```

## Development �

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd seo-lint
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Link locally for testing:**
   ```bash
   npm link
   ```

4. **Run the local version:**
   ```bash
   seo-lint ./dist
   ```

## License 📄

MIT
