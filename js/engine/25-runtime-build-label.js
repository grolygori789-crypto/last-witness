/* LAST WITNESS - Authoritative Runtime Build Label 0.22.3
 * STARTUP RECOVERY 0223R1. Safe implementation; no Phase VIII repair loader.
 */
(function(){
"use strict";
const VERSION="0.22.3";
const SETTINGS_TEXT=`LAST WITNESS · BUILD ${VERSION}`;
const QA_TEXT=`BUILD ${VERSION}`;
const DEV_TEXT=`BUILD ${VERSION}`;
if(window.LastWitnessRuntimeBuildLabel?.version===VERSION&&window.LastWitnessRuntimeBuildLabel?.installed){try{window.LastWitnessRuntimeBuildLabel.sync?.()}catch(_){}return}
const $=(selector,root=document)=>root.querySelector(selector);let observer=null,installed=false,syncing=false;
function ensureDeveloperBuildLabel(){const head=$("#developerModal .dev-console-head");if(!head)return null;let label=$("#developerRuntimeBuild");if(!label){label=document.createElement("small");label.id="developerRuntimeBuild";label.className="lw-runtime-build lw-developer-runtime-build";head.appendChild(label)}return label}
function sync(){window.LastWitnessRuntimeBuild=VERSION;document.documentElement.dataset.runtimeBuild=VERSION;const settings=$("#settingsVersion");if(settings&&settings.textContent.trim()!==SETTINGS_TEXT){syncing=true;settings.textContent=SETTINGS_TEXT;syncing=false}const qa=$("#northQaModal .north-qa-build");if(qa&&qa.textContent.trim()!==QA_TEXT)qa.textContent=QA_TEXT;const dev=ensureDeveloperBuildLabel();if(dev&&dev.textContent.trim()!==DEV_TEXT)dev.textContent=DEV_TEXT;try{if(window.LastWitnessSaveManager)window.LastWitnessSaveManager.version=VERSION}catch(_){}return true}
function observeSettingsLabel(){const settings=$("#settingsVersion");if(!settings||observer)return false;observer=new MutationObserver(()=>{if(!syncing)sync()});observer.observe(settings,{childList:true,characterData:true,subtree:true});return true}
function scheduleSync(){queueMicrotask(sync);setTimeout(sync,0);setTimeout(sync,80)}
function install(){if(installed){sync();observeSettingsLabel();return true}sync();observeSettingsLabel();document.addEventListener("click",event=>{if(event.target.closest?.("#settingsButton,#settingsVersion,[data-lang],#lwSettingsFullscreen,#lwMenuFullscreen,#northQaMenuButton,#northQaTitleButton,#developerMenuButton,#developerModal,#devAccessSubmit"))scheduleSync()},true);window.addEventListener("pageshow",scheduleSync);installed=true;return true}
window.LastWitnessRuntimeBuildLabel={version:VERSION,installed:true,install,sync,getVersion:()=>VERSION};
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",install,{once:true});else install();
})();
