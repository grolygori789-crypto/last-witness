/* LAST WITNESS — Chapter II Defect Hotfix 0.3.9
 * Load this file LAST, after 06-content-registry-dev.js.
 * Fixes story-state leakage, premature evidence markers/actions,
 * phase audio lifecycle, immediate click feedback, Police evidence SFX,
 * and Chapter III Return to Title.
 */
(function () {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const FORENSIC_IDS = [
    "sealed_sample",
    "accession_record",
    "audit_trace",
    "batch_record"
  ];

  const MEDICAL_IDS = [
    "postmortem",
    "identity_tag",
    "autopsy_report",
    "toxicology_sample"
  ];

  const LOOP_IDS = [
    "themeAudio",
    "rainAudio",
    "officeAudio",
    "crimeAudio",
    "morningOfficeAudio",
    "cafeAudio",
    "policeAudio",
    "forensicHumAudio",
    "medicalRefrigeratorAudio",
    "medicalMachineAudio"
  ];

  let immediateClickAt = 0;
  let clickStopTimer = 0;
  let routeRepairQueued = false;
  const activeEvidence = { forensic: null, medical: null };

  function activeScreenId() {
    return $(".screen.active")?.id || window.state?.screen || "";
  }

  function stopAudio(id, reset = true) {
    const audio = document.getElementById(id);
    if (!audio) return;

    try {
      audio.pause();
      if (reset) audio.currentTime = 0;
    } catch (_) {}
  }

  function playAudio(id, volume, startAt = 0) {
    const audio = document.getElementById(id);
    if (!audio || window.state?.sound === false) return;

    try {
      audio.pause();

      const duration = Number(audio.duration);
      const safeStart = Number.isFinite(duration)
        ? Math.min(Math.max(0, startAt), Math.max(0, duration - 0.02))
        : Math.max(0, startAt);

      audio.currentTime = safeStart;

      if (typeof volume === "number") {
        audio.volume = Math.max(0, Math.min(1, volume));
      }

      audio.play().catch(() => {});
    } catch (_) {}
  }

  function enforceAudioForScreen(screen = activeScreenId()) {
    const allowed = new Set();

    if (screen === "title") {
      allowed.add("themeAudio");
      allowed.add("rainAudio");
    } else if (screen === "office") {
      allowed.add("officeAudio");
      allowed.add("rainAudio");
    } else if (["crime", "phone", "deduction", "apartment2"].includes(screen)) {
      allowed.add("crimeAudio");
    } else if (screen === "office2") {
      allowed.add("morningOfficeAudio");
    } else if (screen === "cafe2") {
      allowed.add("cafeAudio");
    } else if (screen === "police2") {
      allowed.add("policeAudio");
    } else if (screen === "forensic2") {
      allowed.add("forensicHumAudio");
    } else if (screen === "medical2") {
      allowed.add("medicalRefrigeratorAudio");
      allowed.add("medicalMachineAudio");
    }

    LOOP_IDS.forEach((id) => {
      if (!allowed.has(id)) stopAudio(id, true);
    });

    // Ending screens must never inherit an investigation ambience.
    if (["chapter2Complete", "chapter3Wip"].includes(screen)) {
      LOOP_IDS.forEach((id) => stopAudio(id, true));
    }
  }

  function phaseArray(phase, key, ids) {
    const value = window.state?.[phase]?.[key];
    return Array.isArray(value) ? value.filter((id) => ids.includes(id)) : [];
  }

  function getStoryFound(phase, ids) {
    if (!window.state) return [];

    const result = new Set(phaseArray(phase, "found", ids));
    const globalFound = state.found;

    if (globalFound && typeof globalFound.has === "function") {
      ids.forEach((id) => {
        if (globalFound.has(`${phase}_${id}`)) result.add(id);
      });
    }

    return [...result];
  }

  function getStoryCollected(phase, ids) {
    if (!window.state) return [];
    return phaseArray(phase, "collected", ids);
  }

  function ensurePhaseEvidence(phase, id, collected = false) {
    const ids = phase === "forensic" ? FORENSIC_IDS : MEDICAL_IDS;
    if (!ids.includes(id) || !window.state) return;

    state[phase] = state[phase] || {};

    const found = new Set(phaseArray(phase, "found", ids));
    found.add(id);
    state[phase].found = [...found];

    if (collected) {
      const saved = new Set(phaseArray(phase, "collected", ids));
      saved.add(id);
      state[phase].collected = [...saved];
    }

    if (state.found && typeof state.found.add === "function") {
      state.found.add(`${phase}_${id}`);
    }
  }

  function removeRegistryLeaks() {
    try {
      localStorage.removeItem("lastWitness.contentRegistry.v1");
    } catch (_) {}

    const caseList = $("#caseList");
    if (caseList) {
      $$("[data-registry-evidence]", caseList).forEach((node) => node.remove());
    }
  }

  function syncEvidencePhase(phase, ids) {
    if (!window.state) return { found: [], collected: [] };

    const found = getStoryFound(phase, ids);
    const collected = getStoryCollected(phase, ids);

    state[phase] = state[phase] || {};
    state[phase].found = [...found];
    state[phase].collected = [...collected];

    ids.forEach((id) => {
      const hotspot = $(`[data-${phase}-clue="${id}"]`);
      hotspot?.classList.toggle("found", found.includes(id));

      if (
        state.found &&
        typeof state.found.delete === "function" &&
        !found.includes(id)
      ) {
        state.found.delete(id);
      }
    });

    return { found, collected };
  }

  function syncEvidenceProgression() {
    if (!window.state) return;

    const forensic = syncEvidencePhase("forensic", FORENSIC_IDS);
    const medical = syncEvidencePhase("medical", MEDICAL_IDS);

    const compare = $("#reviewForensic");
    if (compare) {
      const ready =
        forensic.found.length === FORENSIC_IDS.length &&
        !state.forensic?.choice;

      compare.classList.toggle("show", ready);
      compare.toggleAttribute("hidden", !ready);

      if (!ready) {
        compare.classList.remove("lw-ready");
      }
    }

    const review = $("#reviewMedical");
    if (review) {
      const ready =
        medical.found.length === MEDICAL_IDS.length &&
        !state.medical?.choice;

      review.classList.toggle("show", ready);

      if (!ready) {
        review.classList.remove("lw-ready");
      }
    }
  }

  function chapterTwoScreen(screen) {
    return [
      "office2",
      "apartment2",
      "cafe2",
      "police2",
      "forensic2",
      "medical2",
      "chapter2Complete",
      "chapter3Wip"
    ].includes(screen);
  }

  function characterIdsFromStory() {
    if (!window.state) return ["Benedict"];

    const screen = activeScreenId();
    const result = ["Benedict"];
    const inChapterTwo =
      chapterTwoScreen(screen) || Number(state.chapter) >= 2;

    if (!inChapterTwo) return result;

    result.push("North");

    const hasReachedForensic = [
      "forensic2",
      "medical2",
      "chapter2Complete",
      "chapter3Wip"
    ].includes(screen);

    const hasReachedPolice = [
      "police2",
      "forensic2",
      "medical2",
      "chapter2Complete",
      "chapter3Wip"
    ].includes(screen);

    const hasReachedMedical = [
      "medical2",
      "chapter2Complete",
      "chapter3Wip"
    ].includes(screen);

    if (
      hasReachedForensic ||
      state.characters?.Elena === true ||
      state.flags?.elena_unlocked === true ||
      state.flags?.cafe_intro_complete === true
    ) {
      result.push("Elena");
    }

    if (
      hasReachedPolice ||
      state.characters?.Somchai === true ||
      state.flags?.police_intro_complete === true
    ) {
      result.push("Somchai");
    }

    if (
      hasReachedPolice ||
      state.characters?.Kittisak === true ||
      state.flags?.police_intro_complete === true
    ) {
      result.push("Kittisak");
    }

    if (hasReachedMedical || state.medical?.ratchataMet === true) {
      result.push("Ratchata");
    }

    return [...new Set(result)];
  }

  function syncCharacterMenuVisibility() {
    const button = $("#charactersButton");
    if (!button) return;

    const visible =
      chapterTwoScreen(activeScreenId()) ||
      Number(window.state?.chapter) >= 2;

    button.style.display = visible ? "" : "none";
  }

  function journalData(name) {
    const fallback = {
      Benedict: {
        status: "Lead Investigator",
        notes:
          "A calm, observant detective who uses humour to keep pressure from controlling the room."
      },
      North: {
        status: "Trusted Partner",
        notes:
          "A precise technical investigator with dry wit and little patience for unsupported conclusions."
      },
      Elena: {
        status: "Forensic Analyst",
        notes:
          "A forensic analyst whose technical knowledge becomes central to the investigation."
      },
      Somchai: {
        status: "Police Officer",
        notes:
          "A Bangkok police officer connected to the official handling of the case."
      },
      Kittisak: {
        status: "Police Captain",
        notes:
          "A disciplined officer whose account helps define the police timeline."
      },
      Ratchata: {
        status: "Senior Medical Examiner",
        notes:
          "An independent medical examiner who refuses to claim more than the body can prove."
      }
    };

    return fallback[name] || {
      status: "Known Character",
      notes: ""
    };
  }

  function journalPortraitSafe(name) {
    if (name === "Ratchata") {
      return "assets/images/ratchata/profile.png";
    }

    try {
      if (typeof window.journalPortrait === "function") {
        return window.journalPortrait(name, "neutral") || "";
      }

      if (typeof window.portrait === "function") {
        return window.portrait(name, "neutral") || "";
      }
    } catch (_) {}

    return "";
  }

  function relationshipPercent(name) {
    try {
      if (typeof window.overallRelationship === "function") {
        return Math.max(
          0,
          Math.min(100, Math.round(window.overallRelationship(name)))
        );
      }
    } catch (_) {}

    return name === "Benedict" ? 100 : 50;
  }

  function renderStoryCharacters() {
    const grid = $("#characterGrid");
    if (!grid) return;

    const ids = characterIdsFromStory();

    grid.innerHTML = ids
      .map((name) => {
        const data = journalData(name);
        const src = journalPortraitSafe(name);
        const percent = relationshipPercent(name);

        return `
          <button class="character-card" data-story-character="${name}" type="button">
            ${src ? `<img src="${src}" alt="">` : ""}
            <div class="character-name">${name}</div>
            <div class="character-status">${data.status}</div>
            <div class="relation-summary">
              <div class="relation-label-row">
                <span>Relationship</span>
                <strong>${percent}%</strong>
              </div>
              <div class="relation-bar">
                <div class="relation-fill" style="width:${percent}%"></div>
              </div>
            </div>
          </button>`;
      })
      .join("");

    $$("[data-story-character]", grid).forEach((button) => {
      button.addEventListener("click", () => {
        const name = button.dataset.storyCharacter;
        const data = journalData(name);
        const src = journalPortraitSafe(name);
        const percent = relationshipPercent(name);

        grid.style.display = "none";

        const detail = $("#characterDetail");
        const back = $("#charactersBack");

        if (detail) {
          detail.style.display = "block";
          detail.innerHTML = `
            <div class="character-detail-head">
              ${src ? `<img src="${src}" alt="">` : ""}
              <div>
                <div class="character-name">${name}</div>
                <div class="character-status">${data.status}</div>
              </div>
            </div>
            <div class="relation-summary">
              <div class="relation-label-row">
                <span>Relationship</span>
                <strong>${percent}%</strong>
              </div>
              <div class="relation-bar">
                <div class="relation-fill" style="width:${percent}%"></div>
              </div>
            </div>
            <div class="character-notes">${data.notes}</div>`;
        }

        if (back) back.style.display = "block";
      });
    });
  }

  function openStoryCharacters(event) {
    const button = event.target.closest?.("#charactersButton");
    if (!button) return;

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    $("#drawer")?.classList.remove("open");

    const grid = $("#characterGrid");
    const detail = $("#characterDetail");
    const back = $("#charactersBack");

    renderStoryCharacters();

    if (grid) grid.style.display = "grid";
    if (detail) detail.style.display = "none";
    if (back) back.style.display = "none";

    $("#charactersModal")?.classList.add("open");
  }

  function backToCharacterGrid(event) {
    const button = event.target.closest?.("#charactersBack");
    if (!button) return;

    event.preventDefault();
    event.stopImmediatePropagation();

    const grid = $("#characterGrid");
    const detail = $("#characterDetail");

    if (grid) grid.style.display = "grid";
    if (detail) detail.style.display = "none";
    button.style.display = "none";
  }

  function playImmediateClick(event) {
    const target = event.target.closest?.(
      'button:not(:disabled), .dialogue:not(.hidden), [role="button"]'
    );

    if (!target) return;

    const audio = $("#clickAudio");
    if (!audio || window.state?.sound === false) return;

    const now = performance.now();
    if (now - immediateClickAt < 140) return;
    immediateClickAt = now;

    clearTimeout(clickStopTimer);

    try {
      audio.pause();
      audio.currentTime = 0;
      audio.loop = false;
      audio.volume = Math.max(
        0,
        Math.min(1, Number(window.state?.sfx) || 0.55)
      );
      audio.play().catch(() => {});

      // One press = one short click. Never allow the source tail to drag on.
      clickStopTimer = window.setTimeout(() => {
        try {
          audio.pause();
          audio.currentTime = 0;
        } catch (_) {}
      }, 105);
    } catch (_) {}
  }

  function installClickDeduplication() {
    if (typeof window.play !== "function") return;
    if (window.play.__lastWitnessImmediateHotfix) return;

    const original = window.play;

    function wrappedPlay(name) {
      if (
        name === "click" &&
        performance.now() - immediateClickAt < 520
      ) {
        return;
      }

      return original.apply(this, arguments);
    }

    wrappedPlay.__lastWitnessImmediateHotfix = true;
    window.play = wrappedPlay;
  }

  function playEvidenceFeedback() {
    playAudio(
      $("#evidenceAudio") ? "evidenceAudio" : "pageAudio",
      Number(window.state?.sfx) || 0.55,
      0
    );
  }

  function policeEvidenceFeedback(event) {
    const button = event.target.closest?.(
      "#inspectPoliceEvidence, #collectPoliceEvidence"
    );
    if (!button) return;

    // Inspection and collection both receive the same completion feedback
    // pattern used by the Victim Apartment evidence panel.
    window.setTimeout(playEvidenceFeedback, 0);
  }

  function trackPhaseEvidence(event) {
    const forensicHotspot = event.target.closest?.("[data-forensic-clue]");
    if (forensicHotspot) {
      activeEvidence.forensic = forensicHotspot.dataset.forensicClue;
      return;
    }

    const medicalHotspot = event.target.closest?.("[data-medical-clue]");
    if (medicalHotspot) {
      activeEvidence.medical = medicalHotspot.dataset.medicalClue;
      return;
    }

    if (event.target.closest?.("#inspectForensicEvidence")) {
      const id = activeEvidence.forensic || state.forensic?.active;
      if (id) {
        ensurePhaseEvidence("forensic", id, false);
        requestAnimationFrame(syncEvidenceProgression);
      }
      return;
    }

    if (event.target.closest?.("#collectForensicEvidence")) {
      const id = activeEvidence.forensic || state.forensic?.active;
      if (id) {
        ensurePhaseEvidence("forensic", id, true);
        requestAnimationFrame(syncEvidenceProgression);
      }
      return;
    }

    if (event.target.closest?.("#inspectMedicalEvidence")) {
      const id = activeEvidence.medical || state.medical?.active;
      if (id) {
        ensurePhaseEvidence("medical", id, false);
        requestAnimationFrame(syncEvidenceProgression);
      }
      return;
    }

    if (event.target.closest?.("#collectMedicalEvidence")) {
      const id = activeEvidence.medical || state.medical?.active;
      if (id) {
        ensurePhaseEvidence("medical", id, true);
        requestAnimationFrame(syncEvidenceProgression);
      }
    }
  }

  function removeBrokenMedicalDuplicates() {
    /*
     * The current HTML contains a stray duplicate Chapter III title/text/button
     * inside #medical2. Duplicate IDs make querySelector and event binding hit
     * the wrong button, leaving the actual Chapter III button inert.
     */
    const medical = $("#medical2");
    const realChapter3 = $("#chapter3Wip");

    if (!medical || !realChapter3) return;

    ["chapter3WipTitle", "chapter3WipText", "chapter3WipReturnTitle"].forEach(
      (id) => {
        $$("#" + id).forEach((node) => {
          if (!realChapter3.contains(node)) node.remove();
        });
      }
    );
  }

  function activateTitle() {
    $$(".screen").forEach((screen) => screen.classList.remove("active"));
    $("#title")?.classList.add("active");

    if (window.state) {
      state.screen = "title";
    }

    [
      "officeAudio",
      "crimeAudio",
      "morningOfficeAudio",
      "cafeAudio",
      "policeAudio",
      "forensicHumAudio",
      "medicalRefrigeratorAudio",
      "medicalMachineAudio",
      "chapterAudio",
      "vibrateAudio"
    ].forEach((id) => stopAudio(id, true));

    const music = Number(window.state?.music);
    playAudio(
      "themeAudio",
      Number.isFinite(music) ? music : 0.33,
      0
    );
    playAudio(
      "rainAudio",
      Number.isFinite(music) ? music * 0.48 : 0.16,
      0
    );

    $("#drawer")?.classList.remove("open");
    $$(".modal.open").forEach((modal) => modal.classList.remove("open"));
  }

  function robustReturnToTitle(event) {
    const button = event.target.closest?.(
      "#chapter3WipReturnTitle, #chapter2ReturnTitle"
    );

    if (!button) return;

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    if (window.LastWitnessChapter2Integration?.returnToTitle) {
      try {
        window.LastWitnessChapter2Integration.returnToTitle();
      } catch (_) {
        activateTitle();
      }
    } else {
      activateTitle();
    }

    requestAnimationFrame(() => {
      if (activeScreenId() !== "title") activateTitle();
      enforceAudioForScreen("title");
    });
  }

  function wrapFunction(object, key, before, after) {
    if (!object || typeof object[key] !== "function") return;
    if (object[key].__lastWitnessDefectHotfix) return;

    const original = object[key];

    function wrapped() {
      before?.apply(this, arguments);
      const result = original.apply(this, arguments);
      after?.apply(this, arguments);
      return result;
    }

    wrapped.__lastWitnessDefectHotfix = true;
    object[key] = wrapped;
  }

  function wrapPhaseRoutes() {
    wrapFunction(
      window,
      "show",
      function (screen) {
        if (screen !== "police2") stopAudio("policeAudio", true);
        if (screen !== "forensic2") stopAudio("forensicHumAudio", true);
        if (screen !== "medical2") {
          stopAudio("medicalRefrigeratorAudio", true);
          stopAudio("medicalMachineAudio", true);
        }
      },
      function (screen) {
        queueRouteRepair(screen);
      }
    );

    wrapFunction(
      window.LastWitnessForensic,
      "start",
      function () {
        LOOP_IDS.forEach((id) => {
          if (id !== "forensicHumAudio") stopAudio(id, true);
        });
      },
      function () {
        queueRouteRepair("forensic2");
      }
    );

    wrapFunction(
      window.LastWitnessMedicalExaminer,
      "start",
      function () {
        LOOP_IDS.forEach((id) => {
          if (
            id !== "medicalRefrigeratorAudio" &&
            id !== "medicalMachineAudio"
          ) {
            stopAudio(id, true);
          }
        });
      },
      function () {
        queueRouteRepair("medical2");
      }
    );

    const integration = window.LastWitnessChapter2Integration;

    wrapFunction(
      integration,
      "showChapter2Complete",
      function () {
        LOOP_IDS.forEach((id) => stopAudio(id, true));
      },
      function () {
        queueRouteRepair("chapter2Complete");
      }
    );

    wrapFunction(
      integration,
      "showChapter3Wip",
      function () {
        LOOP_IDS.forEach((id) => stopAudio(id, true));
      },
      function () {
        queueRouteRepair("chapter3Wip");
      }
    );

    wrapFunction(
      integration,
      "returnToTitle",
      function () {
        LOOP_IDS.forEach((id) => stopAudio(id, true));
      },
      function () {
        queueRouteRepair("title");
      }
    );
  }

  function extendSaveRestore() {
    if (
      typeof window.snapshot === "function" &&
      !window.snapshot.__lastWitnessPhaseState
    ) {
      const originalSnapshot = window.snapshot;

      window.snapshot = function () {
        const data = originalSnapshot.apply(this, arguments);
        data.forensic = window.state?.forensic || {};
        data.medical = window.state?.medical || {};
        return data;
      };

      window.snapshot.__lastWitnessPhaseState = true;
    }

    if (
      typeof window.restore === "function" &&
      !window.restore.__lastWitnessPhaseState
    ) {
      const originalRestore = window.restore;

      window.restore = function (data) {
        if (window.state) {
          state.forensic = data?.forensic || {};
          state.medical = data?.medical || {};
        }

        const result = originalRestore.apply(this, arguments);

        requestAnimationFrame(() => {
          removeRegistryLeaks();
          syncEvidenceProgression();
          renderStoryCharacters();
          enforceAudioForScreen();
        });

        return result;
      };

      window.restore.__lastWitnessPhaseState = true;
    }
  }

  function queueRouteRepair(screen) {
    if (routeRepairQueued) return;
    routeRepairQueued = true;

    requestAnimationFrame(() => {
      routeRepairQueued = false;
      removeRegistryLeaks();
      syncEvidenceProgression();
      removeBrokenMedicalDuplicates();
      syncCharacterMenuVisibility();
      enforceAudioForScreen(screen || activeScreenId());
    });
  }

  function repairAll() {
    removeRegistryLeaks();
    syncEvidenceProgression();
    removeBrokenMedicalDuplicates();
    renderStoryCharacters();
    syncCharacterMenuVisibility();
    enforceAudioForScreen();
    installClickDeduplication();
    wrapPhaseRoutes();
    extendSaveRestore();
  }

  function bind() {
    repairAll();

    document.addEventListener("pointerdown", playImmediateClick, true);
    document.addEventListener("click", policeEvidenceFeedback, true);
    document.addEventListener("click", trackPhaseEvidence, true);
    document.addEventListener("click", openStoryCharacters, true);
    document.addEventListener("click", backToCharacterGrid, true);
    document.addEventListener("click", robustReturnToTitle, true);

    $("#caseButton")?.addEventListener(
      "click",
      () => {
        setTimeout(() => {
          removeRegistryLeaks();
          syncEvidenceProgression();
        }, 0);
      },
      true
    );

    const game = $("#game") || document.body;

    new MutationObserver(() => {
      queueRouteRepair();
    }).observe(game, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["class", "style", "hidden"]
    });

    // Late modules may expose route functions after this script evaluates.
    setTimeout(repairAll, 0);
    setTimeout(repairAll, 250);
    setTimeout(repairAll, 900);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bind, { once: true });
  } else {
    bind();
  }
})();
