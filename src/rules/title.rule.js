export default {
  id: "missing-title",
  level: "warn",
  check($) {
    const title = $("title").text().trim();
    if (!title) {
      return {
        rule: this.id,
        level: this.level,
        message:
          "Missing <title> tag\n" +
          "   → Fix: Add <title>Your Page Title</title>\n" +
          "   → Why: The title tag is one of the strongest SEO signals."
      };
    }

    if (title.length < 10) {
      return {
        rule: this.id,
        level: "warn",
        message:
          `Title is too short (${title.length} chars)\n` +
          "   → Fix: Expand your title to at least 10 characters.\n" +
          "   → Why: Short titles may not provide enough context for search engines."
      };
    }

    if (title.length > 60) {
      return {
        rule: this.id,
        level: "warn",
        message:
          `Title is too long (${title.length} chars)\n` +
          "   → Fix: Keep title under 60 characters.\n" +
          "   → Why: Long titles get truncated in search results."
      };
    }
  }
};

