/* LAST WITNESS - Chapter V / Phase I: RETURN TO BANGKOK 0.22.8-c5p1r9
 * Production Chapter V opening. Reuses the accepted Phase V/VII ordinary-scene
 * shell and Phase IV/VII location/completion language. Only CUSTODY WINDOW is
 * bespoke. No Hidden Case values are displayed or mutated here.
 */
(function(){
"use strict";
const VERSION="0.22.8-c5p1r9";
if(window.LastWitnessChapter5Phase1?.version===VERSION){try{window.LastWitnessChapter5Phase1.install?.()}catch(_){}return}

const BASE="assets/images/chapter-05/phase-01/";
const VIDEO="assets/video/chapter-05/phase-01/";
const AUDIO="assets/audio/chapter-05/phase-01/";
const POLICE_IMAGE="assets/images/b06c89de9255c034.png";
const SOMCHAI_SHOCK=BASE+"somchai-shocked.png?v=0228c5p1r7";
const SOMCHAI_SAD=BASE+"somchai-sad.png?v=0228c5p1r9";
const NORTH_CONCERNED=BASE+"north-concerned-full.png?v=0228c5p1r9";
const NORTH_RELIEVED=BASE+"north-relieved-full.png?v=0228c5p1r9";

const LANDING="ch5P1Landing";
const ARRIVAL="ch5P1ArrivalCard";
const POLICE="ch5P1Police";
const BRIEFING="ch5P1Briefing";
const WALK="ch5P1CondoWalk";
const CONDO_CARD="ch5P1CondoCard";
const CONDO="ch5P1Condo";
const REVEAL="ch5P1NorthReveal";
const COMPLETE="ch5P1Complete";
const SCREENS=new Set([LANDING,ARRIVAL,POLICE,BRIEFING,WALK,CONDO_CARD,CONDO,REVEAL,COMPLETE]);

const $=(selector,root=document)=>root.querySelector(selector);
const $$=(selector,root=document)=>Array.from(root.querySelectorAll(selector));
const gs=()=>{try{return state}catch(_){return window.state||null}};
const thai=()=>gs()?.language==="th"||document.documentElement.lang==="th";
const tr=(en,th)=>thai()?th:en;
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,Number(v)||0));
const activeScreen=()=>$(".screen.active")?.id||gs()?.screen||"";
const soundOn=()=>gs()?.sound!==false;
const musicLevel=()=>soundOn()?clamp(gs()?.music??.33):0;
const sfxLevel=()=>soundOn()?clamp(gs()?.sfx??.55):0;
const clone=v=>JSON.parse(JSON.stringify(v));
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));

let dialogue=null;
let dialogueActive=false;
let miniOpen=false;
let influenceOpen=false;
let internalRouting=false;
const fadeFrames=new WeakMap();
let revealDuckUntil=0;
let backgroundPaused=false;
let backgroundSnapshot=null;
let installTimers=[];
let arrivalAutoTimer=0;
let arrivalAutoDeadline=0;
let arrivalAutoRemaining=3000;
const ARRIVAL_AUTO_MS=3000;
let condoCardAutoTimer=0;
const CONDO_CARD_AUTO_MS=3000;

function defaults(){return{
 started:false,landingSeen:false,arrivalSeen:false,policeIntroComplete:false,briefingIntroComplete:false,northCoverPlayed:false,
 custodyStarted:false,custodyStep:1,custodyAssignments:{},custodyConclusion:"",custodyComplete:false,influence:"",
 briefingClosed:false,walkSeen:false,condoCardSeen:false,condoIntroComplete:false,revealSeen:false,debriefComplete:false,complete:false,
 stage:"landing"
}}
function phaseState(){
 const s=gs();if(!s)return null;s.flags=s.flags||{};
 const raw=s.flags.ch5_p1&&typeof s.flags.ch5_p1==="object"?s.flags.ch5_p1:{};
 const p=Object.assign(defaults(),raw);
 p.custodyAssignments=Object.assign({},raw.custodyAssignments||{});
 p.custodyStep=Math.max(1,Math.min(2,Number(p.custodyStep)||1));
 if(p.custodyComplete){p.custodyStep=2;p.custodyAssignments={1:"order",2:"seal",3:"transfer"};p.custodyConclusion="timing"}
 s.flags.ch5_p1=p;return p
}
function save(checkpoint){const s=gs();if(!s)return;if(checkpoint)s.checkpoint=checkpoint;try{typeof autoSave==="function"&&autoSave()}catch(_){} }
function setProgress(value){const s=gs();if(s)s.progress=Math.max(0,Math.min(100,Number(value)||0));syncProgress()}
function progressFor(){const p=phaseState(),screen=activeScreen();if(p?.complete||screen===COMPLETE)return 100;if(screen===REVEAL)return p?.debriefComplete?97:88;if(screen===CONDO)return 83;if(screen===WALK)return 77;if(screen===BRIEFING)return p?.custodyComplete?(p?.briefingClosed?74:68):(p?.briefingIntroComplete?52:25);if(screen===POLICE)return 12;if(screen===ARRIVAL)return 5;return 0}
function syncProgress(){const value=Math.max(Number(gs()?.progress)||0,progressFor());$$('.ch5-p1-progress-text').forEach(n=>n.textContent=Math.round(value)+"%");$$('.ch5-p1-progress-fill').forEach(n=>n.style.width=Math.round(value)+"%")}
function progressMarkup(){return '<div class="ch4-p5-progress ch5-p1-progress" aria-label="Phase progress"><span class="ch5-p1-progress-text">0%</span><div><i class="ch4-p5-progress-fill ch5-p1-progress-fill"></i></div></div>'}
function hud(labelId){return `<div class="topbar ch4-p5-topbar"><span id="${labelId}"></span><div class="hud"><button class="icon ch5-p1-save" type="button" aria-label="Save game">💾</button><button class="icon ch5-p1-menu" type="button" aria-label="Game menu">☰<i class="journal-alert" aria-hidden="true"></i></button></div></div>`}
function scene(id,image,labelId,extra=""){return `<section id="${id}" class="screen ch4-p5-scene ch5-p1-scene ${extra}"><img class="scene" src="${image}" alt=""><div class="ch4-p5-shade"></div>${hud(labelId)}<div id="${id}Scene" class="ch4-p5-label"></div><div id="${id}Objective" class="ch4-p5-objective"></div><div id="${id}Note" class="ch5-p1-scene-note"></div><div id="${id}Dialogue" class="dialogue ch4-p5-dialogue ch5-p1-dialogue hidden"></div><button id="${id}Action" class="primary ch4-p5-action ch5-p1-action" type="button" hidden></button>${progressMarkup()}</section>`}
function positionSceneNotes(){
 requestAnimationFrame(()=>{
  [POLICE,BRIEFING,CONDO].forEach(id=>{
   const screen=$("#"+id),objective=$("#"+id+"Objective"),note=$("#"+id+"Note");
   if(!screen||!objective||!note)return;
   const screenRect=screen.getBoundingClientRect(),objectiveRect=objective.getBoundingClientRect();
   if(!objectiveRect.height)return;
   note.style.top=Math.round(objectiveRect.bottom-screenRect.top+3)+"px";
  })
 })
}

