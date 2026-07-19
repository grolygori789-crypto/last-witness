/* LAST WITNESS — Stability Repair 0.2.8
 * Restores existing behavior; does not create new gameplay systems.
 */
(function () {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  function isDialogueVisible(id) {
    const node = $(id);
    return Boolean(node && !node.classList.contains("hidden") &&
      getComputedStyle(node).display !== "none");
  }

  function refreshReviewButtons() {
    const reviewEvidence = $("#reviewEvidence");
    if (reviewEvidence) {
      reviewEvidence.classList.toggle(
        "lw-ready",
        !isDialogueVisible("#crimeDialogue") &&
        !reviewEvidence.disabled
      );
    }

    const reviewApartment = $("#reviewApartment");
    if (reviewApartment) {
      reviewApartment.classList.toggle(
        "lw-ready",
        !isDialogueVisible("#apartmentDialogue") &&
        reviewApartment.classList.contains("show")
      );
    }

    const reviewForensic = $("#reviewForensic");
    if (reviewForensic) {
      const ready = reviewForensic.classList.contains("show") &&
        !reviewForensic.hasAttribute("hidden") &&
        !isDialogueVisible("#forensicDialogue") &&
        !$("#forensicEvidencePanel")?.classList.contains("open") &&
        $("#forensicChoice")?.classList.contains("hidden") !== false &&
        getComputedStyle($("#forensicPhaseComplete")).display === "none";
      reviewForensic.classList.toggle("lw-ready", ready);
    }
  }

  function safePortraitSource(speaker) {
    if (typeof portrait !== "function") return "";
    const attempts = {
      Elena: ["neutral", "professional", "thoughtful", "warm", "concerned"],
      Somchai: ["neutral", "friendly", "amused", "serious"],
      Kittisak: ["neutral", "serious", "stern"]
    }[speaker] || ["neutral"];

    for (const emotion of attempts) {
      try {
        const src = portrait(speaker, emotion);
        if (typeof src === "string" && src.trim()) return src;
      } catch (_) {}
    }
    return "";
  }

  function repairDialoguePortrait(dialogue) {
    if (!dialogue?.classList?.contains("dialogue")) return;
    const speaker = $(".speaker", dialogue)?.textContent?.trim();
    if (!["Elena", "Somchai", "Kittisak"].includes(speaker)) return;

    const wrap = $(".portrait-wrap", dialogue);
    if (!wrap) return;

    let img = $("img.portrait", wrap);
    const fallback = safePortraitSource(speaker);

    if (!img && fallback) {
      img = document.createElement("img");
      img.className = `portrait portrait-${speaker}`;
      img.alt = "";
      img.src = fallback;
      wrap.replaceChildren(img);
    }

    if (!img) return;

    img.style.removeProperty("transform");
    img.style.removeProperty("width");
    img.style.removeProperty("height");
    img.style.objectFit = "contain";
    img.style.objectPosition = "center bottom";
    img.style.maxWidth = "100%";
    img.style.maxHeight = "100%";

    img.onerror = () => {
      const replacement = safePortraitSource(speaker);
      if (replacement && img.src !== new URL(replacement, location.href).href) {
        img.src = replacement;
      } else {
        img.remove();
      }
    };
  }

  function repairAllPortraits(root = document) {
    $$(".dialogue", root).forEach(repairDialoguePortrait);
    if (root.matches?.(".dialogue")) repairDialoguePortrait(root);
  }

  function preventPoliceCompletionCard() {
    const card = $("#policePhaseComplete");
    if (!card) return;
    const visible = getComputedStyle(card).display !== "none";
    if (!visible) return;

    card.style.display = "none";
    if (window.LastWitnessForensic?.start) {
      setTimeout(() => window.LastWitnessForensic.start(), 40);
    }
  }

  function playEvidenceSound(event) {
    const hotspot = event.target.closest?.("[data-forensic-clue]");
    if (!hotspot) return;
    const audio = $("#evidenceAudio");
    if (!audio) return;
    try {
      audio.pause();
      audio.currentTime = 0;
      audio.volume = 0.55;
      audio.play().catch(() => {});
    } catch (_) {}
  }


  let lastImmediateClickAt = 0;

  function playImmediateDialogueClick(event) {
    const target = event.target.closest?.(".dialogue:not(.hidden), .dialogue .next");
    if (!target) return;
    const audio = $("#clickAudio");
    if (!audio) return;
    lastImmediateClickAt = performance.now();
    try {
      audio.pause();
      audio.currentTime = 0.035;
      audio.volume = 0.5;
      audio.play().catch(() => {});
    } catch (_) {}
  }

  function bind() {
    refreshReviewButtons();
    repairAllPortraits();
    preventPoliceCompletionCard();

    document.addEventListener("pointerdown", playImmediateDialogueClick, true);
    document.addEventListener("click", playEvidenceSound, true);

    new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return;
          repairAllPortraits(node);
        });
      }
      repairAllPortraits();
      refreshReviewButtons();
      preventPoliceCompletionCard();
    }).observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["class", "style", "src"]
    });

    setInterval(() => {
      refreshReviewButtons();
      repairAllPortraits();
      preventPoliceCompletionCard();
    }, 300);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bind, { once: true });
  } else {
    bind();
  }
})();
