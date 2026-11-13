// Renders ```mermaid code blocks as diagrams in the mdBook docs.
// Copy to <project root>/docs/theme/mermaid-init.js. Needs internet; offline, diagrams stay as code.
(function () {
  function render() {
    var blocks = document.querySelectorAll("pre > code.language-mermaid");
    if (!blocks.length) return;
    blocks.forEach(function (code) {
      var div = document.createElement("div");
      div.className = "mermaid";
      div.textContent = code.textContent;
      code.parentElement.replaceWith(div);
    });
    var s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/mermaid@10.9.1/dist/mermaid.min.js";
    s.onload = function () {
      var dark = /\b(coal|navy|ayu)\b/.test(document.documentElement.className);
      mermaid.initialize({ startOnLoad: false, theme: dark ? "dark" : "default", securityLevel: "strict" });
      mermaid.run({ querySelector: ".mermaid" });
    };
    document.head.appendChild(s);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", render);
  else render();
})();
