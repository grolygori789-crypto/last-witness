/* LAST WITNESS - Isolated Chapter IV Developer Phase Navigation 0.20.8-d1
 * Canonical Developer Console jumps for Chapter IV Phases I-VII.
 * All Chapter IV test jumps share one modal lifecycle, media boundary and state reset path.
 */
(function(){
"use strict";
const VERSION="0.20.8-d1";
if(window.LastWitnessDeveloperPhaseNavigation?.version===VERSION){
 try{window.LastWitnessDeveloperPhaseNavigation.install?.()}catch(_){}
 return
}

const $=(selector,root=document)=>root.querySelector(selector);
const $$=(selector,root=document)=>Array.from(root.querySelectorAll(selector));
const gs=()=>{try{return state}catch(_){return window.state||null}};
const thai=()=>gs()?.language==="th"||document.documentElement.lang==="th";
const tr=(en,th)=>thai()?th:en;
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));

const PHASES=[
 {id:"chapter4Phase1",phase:1,en:"Chapter IV · Phase I · Afterimage",th:"บทที่ IV · เฟส I · ภาพตกค้าง",api:"LastWitnessChapter4Phase1",screens:["chapter4Intro","chapter4Phase1Card","chapter4Afterimage","chapter4Phase1Complete"]},
 {id:"chapter4Phase2",phase:2,en:"Chapter IV · Phase II · Jakarta Arrival",th:"บทที่ IV · เฟส II · เดินทางถึง Jakarta",api:"LastWitnessChapter4Phase2",screens:["jakartaFlight","jakartaAirport","jakartaCybercrimeOffice","jakartaVerificationLab","jakartaPhase2Complete"]},
 {id:"chapter4PacketProvenance",phase:3,en:"Chapter IV · Phase III · Packet Trail",th:"บทที่ IV · เฟส III · เส้นทางข้อมูล",api:"LastWitnessChapter4Phase3",screens:["jakartaVerificationLab","jakartaPacketProvenanceComplete"]},
 {id:"chapter4ArmanEncounter",phase:4,en:"Chapter IV · Phase IV · The Man Behind the Alias",th:"บทที่ IV · เฟส IV · ชายผู้อยู่หลังนามแฝง",api:"LastWitnessChapter4Phase4",screens:["armanVehicleApproach","armanLocationCard","armanStairwell","armanWorkshop","armanReveal","armanPhase4Complete"]},
 {id:"chapter4NorthMarked",phase:5,en:"Chapter IV · Phase V · North Is Marked",th:"บทที่ IV · เฟส V · North ถูกหมายหัว",api:"LastWitnessChapter4Phase5",screens:["arunaEstablishing","arunaPhase5Card","arunaLocationCard","arunaTeamReveal","arunaMainPool","arunaCabana","arunaPoolside","arunaServicePath","arunaBlindCorner","arunaNorthMarked","arunaCombat","arunaPhase5Complete"]},
 {id:"chapter4FalseSuccess",phase:6,en:"Chapter IV · Phase VI · The False Success",th:"บทที่ IV · เฟส VI · ความสำเร็จจอมปลอม",api:"LastWitnessChapter4Phase6",screens:["falseSuccessPhase6Card","falseSuccessHotelCard","falseSuccessBedroom","falseSuccessLounge","falseSuccessTeamCG","falseSuccessAlert","falseSuccessLabCard","falseSuccessLab","falseSuccessPhase6Complete"]},
 {id:"chapter4RelayFacility",phase:7,en:"Chapter IV · Phase VII · Relay Facility Climax",th:"บทที่ IV · เฟส VII · สถานี Relay JKT-R7",api:"LastWitnessChapter4Phase7",screens:["relayFacilityOpening","relayFacilityPhase7Card","relayFacilityLocationCard","relayFacilityExterior","relayFacilityCorridor","relayFacilityCore","relayFacilityClimax","relayFacilityPostClimax","relayFacilityPhase7Complete"]}
];

