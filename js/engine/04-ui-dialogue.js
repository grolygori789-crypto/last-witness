/* Last Witness Full Refactor
 * Screen routing, UI, clues and dialogue
 * Master Source lines 434-501
 */

function showChapterIntro(chapter,onComplete){
clearTimeout(chapterIntroTimer);
const intro=$("#chapterIntro");
const number=$("#chapterIntroNumber");
const title=$("#chapterIntroTitle");
const data={1:{number:L("chapter_i"),title:L("chapter_1_name")},2:{number:L("chapter_ii"),title:L("chapter_2_name")}}[chapter]||{number:"CHAPTER "+chapter,title:""};
number.textContent=data.number;
title.textContent=data.title;
intro.setAttribute("aria-hidden","false");

/* Cover the title screen immediately. Only the card itself animates in. */
intro.classList.add("instant","show");
void intro.offsetWidth;
intro.classList.remove("instant");

chapterIntroTimer=setTimeout(()=>{
/* Prepare the office while the black intro still fully covers the screen. */
if(onComplete)onComplete();
requestAnimationFrame(()=>{
intro.classList.remove("show");
intro.setAttribute("aria-hidden","true");
});
},2850);
}
function show(screen){
if(state.chapter===2){
state.characters=state.characters||{};
state.characters.Benedict=true;
state.characters.North=true
}
$$(".screen").forEach(element=>element.classList.remove("active"));
$("#"+screen).classList.add("active");
state.screen=screen;
if($("#charactersButton"))$("#charactersButton").style.display=state.chapter>=2?"block":"none";
syncJournalAlert();syncDeveloperAccess();
ambience(screen);
if(screen==="crime")refreshCrime();
if(screen==="apartment2")refreshApartment();
if(screen==="cafe2"&&state.flags.cafe_intro_started)setTimeout(runCafeOpening,120);if(screen==="police2")setTimeout(runPoliceOpening,120);
if(screen==="summary")renderSummary();
updateProgress();
autoSave();
}
function addClue(id){
if(state.found.has(id))return;
state.found.add(id);play("page");showBadge(L("new_evidence")+L(clueData[id][0]));refreshCrime();updateProgress();autoSave();
}
function runDialogue(container,lines,onComplete){
let index=0,lastRecorded=-1;
function draw(){
const current=lines[index];const right=current.speaker==="North";const text=current.key?L(current.key):(current.text||"");
if(lastRecorded!==index){state.history.push({speaker:current.speaker,key:current.key||null,text:current.text||text});lastRecorded=index}
container.className="dialogue"+(right?" right":"");
container.innerHTML='<div class="portrait-wrap"><img class="portrait portrait-'+current.speaker+'" src="'+portrait(current.speaker,current.emotion||"neutral")+'"></div><div class="dialogue-copy"><div class="speaker">'+current.speaker+'</div><div class="line">'+text+'</div></div><div class="next">'+(index===lines.length-1?L("next_continue"):L("next_tap"))+"</div>";
}
activeDialogueRender=draw;
container.onclick=function(){
play("click");index++;
if(index>=lines.length){container.classList.add("hidden");container.onclick=null;activeDialogueRender=null;autoSave();if(onComplete)onComplete()}
else draw()
};
draw()
}
function closeOverlays(){$("#drawer").classList.remove("open");$$(".modal").forEach(modal=>modal.classList.remove("open"))}
