/* LAST WITNESS — Chapter III / Phases I–II 0.7.5
 * THE BORROWED MINUTES — deterministic briefing, timeline reconstruction,
 * takeoff transition and in-flight investigation bridge.
 */
(function(){
"use strict";
if(window.LastWitnessChapter3?.version==="0.7.5")return;

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
const PHASE2_SCREEN="chapter3Phase2Wip"; /* Preserved internally for old-save compatibility. */
const TAKEOFF_VIDEO="assets/video/chapter-03/phase-02/airplane-takeoff.mp4?v=074";
const TAKEOFF_POSTER="assets/video/chapter-03/phase-02/airplane-takeoff-poster.jpg?v=074";
const CABIN_IMAGE="assets/images/chapter-03/phase-02/airplane-cabin.png?v=074";
const CABIN_WEBM="assets/audio/chapter-03/phase-02/airplane-cabin-loop.webm?v=074";
const CABIN_MP3="assets/audio/chapter-03/phase-02/airplane-cabin-loop.mp3?v=074";
let selected=[];
let localDialogue=false;
let enteringOffice=false;
let dayTimer=0;
let phase2Timer=0;
let phase2DialogueActive=false;
let takeoffFinishing=false;
let cabinFadeFrame=0;

function lang(){return window.state?.language==="th"?"th":"en";}
function t(en,th){return lang()==="th"?th:en;}
function clamp(v,min=0,max=1){return Math.max(min,Math.min(max,Number(v)||0));}
function activeScreen(){return $(".screen.active")?.id||window.state?.screen||"";}
function soundOn(){return window.state?.sound!==false;}
function musicLevel(){return clamp(window.state?.music??0.33);}
function sfxLevel(){return clamp(window.state?.sfx??0.55);}
function ensureState(){
 if(!window.state)return;
 state.chapter3=state.chapter3||{};
 state.flags=state.flags||{};
 state.relationships=state.relationships||{};
 state.relationships.North=state.relationships.North||{trust:70,respect:78,attachment:58,suspicion:3};
 const c3=state.chapter3;
 if(typeof c3.phase2Started!=="boolean")c3.phase2Started=false;
 if(typeof c3.phase2TakeoffComplete!=="boolean")c3.phase2TakeoffComplete=false;
 if(typeof c3.phase2TravelCardSeen!=="boolean")c3.phase2TravelCardSeen=false;
 if(typeof c3.phase2DialogueComplete!=="boolean")c3.phase2DialogueComplete=false;
 if(typeof c3.phase2Complete!=="boolean")c3.phase2Complete=false;
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
 flightLocation:t("Bangkok → Singapore · In Flight","กรุงเทพฯ → สิงคโปร์ · ระหว่างเที่ยวบิน"),
 flightScene:t("THE ROUTE THAT ARRIVED FIRST","เส้นทางที่ไปถึงก่อน"),
 flightObjective:t("Review the access trail before landing","ทบทวนร่องรอยสิทธิ์ก่อนลงจอด"),
 skipTakeoff:t("Skip transition","ข้ามฉากเดินทาง"),
 resumeTakeoff:t("Tap to resume flight","แตะเพื่อเดินทางต่อ"),
 travelDay:t("DAY 3","วันที่ 3"),travelTime:t("LATE MORNING","ช่วงสาย"),
 travelPlace:t("EN ROUTE · BANGKOK TO SINGAPORE","ระหว่างทาง · กรุงเทพฯ สู่สิงคโปร์"),
 travelPhase:t("THE ROUTE THAT ARRIVED FIRST","เส้นทางที่ไปถึงก่อน"),
 phase2Complete:t("PHASE II COMPLETE","จบเฟส II"),
 phase2CompleteTitle:t("THE ROUTE THAT ARRIVED FIRST","เส้นทางที่ไปถึงก่อน"),
 phase2CompleteText:t("Daniel never crossed the border. His booking and credential now lead to Changi, where physical movement and system access can finally be separated.","แดเนียลไม่เคยข้ามพรมแดน แต่รายการจองและสิทธิ์ของเขานำไปสู่ชางงี ที่ซึ่งการเดินทางจริงกับการเข้าถึงระบบจะถูกแยกออกจากกัน"),
 phase2Return:t("Return to Title","กลับหน้าแรก")
};}

function installPhase2Language(){
 try{
 if(typeof LANG!=="object")return;
 Object.assign(LANG.en,{
  ch3p2_system_1:"The reconciliation service answered my request. Its Singapore endpoint exists, but the raw sync record is locked behind local authorization.",
  ch3p2_system_2:"So the system remembers. It just wants a chaperone before discussing it.",
  ch3p2_daniel_1:"I have Daniel’s booking, travel documents and the airport camera request. Passenger processing and CCTV sit in separate systems.",
  ch3p2_daniel_2:"One journey, two witnesses, both represented by paperwork.",
  ch3p2_operator_1:"Credential 18-07 has no stable recorded owner. Every issue record points to a role, never a person.",
  ch3p2_operator_2:"A name badge for whoever happens to be wearing the coat.",
  ch3p2_common_1:"Changi confirmed the booking exists. There is no check-in event, boarding scan or immigration movement attached to Daniel.",
  ch3p2_common_2:"The reservation travelled farther than he did.",
  ch3p2_common_3:"The credential travelled farther than the reservation. It authenticated through Singapore infrastructure after the original sample time.",
  ch3p2_common_4:"And someone expected those records to read as one journey.",
  ch3p2_common_5:"They do, until you separate passenger processing from system access.",
  ch3p2_common_6:"Remind me to distrust anything described as seamless.",
  ch3p2_common_7:"I have been trying.",
  ch3p2_common_8:"Our airport request was rerouted through Singapore Police. Inspector Cheryl Goh is the assigned liaison.",
  ch3p2_common_9:"Supervised before we land. Efficient.",
  ch3p2_common_10:"At Changi, we verify what physically arrived. Then we follow what authenticated.",
  ch3p2_common_11:"Let’s meet the passenger the system invented."
 });
 Object.assign(LANG.th,{
  ch3p2_system_1:"ระบบปรับข้อมูลย้อนหลังตอบคำขอแล้ว ปลายทางสิงคโปร์มีอยู่จริง แต่บันทึกการซิงก์ดิบถูกล็อกไว้ ต้องได้รับอนุญาตจากเจ้าหน้าที่ท้องถิ่น",
  ch3p2_system_2:"แปลว่าระบบยังจำได้ เพียงแต่ต้องมีคนคุมตอนมันเล่า",
  ch3p2_daniel_1:"ฉันมีรายการจอง เอกสารเดินทาง และคำขอดูกล้องของแดเนียลแล้ว ระบบผู้โดยสารกับกล้องวงจรปิดแยกจากกัน",
  ch3p2_daniel_2:"การเดินทางหนึ่งครั้ง พยานสองคน และทั้งคู่เป็นเอกสาร",
  ch3p2_operator_1:"สิทธิ์ 18-07 ไม่มีเจ้าของที่บันทึกไว้อย่างคงที่ ทุกรายการออกสิทธิ์ชี้ไปยังบทบาท ไม่เคยชี้ถึงตัวบุคคล",
  ch3p2_operator_2:"ป้ายชื่อสำหรับใครก็ตามที่สวมเสื้อตัวนั้นอยู่",
  ch3p2_common_1:"ชางงียืนยันว่ารายการจองมีอยู่จริง แต่ไม่มีการเช็กอิน สแกนขึ้นเครื่อง หรือผ่านตรวจคนเข้าเมืองที่เชื่อมกับแดเนียล",
  ch3p2_common_2:"รายการจองเดินทางไปไกลกว่าเจ้าของเสียอีก",
  ch3p2_common_3:"สิทธิ์เดินทางไปไกลกว่ารายการจอง มันยืนยันตัวผ่านโครงสร้างพื้นฐานสิงคโปร์หลังเวลาเก็บตัวอย่างต้นฉบับ",
  ch3p2_common_4:"และมีคนคาดหวังให้บันทึกทั้งหมดดูเหมือนการเดินทางเดียวกัน",
  ch3p2_common_5:"มันดูเป็นแบบนั้น จนกว่าเราจะแยกระบบผู้โดยสารออกจากการเข้าถึงระบบ",
  ch3p2_common_6:"เตือนฉันด้วยว่าอย่าไว้ใจอะไรที่ใช้คำว่าไร้รอยต่อ",
  ch3p2_common_7:"ฉันพยายามเตือนมานานแล้ว",
  ch3p2_common_8:"คำขอข้อมูลสนามบินของเราถูกส่งผ่านตำรวจสิงคโปร์ ผู้ประสานงานคือสารวัตรเชอริล โกห์",
  ch3p2_common_9:"ถูกคุมก่อนเครื่องลงเสียอีก มีประสิทธิภาพดี",
  ch3p2_common_10:"ที่ชางงี เราตรวจว่าอะไรเดินทางมาถึงจริง จากนั้นค่อยตามสิ่งที่ยืนยันตัวผ่านระบบ",
  ch3p2_common_11:"ไปพบผู้โดยสารที่ระบบสร้างขึ้นมากัน"
 });
 }catch(_){}
}

function inject(){
 if($("#chapter3Office"))return;
 const game=$("#game");if(!game)return;
 const html=`
 <section id="chapter3Day" class="screen chapter ch3-day-screen" aria-label="Chapter III Day Card">
  <div class="chapter-card ch3-day-card"><div class="eyebrow" id="ch3DayLabel"></div><div id="ch3DayTime" class="ch3-day-time"></div><h2 id="ch3DayPlace"></h2><div class="ch3-rule"></div><p id="ch3DayPhase"></p></div>
 </section>
 <section id="chapter3Office" class="screen ch3-office" aria-label="Detective Office Chapter III">
  <img class="scene" src="assets/images/e49ae621ba4833ff.png" alt="Detective Office"><div class="overlay"></div>
  <div class="topbar"><span id="ch3Location">Detective Office • Morning</span><div class="hud"><button class="icon ch3-save" type="button">💾</button><button class="icon ch3-menu" type="button">☰<i class="journal-alert" aria-hidden="true"></i></button></div></div>
  <div id="ch3SceneLabel" class="ch3-scene-label"></div><div id="ch3Objective" class="apartment-objective"></div><div id="chapter3Dialogue" class="dialogue hidden"></div>
  <button id="openCh3Timeline" class="primary ch3-puzzle-launch" type="button" hidden></button>
  <div id="ch3Choice" class="choice-panel hidden"><div id="ch3ChoiceTitle" class="choice-title"></div><button class="choice-option" data-ch3-choice="system"></button><button class="choice-option" data-ch3-choice="daniel"></button><button class="choice-option" data-ch3-choice="operator"></button></div>
  <div id="ch3PhaseComplete" class="phase-card" style="display:none"><div class="eyebrow" id="ch3CompleteEyebrow"></div><h2 id="ch3CompleteTitle"></h2><p id="ch3CompleteText"></p><button id="ch3ContinuePhase2" class="primary" type="button"></button><button id="ch3ReturnTitle" class="ghost" type="button"></button></div>
  <div class="progress"><span id="ch3ProgressText" class="progressText">0%</span><div class="progress-bar"><div id="ch3ProgressFill" class="progress-fill"></div></div></div>
 </section>
 <div id="ch3TimelineModal" class="modal ch3-timeline-modal" aria-hidden="true"><div class="modal-card ch3-timeline-card"><div class="eyebrow">LAST WITNESS</div><h3 id="ch3TimelineTitle">TIMELINE RECONSTRUCTION</h3><p id="ch3TimelineHelp"></p><div id="ch3TimelineSource" class="ch3-timeline-source"></div><div class="ch3-sequence-head"><strong id="ch3SequenceTitle"></strong><span id="ch3SequenceCount">0/6</span></div><div id="ch3TimelineSequence" class="ch3-timeline-sequence"></div><div id="ch3TimelineStatus" class="ch3-timeline-status" aria-live="polite"></div><div class="ch3-timeline-actions"><button id="ch3ConfirmTimeline" class="primary" type="button" disabled></button><button id="ch3ResetTimeline" class="ghost" type="button" disabled></button><button id="ch3CloseTimeline" class="ghost" type="button"></button></div></div></div>
 <section id="${PHASE2_SCREEN}" class="screen ch3-flight" aria-label="Chapter III Phase II In Flight">
  <img id="ch3CabinScene" class="scene" src="${CABIN_IMAGE}" alt="Passenger aircraft cabin in flight"><div class="overlay ch3-flight-overlay"></div>
  <div class="topbar"><span id="ch3FlightLocation"></span><div class="hud"><button class="icon ch3-flight-save" type="button">💾</button><button class="icon ch3-flight-menu" type="button">☰<i class="journal-alert" aria-hidden="true"></i></button></div></div>
  <div id="ch3FlightSceneLabel" class="ch3-scene-label"></div><div id="ch3FlightObjective" class="apartment-objective"></div><div id="chapter3FlightDialogue" class="dialogue hidden"></div>
  <div id="ch3FlightComplete" class="phase-card" style="display:none"><div class="eyebrow" id="ch3FlightCompleteEyebrow"></div><h2 id="ch3FlightCompleteTitle"></h2><p id="ch3FlightCompleteText"></p><button id="ch3FlightReturnTitle" class="ghost" type="button"></button></div>
  <div class="progress ch3-flight-progress"><span id="ch3FlightProgressText" class="progressText">0%</span><div class="progress-bar"><div id="ch3FlightProgressFill" class="progress-fill"></div></div></div>
  <div id="ch3TakeoffLayer" class="ch3-takeoff-layer" aria-hidden="true"><video id="ch3TakeoffVideo" preload="auto" playsinline webkit-playsinline disablepictureinpicture poster="${TAKEOFF_POSTER}"></video><div class="ch3-takeoff-shade"></div><button id="ch3ResumeTakeoff" class="primary ch3-resume-takeoff" type="button" hidden></button><button id="ch3SkipTakeoff" class="ghost ch3-skip-takeoff" type="button"></button></div>
  <div id="ch3TravelCard" class="ch3-travel-card" aria-hidden="true"><div class="chapter-card ch3-day-card"><div class="eyebrow" id="ch3TravelDay"></div><div id="ch3TravelTime" class="ch3-day-time"></div><h2 id="ch3TravelPlace"></h2><div class="ch3-rule"></div><p id="ch3TravelPhase"></p></div></div>
  <audio id="chapter3CabinAudio" preload="auto"></audio>
 </section>`;
 game.insertAdjacentHTML("beforeend",html);
 installPhase2Language();bind();updateLanguage();
}
function updateProgress(value){
 const pct=Math.max(0,Math.min(100,value));
 if($("#ch3ProgressText"))$("#ch3ProgressText").textContent=pct+"%";
 if($("#ch3ProgressFill"))$("#ch3ProgressFill").style.width=pct+"%";
}
function updateFlightProgress(value){
 const pct=Math.max(0,Math.min(100,value));
 if($("#ch3FlightProgressText"))$("#ch3FlightProgressText").textContent=pct+"%";
 if($("#ch3FlightProgressFill"))$("#ch3FlightProgressFill").style.width=pct+"%";
}
function hidePuzzleLauncher(){const button=$("#openCh3Timeline");if(!button)return;button.hidden=true;button.style.display="none";button.setAttribute("aria-hidden","true");}
function showPuzzleLauncher(){const button=$("#openCh3Timeline");if(!button)return;button.hidden=false;button.style.display="block";button.setAttribute("aria-hidden","false");}
function hideTransientUI(){hidePuzzleLauncher();$("#ch3Choice")?.classList.add("hidden");const complete=$("#ch3PhaseComplete");if(complete)complete.style.display="none";closePuzzle();}
function linesForOpening(){
 const r=route();
 const first={
  timeline:[{speaker:"North",emotion:"serious",en:"The eleven-minute change did not end at the laboratory. I traced the synchronization route.",th:"การแก้เวลาสิบเอ็ดนาทีไม่ได้จบที่ห้องปฏิบัติการ ฉันตามรอยช่องทางซิงก์ต่อแล้ว"},{speaker:"Benedict",emotion:"neutral",en:"Please say it ends somewhere with decent coffee.",th:"ขอให้ปลายทางมีกาแฟดีๆ ก็พอ"}],
  old_cases:[{speaker:"North",emotion:"serious",en:"Daniel’s archived cases share one external registry. The same node appears whenever a record arrives late.",th:"คดีเก่าของแดเนียลใช้ทะเบียนภายนอกร่วมกัน โหนดเดียวกันปรากฏทุกครั้งที่ข้อมูลเข้าระบบล่าช้า"},{speaker:"Benedict",emotion:"smirk",en:"A repeat offender with excellent filing habits.",th:"ผู้กระทำซ้ำที่จัดแฟ้มเป็นระเบียบดีมาก"}],
  access:[{speaker:"North",emotion:"serious",en:"Credential 18-07 was valid, temporary and used from two countries within one morning.",th:"สิทธิ์ 18-07 ถูกต้อง เป็นสิทธิ์ชั่วคราว และถูกใช้จากสองประเทศในเช้าวันเดียวกัน"},{speaker:"Benedict",emotion:"neutral",en:"Either it travels quickly, or people have been asking the wrong identity question.",th:"สิทธิ์นี้เดินทางเร็วมาก หรือทุกคนตั้งคำถามเรื่องตัวตนผิดมาตลอด"}]
 }[r];
 return first.concat([
  {speaker:"North",emotion:"analyzing",en:"The foreign endpoint is Singapore. Daniel also had a confirmed booking there.",th:"ปลายทางต่างประเทศอยู่ที่สิงคโปร์ และแดเนียลมีรายการจองเดินทางไปที่นั่นจริง"},
  {speaker:"Benedict",emotion:"serious",en:"Had?",th:"มีงั้นเหรอ"},
  {speaker:"North",emotion:"serious",en:"The booking is real. The passenger record is missing.",th:"รายการจองเป็นของจริง แต่ไม่พบประวัติผู้โดยสาร"},
  {speaker:"Benedict",emotion:"thinking",en:"Then we rebuild the morning before deciding what travelled in his place.",th:"งั้นเราเรียงเหตุการณ์เช้าวันนั้นใหม่ ก่อนตัดสินว่าอะไรเดินทางไปแทนเขา"}
 ]);
}
function localizedLines(lines){return lines.map(line=>({speaker:line.speaker,emotion:line.emotion,text:lang()==="th"?line.th:line.en}));}
function playDialogue(lines,done){const box=$("#chapter3Dialogue");if(!box||typeof runDialogue!=="function"){done?.();return;}localDialogue=true;runDialogue(box,localizedLines(lines),()=>{localDialogue=false;done?.();});}
function startOpeningDialogue(){
 ensureState();if(localDialogue)return;state.chapter3.openingPlaying=true;hidePuzzleLauncher();$("#ch3Objective").textContent=copy().briefing;
 playDialogue(linesForOpening(),()=>{state.chapter3.openingPlaying=false;state.chapter3.openingComplete=true;state.checkpoint="ch3_timeline_ready";$("#ch3Objective").textContent=copy().objective;showPuzzleLauncher();autoSave();});
}
function enterOffice(){
 inject();ensureState();stopPhase2Media(true);enteringOffice=true;show("chapter3Office");enteringOffice=false;closePuzzle();$("#ch3Choice")?.classList.add("hidden");const complete=$("#ch3PhaseComplete");if(complete)complete.style.display="none";
 state.checkpoint="ch3_phase1_office";state.chapter3.started=true;updateProgress(state.chapter3.timelineComplete?62:18);updateLanguage();
 if(state.chapter3.phase1Complete){goPhase2();return;}if(state.chapter3.timelineComplete){hidePuzzleLauncher();if(!state.chapter3.choice)showChoices();return;}if(state.chapter3.openingComplete){showPuzzleLauncher();return;}state.chapter3.openingPlaying=false;startOpeningDialogue();
}
function resetPhase1State(selectedRoute){
 state.chapter3={route:selectedRoute,started:true,openingComplete:false,openingPlaying:false,timelineComplete:false,choice:null,phase1Complete:false,phase2Started:false,phase2Stage:null,phase2TakeoffComplete:false,phase2TravelCardSeen:false,phase2DialogueComplete:false,phase2Complete:false};
 selected=[];localDialogue=false;phase2DialogueActive=false;["system","daniel","operator"].forEach(id=>delete state.flags["ch3_follow_"+id]);
}
function startFromChapter2(){
 inject();ensureState();const selectedRoute=routeFromChapter2Decision();clearTimeout(dayTimer);clearTimeout(phase2Timer);stopPhase2Media(true);$$("audio").forEach(audio=>{try{audio.pause();audio.currentTime=0;}catch(_){}});
 state.chapter=3;state.progress=0;state.checkpoint="ch3_intro";resetPhase1State(selectedRoute);state.journal=state.journal||{};state.journal.unlocked=true;state.flags.chapter2_character_feature_unlocked=true;window.LastWitnessContentRegistry?.updateVisibility?.();hideTransientUI();
 showChapterIntro(3,()=>{show("chapter3Day");updateLanguage();dayTimer=setTimeout(enterOffice,DAY_CARD_MS);});autoSave();
}
function renderPuzzle(){
 const c=copy();$("#ch3TimelineSource").innerHTML=SOURCE_ORDER.filter(id=>!selected.includes(id)).map(id=>`<button type="button" class="ch3-event" data-event="${id}"><strong>${EVENTS[id].time}</strong><span>${EVENTS[id][lang()]}</span></button>`).join("");
 $("#ch3TimelineSequence").innerHTML=selected.length?selected.map((id,index)=>`<button type="button" class="ch3-sequence-item" data-selected-index="${index}"><b>${index+1}</b><strong>${EVENTS[id].time}</strong><span>${EVENTS[id][lang()]}</span></button>`).join(""):`<div class="ch3-empty">${c.empty}</div>`;
 $("#ch3SequenceCount").textContent=selected.length+"/6";$("#ch3ConfirmTimeline").disabled=selected.length!==6;$("#ch3ResetTimeline").disabled=selected.length===0;
 $$("[data-event]").forEach(button=>button.onclick=()=>{selected.push(button.dataset.event);clearPuzzleStatus();renderPuzzle();});$$("[data-selected-index]").forEach(button=>button.onclick=()=>{selected.splice(Number(button.dataset.selectedIndex),1);clearPuzzleStatus();renderPuzzle();});
}
function clearPuzzleStatus(){const status=$("#ch3TimelineStatus");if(!status)return;status.textContent="";status.className="ch3-timeline-status";}
function openPuzzle(){ensureState();if(!state.chapter3.openingComplete||localDialogue||state.chapter3.timelineComplete)return;selected=[];clearPuzzleStatus();renderPuzzle();$("#ch3TimelineModal").classList.add("open");$("#ch3TimelineModal").setAttribute("aria-hidden","false");window.LastWitnessProductionAudio?.refresh?.();}
function closePuzzle(){const modal=$("#ch3TimelineModal");if(!modal)return;modal.classList.remove("open");modal.setAttribute("aria-hidden","true");selected=[];clearPuzzleStatus();window.LastWitnessProductionAudio?.refresh?.();}
function confirmPuzzle(){
 if(selected.length!==6)return;const correct=selected.every((id,index)=>id===ORDER[index]);const status=$("#ch3TimelineStatus");if(!correct){status.textContent=copy().wrong;status.className="ch3-timeline-status error";return;}
 status.textContent=copy().success;status.className="ch3-timeline-status success";ensureState();state.chapter3.timelineComplete=true;state.checkpoint="ch3_timeline_complete";updateProgress(62);autoSave();window.LastWitnessAudioCue?.playPuzzleSuccess?.();
 setTimeout(()=>{closePuzzle();hidePuzzleLauncher();playDialogue([
  {speaker:"North",emotion:"serious",en:"Daniel never checked in for the flight. But credential 18-07 authenticated through the Singapore node eleven minutes after the original sample time.",th:"แดเนียลไม่เคยเช็กอินเที่ยวบิน แต่สิทธิ์ 18-07 ยืนยันตัวผ่านโหนดสิงคโปร์สิบเอ็ดนาทีหลังเวลาเก็บตัวอย่างต้นฉบับ"},
  {speaker:"Benedict",emotion:"thinking",en:"A valid journey without a passenger.",th:"การเดินทางที่ถูกต้อง แต่ไม่มีผู้โดยสาร"},
  {speaker:"North",emotion:"dry",en:"Systems are less demanding than airlines.",th:"ระบบเรื่องน้อยกว่าสายการบิน"}
 ],showChoices);},520);
}
function showChoices(){hidePuzzleLauncher();$("#ch3Choice")?.classList.remove("hidden");$("#ch3Objective").textContent=copy().choose;state.checkpoint="ch3_route_choice";autoSave();}
function chooseLead(choice){
 ensureState();state.chapter3.choice=choice;state.flags["ch3_follow_"+choice]=true;$("#ch3Choice")?.classList.add("hidden");if(choice==="system")state.relationships.North.respect+=2;if(choice==="daniel")state.relationships.North.trust+=2;if(choice==="operator")state.relationships.North.respect+=1;
 const response={system:[{speaker:"North",emotion:"serious",en:"I’ll isolate the reconciliation service and the Singapore endpoint.",th:"ฉันจะแยกบริการปรับข้อมูลย้อนหลังกับปลายทางสิงคโปร์ออกมาตรวจ"}],daniel:[{speaker:"North",emotion:"neutral",en:"I’ll pull the booking, airport cameras and every document Daniel prepared for the trip.",th:"ฉันจะดึงข้อมูลจอง กล้องสนามบิน และเอกสารทุกชิ้นที่แดเนียลเตรียมไว้สำหรับการเดินทาง"}],operator:[{speaker:"North",emotion:"skeptical",en:"Then we start with who could issue 18-07 without becoming its recorded owner.",th:"งั้นเริ่มจากคนที่ออกสิทธิ์ 18-07 ได้ โดยไม่กลายเป็นเจ้าของสิทธิ์ในบันทึก"}]}[choice];
 playDialogue(response.concat([{speaker:"Benedict",emotion:"serious",en:"Book two seats. This time we verify the passengers.",th:"จองสองที่นั่ง คราวนี้เราตรวจผู้โดยสารให้ครบ"}]),finishPhase);
}
function finishPhase(){
 ensureState();
 state.chapter3.phase1Complete=true;
 state.checkpoint="ch3_phase1_complete";
 updateProgress(100);
 autoSave();
 /* Phase I ends on Benedict's travel decision. Move straight into the
  * takeoff transition instead of interrupting the scene with a duplicate
  * completion card. */
 goPhase2();
}
/* Compatibility bridge for saves created while the old Phase I completion
 * card was still part of the flow. */
function showPhaseComplete(){goPhase2();}

function preferredCabinSource(){
 const probe=document.createElement("audio");try{const support=probe.canPlayType?.('audio/webm; codecs="opus"')||"";if(support==="probably"||support==="maybe")return CABIN_WEBM;}catch(_){}return CABIN_MP3;
}
function ensurePhase2Media(){
 const video=$("#ch3TakeoffVideo"),audio=$("#chapter3CabinAudio");
 if(video&&!video.src.includes("airplane-takeoff.mp4")){video.src=TAKEOFF_VIDEO;video.load();}
 if(audio&&!audio.src.includes("airplane-cabin-loop")){audio.src=preferredCabinSource();audio.loop=true;audio.preload="auto";audio.load();}
}
function dialogueVisible(){const box=$("#chapter3FlightDialogue");return Boolean(box&&!box.classList.contains("hidden")&&getComputedStyle(box).display!=="none");}
function fadeCabin(target,duration=360){
 const audio=$("#chapter3CabinAudio");if(!audio)return;cancelAnimationFrame(cabinFadeFrame);const end=clamp(target,0,.28),start=clamp(audio.volume),began=performance.now();
 if(end>0&&audio.paused){audio.muted=false;audio.play().catch(()=>{});}
 const step=now=>{const p=Math.max(0,Math.min(1,(now-began)/duration));audio.volume=clamp(start+(end-start)*p,0,1);if(p<1)cabinFadeFrame=requestAnimationFrame(step);else if(end===0){try{audio.pause();}catch(_){}}};
 cabinFadeFrame=requestAnimationFrame(step);
}
function syncPhase2Audio(){
 ensurePhase2Media();const video=$("#ch3TakeoffVideo"),c3=window.state?.chapter3||{};if(video){video.muted=!soundOn()||sfxLevel()<=0;video.volume=clamp(sfxLevel()*.72,0,.58);}
 const cabinActive=activeScreen()===PHASE2_SCREEN&&(c3.phase2Stage==="cabin"||c3.phase2Stage==="complete");
 if(!cabinActive||!soundOn()||musicLevel()<=0){fadeCabin(0,220);return;}
 const duck=dialogueVisible()?.70:1;const completeDuck=c3.phase2Stage==="complete"?.78:1;fadeCabin(clamp(musicLevel()*.34*duck*completeDuck,0,.22),260);
}
function stopPhase2Media(resetVideo=false){
 clearTimeout(phase2Timer);cancelAnimationFrame(cabinFadeFrame);const audio=$("#chapter3CabinAudio"),video=$("#ch3TakeoffVideo");
 if(audio){try{audio.pause();audio.volume=0;}catch(_){}}
 if(video){try{video.pause();video.muted=true;if(resetVideo)video.currentTime=0;}catch(_){}}
}
function hidePhase2Layers(){
 const layer=$("#ch3TakeoffLayer"),card=$("#ch3TravelCard");if(layer){layer.classList.remove("show");layer.setAttribute("aria-hidden","true");}if(card){card.classList.remove("show");card.setAttribute("aria-hidden","true");}
}
function finishTakeoff(){
 if(takeoffFinishing)return;takeoffFinishing=true;const video=$("#ch3TakeoffVideo");try{video.pause();video.currentTime=0;}catch(_){};state.chapter3.phase2TakeoffComplete=true;state.chapter3.phase2Stage="travel";state.checkpoint="ch3_phase2_travel_card";autoSave();hidePhase2Layers();showTravelCard();setTimeout(()=>{takeoffFinishing=false;},200);
}
function playTakeoff(){
 ensureState();ensurePhase2Media();clearTimeout(phase2Timer);takeoffFinishing=false;const screen=$("#"+PHASE2_SCREEN),layer=$("#ch3TakeoffLayer"),video=$("#ch3TakeoffVideo"),resume=$("#ch3ResumeTakeoff");
 screen?.classList.remove("cabin-ready");$("#ch3FlightComplete")?.style.setProperty("display","none");if(layer){layer.classList.add("show");layer.setAttribute("aria-hidden","false");}if(resume)resume.hidden=true;
 state.chapter3.phase2Stage="takeoff";state.checkpoint="ch3_phase2_takeoff";updateFlightProgress(8);syncPhase2Audio();
 try{video.currentTime=0;const promise=video.play();if(promise?.catch)promise.catch(()=>{video.muted=true;video.play().catch(()=>{if(resume)resume.hidden=false;});});}catch(_){if(resume)resume.hidden=false;}
 autoSave();
}
function showTravelCard(){
 clearTimeout(phase2Timer);hidePhase2Layers();const screen=$("#"+PHASE2_SCREEN),card=$("#ch3TravelCard");screen?.classList.remove("cabin-ready");if(card){card.classList.add("show");card.setAttribute("aria-hidden","false");}
 state.chapter3.phase2TravelCardSeen=true;state.chapter3.phase2Stage="travel";state.checkpoint="ch3_phase2_travel_card";updateFlightProgress(16);syncPhase2Audio();autoSave();phase2Timer=setTimeout(enterCabin,DAY_CARD_MS);
}
function phase2Lead(){ensureState();if(["system","daniel","operator"].includes(state.chapter3.choice))return state.chapter3.choice;if(state.flags.ch3_follow_daniel)return"daniel";if(state.flags.ch3_follow_operator)return"operator";return"system";}
function phase2DialogueLines(){
 const lead=phase2Lead();const branch={
  system:[{speaker:"North",emotion:"serious",key:"ch3p2_system_1"},{speaker:"Benedict",emotion:"smirk",key:"ch3p2_system_2"}],
  daniel:[{speaker:"North",emotion:"analyzing",key:"ch3p2_daniel_1"},{speaker:"Benedict",emotion:"neutral",key:"ch3p2_daniel_2"}],
  operator:[{speaker:"North",emotion:"skeptical",key:"ch3p2_operator_1"},{speaker:"Benedict",emotion:"thinking",key:"ch3p2_operator_2"}]
 }[lead];
 return branch.concat([
  {speaker:"North",emotion:"serious",key:"ch3p2_common_1"},{speaker:"Benedict",emotion:"thinking",key:"ch3p2_common_2"},
  {speaker:"North",emotion:"analyzing",key:"ch3p2_common_3"},{speaker:"Benedict",emotion:"serious",key:"ch3p2_common_4"},
  {speaker:"North",emotion:"dry",key:"ch3p2_common_5"},{speaker:"Benedict",emotion:"smirk",key:"ch3p2_common_6"},
  {speaker:"North",emotion:"dry",key:"ch3p2_common_7"},{speaker:"North",emotion:"serious",key:"ch3p2_common_8"},
  {speaker:"Benedict",emotion:"smile",key:"ch3p2_common_9"},{speaker:"North",emotion:"determined",key:"ch3p2_common_10"},
  {speaker:"Benedict",emotion:"serious",key:"ch3p2_common_11"}
 ]);
}
function startPhase2Dialogue(){
 if(phase2DialogueActive||state.chapter3.phase2DialogueComplete)return;const box=$("#chapter3FlightDialogue");if(!box||typeof runDialogue!=="function"){showPhase2Complete();return;}
 phase2DialogueActive=true;state.checkpoint="ch3_phase2_briefing";updateFlightProgress(28);autoSave();
 runDialogue(box,phase2DialogueLines(),()=>{phase2DialogueActive=false;state.chapter3.phase2DialogueComplete=true;showPhase2Complete();});syncPhase2Audio();
}
function enterCabin(){
 clearTimeout(phase2Timer);hidePhase2Layers();const screen=$("#"+PHASE2_SCREEN);screen?.classList.add("cabin-ready");state.chapter3.phase2Stage="cabin";state.checkpoint="ch3_phase2_in_flight";updateFlightProgress(24);updateLanguage();syncPhase2Audio();autoSave();
 if(state.chapter3.phase2Complete){showPhase2Complete();return;}phase2Timer=setTimeout(startPhase2Dialogue,360);
}
function showPhase2Complete(){
 hidePhase2Layers();const screen=$("#"+PHASE2_SCREEN);screen?.classList.add("cabin-ready");$("#chapter3FlightDialogue")?.classList.add("hidden");const card=$("#ch3FlightComplete");if(card)card.style.display="block";
 state.chapter3.phase2DialogueComplete=true;state.chapter3.phase2Complete=true;state.chapter3.phase2Stage="complete";state.checkpoint="ch3_phase2_complete";updateFlightProgress(100);updateLanguage();syncPhase2Audio();autoSave();
}
function goPhase2(){
 ensureState();clearTimeout(phase2Timer);state.chapter3.phase2Started=true;state.chapter3.phase2Stage=state.chapter3.phase2TakeoffComplete?"travel":"takeoff";state.checkpoint="ch3_phase2_takeoff";$("#ch3PhaseComplete")?.style.setProperty("display","none");show(PHASE2_SCREEN);autoSave();
}
function returnTitle(){stopPhase2Media(true);window.LastWitnessChapter2Integration?.returnToTitle?.();}
function resumeFromState(screen){
 if(screen!==PHASE2_SCREEN)stopPhase2Media(false);
 if(!screen?.startsWith?.("chapter3")||enteringOffice)return;inject();ensureState();updateLanguage();
 if(screen==="chapter3Office"){closePuzzle();if(state.chapter3.phase1Complete){goPhase2();return;}if(state.chapter3.timelineComplete){hidePuzzleLauncher();if(!state.chapter3.choice)showChoices();return;}if(state.chapter3.openingComplete){showPuzzleLauncher();return;}state.chapter3.openingPlaying=false;startOpeningDialogue();return;}
 if(screen===PHASE2_SCREEN){
  $("#ch3PhaseComplete")?.style.setProperty("display","none");
  if(state.chapter3.phase2Complete){showPhase2Complete();return;}
  if(state.chapter3.phase2TakeoffComplete){if(state.chapter3.phase2TravelCardSeen)enterCabin();else showTravelCard();return;}
  playTakeoff();
 }
}
function updateLanguage(){
 if(!$("#chapter3Office"))return;const c=copy();
 $("#ch3DayLabel").textContent=c.day;$("#ch3DayTime").textContent=c.time;$("#ch3DayPlace").textContent=c.place;$("#ch3DayPhase").textContent=c.phase;
 $("#ch3Location").textContent=t("Detective Office • Morning","สำนักงานนักสืบ • ตอนเช้า");$("#ch3SceneLabel").textContent=c.phase;$("#ch3Objective").textContent=state.chapter3?.timelineComplete?c.choose:(state.chapter3?.openingComplete?c.objective:c.briefing);$("#openCh3Timeline").textContent=c.puzzle;
 $("#ch3ChoiceTitle").textContent=c.choose;$("[data-ch3-choice=system]").textContent=c.system;$("[data-ch3-choice=daniel]").textContent=c.daniel;$("[data-ch3-choice=operator]").textContent=c.operator;
 $("#ch3CompleteEyebrow").textContent=c.complete;$("#ch3CompleteTitle").textContent=c.completeTitle;$("#ch3CompleteText").textContent=c.completeText;$("#ch3ContinuePhase2").textContent=c.continuePhase;$("#ch3ReturnTitle").textContent=c.returnTitle;
 $("#ch3TimelineTitle").textContent=t("TIMELINE RECONSTRUCTION","การเรียงลำดับเวลา");$("#ch3TimelineHelp").textContent=t("Select all six records in the order they physically occurred.","เลือกบันทึกทั้งหกรายการตามลำดับที่เกิดขึ้นจริง");$("#ch3SequenceTitle").textContent=t("YOUR SEQUENCE","ลำดับของคุณ");$("#ch3ConfirmTimeline").textContent=c.confirm;$("#ch3ResetTimeline").textContent=c.reset;$("#ch3CloseTimeline").textContent=t("Close","ปิด");
 $("#ch3FlightLocation").textContent=c.flightLocation;$("#ch3FlightSceneLabel").textContent=c.flightScene;$("#ch3FlightObjective").textContent=c.flightObjective;$("#ch3SkipTakeoff").textContent=c.skipTakeoff;$("#ch3ResumeTakeoff").textContent=c.resumeTakeoff;
 $("#ch3TravelDay").textContent=c.travelDay;$("#ch3TravelTime").textContent=c.travelTime;$("#ch3TravelPlace").textContent=c.travelPlace;$("#ch3TravelPhase").textContent=c.travelPhase;
 $("#ch3FlightCompleteEyebrow").textContent=c.phase2Complete;$("#ch3FlightCompleteTitle").textContent=c.phase2CompleteTitle;$("#ch3FlightCompleteText").textContent=c.phase2CompleteText;$("#ch3FlightReturnTitle").textContent=c.phase2Return;
 if($("#ch3TimelineModal")?.classList.contains("open"))renderPuzzle();syncPhase2Audio();
}
function bind(){
 $("#openCh3Timeline")?.addEventListener("click",openPuzzle);$("#ch3CloseTimeline")?.addEventListener("click",closePuzzle);$("#ch3ResetTimeline")?.addEventListener("click",()=>{selected=[];clearPuzzleStatus();renderPuzzle();});$("#ch3ConfirmTimeline")?.addEventListener("click",confirmPuzzle);
 $$("[data-ch3-choice]").forEach(button=>button.addEventListener("click",()=>chooseLead(button.dataset.ch3Choice)));$("#ch3ContinuePhase2")?.addEventListener("click",goPhase2);$("#ch3ReturnTitle")?.addEventListener("click",returnTitle);$("#ch3FlightReturnTitle")?.addEventListener("click",returnTitle);
 $("#chapter3Office .ch3-save")?.addEventListener("click",()=>manualSave());$("#chapter3Office .ch3-menu")?.addEventListener("click",()=>$("#drawer")?.classList.add("open"));$("#"+PHASE2_SCREEN+" .ch3-flight-save")?.addEventListener("click",()=>manualSave());$("#"+PHASE2_SCREEN+" .ch3-flight-menu")?.addEventListener("click",()=>$("#drawer")?.classList.add("open"));
 $("#ch3SkipTakeoff")?.addEventListener("click",finishTakeoff);$("#ch3ResumeTakeoff")?.addEventListener("click",()=>{const button=$("#ch3ResumeTakeoff"),video=$("#ch3TakeoffVideo");if(button)button.hidden=true;if(video){video.muted=!soundOn();video.play().catch(()=>{if(button)button.hidden=false;});}});
 const video=$("#ch3TakeoffVideo");video?.addEventListener("ended",finishTakeoff);video?.addEventListener("error",finishTakeoff);
 const dialogue=$("#chapter3FlightDialogue");if(dialogue)new MutationObserver(syncPhase2Audio).observe(dialogue,{attributes:true,attributeFilter:["class"]});
 $("#soundToggle")?.addEventListener("change",syncPhase2Audio,true);$("#musicRange")?.addEventListener("input",syncPhase2Audio,true);$("#sfxRange")?.addEventListener("input",syncPhase2Audio,true);
 document.addEventListener("visibilitychange",()=>{if(document.hidden)stopPhase2Media(false);else if(activeScreen()===PHASE2_SCREEN){if(state.chapter3?.phase2Stage==="takeoff")$("#ch3TakeoffVideo")?.play?.().catch(()=>{});syncPhase2Audio();}});
 document.addEventListener("click",event=>{if(event.target.closest?.("[data-lang]"))setTimeout(updateLanguage,0);},true);
 const grid=$("#developerModal .dev-grid");
 if(grid&&!grid.querySelector('[data-dev-jump="chapter3Office"]')){const button=document.createElement("button");button.className="dev-button";button.dataset.devJump="chapter3Office";button.textContent="Chapter III · Office";button.onclick=()=>{$("#developerModal")?.classList.remove("open");ensureState();const selectedRoute=route();state.chapter=3;state.progress=0;resetPhase1State(selectedRoute);enterOffice();autoSave();};grid.appendChild(button);}
 if(grid&&!grid.querySelector('[data-dev-jump="chapter3Flight"]')){const button=document.createElement("button");button.className="dev-button";button.dataset.devJump="chapter3Flight";button.textContent="Chapter III · Flight";button.onclick=()=>{$("#developerModal")?.classList.remove("open");ensureState();state.chapter=3;resetPhase1State(route());state.chapter3.openingComplete=true;state.chapter3.timelineComplete=true;state.chapter3.choice="system";state.chapter3.phase1Complete=true;state.flags.ch3_follow_system=true;goPhase2();};grid.appendChild(button);}
}

inject();
window.LastWitnessChapter3={startFromChapter2,resumeFromState,updateLanguage,openPuzzle,enterOffice,goPhase2,stopPhase2Media,version:"0.7.5"};
})();
