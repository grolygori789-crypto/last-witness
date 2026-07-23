/* LAST WITNESS — Embedded WAV UI, Character Affordance & Runtime Loader 0.7.2
 * One physical pointerdown = one immediate embedded-WAV click.
 * No network decode, delayed promise queue or legacy MP3 click owner.
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

const UI_CLICK_WAV="data:audio/wav;base64,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EP8F/xP/Ev8n/0D/Yf+C/6n/zP/3/yUAUwB/AJ4AwADcAOkA8AD2AO8A7ADSAL4AogCPAGcAQQAdAPv/5//F/6f/j/+H/3n/b/97/3//hP+Q/5f/pP+//8//2//u//v//f8KAAoADgARABIADAACAAUA/P/u/+n/7P/e/+D/6P/r/+r/9f/8/xAAGQAgADAANgBKAFAAUQBaAFsATwBOAEcAPgArABwADAD3/+n/2//M/73/uP+0/6z/sP+x/7b/xf/P/+L/7/8HABMAJwA3AEAARgBUAFgAVABQAEgAPAAqABgABwDt/9v/wv+1/57/kv+G/37/ef+E/4L/jf+h/7P/yv/k//b/FAAwAEEAXQBvAIAAjwCTAJsAlACUAIkAfgBpAFYAQAAqABYAAADq/9b/xv+1/6b/of+d/5z/mv+f/6P/sf+3/8T/1f/e/+f/8f/8/wUACQAQAA4ADwANAA0ACQAFAAMA/v/6//v/+//7//3//v8CAAoAFAAbACIAJgAuADgAPQBAAD0APgA6ADsAMAApAB0AFQAEAPj/7P/g/9T/yP/A/7r/uP+4/7X/uv/C/8n/0v/g/+n/+P8DABIAIAApADEANAA5ADgAOgA1ADAAJQAbABEAAgD2/+r/4P/R/8v/xv++/77/vf/C/8r/z//b/+r/9P8CABEAIgAwADsARABOAFMAUwBWAFMATQBGADsAMwAiABgABwD7/+//4f/W/83/w/+9/73/uf+7/7//xP/L/9D/2P/g/+v/8f/7////BgANABAAEwAUABIAEgAPAAwADAAHAAYABAACAAIABQADAAYACQAPAA8AFgAZACAAIgAmACcAKAAoACQAIwAeABoAEgAJAAEA9//v/+b/3v/W/9D/yv/H/8b/xf/I/8r/z//X/9//5//z//z/BAAPABYAIAAlACsALQAuAC8AKwAnACMAGwATAAwABQD7//P/7v/l/+H/3//d/97/3v/h/+b/7P/y//r/AAAIABEAGQAeACUAKQApACsAKwApACUAHwAZABEACwACAPr/8//q/+X/3v/b/9j/1f/V/9b/2P/c/+D/5P/p//D/9f/8/wIABQALAA0AEQASABIAEwATABEADwAMAAoACAAHAAUAAgADAAMAAwADAAQABwAIAA0ADwARABIAFAAUABUAFAATABIADwAJAAUAAAD5//P/7//o/+P/4P/b/9n/1//X/9f/2v/e/+L/5//u//T/+v8BAAkAEAAWABsAIAAjACUAJgAkACMAIQAcABkAEwAMAAYAAAD7//b/8f/t/+z/6f/p/+r/6//u//D/9P/4//z/AgAFAAoADgARABIAEwAUABQAEwAQAA0ACQAGAAEA/P/4//T/8P/t/+r/6f/n/+j/6f/q/+z/7//z//b/+v/+/wIABQAIAAsADQAPABEAEAAQABAADgAMAAoACAAGAAQAAwAAAP/////+/////////wAAAgAEAAUABwAIAAkACQAKAAoACQAIAAYAAwAAAP3/+f/1//P/7//s/+r/6P/n/+b/5v/o/+r/7f/v//P/+P/8/wEABgAKAA8AEwAWABgAGwAbABwAGwAZABcAFAARAA0ACAAEAAAA/P/5//X/8v/x/+//7//v//D/8f/z//X/+P/6//3/AAADAAUABwAJAAkACgAKAAgABwAGAAQAAgD///3/+//5//f/9v/1//T/9P/0//X/9//4//r//f///wEAAwAGAAgACQALAAwADAAMAAwACwAKAAgABgAFAAMAAQAAAP7//f/8//v/+//7//z//P/9//7///8BAAIAAwAEAAUABAAFAAQABAADAAEAAAD+//z/+v/4//b/9P/z//L/8v/x//L/8//0//f/+f/7//7/AQAEAAcACgAMAA8AEQASABIAEwATABIAEAAOAAwACQAHAAQAAQD+//v/+f/3//X/9P/z//P/8//z//T/9v/3//n/+//9//7/AAACAAQABAAFAAUABgAFAAUABAADAAIAAAD///7//f/8//v/+//7//v/+//8//3//v8AAAEAAgAEAAUABgAHAAcACAAIAAgABwAHAAYABQADAAIAAQD//w==";
let uiClickAudio=null;
let lastUIClickStamp=-Infinity;

const uiClickStats={
 attempted:0,
 started:0,
 skippedNotReady:0,
 errors:0,
 lastKind:null,
 lastReadyState:0,
 lastEventType:null
};

function phoneIsActive(){
 const phone=$("#phone");
 const phoneUI=$("#phoneUI");
 return Boolean(
  phone?.classList.contains("active")||
  phoneUI?.classList.contains("open")||
  !$("#phoneSheet")?.classList.contains("hidden")
 );
}

function stopMediaElement(audio){
 if(!audio)return;
 try{
  audio.pause();
  audio.currentTime=0;
 }catch(_){}
}

function prepareUIClickAudio(){
 if(uiClickAudio)return uiClickAudio;
 const audio=document.createElement("audio");
 audio.id="lwUiClickAudio";
 audio.preload="auto";
 audio.playsInline=true;
 audio.loop=false;
 audio.src=UI_CLICK_WAV;
 audio.setAttribute("aria-hidden","true");
 audio.style.display="none";
 audio.addEventListener("canplaythrough",()=>{uiClickStats.lastReadyState=audio.readyState;},{once:true});
 audio.addEventListener("playing",()=>{uiClickStats.started+=1;});
 audio.addEventListener("error",()=>{uiClickStats.errors+=1;});
 document.body.appendChild(audio);
 try{audio.load();}catch(_){}
 uiClickAudio=audio;
 return audio;
}

function clickVolume(kind){
 const scalar=kind==="confirm"?0.145:kind==="back"?0.105:0.12;
 return Math.max(0.055,Math.min(0.17,scalar*(sfxLevel()/0.55)));
}

function playSemanticUI(kind,eventType="pointerdown"){
 if(!soundEnabled()||sfxLevel()<=0||!kind)return false;
 const audio=prepareUIClickAudio();
 uiClickStats.attempted+=1;
 uiClickStats.lastKind=kind;
 uiClickStats.lastEventType=eventType;
 uiClickStats.lastReadyState=audio.readyState;

 /* Never ask HTMLAudio to wait for data. Waiting is exactly what created
  * late clicks after the phone had already closed. The embedded WAV normally
  * reaches HAVE_CURRENT_DATA before the first user tap. */
 if(audio.readyState<HTMLMediaElement.HAVE_CURRENT_DATA){
  uiClickStats.skippedNotReady+=1;
  return false;
 }

 try{
  audio.pause();
  audio.currentTime=0;
  audio.loop=false;
  audio.muted=false;
  audio.volume=clickVolume(kind);
  const result=audio.play();
  if(result?.catch)result.catch(()=>{uiClickStats.errors+=1;});
  return true;
 }catch(_){
  uiClickStats.errors+=1;
  return false;
 }
}

