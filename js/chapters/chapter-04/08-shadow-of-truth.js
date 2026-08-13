/* LAST WITNESS - Chapter IV / Phase VIII: SHADOW OF THE TRUTH 0.21.5
 * Direct Phase VII handoff. Shared Chapter IV UI language is preserved.
 * Phase VIII is the CALCULATE bridge into the hidden-case architecture:
 * player-visible story remains shared while hidden case state is derived idempotently.
 */
(function(){
"use strict";
const BUILD="0.21.5";
if(window.LastWitnessChapter4Phase8?.version===BUILD)return;

const BASE="assets/images/chapter-04/phase-08/";
const VIDEO="assets/video/chapter-04/phase-08/";
const AUDIO="assets/audio/chapter-04/phase-08/";
const OPENING="shadowTruthOpening";
const LOCATION="shadowTruthLocationCard";
const DEBRIEF="shadowTruthDebrief";
const DEPARTURE="shadowTruthDeparture";
const TAKEOFF="shadowTruthTakeoff";
const COMPLETE="shadowTruthComplete";
const SCREENS=new Set([OPENING,LOCATION,DEBRIEF,DEPARTURE,TAKEOFF,COMPLETE]);
const EVIDENCE_IDS=["ch4_p8_disclosure_matrix","ch4_p8_arman_boundary","ch4_p8_ika_pre_aster_gap","ch4_p8_bangkok_preservation_order","ch4_p8_registrar_trace","ch4_p8_north_public_removal"];
const SUBJECTS=["adrian","arman","ika"];
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const gs=()=>{try{return state}catch(_){return window.state||null}};
const thai=()=>gs()?.language==="th"||document.documentElement.lang==="th";
const tr=(en,th)=>thai()?th:en;
const clone=v=>JSON.parse(JSON.stringify(v));
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,Number(v)||0));
const active=()=>$(".screen.active")?.id||gs()?.screen||"";
let dialogue=null,transitionTimer=0,matrixOpen=false,evidenceOpen=false,choiceOpen=false,bangkokChoiceOpen=false,evidenceIndex=0,handoffObserver=null,saveBridgeInstalled=false,registryInstalled=false,internalRouting=false,takeoffStartedAt=0,takeoffFinishing=false,handoffStarting=false;
const fadeFrames=new Map();

function defaults(){return{
 started:false,openingSeen:false,titleSeen:false,locationSeen:false,debriefIntroComplete:false,
 matrixStarted:false,matrixSubject:0,matrixPlacements:{},matrixAttempts:{adrian:0,arman:0,ika:0},matrixComplete:false,
 theoryApproach:"",theoryChoiceComplete:false,armanBoundaryReviewed:false,ikaPreAsterReviewed:false,
 bangkokNoticeReviewed:false,bangkokResponse:"",bangkokChoiceComplete:false,registrarTraceReviewed:false,
 closingDebriefComplete:false,departureSeen:false,northRemovalPreserved:false,takeoffSeen:false,
 evidenceViewed:[],evidenceCollected:[],complete:false,stage:"opening"
}}
function ensure(){
 const s=gs();if(!s)return null;s.chapter=4;s.chapter4=s.chapter4||{};s.flags=s.flags||{};s.relationships=s.relationships||{};
 const p=s.chapter4.phase8&&typeof s.chapter4.phase8==="object"?s.chapter4.phase8:{};Object.assign(p,Object.assign(defaults(),p));
 if(!p.matrixPlacements||typeof p.matrixPlacements!=="object")p.matrixPlacements={};
 if(!p.matrixAttempts||typeof p.matrixAttempts!=="object")p.matrixAttempts={adrian:0,arman:0,ika:0};
 SUBJECTS.forEach(id=>{if(!p.matrixPlacements[id]||typeof p.matrixPlacements[id]!=="object")p.matrixPlacements[id]={};if(!Number.isFinite(Number(p.matrixAttempts[id])))p.matrixAttempts[id]=0});
 if(!Array.isArray(p.evidenceViewed))p.evidenceViewed=[];if(!Array.isArray(p.evidenceCollected))p.evidenceCollected=[];
 p.evidenceViewed=[...new Set(p.evidenceViewed.filter(id=>EVIDENCE_IDS.includes(id)))];p.evidenceCollected=[...new Set(p.evidenceCollected.filter(id=>EVIDENCE_IDS.includes(id)))];
 p.matrixSubject=Math.max(0,Math.min(SUBJECTS.length-1,Number(p.matrixSubject)||0));
 if(p.stage==="opening")p.openingSeen=false;
 if(p.complete){Object.assign(p,{started:true,openingSeen:true,titleSeen:true,locationSeen:true,debriefIntroComplete:true,matrixStarted:true,matrixSubject:2,matrixComplete:true,theoryChoiceComplete:true,armanBoundaryReviewed:true,ikaPreAsterReviewed:true,bangkokNoticeReviewed:true,bangkokChoiceComplete:true,registrarTraceReviewed:true,closingDebriefComplete:true,departureSeen:true,northRemovalPreserved:true,takeoffSeen:true,stage:"complete"});p.evidenceViewed=[...EVIDENCE_IDS];p.evidenceCollected=[...EVIDENCE_IDS]}
 s.chapter4.phase8=p;return p
}
function phaseState(){return gs()?.chapter4?.phase8||null}
function save(){try{typeof autoSave==="function"&&autoSave()}catch(_){} }
function setCheckpoint(v){const s=gs();if(s)s.checkpoint=v;save()}
function recomputeCase(){try{return window.LastWitnessHiddenCase?.recompute?.()}catch(error){console.warn("LAST WITNESS P8 hidden-case recompute skipped",error);return null}}
function stopElement(m,reset=false){if(!m)return;try{m.pause();if(reset)m.currentTime=0}catch(_){} }
function clearTimer(){clearTimeout(transitionTimer);transitionTimer=0}
function stopForeignAudio(){["LastWitnessChapter4Phase7","LastWitnessChapter4Phase6","LastWitnessChapter4Phase5","LastWitnessChapter4Phase4","LastWitnessChapter4Phase3","LastWitnessChapter4Phase2","LastWitnessChapter4Phase1"].forEach(n=>{try{window[n]?.stopAudio?.(true)}catch(_){}})}
function safeShow(id){internalRouting=true;try{typeof show==="function"&&show(id)}catch(_){};if(!$("#"+id)?.classList.contains("active")){$$(".screen.active").forEach(n=>n.classList.remove("active"));$("#"+id)?.classList.add("active");if(gs())gs().screen=id}internalRouting=false;syncProgress();syncAudio();try{window.LastWitnessRuntimeBuildLabel?.sync?.()}catch(_){}}
function openSave(){try{if(window.LastWitnessSaveManager?.open)return window.LastWitnessSaveManager.open("save");typeof manualSave==="function"&&manualSave()}catch(_){} }
function openMenu(){try{$("#drawer")?.classList.add("open")}catch(_){} }

function fade(media,target,duration=420){
 if(!media)return;const old=fadeFrames.get(media);if(old)cancelAnimationFrame(old);const start=clamp(media.volume),end=clamp(target,0,.85),began=performance.now();
 if(end>0&&media.paused){media.muted=false;media.play().catch(()=>{})}
 const step=now=>{const q=Math.max(0,Math.min(1,(now-began)/duration)),smooth=q*q*(3-2*q);media.volume=start+(end-start)*smooth;if(q<1)fadeFrames.set(media,requestAnimationFrame(step));else{fadeFrames.delete(media);if(end===0)media.pause()}};fadeFrames.set(media,requestAnimationFrame(step))
}
function overlaysOpen(){return matrixOpen||evidenceOpen||choiceOpen||bangkokChoiceOpen}
function dialogueDuck(){return dialogue?.48:1}
function syncAudio(){
 const s=gs(),screen=active(),on=s?.sound!==false,music=clamp(Number(s?.music??.33)),sfx=clamp(Number(s?.sfx??.55)),duck=dialogueDuck()*(overlaysOpen()?.64:1);
 const invest=$("#ch4P8InvestigationMusic"),depart=$("#ch4P8DepartureMusic"),takeoff=$("#ch4P8TakeoffCue"),room=$("#ch4P8RoomAmb"),roomBase=$("#ch4P8RoomBase"),airport=$("#ch4P8AirportAmb"),airportBase=$("#ch4P8AirportBase"),takeAmb=$("#ch4P8TakeoffAmb");
 const debrief=screen===DEBRIEF,departure=screen===DEPARTURE,take=screen===TAKEOFF;
 [invest,depart,room,roomBase,airport,airportBase].forEach(m=>{if(m)m.loop=true});
 fade(invest,on&&debrief?music*.26*duck:0,520);
 fade(depart,on&&departure?music*.24*duck:0,650);
 fade(takeoff,on&&take?music*.28:0,take?800:420);
 fade(room,on&&debrief?sfx*.055*dialogueDuck():0,500);fade(roomBase,on&&debrief?sfx*.025*dialogueDuck():0,500);
 fade(airport,on&&departure?sfx*.070*dialogueDuck():0,500);fade(airportBase,on&&departure?sfx*.028*dialogueDuck():0,500);
 fade(takeAmb,on&&take?sfx*.16:0,700);
 const ov=$("#ch4P8OpeningVideo"),tv=$("#ch4P8TakeoffVideo");if(ov)ov.volume=on?clamp(sfx*.40,0,.48):0;if(tv)tv.volume=0
}
function stopAudio(reset=false){clearTimer();for(const frame of fadeFrames.values())cancelAnimationFrame(frame);fadeFrames.clear();["ch4P8InvestigationMusic","ch4P8DepartureMusic","ch4P8TakeoffCue","ch4P8RoomAmb","ch4P8RoomBase","ch4P8AirportAmb","ch4P8AirportBase","ch4P8TakeoffAmb","ch4P8MatrixPlace","ch4P8MatrixConfirm","ch4P8MatrixError","ch4P8SecureNotice","ch4P8TraceStinger"].forEach(id=>stopElement($("#"+id),reset));stopElement($("#ch4P8OpeningVideo"),reset);stopElement($("#ch4P8TakeoffVideo"),reset)}
function playOne(id,gain=.34){const m=$("#"+id),s=gs();if(!m||s?.sound===false)return;try{m.pause();m.currentTime=0;m.volume=clamp(Number(s?.sfx??.55)*gain,0,.48);m.play().catch(()=>{})}catch(_){} }

