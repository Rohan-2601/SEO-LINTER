
export default {
  id: "missing-open-graph",
  level: "warn",
  check($) {
    const missing = [];

    if (!$('meta[property="og:title"]').attr("content"))
      missing.push("og:title");

    if (!$('meta[property="og:description"]').attr("content"))
      missing.push("og:description");

    if (!$('meta[property="og:image"]').attr("content"))
      missing.push("og:image");

    if (missing.length > 0) {
      return {
        rule: this.id,
        level: this.level,
        message:
          `Missing Open Graph tags: ${missing.join(", ")}\n` +
          "   → Fix: Add OG tags for social media previews:\n" +
          "        <meta property=\"og:title\" content=\"Your Title\">\n" +
          "        <meta property=\"og:description\" content=\"Short description\">\n" +
          "        <meta property=\"og:image\" content=\"/image.png\">\n" +
          "   → Why: Open Graph tags improve link previews on platforms like WhatsApp, Facebook, Twitter, etc."
      };
    }
  }
};