let running=false;
function closeDeveloperUI(){
 $("#drawer")?.classList.remove("open");
 $$(".modal.open").forEach(node=>node.classList.remove("open"));
 ["developerModal","northQaModal","devAccessModal"].forEach(id=>$("#"+id)?.classList.remove("open"))
}
function stopCurrentMedia(){
 ["LastWitnessChapter4Phase7","LastWitnessChapter4Phase6","LastWitnessChapter4Phase5","LastWitnessChapter4Phase4","LastWitnessChapter4Phase3","LastWitnessChapter4Phase2","LastWitnessChapter4Phase1"].forEach(name=>{
  try{window[name]?.stopAudio?.(true)}catch(error){console.warn("LAST WITNESS Dev navigation media stop skipped",name,error)}
 });
 $$('video').forEach(video=>{try{video.pause();video.currentTime=0}catch(_){}})
}
function resetPhaseContainers(item){
 const s=gs();if(!s)throw new Error("Game state unavailable");
 s.chapter4=s.chapter4||{};s.flags=s.flags||{};s.characters=s.characters||{};s.relationships=s.relationships||{};
 const phase=Number(item.phase)||1;
 /* Preserve the exact reset contract used by the accepted Phase I-VI navigator,
    extending it only to clear Phase VII when a jump starts at/before it. */
 if(phase===1||phase===2){for(let n=1;n<=7;n++)delete s.chapter4["phase"+n]}
 if(phase===3){for(let n=2;n<=7;n++)delete s.chapter4["phase"+n]}
 if(phase===4){for(let n=3;n<=7;n++)delete s.chapter4["phase"+n]}
 if(phase===5){for(let n=4;n<=7;n++)delete s.chapter4["phase"+n]}
 if(phase===6){delete s.chapter4.phase6;delete s.chapter4.phase7}
 if(phase===7){delete s.chapter4.phase7}
 if(phase<=7){
  ["ch4_p7_facility_lawfully_inspected","ch4_p7_reader_clock_normalized","ch4_p7_r18_correlated","ch4_p7_isolation_order_authorized","ch4_p7_residual_path_observed","ch4_p7_secondary_continuity_supported","ch4_p7_decision_owner_unresolved","ch4_p7_phase8_handoff_ready"].forEach(key=>delete s.flags[key])
 }
 if(item.phase===4&&s.flags.developer_character_unlock_all!==true){
  s.characters["Arman Suryadi"]=false;
  if(Array.isArray(s.lwCharactersUnlocked))s.lwCharactersUnlocked=s.lwCharactersUnlocked.filter(id=>id!=="arman");
  if(Array.isArray(s.lwCharactersUnread))s.lwCharactersUnread=s.lwCharactersUnread.filter(id=>id!=="arman");
  delete s.flags.ch4_arman_identity_verified
 }
 if(item.phase===5&&s.flags.developer_character_unlock_all!==true){
  s.characters["Ika Prameswari"]=false;
  if(Array.isArray(s.lwCharactersUnlocked))s.lwCharactersUnlocked=s.lwCharactersUnlocked.filter(id=>id!=="ika");
  if(Array.isArray(s.lwCharactersUnread))s.lwCharactersUnread=s.lwCharactersUnread.filter(id=>id!=="ika");
  delete s.flags.ch4_p5_ika_identified
 }
}
async function waitForApi(item,timeout=8000){
 /* Chapter IV modules are loaded by the Chapter IV bootstrap before this navigator.
    Do not invoke the Chapter III production loader here: that can expose the
    underlying story screen while an unrelated runtime loads. */
 const started=performance.now();
 while(performance.now()-started<timeout){
  const api=window[item.api];
  if(typeof api?.startFreshForDev==="function")return api;
  await sleep(50)
 }
 throw new Error(item.api+".startFreshForDev is unavailable")
}
function phaseStarted(item){
 const s=gs(),screen=$(".screen.active")?.id||s?.screen||"";
 return Number(s?.chapter)===4&&item.screens.includes(screen)&&Boolean(s?.chapter4?.["phase"+item.phase]?.started)
}
async function waitForEntry(item,timeout=4200){
 const started=performance.now();
 while(performance.now()-started<timeout){if(phaseStarted(item))return true;await sleep(40)}
 return phaseStarted(item)
}
function showFailure(error){
 console.error("LAST WITNESS Developer Phase Navigation:",error);
 try{showBadge(tr("Unable to open the requested test phase","ไม่สามารถเปิดเฟสทดสอบที่เลือกได้"))}catch(_){}
}
async function run(id){
 if(running)return false;
 const item=PHASES.find(entry=>entry.id===id);if(!item)return false;
 running=true;
 const button=$(`[data-dev-jump="${item.id}"][data-lw-dev-phase-nav="1"]`);
 if(button)button.disabled=true;
 try{
  /* Fast path: in the normal bootstrap contract every Chapter IV API is already
     available. This path performs no await before the target phase is activated,
     so the browser cannot paint the old story screen between modal close and jump. */
  let api=window[item.api];
  if(typeof api?.startFreshForDev!=="function")api=await waitForApi(item);
  stopCurrentMedia();
  resetPhaseContainers(item);
  closeDeveloperUI();
  const result=api.startFreshForDev();
  if(result&&typeof result.then==="function")await result;
  if(!await waitForEntry(item))throw new Error("Jump did not enter Chapter IV Phase "+item.phase);
  try{if(typeof autoSave==="function")autoSave()}catch(_){}
  return true
 }catch(error){showFailure(error);return false}
 finally{running=false;if(button)button.disabled=false}
}
function replaceButton(grid,item){
 const current=grid.querySelector(`[data-dev-jump="${item.id}"]`);
 const button=current?current.cloneNode(false):document.createElement("button");
 button.type="button";button.className="dev-button";button.dataset.devJump=item.id;button.dataset.lwDevPhaseNav="1";
 button.textContent=thai()?item.th:item.en;
 button.addEventListener("click",event=>{
  event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();
  void run(item.id)
 },true);
 if(current)current.replaceWith(button);else grid.appendChild(button);
 return button
}
function enforceChapter4Order(grid){
 for(let i=1;i<PHASES.length;i++){
  const prev=grid.querySelector(`[data-dev-jump="${PHASES[i-1].id}"]`);
  const current=grid.querySelector(`[data-dev-jump="${PHASES[i].id}"]`);
  if(prev&&current&&prev.nextElementSibling!==current)prev.insertAdjacentElement("afterend",current)
 }
}
function install(){
 const grid=$("#developerModal .dev-grid");if(!grid)return false;
 PHASES.forEach(item=>replaceButton(grid,item));
 enforceChapter4Order(grid);
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
