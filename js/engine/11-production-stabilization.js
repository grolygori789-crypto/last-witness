/* LAST WITNESS — Production Audio & Evidence Runtime 0.6.0
 * Single scene-audio owner, immediate Case File cue, clean Room 1807 score,
 * fresh Medical state and controlled Chapter III puzzle cue.
 */
(function(){
"use strict";
if(window.__lwProductionStabilization060)return;
window.__lwProductionStabilization060=true;

const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const clamp=(v,min=0,max=1)=>Math.max(min,Math.min(max,Number(v)||0));
const APARTMENT_IDS=["apt_mug","apt_documents","apt_board","apt_laptop"];
const FORENSIC_IDS=["sealed_sample","accession_record","audit_trace","batch_record"];
const MEDICAL_IDS=["postmortem","identity_tag","autopsy_report","toxicology_sample"];
const LOOP_IDS=["themeAudio","rainAudio","officeAudio","crimeAudio","room1807Audio","apartmentAudio","morningOfficeAudio","cafeAudio","policeAudio","forensicHumAudio","medicalRefrigeratorAudio","medicalMachineAudio"];
const PAGE_SOURCE="assets/audio/ae0db994456b758a.mp3";
const PUZZLE_SOURCE="assets/audio/puzzle-success.wav?v=057";
const SCANNER_SOURCE="assets/audio/medical-scanner-soft.wav?v=057";
const ROOM_1807_SOURCE="assets/audio/chapter-03/modern-noir.mp3";
const FORENSIC_ROOM_SOURCE="assets/audio/ambience/forensic-soft-room.wav?v=060";
const MEDICAL_ROOM_SOURCE="assets/audio/ambience/medical-soft-room.wav?v=060";
const APARTMENT_LOOP_TRIM=2.45;
let lastScreen="";
let syncQueued=false;
let forensicTransitioning=false;
let inspectionAudio=null,puzzleAudio=null,scannerPool=[],scannerIndex=0;
let currentEvidenceContext=null;

function gameState(){try{return state;}catch(_){return window.state||null;}}
function activeScreen(){const s=gameState();return $(".screen.active")?.id||s?.screen||"";}
function soundOn(){return gameState()?.sound!==false;}
function musicLevel(){return clamp(gameState()?.music??0.33);}
function sfxLevel(){return clamp(gameState()?.sfx??0.55);}
function dialogueOpen(screen=activeScreen()){
 const root=$("#"+screen);if(!root)return false;
 return $$(".dialogue",root).some(box=>!box.classList.contains("hidden")&&getComputedStyle(box).display!=="none");
}
function evidencePanelOpen(screen=activeScreen()){
 if(screen==="apartment2")return $("#apartmentEvidence")?.classList.contains("open");
 if(screen==="police2")return $("#policeEvidencePanel")?.classList.contains("open");
 if(screen==="forensic2")return $("#forensicEvidencePanel")?.classList.contains("open");
 if(screen==="medical2")return $("#medicalEvidencePanel")?.classList.contains("open");
 return false;
}
function stopElement(audio,reset=true){
 if(!audio)return;
 try{audio.pause();if(reset)audio.currentTime=0;}catch(_){}
}
function createAudio(src){const a=new Audio();a.preload="auto";a.src=src;a.load();return a;}
function ensureLoopAudio(id,src){
 let audio=$("#"+id);
 if(!audio){
  audio=document.createElement("audio");audio.id=id;audio.loop=true;audio.preload="auto";audio.src=src;$("#game")?.appendChild(audio);
 }else if(!audio.src.endsWith(src.split("?")[0])){
  audio.pause();audio.src=src;audio.load();
 }
 return audio;
}
function prepareOneShots(){
 if(!inspectionAudio)inspectionAudio=createAudio(PAGE_SOURCE);
 if(!scannerPool.length)scannerPool=Array.from({length:3},()=>createAudio(SCANNER_SOURCE));
 if(!puzzleAudio)puzzleAudio=createAudio(PUZZLE_SOURCE);
}
function stopPuzzleCue(){stopElement(puzzleAudio,true);}
function stopInspectionCue(){stopElement(inspectionAudio,true);}
function stopOneShots(){
 stopInspectionCue();
 scannerPool.forEach(a=>stopElement(a,true));
 stopPuzzleCue();
}
function stopInvestigationLoops(except=new Set()){
 LOOP_IDS.forEach(id=>{if(!except.has(id))stopElement($("#"+id),true);});
}
function playPool(pool,index,volume){
 if(!soundOn()||sfxLevel()<=0||!pool.length)return false;
 const audio=pool[index%pool.length];
 try{
  audio.pause();audio.currentTime=0;audio.loop=false;audio.muted=false;audio.volume=volume;
  const result=audio.play();if(result?.catch)result.catch(()=>{});
  return true;
 }catch(_){return false;}
}
function playInspectionCue(){
 prepareOneShots();
 if(!soundOn()||sfxLevel()<=0||!inspectionAudio)return false;
 try{
  inspectionAudio.pause();
  inspectionAudio.currentTime=0;
  inspectionAudio.loop=false;
  inspectionAudio.muted=false;
  inspectionAudio.volume=clamp(sfxLevel()*0.48,0.16,0.29);
  const result=inspectionAudio.play();if(result?.catch)result.catch(()=>{});
  return true;
 }catch(_){return false;}
}
function playPuzzleCue(){
 prepareOneShots();if(!soundOn()||sfxLevel()<=0)return;
 try{
  puzzleAudio.pause();puzzleAudio.currentTime=0;puzzleAudio.loop=false;puzzleAudio.muted=false;
  puzzleAudio.volume=clamp(sfxLevel()*0.58,0.20,0.34);
  puzzleAudio.play().catch(()=>{});
 }catch(_){}
}
function playSoftScanner(){
 prepareOneShots();
 playPool(scannerPool,scannerIndex++,clamp(sfxLevel()*0.30,0.08,0.18));
}
function suppressLegacyEvidenceAudio(){
 const legacy=$("#evidenceAudio");if(!legacy||legacy.dataset.lwSuppressed056==="1")return;
 legacy.dataset.lwSuppressed056="1";stopElement(legacy,true);legacy.muted=true;legacy.volume=0;
 legacy.play=()=>Promise.resolve();
}
function installSoftScanner(){
 const legacy=$("#medicalBarcodeAudio");if(!legacy||legacy.dataset.lwSoftScanner056==="1")return;
 legacy.dataset.lwSoftScanner056="1";stopElement(legacy,true);legacy.muted=true;legacy.volume=0;
 legacy.play=()=>{playSoftScanner();return Promise.resolve();};
}
function volumeProfile(screen){
 const dialogueDuck=dialogueOpen(screen)?0.82:1;
 const evidenceDuck=evidencePanelOpen(screen)?0.80:1;
 const m=musicLevel(),p={};
 if(screen==="title"){p.themeAudio=m;p.rainAudio=m*0.48;}
 else if(screen==="office"){p.officeAudio=m*0.50*dialogueDuck;p.rainAudio=m*0.14*dialogueDuck;}
 else if(["crime","phone","deduction"].includes(screen)){p.room1807Audio=m*0.46*dialogueDuck*evidenceDuck;p.rainAudio=m*0.08*dialogueDuck;}
 else if(screen==="office2"||screen==="chapter3Office"){p.morningOfficeAudio=m*0.50*dialogueDuck;}
 else if(screen==="apartment2"){p.apartmentAudio=m*0.58*dialogueDuck*evidenceDuck;}
 else if(screen==="cafe2"){p.cafeAudio=m*0.30*dialogueDuck;}
 else if(screen==="police2"){p.policeAudio=m*0.05*dialogueDuck;}
 else if(screen==="forensic2"){p.forensicHumAudio=m*0.045*dialogueDuck*evidenceDuck;}
 else if(screen==="medical2"){p.medicalRefrigeratorAudio=m*0.115*dialogueDuck*evidenceDuck;}
 return p;
}
function installApartmentLoopGuard(audio){
 if(!audio||audio.dataset.lwGapless060==="1")return;
 audio.dataset.lwGapless060="1";audio.loop=false;
 audio.addEventListener("timeupdate",()=>{
  if(activeScreen()!=="apartment2")return;
  const d=Number(audio.duration);
  if(Number.isFinite(d)&&d>APARTMENT_LOOP_TRIM+1&&audio.currentTime>=d-APARTMENT_LOOP_TRIM){
   try{audio.currentTime=.04;if(audio.paused&&soundOn())audio.play().catch(()=>{});}catch(_){}
  }
 });
 audio.addEventListener("ended",()=>{if(activeScreen()==="apartment2"&&soundOn()){try{audio.currentTime=.04;audio.play().catch(()=>{});}catch(_){}}});
}
function startLoop(id,volume){
 const audio=$("#"+id);if(!audio||!soundOn())return;
 try{
  if(id==="apartmentAudio"){installApartmentLoopGuard(audio);audio.loop=false;}else audio.loop=true;
  audio.muted=false;audio.volume=clamp(volume);
  if(id==="policeAudio"&&audio.paused){
   const d=Number(audio.duration);if(Number.isFinite(d)&&d>12)audio.currentTime=12;
  }
  if(audio.paused)audio.play().catch(()=>{});
 }catch(_){}
}
function applySceneAudio(){
 const current=activeScreen();
 if(current!==lastScreen){stopOneShots();lastScreen=current;}
 if(!soundOn()){stopInvestigationLoops();return;}
 const profile=volumeProfile(current),allowed=new Set(Object.keys(profile));
 stopInvestigationLoops(allowed);
 Object.entries(profile).forEach(([id,volume])=>startLoop(id,volume));
 const oldMachine=$("#medicalMachineAudio");
 if(oldMachine){oldMachine.pause();oldMachine.muted=true;oldMachine.volume=0;}
 if(!["chapter2Complete","chapter3Wip","chapter"].includes(current))stopElement($("#chapterAudio"),true);
}
function queueAudioSync(){
 if(syncQueued)return;syncQueued=true;
 requestAnimationFrame(()=>{syncQueued=false;applySceneAudio();});
}
function collectedForContext(context){
 const s=gameState();if(!context)return false;
 if(context.phase==="apartment")return Boolean(s?.found?.has?.(context.id));
 if(context.phase==="forensic")return new Set(s?.forensic?.collected||[]).has(context.id);
 if(context.phase==="medical")return new Set(s?.medical?.collected||[]).has(context.id);
 if(context.phase==="police")return Boolean(s?.flags?.police_evidence_collected);
 return false;
}
function evidenceContextFromTarget(target){
 const hotspot=target.closest?.("[data-apt-clue],[data-forensic-clue],[data-medical-clue],[data-police-clue]");
 if(!hotspot)return null;
 if(hotspot.dataset.aptClue)return{phase:"apartment",id:hotspot.dataset.aptClue};
 if(hotspot.dataset.forensicClue)return{phase:"forensic",id:hotspot.dataset.forensicClue};
 if(hotspot.dataset.medicalClue)return{phase:"medical",id:hotspot.dataset.medicalClue};
 if(hotspot.dataset.policeClue)return{phase:"police",id:hotspot.dataset.policeClue};
 return null;
}
function restoreInspectAffordance(context){
 if(!context)return;
 const collected=collectedForContext(context);
 const map={
  apartment:{panel:"#apartmentEvidence",object:"#apartmentEvidenceObject",meta:"#apartmentEvidenceMeta",inspect:"#inspectApartmentEvidence",collect:"#collectApartmentEvidence",close:"#closeApartmentEvidence"},
  forensic:{panel:"#forensicEvidencePanel",object:"#forensicEvidenceObject",meta:"#forensicEvidenceMeta",inspect:"#inspectForensicEvidence",collect:"#collectForensicEvidence",close:"#closeForensicEvidence"},
  medical:{panel:"#medicalEvidencePanel",object:"#medicalEvidenceObject",meta:"#medicalEvidenceMeta",inspect:"#inspectMedicalEvidence",collect:"#collectMedicalEvidence",close:"#closeMedicalEvidence"},
  police:{panel:"#policeEvidencePanel",object:"#policeEvidenceObject",meta:"#policeEvidenceMeta",inspect:"#inspectPoliceEvidence",collect:"#collectPoliceEvidence",close:"#closePoliceEvidence"}
 }[context.phase];
 if(!map)return;
 const object=$(map.object),meta=$(map.meta),observation=meta?.querySelector?.(".evidence-observation");
 const inspect=$(map.inspect),collect=$(map.collect),close=$(map.close);
 if(collected){
  object?.classList.add("inspecting");meta?.classList.add("show");
  if(observation)observation.style.display="";
  if(inspect)inspect.style.display="none";
  if(collect)collect.style.display="none";
  if(close)close.style.display="";
 }else{
  object?.classList.remove("inspecting");meta?.classList.remove("show");
  if(observation)observation.style.display="none";
  if(inspect)inspect.style.display="";
  if(collect)collect.style.display="none";
  if(close)close.style.display="none";
 }
}
function handleEvidencePointer(event){
 const context=evidenceContextFromTarget(event.target);
 if(context){
  currentEvidenceContext=context;
  const wasCollected=collectedForContext(context);
  if(wasCollected)playInspectionCue();
  setTimeout(()=>restoreInspectAffordance(context),0);
  return;
 }
 const inspectTarget=event.target.closest?.("#inspectApartmentEvidence,#apartmentEvidenceObject,#inspectForensicEvidence,#forensicEvidenceObject,#inspectMedicalEvidence,#medicalEvidenceObject,#inspectPoliceEvidence,#policeEvidenceObject");
 if(inspectTarget){playInspectionCue();return;}
 if(event.target.closest?.("#closeApartmentEvidence,#closeForensicEvidence,#closeMedicalEvidence,#closePoliceEvidence"))stopInspectionCue();
}
function repairMedicalEvidence(event){
 if(event.target.closest?.("[data-medical-clue]")){
  setTimeout(()=>{
   $("#medicalEvidenceMeta")?.classList.remove("show");
   const obs=$("#medicalEvidenceObservation");if(obs)obs.style.display="none";
  },0);
 }
 if(event.target.closest?.("#inspectMedicalEvidence,#medicalEvidenceObject")){
  setTimeout(()=>{
   $("#medicalEvidenceMeta")?.classList.add("show");
   const obs=$("#medicalEvidenceObservation");if(obs)obs.style.display="";
  },0);
 }
 if(event.target.closest?.("#closeMedicalEvidence,#collectMedicalEvidence")){
  setTimeout(()=>$("#medicalEvidenceMeta")?.classList.remove("show"),0);
 }
}
function closeAllEvidencePanels(){
 ["apartmentEvidence","policeEvidencePanel","forensicEvidencePanel","medicalEvidencePanel"].forEach(id=>{const panel=$("#"+id);if(panel){panel.classList.remove("open");panel.setAttribute("aria-hidden","true");}});
}
function clearMedicalHotspots(){
 $$('[data-medical-clue]').forEach(node=>node.classList.remove("found"));
 $("#reviewMedical")?.classList.remove("show");
}
function prepareFreshMedicalPhase(){
 const s=gameState();if(!s)return;
 currentEvidenceContext=null;closeAllEvidencePanels();
 s.medical={started:true,inspected:[],found:[],collected:[],active:null,choice:null,complete:false,ratchataMet:false,ratchataJournalUnlocked:false};
 MEDICAL_IDS.forEach(id=>{try{s.found?.delete?.("medical_"+id);}catch(_){}});
 clearMedicalHotspots();
}
function enterMedicalDirectly(){
 const card=$("#forensicPhaseComplete");
 if(!card||forensicTransitioning)return;
 const visible=card.style.display==="block"||getComputedStyle(card).display!=="none";
 if(!visible)return;
 forensicTransitioning=true;card.style.display="none";card.setAttribute("aria-hidden","true");
 stopElement($("#forensicHumAudio"),true);stopOneShots();prepareFreshMedicalPhase();
 setTimeout(()=>{
  try{
   if(window.LastWitnessChapter2Integration?.enterMedicalExaminer)window.LastWitnessChapter2Integration.enterMedicalExaminer();
   else window.LastWitnessMedicalExaminer?.start?.();
  }finally{setTimeout(()=>{forensicTransitioning=false;},350);}
 },35);
}
function installForensicTransition(){
 const card=$("#forensicPhaseComplete");if(!card)return;
 new MutationObserver(enterMedicalDirectly).observe(card,{attributes:true,attributeFilter:["style","class","aria-hidden"]});
 enterMedicalDirectly();
}
function installPlayBridge(){
 const original=window.play;
 if(typeof original==="function"&&!original.__lwEvidenceBridge057){
  const wrapped=function(name){
   if(name==="page")return;
   return original.apply(this,arguments);
  };
  wrapped.__lwEvidenceBridge057=true;window.play=wrapped;
 }
}
function installRouting(){
 const original=window.show;
 if(typeof original==="function"&&!original.__lwProductionRoute060){
  const wrapped=function(){
   stopOneShots();stopInvestigationLoops();
   try{const c=$("#clickAudio");if(c){c.pause();c.currentTime=0;}}catch(_){}
   const result=original.apply(this,arguments);
   queueAudioSync();window.LastWitnessContentRegistry?.updateVisibility?.();return result;
  };
  wrapped.__lwProductionRoute060=true;window.show=wrapped;
 }
 const originalSet=window.setVolumes;
 window.setVolumes=function(){
  if(typeof originalSet==="function")try{originalSet.apply(this,arguments);}catch(_){}
  queueAudioSync();
 };
 window.ambience=function(){queueAudioSync();};
}
function installObservers(){
 const screenObserver=new MutationObserver(()=>{queueAudioSync();window.LastWitnessContentRegistry?.updateVisibility?.();});
 $$(".screen").forEach(screen=>screenObserver.observe(screen,{attributes:true,attributeFilter:["class"]}));
 const dialogueObserver=new MutationObserver(()=>queueAudioSync());
 $$(".dialogue").forEach(box=>dialogueObserver.observe(box,{attributes:true,attributeFilter:["class"]}));
 ["apartmentEvidence","policeEvidencePanel","forensicEvidencePanel","medicalEvidencePanel"].forEach(id=>{
  const panel=$("#"+id);
  if(panel)new MutationObserver(()=>queueAudioSync()).observe(panel,{attributes:true,attributeFilter:["class","aria-hidden"]});
 });
}
function applyChapterNaming(){
 try{if(window.LANG?.en)LANG.en.chapter_1_name="ROOM 1807";}catch(_){}
 const initial=$("#chapterIntroTitle");
 if(initial&&initial.textContent.trim().toUpperCase()==="HOTEL 1807")initial.textContent="ROOM 1807";
}
function installGapGuard(){
 if($("#lwJournalGapGuard"))return;
 const style=document.createElement("style");style.id="lwJournalGapGuard";
 style.textContent="#charactersButton[hidden],#charactersButton[aria-hidden='true']{display:none!important;margin:0!important;min-height:0!important;height:0!important;padding:0!important;border:0!important;overflow:hidden!important}";
 document.head.appendChild(style);
}
function bindSettings(){
 $("#musicRange")?.addEventListener("input",queueAudioSync,true);
 $("#soundToggle")?.addEventListener("change",queueAudioSync,true);
 document.addEventListener("visibilitychange",()=>{if(!document.hidden)queueAudioSync();});
 document.addEventListener("pointerdown",event=>{
  if(event.target.closest?.("#ch3CloseTimeline"))stopPuzzleCue();
 },true);
}
function bind(){
 ensureLoopAudio("room1807Audio",ROOM_1807_SOURCE);
 ensureLoopAudio("apartmentAudio","assets/audio/victim-apartment-score.mp3?v=060");
 ensureLoopAudio("forensicHumAudio",FORENSIC_ROOM_SOURCE);
 ensureLoopAudio("medicalRefrigeratorAudio",MEDICAL_ROOM_SOURCE);
 prepareOneShots();applyChapterNaming();installGapGuard();suppressLegacyEvidenceAudio();installSoftScanner();
 installPlayBridge();installRouting();installObservers();installForensicTransition();bindSettings();
 document.addEventListener("pointerdown",event=>{
  if(event.target.closest?.("#continueMedicalExaminer"))prepareFreshMedicalPhase();
  handleEvidencePointer(event);
 },true);
 document.addEventListener("click",repairMedicalEvidence,true);
 window.LastWitnessAudioCue={
  playCollection:()=>{},
  playCompletion:()=>{},
  playInspection:playInspectionCue,
  playPuzzleSuccess:playPuzzleCue,
  stopPuzzleSuccess:stopPuzzleCue,
  playSoftScanner,
  stopEvidenceCue:stopOneShots,
  version:"0.6.0"
 };
 window.LastWitnessProductionAudio={refresh:queueAudioSync,apply:applySceneAudio,stopEvidenceCue:stopOneShots,profile:volumeProfile,version:"0.6.0"};
 window.LastWitnessContentRegistry?.updateVisibility?.();queueAudioSync();
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",bind,{once:true});else bind();
})();