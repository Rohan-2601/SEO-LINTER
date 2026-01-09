export default {
  id: "missing-canonical",
  level: "warn",
  check($) {
    const canonical = $('link[rel="canonical"]').attr("href");
    if (!canonical) {
      return {
        rule: this.id,
        level: this.level,
        message:
          "Missing canonical link\n" +
          "   → Fix: Add <link rel=\"canonical\" href=\"https://your-site.com/page\">\n" +
          "   → Why: Canonical tags prevent duplicate content problems and help search engines know the primary URL."
      };
    }
  }
};

