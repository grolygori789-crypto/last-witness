/* LAST WITNESS — Defect Repair 0.4.4
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
  let splashClickBuffer = null;
  let splashClickContext = null;
  let splashClickStart = 0;
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

  async function prepareMouseClick(){
    if(splashClickBuffer) return;
    try{
      const response = await fetch("assets/audio/b3dccd7733a71a6d.mp3", {cache:"force-cache"});
      if(!response.ok) return;
      const bytes = await response.arrayBuffer();
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if(!AudioCtx) return;
      splashClickContext = splashClickContext || new AudioCtx();
      splashClickBuffer = await splashClickContext.decodeAudioData(bytes.slice(0));

      // Find the first genuine mouse-click transient rather than assuming that
      // the MP3 begins exactly on the click.
      const channel = splashClickBuffer.getChannelData(0);
      const sampleRate = splashClickBuffer.sampleRate;
      const windowSize = Math.max(32, Math.floor(sampleRate * 0.002));
      const searchLimit = Math.min(channel.length, Math.floor(sampleRate * 1.5));
      let peakEnergy = 0;
      let peakIndex = 0;

      for(let i=0;i<searchLimit-windowSize;i+=windowSize){
        let energy = 0;
        for(let j=0;j<windowSize;j++){
          const value = channel[i+j];
          energy += value * value;
        }
        energy /= windowSize;
        if(energy > peakEnergy){
          peakEnergy = energy;
          peakIndex = i;
        }
      }

      splashClickStart = Math.max(0, (peakIndex / sampleRate) - 0.012);
    }catch(_){}
  }

  function playTrimmedMouseClick(){
    if(!audioAllowed()) return;

    if(splashClickBuffer && splashClickContext){
      try{
        splashClickContext.resume?.();
        const source = splashClickContext.createBufferSource();
        const gain = splashClickContext.createGain();
        source.buffer = splashClickBuffer;
        gain.gain.value = Math.max(.12, Math.min(.7, Number(window.state?.sfx) || .55));
        source.connect(gain);
        gain.connect(splashClickContext.destination);

        const duration = Math.min(.135, Math.max(.075, splashClickBuffer.duration - splashClickStart));
        source.start(0, splashClickStart, duration);
        return;
      }catch(_){}
    }

    // Safe fallback while the decoded buffer is still loading.
    const click = $("#clickAudio");
    if(!click) return;
    try{
      click.pause();
      click.src = "assets/audio/b3dccd7733a71a6d.mp3";
      click.loop = false;
      click.currentTime = splashClickStart || 0;
      click.volume = Math.max(.12, Math.min(.7, Number(window.state?.sfx) || .55));
      click.play().catch(()=>{});
      clearTimeout(clickStopTimer);
      clickStopTimer = setTimeout(()=>stopAudio(click, true), 135);
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

  function installOriginalMouseClick(){
    const enter = $("#enter");
    if(!enter || enter.dataset.lwClickFixed === "1") return;
    enter.dataset.lwClickFixed = "1";
    prepareMouseClick();

    // Own the splash interaction completely so the base onclick cannot play
    // a second, full-length copy of the same sound.
    enter.addEventListener("pointerdown", ()=>{
      splashPointerPlayedAt = performance.now();
      playTrimmedMouseClick();
    }, true);

    enter.addEventListener("click", event=>{
      event.preventDefault();
      event.stopImmediatePropagation();

      // Keyboard-generated clicks have no preceding pointerdown.
      if(performance.now() - splashPointerPlayedAt > 260){
        playTrimmedMouseClick();
      }
      openTitleFromSplash();
    }, true);

    enter.addEventListener("keydown", event=>{
      if(event.key === "Enter" || event.key === " "){
        event.preventDefault();
        playTrimmedMouseClick();
        openTitleFromSplash();
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
