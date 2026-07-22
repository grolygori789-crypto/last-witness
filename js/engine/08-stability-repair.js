/* LAST WITNESS — Stability Repair 0.5.2
 * Authoritative instant UI click, headphones recommendation and lightweight
 * portrait/review repair. No polling and no duplicate click handlers.
 */
(function(){
"use strict";
if(window.__lwStabilityRepair052)return;
window.__lwStabilityRepair052=true;

const $=(selector,root=document)=>root.querySelector(selector);
const $$=(selector,root=document)=>Array.from(root.querySelectorAll(selector));
let clickContext=null;
let noiseBuffer=null;
let lastClickAt=0;
let fallbackTimer=0;

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

function installHeadphonesRecommendation(){
 const splash=$("#splash");
 if(!splash||$("#headphonesRecommendation"))return;
 const note=document.createElement("div");
 note.id="headphonesRecommendation";
 note.className="headphones-recommendation";
 note.setAttribute("aria-label","Best experienced with headphones");
 note.innerHTML=`<svg class="headphones-icon" viewBox="0 0 64 64" aria-hidden="true"><path d="M13 34v-4C13 19.5 21.5 11 32 11s19 8.5 19 19v4"/><path d="M13 33h5a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5h-3a4 4 0 0 1-4-4V37a4 4 0 0 1 2-4Z"/><path d="M51 33h-5a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h3a4 4 0 0 0 4-4V37a4 4 0 0 0-2-4Z"/><path d="M41 53c-2.5 2-5.5 3-9 3"/></svg><span>BEST EXPERIENCED WITH HEADPHONES</span>`;
 splash.appendChild(note);
 if(!$("#lwHeadphonesStyle")){
  const style=document.createElement("style");style.id="lwHeadphonesStyle";
  style.textContent=`
   .headphones-recommendation{position:absolute;z-index:6;left:50%;bottom:calc(17vh + var(--bottom));transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:8px;width:min(82vw,360px);color:#c9b27f;text-align:center;pointer-events:none;opacity:.9}
   .headphones-icon{width:31px;height:31px;fill:none;stroke:currentColor;stroke-width:2.15;stroke-linecap:round;stroke-linejoin:round;filter:drop-shadow(0 3px 10px rgba(0,0,0,.45))}
   .headphones-recommendation span{font-size:9px;font-weight:700;letter-spacing:.18em;line-height:1.35;text-transform:uppercase;text-shadow:0 2px 10px #000}
   @media (max-height:650px){.headphones-recommendation{bottom:calc(15vh + var(--bottom));gap:6px}.headphones-icon{width:27px;height:27px}}
  `;
  document.head.appendChild(style);
 }
}

function actionable(event){
 return event.target.closest?.('#enter,#newGame,#continueGame,#loadTitle,button:not(:disabled),.dialogue:not(.hidden),[role="button"]');
}
function sfxLevel(){
 const value=Number(window.state?.sfx);
 return Number.isFinite(value)?Math.max(0,Math.min(1,value)):0.55;
}
function getClickContext(){
 if(clickContext)return clickContext;
 const Context=window.AudioContext||window.webkitAudioContext;
 if(!Context)return null;
 try{
  clickContext=new Context({latencyHint:"interactive"});
  const length=Math.max(96,Math.round(clickContext.sampleRate*0.032));
  noiseBuffer=clickContext.createBuffer(1,length,clickContext.sampleRate);
  const data=noiseBuffer.getChannelData(0);
  for(let i=0;i<length;i++){
   const envelope=Math.pow(1-i/length,3.4);
   data[i]=(Math.random()*2-1)*envelope;
  }
  return clickContext;
 }catch(_){return null;}
}
function synthClick(){
 const ctx=getClickContext();
 if(!ctx||!noiseBuffer)return false;
 const fire=()=>{
  try{
   const now=ctx.currentTime+0.002;
   const level=Math.max(0.018,Math.min(0.052,sfxLevel()*0.080));
   const source=ctx.createBufferSource();
   const high=ctx.createBiquadFilter();
   const low=ctx.createBiquadFilter();
   const gain=ctx.createGain();
   source.buffer=noiseBuffer;
   high.type="highpass";high.frequency.value=700;
   low.type="lowpass";low.frequency.value=4800;
   gain.gain.setValueAtTime(0.0001,now);
   gain.gain.linearRampToValueAtTime(level,now+0.0015);
   gain.gain.exponentialRampToValueAtTime(0.0001,now+0.034);
   source.connect(high);high.connect(low);low.connect(gain);gain.connect(ctx.destination);
   source.start(now);source.stop(now+0.038);

   const osc=ctx.createOscillator();
   const tone=ctx.createGain();
   osc.type="triangle";
   osc.frequency.setValueAtTime(920,now);
   osc.frequency.exponentialRampToValueAtTime(430,now+0.026);
   tone.gain.setValueAtTime(0.0001,now);
   tone.gain.linearRampToValueAtTime(level*0.42,now+0.001);
   tone.gain.exponentialRampToValueAtTime(0.0001,now+0.030);
   osc.connect(tone);tone.connect(ctx.destination);osc.start(now);osc.stop(now+0.034);
   return true;
  }catch(_){return false;}
 };
 if(ctx.state==="suspended"){
  ctx.resume().then(fire).catch(()=>fallbackClick());
  return true;
 }
 return fire();
}
function fallbackClick(){
 if(window.state?.sound===false||sfxLevel()<=0)return;
 const audio=$("#clickAudio");if(!audio)return;
 clearTimeout(fallbackTimer);
 try{
  audio.pause();
  audio.currentTime=Math.min(0.035,Number.isFinite(audio.duration)?Math.max(0,audio.duration-0.02):0.035);
  audio.loop=false;audio.muted=false;
  audio.volume=Math.max(0.045,Math.min(0.12,sfxLevel()*0.18));
  audio.play().catch(()=>{});
  fallbackTimer=setTimeout(()=>{try{audio.pause();audio.currentTime=0;}catch(_){}},135);
 }catch(_){ }
}
function playImmediateClick(force=false){
 if(window.state?.sound===false||sfxLevel()<=0)return;
 const now=performance.now();
 if(!force&&now-lastClickAt<95)return;
 lastClickAt=now;
 if(!synthClick())fallbackClick();
}
function installClick(){
 if(window.__lwCoreClickInstalled)return;
 window.__lwCoreClickInstalled=true;
 document.addEventListener("pointerdown",event=>{if(actionable(event))playImmediateClick();},true);
 document.addEventListener("keydown",event=>{
  if((event.key==="Enter"||event.key===" ")&&actionable(event))playImmediateClick();
 },true);
 const original=window.play;
 window.play=function(name){
  if(name==="click"){
   if(performance.now()-lastClickAt>=130)playImmediateClick(true);
   return;
  }
  return typeof original==="function"?original.apply(this,arguments):undefined;
 };
 window.play.__lwCoreClick=true;
}
function bind(){
 refreshReviewButtons();repairAllPortraits();preventPoliceCompletionCard();installHeadphonesRecommendation();installClick();
 const bodyObserver=new MutationObserver(mutations=>{
  for(const mutation of mutations){mutation.addedNodes.forEach(node=>{if(node.nodeType===1)repairAllPortraits(node);});}
  refreshReviewButtons();preventPoliceCompletionCard();
 });
 bodyObserver.observe(document.body,{subtree:true,childList:true});
 const card=$("#policePhaseComplete");if(card)new MutationObserver(preventPoliceCompletionCard).observe(card,{attributes:true,attributeFilter:["style","class"]});
 window.LastWitnessImmediateClick={play:()=>playImmediateClick(true),version:"0.5.2"};
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",bind,{once:true});else bind();
})();