function inject(){
 if($("#"+LANDING))return true;const game=$("#game");if(!game)return false;
 game.insertAdjacentHTML("beforeend",`
 <section id="${LANDING}" class="screen ch5-p1-video"><video id="ch5P1LandingVideo" playsinline webkit-playsinline preload="auto"><source src="${VIDEO}bangkok-landing.mp4?v=0228c5p1r9" type="video/mp4"></video><div class="ch4-p5-shade"></div><div id="ch5P1LandingStatus" class="ch5-p1-video-status"></div><button id="ch5P1LandingPlay" class="primary ch5-p1-video-play" type="button" hidden></button><button id="ch5P1LandingSkip" class="ghost ch5-p1-skip" type="button"></button></section>
 <section id="${ARRIVAL}" class="screen ch4-p4-location"><div id="ch5P1ArrivalCardInner" class="ch4-p4-location-card"><div id="ch5P1ArrivalEye" class="eyebrow"></div><div id="ch5P1ArrivalCity" class="ch4-p4-location-city"></div><h2 id="ch5P1ArrivalName"></h2><div class="ch4-p4-location-rule"></div><p id="ch5P1ArrivalBody"></p></div></section>
 ${scene(POLICE,POLICE_IMAGE,"ch5P1PoliceLocation")}
 ${scene(BRIEFING,BASE+"police-briefing-room.png?v=0228c5p1r7","ch5P1BriefingLocation")}
 <section id="${WALK}" class="screen ch5-p1-video"><video id="ch5P1WalkVideo" playsinline webkit-playsinline preload="auto"><source src="${VIDEO}walk-to-condo.mp4?v=0228c5p1r7" type="video/mp4"></video><div class="ch4-p5-shade"></div><div id="ch5P1WalkStatus" class="ch5-p1-video-status"></div><button id="ch5P1WalkPlay" class="primary ch5-p1-video-play" type="button" hidden></button><button id="ch5P1WalkSkip" class="ghost ch5-p1-skip" type="button"></button></section>
 <section id="${CONDO_CARD}" class="screen ch4-p4-location"><div id="ch5P1CondoCardInner" class="ch4-p4-location-card"><div id="ch5P1CondoEye" class="eyebrow"></div><div id="ch5P1CondoCity" class="ch4-p4-location-city"></div><h2 id="ch5P1CondoName"></h2><div class="ch4-p4-location-rule"></div><p id="ch5P1CondoBody"></p></div></section>
 ${scene(CONDO,BASE+"benedict-condo-interior.jpg?v=0228c5p1r7","ch5P1CondoLocation")}
 ${scene(REVEAL,BASE+"north-safehouse-reveal.jpg?v=0228c5p1r7","ch5P1RevealLocation","ch5-p1-reveal")}
 <div id="ch5P1Custody" class="modal ch5-p1-custody" aria-hidden="true"><div class="modal-card"><header class="ch5-p1-custody-head"><div class="eyebrow" id="ch5P1CustodyEye"></div><h3 id="ch5P1CustodyTitle"></h3><p id="ch5P1CustodyBody"></p><button id="ch5P1CustodyClose" class="ghost ch5-p1-custody-close" type="button" aria-label="Close">×</button><div class="ch5-p1-step"><span id="ch5P1CustodyStepLabel"></span><div><i id="ch5P1CustodyStepFill"></i></div></div></header><div class="ch5-p1-custody-scroll"><div id="ch5P1CustodyAirborne" class="ch5-p1-airborne"></div><div id="ch5P1CustodyWork"></div></div><div id="ch5P1CustodyStatus" class="ch5-p1-custody-status" aria-live="polite"></div><footer class="ch5-p1-custody-foot"><button id="ch5P1CustodyReset" class="ghost" type="button"></button><button id="ch5P1CustodyConfirm" class="primary" type="button"></button></footer></div></div>
 <div id="ch5P1Influence" class="modal ch5-p1-influence" aria-hidden="true"><div class="modal-card"><div class="eyebrow" id="ch5P1InfluenceEye"></div><h3 id="ch5P1InfluenceTitle"></h3><p id="ch5P1InfluenceBody"></p><div id="ch5P1InfluenceGrid" class="ch5-p1-influence-grid"></div></div></div>
 <section id="${COMPLETE}" class="screen ch4-p4-complete ch5-p1-complete"><div class="ch4-p4-complete-card"><div id="ch5P1CompleteEye" class="eyebrow"></div><h2 id="ch5P1CompleteTitle"></h2><div class="ch4-p4-location-rule"></div><p id="ch5P1CompleteBody"></p><div class="ch4-p4-complete-grid"><div><span id="ch5P1ResultReturn"></span><b id="ch5P1ValueReturn"></b></div><div><span id="ch5P1ResultNorth"></span><b id="ch5P1ValueNorth"></b></div><div><span id="ch5P1ResultCustody"></span><b id="ch5P1ValueCustody"></b></div><div><span id="ch5P1ResultRoom"></span><b id="ch5P1ValueRoom"></b></div></div><strong id="ch5P1Next"></strong><button id="ch5P1ReturnTitle" class="primary" type="button"></button></div>${progressMarkup()}</section>
 <audio id="ch5P1OpeningScore" preload="auto" src="${AUDIO}opening-scene-c5p1.mp3?v=0228c5p1r7"></audio>
 <audio id="ch5P1WalkScore" preload="auto" src="${AUDIO}walk-to-condo-scene.mp3?v=0228c5p1r7"></audio>`);
 bindUi();updateLanguage();syncProgress();return true
}

function originalPortrait(name,emotion){try{const mood=String(emotion||"neutral");if(name==="Somchai"){if(["shocked","surprised"].includes(mood))return SOMCHAI_SHOCK;if(["sad","rejected","serious"].includes(mood))return SOMCHAI_SAD}if(name==="North"){if(mood==="concerned")return NORTH_CONCERNED;if(mood==="relieved")return NORTH_RELIEVED}if(typeof portrait==="function")return portrait(name,mood);return PORTRAITS?.[name]?.[mood]||PORTRAITS?.[name]?.neutral||""}catch(_){return""}}
function dialogueBox(){return $("#"+activeScreen()+"Dialogue")}
function recordLine(line){try{const s=gs();s.history=s.history||[];s.history.push({speaker:line.speaker,text:thai()?line.th:line.en,chapter:5,phase:1})}catch(_){} }
function renderDialogue(){
 const box=dialogueBox();if(!box||!dialogue)return;const line=dialogue.lines[dialogue.i];if(!line)return;
 const right=true,src=originalPortrait(line.speaker,line.emotion||"neutral");
 const speakerKey=String(line.speaker||"character").toLowerCase().replace(/[^a-z0-9]+/g,"-");
 box.className="dialogue ch4-p5-dialogue ch5-p1-dialogue ch5-p1-speaker-"+speakerKey+(right?" right":"");
 const portraitClass=["portrait","ch5-p1-portrait","ch5-p1-speaker-"+speakerKey+"-portrait"];
 if(line.speaker==="Somchai")portraitClass.push("ch5-p1-somchai-portrait");
 if(line.speaker==="North")portraitClass.push("ch5-p1-north-portrait");
 if(line.speaker==="Benedict")portraitClass.push("ch5-p1-benedict-portrait");
 const nextText=thai()?"แตะเพื่อดำเนินต่อ":"Tap&nbsp;to&nbsp;continue";
 box.innerHTML=`<div class="portrait-wrap">${src?`<img class="${portraitClass.join(" ")}" src="${src}" alt="">`:""}</div><div class="dialogue-copy"><div class="speaker">${line.speaker}</div><div class="line">${thai()?line.th:line.en}</div></div><div class="next">${nextText}</div>`;
 dialogueActive=true;syncAudio()
}
function startDialogue(lines,onDone){dialogue={lines:clone(lines),i:0,onDone};recordLine(dialogue.lines[0]);renderDialogue()}
function advanceDialogue(){if(!dialogue)return;dialogue.i++;if(dialogue.i>=dialogue.lines.length){const done=dialogue.onDone;dialogue=null;dialogueActive=false;const box=dialogueBox();box?.classList.add("hidden");syncAudio();done?.();return}recordLine(dialogue.lines[dialogue.i]);renderDialogue()}

