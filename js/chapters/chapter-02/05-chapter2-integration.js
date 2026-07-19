/* LAST WITNESS — Chapter II Integration Repair 0.3.1
 * Restores original navigation, journal access and title audio state.
 */
(function () {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  function lang() {
    try {
      if (window.state && state.language === "th") return "th";
    } catch (_) {}
    return document.documentElement.lang === "th" ? "th" : "en";
  }

  function stopAudio(audio, reset = true) {
    if (!audio) return;
    try {
      audio.pause();
      if (reset) audio.currentTime = 0;
    } catch (_) {}
  }

  function titleAudioState() {
    // Nothing from an investigation scene or chapter ending may leak into Title.
    $$("audio").forEach((audio) => {
      if (audio.id !== "themeAudio" && audio.id !== "rainAudio") {
        stopAudio(audio, true);
      }
    });

    const theme = $("#themeAudio");
    const rain = $("#rainAudio");
    const musicRange = $("#musicRange");
    const requestedMusic = Number(musicRange?.value);
    const musicVolume = Number.isFinite(requestedMusic) ? requestedMusic : 0.33;

    if (theme) {
      try {
        theme.pause();
        theme.currentTime = 0;
        theme.loop = true;
        theme.volume = Math.max(0, Math.min(1, musicVolume));
        theme.play().catch(() => {});
      } catch (_) {}
    }

    if (rain) {
      try {
        rain.pause();
        rain.currentTime = 0;
        rain.loop = true;
        // The title rain is intentionally present but subordinate to the theme.
        rain.volume = 0.18;
        rain.play().catch(() => {});
      } catch (_) {}
    }
  }

  function showOnly(id) {
    $$(".screen").forEach((screen) => screen.classList.remove("active"));
    $(id)?.classList.add("active");
  }

  function returnToTitle() {
    try {
      if (typeof autoSave === "function") autoSave();
    } catch (_) {}

    // Close every overlay so the title returns cleanly.
    $("#drawer")?.classList.remove("open");
    $$(".modal.open").forEach((modal) => modal.classList.remove("open"));
    $("#chapter2Complete")?.style.setProperty("display", "none");
    $("#chapter3Wip")?.style.setProperty("display", "none");
    $("#forensicPhaseComplete")?.style.setProperty("display", "none");

    if (typeof showScreen === "function") {
      showScreen("title");
    } else {
      showOnly("#title");
      try {
        if (window.state) state.screen = "title";
      } catch (_) {}
    }

    // Delay one frame so any old showScreen audio code runs first, then normalize it.
    requestAnimationFrame(titleAudioState);
    setTimeout(titleAudioState, 80);
  }

  function enterMedicalExaminer() {
    const forensicComplete = $("#forensicPhaseComplete");
    if (forensicComplete) forensicComplete.style.display = "none";

    stopAudio($("#forensicHumAudio"), false);

    if (window.LastWitnessMedicalExaminer?.start) {
      window.LastWitnessMedicalExaminer.start();
    }
  }

  function bypassForensicWip() {
    const card = $("#forensicPhaseComplete");
    if (!card) return;

    let inTransition = false;
    const check = () => {
      if (inTransition) return;
      const visible = card.style.display !== "none" &&
        getComputedStyle(card).display !== "none";
      if (!visible) return;

      inTransition = true;
      card.style.display = "none";
      try {
        if (window.state) {
          state.forensic = state.forensic || {};
          state.forensic.complete = true;
          state.screen = "medical2";
        }
        if (typeof autoSave === "function") autoSave();
      } catch (_) {}

      setTimeout(() => {
        enterMedicalExaminer();
        inTransition = false;
      }, 40);
    };

    new MutationObserver(check).observe(card, {
      attributes: true,
      attributeFilter: ["style", "class"]
    });

    setInterval(check, 250);
    check();
  }

  function ensureCharactersMenu() {
    const drawer = $("#drawer .drawer-panel");
    const settings = $("#settingsButton");
    if (!drawer || !settings) return;

    let button = $("#charactersButton");
    if (!button) {
      button = document.createElement("button");
      button.id = "charactersButton";
      button.className = "menu-button";
      button.dataset.i18n = "characters";
      button.innerHTML = 'Characters<i class="journal-alert journal-menu-alert" aria-hidden="true"></i>';
      drawer.insertBefore(button, settings);
    } else if (button.nextElementSibling !== settings) {
      drawer.insertBefore(button, settings);
    }

    if (button.dataset.chapter2Bound === "1") return;
    button.dataset.chapter2Bound = "1";

    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      $("#drawer")?.classList.remove("open");
      const modal = $("#charactersModal");
      if (!modal) return;

      $("#characterGrid")?.style.setProperty("display", "");
      $("#characterDetail")?.style.setProperty("display", "none");
      $("#charactersBack")?.style.setProperty("display", "none");
      modal.classList.add("open");

      // Reuse any original character rendering hook if it exists.
      try {
        if (typeof renderCharacters === "function") renderCharacters();
      } catch (_) {}
    }, true);
  }

  function localizeEnding() {
    const th = lang() === "th";

    const eyebrow = $("#chapter2CompleteEyebrow");
    const title = $("#chapter2CompleteTitle");
    const caseName = $("#chapter2CompleteCase");
    const body = $("#chapter2CompleteText");
    const continueButton = $("#continueChapter3");
    const returnButton = $("#chapter2ReturnTitle");

    if (eyebrow) eyebrow.textContent = th ? "ปิดคดี" : "Case Closed";
    if (title) title.textContent = th ? "จบบทที่ II" : "CHAPTER II COMPLETE";
    if (caseName) caseName.textContent = th ? "คำลวงสิบเอ็ดนาที" : "THE ELEVEN-MINUTE LIE";
    if (body) {
      body.textContent = th
        ? "ผลทางวิทยาศาสตร์เป็นของจริง แต่ลำดับเวลารอบมันถูกจัดวาง การสืบสวนยังดำเนินต่อไป"
        : "The science is genuine. The timeline around it was engineered. The investigation continues.";
    }
    if (continueButton) continueButton.textContent = th ? "ดำเนินต่อไปยังบทที่ III" : "Continue to Chapter III";
    if (returnButton) returnButton.textContent = th ? "กลับหน้าหลัก" : "Return to Title";

    const wipTitle = $("#chapter3WipTitle");
    const wipText = $("#chapter3WipText");
    const wipReturn = $("#chapter3WipReturnTitle");
    if (wipTitle) wipTitle.textContent = th ? "บทที่ III" : "CHAPTER III";
    if (wipText) {
      wipText.textContent = th
        ? "บทนี้กำลังอยู่ในขั้นตอนการพัฒนา ความคืบหน้าของบทที่ II ถูกบันทึกแล้ว"
        : "This chapter is currently in development. Your Chapter II progress has been saved.";
    }
    if (wipReturn) wipReturn.textContent = th ? "กลับหน้าหลัก" : "Return to Title";
  }

  function bindChapterEnding() {
    $("#continueChapter3")?.addEventListener("click", () => {
      $("#chapter2Complete").style.display = "none";
      $("#chapter3Wip").style.display = "block";
      try {
        if (typeof autoSave === "function") autoSave();
      } catch (_) {}
    });

    $("#chapter2ReturnTitle")?.addEventListener("click", returnToTitle);
    $("#chapter3WipReturnTitle")?.addEventListener("click", returnToTitle);
  }

  function bind() {
    ensureCharactersMenu();
    bypassForensicWip();
    bindChapterEnding();
    localizeEnding();

    // The old Forensic button remains a fallback, but it now enters Medical directly.
    $("#continueMedicalExaminer")?.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      enterMedicalExaminer();
    }, true);

    document.addEventListener("click", (event) => {
      if (event.target.closest?.("[data-lang]")) {
        setTimeout(localizeEnding, 0);
        setTimeout(ensureCharactersMenu, 0);
      }
    }, true);

    // Reassert the journal entry if another script reconstructs the drawer.
    new MutationObserver(ensureCharactersMenu).observe(document.body, {
      subtree: true,
      childList: true
    });

    window.LastWitnessChapter2Integration = {
      returnToTitle,
      enterMedicalExaminer,
      titleAudioState,
      version: "0.3.1"
    };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bind, { once: true });
  } else {
    bind();
  }
})();
