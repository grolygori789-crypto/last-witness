/* Last Witness Full Refactor
 * Chapter 2 apartment and office progression
 * Master Source lines 796-924
 */

function revealApartmentEvidenceDetails(){
apartmentEvidenceInspected=true;
$("#apartmentEvidenceObject").classList.add("inspecting");
$("#apartmentEvidenceMeta").classList.add("show");
$("#inspectApartmentEvidence").style.display="none"
}
function openApartmentEvidence(id){
pendingApartmentEvidence=id;
apartmentEvidenceInspected=state.found.has(id);
$("#apartmentEvidenceTitle").textContent=L(clueData[id][0]);
$("#apartmentEvidenceDescription").textContent=L(clueData[id][1]);
$("#apartmentEvidenceObservation").textContent=L(APARTMENT_OBSERVATIONS[id]);
$("#apartmentEvidenceObject").innerHTML=EVIDENCE_VISUALS[id]||EVIDENCE_VISUALS.apt_documents;
$("#apartmentEvidenceObject").classList.toggle("inspecting",apartmentEvidenceInspected);
$("#apartmentEvidenceMeta").classList.toggle("show",apartmentEvidenceInspected);
$("#inspectApartmentEvidence").style.display=apartmentEvidenceInspected?"none":"block";
$("#collectApartmentEvidence").style.display=state.found.has(id)?"none":"block";
$("#closeApartmentEvidence").style.display=state.found.has(id)?"block":"none";
$("#apartmentEvidence").classList.add("open");
$("#apartmentEvidence").setAttribute("aria-hidden","false")
}
function collectApartmentEvidence(){
const id=pendingApartmentEvidence;
if(!id||state.found.has(id))return closeApartmentEvidence();
state.found.add(id);
state.flags["found_"+id]=true;
state.checkpoint="ch2_apartment_"+apartmentFoundCount();
if(AUDIO.evidence){AUDIO.evidence.currentTime=0;AUDIO.evidence.play().catch(()=>{})}
showBadge(L("evidence_collected")+": "+L(clueData[id][0]));
autoSave();closeApartmentEvidence();refreshApartment();updateProgress()
}
const APARTMENT_CLUES=["apt_mug","apt_documents","apt_board","apt_laptop"];
const APARTMENT_OBSERVATIONS={
apt_mug:"apt_mug_obs",apt_documents:"apt_documents_obs",apt_board:"apt_board_obs",apt_laptop:"apt_laptop_obs"
};
function apartmentFoundCount(){return APARTMENT_CLUES.filter(id=>state.found.has(id)).length}
function refreshApartment(){
const count=apartmentFoundCount();
$$("[data-apt-clue]").forEach(button=>button.classList.toggle("found",state.found.has(button.dataset.aptClue)));
$("#apartmentObjective").innerHTML='<strong>'+L("inspect_apartment")+'</strong> · '+L("evidence_count")+" "+count+"/"+APARTMENT_CLUES.length;
const introComplete=Boolean(state.flags.apartment_intro_complete);
const dialogueIdle=$("#apartmentDialogue").classList.contains("hidden");
const canReview=count===APARTMENT_CLUES.length&&introComplete&&dialogueIdle&&!state.flags.apartment_reviewed;
$("#reviewApartment").classList.toggle("show",canReview)
}
function inspectApartmentClue(id){
if(!APARTMENT_CLUES.includes(id))return;
if(state.found.has(id))play("page");
openApartmentEvidence(id)
}
function closeApartmentEvidence(){
$("#apartmentEvidence").classList.remove("open");
$("#apartmentEvidence").setAttribute("aria-hidden","true");
pendingApartmentEvidence=null;apartmentEvidenceInspected=false
}
function runApartmentOpening(){
refreshApartment();
if(state.flags.apartment_intro_complete)return;
state.flags.apartment_intro_seen=true;
state.flags.apartment_intro_complete=false;
autoSave();
setTimeout(()=>runDialogue($("#apartmentDialogue"),[
{speaker:"Benedict",emotion:"serious",key:"apt_intro_01"},
{speaker:"North",emotion:"serious",key:"apt_intro_02"},
{speaker:"Benedict",emotion:"neutral",key:"apt_intro_03"},
{speaker:"North",emotion:"dry",key:"apt_intro_04"}
],()=>{
state.flags.apartment_intro_complete=true;
autoSave();
refreshApartment()
}),550)
}
function reviewApartment(){
state.flags.apartment_reviewed=true;
$("#reviewApartment").classList.remove("show");
state.checkpoint="ch2_cafe_arrival";
autoSave();
runDialogue($("#apartmentDialogue"),[
{speaker:"Benedict",emotion:"serious",key:"apt_review_01"},
{speaker:"North",emotion:"serious",key:"apt_review_02"},
{speaker:"Benedict",emotion:"neutral",key:"apt_review_03"},
{speaker:"North",emotion:"dry",key:"apt_review_04"},
{speaker:"Benedict",emotion:"neutral",key:"apt_review_05"}
],()=>{play("steps");setTimeout(()=>{show("cafe2");runCafeOpening()},600)})
}