function semanticAction(target){
 if(!target?.closest)return null;

 /* High-frequency dialogue taps and evidence-specific controls stay silent.
  * General UI, Room 1807 hotspots and phone controls retain tactile feedback. */
 if(target.closest(
  '.dialogue,'+
  '[data-apt-clue],[data-forensic-clue],[data-medical-clue],[data-police-clue],'+
  '#room1807EvidenceObject,#apartmentEvidenceObject,#forensicEvidenceObject,#medicalEvidenceObject,#policeEvidenceObject,'+
  '#inspectRoom1807Evidence,#inspectApartmentEvidence,#inspectForensicEvidence,#inspectMedicalEvidence,#inspectPoliceEvidence,'+
  '#collectRoom1807Evidence,#collectApartmentEvidence,#collectForensicEvidence,#collectMedicalEvidence,#collectPoliceEvidence,'+
  '[data-ch3],[id^="ch3"]'
 ))return null;

 if(target.closest(
  '#charactersBack,#backToCrime,#summaryBack,.closeModal,#resume,#closePhoneUI,#closeSheet,'+
  '#closeRoom1807Evidence,#closeApartmentEvidence,#closeForensicEvidence,#closeMedicalEvidence,#closePoliceEvidence'
 ))return"back";

 if(target.closest(
  '.choice-option,[data-choice],[data-cafe-choice],[data-police-choice],'+
  '[data-forensic-choice],[data-medical-choice],#makeDeduction,#reviewEvidence,'+
  '#reviewApartment,#reviewForensic,#reviewMedical,#continueMedicalExaminer,#continueChapter3'
 ))return"confirm";

 if(target.closest(
  '#enter,#newGame,#continueGame,#loadTitle,#phoneTap,.phone-card,[data-clue],'+
  '.menuButton,.saveButton,.icon,#historyButton,#caseButton,#charactersButton,'+
  '#settingsButton,#loadManual,#restart,#titleButton,[data-lang],button.ghost,button.primary'
 ))return"soft";

 return null;
}

