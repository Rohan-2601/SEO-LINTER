export default {
  id: "missing-meta-description",
  level: "warn",
  check($) {
    const desc = $('meta[name="description"]').attr("content");
    if (!desc) {
      return {
        rule: this.id,
        level: this.level,
        message:
          "Missing meta description\n" +
          "   → Fix: Add <meta name=\"description\" content=\"Short summary (140–160 chars)\">\n" +
          "   → Why: Search engines use meta descriptions to decide what text appears under your title in search results."
      };
    }
  }
};

