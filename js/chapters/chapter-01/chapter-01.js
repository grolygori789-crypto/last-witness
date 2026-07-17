/* Last Witness Full Refactor
 * Chapter 1 flow and shared event bindings
 * Master Source lines 925-1080
 */

function startNewGame(){
state.found.clear();state.history=[];state.chapter=1;state.checkpoint="ch1_start";state.characters={Benedict:true,North:false,Elena:false};state.relationships={North:{trust:70,respect:78,attachment:58,suspicion:3},Elena:{trust:35,respect:52,attachment:18,suspicion:10}};state.flags={};state.personality={warm:0,observant:0,direct:0};state.journal={unlocked:false,seen:false,introShown:false};
showChapterIntro(1,()=>{
show("office");
/* Let the office fade in cleanly before its sound cue and dialogue begin. */
setTimeout(()=>playPhoneVibration(3400),900);
setTimeout(()=>{stopPhoneVibration();runDialogue($("#officeDialogue"),[
{speaker:"North",emotion:"neutral",key:"d_office_1"},
{speaker:"Benedict",emotion:"smirk",key:"d_office_2"},
{speaker:"North",emotion:"serious",key:"d_office_3"},
{speaker:"Benedict",emotion:"smile",key:"d_office_4"},
{speaker:"North",emotion:"embarrassed",key:"d_office_5"},
{speaker:"Benedict",emotion:"smirk",key:"d_office_6"},
{speaker:"North",emotion:"dry",key:"d_office_7"}
],()=>{play("steps");setTimeout(()=>show("crime"),550)})},4300)
})
}

