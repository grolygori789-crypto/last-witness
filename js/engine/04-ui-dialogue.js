/* LAST WITNESS — Screen, UI and Dialogue Runtime 0.5.4
 * Shared Chapter I–III routing with a direct Chapter II journal guard.
 */
function showChapterIntro(chapter,onComplete){
clearTimeout(chapterIntroTimer);
const intro=$("#chapterIntro");
const number=$("#chapterIntroNumber");
const title=$("#chapterIntroTitle");
const data={
1:{number:L("chapter_i"),title:state.language==="th"?"ห้อง 1807":"ROOM 1807"},
2:{number:L("chapter_ii"),title:L("chapter_2_name")},
3:{number:state.language==="th"?"บทที่ III":"CHAPTER III",title:state.language==="th"?"สิบเอ็ดนาทีที่ถูกยืม":"THE BORROWED MINUTES"}
}[chapter]||{number:"CHAPTER "+chapter,title:""};
number.textContent=data.number;
title.textContent=data.title;
intro.setAttribute("aria-hidden","false");
intro.classList.add("instant","show");
void intro.offsetWidth;
intro.classList.remove("instant");
chapterIntroTimer=setTimeout(()=>{
if(onComplete)onComplete();
requestAnimationFrame(()=>{
intro.classList.remove("show");
intro.setAttribute("aria-hidden","true")
})
},2850)
}
function ensureChapter2JournalForScreen(screen){
const lateChapter2=["apartment2","cafe2","police2","forensic2","medical2","chapter2Complete","chapter3Office","chapter3Phase2Wip","chapter3Wip"];
if(Number(state.chapter)<2||!lateChapter2.includes(screen))return;
state.flags=state.flags||{};
state.characters=state.characters||{};
state.journal=state.journal||{unlocked:false,seen:true,introShown:false};
state.flags.chapter2_character_feature_unlocked=true;
state.characters.Benedict=true;
state.characters.North=true;
state.journal.unlocked=true;
if(state.flags.chapter2_character_journal_opened!==true)state.journal.seen=false;
state.lwJournalEnabled=true;
state.lwCharactersUnlocked=Array.from(new Set([...(state.lwCharactersUnlocked||[]),"benedict","north"]));
if(state.journal.seen===false)state.lwCharactersUnread=Array.from(new Set([...(state.lwCharactersUnread||[]),"north"]));
const button=$("#charactersButton");
if(button){
 button.hidden=false;button.disabled=false;button.removeAttribute("hidden");button.setAttribute("aria-hidden","false");
 button.style.setProperty("display","block","important");button.style.setProperty("visibility","visible","important");button.style.setProperty("opacity","1","important");button.style.setProperty("pointer-events","auto","important");
 ["height","overflow","margin-top","min-height","padding","border"].forEach(name=>button.style.removeProperty(name));
}
}
function show(screen){
$$('.screen').forEach(element=>element.classList.remove('active'));
const target=$("#"+screen);
if(!target)return;
target.classList.add('active');
state.screen=screen;
ensureChapter2JournalForScreen(screen);
try{window.LastWitnessContentRegistry?.updateVisibility?.()}catch(_){}
try{window.LastWitnessContentRegistry?.updateDots?.()}catch(_){}
try{syncJournalAlert()}catch(_){}
try{syncDeveloperAccess()}catch(_){}
try{ambience(screen)}catch(_){}
if(screen==='crime')refreshCrime();
if(screen==='apartment2')refreshApartment();
if(screen==='cafe2'&&state.flags.cafe_intro_started)setTimeout(runCafeOpening,120);
if(screen==='police2')setTimeout(runPoliceOpening,120);
if(screen==='summary')renderSummary();
try{window.LastWitnessChapter3?.resumeFromState?.(screen)}catch(_){}
updateProgress();
autoSave()
}
function addClue(id){
if(state.found.has(id))return;
state.found.add(id);const chapter1Evidence=['phone','blood','laptop','suitcase','message','calls','note'];const chapter1Complete=chapter1Evidence.every(clue=>state.found.has(clue));if(chapter1Complete&&window.LastWitnessAudioCue?.playCompletion)window.LastWitnessAudioCue.playCompletion();else if(window.LastWitnessAudioCue?.playCollection)window.LastWitnessAudioCue.playCollection();else play('page');showBadge(L('new_evidence')+L(clueData[id][0]));refreshCrime();updateProgress();autoSave()
}
function runDialogue(container,lines,onComplete){
let index=0,lastRecorded=-1;
function draw(){
const current=lines[index];const right=current.speaker==='North';const text=current.key?L(current.key):(current.text||'');
if(lastRecorded!==index){state.history.push({speaker:current.speaker,key:current.key||null,text:current.text||text});lastRecorded=index}
container.className='dialogue'+(right?' right':'');
container.innerHTML='<div class="portrait-wrap"><img class="portrait portrait-'+current.speaker+'" src="'+portrait(current.speaker,current.emotion||'neutral')+'"></div><div class="dialogue-copy"><div class="speaker">'+current.speaker+'</div><div class="line">'+text+'</div></div><div class="next">'+(index===lines.length-1?L('next_continue'):L('next_tap'))+'</div>';
try{window.LastWitnessProductionAudio?.refresh?.()}catch(_){}
}
activeDialogueRender=draw;
container.onclick=function(){
play('click');index++;
if(index>=lines.length){container.classList.add('hidden');container.onclick=null;activeDialogueRender=null;autoSave();try{window.LastWitnessProductionAudio?.refresh?.()}catch(_){};if(onComplete)onComplete()}
else draw()
};
draw()
}
function closeOverlays(){$('#drawer').classList.remove('open');$$('.modal').forEach(modal=>modal.classList.remove('open'))}
