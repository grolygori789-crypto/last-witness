/* LAST WITNESS — Chapter IV Phase III Direct Handoff 0.17.0-d2
 * Removes the Phase III completion-card interruption and routes directly from
 * Packet Trail completion into the Phase IV vehicle approach.
 * No Phase IV visual, dialogue, portrait or audio implementation is changed.
 */
(function(){
"use strict";
const VERSION="0.17.0-d2";
const COMPLETE="jakartaPacketProvenanceComplete";
const APPROACH="armanVehicleApproach";
if(window.LastWitnessPhase3DirectHandoff?.version===VERSION)return;

const $=(selector,root=document)=>root.querySelector(selector);
const gs=()=>{try{return state}catch(_){return window.state||null}};
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
let routing=false;

function installHiddenCardGuard(){
 if($("#lwCh4P3DirectHandoffStyle"))return;
 const style=document.createElement("style");style.id="lwCh4P3DirectHandoffStyle";
 style.textContent=`#${COMPLETE}{display:none!important}`;
 document.head.appendChild(style)
}
async function waitForPhase4(timeout=5000){
 const began=performance.now();
 while(performance.now()-began<timeout){
  if(typeof window.LastWitnessChapter4Phase4?.startFromPhase3==="function")return window.LastWitnessChapter4Phase4;
  await sleep(40)
 }
 throw new Error("Chapter IV Phase IV runtime unavailable")
}
async function routeToPhase4(){
 if(routing)return true;routing=true;
 try{
  $("#"+COMPLETE)?.classList.remove("active");
  const api=await waitForPhase4();
  const result=api.startFromPhase3();
  if(result===false)throw new Error("Phase IV rejected the Phase III handoff state");
  const began=performance.now();
  while(performance.now()-began<2500){
   const s=gs(),screen=$(".screen.active")?.id||s?.screen||"";
   if(screen===APPROACH&&s?.chapter4?.phase4?.started)return true;
   await sleep(40)
  }
  throw new Error("Phase IV vehicle approach did not become active")
 }catch(error){
  console.error("LAST WITNESS Phase III direct handoff failed",error);
  return false
 }finally{routing=false}
}
function installShowBridge(){
 if(window.__lwCh4P3DirectShowBridge0170d2)return;
 const base=typeof show==="function"?show:window.show;if(typeof base!=="function")return;
 const wrapped=function(screen){
  if(screen===COMPLETE){void routeToPhase4();return}
  return base.apply(this,arguments)
 };
 try{show=wrapped}catch(_){}window.show=wrapped;
 window.__lwCh4P3DirectShowBridge0170d2=true
}
function rescueCompletedState(){
 const s=gs(),card=$("#"+COMPLETE);
 if(s?.chapter4?.phase3?.complete&&(s.screen===COMPLETE||card?.classList.contains("active"))){void routeToPhase4()}
}
function install(){installHiddenCardGuard();installShowBridge();rescueCompletedState();return true}

window.LastWitnessPhase3DirectHandoff={version:VERSION,installed:true,install,routeToPhase4};
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",install,{once:true});else install();
})();
