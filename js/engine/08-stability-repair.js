/* LAST WITNESS — Stability Repair 0.5.1
 * Lightweight portrait/review repair plus one immediate UI click system.
 * No polling loop and no duplicate evidence or dialogue click handlers.
 */
(function(){
"use strict";
if(window.__lwStabilityRepair051)return;
window.__lwStabilityRepair051=true;

const $=(selector,root=document)=>root.querySelector(selector);
const $$=(selector,root=document)=>Array.from(root.querySelectorAll(selector));
let lastClickAt=0;
let clickStopTimer=0;

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
function actionable(event){return event.target.closest?.('#enter,#newGame,#continueGame,#loadTitle,button:not(:disabled),.dialogue:not(.hidden),[role="button"]');}
function playImmediateClick(force=false){
 if(window.state?.sound===false)return;
 const audio=$("#clickAudio");if(!audio)return;
 const sfx=Number.isFinite(Number(window.state?.sfx))?Math.max(0,Math.min(1,Number(window.state.sfx))):0.55;
 if(sfx<=0)return;
 const now=performance.now();if(!force&&now-lastClickAt<110)return;lastClickAt=now;
 clearTimeout(clickStopTimer);
 try{
  audio.pause();audio.currentTime=0.035;audio.loop=false;audio.muted=false;
  audio.volume=Math.max(0.05,Math.min(0.16,sfx*0.26));
  audio.play().catch(()=>{});
  clickStopTimer=setTimeout(()=>{try{audio.pause();audio.currentTime=0.035;}catch(_){}},145);
 }catch(_){}
}
function installClick(){
 if(window.__lwCoreClickInstalled)return;
 window.__lwCoreClickInstalled=true;
 document.addEventListener("pointerdown",event=>{if(actionable(event))playImmediateClick();},true);
 const original=window.play;
 window.play=function(name){
  if(name==="click"){
   if(performance.now()-lastClickAt>=110)playImmediateClick(true);
   return;
  }
  return typeof original==="function"?original.apply(this,arguments):undefined;
 };
 window.play.__lwCoreClick=true;
}
function bind(){
 refreshReviewButtons();repairAllPortraits();preventPoliceCompletionCard();installClick();
 const bodyObserver=new MutationObserver(mutations=>{
  for(const mutation of mutations){mutation.addedNodes.forEach(node=>{if(node.nodeType===1)repairAllPortraits(node);});}
  refreshReviewButtons();preventPoliceCompletionCard();
 });
 bodyObserver.observe(document.body,{subtree:true,childList:true});
 const card=$("#policePhaseComplete");if(card)new MutationObserver(preventPoliceCompletionCard).observe(card,{attributes:true,attributeFilter:["style","class"]});
 window.LastWitnessImmediateClick={play:()=>playImmediateClick(true),version:"0.5.1"};
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",bind,{once:true});else bind();
})();