function hud(label){return `<div class="topbar ch4-p5-topbar ch4-p8-topbar"><span id="${label}"></span><div class="hud"><button class="icon ch4-p8-save" type="button" aria-label="Save game">💾</button><button class="icon ch4-p8-menu" type="button" aria-label="Game menu">☰<i class="journal-alert" aria-hidden="true"></i></button></div></div>`}
function progressMarkup(){return '<div class="ch4-p5-progress ch4-p8-progress" aria-label="Phase progress"><span class="ch4-p8-progress-text">0%</span><div><i class="ch4-p5-progress-fill ch4-p8-progress-fill"></i></div></div>'}
function scene(id,image,label,extra=""){return `<section id="${id}" class="screen ch4-p5-scene ch4-p8-scene ${extra}"><img class="scene" src="${image}" alt=""><div class="ch4-p5-shade ch4-p8-shade"></div>${hud(label)}<div id="${id}Scene" class="ch4-p5-label ch4-p8-label"></div><div id="${id}Objective" class="ch4-p5-objective ch4-p8-objective"></div><div id="${id}Dialogue" class="dialogue ch4-p4-dialogue ch4-p5-dialogue ch4-p8-dialogue hidden"></div><button id="${id}Action" class="primary ch4-p5-action ch4-p8-action" type="button" hidden></button>${progressMarkup()}</section>`}
function inject(){
 if($("#"+OPENING))return;const game=$("#game");if(!game)return;
 game.insertAdjacentHTML("beforeend",`
 <section id="${OPENING}" class="screen ch4-p5-video ch4-p8-video"><video id="ch4P8OpeningVideo" playsinline webkit-playsinline preload="auto" poster="${BASE}opening-poster.jpg?v=0215"><source src="${VIDEO}opening-statement-return.mp4?v=0215" type="video/mp4"></video><div class="ch4-p5-shade ch4-p8-video-shade"></div><button id="ch4P8OpeningPlay" class="primary ch4-p5-video-play ch4-p8-video-play" type="button" hidden></button><button id="ch4P8OpeningSkip" class="ghost ch4-p5-skip ch4-p8-skip" type="button"></button></section>
 <section id="${LOCATION}" class="screen ch4-p4-location ch4-p8-card"><div id="ch4P8LocationCardInner" class="ch4-p4-location-card ch4-p8-card-inner"><div id="ch4P8LocationEye" class="eyebrow"></div><div id="ch4P8LocationCity" class="ch4-p4-location-city"></div><h2 id="ch4P8LocationName"></h2><div class="ch4-p4-location-rule"></div><p id="ch4P8LocationBody"></p></div></section>
 ${scene(DEBRIEF,BASE+"secure-debrief-room.png?v=0210","ch4P8DebriefLocation","ch4-p8-debrief")}
 ${scene(DEPARTURE,BASE+"jakarta-departure-corridor.png?v=0210","ch4P8DepartureLocation","ch4-p8-departure")}
 <section id="${TAKEOFF}" class="screen ch4-p8-video ch4-p8-takeoff"><video id="ch4P8TakeoffVideo" playsinline webkit-playsinline preload="auto" poster="assets/video/chapter-03/phase-02/airplane-takeoff-poster.jpg?v=074"><source src="assets/video/chapter-03/phase-02/airplane-takeoff.mp4?v=074" type="video/mp4"></video><div class="ch4-p8-video-shade ch4-p8-takeoff-shade"></div>${progressMarkup()}</section>
 <section id="${COMPLETE}" class="screen ch4-p4-complete ch4-p8-complete"><div class="ch4-p4-complete-card"><div id="ch4P8CompleteEye" class="eyebrow"></div><h2 id="ch4P8CompleteTitle"></h2><div class="ch4-p4-location-rule"></div><p id="ch4P8CompleteBody"></p><div class="ch4-p4-complete-grid"><div><span id="ch4P8ResultJakarta"></span><b id="ch4P8ValueJakarta"></b></div><div><span id="ch4P8ResultRecord"></span><b id="ch4P8ValueRecord"></b></div><div><span id="ch4P8ResultR"></span><b id="ch4P8ValueR"></b></div><div><span id="ch4P8ResultCase"></span><b id="ch4P8ValueCase"></b></div></div><strong id="ch4P8Next"></strong><button id="ch4P8ReturnTitle" class="primary" type="button"></button></div>${progressMarkup()}</section>
 <div id="ch4P8Matrix" class="modal ch4-p8-matrix" aria-hidden="true"><div class="modal-card"><header class="ch4-p8-matrix-head"><div class="eyebrow" id="ch4P8MatrixEye"></div><h3 id="ch4P8MatrixTitle"></h3><p id="ch4P8MatrixBody"></p><div class="ch4-p8-step"><span id="ch4P8MatrixStep"></span><div><i id="ch4P8MatrixStepFill"></i></div></div><div id="ch4P8SubjectTabs" class="ch4-p8-subject-tabs"></div></header><div class="ch4-p8-matrix-scroll"><div id="ch4P8MatrixSlots" class="ch4-p8-matrix-slots"></div><div class="ch4-p8-card-label" id="ch4P8CardLabel"></div><div id="ch4P8MatrixCards" class="ch4-p8-matrix-cards"></div><div id="ch4P8MatrixStatus" class="ch4-p8-status" aria-live="polite"></div></div><footer class="ch4-p8-matrix-foot"><button id="ch4P8MatrixReset" class="ghost" type="button"></button><button id="ch4P8MatrixConfirm" class="primary" type="button"></button></footer></div></div>
 <div id="ch4P8TheoryChoice" class="modal ch4-p8-choice" aria-hidden="true"><div class="modal-card"><div class="eyebrow" id="ch4P8TheoryEye"></div><h3 id="ch4P8TheoryTitle"></h3><p id="ch4P8TheoryBody"></p><div class="ch4-p8-choice-grid"><button type="button" data-p8-theory="boundaries"></button><button type="button" data-p8-theory="chronology"></button><button type="button" data-p8-theory="custody"></button></div></div></div>
 <div id="ch4P8Evidence" class="modal ch4-p8-evidence" aria-hidden="true"><div class="modal-card"><header><div><div id="ch4P8EvidenceEye" class="eyebrow"></div><h3 id="ch4P8EvidenceTitle"></h3></div><span id="ch4P8EvidenceCounter"></span></header><div class="ch4-p8-evidence-scroll"><div id="ch4P8EvidenceCode" class="ch4-p8-evidence-code"></div><p id="ch4P8EvidenceBody"></p><div class="ch4-p8-proof"><span id="ch4P8ProofLabel"></span><strong id="ch4P8EvidenceProof"></strong></div><div class="ch4-p8-limit"><span id="ch4P8LimitLabel"></span><small id="ch4P8EvidenceLimit"></small></div></div><footer><button id="ch4P8EvidenceContinue" class="primary" type="button"></button></footer></div></div>
 <div id="ch4P8BangkokChoice" class="modal ch4-p8-choice" aria-hidden="true"><div class="modal-card"><div class="eyebrow" id="ch4P8BangkokEye"></div><h3 id="ch4P8BangkokTitle"></h3><p id="ch4P8BangkokBody"></p><div class="ch4-p8-choice-grid"><button type="button" data-p8-bangkok="written"></button><button type="button" data-p8-bangkok="parallel"></button><button type="button" data-p8-bangkok="log"></button></div></div></div>
 <div id="ch4P8RemovalCard" class="ch4-p8-removal-card" aria-hidden="true"><span id="ch4P8RemovalEye"></span><strong>NORTH</strong><b id="ch4P8RemovalStatus"></b><small id="ch4P8RemovalNote"></small></div>
 <audio id="ch4P8InvestigationMusic" preload="auto" loop><source src="${AUDIO}investigation-loop.webm?v=0210" type="audio/webm"><source src="${AUDIO}investigation-loop.mp3?v=0210" type="audio/mpeg"></audio><audio id="ch4P8DepartureMusic" preload="auto" loop><source src="${AUDIO}departure-loop.webm?v=0210" type="audio/webm"><source src="${AUDIO}departure-loop.mp3?v=0210" type="audio/mpeg"></audio><audio id="ch4P8TakeoffCue" preload="auto"><source src="${AUDIO}departure-takeoff-cue.webm?v=0210" type="audio/webm"><source src="${AUDIO}departure-takeoff-cue.mp3?v=0210" type="audio/mpeg"></audio>
 <audio id="ch4P8RoomAmb" preload="auto" loop src="assets/audio/chapter-04/phase-02/jakarta-cybercrime-office-loop.mp3?v=0146"></audio><audio id="ch4P8RoomBase" preload="auto" loop src="assets/audio/chapter-03/phase-04/singapore-investigation-office-ambience.mp3?v=0920"></audio><audio id="ch4P8AirportAmb" preload="auto" loop src="assets/audio/chapter-04/phase-02/jakarta-airport-ops-loop.mp3?v=0146"></audio><audio id="ch4P8AirportBase" preload="auto" loop src="assets/audio/chapter-03/phase-03/changi-airport-ambience.mp3?v=0800"></audio><audio id="ch4P8TakeoffAmb" preload="auto" src="assets/audio/chapter-04/phase-02/airplane-takeoff-ambience.mp3?v=0146"></audio>
 <audio id="ch4P8MatrixPlace" preload="auto" src="${AUDIO}matrix-place.mp3?v=0210"></audio><audio id="ch4P8MatrixConfirm" preload="auto" src="${AUDIO}matrix-confirm.mp3?v=0210"></audio><audio id="ch4P8MatrixError" preload="auto" src="${AUDIO}matrix-error.mp3?v=0210"></audio><audio id="ch4P8SecureNotice" preload="auto" src="${AUDIO}secure-notice.mp3?v=0210"></audio><audio id="ch4P8TraceStinger" preload="auto" src="${AUDIO}trace-stinger.mp3?v=0210"></audio>`);
 bindUi();updateLanguage();syncProgress();installOwnerInspector()
}

