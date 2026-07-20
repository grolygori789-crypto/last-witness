/* LAST WITNESS — Defect Repair 0.4.12
 * Replace js/engine/10-defect-repair-0.4.0.js with this file.
 * Loaded last. Repairs interface click character, evidence feedback hierarchy,
 * police ambience, forensic progression, medical markers, and Character Journal timing.
 */
(function(){
  "use strict";

  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));
  const FORENSIC_IDS = ["sealed_sample","accession_record","audit_trace","batch_record"];
  const MEDICAL_IDS = ["postmortem","identity_tag","autopsy_report","toxicology_sample"];
  const APARTMENT_IDS = ["apt_mug","apt_documents","apt_board","apt_laptop"];
  const MEDICAL_MARKER_FIX_VERSION = "0.4.10";

  let clickStopTimer = 0;
  let policeRetryTimer = 0;
  let lastScreen = "";
  let splashClickAt = 0;
  let dialogueClickAt = 0;
  let evidenceFeedbackAt = 0;
  let medicalStartWrapped = false;
  let volumeHooksInstalled = false;
  let lastTitleNormalizeAt = 0;
  let chapterTwoEndingMusicStarted = false;

  const POLICE_SOURCE = "assets/audio/c9db4b3d64d7ef62.mp3?v=0412";
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

  const interfaceAudio = {
    context: null,
    clickBuffer: null,
    clickRegion: null,
    evidenceBuffer: null,
    evidenceOffset: 0,
    pageBuffer: null,
    pageRegion: null,
    loading: null,
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

  function sfxLevel(){
    const raw = Number(window.state?.sfx);
    return Number.isFinite(raw) ? Math.max(0, Math.min(1, raw)) : .55;
  }

  function getInterfaceAudioContext(){
    if(interfaceAudio.unavailable) return null;
    const Context = window.AudioContext || window.webkitAudioContext;
    if(!Context){
      interfaceAudio.unavailable = true;
      return null;
    }
    if(!interfaceAudio.context){
      try{ interfaceAudio.context = new Context(); }
      catch(_){
        interfaceAudio.unavailable = true;
        return null;
      }
    }
    return interfaceAudio.context;
  }

  async function decodeElementAudio(id){
    const audio = $("#"+id);
    const src = audio?.currentSrc || audio?.src || audio?.getAttribute?.("src");
    const context = getInterfaceAudioContext();
    if(!src || !context || typeof fetch !== "function") return null;
    const response = await fetch(src, {cache:"force-cache"});
    if(!response.ok) throw new Error(`${id} audio ${response.status}`);
    const bytes = await response.arrayBuffer();
    return context.decodeAudioData(bytes.slice(0));
  }

  function monoEnvelope(buffer, windowSeconds=.0025){
    const channels = Math.max(1, Number(buffer.numberOfChannels) || 1);
    const length = Number(buffer.length) || 0;
    const rate = Number(buffer.sampleRate) || 48000;
    const size = Math.max(8, Math.round(rate * windowSeconds));
    const values = [];
    for(let start=0; start<length; start+=size){
      const end = Math.min(length, start + size);
      let sum = 0;
      let count = 0;
      for(let channel=0; channel<channels; channel++){
        const data = buffer.getChannelData(channel);
        for(let i=start; i<end; i++){
          const sample = Number(data[i]) || 0;
          sum += sample * sample;
          count++;
        }
      }
      values.push(Math.sqrt(sum / Math.max(1, count)));
    }
    return {values, size, rate};
  }

  function findTransientRegion(buffer){
    if(!buffer || !buffer.length) return null;
    const envelope = monoEnvelope(buffer);
    const values = envelope.values;
    const skip = Math.min(values.length - 1, Math.floor(.02 * envelope.rate / envelope.size));
    let peakIndex = skip;
    let peak = 0;
    for(let i=skip; i<values.length; i++){
      if(values[i] > peak){
        peak = values[i];
        peakIndex = i;
      }
    }
    if(!(peak > 0)) return {offset:0, duration:Math.min(.12, buffer.duration || .12)};

    const startThreshold = Math.max(.0012, peak * .075);
    let start = peakIndex;
    while(start > skip && values[start - 1] > startThreshold) start--;
    start = Math.max(skip, start - Math.ceil(.012 * envelope.rate / envelope.size));

    const endThreshold = Math.max(.0008, peak * .035);
    const quietWindows = Math.max(2, Math.ceil(.016 * envelope.rate / envelope.size));
    let quiet = 0;
    let end = peakIndex + 1;
    const hardEnd = Math.min(values.length, start + Math.ceil(.18 * envelope.rate / envelope.size));
    for(let i=peakIndex + 1; i<hardEnd; i++){
      if(values[i] < endThreshold) quiet++;
      else quiet = 0;
      end = i + 1;
      if(quiet >= quietWindows) break;
    }

    const offset = Math.max(0, start * envelope.size / envelope.rate);
    const rawDuration = Math.max(.055, (end - start) * envelope.size / envelope.rate);
    return {
      offset,
      duration:Math.min(.18, Math.max(.055, rawDuration))
    };
  }

  function findFirstSoundRegion(buffer, maximum=.28){
    if(!buffer || !buffer.length) return null;
    const envelope = monoEnvelope(buffer, .004);
    const values = envelope.values;
    let peak = 0;
    values.forEach(value=>{ if(value > peak) peak = value; });
    const threshold = Math.max(.001, peak * .035);
    let first = 0;
    while(first < values.length && values[first] < threshold) first++;
    const offset = Math.max(0, first * envelope.size / envelope.rate - .008);
    return {
      offset,
      duration:Math.min(maximum, Math.max(.12, (buffer.duration || maximum) - offset))
    };
  }

  function prepareInterfaceAudio(){
    if(interfaceAudio.loading) return interfaceAudio.loading;
    interfaceAudio.loading = Promise.allSettled([
      decodeElementAudio("clickAudio"),
      decodeElementAudio("evidenceAudio"),
      decodeElementAudio("pageAudio")
    ]).then(results=>{
      const click = results[0].status === "fulfilled" ? results[0].value : null;
      const evidence = results[1].status === "fulfilled" ? results[1].value : null;
      const page = results[2].status === "fulfilled" ? results[2].value : null;

      if(click){
        interfaceAudio.clickBuffer = click;
        interfaceAudio.clickRegion = findTransientRegion(click);
      }
      if(evidence){
        interfaceAudio.evidenceBuffer = evidence;
        interfaceAudio.evidenceOffset = findFirstSoundRegion(evidence, 1.35)?.offset || 0;
      }
      if(page){
        interfaceAudio.pageBuffer = page;
        interfaceAudio.pageRegion = findFirstSoundRegion(page, .24);
      }
      return interfaceAudio;
    }).catch(()=>interfaceAudio);
    return interfaceAudio.loading;
  }

  function connectFilteredSource(context, buffer, offset, duration, level, options={}){
    if(!context || !buffer) return false;
    try{
      const now = context.currentTime;
      const source = context.createBufferSource();
      source.buffer = buffer;

      let node = source;
      if(typeof context.createBiquadFilter === "function"){
        if(options.highpass){
          const highpass = context.createBiquadFilter();
          highpass.type = "highpass";
          highpass.frequency.value = options.highpass;
          node.connect(highpass);
          node = highpass;
        }
        if(options.lowpass){
          const lowpass = context.createBiquadFilter();
          lowpass.type = "lowpass";
          lowpass.frequency.value = options.lowpass;
          lowpass.Q.value = .55;
          node.connect(lowpass);
          node = lowpass;
        }
      }

      const gain = context.createGain();
      const attack = Math.min(.008, duration * .12);
      const release = Math.min(options.release || .035, duration * .45);
      gain.gain.setValueAtTime(.0001, now);
      gain.gain.linearRampToValueAtTime(Math.max(.0001, level), now + attack);
      gain.gain.setValueAtTime(Math.max(.0001, level), Math.max(now + attack, now + duration - release));
      gain.gain.linearRampToValueAtTime(.0001, now + duration);
      node.connect(gain);
      gain.connect(context.destination);
      source.start(now, Math.max(0, offset || 0), Math.max(.02, duration));
      return true;
    }catch(_){
      return false;
    }
  }

  function playRealMouseClick(kind="dialogue"){
    if(!audioAllowed()) return;
    const sfx = sfxLevel();
    if(sfx <= 0) return;
    stopAudio($("#clickAudio"), true);

    const requestedAt = performance.now();
    const perform = ()=>{
      const context = getInterfaceAudioContext();
      const region = interfaceAudio.clickRegion;
      const buffer = interfaceAudio.clickBuffer;
      if(!context || !region || !buffer) return false;
      try{ if(context.state === "suspended") context.resume().catch(()=>{}); }catch(_){}
      const level = kind === "splash"
        ? Math.min(.27, Math.max(.11, sfx * .38))
        : Math.min(.13, Math.max(.045, sfx * .20));
      return connectFilteredSource(
        context,
        buffer,
        region.offset,
        region.duration,
        level,
        {highpass:65, lowpass:2600, release:.04}
      );
    };

    if(!perform()){
      prepareInterfaceAudio().then(()=>{
        if(performance.now() - requestedAt <= 220) perform();
      });
    }
  }

  function playSoftCollectionConfirm(){
    if(!audioAllowed()) return;
    const sfx = sfxLevel();
    if(sfx <= 0) return;
    const context = getInterfaceAudioContext();
    if(!context) return;
    try{ if(context.state === "suspended") context.resume().catch(()=>{}); }catch(_){}

    const region = interfaceAudio.pageRegion;
    if(region && interfaceAudio.pageBuffer){
      connectFilteredSource(
        context,
        interfaceAudio.pageBuffer,
        region.offset,
        region.duration,
        Math.min(.11, sfx * .16),
        {highpass:70, lowpass:1500, release:.06}
      );
    }

    try{
      const now = context.currentTime;
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(245, now);
      oscillator.frequency.exponentialRampToValueAtTime(195, now + .12);
      gain.gain.setValueAtTime(.0001, now);
      gain.gain.linearRampToValueAtTime(Math.min(.028, sfx * .035), now + .012);
      gain.gain.exponentialRampToValueAtTime(.0001, now + .15);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(now);
      oscillator.stop(now + .16);
    }catch(_){}
  }

  function playReviewUnlockCue(){
    if(!audioAllowed()) return;
    const sfx = sfxLevel();
    if(sfx <= 0) return;
    const context = getInterfaceAudioContext();
    const buffer = interfaceAudio.evidenceBuffer;
    if(context && buffer){
      try{ if(context.state === "suspended") context.resume().catch(()=>{}); }catch(_){}
      const offset = Math.max(0, interfaceAudio.evidenceOffset || 0);
      const duration = Math.min(1.28, Math.max(.7, (buffer.duration || 1.28) - offset));
      if(connectFilteredSource(
        context,
        buffer,
        offset,
        duration,
        Math.min(.30, sfx * .42),
        {highpass:55, lowpass:4800, release:.20}
      )) return;
    }

    const audio = $("#evidenceAudio");
    if(!audio) return;
    try{
      audio.muted = false;
      audio.pause();
      audio.currentTime = 0;
      audio.loop = false;
      audio.volume = Math.min(.24, sfx * .34);
      audio.play().catch(()=>{});
      setTimeout(()=>stopAudio(audio, true), 1280);
    }catch(_){}
  }


  function installMedicalMarkerPalette(){
    if($("#lwMedicalMarkerPalette")) return;
    const style = document.createElement("style");
    style.id = "lwMedicalMarkerPalette";
    style.textContent = `
      .medical-hotspot i{
        background:#ddb363!important;
        box-shadow:0 0 0 8px rgba(221,179,99,.17),0 0 24px rgba(221,179,99,.78)!important;
      }
      .medical-hotspot.found i{
        background:#86b79a!important;
        box-shadow:0 0 0 8px rgba(134,183,154,.17)!important;
      }
    `;
    document.head.appendChild(style);
  }

  function installDialogueMouseClick(){
    if(document.documentElement.dataset.lwDialogueClickFixed === "1") return;
    document.documentElement.dataset.lwDialogueClickFixed = "1";

    document.addEventListener("pointerdown", event=>{
      const dialogue = event.target.closest?.(".dialogue:not(.hidden)");
      if(!dialogue) return;
      const now = performance.now();
      if(now - dialogueClickAt < 90) return;
      dialogueClickAt = now;
      playRealMouseClick("dialogue");
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

    enter.addEventListener("pointerdown", ()=>{
      splashClickAt = performance.now();
      playRealMouseClick("splash");
    }, true);

    enter.addEventListener("keydown", event=>{
      if(event.key === "Enter" || event.key === " "){
        splashClickAt = performance.now();
        playRealMouseClick("splash");
      }
    }, true);

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
    // Refined background level: audible room tone without competing with dialogue.
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

  function suppressLegacyEvidenceAudio(duration=360){
    ["evidenceAudio","pageAudio","forensicBarcodeAudio","medicalBarcodeAudio","evidenceDoneAudio"].forEach(id=>{
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

  function evidencePhaseForButton(button){
    if(button?.id === "collectApartmentEvidence") return "apartment";
    if(button?.id === "collectPoliceEvidence") return "police";
    if(button?.id === "collectForensicEvidence") return "forensic";
    if(button?.id === "collectMedicalEvidence") return "medical";
    return "";
  }

  function collectedCount(phase){
    if(!window.state) return 0;
    if(phase === "apartment"){
      return APARTMENT_IDS.filter(id=>state.found?.has?.(id)).length;
    }
    if(phase === "police"){
      return state.flags?.police_evidence_collected ? 1 : 0;
    }
    if(phase === "forensic"){
      return new Set(state.forensic?.collected || []).size;
    }
    if(phase === "medical"){
      return new Set(state.medical?.collected || []).size;
    }
    return 0;
  }

  function collectionTotal(phase){
    if(phase === "apartment") return APARTMENT_IDS.length;
    if(phase === "police") return 1;
    if(phase === "forensic") return FORENSIC_IDS.length;
    if(phase === "medical") return MEDICAL_IDS.length;
    return 0;
  }

  function installEvidenceTiming(){
    if(document.documentElement.dataset.lwEvidenceTimingFixed === "1") return;
    document.documentElement.dataset.lwEvidenceTimingFixed = "1";

    const silentTargets =
      "[data-apt-clue],[data-forensic-clue],[data-medical-clue],"+
      "#inspectApartmentEvidence,#apartmentEvidenceObject,"+
      "#inspectPoliceEvidence,#policeEvidenceObject,"+
      "#inspectForensicEvidence,#forensicEvidenceObject,"+
      "#inspectMedicalEvidence,#medicalEvidenceObject";

    const collectTargets =
      "#collectApartmentEvidence,#collectPoliceEvidence,"+
      "#collectForensicEvidence,#collectMedicalEvidence";

    document.addEventListener("pointerdown", event=>{
      if(event.target.closest?.(silentTargets)){
        suppressLegacyEvidenceAudio(360);
      }
      if(event.target.closest?.(collectTargets)){
        suppressLegacyEvidenceAudio(420);
      }
    }, true);

    document.addEventListener("click", event=>{
      if(event.target.closest?.(silentTargets)){
        suppressLegacyEvidenceAudio(360);
        return;
      }

      const button = event.target.closest?.(collectTargets);
      if(!button) return;

      const now = performance.now();
      if(now - evidenceFeedbackAt < 180) return;
      evidenceFeedbackAt = now;

      const phase = evidencePhaseForButton(button);
      const before = collectedCount(phase);
      const total = collectionTotal(phase);
      suppressLegacyEvidenceAudio(480);

      setTimeout(()=>{
        const after = collectedCount(phase);
        if(after <= before) return;

        // Ordinary evidence collection gets a restrained confirmation only.
        // The final item reserves the longer cue for the newly unlocked review.
        if(total > 1 && after >= total){
          playReviewUnlockCue();
        }else{
          playSoftCollectionConfirm();
        }
      }, 105);
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

    // Never erase a genuinely completed/branched Medical Examiner phase.
    if(state.medical.complete || state.medical.choice){
      state.medical.markerBaselineVersion = MEDICAL_MARKER_FIX_VERSION;
      state.medical.evidenceSessionInitialized = true;
      return;
    }

    // 0.4.9 used evidenceSessionInitialized, so defective saves could skip the
    // reset forever. Use a versioned baseline instead. The first incomplete
    // Medical entry under this build always starts exactly like Forensic:
    // no collected evidence and four yellow hotspots.
    if(state.medical.markerBaselineVersion === MEDICAL_MARKER_FIX_VERSION) return;

    state.medical.found = [];
    state.medical.collected = [];
    MEDICAL_IDS.forEach(id=>state.found?.delete?.(`medical_${id}`));
    state.medical.markerBaselineVersion = MEDICAL_MARKER_FIX_VERSION;
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
      fridge.volume = music * .115;
      if(fridge.paused) fridge.play().catch(()=>{});
    }
    if(machine){
      machine.loop = true;
      machine.volume = music * .025;
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

    // Refined low-profile ambience: present as room tone, never foreground.
    set("officeAudio", music * .22);
    set("crimeAudio", music * .16);
    set("morningOfficeAudio", music * .19);
    set("cafeAudio", music * .20);
    set("forensicHumAudio", music * .075);
    set("medicalRefrigeratorAudio", music * .115);
    set("medicalMachineAudio", music * .025);

    if(screen === "title"){
      // Exact same mix as the original first Title entry.
      set("themeAudio", music);
      set("rainAudio", music * .48);
    }else if(screen === "office"){
      set("rainAudio", music * .105);
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

  function stopNonEndingInvestigationAudio(){
    stopPoliceAmbience();
    ["officeAudio","crimeAudio","morningOfficeAudio","cafeAudio","forensicHumAudio",
     "medicalRefrigeratorAudio","medicalMachineAudio","vibrateAudio"].forEach(id=>{
      stopAudio($("#"+id), true);
    });
  }

  function maintainChapterTwoEndingMusic(restart=false){
    stopNonEndingInvestigationAudio();
    stopAudio($("#themeAudio"), true);
    stopAudio($("#rainAudio"), true);

    const chapter = $("#chapterAudio");
    if(!chapter) return;
    if(!audioAllowed()){
      stopAudio(chapter, true);
      return;
    }

    chapter.loop = false;
    chapter.volume = masterMusic();

    try{
      if(restart && !chapterTwoEndingMusicStarted){
        chapter.pause();
        chapter.currentTime = 0;
        chapterTwoEndingMusicStarted = true;
        chapter.play().catch(()=>{});
      }else if(!chapterTwoEndingMusicStarted && chapter.paused && !chapter.ended && chapter.currentTime <= .05){
        chapterTwoEndingMusicStarted = true;
        chapter.play().catch(()=>{});
      }
    }catch(_){}
  }

  function silenceChapterThreeIfNoEndingMusic(){
    stopNonEndingInvestigationAudio();
    stopAudio($("#themeAudio"), true);
    stopAudio($("#rainAudio"), true);
  }

  function installEndingAudioGuard(){
    if(document.documentElement.dataset.lwEndingAudioFixed === "1") return;
    document.documentElement.dataset.lwEndingAudioFixed = "1";

    document.addEventListener("click", event=>{
      if(event.target.closest?.("#chapter3WipReturnTitle,#chapter2ReturnTitle")){
        // End-card music belongs only to the ending sequence. Stop it before
        // the older Return-to-Title handler can start the Title mix.
        stopAudio($("#chapterAudio"), true);
        chapterTwoEndingMusicStarted = false;
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
          if(screen === "chapter2Complete") maintainChapterTwoEndingMusic(true);
          if(screen === "chapter3Wip") silenceChapterThreeIfNoEndingMusic();
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
    installMedicalMarkerPalette();
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

    if(screen === "chapter2Complete"){
      maintainChapterTwoEndingMusic(previous !== screen);
    }else if(screen === "chapter3Wip"){
      // Keep the same one-shot Chapter I ending cue if it is still playing,
      // but never introduce rain/theme on this screen.
      silenceChapterThreeIfNoEndingMusic();
    }

    if(!["chapter2Complete","chapter3Wip"].includes(screen)){
      chapterTwoEndingMusicStarted = false;
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
    prepareInterfaceAudio();
    installOriginalMouseClick();
    installDialogueMouseClick();
    installMedicalMarkerPalette();
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
