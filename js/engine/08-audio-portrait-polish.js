/* LAST WITNESS — Audio & Portrait Polish Hotfix 0.2.7 */
(function () {
  "use strict";

  function playIfSilent(audio, volume) {
    if (!audio || audio.muted) return;
    if (!audio.paused && audio.currentTime > 0) return;
    try {
      audio.volume = volume;
      audio.play().catch(() => {});
    } catch (_) {}
  }

  function restoreNewGameAudio() {
    /* Runs inside the New Game user gesture, so mobile browsers permit playback. */
    const theme = document.getElementById("themeAudio");
    const office = document.getElementById("officeAudio");
    playIfSilent(theme, 0.28);
    window.setTimeout(() => playIfSilent(office, 0.22), 80);
  }

  function fitSomchaiPortrait(img) {
    if (!img || img.dataset.alphaFit === "done") return;
    const run = () => {
      try {
        const w = img.naturalWidth;
        const h = img.naturalHeight;
        if (!w || !h) return;

        const canvas = document.createElement("canvas");
        const max = 420;
        const ratio = Math.min(1, max / Math.max(w, h));
        canvas.width = Math.max(1, Math.round(w * ratio));
        canvas.height = Math.max(1, Math.round(h * ratio));
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

        let minX = canvas.width, minY = canvas.height, maxX = -1, maxY = -1;
        for (let y = 0; y < canvas.height; y += 2) {
          for (let x = 0; x < canvas.width; x += 2) {
            if (data[(y * canvas.width + x) * 4 + 3] > 18) {
              if (x < minX) minX = x;
              if (x > maxX) maxX = x;
              if (y < minY) minY = y;
              if (y > maxY) maxY = y;
            }
          }
        }
        if (maxX < minX || maxY < minY) return;

        minX /= ratio; maxX /= ratio; minY /= ratio; maxY /= ratio;
        const wrap = img.closest(".portrait-wrap");
        if (!wrap) return;
        const cw = wrap.clientWidth || 210;
        const ch = wrap.clientHeight || 260;
        const bw = maxX - minX;
        const bh = maxY - minY;

        /* Contain the actual visible artwork, ignoring transparent canvas padding. */
        const scale = Math.min(cw / bw, ch / bh) * 0.98;
        const renderedW = w * scale;
        const renderedH = h * scale;
        const left = (cw - bw * scale) / 2 - minX * scale;
        const top = (ch - bh * scale) / 2 - minY * scale;

        Object.assign(img.style, {
          position: "absolute",
          width: `${renderedW}px`,
          height: `${renderedH}px`,
          maxWidth: "none",
          maxHeight: "none",
          left: `${left}px`,
          top: `${top}px`,
          bottom: "auto",
          transform: "none",
          objectFit: "fill",
          objectPosition: "initial"
        });
        img.dataset.alphaFit = "done";
      } catch (_) {
        img.classList.add("portrait-somchai-fallback");
      }
    };

    if (img.complete) run();
    else img.addEventListener("load", run, { once: true });
  }

  function normalizeSomchai(root) {
    const scope = root?.querySelectorAll ? root : document;
    scope.querySelectorAll("img.portrait-Somchai, img.portrait-somchai").forEach(fitSomchaiPortrait);
  }

  function bind() {
    document.getElementById("newGame")?.addEventListener("click", restoreNewGameAudio, true);
    normalizeSomchai(document);

    new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return;
          if (node.matches?.("img.portrait-Somchai, img.portrait-somchai")) fitSomchaiPortrait(node);
          normalizeSomchai(node);
        });
      }
    }).observe(document.body, { subtree: true, childList: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bind, { once: true });
  } else {
    bind();
  }
})();
