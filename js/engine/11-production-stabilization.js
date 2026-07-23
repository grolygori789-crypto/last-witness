/* LAST WITNESS — Chapter I–III Audio, Evidence & Phase Runtime 0.7.2
 * Single scene-audio owner, immediate Case File cue, clean Room 1807 score,
 * fresh Medical state and controlled Chapter III puzzle cue.
 */
(function(){
"use strict";
if(window.__lwProductionStabilization072)return;
window.__lwProductionStabilization072=true;
window.__lwProductionStabilization071=true;
window.__lwProductionStabilization070=true;
window.__lwProductionStabilization069=true;
window.__lwProductionStabilization068=true;
window.__lwProductionStabilization063=true;
window.__lwProductionStabilization061=true;
window.__lwProductionStabilization060=true;
window.__lwProductionStabilization058=true;

const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const clamp=(v,min=0,max=1)=>Math.max(min,Math.min(max,Number(v)||0));
const APARTMENT_IDS=["apt_mug","apt_documents","apt_board","apt_laptop"];
const FORENSIC_IDS=["sealed_sample","accession_record","audit_trace","batch_record"];
const MEDICAL_IDS=["postmortem","identity_tag","autopsy_report","toxicology_sample"];
const ROOM_1807_EVIDENCE_IDS=["blood","laptop","suitcase"];
const LOOP_IDS=["themeAudio","rainAudio","officeAudio","crimeAudio","room1807Audio","apartmentAudio","morningOfficeAudio","cafeAudio","policeAudio","forensicHumAudio","medicalRefrigeratorAudio","medicalMachineAudio"];
const PAGE_SOURCE="assets/audio/ae0db994456b758a.mp3";
const PUZZLE_SOURCE="assets/audio/puzzle-success.wav?v=057";
const SCANNER_SOURCE="assets/audio/medical-scanner-soft.wav?v=057";
const ROOM_1807_WEBM_SOURCE="assets/audio/room-1807/room-1807-after-hours-loop.webm?v=069";
const ROOM_1807_MP3_SOURCE="assets/audio/room-1807/room-1807-after-hours-loop.mp3?v=069";
const FORENSIC_WEBM_SOURCE="assets/audio/forensic/forensic-chain-of-custody-loop.webm?v=070";
const FORENSIC_MP3_SOURCE="assets/audio/forensic/forensic-chain-of-custody-loop.mp3?v=070";
const MEDICAL_WEBM_SOURCE="assets/audio/medical/medical-cold-evidence-loop.webm?v=070";
const MEDICAL_MP3_SOURCE="assets/audio/medical/medical-cold-evidence-loop.mp3?v=070";
const APARTMENT_LOOP_TRIM=2.45;
const MP3_LOOP_TRIM=0.12;
const POLICE_START_SECONDS=12;
const ROOM_1807_SCREENS=new Set(["crime","phone","summary","deduction"]);
const FORENSIC_SCREENS=new Set(["forensic2"]);
const MEDICAL_SCREENS=new Set(["medical2"]);
const CHAPTER_DAY_CARD_MS=2600;
let lastScreen="";
let syncQueued=false;
let forensicTransitioning=false;
let inspectionAudio=null,puzzleAudio=null,scannerPool=[],scannerIndex=0;
let currentEvidenceContext=null;
let roomEvidenceActive=null;
let roomEvidenceInspected=false;

function gameState(){try{return state;}catch(_){return window.state||null;}}
function activeScreen(){const s=gameState();return $(".screen.active")?.id||s?.screen||"";}
function soundOn(){return gameState()?.sound!==false;}
function musicLevel(){return clamp(gameState()?.music??0.33);}
function sfxLevel(){return clamp(gameState()?.sfx??0.55);}
function preferredLoopSource(webm,mp3){
 const probe=document.createElement("audio");
 try{
  const support=probe.canPlayType?.('audio/webm; codecs="opus"')||"";
  if(support==="probably"||support==="maybe")return webm;
 }catch(_){}
 return mp3;
}
function preferredRoom1807Source(){return preferredLoopSource(ROOM_1807_WEBM_SOURCE,ROOM_1807_MP3_SOURCE);}
function dialogueOpen(screen=activeScreen()){
 const root=$("#"+screen);if(!root)return false;
 return $$(".dialogue",root).some(box=>!box.classList.contains("hidden")&&getComputedStyle(box).display!=="none");
}
function evidencePanelOpen(screen=activeScreen()){
 if(ROOM_1807_SCREENS.has(screen))return $("#room1807EvidencePanel")?.classList.contains("open");
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
 const dialogueDuck=dialogueOpen(screen)?0.74:1;
 const evidenceDuck=evidencePanelOpen(screen)?0.78:1;
 const m=musicLevel(),p={};
 if(screen==="title"){p.themeAudio=m;p.rainAudio=m*0.48;}
 else if(screen==="office"){p.officeAudio=m*0.50*dialogueDuck;p.rainAudio=m*0.14*dialogueDuck;}
 else if(ROOM_1807_SCREENS.has(screen)){p.room1807Audio=m*0.42*dialogueDuck*evidenceDuck;p.rainAudio=m*0.06*dialogueDuck;}
 else if(screen==="office2"||screen==="chapter3Office"){p.morningOfficeAudio=m*0.50*dialogueDuck;}
 else if(screen==="apartment2"){p.apartmentAudio=m*0.48*dialogueDuck*evidenceDuck;}
 else if(screen==="cafe2"){p.cafeAudio=m*0.30*dialogueDuck;}
 else if(screen==="police2"){p.policeAudio=m*0.30*dialogueDuck;}
 else if(screen==="forensic2"){p.forensicHumAudio=m*0.60*dialogueDuck*evidenceDuck;}
 else if(screen==="medical2"){p.medicalRefrigeratorAudio=m*0.56*dialogueDuck*evidenceDuck;}
 return p;
}
function installNativeOrTrimmedLoop(audio,key,screens,trim=MP3_LOOP_TRIM){
 if(!audio||audio.dataset[key]==="1")return;
 audio.dataset[key]="1";
 const source=(audio.currentSrc||audio.src||"").split("?")[0].toLowerCase();
 if(source.endsWith(".webm")){
  audio.loop=true;
  audio.dataset.lwLoopMode="native-opus";
  return;
 }
 audio.loop=false;
 audio.dataset.lwLoopMode="trimmed-mp3-fallback";
 const restart=()=>{
  if(!screens.has(activeScreen())||!soundOn())return;
  try{audio.currentTime=.02;if(audio.paused)audio.play().catch(()=>{});}catch(_){}
 };
 audio.addEventListener("timeupdate",()=>{
  const d=Number(audio.duration);
  if(screens.has(activeScreen())&&Number.isFinite(d)&&d>trim+1&&audio.currentTime>=d-trim)restart();
 });
 audio.addEventListener("ended",restart);
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
function startPoliceLoop(audio,volume,sceneChanged){
 if(!audio||!soundOn())return;
 const begin=()=>{
  if(activeScreen()!=="police2"||!soundOn())return;
  try{
   audio.pause();audio.loop=true;audio.currentTime=POLICE_START_SECONDS;
   audio.volume=clamp(volume);audio.muted=false;
   audio.dataset.lwPoliceVisitStarted="1";
   audio.play().catch(()=>{});
  }catch(_){}
 };
 if(sceneChanged||audio.dataset.lwPoliceVisitStarted!=="1"||audio.paused){
  audio.pause();audio.muted=true;
  const d=Number(audio.duration);
  if(audio.readyState>=1&&Number.isFinite(d)&&d>POLICE_START_SECONDS+.5)begin();
  else{
   audio.addEventListener("loadedmetadata",begin,{once:true});
   try{audio.load();}catch(_){}
  }
 }else{
  audio.volume=clamp(volume);audio.muted=false;
 }
}
function startLoop(id,volume,sceneChanged=false){
 const audio=$("#"+id);if(!audio||!soundOn())return;
 try{
  if(id==="policeAudio"){startPoliceLoop(audio,volume,sceneChanged);return;}
  if(id==="room1807Audio")installNativeOrTrimmedLoop(audio,"lwRoomGapless070",ROOM_1807_SCREENS);
  else if(id==="forensicHumAudio")installNativeOrTrimmedLoop(audio,"lwForensicGapless070",FORENSIC_SCREENS);
  else if(id==="medicalRefrigeratorAudio")installNativeOrTrimmedLoop(audio,"lwMedicalGapless070",MEDICAL_SCREENS);
  else if(id==="apartmentAudio"){installApartmentLoopGuard(audio);audio.loop=false;}
  else audio.loop=true;
  audio.muted=false;audio.volume=clamp(volume);
  if(audio.paused)audio.play().catch(()=>{});
 }catch(_){}
}
function applySceneAudio(){
 const current=activeScreen();
 const sceneChanged=current!==lastScreen;
 const previous=lastScreen;
 if(sceneChanged){
  stopOneShots();
  if(previous==="police2"&&current!=="police2")$("#policeAudio")?.removeAttribute("data-lw-police-visit-started");
  lastScreen=current;
 }
 if(!soundOn()){stopInvestigationLoops();return;}
 const profile=volumeProfile(current),allowed=new Set(Object.keys(profile));
 stopInvestigationLoops(allowed);
 Object.entries(profile).forEach(([id,volume])=>startLoop(id,volume,sceneChanged));
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
 if(collected&&context.phase==="forensic"){
  /* Revisited Forensic evidence keeps the deliberate Inspect step, but it can
   * never be added to the Case File twice. */
  object?.classList.remove("inspecting");meta?.classList.remove("show");
  if(observation)observation.style.display="none";
  if(inspect)inspect.style.display="";
  if(collect)collect.style.display="none";
  if(close)close.style.display="none";
 }else if(collected){
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
  setTimeout(()=>restoreInspectAffordance(context),0);
  return;
 }
 const inspectTarget=event.target.closest?.("#inspectApartmentEvidence,#apartmentEvidenceObject,#inspectForensicEvidence,#forensicEvidenceObject,#inspectMedicalEvidence,#medicalEvidenceObject,#inspectPoliceEvidence,#policeEvidenceObject");
 if(inspectTarget){
  if(currentEvidenceContext&&collectedForContext(currentEvidenceContext)){
   if(currentEvidenceContext.phase==="forensic"){
    setTimeout(()=>{
     $("#forensicEvidenceObject")?.classList.add("inspecting");
     $("#forensicEvidenceMeta")?.classList.add("show");
     const obs=$("#forensicEvidenceObservation");if(obs)obs.style.display="";
     const inspect=$("#inspectForensicEvidence"),collect=$("#collectForensicEvidence"),close=$("#closeForensicEvidence");
     if(inspect)inspect.style.display="none";
     if(collect)collect.style.display="none";
     if(close)close.style.display="";
    },0);
   }
   return;
  }
  playInspectionCue();return;
 }
 if(event.target.closest?.("#closeApartmentEvidence,#closeForensicEvidence,#closeMedicalEvidence,#closePoliceEvidence"))stopInspectionCue();
}
function repairForensicRevisit(event){
 if(!event.target.closest?.("#inspectForensicEvidence,#forensicEvidenceObject"))return;
 if(!currentEvidenceContext||currentEvidenceContext.phase!=="forensic"||!collectedForContext(currentEvidenceContext))return;
 setTimeout(()=>{
  $("#forensicEvidenceObject")?.classList.add("inspecting");
  $("#forensicEvidenceMeta")?.classList.add("show");
  const obs=$("#forensicEvidenceObservation");if(obs)obs.style.display="";
  const inspect=$("#inspectForensicEvidence"),collect=$("#collectForensicEvidence"),close=$("#closeForensicEvidence");
  if(inspect)inspect.style.display="none";
  if(collect)collect.style.display="none";
  if(close)close.style.display="";
 },0);
}

const ROOM_1807_EVIDENCE={
 blood:{
  title:{en:"Blood-stained Cloth",th:"ผ้าเปื้อนเลือด"},
  description:{
   en:"A folded hotel cloth carries a transferred blood smear. The surrounding pattern does not align with the body’s final position.",
   th:"ผ้าของโรงแรมที่พับไว้มีคราบเลือดจากการสัมผัสติดอยู่ รูปแบบเลือดโดยรอบไม่สอดคล้องกับตำแหน่งสุดท้ายของร่าง"
  },
  observation:{
   en:"The cloth and the body were moved after death. The room was arranged to support a story that did not happen here.",
   th:"ทั้งผ้าและร่างถูกเคลื่อนย้ายหลังเสียชีวิต ห้องนี้ถูกจัดวางเพื่อรองรับเรื่องราวที่ไม่ได้เกิดขึ้นจริง"
  },
  visual:`<div class="room-evidence-visual room-blood-visual" aria-hidden="true">
   <div class="room-cloth-shadow"></div>
   <div class="room-cloth">
    <span class="room-cloth-fold fold-a"></span><span class="room-cloth-fold fold-b"></span>
    <span class="room-blood-stain stain-a"></span><span class="room-blood-stain stain-b"></span>
   </div>
   <div class="room-evidence-tag"><b>GRANDVIEW HOTEL</b><span>ROOM 1807 · TRANSFER STAIN</span></div>
  </div>`
 },
 laptop:{
  title:{en:"Victim’s Laptop",th:"แล็ปท็อปของผู้ตาย"},
  description:{
   en:"The laptop remains powered, but its recent-file history and activity trail were deliberately cleared without wiping the device.",
   th:"แล็ปท็อปยังเปิดอยู่ แต่ประวัติไฟล์ล่าสุดและร่องรอยการใช้งานถูกลบอย่างจงใจ โดยไม่ได้ล้างข้อมูลทั้งเครื่อง"
  },
  observation:{
   en:"This was selective cleanup, not a crash or factory reset. Someone removed the trail while leaving the machine usable.",
   th:"นี่เป็นการลบร่องรอยแบบเลือกเฉพาะ ไม่ใช่เครื่องขัดข้องหรือการรีเซ็ต มีคนลบเส้นทางการใช้งานออก แต่ยังปล่อยให้เครื่องทำงานได้"
  },
  visual:`<div class="room-evidence-visual room-laptop-visual" aria-hidden="true">
   <div class="room-laptop-screen">
    <div class="room-laptop-bar"><i></i><i></i><i></i><span>RECENT ACTIVITY</span></div>
    <div class="room-laptop-log"><b>FILE HISTORY</b><strong>CLEARED</strong><small>SESSION CLOSED · DEVICE ACTIVE</small></div>
   </div>
   <div class="room-laptop-base"><span></span></div>
  </div>`
 },
 suitcase:{
  title:{en:"Half-packed Suitcase",th:"กระเป๋าเดินทางที่จัดไว้ครึ่งหนึ่ง"},
  description:{
   en:"Travel clothes are packed for a short trip. Valuables remain, while the document sleeve and one inner pocket have been disturbed.",
   th:"เสื้อผ้าสำหรับการเดินทางระยะสั้นถูกจัดไว้ ของมีค่ายังอยู่ครบ แต่ช่องเอกสารและกระเป๋าด้านในช่องหนึ่งถูกรื้อค้น"
  },
  observation:{
   en:"Daniel intended to leave soon. Whoever searched the case was looking for something specific rather than stealing.",
   th:"แดเนียลตั้งใจจะออกเดินทางในเร็วๆ นี้ คนที่ค้นกระเป๋ากำลังหาอะไรบางอย่างโดยเฉพาะ ไม่ได้ต้องการขโมยทรัพย์สิน"
  },
  visual:`<div class="room-evidence-visual room-suitcase-visual" aria-hidden="true">
   <div class="room-suitcase-handle"></div>
   <div class="room-suitcase-shell">
    <div class="room-suitcase-lid"><span class="room-document-sleeve">DOCUMENTS</span></div>
    <div class="room-suitcase-base">
     <span class="room-shirt shirt-a"></span><span class="room-shirt shirt-b"></span>
     <span class="room-suitcase-pocket"></span>
    </div>
    <i class="room-suitcase-lock lock-a"></i><i class="room-suitcase-lock lock-b"></i>
   </div>
  </div>`
 }
};

function roomEvidenceLanguage(){return gameState()?.language==="th"||document.documentElement.lang==="th"?"th":"en";}
function roomEvidenceCopy(){
 const th=roomEvidenceLanguage()==="th";
 return th?{
  kicker:"ตรวจสอบหลักฐาน",stamp:"หลักฐานในคดี",hint:"แตะหลักฐานเพื่อตรวจสอบ",
  inspect:"ตรวจสอบ",collect:"เพิ่มในแฟ้มคดี",close:"ปิด"
 }:{
  kicker:"Evidence Inspection",stamp:"Case Evidence",hint:"Tap evidence to inspect",
  inspect:"Inspect",collect:"Add to Case File",close:"Close"
 };
}
function roomEvidenceCollected(id){
 try{return Boolean(gameState()?.found?.has?.(id));}catch(_){return false;}
}
function roomEvidenceDialogue(id){
 const map={
  blood:[
   {speaker:"North",emotion:"analyzing",key:"d_blood_1"},
   {speaker:"Benedict",emotion:"smirk",key:"d_blood_2"},
   {speaker:"North",emotion:"serious",key:"d_blood_3"}
  ],
  laptop:[
   {speaker:"Benedict",emotion:"thinking",key:"d_laptop_1"},
   {speaker:"North",emotion:"analyzing",key:"d_laptop_2"},
   {speaker:"Benedict",emotion:"smirk",key:"d_laptop_3"},
   {speaker:"North",emotion:"dry",key:"d_laptop_4"}
  ],
  suitcase:[
   {speaker:"North",emotion:"analyzing",key:"d_suitcase_1"},
   {speaker:"Benedict",emotion:"smile",key:"d_suitcase_2"},
   {speaker:"North",emotion:"eyeroll",key:"d_suitcase_3"}
  ]
 };
 return map[id]||[];
}
function installRoom1807Evidence(){
 if(!$("#lwRoom1807EvidenceStyle")){
  const style=document.createElement("style");
  style.id="lwRoom1807EvidenceStyle";
  style.textContent=`
   #room1807EvidencePanel{position:absolute;inset:0;z-index:92;display:none;place-items:center;padding:calc(72px + var(--top)) 14px calc(20px + var(--bottom));background:rgba(2,3,6,.72);backdrop-filter:blur(5px)}
   #room1807EvidencePanel.open{display:grid}
   #room1807EvidencePanel .evidence-card{width:min(100%,470px);max-height:calc(100svh - 100px);overflow:auto}
   #room1807EvidenceObject{min-height:245px;display:grid;place-items:center;cursor:pointer}
   #room1807EvidencePanel .evidence-actions{position:relative;z-index:4}
   .room-evidence-visual{position:relative;width:min(100%,330px);height:235px;margin:auto;filter:drop-shadow(0 22px 24px rgba(0,0,0,.48))}
   .room-blood-visual{display:grid;place-items:center}
   .room-cloth-shadow{position:absolute;width:78%;height:28%;bottom:20px;border-radius:50%;background:rgba(0,0,0,.42);filter:blur(14px)}
   .room-cloth{position:relative;width:76%;height:68%;border-radius:7px 15px 9px 12px;background:linear-gradient(145deg,#ded8cb,#aaa397 64%,#817c73);transform:rotate(-7deg);overflow:hidden;border:1px solid rgba(255,255,255,.28)}
   .room-cloth:before{content:"";position:absolute;inset:0;background:repeating-linear-gradient(90deg,rgba(255,255,255,.08) 0 2px,rgba(0,0,0,.035) 2px 4px);mix-blend-mode:overlay}
   .room-cloth-fold{position:absolute;background:rgba(62,57,52,.2);filter:blur(1px)}
   .room-cloth-fold.fold-a{left:8%;right:10%;top:38%;height:3px;transform:rotate(4deg)}
   .room-cloth-fold.fold-b{top:8%;bottom:9%;left:57%;width:4px;transform:rotate(-3deg)}
   .room-blood-stain{position:absolute;background:radial-gradient(ellipse at center,#702b2a 0,#5b2022 58%,rgba(74,20,22,.28) 73%,transparent 76%);opacity:.88;filter:blur(.3px)}
   .room-blood-stain.stain-a{width:39%;height:30%;right:8%;bottom:13%;transform:rotate(17deg)}
   .room-blood-stain.stain-b{width:18%;height:12%;right:35%;bottom:30%;transform:rotate(-13deg);opacity:.55}
   .room-evidence-tag{position:absolute;left:8%;bottom:1%;display:grid;gap:2px;padding:7px 9px;border-left:2px solid #bda067;background:rgba(10,11,14,.82);font-family:monospace;font-size:9px;letter-spacing:.06em}
   .room-evidence-tag span{color:#c8bda9}
   .room-laptop-visual{display:flex;flex-direction:column;align-items:center;justify-content:center}
   .room-laptop-screen{position:relative;width:78%;height:61%;padding:9px;border:7px solid #26292d;border-bottom-width:10px;border-radius:8px 8px 4px 4px;background:linear-gradient(160deg,#111b22,#071015);box-shadow:inset 0 0 24px rgba(89,158,174,.12)}
   .room-laptop-bar{height:22px;display:flex;align-items:center;gap:5px;padding:0 7px;border-bottom:1px solid rgba(177,215,220,.18);font-family:monospace;font-size:8px;color:#a6c3c5}
   .room-laptop-bar i{width:5px;height:5px;border-radius:50%;background:#6c7479}.room-laptop-bar span{margin-left:auto}
   .room-laptop-log{height:calc(100% - 22px);display:grid;place-items:center;align-content:center;gap:7px;text-align:center;font-family:monospace}
   .room-laptop-log b{font-size:10px;color:#8fa2a4;letter-spacing:.16em}.room-laptop-log strong{font-size:21px;color:#bf6f66;letter-spacing:.11em}.room-laptop-log small{font-size:8px;color:#718286}
   .room-laptop-base{position:relative;width:92%;height:28px;border-radius:2px 2px 14px 14px;background:linear-gradient(#55595d,#25282b);transform:perspective(120px) rotateX(42deg);transform-origin:top}
   .room-laptop-base span{position:absolute;left:38%;right:38%;top:4px;height:9px;border-radius:2px;background:#303337;border:1px solid #686b6e}
   .room-suitcase-visual{display:grid;place-items:center}
   .room-suitcase-handle{position:absolute;top:8px;width:34%;height:30px;border:8px solid #41382f;border-bottom:0;border-radius:12px 12px 0 0}
   .room-suitcase-shell{position:relative;width:78%;height:72%;margin-top:24px;border:7px solid #4e4033;border-radius:13px;background:#2c251f;overflow:hidden;transform:rotate(2deg)}
   .room-suitcase-lid,.room-suitcase-base{position:absolute;top:0;bottom:0;width:50%;padding:11px}
   .room-suitcase-lid{left:0;background:linear-gradient(145deg,#655442,#3f342a);border-right:2px solid #261f1a}
   .room-suitcase-base{right:0;background:linear-gradient(145deg,#75604b,#43372c)}
   .room-document-sleeve{display:block;margin:5px 0;padding:11px 4px;border:1px solid rgba(255,255,255,.22);background:#c7bda9;color:#40382f;font-family:monospace;font-size:8px;text-align:center;transform:rotate(-5deg)}
   .room-shirt{position:absolute;display:block;border-radius:5px;background:repeating-linear-gradient(0deg,#617080 0 8px,#566474 8px 16px)}
   .room-shirt.shirt-a{left:10%;right:12%;top:15%;height:34%;transform:rotate(4deg)}
   .room-shirt.shirt-b{left:16%;right:8%;bottom:12%;height:27%;background:repeating-linear-gradient(90deg,#8d7e6d 0 7px,#7d6f60 7px 14px);transform:rotate(-4deg)}
   .room-suitcase-pocket{position:absolute;left:13%;right:11%;bottom:9%;height:25%;border:2px dashed rgba(255,255,255,.28);transform:rotate(3deg)}
   .room-suitcase-lock{position:absolute;top:46%;width:9px;height:19px;border-radius:2px;background:#b0925c;border:1px solid #443822;z-index:3}.room-suitcase-lock.lock-a{left:46%}.room-suitcase-lock.lock-b{right:46%}
   @media(max-height:700px){#room1807EvidenceObject{min-height:205px}.room-evidence-visual{height:195px}}
  `;
  document.head.appendChild(style);
 }

 if(!$("#room1807EvidencePanel")){
  const panel=document.createElement("div");
  panel.id="room1807EvidencePanel";
  panel.className="evidence-panel";
  panel.setAttribute("aria-hidden","true");
  panel.innerHTML=`<div class="evidence-card">
   <div class="eyebrow" id="room1807EvidenceKicker"></div>
   <h3 id="room1807EvidenceTitle"></h3>
   <div class="evidence-stage">
    <div class="evidence-stamp" id="room1807EvidenceStamp"></div>
    <div id="room1807EvidenceObject" class="evidence-object"></div>
    <div id="room1807EvidenceHint" class="evidence-zoom-hint"></div>
   </div>
   <div id="room1807EvidenceMeta" class="evidence-meta">
    <p id="room1807EvidenceDescription"></p>
    <div id="room1807EvidenceObservation" class="evidence-observation"></div>
   </div>
   <div class="evidence-actions">
    <button id="inspectRoom1807Evidence" class="ghost" type="button"></button>
    <button id="collectRoom1807Evidence" class="primary" type="button"></button>
    <button id="closeRoom1807Evidence" class="ghost" type="button"></button>
   </div>
  </div>`;
  $("#game")?.appendChild(panel);
 }
 updateRoom1807EvidenceLanguage();
}
function updateRoom1807EvidenceLanguage(){
 const c=roomEvidenceCopy();
 if($("#room1807EvidenceKicker"))$("#room1807EvidenceKicker").textContent=c.kicker;
 if($("#room1807EvidenceStamp"))$("#room1807EvidenceStamp").textContent=c.stamp;
 if($("#room1807EvidenceHint"))$("#room1807EvidenceHint").textContent=c.hint;
 if($("#inspectRoom1807Evidence"))$("#inspectRoom1807Evidence").textContent=c.inspect;
 if($("#collectRoom1807Evidence"))$("#collectRoom1807Evidence").textContent=c.collect;
 if($("#closeRoom1807Evidence"))$("#closeRoom1807Evidence").textContent=c.close;
 if(roomEvidenceActive){
  const item=ROOM_1807_EVIDENCE[roomEvidenceActive],lang=roomEvidenceLanguage();
  if(item){
   $("#room1807EvidenceTitle").textContent=item.title[lang]||item.title.en;
   $("#room1807EvidenceDescription").textContent=item.description[lang]||item.description.en;
   $("#room1807EvidenceObservation").textContent=item.observation[lang]||item.observation.en;
  }
 }
}
function openRoom1807Evidence(id){
 const item=ROOM_1807_EVIDENCE[id],panel=$("#room1807EvidencePanel");
 if(!item||!panel)return;
 roomEvidenceActive=id;roomEvidenceInspected=false;
 const lang=roomEvidenceLanguage();
 $("#room1807EvidenceTitle").textContent=item.title[lang]||item.title.en;
 $("#room1807EvidenceDescription").textContent=item.description[lang]||item.description.en;
 $("#room1807EvidenceObservation").textContent=item.observation[lang]||item.observation.en;
 $("#room1807EvidenceObject").innerHTML=item.visual;
 $("#room1807EvidenceObject").classList.remove("inspecting");
 $("#room1807EvidenceMeta").classList.remove("show");
 $("#room1807EvidenceObservation").style.display="none";
 $("#inspectRoom1807Evidence").style.display="";
 $("#collectRoom1807Evidence").style.display="none";
 $("#closeRoom1807Evidence").style.display="none";
 panel.classList.add("open");panel.setAttribute("aria-hidden","false");
 updateRoom1807EvidenceLanguage();queueAudioSync();
}
function inspectRoom1807Evidence(){
 if(!roomEvidenceActive||roomEvidenceInspected)return;
 roomEvidenceInspected=true;
 $("#room1807EvidenceObject")?.classList.add("inspecting");
 $("#room1807EvidenceMeta")?.classList.add("show");
 const observation=$("#room1807EvidenceObservation");if(observation)observation.style.display="";
 const collected=roomEvidenceCollected(roomEvidenceActive);
 if($("#inspectRoom1807Evidence"))$("#inspectRoom1807Evidence").style.display="none";
 if($("#collectRoom1807Evidence"))$("#collectRoom1807Evidence").style.display=collected?"none":"";
 if($("#closeRoom1807Evidence"))$("#closeRoom1807Evidence").style.display="";
 if(!collected)playInspectionCue();
 queueAudioSync();
}
function closeRoom1807Evidence(){
 const panel=$("#room1807EvidencePanel");if(!panel)return;
 panel.classList.remove("open");panel.setAttribute("aria-hidden","true");
 $("#room1807EvidenceObject")?.classList.remove("inspecting");
 $("#room1807EvidenceMeta")?.classList.remove("show");
 stopInspectionCue();roomEvidenceActive=null;roomEvidenceInspected=false;queueAudioSync();
}
function collectRoom1807Evidence(){
 const id=roomEvidenceActive;if(!id||roomEvidenceCollected(id))return;
 const lines=roomEvidenceDialogue(id);
 try{
  if(typeof addClue==="function")addClue(id);
  else{
   const s=gameState();s?.found?.add?.(id);
   try{if(typeof refreshCrime==="function")refreshCrime();}catch(_){}
   try{if(typeof updateProgress==="function")updateProgress();}catch(_){}
   try{if(typeof autoSave==="function")autoSave();}catch(_){}
  }
 }catch(_){}
 closeRoom1807Evidence();
 if(lines.length&&typeof runDialogue==="function"){
  setTimeout(()=>runDialogue($("#crimeDialogue"),lines,()=>{try{refreshCrime();}catch(_){}}),90);
 }
}
function handleRoom1807EvidenceClick(event){
 const hotspot=event.target.closest?.('#crime [data-clue="blood"],#crime [data-clue="laptop"],#crime [data-clue="suitcase"]');
 if(hotspot){
  event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();
  openRoom1807Evidence(hotspot.dataset.clue);return;
 }
 if(event.target.closest?.("#inspectRoom1807Evidence,#room1807EvidenceObject")){
  event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();
  inspectRoom1807Evidence();return;
 }
 if(event.target.closest?.("#collectRoom1807Evidence")){
  event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();
  collectRoom1807Evidence();return;
 }
 if(event.target.closest?.("#closeRoom1807Evidence")){
  event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();
  closeRoom1807Evidence();return;
 }
 const panel=$("#room1807EvidencePanel");
 if(panel&&event.target===panel){
  event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();
  closeRoom1807Evidence();
 }
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
 ["room1807EvidencePanel","apartmentEvidence","policeEvidencePanel","forensicEvidencePanel","medicalEvidencePanel"].forEach(id=>{const panel=$("#"+id);if(panel){panel.classList.remove("open");panel.setAttribute("aria-hidden","true");}});
}
function clearMedicalHotspots(){
 $$('[data-medical-clue]').forEach(node=>node.classList.remove("found"));
 $("#reviewMedical")?.classList.remove("show");
}
function prepareFreshMedicalPhase(){
 const s=gameState();if(!s)return;
 currentEvidenceContext=null;closeAllEvidencePanels();
 s.medical={started:true,inspected:[],found:[],collected:[],active:null,choice:null,complete:false,ratchataMet:false,ratchataJournalUnlocked:false};
 window.LastWitnessMedicalExaminer?.resetFreshState?.();
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
 if(typeof original==="function"&&!original.__lwProductionRoute070){
  const wrapped=function(){
   const target=arguments[0],from=activeScreen();
   const sameRoom1807Zone=ROOM_1807_SCREENS.has(from)&&ROOM_1807_SCREENS.has(target);
   stopOneShots();if(!sameRoom1807Zone)stopInvestigationLoops();closeAllEvidencePanels();
   try{const c=$("#clickAudio");if(c){c.pause();c.currentTime=0;}}catch(_){}
   const result=original.apply(this,arguments);
   queueAudioSync();window.LastWitnessContentRegistry?.updateVisibility?.();return result;
  };
  wrapped.__lwProductionRoute070=true;window.show=wrapped;
 }
 const originalSet=window.setVolumes;
 window.setVolumes=function(){
  if(typeof originalSet==="function")try{originalSet.apply(this,arguments);}catch(_){}
  queueAudioSync();
 };
 /* Runtime 11 is the only scene-audio owner after it loads. This prevents
  * legacy ambience() from starting Police at 4.6 seconds before the
  * production owner can seek to the stable 12-second loop body. */
 window.ambience=function(){queueAudioSync();};
}
function installObservers(){
 const screenObserver=new MutationObserver(()=>{queueAudioSync();window.LastWitnessContentRegistry?.updateVisibility?.();});
 $$(".screen").forEach(screen=>screenObserver.observe(screen,{attributes:true,attributeFilter:["class"]}));
 const dialogueObserver=new MutationObserver(()=>queueAudioSync());
 $$(".dialogue").forEach(box=>dialogueObserver.observe(box,{attributes:true,attributeFilter:["class"]}));
 ["room1807EvidencePanel","apartmentEvidence","policeEvidencePanel","forensicEvidencePanel","medicalEvidencePanel"].forEach(id=>{
  const panel=$("#"+id);
  if(panel)new MutationObserver(()=>queueAudioSync()).observe(panel,{attributes:true,attributeFilter:["class","aria-hidden"]});
 });
}
function applyRoom1807EvidenceCopy(){
 try{
  if(window.LANG?.en){
   LANG.en.clue_blood_title="Blood-stained Cloth";
   LANG.en.clue_blood_desc="Transferred blood and the body’s final position confirm that Room 1807 was staged.";
   LANG.en.clue_laptop_title="Victim’s Laptop";
   LANG.en.clue_laptop_desc="Recent-file history and the activity trail were deliberately cleared.";
   LANG.en.clue_suitcase_title="Half-packed Suitcase";
   LANG.en.clue_suitcase_desc="Daniel intended to leave soon, and someone searched the document compartments.";
  }
  if(window.LANG?.th){
   LANG.th.clue_blood_title="ผ้าเปื้อนเลือด";
   LANG.th.clue_blood_desc="คราบเลือดจากการสัมผัสและตำแหน่งร่างยืนยันว่าห้อง 1807 ถูกจัดฉาก";
   LANG.th.clue_laptop_title="แล็ปท็อปของผู้ตาย";
   LANG.th.clue_laptop_desc="ประวัติไฟล์ล่าสุดและร่องรอยการใช้งานถูกลบอย่างจงใจ";
   LANG.th.clue_suitcase_title="กระเป๋าเดินทางที่จัดไว้ครึ่งหนึ่ง";
   LANG.th.clue_suitcase_desc="แดเนียลตั้งใจจะออกเดินทาง และมีคนรื้อค้นช่องเก็บเอกสาร";
  }
 }catch(_){}
}
function dayCardCopy(chapter){
 const th=gameState()?.language==="th"||document.documentElement.lang==="th";
 if(chapter===1)return th
  ?{day:"วันที่ 1",time:"ช่วงค่ำ",place:"กรุงเทพฯ · สำนักงานนักสืบ"}
  :{day:"DAY 1",time:"LATE EVENING",place:"BANGKOK · DETECTIVE OFFICE"};
 if(chapter===2)return th
  ?{day:"วันที่ 2",time:"ตอนเช้า",place:"กรุงเทพฯ · สำนักงานนักสืบ"}
  :{day:"DAY 2",time:"MORNING",place:"BANGKOK · DETECTIVE OFFICE"};
 return null;
}
function installChapterDayCard(){
 if(!$("#lwChapterDayStyle")){
  const style=document.createElement("style");style.id="lwChapterDayStyle";
  style.textContent=`
   #chapterDayCard{z-index:81;background:#050608}
   #chapterDayCard .chapter-intro-card{max-width:460px}
   #chapterDayTime{margin:12px 0 6px;color:#f2ede3;font:500 clamp(31px,9vw,46px) Georgia,serif;letter-spacing:.06em}
   #chapterDayPlace{margin-top:18px;color:#d4c5ae;font-size:12px;line-height:1.5;letter-spacing:.13em;text-transform:uppercase}
   html[lang="th"] #chapterDayTime{letter-spacing:.02em}
   html[lang="th"] #chapterDayPlace{letter-spacing:.035em;text-transform:none}
  `;
  document.head.appendChild(style);
 }
 if(!$("#chapterDayCard")){
  const card=document.createElement("section");
  card.id="chapterDayCard";card.className="chapter-intro";card.setAttribute("aria-hidden","true");
  card.innerHTML=`<div class="chapter-intro-card"><div class="chapter-intro-brand">LAST WITNESS</div><div id="chapterDayLabel" class="chapter-intro-number"></div><div id="chapterDayTime"></div><div class="chapter-intro-rule"></div><div id="chapterDayPlace"></div></div>`;
  $("#game")?.appendChild(card);
 }
 const original=window.showChapterIntro;
 if(typeof original!=="function"||original.__lwDayCard070)return;
 const wrapped=function(chapter,onComplete){
  if(chapter!==1&&chapter!==2)return original.call(this,chapter,onComplete);
  return original.call(this,chapter,()=>{
   const copy=dayCardCopy(chapter),card=$("#chapterDayCard");
   if(!copy||!card){onComplete?.();return;}
   $("#chapterDayLabel").textContent=copy.day;
   $("#chapterDayTime").textContent=copy.time;
   $("#chapterDayPlace").textContent=copy.place;
   card.setAttribute("aria-hidden","false");card.classList.add("instant","show");
   void card.offsetWidth;card.classList.remove("instant");
   setTimeout(()=>{
    onComplete?.();
    requestAnimationFrame(()=>{card.classList.remove("show");card.setAttribute("aria-hidden","true");});
   },CHAPTER_DAY_CARD_MS);
  });
 };
 wrapped.__lwDayCard070=true;window.showChapterIntro=wrapped;
}
function applySettingsCopy(){
 try{
  if(typeof LANG!=="undefined"&&LANG.en)LANG.en.master_sound="Sound";
  const label=$('[data-i18n="master_sound"]');
  const th=gameState()?.language==="th"||document.documentElement.lang==="th";
  if(label&&!th)label.textContent="Sound";
 }catch(_){}
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
 const roomSource=preferredRoom1807Source();
 const forensicSource=preferredLoopSource(FORENSIC_WEBM_SOURCE,FORENSIC_MP3_SOURCE);
 const medicalSource=preferredLoopSource(MEDICAL_WEBM_SOURCE,MEDICAL_MP3_SOURCE);
 const roomAudio=ensureLoopAudio("room1807Audio",roomSource);
 if(roomAudio)roomAudio.dataset.lwRoomFormat=roomSource.includes(".webm")?"opus":"mp3";
 ensureLoopAudio("apartmentAudio","assets/audio/victim-apartment-score.mp3?v=060");
 ensureLoopAudio("forensicHumAudio",forensicSource);
 ensureLoopAudio("medicalRefrigeratorAudio",medicalSource);
 stopElement($("#policeAudio"),true);
 prepareOneShots();applySettingsCopy();applyChapterNaming();installChapterDayCard();applyRoom1807EvidenceCopy();installGapGuard();installRoom1807Evidence();suppressLegacyEvidenceAudio();installSoftScanner();
 installPlayBridge();installRouting();installObservers();bindSettings();
 document.addEventListener("click",handleRoom1807EvidenceClick,true);
 document.addEventListener("pointerdown",event=>{
  if(event.target.closest?.("#continueMedicalExaminer"))prepareFreshMedicalPhase();
  handleEvidencePointer(event);
 },true);
 document.addEventListener("click",event=>{
  if(event.target.closest?.("[data-lang]"))setTimeout(updateRoom1807EvidenceLanguage,0);
 },true);
 document.addEventListener("click",repairForensicRevisit,true);
 document.addEventListener("click",repairMedicalEvidence,true);
 window.LastWitnessAudioCue={
  playCollection:()=>{},
  playCompletion:()=>{},
  playInspection:playInspectionCue,
  playPuzzleSuccess:playPuzzleCue,
  stopPuzzleSuccess:stopPuzzleCue,
  playSoftScanner,
  stopEvidenceCue:stopOneShots,
  version:"0.7.2"
 };
 window.LastWitnessRoom1807Evidence={
  open:openRoom1807Evidence,inspect:inspectRoom1807Evidence,collect:collectRoom1807Evidence,
  close:closeRoom1807Evidence,updateLanguage:updateRoom1807EvidenceLanguage,version:"0.7.2"
 };
 window.LastWitnessProductionAudio={refresh:queueAudioSync,apply:applySceneAudio,stopEvidenceCue:stopOneShots,profile:volumeProfile,version:"0.7.2"};
 window.LastWitnessContentRegistry?.updateVisibility?.();queueAudioSync();
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",bind,{once:true});else bind();
})();