function stopLegacyPhoneTransients(){
 ["pageAudio","evidenceAudio","clickAudio"].forEach(id=>stopMediaElement($("#"+id)));
 try{
  if(typeof AUDIO!=="undefined"){
   [AUDIO.page,AUDIO.evidence,AUDIO.click].forEach(stopMediaElement);
  }
 }catch(_){}
 try{window.LastWitnessAudioCue?.stopEvidenceCue?.();}catch(_){}
}

function guardPhoneTransientElement(audio){
 if(!audio||audio.dataset.lwPhoneGuard064==="1")return;
 audio.dataset.lwPhoneGuard064="1";
 const nativePlay=audio.play.bind(audio);
 audio.play=function(){
  if(phoneIsActive()){
   stopMediaElement(audio);
   return Promise.resolve();
  }
  return nativePlay();
 };
}

function installPhoneTransientGuards(){
 guardPhoneTransientElement($("#pageAudio"));
 guardPhoneTransientElement($("#evidenceAudio"));
}

function semanticPointerOwner(event){
 const target=event.target;
 if(target.closest?.("#phoneTap,.phone-card,#closeSheet,#closePhoneUI,#backToCrime")){
  stopLegacyPhoneTransients();
 }
 const kind=semanticAction(target);
 if(!kind)return;

 /* A few Android builds may promote one physical touch more than once.
  * Ignore only an exact duplicate timestamp, never a legitimate rapid tap. */
 if(event.timeStamp===lastUIClickStamp)return;
 lastUIClickStamp=event.timeStamp;
 playSemanticUI(kind,event.type);
}

