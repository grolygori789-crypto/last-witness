/* LAST WITNESS — Stability Repair 0.5.4
 * Static, authoritative UI click, headphones recommendation and lightweight
 * portrait/review repair. No polling and no competing click engines.
 */
(function(){
"use strict";
if(window.__lwStabilityRepair054)return;
window.__lwStabilityRepair054=true;

const $=(selector,root=document)=>root.querySelector(selector);
const $$=(selector,root=document)=>Array.from(root.querySelectorAll(selector));
let lastClickAt=-Infinity;
let clickStopTimer=0;

function gameState(){try{return state;}catch(_){return window.state||null;}}
function isDialogueVisible(id){const node=$(id);return Boolean(node&&!node.classList.contains("hidden")&&getComputedStyle(node).display!=="none");}
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
 for(const emotion of attempts){try{const src=portrait(speaker,emotion);if(typeof src==="string"&&src.trim())return src;}catch(_){}}
 return"";
}
function repairDialoguePortrait(dialogue){
 if(!dialogue?.classList?.contains("dialogue"))return;
 const speaker=$(".speaker",dialogue)?.textContent?.trim();
 if(!["Elena","Somchai","Kittisak"].includes(speaker))return;
 const wrap=$(".portrait-wrap",dialogue);if(!wrap)return;
 let img=$("img.portrait",wrap);const fallback=safePortraitSource(speaker);
 if(!img&&fallback){img=document.createElement("img");img.className=`portrait portrait-${speaker}`;img.alt="";img.src=fallback;wrap.replaceChildren(img);}
 if(!img)return;
 img.style.removeProperty("transform");img.style.removeProperty("width");img.style.removeProperty("height");img.style.objectFit="contain";img.style.objectPosition="center bottom";img.style.maxWidth="100%";img.style.maxHeight="100%";
}
function repairAllPortraits(root=document){$$('.dialogue',root).forEach(repairDialoguePortrait);if(root.matches?.('.dialogue'))repairDialoguePortrait(root);}
function preventPoliceCompletionCard(){
 const card=$("#policePhaseComplete");if(!card||getComputedStyle(card).display==="none")return;
 card.style.display="none";
 if(window.LastWitnessForensic?.start)setTimeout(()=>window.LastWitnessForensic.start(),40);
}

function installHeadphonesRecommendation(){
 const splash=$("#splash");
 if(!splash||$("#headphonesRecommendation"))return;
 const note=document.createElement("div");
 note.id="headphonesRecommendation";note.className="headphones-recommendation";note.setAttribute("aria-label","Best experienced with headphones");
 note.innerHTML=`<svg class="headphones-icon" viewBox="0 0 64 64" aria-hidden="true"><path d="M13 34v-4C13 19.5 21.5 11 32 11s19 8.5 19 19v4"/><path d="M13 33h5a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5h-3a4 4 0 0 1-4-4V37a4 4 0 0 1 2-4Z"/><path d="M51 33h-5a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h3a4 4 0 0 0 4-4V37a4 4 0 0 0-2-4Z"/><path d="M41 53c-2.5 2-5.5 3-9 3"/></svg><span>BEST EXPERIENCED WITH HEADPHONES</span>`;
 splash.appendChild(note);
 if(!$("#lwHeadphonesStyle")){
  const style=document.createElement("style");style.id="lwHeadphonesStyle";
  style.textContent=`.headphones-recommendation{position:absolute;z-index:6;left:50%;bottom:calc(17vh + var(--bottom));transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:8px;width:min(82vw,360px);color:#c9b27f;text-align:center;pointer-events:none;opacity:.9}.headphones-icon{width:31px;height:31px;fill:none;stroke:currentColor;stroke-width:2.15;stroke-linecap:round;stroke-linejoin:round;filter:drop-shadow(0 3px 10px rgba(0,0,0,.45))}.headphones-recommendation span{font-size:9px;font-weight:700;letter-spacing:.18em;line-height:1.35;text-transform:uppercase;text-shadow:0 2px 10px #000}@media (max-height:650px){.headphones-recommendation{bottom:calc(15vh + var(--bottom));gap:6px}.headphones-icon{width:27px;height:27px}}`;
  document.head.appendChild(style);
 }
}

function setAudioSource(id,src){
 const audio=$("#"+id);if(!audio)return;
 const absolute=new URL(src,document.baseURI).href;
 if(audio.src!==absolute){audio.pause();audio.src=src;audio.preload="auto";audio.load();}
}
function installReplacementAudio(){
 /* Use the original recorded mouse click shipped with the game. The previous
  * embedded synthetic WAV sounded like a metronome/tick and is intentionally removed. */
 setAudioSource("clickAudio","assets/audio/b3dccd7733a71a6d.mp3?v=054");
 setAudioSource("crimeAudio","assets/audio/room-1807-ambience.mp3?v=054");
 setAudioSource("forensicHumAudio","assets/audio/forensic-lab-ambience.mp3?v=054");
 setAudioSource("medicalRefrigeratorAudio","assets/audio/medical-examiner-ambience.mp3?v=054");
 const machine=$("#medicalMachineAudio");
 if(machine){machine.pause();machine.muted=true;machine.volume=0;}
}
function actionable(event){return event.target.closest?.('#enter,#newGame,#continueGame,#loadTitle,button:not(:disabled),.dialogue:not(.hidden),[role="button"]');}
function sfxLevel(){const s=gameState();const value=Number(s?.sfx);return Number.isFinite(value)?Math.max(0,Math.min(1,value)):0.55;}
function soundEnabled(){const s=gameState();return s?.sound!==false;}
function playImmediateClick(force=false){
 if(!soundEnabled()||sfxLevel()<=0)return;
 const now=performance.now();if(!force&&now-lastClickAt<62)return;lastClickAt=now;
 const audio=$("#clickAudio");if(!audio)return;
 clearTimeout(clickStopTimer);
 try{
  audio.pause();
  /* The first 35 ms of the original MP3 is encoder/silence padding. Skipping it
   * keeps the response immediate while preserving the real mouse mechanism. */
  audio.currentTime=0.035;audio.loop=false;audio.muted=false;
  audio.volume=Math.max(0.09,Math.min(0.17,sfxLevel()*0.25));
  const result=audio.play();if(result?.catch)result.catch(()=>{});
  clickStopTimer=setTimeout(()=>{try{audio.pause();audio.currentTime=0.035;}catch(_){}},180);
 }catch(_){}
}
function installClick(){
 if(window.__lwCoreClickInstalled)return;
 window.__lwCoreClickInstalled=true;
 document.addEventListener("pointerdown",event=>{if(actionable(event))playImmediateClick();},true);
 document.addEventListener("keydown",event=>{if((event.key==="Enter"||event.key===" ")&&actionable(event))playImmediateClick();},true);
 const original=window.play;
 window.play=function(name){
  if(name==="click"){if(performance.now()-lastClickAt>=90)playImmediateClick(true);return;}
  return typeof original==="function"?original.apply(this,arguments):undefined;
 };
 window.play.__lwCoreClick=true;
}
function bind(){
 try{const s=gameState();if(s&&!window.state)window.state=s;}catch(_){}
 installReplacementAudio();refreshReviewButtons();repairAllPortraits();preventPoliceCompletionCard();installHeadphonesRecommendation();installClick();
 const bodyObserver=new MutationObserver(mutations=>{for(const mutation of mutations){mutation.addedNodes.forEach(node=>{if(node.nodeType===1)repairAllPortraits(node);});}refreshReviewButtons();preventPoliceCompletionCard();});
 bodyObserver.observe(document.body,{subtree:true,childList:true});
 const card=$("#policePhaseComplete");if(card)new MutationObserver(preventPoliceCompletionCard).observe(card,{attributes:true,attributeFilter:["style","class"]});
 window.LastWitnessImmediateClick={play:()=>playImmediateClick(true),version:"0.5.4"};
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",bind,{once:true});else bind();
})();