$("#enter").onclick=function(){play("click");show("title")};
$("#newGame").onclick=function(){play("click");startNewGame()};
$("#continueGame").onclick=function(){loadSave("auto")};
$("#loadTitle").onclick=function(){loadSave("manual")};
$$(".saveButton").forEach(button=>button.onclick=manualSave);
$$(".menuButton").forEach(button=>button.onclick=()=>$("#drawer").classList.add("open"));
$("#resume").onclick=closeOverlays;
$("#loadManual").onclick=()=>loadSave("manual");
$("#titleButton").onclick=()=>{closeOverlays();show("title")};
$("#restart").onclick=()=>{closeOverlays();state.chapter===2?startChapter2():startNewGame()};
$("#historyButton").onclick=function(){
$("#historyList").innerHTML=state.history.map(item=>'<div class="history-row"><b>'+item.speaker+'</b><div>'+(item.key?L(item.key):item.text)+"</div></div>").join("")||L("no_dialogue");
$("#historyModal").classList.add("open")
};
$("#caseButton").onclick=function(){
const ids=Array.from(state.found);
const chapter1Ids=ids.filter(id=>!APARTMENT_CLUES.includes(id));
const chapter2Ids=ids.filter(id=>APARTMENT_CLUES.includes(id));
let caseHtml="";
if(chapter1Ids.length)caseHtml+='<div class="case-section-title">'+L("chapter_i")+'</div>'+chapter1Ids.map(id=>'<div class="case-row"><b>'+L(clueData[id][0])+'</b><div>'+L(clueData[id][1])+"</div></div>").join("");
if(chapter2Ids.length)caseHtml+='<div class="case-section-title">'+L("chapter_ii")+'</div>'+chapter2Ids.map(id=>'<div class="case-row"><b>'+L(clueData[id][0])+'</b><div>'+L(clueData[id][1])+"</div></div>").join("");
$("#caseList").innerHTML=caseHtml||L("no_evidence");
$("#caseModal").classList.add("open")
};
$("#settingsButton").onclick=()=>$("#settingsModal").classList.add("open");
$("#settingsVersion").onclick=handleVersionTap;
$("#devAccessSubmit").onclick=submitDeveloperAccess;
$("#devAccessCode").addEventListener("keydown",event=>{if(event.key==="Enter")submitDeveloperAccess()});
$("#developerMenuButton").onclick=()=>$("#developerModal").classList.add("open");
$$("[data-dev-jump]").forEach(button=>button.onclick=()=>developerJump(button.dataset.devJump));
$("#devUnlockCharacters").onclick=devUnlockCharacters;
$("#devUnlockEvidence").onclick=devUnlockEvidence;
$("#devResetChoices").onclick=devResetChoices;
$("#devResetSave").onclick=devResetSaves;
$("#devLockAccess").onclick=lockDeveloperAccess;
syncDeveloperAccess();
$("#charactersButton").onclick=function(){
state.journal.unlocked=true;state.journal.seen=true;syncJournalAlert();autoSave();
$("#charactersModal").classList.add("open");
if(!state.journal.introShown){
state.journal.introShown=true;$("#characterGrid").style.display="none";$("#characterDetail").style.display="none";$("#charactersBack").style.display="none";
$("#journalFirstOpen").classList.add("show");autoSave();
setTimeout(renderCharacterGrid,1250)
}else renderCharacterGrid()
};$("#charactersBack").onclick=renderCharacterGrid;$$("[data-choice]").forEach(button=>button.onclick=()=>{play("click");applyChapter2Choice(button.dataset.choice)});$$("[data-apt-clue]").forEach(button=>button.onclick=()=>inspectApartmentClue(button.dataset.aptClue));
$$("[data-cafe-choice]").forEach(button=>button.onclick=()=>{play("click");applyCafeChoice(button.dataset.cafeChoice)});
$$("[data-police-choice]").forEach(button=>button.onclick=()=>{play("click");applyPoliceChoice(button.dataset.policeChoice)});
if($("#collectPoliceEvidence"))$("#collectPoliceEvidence").onclick=collectPoliceEvidence;
if($("#policeEvidencePanel"))$("#policeEvidencePanel").onclick=event=>{if(event.target===$("#policeEvidencePanel")&&state.flags.police_evidence_collected)$("#policeEvidencePanel").classList.remove("open")};
if($("#policeReturnTitle"))$("#policeReturnTitle").onclick=()=>show("title");
if($("#closeApartmentEvidence"))$("#closeApartmentEvidence").onclick=closeApartmentEvidence;
if($("#inspectApartmentEvidence"))$("#inspectApartmentEvidence").onclick=revealApartmentEvidenceDetails;
if($("#collectApartmentEvidence"))$("#collectApartmentEvidence").onclick=collectApartmentEvidence;
if($("#apartmentEvidenceObject"))$("#apartmentEvidenceObject").onclick=revealApartmentEvidenceDetails;
if($("#apartmentEvidence"))$("#apartmentEvidence").onclick=event=>{if(event.target===$("#apartmentEvidence"))closeApartmentEvidence()};
if($("#reviewApartment"))$("#reviewApartment").onclick=reviewApartment;
if($("#cafeReturnTitle"))$("#cafeReturnTitle").onclick=()=>show("title");
$("#continueChapter2").onclick=startChapter2;
const phase1ReturnTitle=$("#phase1ReturnTitle");
if(phase1ReturnTitle)phase1ReturnTitle.onclick=()=>show("title");
$$(".closeModal").forEach(button=>button.onclick=()=>button.closest(".modal").classList.remove("open"));
$$("[data-lang]").forEach(button=>button.onclick=()=>setLanguage(button.dataset.lang));
$("#soundToggle").onchange=event=>{state.sound=event.target.checked;ambience(state.screen)};
$("#musicRange").oninput=event=>{state.music=Number(event.target.value);setVolumes()};
$("#sfxRange").oninput=event=>{state.sfx=Number(event.target.value);setVolumes()};

