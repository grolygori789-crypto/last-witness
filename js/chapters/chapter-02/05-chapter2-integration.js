/* LAST WITNESS — Chapter II Final Screen & Characters Repair 0.3.2 */
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

  function activateScreen(id) {
    $$(".screen").forEach((screen) => screen.classList.remove("active"));
    const target = typeof id === "string" ? document.getElementById(id) : id;
    target?.classList.add("active");
    try {
      if (window.state && target?.id) state.screen = target.id;
    } catch (_) {}
  }

  function closeOverlays() {
    $("#drawer")?.classList.remove("open");
    $$(".modal.open").forEach((modal) => modal.classList.remove("open"));
    $("#forensicPhaseComplete")?.style.setProperty("display", "none");
    $("#medicalEvidencePanel")?.classList.remove("open");
    $("#medicalChoice")?.classList.add("hidden");
    $("#medicalDialogue")?.classList.add("hidden");
  }

  function stopInvestigationAudio() {
    const titleIds = new Set(["themeAudio", "rainAudio"]);
    $$("audio").forEach((audio) => {
      if (!titleIds.has(audio.id)) stopAudio(audio, true);
    });
  }

  function titleAudioState() {
    stopInvestigationAudio();

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
        rain.volume = 0.18;
        rain.play().catch(() => {});
      } catch (_) {}
    }
  }

  function showChapter2Complete() {
    closeOverlays();

    // The final screen is not an overlay. Medical HUD, objective and progress
    // are removed from view because their screen is deactivated.
    stopAudio($("#medicalRefrigeratorAudio"), true);
    stopAudio($("#medicalMachineAudio"), true);
    stopAudio($("#forensicHumAudio"), true);

    activateScreen("chapter2Complete");
    localizeEnding();

    try {
      if (window.state) {
        state.medical = state.medical || {};
        state.medical.complete = true;
        state.progress = 100;
      }
      if (typeof autoSave === "function") autoSave();
    } catch (_) {}
  }

  function showChapter3Wip() {
    closeOverlays();
    activateScreen("chapter3Wip");
    localizeEnding();
    try {
      if (typeof autoSave === "function") autoSave();
    } catch (_) {}
  }

  function returnToTitle() {
    try {
      if (typeof autoSave === "function") autoSave();
    } catch (_) {}

    closeOverlays();
    stopInvestigationAudio();
    activateScreen("title");

    // Normalize after any legacy show-screen handlers have run.
    requestAnimationFrame(titleAudioState);
    setTimeout(titleAudioState, 80);
  }

  function enterMedicalExaminer() {
    const forensicComplete = $("#forensicPhaseComplete");
    if (forensicComplete) forensicComplete.style.display = "none";

    stopAudio($("#forensicHumAudio"), true);

    if (window.LastWitnessMedicalExaminer?.start) {
      window.LastWitnessMedicalExaminer.start();
    }
  }

  function bypassForensicWip() {
    const card = $("#forensicPhaseComplete");
    if (!card) return;

    let transitioning = false;
    const check = () => {
      if (transitioning) return;
      const visible = card.style.display !== "none" &&
        getComputedStyle(card).display !== "none";
      if (!visible) return;

      transitioning = true;
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
        transitioning = false;
      }, 40);
    };

    new MutationObserver(check).observe(card, {
      attributes: true,
      attributeFilter: ["style", "class"]
    });

    check();
  }

  function openCharacters(event) {
    event?.preventDefault();
    event?.stopPropagation();
    event?.stopImmediatePropagation();

    $("#drawer")?.classList.remove("open");

    const modal = $("#charactersModal");
    if (!modal) return;

    const grid = $("#characterGrid");
    const detail = $("#characterDetail");
    const back = $("#charactersBack");

    if (grid) grid.style.display = "";
    if (detail) detail.style.display = "none";
    if (back) back.style.display = "none";

    try {
      if (typeof renderCharacters === "function") renderCharacters();
    } catch (_) {}

    modal.classList.add("open");
  }

  function forceCharactersVisible(button) {
    if (!button) return;
    button.hidden = false;
    button.removeAttribute("hidden");
    button.disabled = false;

    if (button.style.display !== "block") {
      button.style.setProperty("display", "block", "important");
    }
    if (button.style.visibility !== "visible") {
      button.style.setProperty("visibility", "visible", "important");
    }
    if (button.style.opacity !== "1") {
      button.style.setProperty("opacity", "1", "important");
    }
    button.style.setProperty("pointer-events", "auto", "important");
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
      button.type = "button";
      button.dataset.i18n = "characters";
      button.innerHTML = 'Characters<i class="journal-alert journal-menu-alert" aria-hidden="true"></i>';
      drawer.insertBefore(button, settings);
    } else if (button.nextElementSibling !== settings) {
      drawer.insertBefore(button, settings);
    }

    forceCharactersVisible(button);

    if (button.dataset.chapter2Bound !== "1") {
      button.dataset.chapter2Bound = "1";
      button.addEventListener("click", openCharacters, true);
      button.onclick = openCharacters;
    }
  }

  function localizeEnding() {
    const th = lang() === "th";

    const copy = th ? {
      eyebrow: "ปิดคดี",
      title: "จบบทที่ II",
      caseName: "คำลวงสิบเอ็ดนาที",
      body: "ผลทางวิทยาศาสตร์เป็นของจริง แต่ลำดับเวลารอบมันถูกจัดวาง การสืบสวนยังดำเนินต่อไป",
      continueLabel: "ดำเนินต่อ",
      returnLabel: "กลับหน้าหลัก",
      wipTitle: "บทที่ III",
      wipText: "บทนี้กำลังอยู่ในขั้นตอนการพัฒนา ความคืบหน้าของบทที่ II ถูกบันทึกแล้ว"
    } : {
      eyebrow: "Case Closed",
      title: "CHAPTER II COMPLETE",
      caseName: "THE ELEVEN-MINUTE LIE",
      body: "The science is genuine. The timeline around it was engineered. The investigation continues.",
      continueLabel: "Continue",
      returnLabel: "Return to Title",
      wipTitle: "CHAPTER III",
      wipText: "This chapter is currently in development. Your Chapter II progress has been saved."
    };

    if ($("#chapter2CompleteEyebrow")) $("#chapter2CompleteEyebrow").textContent = copy.eyebrow;
    if ($("#chapter2CompleteTitle")) $("#chapter2CompleteTitle").textContent = copy.title;
    if ($("#chapter2CompleteCase")) $("#chapter2CompleteCase").textContent = copy.caseName;
    if ($("#chapter2CompleteText")) $("#chapter2CompleteText").textContent = copy.body;
    if ($("#continueChapter3")) $("#continueChapter3").textContent = copy.continueLabel;
    if ($("#chapter2ReturnTitle")) $("#chapter2ReturnTitle").textContent = copy.returnLabel;
    if ($("#chapter3WipTitle")) $("#chapter3WipTitle").textContent = copy.wipTitle;
    if ($("#chapter3WipText")) $("#chapter3WipText").textContent = copy.wipText;
    if ($("#chapter3WipReturnTitle")) $("#chapter3WipReturnTitle").textContent = copy.returnLabel;

    const charactersButton = $("#charactersButton");
    if (charactersButton) {
      charactersButton.childNodes[0].nodeValue = th ? "ตัวละคร" : "Characters";
    }
  }

  function bind() {
    ensureCharactersMenu();
    bypassForensicWip();
    localizeEnding();

    $("#continueChapter3")?.addEventListener("click", showChapter3Wip);
    $("#chapter2ReturnTitle")?.addEventListener("click", returnToTitle);
    $("#chapter3WipReturnTitle")?.addEventListener("click", returnToTitle);

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

    const drawerPanel = $("#drawer .drawer-panel");
    if (drawerPanel) {
      new MutationObserver(() => ensureCharactersMenu()).observe(drawerPanel, {
        subtree: true,
        childList: true,
        attributes: true,
        attributeFilter: ["style", "hidden", "class", "disabled"]
      });
    }

    // Legacy journal code may hide the button after a state refresh.
    // Reassert only this one required menu entry at a low frequency.
    setInterval(ensureCharactersMenu, 800);

    window.LastWitnessChapter2Integration = {
      showChapter2Complete,
      showChapter3Wip,
      returnToTitle,
      enterMedicalExaminer,
      titleAudioState,
      version: "0.3.2"
    };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bind, { once: true });
  } else {
    bind();
  }
})();
