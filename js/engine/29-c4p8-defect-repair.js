/* LAST WITNESS - Chapter IV Phase VIII defect repair 0.22.1
 * Repairs Phase VII handoff pacing, Phase VIII music routing, portrait matte edges,
 * and return-flight presentation without changing story/case logic.
 */
(function(){
"use strict";
const VERSION="0.22.1";
if(window.LastWitnessC4P8DefectRepair?.version===VERSION)return;

const OPENING="shadowTruthOpening";
const TAKEOFF="shadowTruthTakeoff";
const COMPLETE="shadowTruthComplete";
const AUDIO_BASE="assets/audio/chapter-04/phase-08/";
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const stateRef=()=>{try{return state}catch(_){return window.state||null}};
const thai=()=>stateRef()?.language==="th"||document.documentElement.lang==="th";

let openingActive=false;
let openingGeneration=0;
let openingHold=false;
let openingTimers=[];
let takeoffActive=false;
let skipRequested=false;
let takeoffGuardUntil=0;
let takeoffRetryTimer=0;
let observer=null;
let languageBindingInstalled=false;

function clearOpeningTimers(){openingTimers.forEach(clearTimeout);openingTimers=[]}
function activeScreen(){return $(".screen.active")?.id||stateRef()?.screen||""}
function stopMedia(media,reset=false){if(!media)return;try{media.pause();if(reset)media.currentTime=0}catch(_){} }

function injectStyle(){
 if($("#lwC4P8DefectRepairStyle"))return;
 const style=document.createElement("style");
 style.id="lwC4P8DefectRepairStyle";
 style.textContent=`
 /* Phase VII -> VIII: black bridge reveals the opening poster before playback. */
 #${OPENING}{background:#000}
 #${OPENING} #ch4P8OpeningFadeCurtain{position:absolute;inset:0;z-index:6;pointer-events:none;background:#000;opacity:0;transition:opacity .88s cubic-bezier(.22,.61,.36,1)}
 #${OPENING}.lw-p8-opening-hold #ch4P8OpeningFadeCurtain{opacity:1}
 #${OPENING}.lw-p8-opening-reveal #ch4P8OpeningFadeCurtain{opacity:0}
 #${OPENING}.lw-p8-opening-hold video{filter:brightness(.90)}
 #${OPENING} #ch4P8OpeningSkip,#${OPENING} #ch4P8OpeningPlay{z-index:8}

 /* Crop only enough to push source-image white matte outside the accepted portrait frame. */
 .ch4-p8-dialogue .portrait-wrap{overflow:hidden!important}
 .ch4-p8-dialogue[data-p8-speaker="maya"] .portrait{object-position:50% 8%!important;transform:translateY(-2.4%) scale(1.235)!important;transform-origin:50% 12%!important}
 .ch4-p8-dialogue[data-p8-speaker="cheryl"] .portrait{object-position:45.5% 9%!important;transform:translateX(-4.2%) scale(1.215)!important;transform-origin:47% 12%!important}

 /* Return flight follows the proven Phase II contract. Video is unobstructed until ended/Skip. */
 #${TAKEOFF} .ch4-p8-progress{display:none!important}
 #${TAKEOFF} #ch4P8TakeoffRoute{opacity:0!important;visibility:hidden!important;transform:translateY(14px)!important;pointer-events:none!important}
 #${TAKEOFF} #ch4P8TakeoffRoute.show{opacity:1!important;visibility:visible!important;transform:none!important;pointer-events:auto!important}
 #${TAKEOFF} #ch4P8TakeoffTitle{white-space:nowrap!important;font-size:clamp(24px,7vw,40px)!important;letter-spacing:.025em!important}
 #${TAKEOFF} .ch4-p8-route-grid strong{white-space:nowrap!important;font-size:clamp(11px,3.35vw,14px)!important;line-height:1.35!important}
 #${TAKEOFF} #ch4P8TakeoffTime{max-width:42ch;margin-left:auto!important;margin-right:auto!important;overflow-wrap:normal!important;word-break:normal!important;text-wrap:balance}
 @media(max-width:360px){
  #${TAKEOFF} #ch4P8TakeoffTitle{font-size:23px!important}
  #${TAKEOFF} .ch4-p8-route-grid{gap:4px!important}
  #${TAKEOFF} .ch4-p8-route-grid strong{font-size:10.5px!important}
  #${TAKEOFF} #ch4P8TakeoffTime{font-size:10px!important}
 }
 `;
 document.head.appendChild(style)
}

function ensureOpeningCurtain(){
 const screen=$("#"+OPENING);if(!screen)return null;
 let curtain=$("#ch4P8OpeningFadeCurtain",screen);
 if(!curtain){curtain=document.createElement("div");curtain.id="ch4P8OpeningFadeCurtain";screen.appendChild(curtain)}
 return curtain
}

function replaceAudioSources(){
 const investigation=$("#ch4P8InvestigationMusic");
 const departure=$("#ch4P8TravelMusic");
 const replace=(media,file)=>{
  if(!media||media.dataset.lwP8Music0221===file)return;
  const wasPlaying=!media.paused,current=Number(media.currentTime)||0;
  try{media.pause()}catch(_){}
  media.innerHTML=`<source src="${AUDIO_BASE}${file}.mp3?v=0221" type="audio/mpeg">`;
  media.loop=true;media.dataset.lwP8Music0221=file;
  try{media.load();if(current>0)media.currentTime=current}catch(_){}
  if(wasPlaying&&[OPENING,"shadowTruthLocationCard","shadowTruthDebrief","shadowTruthDeparture",TAKEOFF,COMPLETE].includes(activeScreen()))media.play().catch(()=>{})
 };
 replace(investigation,"investigation-c4p8");
 replace(departure,"departure-c4p8")
}

function hardStopPhase8Music(){
 ["ch4P8InvestigationMusic","ch4P8TravelMusic","ch4P8RoomAmb","ch4P8RoomBase","ch4P8TakeoffAmb"].forEach(id=>stopMedia($("#"+id),true))
}

function prepareOpening(){
 const screen=$("#"+OPENING),video=$("#ch4P8OpeningVideo");if(!screen||!video)return;
 const generation=++openingGeneration;clearOpeningTimers();openingHold=true;
 ensureOpeningCurtain();
 screen.classList.remove("lw-p8-opening-reveal");screen.classList.add("lw-p8-opening-hold");
 try{video.pause();video.currentTime=0;video.muted=false}catch(_){}
 const guardPlay=()=>{if(openingHold&&activeScreen()===OPENING){try{video.pause();video.currentTime=0}catch(_){}}};
 if(video.dataset.lwP8OpeningGuard!=="1"){video.dataset.lwP8OpeningGuard="1";video.addEventListener("play",guardPlay)}
 /* A short black beat, then reveal the still frame. Playback starts only after full reveal. */
 openingTimers.push(setTimeout(()=>{
  if(generation!==openingGeneration||activeScreen()!==OPENING)return;
  screen.classList.add("lw-p8-opening-reveal");screen.classList.remove("lw-p8-opening-hold")
 },180));
 openingTimers.push(setTimeout(()=>{
  if(generation!==openingGeneration||activeScreen()!==OPENING)return;
  openingHold=false;
  screen.classList.remove("lw-p8-opening-hold");screen.classList.add("lw-p8-opening-reveal");
  try{video.muted=false;video.play().then(()=>$("#ch4P8OpeningPlay")?.setAttribute("hidden","")).catch(()=>$("#ch4P8OpeningPlay")?.removeAttribute("hidden"))}catch(_){$("#ch4P8OpeningPlay")?.removeAttribute("hidden")}
 },1080))
}

function cleanupOpening(){
 if(!openingActive)return;openingGeneration++;openingHold=false;clearOpeningTimers();
 const screen=$("#"+OPENING);screen?.classList.remove("lw-p8-opening-hold","lw-p8-opening-reveal")
}

function applyFlightCopy(){
 const route=$("#ch4P8TakeoffRoute");if(!route)return;
 const grid=route.querySelector(".ch4-p8-route-grid");
 const cells=grid?.querySelectorAll(":scope > div:not(.ch4-p8-route-arrow)")||[];
 if(cells[0]){const strong=cells[0].querySelector("strong");if(strong)strong.innerHTML="JAKARTA<br>18:10 WIB"}
 if(cells[1]){const strong=cells[1].querySelector("strong");if(strong)strong.innerHTML="BANGKOK<br>21:55 ICT"}
 const title=$("#ch4P8TakeoffTitle");if(title)title.textContent="JAKARTA → BANGKOK";
 const time=$("#ch4P8TakeoffTime");if(time)time.textContent=thai()?"เที่ยวบินตรง · 3 ชม. 45 นาที · ถึงกรุงเทพฯ 21:55 น. ICT · วันที่ 6":"Direct flight · 3 h 45 m · Bangkok ETA 21:55 ICT · Day 6";
 const status=$("#ch4P8FlightStatus");if(status)status.textContent=thai()?"เครื่องขึ้น · 18:10 WIB":"TAKEOFF · 18:10 WIB"
}

function applyPhase2FlightContract(){
 const screen=$("#"+TAKEOFF);if(!screen)return;
 screen.classList.add("ch4-p2-flight");
 $(".ch4-p8-flight-shade",screen)?.classList.add("ch4-p2-flight-shade");
 $(".ch4-p8-flight-head",screen)?.classList.add("ch4-p2-flight-head");
 $("#ch4P8TakeoffRoute",screen)?.classList.add("ch4-p2-flight-route");
 $(".ch4-p8-route-grid",screen)?.classList.add("ch4-p2-route-grid");
 $(".ch4-p8-route-arrow",screen)?.classList.add("ch4-p2-route-arrow");
 $("#ch4P8TakeoffSkip",screen)?.classList.add("ch4-p2-skip");
 $$(".ch4-p8-progress",screen).forEach(n=>n.remove());
 applyFlightCopy()
}

function recoverPrematureRoute(){
 const screen=$("#"+TAKEOFF),route=$("#ch4P8TakeoffRoute"),video=$("#ch4P8TakeoffVideo");
 if(!screen?.classList.contains("active")||!route?.classList.contains("show")||!video)return;
 if(skipRequested||video.ended||performance.now()>takeoffGuardUntil)return;
 /* Original Phase VIII falls back to the route card after a failed play attempt. Restore the Phase II behavior instead. */
 route.classList.remove("show");route.setAttribute("aria-hidden","true");
 const skip=$("#ch4P8TakeoffSkip");if(skip)skip.hidden=false;
 try{video.muted=true;video.playbackRate=1;video.play().catch(()=>{})}catch(_){}
}

function beginTakeoffGuard(){
 const video=$("#ch4P8TakeoffVideo"),route=$("#ch4P8TakeoffRoute"),skip=$("#ch4P8TakeoffSkip");
 skipRequested=false;takeoffGuardUntil=performance.now()+8000;
 route?.classList.remove("show");route?.setAttribute("aria-hidden","true");if(skip)skip.hidden=false;
 if(video){
  try{video.muted=true;video.playsInline=true;video.playbackRate=1;if(video.ended||video.currentTime>.35)video.currentTime=0;video.play().catch(()=>{})}catch(_){}
 }
 clearTimeout(takeoffRetryTimer);takeoffRetryTimer=setTimeout(recoverPrematureRoute,1350)
}

function installInteractions(){
 const skip=$("#ch4P8TakeoffSkip");
 if(skip&&skip.dataset.lwP8Guard0221!=="1"){
  skip.dataset.lwP8Guard0221="1";
  skip.addEventListener("click",()=>{skipRequested=true;takeoffGuardUntil=0},true)
 }
 const route=$("#ch4P8TakeoffRoute");
 if(route&&route.dataset.lwP8RouteGuard0221!=="1"){
  route.dataset.lwP8RouteGuard0221="1";
  new MutationObserver(()=>{applyFlightCopy();recoverPrematureRoute()}).observe(route,{attributes:true,attributeFilter:["class"]})
 }
 const ret=$("#ch4P8ReturnTitle");
 if(ret&&ret.dataset.lwP8Stop0221!=="1"){
  ret.dataset.lwP8Stop0221="1";
  ret.addEventListener("click",hardStopPhase8Music,true)
 }
 if(!languageBindingInstalled){
  languageBindingInstalled=true;
  document.addEventListener("click",event=>{
   if(event.target.closest?.("[data-lang]"))setTimeout(()=>{applyFlightCopy()},0)
  },true)
 }
}

function sync(){
 injectStyle();ensureOpeningCurtain();replaceAudioSources();applyPhase2FlightContract();installInteractions();
 const now=activeScreen();
 const isOpening=now===OPENING;
 if(isOpening&&!openingActive){openingActive=true;prepareOpening()}
 else if(!isOpening&&openingActive){cleanupOpening();openingActive=false}
 const isTakeoff=now===TAKEOFF;
 if(isTakeoff&&!takeoffActive){takeoffActive=true;beginTakeoffGuard()}
 else if(!isTakeoff&&takeoffActive){takeoffActive=false;skipRequested=false;takeoffGuardUntil=0;clearTimeout(takeoffRetryTimer)}
 if(now==="title")hardStopPhase8Music();
 if(isTakeoff)applyFlightCopy()
}

function install(){
 sync();
 if(observer)observer.disconnect();
 observer=new MutationObserver(()=>sync());
 observer.observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:["class"]});
 return true
}

window.LastWitnessC4P8DefectRepair={version:VERSION,installed:true,install,repair:sync};
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",install,{once:true});else install();
})();