function speakerLabel(name){if(name==="Farid Rahman")return thai()?"Farid Rahman (ต่อสายจากสิงคโปร์)":"Farid Rahman (Remote · Singapore)";if(!thai())return name;return {"Inspector Cheryl Goh":"สารวัตร Cheryl Goh","Inspector Maya Pranoto":"สารวัตร Maya Pranoto"}[name]||name}
function portraitSource(name,emotion){try{return typeof portrait==="function"?portrait(name,emotion||"neutral"):""}catch(_){return""}}
function dialogueBox(){return $("#"+active()+"Dialogue")}
function recordHistory(line){try{const s=gs();s.history=s.history||[];s.history.push({speaker:speakerLabel(line[0]),text:thai()?line[3]:line[2],chapter:4,phase:8})}catch(_){} }
function renderDialogue(){const box=dialogueBox();if(!box||!dialogue)return;const line=dialogue.lines[dialogue.i],name=line[0],emotion=line[1],right=name!=="Benedict",src=portraitSource(name,emotion);const label=name==="Farid Rahman"?`Farid Rahman <span class="ch4-p8-remote">${thai()?"(ต่อสายจากสิงคโปร์)":"(Remote · Singapore)"}</span>`:speakerLabel(name);box.className="dialogue ch4-p4-dialogue ch4-p8-dialogue"+(right?" right":"");box.innerHTML=`<div class="portrait-wrap">${src?`<img class="portrait" src="${src}" alt="">`:""}</div><div class="dialogue-copy"><div class="speaker">${label}</div><div class="line">${thai()?line[3]:line[2]}</div></div><div class="next">${tr("TAP TO CONTINUE","แตะเพื่อดำเนินต่อ")}</div>`;syncAudio()}
function talk(lines,done){const box=dialogueBox();if(!box){done?.();return}dialogue={lines,i:0,done};box.classList.remove("hidden");renderDialogue();box.onclick=()=>{if(!dialogue)return;recordHistory(dialogue.lines[dialogue.i]);dialogue.i++;if(dialogue.i>=dialogue.lines.length){const fn=dialogue.done;dialogue=null;box.classList.add("hidden");box.onclick=null;syncAudio();fn?.();save()}else renderDialogue()}}

const D={
 debriefIntro:[
  ["Inspector Maya Pranoto","authoritative","Statements are filed. JKT-R7 stays sealed until my evidence team signs the room back to operations. We have one clean window to reconcile what Jakarta actually proved.","ลงบันทึกคำให้การเรียบร้อยแล้ว JKT-R7 จะยังถูกปิดไว้จนกว่าทีมหลักฐานของฉันจะส่งมอบพื้นที่คืน เรามีช่วงเวลานี้ช่วงเดียวที่จะทบทวนให้ชัดว่า Jakarta พิสูจน์อะไรได้จริง"],
  ["Inspector Cheryl Goh","serious","And what it did not. Singapore can defend a chain of custody. It cannot defend an inference we never earned.","รวมถึงสิ่งที่มันยังพิสูจน์ไม่ได้ด้วย สิงคโปร์รับรองสายการควบคุมหลักฐานได้ แต่รับรองข้อสรุปที่เราไม่มีหลักฐานพอไม่ได้"],
  ["Farid Rahman","focused","I rebuilt the disclosure set against the originals. Adrian's documents authenticate. Arman's cache authenticates. Aster's employment dates authenticate.","ผมเทียบข้อมูลที่แต่ละฝ่ายเปิดเผยกับต้นฉบับใหม่ทั้งหมด เอกสารของ Adrian เป็นของจริง Cache ของ Arman เป็นของจริง และวันเริ่มงานกับ Aster ก็เป็นของจริง"],
  ["North","skeptical","Three people, three inconvenient truths, and somehow every truth points past the person who gave it to us.","สามคน ความจริงสามชุดที่ไม่มีใครอยากได้ยิน แล้วทุกชุดก็ดันชี้เลยคนที่เป็นคนส่งมันมาให้เราไปหมด"],
  ["Benedict","thinking","Then stop asking who lied. Ask what each truth allowed us to stop asking.","งั้นเลิกถามว่าใครโกหก แล้วดูว่าความจริงแต่ละชุดทำให้เราเลิกถามเรื่องอะไรไปบ้าง"]
 ],
 matrixAfter:[
  ["North","serious","Nobody lied about the part they gave us.","ไม่มีใครโกหกในส่วนที่เขาให้เรา"],
  ["Benedict","serious","That doesn't mean they gave us the whole truth.","แต่นั่นไม่ได้แปลว่าเขาให้ความจริงเรามาทั้งหมด"],
  ["Inspector Cheryl Goh","focused_command","So we keep the omissions separate. No single missing piece gets promoted into a murderer.","งั้นแยกสิ่งที่แต่ละคนละไว้ให้ชัด อย่าเอาช่องว่างเพียงชิ้นเดียวไปใช้ชี้ว่าใครเป็นฆาตกร"],
  ["Inspector Maya Pranoto","calm_professional","Choose the next review principle. We document the method before we touch another theory.","เลือกหลักที่จะใช้ทบทวนต่อก่อน เราบันทึกวิธีคิดให้ชัด แล้วค่อยแตะทฤษฎีถัดไป"]
 ],
 arman:[
  ["Farid Rahman","analyzing","Arman's cache is complete for what he called an execution package. Wrapper, delivery grammar, broker-facing handoff. The hashes close cleanly.","Cache ของ Arman ครบถ้วนตามขอบเขตที่เขาเรียกว่า Execution Package ทั้ง Wrapper, รูปแบบการส่ง และ Broker-facing handoff ค่า Hash ปิดตรงทั้งหมด"],
  ["North","analyzing","But his broker stores behavior separately. Payment pattern, urgency, return channel, region. None of that belongs to the package we asked for.","แต่ Broker ของเขาเก็บข้อมูลพฤติกรรมแยกอีกระบบ ทั้งรูปแบบการจ่าย ความเร่งด่วน Return Channel และภูมิภาค ซึ่งไม่มีอะไรอยู่ใน Package ที่เราเคยขอ"],
  ["Benedict","neutral","So the cache was honest. Our question was narrow.","แปลว่า Cache ซื่อตรง คำถามของเราต่างหากที่แคบ"],
  ["Farid Rahman","focused","Exactly. That makes Arman more relevant, not automatically more guilty.","ใช่ครับ มันทำให้ Arman สำคัญต่อคดีมากขึ้น ไม่ได้ทำให้เขาผิดมากขึ้นโดยอัตโนมัติ"]
 ],
 ika:[
  ["Inspector Maya Pranoto","analytical","Aster's file still places Ika's recruitment after the murders. That fact has not changed.","แฟ้มของ Aster ยังยืนยันเหมือนเดิมว่า Ika ถูกดึงเข้ามาหลังเหตุฆาตกรรม ข้อเท็จจริงนั้นไม่ได้เปลี่ยน"],
  ["Inspector Cheryl Goh","serious","But the background vendor only verified her history from the Aster intake forward.","แต่บริษัทตรวจประวัติรับรองเส้นทางของเธอได้ตั้งแต่ขั้นตอนรับเข้า Aster เป็นต้นมาเท่านั้น"],
  ["North","skeptical","Before that: an alias hit, two contract gaps, and a travel interval nobody closed.","ก่อนหน้านั้นมีชื่อแฝงหนึ่งรายการ ช่องว่างงานรับจ้างสองช่วง และช่วงการเดินทางที่ยังไม่มีใครปิดได้"],
  ["Benedict","thinking","The Aster timeline clears the Aster period. It doesn't write the rest of her biography.","Timeline ของ Aster ใช้ยืนยันได้เฉพาะช่วงที่เธออยู่กับ Aster มันไม่ได้เขียนประวัติชีวิตส่วนที่เหลือให้เรา"]
 ],
 bangkokNotice:[
  ["Inspector Maya Pranoto","authoritative","Incoming from Bangkok. Emergency Evidence Continuity Order. Valid signature chain.","มีคำสั่งเข้าจากกรุงเทพฯ Emergency Evidence Continuity Order ลายเซ็นตามสายอำนาจถูกต้อง"],
  ["Inspector Cheryl Goh","focused_command","Approving authority?","ผู้อนุมัติคือใคร"],
  ["Inspector Maya Pranoto","serious","Kittisak. Physical transfer assigned to Somchai. Stated basis: source protection and cross-jurisdiction continuity exposure.","Kittisak เป็นผู้อนุมัติ ส่วนการเคลื่อนย้ายหลักฐานมอบให้ Somchai เหตุผลที่ระบุคือการคุ้มครองแหล่งข่าวและความเสี่ยงจาก Continuity ข้ามเขตอำนาจ"],
  ["North","serious","Which is either exactly what a careful institution should do...","ซึ่งอาจเป็นสิ่งที่หน่วยงานรอบคอบควรทำทุกอย่าง..."],
  ["Benedict","neutral","...or exactly what evidence control looks like when you have the right paperwork.","...หรือเป็นภาพของการควบคุมหลักฐานที่มีเอกสารถูกต้องครบทุกใบก็ได้"],
  ["Inspector Cheryl Goh","serious","Those are two different interpretations. Pick a custody response, not a suspect.","นั่นคือการตีความคนละแบบ เลือกวิธีจัดการสายหลักฐาน อย่าเพิ่งเลือกผู้ต้องสงสัย"]
 ],
 registrar:[
  ["North","analyzing","I cross-mapped Room 1807, Profile 18-07, the pier contact and the old registrar activity. One marker survives all four sets.","ฉันเทียบ Room 1807, Profile 18-07, ผู้ติดต่อที่ท่าเรือ และกิจกรรม Registrar เก่าเข้าด้วยกัน มี Marker หนึ่งตัวที่โผล่ครบทั้งสี่ชุด"],
  ["Benedict","serious","R.","R."],
  ["Farid Rahman","focused","Not enough to call it a person. It could be an initial, a role, a handle, even a routing annotation.","ยังไม่พอจะเรียกว่าบุคคล อาจเป็นอักษรย่อ บทบาท Handle หรือแม้แต่หมายเหตุการส่งต่อก็ได้"],
  ["North","pensive","R isn't an answer.","R ไม่ใช่คำตอบ"],
  ["Benedict","thinking","No. But R may have seen the record before everyone else agreed on what it said.","ไม่ใช่ แต่ R อาจเคยเห็นบันทึกก่อนที่ทุกคนจะตกลงกันว่าบันทึกนั้นหมายความว่าอะไร"],
  ["Inspector Maya Pranoto","calm_professional","Then Jakarta is done. Your next lawful question is in Bangkok.","งั้นงานของ Jakarta จบแล้ว คำถามถัดไปที่พวกคุณตามต่อได้อย่างถูกกฎหมายอยู่ที่กรุงเทพฯ"]
 ],
 closing:[
  ["Inspector Cheryl Goh","serious","I'll take the Singapore chain home. No reinterpretation, no cleanup. Originals stay originals.","ฉันจะเอาสายหลักฐานฝั่งสิงคโปร์กลับไป ไม่มีการตีความใหม่ ไม่มีการเก็บกวาด ต้นฉบับต้องคงเป็นต้นฉบับ"],
  ["Inspector Maya Pranoto","authoritative","JKT-R7 remains Indonesian evidence. If Bangkok needs anything from this room, they ask me for it.","JKT-R7 ยังเป็นหลักฐานภายใต้อินโดนีเซีย ถ้ากรุงเทพฯ ต้องการอะไรจากห้องนี้ ให้ขอผ่านฉัน"],
  ["North","dry","I was going to steal a server rack as a souvenir.","ฉันกำลังคิดว่าจะขโมยตู้ Server กลับไปเป็นของที่ระลึกพอดี"],
  ["Inspector Maya Pranoto","restrained_approval","Try the airport gift shop.","ลองดูร้านของฝากที่สนามบินแทน"],
  ["Benedict","smirk","Less paperwork.","เอกสารน้อยกว่าด้วย"],
  ["Inspector Maya Pranoto","calm_professional","Safe flight. And Benedict... bring me facts if you come back. Not a theory wearing a badge.","เดินทางปลอดภัย และ Benedict... ถ้ากลับมาอีก เอาข้อเท็จจริงมาด้วย อย่าเอาทฤษฎีที่ติดตราตำรวจมาฝาก"],
  ["Benedict","neutral","Deal.","ตกลง"]
 ],
 departure:[
  ["North","pensive","They still have me listed as removed.","ในระบบยังขึ้นว่าฉันถูกถอดออกอยู่"],
  ["Benedict","neutral","Good.","ดี"],
  ["North","skeptical","And if they check again?","แล้วถ้าพวกเขาเช็กซ้ำล่ะ"],
  ["Benedict","serious","Let them believe the record.","ก็ปล่อยให้เขาเชื่อในบันทึกนั้น"]
 ]
};

