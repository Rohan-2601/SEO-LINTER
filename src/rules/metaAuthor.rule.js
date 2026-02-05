export default {
  id: "missing-meta-author",
  level: "warn",
  check($) {
    const author = $('meta[name="author"]').attr("content");
    if (!author) {
      return {
        rule: this.id,
        level: this.level,
        message:
          "Missing meta author\n" +
          "   → Fix: Add <meta name=\"author\" content=\"Author Name\">\n" +
          "   → Why: Identifying the author builds credibility and trust (E-E-A-T)."
      };
    }
  }
};
