/* LAST WITNESS — Chapter III / Phase I 0.7.0
 * THE BORROWED MINUTES — deterministic briefing, day card and timeline flow.
 */
(function(){
"use strict";
if(window.LastWitnessChapter3?.version==="0.7.0")return;

const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const ORDER=["credential","draft","sample","revision","accession","discovery"];
const EVENTS={
 credential:{time:"05:47",en:"Temporary credential 18-07 enters Daniel’s building.",th:"สิทธิ์ชั่วคราว 18-07 เข้าสู่อาคารของแดเนียล"},
 draft:{time:"05:51",en:"Daniel’s Orchid Café draft is edited.",th:"ร่างข้อความนัดที่ Orchid Café ของแดเนียลถูกแก้ไข"},
 sample:{time:"05:58",en:"The original toxicology sample is collected.",th:"มีการเก็บตัวอย่างพิษวิทยาต้นฉบับ"},
 revision:{time:"06:09",en:"COLLECTION_TIME is revised by eleven minutes.",th:"เวลา COLLECTION_TIME ถูกเลื่อนไปสิบเอ็ดนาที"},
 accession:{time:"06:17",en:"The laboratory accession record is created.",th:"บันทึกรับตัวอย่างของห้องปฏิบัติการถูกสร้างขึ้น"},
 discovery:{time:"06:20",en:"Daniel is officially reported discovered.",th:"มีการรายงานว่าพบแดเนียลอย่างเป็นทางการ"}
};
const SOURCE_ORDER=["accession","credential","discovery","sample","draft","revision"];
const DAY_CARD_MS=2600;
let selected=[];
let localDialogue=false;
let enteringOffice=false;
let dayTimer=0;

function lang(){return window.state?.language==="th"?"th":"en";}
function t(en,th){return lang()==="th"?th:en;}
function ensureState(){
 if(!window.state)return;
 state.chapter3=state.chapter3||{};
 state.flags=state.flags||{};
 state.relationships=state.relationships||{};
 state.relationships.North=state.relationships.North||{trust:70,respect:78,attachment:58,suspicion:3};
}
function route(){
 ensureState();
 if(state.chapter3.route)return state.chapter3.route;
 if(state.flags.chapter3_old_cases)return"old_cases";
 if(state.flags.chapter3_access)return"access";
 return"timeline";
}
function routeFromChapter2Decision(){
 ensureState();
 if(state.flags.chapter3_old_cases===true)return"old_cases";
 if(state.flags.chapter3_access===true)return"access";
 return"timeline";
}
function copy(){return{
 day:t("DAY 3","วันที่ 3"),
 time:t("08:40 AM","08:40 น."),
 place:t("BANGKOK · DETECTIVE OFFICE","กรุงเทพฯ · สำนักงานนักสืบ"),
 phase:t("THE MISSING PASSENGER","ผู้โดยสารที่หายไป"),
 briefing:t("Review the Singapore endpoint with North","ตรวจสอบปลายทางสิงคโปร์ร่วมกับ North"),
 objective:t("Reconstruct the eleven-minute sequence","เรียงลำดับเหตุการณ์สิบเอ็ดนาที"),
 puzzle:t("Reconstruct Timeline","เรียงลำดับเวลา"),
 confirm:t("Confirm Sequence","ยืนยันลำดับ"),reset:t("Reset","เริ่มใหม่"),
 empty:t("No events selected yet.","ยังไม่ได้เลือกเหตุการณ์"),wrong:t("The sequence still contradicts the physical record.","ลำดับนี้ยังขัดกับหลักฐานทางกายภาพ"),
 success:t("Sequence confirmed.","ยืนยันลำดับแล้ว"),choose:t("Choose the next lead","เลือกเบาะแสที่จะติดตามต่อ"),
 system:t("Follow the system route.","ตามรอยช่องทางของระบบ"),daniel:t("Follow Daniel’s movements.","ตามรอยการเดินทางของแดเนียล"),operator:t("Find the person behind credential 18-07.","ตามหาผู้ใช้สิทธิ์ 18-07"),
 complete:t("PHASE I COMPLETE","จบเฟส I"),completeTitle:t("THE MISSING PASSENGER","ผู้โดยสารที่หายไป"),
 completeText:t("The passenger never boarded. His access trail did.","ผู้โดยสารไม่เคยขึ้นเครื่อง แต่ร่องรอยสิทธิ์ของเขาเดินทางไปถึงที่นั่น"),
 continuePhase:t("Continue to Phase II","ไปต่อเฟส II"),returnTitle:t("Return to Title","กลับหน้าแรก"),
 phase2Title:t("CHAPTER III · PHASE II","บทที่ III · เฟส II"),phase2Name:t("CHANGI ARRIVAL","เดินทางถึงชางงี"),phase2Text:t("Phase II is prepared for the Singapore investigation sequence.","เฟส II เตรียมไว้สำหรับการสืบสวนในสิงคโปร์")
};}

function inject(){
 if($("#chapter3Office"))return;
 const game=$("#game");if(!game)return;
 const html=`
 <section id="chapter3Day" class="screen chapter ch3-day-screen" aria-label="Chapter III Day Card">
  <div class="chapter-card ch3-day-card">
   <div class="eyebrow" id="ch3DayLabel"></div>
   <div id="ch3DayTime" class="ch3-day-time"></div>
   <h2 id="ch3DayPlace"></h2>
   <div class="ch3-rule"></div>
   <p id="ch3DayPhase"></p>
  </div>
 </section>
 <section id="chapter3Office" class="screen ch3-office" aria-label="Detective Office Chapter III">
  <img class="scene" src="assets/images/e49ae621ba4833ff.png" alt="Detective Office">
  <div class="overlay"></div>
  <div class="topbar"><span id="ch3Location">Detective Office • Morning</span><div class="hud"><button class="icon ch3-save" type="button">💾</button><button class="icon ch3-menu" type="button">☰<i class="journal-alert" aria-hidden="true"></i></button></div></div>
  <div id="ch3SceneLabel" class="ch3-scene-label"></div>
  <div id="ch3Objective" class="apartment-objective"></div>
  <div id="chapter3Dialogue" class="dialogue hidden"></div>
  <button id="openCh3Timeline" class="primary ch3-puzzle-launch" type="button" hidden></button>
  <div id="ch3Choice" class="choice-panel hidden"><div id="ch3ChoiceTitle" class="choice-title"></div><button class="choice-option" data-ch3-choice="system"></button><button class="choice-option" data-ch3-choice="daniel"></button><button class="choice-option" data-ch3-choice="operator"></button></div>
  <div id="ch3PhaseComplete" class="phase-card" style="display:none"><div class="eyebrow" id="ch3CompleteEyebrow"></div><h2 id="ch3CompleteTitle"></h2><p id="ch3CompleteText"></p><button id="ch3ContinuePhase2" class="primary" type="button"></button><button id="ch3ReturnTitle" class="ghost" type="button"></button></div>
  <div class="progress"><span id="ch3ProgressText" class="progressText">0%</span><div class="progress-bar"><div id="ch3ProgressFill" class="progress-fill"></div></div></div>
 </section>
 <div id="ch3TimelineModal" class="modal ch3-timeline-modal" aria-hidden="true"><div class="modal-card ch3-timeline-card"><div class="eyebrow">LAST WITNESS</div><h3 id="ch3TimelineTitle">TIMELINE RECONSTRUCTION</h3><p id="ch3TimelineHelp"></p><div id="ch3TimelineSource" class="ch3-timeline-source"></div><div class="ch3-sequence-head"><strong id="ch3SequenceTitle"></strong><span id="ch3SequenceCount">0/6</span></div><div id="ch3TimelineSequence" class="ch3-timeline-sequence"></div><div id="ch3TimelineStatus" class="ch3-timeline-status" aria-live="polite"></div><div class="ch3-timeline-actions"><button id="ch3ConfirmTimeline" class="primary" type="button" disabled></button><button id="ch3ResetTimeline" class="ghost" type="button" disabled></button><button id="ch3CloseTimeline" class="ghost" type="button"></button></div></div></div>
 <section id="chapter3Phase2Wip" class="screen chapter ch3-phase2" aria-label="Chapter III Phase II"><div class="chapter-card"><div class="eyebrow" id="ch3Phase2Eyebrow"></div><h2 id="ch3Phase2Title"></h2><p id="ch3Phase2Text"></p><button id="ch3Phase2Return" class="ghost" type="button"></button></div></section>`;
 game.insertAdjacentHTML("beforeend",html);
 bind();updateLanguage();
}
function updateProgress(value){
 const pct=Math.max(0,Math.min(100,value));
 if($("#ch3ProgressText"))$("#ch3ProgressText").textContent=pct+"%";
 if($("#ch3ProgressFill"))$("#ch3ProgressFill").style.width=pct+"%";
}
function hidePuzzleLauncher(){
 const button=$("#openCh3Timeline");if(!button)return;
 button.hidden=true;button.style.display="none";button.setAttribute("aria-hidden","true");
}
function showPuzzleLauncher(){
 const button=$("#openCh3Timeline");if(!button)return;
 button.hidden=false;button.style.display="block";button.setAttribute("aria-hidden","false");
}
function hideTransientUI(){
 hidePuzzleLauncher();
 $("#ch3Choice")?.classList.add("hidden");
 const complete=$("#ch3PhaseComplete");if(complete)complete.style.display="none";
 closePuzzle();
}
function linesForOpening(){
 const r=route();
 const first={
  timeline:[
   {speaker:"North",emotion:"serious",en:"The eleven-minute change did not end at the laboratory. I traced the synchronization route.",th:"การแก้เวลาสิบเอ็ดนาทีไม่ได้จบที่ห้องปฏิบัติการ ฉันตามรอยช่องทางซิงก์ต่อแล้ว"},
   {speaker:"Benedict",emotion:"neutral",en:"Please say it ends somewhere with decent coffee.",th:"ขอให้ปลายทางมีกาแฟดีๆ ก็พอ"}],
  old_cases:[
   {speaker:"North",emotion:"serious",en:"Daniel’s archived cases share one external registry. The same node appears whenever a record arrives late.",th:"คดีเก่าของแดเนียลใช้ทะเบียนภายนอกร่วมกัน โหนดเดียวกันปรากฏทุกครั้งที่ข้อมูลเข้าระบบล่าช้า"},
   {speaker:"Benedict",emotion:"smirk",en:"A repeat offender with excellent filing habits.",th:"ผู้กระทำซ้ำที่จัดแฟ้มเป็นระเบียบดีมาก"}],
  access:[
   {speaker:"North",emotion:"serious",en:"Credential 18-07 was valid, temporary and used from two countries within one morning.",th:"สิทธิ์ 18-07 ถูกต้อง เป็นสิทธิ์ชั่วคราว และถูกใช้จากสองประเทศในเช้าวันเดียวกัน"},
   {speaker:"Benedict",emotion:"neutral",en:"Either it travels quickly, or people have been asking the wrong identity question.",th:"สิทธิ์นี้เดินทางเร็วมาก หรือทุกคนตั้งคำถามเรื่องตัวตนผิดมาตลอด"}]
 }[r];
 return first.concat([
  {speaker:"North",emotion:"analyzing",en:"The foreign endpoint is Singapore. Daniel also had a confirmed booking there.",th:"ปลายทางต่างประเทศอยู่ที่สิงคโปร์ และแดเนียลมีรายการจองเดินทางไปที่นั่นจริง"},
  {speaker:"Benedict",emotion:"serious",en:"Had?",th:"มีงั้นเหรอ"},
  {speaker:"North",emotion:"serious",en:"The booking is real. The passenger record is missing.",th:"รายการจองเป็นของจริง แต่ไม่พบประวัติผู้โดยสาร"},
  {speaker:"Benedict",emotion:"thinking",en:"Then we rebuild the morning before deciding what travelled in his place.",th:"งั้นเราเรียงเหตุการณ์เช้าวันนั้นใหม่ ก่อนตัดสินว่าอะไรเดินทางไปแทนเขา"}
 ]);
}
function localizedLines(lines){return lines.map(line=>({speaker:line.speaker,emotion:line.emotion,text:lang()==="th"?line.th:line.en}));}
function playDialogue(lines,done){
 const box=$("#chapter3Dialogue");
 if(!box||typeof runDialogue!=="function"){done?.();return;}
 localDialogue=true;
 runDialogue(box,localizedLines(lines),()=>{localDialogue=false;done?.();});
}
function startOpeningDialogue(){
 ensureState();
 if(localDialogue)return;
 state.chapter3.openingPlaying=true;
 hidePuzzleLauncher();
 $("#ch3Objective").textContent=copy().briefing;
 playDialogue(linesForOpening(),()=>{
  state.chapter3.openingPlaying=false;
  state.chapter3.openingComplete=true;
  state.checkpoint="ch3_timeline_ready";
  $("#ch3Objective").textContent=copy().objective;
  showPuzzleLauncher();
  autoSave();
 });
}
function enterOffice(){
 inject();ensureState();
 enteringOffice=true;
 show("chapter3Office");
 enteringOffice=false;
 closePuzzle();
 $("#ch3Choice")?.classList.add("hidden");
 const complete=$("#ch3PhaseComplete");if(complete)complete.style.display="none";
 state.checkpoint="ch3_phase1_office";state.chapter3.started=true;
 updateProgress(state.chapter3.timelineComplete?62:18);
 updateLanguage();
 if(state.chapter3.phase1Complete){showPhaseComplete();return;}
 if(state.chapter3.timelineComplete){
  hidePuzzleLauncher();
  if(!state.chapter3.choice)showChoices();
  return;
 }
 if(state.chapter3.openingComplete){showPuzzleLauncher();return;}
 state.chapter3.openingPlaying=false;
 startOpeningDialogue();
}
function resetPhase1State(selectedRoute){
 state.chapter3={
  route:selectedRoute,
  started:true,
  openingComplete:false,
  openingPlaying:false,
  timelineComplete:false,
  choice:null,
  phase1Complete:false
 };
 selected=[];
 localDialogue=false;
 ["system","daniel","operator"].forEach(id=>delete state.flags["ch3_follow_"+id]);
}
function startFromChapter2(){
 inject();ensureState();
 const selectedRoute=routeFromChapter2Decision();
 clearTimeout(dayTimer);
 $$("audio").forEach(audio=>{try{audio.pause();audio.currentTime=0;}catch(_){}});
 state.chapter=3;state.progress=0;state.checkpoint="ch3_intro";
 resetPhase1State(selectedRoute);
 state.journal=state.journal||{};state.journal.unlocked=true;state.flags.chapter2_character_feature_unlocked=true;
 window.LastWitnessContentRegistry?.updateVisibility?.();
 hideTransientUI();
 showChapterIntro(3,()=>{
  show("chapter3Day");updateLanguage();
  dayTimer=setTimeout(enterOffice,DAY_CARD_MS);
 });
 autoSave();
}
function renderPuzzle(){
 const c=copy();
 $("#ch3TimelineSource").innerHTML=SOURCE_ORDER.filter(id=>!selected.includes(id)).map(id=>`<button type="button" class="ch3-event" data-event="${id}"><strong>${EVENTS[id].time}</strong><span>${EVENTS[id][lang()]}</span></button>`).join("");
 $("#ch3TimelineSequence").innerHTML=selected.length?selected.map((id,index)=>`<button type="button" class="ch3-sequence-item" data-selected-index="${index}"><b>${index+1}</b><strong>${EVENTS[id].time}</strong><span>${EVENTS[id][lang()]}</span></button>`).join(""):`<div class="ch3-empty">${c.empty}</div>`;
 $("#ch3SequenceCount").textContent=selected.length+"/6";
 $("#ch3ConfirmTimeline").disabled=selected.length!==6;
 $("#ch3ResetTimeline").disabled=selected.length===0;
 $$("[data-event]").forEach(button=>button.onclick=()=>{selected.push(button.dataset.event);clearPuzzleStatus();renderPuzzle();});
 $$("[data-selected-index]").forEach(button=>button.onclick=()=>{selected.splice(Number(button.dataset.selectedIndex),1);clearPuzzleStatus();renderPuzzle();});
}
function clearPuzzleStatus(){const status=$("#ch3TimelineStatus");if(!status)return;status.textContent="";status.className="ch3-timeline-status";}
function openPuzzle(){
 ensureState();
 if(!state.chapter3.openingComplete||localDialogue||state.chapter3.timelineComplete)return;
 selected=[];clearPuzzleStatus();renderPuzzle();
 $("#ch3TimelineModal").classList.add("open");$("#ch3TimelineModal").setAttribute("aria-hidden","false");
 window.LastWitnessProductionAudio?.refresh?.();
}
function closePuzzle(){
 const modal=$("#ch3TimelineModal");if(!modal)return;
 modal.classList.remove("open");modal.setAttribute("aria-hidden","true");selected=[];clearPuzzleStatus();
 window.LastWitnessProductionAudio?.refresh?.();
}
function confirmPuzzle(){
 if(selected.length!==6)return;
 const correct=selected.every((id,index)=>id===ORDER[index]);
 const status=$("#ch3TimelineStatus");
 if(!correct){status.textContent=copy().wrong;status.className="ch3-timeline-status error";return;}
 status.textContent=copy().success;status.className="ch3-timeline-status success";
 ensureState();state.chapter3.timelineComplete=true;state.checkpoint="ch3_timeline_complete";updateProgress(62);autoSave();window.LastWitnessAudioCue?.playPuzzleSuccess?.();
 setTimeout(()=>{
  closePuzzle();hidePuzzleLauncher();
  playDialogue([
   {speaker:"North",emotion:"serious",en:"Daniel never checked in for the flight. But credential 18-07 authenticated through the Singapore node eleven minutes after the original sample time.",th:"แดเนียลไม่เคยเช็กอินเที่ยวบิน แต่สิทธิ์ 18-07 ยืนยันตัวผ่านโหนดสิงคโปร์สิบเอ็ดนาทีหลังเวลาเก็บตัวอย่างต้นฉบับ"},
   {speaker:"Benedict",emotion:"thinking",en:"A valid journey without a passenger.",th:"การเดินทางที่ถูกต้อง แต่ไม่มีผู้โดยสาร"},
   {speaker:"North",emotion:"dry",en:"Systems are less demanding than airlines.",th:"ระบบเรื่องน้อยกว่าสายการบิน"}
  ],showChoices);
 },520);
}
function showChoices(){
 hidePuzzleLauncher();$("#ch3Choice")?.classList.remove("hidden");
 $("#ch3Objective").textContent=copy().choose;state.checkpoint="ch3_route_choice";autoSave();
}
function chooseLead(choice){
 ensureState();state.chapter3.choice=choice;state.flags["ch3_follow_"+choice]=true;$("#ch3Choice")?.classList.add("hidden");
 if(choice==="system")state.relationships.North.respect+=2;
 if(choice==="daniel")state.relationships.North.trust+=2;
 if(choice==="operator")state.relationships.North.respect+=1;
 const response={
  system:[{speaker:"North",emotion:"serious",en:"I’ll isolate the reconciliation service and the Singapore endpoint.",th:"ฉันจะแยกบริการปรับข้อมูลย้อนหลังกับปลายทางสิงคโปร์ออกมาตรวจ"}],
  daniel:[{speaker:"North",emotion:"neutral",en:"I’ll pull the booking, airport cameras and every document Daniel prepared for the trip.",th:"ฉันจะดึงข้อมูลจอง กล้องสนามบิน และเอกสารทุกชิ้นที่แดเนียลเตรียมไว้สำหรับการเดินทาง"}],
  operator:[{speaker:"North",emotion:"skeptical",en:"Then we start with who could issue 18-07 without becoming its recorded owner.",th:"งั้นเริ่มจากคนที่ออกสิทธิ์ 18-07 ได้ โดยไม่กลายเป็นเจ้าของสิทธิ์ในบันทึก"}]
 }[choice];
 playDialogue(response.concat([{speaker:"Benedict",emotion:"serious",en:"Book two seats. This time we verify the passengers.",th:"จองสองที่นั่ง คราวนี้เราตรวจผู้โดยสารให้ครบ"}]),finishPhase);
}
function finishPhase(){ensureState();state.chapter3.phase1Complete=true;state.checkpoint="ch3_phase1_complete";updateProgress(100);autoSave();showPhaseComplete();}
function showPhaseComplete(){
 $("#chapter3Dialogue")?.classList.add("hidden");$("#ch3Choice")?.classList.add("hidden");hidePuzzleLauncher();closePuzzle();
 const complete=$("#ch3PhaseComplete");if(complete)complete.style.display="block";updateLanguage();
}
function goPhase2(){ensureState();state.checkpoint="ch3_phase2_wip";show("chapter3Phase2Wip");autoSave();}
function returnTitle(){window.LastWitnessChapter2Integration?.returnToTitle?.();}
function resumeFromState(screen){
 if(!screen?.startsWith?.("chapter3")||enteringOffice)return;
 inject();ensureState();
 if(screen==="chapter3Office"){
  closePuzzle();updateLanguage();
  if(state.chapter3.phase1Complete){showPhaseComplete();return;}
  if(state.chapter3.timelineComplete){hidePuzzleLauncher();if(!state.chapter3.choice)showChoices();return;}
  if(state.chapter3.openingComplete){showPuzzleLauncher();return;}
  state.chapter3.openingPlaying=false;
  startOpeningDialogue();
 }
}
function updateLanguage(){
 if(!$("#chapter3Office"))return;const c=copy();
 $("#ch3DayLabel").textContent=c.day;$("#ch3DayTime").textContent=c.time;$("#ch3DayPlace").textContent=c.place;$("#ch3DayPhase").textContent=c.phase;
 $("#ch3Location").textContent=t("Detective Office • Morning","สำนักงานนักสืบ • ตอนเช้า");
 $("#ch3SceneLabel").textContent=c.phase;
 $("#ch3Objective").textContent=state.chapter3?.timelineComplete?c.choose:(state.chapter3?.openingComplete?c.objective:c.briefing);
 $("#openCh3Timeline").textContent=c.puzzle;
 $("#ch3ChoiceTitle").textContent=c.choose;$("[data-ch3-choice=system]").textContent=c.system;$("[data-ch3-choice=daniel]").textContent=c.daniel;$("[data-ch3-choice=operator]").textContent=c.operator;
 $("#ch3CompleteEyebrow").textContent=c.complete;$("#ch3CompleteTitle").textContent=c.completeTitle;$("#ch3CompleteText").textContent=c.completeText;$("#ch3ContinuePhase2").textContent=c.continuePhase;$("#ch3ReturnTitle").textContent=c.returnTitle;
 $("#ch3TimelineTitle").textContent=t("TIMELINE RECONSTRUCTION","การเรียงลำดับเวลา");$("#ch3TimelineHelp").textContent=t("Select all six records in the order they physically occurred.","เลือกบันทึกทั้งหกรายการตามลำดับที่เกิดขึ้นจริง");$("#ch3SequenceTitle").textContent=t("YOUR SEQUENCE","ลำดับของคุณ");$("#ch3ConfirmTimeline").textContent=c.confirm;$("#ch3ResetTimeline").textContent=c.reset;$("#ch3CloseTimeline").textContent=t("Close","ปิด");
 $("#ch3Phase2Eyebrow").textContent=c.phase2Title;$("#ch3Phase2Title").textContent=c.phase2Name;$("#ch3Phase2Text").textContent=c.phase2Text;$("#ch3Phase2Return").textContent=c.returnTitle;
 if($("#ch3TimelineModal")?.classList.contains("open"))renderPuzzle();
}
function bind(){
 $("#openCh3Timeline")?.addEventListener("click",openPuzzle);
 $("#ch3CloseTimeline")?.addEventListener("click",closePuzzle);
 $("#ch3ResetTimeline")?.addEventListener("click",()=>{selected=[];clearPuzzleStatus();renderPuzzle();});
 $("#ch3ConfirmTimeline")?.addEventListener("click",confirmPuzzle);
 $$("[data-ch3-choice]").forEach(button=>button.addEventListener("click",()=>chooseLead(button.dataset.ch3Choice)));
 $("#ch3ContinuePhase2")?.addEventListener("click",goPhase2);$("#ch3ReturnTitle")?.addEventListener("click",returnTitle);$("#ch3Phase2Return")?.addEventListener("click",returnTitle);
 $("#chapter3Office .ch3-save")?.addEventListener("click",()=>manualSave());$("#chapter3Office .ch3-menu")?.addEventListener("click",()=>$("#drawer")?.classList.add("open"));
 document.addEventListener("click",event=>{if(event.target.closest?.("[data-lang]"))setTimeout(updateLanguage,0);},true);
 const grid=$("#developerModal .dev-grid");
 if(grid&&!grid.querySelector('[data-dev-jump="chapter3Office"]')){
  const button=document.createElement("button");button.className="dev-button";button.dataset.devJump="chapter3Office";button.textContent="Chapter III · Office";
  button.onclick=()=>{
   $("#developerModal")?.classList.remove("open");ensureState();
   const selectedRoute=route();state.chapter=3;state.progress=0;resetPhase1State(selectedRoute);
   enterOffice();autoSave();
  };
  grid.appendChild(button);
 }
}

inject();
window.LastWitnessChapter3={
 startFromChapter2,resumeFromState,updateLanguage,openPuzzle,enterOffice,
 version:"0.7.0"
};
})();
