/* LAST WITNESS — Chapter IV / Phase I: AFTERIMAGE 0.13.2 */
(function(){
"use strict";
if(window.LastWitnessChapter4Phase1?.version==="0.13.2")return;

const BUILD="0.13.2";
const INTRO="chapter4Intro";
const CARD="chapter4Phase1Card";
const SCREEN="chapter4Afterimage";
const COMPLETE="chapter4Phase1Complete";
const SCREENS=new Set([INTRO,CARD,SCREEN,COMPLETE]);
const OFFICE_IMAGE="assets/images/chapter-03/phase-04/singapore-investigation-office.png?v=0920";
const AUDIO_BASE="assets/audio/chapter-04/phase-01/";
const BOARD_IDS=["wrapper_fingerprint","rendezvous_token","bangkok_package","cleanup_credential","decision_owner"];
const BOARD_LANES=["jakarta","bangkok","unresolved"];
const BOARD_CORRECT={wrapper_fingerprint:"jakarta",rendezvous_token:"jakarta",bangkok_package:"bangkok",cleanup_credential:"bangkok",decision_owner:"unresolved"};

const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const gs=()=>{try{return state}catch(_){return window.state||null}};
const thai=()=>gs()?.language==="th"||document.documentElement.lang==="th";
const tr=(en,th)=>thai()?th:en;
const clamp=(n,min=0,max=1)=>Math.max(min,Math.min(max,Number(n)||0));
const active=()=>$(".screen.active")?.id||gs()?.screen||"";
const clone=value=>JSON.parse(JSON.stringify(value));
let dialogue=null,boardOpen=false,choiceOpen=false,queryOpen=false;
let chapterTimer=0,cardTimer=0,completeTimer=0;
const fadeFrames=new Map();

function endingDefaults(){return{
 evidenceIntegrity:0,attributionProof:0,chainOfCustody:0,witnessProtection:0,northSafety:0,allianceStrength:0,publicRecordControl:0,elenaSuspicion:0,
 accusedParty:"",witnessStatus:"unknown",northStatus:"active",adrianStatus:"unresolved",armanStatus:"unresolved"
}}
function ensureEndingProfile(){const s=gs();if(!s)return endingDefaults();s.endingProfile=Object.assign(endingDefaults(),s.endingProfile||{});return s.endingProfile}
function ensure(){
 const s=gs();if(!s)return null;s.chapter4=s.chapter4||{};s.flags=s.flags||{};ensureEndingProfile();
 const p=s.chapter4.phase1=s.chapter4.phase1||{};
 const bools=["started","chapterCardSeen","locationCardSeen","introComplete","choiceMade","choiceApplied","boardComplete","boardDebriefSeen","workingTheoryAdded","querySeen","queryCuePlayed","queryAcknowledged","closingDialogueComplete","complete"];
 bools.forEach(k=>{if(typeof p[k]!=="boolean")p[k]=false});
 if(typeof p.choiceKey!=="string")p.choiceKey="";
 if(!p.boardAssignments||typeof p.boardAssignments!=="object")p.boardAssignments={};
 Object.keys(p.boardAssignments).forEach(id=>{if(!BOARD_IDS.includes(id)||!BOARD_LANES.includes(p.boardAssignments[id]))delete p.boardAssignments[id]});
 if(!Number.isFinite(Number(p.boardAttempts)))p.boardAttempts=0;
 if(p.complete){p.started=true;p.chapterCardSeen=true;p.locationCardSeen=true;p.introComplete=true;p.choiceMade=true;p.choiceApplied=true;p.boardComplete=true;p.boardDebriefSeen=true;p.workingTheoryAdded=true;p.querySeen=true;p.queryAcknowledged=true;p.closingDialogueComplete=true}
 if(!p.stage){
  if(p.complete)p.stage="complete";
  else if(p.queryAcknowledged)p.stage="closing";
  else if(p.querySeen)p.stage="query";
  else if(p.boardComplete)p.stage="board-debrief";
  else if(p.choiceMade)p.stage="board";
  else if(p.introComplete)p.stage="choice";
  else if(p.locationCardSeen)p.stage="intro";
  else if(p.chapterCardSeen)p.stage="location-card";
  else p.stage="chapter-card"
 }
 return p
}
function save(){try{if(typeof autoSave==="function")autoSave()}catch(_){} }
function stopElement(media,reset=false){if(!media)return;try{media.pause();if(reset)media.currentTime=0}catch(_){} }
function stopAudio(reset=false){
 clearTimeout(chapterTimer);chapterTimer=0;clearTimeout(cardTimer);cardTimer=0;clearTimeout(completeTimer);completeTimer=0;
 for(const frame of fadeFrames.values())cancelAnimationFrame(frame);fadeFrames.clear();
 ["ch4P1Score","ch4P1QueryCue"].forEach(id=>stopElement($("#"+id),reset))
}
function fade(media,target,duration=460){
 if(!media)return;const previous=fadeFrames.get(media);if(previous)cancelAnimationFrame(previous);
 const start=clamp(media.volume),end=clamp(target,0,.5),began=performance.now();
 if(end>0&&media.paused){media.volume=0;media.muted=false;media.play().catch(()=>{})}
 const step=now=>{const q=Math.min(1,Math.max(0,(now-began)/duration)),smooth=q*q*(3-2*q);media.volume=start+(end-start)*smooth;if(q<1)fadeFrames.set(media,requestAnimationFrame(step));else{fadeFrames.delete(media);if(end===0)media.pause()}};
 fadeFrames.set(media,requestAnimationFrame(step))
}
function overlaysOpen(){return boardOpen||choiceOpen||queryOpen}
function syncAudio(){
 const s=gs(),score=$("#ch4P1Score"),on=SCREENS.has(active()),enabled=s?.sound!==false&&Number(s?.music??.33)>0;
 if(score)score.loop=true;
 const dialogueDuck=dialogue?.58:1,overlayDuck=overlaysOpen()?.72:1,cardDuck=(active()===INTRO||active()===CARD)?.82:1,completeDuck=active()===COMPLETE?.62:1;
 const target=enabled&&on?clamp(Number(s.music??.33)*.38*dialogueDuck*overlayDuck*cardDuck*completeDuck,0,.38):0;
 fade(score,target,on?620:260)
}
function playQueryCue(){const s=gs(),a=$("#ch4P1QueryCue");if(!a||s?.sound===false)return;try{a.pause();a.currentTime=0;a.volume=clamp(Number(s?.sfx??.55)*.24,0,.28);a.play().catch(()=>{})}catch(_){} }
function safeShow(id){try{show(id)}catch(_){$$('.screen').forEach(n=>n.classList.remove('active'));$("#"+id)?.classList.add('active');if(gs())gs().screen=id}syncAudio()}
function speakerLabel(name){if(!thai())return name;const labels={"Inspector Cheryl Goh":"สารวัตร Cheryl Goh","Farid Rahman":"Farid Rahman"};return labels[name]||name}
function portraitSource(speaker,emotion){try{return typeof portrait==="function"?portrait(speaker,emotion||"neutral"):""}catch(_){return""}}
function recordHistory(line){try{const s=gs();s.history=s.history||[];s.history.push({speaker:speakerLabel(line[0]),text:thai()?line[3]:line[2],chapter:4,phase:1})}catch(_){} }
function renderDialogue(){
 const box=$("#ch4P1Dialogue");if(!box||!dialogue)return;const line=dialogue.lines[dialogue.i],speaker=line[0],right=speaker==="North"||speaker==="Inspector Cheryl Goh",src=portraitSource(speaker,line[1]);
 box.className="dialogue ch4-p1-dialogue"+(right?" right":"");
 box.innerHTML=`<div class="portrait-wrap">${src?`<img class="portrait" src="${src}" alt="">`:""}</div><div class="dialogue-copy"><div class="speaker">${speakerLabel(speaker)}</div><div class="line">${thai()?line[3]:line[2]}</div></div><div class="next">${tr("TAP TO CONTINUE","แตะเพื่อดำเนินต่อ")}</div>`;
 syncAudio()
}
function talk(lines,done){
 const box=$("#ch4P1Dialogue");if(!box){done?.();return}dialogue={lines,i:0,done};box.classList.remove("hidden");renderDialogue();
 box.onclick=()=>{if(!dialogue)return;recordHistory(dialogue.lines[dialogue.i]);dialogue.i++;if(dialogue.i>=dialogue.lines.length){const fn=dialogue.done;dialogue=null;box.classList.add("hidden");box.onclick=null;syncAudio();fn?.();save()}else renderDialogue()}
}

const D={
 intro:[
  ["Inspector Cheryl Goh","focused_command","The dead drop is sealed. Jakarta has agreed to validate the rendezvous token under joint authority, not treat it as an identity warrant.","Dead Drop ถูกปิดผนึกแล้ว Jakarta ตกลงตรวจสอบ Rendezvous Token ภายใต้อำนาจร่วม ไม่ใช่ใช้มันเป็นหมายยืนยันตัวบุคคล"],
  ["Farid Rahman","tablet_read","The token is valid. The identity field is empty by design.","Token ใช้งานได้จริง ส่วนช่อง Identity ถูกเว้นว่างไว้ตั้งแต่ต้น"],
  ["North","analyzing","The wrapper route still points to Jakarta-linked infrastructure. The watcher and cleanup provenance still point through the Bangkok evidence chain.","เส้นทาง Wrapper ยังชี้ไปยังโครงสร้างพื้นฐานที่เชื่อมโยงกับ Jakarta ส่วนที่มาของ Watcher กับ Cleanup ยังชี้ผ่าน Bangkok Evidence Chain"],
  ["Benedict","thinking","Two hands. One shaped the tool. One decided where to aim it.","มีมือสองข้าง ข้างหนึ่งสร้างรูปทรงของเครื่องมือ อีกข้างตัดสินใจว่าจะเล็งมันไปที่ไหน"],
  ["Inspector Cheryl Goh","serious","We have lawful grounds to follow both. We do not have grounds to call either hand a person yet.","เรามีฐานทางกฎหมายให้ตามทั้งสองเส้นทาง แต่ยังไม่มีฐานให้เรียกมือข้างใดว่าเป็นบุคคล"],
  ["Benedict","neutral","Good. People become harder to find once paperwork invents them.","ดี คนจะตามหายากขึ้นเมื่อเอกสารเริ่มประดิษฐ์ตัวตนให้พวกเขา"]
 ],
 choiceCommon:[
  ["Farid Rahman","focused","I will keep the raw mirror and watcher capture in Singapore. No active trace, no contaminated route.","ผมจะเก็บ Raw Mirror และ Watcher Capture ไว้ที่สิงคโปร์ ไม่มี Active Trace และไม่ทำให้เส้นทางปนเปื้อน"],
  ["North","serious","Then we map what each record proves before anyone books a suspect instead of a flight.","งั้นเราจัดแผนที่ก่อนว่าแต่ละบันทึกพิสูจน์อะไรได้บ้าง ก่อนใครจะจองตัวผู้ต้องสงสัยแทนจองเที่ยวบิน"],
  ["Benedict","neutral","A disappointingly sensible travel policy.","เป็นนโยบายเดินทางที่สมเหตุผลจนน่าผิดหวัง"]
 ],
 boardDebrief:[
  ["North","focused","The wrapper fingerprint and rendezvous token belong to the Jakarta tool route. The signed package and cleanup credential belong to the Bangkok deployment path.","Wrapper Fingerprint กับ Rendezvous Token อยู่ในเส้นทางเครื่องมือฝั่ง Jakarta ส่วน Signed Package กับ Cleanup Credential อยู่ในเส้นทาง Deploy ฝั่งกรุงเทพฯ"],
  ["Farid Rahman","tablet_read","Human operator and decision owner remain unresolved. No record closes that gap.","ผู้ใช้งานมนุษย์กับเจ้าของการตัดสินใจยังไม่คลี่คลาย ไม่มีบันทึกใดปิดช่องว่างนั้นได้"],
  ["Inspector Cheryl Goh","softened_professional","That is enough for cooperation in Jakarta. It is not enough for an accusation.","เท่านี้เพียงพอสำหรับความร่วมมือใน Jakarta แต่ยังไม่เพียงพอสำหรับข้อกล่าวหา"],
  ["Benedict","serious","Jakarta tells us who shaped the tool. Bangkok tells us who chose what it did. We follow both without pretending they are the same hand.","Jakarta จะบอกว่าใครสร้างรูปทรงของเครื่องมือ กรุงเทพฯ จะบอกว่าใครเลือกให้มันทำอะไร เราตามทั้งสองทางโดยไม่แกล้งทำว่าเป็นมือข้างเดียวกัน"]
 ],
 query:[
  ["Farid Rahman","alert","Authenticated subscriber query. It did not request the case file.","มี Authenticated Subscriber Query เข้ามา มันไม่ได้ขอ Case File"],
  ["North","alert","Query term: ANALYST OF RECORD.","คำค้นคือ ANALYST OF RECORD"],
  ["Benedict","serious","It is not asking what we found.","มันไม่ได้ถามว่าเราพบอะไร"],
  ["Farid Rahman","focused","It is asking who understood it.","มันถามว่าใครเป็นคนเข้าใจมัน"],
  ["North","serious","Then I am not collateral. I am the search term.","งั้นฉันไม่ใช่ความเสียหายข้างเคียง ฉันคือคำค้น"],
  ["Benedict","serious","No one uses you as bait without asking.","ไม่มีใครใช้คุณเป็นเหยื่อล่อโดยไม่ถาม"],
  ["North","side","Good. Because no one protects me by removing me from my own investigation either.","ดี เพราะไม่มีใครปกป้องฉันด้วยการกันฉันออกจากคดีของตัวเองเหมือนกัน"],
  ["Inspector Cheryl Goh","focused_command","Agreed. North remains operational. Farid holds the mirror. I secure the legal perimeter in Jakarta.","ตกลง North ยังคงปฏิบัติงาน Farid ดูแล Mirror ส่วนฉันจะควบคุมขอบเขตกฎหมายใน Jakarta"],
  ["Benedict","neutral","Book the flight. We follow the hand that built the shadow while Bangkok shows us who cast it.","จองเที่ยวบิน เราจะตามมือที่สร้างเงา ขณะที่กรุงเทพฯ บอกเราว่าใครเป็นคนทอดเงานั้น"]
 ]
};
const CHOICE_BRANCHES={
 source:[
  ["Benedict","serious","Start with the source code. A tool carries habits its author never meant to confess.","เริ่มจาก Source Code เครื่องมือพกนิสัยบางอย่างที่ผู้สร้างไม่เคยตั้งใจสารภาพ"],
  ["North","focused","Then Jakarta gets the source-build comparison. Authorship first, identity only when corroborated.","งั้น Jakarta จะได้ Source-Build Comparison ความเป็นผู้สร้างมาก่อน ส่วนตัวตนต้องรอหลักฐานยืนยันร่วม"]
 ],
 authority:[
  ["Benedict","serious","Start with authorization. The watcher entered through a door someone was allowed to open.","เริ่มจาก Authorization Watcher เข้ามาทางประตูที่ใครบางคนได้รับอนุญาตให้เปิด"],
  ["Inspector Cheryl Goh","focused_command","I will preserve the request chain and every jurisdictional handoff. Valid access remains evidence, not identity.","ฉันจะรักษา Request Chain กับการส่งต่อเขตอำนาจทุกขั้น การเข้าถึงที่ถูกต้องยังเป็นหลักฐาน ไม่ใช่ตัวตน"]
 ],
 fear:[
  ["Benedict","thinking","Start with the person who fears attribution. The callback was not only a warning. It was an argument about blame.","เริ่มจากคนที่กลัวการถูกระบุตัว Callback ไม่ได้เป็นเพียงคำเตือน แต่มันคือข้อโต้แย้งเรื่องการรับผิด"],
  ["North","serious","Then we treat the observer pattern as a threat model, not theatre.","งั้นเราจะปฏิบัติต่อรูปแบบการเฝ้าดูเป็น Threat Model ไม่ใช่การแสดง"]
 ]
};

function copy(){return{
 introNumber:tr("CHAPTER IV","บทที่ IV"),introTitle:"SHADOW OF THE TRUTH",
 day:tr("DAY 4 · LATE EVENING","วันที่ 4 · ช่วงค่ำ"),place:tr("SINGAPORE INVESTIGATION OFFICE","สำนักงานสืบสวนสิงคโปร์"),phase:tr("PHASE I · AFTERIMAGE","เฟส I · ภาพตกค้าง"),
 location:tr("Singapore Investigation Office · Secure Review","สำนักงานสืบสวนสิงคโปร์ · การทบทวนแบบควบคุม"),scene:tr("AFTERIMAGE","ภาพตกค้าง"),
 objective:objectiveText(),
 choiceTitle:tr("WHICH THREAD LEADS THE FIRST MOVE?","เส้นทางใดควรนำการเคลื่อนไหวแรก"),source:tr("FOLLOW THE SOURCE CODE","ตาม SOURCE CODE"),authority:tr("FOLLOW AUTHORIZATION","ตาม AUTHORIZATION"),fear:tr("FOLLOW WHO FEARS ATTRIBUTION","ตามคนที่กลัวการถูกระบุตัว"),
 openBoard:tr("OPEN DUAL-ORIGIN BOARD","เปิดกระดานแหล่งกำเนิดสองทาง"),
 boardTitle:tr("DUAL-ORIGIN CASE BOARD","กระดานคดีแหล่งกำเนิดสองทาง"),boardHelp:tr("Assign every finding to the layer it actually supports.","จัดแต่ละข้อค้นพบลงในชั้นที่มันสนับสนุนได้จริง"),confirm:tr("CONFIRM WORKING THEORY","ยืนยันทฤษฎีการทำงาน"),reset:tr("RESET","เริ่มใหม่"),close:tr("Close","ปิด"),
 queryTitle:tr("AUTHENTICATED SUBSCRIBER QUERY","AUTHENTICATED SUBSCRIBER QUERY"),queryBody:tr("The subscriber requested the analyst who interpreted the evidence, not the evidence itself.","Subscriber ค้นหานักวิเคราะห์ที่ตีความหลักฐาน ไม่ใช่ตัวหลักฐาน"),acknowledge:tr("PRESERVE QUERY CONTEXT","รักษาบริบทของ QUERY"),
 completeEye:tr("PHASE I COMPLETE","จบเฟส I"),completeTitle:tr("AFTERIMAGE","ภาพตกค้าง"),completeBody:tr("The tool route leads to Jakarta. The deployment path leads back to Bangkok. North is now part of the adversary's search.","เส้นทางเครื่องมือนำไป Jakarta เส้นทาง Deploy ชี้กลับกรุงเทพฯ และตอนนี้ North อยู่ในเป้าการค้นหาของอีกฝ่าย"),next:tr("NEXT · PHASE II · JAKARTA ARRIVAL","ถัดไป · เฟส II · เดินทางถึง JAKARTA"),returnTitle:tr("RETURN TO TITLE","กลับหน้าแรก"),
 begin4:tr("BEGIN CHAPTER IV","เริ่มบทที่ IV")
}}
function objectiveText(){const p=ensure();if(!p?.introComplete)return tr("Seal the dead drop and separate the two investigative paths","ปิดผนึก Dead Drop และแยกเส้นทางสืบสวนสองทาง");if(!p.choiceMade)return tr("Choose which thread leads the first move","เลือกเส้นทางที่จะนำการเคลื่อนไหวแรก");if(!p.boardComplete)return tr("Separate the Jakarta tool route from the Bangkok deployment path","แยกเส้นทางเครื่องมือฝั่ง Jakarta ออกจากเส้นทาง Deploy ฝั่งกรุงเทพฯ");if(!p.queryAcknowledged)return tr("Preserve the query targeting the analyst of record","รักษา Query ที่กำลังค้นหา Analyst of Record");return tr("Prepare the Jakarta operation while Farid holds the mirror","เตรียมปฏิบัติการ Jakarta ขณะที่ Farid ดูแล Mirror")}
function boardText(id){const m={
 wrapper_fingerprint:["PALIMPSEST wrapper fingerprint","PALIMPSEST Wrapper Fingerprint","Source-build and wrapper behavior","Source-Build และพฤติกรรม Wrapper"],
 rendezvous_token:["Jakarta rendezvous token","Jakarta Rendezvous Token","Valid lead; sender identity absent","เบาะแสใช้ได้ แต่ไม่มีตัวตนผู้ส่ง"],
 bangkok_package:["Signed Bangkok forensic package","Signed Forensic Package จากกรุงเทพฯ","Watcher delivery provenance","ที่มาของการส่ง Watcher"],
 cleanup_credential:["Pre-Singapore cleanup credential","Cleanup Credential ก่อนเดินทางสิงคโปร์","Valid local deployment access","สิทธิ์ Deploy ในพื้นที่ที่ระบบยอมรับ"],
 decision_owner:["Human operator / decision owner","ผู้ใช้งานมนุษย์ / เจ้าของการตัดสินใจ","No record identifies either","ไม่มีบันทึกใดระบุตัวทั้งสอง"]};
 const x=m[id];return{title:thai()?x[1]:x[0],note:thai()?x[3]:x[2]}
}
function laneText(id){const m={jakarta:["JAKARTA · TOOL ROUTE","JAKARTA · เส้นทางเครื่องมือ"],bangkok:["BANGKOK · DEPLOYMENT PATH","กรุงเทพฯ · เส้นทาง DEPLOY"],unresolved:["ATTRIBUTION · UNRESOLVED","การระบุตัว · ยังไม่คลี่คลาย"]};return thai()?m[id][1]:m[id][0]}

function injectStyle(){if($("#lwChapter04Phase01Style"))return;const link=document.createElement("link");link.id="lwChapter04Phase01Style";link.rel="stylesheet";link.href="css/chapter-04-phase-01.css?v=0132";document.head.appendChild(link)}
function inject(){
 if($("#"+SCREEN))return;const game=$("#game");if(!game)return;
 game.insertAdjacentHTML("beforeend",`
 <section id="${INTRO}" class="screen ch4-p1-intro"><div class="ch4-p1-intro-card"><div class="eyebrow">LAST WITNESS</div><div id="ch4P1IntroNumber" class="ch4-p1-intro-number"></div><h2 id="ch4P1IntroTitle"></h2><div class="ch4-p1-rule"></div></div></section>
 <section id="${CARD}" class="screen ch4-p1-card"><div class="chapter-card"><div id="ch4P1Day" class="eyebrow"></div><h2 id="ch4P1Place"></h2><div class="ch4-p1-rule"></div><p id="ch4P1Phase"></p></div></section>
 <section id="${SCREEN}" class="screen ch4-p1-scene"><img class="scene" src="${OFFICE_IMAGE}" alt="Singapore Investigation Office at night"><div class="overlay ch4-p1-overlay"></div><div class="topbar"><span id="ch4P1Location"></span><div class="hud"><button id="ch4P1Save" class="icon" type="button">💾</button><button id="ch4P1Menu" class="icon" type="button">☰</button></div></div><div id="ch4P1Scene" class="ch4-p1-label"></div><div id="ch4P1Objective" class="ch4-p1-objective"></div><div id="ch4P1Dialogue" class="dialogue ch4-p1-dialogue hidden"></div><button id="ch4P1Action" class="primary ch4-p1-action" type="button" hidden></button><div class="ch4-p1-progress"><span id="ch4P1ProgressText">0%</span><div><i id="ch4P1ProgressFill"></i></div></div><audio id="ch4P1Score" preload="auto" loop><source src="${AUDIO_BASE}afterimage-noir-loop.webm?v=0130" type="audio/webm"><source src="${AUDIO_BASE}afterimage-noir-loop.mp3?v=0130" type="audio/mpeg"></audio><audio id="ch4P1QueryCue" preload="auto" src="assets/audio/chapter-03/phase-08/sfx/mirror-query-accepted.wav?v=0120"></audio></section>
 <section id="${COMPLETE}" class="screen ch4-p1-complete"><div class="ch4-p1-complete-card"><div id="ch4P1CompleteEye" class="eyebrow"></div><h2 id="ch4P1CompleteTitle"></h2><div class="ch4-p1-rule"></div><p id="ch4P1CompleteBody"></p><div class="ch4-p1-complete-grid"><div><span>TOOL ROUTE</span><b>JAKARTA</b></div><div><span>DEPLOYMENT PATH</span><b>BANGKOK</b></div><div><span>ANALYST OF RECORD</span><b>NORTH</b></div><div><span>DECISION OWNER</span><b>UNRESOLVED</b></div></div><strong id="ch4P1Next"></strong><button id="ch4P1ReturnTitle" class="primary" type="button"></button></div></section>
 <div id="ch4P1Choice" class="modal ch4-p1-choice" aria-hidden="true"><div class="modal-card"><div class="eyebrow">BENEDICT · FIRST MOVE</div><h3 id="ch4P1ChoiceTitle"></h3><button type="button" data-ch4-p1-choice="source"></button><button type="button" data-ch4-p1-choice="authority"></button><button type="button" data-ch4-p1-choice="fear"></button></div></div>
 <div id="ch4P1Board" class="modal ch4-p1-board" aria-hidden="true"><div class="modal-card"><header><div><div class="eyebrow">WORKING THEORY · NOT A CHARGE</div><h3 id="ch4P1BoardTitle"></h3></div><button id="ch4P1BoardClose" class="ghost" type="button">×</button></header><p id="ch4P1BoardHelp" class="ch4-p1-help"></p><div id="ch4P1BoardBody"></div><div class="ch4-p1-board-actions"><button id="ch4P1BoardConfirm" class="primary" type="button"></button><button id="ch4P1BoardReset" class="ghost" type="button"></button></div><div id="ch4P1BoardStatus" class="ch4-p1-status" aria-live="polite"></div></div></div>
 <div id="ch4P1Query" class="modal ch4-p1-query" aria-hidden="true"><div class="modal-card"><div class="eyebrow">LIVE MONITOR · READ ONLY</div><h3 id="ch4P1QueryTitle"></h3><div class="ch4-p1-query-readout"><span>QUERY TERM</span><strong>ANALYST OF RECORD</strong><span>REQUEST TYPE</span><b>IDENTITY RESOLUTION</b><span>REQUESTOR</span><b>AUTHENTICATED · UNATTRIBUTED</b></div><p id="ch4P1QueryBody"></p><button id="ch4P1QueryAck" class="primary" type="button"></button></div></div>`);
 bindElements();updateLanguage();paint()
}
function progress(){const p=ensure();let n=5;if(p.chapterCardSeen)n=10;if(p.locationCardSeen)n=15;if(p.introComplete)n=30;if(p.choiceMade)n=45;if(p.boardComplete)n=75;if(p.querySeen)n=90;if(p.queryAcknowledged)n=95;if(p.complete)n=100;$("#ch4P1ProgressText")&&( $("#ch4P1ProgressText").textContent=n+"%" );$("#ch4P1ProgressFill")&&( $("#ch4P1ProgressFill").style.width=n+"%" )}
function paint(){const p=ensure(),c=copy(),action=$("#ch4P1Action");progress();if($("#ch4P1Objective"))$("#ch4P1Objective").textContent=objectiveText();if(action){action.hidden=true;if(p.introComplete&&p.choiceMade&&!p.boardComplete&&!dialogue){action.hidden=false;action.textContent=c.openBoard}}syncAudio()}
function updateLanguage(){
 const c=copy(),map={ch4P1IntroNumber:c.introNumber,ch4P1IntroTitle:c.introTitle,ch4P1Day:c.day,ch4P1Place:c.place,ch4P1Phase:c.phase,ch4P1Location:c.location,ch4P1Scene:c.scene,ch4P1Objective:c.objective,ch4P1Action:c.openBoard,ch4P1ChoiceTitle:c.choiceTitle,ch4P1BoardTitle:c.boardTitle,ch4P1BoardHelp:c.boardHelp,ch4P1BoardConfirm:c.confirm,ch4P1BoardReset:c.reset,ch4P1QueryTitle:c.queryTitle,ch4P1QueryBody:c.queryBody,ch4P1QueryAck:c.acknowledge,ch4P1CompleteEye:c.completeEye,ch4P1CompleteTitle:c.completeTitle,ch4P1CompleteBody:c.completeBody,ch4P1Next:c.next,ch4P1ReturnTitle:c.returnTitle};
 Object.entries(map).forEach(([id,value])=>{const node=$("#"+id);if(node)node.textContent=value});
 $$('[data-ch4-p1-choice]').forEach(button=>button.textContent=c[button.dataset.ch4P1Choice]);
 if(dialogue)renderDialogue();if(boardOpen)renderBoard();syncTeaserControl();paint();if($("#caseModal")?.classList.contains("open"))appendCaseTheory()
}
function syncTeaserControl(){const button=$("#ch3P9TeaserReturn");if(button){button.textContent=copy().begin4;button.dataset.lwChapter4Start="1"}}

function openChoice(){if(dialogue||ensure().choiceMade)return;choiceOpen=true;const modal=$("#ch4P1Choice");modal?.classList.add("open");modal?.setAttribute("aria-hidden","false");syncAudio()}
function closeChoice(){choiceOpen=false;const modal=$("#ch4P1Choice");modal?.classList.remove("open");modal?.setAttribute("aria-hidden","true");syncAudio()}
function applyChoice(key){
 const p=ensure();if(p.choiceApplied)return;p.choiceApplied=true;const s=gs(),profile=ensureEndingProfile(),relationships=s.relationships=s.relationships||{};
 const north=relationships.North=relationships.North||{trust:70,respect:78,attachment:58,suspicion:3};
 const cheryl=relationships["Cheryl Goh"]=relationships["Cheryl Goh"]||{trust:48,respect:68,attachment:12,suspicion:18};
 if(key==="source"){profile.attributionProof+=1;north.respect=clamp(Number(north.respect||0)+2,0,100);s.flags.ch4_follow_source=true}
 if(key==="authority"){profile.chainOfCustody+=1;cheryl.trust=clamp(Number(cheryl.trust||0)+2,0,100);cheryl.respect=clamp(Number(cheryl.respect||0)+1,0,100);s.flags.ch4_follow_authority=true}
 if(key==="fear"){profile.northSafety+=1;north.trust=clamp(Number(north.trust||0)+2,0,100);s.flags.ch4_follow_attribution_fear=true}
}
function rollbackChoice(){
 const p=ensure(),s=gs();if(!p?.choiceApplied||!s)return;const profile=ensureEndingProfile(),relationships=s.relationships=s.relationships||{},north=relationships.North=relationships.North||{trust:70,respect:78,attachment:58,suspicion:3},cheryl=relationships["Cheryl Goh"]=relationships["Cheryl Goh"]||{trust:48,respect:68,attachment:12,suspicion:18};
 if(p.choiceKey==="source"){profile.attributionProof=Math.max(0,Number(profile.attributionProof||0)-1);north.respect=clamp(Number(north.respect||0)-2,0,100);delete s.flags.ch4_follow_source}
 if(p.choiceKey==="authority"){profile.chainOfCustody=Math.max(0,Number(profile.chainOfCustody||0)-1);cheryl.trust=clamp(Number(cheryl.trust||0)-2,0,100);cheryl.respect=clamp(Number(cheryl.respect||0)-1,0,100);delete s.flags.ch4_follow_authority}
 if(p.choiceKey==="fear"){profile.northSafety=Math.max(0,Number(profile.northSafety||0)-1);north.trust=clamp(Number(north.trust||0)-2,0,100);delete s.flags.ch4_follow_attribution_fear}
 p.choiceApplied=false
}
function chooseDirection(key){const p=ensure();if(p.choiceMade||!CHOICE_BRANCHES[key])return;p.choiceMade=true;p.choiceKey=key;p.stage="choice-dialogue";gs().checkpoint="ch4_phase1_choice";applyChoice(key);closeChoice();paint();save();talk([...CHOICE_BRANCHES[key],...D.choiceCommon],()=>{p.stage="board";gs().checkpoint="ch4_phase1_board";save();openBoard()})}

function boardStatus(text="",kind=""){const node=$("#ch4P1BoardStatus");if(!node)return;node.textContent=text;node.className="ch4-p1-status"+(kind?" "+kind:"")}
function renderBoard(){
 const p=ensure(),body=$("#ch4P1BoardBody");if(!body)return;boardStatus();
 body.innerHTML=`<div class="ch4-p1-lane-head">${BOARD_LANES.map(lane=>`<div data-lane="${lane}">${laneText(lane)}</div>`).join("")}</div><div class="ch4-p1-board-grid">${BOARD_IDS.map(id=>{const item=boardText(id),assigned=p.boardAssignments[id]||"";return`<article data-board-card="${id}"><div><b>${item.title}</b><small>${item.note}</small></div><div class="ch4-p1-lane-buttons">${BOARD_LANES.map(lane=>`<button type="button" data-board-lane="${lane}" class="${assigned===lane?"selected":""}">${laneText(lane).split(" · ")[0]}</button>`).join("")}</div></article>`}).join("")}</div>`;
 $$('[data-board-lane]',body).forEach(button=>button.onclick=()=>{const card=button.closest('[data-board-card]');p.boardAssignments[card.dataset.boardCard]=button.dataset.boardLane;renderBoard();save()})
}
function openBoard(){if(dialogue||ensure().boardComplete)return;boardOpen=true;const modal=$("#ch4P1Board");modal?.classList.add("open");modal?.setAttribute("aria-hidden","false");renderBoard();syncAudio()}
function closeBoard(user=true){boardOpen=false;const modal=$("#ch4P1Board");modal?.classList.remove("open");modal?.setAttribute("aria-hidden","true");if(user)paint();syncAudio()}
function resetBoard(){const p=ensure();p.boardAssignments={};renderBoard();save()}
function confirmBoard(){
 const p=ensure();if(BOARD_IDS.some(id=>!p.boardAssignments[id])){boardStatus(tr("Assign all five findings before confirming.","จัดข้อค้นพบทั้งห้ารายการให้ครบก่อนยืนยัน"),"error");return}
 const wrong=BOARD_IDS.filter(id=>p.boardAssignments[id]!==BOARD_CORRECT[id]);if(wrong.length){p.boardAttempts++;const identityWrong=p.boardAssignments.decision_owner!=="unresolved";boardStatus(identityWrong?tr("A route or credential cannot resolve the human decision owner.","เส้นทางหรือ Credential ไม่สามารถระบุตัวเจ้าของการตัดสินใจที่เป็นมนุษย์ได้"):tr("At least one finding confuses tool route with local deployment.","มีอย่างน้อยหนึ่งข้อที่สับสนเส้นทางเครื่องมือกับการ Deploy ในพื้นที่"),"error");save();return}
 p.boardComplete=true;p.workingTheoryAdded=true;p.stage="board-debrief";gs().checkpoint="ch4_phase1_board_complete";try{window.LastWitnessAudioCue?.playPuzzleSuccess?.()}catch(_){}closeBoard(false);paint();save();talk(D.boardDebrief,()=>{p.boardDebriefSeen=true;showQuery()})
}
function showQuery(){const p=ensure();p.querySeen=true;p.stage="query";gs().checkpoint="ch4_phase1_query";queryOpen=true;paint();const modal=$("#ch4P1Query");modal?.classList.add("open");modal?.setAttribute("aria-hidden","false");if(!p.queryCuePlayed){p.queryCuePlayed=true;playQueryCue()}save();syncAudio()}
function acknowledgeQuery(){const p=ensure();if(p.queryAcknowledged)return;p.queryAcknowledged=true;p.stage="closing";gs().checkpoint="ch4_phase1_closing";queryOpen=false;paint();const modal=$("#ch4P1Query");modal?.classList.remove("open");modal?.setAttribute("aria-hidden","true");save();talk(D.query,completePhase)}
function completePhase(){const p=ensure();p.closingDialogueComplete=true;p.complete=true;p.stage="complete";gs().chapter=4;gs().progress=100;gs().checkpoint="ch4_phase1_complete";paint();save();clearTimeout(completeTimer);completeTimer=setTimeout(showComplete,480)}
function showComplete(){clearTimeout(completeTimer);completeTimer=0;inject();const p=ensure();p.complete=true;p.stage="complete";gs().chapter=4;gs().screen=COMPLETE;safeShow(COMPLETE);updateLanguage();save()}

function startOpeningDialogue(){const p=ensure();if(p.introComplete||dialogue)return;p.stage="intro";gs().checkpoint="ch4_phase1_intro";talk(D.intro,()=>{p.introComplete=true;p.stage="choice";gs().checkpoint="ch4_phase1_choice";paint();save();openChoice()})}
function enterScene(){
 inject();const p=ensure();gs().chapter=4;gs().screen=SCREEN;document.title="Last Witness — Shadow of the Truth";if(p.choiceMade&&!p.choiceApplied&&CHOICE_BRANCHES[p.choiceKey])applyChoice(p.choiceKey);safeShow(SCREEN);updateLanguage();
 if(p.complete){showComplete();return}
 if(p.queryAcknowledged&&!p.closingDialogueComplete){talk(D.query,completePhase);return}
 if(p.querySeen&&!p.queryAcknowledged){showQuery();return}
 if(p.boardComplete&&!p.boardDebriefSeen){talk(D.boardDebrief,()=>{p.boardDebriefSeen=true;showQuery()});return}
 if(p.boardComplete){showQuery();return}
 if(p.choiceMade){paint();if(!dialogue)setTimeout(openBoard,0);return}
 if(p.introComplete){paint();setTimeout(openChoice,0);return}
 paint();setTimeout(startOpeningDialogue,420)
}
function showLocationCard(delay=1800){const p=ensure();p.locationCardSeen=true;p.stage="location-card";gs().chapter=4;gs().screen=CARD;gs().checkpoint="ch4_phase1_location_card";safeShow(CARD);updateLanguage();save();clearTimeout(cardTimer);cardTimer=setTimeout(enterScene,delay)}
function showChapterCard(delay=2200){const p=ensure();p.chapterCardSeen=true;p.stage="chapter-card";gs().chapter=4;gs().screen=INTRO;gs().checkpoint="ch4_phase1_chapter_card";safeShow(INTRO);updateLanguage();save();clearTimeout(chapterTimer);chapterTimer=setTimeout(()=>showLocationCard(),delay)}
function startFromTeaser(){
 inject();try{window.LastWitnessPhase9?.stopAudio?.(true)}catch(_){};closeAll();const p=ensure();gs().chapter=4;document.title="Last Witness — Shadow of the Truth";
 if(p.complete){showComplete();return}p.started=true;if(p.locationCardSeen){enterScene();return}if(p.chapterCardSeen){showLocationCard();return}showChapterCard()
}
function startFreshForDev(){const s=gs();if(!s)return;rollbackChoice();s.chapter4=s.chapter4||{};s.chapter4.phase1={started:false,chapterCardSeen:false,locationCardSeen:false,introComplete:false,choiceMade:false,choiceKey:"",choiceApplied:false,boardAssignments:{},boardAttempts:0,boardComplete:false,boardDebriefSeen:false,workingTheoryAdded:false,querySeen:false,queryCuePlayed:false,queryAcknowledged:false,closingDialogueComplete:false,complete:false,stage:"chapter-card"};startFromTeaser()}
function resume(screen){inject();const s=gs(),p=ensure();s.chapter=4;document.title="Last Witness — Shadow of the Truth";updateLanguage();if(screen===INTRO){safeShow(INTRO);clearTimeout(chapterTimer);chapterTimer=setTimeout(()=>showLocationCard(),700);return}if(screen===CARD){safeShow(CARD);clearTimeout(cardTimer);cardTimer=setTimeout(enterScene,700);return}if(screen===SCREEN){enterScene();return}if(screen===COMPLETE){showComplete();return}if(p.complete)showComplete();else enterScene()}
function closeAll(){choiceOpen=boardOpen=queryOpen=false;["ch4P1Choice","ch4P1Board","ch4P1Query"].forEach(id=>{const modal=$("#"+id);modal?.classList.remove("open");modal?.setAttribute("aria-hidden","true")})}
function returnToTitle(){stopAudio(true);closeAll();try{save()}catch(_){};try{window.LastWitnessChapter2Integration?.returnToTitle?.()}catch(_){$$('.screen').forEach(n=>n.classList.remove('active'));$("#title")?.classList.add('active');if(gs())gs().screen="title"}}

function appendCaseTheory(){
 const list=$("#caseList"),p=ensure();if(!list)return;$('[data-ch4-p1-case-section]',list)?.remove();$$('[data-ch4-p1-case-entry]',list).forEach(n=>n.remove());if(!p.boardComplete)return;
 const h=document.createElement("div");h.className="case-section-title";h.dataset.ch4P1CaseSection="1";h.textContent=tr("CHAPTER IV · DUAL-ORIGIN WORKING THEORY","บทที่ IV · ทฤษฎีการทำงานสองแหล่งกำเนิด");list.appendChild(h);
 const row=document.createElement("div");row.className="case-row";row.dataset.ch4P1CaseEntry="dual-origin";row.innerHTML=`<b>${tr("Two Hands, Separate Proof","มือสองข้าง หลักฐานคนละชั้น")}</b><div>${tr("Jakarta supports the tool route. Bangkok supports watcher delivery and cleanup deployment. Human operator and decision owner remain unresolved.","Jakarta สนับสนุนเส้นทางเครื่องมือ กรุงเทพฯ สนับสนุนการส่ง Watcher และการ Deploy Cleanup ส่วนผู้ใช้งานมนุษย์กับเจ้าของการตัดสินใจยังไม่คลี่คลาย")}</div>`;list.appendChild(row)
}

function setBuild(){const label=$("#settingsVersion");if(label)label.textContent=`LAST WITNESS · BUILD ${BUILD}`;if(window.LastWitnessSaveManager)window.LastWitnessSaveManager.version=BUILD}
function installSaveBridge(){
 if(window.__lwChapter4SaveBridge0130)return;window.__lwChapter4SaveBridge0130=true;
 const baseSnapshot=typeof snapshot==="function"?snapshot:window.snapshot;
 if(typeof baseSnapshot==="function"){
  const wrapped=function(){const data=baseSnapshot.apply(this,arguments);data.build=BUILD;data.chapter4=clone(gs()?.chapter4||{});data.endingProfile=clone(ensureEndingProfile());return data};
  try{snapshot=wrapped}catch(_){}window.snapshot=wrapped;if(window.LastWitnessSaveManager)window.LastWitnessSaveManager.snapshot=wrapped
 }
 const basePrepare=typeof prepareRuntimeFor==="function"?prepareRuntimeFor:window.prepareRuntimeFor;
 if(typeof basePrepare==="function"){
  const wrapped=async function(data){await basePrepare.apply(this,arguments);if(String(data?.screen||"").startsWith("chapter4"))await window.LastWitnessChapter2Integration?.ensureProductionRuntime?.()};
  try{prepareRuntimeFor=wrapped}catch(_){}window.prepareRuntimeFor=wrapped
 }
 const baseRestore=typeof restore==="function"?restore:window.restore;
 if(typeof baseRestore==="function"){
  const wrapped=function(data){stopAudio(true);const s=gs();if(s){s.chapter4=clone(data?.chapter4||{});s.endingProfile=Object.assign(endingDefaults(),clone(data?.endingProfile||{}))}const result=baseRestore.apply(this,arguments);if(String(data?.screen||"").startsWith("chapter4")){if(s){s.chapter4=clone(data?.chapter4||{});s.endingProfile=Object.assign(endingDefaults(),clone(data?.endingProfile||{}))}setTimeout(()=>resume(data.screen),140)}return result};
  try{restore=wrapped}catch(_){}window.restore=wrapped;if(window.LastWitnessSaveManager)window.LastWitnessSaveManager.restore=wrapped
 }
 const baseLoad=typeof loadSave==="function"?loadSave:window.loadSave;
 if(typeof baseLoad==="function"){
  const wrapped=async function(kind){if(kind==="auto"){try{const raw=localStorage.getItem(typeof SAVE!=="undefined"?SAVE.auto:"last_witness_rc1_auto"),data=raw?JSON.parse(raw):null;if(String(data?.screen||"").startsWith("chapter4")){await window.LastWitnessChapter2Integration?.ensureProductionRuntime?.();window.restore(data);try{if(typeof closeOverlays==="function")closeOverlays()}catch(_){};return}}catch(error){console.error("LAST WITNESS Chapter IV auto-load failed",error)}}return baseLoad.apply(this,arguments)};
  try{loadSave=wrapped}catch(_){}window.loadSave=wrapped
 }
 const baseLabel=typeof screenLabel==="function"?screenLabel:window.screenLabel;
 if(typeof baseLabel==="function"){
  const wrapped=function(data){const labels={chapter4Intro:["Chapter IV · Shadow of the Truth","บทที่ IV · Shadow of the Truth"],chapter4Phase1Card:["Chapter IV · Phase I · Afterimage","บทที่ IV · เฟส I · ภาพตกค้าง"],chapter4Afterimage:["Chapter IV · Singapore Investigation Office","บทที่ IV · สำนักงานสืบสวนสิงคโปร์"],chapter4Phase1Complete:["Chapter IV · Phase I Complete","บทที่ IV · จบเฟส I"]},pair=labels[data?.screen];return pair?pair[thai()?1:0]:baseLabel.apply(this,arguments)};
  try{screenLabel=wrapped}catch(_){}window.screenLabel=wrapped
 }
}

function primeChapter3CompleteForDev(){const s=gs();if(!s)return;s.flags=s.flags||{};s.chapter3=s.chapter3||{};s.chapter3.phase9=Object.assign({started:true,introComplete:true,containmentComplete:true,containmentDebriefSeen:true,choiceMade:true,choiceKey:"fear",contactComplete:true,cleanupDetected:true,cleanupDecisionComplete:true,deadDropAvailable:true,deadDropHashPreserved:true,deadDropAccepted:true,bundleSealed:true,evidenceCollected:["volatile_capture","watcher_delivery","dead_drop","dual_origin"],closingDialogueComplete:true,complete:true,chapterCardSeen:true,teaserSeen:true,relationshipApplied:true,stage:"teaser"},s.chapter3.phase9||{});s.flags.chapter2_character_feature_unlocked=true;s.journal=Object.assign({unlocked:true,seen:true,introShown:true},s.journal||{});s.relationships=s.relationships||{};s.relationships.North=s.relationships.North||{trust:70,respect:78,attachment:58,suspicion:3};s.relationships["Cheryl Goh"]=s.relationships["Cheryl Goh"]||{trust:48,respect:68,attachment:12,suspicion:18};s.relationships["Farid Rahman"]=s.relationships["Farid Rahman"]||{trust:60,respect:72,attachment:20,suspicion:7};try{window.LastWitnessContentRegistry?.unlockCharacter?.("cheryl",{unread:false,source:"dev",quiet:true});window.LastWitnessContentRegistry?.unlockCharacter?.("farid",{unread:false,source:"dev",quiet:true});window.LastWitnessContentRegistry?.unlockCharacter?.("adrian",{unread:false,source:"dev",quiet:true})}catch(_){} }
function installDevJump(){
 const grid=$("#developerModal .dev-grid");if(!grid)return;let button=grid.querySelector('[data-dev-jump="chapter4Phase1"]');if(!button){button=document.createElement("button");button.className="dev-button";button.type="button";button.dataset.devJump="chapter4Phase1";grid.appendChild(button)}button.textContent=tr("Chapter IV · Phase I · Afterimage","บทที่ IV · เฟส I · ภาพตกค้าง");if(button.dataset.lwCh4Bound==="1")return;button.dataset.lwCh4Bound="1";button.addEventListener("click",async event=>{event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();button.disabled=true;try{await window.LastWitnessChapter2Integration?.ensureProductionRuntime?.();try{window.LastWitnessPhase9?.stopAudio?.(true)}catch(_){};$("#developerModal")?.classList.remove("open");primeChapter3CompleteForDev();startFreshForDev()}catch(error){console.error("LAST WITNESS Chapter IV developer jump failed",error);try{showBadge(tr("Unable to open Chapter IV test scene","ไม่สามารถเปิดฉากทดสอบบทที่ IV ได้"))}catch(_){}}finally{button.disabled=false}},true)
}

function bindElements(){
 $("#ch4P1Save").onclick=()=>{try{manualSave()}catch(_){}};$("#ch4P1Menu").onclick=()=>$("#drawer")?.classList.add("open");$("#ch4P1Action").onclick=openBoard;
 $$('[data-ch4-p1-choice]').forEach(button=>button.onclick=()=>chooseDirection(button.dataset.ch4P1Choice));
 $("#ch4P1BoardClose").onclick=()=>closeBoard(true);$("#ch4P1Board").onclick=event=>{if(event.target.id==="ch4P1Board")closeBoard(true)};$("#ch4P1BoardConfirm").onclick=confirmBoard;$("#ch4P1BoardReset").onclick=resetBoard;
 $("#ch4P1QueryAck").onclick=acknowledgeQuery;$("#ch4P1ReturnTitle").onclick=returnToTitle
}
function bind(){
 injectStyle();inject();installSaveBridge();installDevJump();setBuild();syncTeaserControl();updateLanguage();
 $("#caseButton")?.addEventListener("click",()=>setTimeout(appendCaseTheory,0),true);$("#soundToggle")?.addEventListener("change",syncAudio,true);$("#musicRange")?.addEventListener("input",syncAudio,true);
 document.addEventListener("click",event=>{
  const target=event.target.closest?.("#ch3P9TeaserReturn");if(target){event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();startFromTeaser();return}
  if(event.target.closest?.("#ch3P9Continue4"))setTimeout(syncTeaserControl,0);
  if(event.target.closest?.("[data-lang]"))setTimeout(()=>{updateLanguage();installDevJump();setBuild()},0);
  if(event.target.closest?.("#settingsButton,#settingsVersion,#lwSettingsFullscreen,#lwMenuFullscreen"))setTimeout(setBuild,0);
  if(event.target.closest?.("#restart")&&Number(gs()?.chapter)===4){event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();startFreshForDev()}
 },true);
 document.addEventListener("visibilitychange",()=>{if(document.hidden){clearTimeout(chapterTimer);clearTimeout(cardTimer);stopAudio(false)}else{if(active()===INTRO)chapterTimer=setTimeout(()=>showLocationCard(),650);else if(active()===CARD)cardTimer=setTimeout(enterScene,650);syncAudio()}});
 const screen=active();if(SCREENS.has(screen))setTimeout(()=>resume(screen),0)
}

window.LastWitnessChapter4Phase1={startFromTeaser,startFreshForDev,resumeFromState:resume,stopAudio,returnToTitle,appendCaseTheory,version:BUILD};
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",bind,{once:true});else bind();
})();
