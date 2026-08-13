/* LAST WITNESS - Chapter IV Phase VIII Playable Scene Repair 0.21.3
 * Purpose: mirror the proven Phase VII/Phase V scene shell after the P8 location card.
 * No story, relationship, hidden-case, minigame or evidence logic is changed here.
 */
(function(){
"use strict";
const VERSION="0.21.3";
if(window.LastWitnessPhase8SceneRepair?.version===VERSION)return;
const OPENING="shadowTruthOpening",LOCATION="shadowTruthLocationCard",DEBRIEF="shadowTruthDebrief",DEPARTURE="shadowTruthDeparture";
let recovering=false,observer=null,locationTimer=0,debriefTimer=0;
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const gs=()=>{try{return state}catch(_){return window.state||null}};

function add(node,...classes){if(node)node.classList.add(...classes)}
function applyPhase7Shell(){
 const debrief=$("#"+DEBRIEF),departure=$("#"+DEPARTURE);
 [debrief,departure].forEach(scene=>{
  if(!scene)return;
  add(scene,"ch4-p5-scene");
  const shade=scene.querySelector(".ch4-p8-shade");add(shade,"ch4-p5-shade");
  const label=scene.querySelector(".ch4-p8-label");add(label,"ch4-p5-label");
  const objective=scene.querySelector(".ch4-p8-objective");add(objective,"ch4-p5-objective");
  const dialogue=scene.querySelector(".ch4-p8-dialogue");add(dialogue,"ch4-p5-dialogue");
  const action=scene.querySelector(".ch4-p8-action");add(action,"ch4-p5-action");
  const progress=scene.querySelector(".ch4-p8-progress");add(progress,"ch4-p5-progress");
  const fill=scene.querySelector(".ch4-p8-progress-fill");add(fill,"ch4-p5-progress-fill");
 });
 const loc=$("#"+LOCATION+" .ch4-p4-location-card");add(loc,"ch4-p5-card-enter");
}

function installHardLayoutGuard(){
 if($("#lwP8SceneRepairStyle"))return;
 const style=document.createElement("style");
 style.id="lwP8SceneRepairStyle";
 style.textContent=`
#${DEBRIEF},#${DEPARTURE}{background:#040609;color:#f5eee4}
#${DEBRIEF}.active,#${DEPARTURE}.active{display:block!important}
#${DEBRIEF}>.scene,#${DEPARTURE}>.scene{display:block!important;position:absolute!important;inset:0!important;width:100%!important;height:100%!important;object-fit:cover!important;opacity:1!important;visibility:visible!important}
#${DEBRIEF}>.ch4-p8-shade,#${DEPARTURE}>.ch4-p8-shade{position:absolute!important;inset:0!important}
#${DEBRIEF}.active .topbar,#${DEPARTURE}.active .topbar{display:flex!important;visibility:visible!important;opacity:1!important}
#${DEBRIEF}.active .ch4-p8-label,#${DEBRIEF}.active .ch4-p8-objective,#${DEPARTURE}.active .ch4-p8-label,#${DEPARTURE}.active .ch4-p8-objective{visibility:visible!important;opacity:1!important}
`;
 document.head.appendChild(style);
}

function activate(id){
 const target=$("#"+id);if(!target)return false;
 $$(".screen.active").forEach(n=>{if(n!==target)n.classList.remove("active")});
 target.classList.add("active");
 const s=gs();if(s)s.screen=id;
 return true;
}
function saveSoft(){try{typeof autoSave==="function"&&autoSave()}catch(_){}}

function recoverDebrief(reason){
 if(recovering)return;
 const s=gs(),p=s?.chapter4?.phase8,api=window.LastWitnessChapter4Phase8;
 if(!s||!p||!api?.resumeFromState)return;
 if(p.complete||p.stage==="departure"||p.stage==="takeoff"||p.stage==="complete")return;
 recovering=true;
 applyPhase7Shell();installHardLayoutGuard();
 p.started=true;p.openingSeen=true;p.titleSeen=true;p.locationSeen=true;p.stage="debrief";
 s.chapter=4;s.checkpoint="ch4_phase8_debrief";
 activate(DEBRIEF);saveSoft();
 console.warn("LAST WITNESS P8 scene repair: recovering playable debrief",reason||"");
 setTimeout(()=>{
  try{api.resumeFromState()}catch(error){console.error("LAST WITNESS P8 scene recovery failed",error)}
  setTimeout(()=>{recovering=false;verifyDebrief("post-resume")},500);
 },80);
}

function verifyDebrief(reason){
 const s=gs(),p=s?.chapter4?.phase8,screen=$("#"+DEBRIEF),dialogue=$("#"+DEBRIEF+"Dialogue");
 if(!p||p.complete)return;
 if(screen?.classList.contains("active")){
  applyPhase7Shell();
  const image=screen.querySelector(".scene");
  if(image){image.style.display="block";image.style.opacity="1";image.style.visibility="visible"}
  if(!p.debriefIntroComplete&&dialogue?.classList.contains("hidden")){
   clearTimeout(debriefTimer);
   debriefTimer=setTimeout(()=>{
    if(!p.debriefIntroComplete&&$("#"+DEBRIEF)?.classList.contains("active")&&$("#"+DEBRIEF+"Dialogue")?.classList.contains("hidden")) recoverDebrief(reason||"dialogue-not-started");
   },1200);
  }
 }
}

function watchLocation(){
 clearTimeout(locationTimer);
 const s=gs(),p=s?.chapter4?.phase8;
 if(!p)return;
 if($("#"+LOCATION)?.classList.contains("active")||s?.screen===LOCATION||p.stage==="location"){
  locationTimer=setTimeout(()=>{
   const now=gs(),pp=now?.chapter4?.phase8;
   if(!pp||pp.complete)return;
   const activeId=$(".screen.active")?.id||now.screen||"";
   if(activeId===LOCATION||pp.stage==="location")recoverDebrief("location-card-timeout");
  },3200);
 }
}

function check(){
 applyPhase7Shell();installHardLayoutGuard();
 const s=gs(),p=s?.chapter4?.phase8;if(!s||!p)return;
 const activeId=$(".screen.active")?.id||s.screen||"";
 if(activeId===LOCATION||p.stage==="location")watchLocation();
 if(activeId===DEBRIEF||p.stage==="debrief")verifyDebrief("active-debrief");
 // Recover saves that were stranded in P8 after the location card.
 if(Number(s.chapter)===4&&p.started&&!p.complete&&["debrief","matrix","theory-choice","arman","ika","bangkok","bangkok-choice","registrar","closing"].includes(p.stage)&&![DEBRIEF,DEPARTURE].includes(activeId)){
  recoverDebrief("stranded-p8-state");
 }
}

function install(){
 applyPhase7Shell();installHardLayoutGuard();
 const root=$("#game")||document.body;
 observer=new MutationObserver(()=>queueMicrotask(check));
 observer.observe(root,{subtree:true,childList:true,attributes:true,attributeFilter:["class"]});
 document.addEventListener("lw-state-restored",()=>setTimeout(check,60));
 document.addEventListener("visibilitychange",()=>{if(!document.hidden)setTimeout(check,80)});
 setTimeout(check,0);setTimeout(check,500);setTimeout(check,3500);
 return true;
}
window.LastWitnessPhase8SceneRepair={version:VERSION,installed:true,install,applyPhase7Shell,recoverDebrief,check};
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",install,{once:true});else install();
})();
