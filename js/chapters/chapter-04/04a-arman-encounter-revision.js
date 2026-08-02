/* LAST WITNESS - Chapter IV / Phase IV Professional Revision 0.17.1
 * Presentation-only repair layered after 04-arman-encounter.js 0.17.0.
 * Preserves narrative, evidence, choices, ending-profile effects and handoff logic.
 */
(function(){
"use strict";
if(window.LastWitnessChapter4Phase4Revision?.installed)return;

const BUILD="0.17.1";
const APPROACH="armanVehicleApproach";
const LOCATION="armanLocationCard";
const STAIRWELL="armanStairwell";
const WORKSHOP="armanWorkshop";
const REVEAL="armanReveal";
const COMPLETE="armanPhase4Complete";
const SCREENS=new Set([APPROACH,LOCATION,STAIRWELL,WORKSHOP,REVEAL,COMPLETE]);
const $=(selector,root=document)=>root.querySelector(selector);
const $$=(selector,root=document)=>Array.from(root.querySelectorAll(selector));
const gs=()=>{try{return state}catch(_){return window.state||null}};
const thai=()=>gs()?.language==="th"||document.documentElement.lang==="th";
const tr=(en,th)=>thai()?th:en;
const clamp=(value,min=0,max=1)=>Math.max(min,Math.min(max,Number(value)||0));
const active=()=>$(".screen.active")?.id||gs()?.screen||"";

let titleTimer=0;
let titleTransitioning=false;
let audioFrame=0;
let audioTimer=0;
const portraitCache=new Map();
const portraitJobs=new WeakSet();

function phase(){return gs()?.chapter4?.phase4||null}
function save(){try{if(typeof autoSave==="function")autoSave()}catch(_){} }
function stopMedia(media,reset=false){if(!media)return;try{media.pause();if(reset)media.currentTime=0}catch(_){} }
function showScreen(id){
 try{if(typeof show==="function")show(id)}catch(_){}
 if(!$("#"+id)?.classList.contains("active")){
  $$(".screen").forEach(node=>node.classList.remove("active"));
  $("#"+id)?.classList.add("active");
  if(gs())gs().screen=id
 }
 syncProgress();scheduleAudioSync()
}
function setCheckpoint(value){const s=gs();if(!s)return;s.checkpoint=value;save()}

function ensurePhaseTitleState(){
 const p=phase();if(!p)return null;
 if(typeof p.phaseTitleSeen!=="boolean"){
  const beyondLocation=Boolean(p.locationCardSeen||p.stairwellComplete||p.workshopIntroComplete||p.triangulationStarted||p.revealStarted||p.complete);
  p.phaseTitleSeen=beyondLocation
 }
 return p
}
function updateTitleLanguage(){
 const eye=$("#ch4P4PhaseTitleEye"),title=$("#ch4P4PhaseTitleText"),eyeText=tr("CHAPTER IV · PHASE IV","บทที่ IV · เฟส IV"),titleText=tr("THE MAN BEHIND THE ALIAS","ชายผู้อยู่หลังนามแฝง");
 if(eye&&eye.textContent!==eyeText)eye.textContent=eyeText;
 if(title&&title.textContent!==titleText)title.textContent=titleText
}
function locationMode(){
 clearTimeout(titleTimer);titleTimer=0;titleTransitioning=false;
 const p=ensurePhaseTitleState();if(!p)return;
 p.phaseTitleSeen=true;p.stage="location";
 const screen=$("#"+LOCATION);screen?.classList.remove("phase-title-mode","phase-title-enter","phase-title-exit");
 screen?.classList.add("location-card-mode");
 setCheckpoint("ch4_phase4_location");syncProgress();scheduleAudioSync();save()
}
function presentPhaseTitle(fromRestore=false){
 const p=ensurePhaseTitleState();if(!p||p.phaseTitleSeen||titleTransitioning)return;
 titleTransitioning=true;p.approachComplete=true;p.stage="location";
 if(gs()){gs().chapter=4;gs().screen=LOCATION}
 showScreen(LOCATION);
 const screen=$("#"+LOCATION);screen?.classList.remove("location-card-mode","phase-title-exit");
 screen?.classList.add("phase-title-mode","phase-title-enter");
 updateTitleLanguage();setCheckpoint("ch4_phase4_location");syncProgress();scheduleAudioSync();
 titleTimer=setTimeout(()=>{
  screen?.classList.remove("phase-title-enter");screen?.classList.add("phase-title-exit");
  titleTimer=setTimeout(locationMode,420)
 },fromRestore?2100:2400)
}
function finishVehicle(event){
 if(event){event.preventDefault?.();event.stopPropagation?.();event.stopImmediatePropagation?.()}
 const p=ensurePhaseTitleState();if(!p||p.approachComplete&&p.phaseTitleSeen)return;
 clearTimeout(titleTimer);titleTimer=0;titleTransitioning=false;
 stopMedia($("#ch4P4ApproachVideo"),true);
 $("#ch4P4ApproachSkip")?.setAttribute("hidden","");
 $("#ch4P4VideoPlay")?.setAttribute("hidden","");
 p.approachComplete=true;p.phaseTitleSeen=false;p.stage="location";
 const approach=$("#"+APPROACH);approach?.classList.add("ch4-p4-cinematic-fade");
 setCheckpoint("ch4_phase4_location");syncProgress();
 setTimeout(()=>{approach?.classList.remove("ch4-p4-cinematic-fade");presentPhaseTitle(false)},520)
}

function progressValue(){
 const p=phase();if(!p?.started)return 0;if(p.complete)return 100;
 const stage=String(p.stage||"approach");
 if(stage==="approach")return 4;
 if(stage==="location")return p.phaseTitleSeen?10:7;
 if(stage==="stairwell")return 18;
 if(stage==="workshop")return 28;
 if(stage==="triangulation"||stage==="triangulation-result"){
  const assigned=Object.keys(p.triangulationAssignments||{}).length;
  return p.triangulationComplete?56:Math.min(52,34+assigned*4)
 }
 if(stage==="proxy-reveal")return 60;
 if(stage==="reveal")return 65;
 if(stage==="arman-intro")return 70;
 if(stage==="dimas-choice"||stage==="dimas-followup")return 75;
 if(stage==="arman-exchange"||stage==="arman-choice"||stage==="arman-followup")return 81;
 if(stage==="cache-choice"||stage==="cache-followup")return 86;
 if(stage==="cache-review")return Math.min(93,87+(p.evidenceCollected||[]).filter(id=>String(id).startsWith("ch4_p4_")).length);
 if(stage==="threat"||stage==="north-choice"||stage==="north-followup")return 96;
 if(stage==="closing")return 98;
 return 30
}
function setProgress(value){
 const n=Math.max(0,Math.min(100,Math.round(value))),label=n+"%";
 $$(".ch4-p4-progress-text").forEach(node=>{if(node.textContent!==label)node.textContent=label});
 $$(".ch4-p4-progress-fill").forEach(node=>{if(node.style.width!==label)node.style.width=label});
 if(gs()&&gs().progress!==n)gs().progress=n
}
function syncProgress(){setProgress(progressValue())}
function progressMarkup(){return '<div class="ch4-p4-progress" aria-label="Phase progress"><span class="ch4-p4-progress-text">0%</span><div><i class="ch4-p4-progress-fill"></i></div></div>'}
function installProgress(){
 for(const id of SCREENS){const screen=$("#"+id);if(screen&&!$(".ch4-p4-progress",screen))screen.insertAdjacentHTML("beforeend",progressMarkup())}
 syncProgress()
}

function dialogueVisible(){return Boolean($(".ch4-p4-dialogue:not(.hidden)"))}
function overlayVisible(){return Boolean($("#ch4P4Triad.open,#ch4P4Choice.open,#ch4P4Cache.open"))}
function scoreTarget(){
 const s=gs(),screen=active();if(!s||s.sound===false||!SCREENS.has(screen)||Number(s.music??.33)<=0)return 0;
 const music=clamp(Number(s.music??.33));
 const dialogueDuck=dialogueVisible()?.58:1;
 const overlayDuck=overlayVisible()?.66:1;
 const videoDuck=screen===REVEAL?.19:(screen===APPROACH?.78:1);
 const completeLift=screen===COMPLETE?.88:1;
 return clamp(music*.43*dialogueDuck*overlayDuck*videoDuck*completeLift,0,.44)
}
function fadeScore(target,duration=320){
 const media=$("#ch4P4Score");if(!media)return;if(audioFrame)cancelAnimationFrame(audioFrame);
 const start=clamp(media.volume),end=clamp(target,0,.9),began=performance.now();
 if(end>0&&media.paused){media.loop=true;media.muted=false;media.play().catch(()=>{})}
 const step=now=>{const q=Math.max(0,Math.min(1,(now-began)/duration)),smooth=q*q*(3-2*q);media.volume=start+(end-start)*smooth;if(q<1)audioFrame=requestAnimationFrame(step);else{audioFrame=0;if(end===0)media.pause()}};
 audioFrame=requestAnimationFrame(step)
}
function syncAudio(){
 if(!SCREENS.has(active())){stopMedia($("#ch4P4Score"),active()==="title");return}
 fadeScore(scoreTarget(),active()===COMPLETE?460:320)
}
function scheduleAudioSync(){
 clearTimeout(audioTimer);audioTimer=setTimeout(syncAudio,540);
 setTimeout(syncAudio,80);setTimeout(syncAudio,820);setTimeout(syncAudio,1360)
}

function edgePixel(data,w,h,x,y,radius=2){
 for(let oy=-radius;oy<=radius;oy++)for(let ox=-radius;ox<=radius;ox++){
  if(!ox&&!oy)continue;const nx=x+ox,ny=y+oy;if(nx<0||ny<0||nx>=w||ny>=h)return true;
  if(data[(ny*w+nx)*4+3]<18)return true
 }
 return false
}
function nearestInterior(data,w,h,x,y,radius=7){
 let best=null,bestDistance=Infinity;
 for(let oy=-radius;oy<=radius;oy++)for(let ox=-radius;ox<=radius;ox++){
  const nx=x+ox,ny=y+oy;if(nx<0||ny<0||nx>=w||ny>=h)continue;
  const distance=ox*ox+oy*oy;if(distance===0||distance>=bestDistance)continue;
  const i=(ny*w+nx)*4,a=data[i+3],sum=data[i]+data[i+1]+data[i+2];
  if(a>205&&sum<690){bestDistance=distance;best=[data[i],data[i+1],data[i+2]]}
 }
 return best
}
function decontaminatePortrait(image){
 const key=image.currentSrc||image.src;if(!key)return Promise.resolve("");if(portraitCache.has(key))return Promise.resolve(portraitCache.get(key));
 return new Promise(resolve=>{
  try{
   const w=image.naturalWidth,h=image.naturalHeight;if(!w||!h){resolve("");return}
   const canvas=document.createElement("canvas");canvas.width=w;canvas.height=h;const ctx=canvas.getContext("2d",{willReadFrequently:true});ctx.drawImage(image,0,0,w,h);
   const frame=ctx.getImageData(0,0,w,h),source=new Uint8ClampedArray(frame.data),out=frame.data;
   for(let y=0;y<h;y++)for(let x=0;x<w;x++){
    const i=(y*w+x)*4,a=source[i+3];if(a===0||!edgePixel(source,w,h,x,y,2))continue;
    const r=source[i],g=source[i+1],b=source[i+2],white=Math.min(r,g,b),range=Math.max(r,g,b)-white;
    if(white<150&&a>235)continue;
    const interior=nearestInterior(source,w,h,x,y,8);
    if(interior){
     const strength=clamp(((white-135)/105)+((255-a)/155),.28,1);
     out[i]=Math.round(r+(interior[0]-r)*strength);out[i+1]=Math.round(g+(interior[1]-g)*strength);out[i+2]=Math.round(b+(interior[2]-b)*strength)
    }else if(white>220&&range<34){out[i+3]=Math.round(a*.42)}
   }
   ctx.putImageData(frame,0,0);const finish=url=>{portraitCache.set(key,url);resolve(url)};if(canvas.toBlob)canvas.toBlob(blob=>finish(blob?URL.createObjectURL(blob):canvas.toDataURL("image/png")),"image/png");else finish(canvas.toDataURL("image/png"))
  }catch(error){console.warn("LAST WITNESS portrait edge cleanup skipped",error);resolve("")}
 })
}
function portraitSpeaker(image){return image.closest(".ch4-p4-dialogue")?.querySelector(".speaker")?.textContent||""}
function processPortrait(image){
 if(!image||portraitJobs.has(image)||image.dataset.lwP4PortraitClean==="1")return;
 const speaker=portraitSpeaker(image);if(!/Dimas Wibowo|Arman Suryadi|North/.test(speaker))return;
 portraitJobs.add(image);image.classList.add("ch4-p4-professional-cut");
 if(speaker.includes("North"))image.classList.add("north-portrait");
 const run=async()=>{const url=await decontaminatePortrait(image);if(url){image.dataset.lwP4OriginalSrc=image.currentSrc||image.src;image.src=url}image.dataset.lwP4PortraitClean="1"};
 if(image.complete&&image.naturalWidth)run();else image.addEventListener("load",run,{once:true})
}
function scanPortraits(){$$('.ch4-p4-dialogue img.portrait').forEach(processPortrait)}

function upgradeMarkup(){
 const approach=$("#"+APPROACH),location=$("#"+LOCATION),reveal=$("#"+REVEAL),complete=$("#"+COMPLETE);
 $(".ch4-p4-video-title",approach)?.remove();
 $$(".ch4-p4-video-shade",approach).forEach(node=>node.remove());
 $$(".ch4-p4-video-shade",reveal).forEach(node=>node.remove());
 if(location&&!$(".ch4-p4-phase-title-card",location)){
  location.insertAdjacentHTML("afterbegin",'<div class="ch4-p4-phase-title-card" aria-live="polite"><div class="ch4-p4-phase-mark"><i></i><i></i><i></i></div><div id="ch4P4PhaseTitleEye" class="eyebrow"></div><h2 id="ch4P4PhaseTitleText"></h2><div class="ch4-p4-phase-rule"></div></div>')
 }
 if(complete&&!$(".ch4-p4-complete-sigil",complete)){
  $(".ch4-p4-complete-card",complete)?.insertAdjacentHTML("afterbegin",'<div class="ch4-p4-complete-sigil" aria-hidden="true"><i></i><i></i><i></i></div>')
 }
 updateTitleLanguage();installProgress();bindCinematicControls();scanPortraits();syncProgress();scheduleAudioSync()
}
function bindCinematicControls(){
 const skip=$("#ch4P4ApproachSkip"),video=$("#ch4P4ApproachVideo"),returnButton=$("#ch4P4ReturnTitle");
 if(skip&&skip.dataset.lwP4RevisionBound!=="1"){
  skip.dataset.lwP4RevisionBound="1";skip.addEventListener("click",finishVehicle,true)
 }
 if(video&&video.dataset.lwP4RevisionBound!=="1"){
  video.dataset.lwP4RevisionBound="1";video.addEventListener("ended",finishVehicle,true);video.addEventListener("error",finishVehicle,true)
 }
 if(returnButton&&returnButton.dataset.lwP4RevisionBound!=="1"){
  returnButton.dataset.lwP4RevisionBound="1";returnButton.addEventListener("click",()=>{clearTimeout(titleTimer);stopMedia($("#ch4P4Score"),true)},true)
 }
}
function recoverTitleOnRestore(){
 const p=ensurePhaseTitleState();if(active()===LOCATION&&p?.approachComplete&&!p.phaseTitleSeen&&!titleTransitioning)presentPhaseTitle(true)
}
function installObservers(){
 const game=$("#game");if(game){
  let queued=false;const observer=new MutationObserver(()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;upgradeMarkup();recoverTitleOnRestore();scanPortraits();syncProgress();scheduleAudioSync();if(active()==="title")stopMedia($("#ch4P4Score"),true)})});
  observer.observe(game,{subtree:true,childList:true,attributes:true,attributeFilter:["class","hidden"]})
 }
 document.addEventListener("click",()=>{setTimeout(()=>{scanPortraits();syncProgress();scheduleAudioSync();recoverTitleOnRestore()},20);setTimeout(()=>{scanPortraits();syncProgress()},380)},true);
 document.addEventListener("visibilitychange",()=>{if(document.hidden)stopMedia($("#ch4P4Score"),false);else scheduleAudioSync()});
 document.addEventListener("click",event=>{if(event.target.closest?.("[data-lang]"))setTimeout(()=>{updateTitleLanguage();upgradeMarkup()},0)},true);
 $("#musicRange")?.addEventListener("input",scheduleAudioSync,true);$("#soundToggle")?.addEventListener("change",scheduleAudioSync,true)
}
function setBuild(){const node=$("#settingsVersion");if(node&&SCREENS.has(active()))node.textContent="Build "+BUILD}
function bind(){
 upgradeMarkup();installObservers();recoverTitleOnRestore();setBuild();
 document.addEventListener("click",()=>{if(SCREENS.has(active()))setBuild()},true);
 window.addEventListener("pagehide",()=>{for(const url of portraitCache.values())if(String(url).startsWith("blob:"))try{URL.revokeObjectURL(url)}catch(_){}},{once:true});
 window.LastWitnessChapter4Phase4Revision={installed:true,version:BUILD,syncProgress,syncAudio,processPortraits:scanPortraits}
}

if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",bind,{once:true});else bind();
})();