const line=(speaker,emotion,en,th)=>({speaker,emotion,en,th});
const policeLines=()=>[
 line("Benedict","neutral","Same floor. Different chain of custody.","ชั้นเดิม แต่รอบนี้สายการครอบครองหลักฐานไม่เหมือนเดิม"),
 line("Benedict","serious","Singapore gave us movement. Jakarta gave us the relay. Bangkok gets the record.","สิงคโปร์ให้เส้นทางการเคลื่อนไหว จาการ์ตาให้ Relay ส่วนกรุงเทพต้องจัดการกับบันทึกทั้งหมด")
];
const briefingLead=()=>[
 line("Kittisak","serious","Keep this to what we can prove.","เอาเฉพาะที่พิสูจน์ได้"),
 line("Benedict","serious","The Jakarta relay correlation is lawful. The residual path is real. Decision ownership is still unresolved.","การเชื่อมโยง Relay ที่จาการ์ตาถูกต้องตามขั้นตอน เส้นทางตกค้างมีอยู่จริง แต่คนที่เป็นเจ้าของการตัดสินใจยังระบุไม่ได้"),
 line("Somchai","neutral","And the registrar trace?","แล้วร่องรอยฝั่ง Registrar ล่ะ"),
 line("Benedict","neutral","A lawful lead. Not attribution.","เป็นเบาะแสที่ตามต่อได้อย่างถูกต้อง แต่ยังใช้ระบุตัวใครไม่ได้"),
 line("Elena","calm","So the lead survived the trip.","อย่างน้อยเบาะแสก็กลับมาถึงกรุงเทพครบ"),
 line("Benedict","neutral","The lead did.","เบาะแสกลับมาครบ")
];
const northCoverLines=()=>[
 line("Somchai","neutral","Where's North?","แล้ว North ล่ะ"),
 line("Benedict","somber","She didn't make it back.","เธอไม่ได้กลับมาด้วย"),
 line("Somchai","shocked","...What?","...อะไรนะ"),
 line("Elena","sad","I'm sorry, Benedict.","เสียใจด้วยนะ Benedict"),
 line("Somchai","sad","No. Come on...","ไม่เอาน่า..."),
 line("Benedict","somber","It was my operation. My call.","เป็นปฏิบัติการของผม ผมเป็นคนตัดสินใจเอง"),
 line("Kittisak","serious","Somchai.","สมชาย"),
 line("Somchai","sad","I know. I just... never even got that coffee.","ผมรู้... แค่กาแฟแก้วนั้นยังไม่ได้กินด้วยกันเลย"),
 line("Elena","concerned","Let him finish.","ให้เขาพูดให้จบก่อน"),
 line("Benedict","serious","We still have work to do.","เรายังมีงานต้องทำ")
];
const custodyLead=()=>[
 line("Kittisak","serious","While you were airborne, I sealed three records tied to the registrar trace. Source protection.","ระหว่างที่คุณอยู่บนเครื่อง ผมสั่งปิดผนึกบันทึกสามรายการที่โยงกับ Registrar เพื่อคุ้มครองแหล่งข้อมูล"),
 line("Benedict","suspicious","You moved them before I landed.","คุณย้ายมันก่อนผมถึงกรุงเทพ"),
 line("Kittisak","neutral","I protected them before anyone could ask for them.","ผมกันมันไว้ก่อนที่จะมีใครยื่นมือเข้ามา"),
 line("Somchai","serious","I carried the package. Hand to hand. No network copy.","ผมเป็นคนถือแฟ้มไปเอง ส่งถึงมือ ไม่มีสำเนาผ่านระบบ"),
 line("Benedict","serious","Who knew?","ใครรู้เรื่องนี้บ้าง"),
 line("Kittisak","serious","Me. Somchai. Custody desk.","ผม สมชาย แล้วก็เจ้าหน้าที่ Custody"),
 line("Elena","neutral","That keeps the chain narrow.","อย่างน้อยวงคนที่แตะหลักฐานก็แคบ"),
 line("Benedict","suspicious","And makes the timing worth checking.","และยิ่งทำให้เวลาที่เกิดเรื่องน่าตรวจให้ละเอียด"),
 line("Kittisak","serious","Check it.","ตรวจเลย")
];
const postCustodyLines=()=>[
 line("Benedict","serious","The chain is clean.","สายการครอบครองหลักฐานสะอาด"),
 line("Kittisak","neutral","As I said.","อย่างที่ผมบอก"),
 line("Benedict","suspicious","The timing isn't invisible.","แต่จังหวะเวลามันยังอยู่ตรงนั้น"),
 line("Kittisak","serious","Then follow it.","งั้นก็ตามมันไป"),
 line("Somchai","serious","You want my transfer notes, they're yours.","ถ้าจะดูบันทึกตอนผมย้ายแฟ้ม เอาไปได้ทั้งหมด"),
 line("Elena","neutral","I'll keep the lab copies where they are.","ส่วนสำเนาที่แล็บ ฉันจะยังไม่ให้ใครขยับ"),
 line("Benedict","neutral","Good. Nothing moves again without a second record.","ดี จากนี้ไม่มีอะไรขยับโดยไม่มีบันทึกอีกชั้น")
];
const condoIntroLines=()=>[
 line("Benedict","neutral","Routine all the way home.","ขากลับปกติดีทุกอย่าง"),
 line("Benedict","suspicious","That's as much as I'm willing to trust tonight.","คืนนี้ผมเชื่อคำว่า ‘ปกติ’ ได้แค่นั้น")
];
const revealLines=()=>[
 line("North","neutral","You're late.","มาช้านะ"),
 line("Benedict","smirk","Apparently I'm grieving.","วันนี้ผมต้องไว้ทุกข์อยู่ เลยช้าหน่อย"),
 line("North","dry","How convincing?","สมบทบาทแค่ไหน"),
 line("Benedict","neutral","Somchai almost made me feel guilty.","สมชายเกือบทำให้ผมรู้สึกผิดจริงๆ"),
 line("North","concerned","How bad was he?","หนักขนาดไหน"),
 line("Benedict","smirk","He took it personally.","รับไปเต็มๆ"),
 line("North","skeptical","Oh no.","อย่าบอกนะ"),
 line("Benedict","smirk","Apparently you owed him coffee.","เหมือนคุณติดกาแฟเขาอยู่แก้วนึง"),
 line("North","eyeroll","I never agreed to that.","ฉันไม่เคยรับปากสักหน่อย"),
 line("Benedict","smirk","I'm not going back to correct him.","ผมไม่กลับไปแก้ข่าวให้หรอก")
];
const debriefLines=()=>[
 line("North","analyzing","Kittisak?","Kittisak ล่ะ"),
 line("Benedict","serious","Valid order. Suspicious timing.","คำสั่งถูกต้อง แต่เวลาออกคำสั่งน่าสนใจ"),
 line("North","analyzing","Somchai?","Somchai"),
 line("Benedict","neutral","Moved the package himself. No network copy.","ถือแฟ้มไปเอง ไม่มีสำเนาผ่านระบบ"),
 line("North","neutral","Elena?","Elena ล่ะ"),
 line("Benedict","neutral","Nothing I can use. She handled it like anyone would.","ไม่มีอะไรให้ใช้ต่อ เธอรับข่าวเหมือนคนทั่วไป") ,
 line("North","relieved","Good. Then we keep it that way.","ดี งั้นก็ปล่อยให้ทุกอย่างเป็นแบบนั้นต่อไป"),
 line("North","analyzing","One more thing. The seal inventory points back to Room 1807.","มีอีกอย่าง รายการของที่ถูกปิดผนึกพากลับไปที่ห้อง 1807"),
 line("Benedict","thinking","The hotel room?","ห้องที่โรงแรม?"),
 line("North","serious","Not the room. A protected identity reference attached to it.","ไม่ใช่ตัวห้อง เป็นข้อมูลตัวตนที่ถูกปกป้องและผูกไว้กับห้องนั้น"),
 line("Benedict","serious","A name?","มีชื่อไหม"),
 line("North","analyzing","Not yet. But somebody worked hard to keep it off the visible file.","ยัง แต่มีคนพยายามมากพอสมควรที่จะไม่ให้มันโผล่ในแฟ้มที่เรามองเห็น"),
 line("Benedict","determined","Then that's where we start tomorrow.","งั้นพรุ่งนี้เราเริ่มจากตรงนั้น")
];

function clearArrivalAuto(reset=false){
 clearTimeout(arrivalAutoTimer);arrivalAutoTimer=0;arrivalAutoDeadline=0;if(reset)arrivalAutoRemaining=ARRIVAL_AUTO_MS
}
function clearCondoCardAuto(){clearTimeout(condoCardAutoTimer);condoCardAutoTimer=0}
function pauseArrivalAuto(){
 if(!arrivalAutoTimer)return;arrivalAutoRemaining=Math.max(80,arrivalAutoDeadline-performance.now());clearArrivalAuto(false)
}
function scheduleArrivalAuto(reset=false){
 if(reset)arrivalAutoRemaining=ARRIVAL_AUTO_MS;clearTimeout(arrivalAutoTimer);arrivalAutoTimer=0;
 if(activeScreen()!==ARRIVAL||document.hidden||backgroundPaused)return;
 const delay=Math.max(80,Number(arrivalAutoRemaining)||ARRIVAL_AUTO_MS);arrivalAutoDeadline=performance.now()+delay;
 arrivalAutoTimer=setTimeout(()=>{arrivalAutoTimer=0;arrivalAutoDeadline=0;if(document.hidden||backgroundPaused||activeScreen()!==ARRIVAL){arrivalAutoRemaining=Math.max(80,delay);return}arrivalAutoRemaining=ARRIVAL_AUTO_MS;showPolice()},delay)
}
function resumeArrivalAuto(){if(activeScreen()===ARRIVAL&&!phaseState()?.arrivalSeen)scheduleArrivalAuto(false)}

