/* LAST WITNESS — Chapter III / Phase III: Changi Airport 0.8.1
 * Continues directly from the in-flight scene.
 * Verifies passenger movement separately from booking and accepted system access.
 */
(function(){
"use strict";
if(window.LastWitnessChangi?.version==="0.8.1")return;

const BUILD="0.8.1";
const FLIGHT_SCREEN="chapter3Phase2Wip";
const ARRIVAL_SCREEN="chapter3ArrivalTransition";
const CHANGI_SCREEN="chapter3Changi";
const ARRIVAL_IMAGE="assets/images/chapter-03/phase-03/singapore-arrival.jpg?v=0800";
const CHANGI_IMAGE="assets/images/chapter-03/phase-03/changi-arrival-operations.jpg?v=0800";
const ARRIVAL_AUDIO="assets/audio/chapter-03/phase-03/singapore-arrival-transition.mp3?v=0800";
const CHANGI_AUDIO="assets/audio/chapter-03/phase-03/changi-airport-ambience.mp3?v=0800";
const OFFICER_BASE="assets/images/chapter-03/phase-03/immigration-officer/";
const EVIDENCE_IDS=["booking","movement","request"];
const FACT_ORDER=["booking_confirmed","travel_documents","no_processing","no_cctv","accepted_request","profile_unresolved"];
const FACT_CORRECT={booking_confirmed:"documents",travel_documents:"documents",no_processing:"movement",no_cctv:"movement",accepted_request:"access",profile_unresolved:"access"};

const $=(selector,root=document)=>root.querySelector(selector);
const $$=(selector,root=document)=>Array.from(root.querySelectorAll(selector));
const clamp=(value,min=0,max=1)=>Math.max(min,Math.min(max,Number(value)||0));
const gameState=()=>{try{return state}catch(_){return window.state||null}};
const isThai=()=>gameState()?.language==="th"||document.documentElement.lang==="th";
const tr=(en,th)=>isThai()?th:en;
const activeScreen=()=>$(".screen.active")?.id||gameState()?.screen||"";
const soundOn=()=>gameState()?.sound!==false;
const musicLevel=()=>clamp(gameState()?.music??.33);

let arrivalTimer=0;
let authorizationTimer=0;
let handoffQueued=false;
let internalRouting=false;
let dialogueActive=false;
let activeEvidence=null;
let evidenceInspected=false;
let puzzleAssignments={};
let puzzleStage="classify";
let airportFadeFrame=0;
let originalResume=null;

function ensureChapterState(){
 const s=gameState();if(!s)return null;
 s.chapter=3;s.chapter3=s.chapter3||{};s.flags=s.flags||{};
 const p=s.chapter3.phase3=s.chapter3.phase3||{};
 if(typeof p.started!=="boolean")p.started=false;
 if(typeof p.arrivalSeen!=="boolean")p.arrivalSeen=false;
 if(typeof p.introComplete!=="boolean")p.introComplete=false;
 if(!Array.isArray(p.evidenceCollected))p.evidenceCollected=[];
 if(!p.puzzleAssignments||typeof p.puzzleAssignments!=="object")p.puzzleAssignments={};
 if(typeof p.puzzleComplete!=="boolean")p.puzzleComplete=false;
 if(typeof p.closingDialogueComplete!=="boolean")p.closingDialogueComplete=false;
 if(typeof p.complete!=="boolean")p.complete=false;
 if(!p.stage)p.stage="arrival";
 return p;
}
function collectedSet(){return new Set(ensureChapterState()?.evidenceCollected||[])}
function allEvidenceCollected(){const set=collectedSet();return EVIDENCE_IDS.every(id=>set.has(id))}
function save(){try{if(typeof autoSave==="function")autoSave()}catch(_){} }
function stopElement(audio,reset=false){if(!audio)return;try{audio.pause();if(reset)audio.currentTime=0}catch(_){} }
function fadeAirport(target,duration=300){
 const audio=$("#ch3ChangiAmbience");if(!audio)return;
 cancelAnimationFrame(airportFadeFrame);
 const start=clamp(audio.volume),end=clamp(target,0,.24),began=performance.now();
 if(end>0&&audio.paused){audio.play().catch(()=>{})}
 const step=now=>{const pct=Math.max(0,Math.min(1,(now-began)/duration));audio.volume=start+(end-start)*pct;if(pct<1)airportFadeFrame=requestAnimationFrame(step);else if(end===0)stopElement(audio,false)};
 airportFadeFrame=requestAnimationFrame(step);
}
function phase3OverlayOpen(){return Boolean($("#ch3ChangiEvidencePanel")?.classList.contains("open")||$("#ch3ChangiPuzzle")?.classList.contains("open"))}
function syncAudio(){
 const arrival=$("#ch3ArrivalAudio"),airport=$("#ch3ChangiAmbience");
 if(arrival){arrival.volume=soundOn()?clamp(musicLevel()*.58,0,.48):0}
 const active=activeScreen()===CHANGI_SCREEN&&soundOn()&&musicLevel()>0;
 if(!active){fadeAirport(0,180);return}
 const duck=(dialogueActive||phase3OverlayOpen())?.58:1;
 fadeAirport(clamp(musicLevel()*.36*duck,0,.22),260);
 if(airport)airport.loop=true;
}
function stopAudio(reset=false){
 clearTimeout(arrivalTimer);clearTimeout(authorizationTimer);cancelAnimationFrame(airportFadeFrame);
 stopElement($("#ch3ArrivalAudio"),reset);stopElement($("#ch3ChangiAmbience"),reset);
}
function safeShow(screen){internalRouting=true;try{show(screen)}finally{internalRouting=false}}

function installPortraits(){
 try{
  const officer={neutral:OFFICER_BASE+"neutral.png?v=0801",speaking:OFFICER_BASE+"speaking.png?v=0801",assessing:OFFICER_BASE+"assessing.png?v=0801",checking_document:OFFICER_BASE+"checking-document.png?v=0801"};
  PORTRAITS["Immigration Officer"]=officer;PORTRAITS["เจ้าหน้าที่ตรวจคนเข้าเมือง"]=officer;
 }catch(_){}
}
function installLanguage(){
 try{
  if(typeof LANG!=="object")return;
  Object.assign(LANG.en,{
   ch3p3_passport:"Passport, please.",
   ch3p3_purpose:"Purpose of your visit?",
   ch3p3_chicken_1:"Professional consultation. Though I was told the chicken rice deserves a separate investigation.",
   ch3p3_business:"He means business.",
   ch3p3_stay:"How long will you be staying?",
   ch3p3_three_days:"Three days.",
   ch3p3_chicken_2:"Subject to the cooperation of the chicken rice.",
   ch3p3_welcome:"Welcome to Singapore.",
   ch3p3_sent_back:"You nearly got us sent back before collecting our bags.",
   ch3p3_ck:"If this works, I’ll buy you Charles & Keith.",
   ch3p3_prada:"Prada.",
   ch3p3_escalated:"That escalated quickly.",
   ch3p3_case_escalated:"So did the case.",
   ch3p3_access_ready:"Read-only passenger-movement access is authorised. Booking, processing and CCTV remain separate records.",
   ch3p3_verify_first:"Good. We verify what each system actually saw before we ask it to tell one story.",
   ch3p3_booking_1:"The reservation is genuine. Passport details were attached and a seat was assigned.",
   ch3p3_booking_2:"A prepared travel identity. Not proof the traveller prepared it.",
   ch3p3_movement_1:"No check-in, no accepted bag, no boarding scan and no immigration clearance. The CCTV index returns no match at the expected points.",
   ch3p3_movement_2:"The booking travelled. Daniel didn’t.",
   ch3p3_request_1:"At 06:09, Singapore infrastructure relayed an accepted verification request tied to temporary profile 18-07 and Evidence Division permission.",
   ch3p3_request_2:"It proves the request was accepted. It does not prove Daniel sent it, travelled, or even touched the system.",
   ch3p3_close_1:"Authentication confirmed the request. Nothing attributes it to Daniel.",
   ch3p3_close_2:"A passenger made of records.",
   ch3p3_close_3:"Records don’t need luggage.",
   ch3p3_close_4:"Someone needed the system to expect him. They didn’t need him to arrive.",
   ch3p3_close_5:"The relay continues into a restricted Singapore Police environment. The local liaison approved an office review.",
   ch3p3_close_6:"Think the liaison likes chicken rice?",
   ch3p3_close_7:"At this rate, you’re buying Prada before lunch."
  });
  Object.assign(LANG.th,{
   ch3p3_passport:"ขอหนังสือเดินทางด้วยครับ",
   ch3p3_purpose:"เดินทางมาด้วยวัตถุประสงค์อะไรครับ?",
   ch3p3_chicken_1:"มาปรึกษางานครับ แต่ได้ยินว่าข้าวมันไก่ที่นี่สมควรได้รับการสืบสวนแยกอีกคดีหนึ่ง",
   ch3p3_business:"เขาหมายถึงมาทำงานค่ะ",
   ch3p3_stay:"จะพำนักกี่วันครับ?",
   ch3p3_three_days:"สามวันค่ะ",
   ch3p3_chicken_2:"ขึ้นอยู่กับว่าข้าวมันไก่จะให้ความร่วมมือแค่ไหน",
   ch3p3_welcome:"ยินดีต้อนรับสู่สิงคโปร์ครับ",
   ch3p3_sent_back:"เรายังไม่ทันรับกระเป๋า คุณก็เกือบทำให้เราถูกส่งกลับแล้ว",
   ch3p3_ck:"ถ้างานครั้งนี้สำเร็จ ผมซื้อ Charles & Keith ให้",
   ch3p3_prada:"Prada",
   ch3p3_escalated:"ขยับงบเร็วไปหน่อยนะ",
   ch3p3_case_escalated:"คดีก็ขยับเร็วเหมือนกัน",
   ch3p3_access_ready:"อนุมัติสิทธิ์อ่านข้อมูลการเคลื่อนไหวผู้โดยสารแล้ว รายการจอง ขั้นตอนผู้โดยสาร และกล้องวงจรปิดยังเป็นบันทึกคนละระบบ",
   ch3p3_verify_first:"ดี เราตรวจให้ชัดก่อนว่าแต่ละระบบเห็นอะไรจริง แล้วค่อยให้มันเล่าเป็นเรื่องเดียวกัน",
   ch3p3_booking_1:"รายการจองเป็นของจริง มีข้อมูลหนังสือเดินทางแนบไว้และมีการกำหนดที่นั่งแล้ว",
   ch3p3_booking_2:"ตัวตนสำหรับการเดินทางถูกเตรียมไว้ แต่นั่นไม่ได้พิสูจน์ว่าเจ้าตัวเป็นคนเตรียม",
   ch3p3_movement_1:"ไม่มีการเช็กอิน ไม่มีการรับกระเป๋า ไม่มีสแกนขึ้นเครื่อง และไม่มีการผ่านตรวจคนเข้าเมือง ดัชนีกล้องวงจรปิดก็ไม่พบใบหน้าตรงจุดที่ควรปรากฏ",
   ch3p3_movement_2:"รายการจองเดินทางมา แต่แดเนียลไม่ได้มา",
   ch3p3_request_1:"เวลา 06:09 โครงสร้างพื้นฐานสิงคโปร์ส่งต่อคำขอตรวจสอบที่ระบบยอมรับ ซึ่งเชื่อมกับโปรไฟล์ชั่วคราว 18-07 และสิทธิ์ฝ่ายพยานหลักฐาน",
   ch3p3_request_2:"มันพิสูจน์ว่าระบบยอมรับคำขอ ไม่ได้พิสูจน์ว่าแดเนียลส่งคำขอ เดินทาง หรือแม้แต่แตะระบบ",
   ch3p3_close_1:"ระบบยืนยันคำขอ แต่ไม่มีอะไรยืนยันว่าคำขอนั้นมาจากแดเนียล",
   ch3p3_close_2:"ผู้โดยสารที่สร้างจากบันทึก",
   ch3p3_close_3:"บันทึกไม่ต้องมีกระเป๋าเดินทาง",
   ch3p3_close_4:"มีคนต้องการให้ระบบคาดว่าเขาจะมา โดยไม่จำเป็นต้องให้ตัวเขามาถึงจริง",
   ch3p3_close_5:"เส้นทางส่งต่อยังเข้าไปถึงระบบจำกัดสิทธิ์ของตำรวจสิงคโปร์ ผู้ประสานงานท้องถิ่นอนุมัติให้ตรวจต่อที่สำนักงานแล้ว",
   ch3p3_close_6:"คิดว่าผู้ประสานงานชอบข้าวมันไก่ไหม?",
   ch3p3_close_7:"ด้วยอัตรานี้ คุณได้ซื้อ Prada ก่อนเที่ยงแน่"
  });
 }catch(_){}
}

function copy(){return{
 arrivalDay:tr("DAY 3","วันที่ 3"),arrivalTime:tr("LATE MORNING","ช่วงสาย"),arrivalPlace:tr("SINGAPORE · CHANGI AIRPORT","สิงคโปร์ · สนามบินชางงี"),arrivalPhase:tr("THE PASSENGER WHO NEVER ARRIVED","ผู้โดยสารที่ไม่เคยมาถึง"),skip:tr("Skip transition","ข้ามฉากเดินทาง"),
 location:tr("Changi Airport · Arrival Operations","สนามบินชางงี · ฝ่ายปฏิบัติการขาเข้า"),scene:tr("THE PASSENGER WHO NEVER ARRIVED","ผู้โดยสารที่ไม่เคยมาถึง"),openingObjective:tr("Complete arrival processing","ผ่านขั้นตอนขาเข้า"),investigateObjective:tr("Verify booking, passenger movement and accepted system access","ตรวจสอบรายการจอง การเคลื่อนไหวผู้โดยสาร และการเข้าถึงที่ระบบยอมรับ"),review:tr("Reconcile Passenger Trail","เปรียบเทียบเส้นทางผู้โดยสาร"),
 labels:{booking:tr("Booking","รายการจอง"),movement:tr("Movement","การเดินทาง"),request:tr("System Request","คำขอระบบ")},
 evidenceKicker:tr("Evidence Inspection","ตรวจสอบหลักฐาน"),caseEvidence:tr("Case Evidence","หลักฐานในคดี"),tap:tr("Tap evidence to inspect","แตะหลักฐานเพื่อตรวจสอบ"),inspect:tr("Inspect","ตรวจสอบ"),collect:tr("Add to Case File","เพิ่มในแฟ้มคดี"),close:tr("Close","ปิด"),
 puzzleTitle:tr("Passenger Trail Reconciliation","การเปรียบเทียบเส้นทางผู้โดยสาร"),puzzleHelp:tr("Assign each verified fact to the system it belongs to.","จัดข้อเท็จจริงแต่ละข้อให้ตรงกับระบบที่เป็นเจ้าของข้อมูล"),documents:tr("Documents","เอกสาร"),physical:tr("Physical Movement","การเดินทางจริง"),access:tr("System Access","การเข้าถึงระบบ"),confirm:tr("Confirm Classification","ยืนยันการจัดหมวด"),reset:tr("Reset","เริ่มใหม่"),
 incomplete:tr("Assign all six facts before confirming.","จัดหมวดข้อเท็จจริงให้ครบทั้งหกรายการก่อน"),wrong:tr("At least one fact belongs to a different system.","มีอย่างน้อยหนึ่งรายการอยู่ผิดระบบ"),classificationCorrect:tr("The systems are separated. Choose the conclusion the evidence supports.","แยกระบบออกจากกันแล้ว เลือกข้อสรุปที่หลักฐานรองรับ"),conclusionTitle:tr("What does the combined record prove?","บันทึกทั้งหมดพิสูจน์อะไรได้?"),beyond:tr("That conclusion goes beyond the verified records.","ข้อสรุปนั้นไกลกว่าสิ่งที่บันทึกยืนยันได้"),
 completeEye:tr("PHASE III COMPLETE","จบเฟส III"),completeTitle:tr("THE PASSENGER WHO NEVER ARRIVED","ผู้โดยสารที่ไม่เคยมาถึง"),completeText:tr("The booking existed. The passenger did not. The accepted request now leads to the Singapore Investigation Office.","รายการจองมีอยู่จริง แต่ผู้โดยสารไม่ได้เดินทาง คำขอที่ระบบยอมรับนำไปสู่สำนักงานสืบสวนสิงคโปร์"),returnTitle:tr("Return to Title","กลับหน้าแรก")
}}

const EVIDENCE={
 booking:{
  title:{en:"Confirmed Booking and Travel Record",th:"รายการจองและข้อมูลการเดินทางที่ยืนยันแล้ว"},
  description:{en:"A confirmed Bangkok–Singapore reservation exists under Daniel Voss. Passport details were attached and a seat was assigned, but the record contains no successful check-in event.",th:"มีรายการจองกรุงเทพฯ–สิงคโปร์ที่ยืนยันแล้วในชื่อแดเนียล วอสส์ มีข้อมูลหนังสือเดินทางแนบไว้และกำหนดที่นั่งแล้ว แต่ไม่มีเหตุการณ์เช็กอินสำเร็จ"},
  observation:{en:"The booking proves that a travel identity was prepared. It does not prove Daniel created the reservation or presented himself for travel.",th:"รายการจองพิสูจน์ว่ามีการเตรียมตัวตนสำหรับการเดินทาง ไม่ได้พิสูจน์ว่าแดเนียลเป็นผู้สร้างรายการหรือมาปรากฏตัวเพื่อเดินทาง"}
 },
 movement:{
  title:{en:"Passenger Movement and CCTV Index",th:"บันทึกการเคลื่อนไหวผู้โดยสารและดัชนีกล้องวงจรปิด"},
  description:{en:"No check-in, baggage acceptance, boarding scan, arrival-gate event or immigration clearance belongs to Daniel. The airport CCTV index finds no matching face at the expected processing points.",th:"ไม่พบการเช็กอิน การรับกระเป๋า สแกนขึ้นเครื่อง เหตุการณ์ประตูขาเข้า หรือการผ่านตรวจคนเข้าเมืองที่เป็นของแดเนียล ดัชนีกล้องวงจรปิดไม่พบใบหน้าตรงจุดดำเนินการที่ควรปรากฏ"},
  observation:{en:"The booking travelled. Daniel did not.",th:"รายการจองเดินทางมา แต่แดเนียลไม่ได้มา"}
 },
 request:{
  title:{en:"Accepted Verification Request",th:"คำขอตรวจสอบที่ระบบยอมรับ"},
  description:{en:"At 06:09, Singapore infrastructure relayed a verification request referencing Daniel’s booking. The request carried accepted Evidence Division permission and resolved to Temporary Operational Profile 18-07. The operator remains unverified.",th:"เวลา 06:09 โครงสร้างพื้นฐานสิงคโปร์ส่งต่อคำขอตรวจสอบที่อ้างถึงรายการจองของแดเนียล คำขอพกสิทธิ์ฝ่ายพยานหลักฐานที่ระบบยอมรับและเชื่อมกับโปรไฟล์ปฏิบัติการชั่วคราว 18-07 โดยยังยืนยันตัวผู้ใช้งานไม่ได้"},
  observation:{en:"Authentication confirms accepted access. It does not establish passenger movement, operator identity or authorship of the larger plan.",th:"การยืนยันสิทธิ์พิสูจน์ว่าระบบยอมรับการเข้าถึง ไม่ได้ยืนยันการเดินทางของผู้โดยสาร ตัวผู้ใช้งาน หรือผู้วางแผนทั้งหมด"}
 }
};
const FACTS={
 booking_confirmed:{en:"A confirmed Bangkok–Singapore booking exists under Daniel Voss.",th:"มีรายการจองกรุงเทพฯ–สิงคโปร์ที่ยืนยันแล้วในชื่อแดเนียล วอสส์"},
 travel_documents:{en:"Passport details and a seat assignment were attached to the reservation.",th:"ข้อมูลหนังสือเดินทางและที่นั่งถูกแนบกับรายการจอง"},
 no_processing:{en:"No check-in, baggage, boarding or immigration event belongs to Daniel.",th:"ไม่มีการเช็กอิน รับกระเป๋า ขึ้นเครื่อง หรือผ่านตรวจคนเข้าเมืองที่เป็นของแดเนียล"},
 no_cctv:{en:"The CCTV index finds no matching face at the expected airport points.",th:"ดัชนีกล้องวงจรปิดไม่พบใบหน้าตรงจุดสนามบินที่ควรปรากฏ"},
 accepted_request:{en:"Singapore infrastructure accepted and relayed a booking-verification request at 06:09.",th:"โครงสร้างพื้นฐานสิงคโปร์ยอมรับและส่งต่อคำขอตรวจรายการจองเวลา 06:09"},
 profile_unresolved:{en:"The request resolves to Temporary Operational Profile 18-07; the operator is unverified.",th:"คำขอเชื่อมกับโปรไฟล์ปฏิบัติการชั่วคราว 18-07 โดยยังยืนยันตัวผู้ใช้งานไม่ได้"}
};
const CONCLUSIONS=[
 {id:"alternate_identity",en:"Daniel entered Singapore under another identity.",th:"แดเนียลเข้าสิงคโปร์ด้วยตัวตนอื่น"},
 {id:"fabricated",en:"The booking record was completely fabricated.",th:"รายการจองทั้งหมดถูกปลอมขึ้น"},
 {id:"identity_without_person",en:"The travel identity entered connected systems, but the person did not complete the journey.",th:"ตัวตนสำหรับการเดินทางเข้าสู่ระบบที่เชื่อมต่อกัน แต่ตัวบุคคลไม่ได้เดินทางจริง"},
 {id:"airport_staff",en:"Airport staff helped Daniel disappear.",th:"เจ้าหน้าที่สนามบินช่วยให้แดเนียลหายตัวไป"}
];

function inject(){
 if($("#"+ARRIVAL_SCREEN))return;
 const game=$("#game");if(!game)return;
 game.insertAdjacentHTML("beforeend",`
 <section id="${ARRIVAL_SCREEN}" class="screen ch3-arrival-transition" aria-label="Singapore arrival transition">
  <img class="scene" src="${ARRIVAL_IMAGE}" alt="Passenger aircraft arriving in Singapore"><div class="overlay"></div>
  <div class="ch3-arrival-card"><div id="ch3ArrivalDay" class="eyebrow"></div><div id="ch3ArrivalTime" class="ch3-day-time"></div><h2 id="ch3ArrivalPlace"></h2><div class="ch3-rule"></div><p id="ch3ArrivalPhase"></p></div>
  <button id="ch3ArrivalSkip" class="ghost ch3-arrival-skip" type="button"></button><audio id="ch3ArrivalAudio" preload="auto" src="${ARRIVAL_AUDIO}"></audio>
 </section>
 <section id="${CHANGI_SCREEN}" class="screen ch3-changi ch3-investigation-locked" aria-label="Changi Airport arrival operations">
  <img class="scene" src="${CHANGI_IMAGE}" alt="Changi Airport arrival operations corridor"><div class="overlay ch3-changi-overlay"></div>
  <div class="topbar"><span id="ch3ChangiLocation"></span><div class="hud"><button class="icon ch3-changi-save" type="button">💾</button><button class="icon ch3-changi-menu" type="button">☰<i class="journal-alert" aria-hidden="true"></i></button></div></div>
  <div id="ch3ChangiSceneLabel" class="ch3-scene-label"></div><div id="ch3ChangiObjective" class="apartment-objective"></div>
  <button class="ch3-changi-hotspot ch3-hs-booking" data-changi-clue="booking" type="button"><i></i><span class="ch3-hotspot-label"></span></button>
  <button class="ch3-changi-hotspot ch3-hs-movement" data-changi-clue="movement" type="button"><i></i><span class="ch3-hotspot-label"></span></button>
  <button class="ch3-changi-hotspot ch3-hs-request" data-changi-clue="request" type="button"><i></i><span class="ch3-hotspot-label"></span></button>
  <div id="chapter3ChangiDialogue" class="dialogue hidden"></div><button id="ch3ChangiReview" class="primary ch3-changi-review" type="button"></button>
  <div id="ch3Authorization" class="ch3-authorization" aria-live="polite"><strong>LIMITED ACCESS AUTHORISED</strong><span id="ch3AuthorizationText"></span></div>
  <div id="ch3ChangiComplete" class="phase-card" style="display:none"><div id="ch3ChangiCompleteEye" class="eyebrow"></div><h2 id="ch3ChangiCompleteTitle"></h2><p id="ch3ChangiCompleteText"></p><button id="ch3ChangiReturnTitle" class="ghost" type="button"></button></div>
  <div class="progress ch3-changi-progress"><span id="ch3ChangiProgressText" class="progressText">0%</span><div class="progress-bar"><div id="ch3ChangiProgressFill" class="progress-fill"></div></div></div>
  <audio id="ch3ChangiAmbience" preload="auto" src="${CHANGI_AUDIO}"></audio>
 </section>
 <div id="ch3ChangiEvidencePanel" class="evidence-panel" aria-hidden="true"><div class="evidence-card"><div id="ch3ChangiEvidenceKicker" class="eyebrow"></div><h3 id="ch3ChangiEvidenceTitle"></h3><div class="evidence-stage"><div id="ch3ChangiEvidenceStamp" class="evidence-stamp"></div><div id="ch3ChangiEvidenceObject" class="evidence-object"></div><div id="ch3ChangiEvidenceHint" class="evidence-zoom-hint"></div></div><div id="ch3ChangiEvidenceMeta" class="evidence-meta"><p id="ch3ChangiEvidenceDescription"></p><div id="ch3ChangiEvidenceObservation" class="evidence-observation"></div></div><div class="evidence-actions"><button id="inspectCh3ChangiEvidence" class="ghost" type="button"></button><button id="collectCh3ChangiEvidence" class="primary" type="button"></button><button id="closeCh3ChangiEvidence" class="ghost" type="button"></button></div></div></div>
 <div id="ch3ChangiPuzzle" class="modal ch3-reconcile-modal" aria-hidden="true"><div class="modal-card ch3-reconcile-card"><div class="eyebrow">LAST WITNESS</div><h3 id="ch3PuzzleTitle"></h3><p id="ch3PuzzleHelp" class="ch3-reconcile-help"></p><div id="ch3FactList" class="ch3-fact-list"></div><div id="ch3ConclusionList" class="ch3-conclusion-list" hidden></div><div id="ch3PuzzleStatus" class="ch3-reconcile-status" aria-live="polite"></div><div class="ch3-reconcile-actions"><button id="ch3PuzzleConfirm" class="primary" type="button"></button><button id="ch3PuzzleReset" class="ghost" type="button"></button><button id="ch3PuzzleClose" class="ghost" type="button"></button></div></div></div>`);
 installPortraits();installLanguage();bind();updateLanguage();paintHotspots();setHotspotsLocked(true,false);
}

function officerName(){return isThai()?"เจ้าหน้าที่ตรวจคนเข้าเมือง":"Immigration Officer"}
function runSceneDialogue(lines,done){
 const box=$("#chapter3ChangiDialogue");if(!box||typeof runDialogue!=="function"){done?.();return}
 dialogueActive=true;syncAudio();
 const normalized=lines.map(line=>({speaker:line.speaker==="officer"?officerName():line.speaker,emotion:line.emotion||"neutral",key:line.key}));
 runDialogue(box,normalized,()=>{dialogueActive=false;syncAudio();done?.()});
}
function openingLines(){return[
 {speaker:"officer",emotion:"checking_document",key:"ch3p3_passport"},{speaker:"officer",emotion:"speaking",key:"ch3p3_purpose"},{speaker:"Benedict",emotion:"smirk",key:"ch3p3_chicken_1"},{speaker:"North",emotion:"dry",key:"ch3p3_business"},{speaker:"officer",emotion:"assessing",key:"ch3p3_stay"},{speaker:"North",emotion:"serious",key:"ch3p3_three_days"},{speaker:"Benedict",emotion:"smile",key:"ch3p3_chicken_2"},{speaker:"officer",emotion:"neutral",key:"ch3p3_welcome"},{speaker:"North",emotion:"dry",key:"ch3p3_sent_back"},{speaker:"Benedict",emotion:"smirk",key:"ch3p3_ck"},{speaker:"North",emotion:"neutral",key:"ch3p3_prada"},{speaker:"Benedict",emotion:"surprised",key:"ch3p3_escalated"},{speaker:"North",emotion:"dry",key:"ch3p3_case_escalated"},{speaker:"North",emotion:"analyzing",key:"ch3p3_access_ready"},{speaker:"Benedict",emotion:"serious",key:"ch3p3_verify_first"}
]}
function evidenceLines(id){return{
 booking:[{speaker:"North",emotion:"analyzing",key:"ch3p3_booking_1"},{speaker:"Benedict",emotion:"thinking",key:"ch3p3_booking_2"}],
 movement:[{speaker:"North",emotion:"serious",key:"ch3p3_movement_1"},{speaker:"North",emotion:"dry",key:"ch3p3_movement_2"}],
 request:[{speaker:"North",emotion:"analyzing",key:"ch3p3_request_1"},{speaker:"Benedict",emotion:"serious",key:"ch3p3_request_2"}]
}[id]||[]}
function closingLines(){return[
 {speaker:"North",emotion:"serious",key:"ch3p3_close_1"},{speaker:"Benedict",emotion:"thinking",key:"ch3p3_close_2"},{speaker:"North",emotion:"dry",key:"ch3p3_close_3"},{speaker:"Benedict",emotion:"serious",key:"ch3p3_close_4"},{speaker:"North",emotion:"analyzing",key:"ch3p3_close_5"},{speaker:"Benedict",emotion:"smirk",key:"ch3p3_close_6"},{speaker:"North",emotion:"dry",key:"ch3p3_close_7"}
]}

function updateProgress(){
 const p=ensureChapterState();if(!p)return;
 const evidenceCount=collectedSet().size;
 let pct=p.introComplete?22:8;pct+=evidenceCount*16;if(p.puzzleComplete)pct=88;if(p.complete)pct=100;
 $("#ch3ChangiProgressText")?.replaceChildren(document.createTextNode(pct+"%"));if($("#ch3ChangiProgressFill"))$("#ch3ChangiProgressFill").style.width=pct+"%";
}
function setHotspotsLocked(locked,animate=true){
 const root=$("#"+CHANGI_SCREEN);if(!root)return;
 root.classList.toggle("ch3-investigation-locked",locked);root.classList.remove("ch3-investigation-revealing");
 $$('[data-changi-clue]',root).forEach((node,index)=>{node.style.setProperty("--ch3-hotspot-order",String(index));node.disabled=locked;node.setAttribute("aria-disabled",locked?"true":"false");node.setAttribute("aria-hidden",locked?"true":"false");node.tabIndex=locked?-1:0});
 if(!locked&&animate&&root.classList.contains("active")){void root.offsetWidth;root.classList.add("ch3-investigation-revealing");setTimeout(()=>root.classList.remove("ch3-investigation-revealing"),900)}
}
function paintHotspots(){const done=collectedSet();$$('[data-changi-clue]').forEach(node=>node.classList.toggle("found",done.has(node.dataset.changiClue)))}
function updateReview(){
 const button=$("#ch3ChangiReview");if(!button)return;
 const p=ensureChapterState(),ready=allEvidenceCollected()&&!p.puzzleComplete&&!dialogueActive&&!$("#ch3ChangiEvidencePanel")?.classList.contains("open")&&!$("#ch3ChangiPuzzle")?.classList.contains("open");
 button.classList.toggle("show",ready);button.disabled=!ready;
}
function syncScene(){paintHotspots();updateProgress();updateReview()}

function showAuthorization(done){
 clearTimeout(authorizationTimer);const card=$("#ch3Authorization");if(!card){done?.();return}
 $("#ch3AuthorizationText").textContent=tr("PASSENGER MOVEMENT VERIFICATION · READ-ONLY SESSION","ตรวจสอบการเคลื่อนไหวผู้โดยสาร · สิทธิ์อ่านอย่างเดียว");
 try{window.LastWitnessAudioCue?.playSoftScanner?.()}catch(_){}
 card.classList.add("show");authorizationTimer=setTimeout(()=>{card.classList.remove("show");done?.()},1450);
}
function completeIntro(){
 const p=ensureChapterState();p.introComplete=true;p.stage="investigation";gameState().checkpoint="ch3_phase3_investigation";setHotspotsLocked(false,true);syncScene();save();
}
function startOpening(){
 const p=ensureChapterState();if(dialogueActive||p.introComplete)return;
 p.stage="immigration";gameState().checkpoint="ch3_phase3_immigration";setHotspotsLocked(true,false);$("#ch3ChangiObjective").textContent=copy().openingObjective;
 runSceneDialogue(openingLines(),()=>showAuthorization(completeIntro));save();
}

function beginArrivalTransition(force=false){
 inject();const p=ensureChapterState();if(!p)return;
 if(p.started&&!force){if(p.arrivalSeen){enterChangi();return}}
 p.started=true;p.stage="arrival";p.arrivalSeen=false;gameState().checkpoint="ch3_phase3_arrival";
 window.LastWitnessChapter3?.stopPhase2Media?.(true);stopAudio(true);safeShow(ARRIVAL_SCREEN);updateLanguage();
 const audio=$("#ch3ArrivalAudio");if(audio&&soundOn()){try{audio.currentTime=0;audio.volume=clamp(musicLevel()*.58,0,.48);audio.play().catch(()=>{})}catch(_){}}
 clearTimeout(arrivalTimer);arrivalTimer=setTimeout(enterChangi,5600);save();
}
function enterChangi(){
 clearTimeout(arrivalTimer);inject();const p=ensureChapterState();if(!p)return;
 stopElement($("#ch3ArrivalAudio"),true);p.started=true;p.arrivalSeen=true;gameState().checkpoint=p.introComplete?"ch3_phase3_investigation":"ch3_phase3_immigration";
 safeShow(CHANGI_SCREEN);closeEvidence();closePuzzle(false);$("#ch3ChangiComplete")?.style.setProperty("display","none");updateLanguage();
 const airport=$("#ch3ChangiAmbience");if(airport){airport.loop=true;if(soundOn())airport.play().catch(()=>{})}syncAudio();
 if(p.complete){showComplete();return}
 if(p.puzzleComplete&&!p.closingDialogueComplete){runClosingDialogue();return}
 if(p.introComplete||p.evidenceCollected.length){p.introComplete=true;setHotspotsLocked(false,false);syncScene();return}
 setHotspotsLocked(true,false);setTimeout(startOpening,340);
}

function evidenceVisual(id){
 if(id==="booking")return `<article class="ch3-evidence-visual"><header class="ch3-record-head"><span>PASSENGER BOOKING</span><span>CONFIRMED</span></header><dl class="ch3-record-grid"><dt>PASSENGER</dt><dd>DANIEL VOSS</dd><dt>ROUTE</dt><dd>BANGKOK → SINGAPORE</dd><dt>DOCUMENT DATA</dt><dd>ATTACHED</dd><dt>SEAT</dt><dd>ASSIGNED</dd><dt>CHECK-IN</dt><dd>NO EVENT</dd></dl><div class="ch3-record-ok">RESERVATION VALID</div></article>`;
 if(id==="movement")return `<article class="ch3-evidence-visual"><header class="ch3-record-head"><span>PASSENGER MOVEMENT</span><span>NO MATCH</span></header><div class="ch3-movement-list"><div class="ch3-movement-row"><b>CHECK-IN</b><span>NONE</span></div><div class="ch3-movement-row"><b>BAGGAGE ACCEPTANCE</b><span>NONE</span></div><div class="ch3-movement-row"><b>BOARDING SCAN</b><span>NONE</span></div><div class="ch3-movement-row"><b>IMMIGRATION CLEARANCE</b><span>NONE</span></div><div class="ch3-movement-row"><b>CCTV FACE INDEX</b><span>NO MATCH</span></div></div><div class="ch3-record-alert">PHYSICAL JOURNEY NOT ESTABLISHED</div></article>`;
 return `<article class="ch3-evidence-visual ch3-request-terminal"><header class="ch3-record-head"><span>VERIFICATION RELAY</span><span>06:09</span></header><pre>REQUEST: PASSENGER_VERIFY
SUBJECT: DANIEL VOSS
PERMISSION: EVIDENCE DIVISION
STATUS: ACCEPTED
PROFILE: 18-07
ROUTE: SINGAPORE INFRASTRUCTURE
OPERATOR: UNVERIFIED
MOVEMENT EVENT CREATED: NO</pre><footer>AUTHENTICATION ≠ ATTRIBUTION</footer></article>`;
}
function openEvidence(id){
 const item=EVIDENCE[id],panel=$("#ch3ChangiEvidencePanel");if(!item||!panel)return;
 activeEvidence=id;evidenceInspected=false;const done=collectedSet().has(id);
 $("#ch3ChangiEvidenceTitle").textContent=item.title[isThai()?"th":"en"];
 $("#ch3ChangiEvidenceDescription").textContent=item.description[isThai()?"th":"en"];
 $("#ch3ChangiEvidenceObservation").textContent=item.observation[isThai()?"th":"en"];
 $("#ch3ChangiEvidenceObject").innerHTML=evidenceVisual(id);$("#ch3ChangiEvidenceObject").classList.remove("inspecting");$("#ch3ChangiEvidenceMeta").classList.remove("show");$("#ch3ChangiEvidenceObservation").style.display="none";
 $("#inspectCh3ChangiEvidence").style.display="";$("#collectCh3ChangiEvidence").style.display="none";$("#closeCh3ChangiEvidence").style.display="none";
 panel.classList.add("open");panel.setAttribute("aria-hidden","false");if(done)panel.dataset.revisit="1";else delete panel.dataset.revisit;updateReview();syncAudio();
}
function inspectEvidence(){
 if(!activeEvidence||evidenceInspected)return;evidenceInspected=true;const done=collectedSet().has(activeEvidence);
 $("#ch3ChangiEvidenceObject")?.classList.add("inspecting");$("#ch3ChangiEvidenceMeta")?.classList.add("show");$("#ch3ChangiEvidenceObservation").style.display="";
 $("#inspectCh3ChangiEvidence").style.display="none";$("#collectCh3ChangiEvidence").style.display=done?"none":"";$("#closeCh3ChangiEvidence").style.display="";
 if(!done)try{window.LastWitnessAudioCue?.playInspection?.()}catch(_){}
}
function closeEvidence(){
 const panel=$("#ch3ChangiEvidencePanel");if(panel){panel.classList.remove("open");panel.setAttribute("aria-hidden","true")}
 $("#ch3ChangiEvidenceObject")?.classList.remove("inspecting");$("#ch3ChangiEvidenceMeta")?.classList.remove("show");activeEvidence=null;evidenceInspected=false;updateReview();syncAudio();
}
function collectEvidence(){
 const id=activeEvidence,p=ensureChapterState();if(!id||!evidenceInspected||!p||collectedSet().has(id))return;
 p.evidenceCollected.push(id);try{gameState().found?.add?.("changi_"+id)}catch(_){};closeEvidence();paintHotspots();updateProgress();
 try{window.LastWitnessAudioCue?.playCollection?.()}catch(_){};try{if(typeof showBadge==="function")showBadge(tr("Evidence added","เพิ่มหลักฐานแล้ว"))}catch(_){}
 runSceneDialogue(evidenceLines(id),()=>{if(allEvidenceCollected())try{if(typeof showBadge==="function")showBadge(tr("Passenger trail reconciliation unlocked","ปลดล็อกการเปรียบเทียบเส้นทางผู้โดยสารแล้ว"))}catch(_){};syncScene();save()});save();
}

function localized(value){return value[isThai()?"th":"en"]}
function categoryCopy(id){const c=copy();return id==="documents"?c.documents:id==="movement"?c.physical:c.access}
function clearPuzzleStatus(){const status=$("#ch3PuzzleStatus");if(status){status.textContent="";status.className="ch3-reconcile-status"}}
function renderFacts(){
 const list=$("#ch3FactList");if(!list)return;
 list.hidden=false;$("#ch3ConclusionList").hidden=true;const wrongIds=new Set(list.dataset.wrongIds?list.dataset.wrongIds.split(","):[]);
 list.innerHTML=FACT_ORDER.map(id=>`<article class="ch3-fact-card${wrongIds.has(id)?" wrong":""}" data-fact-card="${id}"><div class="ch3-fact-text">${localized(FACTS[id])}</div><div class="ch3-fact-categories">${["documents","movement","access"].map(category=>`<button type="button" data-fact="${id}" data-category="${category}" class="${puzzleAssignments[id]===category?"selected":""}">${categoryCopy(category)}</button>`).join("")}</div></article>`).join("");
 $$('[data-fact][data-category]',list).forEach(button=>button.onclick=()=>{puzzleAssignments[button.dataset.fact]=button.dataset.category;delete list.dataset.wrongIds;clearPuzzleStatus();renderFacts()});
}
function renderConclusions(){
 puzzleStage="conclusion";$("#ch3FactList").hidden=true;const list=$("#ch3ConclusionList");list.hidden=false;list.innerHTML=CONCLUSIONS.map(item=>`<button type="button" data-conclusion="${item.id}">${localized(item)}</button>`).join("");
 $$('[data-conclusion]',list).forEach(button=>button.onclick=()=>chooseConclusion(button.dataset.conclusion));
 $("#ch3PuzzleHelp").textContent=copy().conclusionTitle;$("#ch3PuzzleConfirm").style.display="none";$("#ch3PuzzleReset").style.display="none";
}
function openPuzzle(){
 if(!allEvidenceCollected())return;const p=ensureChapterState();if(p.puzzleComplete)return;
 puzzleAssignments={...(p.puzzleAssignments||{})};puzzleStage="classify";clearPuzzleStatus();
 const modal=$("#ch3ChangiPuzzle");modal.classList.add("open");modal.setAttribute("aria-hidden","false");$("#ch3PuzzleConfirm").style.display="";$("#ch3PuzzleReset").style.display="";$("#ch3PuzzleHelp").textContent=copy().puzzleHelp;renderFacts();updateReview();syncAudio();gameState().checkpoint="ch3_phase3_reconciliation";save();
}
function closePuzzle(persist=true){
 const modal=$("#ch3ChangiPuzzle");if(modal){modal.classList.remove("open");modal.setAttribute("aria-hidden","true")}
 if(persist){const p=ensureChapterState();if(p)p.puzzleAssignments={...puzzleAssignments};save()}
 updateReview();syncAudio();
}
function resetPuzzle(){puzzleAssignments={};puzzleStage="classify";const list=$("#ch3FactList");if(list)delete list.dataset.wrongIds;clearPuzzleStatus();renderFacts()}
function confirmClassification(){
 if(puzzleStage!=="classify")return;const c=copy(),status=$("#ch3PuzzleStatus");
 if(FACT_ORDER.some(id=>!puzzleAssignments[id])){status.textContent=c.incomplete;status.className="ch3-reconcile-status error";return}
 const wrong=FACT_ORDER.filter(id=>puzzleAssignments[id]!==FACT_CORRECT[id]);
 if(wrong.length){$("#ch3FactList").dataset.wrongIds=wrong.join(",");status.textContent=c.wrong;status.className="ch3-reconcile-status error";renderFacts();return}
 const p=ensureChapterState();p.puzzleAssignments={...puzzleAssignments};status.textContent=c.classificationCorrect;status.className="ch3-reconcile-status success";renderConclusions();save();
}
function chooseConclusion(id){
 const status=$("#ch3PuzzleStatus"),c=copy();if(id!=="identity_without_person"){status.textContent=c.beyond;status.className="ch3-reconcile-status error";return}
 const p=ensureChapterState();p.puzzleComplete=true;p.stage="closing";p.puzzleAssignments={...puzzleAssignments};gameState().checkpoint="ch3_phase3_conclusion";status.textContent=tr("Conclusion supported by all three systems.","ข้อสรุปได้รับการรองรับจากทั้งสามระบบ");status.className="ch3-reconcile-status success";
 try{window.LastWitnessAudioCue?.playPuzzleSuccess?.()}catch(_){};save();setTimeout(()=>{closePuzzle(false);runClosingDialogue()},620);
}
function runClosingDialogue(){
 const p=ensureChapterState();if(dialogueActive||p.complete)return;
 setHotspotsLocked(false,false);$("#ch3ChangiReview")?.classList.remove("show");runSceneDialogue(closingLines(),()=>{p.closingDialogueComplete=true;p.complete=true;p.stage="complete";gameState().checkpoint="ch3_phase3_complete";showComplete();save()});
}
function showComplete(){
 const p=ensureChapterState();p.complete=true;p.closingDialogueComplete=true;p.stage="complete";$("#chapter3ChangiDialogue")?.classList.add("hidden");$("#ch3ChangiReview")?.classList.remove("show");setHotspotsLocked(false,false);$("#ch3ChangiComplete")?.style.setProperty("display","block");updateProgress();syncAudio();
}

function appendCaseEntries(){
 const list=$("#caseList"),p=ensureChapterState();if(!list||!p?.evidenceCollected?.length)return;
 $("[data-changi-case-section]",list)?.remove();$$('[data-changi-case-entry]',list).forEach(node=>node.remove());
 const heading=document.createElement("div");heading.className="case-section-title";heading.dataset.changiCaseSection="1";heading.textContent=tr("CHAPTER III · CHANGI AIRPORT","บทที่ III · สนามบินชางงี");list.appendChild(heading);
 p.evidenceCollected.forEach(id=>{const item=EVIDENCE[id];if(!item)return;const row=document.createElement("div");row.className="case-row";row.dataset.changiCaseEntry=id;row.innerHTML=`<b>${item.title[isThai()?"th":"en"]}</b><div>${item.description[isThai()?"th":"en"]}</div>`;list.appendChild(row)});
}
function updateLanguage(){
 if(!$("#"+ARRIVAL_SCREEN))return;installLanguage();const c=copy();
 $("#ch3ArrivalDay").textContent=c.arrivalDay;$("#ch3ArrivalTime").textContent=c.arrivalTime;$("#ch3ArrivalPlace").textContent=c.arrivalPlace;$("#ch3ArrivalPhase").textContent=c.arrivalPhase;$("#ch3ArrivalSkip").textContent=c.skip;
 $("#ch3ChangiLocation").textContent=c.location;$("#ch3ChangiSceneLabel").textContent=c.scene;$("#ch3ChangiObjective").textContent=ensureChapterState()?.introComplete?c.investigateObjective:c.openingObjective;$("#ch3ChangiReview").textContent=c.review;
 $$('[data-changi-clue]').forEach(node=>{const label=$(".ch3-hotspot-label",node);if(label)label.textContent=c.labels[node.dataset.changiClue]});
 $("#ch3ChangiEvidenceKicker").textContent=c.evidenceKicker;$("#ch3ChangiEvidenceStamp").textContent=c.caseEvidence;$("#ch3ChangiEvidenceHint").textContent=c.tap;$("#inspectCh3ChangiEvidence").textContent=c.inspect;$("#collectCh3ChangiEvidence").textContent=c.collect;$("#closeCh3ChangiEvidence").textContent=c.close;
 $("#ch3PuzzleTitle").textContent=c.puzzleTitle;if(puzzleStage==="classify")$("#ch3PuzzleHelp").textContent=c.puzzleHelp;else $("#ch3PuzzleHelp").textContent=c.conclusionTitle;$("#ch3PuzzleConfirm").textContent=c.confirm;$("#ch3PuzzleReset").textContent=c.reset;$("#ch3PuzzleClose").textContent=c.close;
 $("#ch3ChangiCompleteEye").textContent=c.completeEye;$("#ch3ChangiCompleteTitle").textContent=c.completeTitle;$("#ch3ChangiCompleteText").textContent=c.completeText;$("#ch3ChangiReturnTitle").textContent=c.returnTitle;
 if(activeEvidence){const item=EVIDENCE[activeEvidence],key=isThai()?"th":"en";$("#ch3ChangiEvidenceTitle").textContent=item.title[key];$("#ch3ChangiEvidenceDescription").textContent=item.description[key];$("#ch3ChangiEvidenceObservation").textContent=item.observation[key]}
 if($("#ch3ChangiPuzzle")?.classList.contains("open")){if(puzzleStage==="classify")renderFacts();else renderConclusions()}
 if($("#caseModal")?.classList.contains("open"))appendCaseEntries();
}

function scheduleFlightHandoff(){
 if(handoffQueued)return;handoffQueued=true;setTimeout(()=>{handoffQueued=false;const s=gameState(),p=s?.chapter3?.phase3;if(activeScreen()===FLIGHT_SCREEN&&s?.chapter3?.phase2Complete===true&&!p?.started)beginArrivalTransition(false)},0);
}
function resumePhase3(screen){
 inject();const p=ensureChapterState();updateLanguage();
 if(screen===ARRIVAL_SCREEN){if(p.arrivalSeen){enterChangi();return}beginArrivalTransition(true);return}
 if(screen===CHANGI_SCREEN){enterChangi();return}
}
function installResumeBridge(){
 const api=window.LastWitnessChapter3;if(!api||api.__lwChangi0801)return;originalResume=api.resumeFromState;
 api.resumeFromState=function(screen){
  const result=typeof originalResume==="function"?originalResume.apply(this,arguments):undefined;
  if(internalRouting)return result;
  if(screen===ARRIVAL_SCREEN||screen===CHANGI_SCREEN){setTimeout(()=>resumePhase3(screen),0);return result}
  if(screen===FLIGHT_SCREEN){scheduleFlightHandoff();return result}
  stopAudio(false);closeEvidence();closePuzzle(false);return result;
 };
 api.startChangi=beginArrivalTransition;api.__lwChangi0801=true;
}
function startFreshForDev(){
 inject();const s=gameState();if(!s)return;s.chapter=3;s.chapter3=s.chapter3||{};s.chapter3.phase2Started=true;s.chapter3.phase2TakeoffComplete=true;s.chapter3.phase2TravelCardSeen=true;s.chapter3.phase2DialogueComplete=true;s.chapter3.phase2Complete=true;s.chapter3.phase3={started:false,arrivalSeen:false,introComplete:false,evidenceCollected:[],puzzleAssignments:{},puzzleComplete:false,closingDialogueComplete:false,complete:false,stage:"arrival"};
 s.journal=s.journal||{};s.journal.unlocked=true;s.flags=s.flags||{};s.flags.chapter2_character_feature_unlocked=true;beginArrivalTransition(true);
}
function returnTitle(){stopAudio(true);closeEvidence();closePuzzle(false);window.LastWitnessChapter2Integration?.returnToTitle?.()}
function installBuild(){
 const label=$("#settingsVersion");if(label)label.textContent=`LAST WITNESS · BUILD ${BUILD}`;
 const original=window.snapshot;if(typeof original==="function"&&!original.__lwBuild0801){const wrapped=function(){const data=original.apply(this,arguments);if(data&&typeof data==="object")data.build=BUILD;return data};wrapped.__lwBuild0801=true;window.snapshot=wrapped;if(window.LastWitnessSaveManager)window.LastWitnessSaveManager.snapshot=wrapped}
 if(window.LastWitnessSaveManager)window.LastWitnessSaveManager.version=BUILD;
}
function bind(){
 $("#ch3ArrivalSkip")?.addEventListener("click",enterChangi);
 $$('[data-changi-clue]').forEach(node=>node.addEventListener("click",()=>openEvidence(node.dataset.changiClue)));
 $("#inspectCh3ChangiEvidence")?.addEventListener("click",inspectEvidence);$("#ch3ChangiEvidenceObject")?.addEventListener("click",inspectEvidence);$("#collectCh3ChangiEvidence")?.addEventListener("click",collectEvidence);$("#closeCh3ChangiEvidence")?.addEventListener("click",closeEvidence);
 $("#ch3ChangiEvidencePanel")?.addEventListener("click",event=>{if(event.target===$("#ch3ChangiEvidencePanel"))closeEvidence()});
 $("#ch3ChangiReview")?.addEventListener("click",openPuzzle);$("#ch3PuzzleConfirm")?.addEventListener("click",confirmClassification);$("#ch3PuzzleReset")?.addEventListener("click",resetPuzzle);$("#ch3PuzzleClose")?.addEventListener("click",()=>closePuzzle(true));
 $("#ch3ChangiReturnTitle")?.addEventListener("click",returnTitle);$("#"+CHANGI_SCREEN+" .ch3-changi-save")?.addEventListener("click",()=>manualSave());$("#"+CHANGI_SCREEN+" .ch3-changi-menu")?.addEventListener("click",()=>$("#drawer")?.classList.add("open"));
 $("#chapter3FlightDialogue")?.addEventListener("click",scheduleFlightHandoff);$("#ch3FlightReturnTitle")?.addEventListener("click",event=>{event.preventDefault();event.stopImmediatePropagation();beginArrivalTransition(false)},true);
 $("#caseButton")?.addEventListener("click",()=>setTimeout(appendCaseEntries,0),true);
 $("#soundToggle")?.addEventListener("change",syncAudio,true);$("#musicRange")?.addEventListener("input",syncAudio,true);
 document.addEventListener("click",event=>{if(event.target.closest?.("[data-lang]"))setTimeout(updateLanguage,0)},true);
 document.addEventListener("visibilitychange",()=>{if(document.hidden)stopAudio(false);else if(activeScreen()===CHANGI_SCREEN)syncAudio()});
}
function initialize(){
 inject();document.body.classList.add("lw-changi-runtime");installResumeBridge();installBuild();
 const p=ensureChapterState();if(activeScreen()===FLIGHT_SCREEN&&gameState()?.chapter3?.phase2Complete&&!p?.started)scheduleFlightHandoff();else if(activeScreen()===ARRIVAL_SCREEN||activeScreen()===CHANGI_SCREEN)setTimeout(()=>resumePhase3(activeScreen()),0);
 window.LastWitnessChangi={start:beginArrivalTransition,startFreshForDev,resumeFromState:resumePhase3,stopAudio,updateLanguage,appendCaseEntries,version:BUILD};
}

initialize();
})();