function installClick(){
 prepareUIClickAudio();
 installPhoneTransientGuards();

 if(window.__lwPointerClickHandler){
  document.removeEventListener("pointerdown",window.__lwPointerClickHandler,true);
  document.removeEventListener("click",window.__lwPointerClickHandler,true);
 }
 if(window.__lwUIAudioPrimer){
  document.removeEventListener("pointerdown",window.__lwUIAudioPrimer,true);
 }

 window.__lwUIAudioPrimer=null;
 window.__lwPointerClickHandler=semanticPointerOwner;
 document.addEventListener("pointerdown",semanticPointerOwner,true);

 /* Disable every legacy route to the old MP3 click. The embedded WAV above is
  * the sole click owner, so no second click can appear later. */
 const legacy=$("#clickAudio");
 if(legacy){
  stopMediaElement(legacy);
  legacy.muted=true;
  legacy.volume=0;
  legacy.play=()=>Promise.resolve();
 }

 const original=window.play;
 window.play=function(name){
  if(name==="click")return;
  if(name==="page"&&phoneIsActive()){
   stopLegacyPhoneTransients();
   return;
  }
  return typeof original==="function"?original.apply(this,arguments):undefined;
 };
 window.play.__lwCoreClick=true;

 document.addEventListener("click",event=>{
  if(event.target.closest?.("#phoneTap,.phone-card,#closeSheet,#closePhoneUI,#backToCrime")){
   stopLegacyPhoneTransients();
   setTimeout(stopLegacyPhoneTransients,0);
  }
 },true);

 window.LastWitnessImmediateClick={
  play:kind=>playSemanticUI(kind,"manual"),
  stopPhone:stopLegacyPhoneTransients,
  stats:uiClickStats,
  version:"0.7.2"
 };
}

function loadProductionRuntime(){
 if(window.LastWitnessProductionAudio||window.__lwProductionStabilization063)return;
 let script=document.getElementById("lwProductionStabilizationScript");
 if(script)return;
 script=document.createElement("script");
 script.id="lwProductionStabilizationScript";
 script.src="js/engine/11-production-stabilization.js?v=072";
 script.async=false;
 script.addEventListener("load",()=>{script.dataset.loaded="1";},{once:true});
 document.body.appendChild(script);
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

function installCharacterCardAffordance(){
 if($("#lwCharacterCardAffordance069"))return;
 const style=document.createElement("style");
 style.id="lwCharacterCardAffordance069";
 style.textContent=`
  .character-card{position:relative;padding-bottom:31px!important;}
  .character-card::after{
   content:"TAP FOR DETAILS";
   position:absolute;left:10px;right:10px;bottom:9px;
   padding-top:6px;border-top:1px solid rgba(221,181,109,.18);
   color:#bfa778;font-size:8px;font-weight:750;letter-spacing:.10em;
   text-align:center;text-transform:uppercase;line-height:1.2;
  }
  html[lang="th"] .character-card::after{content:"แตะเพื่อดูรายละเอียด";letter-spacing:.025em;text-transform:none;font-size:9px;}
 `;
 document.head.appendChild(style);
}
function enhanceCharacterCardLabels(root=document){
 const cards=[];
 if(root.matches?.(".character-card"))cards.push(root);
 root.querySelectorAll?.(".character-card").forEach(card=>cards.push(card));
 const hint=document.documentElement.lang==="th"?"แตะเพื่อดูรายละเอียด":"Tap for details";
 cards.forEach(card=>{
  const name=card.querySelector(".character-name")?.textContent?.trim()||"Character";
  card.title=hint;card.setAttribute("aria-label",`${name}. ${hint}`);
 });
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
  version:"0.7.2"
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
 installCharacterCardAffordance();
 enhanceCharacterCardLabels();
 repairCharacterJournal();
 installStoryCharacterGates();
 loadProductionRuntime();

 const bodyObserver=new MutationObserver(mutations=>{
  for(const mutation of mutations){
   mutation.addedNodes.forEach(node=>{if(node.nodeType===1){repairAllPortraits(node);enhanceCharacterCardLabels(node);}});
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