function safeShow(id){
 clearCondoCardAuto();
 internalRouting=true;try{typeof show==="function"&&show(id)}catch(_){}
 if(!$("#"+id)?.classList.contains("active")){$$(".screen.active").forEach(n=>n.classList.remove("active"));$("#"+id)?.classList.add("active");if(gs())gs().screen=id}
 internalRouting=false;positionSceneNotes();syncProgress();syncAudio()
}
function closeOverlays(){[$("#ch5P1Custody"),$("#ch5P1Influence")].forEach(n=>{n?.classList.remove("open");n?.setAttribute("aria-hidden","true")});miniOpen=false;influenceOpen=false}
function openSave(){try{window.LastWitnessSaveManager?.open?.("save")}catch(_){} }
function openMenu(){try{$("#drawer")?.classList.add("open")}catch(_){} }

function score(id){return $("#"+id)}
function openingScore(){return score("ch5P1OpeningScore")}
function walkScore(){return score("ch5P1WalkScore")}
function landingVideo(){return $("#ch5P1LandingVideo")}
function walkVideo(){return $("#ch5P1WalkVideo")}
function stopElement(m,reset=false){if(!m)return;try{m.pause();if(reset)m.currentTime=0}catch(_){} }
function cancelFade(media){if(!media){[openingScore(),walkScore()].forEach(item=>{if(item)cancelFade(item)});return}const frame=fadeFrames.get(media);if(frame)cancelAnimationFrame(frame);fadeFrames.delete(media)}
function fade(media,target,duration=320){
 if(!media)return;target=clamp(target);cancelFade(media);const start=clamp(media.volume),began=performance.now();
 if(target>0&&media.paused&&!document.hidden&&soundOn())media.play().catch(()=>{});
 const tick=now=>{if(document.hidden){fadeFrames.delete(media);return}const p=clamp((now-began)/Math.max(1,duration));media.volume=clamp(start+(target-start)*p);if(p<1){const frame=requestAnimationFrame(tick);fadeFrames.set(media,frame)}else{fadeFrames.delete(media);if(target<=.0001)media.pause()}};
 const frame=requestAnimationFrame(tick);fadeFrames.set(media,frame)
}
function loopGuard(media,start,end){if(!media||media.dataset.ch5LoopGuard==="1")return;media.dataset.ch5LoopGuard="1";media.addEventListener("timeupdate",()=>{if(document.hidden||backgroundPaused||media.paused)return;if(media.currentTime>=end){try{media.currentTime=start}catch(_){} }})}
function installLoopGuards(){loopGuard(openingScore(),7.25,58.5);loopGuard(walkScore(),11.5,174.0)}
function sceneAudioMode(){const screen=activeScreen();if([LANDING,ARRIVAL,POLICE,BRIEFING].includes(screen))return"opening";if([WALK,CONDO_CARD,CONDO,REVEAL,COMPLETE].includes(screen))return"walk";return"none"}
function sceneMusicBase(){const screen=activeScreen();if(screen===LANDING)return.44;if(screen===ARRIVAL)return.51;if(screen===POLICE)return.49;if(screen===BRIEFING)return.48;if(screen===WALK)return.55;if(screen===CONDO_CARD)return.62;if(screen===CONDO)return.57;if(screen===REVEAL)return performance.now()<revealDuckUntil ? .42 : .55;if(screen===COMPLETE)return.61;return 0}
function syncVideoVolume(){[landingVideo(),walkVideo()].forEach(v=>{if(!v)return;v.muted=!soundOn();v.volume=clamp(sfxLevel()*.82,0,.78)})}
function syncAudio(immediate=false){
 installLoopGuards();syncVideoVolume();if(document.hidden||backgroundPaused){[openingScore(),walkScore()].forEach(a=>a?.pause());return}
 const mode=sceneAudioMode(),level=musicLevel();let duck=1;if(dialogueActive)duck*=.63;if(miniOpen||influenceOpen)duck*=.72;const target=clamp(level*sceneMusicBase()*duck,0,.72);
 const o=openingScore(),w=walkScore();
 if(mode==="opening"){if(w&&!w.paused)fade(w,0,immediate?20:420);if(o){if(!o.dataset.ch5Started){o.dataset.ch5Started="1";try{o.currentTime=0}catch(_){}}fade(o,target,immediate?20:360)}}
 else if(mode==="walk"){if(o&&!o.paused)fade(o,0,immediate?20:450);if(w){if(!w.dataset.ch5Started){w.dataset.ch5Started="1";try{w.currentTime=0}catch(_){}}fade(w,target,immediate?20:520)}}
 else{if(o&&!o.paused)fade(o,0,immediate?20:240);if(w&&!w.paused)fade(w,0,immediate?20:240)}
}
function stopForeignMedia(){
 ["LastWitnessChapter4Phase8","LastWitnessChapter4Phase7","LastWitnessChapter4Phase6","LastWitnessChapter4Phase5","LastWitnessChapter4Phase4","LastWitnessChapter4Phase3","LastWitnessChapter4Phase2","LastWitnessChapter4Phase1"].forEach(name=>{try{window[name]?.stopAudio?.(true)}catch(_){}});
 try{typeof stopLoops==="function"&&stopLoops()}catch(_){}
}
function stopAudio(reset=false){cancelFade();[openingScore(),walkScore(),landingVideo(),walkVideo()].forEach(m=>stopElement(m,reset));if(reset){openingScore()?.removeAttribute("data-ch5-started");walkScore()?.removeAttribute("data-ch5-started")}}
function pauseForBackground(){if(backgroundPaused)return;pauseArrivalAuto();backgroundPaused=true;cancelFade();backgroundSnapshot={screen:activeScreen(),landing:Boolean(landingVideo()&&!landingVideo().paused&&!landingVideo().ended),walk:Boolean(walkVideo()&&!walkVideo().paused&&!walkVideo().ended)};[openingScore(),walkScore(),landingVideo(),walkVideo()].forEach(m=>m?.pause())}
function resumeForeground(){if(!backgroundPaused||document.hidden)return;backgroundPaused=false;const snap=backgroundSnapshot;backgroundSnapshot=null;if(!SCREENS.has(activeScreen()))return;syncAudio(true);resumeArrivalAuto();const v=activeScreen()===LANDING?landingVideo():activeScreen()===WALK?walkVideo():null;const should=v&&(activeScreen()===snap?.screen)&&((v===landingVideo()&&snap?.landing)||(v===walkVideo()&&snap?.walk));if(should){const tryPlay=()=>{if(!document.hidden&&SCREENS.has(activeScreen()))v.play().catch(()=>{})};tryPlay();setTimeout(tryPlay,90);setTimeout(tryPlay,280)}}

