/* LAST WITNESS — Isolated Chapter IV Developer Phase Navigation 0.17.0-d1
 * Repairs Developer Mode entry to every implemented Chapter IV phase.
 * Scope is intentionally limited to the Developer Console. No story, portrait,
 * evidence, audio, Save/Load or Character Journal implementation is replaced.
 */
(function(){
"use strict";
const VERSION="0.17.0-d1";
if(window.LastWitnessDeveloperPhaseNavigation?.version===VERSION){
 try{window.LastWitnessDeveloperPhaseNavigation.install?.()}catch(_){}
 return
}

const $=(selector,root=document)=>root.querySelector(selector);
const $$=(selector,root=document)=>Array.from(root.querySelectorAll(selector));
const gs=()=>{try{return state}catch(_){return window.state||null}};
const thai=()=>gs()?.language==="th"||document.documentElement.lang==="th";
const tr=(en,th)=>thai()?th:en;

const PHASES=[
 {
  id:"chapter4Phase1",
  phase:1,
  marker:"lwCh4Bound",
  en:"Chapter IV · Phase I · Afterimage",
  th:"บทที่ IV · เฟส I · ภาพตกค้าง",
  api:"LastWitnessChapter4Phase1",
  screens:["chapter4Intro","chapter4Phase1Card","chapter4Afterimage","chapter4Phase1Complete"]
 },
 {
  id:"chapter4Phase2",
  phase:2,
  marker:"lwBound0146",
  en:"Chapter IV · Phase II · Jakarta Arrival",
  th:"บทที่ IV · เฟส II · เดินทางถึง Jakarta",
  api:"LastWitnessChapter4Phase2",
  screens:["jakartaFlight","jakartaAirport","jakartaCybercrimeOffice","jakartaVerificationLab","jakartaPhase2Complete"]
 },
 {
  id:"chapter4PacketProvenance",
  phase:3,
  marker:"lwBound0163",
  en:"Chapter IV · Phase III · Packet Trail",
  th:"บทที่ IV · เฟส III · เส้นทางข้อมูล",
  api:"LastWitnessChapter4Phase3",
  screens:["jakartaVerificationLab","jakartaPacketProvenanceComplete"]
 },
 {
  id:"chapter4ArmanEncounter",
  phase:4,
  marker:"lwBound0170",
  en:"Chapter IV · Phase IV · The Man Behind the Alias",
  th:"บทที่ IV · เฟส IV · ชายผู้อยู่หลังนามแฝง",
  api:"LastWitnessChapter4Phase4",
  screens:["armanVehicleApproach","armanLocationCard","armanStairwell","armanWorkshop","armanReveal","armanPhase4Complete"]
 }
];

let running=false;
function closeDeveloperUI(){
 $("#drawer")?.classList.remove("open");
 $$(".modal.open").forEach(node=>node.classList.remove("open"));
 $("#developerModal")?.classList.remove("open")
}
function stopCurrentMedia(){
 ["LastWitnessChapter4Phase4","LastWitnessChapter4Phase3","LastWitnessChapter4Phase2","LastWitnessChapter4Phase1"].forEach(name=>{
  try{window[name]?.stopAudio?.(true)}catch(error){console.warn("LAST WITNESS Dev navigation audio stop skipped",name,error)}
 })
}
function prepareState(item){
 const s=gs();if(!s)throw new Error("Game state unavailable");
 s.chapter4=s.chapter4||{};s.flags=s.flags||{};s.characters=s.characters||{};s.relationships=s.relationships||{};
 if(item.phase<=1){delete s.chapter4.phase2;delete s.chapter4.phase3;delete s.chapter4.phase4}
 else if(item.phase===2){delete s.chapter4.phase3;delete s.chapter4.phase4}
 else if(item.phase===3){delete s.chapter4.phase4}
 if(item.phase===4&&s.flags.developer_character_unlock_all!==true){
  s.characters["Arman Suryadi"]=false;
  if(Array.isArray(s.lwCharactersUnlocked))s.lwCharactersUnlocked=s.lwCharactersUnlocked.filter(id=>id!=="arman");
  if(Array.isArray(s.lwCharactersUnread))s.lwCharactersUnread=s.lwCharactersUnread.filter(id=>id!=="arman");
  delete s.flags.ch4_arman_identity_verified
 }
}
function phaseStarted(item){
 const s=gs(),active=$(".screen.active")?.id||s?.screen||"";
 if(Number(s?.chapter)!==4)return false;
 if(!item.screens.includes(active))return false;
 return Boolean(s?.chapter4?.["phase"+item.phase]?.started)
}
function showFailure(message){
 console.error("LAST WITNESS Developer Phase Navigation:",message);
 try{showBadge(tr("Unable to open the requested test phase","ไม่สามารถเปิดเฟสทดสอบที่เลือกได้"))}catch(_){}
}
function run(id){
 if(running)return false;
 const item=PHASES.find(entry=>entry.id===id);if(!item)return false;
 const api=window[item.api];
 if(typeof api?.startFreshForDev!=="function"){showFailure(item.api+".startFreshForDev is unavailable");return false}
 running=true;
 try{
  stopCurrentMedia();closeDeveloperUI();prepareState(item);
  api.startFreshForDev();
  setTimeout(()=>{
   if(!phaseStarted(item))showFailure("Jump completed without entering Chapter IV Phase "+item.phase);
   try{if(typeof autoSave==="function")autoSave()}catch(_){}
   running=false
  },180);
  return true
 }catch(error){running=false;showFailure(error);return false}
}
function replaceButton(grid,item){
 let current=grid.querySelector(`[data-dev-jump="${item.id}"]`);
 const button=current?current.cloneNode(false):document.createElement("button");
 button.type="button";button.className="dev-button";button.dataset.devJump=item.id;
 button.dataset[item.marker]="1";button.dataset.lwDevPhaseNav="1";
 button.textContent=thai()?item.th:item.en;
 button.addEventListener("click",event=>{
  event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();
  run(item.id)
 },true);
 if(current)current.replaceWith(button);else grid.appendChild(button);
 return button
}
function install(){
 const grid=$("#developerModal .dev-grid");if(!grid)return false;
 PHASES.forEach(item=>replaceButton(grid,item));
 return true
}
function refreshLabels(){
 PHASES.forEach(item=>{const button=$(`[data-dev-jump="${item.id}"][data-lw-dev-phase-nav="1"]`);if(button)button.textContent=thai()?item.th:item.en})
}

document.addEventListener("click",event=>{
 if(event.target.closest?.("[data-lang]"))setTimeout(()=>{refreshLabels();install()},0);
 if(event.target.closest?.("#developerMenuButton,#settingsVersion"))setTimeout(install,0)
},true);

window.LastWitnessDeveloperPhaseNavigation={version:VERSION,installed:true,install,run,phases:PHASES.map(({id,phase,api,screens})=>({id,phase,api,screens:[...screens]}))};
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",install,{once:true});else install();
})();
