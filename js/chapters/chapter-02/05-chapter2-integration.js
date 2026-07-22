/* LAST WITNESS — Chapter II / Chapter III Production Integration 0.5.5
 * Keeps the shared runtime authoritative and prevents legacy hotfix modules
 * from installing competing observers, click handlers and audio loops.
 */
(function () {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  /* Legacy 09/10 files are replaced by inert compatibility shims in this build. */

  function language() {
    try { return window.state?.language === "th" ? "th" : "en"; }
    catch (_) { return document.documentElement.lang === "th" ? "th" : "en"; }
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
    const target = document.getElementById(id);
    target?.classList.add("active");
    if (window.state && target) state.screen = target.id;
  }

  function closeOverlays() {
    $("#drawer")?.classList.remove("open");
    $$(".modal.open").forEach((modal) => modal.classList.remove("open"));
    $("#forensicPhaseComplete")?.style.setProperty("display", "none");
    $("#medicalEvidencePanel")?.classList.remove("open");
    $("#medicalChoice")?.classList.add("hidden");
    $("#medicalDialogue")?.classList.add("hidden");
  }

  function stopInvestigationAudio(includeChapter = false) {
    const keep = includeChapter ? new Set(["themeAudio", "rainAudio"]) :
      new Set(["themeAudio", "rainAudio", "chapterAudio"]);
    $$("audio").forEach((audio) => {
      if (!keep.has(audio.id)) stopAudio(audio, true);
    });
  }

  function titleAudioState() {
    $$("audio").forEach((audio) => stopAudio(audio, true));
    if (window.state?.sound === false) return;

    const music = Number(window.state?.music);
    const level = Number.isFinite(music) ? Math.max(0, Math.min(1, music)) : 0.33;
    const theme = $("#themeAudio");
    const rain = $("#rainAudio");

    if (theme) {
      theme.loop = true;
      theme.volume = level;
      theme.play().catch(() => {});
    }
    if (rain) {
      rain.loop = true;
      rain.volume = level * 0.48;
      rain.play().catch(() => {});
    }
  }

  function showChapter2Complete() {
    closeOverlays();
    ["medicalRefrigeratorAudio", "medicalMachineAudio", "forensicHumAudio",
      "policeAudio", "morningOfficeAudio", "cafeAudio", "crimeAudio", "officeAudio"]
      .forEach((id) => stopAudio(document.getElementById(id), true));

    activateScreen("chapter2Complete");
    localizeEnding();

    try {
      state.medical = state.medical || {};
      state.medical.complete = true;
      state.progress = 100;
      if (typeof autoSave === "function") autoSave();
    } catch (_) {}
  }

  function returnToTitle() {
    try { if (typeof autoSave === "function") autoSave(); } catch (_) {}
    closeOverlays();
    $$("audio").forEach((audio) => stopAudio(audio, true));
    activateScreen("title");
    requestAnimationFrame(titleAudioState);
  }

  function enterMedicalExaminer(event) {
    event?.preventDefault();
    event?.stopImmediatePropagation();
    const card = $("#forensicPhaseComplete");
    if (card) card.style.display = "none";
    stopAudio($("#forensicHumAudio"), true);
    window.LastWitnessAudioCue?.stopEvidenceCue?.();
    window.LastWitnessMedicalExaminer?.start?.();
  }

  function addStylesheetOnce(href, id) {
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  }

  function loadScriptOnce(src, id) {
    const existing = document.getElementById(id);
    if (existing?.dataset.loaded === "1") return Promise.resolve();
    if (existing?.__lwPromise) return existing.__lwPromise;

    const script = existing || document.createElement("script");
    script.id = id;
    script.src = src;
    script.async = false;
    script.__lwPromise = new Promise((resolve, reject) => {
      script.addEventListener("load", () => {
        script.dataset.loaded = "1";
        resolve();
      }, { once: true });
      script.addEventListener("error", reject, { once: true });
    });
    if (!existing) document.body.appendChild(script);
    return script.__lwPromise;
  }

  let runtimePromise = null;
  function ensureProductionRuntime() {
    if (runtimePromise) return runtimePromise;
    addStylesheetOnce("css/chapter-03.css?v=055", "lwChapter03Style");
    runtimePromise = loadScriptOnce(
      "js/engine/11-production-stabilization.js?v=055",
      "lwProductionStabilizationScript"
    ).then(() => loadScriptOnce(
      "js/chapters/chapter-03/01-title-phase1.js?v=055",
      "lwChapter03Script"
    )).catch((error) => {
      console.error("LAST WITNESS production runtime failed to load", error);
      throw error;
    });
    return runtimePromise;
  }

  async function startChapter3(event) {
    event?.preventDefault();
    event?.stopImmediatePropagation();
    stopAudio($("#chapterAudio"), true);
    closeOverlays();

    try {
      await ensureProductionRuntime();
      if (!window.LastWitnessChapter3?.startFromChapter2) {
        throw new Error("Chapter III runtime unavailable");
      }
      window.LastWitnessChapter3.startFromChapter2();
    } catch (_) {
      activateScreen("chapter3Wip");
      localizeEnding();
    }
  }

  function localizeEnding() {
    const th = language() === "th";
    const copy = th ? {
      eyebrow: "ปิดคดี",
      title: "จบบทที่ II",
      caseName: "คำลวงสิบเอ็ดนาที",
      body: "ผลทางวิทยาศาสตร์เป็นของจริง แต่ลำดับเวลารอบมันถูกจัดวาง การสืบสวนยังดำเนินต่อไป",
      continueLabel: "ไปต่อบทที่ III",
      returnLabel: "กลับหน้าแรก",
      wipTitle: "บทที่ III",
      wipText: "ไม่สามารถโหลดบทที่ III ได้ในขณะนี้ ความคืบหน้าของบทที่ II ถูกบันทึกแล้ว"
    } : {
      eyebrow: "Case Closed",
      title: "CHAPTER II COMPLETE",
      caseName: "THE ELEVEN-MINUTE LIE",
      body: "The science is genuine. The timeline around it was engineered. The investigation continues.",
      continueLabel: "Continue to Chapter III",
      returnLabel: "Return to Title",
      wipTitle: "CHAPTER III",
      wipText: "Chapter III could not be loaded. Your Chapter II progress has been saved."
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
  }

  function bind() {
    ensureProductionRuntime();
    localizeEnding();

    $("#continueChapter3")?.addEventListener("click", startChapter3, true);
    $("#chapter2ReturnTitle")?.addEventListener("click", returnToTitle, true);
    $("#chapter3WipReturnTitle")?.addEventListener("click", returnToTitle, true);
    $("#continueMedicalExaminer")?.addEventListener("click", enterMedicalExaminer, true);

    document.addEventListener("click", (event) => {
      if (event.target.closest?.("[data-lang]")) setTimeout(localizeEnding, 0);
    }, true);

    window.LastWitnessChapter2Integration = {
      showChapter2Complete,
      returnToTitle,
      enterMedicalExaminer,
      startChapter3,
      ensureProductionRuntime,
      titleAudioState,
      version: "0.5.5"
    };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bind, { once: true });
  } else {
    bind();
  }
})();
