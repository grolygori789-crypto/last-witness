/* LAST WITNESS - Authoritative Runtime Build Label 0.18.16
 * Keeps the public Settings label, North QA label and Save Manager version on
 * the current Runtime build even when older phase modules refresh their own
 * historical module version. This file changes display metadata only.
 */
(function(){
"use strict";
const VERSION="0.18.16";
const SETTINGS_TEXT=`LAST WITNESS · BUILD ${VERSION}`;
const QA_TEXT=`BUILD ${VERSION}`;

if(window.LastWitnessRuntimeBuildLabel?.version===VERSION&&window.LastWitnessRuntimeBuildLabel?.installed){
 try{window.LastWitnessRuntimeBuildLabel.sync?.()}catch(_){}
 return
}

const $=(selector,root=document)=>root.querySelector(selector);
let observer=null;
let installed=false;
let syncing=false;

function sync(){
 window.LastWitnessRuntimeBuild=VERSION;
 const settings=$("#settingsVersion");
 if(settings&&settings.textContent.trim()!==SETTINGS_TEXT){
  syncing=true;
  settings.textContent=SETTINGS_TEXT;
  syncing=false
 }
 const qa=$("#northQaModal .north-qa-build");
 if(qa&&qa.textContent.trim()!==QA_TEXT)qa.textContent=QA_TEXT;
 try{if(window.LastWitnessSaveManager)window.LastWitnessSaveManager.version=VERSION}catch(_){}
 return true
}

function observeSettingsLabel(){
 const settings=$("#settingsVersion");
 if(!settings||observer)return false;
 observer=new MutationObserver(()=>{if(!syncing)sync()});
 observer.observe(settings,{childList:true,characterData:true,subtree:true});
 return true
}

function scheduleSync(){
 queueMicrotask(sync);
 setTimeout(sync,0);
 setTimeout(sync,80)
}

function install(){
 if(installed){sync();observeSettingsLabel();return true}
 sync();observeSettingsLabel();
 document.addEventListener("click",event=>{
  if(event.target.closest?.("#settingsButton,#settingsVersion,[data-lang],#lwSettingsFullscreen,#lwMenuFullscreen,#northQaMenuButton,#northQaTitleButton"))scheduleSync()
 },true);
 window.addEventListener("pageshow",scheduleSync);
 installed=true;
 return true
}

window.LastWitnessRuntimeBuildLabel={version:VERSION,installed:true,install,sync};
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",install,{once:true});else install();
})();
