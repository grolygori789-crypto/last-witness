/* LAST WITNESS - Phase VII North QA compatibility integration 0.20.5
 * Developer Mode Phase VII is owned by canonical Developer Phase Navigation.
 * This shim only exposes Phase VII to North QA and routes QA jumps through that same owner.
 */
(function(){
"use strict";
const VERSION="0.20.5";
if(window.LastWitnessPhase7Integration?.version===VERSION&&window.LastWitnessPhase7Integration?.installed){try{window.LastWitnessPhase7Integration.install?.()}catch(_){}return}
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const gs=()=>{try{return state}catch(_){return window.state||null}};
const PHASE_ID="chapter4RelayFacility";
const SCREENS=["relayFacilityOpening","relayFacilityPhase7Card","relayFacilityLocationCard","relayFacilityExterior","relayFacilityCorridor","relayFacilityCore","relayFacilityClimax","relayFacilityPostClimax","relayFacilityPhase7Complete"];
let installed=false,running=false;
function phase7Active(){const s=gs(),screen=$(".screen.active")?.id||s?.screen||"";return Number(s?.chapter)===4&&(SCREENS.includes(screen)||Boolean(s?.chapter4?.phase7?.started&&!s?.chapter4?.phase7?.complete))}
function closeOverlays(){
 $("#drawer")?.classList.remove("open");
 $$(".modal.open").forEach(node=>node.classList.remove("open"));
 ["developerModal","northQaModal","devAccessModal"].forEach(id=>$("#"+id)?.classList.remove("open"))
}
function ensureQa(){
 const grid=$("#northQaModal .north-qa-grid");if(!grid)return false;
 let button=grid.querySelector('[data-north-qa-action="chapter4phase7"]');
 if(!button){button=document.createElement("button");button.type="button";button.className="dev-button";button.dataset.northQaAction="chapter4phase7";button.dataset.lwP7Qa="1";button.textContent="CHAPTER IV · PHASE VII";const p6=grid.querySelector('[data-north-qa-action="chapter4phase6"]');if(p6)p6.insertAdjacentElement("afterend",button);else grid.appendChild(button)}
 return true
}
async function runPhase7(){
 if(running)return false;running=true;closeOverlays();
 try{
  const nav=window.LastWitnessDeveloperPhaseNavigation;
  if(typeof nav?.run!=="function")throw new Error("Canonical Developer Phase Navigation unavailable");
  const ok=await nav.run(PHASE_ID);if(!ok)throw new Error("Phase VII canonical jump failed");
  try{showBadge("North QA test entry opened")}catch(_){}
  return true
 }catch(error){console.error("LAST WITNESS Phase VII QA navigation failed",error);try{showBadge("Unable to open test entry")}catch(_){}return false}
 finally{running=false}
}
function intercept(event){
 const action=event.target.closest?.("[data-north-qa-action]")?.dataset.northQaAction;if(!action)return;
 if(action==="chapter4phase7"){
  event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();closeOverlays();void runPhase7();return
 }
 if(!phase7Active())return;
 /* Let North QA own standard commands, but stop Phase VII media before leaving it. */
 if(action==="restart"){
  event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();closeOverlays();void runPhase7();return
 }
 if(action==="title"||action.startsWith("chapter"))try{window.LastWitnessChapter4Phase7?.stopAudio?.(true)}catch(_){}
}
function verifyOwners(){
 const nav=window.LastWitnessDeveloperPhaseNavigation;
 const hasP7=Array.isArray(nav?.phases)&&nav.phases.some(item=>item.id===PHASE_ID&&Number(item.phase)===7);
 if(!hasP7)console.error("LAST WITNESS Phase VII integration: canonical Developer Phase VII registration missing");
 return hasP7
}
function install(){
 ensureQa();verifyOwners();
 if(installed)return true;
 document.addEventListener("click",intercept,true);
 document.addEventListener("click",event=>{if(event.target.closest?.("#northQaMenuButton,#northQaTitleButton,#settingsVersion,[data-lang]"))setTimeout(()=>{ensureQa();verifyOwners()},0)},true);
 installed=true;return true
}
window.LastWitnessPhase7Integration={version:VERSION,installed:true,install,phase7Active};
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",install,{once:true});else install();
})();
