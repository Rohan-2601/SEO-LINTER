export default {
  id: "missing-img-alt",
  level: "warn",
  check($) {
    const images = $("img");
    const violations = [];

    images.each((i, el) => {
      const alt = $(el).attr("alt");
      if (!alt) {
        // Collect snippet for context
        const src = $(el).attr("src") || "unknown-src";
        violations.push({
          rule: this.id,
          level: this.level,
          message:
            `Image missing alt text (src="${src}")\n` +
            "   → Fix: Add alt=\"Description of image\" attribute.\n" +
            "   → Why: Alt text improves accessibility (screen readers) and SEO (image search)."
        });
      }
    });

    if (violations.length > 0) {
      // Aggregate if multiple images fail, or return list?
      // Since urlUtil spreads results, we can return the first critical one or aggregate.
      // For simplicity, let's return the first 5 violations max to avoid spam.
      return violations[0]; 
      
      /* Note: A proper refactor would allow returning array of violations, 
         but our urlUtils expects a SINGLE violation object or null per rule call currently. 
         Let's stick to single object message approach for now or minimal refactor.
      */
    }
  }
};