function unlockChapter2CharacterJournal(){
state.flags=state.flags||{};
state.characters=state.characters||{};
state.journal=state.journal||{unlocked:false,seen:true,introShown:false};

if(state.flags.chapter2_character_feature_unlocked)return;

state.flags.chapter2_character_feature_unlocked=true;
state.characters.Benedict=true;
state.characters.North=true;
state.journal.unlocked=true;
state.journal.seen=false;
state.journal.introShown=false;

const button=$("#charactersButton");
if(button){button.hidden=false;button.style.display=""}

if(!state.flags.chapter2_character_toast_shown){
state.flags.chapter2_character_toast_shown=true;
showFeatureToast()
}

syncJournalAlert();
autoSave()
}

function runChapter2PostChoice(choice){
const responseKey={warm:"c2_07_warm",observant:"c2_07_observant",direct:"c2_07_direct"}[choice]||"c2_07_direct";
runDialogue($("#office2Dialogue"),[
{speaker:"North",emotion:choice==="warm"?"dry":"serious",key:responseKey},
{speaker:"Benedict",emotion:"neutral",key:"c2_08"},
{speaker:"North",emotion:"serious",key:"c2_09"},
{speaker:"Benedict",emotion:"serious",key:"c2_10"},
{speaker:"North",emotion:"serious",key:"c2_11"},
{speaker:"Benedict",emotion:"smirk",key:"c2_12"},
{speaker:"North",emotion:"dry",key:"c2_13"},
{speaker:"Benedict",emotion:"neutral",key:"c2_14"},
{speaker:"North",emotion:"neutral",key:"c2_15"},
{speaker:"Benedict",emotion:"smile",key:"c2_16"},
{speaker:"North",emotion:"dry",key:"c2_17"}
],()=>{
state.checkpoint="ch2_apartment_arrival";
unlockChapter2CharacterJournal();
play("steps");
setTimeout(()=>{show("apartment2");runApartmentOpening()},550)
})
}
function applyChapter2Choice(choice){
state.personality[choice]=(state.personality[choice]||0)+1;
state.flags.chapter2_first_choice=choice;
state.checkpoint="ch2_office_after_choice";
if(choice==="warm"){state.relationships.North.trust+=2;state.relationships.North.attachment+=2}
if(choice==="observant"){state.relationships.North.respect+=3}
if(choice==="direct"){state.relationships.North.respect+=1;state.flags.professional_opening=true}
$("#office2Choice").classList.add("hidden");
autoSave();
runChapter2PostChoice(choice)
}
function runChapter2Opening(){
$("#office2Choice").classList.add("hidden");
setTimeout(()=>runDialogue($("#office2Dialogue"),[
{speaker:"North",emotion:"neutral",key:"c2_01"},
{speaker:"Benedict",emotion:"smirk",key:"c2_02"},
{speaker:"North",emotion:"dry",key:"c2_03"}
],()=>{$("#office2Choice").classList.remove("hidden")}),600)
}
function resumeChapter2Office(){
if(state.checkpoint==="ch2_office_after_choice"&&state.flags.chapter2_first_choice)runChapter2PostChoice(state.flags.chapter2_first_choice);
else runChapter2Opening()
}
function startChapter2(){
stopChapterAudio();
state.chapter=2;
state.checkpoint="ch2_office_opening";
state.characters=state.characters||{};
state.characters.North=true;
state.flags=state.flags||{};
state.flags.chapter2_character_feature_unlocked=false;
state.flags.chapter2_character_toast_shown=false;
state.journal={unlocked:false,seen:true,introShown:false};

const button=$("#charactersButton");
if(button){button.hidden=true;button.style.display="none"}
syncJournalAlert();

showChapterIntro(2,()=>{
show("office2");
autoSave();
setTimeout(runChapter2Opening,350)
})
}
