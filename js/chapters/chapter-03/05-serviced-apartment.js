/* LAST WITNESS — Chapter III / Phase VI: Serviced Apartment 0.11.0 */
(function(){
"use strict";
if(window.LastWitnessPhase6?.version==="0.11.0")return;

const BUILD="0.11.0";
const RETURN_CARD="chapter3Phase6ReturnCard";
const NIGHT_OFFICE="chapter3Phase6NightOffice";
const TRACE_CARD="chapter3Phase6TraceCard";
const LOCATION_CARD="chapter3Phase6LocationCard";
const DOOR_SCREEN="chapter3Phase6Door";
const APARTMENT="chapter3ServicedApartment";
const PHASE6_SCREENS=new Set([RETURN_CARD,NIGHT_OFFICE,TRACE_CARD,LOCATION_CARD,DOOR_SCREEN,APARTMENT]);
const IMAGE="assets/images/chapter-03/phase-06/serviced-apartment-safehouse.png?v=0110";
const ROOM_TONE="assets/audio/chapter-03/phase-06/serviced-apartment-room-tone.mp3?v=0110";
const DOOR_SFX="assets/audio/chapter-03/phase-06/unlock-door.mp3?v=0110";
const OFFICE_IMAGE="assets/images/chapter-03/phase-04/singapore-investigation-office.png?v=0920";
const OFFICE_AMBIENCE="assets/audio/chapter-03/phase-04/singapore-investigation-office-ambience.mp3?v=0920";
const BASE_EVIDENCE=["cache","document","phone"];
const ALL_EVIDENCE=[...BASE_EVIDENCE,"drive"];
const CORRECT={profile:"18-07",permission:"EVIDENCE DIVISION",device:"FS-12",window:"11 MINUTES"};
const OPTIONS={
 profile:["","18-07","FS-12","HC-12"],
 permission:["","EVIDENCE DIVISION","RESIDENT ACCESS","ARCHITECTURE"],
 device:["","FS-12","TERMINAL THREE","18-07"],
 window:["","11 MINUTES","8 MINUTES","17 MINUTES"]
};
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const gs=()=>{try{return state}catch(_){return window.state||null}};
const th=()=>gs()?.language==="th"||document.documentElement.lang==="th";
const tr=(en,thai)=>th()?thai:en;
const active=()=>$(".screen.active")?.id||gs()?.screen||"";
const clamp=(n,min=0,max=1)=>Math.max(min,Math.min(max,Number(n)||0));
let dialogue=null,activeEvidence=null,inspected=false,internal=false;
let cardTimer=0,feedbackTimer=0;
const fadeFrames=new Map();

function ensure(){
 const s=gs();if(!s)return null;
 s.chapter=3;s.chapter3=s.chapter3||{};
 const p=s.chapter3.phase6=s.chapter3.phase6||{};
 for(const key of ["started","returnCardSeen","nightOfficeComplete","traceCardSeen","locationCardSeen","doorEntrySeen","introComplete","entryChoiceMade","credentialUnlockComplete","feedbackBeatSeen","driveCollected","closingDialogueComplete","complete"]){
  if(typeof p[key]!=="boolean")p[key]=false;
 }
 if(typeof p.entryChoiceKey!=="string")p.entryChoiceKey="";
 if(!Array.isArray(p.evidenceCollected))p.evidenceCollected=[];
 p.evidenceCollected=p.evidenceCollected.filter(id=>ALL_EVIDENCE.includes(id));
 if(p.driveCollected&&!p.evidenceCollected.includes("drive"))p.evidenceCollected.push("drive");
 if(p.evidenceCollected.includes("drive")){p.driveCollected=true;p.credentialUnlockComplete=true}
 if(p.evidenceCollected.length){p.introComplete=true;p.entryChoiceMade=true;if(!p.entryChoiceKey)p.entryChoiceKey="network"}
 if(p.complete){p.closingDialogueComplete=true;p.driveCollected=true;p.credentialUnlockComplete=true;p.feedbackBeatSeen=true;if(!p.evidenceCollected.includes("drive"))p.evidenceCollected.push("drive")}
 if(!p.credentialSelections||typeof p.credentialSelections!=="object")p.credentialSelections={};
 if(!Number.isFinite(Number(p.puzzleAttempts)))p.puzzleAttempts=0;
 if(!p.stage)p.stage="return-card";
 return p;
}
function save(){try{if(typeof autoSave==="function")autoSave()}catch(_){}}
function safeShow(id){internal=true;try{show(id)}finally{internal=false}}
function foundAdd(id){try{const found=gs()?.found;if(typeof found?.add==="function")found.add(id);else if(Array.isArray(found)&&!found.includes(id))found.push(id)}catch(_){}}
function stopElement(media,reset=false){if(!media)return;try{media.pause();if(reset)media.currentTime=0}catch(_){}}
function stopAudio(reset=false){
 clearTimeout(cardTimer);clearTimeout(feedbackTimer);for(const frame of fadeFrames.values())cancelAnimationFrame(frame);fadeFrames.clear();
 stopElement($("#ch3P6OfficeAmbience"),reset);stopElement($("#ch3P6RoomTone"),reset);stopElement($("#ch3P6DoorSfx"),reset);
}
function fade(media,target,duration=320){
 if(!media)return;const previous=fadeFrames.get(media);if(previous)cancelAnimationFrame(previous);
 const start=clamp(media.volume),end=clamp(target,0,.22),began=performance.now();
 if(end>0&&media.paused){media.volume=0;media.loop=true;media.muted=false;media.play().catch(()=>{})}
 const step=now=>{const q=Math.max(0,Math.min(1,(now-began)/duration));media.volume=start+(end-start)*q;if(q<1)fadeFrames.set(media,requestAnimationFrame(step));else{fadeFrames.delete(media);if(end===0)media.pause()}};
 fadeFrames.set(media,requestAnimationFrame(step));
}
function overlaysOpen(){return Boolean($("#ch3P6Evidence")?.classList.contains("open")||$("#ch3P6Puzzle")?.classList.contains("open")||$("#ch3P6Choice")?.classList.contains("show"))}
function syncAudio(){
 const s=gs(),enabled=s?.sound!==false&&Number(s?.music??.33)>0;
 const duck=(dialogue?.76:1)*(overlaysOpen()?.72:1);
 const office=$("#ch3P6OfficeAmbience"),room=$("#ch3P6RoomTone");
 fade(office,enabled&&active()===NIGHT_OFFICE?Math.min(.18,Number(s.music??.33)*.33*duck):0,260);
 fade(room,enabled&&active()===APARTMENT?Math.min(.17,Number(s.music??.33)*.31*duck):0,260);
}
function playDoor(){
 const audio=$("#ch3P6DoorSfx"),s=gs();if(!audio||s?.sound===false||Number(s?.sfx??.7)<=0)return;
 try{audio.currentTime=0;audio.volume=Math.min(.44,Number(s.sfx??.7)*.48);audio.play().catch(()=>{})}catch(_){}
}
function portrait(speaker,emotion){
 try{return typeof window.portrait==="function"?window.portrait(speaker,emotion||"neutral"):window.PORTRAITS?.[speaker]?.[emotion||"neutral"]||window.PORTRAITS?.[speaker]?.neutral||""}catch(_){return""}
}
function recordHistory(line){
 try{const s=gs();s.history=s.history||[];s.history.push({speaker:line[0],text:th()?line[3]:line[2],chapter:3,phase:6})}catch(_){}}
function renderDialogue(){
 const box=active()===NIGHT_OFFICE?$("#ch3P6OfficeDialogue"):$("#ch3P6Dialogue");if(!box||!dialogue)return;
 const line=dialogue.lines[dialogue.i],right=line[0]==="North"||line[0]==="Inspector Cheryl Goh";
 const src=portrait(line[0],line[1]);
 box.className="dialogue ch3-p6-dialogue"+(right?" right":"");
 box.innerHTML=`<div class="portrait-wrap">${src?`<img class="portrait" src="${src}" alt="">`:""}</div><div class="dialogue-copy"><div class="speaker">${line[0]}</div><div class="line">${th()?line[3]:line[2]}</div></div><div class="next">${tr("TAP TO CONTINUE","แตะเพื่อดำเนินต่อ")}</div>`;
 syncAudio();
}
function talk(lines,done){
 const box=active()===NIGHT_OFFICE?$("#ch3P6OfficeDialogue"):$("#ch3P6Dialogue");if(!box){done?.();return}
 dialogue={lines,i:0,done};box.classList.remove("hidden");renderDialogue();
 box.onclick=()=>{if(!dialogue)return;recordHistory(dialogue.lines[dialogue.i]);dialogue.i++;if(dialogue.i>=dialogue.lines.length){const fn=dialogue.done;dialogue=null;box.classList.add("hidden");box.onclick=null;syncAudio();fn?.();save()}else renderDialogue()};
}

const D={
 office:[
  ["Farid Rahman","tablet_read","The managed controller covers three service zones. Only one dedicated access point carried the token.","managed controller ครอบคลุมสามโซนบริการ แต่มี Access Point เฉพาะเพียงตัวเดียวที่รับ token ชุดนี้"],
  ["North","focused","One unit. Short lease. The registered device list was cleared before the token arrived.","หนึ่งห้อง สัญญาระยะสั้น และรายการอุปกรณ์ที่ลงทะเบียนถูกล้างก่อน token จะมาถึง"],
  ["Inspector Cheryl Goh","reading","Building management confirms the unit was returned this afternoon. No registered occupant remains.","ฝ่ายอาคารยืนยันว่าห้องถูกคืนช่วงบ่ายวันนี้ และไม่มีผู้พักที่ลงทะเบียนเหลืออยู่"],
  ["Benedict","thinking","A vacant room can still be occupied by a story.","ห้องว่างก็ยังถูกเรื่องเล่าเข้าครอบครองได้"],
  ["Inspector Cheryl Goh","serious","I can secure a limited site-verification window for 10:20. Building representative present. Plain view and volatile evidence only.","ฉันขอช่วงเวลาตรวจสถานที่แบบจำกัดได้ตอน 10:20 น. โดยมีตัวแทนอาคารอยู่ด้วย ตรวจเฉพาะสิ่งที่เห็นได้โดยตรงและหลักฐานที่อาจสูญหาย"],
  ["North","side","So the legal paperwork gets a full night of sleep.","แปลว่าเอกสารทางกฎหมายได้นอนเต็มคืนค่ะ"],
  ["Benedict","smirk","Someone in this room should.","อย่างน้อยควรมีใครสักคนในห้องนี้ได้นอน"],
  ["Benedict","serious","We enter with authority, not assumption.","เราเข้าไปด้วยอำนาจที่ถูกต้อง ไม่ใช่ด้วยข้อสันนิษฐาน"]
 ],
 apartmentIntro:[
  ["Inspector Cheryl Goh","serious","The building representative opened the unit under limited site-verification authority. The unit is vacant and under management control.","ตัวแทนอาคารเปิดห้องภายใต้อำนาจตรวจสถานที่แบบจำกัด ห้องไม่มีผู้พักและอยู่ในการควบคุมของฝ่ายอาคาร"],
  ["Farid Rahman","tablet","The dedicated access point served only this unit during the handoff window. That proves the network path reached here, not who used it.","ในช่วงส่งต่อ Access Point เฉพาะให้บริการเพียงห้องนี้ จึงพิสูจน์ได้ว่าเส้นทางเครือข่ายมาถึงที่นี่ แต่ยังไม่พิสูจน์ว่าใครเป็นผู้ใช้"],
  ["North","focused","Laptop, burner phone, travel case, two cups. Enough to suggest a resident. Nothing personal enough to identify one.","แล็ปท็อป โทรศัพท์ชั่วคราว กระเป๋าเดินทาง กาแฟสองถ้วย มากพอให้ดูเหมือนมีคนพัก แต่ไม่มีอะไรเป็นส่วนตัวพอจะระบุตัวได้"],
  ["Benedict","neutral","Then we read what the room was built to say before deciding who it was built to resemble.","งั้นเราอ่านก่อนว่าห้องนี้ถูกจัดให้พูดอะไร แล้วค่อยตัดสินว่ามันถูกจัดให้ดูเหมือนใคร"]
 ],
 choice:{
  preserve:[["Benedict","serious","Positions first. Anything meant to survive a hurried departure will be where the story needs it.","เริ่มจากตำแหน่งก่อน ของที่ถูกตั้งใจให้รอดจากการจากไปอย่างเร่งรีบ จะอยู่ตรงที่เรื่องเล่าต้องการ"]],
  network:[["Benedict","serious","Network path first. We separate what arrived here from whoever may have left.","เริ่มจากเส้นทางเครือข่าย แยกสิ่งที่มาถึงที่นี่ออกจากคนที่อาจออกไปแล้ว"]],
  departure:[["Benedict","thinking","Read the departure. People take what belongs to them and leave what belongs to the next conclusion.","อ่านจากการจากไป คนมักเอาของที่เป็นของตนไป และทิ้งของที่เป็นของข้อสรุปถัดไปไว้"]]
 },
 evidence:{
  cache:[
   ["North","focused","Token match. Dedicated access point. The cache retains profile 18-07, but the operator field is still empty.","token ตรงกัน Access Point เป็นแบบเฉพาะ Cache เก็บโปรไฟล์ 18-07 ไว้ แต่ช่อง operator ยังว่าง"],
   ["Farid Rahman","tablet","A credential reached the unit. A person remains an inference.","credential มาถึงห้องนี้ ส่วนบุคคลยังเป็นเพียงข้ออนุมาน"]
  ],
  document:[
   ["North","analyzing","Evidence Division permission, claimed device FS-12, eleven-minute window. Someone prepared this room around Daniel's corrected header.","สิทธิ์ Evidence Division อุปกรณ์ที่อ้างว่าเป็น FS-12 และช่วงเวลาสิบเอ็ดนาที มีคนเตรียมห้องนี้โดยอิงหัวบันทึกที่ถูกแก้ของแดเนียล"],
   ["Benedict","serious","Knowledge of the event is not authorship of the event.","การรู้รายละเอียดของเหตุการณ์ ไม่ได้พิสูจน์ว่าเป็นผู้สร้างเหตุการณ์"]
  ],
  phone:[
   ["Inspector Cheryl Goh","reading","HC-12. Day 4, 12:10. Camera line. Public-space verification protocol.","HC-12 วันที่ 4 เวลา 12:10 น. แนวกล้อง เป็นระเบียบยืนยันตัวในพื้นที่สาธารณะ"],
   ["Benedict","thinking","A meeting instruction, not a signature.","เป็นคำสั่งนัดหมาย ไม่ใช่ลายเซ็นระบุตัว"]
  ],
  drive:[
   ["North","focused","A.T.W.M. appears as an architect contact reference. The payload remains encrypted and the raw reconciliation record is not here.","A.T.W.M. ปรากฏเป็นข้อมูลอ้างอิงผู้ติดต่อประเภทสถาปนิก Payload ยังเข้ารหัส และ raw reconciliation record ไม่ได้อยู่ที่นี่"],
   ["Inspector Cheryl Goh","skeptical","Reference is not ownership. Contact is not control.","ข้อมูลอ้างอิงไม่ใช่ความเป็นเจ้าของ การติดต่อไม่ใช่การควบคุม"],
   ["Benedict","neutral","Good. We follow the meeting, not the name attached to it.","ดี เราตามนัดไป ไม่ใช่ตามชื่อที่ถูกผูกไว้กับมัน"]
  ]
 },
 feedback:[
  ["North","alert","The cache retention just dropped from thirty minutes to archive-only.","ระยะเก็บ Cache เพิ่งลดจากสามสิบนาทีเหลือเพียงโหมด Archive"],
  ["Farid Rahman","concerned","Could be an expiry rule triggered by a completed header.","อาจเป็นกฎหมดอายุที่ทำงานเมื่อประกอบ Header ครบ"],
  ["North","side","It waited until the header resolved.","แต่มันรอจน Header ถูกประกอบสำเร็จค่ะ"],
  ["Benedict","serious","Record the timing. Do not promote it to intention.","บันทึกจังหวะเวลาไว้ แต่อย่าเพิ่งยกระดับให้เป็นเจตนา"]
 ],
 closing:[
  ["Farid Rahman","tablet_read","The serviced-apartment unit functioned as an operational handoff. The room links to the reconciliation architecture, but not to a verified operator.","ห้องใน serviced apartment ทำหน้าที่เป็นจุดส่งต่อปฏิบัติการ ห้องเชื่อมกับสถาปัตยกรรมการประสานข้อมูล แต่ยังไม่เชื่อมกับผู้ใช้ที่ยืนยันตัวได้"],
  ["North","focused","HC-12 maps to a public Hawker Centre site. The protocol specifies cameras, witnesses and the phrase: the route arrived first.","HC-12 ตรงกับพื้นที่สาธารณะใน Hawker Centre ระเบียบกำหนดให้มีกล้อง พยาน และวลียืนยันว่า เส้นทางมาถึงก่อน"],
  ["Inspector Cheryl Goh","serious","We can observe the meeting and verify the contact. We still cannot call Adrian the operator.","เราสังเกตการนัดหมายและยืนยันผู้ติดต่อได้ แต่ยังเรียก Adrian ว่าเป็นผู้ใช้คำสั่งไม่ได้"],
  ["Benedict","serious","Then we arrive before the conclusion does.","งั้นเราไปให้ถึงก่อนที่ข้อสรุปจะไปถึง"]
 ]
};

const E={
 cache:{
  title:{en:"Ephemeral Handoff Cache",th:"Cache การส่งต่อชั่วคราว"},
  description:{en:"A volatile cache on the room's dedicated access point preserves the same short-lived token seen at Marina Bay. It resolves to Temporary Operational Profile 18-07 while leaving the operator field blank.",th:"Cache ที่อาจสูญหายบน Access Point เฉพาะของห้องเก็บ token อายุสั้นชุดเดียวกับที่พบใน Marina Bay โดยเชื่อมถึง Temporary Operational Profile 18-07 แต่ช่อง operator ยังว่าง"},
  observation:{en:"The network path reached this unit. Physical presence and operator identity remain unproven.",th:"เส้นทางเครือข่ายมาถึงห้องนี้แล้ว แต่การปรากฏตัวทางกายภาพและตัวผู้ใช้ยังไม่ถูกพิสูจน์"}
 },
 document:{
  title:{en:"Reconciliation Architecture Document",th:"เอกสารสถาปัตยกรรมการประสานข้อมูล"},
  description:{en:"A marked architecture extract describes accepted Evidence Division permission, claimed device FS-12 and an eleven-minute reconciliation window for delayed signed events.",th:"เอกสารสถาปัตยกรรมที่มีการทำเครื่องหมายระบุสิทธิ์ Evidence Division ที่ระบบยอมรับ อุปกรณ์ที่อ้างว่าเป็น FS-12 และช่วงเวลาประสานข้อมูลสิบเอ็ดนาทีสำหรับเหตุการณ์ที่ลงลายเซ็นและส่งล่าช้า"},
  observation:{en:"Someone using this room understood Daniel's corrected header. The document does not identify who prepared it.",th:"ผู้ใช้ห้องนี้เข้าใจหัวบันทึกที่ถูกแก้ของแดเนียล แต่เอกสารไม่ระบุว่าใครเป็นผู้จัดเตรียม"}
 },
 phone:{
  title:{en:"Burner Phone · Meeting Fragment",th:"โทรศัพท์ชั่วคราว · เศษข้อความนัดหมาย"},
  description:{en:"The handset contains a short-lived instruction: HC-12, Day 4 at 12:10 PM, CAMERA LINE, and the verification phrase THE ROUTE ARRIVED FIRST.",th:"โทรศัพท์มีคำสั่งอายุสั้นว่า HC-12 วันที่ 4 เวลา 12:10 น. CAMERA LINE และวลียืนยัน THE ROUTE ARRIVED FIRST"},
  observation:{en:"The fragment establishes a meeting protocol. It does not establish the sender, recipient or owner of the phone.",th:"เศษข้อความพิสูจน์ระเบียบการนัดหมาย แต่ไม่พิสูจน์ผู้ส่ง ผู้รับ หรือเจ้าของโทรศัพท์"}
 },
 drive:{
  title:{en:"Encrypted Architecture Drive",th:"ไดรฟ์สถาปัตยกรรมที่เข้ารหัส"},
  description:{en:"The unlocked plaintext index classifies A.T.W.M. as an architect contact reference under protocol HC-12. The payload remains encrypted and contains no raw reconciliation record.",th:"ดัชนีข้อความธรรมดาที่ปลดล็อกแล้วจัด A.T.W.M. เป็นข้อมูลอ้างอิงผู้ติดต่อประเภทสถาปนิกภายใต้ระเบียบ HC-12 ส่วน Payload ยังเข้ารหัสและไม่มี raw reconciliation record"},
  observation:{en:"The initials align with Adrian Tan Wei Ming as a contact reference, not as proof of ownership, presence, control or mastermind status.",th:"อักษรย่อสอดคล้องกับ Adrian Tan Wei Ming ในฐานะข้อมูลอ้างอิงผู้ติดต่อ ไม่ใช่หลักฐานความเป็นเจ้าของ การปรากฏตัว การควบคุม หรือสถานะผู้อยู่เบื้องหลัง"}
 }
};

function copy(){return{
 returnDay:tr("DAY 3","วันที่ 3"),returnTime:"11:48 PM",returnPlace:tr("SINGAPORE INVESTIGATION OFFICE","ศูนย์สืบสวนสิงคโปร์"),returnPhase:tr("THE TRACE REMAINS ACTIVE","การติดตามยังดำเนินต่อ"),
 officeLocation:tr("Singapore Investigation Office · Late Night","ศูนย์สืบสวนสิงคโปร์ · ดึก"),officeScene:tr("THE MANAGED-NETWORK TRACE","การติดตามเครือข่ายที่มีผู้จัดการ"),
 traceTime:"02:18 AM",traceTitle:tr("THE CONTROLLER TRACE NARROWED","การติดตาม Controller ถูกจำกัดลง"),trace1:tr("A dedicated access point was isolated to one serviced unit.","แยก Access Point เฉพาะได้ถึงห้องพักหนึ่งห้อง"),trace2:tr("Building management confirmed the unit vacant.","ฝ่ายอาคารยืนยันว่าไม่มีผู้พักอยู่ในห้อง"),trace3:tr("Limited site verification approved for 10:20 AM.","อนุมัติการตรวจสถานที่แบบจำกัดเวลา 10:20 น."),
 day:tr("DAY 4","วันที่ 4"),time:"10:20 AM",place:tr("SINGAPORE · SERVICED APARTMENT","สิงคโปร์ · Serviced Apartment"),phase:tr("THE ADDRESS WITHOUT A NAME","ที่อยู่ไร้ชื่อ"),
 location:tr("Serviced Apartment · Controlled Site Verification","Serviced Apartment · การตรวจสถานที่แบบควบคุม"),scene:tr("THE ADDRESS WITHOUT A NAME","ที่อยู่ไร้ชื่อ"),objective:tr("Verify the operational handoff without assigning an occupant","ตรวจจุดส่งต่อปฏิบัติการโดยไม่ระบุผู้อยู่อาศัยเกินหลักฐาน"),
 choiceTitle:tr("Choose the investigative approach","เลือกแนวทางตรวจสอบ"),preserve:tr("Preserve the scene","รักษาสภาพสถานที่"),preserveSub:tr("Read placement, disturbance and what was intentionally left behind.","อ่านตำแหน่ง ร่องรอยการเคลื่อนย้าย และสิ่งที่จงใจทิ้งไว้"),network:tr("Verify the network","ตรวจสอบเครือข่าย"),networkSub:tr("Follow the token from controller to dedicated access point.","ติดตาม token จาก Controller ถึง Access Point เฉพาะ"),departure:tr("Read the departure","อ่านจากการจากไป"),departureSub:tr("Separate personal absence from operational preparation.","แยกการไม่เหลือของส่วนตัวออกจากการเตรียมปฏิบัติการ"),
 reconstruct:tr("Reconstruct Credential Header","ประกอบ Credential Header"),inspect:tr("Inspect","ตรวจสอบ"),collect:tr("Add to Case File","เพิ่มในแฟ้มคดี"),close:tr("Close","ปิด"),confirm:tr("Confirm Header","ยืนยัน Header"),reset:tr("Reset","เริ่มใหม่"),
 puzzleTitle:tr("06:09 CREDENTIAL HEADER UNLOCK","ปลดล็อก CREDENTIAL HEADER เวลา 06:09"),puzzleHelp:tr("Use the fragments recovered in this room. Tap each field to cycle through the available values.","ใช้เศษข้อมูลที่พบในห้องนี้ แตะแต่ละช่องเพื่อวนเลือกค่าที่มี"),puzzleClose:tr("Close","ปิด"),
 profile:tr("Temporary Profile","โปรไฟล์ชั่วคราว"),permission:tr("Accepted Permission","สิทธิ์ที่ระบบยอมรับ"),device:tr("Claimed Device","อุปกรณ์ที่ถูกอ้าง"),window:tr("Reconciliation Window","ช่วงเวลาประสานข้อมูล"),
 door:tr("LIMITED SITE VERIFICATION","การตรวจสถานที่แบบจำกัด"),feedbackTitle:tr("VOLATILE CACHE STATUS","สถานะ CACHE ที่อาจสูญหาย"),
 hotspotCache:tr("Handoff Cache","Cache การส่งต่อ"),hotspotDocument:tr("Architecture Document","เอกสารสถาปัตยกรรม"),hotspotPhone:tr("Burner Phone","โทรศัพท์ชั่วคราว"),hotspotDrive:tr("Encrypted Drive","ไดรฟ์เข้ารหัส")
}}

function evidenceVisual(id){
 if(id==="cache")return `<article><header>EPHEMERAL HANDOFF CACHE</header><dl><dt>SESSION TOKEN</dt><dd>MATCH · MARINA BAY</dd><dt>ACCESS POINT</dt><dd>DEDICATED UNIT</dd><dt>TEMP PROFILE</dt><dd>18-07</dd><dt>RETENTION</dt><dd>VOLATILE · 00:30:00</dd><dt>OPERATOR</dt><dd>BLANK</dd></dl><footer>NETWORK PATH CONFIRMED · PERSON UNRESOLVED</footer></article>`;
 if(id==="document")return `<article><header>RECONCILIATION ARCHITECTURE</header><dl><dt>EVENT CLASS</dt><dd>SIGNED LOCAL EVENT</dd><dt>PERMISSION</dt><dd>EVIDENCE DIVISION</dd><dt>CLAIMED DEVICE</dt><dd>FS-12</dd><dt>WINDOW</dt><dd>11 MINUTES</dd><dt>RAW ORDER</dt><dd>NOT PRESENT</dd></dl><footer>ARCHITECTURE KNOWLEDGE · AUTHOR UNRESOLVED</footer></article>`;
 if(id==="phone")return `<article><header>SHORT-LIVED MESSAGE FRAGMENT</header><dl><dt>PROTOCOL</dt><dd>HC-12</dd><dt>DATE</dt><dd>DAY 4</dd><dt>TIME</dt><dd>12:10 PM</dd><dt>POSITION</dt><dd>CAMERA LINE</dd><dt>VERIFY</dt><dd>THE ROUTE ARRIVED FIRST</dd></dl><footer>MEETING INSTRUCTION · SENDER UNRESOLVED</footer></article>`;
 return `<article><header>ENCRYPTED ARCHITECTURE DRIVE</header><dl><dt>INDEX CLASS</dt><dd>ARCHITECTURE</dd><dt>CONTACT CLASS</dt><dd>ARCHITECT</dd><dt>REFERENCE</dt><dd>A.T.W.M.</dd><dt>PROTOCOL</dt><dd>HC-12</dd><dt>PAYLOAD</dt><dd>ENCRYPTED</dd><dt>RAW RECORD</dt><dd>NOT PRESENT</dd></dl><footer>CONTACT REFERENCE · ATTRIBUTION UNRESOLVED</footer></article>`;
}

function inject(){
 if($("#"+RETURN_CARD))return;const game=$("#game");if(!game)return;
 game.insertAdjacentHTML("beforeend",`
 <section id="${RETURN_CARD}" class="screen ch3-p6-intertitle"><div class="ch3-p6-card"><div id="ch3P6ReturnDay" class="eyebrow"></div><div id="ch3P6ReturnTime" class="ch3-p6-clock"></div><h2 id="ch3P6ReturnPlace"></h2><div class="ch3-p6-rule"></div><p id="ch3P6ReturnPhase" class="ch3-p6-phase"></p></div></section>
 <section id="${NIGHT_OFFICE}" class="screen ch3-p6-office"><img class="scene" src="${OFFICE_IMAGE}" alt="Singapore Investigation Office late at night"><div class="overlay ch3-p6-office-overlay"></div><div class="topbar"><span id="ch3P6OfficeLocation"></span><div class="hud"><button class="icon ch3-p6-save" type="button">💾</button><button class="icon ch3-p6-menu" type="button">☰</button></div></div><div id="ch3P6OfficeScene" class="ch3-p6-scene-label"></div><div id="ch3P6OfficeDialogue" class="dialogue ch3-p6-dialogue hidden"></div><audio id="ch3P6OfficeAmbience" preload="auto" loop src="${OFFICE_AMBIENCE}"></audio></section>
 <section id="${TRACE_CARD}" class="screen ch3-p6-intertitle"><div class="ch3-p6-card"><div class="eyebrow">LAST WITNESS</div><div id="ch3P6TraceTime" class="ch3-p6-clock"></div><h2 id="ch3P6TraceTitle"></h2><div class="ch3-p6-rule"></div><div class="ch3-p6-status-lines"><div id="ch3P6Trace1" class="ch3-p6-status-line"></div><div id="ch3P6Trace2" class="ch3-p6-status-line"></div><div id="ch3P6Trace3" class="ch3-p6-status-line"></div></div></div></section>
 <section id="${LOCATION_CARD}" class="screen ch3-p6-location-card"><div class="ch3-p6-card"><div id="ch3P6Day" class="eyebrow"></div><div id="ch3P6Time" class="ch3-p6-clock"></div><h2 id="ch3P6Place"></h2><div class="ch3-p6-rule"></div><p id="ch3P6Phase" class="ch3-p6-phase"></p></div></section>
 <section id="${DOOR_SCREEN}" class="screen ch3-p6-door-screen"><div><div class="ch3-p6-door-mark">VI</div><p id="ch3P6DoorLabel"></p></div><audio id="ch3P6DoorSfx" preload="auto" src="${DOOR_SFX}"></audio></section>
 <section id="${APARTMENT}" class="screen ch3-p6-apartment"><img class="scene" src="${IMAGE}" alt="Serviced apartment prepared as an operational staging point"><div class="overlay ch3-p6-apartment-overlay"></div><div class="topbar"><span id="ch3P6Location"></span><div class="hud"><button class="icon ch3-p6-save" type="button">💾</button><button class="icon ch3-p6-menu" type="button">☰</button></div></div><div id="ch3P6Scene" class="ch3-p6-scene-label"></div><div id="ch3P6Objective" class="ch3-p6-objective"></div><div id="ch3P6Feedback" class="ch3-p6-feedback"><strong id="ch3P6FeedbackTitle"></strong><span id="ch3P6FeedbackText"></span></div><div id="ch3P6Dialogue" class="dialogue ch3-p6-dialogue hidden"></div><div id="ch3P6Choice" class="choice-panel hidden ch3-p6-choice"><div id="ch3P6ChoiceTitle" class="choice-title"></div><button class="choice-option" data-p6-choice="preserve" type="button"><span></span><small></small></button><button class="choice-option" data-p6-choice="network" type="button"><span></span><small></small></button><button class="choice-option" data-p6-choice="departure" type="button"><span></span><small></small></button></div><div class="ch3-p6-hotspots locked"><button class="ch3-p6-hotspot ch3-p6-cache" data-p6-evidence="cache" type="button"><span></span></button><button class="ch3-p6-hotspot ch3-p6-document" data-p6-evidence="document" type="button"><span></span></button><button class="ch3-p6-hotspot ch3-p6-phone" data-p6-evidence="phone" type="button"><span></span></button><button class="ch3-p6-hotspot ch3-p6-drive" data-p6-evidence="drive" type="button"><span></span></button></div><button id="ch3P6PuzzleButton" class="primary ch3-p6-action-button" type="button" hidden></button><div class="ch3-p6-progress"><span id="ch3P6ProgressText">0%</span><div><i id="ch3P6ProgressFill"></i></div></div><audio id="ch3P6RoomTone" preload="auto" loop src="${ROOM_TONE}"></audio></section>
 <div id="ch3P6Evidence" class="modal ch3-p6-evidence" aria-hidden="true"><div class="modal-card"><div class="eyebrow">SERVICED APARTMENT · EVIDENCE</div><h3 id="ch3P6EvidenceTitle"></h3><div id="ch3P6EvidenceVisual" class="ch3-p6-evidence-visual"></div><div id="ch3P6EvidenceMeta" class="ch3-p6-evidence-meta"><p id="ch3P6EvidenceDescription"></p><div id="ch3P6EvidenceObservation" class="evidence-observation"></div></div><div class="actions"><button id="ch3P6Inspect" class="ghost" type="button"></button><button id="ch3P6Collect" class="primary" type="button"></button><button id="ch3P6EvidenceClose" class="ghost wide" type="button"></button></div></div></div>
 <div id="ch3P6Puzzle" class="modal ch3-p6-puzzle" aria-hidden="true"><div class="modal-card"><div class="eyebrow">LAST WITNESS · PHASE VI</div><h3 id="ch3P6PuzzleTitle"></h3><p id="ch3P6PuzzleHelp" class="ch3-p6-puzzle-help"></p><div id="ch3P6Fields" class="ch3-p6-fields"></div><div id="ch3P6PuzzleStatus" class="ch3-p6-puzzle-status" aria-live="polite"></div><div class="actions"><button id="ch3P6PuzzleConfirm" class="primary" type="button"></button><button id="ch3P6PuzzleReset" class="ghost" type="button"></button><button id="ch3P6PuzzleClose" class="ghost wide" type="button"></button></div></div></div>`);
 bindElements();updateLanguage();paint();
}

function updateLanguage(){
 const c=copy();
 const text={ch3P6ReturnDay:c.returnDay,ch3P6ReturnTime:c.returnTime,ch3P6ReturnPlace:c.returnPlace,ch3P6ReturnPhase:c.returnPhase,ch3P6OfficeLocation:c.officeLocation,ch3P6OfficeScene:c.officeScene,ch3P6TraceTime:c.traceTime,ch3P6TraceTitle:c.traceTitle,ch3P6Trace1:c.trace1,ch3P6Trace2:c.trace2,ch3P6Trace3:c.trace3,ch3P6Day:c.day,ch3P6Time:c.time,ch3P6Place:c.place,ch3P6Phase:c.phase,ch3P6DoorLabel:c.door,ch3P6Location:c.location,ch3P6Scene:c.scene,ch3P6Objective:c.objective,ch3P6ChoiceTitle:c.choiceTitle,ch3P6PuzzleButton:c.reconstruct,ch3P6Inspect:c.inspect,ch3P6Collect:c.collect,ch3P6EvidenceClose:c.close,ch3P6PuzzleTitle:c.puzzleTitle,ch3P6PuzzleHelp:c.puzzleHelp,ch3P6PuzzleConfirm:c.confirm,ch3P6PuzzleReset:c.reset,ch3P6PuzzleClose:c.puzzleClose,ch3P6FeedbackTitle:c.feedbackTitle};
 Object.entries(text).forEach(([id,value])=>{const n=$("#"+id);if(n)n.textContent=value});
 const choices={preserve:[c.preserve,c.preserveSub],network:[c.network,c.networkSub],departure:[c.departure,c.departureSub]};
 $$('[data-p6-choice]').forEach(b=>{const pair=choices[b.dataset.p6Choice];b.querySelector("span").textContent=pair[0];b.querySelector("small").textContent=pair[1]});
 const clues={cache:c.hotspotCache,document:c.hotspotDocument,phone:c.hotspotPhone,drive:c.hotspotDrive};
 $$('[data-p6-evidence] span').forEach(n=>n.textContent=clues[n.parentElement.dataset.p6Evidence]);
 if(activeEvidence)paintEvidence(activeEvidence);if(dialogue)renderDialogue();if($("#ch3P6Puzzle")?.classList.contains("open"))renderPuzzle();
 if(active()==="chapter3Wip"&&ensure()?.complete)showPhase7Fallback();
}
function progress(){
 const p=ensure();let pct=4;if(p.nightOfficeComplete)pct=12;if(p.locationCardSeen)pct=18;if(p.introComplete)pct=27;if(p.entryChoiceMade)pct=34;pct+=p.evidenceCollected.filter(id=>BASE_EVIDENCE.includes(id)).length*14;if(p.credentialUnlockComplete)pct=82;if(p.driveCollected)pct=93;if(p.complete)pct=100;
 const n=Math.min(100,pct);$("#ch3P6ProgressText")&&( $("#ch3P6ProgressText").textContent=n+"%" );const fill=$("#ch3P6ProgressFill");if(fill)fill.style.width=n+"%";
}
function unlockHotspots(on){
 $(".ch3-p6-hotspots")?.classList.toggle("locked",!on);
 $$('[data-p6-evidence]').forEach(b=>{const isDrive=b.dataset.p6Evidence==="drive";const available=!isDrive||ensure().credentialUnlockComplete;b.disabled=!on||!available;b.tabIndex=on&&available?0:-1});
}
function allBaseCollected(){const set=new Set(ensure().evidenceCollected);return BASE_EVIDENCE.every(id=>set.has(id))}
function paint(){
 const p=ensure(),set=new Set(p.evidenceCollected);
 $$('[data-p6-evidence]').forEach(b=>b.classList.toggle("found",set.has(b.dataset.p6Evidence)));
 const drive=$("[data-p6-evidence='drive']");drive?.classList.toggle("show",p.credentialUnlockComplete);
 const ready=allBaseCollected()&&!p.credentialUnlockComplete&&!dialogue&&!$("#ch3P6Evidence")?.classList.contains("open");
 const puzzle=$("#ch3P6PuzzleButton");if(puzzle){puzzle.hidden=!ready;puzzle.disabled=!ready;puzzle.classList.toggle("show",ready)}
 progress();
}
function paintEvidence(id){
 const e=E[id],key=th()?"th":"en";if(!e)return;
 $("#ch3P6EvidenceTitle").textContent=e.title[key];$("#ch3P6EvidenceVisual").innerHTML=evidenceVisual(id);$("#ch3P6EvidenceDescription").textContent=e.description[key];$("#ch3P6EvidenceObservation").textContent=e.observation[key];
}
function openEvidence(id){
 const p=ensure();if(!E[id]||dialogue||$("#ch3P6Puzzle")?.classList.contains("open"))return;if(id==="drive"&&!p.credentialUnlockComplete)return;
 activeEvidence=id;inspected=false;paintEvidence(id);$("#ch3P6EvidenceMeta").classList.remove("show");
 const collected=p.evidenceCollected.includes(id);$("#ch3P6Collect").hidden=collected;$("#ch3P6Collect").disabled=true;
 $("#ch3P6Evidence")?.classList.add("open");$("#ch3P6Evidence")?.setAttribute("aria-hidden","false");syncAudio();
}
function inspectEvidence(){if(!activeEvidence)return;inspected=true;$("#ch3P6EvidenceMeta")?.classList.add("show");if(!ensure().evidenceCollected.includes(activeEvidence))$("#ch3P6Collect").disabled=false}
function closeEvidence(){
 $("#ch3P6Evidence")?.classList.remove("open");$("#ch3P6Evidence")?.setAttribute("aria-hidden","true");activeEvidence=null;inspected=false;syncAudio();paint();
}
function collectEvidence(){
 const p=ensure(),id=activeEvidence;if(!id||!inspected||p.evidenceCollected.includes(id))return;
 p.evidenceCollected.push(id);if(id==="drive")p.driveCollected=true;foundAdd("safehouse_"+id);
 try{window.LastWitnessAudioCue?.playCollection?.()}catch(_){}
 closeEvidence();p.stage=id==="drive"?"closing":"investigation";gs().checkpoint=id==="drive"?"ch3_phase6_drive":"ch3_phase6_investigation";save();
 talk(D.evidence[id]||[],()=>{if(id==="drive")startClosing();else paint()});
}
function chooseApproach(key){
 const p=ensure();if(p.entryChoiceMade)return;p.entryChoiceMade=true;p.entryChoiceKey=key;p.stage="investigation";gs().checkpoint="ch3_phase6_investigation";
 $("#ch3P6Choice")?.classList.remove("show");$("#ch3P6Choice")?.classList.add("hidden");save();
 talk(D.choice[key]||[],()=>{unlockHotspots(true);paint()});
}

function renderPuzzle(){
 const p=ensure(),c=copy();
 const labels={profile:c.profile,permission:c.permission,device:c.device,window:c.window};
 $("#ch3P6Fields").innerHTML=Object.keys(labels).map(key=>{const value=String(p.credentialSelections[key]||"");return `<div class="ch3-p6-field"><label>${labels[key]}</label><button class="ch3-p6-cycle ${value?"selected":""}" type="button" data-p6-field="${key}">${value||tr("TAP TO SELECT","แตะเพื่อเลือก")}</button></div>`}).join("");
 $$('[data-p6-field]').forEach(button=>button.onclick=()=>cycleField(button.dataset.p6Field));
}
function cycleField(key){
 const p=ensure(),options=OPTIONS[key]||[""];let i=options.indexOf(String(p.credentialSelections[key]||""));i=(i+1)%options.length;p.credentialSelections[key]=options[i];renderPuzzle();$("#ch3P6PuzzleStatus").textContent="";save();
}
function openPuzzle(){if(!allBaseCollected()||ensure().credentialUnlockComplete||dialogue)return;renderPuzzle();$("#ch3P6PuzzleStatus").textContent="";$("#ch3P6PuzzleStatus").className="ch3-p6-puzzle-status";$("#ch3P6Puzzle")?.classList.add("open");$("#ch3P6Puzzle")?.setAttribute("aria-hidden","false");ensure().stage="credential-unlock";gs().checkpoint="ch3_phase6_credential_unlock";syncAudio();save()}
function closePuzzle(){$("#ch3P6Puzzle")?.classList.remove("open");$("#ch3P6Puzzle")?.setAttribute("aria-hidden","true");syncAudio();paint()}
function resetPuzzle(){const p=ensure();p.credentialSelections={};renderPuzzle();$("#ch3P6PuzzleStatus").textContent="";save()}
function confirmPuzzle(){
 const p=ensure(),status=$("#ch3P6PuzzleStatus");if(Object.keys(CORRECT).some(key=>!p.credentialSelections[key])){status.textContent=tr("Complete all four header fields first.","เลือกข้อมูลให้ครบทั้งสี่ช่องก่อน");status.className="ch3-p6-puzzle-status error";return}
 const wrong=Object.keys(CORRECT).filter(key=>p.credentialSelections[key]!==CORRECT[key]);if(wrong.length){p.puzzleAttempts+=1;status.textContent=tr("The reconstructed header does not match the fragments recovered in this room.","Header ที่ประกอบยังไม่ตรงกับเศษข้อมูลที่พบในห้องนี้");status.className="ch3-p6-puzzle-status error";save();return}
 p.credentialUnlockComplete=true;p.stage="feedback";gs().checkpoint="ch3_phase6_credential_unlock";status.textContent=tr("Header accepted. Encrypted drive index available.","Header ได้รับการยอมรับ สามารถเข้าถึงดัชนีของไดรฟ์เข้ารหัสได้");status.className="ch3-p6-puzzle-status success";
 try{window.LastWitnessAudioCue?.playPuzzleSuccess?.()}catch(_){}save();setTimeout(()=>{closePuzzle();runFeedbackBeat()},650);
}
function showFeedbackToast(){const box=$("#ch3P6Feedback");if(!box)return;$("#ch3P6FeedbackText").textContent=tr("Retention changed: 00:30:00 → ARCHIVE ONLY","ระยะเก็บข้อมูลเปลี่ยน: 00:30:00 → ARCHIVE ONLY");box.classList.add("show");clearTimeout(feedbackTimer);feedbackTimer=setTimeout(()=>box.classList.remove("show"),2300)}
function runFeedbackBeat(){
 const p=ensure();unlockHotspots(false);showFeedbackToast();
 if(p.feedbackBeatSeen){p.stage="drive";unlockHotspots(true);paint();return}
 setTimeout(()=>talk(D.feedback,()=>{p.feedbackBeatSeen=true;p.stage="drive";gs().checkpoint="ch3_phase6_drive";unlockHotspots(true);paint();save()}),450);
}
function startClosing(){
 const p=ensure();if(p.closingDialogueComplete||p.complete)return;p.stage="closing";gs().checkpoint="ch3_phase6_closing";unlockHotspots(false);paint();talk(D.closing,completePhase6);save();
}
function completePhase6(){
 const p=ensure();p.closingDialogueComplete=true;p.complete=true;p.stage="complete";gs().checkpoint="ch3_phase6_complete";progress();save();showPhase7Fallback();
}
function showPhase7Fallback(){
 stopAudio(true);const s=gs();if(!s)return;s.screen="chapter3Wip";
 const title=$("#chapter3WipTitle"),text=$("#chapter3WipText"),btn=$("#chapter3WipReturnTitle");
 if(title)title.textContent=tr("PHASE VII · HAWKER CENTRE","เฟส VII · Hawker Centre");
 if(text)text.textContent=tr("The serviced-apartment evidence establishes a public meeting protocol at HC-12 for 12:10 PM. The contact may be Adrian Tan Wei Ming, but operator identity remains unproven. Phase VII is currently in development; your progress has been saved.","หลักฐานจาก serviced apartment ยืนยันระเบียบการนัดหมายในพื้นที่สาธารณะ HC-12 เวลา 12:10 น. ผู้ติดต่ออาจเป็น Adrian Tan Wei Ming แต่ตัวผู้ใช้คำสั่งยังไม่ถูกพิสูจน์ ขณะนี้เฟส VII อยู่ระหว่างการพัฒนาและบันทึกความคืบหน้าแล้ว");
 if(btn)btn.textContent=tr("Return to Title","กลับหน้าแรก");safeShow("chapter3Wip");
}

function showReturnCard(){
 inject();const p=ensure();stopAudio(true);p.started=true;p.returnCardSeen=true;p.stage="return-card";gs().screen=RETURN_CARD;gs().checkpoint="ch3_phase6_return_card";safeShow(RETURN_CARD);updateLanguage();clearTimeout(cardTimer);cardTimer=setTimeout(enterNightOffice,2850);save();
}
function enterNightOffice(){
 inject();const p=ensure();clearTimeout(cardTimer);gs().screen=NIGHT_OFFICE;gs().checkpoint="ch3_phase6_night_office";p.stage="night-office";safeShow(NIGHT_OFFICE);updateLanguage();syncAudio();
 if(p.nightOfficeComplete){showTraceCard();return}
 talk(D.office,()=>{p.nightOfficeComplete=true;p.stage="trace-card";save();setTimeout(showTraceCard,280)});
}
function showTraceCard(){
 inject();const p=ensure();stopAudio(false);p.traceCardSeen=true;p.stage="trace-card";gs().screen=TRACE_CARD;gs().checkpoint="ch3_phase6_trace_card";safeShow(TRACE_CARD);updateLanguage();clearTimeout(cardTimer);cardTimer=setTimeout(showLocationCard,4300);save();
}
function showLocationCard(){
 inject();const p=ensure();p.locationCardSeen=true;p.stage="location-card";gs().screen=LOCATION_CARD;gs().checkpoint="ch3_phase6_location_card";safeShow(LOCATION_CARD);updateLanguage();clearTimeout(cardTimer);cardTimer=setTimeout(showDoorScreen,2850);save();
}
function showDoorScreen(){
 inject();const p=ensure();p.doorEntrySeen=true;p.stage="door";gs().screen=DOOR_SCREEN;gs().checkpoint="ch3_phase6_door";safeShow(DOOR_SCREEN);updateLanguage();playDoor();clearTimeout(cardTimer);cardTimer=setTimeout(enterApartment,1700);save();
}
function enterApartment(){
 inject();const p=ensure();clearTimeout(cardTimer);gs().screen=APARTMENT;safeShow(APARTMENT);updateLanguage();syncAudio();
 if(p.complete){showPhase7Fallback();return}
 if(p.driveCollected&&!p.closingDialogueComplete){startClosing();return}
 if(p.credentialUnlockComplete&&!p.feedbackBeatSeen){runFeedbackBeat();return}
 if(!p.introComplete){p.stage="intro";gs().checkpoint="ch3_phase6_intro";unlockHotspots(false);talk(D.apartmentIntro,()=>{p.introComplete=true;p.stage="choice";gs().checkpoint="ch3_phase6_choice";$("#ch3P6Choice")?.classList.remove("hidden");$("#ch3P6Choice")?.classList.add("show");paint();syncAudio();save()});return}
 if(!p.entryChoiceMade){p.stage="choice";$("#ch3P6Choice")?.classList.remove("hidden");$("#ch3P6Choice")?.classList.add("show");unlockHotspots(false);paint();return}
 $("#ch3P6Choice")?.classList.remove("show");$("#ch3P6Choice")?.classList.add("hidden");
 if(p.stage==="credential-unlock"&&allBaseCollected()&&!p.credentialUnlockComplete){unlockHotspots(true);paint();setTimeout(openPuzzle,0);return}
 p.stage=p.credentialUnlockComplete?"drive":"investigation";gs().checkpoint=p.credentialUnlockComplete?"ch3_phase6_drive":"ch3_phase6_investigation";unlockHotspots(true);paint();
}
function startFromMarina(){const p=ensure();if(p.complete){showPhase7Fallback();return}if(p.started&&PHASE6_SCREENS.has(gs()?.screen)){resume(gs().screen);return}showReturnCard()}
function startFreshForDev(){const s=gs();if(!s)return;s.chapter3=s.chapter3||{};s.chapter3.phase6={started:false,returnCardSeen:false,nightOfficeComplete:false,traceCardSeen:false,locationCardSeen:false,doorEntrySeen:false,introComplete:false,entryChoiceMade:false,entryChoiceKey:"",evidenceCollected:[],credentialSelections:{},puzzleAttempts:0,credentialUnlockComplete:false,feedbackBeatSeen:false,driveCollected:false,closingDialogueComplete:false,complete:false,stage:"return-card"};showReturnCard()}
function resume(screen){
 inject();updateLanguage();const p=ensure();
 if(screen===RETURN_CARD){safeShow(RETURN_CARD);clearTimeout(cardTimer);cardTimer=setTimeout(enterNightOffice,1600);return}
 if(screen===NIGHT_OFFICE){enterNightOffice();return}
 if(screen===TRACE_CARD){safeShow(TRACE_CARD);clearTimeout(cardTimer);cardTimer=setTimeout(showLocationCard,2400);return}
 if(screen===LOCATION_CARD){safeShow(LOCATION_CARD);clearTimeout(cardTimer);cardTimer=setTimeout(showDoorScreen,1800);return}
 if(screen===DOOR_SCREEN){safeShow(DOOR_SCREEN);playDoor();clearTimeout(cardTimer);cardTimer=setTimeout(enterApartment,1200);return}
 if(screen===APARTMENT){enterApartment();return}
 if(screen==="chapter3Wip"&&p.complete){showPhase7Fallback()}
}
function appendCase(){
 const list=$("#caseList"),p=ensure();if(!list||!p.evidenceCollected.length)return;
 $("[data-p6-case-section]",list)?.remove();$$('[data-p6-case-entry]',list).forEach(n=>n.remove());
 const h=document.createElement("div");h.className="case-section-title";h.dataset.p6CaseSection="1";h.textContent=tr("CHAPTER III · SERVICED APARTMENT","บทที่ III · Serviced Apartment");list.appendChild(h);
 p.evidenceCollected.forEach(id=>{const e=E[id],row=document.createElement("div");row.className="case-row";row.dataset.p6CaseEntry=id;const key=th()?"th":"en";row.innerHTML=`<b>${e.title[key]}</b><div>${e.description[key]}</div>`;list.appendChild(row)});
}
function bindElements(){
 $$('[data-p6-choice]').forEach(b=>b.onclick=()=>chooseApproach(b.dataset.p6Choice));
 $$('[data-p6-evidence]').forEach(b=>b.onclick=()=>openEvidence(b.dataset.p6Evidence));
 $("#ch3P6Inspect").onclick=inspectEvidence;$("#ch3P6Collect").onclick=collectEvidence;$("#ch3P6EvidenceClose").onclick=closeEvidence;
 $("#ch3P6Evidence").onclick=e=>{if(e.target.id==="ch3P6Evidence")closeEvidence()};
 $("#ch3P6PuzzleButton").onclick=openPuzzle;$("#ch3P6PuzzleConfirm").onclick=confirmPuzzle;$("#ch3P6PuzzleReset").onclick=resetPuzzle;$("#ch3P6PuzzleClose").onclick=closePuzzle;
 $$(".ch3-p6-save").forEach(b=>b.onclick=()=>{try{manualSave()}catch(_){}});$$(".ch3-p6-menu").forEach(b=>b.onclick=()=>$("#drawer")?.classList.add("open"));
}
function installBridge(){
 const api=window.LastWitnessChapter3;if(api&&!api.__lwPhase60110){const old=api.resumeFromState;api.resumeFromState=function(screen){const result=typeof old==="function"?old.apply(this,arguments):undefined;if(internal)return result;if(PHASE6_SCREENS.has(screen)||(screen==="chapter3Wip"&&ensure()?.complete)){setTimeout(()=>resume(screen),0);return result}if(screen==="chapter3MarinaBay"&&gs()?.chapter3?.phase5?.complete&&!ensure().started){setTimeout(startFromMarina,0)}return result};api.__lwPhase60110=true}
 window.LastWitnessPhase6={startFromMarina,startFreshForDev,resumeFromState:resume,stopAudio,version:BUILD};
}
function bind(){
 inject();installBridge();updateLanguage();
 $("#caseButton")?.addEventListener("click",()=>setTimeout(appendCase,0),true);
 $("#soundToggle")?.addEventListener("change",syncAudio,true);$("#musicRange")?.addEventListener("input",syncAudio,true);
 document.addEventListener("click",event=>{if(event.target.closest?.("[data-lang]"))setTimeout(updateLanguage,0)},true);
 document.addEventListener("visibilitychange",()=>{if(document.hidden)stopAudio(false);else syncAudio()});
 const label=$("#settingsVersion");if(label)label.textContent=`LAST WITNESS · BUILD ${BUILD}`;if(window.LastWitnessSaveManager)window.LastWitnessSaveManager.version=BUILD;
 const screen=active();if(PHASE6_SCREENS.has(screen)||(screen==="chapter3Wip"&&ensure()?.complete))setTimeout(()=>resume(screen),0);
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",bind,{once:true});else bind();
})();
