/* LAST WITNESS — Chapter II Integration + Authoritative Runtime Guard 0.4.15
 * Fixes the actual last-writer conflicts without adding another polling loop.
 */
(function () {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const POLICE_SOURCE_TOKEN = "assets/audio/c9db4b3d64d7ef62.mp3";
  const LATE_CHAPTER_TWO_SCREENS = new Set([
    "apartment2", "cafe2", "police2", "forensic2", "medical2",
    "chapter2Complete", "chapter3Wip"
  ]);

  /* ------------------------------------------------------------------
   * PRE-EMPT THE LATER 10-defect-repair SCRIPT
   * ------------------------------------------------------------------ */

  // The later repair script normally installs an extremely quiet, heavily
  // filtered click. Mark those hooks as already handled before it loads.
  document.documentElement.dataset.lwDialogueClickFixed = "1";
  const earlyEnter = document.getElementById("enter");
  if (earlyEnter) earlyEnter.dataset.lwClickFixed = "1";

  // Force the later police repair to use the normal HTMLAudioElement fallback.
  // This lets the scene-volume cap below control the siren instead of an
  // inaccessible Web Audio gain node inside that script's closure.
  if (typeof window.fetch === "function" && !window.fetch.__lwPoliceFallback0415) {
    const originalFetch = window.fetch.bind(window);
    const guardedFetch = function (input, init) {
      const url = typeof input === "string" ? input : String(input?.url || "");
      if (url.includes(POLICE_SOURCE_TOKEN)) {
        return Promise.reject(new TypeError("LAST WITNESS: use controlled police audio fallback"));
      }
      return originalFetch(input, init);
    };
    guardedFetch.__lwPoliceFallback0415 = true;
    guardedFetch.__lwOriginalFetch = originalFetch;
    window.fetch = guardedFetch;
  }

  function lang() {
    try {
      if (window.state && state.language === "th") return "th";
    } catch (_) {}
    return document.documentElement.lang === "th" ? "th" : "en";
  }

  function activeScreen() {
    return $(".screen.active")?.id || window.state?.screen || "";
  }

  function clamp(value) {
    const number = Number(value);
    return Number.isFinite(number) ? Math.max(0, Math.min(1, number)) : 0;
  }

  function musicLevel() {
    const value = Number(window.state?.music);
    return Number.isFinite(value) ? clamp(value) : 0.33;
  }

  function sfxLevel() {
    const value = Number(window.state?.sfx);
    return Number.isFinite(value) ? clamp(value) : 0.55;
  }

  function dialogueVisible(screen = activeScreen()) {
    const root = document.getElementById(screen);
    if (!root) return false;
    return $$(".dialogue", root).some((box) =>
      !box.classList.contains("hidden") && getComputedStyle(box).display !== "none"
    );
  }

  function stopAudio(audio, reset = true) {
    if (!audio) return;
    try {
      audio.pause();
      if (reset) audio.currentTime = 0;
    } catch (_) {}
  }

  function mediaVolumeDescriptor() {
    let proto = window.HTMLMediaElement?.prototype;
    while (proto) {
      const descriptor = Object.getOwnPropertyDescriptor(proto, "volume");
      if (descriptor?.get && descriptor?.set) return descriptor;
      proto = Object.getPrototypeOf(proto);
    }
    return null;
  }

  function controlledVolume(id, requested) {
    const screen = activeScreen();
    const music = musicLevel();
    const duck = dialogueVisible(screen) ? 0.86 : 1;
    const value = clamp(requested);

    if (id === "clickAudio") {
      return Math.min(value, sfxLevel() * 0.38);
    }
    if (id === "policeAudio" && screen === "police2") {
      // The source contains a prominent siren. Keep it as distant texture.
      return Math.min(value, music * 0.085 * duck);
    }
    if (id === "forensicHumAudio" && screen === "forensic2") {
      // Audible laboratory room tone without competing with dialogue.
      return Math.max(value, music * 0.38 * duck);
    }
    if (id === "medicalRefrigeratorAudio" && screen === "medical2") {
      return Math.max(value, music * 0.46 * duck);
    }
    if (id === "medicalMachineAudio" && screen === "medical2") {
      return Math.max(value, music * 0.12 * duck);
    }
    return value;
  }

  function installTargetedVolumeGuards() {
    const descriptor = mediaVolumeDescriptor();
    if (!descriptor) return;

    [
      "clickAudio",
      "policeAudio",
      "forensicHumAudio",
      "medicalRefrigeratorAudio",
      "medicalMachineAudio"
    ].forEach((id) => {
      const audio = document.getElementById(id);
      if (!audio || audio.dataset.lwAuthoritativeVolume0415 === "1") return;
      audio.dataset.lwAuthoritativeVolume0415 = "1";
      try {
        Object.defineProperty(audio, "volume", {
          configurable: true,
          enumerable: false,
          get() {
            return descriptor.get.call(audio);
          },
          set(value) {
            descriptor.set.call(audio, controlledVolume(id, value));
          }
        });
      } catch (_) {
        audio.dataset.lwAuthoritativeVolume0415 = "0";
      }
    });
  }

  function applyAuthoritativeSceneMix() {
    if (window.state?.sound === false) return;
    const screen = activeScreen();
    const music = musicLevel();
    const duck = dialogueVisible(screen) ? 0.86 : 1;

    if (screen === "forensic2") {
      const hum = $("#forensicHumAudio");
      if (hum) hum.volume = music * 0.38 * duck;
    } else if (screen === "medical2") {
      const fridge = $("#medicalRefrigeratorAudio");
      const machine = $("#medicalMachineAudio");
      if (fridge) fridge.volume = music * 0.46 * duck;
      if (machine) machine.volume = music * 0.12 * duck;
    } else if (screen === "police2") {
      const police = $("#policeAudio");
      if (police) police.volume = music * 0.085 * duck;
    }
  }

  /* ------------------------------------------------------------------
   * CLICK FEEDBACK
   * ------------------------------------------------------------------ */

  let lastControlledClickAt = 0;
  let clickStopTimer = 0;

  function isClickTarget(target) {
    if (!target?.closest) return false;
    if (target.closest('input[type="range"], select, textarea, input[type="text"]')) return false;
    return Boolean(target.closest(
      "button,.dialogue:not(.hidden),.hotspot,.apartment-hotspot," +
      ".forensic-hotspot,.medical-hotspot,[role='button']"
    ));
  }

  function playControlledClick() {
    if (window.state?.sound === false) return;
    const source = $("#clickAudio");
    if (!source) return;

    lastControlledClickAt = performance.now();
    const click = source.cloneNode(true);
    click.loop = false;
    click.preload = "auto";
    click.volume = Math.min(0.24, Math.max(0.09, sfxLevel() * 0.36));
    try {
      click.currentTime = 0;
      const result = click.play();
      if (result?.catch) result.catch(() => {});
      clearTimeout(clickStopTimer);
      clickStopTimer = setTimeout(() => {
        try {
          click.pause();
          click.currentTime = 0;
          click.remove();
        } catch (_) {}
      }, 145);
    } catch (_) {}
  }

  function installControlledClick() {
    const enter = $("#enter");
    if (enter) enter.dataset.lwClickFixed = "1";
    document.documentElement.dataset.lwDialogueClickFixed = "1";

    if (document.documentElement.dataset.lwAuthoritativeClick0415 === "1") return;
    document.documentElement.dataset.lwAuthoritativeClick0415 = "1";

    document.addEventListener("pointerdown", (event) => {
      if (!isClickTarget(event.target)) return;
      playControlledClick();
    }, true);

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      if (!isClickTarget(event.target)) return;
      playControlledClick();
    }, true);

    if (typeof window.play === "function" && !window.play.__lwAuthoritativeClick0415) {
      const originalPlay = window.play;
      function guardedPlay(name) {
        if (name === "click" && performance.now() - lastControlledClickAt < 220) return;
        return originalPlay.apply(this, arguments);
      }
      guardedPlay.__lwAuthoritativeClick0415 = true;
      window.play = guardedPlay;
    }
  }

  /* ------------------------------------------------------------------
   * CHARACTER JOURNAL TIMING
   * ------------------------------------------------------------------ */

  function journalUnlocked() {
    try {
      const screen = activeScreen();
      if (Number(window.state?.chapter) > 2) return true;
      if (LATE_CHAPTER_TWO_SCREENS.has(screen)) return true; // legacy-save compatibility
      return Boolean(
        window.state?.flags?.chapter2_character_feature_unlocked === true &&
        window.state?.journal?.unlocked === true
      );
    } catch (_) {
      return false;
    }
  }

  function setCharacterButtonVisible(button, visible) {
    if (!button) return;
    if (button.hidden === visible) button.hidden = !visible;
    button.toggleAttribute("aria-hidden", !visible);
    button.disabled = !visible;
    button.style.setProperty("display", visible ? "block" : "none", "important");
    button.style.setProperty("visibility", visible ? "visible" : "hidden", "important");
    button.style.setProperty("opacity", visible ? "1" : "0", "important");
    button.style.setProperty("pointer-events", visible ? "auto" : "none", "important");
  }

  function syncCharacterButton() {
    const button = $("#charactersButton");
    if (!button) return;
    setCharacterButtonVisible(button, journalUnlocked());
  }

  function openCharacters(event) {
    event?.preventDefault();
    event?.stopPropagation();
    event?.stopImmediatePropagation();
    if (!journalUnlocked()) {
      syncCharacterButton();
      return;
    }

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

    if (button.dataset.chapter2Bound !== "1") {
      button.dataset.chapter2Bound = "1";
      button.addEventListener("click", openCharacters, true);
      button.onclick = openCharacters;
    }
    syncCharacterButton();
  }

  /* ------------------------------------------------------------------
   * EXISTING CHAPTER II INTEGRATION
   * ------------------------------------------------------------------ */

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
    const requestedMusic = Number($("#musicRange")?.value);
    const musicVolume = Number.isFinite(requestedMusic) ? requestedMusic : 0.33;

    if (theme) {
      try {
        theme.pause();
        theme.currentTime = 0;
        theme.loop = true;
        theme.volume = clamp(musicVolume);
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
      const visible = card.style.display !== "none" && getComputedStyle(card).display !== "none";
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
    if (charactersButton?.childNodes?.[0]) {
      charactersButton.childNodes[0].nodeValue = th ? "ตัวละคร" : "Characters";
    }
  }

  function bind() {
    installTargetedVolumeGuards();
    installControlledClick();
    ensureCharactersMenu();
    bypassForensicWip();
    localizeEnding();
    applyAuthoritativeSceneMix();

    $("#continueChapter3")?.addEventListener("click", showChapter3Wip);
    $("#chapter2ReturnTitle")?.addEventListener("click", returnToTitle);
    $("#chapter3WipReturnTitle")?.addEventListener("click", returnToTitle);
    $("#continueMedicalExaminer")?.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      enterMedicalExaminer();
    }, true);

    document.addEventListener("click", (event) => {
      setTimeout(() => {
        syncCharacterButton();
        applyAuthoritativeSceneMix();
      }, 0);
      if (event.target.closest?.("[data-lang]")) {
        setTimeout(localizeEnding, 0);
        setTimeout(ensureCharactersMenu, 0);
      }
    }, true);

    document.addEventListener("pointerup", () => {
      requestAnimationFrame(applyAuthoritativeSceneMix);
    }, true);

    $("#musicRange")?.addEventListener("input", () => {
      requestAnimationFrame(applyAuthoritativeSceneMix);
    }, true);

    window.LastWitnessChapter2Integration = {
      showChapter2Complete,
      showChapter3Wip,
      returnToTitle,
      enterMedicalExaminer,
      titleAudioState,
      syncCharacterButton,
      applyAuthoritativeSceneMix,
      version: "0.4.15"
    };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bind, { once: true });
  } else {
    bind();
  }
})();