function showLanding(){const p=phaseState();p.stage="landing";safeShow(LANDING);setProgress(0);save("ch5_p1_landing");const v=landingVideo();if(!v)return;v.currentTime=0;v.onended=finishLanding;v.onerror=finishLanding;syncAudio();const result=v.play();if(result?.catch)result.catch(()=>{$("#ch5P1LandingPlay")?.removeAttribute("hidden")})}
function showArrivalCard(resetTimer=true){const p=phaseState();p.stage="arrival";safeShow(ARRIVAL);setProgress(5);save("ch5_p1_arrival_card");scheduleArrivalAuto(resetTimer)}
function finishLanding(){const p=phaseState();if(p.landingSeen&&activeScreen()!==LANDING)return;p.landingSeen=true;stopElement(landingVideo(),false);showArrivalCard(true)}
function showPolice(){clearArrivalAuto(true);const p=phaseState();p.arrivalSeen=true;p.stage="police";safeShow(POLICE);setProgress(12);save("ch5_p1_police");if(!p.policeIntroComplete){startDialogue(policeLines(),()=>{p.policeIntroComplete=true;save("ch5_p1_police_ready");const b=$("#"+POLICE+"Action");if(b){b.hidden=false;b.textContent=tr("ENTER BRIEFING","เข้าห้องประชุม")}})}else{const b=$("#"+POLICE+"Action");if(b)b.hidden=false}}
function showBriefing(){const p=phaseState();p.stage="briefing";safeShow(BRIEFING);setProgress(Math.max(22,gs()?.progress||0));save("ch5_p1_briefing");if(!p.briefingIntroComplete){startDialogue(briefingLead(),()=>{p.briefingIntroComplete=true;setProgress(33);save("ch5_p1_briefing_lead");playNorthCover()})}else if(!p.northCoverPlayed)playNorthCover();else if(!p.custodyStarted)startCustodyLead();else if(!p.custodyComplete)showCustodyResume();else if(!p.influence)showInfluence();else if(!p.briefingClosed)finishBriefing();else showLeaveAction()}
function playNorthCover(){const p=phaseState();startDialogue(northCoverLines(),()=>{p.northCoverPlayed=true;setProgress(44);save("ch5_p1_north_cover");startCustodyLead()})}
function startCustodyLead(){const p=phaseState();startDialogue(custodyLead(),()=>{p.custodyStarted=true;p.stage="custody";setProgress(53);save("ch5_p1_custody");openCustody()})}
function showCustodyResume(){const b=$("#"+BRIEFING+"Action");if(b){b.hidden=false;b.textContent=tr("RESUME CUSTODY WINDOW","กลับไปตรวจ CUSTODY WINDOW")}}
function finishBriefing(){const p=phaseState();startDialogue(postCustodyLines(),()=>{p.briefingClosed=true;p.stage="briefing_close";setProgress(74);save("ch5_p1_briefing_complete");showLeaveAction()})}
function showLeaveAction(){const b=$("#"+BRIEFING+"Action");if(b){b.hidden=false;b.textContent=tr("LEAVE THE STATION","ออกจากสถานีตำรวจ")}}
function showWalk(){const p=phaseState();p.stage="walk";safeShow(WALK);setProgress(77);save("ch5_p1_walk");revealDuckUntil=0;const v=walkVideo();if(!v)return;v.currentTime=0;v.onended=finishWalk;v.onerror=finishWalk;syncAudio();const result=v.play();if(result?.catch)result.catch(()=>{$("#ch5P1WalkPlay")?.removeAttribute("hidden")})}
function finishWalk(){const p=phaseState();p.walkSeen=true;p.stage="condo_card";stopElement(walkVideo(),false);safeShow(CONDO_CARD);setProgress(81);save("ch5_p1_condo_card");condoCardAutoTimer=setTimeout(()=>{condoCardAutoTimer=0;if(activeScreen()===CONDO_CARD)showCondo()},CONDO_CARD_AUTO_MS)}
function showCondo(){const p=phaseState();p.condoCardSeen=true;p.stage="condo";safeShow(CONDO);setProgress(83);save("ch5_p1_condo");if(!p.condoIntroComplete){startDialogue(condoIntroLines(),()=>{p.condoIntroComplete=true;save("ch5_p1_condo_ready");const b=$("#"+CONDO+"Action");if(b){b.hidden=false;b.textContent=tr("CONTINUE","ดำเนินต่อ")}})}else{const b=$("#"+CONDO+"Action");if(b)b.hidden=false}}
function showReveal(){const p=phaseState();p.stage="reveal";revealDuckUntil=performance.now()+2800;safeShow(REVEAL);setProgress(88);save("ch5_p1_north_reveal");setTimeout(()=>syncAudio(),2900);if(!p.revealSeen){startDialogue(revealLines(),()=>{p.revealSeen=true;setProgress(92);save("ch5_p1_reveal_complete");startDebrief()})}else if(!p.debriefComplete)startDebrief();else completePhase()}
function startDebrief(){const p=phaseState();safeShow(CONDO);p.stage="debrief";setProgress(93);save("ch5_p1_debrief");startDialogue(debriefLines(),()=>{p.debriefComplete=true;setProgress(99);save("ch5_p1_debrief_complete");completePhase()})}
function completePhase(){const p=phaseState();p.complete=true;p.stage="complete";const s=gs();if(s){s.flags=s.flags||{};s.flags.ch5_p1_complete=true;s.flags.ch5_p1_room1807_identity_reference=true;s.chapter=5}safeShow(COMPLETE);setProgress(100);save("ch5_phase1_complete")}

