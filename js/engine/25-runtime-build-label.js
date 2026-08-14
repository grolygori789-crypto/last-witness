/* LAST WITNESS - Authoritative Runtime Build Label 0.22.0
 * Keeps Settings, Owner Developer, North QA and Save Manager metadata on the
 * current Runtime build while historical phase modules retain their versions.
 */
(function(){
"use strict";
const VERSION="0.22.0";
const SETTINGS_TEXT=`LAST WITNESS · BUILD ${VERSION}`;
const QA_TEXT=`BUILD ${VERSION}`;
const DEV_TEXT=`BUILD ${VERSION}`;
if(window.LastWitnessRuntimeBuildLabel?.version===VERSION&&window.LastWitnessRuntimeBuildLabel?.installed){try{window.LastWitnessRuntimeBuildLabel.sync?.()}catch(_){}return}
const $=(selector,root=document)=>root.querySelector(selector);let observer=null,installed=false,syncing=false;
function ensureDeveloperBuildLabel(){const head=$("#developerModal .dev-console-head");if(!head)return null;let label=$("#developerRuntimeBuild");if(!label){label=document.createElement("small");label.id="developerRuntimeBuild";label.className="lw-runtime-build lw-developer-runtime-build";head.appendChild(label)}return label}
function sync(){window.LastWitnessRuntimeBuild=VERSION;document.documentElement.dataset.runtimeBuild=VERSION;const settings=$("#settingsVersion");if(settings&&settings.textContent.trim()!==SETTINGS_TEXT){syncing=true;settings.textContent=SETTINGS_TEXT;syncing=false}const qa=$("#northQaModal .north-qa-build");if(qa&&qa.textContent.trim()!==QA_TEXT)qa.textContent=QA_TEXT;const dev=ensureDeveloperBuildLabel();if(dev&&dev.textContent.trim()!==DEV_TEXT)dev.textContent=DEV_TEXT;try{if(window.LastWitnessSaveManager)window.LastWitnessSaveManager.version=VERSION}catch(_){}return true}
function observeSettingsLabel(){const settings=$("#settingsVersion");if(!settings||observer)return false;observer=new MutationObserver(()=>{if(!syncing)sync()});observer.observe(settings,{childList:true,characterData:true,subtree:true});return true}
function scheduleSync(){queueMicrotask(sync);setTimeout(sync,0);setTimeout(sync,80)}
function loadC4P8Repair(){if(window.LastWitnessC4P8DefectRepair?.version==="0.22.1")return;const existing=document.getElementById("lwC4P8DefectRepairScript");if(existing)return;const node=document.createElement("script");node.id="lwC4P8DefectRepairScript";node.src="js/engine/29-c4p8-defect-repair.js?v=0221";node.async=false;node.addEventListener("error",error=>console.error("LAST WITNESS C4P8 defect repair failed to load",error),{once:true});document.body.appendChild(node)}
function install(){if(installed){sync();observeSettingsLabel();loadC4P8Repair();return true}sync();observeSettingsLabel();loadC4P8Repair();document.addEventListener("click",event=>{if(event.target.closest?.("#settingsButton,#settingsVersion,[data-lang],#lwSettingsFullscreen,#lwMenuFullscreen,#northQaMenuButton,#northQaTitleButton,#developerMenuButton,#developerModal,#devAccessSubmit"))scheduleSync()},true);window.addEventListener("pageshow",scheduleSync);installed=true;return true}
window.LastWitnessRuntimeBuildLabel={version:VERSION,installed:true,install,sync,getVersion:()=>VERSION};
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",install,{once:true});else install();
})();
