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
          "   → Why: The title tag is one of the strongest SEO signals. It appears in search results and helps users understand the page."
      };
    }
  }
};

