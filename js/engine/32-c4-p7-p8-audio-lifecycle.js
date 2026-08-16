/* LAST WITNESS - Chapter IV Phase VII/VIII Audio Lifecycle Patch 0.22.7-a1
 * Surgical foreground/background audio continuity only.
 * Scope: Phase VII + Phase VIII continuous music/ambience and active phase videos.
 * No state, Save, checkpoint, Hidden Case, dialogue, progress, minigame or routing mutation.
 */
(function(){
"use strict";
const VERSION="0.22.7-a1";
if(window.LastWitnessC4AudioLifecyclePatch?.version===VERSION&&window.LastWitnessC4AudioLifecyclePatch?.installed)return;

const P7_SCREENS=new Set([
 "relayFacilityOpening","relayFacilityPhase7Card","relayFacilityLocationCard","relayFacilityExterior",
 "relayFacilityCorridor","relayFacilityCore","relayFacilityClimax","relayFacilityPostClimax","relayFacilityPhase7Complete"
]);
const P8_SCREENS=new Set([
 "shadowTruthOpening","shadowTruthLocationCard","shadowTruthDebrief",
 "shadowTruthDeparture","shadowTruthTakeoff","shadowTruthComplete"
]);
const P7_MEDIA=[
 "ch4P7MainMusic","ch4P7ClimaxMusic","ch4P7ExteriorAmb","ch4P7CorridorAmb","ch4P7CoreAmb",
 "ch4P7OpeningVideo","ch4P7ClimaxVideo"
];
const P8_MEDIA=[
 "ch4P8InvestigationMusic","ch4P8TravelMusic","ch4P8RoomAmb","ch4P8RoomBase","ch4P8TakeoffAmb",
 "ch4P8OpeningVideo","ch4P8TakeoffVideo"
];
const P7_EXPECTED={
 ch4P7MainMusic:new Set(["relayFacilityLocationCard","relayFacilityExterior","relayFacilityCorridor","relayFacilityCore"]),
 ch4P7ClimaxMusic:new Set(["relayFacilityClimax","relayFacilityPostClimax"]),
 ch4P7ExteriorAmb:new Set(["relayFacilityExterior"]),
 ch4P7CorridorAmb:new Set(["relayFacilityCorridor"]),
 ch4P7CoreAmb:new Set(["relayFacilityCore","relayFacilityPostClimax"])
};

let backgrounded=false;
let backgroundFamily="";
let backgroundScreen="";
let snapshots=new Map();

function gs(){try{return state}catch(_){return window.state||null}}
function activeScreen(){return document.querySelector(".screen.active")?.id||gs()?.screen||""}
function familyFor(screen=activeScreen()){if(P7_SCREENS.has(screen))return"p7";if(P8_SCREENS.has(screen))return"p8";return""}
function soundEnabled(){return gs()?.sound!==false}
function mediaIds(family){return family==="p7"?P7_MEDIA:family==="p8"?P8_MEDIA:[]}
function finiteTime(media){const n=Number(media?.currentTime);return Number.isFinite(n)&&n>=0?n:0}
function expectedP7Playing(id,screen,media){return Boolean(P7_EXPECTED[id]?.has(screen)&&Number(media?.volume)>0&&soundEnabled())}
function shouldResume(family,id,screen,media){
 if(!media||media.ended)return false;
 if(!media.paused)return true;
 return family==="p7"&&expectedP7Playing(id,screen,media)
}
function restorePosition(media,time){try{if(Number.isFinite(time)&&Math.abs(finiteTime(media)-time)>.04)media.currentTime=time}catch(_){}}
function pauseCaptured(media,record){
 try{media.muted=true;media.pause();restorePosition(media,record.time)}catch(_){}
}
function captureBackground(){
 if(backgrounded)return false;
 const screen=activeScreen(),family=familyFor(screen);if(!family)return false;
 backgrounded=true;backgroundFamily=family;backgroundScreen=screen;snapshots=new Map();
 mediaIds(family).forEach(id=>{
  const media=document.getElementById(id);if(!media)return;
  const record={
   id,time:finiteTime(media),volume:Number.isFinite(Number(media.volume))?Number(media.volume):1,
   muted:Boolean(media.muted),playbackRate:Number.isFinite(Number(media.playbackRate))?Number(media.playbackRate):1,
   wasPlaying:shouldResume(family,id,screen,media)
  };
  snapshots.set(id,record);pauseCaptured(media,record)
 });
 return true
}
function restoreForeground(){
 if(!backgrounded||document.hidden)return false;
 const familyNow=familyFor(activeScreen()),sameFamily=familyNow===backgroundFamily;
 const saved=[...snapshots.values()];
 backgrounded=false;
 saved.forEach(record=>{
  const media=document.getElementById(record.id);if(!media)return;
  try{
   media.pause();restorePosition(media,record.time);media.volume=record.volume;media.playbackRate=record.playbackRate;media.muted=record.muted;
   if(sameFamily&&record.wasPlaying&&soundEnabled())media.play().catch(()=>{})
  }catch(_){}
 });
 backgroundFamily="";backgroundScreen="";snapshots.clear();
 return true
}
function guardBackgroundPlay(event){
 if(!backgrounded)return;
 const media=event.target,record=media?.id?snapshots.get(media.id):null;if(!record)return;
 pauseCaptured(media,record)
}
function queueForeground(){[0,60,180].forEach(ms=>setTimeout(()=>{if(!document.hidden)restoreForeground()},ms))}
function install(){
 document.addEventListener("play",guardBackgroundPlay,true);
 document.addEventListener("visibilitychange",()=>{if(document.hidden)captureBackground();else queueForeground()});
 window.addEventListener("pagehide",captureBackground);
 window.addEventListener("pageshow",queueForeground);
 window.addEventListener("focus",()=>{if(!document.hidden)queueForeground()});
 try{document.addEventListener("freeze",captureBackground);document.addEventListener("resume",queueForeground)}catch(_){}
 return true
}

window.LastWitnessC4AudioLifecyclePatch={
 version:VERSION,installed:true,install,
 captureBackground,restoreForeground,
 isBackgrounded:()=>backgrounded,
 scope:()=>backgroundFamily,
 screen:()=>backgroundScreen
};
install();
})();
