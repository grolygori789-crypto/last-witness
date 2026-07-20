/* LAST WITNESS — Defect Repair 0.4.1
 * Loaded after 09-defect-hotfix.js.
 * Deterministic repairs for click/evidence audio, police ambience,
 * character unlock timing, phase evidence state and portrait alignment.
 */
(function(){
  "use strict";
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
  const F_IDS=["sealed_sample","accession_record","audit_trace","batch_record"];
  const M_IDS=["postmortem","identity_tag","autopsy_report","toxicology_sample"];
  const active={forensic:null,medical:null};
  let evidencePlaying=null;

  function stop(a){
    if(!a)return;
    try{a.pause();a.currentTime=0;}catch(_){}
  }

  function installAudioSources(){
    const click=$("#clickAudio");
    if(click){
      stop(click);
      click.src="assets/audio/ui-click-one-shot.wav";
      click.loop=false;
      click.preload="auto";
      click.load();
    }

    const police=$("#policeAudio");
    if(police){
      stop(police);
      police.src="assets/audio/police-station-seamless.wav";
      police.loop=true;
      police.preload="auto";
      police.load();
    }

    if(!$("#evidenceDoneAudio")){
      const a=document.createElement("audio");
      a.id="evidenceDoneAudio";
      a.src="assets/audio/evidence-complete-one-shot.wav";
      a.preload="auto";
      a.loop=false;
      document.body.appendChild(a);
    }
  }

  function playOneShot(id,volume=.55){
    const a=$("#"+id);
    if(!a||window.state?.sound===false)return;
    try{
      a.pause();a.currentTime=0;a.loop=false;
      a.volume=Math.max(0,Math.min(1,Number(volume)||.55));
      a.play().catch(()=>{});
    }catch(_){}
  }

  function stopEvidence(){
    stop($("#evidenceDoneAudio"));
    stop($("#evidenceAudio"));
    stop($("#medicalBarcodeAudio"));
    stop($("#forensicBarcodeAudio"));
  }

  function suppressPrematureEvidenceSound(){
    ["#evidenceAudio","#medicalBarcodeAudio","#forensicBarcodeAudio"].forEach(sel=>{
      const a=$(sel);
      if(!a)return;
      a.muted=true;
      setTimeout(()=>{stop(a);a.muted=false;},80);
    });
  }

  function phaseState(phase){
    if(!window.state)return null;
    state[phase]=state[phase]||{};
    state[phase].found=Array.isArray(state[phase].found)?state[phase].found:[];
    state[phase].collected=Array.isArray(state[phase].collected)?state[phase].collected:[];
    return state[phase];
  }

  function markFound(phase,id){
    const ids=phase==="forensic"?F_IDS:M_IDS;
    if(!ids.includes(id))return;
    const p=phaseState(phase);
    if(p&&!p.found.includes(id))p.found.push(id);
    state?.found?.add?.(`${phase}_${id}`);
    $(`[data-${phase}-clue="${id}"]`)?.classList.add("found");
  }

  function clearPhase(phase){
    const ids=phase==="forensic"?F_IDS:M_IDS;
    if(window.state){
      state[phase]={found:[],collected:[]};
      ids.forEach(id=>state.found?.delete?.(`${phase}_${id}`));
    }
    ids.forEach(id=>$(`[data-${phase}-clue="${id}"]`)?.classList.remove("found"));
    const review=$("#review"+(phase==="forensic"?"Forensic":"Medical"));
    review?.classList.remove("show");
    review?.setAttribute("hidden","");
  }

  function fixCharacterVisibility(){
    const screen=$(".screen.active")?.id||state?.screen||"";
    const menu=$("#charactersButton");
    const chapter2=["office2","apartment2","cafe2","police2","forensic2","medical2","chapter2Complete","chapter3Wip"].includes(screen)||Number(state?.chapter)>=2;
    if(menu)menu.style.display=chapter2?"":"none";

    if(!chapter2)return;
    if(screen==="forensic2"||screen==="medical2"||screen==="chapter2Complete"||screen==="chapter3Wip"){
      state.characters=state.characters||{};
      state.characters.Elena=true;
    }
    // Police contacts are not known merely by entering Police Station.
    if(screen==="police2"&&!state.flags?.police_intro_complete){
      if(state.characters){
        state.characters.Somchai=false;
        state.characters.Kittisak=false;
      }
    }
  }

  function repairCharacterGrid(){
    const screen=$(".screen.active")?.id||state?.screen||"";
    if(screen==="police2"&&!state.flags?.police_intro_complete){
      $$('[data-story-character="Somchai"],[data-story-character="Kittisak"]').forEach(n=>n.remove());
    }
    if(screen==="forensic2"){
      // DEV jump to Forensic represents completed prior phases.
      state.characters=state.characters||{};
      state.characters.Elena=true;
      state.characters.Somchai=true;
      state.characters.Kittisak=true;
      if(state.medical)state.medical.ratchataMet=false;
      $$('[data-story-character="Ratchata"]').forEach(n=>n.remove());
    }
  }

  function replaceCafeLine(){
    const line=$("#cafeDialogue .line");
    const speaker=$("#cafeDialogue .speaker")?.textContent?.trim();
    if(!line)return;
    const txt=line.textContent.trim();
    if(speaker==="Elena"&&txt==="Only if you ordered the second coffee."){
      line.textContent="Only if you're planning to deny ordering the second coffee.";
    }
    if(speaker==="Benedict"&&txt==="I didn't. Daniel did."){
      line.textContent="I didn't order it. Daniel did.";
    }
  }

  function ensurePoliceLoop(){
    const screen=$(".screen.active")?.id||state?.screen;
    const a=$("#policeAudio");
    if(!a)return;
    if(screen==="police2"){
      a.loop=true;
      if(a.paused&&window.state?.sound!==false){
        a.volume=Math.max(.08,Math.min(.28,Number(state?.music||.33)*.48));
        a.play().catch(()=>{});
      }
    }else stop(a);
  }

  function addPortraitStyle(){
    if($("#lwPortraitRepair"))return;
    const style=document.createElement("style");
    style.id="lwPortraitRepair";
    style.textContent=`
      #policeDialogue .portrait-Somchai,
      #policeDialogue .portrait-Kittisak{
        object-position:center 6% !important;
        transform:scale(1.07);
        transform-origin:center top;
      }
      #policeDialogue .portrait-wrap{
        min-height:148px;
      }
      .forensic-hotspot i,.medical-hotspot i{
        transition:background-color .12s ease,box-shadow .12s ease;
      }`;
    document.head.appendChild(style);
  }

  function finishInspect(phase,id){
    if(!id)return;
    markFound(phase,id);
    playOneShot("evidenceDoneAudio",Number(state?.sfx)||.55);

    // Feed the phase's own private Set by using its Collect handler once,
    // then restore the inspected evidence panel so the user remains in place.
    const collect=$("#collect"+(phase==="forensic"?"Forensic":"Medical")+"Evidence");
    const panel=$("#"+phase+"EvidencePanel");
    const hotspot=$(`[data-${phase}-clue="${id}"]`);
    if(collect&&collect.style.display!=="none"){
      collect.click();
      setTimeout(()=>{
        hotspot?.click();
        setTimeout(()=>{
          const object=$("#"+phase+"EvidenceObject");
          const meta=$("#"+phase+"EvidenceMeta");
          const observation=$("#"+phase+"EvidenceObservation");
          const inspect=$("#inspect"+(phase==="forensic"?"Forensic":"Medical")+"Evidence");
          const collect2=$("#collect"+(phase==="forensic"?"Forensic":"Medical")+"Evidence");
          const close=$("#close"+(phase==="forensic"?"Forensic":"Medical")+"Evidence");
          panel?.classList.add("open");
          panel?.setAttribute("aria-hidden","false");
          object?.classList.add("inspecting");
          meta?.classList.add("show");
          if(observation)observation.style.display="";
          if(inspect)inspect.style.display="none";
          if(collect2)collect2.style.display="none";
          if(close)close.style.display="";
          markFound(phase,id);
        },0);
      },0);
    }
  }

  function onPointerDown(e){
    const dialogue=e.target.closest?.(".dialogue:not(.hidden)");
    if(dialogue)stopEvidence();

    const fh=e.target.closest?.("[data-forensic-clue]");
    if(fh){
      active.forensic=fh.dataset.forensicClue;
      suppressPrematureEvidenceSound();
      return;
    }
    const mh=e.target.closest?.("[data-medical-clue]");
    if(mh){
      active.medical=mh.dataset.medicalClue;
      suppressPrematureEvidenceSound();
      return;
    }
    if(e.target.closest?.("#inspectPoliceEvidence")){
      suppressPrematureEvidenceSound();
      setTimeout(()=>playOneShot("evidenceDoneAudio",Number(state?.sfx)||.55),0);
      return;
    }
    if(e.target.closest?.("#inspectForensicEvidence")){
      const id=active.forensic||state?.forensic?.active;
      suppressPrematureEvidenceSound();
      setTimeout(()=>finishInspect("forensic",id),0);
      return;
    }
    if(e.target.closest?.("#inspectMedicalEvidence")){
      const id=active.medical||state?.medical?.active;
      suppressPrematureEvidenceSound();
      setTimeout(()=>finishInspect("medical",id),0);
      return;
    }
    if(e.target.closest?.('[data-dev-jump="medical2"]')){
      clearPhase("medical");
    }
  }

  function onClick(e){
    if(e.target.closest?.("#collectPoliceEvidence")){
      setTimeout(()=>playOneShot("evidenceDoneAudio",Number(state?.sfx)||.55),0);
    }
    if(e.target.closest?.("#charactersButton")){
      setTimeout(repairCharacterGrid,0);
    }
    if(e.target.closest?.("#reviewForensic")){
      // Keep the button above overlays and ensure it receives the action.
      const panel=$("#forensicEvidencePanel");
      if(panel?.classList.contains("open"))return;
      e.target.style.pointerEvents="auto";
    }
  }

  function repairMedicalMarkers(){
    const screen=$(".screen.active")?.id||state?.screen;
    if(screen!=="medical2")return;
    const p=phaseState("medical");
    M_IDS.forEach(id=>{
      const found=p?.found?.includes(id);
      $(`[data-medical-clue="${id}"]`)?.classList.toggle("found",!!found);
    });
  }

  function repairAfterInteraction(){
    window.setTimeout(()=>{
      replaceCafeLine();
      fixCharacterVisibility();
      repairCharacterGrid();
      ensurePoliceLoop();
      repairMedicalMarkers();
    },0);
  }

  function enterFallback(){
    const splash=$("#splash");
    if(!splash?.classList.contains("active"))return;

    $$(".screen").forEach(s=>s.classList.remove("active"));
    $("#title")?.classList.add("active");
    if(window.state)state.screen="title";

    try{
      const theme=$("#themeAudio");
      const rain=$("#rainAudio");
      if(theme&&window.state?.sound!==false){
        theme.loop=true;
        theme.volume=Number(state?.music)||.33;
        theme.play().catch(()=>{});
      }
      if(rain&&window.state?.sound!==false){
        rain.loop=true;
        rain.volume=(Number(state?.music)||.33)*.48;
        rain.play().catch(()=>{});
      }
    }catch(_){}
  }

  function bind(){
    installAudioSources();
    addPortraitStyle();
    fixCharacterVisibility();

    document.addEventListener("pointerdown",onPointerDown,true);
    document.addEventListener("click",onClick,true);
    document.addEventListener("click",repairAfterInteraction,true);

    $("#enter")?.addEventListener("click",()=>{
      window.setTimeout(enterFallback,80);
    },false);
  }

  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",bind,{once:true});
  else bind();
})();