const MATRIX={
 adrian:{name:"ADRIAN",cards:{gave:["Lawful continuity architecture","สถาปัตยกรรม Continuity ที่สร้างโดยชอบ"],proved:["The base architecture was authentic and authorized","สถาปัตยกรรมพื้นฐานเป็นของจริงและได้รับอนุญาต"],limit:["Who used continuity outside the documented deployment boundary","ใครใช้ Continuity นอกขอบเขต Deployment ที่มีเอกสารรองรับ"],next:["Implementation / wrapper layer","ชั้น Implementation / Wrapper"]}},
 arman:{name:"ARMAN",cards:{gave:["Execution package / wrapper cache","Execution Package / Wrapper Cache"],proved:["The delivery package was authentic","Delivery Package เป็นของจริง"],limit:["Who sat behind the blind broker and its deeper ledger","ใครอยู่หลัง Blind Broker และ Ledger ชั้นลึกกว่า"],next:["Field deployment layer","ชั้น Field Deployment"]}},
 ika:{name:"IKA",cards:{gave:["Aster employment timeline","Timeline การทำงานกับ Aster"],proved:["Aster recruited her after the murders","Aster รับเธอเข้าหลังเหตุฆาตกรรม"],limit:["Her operational history before Aster","ประวัติการปฏิบัติงานของเธอก่อน Aster"],next:["Earlier aliases / travel history","ชื่อแฝงและประวัติการเดินทางก่อนหน้า"]}}
};
function matrixCardText(subject,key){const pair=MATRIX[subject]?.cards?.[key]||[key,key];return thai()?pair[1]:pair[0]}
const SLOT_ORDER=["gave","proved","limit","next"];
function slotLabel(k){return {gave:tr("WHAT THEY GAVE","สิ่งที่เขาให้เรา"),proved:tr("WHAT IT PROVED","สิ่งที่มันพิสูจน์ได้"),limit:tr("WHAT IT DID NOT PROVE","สิ่งที่มันยังพิสูจน์ไม่ได้"),next:tr("WHO / WHAT BECAME NEXT TARGET","ใคร / อะไรกลายเป็นเป้าถัดไป")}[k]}
function deterministicCards(subject){const order={adrian:["next","gave","limit","proved"],arman:["proved","next","gave","limit"],ika:["limit","proved","next","gave"]}[subject];return order.map(id=>({id,text:matrixCardText(subject,id)}))}
function renderMatrix(){
 const p=ensure(),subject=SUBJECTS[p.matrixSubject],data=MATRIX[subject],placements=p.matrixPlacements[subject]||{},step=p.matrixSubject+1;
 $("#ch4P8MatrixStep").textContent=tr(`STEP ${step} / 3`,`ขั้น ${step} / 3`);$("#ch4P8MatrixStepFill").style.width=(step/3*100)+"%";
 $("#ch4P8SubjectTabs").innerHTML=SUBJECTS.map((id,i)=>`<button type="button" class="${i===p.matrixSubject?"active":""}${i<p.matrixSubject||p.matrixComplete?" done":""}" data-p8-subject="${i}" ${i>p.matrixSubject&&!p.matrixComplete?"disabled":""}>${MATRIX[id].name}</button>`).join("");
 $("#ch4P8MatrixSlots").innerHTML=SLOT_ORDER.map((slot,i)=>{const card=placements[slot];return `<button type="button" class="ch4-p8-slot${card?" filled":""}" data-p8-slot="${slot}"><span>${i+1}</span><div><small>${slotLabel(slot)}</small><b>${card?matrixCardText(subject,card):tr("Tap a card, then place it here","เลือกการ์ดแล้วแตะช่องนี้เพื่อวาง")}</b></div>${card?`<i data-p8-remove="${slot}">×</i>`:""}</button>`}).join("");
 const used=new Set(Object.values(placements));$("#ch4P8MatrixCards").innerHTML=deterministicCards(subject).filter(c=>!used.has(c.id)).map(c=>`<button type="button" class="ch4-p8-evidence-card${p._selectedMatrixCard===c.id?" selected":""}" data-p8-card="${c.id}"><i></i><span>${c.text}</span></button>`).join("")||`<div class="ch4-p8-all-placed">${tr("All cards placed. Review the chain, then confirm.","วางครบแล้ว ตรวจลำดับอีกครั้งก่อนยืนยัน")}</div>`;
 $$('[data-p8-card]').forEach(b=>b.onclick=()=>{p._selectedMatrixCard=b.dataset.p8Card;playOne("ch4P8MatrixPlace",.22);renderMatrix()});
 $$('[data-p8-slot]').forEach(b=>b.onclick=e=>{if(e.target.closest?.("[data-p8-remove]")){const slot=e.target.closest("[data-p8-remove]").dataset.p8Remove;delete placements[slot];p._selectedMatrixCard="";save();renderMatrix();return}if(!p._selectedMatrixCard)return;const existing=placements[b.dataset.p8Slot];if(existing){const other=Object.keys(placements).find(k=>placements[k]===p._selectedMatrixCard);if(other)placements[other]=existing}placements[b.dataset.p8Slot]=p._selectedMatrixCard;p._selectedMatrixCard="";playOne("ch4P8MatrixPlace",.26);save();renderMatrix()});
 $$('[data-p8-subject]').forEach(b=>b.onclick=()=>{const i=Number(b.dataset.p8Subject);if(i<=p.matrixSubject||p.matrixComplete){p.matrixSubject=i;p._selectedMatrixCard="";save();renderMatrix()}})
}
function openMatrix(){matrixOpen=true;const p=ensure();p.matrixStarted=true;p.stage="matrix";setCheckpoint("ch4_phase8_disclosure_matrix");$("#ch4P8Matrix")?.classList.add("open");$("#ch4P8Matrix")?.setAttribute("aria-hidden","false");renderMatrix();syncProgress();syncAudio()}
function closeMatrix(){matrixOpen=false;$("#ch4P8Matrix")?.classList.remove("open");$("#ch4P8Matrix")?.setAttribute("aria-hidden","true");syncAudio()}
function resetMatrixSubject(){const p=ensure(),subject=SUBJECTS[p.matrixSubject];p.matrixPlacements[subject]={};p._selectedMatrixCard="";$("#ch4P8MatrixStatus").className="ch4-p8-status";$("#ch4P8MatrixStatus").textContent="";save();renderMatrix()}
function confirmMatrix(){const p=ensure(),subject=SUBJECTS[p.matrixSubject],placements=p.matrixPlacements[subject]||{},status=$("#ch4P8MatrixStatus");if(Object.keys(placements).length<4){status.className="ch4-p8-status error";status.textContent=tr("Place all four disclosures before confirming.","วางข้อมูลให้ครบทั้งสี่ช่องก่อนยืนยัน");playOne("ch4P8MatrixError",.28);return}p.matrixAttempts[subject]=(Number(p.matrixAttempts[subject])||0)+1;const wrong=SLOT_ORDER.filter(slot=>placements[slot]!==slot);if(wrong.length){status.className="ch4-p8-status error";status.textContent=tr("The chain contains a mismatch. Re-read what the disclosure proved and what it left outside scope.","ลำดับยังมีจุดไม่ตรง ลองแยกอีกครั้งว่าสิ่งที่เปิดเผยพิสูจน์อะไร และอะไรอยู่นอกขอบเขต");playOne("ch4P8MatrixError",.34);$$('[data-p8-slot]').forEach(b=>b.classList.toggle("review",wrong.includes(b.dataset.p8Slot)));save();return}playOne("ch4P8MatrixConfirm",.34);status.className="ch4-p8-status success";status.textContent=tr("Disclosure chain reconciled.","เชื่อมชุดข้อมูลสำเร็จ");if(p.matrixSubject<SUBJECTS.length-1){setTimeout(()=>{p.matrixSubject++;p._selectedMatrixCard="";status.textContent="";save();renderMatrix()},520);return}p.matrixComplete=true;p.stage="theory-choice";collectEvidence("ch4_p8_disclosure_matrix");recomputeCase();save();setTimeout(()=>{closeMatrix();talk(D.matrixAfter,openTheoryChoice)},600)}

