export default {
  id: "multiple-h1",
  level: "warn",
  check($) {
    const count = $("h1").length;

    if (count === 0) {
      return {
        rule: this.id,
        level: this.level,
        message:
          "Missing <h1> tag\n" +
          "   → Fix: Add a single main heading <h1> on the page\n" +
          "   → Why: Search engines use the <h1> to understand the main topic of the page."
      };
    }

    if (count > 1) {
      return {
        rule: this.id,
        level: this.level,
        message:
          "Multiple <h1> tags found\n" +
          "   → Fix: Keep only one <h1> and convert others to <h2> or <h3>\n" +
          "   → Why: Multiple <h1> tags weaken the semantic structure of the page."
      };
    }
  }
};

