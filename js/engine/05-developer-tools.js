/* Last Witness Full Refactor
 * Developer access and testing tools
 * Dev fresh-scene isolation 0.6.7
 */

let developerSessionUnlocked=false;
let devVersionTapCount=0;
let devVersionTapTimer=null;
const DEV_FORENSIC_FRESH_KEY="lw_dev_fresh_forensic_067";
const DEV_SESSION_UNLOCK_KEY="lw_dev_session_unlocked_067";
const DEV_FORENSIC_IDS=["sealed_sample","accession_record","audit_trace","batch_record"];
function developerUnlocked(){return developerSessionUnlocked}
function syncDeveloperAccess(){
const unlocked=developerUnlocked();
if($("#developerMenuButton"))$("#developerMenuButton").style.display=unlocked?"block":"none"
}
function openDeveloperAccess(){
$("#devAccessCode").value="";
$("#devAccessStatus").textContent="";
$("#devAccessModal").classList.add("open");
setTimeout(()=>$("#devAccessCode").focus(),120)
}
function submitDeveloperAccess(){
const code=$("#devAccessCode").value.trim().toLowerCase();
if(code==="room1807"){
developerSessionUnlocked=true;
syncDeveloperAccess();
$("#devAccessModal").classList.remove("open");
$("#devAccessFlash").classList.add("show");
setTimeout(()=>{$("#devAccessFlash").classList.remove("show");$("#developerModal").classList.add("open")},1050)
}else{
$("#devAccessStatus").textContent=L("auth_failed");
$("#devAccessCode").select()
}
}
function handleVersionTap(){
devVersionTapCount++;
clearTimeout(devVersionTapTimer);
devVersionTapTimer=setTimeout(()=>devVersionTapCount=0,2200);
if(devVersionTapCount>=7){devVersionTapCount=0;openDeveloperAccess()}
}
function devBaseChapter2(){
state.chapter=2;
state.journal=Object.assign({unlocked:true,seen:true,introShown:true},state.journal||{});
state.journal.unlocked=true;
state.characters=Object.assign({},state.characters||{});
state.characters.Benedict=true;
state.characters.North=true;
if(typeof state.characters.Elena!=="boolean")state.characters.Elena=false;
state.relationships=Object.assign({
North:{trust:70,respect:78,attachment:58,suspicion:3},
Elena:{trust:35,respect:52,attachment:18,suspicion:10}
},state.relationships||{});
state.flags=state.flags||{};
state.personality=state.personality||{warm:0,observant:0,direct:0}
}
function clearForensicDevState(){
devBaseChapter2();
state.checkpoint="ch2_forensic_arrival";
state.screen="forensic2";
state.characters.Elena=true;
state.characters.Somchai=true;
state.characters.Kittisak=true;
state.flags.elena_unlocked=true;
state.flags.cafe_intro_complete=true;
state.flags.cafe_complete=true;
state.flags.police_intro_complete=true;
state.flags.police_phase_complete=true;
state.progress=64;
state.forensic={found:[],collected:[],choice:null,compared:false,complete:false};
["identity","custody","route"].forEach(path=>delete state.flags[`forensic_${path}`]);
DEV_FORENSIC_IDS.forEach(id=>{try{state.found?.delete?.(`forensic_${id}`)}catch(_){}});
$$('[data-forensic-clue]').forEach(node=>node.classList.remove('found'));
$("#forensicChoice")?.classList.add("hidden");
const complete=$("#forensicPhaseComplete");
if(complete){complete.style.display="none";complete.setAttribute("aria-hidden","true")}
$("#forensicEvidencePanel")?.classList.remove("open");
$("#forensicDialogue")?.classList.add("hidden");
$("#reviewForensic")?.classList.remove("show")
}
function requestFreshForensicDevJump(event){
const button=event.target.closest?.('[data-dev-jump="forensic2"]');
if(!button)return;
event.preventDefault();
event.stopImmediatePropagation();
try{closeOverlays()}catch(_){}
clearForensicDevState();
try{if(typeof autoSave==="function")autoSave()}catch(_){}
sessionStorage.setItem(DEV_FORENSIC_FRESH_KEY,"1");
sessionStorage.setItem(DEV_SESSION_UNLOCK_KEY,"1");
location.reload()
}
function resumeFreshForensicDevJump(){
if(sessionStorage.getItem(DEV_FORENSIC_FRESH_KEY)!=="1")return;
sessionStorage.removeItem(DEV_FORENSIC_FRESH_KEY);
if(sessionStorage.getItem(DEV_SESSION_UNLOCK_KEY)==="1")developerSessionUnlocked=true;
syncDeveloperAccess();
clearForensicDevState();
try{closeOverlays()}catch(_){}
$("#developerModal")?.classList.remove("open");
if(window.LastWitnessForensic?.start)window.LastWitnessForensic.start();
try{if(typeof autoSave==="function")autoSave()}catch(_){}
}
document.addEventListener("click",requestFreshForensicDevJump,true);
window.addEventListener("load",resumeFreshForensicDevJump,{once:true});
function developerJump(screen){
closeOverlays();devBaseChapter2();
if(screen==="office2"){
state.checkpoint="ch2_office_opening";
state.flags.chapter2_first_choice=null;
show("office2");setTimeout(runChapter2Opening,250)
}else if(screen==="apartment2"){
state.characters.North=true;
state.checkpoint="ch2_apartment_arrival";
state.flags.apartment_intro_complete=false;
state.flags.apartment_intro_seen=false;
APARTMENT_CLUES.forEach(id=>state.found.delete(id));
show("apartment2");setTimeout(runApartmentOpening,250)
}else if(screen==="cafe2"){
state.characters.North=true;
state.checkpoint="ch2_cafe_arrival";
state.flags.apartment_intro_complete=true;
state.flags.apartment_reviewed=true;
APARTMENT_CLUES.forEach(id=>state.found.add(id));
delete state.flags.cafe_intro_started;
delete state.flags.cafe_intro_complete;
delete state.flags.cafe_first_elena_choice;
delete state.flags.cafe_complete;
show("cafe2");setTimeout(runCafeOpening,250)
}else if(screen==="police2"){
state.characters.North=true;
state.checkpoint="ch2_police_arrival";
state.characters.Elena=true;
state.flags.elena_unlocked=true;
state.flags.cafe_intro_complete=true;
state.flags.cafe_complete=true;
delete state.flags.police_intro_started;
delete state.flags.police_intro_complete;
delete state.flags.police_approach;
delete state.flags.police_evidence_collected;
delete state.flags.police_phase_complete;
show("police2");setTimeout(runPoliceOpening,250)
}
autoSave()
}
function devUnlockCharacters(){
devBaseChapter2();state.characters.Benedict=true;state.characters.North=true;state.characters.Elena=true;
state.flags.elena_unlocked=true;autoSave();showBadge(L("dev_action_complete"))
}
function devUnlockEvidence(){
devBaseChapter2();APARTMENT_CLUES.forEach(id=>state.found.add(id));
state.flags.apartment_intro_complete=true;autoSave();showBadge(L("dev_action_complete"))
}
function devResetChoices(){
state.flags.chapter2_first_choice=null;delete state.flags.cafe_first_elena_choice;
state.personality={warm:0,observant:0,direct:0,friendly:0,analytical:0,guarded:0};
state.relationships.North={trust:70,respect:78,attachment:58,suspicion:3};
state.relationships.Elena={trust:35,respect:52,attachment:18,suspicion:10};
autoSave();showBadge(L("dev_action_complete"))
}
function devResetSaves(){
localStorage.removeItem(AUTO_KEY);localStorage.removeItem(MANUAL_KEY);
state.found.clear();state.history=[];showBadge(L("dev_action_complete"))
}
function lockDeveloperAccess(){
developerSessionUnlocked=false;sessionStorage.removeItem(DEV_SESSION_UNLOCK_KEY);syncDeveloperAccess();$("#developerModal").classList.remove("open")
}
