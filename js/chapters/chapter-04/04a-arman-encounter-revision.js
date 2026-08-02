/* LAST WITNESS - Chapter IV / Phase IV Scoped Defect Repair 0.17.4
 * Repairs Phase IV presentation against the established Chapter IV contract.
 * Story, evidence, choices, ending-profile effects and Phase III handoff remain owned
 * by 04-arman-encounter.js 0.17.0.
 */
(function(){
"use strict";
const BUILD="0.17.4";
if(window.LastWitnessChapter4Phase4Revision?.version===BUILD&&window.LastWitnessChapter4Phase4Revision?.installed)return;

const APPROACH="armanVehicleApproach";
const LOCATION="armanLocationCard";
const STAIRWELL="armanStairwell";
const WORKSHOP="armanWorkshop";
const REVEAL="armanReveal";
const COMPLETE="armanPhase4Complete";
const SCREENS=new Set([APPROACH,LOCATION,STAIRWELL,WORKSHOP,REVEAL,COMPLETE]);
const HUD_SCREENS=[STAIRWELL,WORKSHOP];
const PORTRAIT_BASE="assets/images/chapter-04/phase-04/";
const PORTRAIT_VERSION="0174";
const $=(selector,root=document)=>root.querySelector(selector);
const $$=(selector,root=document)=>Array.from(root.querySelectorAll(selector));
const gs=()=>{try{return state}catch(_){return window.state||null}};
const thai=()=>gs()?.language==="th"||document.documentElement.lang==="th";
const tr=(en,th)=>thai()?th:en;
const clamp=(value,min=0,max=1)=>Math.max(min,Math.min(max,Number(value)||0));
const active=()=>$(".screen.active")?.id||gs()?.screen||"";

let titleTimer=0;
let locationTimer=0;
let locationTimerDue=0;
let titleTransitioning=false;
let audioFrame=0;
let audioTimer=0;
let registryUnlockOriginal=null;
let armanUnlockDeferred=false;

function phase(){return gs()?.chapter4?.phase4||null}
function save(){try{if(typeof autoSave==="function")autoSave()}catch(_){} }
function stopMedia(media,reset=false){if(!media)return;try{media.pause();if(reset)media.currentTime=0}catch(_){} }
function setCheckpoint(value){const s=gs();if(!s)return;s.checkpoint=value;save()}
function showScreen(id){
 try{if(typeof show==="function")show(id)}catch(_){}
 if(!$("#"+id)?.classList.contains("active")){
  $$(".screen").forEach(node=>node.classList.remove("active"));
  $("#"+id)?.classList.add("active");
  if(gs())gs().screen=id
 }
 syncProgress();scheduleAudioSync()
}

/* Vehicle -> established Phase card -> existing Day/Location/Time card. */
function ensurePhaseTitleState(){
 const p=phase();if(!p)return null;
 if(typeof p.phaseTitleSeen!=="boolean"){
  const beyondLocation=Boolean(p.locationCardSeen||p.stairwellComplete||p.workshopIntroComplete||p.triangulationStarted||p.revealStarted||p.complete);
  p.phaseTitleSeen=beyondLocation
 }
 return p
}
function updateTitleLanguage(){
 const eye=$("#ch4P4PhaseTitleEye"),title=$("#ch4P4PhaseTitleText");
 if(eye)eye.textContent=tr("CHAPTER IV · PHASE IV","บทที่ IV · เฟส IV");
 if(title)title.textContent=tr("THE MAN BEHIND THE ALIAS","ชายผู้อยู่หลังนามแฝง")
}
function clearLocationTimer(){clearTimeout(locationTimer);locationTimer=0;locationTimerDue=0}
function locationButton(){return $("#ch4P4LocationContinue")}
function enterBuildingAutomatically(){
 clearLocationTimer();
 const p=ensurePhaseTitleState(),screen=$("#"+LOCATION);
 if(!p||active()!==LOCATION||!screen?.classList.contains("location-card-mode")||p.locationCardSeen||String(p.stage)!=="location")return;
 p.locationAutoDue=0;save();
 const button=locationButton();
 if(button){button.click();return}
 console.error("LAST WITNESS Phase IV automatic building entry is unavailable")
}
function scheduleLocationAdvance(restoring=false){
 const p=ensurePhaseTitleState(),screen=$("#"+LOCATION);
 if(!p||active()!==LOCATION||!screen?.classList.contains("location-card-mode")||p.locationCardSeen||String(p.stage)!=="location"){clearLocationTimer();return}
 const now=Date.now(),existing=Number(p.locationAutoDue)||0;
 if(!existing||existing<now-1000||existing>now+6000)p.locationAutoDue=now+(restoring?2400:2800);
 const remaining=Math.max(180,Math.min(3000,p.locationAutoDue-now));
 if(locationTimer&&locationTimerDue===p.locationAutoDue)return;
 clearTimeout(locationTimer);locationTimerDue=p.locationAutoDue;
 locationTimer=setTimeout(enterBuildingAutomatically,remaining);
 save()
}
function locationMode(){
 clearTimeout(titleTimer);titleTimer=0;clearLocationTimer();titleTransitioning=false;
 const p=ensurePhaseTitleState();if(!p)return;
 p.phaseTitleSeen=true;p.stage="location";
 const screen=$("#"+LOCATION);screen?.classList.remove("phase-title-mode","phase-title-enter","phase-title-exit");screen?.classList.add("location-card-mode");
 const button=locationButton();if(button){button.hidden=true;button.setAttribute("aria-hidden","true");button.tabIndex=-1}
 p.locationAutoDue=Date.now()+2800;
 setCheckpoint("ch4_phase4_location");syncProgress();scheduleAudioSync();scheduleLocationAdvance(false);save()
}
function presentPhaseTitle(fromRestore=false){
 const p=ensurePhaseTitleState();if(!p||p.phaseTitleSeen||titleTransitioning)return;
 titleTransitioning=true;clearLocationTimer();p.approachComplete=true;p.locationAutoDue=0;p.stage="location";
 if(gs()){gs().chapter=4;gs().screen=LOCATION}
 showScreen(LOCATION);
 const screen=$("#"+LOCATION);screen?.classList.remove("location-card-mode","phase-title-exit");screen?.classList.add("phase-title-mode","phase-title-enter");
 updateTitleLanguage();setCheckpoint("ch4_phase4_location");syncProgress();scheduleAudioSync();
 titleTimer=setTimeout(()=>{screen?.classList.remove("phase-title-enter");screen?.classList.add("phase-title-exit");titleTimer=setTimeout(locationMode,420)},fromRestore?2100:2400)
}
function finishVehicle(event){
 if(event){event.preventDefault?.();event.stopPropagation?.();event.stopImmediatePropagation?.()}
 const p=ensurePhaseTitleState();if(!p||(p.approachComplete&&p.phaseTitleSeen))return;
 clearTimeout(titleTimer);titleTimer=0;clearLocationTimer();titleTransitioning=false;
 stopMedia($("#ch4P4ApproachVideo"),true);$("#ch4P4ApproachSkip")?.setAttribute("hidden","");$("#ch4P4VideoPlay")?.setAttribute("hidden","");
 p.approachComplete=true;p.phaseTitleSeen=false;p.stage="location";
 const approach=$("#"+APPROACH);approach?.classList.add("ch4-p4-cinematic-fade");
 setCheckpoint("ch4_phase4_location");syncProgress();
 setTimeout(()=>{approach?.classList.remove("ch4-p4-cinematic-fade");presentPhaseTitle(false)},520)
}
function recoverTitleOnRestore(){const p=ensurePhaseTitleState();if(active()!==LOCATION||!p?.approachComplete)return;if(!p.phaseTitleSeen){if(!titleTransitioning)presentPhaseTitle(true);return}const screen=$("#"+LOCATION);screen?.classList.remove("phase-title-mode","phase-title-enter","phase-title-exit");screen?.classList.add("location-card-mode");const button=locationButton();if(button){button.hidden=true;button.setAttribute("aria-hidden","true");button.tabIndex=-1}scheduleLocationAdvance(true)}

/* Established Save/Menu HUD. Cards and videos intentionally remain cinematic. */
function hudMarkup(labelId){return `<div class="topbar ch4-p4-topbar"><span id="${labelId}"></span><div class="hud"><button class="icon saveButton ch4-p4-save" type="button" aria-label="Save game">💾</button><button class="icon menuButton ch4-p4-menu" type="button" aria-label="Open game menu">☰<i class="journal-alert" aria-hidden="true"></i></button></div></div>`}
function updateHUDLanguage(){
 const stair=$("#ch4P4StairTopbar"),workshop=$("#ch4P4WorkshopTopbar");
 if(stair)stair.textContent=tr("EAST JAKARTA · SURYA ELEKTRONIK","จาการ์ตาตะวันออก · SURYA ELEKTRONIK");
 if(workshop)workshop.textContent=tr("EAST JAKARTA · SURYA ELEKTRONIK","จาการ์ตาตะวันออก · SURYA ELEKTRONIK");
 $$(".ch4-p4-save").forEach(button=>button.setAttribute("aria-label",tr("Save game","บันทึกเกม")));
 $$(".ch4-p4-menu").forEach(button=>button.setAttribute("aria-label",tr("Open game menu","เปิดเมนูเกม")))
}
function openManualSave(){try{if(typeof manualSave==="function"){manualSave();return}window.LastWitnessSaveManager?.open?.("save")}catch(error){console.error("LAST WITNESS Phase IV save open failed",error)}}
function openMenu(){try{window.LastWitnessContentRegistry?.updateVisibility?.();window.LastWitnessContentRegistry?.updateDots?.();$("#drawer")?.classList.add("open")}catch(error){console.error("LAST WITNESS Phase IV menu open failed",error)}}
function bindHUD(){
 $$(".ch4-p4-save").forEach(button=>{if(button.dataset.lwP4HudBound==="1")return;button.dataset.lwP4HudBound="1";button.addEventListener("click",event=>{event.preventDefault();event.stopPropagation();openManualSave()},true)});
 $$(".ch4-p4-menu").forEach(button=>{if(button.dataset.lwP4HudBound==="1")return;button.dataset.lwP4HudBound="1";button.addEventListener("click",event=>{event.preventDefault();event.stopPropagation();openMenu()},true)});
 try{window.LastWitnessContentRegistry?.updateDots?.()}catch(_){}
}
function installHUD(){
 const stair=$("#"+STAIRWELL),workshop=$("#"+WORKSHOP);
 if(stair&&!$(".ch4-p4-topbar",stair))stair.insertAdjacentHTML("afterbegin",hudMarkup("ch4P4StairTopbar"));
 if(workshop&&!$(".ch4-p4-topbar",workshop))workshop.insertAdjacentHTML("afterbegin",hudMarkup("ch4P4WorkshopTopbar"));
 updateHUDLanguage();bindHUD()
}

/* Progress keeps the established lower-right pill and pure-gold fill. */
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
function installProgress(){for(const id of SCREENS){const screen=$("#"+id);if(screen&&!$(".ch4-p4-progress",screen))screen.insertAdjacentHTML("beforeend",progressMarkup())}syncProgress()}

/* Phase IV score raised toward Phase II-III while preserving dialogue/video priority. */
function dialogueVisible(){return Boolean($(".ch4-p4-dialogue:not(.hidden)"))}
function overlayVisible(){return Boolean($("#ch4P4Triad.open,#ch4P4Choice.open,#ch4P4Cache.open"))}
function scoreTarget(){
 const s=gs(),screen=active();if(!s||s.sound===false||!SCREENS.has(screen)||Number(s.music??.33)<=0)return 0;
 const music=clamp(Number(s.music??.33)),dialogueDuck=dialogueVisible()?.58:1,overlayDuck=overlayVisible()?.66:1,videoDuck=screen===REVEAL?.19:(screen===APPROACH?.78:1),completeLift=screen===COMPLETE?.88:1;
 return clamp(music*.43*dialogueDuck*overlayDuck*videoDuck*completeLift,0,.44)
}
function fadeScore(target,duration=320){
 const media=$("#ch4P4Score");if(!media)return;if(audioFrame)cancelAnimationFrame(audioFrame);
 const start=clamp(media.volume),end=clamp(target,0,.9),began=performance.now();
 if(end>0&&media.paused){media.loop=true;media.muted=false;media.play().catch(()=>{})}
 const step=now=>{const q=Math.max(0,Math.min(1,(now-began)/duration)),smooth=q*q*(3-2*q);media.volume=start+(end-start)*smooth;if(q<1)audioFrame=requestAnimationFrame(step);else{audioFrame=0;if(end===0)media.pause()}};
 audioFrame=requestAnimationFrame(step)
}
function syncAudio(){if(!SCREENS.has(active())){stopMedia($("#ch4P4Score"),active()==="title");return}fadeScore(scoreTarget(),active()===COMPLETE?460:320)}
function scheduleAudioSync(){clearTimeout(audioTimer);audioTimer=setTimeout(syncAudio,540);setTimeout(syncAudio,80);setTimeout(syncAudio,820);setTimeout(syncAudio,1360)}

/* Match the existing Journal contract: unlock after Arman's first verified dialogue ends. */
function armanStoryUnlockReady(){
 const p=phase(),stage=String(p?.stage||"");
 return Boolean(p?.revealComplete&&!['proxy-reveal','reveal','arman-intro'].includes(stage))
}
function installArmanUnlockGate(){
 const api=window.LastWitnessContentRegistry;if(!api?.unlockCharacter)return false;
 if(api.unlockCharacter.__lwP4ArmanGate===BUILD)return true;
 registryUnlockOriginal=api.unlockCharacter.bind(api);
 const wrapped=function(id,opt={}){
  if(id==="arman"&&opt?.source==="story"&&!armanStoryUnlockReady()){
   armanUnlockDeferred=true;
   return false
  }
  return registryUnlockOriginal(id,opt)
 };
 wrapped.__lwP4ArmanGate=BUILD;api.unlockCharacter=wrapped;return true
}
function releaseDeferredArman(){
 const s=gs(),p=phase(),api=window.LastWitnessContentRegistry;if(!s||!p||!api?.characters?.arman||!armanStoryUnlockReady())return false;
 if(Array.isArray(s.lwCharactersUnlocked)&&s.lwCharactersUnlocked.includes("arman")){armanUnlockDeferred=false;try{api.updateDots?.()}catch(_){};return false}
 if(!registryUnlockOriginal&&!installArmanUnlockGate())return false;
 const fresh=registryUnlockOriginal("arman",{unread:true,source:"story"});
 armanUnlockDeferred=false;
 if(fresh===false)try{api.renderCharacters?.(true)}catch(_){}
 try{api.updateDots?.()}catch(_){};save();return Boolean(fresh)
}



/* Dialogue portraits use curated alpha assets and an accepted North fallback. */
function absoluteURL(value){try{return new URL(value,document.baseURI).href}catch(_){return String(value||"")}}
function acceptedNorthPortrait(){try{return typeof portrait==="function"?portrait("North","neutral"):""}catch(_){return""}}
function versionedPortrait(kind,current){
 const match=String(current||"").match(/\/phase-04\/(dimas|arman)\/([^?]+\.png)/i);if(!match)return"";
 return PORTRAIT_BASE+match[1].toLowerCase()+"/"+match[2]+"?v="+PORTRAIT_VERSION
}
function normalizePortraits(){
 const api=window.LastWitnessContentRegistry;
 if(api?.characters?.arman){
  const journalSrc=PORTRAIT_BASE+"arman/profile.png?v="+PORTRAIT_VERSION;
  if(api.characters.arman.src!==journalSrc){api.characters.arman.src=journalSrc;try{api.renderCharacters?.(true)}catch(_){}}
 }
 $$(".ch4-p4-dialogue").forEach(box=>{
  const img=$("img.portrait",box);if(!img)return;
  const speaker=String($(".speaker",box)?.textContent||"").toLowerCase();let desired="";
  if(speaker.startsWith("north")||speaker.includes("นอร์ธ")){desired=acceptedNorthPortrait();img.classList.add("north-portrait")}
  else if(speaker.includes("maya")){img.classList.add("maya-portrait")}
  else if(speaker.includes("dimas")){desired=versionedPortrait("dimas",img.getAttribute("src"));img.classList.add("dimas-portrait")}
  else if(speaker.includes("arman")){desired=versionedPortrait("arman",img.getAttribute("src"));img.classList.add("arman-portrait")}
  if(desired&&absoluteURL(img.getAttribute("src"))!==absoluteURL(desired))img.setAttribute("src",desired);
  if(desired){img.classList.add("ch4-p4-portrait-verified");img.onerror=()=>{if(img.dataset.lwP4Fallback==="1")return;img.dataset.lwP4Fallback="1";if(speaker.includes("dimas"))img.src=PORTRAIT_BASE+"dimas/neutral.png?v="+PORTRAIT_VERSION;else if(speaker.includes("arman"))img.src=PORTRAIT_BASE+"arman/neutral.png?v="+PORTRAIT_VERSION}}
 })
}

function updateLanguage(){updateTitleLanguage();updateHUDLanguage();bindHUD();normalizePortraits();try{window.LastWitnessContentRegistry?.updateDots?.()}catch(_){} }
function upgradeMarkup(){
 const approach=$("#"+APPROACH),location=$("#"+LOCATION),reveal=$("#"+REVEAL);
 $(".ch4-p4-video-title",approach)?.remove();$$(".ch4-p4-video-shade",approach).forEach(node=>node.remove());$$(".ch4-p4-video-shade",reveal).forEach(node=>node.remove());
 if(location&&!$(".ch4-p4-phase-title-card",location))location.insertAdjacentHTML("afterbegin",'<div class="ch4-p4-phase-title-card" aria-live="polite"><div id="ch4P4PhaseTitleEye" class="eyebrow"></div><h2 id="ch4P4PhaseTitleText"></h2><div class="ch4-p4-phase-rule"></div></div>');
 const locationContinue=locationButton();if(locationContinue){locationContinue.hidden=true;locationContinue.setAttribute("aria-hidden","true");locationContinue.tabIndex=-1}
 installHUD();installProgress();updateLanguage();bindCinematicControls();normalizePortraits();syncProgress();scheduleAudioSync()
}
function bindCinematicControls(){
 const skip=$("#ch4P4ApproachSkip"),video=$("#ch4P4ApproachVideo"),returnButton=$("#ch4P4ReturnTitle");
 if(skip&&skip.dataset.lwP4RevisionBound!==BUILD){skip.dataset.lwP4RevisionBound=BUILD;skip.addEventListener("click",finishVehicle,true)}
 if(video&&video.dataset.lwP4RevisionBound!==BUILD){video.dataset.lwP4RevisionBound=BUILD;video.addEventListener("ended",finishVehicle,true);video.addEventListener("error",finishVehicle,true)}
 if(returnButton&&returnButton.dataset.lwP4RevisionBound!==BUILD){returnButton.dataset.lwP4RevisionBound=BUILD;returnButton.addEventListener("click",()=>{clearTimeout(titleTimer);clearLocationTimer();stopMedia($("#ch4P4Score"),true)},true)}
}
function setBuild(){const node=$("#settingsVersion");if(node&&SCREENS.has(active()))node.textContent="LAST WITNESS · BUILD "+BUILD}
function contractStatus(){
 const s=gs();return{
  hud:HUD_SCREENS.every(id=>Boolean($("#"+id+" .ch4-p4-topbar .ch4-p4-save")&&$("#"+id+" .ch4-p4-topbar .ch4-p4-menu"))),
  progress:[...SCREENS].every(id=>Boolean($("#"+id+" .ch4-p4-progress"))),
  armanRegistered:Boolean(window.LastWitnessContentRegistry?.characters?.arman),
  armanUnlocked:Boolean(s?.lwCharactersUnlocked?.includes?.("arman")),
  armanUnread:Boolean(s?.lwCharactersUnread?.includes?.("arman")),
  settingsAvailable:Boolean($("#settingsButton")&&!$("#settingsButton").disabled),
  saveAvailable:Boolean(typeof manualSave==="function"||window.LastWitnessSaveManager?.open),
  portraitsVerified:$$('.ch4-p4-dialogue img.portrait').every(img=>img.classList.contains('ch4-p4-portrait-verified')||!img.closest('.ch4-p4-dialogue:not(.hidden)')),
  devPhases:Array.isArray(window.LastWitnessDeveloperPhaseNavigation?.phases)?window.LastWitnessDeveloperPhaseNavigation.phases.map(item=>item.phase):[],
  locationAutoAdvance:Boolean(locationButton()?.hidden&&phase()?.phaseTitleSeen),
  mayaPortraitClean:$$('.ch4-p4-dialogue img.maya-portrait').every(img=>getComputedStyle(img).clipPath!=="none")
 }
}
function syncRuntime(){upgradeMarkup();recoverTitleOnRestore();releaseDeferredArman();normalizePortraits();syncProgress();scheduleAudioSync();if(active()==="title")stopMedia($("#ch4P4Score"),true);if(SCREENS.has(active()))setBuild()}
function installObservers(){
 const queue=()=>{requestAnimationFrame(syncRuntime)};
 for(const id of SCREENS){const screen=$("#"+id);if(screen)new MutationObserver(queue).observe(screen,{attributes:true,attributeFilter:["class"]})}
 const dialogue=$("#"+WORKSHOP+"Dialogue");if(dialogue)new MutationObserver(queue).observe(dialogue,{attributes:true,attributeFilter:["class"],childList:true,subtree:true});
 document.addEventListener("click",()=>{setTimeout(syncRuntime,20);setTimeout(syncRuntime,380)},true);
 document.addEventListener("visibilitychange",()=>{if(document.hidden){clearLocationTimer();stopMedia($("#ch4P4Score"),false)}else{recoverTitleOnRestore();scheduleLocationAdvance(true);scheduleAudioSync()}});
 document.addEventListener("click",event=>{if(event.target.closest?.("[data-lang]"))setTimeout(updateLanguage,0);if(event.target.closest?.("#developerMenuButton,#settingsVersion"))setTimeout(()=>window.LastWitnessDeveloperPhaseNavigation?.install?.(),0)},true);
 $("#musicRange")?.addEventListener("input",scheduleAudioSync,true);$("#soundToggle")?.addEventListener("change",scheduleAudioSync,true)
}
function bind(){
 installArmanUnlockGate();upgradeMarkup();installObservers();recoverTitleOnRestore();releaseDeferredArman();setBuild();
 window.LastWitnessChapter4Phase4Revision={installed:true,version:BUILD,syncProgress,syncAudio,releaseDeferredArman,normalizePortraits,audioTarget:scoreTarget,contractStatus}
}

if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",bind,{once:true});else bind();
})();
