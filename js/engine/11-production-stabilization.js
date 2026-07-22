/* LAST WITNESS — Production Audio & Evidence Runtime 0.5.4
 * One scene-audio lifecycle, one evidence cue per collection, direct
 * Forensic→Medical transition, soft medical scanner and dedicated puzzle cue.
 */
(function(){
"use strict";
if(window.__lwProductionStabilization054)return;
window.__lwProductionStabilization054=true;

const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const clamp=(v,min=0,max=1)=>Math.max(min,Math.min(max,Number(v)||0));
const APARTMENT_IDS=["apt_mug","apt_documents","apt_board","apt_laptop"];
const FORENSIC_IDS=["sealed_sample","accession_record","audit_trace","batch_record"];
const MEDICAL_IDS=["postmortem","identity_tag","autopsy_report","toxicology_sample"];
const LOOP_IDS=["themeAudio","rainAudio","officeAudio","crimeAudio","morningOfficeAudio","cafeAudio","policeAudio","forensicHumAudio","medicalRefrigeratorAudio","medicalMachineAudio"];
const CUE_SOURCES={
 collection:"assets/audio/evidence-confirm.wav?v=054",
 completion:"assets/audio/evidence-complete.wav?v=054",
 puzzle:"assets/audio/puzzle-success.wav?v=054"
};
let lastScreen="";
let syncQueued=false;
let cueSerial=0;
let lastCollectionAt=0;
let forensicTransitioning=false;

function gameState(){try{return state;}catch(_){return window.state||null;}}
function activeScreen(){const s=gameState();return $(".screen.active")?.id||s?.screen||"";}
function soundOn(){return gameState()?.sound!==false;}
function musicLevel(){return clamp(gameState()?.music??0.33);}
function sfxLevel(){return clamp(gameState()?.sfx??0.55);}
function dialogueOpen(screen=activeScreen()){
 const root=$("#"+screen);if(!root)return false;
 return $$(".dialogue",root).some(box=>!box.classList.contains("hidden")&&getComputedStyle(box).display!=="none");
}
function stopElement(audio,reset=true){if(!audio)return;try{audio.pause();if(reset)audio.currentTime=0;}catch(_){}}
function stopInvestigationLoops(except=new Set()){LOOP_IDS.forEach(id=>{if(!except.has(id))stopElement($("#"+id),true);});}

function ensureCueElement(kind){
 const id={collection:"lwEvidenceCollectionAudio",completion:"lwEvidenceCompletionAudio",puzzle:"lwPuzzleSuccessAudio"}[kind];
 if(!id)return null;
 let audio=$("#"+id);
 if(!audio){audio=document.createElement("audio");audio.id=id;audio.preload="auto";audio.src=CUE_SOURCES[kind];document.body.appendChild(audio);}
 return audio;
}
function stopAllCues(){cueSerial++;["collection","completion","puzzle"].forEach(kind=>stopElement(ensureCueElement(kind),true));}
function cueVolume(kind){
 const s=sfxLevel();
 if(kind==="completion")return clamp(s*0.28,0.09,0.18);
 if(kind==="puzzle")return clamp(s*0.25,0.08,0.16);
 return clamp(s*0.24,0.075,0.155);
}
function playCue(kind){
 if(!soundOn()||sfxLevel()<=0)return;
 stopAllCues();
 const serial=cueSerial;
 const audio=ensureCueElement(kind);if(!audio)return;
 try{audio.currentTime=0;audio.loop=false;audio.muted=false;audio.volume=cueVolume(kind);const result=audio.play();if(result?.catch)result.catch(()=>{});audio.onended=()=>{if(serial===cueSerial)audio.currentTime=0;};}catch(_){}
}

function suppressLegacyEvidenceAudio(){
 const legacy=$("#evidenceAudio");if(!legacy||legacy.dataset.lwSuppressed==="1")return;
 legacy.dataset.lwSuppressed="1";stopElement(legacy,true);legacy.muted=true;legacy.volume=0;
 /* Old phase modules still call evidenceAudio.play(). Keeping the element but
  * making that call inert removes the second onset without breaking their flow. */
 legacy.play=()=>Promise.resolve();
}

function volumeProfile(screen){
 const duck=dialogueOpen(screen)?0.84:1,m=musicLevel(),p={};
 if(screen==="title"){p.themeAudio=m;p.rainAudio=m*0.48;}
 else if(screen==="office"){p.officeAudio=m*0.50*duck;p.rainAudio=m*0.14*duck;}
 else if(["crime","phone","deduction"].includes(screen)){p.crimeAudio=m*0.48*duck;}
 else if(screen==="office2"||screen==="chapter3Office"){p.morningOfficeAudio=m*0.50*duck;}
 else if(screen==="apartment2"){p.crimeAudio=m*0.42*duck;}
 else if(screen==="cafe2"){p.cafeAudio=m*0.36*duck;}
 else if(screen==="police2"){p.policeAudio=m*0.055*duck;}
 else if(screen==="forensic2"){p.forensicHumAudio=m*0.24*duck;}
 else if(screen==="medical2"){p.medicalRefrigeratorAudio=m*0.36*duck;}
 return p;
}
function startLoop(id,volume){
 const audio=$("#"+id);if(!audio||!soundOn())return;
 try{audio.loop=true;audio.muted=false;audio.volume=clamp(volume);if(id==="policeAudio"&&audio.paused){const d=Number(audio.duration);if(Number.isFinite(d)&&d>12)audio.currentTime=12;}if(audio.paused)audio.play().catch(()=>{});}catch(_){}
}
function applySceneAudio(screen=activeScreen()){
 const current=screen||activeScreen();
 if(current!==lastScreen){stopAllCues();lastScreen=current;}
 if(!soundOn()){stopInvestigationLoops();return;}
 const profile=volumeProfile(current),allowed=new Set(Object.keys(profile));
 stopInvestigationLoops(allowed);Object.entries(profile).forEach(([id,volume])=>startLoop(id,volume));
 const oldMachine=$("#medicalMachineAudio");if(oldMachine){oldMachine.pause();oldMachine.muted=true;oldMachine.volume=0;}
 if(!["chapter2Complete","chapter3Wip","chapter"].includes(current))stopElement($("#chapterAudio"),true);
}
function queueAudioSync(screen){if(syncQueued)return;syncQueued=true;requestAnimationFrame(()=>{syncQueued=false;applySceneAudio(screen||activeScreen());});}

function phaseCount(phase){
 const s=gameState();
 if(phase==="apartment")return APARTMENT_IDS.filter(id=>s?.found?.has?.(id)).length;
 if(phase==="forensic")return new Set(s?.forensic?.collected||[]).size;
 if(phase==="medical")return new Set(s?.medical?.collected||[]).size;
 if(phase==="police")return s?.flags?.police_evidence_collected?1:0;
 return 0;
}
function phaseTotal(phase){return phase==="police"?1:4;}
function phaseForCollect(button){
 if(button?.id==="collectApartmentEvidence")return"apartment";
 if(button?.id==="collectForensicEvidence")return"forensic";
 if(button?.id==="collectMedicalEvidence")return"medical";
 if(button?.id==="collectPoliceEvidence")return"police";
 return"";
}
function interceptCollection(event){
 const button=event.target.closest?.("#collectApartmentEvidence,#collectForensicEvidence,#collectMedicalEvidence,#collectPoliceEvidence");
 if(!button)return;
 const now=performance.now();if(now-lastCollectionAt<220)return;lastCollectionAt=now;
 const phase=phaseForCollect(button),before=phaseCount(phase);
 setTimeout(()=>{const after=phaseCount(phase);if(after>before)playCue(after>=phaseTotal(phase)?"completion":"collection");},55);
}

function repairMedicalEvidence(event){
 if(event.target.closest?.("[data-medical-clue]"))setTimeout(()=>{$("#medicalEvidenceMeta")?.classList.remove("show");const obs=$("#medicalEvidenceObservation");if(obs)obs.style.display="none";},0);
 if(event.target.closest?.("#inspectMedicalEvidence,#medicalEvidenceObject"))setTimeout(()=>{$("#medicalEvidenceMeta")?.classList.add("show");const obs=$("#medicalEvidenceObservation");if(obs)obs.style.display="";},0);
 if(event.target.closest?.("#closeMedicalEvidence,#collectMedicalEvidence"))setTimeout(()=>$("#medicalEvidenceMeta")?.classList.remove("show"),0);
}
function capMedicalScanner(){
 const scanner=$("#medicalBarcodeAudio");if(!scanner||scanner.dataset.lwSoftScanner==="1")return;
 scanner.dataset.lwSoftScanner="1";const nativePlay=scanner.play.bind(scanner);
 scanner.play=function(){this.muted=false;this.volume=clamp(sfxLevel()*0.12,0.045,0.08);return nativePlay();};
}

function enterMedicalDirectly(){
 const card=$("#forensicPhaseComplete");
 if(!card||forensicTransitioning)return;
 const visible=card.style.display==="block"||getComputedStyle(card).display!=="none";
 if(!visible)return;
 forensicTransitioning=true;card.style.display="none";card.setAttribute("aria-hidden","true");
 stopElement($("#forensicHumAudio"),true);stopAllCues();
 setTimeout(()=>{
  try{
   if(window.LastWitnessChapter2Integration?.enterMedicalExaminer)window.LastWitnessChapter2Integration.enterMedicalExaminer();
   else window.LastWitnessMedicalExaminer?.start?.();
  }finally{setTimeout(()=>{forensicTransitioning=false;},350);}
 },45);
}
function installForensicTransition(){
 const card=$("#forensicPhaseComplete");if(!card)return;
 new MutationObserver(enterMedicalDirectly).observe(card,{attributes:true,attributeFilter:["style","class","aria-hidden"]});
 enterMedicalDirectly();
}

function installRouting(){
 const original=window.show;
 if(typeof original==="function"&&!original.__lwProductionRoute){const wrapped=function(screen){stopAllCues();const result=original.apply(this,arguments);queueAudioSync(screen);window.LastWitnessContentRegistry?.updateVisibility?.();return result;};wrapped.__lwProductionRoute=true;window.show=wrapped;}
 const originalSet=window.setVolumes;
 window.setVolumes=function(){if(typeof originalSet==="function")try{originalSet.apply(this,arguments);}catch(_){}queueAudioSync();};
 window.ambience=function(screen){applySceneAudio(screen);};
}
function installObservers(){
 const screenObserver=new MutationObserver(records=>{if(records.some(r=>r.target.classList?.contains("active")))queueAudioSync();window.LastWitnessContentRegistry?.updateVisibility?.();});
 $$(".screen").forEach(screen=>screenObserver.observe(screen,{attributes:true,attributeFilter:["class"]}));
 const dialogueObserver=new MutationObserver(()=>queueAudioSync());
 $$(".dialogue").forEach(box=>dialogueObserver.observe(box,{attributes:true,attributeFilter:["class"]}));
}
function applyChapterNaming(){try{if(window.LANG?.en)LANG.en.chapter_1_name="ROOM 1807";}catch(_){}const initial=$("#chapterIntroTitle");if(initial&&initial.textContent.trim().toUpperCase()==="HOTEL 1807")initial.textContent="ROOM 1807";}
function installGapGuard(){if($("#lwJournalGapGuard"))return;const style=document.createElement("style");style.id="lwJournalGapGuard";style.textContent="#charactersButton[hidden],#charactersButton[aria-hidden='true']{display:none!important;margin:0!important;min-height:0!important;height:0!important;padding:0!important;border:0!important;overflow:hidden!important}";document.head.appendChild(style);}
function bindSettings(){$("#musicRange")?.addEventListener("input",()=>queueAudioSync(),true);$("#soundToggle")?.addEventListener("change",()=>queueAudioSync(),true);document.addEventListener("visibilitychange",()=>{if(!document.hidden)queueAudioSync();});}
function bind(){
 applyChapterNaming();installGapGuard();suppressLegacyEvidenceAudio();capMedicalScanner();installRouting();installObservers();installForensicTransition();bindSettings();
 document.addEventListener("click",interceptCollection,true);document.addEventListener("click",repairMedicalEvidence,true);
 ["collection","completion","puzzle"].forEach(ensureCueElement);
 window.LastWitnessAudioCue={playCollection:()=>playCue("collection"),playCompletion:()=>playCue("completion"),playPuzzleSuccess:()=>playCue("puzzle"),stopEvidenceCue:stopAllCues,version:"0.5.4"};
 window.LastWitnessProductionAudio={refresh:()=>queueAudioSync(),apply:applySceneAudio,stopEvidenceCue:stopAllCues,profile:volumeProfile,version:"0.5.4"};
 window.LastWitnessContentRegistry?.updateVisibility?.();queueAudioSync();
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",bind,{once:true});else bind();
})();
