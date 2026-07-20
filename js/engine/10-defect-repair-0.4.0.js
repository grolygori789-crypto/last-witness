/* LAST WITNESS — Defect Repair 0.4.7
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
  let splashClickAt = 0;

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

  function installOriginalMouseClick(){
    const enter = $("#enter");
    if(!enter || enter.dataset.lwClickFixed === "1") return;
    enter.dataset.lwClickFixed = "1";

    const legacy = $("#clickAudio");
    splashMouseClick = new Audio("assets/audio/ui-mouse-click-short.wav?v=047");
    splashMouseClick.preload = "auto";
    splashMouseClick.loop = false;
    splashMouseClick.playsInline = true;
    try{ splashMouseClick.load(); }catch(_){}

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

  function repairScreen(){
    const screen = activeScreen();

    installOriginalMouseClick();
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
    installOriginalMouseClick();
    installEvidenceTiming();
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