const RECORDS={
 order:{time:"RETURN FLIGHT · AIRBORNE",en:"PROTECTION ORDER",th:"คำสั่งคุ้มครองแหล่งข้อมูล",detailEn:"Kittisak authorizes restricted handling of the registrar-linked records.",detailTh:"Kittisak อนุมัติให้จำกัดการเข้าถึงบันทึกที่โยงกับ Registrar"},
 seal:{time:"RESTRICTED HANDLING",en:"RECORDS SEALED",th:"ปิดผนึกบันทึก",detailEn:"Selected source records are compartmentalized before outside review.",detailTh:"บันทึกต้นทางที่เลือกถูกปิดผนึกและแยกวงการเข้าถึงก่อนการตรวจจากภายนอก"},
 transfer:{time:"BEFORE BANGKOK ARRIVAL",en:"HAND-CARRY TRANSFER",th:"เคลื่อนย้ายด้วยมือ",detailEn:"Somchai accepts the protected package hand to hand; no network copy is created.",detailTh:"Somchai รับแฟ้มที่ได้รับการคุ้มครองถึงมือ โดยไม่มีการสร้างสำเนาผ่านระบบ"}
};
function custodyStatus(text="",kind=""){const n=$("#ch5P1CustodyStatus");if(!n)return;n.textContent=text;n.className="ch5-p1-custody-status"+(kind?" "+kind:"")}
function renderCustody(){
 const p=phaseState(),work=$("#ch5P1CustodyWork");if(!work)return;
 $("#ch5P1CustodyStepLabel").textContent=tr(`STEP ${p.custodyStep} / 2`,`ขั้น ${p.custodyStep} / 2`);$("#ch5P1CustodyStepFill").style.width=(p.custodyStep===1?"50%":"100%");
 $("#ch5P1CustodyAirborne").innerHTML=`<span>${tr("BENEDICT · RETURN FLIGHT","BENEDICT · เที่ยวบินขากลับ")}</span><b>18:10 → 21:50 ICT</b>`;
 if(p.custodyStep===1){
  const order=["transfer","order","seal"];
  work.innerHTML=`<div class="ch5-p1-records">${order.map(id=>{const r=RECORDS[id],selected=Object.values(p.custodyAssignments).includes(id);return `<button class="ch5-p1-record${selected?" selected":""}" type="button" data-c5-record="${id}"><small>${r.time}</small><b>${thai()?r.th:r.en}</b><span>${thai()?r.detailTh:r.detailEn}</span></button>`}).join("")}</div><div class="ch5-p1-slots">${[1,2,3].map(slot=>{const id=p.custodyAssignments[slot],r=id?RECORDS[id]:null;return `<button class="ch5-p1-slot${r?" filled":""}" type="button" data-c5-slot="${slot}">${tr(`SEQUENCE ${slot}`,`ลำดับ ${slot}`)}${r?`<strong>${r.time} · ${thai()?r.th:r.en}</strong>`:""}</button>`}).join("")}</div>`;
 }else{
  const selected=p.custodyConclusion;
  work.innerHTML=`<div class="ch5-p1-conclusions"><button class="ch5-p1-conclusion${selected==="kittisak"?" selected":""}" data-c5-conclusion="kittisak" type="button">${tr("Kittisak's valid order proves he controlled the evidence.","คำสั่งที่ถูกต้องของ Kittisak พิสูจน์ว่าเขาควบคุมหลักฐาน")}</button><button class="ch5-p1-conclusion${selected==="somchai"?" selected":""}" data-c5-conclusion="somchai" type="button">${tr("Somchai's hand-carry transfer breaks the custody chain.","การถือแฟ้มไปเองของ Somchai ทำให้สายการครอบครองหลักฐานขาด")}</button><button class="ch5-p1-conclusion${selected==="timing"?" selected":""}" data-c5-conclusion="timing" type="button">${tr("The chain is valid. The timing still deserves review.","สายการครอบครองหลักฐานถูกต้อง แต่จังหวะเวลายังควรตรวจต่อ")}</button></div>${p.custodyConclusion==="timing"?`<div class="ch5-p1-finding"><span>AUTHORITY</span><b>VALID</b><span>CUSTODY</span><b>DOCUMENTED</b><span>SEQUENCE</span><b>PLAUSIBLE</b><span>TIMING</span><b class="review">REQUIRES REVIEW</b></div>`:""}`;
 }
 $("#ch5P1CustodyReset").textContent=tr("RESET CURRENT","เริ่มขั้นนี้ใหม่");$("#ch5P1CustodyConfirm").textContent=p.custodyStep===1?tr("CONFIRM ORDER","ยืนยันลำดับ"):tr("CONFIRM FINDING","ยืนยันข้อสรุป");custodyStatus()
}
let selectedRecord="";
function openCustody(){const p=phaseState();p.custodyStarted=true;miniOpen=true;selectedRecord="";const modal=$("#ch5P1Custody");modal?.classList.add("open");modal?.setAttribute("aria-hidden","false");renderCustody();syncAudio();save("ch5_p1_custody")}
function closeCustody(){miniOpen=false;const modal=$("#ch5P1Custody");modal?.classList.remove("open");modal?.setAttribute("aria-hidden","true");syncAudio();save("ch5_p1_custody_paused");if(!phaseState().custodyComplete)showCustodyResume()}
function resetCustody(){const p=phaseState();if(p.custodyStep===1){p.custodyAssignments={};selectedRecord=""}else p.custodyConclusion="";renderCustody();save()}
function confirmCustody(){
 const p=phaseState();if(p.custodyStep===1){const good=p.custodyAssignments[1]==="order"&&p.custodyAssignments[2]==="seal"&&p.custodyAssignments[3]==="transfer";if(!good){custodyStatus(tr("NOT SUPPORTED BY THE RECORD · Reconstruct the documented order.","หลักฐานไม่รองรับ · ลองเรียงตามลำดับที่บันทึกไว้"),"error");return}p.custodyStep=2;selectedRecord="";custodyStatus(tr("DOCUMENTED ORDER CONFIRMED","ยืนยันลำดับตามบันทึกแล้ว"),"success");save("ch5_p1_custody_conclusion");setTimeout(renderCustody,320);return}
 if(p.custodyConclusion!=="timing"){custodyStatus(tr("NOT SUPPORTED BY THE RECORD · Separate suspicion from proof.","หลักฐานไม่รองรับ · แยกความสงสัยออกจากสิ่งที่พิสูจน์ได้"),"error");return}
 p.custodyComplete=true;p.stage="custody_complete";const s=gs();if(s){s.flags.ch5_p1_custody_window=true;s.flags.ch5_p1_kittisak_order_valid=true;s.flags.ch5_p1_somchai_transfer_documented=true;s.progress=Math.max(64,Number(s.progress)||0);}save("ch5_p1_custody_complete");custodyStatus(tr("CUSTODY WINDOW VERIFIED","ตรวจ CUSTODY WINDOW เสร็จแล้ว"),"success");setTimeout(()=>{miniOpen=false;$("#ch5P1Custody")?.classList.remove("open");$("#ch5P1Custody")?.setAttribute("aria-hidden","true");syncAudio();showInfluence()},430)
}
function showInfluence(){const p=phaseState();if(p.influence){finishBriefing();return}influenceOpen=true;const modal=$("#ch5P1Influence");modal?.classList.add("open");modal?.setAttribute("aria-hidden","false");const choices=[
 ["procedure",tr("PRESERVE PROCEDURE","รักษากระบวนการ"),tr("Keep the seal intact and verify authority quietly.","คงการปิดผนึกไว้ แล้วตรวจอำนาจอนุมัติแบบเงียบๆ")],
 ["timing",tr("FOLLOW THE TIMING","ตามจังหวะเวลา"),tr("Find who knew enough to move the records while the return flight was airborne.","ตามว่าใครรู้มากพอให้แฟ้มถูกขยับตอนเที่ยวบินขากลับยังอยู่บนฟ้า")],
 ["custody",tr("FOLLOW THE TRANSFER","ตามเส้นทางแฟ้ม"),tr("Trace Somchai's physical hand-carry path before widening the theory.","ไล่เส้นทางที่ Somchai ถือแฟ้มไปเอง ก่อนขยายทฤษฎีให้กว้างขึ้น")]
 ];$("#ch5P1InfluenceGrid").innerHTML=choices.map(([id,h,b])=>`<button class="ghost" type="button" data-c5-influence="${id}"><b>${h}</b><small>${b}</small></button>`).join("");syncAudio()}
function chooseInfluence(id){if(!["procedure","timing","custody"].includes(id))return;const p=phaseState();p.influence=id;const s=gs();if(s){s.flags.ch5_p1_influence=id;s.progress=Math.max(68,Number(s.progress)||0);}influenceOpen=false;$("#ch5P1Influence")?.classList.remove("open");$("#ch5P1Influence")?.setAttribute("aria-hidden","true");save("ch5_p1_influence_locked");syncAudio();finishBriefing()}