function openTheoryChoice(){choiceOpen=true;setCheckpoint("ch4_phase8_review_principle");$("#ch4P8TheoryChoice")?.classList.add("open");$("#ch4P8TheoryChoice")?.setAttribute("aria-hidden","false");syncAudio()}
function chooseTheory(key){const p=ensure();p.theoryApproach=key;p.theoryChoiceComplete=true;p.stage="arman";choiceOpen=false;$("#ch4P8TheoryChoice")?.classList.remove("open");$("#ch4P8TheoryChoice")?.setAttribute("aria-hidden","true");recomputeCase();save();setCheckpoint("ch4_phase8_arman_boundary");talk(D.arman,()=>openEvidence("arman"))}

function evidenceData(kind){return {
 arman:{id:"ch4_p8_arman_boundary",code:"ARMAN / EXECUTION PACKAGE SCOPE",title:tr("The edge of Arman's cache","ขอบเขตสุดท้ายของ Cache ของ Arman"),body:tr("The package closes cleanly at wrapper delivery. Broker-behaviour records, escrow metadata, return-channel history and regional urgency are stored in a separate system that was never included in the original request.","Package ปิดครบที่ขั้น Wrapper Delivery ส่วน Broker-behaviour, Escrow Metadata, ประวัติ Return Channel และข้อมูลความเร่งด่วนตามภูมิภาค ถูกเก็บไว้อีกระบบซึ่งไม่เคยอยู่ในคำขอเดิม"),proof:tr("The cache remains authentic and Arman's technical role remains real.","Cache ยังคงเป็นของจริง และบทบาททางเทคนิคของ Arman ยังคงเป็นข้อเท็จจริง"),limit:tr("This does not establish who selected the victims, room or timing.","ยังพิสูจน์ไม่ได้ว่าใครเป็นคนเลือกเหยื่อ ห้อง หรือเวลา")},
 ika:{id:"ch4_p8_ika_pre_aster_gap",code:"ASTER / BACKGROUND VERIFICATION",title:tr("Before Aster","ก่อน Aster"),body:tr("Aster's recruitment date remains after the murders. The vendor's verification begins at intake. Earlier contract history contains one alias match, two unverified work gaps and an unresolved travel interval.","วันรับเข้า Aster ยังคงอยู่หลังเหตุฆาตกรรม การตรวจประวัติของบริษัทเริ่มตั้งแต่ขั้นรับเข้า ส่วนก่อนหน้านั้นมีชื่อแฝงหนึ่งรายการ ช่องว่างงานที่ตรวจสอบไม่ได้สองช่วง และช่วงการเดินทางที่ยังไม่คลี่คลาย"),proof:tr("The accepted Aster timeline is still true.","Timeline ของ Aster ที่ยอมรับกันอยู่ยังเป็นความจริง"),limit:tr("It does not establish Ika's full operational history before Aster, nor does it prove murder.","มันยังไม่บอกประวัติการปฏิบัติงานทั้งหมดของ Ika ก่อน Aster และไม่ได้พิสูจน์ว่าเธอฆ่าใคร")},
 bangkok:{id:"ch4_p8_bangkok_preservation_order",code:"BANGKOK / EMERGENCY EVIDENCE CONTINUITY ORDER",title:tr("Bangkok sealed","Bangkok ปิดผนึก"),body:tr("Approving authority: Kittisak. Physical transfer: Somchai. Stated basis: protected source handling and cross-jurisdiction continuity exposure. Signature chain valid. Destination compartment restricted.","ผู้อนุมัติ: Kittisak ผู้ดำเนินการเคลื่อนย้าย: Somchai เหตุผล: การคุ้มครองแหล่งข่าวและความเสี่ยงจาก Continuity ข้ามเขตอำนาจ สายลายเซ็นถูกต้อง ส่วนปลายทางถูกจำกัดสิทธิ์"),proof:tr("A real institutional order moved evidence before Benedict returned to Bangkok.","มีคำสั่งของหน่วยงานจริงที่เคลื่อนย้ายหลักฐานก่อน Benedict กลับถึงกรุงเทพฯ"),limit:tr("Lawful authority can protect evidence or control it. The order alone proves neither criminal intent nor innocence.","อำนาจที่ชอบด้วยกฎหมายอาจใช้เพื่อปกป้องหลักฐานหรือควบคุมหลักฐานก็ได้ คำสั่งเพียงใบเดียวพิสูจน์ไม่ได้ทั้งเจตนาร้ายและความบริสุทธิ์")},
 registrar:{id:"ch4_p8_registrar_trace",code:"R. / REGISTRAR-LAYER TRACE",title:tr("The trace of R.","ร่องรอยของ R."),body:tr("Room 1807, Profile 18-07, the pier contact and old registrar activity share one surviving marker: R. The marker predates the accepted record layer but does not resolve to a verified person.","Room 1807, Profile 18-07, ผู้ติดต่อที่ท่าเรือ และกิจกรรม Registrar เก่า มี Marker เดียวที่ยังอยู่ร่วมกันคือ R. Marker นี้มาก่อนชั้นบันทึกที่ภายหลังถูกยอมรับ แต่ยังไม่ผูกกับบุคคลที่ยืนยันตัวแล้ว"),proof:tr("R. is a viable record-layer lead for Bangkok.","R. เป็นเบาะแสในชั้นบันทึกที่มีน้ำหนักพอให้ตามต่อในกรุงเทพฯ"),limit:tr("R. is not yet a name, suspect or accusation.","R. ยังไม่ใช่ชื่อ ผู้ต้องสงสัย หรือข้อกล่าวหา")}
 }[kind]}
