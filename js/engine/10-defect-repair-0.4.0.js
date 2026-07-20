/* LAST WITNESS — Defect Repair 0.4.6
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
  let splashPointerPlayedAt = 0;
  let originalFeatureToast = null;

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

  const SPLASH_MOUSE_CLICK_DATA = "data:audio/wav;base64,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";
  const splashMouseClick = new Audio(SPLASH_MOUSE_CLICK_DATA);
  splashMouseClick.preload = "auto";
  splashMouseClick.loop = false;
  splashMouseClick.playsInline = true;

  let splashOpenTimer = 0;

  function prepareMouseClick(){
    try{ splashMouseClick.load(); }catch(_){}
  }

  function muteLegacySplashClick(muted){
    const legacy = $("#clickAudio");
    if(!legacy) return;
    try{
      legacy.pause();
      legacy.currentTime = 0;
      legacy.muted = Boolean(muted);
    }catch(_){}
  }

  function playTrimmedMouseClick(){
    if(!audioAllowed()) return;
    try{
      splashMouseClick.pause();
      splashMouseClick.currentTime = 0;
      splashMouseClick.loop = false;
      const rawSfx = Number(window.state?.sfx);
      const sfx = Number.isFinite(rawSfx) ? rawSfx : .55;
      // The title ambience begins immediately after this cue, so the splash
      // click receives a small gain lift while still obeying an explicit 0 SFX.
      splashMouseClick.volume = Math.max(0, Math.min(1, sfx * 1.75));
      const result = splashMouseClick.play();
      if(result?.catch) result.catch(()=>{});
    }catch(_){}
  }

  function openTitleFromSplash(){
    if(!$("#splash")?.classList.contains("active")) return;
    try{
      if(typeof show === "function") show("title");
      else{
        $$(".screen").forEach(screen=>screen.classList.remove("active"));
        $("#title")?.classList.add("active");
        if(window.state) state.screen = "title";
      }
    }catch(_){}
  }

  function scheduleTitleFromSplash(){
    clearTimeout(splashOpenTimer);
    // 95 ms stays below the normal threshold of perceived UI delay while
    // allowing the single mouse transient to arrive before title ambience.
    splashOpenTimer = setTimeout(()=>{
      muteLegacySplashClick(false);
      openTitleFromSplash();
    }, 95);
  }

  function installOriginalMouseClick(){
    const enter = $("#enter");
    if(!enter || enter.dataset.lwClickFixed === "1") return;
    enter.dataset.lwClickFixed = "1";
    prepareMouseClick();

    // 09-defect-hotfix owns a document-level pointerdown listener. Mute only
    // that legacy source while the splash is active so it cannot add silence,
    // a second click, or a long tail. It is restored before the title opens.
    muteLegacySplashClick(true);

    enter.addEventListener("pointerdown", ()=>{
      splashPointerPlayedAt = performance.now();
      playTrimmedMouseClick();
    }, true);

    enter.addEventListener("click", event=>{
      event.preventDefault();
      event.stopImmediatePropagation();
      if(performance.now() - splashPointerPlayedAt > 260){
        playTrimmedMouseClick();
      }
      scheduleTitleFromSplash();
    }, true);

    enter.addEventListener("keydown", event=>{
      if(event.key === "Enter" || event.key === " "){
        event.preventDefault();
        event.stopImmediatePropagation();
        playTrimmedMouseClick();
        scheduleTitleFromSplash();
      }
    }, true);
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

  function installPoliceAmbience(){
    const police = $("#policeAudio");
    if(!police) return;

    // This is the cropped version made from the clean opening section.
    const cleanSource = "assets/audio/police-station-seamless.wav";
    if(!police.getAttribute("src")?.endsWith("police-station-seamless.wav")){
      stopAudio(police);
      police.src = cleanSource;
      police.preload = "auto";
      police.loop = true;
      try{ police.load(); }catch(_){}
    }

    const shouldPlay = activeScreen() === "police2" && audioAllowed();
    if(!shouldPlay){
      if(activeScreen() !== "police2") stopAudio(police);
      return;
    }

    police.loop = true;
    police.volume = Math.max(.08, Math.min(.28, (Number(window.state?.music) || .33) * .62));

    if(police.paused){
      const result = police.play();
      if(result?.catch){
        result.catch(()=>{
          clearTimeout(policeRetryTimer);
          policeRetryTimer = setTimeout(()=>{
            if(activeScreen() === "police2" && police.paused && audioAllowed()){
              police.play().catch(()=>{});
            }
          }, 180);
        });
      }
    }
  }

  function stopPrematureEvidenceAudio(){
    ["evidenceAudio","forensicBarcodeAudio","medicalBarcodeAudio"].forEach(id=>{
      const audio = $("#"+id);
      if(!audio) return;
      audio.muted = true;
      setTimeout(()=>{
        stopAudio(audio);
        audio.muted = false;
      }, 70);
    });
  }

  function playEvidenceComplete(){
    let audio = $("#evidenceDoneAudio");
    if(!audio){
      audio = document.createElement("audio");
      audio.id = "evidenceDoneAudio";
      audio.src = "assets/audio/evidence-complete-one-shot.wav";
      audio.preload = "auto";
      document.body.appendChild(audio);
    }
    playOneShot(audio, Number(window.state?.sfx) || .55);
  }

  function installEvidenceTiming(){
    document.addEventListener("pointerdown", event=>{
      if(event.target.closest?.("[data-forensic-clue],[data-medical-clue]")){
        stopPrematureEvidenceAudio();
      }
    }, true);

    document.addEventListener("click", event=>{
      if(event.target.closest?.("#inspectForensicEvidence,#forensicEvidenceObject")){
        stopPrematureEvidenceAudio();
        setTimeout(playEvidenceComplete, 0);
      }
      if(event.target.closest?.("#inspectMedicalEvidence,#medicalEvidenceObject")){
        stopPrematureEvidenceAudio();
        setTimeout(playEvidenceComplete, 0);
      }
    }, true);
  }

  function syncForensicReview(){
    if(activeScreen() !== "forensic2") return;
    const review = $("#reviewForensic");
    if(!review) return;

    const found = new Set(window.state?.forensic?.found || []);
    FORENSIC_IDS.forEach(id=>{
      if(window.state?.found?.has?.(`forensic_${id}`)) found.add(id);
    });

    const panelOpen = $("#forensicEvidencePanel")?.classList.contains("open");
    const dialogueOpen = !$("#forensicDialogue")?.classList.contains("hidden");
    const choiceOpen = !$("#forensicChoice")?.classList.contains("hidden");
    const completeOpen = $("#forensicPhaseComplete")?.style.display === "block";
    const ready = found.size === FORENSIC_IDS.length &&
      !window.state?.forensic?.compared &&
      !window.state?.forensic?.choice &&
      !panelOpen && !dialogueOpen && !choiceOpen && !completeOpen;

    review.classList.toggle("show", ready);
    review.toggleAttribute("hidden", !ready);
    review.disabled = !ready;
    review.style.pointerEvents = ready ? "auto" : "";
  }

  function resetFreshMedicalMarkers(){
    if(activeScreen() !== "medical2" || !window.state) return;

    state.medical = state.medical || {};
    const hasRealProgress =
      Boolean(state.medical.choice || state.medical.complete) ||
      (Array.isArray(state.medical.collected) && state.medical.collected.length > 0);

    // A fresh phase must begin yellow. Only collected/finished inspections become green.
    if(!hasRealProgress && !state.medical.markerBaselineSet){
      state.medical.found = [];
      state.medical.collected = [];
      MEDICAL_IDS.forEach(id=>{
        state.found?.delete?.(`medical_${id}`);
        $(`[data-medical-clue="${id}"]`)?.classList.remove("found");
      });
      state.medical.markerBaselineSet = true;
    }

    const found = new Set(state.medical.found || []);
    MEDICAL_IDS.forEach(id=>{
      $(`[data-medical-clue="${id}"]`)?.classList.toggle("found", found.has(id));
    });
  }

  function chapterTwoReached(){
    const screen = activeScreen();
    return ["office2","apartment2","cafe2","police2","forensic2","medical2",
      "chapter2Complete","chapter3Wip"].includes(screen) || Number(window.state?.chapter) >= 2;
  }

  function journalIntroductionComplete(){
    if(!chapterTwoReached()) return false;

    const checkpoint = String(window.state?.checkpoint || "");
    const screen = activeScreen();

    // The feature becomes available only after the complete post-choice
    // conversation with North has ended. At that moment the base story changes
    // the checkpoint to ch2_apartment_arrival before leaving the office.
    if(window.state?.flags?.chapter2_character_feature_unlocked) return true;
    if(checkpoint === "ch2_apartment_arrival") return true;
    if(["apartment2","cafe2","police2","forensic2","medical2",
        "chapter2Complete","chapter3Wip"].includes(screen)) return true;
    return false;
  }

  function installFeatureToastGuard(){
    if(originalFeatureToast || typeof window.showFeatureToast !== "function") return;
    originalFeatureToast = window.showFeatureToast;
    window.showFeatureToast = function(){
      if(window.state?.flags?.chapter2_character_feature_unlocked){
        return originalFeatureToast.apply(this, arguments);
      }
    };
  }

  function showJournalToastOnce(){
    if(!originalFeatureToast || window.state?.flags?.chapter2_character_toast_shown) return;
    state.flags.chapter2_character_toast_shown = true;
    try{ originalFeatureToast(); }catch(_){}
  }

  function syncCharacterJournal(){
    const button = $("#charactersButton");
    if(!button || !window.state) return;

    state.flags = state.flags || {};
    state.journal = state.journal || {unlocked:false,seen:false,introShown:false};
    state.characters = state.characters || {};

    if(!chapterTwoReached()){
      state.journal.unlocked = false;
      state.journal.seen = true;
      button.style.display = "none";
      $$(".journal-alert").forEach(dot=>dot.classList.remove("show"));
      return;
    }

    const available = journalIntroductionComplete();

    // Neutralise the premature unlock performed by startChapter2().
    if(!available){
      state.journal.unlocked = false;
      state.journal.seen = true;
      state.journal.introShown = false;
      button.style.display = "none";
      $$(".journal-alert").forEach(dot=>dot.classList.remove("show"));
      return;
    }

    button.style.display = "";

    if(!state.flags.chapter2_character_feature_unlocked){
      state.flags.chapter2_character_feature_unlocked = true;
      state.characters.Benedict = true;
      state.characters.North = true;
      state.journal.unlocked = true;
      state.journal.seen = false;
      state.journal.introShown = false;
      showJournalToastOnce();
      try{ if(typeof autoSave === "function") autoSave(); }catch(_){}
    }else{
      state.journal.unlocked = true;
    }

    const unread = Boolean(state.journal.unlocked && !state.journal.seen);
    $$(".journal-alert").forEach(dot=>dot.classList.toggle("show", unread));

    // Opening Character Journal counts as viewing the update. The base handler
    // also sets seen=true; this capture handler guarantees the red dot clears
    // before the modal is drawn.
    if(button.dataset.lwSeenFixed !== "1"){
      button.dataset.lwSeenFixed = "1";
      button.addEventListener("click", ()=>{
        state.journal.seen = true;
        $$(".journal-alert").forEach(dot=>dot.classList.remove("show"));
        try{ if(typeof autoSave === "function") autoSave(); }catch(_){}
      }, true);
    }

    // New characters stay hidden until their first introduction is complete.
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

  function repairScreen(){
    const screen = activeScreen();

    installOriginalMouseClick();
    installFeatureToastGuard();
    repairCafeDialogue();
    installPoliceAmbience();
    syncForensicReview();
    resetFreshMedicalMarkers();
    syncCharacterJournal();

    if(lastScreen !== screen){
      lastScreen = screen;
      if(screen !== "police2") stopAudio($("#policeAudio"));
    }
  }

  function bind(){
    installFeatureToastGuard();
    installOriginalMouseClick();
    installEvidenceTiming();
    repairScreen();

    document.addEventListener("click", ()=>setTimeout(repairScreen, 0), true);
    document.addEventListener("pointerup", ()=>setTimeout(repairScreen, 0), true);

    // Avoid observing class/style changes because repairScreen writes those
    // attributes itself. Event hooks plus this light interval are sufficient.
    setInterval(repairScreen, 300);
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", bind, {once:true});
  }else{
    bind();
  }
})();