function updateLanguage(){
 if(!$("#"+LANDING))return;
 const set=(id,value)=>{const n=$("#"+id);if(n)n.textContent=value};
 set("ch5P1LandingStatus",tr("DAY 6 · FINAL APPROACH · BANGKOK","วันที่ 6 · FINAL APPROACH · กรุงเทพฯ"));set("ch5P1LandingPlay",tr("PLAY ARRIVAL","เล่นฉากเดินทางถึง"));set("ch5P1LandingSkip",tr("SKIP","ข้าม"));
 set("ch5P1ArrivalEye",tr("DAY 6 · 21:50 ICT","วันที่ 6 · 21:50 น."));set("ch5P1ArrivalCity",tr("BANGKOK · THAILAND","กรุงเทพฯ · ประเทศไทย"));set("ch5P1ArrivalName",tr("RETURN TO BANGKOK","กลับสู่กรุงเทพฯ"));set("ch5P1ArrivalBody",tr("RETURN FLIGHT LANDED · CASE TRANSFER CONTINUES","เที่ยวบินขากลับลงจอดแล้ว · การส่งต่อคดียังดำเนินต่อ"));
 set("ch5P1PoliceLocation",tr("POLICE STATION · EVIDENCE DIVISION","สถานีตำรวจ · ฝ่ายพยานหลักฐาน"));set(POLICE+"Scene",tr("DAY 7 · 08:45 ICT","วันที่ 7 · 08:45 น."));set(POLICE+"Objective",tr("Review the Jakarta return record and overnight custody changes.","ทบทวนข้อมูลที่กลับมาจาก Jakarta และการเปลี่ยนแปลงสายการครอบครองหลักฐานเมื่อคืน"));set(POLICE+"Note",tr("RETURN BRIEFING · INTERNAL","RETURN BRIEFING · ภายใน"));
 set("ch5P1BriefingLocation",tr("POLICE STATION · SECURE BRIEFING","สถานีตำรวจ · ห้องประชุมภายใน"));set(BRIEFING+"Scene",tr("DAY 7 · 08:52 ICT","วันที่ 7 · 08:52 น."));set(BRIEFING+"Objective",tr("Separate what Jakarta proved from what Bangkok merely suspects.","แยกสิ่งที่ Jakarta พิสูจน์ได้ ออกจากสิ่งที่ Bangkok เพียงสงสัย"));set(BRIEFING+"Note",tr("ATTENDEES · BENEDICT / ELENA / SOMCHAI / KITTISAK","ผู้เข้าร่วม · BENEDICT / ELENA / SOMCHAI / KITTISAK"));
 set("ch5P1WalkStatus",tr("DAY 7 · 20:36 ICT · BANGKOK","วันที่ 7 · 20:36 น. · กรุงเทพฯ"));set("ch5P1WalkPlay",tr("PLAY TRANSITION","เล่นฉากเดินทาง"));set("ch5P1WalkSkip",tr("SKIP","ข้าม"));
 set("ch5P1CondoEye",tr("DAY 7 · 20:44 ICT","วันที่ 7 · 20:44 น."));set("ch5P1CondoCity",tr("BANGKOK · PRIVATE RESIDENCE","กรุงเทพฯ · ที่พักส่วนตัว"));set("ch5P1CondoName",tr("BENEDICT'S CONDOMINIUM","คอนโดมิเนียมของ BENEDICT"));set("ch5P1CondoBody",tr("OFF THE OFFICIAL ROUTE","นอกเส้นทางปฏิบัติการอย่างเป็นทางการ"));
 set("ch5P1CondoLocation",tr("BENEDICT'S CONDOMINIUM","คอนโดมิเนียมของ BENEDICT"));set(CONDO+"Scene",tr("DAY 7 · 20:45 ICT","วันที่ 7 · 20:45 น."));set(CONDO+"Objective",tr("Close the public route. Continue the investigation privately.","ปิดเส้นทางที่คนอื่นมองเห็น แล้วสืบต่อแบบส่วนตัว"));set(CONDO+"Note",tr("PRIVATE · NO OPERATIONAL ADDRESS","ส่วนตัว · ไม่มีที่อยู่ในบันทึกปฏิบัติการ"));
 set("ch5P1RevealLocation",tr("BENEDICT'S CONDOMINIUM · PRIVATE","คอนโดมิเนียมของ BENEDICT · ส่วนตัว"));set(REVEAL+"Scene",tr("SAFE LOCATION · 20:46 ICT","สถานที่ปลอดภัย · 20:46 น."));set(REVEAL+"Objective",tr("Compare the public story with the record underneath it.","เทียบเรื่องที่ทุกคนเชื่อ กับบันทึกที่ซ่อนอยู่ข้างใต้"));set(REVEAL+"Note",tr("NORTH · OFF RECORD","NORTH · นอกบันทึก"));
 set("ch5P1CustodyEye",tr("INTERNAL REVIEW · EVIDENCE CUSTODY","ตรวจภายใน · สายการครอบครองหลักฐาน"));set("ch5P1CustodyTitle","CUSTODY WINDOW");set("ch5P1CustodyBody",tr("Reconstruct what happened while Benedict's return flight was still airborne. Verify the record before assigning motive.","เรียงสิ่งที่เกิดขึ้นระหว่างที่เที่ยวบินขากลับของ Benedict ยังอยู่บนฟ้า ตรวจบันทึกให้จบก่อนตีความเจตนา"));
 set("ch5P1InfluenceEye",tr("INVESTIGATIVE EMPHASIS · PHASE I","น้ำหนักการสืบสวน · เฟส I"));set("ch5P1InfluenceTitle",tr("What does Benedict protect next?","Benedict จะรักษาอะไรไว้เป็นลำดับต่อไป"));set("ch5P1InfluenceBody",tr("This changes the investigation emphasis, not the historical facts.","การเลือกนี้เปลี่ยนน้ำหนักการสืบสวน ไม่ได้เปลี่ยนข้อเท็จจริงที่เกิดขึ้น"));
 set("ch5P1CompleteEye",tr("PHASE I COMPLETE","จบเฟส I"));set("ch5P1CompleteTitle",tr("RETURN TO BANGKOK","กลับสู่กรุงเทพฯ"));set("ch5P1CompleteBody",tr("The Jakarta trail survived the flight. Bangkok added a clean custody chain, suspicious timing, and a protected identity reference tied back to Room 1807.","ร่องรอยจาก Jakarta กลับมาถึงกรุงเทพครบ สิ่งที่เพิ่มเข้ามาคือสายการครอบครองหลักฐานที่สะอาด จังหวะเวลาที่น่าสงสัย และข้อมูลตัวตนที่ถูกปกป้องซึ่งพากลับไปยังห้อง 1807"));set("ch5P1ResultReturn",tr("BANGKOK RETURN","กลับกรุงเทพฯ"));set("ch5P1ValueReturn",tr("COMPLETE","COMPLETE"));set("ch5P1ResultNorth",tr("NORTH PUBLIC RECORD","สถานะ NORTH ในบันทึกสาธารณะ"));set("ch5P1ValueNorth",tr("REMOVED","REMOVED"));set("ch5P1ResultCustody",tr("CUSTODY WINDOW","CUSTODY WINDOW"));set("ch5P1ValueCustody",tr("VERIFIED / REVIEW TIMING","ตรวจแล้ว / ทบทวนเวลา"));set("ch5P1ResultRoom",tr("ROOM 1807","ห้อง 1807"));set("ch5P1ValueRoom",tr("IDENTITY REFERENCE","ข้อมูลอ้างอิงตัวตน"));set("ch5P1Next",tr("NEXT · PHASE II · NAME IN ROOM 1807","ถัดไป · เฟส II · NAME IN ROOM 1807"));set("ch5P1ReturnTitle",tr("RETURN TO TITLE","กลับหน้าหลัก"));
 const p=phaseState();if(miniOpen)renderCustody();if(influenceOpen)showInfluence();if(dialogue)renderDialogue();
 installToolLabels();positionSceneNotes();syncProgress()
}

function bindUi(){
 $("#ch5P1LandingPlay")?.addEventListener("click",()=>{const b=$("#ch5P1LandingPlay");if(b)b.hidden=true;landingVideo()?.play().catch(()=>{})});$("#ch5P1LandingSkip")?.addEventListener("click",finishLanding);
 $("#"+POLICE+"Action")?.addEventListener("click",showBriefing);$("#"+BRIEFING+"Action")?.addEventListener("click",()=>{const p=phaseState();if(!p.custodyComplete)openCustody();else if(!p.briefingClosed)finishBriefing();else showWalk()});
 $("#ch5P1WalkPlay")?.addEventListener("click",()=>{const b=$("#ch5P1WalkPlay");if(b)b.hidden=true;walkVideo()?.play().catch(()=>{})});$("#ch5P1WalkSkip")?.addEventListener("click",finishWalk);$("#"+CONDO+"Action")?.addEventListener("click",showReveal);
 [POLICE,BRIEFING,CONDO,REVEAL].forEach(id=>$("#"+id+"Dialogue")?.addEventListener("click",advanceDialogue));
 $$(".ch5-p1-save").forEach(b=>b.addEventListener("click",openSave));$$('.ch5-p1-menu').forEach(b=>b.addEventListener("click",openMenu));
 $("#ch5P1CustodyClose")?.addEventListener("click",closeCustody);$("#ch5P1CustodyReset")?.addEventListener("click",resetCustody);$("#ch5P1CustodyConfirm")?.addEventListener("click",confirmCustody);
 $("#ch5P1Custody")?.addEventListener("click",event=>{const record=event.target.closest?.("[data-c5-record]");if(record){selectedRecord=record.dataset.c5Record;renderCustody();const node=$(`[data-c5-record="${selectedRecord}"]`);node?.classList.add("selected");return}const slot=event.target.closest?.("[data-c5-slot]");if(slot&&selectedRecord){const p=phaseState();Object.keys(p.custodyAssignments).forEach(k=>{if(p.custodyAssignments[k]===selectedRecord)delete p.custodyAssignments[k]});p.custodyAssignments[slot.dataset.c5Slot]=selectedRecord;selectedRecord="";renderCustody();save();return}const conclusion=event.target.closest?.("[data-c5-conclusion]");if(conclusion){phaseState().custodyConclusion=conclusion.dataset.c5Conclusion;renderCustody();save()}});
 $("#ch5P1Influence")?.addEventListener("click",event=>{const b=event.target.closest?.("[data-c5-influence]");if(b)chooseInfluence(b.dataset.c5Influence)});
 $("#ch5P1ReturnTitle")?.addEventListener("click",()=>{stopAudio(true);try{typeof show==="function"&&show("title")}catch(_){};try{window.LastWitnessChapter2Integration?.titleAudioState?.()}catch(_){}});
 document.addEventListener("click",event=>{if(event.target.closest?.("[data-lang]"))setTimeout(updateLanguage,0);if(event.target.closest?.("#titleButton,#returnTitle,#chapter2ReturnTitle,#chapter3WipReturnTitle,#ch4P8ReturnTitle"))stopAudio(true)},true);
 ["musicRange","sfxRange","soundToggle"].forEach(id=>$("#"+id)?.addEventListener("input",()=>setTimeout(syncAudio,0)));
 window.addEventListener("resize",positionSceneNotes);document.addEventListener("visibilitychange",()=>{if(document.hidden)pauseForBackground();else resumeForeground()});window.addEventListener("pagehide",pauseForBackground);window.addEventListener("pageshow",()=>{if(!document.hidden)resumeForeground()});window.addEventListener("focus",()=>{if(!document.hidden)resumeForeground()})
}

