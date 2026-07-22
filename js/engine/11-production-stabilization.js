/* LAST WITNESS — Production Stabilization 0.5.0
 * One authoritative audio lifecycle, restrained mouse clicks, consistent
 * evidence feedback, Medical Examiner evidence details and Chapter III hooks.
 */
(function(){
"use strict";
if(window.__lwProductionStabilization050)return;
window.__lwProductionStabilization050=true;

const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const clamp=(v,min=0,max=1)=>Math.max(min,Math.min(max,Number(v)||0));
const APARTMENT_IDS=["apt_mug","apt_documents","apt_board","apt_laptop"];
const FORENSIC_IDS=["sealed_sample","accession_record","audit_trace","batch_record"];
const MEDICAL_IDS=["postmortem","identity_tag","autopsy_report","toxicology_sample"];
const LOOP_IDS=["themeAudio","rainAudio","officeAudio","crimeAudio","morningOfficeAudio","cafeAudio","policeAudio","forensicHumAudio","medicalRefrigeratorAudio","medicalMachineAudio"];
let lastScreen="";
let lastClickAt=0;
let clickStopTimer=0;
let evidenceStopTimer=0;
let evidenceSource=null;
let clickBuffer=null;
let evidenceBuffer=null;
let bufferLoading=null;
let audioContext=null;
let syncQueued=false;

function activeScreen(){return $(".screen.active")?.id||window.state?.screen||"";}
function soundOn(){return window.state?.sound!==false;}
function musicLevel(){return clamp(window.state?.music??0.33);}
function sfxLevel(){return clamp(window.state?.sfx??0.55);}
function dialogueOpen(screen=activeScreen()){
 const root=$("#"+screen);if(!root)return false;
 return $$(".dialogue",root).some(box=>!box.classList.contains("hidden")&&getComputedStyle(box).display!=="none");
}
function stopElement(audio,reset=true){if(!audio)return;try{audio.pause();if(reset)audio.currentTime=0;}catch(_){}}
function stopEvidenceCue(){
 clearTimeout(evidenceStopTimer);
 if(evidenceSource){try{evidenceSource.stop();}catch(_){};try{evidenceSource.disconnect();}catch(_){};evidenceSource=null;}
 stopElement($("#evidenceAudio"),true);
}
function stopInvestigationLoops(except=new Set()){
 LOOP_IDS.forEach(id=>{if(!except.has(id))stopElement($("#"+id),true);});
}
function volumeProfile(screen){
 const duck=dialogueOpen(screen)?0.88:1;
 const m=musicLevel();
 const p={};
 if(screen==="title"){p.themeAudio=m;p.rainAudio=m*0.48;}
 else if(screen==="office"){p.officeAudio=m*0.50*duck;p.rainAudio=m*0.14*duck;}
 else if(["crime","phone","deduction"].includes(screen)){p.crimeAudio=m*0.34*duck;}
 else if(screen==="office2"||screen==="chapter3Office"){p.morningOfficeAudio=m*0.50*duck;}
 else if(screen==="apartment2"){p.crimeAudio=m*0.30*duck;}
 else if(screen==="cafe2"){p.cafeAudio=m*0.36*duck;}
 else if(screen==="police2"){p.policeAudio=m*0.055*duck;}
 else if(screen==="forensic2"){p.forensicHumAudio=m*0.34*duck;}
 else if(screen==="medical2"){p.medicalRefrigeratorAudio=m*0.38*duck;p.medicalMachineAudio=m*0.10*duck;}
 return p;
}
function startLoop(id,volume){
 const audio=$("#"+id);if(!audio||!soundOn())return;
 try{
  audio.loop=true;audio.muted=false;audio.volume=clamp(volume);
  if(id==="policeAudio"){
   const duration=Number(audio.duration),preferred=12;
   if(Number.isFinite(duration)&&duration>0&&audio.paused&&(audio.currentTime<preferred||audio.currentTime>=duration-.2)){
    audio.currentTime=Math.min(preferred,Math.max(0,duration-.2));
   }else if(!Number.isFinite(duration)&&audio.dataset.lwPoliceSeekBound!=="1"){
    audio.dataset.lwPoliceSeekBound="1";
    audio.addEventListener("loadedmetadata",()=>{
     try{const d=Number(audio.duration);if(Number.isFinite(d)&&d>preferred)audio.currentTime=preferred;}catch(_){}
    },{once:true});
   }
  }
  if(audio.paused)audio.play().catch(()=>{});
 }catch(_){}
}
function applySceneAudio(screen=activeScreen()){
 const current=screen||activeScreen();
 if(current!==lastScreen){stopEvidenceCue();lastScreen=current;}
 if(!soundOn()){stopInvestigationLoops();return;}
 const profile=volumeProfile(current);
 const allowed=new Set(Object.keys(profile));
 stopInvestigationLoops(allowed);
 Object.entries(profile).forEach(([id,volume])=>startLoop(id,volume));
 if(!["chapter2Complete","chapter3Wip"].includes(current)){
  if(current!=="chapter")stopElement($("#chapterAudio"),true);
 }
}
function queueAudioSync(screen){
 if(syncQueued)return;syncQueued=true;
 requestAnimationFrame(()=>{syncQueued=false;applySceneAudio(screen||activeScreen());});
}

function context(){
 if(audioContext)return audioContext;
 const C=window.AudioContext||window.webkitAudioContext;
 if(!C)return null;
 try{audioContext=new C();return audioContext;}catch(_){return null;}
}
async function decodeElement(id){
 const el=$("#"+id),ctx=context();
 const src=el?.currentSrc||el?.src||el?.getAttribute?.("src");
 if(!src||!ctx||typeof fetch!=="function")return null;
 const response=await fetch(src,{cache:"force-cache"});
 if(!response.ok)return null;
 const bytes=await response.arrayBuffer();
 return ctx.decodeAudioData(bytes.slice(0));
}
function prepareBuffers(){
 if(bufferLoading)return bufferLoading;
 bufferLoading=Promise.allSettled([decodeElement("clickAudio"),decodeElement("evidenceAudio")]).then(results=>{
  clickBuffer=results[0].status==="fulfilled"?results[0].value:null;
  evidenceBuffer=results[1].status==="fulfilled"?results[1].value:null;
 }).catch(()=>{});
 return bufferLoading;
}
function signalWindow(buffer,windowSeconds=0.003){
 const rate=buffer.sampleRate||48000,size=Math.max(8,Math.round(rate*windowSeconds)),values=[];
 for(let start=0;start<buffer.length;start+=size){
  let sum=0,count=0,end=Math.min(buffer.length,start+size);
  for(let c=0;c<buffer.numberOfChannels;c++){const data=buffer.getChannelData(c);for(let i=start;i<end;i++){sum+=data[i]*data[i];count++;}}
  values.push(Math.sqrt(sum/Math.max(1,count)));
 }
 return{values,size,rate};
}
function audibleRegion(buffer,maxDuration){
 if(!buffer)return{offset:0,duration:maxDuration};
 const env=signalWindow(buffer,0.004),peak=Math.max(...env.values,0),threshold=Math.max(0.0008,peak*0.035);
 let first=0;while(first<env.values.length&&env.values[first]<threshold)first++;
 const offset=Math.max(0,first*env.size/env.rate-0.01);
 return{offset,duration:Math.min(maxDuration,Math.max(0.12,(buffer.duration||maxDuration)-offset))};
}
function playBuffer(buffer,offset,duration,gainValue,kind){
 const ctx=context();if(!ctx||!buffer||!soundOn())return false;
 try{
  if(ctx.state==="suspended")ctx.resume().catch(()=>{});
  const source=ctx.createBufferSource(),gain=ctx.createGain();
  source.buffer=buffer;
  let node=source;
  if(kind==="click"&&ctx.createBiquadFilter){
   const low=ctx.createBiquadFilter();low.type="lowpass";low.frequency.value=5200;low.Q.value=0.4;node.connect(low);node=low;
  }
  const now=ctx.currentTime,attack=Math.min(0.008,duration*0.1),release=Math.min(kind==="click"?0.045:0.20,duration*0.35);
  gain.gain.setValueAtTime(0.0001,now);
  gain.gain.linearRampToValueAtTime(Math.max(0.0001,gainValue),now+attack);
  gain.gain.setValueAtTime(Math.max(0.0001,gainValue),Math.max(now+attack,now+duration-release));
  gain.gain.linearRampToValueAtTime(0.0001,now+duration);
  node.connect(gain);gain.connect(ctx.destination);
  source.start(now,Math.max(0,offset),Math.max(0.03,duration));
  if(kind==="evidence")evidenceSource=source;
  return true;
 }catch(_){return false;}
}
function playMouseClick(force=false){
 if(!soundOn()||sfxLevel()<=0)return;
 const now=performance.now();if(!force&&now-lastClickAt<115)return;lastClickAt=now;
 const level=clamp(sfxLevel()*0.52,0.10,0.32);
 if(clickBuffer){
  const region=audibleRegion(clickBuffer,0.24);
  if(playBuffer(clickBuffer,region.offset,region.duration,level,"click"))return;
 }
 const audio=$("#clickAudio");if(!audio)return;
 clearTimeout(clickStopTimer);
 try{audio.pause();audio.currentTime=0;audio.loop=false;audio.muted=false;audio.volume=level;audio.play().catch(()=>{});clickStopTimer=setTimeout(()=>stopElement(audio,true),280);}catch(_){}
 prepareBuffers();
}
function playEvidenceCue(finalCue=false){
 if(!soundOn()||sfxLevel()<=0)return;
 stopEvidenceCue();
 const duration=finalCue?1.65:0.82;
 const level=clamp(sfxLevel()*(finalCue?0.48:0.38),0.10,finalCue?0.31:0.25);
 if(evidenceBuffer){
  const region=audibleRegion(evidenceBuffer,duration);
  if(playBuffer(evidenceBuffer,region.offset,Math.min(duration,region.duration),level,"evidence")){
   evidenceStopTimer=setTimeout(stopEvidenceCue,duration*1000+80);return;
  }
 }
 const audio=$("#evidenceAudio");if(!audio)return;
 try{audio.muted=false;audio.pause();audio.currentTime=0;audio.loop=false;audio.volume=level;audio.play().catch(()=>{});evidenceStopTimer=setTimeout(stopEvidenceCue,duration*1000);}catch(_){}
 prepareBuffers();
}

function phaseCount(phase){
 if(phase==="apartment")return APARTMENT_IDS.filter(id=>window.state?.found?.has?.(id)).length;
 if(phase==="forensic")return new Set(window.state?.forensic?.collected||[]).size;
 if(phase==="medical")return new Set(window.state?.medical?.collected||[]).size;
 if(phase==="police")return window.state?.flags?.police_evidence_collected?1:0;
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
 const phase=phaseForCollect(button),before=phaseCount(phase),legacy=$("#evidenceAudio");
 if(legacy){legacy.muted=true;stopElement(legacy,true);}
 setTimeout(()=>{
  if(legacy)legacy.muted=false;
  const after=phaseCount(phase);
  if(after>before)playEvidenceCue(after>=phaseTotal(phase));
 },40);
}
function repairMedicalEvidence(event){
 if(event.target.closest?.("[data-medical-clue]")){
  setTimeout(()=>{$("#medicalEvidenceMeta")?.classList.remove("show");const obs=$("#medicalEvidenceObservation");if(obs)obs.style.display="none";},0);
 }
 if(event.target.closest?.("#inspectMedicalEvidence,#medicalEvidenceObject")){
  setTimeout(()=>{$("#medicalEvidenceMeta")?.classList.add("show");const obs=$("#medicalEvidenceObservation");if(obs)obs.style.display="";},0);
 }
 if(event.target.closest?.("#closeMedicalEvidence,#collectMedicalEvidence")){
  setTimeout(()=>$("#medicalEvidenceMeta")?.classList.remove("show"),0);
 }
}
function actionableTarget(event){
 return event.target.closest?.("#enter,#newGame,#continueGame,#loadTitle,button:not(:disabled),.dialogue:not(.hidden),[role=button]");
}
function installClickSystem(){
 document.addEventListener("pointerdown",event=>{
  if(!actionableTarget(event))return;
  playMouseClick();
  prepareBuffers();
 },true);
 const original=window.play;
 window.play=function(name){
  if(name==="click"){playMouseClick();return;}
  return typeof original==="function"?original.apply(this,arguments):undefined;
 };
 window.play.__lwProductionClick=true;
}
function installRouting(){
 const original=window.show;
 if(typeof original==="function"&&!original.__lwProductionRoute){
  const wrapped=function(screen){stopEvidenceCue();const result=original.apply(this,arguments);queueAudioSync(screen);window.LastWitnessContentRegistry?.updateVisibility?.();return result;};
  wrapped.__lwProductionRoute=true;window.show=wrapped;
 }
 const originalSet=window.setVolumes;
 window.setVolumes=function(){
  if(typeof originalSet==="function")try{originalSet.apply(this,arguments);}catch(_){}
  queueAudioSync();
 };
 window.ambience=function(screen){applySceneAudio(screen);};
}
function installObservers(){
 const screenObserver=new MutationObserver(records=>{
  if(records.some(r=>r.target.classList?.contains("active")))queueAudioSync();
  window.LastWitnessContentRegistry?.updateVisibility?.();
 });
 $$(".screen").forEach(screen=>screenObserver.observe(screen,{attributes:true,attributeFilter:["class"]}));
 const dialogueObserver=new MutationObserver(()=>queueAudioSync());
 $$(".dialogue").forEach(box=>dialogueObserver.observe(box,{attributes:true,attributeFilter:["class"]}));
}
function applyChapterNaming(){
 try{if(window.LANG?.en)LANG.en.chapter_1_name="ROOM 1807";}catch(_){}
 const initial=$("#chapterIntroTitle");if(initial&&initial.textContent.trim().toUpperCase()==="HOTEL 1807")initial.textContent="ROOM 1807";
}
function installGapGuard(){
 if($("#lwJournalGapGuard"))return;
 const style=document.createElement("style");style.id="lwJournalGapGuard";
 style.textContent="#charactersButton[hidden],#charactersButton[aria-hidden='true']{display:none!important;margin:0!important;min-height:0!important;height:0!important;padding:0!important;border:0!important;overflow:hidden!important}";
 document.head.appendChild(style);
}
function bindSettings(){
 $("#musicRange")?.addEventListener("input",()=>queueAudioSync(),true);
 $("#sfxRange")?.addEventListener("input",()=>{},true);
 $("#soundToggle")?.addEventListener("change",()=>queueAudioSync(),true);
 document.addEventListener("visibilitychange",()=>{if(!document.hidden)queueAudioSync();});
}
function bind(){
 applyChapterNaming();installGapGuard();installClickSystem();installRouting();installObservers();bindSettings();
 document.addEventListener("click",interceptCollection,true);
 document.addEventListener("click",repairMedicalEvidence,true);
 prepareBuffers();
 window.LastWitnessAudioCue={playCollection:()=>playEvidenceCue(false),playCompletion:()=>playEvidenceCue(true),stopEvidenceCue,version:"0.5.0"};
 window.LastWitnessProductionAudio={refresh:()=>queueAudioSync(),apply:applySceneAudio,stopEvidenceCue,profile:volumeProfile,version:"0.5.0"};
 window.LastWitnessContentRegistry?.updateVisibility?.();
 queueAudioSync();
}

if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",bind,{once:true});else bind();
})();