function openEvidence(kind){evidenceOpen=true;const p=ensure(),d=evidenceData(kind);p._activeEvidence=kind;if(!p.evidenceViewed.includes(d.id))p.evidenceViewed.push(d.id);collectEvidence(d.id);$("#ch4P8EvidenceCounter").textContent=({arman:"01",ika:"02",bangkok:"03",registrar:"04"}[kind])+" / 04";$("#ch4P8EvidenceTitle").textContent=d.title;$("#ch4P8EvidenceCode").textContent=d.code;$("#ch4P8EvidenceBody").textContent=d.body;$("#ch4P8EvidenceProof").textContent=d.proof;$("#ch4P8EvidenceLimit").textContent=d.limit;$("#ch4P8EvidenceContinue").textContent=tr("PRESERVE & CONTINUE","เก็บหลักฐานและไปต่อ");$("#ch4P8Evidence")?.classList.add("open");$("#ch4P8Evidence")?.setAttribute("aria-hidden","false");save();syncAudio()}
function closeEvidence(){evidenceOpen=false;$("#ch4P8Evidence")?.classList.remove("open");$("#ch4P8Evidence")?.setAttribute("aria-hidden","true");syncAudio()}
function continueEvidence(){const p=ensure(),kind=p._activeEvidence;closeEvidence();if(kind==="arman"){p.armanBoundaryReviewed=true;p.stage="ika";recomputeCase();save();setCheckpoint("ch4_phase8_ika_pre_aster");talk(D.ika,()=>openEvidence("ika"));return}if(kind==="ika"){p.ikaPreAsterReviewed=true;p.stage="bangkok";recomputeCase();save();setCheckpoint("ch4_phase8_bangkok_notice");playOne("ch4P8SecureNotice",.34);setTimeout(()=>talk(D.bangkokNotice,()=>openEvidence("bangkok")),180);return}if(kind==="bangkok"){p.bangkokNoticeReviewed=true;p.stage="bangkok-choice";recomputeCase();save();openBangkokChoice();return}if(kind==="registrar"){p.registrarTraceReviewed=true;p.stage="closing";recomputeCase();save();setCheckpoint("ch4_phase8_closing");talk(D.closing,finishDebrief);return}}

function openBangkokChoice(){bangkokChoiceOpen=true;$("#ch4P8BangkokChoice")?.classList.add("open");$("#ch4P8BangkokChoice")?.setAttribute("aria-hidden","false");syncAudio()}
function chooseBangkok(key){const p=ensure();p.bangkokResponse=key;p.bangkokChoiceComplete=true;p.stage="registrar";bangkokChoiceOpen=false;$("#ch4P8BangkokChoice")?.classList.remove("open");$("#ch4P8BangkokChoice")?.setAttribute("aria-hidden","true");recomputeCase();save();setCheckpoint("ch4_phase8_registrar_trace");playOne("ch4P8TraceStinger",.28);setTimeout(()=>talk(D.registrar,()=>openEvidence("registrar")),220)}

function collectEvidence(id){const p=ensure();if(!p||!EVIDENCE_IDS.includes(id))return false;if(!p.evidenceCollected.includes(id))p.evidenceCollected.push(id);try{window.LastWitnessContentRegistry?.unlockEvidence?.(id)}catch(_){};try{gs()?.found?.add?.(id)}catch(_){};save();return true}
function evidenceCopy(id){const map={
 ch4_p8_disclosure_matrix:["Cooperation Paradox","Cooperation Paradox"],ch4_p8_arman_boundary:["Arman Cache Boundary","ขอบเขต Cache ของ Arman"],ch4_p8_ika_pre_aster_gap:["Pre-Aster Verification Gap","ช่องว่างการตรวจสอบก่อน Aster"],ch4_p8_bangkok_preservation_order:["Bangkok Preservation Order","คำสั่งรักษาหลักฐานกรุงเทพฯ"],ch4_p8_registrar_trace:["R. Registrar Trace","ร่องรอย Registrar: R."],ch4_p8_north_public_removal:["North Public Removal Record","บันทึกสาธารณะว่า North ถูกถอดออก"]};return map[id]||[id,id]}
function registerContent(){if(registryInstalled)return true;const api=window.LastWitnessContentRegistry;if(!api?.evidence)return false;EVIDENCE_IDS.forEach(id=>{const [en,th]=evidenceCopy(id);api.evidence[id]={phase:"Chapter IV · Shadow of the Truth",title:{en,th}}});registryInstalled=true;if(gs()?.flags?.developer_evidence_unlock_all===true)EVIDENCE_IDS.forEach(id=>api.unlockEvidence?.(id));return true}
function appendCaseEvidence(){const list=$("#caseList"),p=phaseState();if(!list)return;$('[data-ch4-p8-case-section]',list)?.remove();$$('[data-ch4-p8-case-entry]',list).forEach(n=>n.remove());if(!p?.evidenceCollected?.length)return;const h=document.createElement("div");h.className="case-section-title";h.dataset.ch4P8CaseSection="1";h.textContent=tr("CHAPTER IV · SHADOW OF THE TRUTH","บทที่ IV · SHADOW OF THE TRUTH");list.appendChild(h);p.evidenceCollected.forEach(id=>{const [en,th]=evidenceCopy(id),row=document.createElement("div");row.className="case-row";row.dataset.ch4P8CaseEntry=id;row.innerHTML=`<b>${thai()?th:en}</b><div>${tr("Preserved for cross-chapter reconstruction.","เก็บรักษาไว้สำหรับการประกอบคดีข้ามบท")}</div>`;list.appendChild(row)})}

function progressValue(){const p=phaseState();if(!p?.started)return 0;if(p.complete)return 100;switch(p.stage){case"opening":case"location":return 0;case"debrief":return p.debriefIntroComplete?18:8;case"matrix":return 22+Math.round((p.matrixSubject/3)*18);case"theory-choice":return 43;case"arman":return p.armanBoundaryReviewed?52:46;case"ika":return p.ikaPreAsterReviewed?62:55;case"bangkok":case"bangkok-choice":return p.bangkokChoiceComplete?73:66;case"registrar":return p.registrarTraceReviewed?84:77;case"closing":return 87;case"departure":return p.northRemovalPreserved?94:90;case"takeoff":return 97;default:return 0}}
function syncProgress(){const n=Math.round(clamp(progressValue(),0,100));$$('.ch4-p8-progress-text').forEach(x=>x.textContent=n+"%");$$('.ch4-p8-progress-fill').forEach(x=>x.style.width=n+"%");if(gs())gs().progress=n}

function playOpening(){
 inject();const p=ensure();p.started=true;p.openingSeen=false;p.stage="opening";gs().chapter=4;stopForeignAudio();stopAudio(true);safeShow(OPENING);setCheckpoint("ch4_phase8_opening");updateLanguage();
 const v=$("#ch4P8OpeningVideo"),playButton=$("#ch4P8OpeningPlay");
 if(!v){finishOpening();return}
 try{v.pause();v.currentTime=0;v.load()}catch(_){}
 syncAudio();
 try{
  const result=v.play();
  if(result?.then)result.then(()=>{if(playButton)playButton.hidden=true}).catch(()=>{if(playButton)playButton.hidden=false});
  else if(playButton)playButton.hidden=false;
 }catch(_){if(playButton)playButton.hidden=false}
}
function finishOpening(event){
 if(event){event.preventDefault?.();event.stopPropagation?.();event.stopImmediatePropagation?.()}
 const p=ensure();if(p.openingSeen)return;
 p.openingSeen=true;p.stage="location";stopElement($("#ch4P8OpeningVideo"),true);const b=$("#ch4P8OpeningPlay");if(b)b.hidden=true;
 setCheckpoint("ch4_phase8_location");showLocation();save()
}
function showLocation(){const p=ensure();p.titleSeen=true;p.stage="location";setCheckpoint("ch4_phase8_location");safeShow(LOCATION);$("#ch4P8LocationCardInner")?.classList.add("ch4-p5-card-enter");updateLanguage();clearTimer();transitionTimer=setTimeout(()=>enterDebrief(),2850);save()}
function enterDebrief(){const p=ensure();p.locationSeen=true;p.stage=p.matrixComplete?(p.theoryChoiceComplete?(p.armanBoundaryReviewed?(p.ikaPreAsterReviewed?(p.bangkokChoiceComplete?(p.registrarTraceReviewed?"closing":"registrar"):"bangkok"):"ika"):"arman"):"theory-choice"):"debrief";setCheckpoint("ch4_phase8_debrief");safeShow(DEBRIEF);if(!$("#"+DEBRIEF)?.classList.contains("active")){$$(".screen.active").forEach(n=>n.classList.remove("active"));$("#"+DEBRIEF)?.classList.add("active");if(gs())gs().screen=DEBRIEF}updateLanguage();syncAudio();if(!p.debriefIntroComplete){setTimeout(()=>talk(D.debriefIntro,()=>{p.debriefIntroComplete=true;p.stage="matrix";save();openMatrix()}),360);return}resumeDebriefStage()}
function resumeDebriefStage(){const p=ensure();switch(p.stage){case"matrix":setTimeout(openMatrix,180);break;case"theory-choice":setTimeout(openTheoryChoice,180);break;case"arman":setTimeout(()=>talk(D.arman,()=>openEvidence("arman")),200);break;case"ika":setTimeout(()=>talk(D.ika,()=>openEvidence("ika")),200);break;case"bangkok":playOne("ch4P8SecureNotice",.30);setTimeout(()=>talk(D.bangkokNotice,()=>openEvidence("bangkok")),220);break;case"bangkok-choice":setTimeout(openBangkokChoice,180);break;case"registrar":playOne("ch4P8TraceStinger",.24);setTimeout(()=>talk(D.registrar,()=>openEvidence("registrar")),220);break;case"closing":setTimeout(()=>talk(D.closing,finishDebrief),220);break;default:if(!p.matrixComplete)openMatrix()}}
function finishDebrief(){const p=ensure();p.closingDebriefComplete=true;p.stage="departure";setCheckpoint("ch4_phase8_departure");safeShow(DEPARTURE);updateLanguage();syncAudio();setTimeout(()=>showRemovalRecord(),450);save()}
function showRemovalRecord(){const p=ensure();p.departureSeen=true;const card=$("#ch4P8RemovalCard");card?.classList.add("show");card?.setAttribute("aria-hidden","false");collectEvidence("ch4_p8_north_public_removal");setTimeout(()=>{card?.classList.remove("show");card?.setAttribute("aria-hidden","true");talk(D.departure,()=>{p.northRemovalPreserved=true;gs().flags.ch4_p8_north_publicly_removed=true;gs().flags.ch4_p8_registrar_lead_ready=true;p.stage="takeoff";recomputeCase();save();playTakeoff()})},1500)}
function playTakeoff(){const p=ensure();p.stage="takeoff";takeoffStartedAt=performance.now();takeoffFinishing=false;setCheckpoint("ch4_phase8_takeoff");safeShow(TAKEOFF);updateLanguage();const v=$("#ch4P8TakeoffVideo");if(v){try{v.currentTime=0;v.playbackRate=.96;v.play().catch(()=>{clearTimer();transitionTimer=setTimeout(finishTakeoff,5200)})}catch(_){clearTimer();transitionTimer=setTimeout(finishTakeoff,4200)}}else{clearTimer();transitionTimer=setTimeout(finishTakeoff,4200)}syncAudio()}
function finishTakeoff(){const p=ensure();if(takeoffFinishing||p.takeoffSeen&&p.stage!=="takeoff")return;const elapsed=takeoffStartedAt?performance.now()-takeoffStartedAt:4000;if(elapsed<3600){clearTimer();transitionTimer=setTimeout(finishTakeoff,Math.ceil(3600-elapsed));return}takeoffFinishing=true;stopElement($("#ch4P8TakeoffVideo"),false);p.takeoffSeen=true;fade($("#ch4P8TakeoffCue"),0,950);fade($("#ch4P8TakeoffAmb"),0,950);clearTimer();transitionTimer=setTimeout(()=>{takeoffFinishing=false;finishPhase()},920)}
function finishPhase(){const p=ensure();p.complete=true;p.stage="complete";const s=gs();Object.assign(s.flags,{ch4_p8_cooperation_paradox_reconciled:true,ch4_p8_arman_boundary_preserved:true,ch4_p8_ika_pre_aster_open:true,ch4_p8_bangkok_handling_anomaly:true,ch4_p8_r_lead_preserved:true,ch4_p8_north_publicly_removed:true,ch4_p8_chapter5_handoff_ready:true});setCheckpoint("ch4_phase8_complete");recomputeCase();stopAudio(false);safeShow(COMPLETE);updateLanguage();syncProgress();save()}
function returnTitle(){stopAudio(true);try{if(typeof window.LastWitnessChapter2Integration?.returnToTitle==="function")window.LastWitnessChapter2Integration.returnToTitle();else typeof show==="function"&&show("title")}catch(_){} }

