/* LAST WITNESS — Deterministic UI Click & Medical Hotspot Fix 0.6.2
 * One physical pointerdown = one immediate local click.
 * A single audio voice cancels any previous click, so rapid tapping cannot queue.
 */
(function(){
"use strict";

const $=(selector,root=document)=>root.querySelector(selector);
const $$=(selector,root=document)=>Array.from(root.querySelectorAll(selector));

function gameState(){try{return state;}catch(_){return window.state||null;}}
function soundEnabled(){return gameState()?.sound!==false;}
function sfxLevel(){
 const value=Number(gameState()?.sfx);
 return Number.isFinite(value)?Math.max(0,Math.min(1,value)):0.55;
}
function isDialogueVisible(id){
 const node=$(id);
 return Boolean(node&&!node.classList.contains("hidden")&&getComputedStyle(node).display!=="none");
}
function refreshReviewButtons(){
 const reviewEvidence=$("#reviewEvidence");
 if(reviewEvidence)reviewEvidence.classList.toggle("lw-ready",!isDialogueVisible("#crimeDialogue")&&!reviewEvidence.disabled);
 const reviewApartment=$("#reviewApartment");
 if(reviewApartment)reviewApartment.classList.toggle("lw-ready",!isDialogueVisible("#apartmentDialogue")&&reviewApartment.classList.contains("show"));
 const reviewForensic=$("#reviewForensic");
 if(reviewForensic){
  const complete=$("#forensicPhaseComplete");
  const ready=reviewForensic.classList.contains("show")&&!reviewForensic.hasAttribute("hidden")&&!isDialogueVisible("#forensicDialogue")&&!$("#forensicEvidencePanel")?.classList.contains("open")&&$("#forensicChoice")?.classList.contains("hidden")!==false&&(!complete||getComputedStyle(complete).display==="none");
  reviewForensic.classList.toggle("lw-ready",ready);
 }
}
function safePortraitSource(speaker){
 if(typeof portrait!=="function")return"";
 const attempts={Elena:["neutral","professional","thoughtful","warm","concerned"],Somchai:["neutral","friendly","amused","serious"],Kittisak:["neutral","serious","stern"]}[speaker]||["neutral"];
 for(const emotion of attempts){
  try{const src=portrait(speaker,emotion);if(typeof src==="string"&&src.trim())return src;}catch(_){}
 }
 return"";
}
function repairDialoguePortrait(dialogue){
 if(!dialogue?.classList?.contains("dialogue"))return;
 const speaker=$(".speaker",dialogue)?.textContent?.trim();
 if(!["Elena","Somchai","Kittisak"].includes(speaker))return;
 const wrap=$(".portrait-wrap",dialogue);if(!wrap)return;
 let img=$("img.portrait",wrap);const fallback=safePortraitSource(speaker);
 if(!img&&fallback){
  img=document.createElement("img");img.className=`portrait portrait-${speaker}`;img.alt="";img.src=fallback;wrap.replaceChildren(img);
 }
 if(!img)return;
 img.style.removeProperty("transform");
 img.style.removeProperty("width");
 img.style.removeProperty("height");
 img.style.objectFit="contain";
 img.style.objectPosition="center bottom";
 img.style.maxWidth="100%";
 img.style.maxHeight="100%";
}
function repairAllPortraits(root=document){
 $$(".dialogue",root).forEach(repairDialoguePortrait);
 if(root.matches?.(".dialogue"))repairDialoguePortrait(root);
}
function preventPoliceCompletionCard(){
 const card=$("#policePhaseComplete");
 if(!card||getComputedStyle(card).display==="none")return;
 card.style.display="none";
 if(window.LastWitnessForensic?.start)setTimeout(()=>window.LastWitnessForensic.start(),40);
}
function installHeadphonesRecommendation(){
 const splash=$("#splash");
 if(!splash||$("#headphonesRecommendation"))return;
 const note=document.createElement("div");
 note.id="headphonesRecommendation";note.className="headphones-recommendation";
 note.setAttribute("aria-label","Best experienced with headphones");
 note.innerHTML=`<svg class="headphones-icon" viewBox="0 0 64 64" aria-hidden="true"><path d="M13 34v-4C13 19.5 21.5 11 32 11s19 8.5 19 19v4"/><path d="M13 33h5a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5h-3a4 4 0 0 1-4-4V37a4 4 0 0 1 2-4Z"/><path d="M51 33h-5a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h3a4 4 0 0 0 4-4V37a4 4 0 0 0-2-4Z"/><path d="M41 53c-2.5 2-5.5 3-9 3"/></svg><span>BEST EXPERIENCED WITH HEADPHONES</span>`;
 splash.appendChild(note);
 if(!$("#lwHeadphonesStyle")){
  const style=document.createElement("style");style.id="lwHeadphonesStyle";
  style.textContent=`.headphones-recommendation{position:absolute;z-index:6;left:50%;bottom:calc(17vh + var(--bottom));transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:8px;width:min(82vw,360px);color:#c9b27f;text-align:center;pointer-events:none;opacity:.9}.headphones-icon{width:31px;height:31px;fill:none;stroke:currentColor;stroke-width:2.15;stroke-linecap:round;stroke-linejoin:round;filter:drop-shadow(0 3px 10px rgba(0,0,0,.45))}.headphones-recommendation span{font-size:9px;font-weight:700;letter-spacing:.18em;line-height:1.35;text-transform:uppercase;text-shadow:0 2px 10px #000}@media (max-height:650px){.headphones-recommendation{bottom:calc(15vh + var(--bottom));gap:6px}.headphones-icon{width:27px;height:27px}}`;
  document.head.appendChild(style);
 }
}

const clickPool=[];
let clickPoolIndex=0;

function prepareClickPool(){
 if(clickPool.length)return clickPool;
 const source=$("#clickAudio")?.getAttribute("src")||"assets/audio/b3dccd7733a71a6d.mp3";

 for(let i=0;i<4;i++){
  const audio=new Audio(source);
  audio.preload="auto";
  audio.loop=false;
  audio.volume=0.07;
  audio.load();
  clickPool.push(audio);
 }

 /* Disable only the legacy global click path. The pool above is the sole owner. */
 const legacy=$("#clickAudio");
 if(legacy){
  try{legacy.pause();legacy.currentTime=0;}catch(_){}
  legacy.muted=true;
  legacy.volume=0;
  legacy.play=()=>Promise.resolve();
 }
 return clickPool;
}

function playSemanticUI(kind){
 if(!soundEnabled()||sfxLevel()<=0||!kind)return;

 const pool=prepareClickPool();
 const audio=pool[clickPoolIndex++%pool.length];

 try{
  audio.pause();
  audio.currentTime=0;
  audio.loop=false;
  audio.muted=false;
  audio.playbackRate=1;

  /* Kept deliberately quiet. Confirm is only slightly firmer than navigation. */
  const base=kind==="confirm"?0.085:kind==="back"?0.065:0.07;
  audio.volume=Math.max(0.035,Math.min(0.095,base*sfxLevel()/0.55));

  const result=audio.play();
  if(result?.catch)result.catch(()=>{});
 }catch(_){}
}

function semanticAction(target){
 if(!target?.closest)return null;

 /* These actions have their own feedback or are intentionally silent. */
 if(target.closest(
  '.dialogue,'+
  '[data-apt-clue],[data-forensic-clue],[data-medical-clue],[data-police-clue],'+
  '#apartmentEvidenceObject,#forensicEvidenceObject,#medicalEvidenceObject,#policeEvidenceObject,'+
  '#inspectApartmentEvidence,#inspectForensicEvidence,#inspectMedicalEvidence,#inspectPoliceEvidence,'+
  '#collectApartmentEvidence,#collectForensicEvidence,#collectMedicalEvidence,#collectPoliceEvidence,'+
  '[data-ch3],[id^="ch3"]'
 ))return null;

 if(target.closest(
  '#charactersBack,#backToCrime,#summaryBack,.closeModal,#resume,#closePhoneUI,'+
  '#closeApartmentEvidence,#closeForensicEvidence,#closeMedicalEvidence,#closePoliceEvidence'
 ))return"back";

 if(target.closest(
  '.choice-option,[data-choice],[data-cafe-choice],[data-police-choice],'+
  '[data-forensic-choice],[data-medical-choice],#makeDeduction,#reviewEvidence,'+
  '#reviewApartment,#reviewForensic,#reviewMedical,#continueMedicalExaminer,#continueChapter3'
 ))return"confirm";

 if(target.closest(
  '#enter,#newGame,#continueGame,#loadTitle,.menuButton,.saveButton,.icon,'+
  '#historyButton,#caseButton,#charactersButton,#settingsButton,#loadManual,'+
  '#restart,#titleButton,[data-lang],button.ghost,button.primary'
 ))return"soft";

 return null;
}

function semanticClickOwner(event){
 const kind=semanticAction(event.target);
 if(kind)playSemanticUI(kind);
}

function installClick(){
 prepareClickPool();

 if(window.__lwPointerClickHandler){
  document.removeEventListener("pointerdown",window.__lwPointerClickHandler,true);
  document.removeEventListener("click",window.__lwPointerClickHandler,true);
 }

 window.__lwPointerClickHandler=semanticClickOwner;

 /* Use the actual click event so the sound aligns with the accepted action,
  * rather than firing early on pointerdown. */
 document.addEventListener("click",semanticClickOwner,true);

 const original=window.play;
 window.play=function(name){
  if(name==="click")return;
  return typeof original==="function"?original.apply(this,arguments):undefined;
 };
 window.play.__lwCoreClick=true;

 window.LastWitnessImmediateClick={
  play:playSemanticUI,
  version:"0.6.2"
 };
}

function installMedicalHotspotPalette(){
 if($("#lwMedicalHotspotPalette062"))return;

 const style=document.createElement("style");
 style.id="lwMedicalHotspotPalette062";

 /* Canonical state:
  * yellow = unexplored
  * green  = inspected/found
  * The original stylesheet had these states reversed. */
 style.textContent=`
  .medical-hotspot i{
   background:#d9b56b!important;
   box-shadow:
    0 0 0 8px rgba(217,181,107,.17),
    0 0 24px rgba(217,181,107,.58)!important;
  }
  .medical-hotspot.found i{
   background:#7fc9aa!important;
   box-shadow:
    0 0 0 8px rgba(127,201,170,.18),
    0 0 24px rgba(127,201,170,.68)!important;
  }
 `;
 document.head.appendChild(style);
}

function repairCharacterJournal(){
 const back=$("#charactersBack");
 /* Chapter I installed a legacy onclick renderer. The canonical registry has
  * its own capture handler; keeping both causes the old grid to overwrite it. */
 if(back)back.onclick=null;

 const registry=window.LastWitnessContentRegistry;
 const ratchata=registry?.characters?.ratchata;
 if(ratchata){
  ratchata.name.en="Ratchata (Dr.Singh)";
  ratchata.src="assets/images/ratchata/profile.png";
  registry.renderCharacters?.(true);
 }
}


function unlockStoryCharacter(id,flag){
 const s=gameState();
 const registry=window.LastWitnessContentRegistry;
 if(!s||!registry?.unlockCharacter||!flag)return false;
 s.flags=s.flags||{};
 const marker=`journal_story_${id}_unlocked`;
 const alreadyListed=Array.isArray(s.lwCharactersUnlocked)&&s.lwCharactersUnlocked.includes(id);
 if(s.flags[marker]===true&&alreadyListed)return false;
 const fresh=registry.unlockCharacter(id,{unread:true,source:"story"});
 s.flags[marker]=true;
 try{if(typeof autoSave==="function")autoSave();}catch(_){}
 return fresh;
}
function reconcileStoryCharacters(){
 const s=gameState();if(!s)return;
 s.flags=s.flags||{};

 /* Repair only from completed story beats. Never infer a new-character
  * notification merely because the player entered a later screen. */
 if(s.flags.chapter2_character_choice_made===true){
  unlockStoryCharacter("north",true);
 }
 if(s.flags.cafe_character_choice_made===true){
  unlockStoryCharacter("elena",true);
 }
 if(s.flags.police_character_choice_made===true){
  unlockStoryCharacter("somchai",true);
  unlockStoryCharacter("kittisak",true);
 }
 if(s.medical?.ratchataJournalUnlocked===true){
  unlockStoryCharacter("ratchata",true);
 }
}
function installStoryCharacterGates(){
 reconcileStoryCharacters();
 window.addEventListener("load",()=>setTimeout(reconcileStoryCharacters,0),{once:true});

 document.addEventListener("click",event=>{
  const s=gameState();if(!s)return;
  s.flags=s.flags||{};

  if(event.target.closest?.("#office2 [data-choice]")){
   s.flags.chapter2_character_choice_made=true;
   setTimeout(()=>unlockStoryCharacter("north",true),0);
  }
  if(event.target.closest?.("#cafe2 [data-cafe-choice]")){
   s.flags.cafe_character_choice_made=true;
   setTimeout(()=>unlockStoryCharacter("elena",true),0);
  }
  if(event.target.closest?.("#police2 [data-police-choice]")){
   s.flags.police_character_choice_made=true;
   setTimeout(()=>{
    unlockStoryCharacter("somchai",true);
    unlockStoryCharacter("kittisak",true);
   },0);
  }
 },true);

 window.LastWitnessStoryCharacterGates={
  reconcile:reconcileStoryCharacters,
  version:"0.6.2"
 };
}
function bind(){
 try{const s=gameState();if(s&&!window.state)window.state=s;}catch(_){}
 refreshReviewButtons();
 repairAllPortraits();
 preventPoliceCompletionCard();
 installHeadphonesRecommendation();
 installClick();
 installMedicalHotspotPalette();
 repairCharacterJournal();
 installStoryCharacterGates();
 loadProductionRuntime();

 const bodyObserver=new MutationObserver(mutations=>{
  for(const mutation of mutations){
   mutation.addedNodes.forEach(node=>{if(node.nodeType===1)repairAllPortraits(node);});
  }
  refreshReviewButtons();
  preventPoliceCompletionCard();
 });
 bodyObserver.observe(document.body,{subtree:true,childList:true});

 const card=$("#policePhaseComplete");
 if(card)new MutationObserver(preventPoliceCompletionCard).observe(card,{attributes:true,attributeFilter:["style","class"]});
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",bind,{once:true});else bind();
})();