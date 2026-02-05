export default {
  id: "missing-meta-keywords",
  level: "warn",
  check($) {
    const keywords = $('meta[name="keywords"]').attr("content");
    if (!keywords) {
      return {
        rule: this.id,
        level: this.level,
        message:
          "Missing meta keywords\n" +
          "   → Fix: Add <meta name=\"keywords\" content=\"keyword1, keyword2\">\n" +
          "   → Why: Keyowrds help search engines understand the topic of the page."
      };
    }
  }
};
