/* LAST WITNESS — Professional Investigation Lifecycle 0.8.0
 * Shared scene state for narrative-first investigation flow.
 * No polling, no MutationObserver and no additional audio owner.
 */
(function(){
"use strict";
if(window.__lwInvestigationLifecycle0711)return;
window.__lwInvestigationLifecycle0711=true;

const BUILD="0.8.0";
const $=(selector,root=document)=>root.querySelector(selector);
const $$=(selector,root=document)=>Array.from(root.querySelectorAll(selector));
const runtime=new Map();
const revealTimers=new Map();

function gameState(){try{return state;}catch(_){return window.state||null;}}
function stateFound(){const s=gameState();return s?.found&&typeof s.found.has==="function"?s.found:new Set();}
function flags(){const s=gameState();if(!s)return{};s.flags=s.flags||{};return s.flags;}
function arraySet(value){return new Set(Array.isArray(value)?value:[]);}
function saveQuietly(){try{if(typeof autoSave==="function")autoSave();}catch(_){} }
function isThai(){return gameState()?.language==="th"||document.documentElement.lang==="th";}

const SCENES={
 room1807:{
  screen:"crime",root:"#crime",hotspots:"[data-clue]",dialogue:"#crimeDialogue",
  ids:["phone","blood","laptop","suitcase"],
  intro:()=>flags().room1807_intro_complete===true,
  setIntro:value=>{flags().room1807_intro_complete=Boolean(value);},
  progress:()=>["phone","blood","laptop","suitcase","message","calls","note"].some(id=>stateFound().has(id)),
  complete:id=>id==="phone"?["message","calls","note"].every(key=>stateFound().has(key)):stateFound().has(id),
  feedback:()=>flags().room1807_scene_complete_feedback_0711===true,
  setFeedback:value=>{flags().room1807_scene_complete_feedback_0711=Boolean(value);},
  badge:null
 },
 apartment2:{
  screen:"apartment2",root:"#apartment2",hotspots:"[data-apt-clue]",dialogue:"#apartmentDialogue",
  ids:["apt_mug","apt_documents","apt_board","apt_laptop"],
  intro:()=>flags().apartment_intro_complete===true,
  setIntro:value=>{flags().apartment_intro_complete=Boolean(value);},
  progress:()=>["apt_mug","apt_documents","apt_board","apt_laptop"].some(id=>stateFound().has(id)),
  complete:id=>stateFound().has(id),
  feedback:()=>flags().apartment_scene_complete_feedback_0711===true,
  setFeedback:value=>{flags().apartment_scene_complete_feedback_0711=Boolean(value);},
  badge:{en:"Apartment investigation complete",th:"ตรวจสอบอพาร์ตเมนต์ครบแล้ว"}
 },
 forensic2:{
  screen:"forensic2",root:"#forensic2",hotspots:"[data-forensic-clue]",dialogue:"#forensicDialogue",
  ids:["sealed_sample","accession_record","audit_trace","batch_record"],
  intro:()=>Boolean(gameState()?.forensic?.introComplete),
  setIntro:value=>{const s=gameState();if(s){s.forensic=s.forensic||{};s.forensic.introComplete=Boolean(value);}},
  progress:()=>{const f=gameState()?.forensic||{};return arraySet(f.found).size>0||arraySet(f.collected).size>0||Boolean(f.compared||f.choice||f.complete);},
  complete:id=>arraySet(gameState()?.forensic?.collected).has(id),
  feedback:()=>Boolean(gameState()?.forensic?.sceneCompleteFeedback0711),
  setFeedback:value=>{const s=gameState();if(s){s.forensic=s.forensic||{};s.forensic.sceneCompleteFeedback0711=Boolean(value);}},
  badge:null
 },
 medical2:{
  screen:"medical2",root:"#medical2",hotspots:"[data-medical-clue]",dialogue:"#medicalDialogue",
  ids:["postmortem","identity_tag","autopsy_report","toxicology_sample"],
  intro:()=>Boolean(gameState()?.medical?.introComplete),
  setIntro:value=>{const s=gameState();if(s){s.medical=s.medical||{};s.medical.introComplete=Boolean(value);}},
  progress:()=>{const m=gameState()?.medical||{};return arraySet(m.inspected||m.found).size>0||arraySet(m.collected).size>0||Boolean(m.choice||m.complete);},
  complete:id=>arraySet(gameState()?.medical?.collected).has(id),
  feedback:()=>Boolean(gameState()?.medical?.sceneCompleteFeedback0711),
  setFeedback:value=>{const s=gameState();if(s){s.medical=s.medical||{};s.medical.sceneCompleteFeedback0711=Boolean(value);}},
  badge:null
 }
};

function scene(key){return SCENES[key]||Object.values(SCENES).find(item=>item.screen===key)||null;}
function rootOf(config){return config?$(config.root):null;}
function hotspotId(config,node){return node?.dataset?.clue||node?.dataset?.aptClue||node?.dataset?.forensicClue||node?.dataset?.medicalClue||"";}
function hotspots(config){
 const root=rootOf(config);if(!root)return[];
 return $$(config.hotspots,root).map((node,index)=>{
  node.classList.add("lw-investigation-hotspot");
  node.style.setProperty("--lw-investigation-order",String(index));
  return node;
 });
}
function allComplete(config){return Boolean(config&&config.ids.length&&config.ids.every(id=>config.complete(id)));}

function preserveAttribute(node,name,dataName){
 if(Object.prototype.hasOwnProperty.call(node.dataset,dataName))return;
 const value=node.getAttribute(name);
 node.dataset[dataName]=value===null?"__none__":value;
}
function restoreAttribute(node,name,dataName){
 const value=node.dataset[dataName];
 if(value===undefined)return;
 if(value==="__none__")node.removeAttribute(name);else node.setAttribute(name,value);
}
function setLocked(key,locked,{animate=false}={}){
 const config=scene(key),root=rootOf(config);if(!config||!root)return false;
 const nodes=hotspots(config);
 root.classList.toggle("lw-investigation-locked",locked);
 root.classList.toggle("lw-investigation-ready",!locked);
 root.dataset.investigationStage=locked?"intro_locked":"investigation_ready";
 nodes.forEach(node=>{
  preserveAttribute(node,"tabindex","lwInvestigationTabindex");
  preserveAttribute(node,"aria-hidden","lwInvestigationAriaHidden");
  preserveAttribute(node,"aria-disabled","lwInvestigationAriaDisabled");
  if(!Object.prototype.hasOwnProperty.call(node.dataset,"lwInvestigationDisabled"))node.dataset.lwInvestigationDisabled=node.disabled?"1":"0";
  if(locked){node.disabled=true;node.setAttribute("aria-disabled","true");node.setAttribute("aria-hidden","true");node.setAttribute("tabindex","-1");}
  else{
   node.disabled=node.dataset.lwInvestigationDisabled==="1";
   restoreAttribute(node,"aria-disabled","lwInvestigationAriaDisabled");
   restoreAttribute(node,"aria-hidden","lwInvestigationAriaHidden");
   restoreAttribute(node,"tabindex","lwInvestigationTabindex");
  }
 });
 clearTimeout(revealTimers.get(config.screen));
 root.classList.remove("lw-investigation-revealing");
 if(!locked&&animate&&root.classList.contains("active")){
  void root.offsetWidth;root.classList.add("lw-investigation-revealing");
  revealTimers.set(config.screen,setTimeout(()=>root.classList.remove("lw-investigation-revealing"),900));
 }
 return true;
}

function sync(key,{emitCompletion=false}={}){
 const config=scene(key),root=rootOf(config);if(!config||!root)return{complete:false};
 const nodes=hotspots(config);
 nodes.forEach(node=>{
  const done=config.complete(hotspotId(config,node));
  node.classList.toggle("found",done);
  node.classList.toggle("lw-investigation-complete",done);
 });
 const done=allComplete(config);
 root.classList.toggle("lw-investigation-scene-complete",done);
 const current=runtime.get(config.screen)||{prepared:false,lastComplete:null,pendingIntro:false};
 if(emitCompletion&&current.prepared&&current.lastComplete===false&&done&&!config.feedback()){
  config.setFeedback(true);
  if(config.badge&&typeof showBadge==="function")try{showBadge(isThai()?config.badge.th:config.badge.en);}catch(_){}
  saveQuietly();
 }
 current.lastComplete=done;runtime.set(config.screen,current);
 return{complete:done};
}

function prepare(key,{animate=false}={}){
 const config=scene(key);if(!config)return{introComplete:true,complete:false};
 const progressed=config.progress();
 let introComplete=config.intro();
 if(progressed&&!introComplete){config.setIntro(true);introComplete=true;}
 setLocked(config.screen,!introComplete,{animate:introComplete&&animate});
 const status=sync(config.screen,{emitCompletion:false});
 if(status.complete&&!config.feedback())config.setFeedback(true);
 runtime.set(config.screen,{prepared:true,lastComplete:status.complete,pendingIntro:!introComplete});
 return{introComplete,complete:status.complete};
}
function completeIntro(key){
 const config=scene(key);if(!config)return;
 config.setIntro(true);setLocked(config.screen,false,{animate:true});
 const current=runtime.get(config.screen)||{};current.prepared=true;current.pendingIntro=false;current.lastComplete=allComplete(config);runtime.set(config.screen,current);
 sync(config.screen,{emitCompletion:false});saveQuietly();
}
function evidenceChanged(key){return sync(key,{emitCompletion:true});}
function reset(key){
 const config=scene(key),root=rootOf(config);if(!config||!root)return;
 config.setIntro(false);config.setFeedback(false);runtime.delete(config.screen);
 root.classList.remove("lw-investigation-ready","lw-investigation-revealing","lw-investigation-scene-complete");
 setLocked(config.screen,true,{animate:false});sync(config.screen,{emitCompletion:false});
}

function sceneForDialogue(container){
 if(!container)return null;
 return Object.values(SCENES).find(config=>container.matches?.(config.dialogue))||null;
}
function installDialogueCompletionBridge(){
 const original=window.runDialogue;
 if(typeof original!=="function"||original.__lwInvestigationLifecycle0711)return;
 const wrapped=function(container,lines,onComplete){
  const config=sceneForDialogue(container);
  const done=function(){
   if(typeof onComplete==="function")onComplete();
   const current=config&&runtime.get(config.screen);
   if(config&&current?.pendingIntro)completeIntro(config.screen);
  };
  return original.call(this,container,lines,config?done:onComplete);
 };
 wrapped.__lwInvestigationLifecycle0711=true;wrapped.__lwOriginal=original;window.runDialogue=wrapped;
}
function installShowBridge(){
 const original=window.show;
 if(typeof original!=="function"||original.__lwInvestigationLifecycle0711)return;
 const wrapped=function(screenName){
  const result=original.apply(this,arguments);
  const config=scene(screenName);if(config)prepare(config.screen,{animate:false});
  return result;
 };
 wrapped.__lwInvestigationLifecycle0711=true;wrapped.__lwOriginal=original;window.show=wrapped;
}
function installApartmentCollectionBridge(){
 const button=$("#collectApartmentEvidence"),original=window.collectApartmentEvidence;
 if(!button||typeof original!=="function"||original.__lwInvestigationLifecycle0711)return;
 const wrapped=function(){const result=original.apply(this,arguments);evidenceChanged("apartment2");return result;};
 wrapped.__lwInvestigationLifecycle0711=true;window.collectApartmentEvidence=wrapped;button.onclick=wrapped;
}
function installRoomAudioBridge(){
 const cue=window.LastWitnessAudioCue;if(!cue||cue.__lwInvestigationLifecycle0711)return;
 const collection=cue.playCollection,completion=cue.playCompletion;
 cue.playCollection=function(){try{collection?.apply(this,arguments);}finally{sync("crime",{emitCompletion:false});}};
 cue.playCompletion=function(){try{completion?.apply(this,arguments);}finally{evidenceChanged("crime");}};
 cue.__lwInvestigationLifecycle0711=true;
}
function installBuildBridge(){
 const label=$("#settingsVersion");if(label)label.textContent=`LAST WITNESS · BUILD ${BUILD}`;
 const original=window.snapshot;
 if(typeof original==="function"&&!original.__lwBuild0711){
  const wrapped=function(){const data=original.apply(this,arguments);if(data&&typeof data==="object")data.build=BUILD;return data;};
  wrapped.__lwBuild0711=true;window.snapshot=wrapped;
  if(window.LastWitnessSaveManager)window.LastWitnessSaveManager.snapshot=wrapped;
 }
 if(window.LastWitnessSaveManager){window.LastWitnessSaveManager.snapshot=window.snapshot;window.LastWitnessSaveManager.version=BUILD;}
}
function finalizeIntegration(){
 installDialogueCompletionBridge();installShowBridge();installApartmentCollectionBridge();installRoomAudioBridge();installBuildBridge();
 const active=$('.screen.active')?.id;if(scene(active))prepare(active,{animate:false});
}
function initialize(){
 Object.values(SCENES).forEach(config=>{hotspots(config);setLocked(config.screen,true,{animate:false});});
 window.LastWitnessInvestigationLifecycle={prepare,completeIntro,evidenceChanged,sync,setLocked,reset,version:BUILD};
 finalizeIntegration();
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",finalizeIntegration,{once:true});
 window.addEventListener("load",finalizeIntegration,{once:true});
}

initialize();
})();