function prepareStart(dev=false){
 inject();closeOverlays();stopForeignMedia();const s=gs();if(!s)return false;s.flags=s.flags||{};s.characters=s.characters||{};s.relationships=s.relationships||{};
 if(dev){s.flags.ch4_p8_chapter5_handoff_ready=true;s.flags.ch4_p8_north_publicly_removed=true;s.flags.ch4_p8_r_lead_preserved=true;s.flags.ch4_p8_registrar_lead_ready=true;delete s.flags.ch5_p1;}
 s.characters.Benedict=true;s.characters.North=true;s.chapter=5;s.progress=0;s.flags.ch5_p1_public_north_removed=true;phaseState().started=true;phaseState().stage="landing";document.title="Last Witness — The Missing Piece";return true
}
function start(){if(!prepareStart(false))return false;showLanding();return true}
function startFreshForDev(){closeToolOverlays();if(!prepareStart(true))return false;showLanding();return true}
function resumeFromState(target){
 inject();const s=gs();if(!s)return false;s.chapter=5;const p=phaseState();const known=SCREENS.has(target)?target:(p.complete?COMPLETE:p.stage==="reveal"?REVEAL:p.stage==="debrief"?CONDO:p.stage==="condo"?CONDO:p.stage==="condo_card"?CONDO_CARD:p.stage==="walk"?WALK:p.stage==="custody"||p.stage.startsWith("briefing")?BRIEFING:p.stage==="police"?POLICE:p.stage==="arrival"?ARRIVAL:LANDING);safeShow(known);setProgress(progressFor());
 if(known===ARRIVAL)showArrivalCard(true);else if(known===POLICE)showPolice();else if(known===BRIEFING)showBriefing();else if(known===CONDO_CARD){finishWalk()}else if(known===CONDO){if(p.stage==="debrief"&&!p.debriefComplete)startDebrief();else showCondo()}else if(known===REVEAL)showReveal();else if(known===COMPLETE)completePhase();else syncAudio(true);return true
}

async function copyText(value){try{if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(value);return true}}catch(_){}const a=document.createElement("textarea");a.value=value;a.setAttribute("readonly","");a.style.position="fixed";a.style.opacity="0";document.body.appendChild(a);a.select();const ok=document.execCommand?.("copy")===true;a.remove();return ok}
function testerAuthorized(){try{return sessionStorage.getItem("last_witness_north_qa_role")==="tester"}catch(_){return false}}
function qaInfo(){const s=gs()||{},p=phaseState();return["LAST WITNESS QA","Build: "+String(window.LastWitnessRuntimeBuild||"0.22.8"),"Access: NORTH QA","QA Module: 0.22.8","Chapter V Phase I: "+VERSION,"Chapter: 5","Phase: 1","Screen: "+activeScreen(),"Checkpoint: "+(s.checkpoint||"unresolved"),"Stage: "+(p?.stage||"unresolved"),"Language: "+(s.language==="th"?"TH":"EN"),"Visibility: "+(document.hidden?"hidden":"visible")].join("\n")}
function closeToolOverlays(){
 $("#drawer")?.classList.remove("open");$$('.modal.open').forEach(n=>n.classList.remove("open"));["developerModal","northQaModal","devAccessModal"].forEach(id=>$("#"+id)?.classList.remove("open"))
}
function developerPhaseGrid(){const phase8=$('[data-dev-jump="chapter4ShadowTruth"]');return phase8?.parentElement||$("#developerModal .dev-grid")}
function positionAfter(node,anchor,container){if(!node||!container)return;if(anchor&&anchor.parentElement===container){if(anchor.nextElementSibling!==node)anchor.insertAdjacentElement("afterend",node)}else if(node.parentElement!==container||container.lastElementChild!==node)container.appendChild(node)}
function installDevButton(){
 const grid=developerPhaseGrid();if(!grid)return false;let b=$("#ch5P1DeveloperJump");
 if(!b){b=document.createElement("button");b.id="ch5P1DeveloperJump";b.type="button";b.className="dev-button";b.addEventListener("click",event=>{event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();closeToolOverlays();startFreshForDev()},true)}
 b.removeAttribute("data-dev-jump");b.dataset.ch5P1Jump="1";positionAfter(b,grid.querySelector('[data-dev-jump="chapter4ShadowTruth"]'),grid);installToolLabels();return true
}
function installQaButton(){
 const grid=$("#northQaModal .north-qa-grid");if(!grid)return false;let b=$("#ch5P1NorthQaJump");
 if(!b){b=document.createElement("button");b.id="ch5P1NorthQaJump";b.type="button";b.className="dev-button";b.dataset.northQaAction="chapter5phase1"}
 positionAfter(b,grid.querySelector('[data-north-qa-action="chapter4phase8"]'),grid);
 const head=$("#northQaModal .north-qa-head");if(head&&!$("#ch5P1QaExtension")){const note=document.createElement("div");note.id="ch5P1QaExtension";note.className="ch5-p1-tool-note";head.appendChild(note)}const note=$("#ch5P1QaExtension");if(note)note.textContent="CH V PHASE I "+VERSION;installToolLabels();return true
}
function installToolLabels(){const d=$("#ch5P1DeveloperJump"),q=$("#ch5P1NorthQaJump");if(d)d.textContent=tr("Chapter V · Phase I · Return to Bangkok","บทที่ V · เฟส I · กลับสู่กรุงเทพฯ");if(q)q.textContent="CHAPTER V · PHASE I";const h=$("#ch5P1ContinueFromP8");if(h)h.textContent=tr("CONTINUE · CHAPTER V","ดำเนินต่อ · บทที่ V")}
function installQaInterceptors(){if(document.documentElement.dataset.ch5QaIntercept==="1")return;document.documentElement.dataset.ch5QaIntercept="1";document.addEventListener("click",event=>{const action=event.target.closest?.("[data-north-qa-action]")?.dataset.northQaAction;if(!action)return;const inCh5=Number(gs()?.chapter)===5&&SCREENS.has(activeScreen());if(action==="chapter5phase1"){if(!testerAuthorized())return;event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();closeToolOverlays();startFreshForDev();return}if(inCh5&&action==="restart"){event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();closeToolOverlays();startFreshForDev();return}if(inCh5&&action==="copy"){event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();void copyText(qaInfo()).then(ok=>{const n=$("#northQaStatus");if(n)n.textContent=ok?"Test information copied.":"Unable to copy test information."});return}if(inCh5&&action.startsWith("chapter"))stopAudio(true)},true)}
function installP8Handoff(){const card=$("#shadowTruthComplete .ch4-p4-complete-card"),old=$("#ch4P8ReturnTitle");if(!card||!old)return false;if(!$("#ch5P1ContinueFromP8")){const b=document.createElement("button");b.id="ch5P1ContinueFromP8";b.className="primary";b.type="button";b.addEventListener("click",event=>{event.preventDefault();event.stopPropagation();start()});old.insertAdjacentElement("beforebegin",b);$("#shadowTruthComplete")?.classList.add("ch5-p1-handoff")}installToolLabels();return true}
function scheduleToolInstall(){installTimers.forEach(clearTimeout);installTimers=[];[0,220,650,1250,2300,4200,7000].forEach(ms=>installTimers.push(setTimeout(()=>{installDevButton();installQaButton();installP8Handoff()},ms)))}
function install(){inject();installQaInterceptors();scheduleToolInstall();document.addEventListener("click",event=>{if(event.target.closest?.("#developerMenuButton,#northQaMenuButton,#northQaTitleButton,#settingsVersion"))setTimeout(()=>{installDevButton();installQaButton();installP8Handoff()},0)},true);return true}

window.LastWitnessChapter5Phase1={version:VERSION,installed:true,install,start,startFreshForDev,resumeFromState,stopAudio,openCustody,getState:()=>clone(phaseState()),screens:[...SCREENS],qaInfo};
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",install,{once:true});else install();
})();
