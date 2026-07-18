/* LAST WITNESS — Dialogue Continuity Hotfix 0.2.6
 * Normalizes every in-scene dialogue prompt without altering menu buttons.
 */
(function () {
  "use strict";

  function currentLanguage() {
    try {
      if (window.state && state.language === "th") return "th";
    } catch (_) {}
    return document.documentElement.lang === "th" ? "th" : "en";
  }

  function label() {
    return currentLanguage() === "th"
      ? "แตะเพื่อดำเนินต่อ"
      : "TAP TO CONTINUE";
  }

  function normalize(root) {
    const scope = root && root.querySelectorAll ? root : document;
    scope.querySelectorAll(".dialogue .next").forEach((node) => {
      node.textContent = label();
      node.setAttribute("data-dialogue-continuity", "0.2.6");
    });
  }

  function bind() {
    normalize(document);

    new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType !== 1) return;
            if (node.matches?.(".dialogue .next")) {
              node.textContent = label();
            }
            normalize(node);
          });
        }
        if (mutation.type === "characterData") {
          const parent = mutation.target.parentElement;
          if (parent?.matches(".dialogue .next")) {
            parent.textContent = label();
          }
        }
      }
    }).observe(document.body, {
      subtree: true,
      childList: true,
      characterData: true
    });

    document.addEventListener("click", (event) => {
      if (event.target.closest?.("[data-lang]")) {
        setTimeout(() => normalize(document), 0);
        setTimeout(() => normalize(document), 100);
      }
    }, true);

    new MutationObserver(() => normalize(document)).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"]
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bind, { once: true });
  } else {
    bind();
  }
})();
