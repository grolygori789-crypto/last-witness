/* Last Witness Full Refactor
 * Journal, relationships, evidence and progress
 * Master Source lines 316-433
 */

function portrait(speaker,emotion){return(PORTRAITS[speaker]&&(PORTRAITS[speaker][emotion]||PORTRAITS[speaker].neutral))||""}
function journalPortrait(speaker,emotion="neutral"){return(JOURNAL_PORTRAITS[speaker]&&(JOURNAL_PORTRAITS[speaker][emotion]||JOURNAL_PORTRAITS[speaker].neutral))||portrait(speaker,emotion)}


/* Clean transparent dialogue portraits. Character Journal portraits remain unchanged. */
const POLICE_DIALOGUE_PORTRAIT_KITTISAK="assets/images/8b34fe5c26f1292e.png";
const POLICE_DIALOGUE_PORTRAIT_SOMCHAI="assets/images/fd3e65df3ccfc9b2.png";
PORTRAITS.Kittisak={
  neutral:POLICE_DIALOGUE_PORTRAIT_KITTISAK,
  serious:POLICE_DIALOGUE_PORTRAIT_KITTISAK,
  thinking:POLICE_DIALOGUE_PORTRAIT_KITTISAK,
  smile:POLICE_DIALOGUE_PORTRAIT_KITTISAK
};
PORTRAITS.Somchai={
  neutral:POLICE_DIALOGUE_PORTRAIT_SOMCHAI,
  flirty:POLICE_DIALOGUE_PORTRAIT_SOMCHAI,
  teasing:POLICE_DIALOGUE_PORTRAIT_SOMCHAI,
  joking:POLICE_DIALOGUE_PORTRAIT_SOMCHAI,
  surprised:POLICE_DIALOGUE_PORTRAIT_SOMCHAI,
  disappointed:POLICE_DIALOGUE_PORTRAIT_SOMCHAI
};

const CHARACTER_JOURNAL={Benedict:{status:"self_status",notes:"journal_benedict_notes"},North:{status:"trusted_partner",notes:"journal_north_notes"},Elena:{status:"forensic_analyst",notes:"journal_elena_notes"},Kittisak:{status:"police_captain",notes:"journal_kittisak_notes"},Somchai:{status:"investigation_officer",notes:"journal_somchai_notes"}};
function clampPercent(value){return Math.max(0,Math.min(100,Math.round(value||0)))}
function overallRelationship(name){
if(name==="Benedict")return 100;
const r=state.relationships[name];if(!r)return 0;
return clampPercent((r.trust+r.respect+r.attachment+(100-r.suspicion))/4)
}
function relationBar(label,value,type=""){
const n=clampPercent(value);
return '<div class="relation-metric '+type+'"><div class="relation-metric-head"><span>'+label+'</span><strong>'+n+'%</strong></div><div class="relation-bar"><div class="relation-fill" style="width:'+n+'%"></div></div></div>'
}
function relationshipSummary(name){
const value=overallRelationship(name);
return '<div class="relation-summary"><div class="relation-label-row"><span>'+L("relationship")+'</span><strong>'+value+'%</strong></div><div class="relation-bar"><div class="relation-fill" style="width:'+value+'%"></div></div></div>'
}
function relationshipDetails(name){
if(name==="Benedict")return relationshipSummary(name);
const r=state.relationships[name];if(!r)return relationshipSummary(name);
return '<div class="relation-metrics">'+
relationBar(L("trust"),r.trust)+
relationBar(L("respect"),r.respect)+
relationBar(L("affection"),r.attachment)+
relationBar(L("suspicion"),r.suspicion,"suspicion")+
'</div>'
}
function syncJournalAlert(){
const show=Boolean(state.journal&&state.journal.unlocked&&!state.journal.seen);
$$(".journal-alert").forEach(dot=>dot.classList.toggle("show",show))
}
function showFeatureToast(){
const toast=$("#featureToast");if(!toast)return;
toast.classList.add("show");clearTimeout(showFeatureToast.timer);
showFeatureToast.timer=setTimeout(()=>toast.classList.remove("show"),3200)
}

function renderCharacterGrid(){
const order=Object.keys(state.characters).filter(name=>state.characters[name]);
$("#journalFirstOpen").classList.remove("show");
$("#characterGrid").style.display="grid";$("#characterDetail").style.display="none";$("#charactersBack").style.display="none";
$("#characterGrid").innerHTML=order.map(name=>{
const data=CHARACTER_JOURNAL[name]||{};
return '<button class="character-card" data-character="'+name+'"><img src="'+journalPortrait(name,"neutral")+'"><div class="character-name">'+name+'</div><div class="character-status">'+L(data.status||"unknown_character")+'</div>'+relationshipSummary(name)+'</button>'
}).join("");
$$("[data-character]").forEach(button=>button.onclick=()=>renderCharacterDetail(button.dataset.character))
}
function renderCharacterDetail(name){
const data=CHARACTER_JOURNAL[name]||{};
$("#characterGrid").style.display="none";$("#characterDetail").style.display="block";$("#charactersBack").style.display="block";
$("#characterDetail").innerHTML='<div class="character-detail-head"><img src="'+journalPortrait(name,"neutral")+'"><div><div class="character-name">'+name+'</div><div class="character-status">'+L(data.status||"unknown_character")+'</div></div></div>'+relationshipDetails(name)+'<div class="character-notes">'+L(data.notes||"no_evidence")+"</div>"
}


function requirements(){
return{
phone:state.found.has("phone"),
room:["blood","laptop","suitcase"].filter(id=>state.found.has(id)).length,
phoneData:["message","calls","note"].filter(id=>state.found.has(id)).length
}}
function readyForSummary(){const r=requirements();return r.phone&&r.room===3&&r.phoneData===3}
function progressValue(){
if(state.chapter===2){
if(state.screen==="police2"){if(state.flags.police_phase_complete)return 62;if(state.flags.police_evidence_collected)return 59;if(state.flags.police_approach)return 54;return 48;}
if(state.screen==="cafe2"){
if(state.flags.cafe_complete)return 48;
if(state.flags.cafe_first_elena_choice)return 42;
return 36
}
if(state.screen==="apartment2")return 18+apartmentFoundCount()*3;
if(state.screen==="office2")return state.flags.chapter2_first_choice?12:5
}
if(state.screen==="chapter")return 100;
if(state.screen==="deduction")return 92;
if(state.screen==="summary")return 88;
let value=state.screen==="office"?10:25;
const r=requirements();
if(r.phone)value+=15;
value+=Math.min(r.room,3)*8;
value+=Math.min(r.phoneData,3)*8;
return Math.min(value,88)
}
function updateProgress(){
const value=progressValue();
$$(".progressText").forEach(element=>element.textContent=value+"%");
$$(".progress-fill").forEach(element=>element.style.width=value+"%");
}
function refreshCrime(){
$$("[data-clue]").forEach(button=>button.classList.toggle("found",state.found.has(button.dataset.clue)));
const r=requirements();
$("#objective").textContent=L("objective_phone")+" "+(r.phone?"✓":"○")+" • "+L("objective_room")+" "+Math.min(r.room,3)+"/3 • "+L("objective_phone_data")+" "+Math.min(r.phoneData,3)+"/3";
$("#reviewEvidence").classList.toggle("show",readyForSummary());
}
function renderSummary(){
$("#summaryClues").innerHTML=Array.from(state.found).map(id=>'<div class="clue"><b>'+L(clueData[id][0])+'</b><div>'+L(clueData[id][1])+"</div></div>").join("");
}

let chapterIntroTimer=null;
