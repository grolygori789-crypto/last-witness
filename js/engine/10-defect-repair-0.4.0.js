/* LAST WITNESS — Defect Repair 0.4.9
 * Replace js/engine/10-defect-repair-0.4.0.js with this file.
 * Loaded last. Repairs splash click, café dialogue continuity, police ambience,
 * forensic evidence timing/review, medical markers, and Character Journal timing.
 */
(function(){
  "use strict";

  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));
  const FORENSIC_IDS = ["sealed_sample","accession_record","audit_trace","batch_record"];
  const MEDICAL_IDS = ["postmortem","identity_tag","autopsy_report","toxicology_sample"];

  let clickStopTimer = 0;
  let policeRetryTimer = 0;
  let lastScreen = "";
  let splashMouseClick = null;
  let dialogueMouseClick = null;
  let splashClickAt = 0;
  let dialogueClickAt = 0;
  let evidenceFeedbackAt = 0;
  let medicalStartWrapped = false;
  let volumeHooksInstalled = false;
  let lastTitleNormalizeAt = 0;

  const POLICE_SOURCE = "assets/audio/c9db4b3d64d7ef62.mp3?v=049";
  const POLICE_LOOP_START = 4.6;
  const POLICE_LOOP_END = 49.6;
  const policeWebAudio = {
    context: null,
    buffer: null,
    source: null,
    gain: null,
    loading: null,
    fallbackBound: false,
    unavailable: false
  };

  function activeScreen(){
    return $(".screen.active")?.id || window.state?.screen || "";
  }

  function audioAllowed(){
    return window.state?.sound !== false;
  }

  function stopAudio(audio, reset=true){
    if(!audio) return;
    try{
      audio.pause();
      if(reset) audio.currentTime = 0;
    }catch(_){}
  }

  function playOneShot(audio, volume=.55, stopAfterMs=0){
    if(!audio || !audioAllowed()) return;
    try{
      audio.pause();
      audio.currentTime = 0;
      audio.loop = false;
      audio.volume = Math.max(0, Math.min(1, Number(volume) || .55));
      const result = audio.play();
      if(result?.catch) result.catch(()=>{});
      if(stopAfterMs > 0){
        clearTimeout(clickStopTimer);
        clickStopTimer = setTimeout(()=>stopAudio(audio, true), stopAfterMs);
      }
    }catch(_){}
  }

  function createShortMouseClick(){
    const audio = new Audio("assets/audio/ui-mouse-click-short.wav?v=049");
    audio.preload = "auto";
    audio.loop = false;
    audio.playsInline = true;
    try{ audio.load(); }catch(_){}
    return audio;
  }

  function playShortMouseClick(audio, minimumVolume=.28, gain=1){
    if(!audioAllowed()) return;
    const raw = Number(window.state?.sfx);
    const sfx = Number.isFinite(raw) ? raw : .55;
    if(sfx <= 0) return;
    stopAudio($("#clickAudio"), true);
    try{
      audio.pause();
      audio.currentTime = 0;
      audio.loop = false;
      audio.volume = Math.max(0, Math.min(1, Math.max(minimumVolume, sfx * gain)));
      const result = audio.play();
      if(result?.catch) result.catch(()=>{});
    }catch(_){}
  }

  function installDialogueMouseClick(){
    if(document.documentElement.dataset.lwDialogueClickFixed === "1") return;
    document.documentElement.dataset.lwDialogueClickFixed = "1";
    dialogueMouseClick = createShortMouseClick();

    document.addEventListener("pointerdown", event=>{
      const dialogue = event.target.closest?.(".dialogue:not(.hidden)");
      if(!dialogue) return;
      const now = performance.now();
      if(now - dialogueClickAt < 90) return;
      dialogueClickAt = now;
      playShortMouseClick(dialogueMouseClick, .58, 1.35);
    }, true);

    if(typeof window.play === "function" && !window.play.__lwDialogueMouseFix){
      const originalPlay = window.play;
      function wrappedPlay(name){
        if(name === "click" && performance.now() - dialogueClickAt < 520){
          return;
        }
        return originalPlay.apply(this, arguments);
      }
      wrappedPlay.__lwDialogueMouseFix = true;
      window.play = wrappedPlay;
    }
  }

  function installOriginalMouseClick(){
    const enter = $("#enter");
    if(!enter || enter.dataset.lwClickFixed === "1") return;
    enter.dataset.lwClickFixed = "1";

    const legacy = $("#clickAudio");
    splashMouseClick = createShortMouseClick();

    function playSplashMouseClick(){
      if(!audioAllowed()) return;

      const raw = Number(window.state?.sfx);
      const sfx = Number.isFinite(raw) ? raw : .55;
      if(sfx <= 0) return;

      // 09-defect-hotfix runs first on document pointerdown. Its source begins
      // with silence, so stop it immediately and let only this cropped mouse
      // click be audible. Do not interfere with the original title onclick.
      stopAudio(legacy, true);

      try{
        splashMouseClick.pause();
        splashMouseClick.currentTime = 0;
        splashMouseClick.volume = Math.min(1, Math.max(.82, sfx * 1.55));
        const result = splashMouseClick.play();
        if(result?.catch) result.catch(()=>{});
      }catch(_){}
    }

    enter.addEventListener("pointerdown", ()=>{
      splashClickAt = performance.now();
      playSplashMouseClick();
    }, true);

    enter.addEventListener("keydown", event=>{
      if(event.key === "Enter" || event.key === " "){
        splashClickAt = performance.now();
        playSplashMouseClick();
      }
    }, true);

    // Preserve the game's original onclick route, but suppress only its second
    // full-length click copy when this dedicated splash cue has just played.
    if(typeof window.play === "function" && !window.play.__lwSplashMouseFix){
      const originalPlay = window.play;
      function wrappedPlay(name){
        if(name === "click" && activeScreen() === "splash" &&
           performance.now() - splashClickAt < 700){
          return;
        }
        return originalPlay.apply(this, arguments);
      }
      wrappedPlay.__lwSplashMouseFix = true;
      window.play = wrappedPlay;
    }
  }

  function repairCafeDialogue(){
    if(typeof LANG !== "undefined" && LANG.en){
      LANG.en.cafe_06 = "Only if you ordered the second coffee.";
      LANG.en.cafe_07 = "I didn't order it. Daniel did.";
    }
    if(typeof LANG !== "undefined" && LANG.th){
      LANG.th.cafe_06 = "ถ้าคุณเป็นคนสั่งกาแฟแก้วที่สองนะคะ";
      LANG.th.cafe_07 = "ผมไม่ได้สั่ง Daniel เป็นคนสั่ง";
    }

    const box = $("#cafeDialogue");
    if(!box) return;
    const speaker = $(".speaker", box)?.textContent?.trim();
    const line = $(".line", box);
    if(!line) return;

    if(speaker === "Elena" && /planning to deny ordering the second coffee/i.test(line.textContent)){
      line.textContent = "Only if you ordered the second coffee.";
    }
    if(speaker === "Benedict" && line.textContent.trim() === "I didn't. Daniel did."){
      line.textContent = "I didn't order it. Daniel did.";
    }
  }

  function masterMusic(){
    const value = Number(window.state?.music);
    return Number.isFinite(value) ? Math.max(0, Math.min(1, value)) : .33;
  }

  function policeVolume(){
    // 65% lower than the former .76 * music profile.
    return masterMusic() * .27;
  }

  function stopPoliceWebAudio(){
    if(policeWebAudio.source){
      try{ policeWebAudio.source.stop(); }catch(_){}
      try{ policeWebAudio.source.disconnect(); }catch(_){}
      policeWebAudio.source = null;
    }
    if(policeWebAudio.gain){
      try{ policeWebAudio.gain.disconnect(); }catch(_){}
      policeWebAudio.gain = null;
    }
  }

  async function loadPoliceBuffer(){
    if(policeWebAudio.buffer) return policeWebAudio.buffer;
    if(policeWebAudio.loading) return policeWebAudio.loading;
    if(policeWebAudio.unavailable) throw new Error("Web Audio unavailable");

    policeWebAudio.loading = (async()=>{
      const Context = window.AudioContext || window.webkitAudioContext;
      if(!Context || typeof fetch !== "function"){
        policeWebAudio.unavailable = true;
        throw new Error("Web Audio unavailable");
      }
      const context = policeWebAudio.context || new Context();
      policeWebAudio.context = context;
      const response = await fetch(POLICE_SOURCE, {cache:"force-cache"});
      if(!response.ok) throw new Error(`Police audio ${response.status}`);
      const bytes = await response.arrayBuffer();
      const buffer = await context.decodeAudioData(bytes.slice(0));
      policeWebAudio.buffer = buffer;
      return buffer;
    })();

    try{
      return await policeWebAudio.loading;
    }catch(error){
      policeWebAudio.unavailable = true;
      throw error;
    }finally{
      policeWebAudio.loading = null;
    }
  }

  function bindPoliceFallback(police){
    if(policeWebAudio.fallbackBound) return;
    policeWebAudio.fallbackBound = true;

    const loopCleanSection = ()=>{
      if(activeScreen() !== "police2") return;
      const end = Math.min(POLICE_LOOP_END, Number(police.duration) || POLICE_LOOP_END);
      if(police.currentTime >= end - .08){
        try{
          police.currentTime = POLICE_LOOP_START;
          police.play().catch(()=>{});
        }catch(_){}
      }
    };
    police.addEventListener("timeupdate", loopCleanSection);
    police.addEventListener("ended", ()=>{
      if(activeScreen() !== "police2") return;
      try{
        police.currentTime = POLICE_LOOP_START;
        police.play().catch(()=>{});
      }catch(_){}
    });
  }

  function startPoliceFallback(police){
    stopPoliceWebAudio();
    police.muted = false;
    police.loop = false;
    police.volume = policeVolume();
    bindPoliceFallback(police);
    try{
      if(police.currentTime < POLICE_LOOP_START || police.currentTime >= POLICE_LOOP_END){
        police.currentTime = POLICE_LOOP_START;
      }
      if(police.paused) police.play().catch(()=>{});
    }catch(_){}
  }

  async function startPoliceCleanLoop(police){
    if(activeScreen() !== "police2" || !audioAllowed()) return;
    if(policeWebAudio.source){
      if(policeWebAudio.gain) policeWebAudio.gain.gain.value = policeVolume();
      return;
    }

    try{
      const buffer = await loadPoliceBuffer();
      if(activeScreen() !== "police2" || !audioAllowed()) return;
      const context = policeWebAudio.context;
      if(context.state === "suspended") await context.resume();

      stopAudio(police, true);
      police.muted = true;

      const source = context.createBufferSource();
      const gain = context.createGain();
      const loopEnd = Math.min(POLICE_LOOP_END, Math.max(POLICE_LOOP_START + 1, buffer.duration - .05));
      source.buffer = buffer;
      source.loop = true;
      source.loopStart = POLICE_LOOP_START;
      source.loopEnd = loopEnd;
      gain.gain.value = policeVolume();
      source.connect(gain);
      gain.connect(context.destination);
      source.start(0, POLICE_LOOP_START);
      policeWebAudio.source = source;
      policeWebAudio.gain = gain;
    }catch(_){
      if(activeScreen() === "police2") startPoliceFallback(police);
    }
  }

  function stopPoliceAmbience(){
    stopPoliceWebAudio();
    const police = $("#policeAudio");
    if(police){
      stopAudio(police, true);
      police.muted = false;
    }
  }

  function installPoliceAmbience(){
    const police = $("#policeAudio");
    if(!police) return;

    const currentSource = police.getAttribute("src") || "";
    if(!currentSource.includes("c9db4b3d64d7ef62.mp3")){
      stopAudio(police, true);
      police.src = POLICE_SOURCE;
      police.preload = "auto";
      police.loop = false;
      try{ police.load(); }catch(_){}
    }

    const shouldPlay = activeScreen() === "police2" && audioAllowed();
    if(!shouldPlay){
      stopPoliceAmbience();
      return;
    }

    stopAudio($("#medicalRefrigeratorAudio"), true);
    stopAudio($("#medicalMachineAudio"), true);
    stopAudio($("#forensicHumAudio"), true);

    if(policeWebAudio.gain) policeWebAudio.gain.gain.value = policeVolume();
    if(!policeWebAudio.source && !policeWebAudio.loading){
      startPoliceCleanLoop(police);
    }
  }

  function suppressLegacyEvidenceAudio(duration=260){
    ["evidenceAudio","forensicBarcodeAudio","medicalBarcodeAudio","evidenceDoneAudio"].forEach(id=>{
      const audio = $("#"+id);
      if(!audio) return;
      audio.muted = true;
      stopAudio(audio, true);
      setTimeout(()=>{
        stopAudio(audio, true);
        audio.muted = false;
      }, duration);
    });
  }

  function playEvidenceAfterCollection(){
    if(!audioAllowed()) return;
    const audio = $("#evidenceAudio");
    if(!audio) return;
    const raw = Number(window.state?.sfx);
    const sfx = Number.isFinite(raw) ? raw : .55;
    if(sfx <= 0) return;
    try{
      audio.muted = false;
      audio.pause();
      audio.currentTime = 0;
      audio.loop = false;
      audio.volume = Math.max(0, Math.min(1, sfx * .8));
      audio.play().catch(()=>{});
    }catch(_){}
  }

  function installEvidenceTiming(){
    if(document.documentElement.dataset.lwEvidenceTimingFixed === "1") return;
    document.documentElement.dataset.lwEvidenceTimingFixed = "1";

    document.addEventListener("pointerdown", event=>{
      if(event.target.closest?.(
        "[data-forensic-clue],[data-medical-clue],"+
        "#inspectForensicEvidence,#forensicEvidenceObject,"+
        "#inspectMedicalEvidence,#medicalEvidenceObject"
      )){
        // Opening and inspecting are silent, matching Victim Apartment.
        suppressLegacyEvidenceAudio(300);
      }
      if(event.target.closest?.("#collectForensicEvidence,#collectMedicalEvidence")){
        // Clear any barcode/open sound before the collection handler completes.
        suppressLegacyEvidenceAudio(45);
      }
    }, true);

    document.addEventListener("click", event=>{
      if(event.target.closest?.(
        "[data-forensic-clue],[data-medical-clue],"+
        "#inspectForensicEvidence,#forensicEvidenceObject,"+
        "#inspectMedicalEvidence,#medicalEvidenceObject"
      )){
        suppressLegacyEvidenceAudio(300);
        return;
      }

      if(event.target.closest?.("#collectForensicEvidence,#collectMedicalEvidence")){
        const now = performance.now();
        if(now - evidenceFeedbackAt < 250) return;
        evidenceFeedbackAt = now;
        // Let the original collect() finish, close its panel and turn the marker green first.
        setTimeout(playEvidenceAfterCollection, 80);
      }
    }, true);
  }

  function syncForensicReview(){
    if(activeScreen() !== "forensic2" || !window.state) return;
    const review = $("#reviewForensic");
    const dialogue = $("#forensicDialogue");
    const choice = $("#forensicChoice");
    const complete = $("#forensicPhaseComplete");
    if(!review) return;

    state.forensic = state.forensic || {};
    const found = new Set(state.forensic.found || []);
    FORENSIC_IDS.forEach(id=>{
      if(state.found?.has?.(`forensic_${id}`)) found.add(id);
    });

    const panelOpen = $("#forensicEvidencePanel")?.classList.contains("open");
    const dialogueOpen = Boolean(dialogue && !dialogue.classList.contains("hidden"));
    const choiceOpen = Boolean(choice && !choice.classList.contains("hidden"));
    const completeOpen = Boolean(complete && getComputedStyle(complete).display !== "none");
    const compared = Boolean(state.forensic.compared);
    const chosen = Boolean(state.forensic.choice);
    const ready = found.size === FORENSIC_IDS.length &&
      !compared && !chosen && !panelOpen && !dialogueOpen && !choiceOpen && !completeOpen;

    if(ready){
      review.hidden = false;
      review.removeAttribute("hidden");
      review.disabled = false;
      review.classList.add("show");
      review.style.removeProperty("display");
      review.style.pointerEvents = "auto";
      review.style.opacity = "1";
    }else{
      review.classList.remove("show");
      review.hidden = true;
      review.setAttribute("hidden", "");
      review.disabled = true;
      review.style.display = "none";
      review.style.pointerEvents = "none";
      review.style.opacity = "0";
    }

    // 09-defect-hotfix can re-show the disabled Compare button after comparison.
    // Once the comparison dialogue finishes, expose the deduction choices instead.
    if(compared && !chosen && !dialogueOpen && !completeOpen && choice){
      choice.classList.remove("hidden");
      choice.hidden = false;
      choice.style.display = "";
      choice.style.opacity = "1";
      choice.style.pointerEvents = "auto";
      $$('button', choice).forEach(button=>{
        button.disabled = false;
        button.style.pointerEvents = "auto";
        button.style.opacity = "1";
      });
    }

    const continueButton = $("#continueMedicalExaminer");
    if(continueButton){
      continueButton.disabled = false;
      continueButton.hidden = false;
      continueButton.style.opacity = "1";
      continueButton.style.pointerEvents = "auto";
    }
  }

  function installForensicContinuation(){
    const button = $("#continueMedicalExaminer");
    if(!button || button.dataset.lwContinueFixed === "1") return;
    button.dataset.lwContinueFixed = "1";
    button.addEventListener("click", event=>{
      event.preventDefault();
      event.stopImmediatePropagation();
      $("#forensicPhaseComplete")?.style.setProperty("display", "none");
      stopAudio($("#forensicHumAudio"), true);
      try{
        if(window.state){
          state.forensic = state.forensic || {};
          state.forensic.complete = true;
          state.screen = "medical2";
        }
        if(window.LastWitnessChapter2Integration?.enterMedicalExaminer){
          window.LastWitnessChapter2Integration.enterMedicalExaminer();
        }else if(window.LastWitnessMedicalExaminer?.start){
          window.LastWitnessMedicalExaminer.start();
        }else if(typeof show === "function"){
          show("medical2");
        }
      }catch(_){}
    }, true);
  }

  function clearFreshMedicalEvidence(){
    if(!window.state) return;
    state.medical = state.medical || {};
    if(state.medical.complete || state.medical.choice) {
      state.medical.evidenceSessionInitialized = true;
      return;
    }
    if(state.medical.evidenceSessionInitialized) return;

    // One-time migration/reset: old builds could carry four stale green markers
    // into the first Medical Examiner entry. A new evidence session begins yellow.
    state.medical.found = [];
    state.medical.collected = [];
    MEDICAL_IDS.forEach(id=>state.found?.delete?.(`medical_${id}`));
    state.medical.evidenceSessionInitialized = true;
  }

  function installMedicalStartGuard(){
    const api = window.LastWitnessMedicalExaminer;
    if(!api || typeof api.start !== "function" || api.start.__lwMedicalStartGuard) return;
    const original = api.start;
    function guardedMedicalStart(){
      clearFreshMedicalEvidence();
      const result = original.apply(this, arguments);
      setTimeout(()=>ensureMedicalAmbience(true), 0);
      setTimeout(()=>ensureMedicalAmbience(false), 160);
      return result;
    }
    guardedMedicalStart.__lwMedicalStartGuard = true;
    api.start = guardedMedicalStart;
    medicalStartWrapped = true;
  }

  function ensureMedicalAmbience(playDoor=false){
    if(activeScreen() !== "medical2" || !audioAllowed()) return;
    stopPoliceAmbience();
    stopAudio($("#forensicHumAudio"), true);

    const music = masterMusic();
    const fridge = $("#medicalRefrigeratorAudio");
    const machine = $("#medicalMachineAudio");
    const door = $("#medicalDoorAudio");

    if(fridge){
      fridge.loop = true;
      fridge.volume = music * .17;
      if(fridge.paused) fridge.play().catch(()=>{});
    }
    if(machine){
      machine.loop = true;
      machine.volume = music * .04;
      if(machine.paused) machine.play().catch(()=>{});
    }
    if(playDoor && door && door.paused){
      const raw = Number(window.state?.sfx);
      const sfx = Number.isFinite(raw) ? raw : .55;
      try{
        door.currentTime = 0;
        door.volume = Math.max(0, Math.min(1, sfx * .72));
        door.play().catch(()=>{});
      }catch(_){}
    }
  }

  function resetFreshMedicalMarkers(){
    if(activeScreen() !== "medical2" || !window.state) return;
    clearFreshMedicalEvidence();

    state.medical = state.medical || {};
    // Green means the evidence was actually collected, exactly like Victim Apartment.
    const collected = new Set(state.medical.collected || []);
    MEDICAL_IDS.forEach(id=>{
      const hotspot = $(`[data-medical-clue="${id}"]`);
      hotspot?.classList.toggle("found", collected.has(id));
    });
  }

  function chapterTwoReached(){
    const screen = activeScreen();
    return ["office2","apartment2","cafe2","police2","forensic2","medical2",
      "chapter2Complete","chapter3Wip"].includes(screen) || Number(window.state?.chapter) >= 2;
  }

  function journalIntroductionComplete(){
    const screen = activeScreen();
    if(!chapterTwoReached()) return false;
    if(screen !== "office2") return true;

    // During the first office exchange, the choice panel is still hidden.
    return Boolean(window.state?.flags?.chapter2_first_choice) ||
      !$("#office2Choice")?.classList.contains("hidden") ||
      window.state?.checkpoint === "ch2_office_after_choice";
  }

  function syncCharacterJournal(){
    const button = $("#charactersButton");
    if(!button || !window.state) return;

    state.flags = state.flags || {};
    state.journal = state.journal || {unlocked:false,seen:true,introShown:false};
    state.characters = state.characters || {};

    const unlocked = Boolean(
      state.flags.chapter2_character_feature_unlocked &&
      state.journal.unlocked
    );

    // hidden prevents 09-defect-hotfix or show() from briefly exposing the
    // menu before the complete post-choice conversation has finished.
    button.hidden = !unlocked;
    button.style.display = unlocked ? "" : "none";

    const unread = Boolean(unlocked && !state.journal.seen);
    $$(".journal-alert").forEach(dot=>dot.classList.toggle("show", unread));

    // 09 opens the Character modal from a document-level click handler and
    // stops later click handlers. Mark it read on pointerdown, before that
    // handler runs, so every red dot clears immediately and stays cleared.
    if(button.dataset.lwSeenFixed !== "1"){
      button.dataset.lwSeenFixed = "1";
      button.addEventListener("pointerdown", ()=>{
        if(!state.journal?.unlocked) return;
        state.journal.seen = true;
        $$(".journal-alert").forEach(dot=>dot.classList.remove("show"));
        try{ if(typeof syncJournalAlert === "function") syncJournalAlert(); }catch(_){}
        try{ if(typeof autoSave === "function") autoSave(); }catch(_){}
      }, true);
    }

    // New characters remain gated by their own first completed introduction.
    if(activeScreen() === "cafe2" && !state.flags?.cafe_first_elena_choice && !state.flags?.cafe_complete){
      state.characters.Elena = false;
    }
    if(activeScreen() === "police2" && !state.flags?.police_intro_complete){
      state.characters.Somchai = false;
      state.characters.Kittisak = false;
    }
    if(activeScreen() === "medical2" && !state.medical?.ratchataMet){
      state.characters.Ratchata = false;
    }
  }

  function stopAllInvestigationAudio(){
    stopPoliceAmbience();
    ["officeAudio","crimeAudio","morningOfficeAudio","cafeAudio","forensicHumAudio",
     "medicalRefrigeratorAudio","medicalMachineAudio","chapterAudio","vibrateAudio"].forEach(id=>{
      stopAudio($("#"+id), true);
    });
  }

  function applySceneVolumeProfile(){
    const screen = activeScreen();
    const music = masterMusic();
    const set = (id, value)=>{
      const audio = $("#"+id);
      if(audio) audio.volume = Math.max(0, Math.min(1, value));
    };

    // The requested ambience is roughly 65% lower than the former mix.
    set("officeAudio", music * .29);
    set("crimeAudio", music * .35);
    set("morningOfficeAudio", music * .25);
    set("cafeAudio", music * .27);
    set("forensicHumAudio", music * .105);
    set("medicalRefrigeratorAudio", music * .17);
    set("medicalMachineAudio", music * .04);

    if(screen === "title"){
      // Exact same mix as the original first Title entry.
      set("themeAudio", music);
      set("rainAudio", music * .48);
    }else if(screen === "office"){
      set("rainAudio", music * .168);
    }

    if(policeWebAudio.gain) policeWebAudio.gain.gain.value = policeVolume();
    const police = $("#policeAudio");
    if(police) police.volume = policeVolume();
  }

  function normalizeTitleAudio(){
    if(activeScreen() !== "title" || !audioAllowed()) return;
    const now = performance.now();
    if(now - lastTitleNormalizeAt < 60) return;
    lastTitleNormalizeAt = now;

    stopAllInvestigationAudio();
    const music = masterMusic();
    const theme = $("#themeAudio");
    const rain = $("#rainAudio");
    [theme, rain].forEach(audio=>stopAudio(audio, true));

    if(theme){
      theme.loop = true;
      theme.volume = music;
      theme.play().catch(()=>{});
    }
    if(rain){
      rain.loop = true;
      rain.volume = music * .48;
      rain.play().catch(()=>{});
    }
  }

  function silenceEndingScreen(){
    stopAllInvestigationAudio();
    stopAudio($("#themeAudio"), true);
    stopAudio($("#rainAudio"), true);
  }

  function installEndingAudioGuard(){
    if(document.documentElement.dataset.lwEndingAudioFixed === "1") return;
    document.documentElement.dataset.lwEndingAudioFixed = "1";

    document.addEventListener("click", event=>{
      if(event.target.closest?.("#chapter3WipReturnTitle,#chapter2ReturnTitle")){
        // The older integration starts a different fixed rain mix. Normalize after it runs.
        setTimeout(normalizeTitleAudio, 0);
        setTimeout(normalizeTitleAudio, 90);
        setTimeout(normalizeTitleAudio, 240);
      }
    }, true);
  }

  function installVolumeHooks(){
    if(volumeHooksInstalled) return;
    volumeHooksInstalled = true;

    if(typeof window.setVolumes === "function" && !window.setVolumes.__lwQuietMix){
      const originalSetVolumes = window.setVolumes;
      function quietSetVolumes(){
        const result = originalSetVolumes.apply(this, arguments);
        applySceneVolumeProfile();
        return result;
      }
      quietSetVolumes.__lwQuietMix = true;
      window.setVolumes = quietSetVolumes;
    }

    if(typeof window.ambience === "function" && !window.ambience.__lwQuietMix){
      const originalAmbience = window.ambience;
      function quietAmbience(screen){
        const result = originalAmbience.apply(this, arguments);
        setTimeout(()=>{
          applySceneVolumeProfile();
          if(screen === "police2") installPoliceAmbience();
          if(screen === "medical2") ensureMedicalAmbience(false);
          if(screen === "chapter2Complete" || screen === "chapter3Wip") silenceEndingScreen();
        }, 0);
        return result;
      }
      quietAmbience.__lwQuietMix = true;
      window.ambience = quietAmbience;
    }
  }

  function repairScreen(){
    const screen = activeScreen();
    const previous = lastScreen;

    installOriginalMouseClick();
    installDialogueMouseClick();
    installForensicContinuation();
    installMedicalStartGuard();
    installVolumeHooks();
    installEndingAudioGuard();
    repairCafeDialogue();
    syncForensicReview();
    resetFreshMedicalMarkers();
    syncCharacterJournal();
    applySceneVolumeProfile();

    if(screen === "police2") installPoliceAmbience();
    else stopPoliceAmbience();

    if(screen === "medical2") ensureMedicalAmbience(false);
    else{
      stopAudio($("#medicalRefrigeratorAudio"), true);
      stopAudio($("#medicalMachineAudio"), true);
    }

    if(screen === "chapter2Complete" || screen === "chapter3Wip"){
      silenceEndingScreen();
    }

    if(previous !== screen){
      lastScreen = screen;
      if(screen === "medical2"){
        // Original module normally plays this itself. This is a one-shot fallback only.
        setTimeout(()=>ensureMedicalAmbience(true), 40);
      }
      if(screen === "title" && (previous === "chapter2Complete" || previous === "chapter3Wip")){
        setTimeout(normalizeTitleAudio, 0);
        setTimeout(normalizeTitleAudio, 100);
      }
    }
  }

  function bind(){
    installOriginalMouseClick();
    installDialogueMouseClick();
    installForensicContinuation();
    installEvidenceTiming();
    installMedicalStartGuard();
    installVolumeHooks();
    installEndingAudioGuard();
    repairScreen();

    document.addEventListener("click", ()=>setTimeout(repairScreen, 0), true);
    document.addEventListener("pointerup", ()=>setTimeout(repairScreen, 0), true);

    setInterval(repairScreen, 250);
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", bind, {once:true});
  }else{
    bind();
  }
})();