function updateLanguage(){if(!$("#"+OPENING))return;const map={
 ch4P8OpeningPlay:tr("PLAY OPENING","เล่นฉากเปิด"),ch4P8OpeningSkip:tr("SKIP","ข้าม"),
 ch4P8LocationEye:tr("DAY 6 · 09:18 WIB","วันที่ 6 · 09:18 น."),ch4P8LocationCity:tr("NORTH JAKARTA · INDONESIA","จาการ์ตาเหนือ · อินโดนีเซีย"),ch4P8LocationName:"JKT-R7 · SECURE DEBRIEF",ch4P8LocationBody:tr("POST-INCIDENT STATEMENT CLEARED · EVIDENCE RECONCILIATION","เสร็จสิ้นการให้ปากคำหลังเหตุการณ์ · ทบทวนความสอดคล้องของหลักฐาน"),
 ch4P8DebriefLocation:tr("JKT-R7 · SECURE DEBRIEF ROOM","JKT-R7 · ห้องสรุปปฏิบัติการ"),[DEBRIEF+"Scene"]:tr("COOPERATION PARADOX","ปริศนาของความร่วมมือ"),[DEBRIEF+"Objective"]:tr("Reconcile what each disclosure proved without turning omission into attribution.","ทบทวนว่าสิ่งที่แต่ละฝ่ายเปิดเผยพิสูจน์อะไร โดยไม่เปลี่ยนช่องว่างให้กลายเป็นการระบุตัวคนร้าย"),
 ch4P8DepartureLocation:tr("SOEKARNO-HATTA · INTERNATIONAL DEPARTURES","SOEKARNO-HATTA · อาคารผู้โดยสารขาออกระหว่างประเทศ"),[DEPARTURE+"Scene"]:tr("DAY 6 · 16:42 WIB","วันที่ 6 · 16:42 น."),[DEPARTURE+"Objective"]:tr("Leave Jakarta with the record intact and one lawful lead for Bangkok.","ออกจาก Jakarta โดยรักษาบันทึกเดิมไว้ และถือเบาะแสที่ชอบด้วยกฎหมายกลับกรุงเทพฯ"),
 ch4P8MatrixEye:tr("AUTHORIZED ANALYSIS · COOPERATION PARADOX","การวิเคราะห์ที่ได้รับอนุญาต · ปริศนาของความร่วมมือ"),ch4P8MatrixTitle:"DISCLOSURE MATRIX",ch4P8MatrixBody:tr("Match each disclosure to what it actually proved, what remained outside scope, and where the investigation moved next. Tap a card, then tap a slot.","จับคู่สิ่งที่แต่ละฝ่ายเปิดเผยกับสิ่งที่พิสูจน์ได้ สิ่งที่ยังอยู่นอกขอบเขต และจุดที่การสืบสวนเคลื่อนไปต่อ แตะการ์ดแล้วแตะช่องเพื่อวาง"),ch4P8CardLabel:tr("DISCLOSURE CARDS","การ์ดข้อมูล"),ch4P8MatrixReset:tr("RESET CURRENT","เริ่มชุดนี้ใหม่"),ch4P8MatrixConfirm:tr("CONFIRM CHAIN","ยืนยันลำดับ"),
 ch4P8TheoryEye:tr("INVESTIGATIVE METHOD · PHASE VIII","วิธีสืบสวน · เฟส VIII"),ch4P8TheoryTitle:tr("What do we preserve before narrowing the theory?","ก่อนบีบทฤษฎีให้แคบลง เราควรรักษาอะไรไว้ก่อน"),ch4P8TheoryBody:tr("This changes the investigation method, not the historical facts.","การเลือกนี้เปลี่ยนวิธีสืบสวน ไม่ได้เปลี่ยนข้อเท็จจริงที่เกิดขึ้น"),
 ch4P8EvidenceEye:tr("CASE REVIEW · AUTHENTIC / LIMITED","ทบทวนคดี · ของจริง / มีขอบเขต"),ch4P8ProofLabel:tr("WHAT IT SUPPORTS","สิ่งที่หลักฐานรองรับ"),ch4P8LimitLabel:tr("WHAT IT DOES NOT ESTABLISH","สิ่งที่หลักฐานยังพิสูจน์ไม่ได้"),
 ch4P8BangkokEye:tr("CUSTODY RESPONSE · BANGKOK ORDER","การตอบสนองด้านสายหลักฐาน · คำสั่งจากกรุงเทพฯ"),ch4P8BangkokTitle:tr("Respond to the transfer without turning procedure into an accusation.","ตอบสนองต่อการเคลื่อนย้ายโดยไม่เปลี่ยนกระบวนการให้กลายเป็นข้อกล่าวหา"),ch4P8BangkokBody:tr("Choose the handling method Benedict records before the team leaves Jakarta.","เลือกวิธีจัดการที่ Benedict จะบันทึกไว้ก่อนทีมออกจาก Jakarta"),
 ch4P8RemovalEye:tr("PUBLIC PERSONNEL RECORD","บันทึกบุคลากรที่เปิดเผยภายนอก"),ch4P8RemovalStatus:tr("REMOVED","REMOVED"),ch4P8RemovalNote:tr("No correction published","ยังไม่มีการเผยแพร่การแก้ไข"),
 ch4P8CompleteEye:tr("CHAPTER IV COMPLETE","จบบทที่ IV"),ch4P8CompleteTitle:"SHADOW OF THE TRUTH",ch4P8CompleteBody:tr("Jakarta closed the physical route without closing the case. Every authentic disclosure now has a boundary, and R. survives as the next lawful lead.","Jakarta ปิดเส้นทางทางกายภาพได้ แต่ยังปิดคดีไม่ได้ ข้อมูลจริงทุกชุดมีขอบเขตของมัน และ R. ยังคงเป็นเบาะแสถัดไปที่ตามต่อได้โดยชอบ"),ch4P8ResultJakarta:tr("JAKARTA OPERATION","ปฏิบัติการ JAKARTA"),ch4P8ValueJakarta:tr("CLOSED","ปิดภารกิจ"),ch4P8ResultRecord:tr("NORTH PUBLIC RECORD","บันทึกสาธารณะของ NORTH"),ch4P8ValueRecord:tr("REMOVED","REMOVED"),ch4P8ResultR:"R.",ch4P8ValueR:tr("REGISTRAR TRACE","ร่องรอย REGISTRAR"),ch4P8ResultCase:tr("CASE ATTRIBUTION","การระบุตัวผู้รับผิดชอบ"),ch4P8ValueCase:tr("UNRESOLVED","ยังไม่ระบุตัว"),ch4P8Next:tr("NEXT · CHAPTER V · THE MISSING PIECE","ต่อไป · บทที่ V · THE MISSING PIECE"),ch4P8ReturnTitle:tr("RETURN TO TITLE","กลับหน้าหลัก")};Object.entries(map).forEach(([id,v])=>{const n=$("#"+id);if(n)n.textContent=v});
 $$('[data-p8-theory="boundaries"]').forEach(b=>b.textContent=tr("Preserve every disclosure boundary","รักษาขอบเขตของข้อมูลทุกชุด"));$$('[data-p8-theory="chronology"]').forEach(b=>b.textContent=tr("Cross-check the physical chronology","เทียบทุกช่องว่างกับลำดับเวลา"));$$('[data-p8-theory="custody"]').forEach(b=>b.textContent=tr("Audit custody and authority first","ตรวจสายหลักฐานและอำนาจก่อน"));
 $$('[data-p8-bangkok="written"]').forEach(b=>b.textContent=tr("Request written scope, preserve cooperation","ขอขอบเขตเป็นลายลักษณ์อักษรและยังร่วมมือ"));$$('[data-p8-bangkok="parallel"]').forEach(b=>b.textContent=tr("Preserve an independent comparison","เก็บสำเนาเปรียบเทียบอย่างอิสระ"));$$('[data-p8-bangkok="log"]').forEach(b=>b.textContent=tr("Accept transfer and log every boundary","ยอมรับการส่งต่อและบันทึกทุกขอบเขต"));
 if(matrixOpen)renderMatrix();if(dialogue)renderDialogue();syncProgress()
}

