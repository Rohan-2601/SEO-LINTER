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
          "   → Why: Search engines use meta descriptions to decide what text appears under your title."
      };
    }

    if (desc.length < 50) {
      return {
        rule: this.id,
        level: "warn",
        message:
          `Meta description is too short (${desc.length} chars)\n` +
          "   → Fix: Write a description between 50 and 160 characters.\n" +
          "   → Why: Short descriptions may not encourage users to click."
      };
    }

    if (desc.length > 160) {
      return {
        rule: this.id,
        level: "warn",
        message:
          `Meta description is too long (${desc.length} chars)\n` +
          "   → Fix: Keep description under 160 characters.\n" +
          "   → Why: Long descriptions are truncated in search results."
      };
    }
  }
};