$$("[data-clue]").forEach(button=>button.onclick=function(){
play("click");const id=button.dataset.clue;
if(id==="phone"){addClue("phone");show("phone");return}
addClue(id);
const dialogue={
blood:[
{speaker:"North",emotion:"analyzing",key:"d_blood_1"},
{speaker:"Benedict",emotion:"smirk",key:"d_blood_2"},
{speaker:"North",emotion:"serious",key:"d_blood_3"}
],
laptop:[
{speaker:"Benedict",emotion:"thinking",key:"d_laptop_1"},
{speaker:"North",emotion:"analyzing",key:"d_laptop_2"},
{speaker:"Benedict",emotion:"smirk",key:"d_laptop_3"},
{speaker:"North",emotion:"dry",key:"d_laptop_4"}
],
suitcase:[
{speaker:"North",emotion:"analyzing",key:"d_suitcase_1"},
{speaker:"Benedict",emotion:"smile",key:"d_suitcase_2"},
{speaker:"North",emotion:"eyeroll",key:"d_suitcase_3"}
]}[id];
runDialogue($("#crimeDialogue"),dialogue,refreshCrime)
});
$("#phoneTap").onclick=()=>$("#phoneUI").classList.add("open");
$("#closePhoneUI").onclick=()=>$("#phoneUI").classList.remove("open");
$("#backToCrime").onclick=()=>show("crime");
$$("[data-phone]").forEach(button=>button.onclick=function(){
const data={
messages:[L("phone_title_messages"),'<div class="entry"><b>'+L("phone_unknown")+' • 23:32</b><div>'+L("phone_warning")+'</div></div><div class="entry"><b>R. • 22:18</b><div>'+L("phone_where")+'</div></div>',"message"],
calls:[L("phone_title_calls"),'<div class="entry">R. • '+L("phone_missed")+' • 22:18</div><div class="entry">R. • '+L("phone_missed")+' • 22:17</div><div class="entry">R. • '+L("phone_missed")+' • 22:15</div>',"calls"],
notes:[L("phone_title_notes"),'<div class="entry">'+L("phone_meet")+'<br>'+L("phone_11pm")+'</div>',"note"]
}[button.dataset.phone];
addClue(data[2]);
$("#phoneSheet").innerHTML="<h3>"+data[0]+"</h3>"+data[1]+'<button id="closeSheet" class="ghost">'+L("close")+'</button>';
$("#phoneSheet").classList.remove("hidden");
$("#closeSheet").onclick=()=>$("#phoneSheet").classList.add("hidden")
});
$("#reviewEvidence").onclick=()=>show("summary");
$("#summaryBack").onclick=()=>show("crime");
$("#makeDeduction").onclick=function(){
show("deduction");
runDialogue($("#deductionDialogue"),[
{speaker:"North",emotion:"analyzing",key:"d_deduce_1"},
{speaker:"Benedict",emotion:"thinking",key:"d_deduce_2"},
{speaker:"North",emotion:"serious",key:"d_deduce_3"},
{speaker:"Benedict",emotion:"suspicious",key:"d_deduce_4"},
{speaker:"North",emotion:"concerned",key:"d_deduce_5"},
{speaker:"Benedict",emotion:"serious",key:"d_deduce_6"}
],()=>{
playPhoneVibration(3400);
setTimeout(()=>{stopPhoneVibration();runDialogue($("#deductionDialogue"),[
{speaker:"North",emotion:"skeptical",key:"d_call_1"},
{speaker:"Benedict",emotion:"neutral",key:"d_call_2"},
{speaker:"North",emotion:"shocked",key:"d_call_3"},
{speaker:"Benedict",emotion:"serious",key:"d_call_4"},
{speaker:"North",emotion:"concerned",key:"d_call_5"},
{speaker:"Benedict",emotion:"somber",key:"d_call_6"}
],()=>{
stopLoops();
show("chapter");
stopChapterAudio();
if(state.sound){
AUDIO.chapter.currentTime=0;
AUDIO.chapter.volume=state.music;
AUDIO.chapter.play().catch(()=>{});
}
localStorage.setItem(SAVE.auto,JSON.stringify(snapshot()))
})},3600)
})
};
$("#returnTitle").onclick=()=>{stopChapterAudio();show("title")};
setVolumes();applyLanguage();updateProgress();