function bindUi(){
 $$('.ch4-p8-save').forEach(b=>b.onclick=openSave);$$('.ch4-p8-menu').forEach(b=>b.onclick=openMenu);
 const ov=$("#ch4P8OpeningVideo"),ovSource=ov?.querySelector("source");
 const openingMediaError=()=>{if(active()===OPENING)finishOpening()};
 ov?.addEventListener("ended",finishOpening);ov?.addEventListener("error",openingMediaError);ovSource?.addEventListener("error",openingMediaError);
 ov?.addEventListener("playing",()=>{const b=$("#ch4P8OpeningPlay");if(b)b.hidden=true});
 $("#ch4P8OpeningPlay")?.addEventListener("click",()=>{if(!ov){finishOpening();return}try{const result=ov.play();if(result?.then)result.then(()=>{$("#ch4P8OpeningPlay").hidden=true}).catch(()=>{$("#ch4P8OpeningPlay").hidden=false})}catch(_){$("#ch4P8OpeningPlay").hidden=false}});
 $("#ch4P8OpeningSkip")?.addEventListener("click",finishOpening);
 const tv=$("#ch4P8TakeoffVideo");tv?.addEventListener("ended",finishTakeoff);tv?.addEventListener("error",finishTakeoff);
 $("#ch4P8MatrixReset")?.addEventListener("click",resetMatrixSubject);$("#ch4P8MatrixConfirm")?.addEventListener("click",confirmMatrix);$("#ch4P8EvidenceContinue")?.addEventListener("click",continueEvidence);$("#ch4P8ReturnTitle")?.addEventListener("click",returnTitle);
 $$('[data-p8-theory]').forEach(b=>b.addEventListener("click",()=>chooseTheory(b.dataset.p8Theory)));$$('[data-p8-bangkok]').forEach(b=>b.addEventListener("click",()=>chooseBangkok(b.dataset.p8Bangkok)));
 document.addEventListener("click",e=>{if(e.target.closest?.("[data-lang]"))setTimeout(updateLanguage,0);if(e.target.closest?.("#caseButton"))setTimeout(appendCaseEvidence,0);if(e.target.closest?.("#soundToggle,#musicRange,#sfxRange"))setTimeout(syncAudio,0)},true)
}

function resumeFromState(){inject();const p=ensure();recomputeCase();switch(p.stage){case"opening":playOpening();break;case"title":case"location":safeShow(LOCATION);updateLanguage();transitionTimer=setTimeout(enterDebrief,1300);break;case"debrief":case"matrix":case"theory-choice":case"arman":case"ika":case"bangkok":case"bangkok-choice":case"registrar":case"closing":enterDebrief();break;case"departure":safeShow(DEPARTURE);updateLanguage();syncAudio();setTimeout(showRemovalRecord,360);break;case"takeoff":playTakeoff();break;case"complete":safeShow(COMPLETE);updateLanguage();break;default:playOpening()}}
function startFromPhase7(){if(handoffStarting)return true;handoffStarting=true;try{inject();const s=gs(),p=ensure();if(!s?.flags?.ch4_p7_phase8_handoff_ready&&!s?.chapter4?.phase7?.complete)return false;stopForeignAudio();if(p.complete){safeShow(COMPLETE);updateLanguage();return true}if(p.started){resumeFromState();return true}playOpening();return true}finally{setTimeout(()=>{handoffStarting=false},350)}}
function startFreshForDev(){inject();stopAudio(true);stopForeignAudio();const s=gs();s.chapter=4;s.chapter4=s.chapter4||{};s.chapter4.phase7=s.chapter4.phase7||{};Object.assign(s.chapter4.phase7,{started:true,complete:true,closingComplete:true,stage:"complete"});s.flags=s.flags||{};Object.assign(s.flags,{ch4_p7_facility_lawfully_inspected:true,ch4_p7_reader_clock_normalized:true,ch4_p7_r18_correlated:true,ch4_p7_isolation_order_authorized:true,ch4_p7_residual_path_observed:true,ch4_p7_secondary_continuity_supported:true,ch4_p7_decision_owner_unresolved:true,ch4_p7_phase8_handoff_ready:true});s.chapter4.phase8=defaults();recomputeCase();playOpening();return true}
function installHandoff(){if(handoffObserver)return;const check=()=>{if(internalRouting)return;const s=gs();if(!s)return;const complete=$("#relayFacilityPhase7Complete");if((complete?.classList.contains("active")||s.screen==="relayFacilityPhase7Complete")&&(s.flags?.ch4_p7_phase8_handoff_ready||s.chapter4?.phase7?.complete))queueMicrotask(()=>startFromPhase7())};handoffObserver=new MutationObserver(check);handoffObserver.observe(document.body,{subtree:true,attributes:true,attributeFilter:["class"]});document.addEventListener("lw-state-restored",check);setTimeout(check,0)}
function installSaveBridge(){if(saveBridgeInstalled)return;const baseSnapshot=window.snapshot,baseRestore=window.restore;if(typeof baseSnapshot==="function"){window.snapshot=function(){const data=baseSnapshot.apply(this,arguments);try{data.chapter4=clone(gs()?.chapter4||{});data.endingProfile=clone(gs()?.endingProfile||{});data.hiddenCase=clone(gs()?.hiddenCase||{})}catch(_){}return data};try{if(window.LastWitnessSaveManager)window.LastWitnessSaveManager.snapshot=window.snapshot}catch(_){}}if(typeof baseRestore==="function"){window.restore=function(data){const c4=data?.chapter4?clone(data.chapter4):null,ending=data?.endingProfile?clone(data.endingProfile):null,hidden=data?.hiddenCase?clone(data.hiddenCase):null,result=baseRestore.apply(this,arguments);try{if(c4)gs().chapter4=c4;if(ending)gs().endingProfile=ending;if(hidden)gs().hiddenCase=hidden;recomputeCase();document.dispatchEvent(new CustomEvent("lw-state-restored",{detail:{chapter:gs()?.chapter,screen:gs()?.screen}}));if(Number(gs()?.chapter)===4&&SCREENS.has(gs()?.screen))setTimeout(resumeFromState,150)}catch(_){}return result};try{if(window.LastWitnessSaveManager)window.LastWitnessSaveManager.restore=window.restore}catch(_){}}saveBridgeInstalled=true}

function installOwnerInspector(){const grid=$("#developerModal .dev-grid");if(!grid||$("#ch4P8CaseInspectorButton"))return;const b=document.createElement("button");b.id="ch4P8CaseInspectorButton";b.className="dev-button";b.type="button";b.textContent="HIDDEN CASE INSPECTOR · OWNER";b.addEventListener("click",()=>{let modal=$("#ch4P8CaseInspector");if(!modal){modal=document.createElement("div");modal.id="ch4P8CaseInspector";modal.className="modal ch4-p8-inspector";modal.innerHTML='<div class="modal-card"><div class="eyebrow">OWNER ONLY · READ ONLY</div><h3>HIDDEN CASE INSPECTOR</h3><pre id="ch4P8InspectorText"></pre><button class="ghost" id="ch4P8InspectorClose" type="button">CLOSE</button></div>';document.body.appendChild(modal);$("#ch4P8InspectorClose")?.addEventListener("click",()=>modal.classList.remove("open"))}const d=window.LastWitnessHiddenCase?.snapshot?.();$("#ch4P8InspectorText").textContent=d?JSON.stringify({leader:d.leader,ranked:d.ranked,globals:d.globals,suspects:d.suspects,ledger:d.ledger},null,2):"Hidden case engine unavailable";$("#developerModal")?.classList.remove("open");modal.classList.add("open")});grid.appendChild(b)}
function install(){inject();registerContent();installSaveBridge();installHandoff();recomputeCase();updateLanguage();return true}
window.LastWitnessChapter4Phase8={version:BUILD,installed:true,install,startFromPhase7,startFreshForDev,resumeFromState,stopAudio,phaseState,screens:[...SCREENS]};
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",install,{once:true});else install();
})();
