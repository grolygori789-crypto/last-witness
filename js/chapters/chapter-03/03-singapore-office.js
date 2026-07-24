/* LAST WITNESS — Chapter III / Phase IV: Singapore Investigation Office 0.9.0 */
(function(){
"use strict";
if(window.LastWitnessPhase4?.version==="0.9.0")return;

const BUILD="0.9.0";
const TRANSITION_SCREEN="chapter3Phase4Transition";
const OFFICE_SCREEN="chapter3SingaporeOffice";
const VIDEO_PATH="assets/video/chapter-03/phase-04/drive-to-investigation-office.mp4?v=0900";
const TRANSITION_AUDIO="assets/audio/chapter-03/phase-04/drive-to-investigation-office.mp3?v=0900";
const OFFICE_IMAGE="assets/images/chapter-03/phase-04/singapore-investigation-office.png?v=0900";
const OFFICE_AUDIO="assets/audio/chapter-03/phase-04/singapore-investigation-office-ambience.mp3?v=0900";
const CHERYL_BASE="assets/images/chapter-03/phase-04/cheryl/";
const FARID_BASE="assets/images/chapter-03/phase-04/farid/";
const EVIDENCE_IDS=["relay","logs","token"];
const MATRIX_ORDER=["signed_local_event","revised_relay_event","both_signed","window_policy"];
const MATRIX_CORRECT={signed_local_event:"a",revised_relay_event:"b",both_signed:"both",window_policy:"policy"};

const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const clamp=(v,min=0,max=1)=>Math.max(min,Math.min(max,Number(v)||0));
const gameState=()=>{try{return state}catch(_){return window.state||null}};
const isThai=()=>gameState()?.language==="th"||document.documentElement.lang==="th";
const tr=(en,th)=>isThai()?th:en;
const activeScreen=()=>$(".screen.active")?.id||gameState()?.screen||"";
const soundOn=()=>gameState()?.sound!==false;
const musicLevel=()=>clamp(gameState()?.music??.33);
let transitionTimer=0, revealTimer=0, officeFadeFrame=0, dialogueActive=false, activeEvidence=null, evidenceInspected=false, choiceLocked=false, handoffQueued=false, internalRouting=false, matrixAssignments={}, matrixStage="classify";

function ensureChapterState(){
 const s=gameState(); if(!s) return null;
 s.chapter=3; s.chapter3=s.chapter3||{}; s.flags=s.flags||{};
 const p=s.chapter3.phase4=s.chapter3.phase4||{};
 if(typeof p.started!=="boolean")p.started=false;
 if(typeof p.transitionSeen!=="boolean")p.transitionSeen=false;
 if(typeof p.introComplete!=="boolean")p.introComplete=false;
 if(typeof p.choiceMade!=="boolean")p.choiceMade=false;
 if(typeof p.choiceKey!=="string")p.choiceKey="";
 if(!Array.isArray(p.evidenceCollected))p.evidenceCollected=[];
 if(!p.matrixAssignments||typeof p.matrixAssignments!=="object")p.matrixAssignments={};
 if(typeof p.matrixComplete!=="boolean")p.matrixComplete=false;
 if(typeof p.closingDialogueComplete!=="boolean")p.closingDialogueComplete=false;
 if(typeof p.complete!=="boolean")p.complete=false;
 if(!p.stage)p.stage="transition";
 return p;
}
function collectedSet(){return new Set(ensureChapterState()?.evidenceCollected||[])}
function allEvidenceCollected(){const set=collectedSet();return EVIDENCE_IDS.every(id=>set.has(id))}
function save(){try{if(typeof autoSave==="function")autoSave()}catch(_){}}
function safeShow(screen){internalRouting=true;try{show(screen)}finally{internalRouting=false}}
function stopElement(a,reset=false){if(!a)return;try{a.pause();if(reset)a.currentTime=0}catch(_){}}
function stopAudio(reset=false){clearTimeout(transitionTimer);clearTimeout(revealTimer);cancelAnimationFrame(officeFadeFrame);stopElement($("#ch3Phase4TransitionAudio"),reset);stopElement($("#ch3Phase4OfficeAmbience"),reset)}
function phase4OverlayOpen(){return Boolean($("#ch3OfficeEvidencePanel")?.classList.contains("open")||$("#ch3OfficeMatrix")?.classList.contains("open")||$("#ch3OfficeChoice")?.classList.contains("show"))}
function fadeOffice(target,duration=320){
 const audio=$("#ch3Phase4OfficeAmbience"); if(!audio) return;
 cancelAnimationFrame(officeFadeFrame);
 const start=clamp(audio.volume), end=clamp(target,0,.23), began=performance.now();
 if(end>0 && audio.paused){audio.play().catch(()=>{})}
 const step=now=>{const pct=Math.max(0,Math.min(1,(now-began)/duration));audio.volume=start+(end-start)*pct; if(pct<1) officeFadeFrame=requestAnimationFrame(step); else if(end===0) stopElement(audio,false)};
 officeFadeFrame=requestAnimationFrame(step);
}
function syncAudio(){
 const t=$("#ch3Phase4TransitionAudio"), o=$("#ch3Phase4OfficeAmbience");
 if(t) t.volume=soundOn()?clamp(musicLevel()*.58,0,.46):0;
 const active=activeScreen()===OFFICE_SCREEN && soundOn() && musicLevel()>0;
 if(!active){fadeOffice(0,180);return}
 const duck=(dialogueActive||phase4OverlayOpen())?.58:1;
 fadeOffice(clamp(musicLevel()*.34*duck,0,.21),280);
 if(o) o.loop=true;
}

function installPortraits(){
 try{
  const cheryl={neutral:CHERYL_BASE+"neutral.png?v=0900",serious:CHERYL_BASE+"neutral.png?v=0900",skeptical:CHERYL_BASE+"skeptical.png?v=0900",side:CHERYL_BASE+"side.png?v=0900",arms_crossed:CHERYL_BASE+"arms_crossed.png?v=0900",surprised:CHERYL_BASE+"surprised.png?v=0900",thinking:CHERYL_BASE+"thinking.png?v=0900",faint_smile:CHERYL_BASE+"faint_smile.png?v=0900",explaining:CHERYL_BASE+"explaining.png?v=0900",alert:CHERYL_BASE+"alert.png?v=0900",concerned:CHERYL_BASE+"concerned.png?v=0900",reading:CHERYL_BASE+"reading.png?v=0900",closed_off:CHERYL_BASE+"closed_off.png?v=0900"};
  const farid={neutral:FARID_BASE+"neutral.png?v=0900",side:FARID_BASE+"side.png?v=0900",tablet:FARID_BASE+"tablet.png?v=0900",smirk:FARID_BASE+"smirk.png?v=0900",look_up:FARID_BASE+"look_up.png?v=0900",surprised:FARID_BASE+"surprised.png?v=0900",explaining:FARID_BASE+"explaining.png?v=0900",amused:FARID_BASE+"amused.png?v=0900",thinking:FARID_BASE+"thinking.png?v=0900",concerned:FARID_BASE+"concerned.png?v=0900",warm_smile:FARID_BASE+"warm_smile.png?v=0900",focused:FARID_BASE+"focused.png?v=0900",alert:FARID_BASE+"alert.png?v=0900",downcast:FARID_BASE+"downcast.png?v=0900",arms_crossed:FARID_BASE+"arms_crossed.png?v=0900",tablet_read:FARID_BASE+"tablet_read.png?v=0900",coffee:FARID_BASE+"coffee.png?v=0900"};
  PORTRAITS["Inspector Cheryl Goh"]=cheryl; PORTRAITS["สารวัตร Cheryl Goh"]=cheryl;
  PORTRAITS["Farid Rahman"]=farid; PORTRAITS["Farid Rahman (SPF)"]=farid; PORTRAITS["ฟาริด ราห์มาน"]=farid;
 }catch(_){}
}
function installLanguage(){
 try{
  if(typeof LANG!=="object")return;
  Object.assign(LANG.en,{
   ch3p4_intro_1:"Inspector Cheryl Goh.",
   ch3p4_intro_2:"You proved Daniel Voss never entered Singapore. His records did.",
   ch3p4_intro_3:"Records are why we're here.",
   ch3p4_intro_4:"Good. Then keep your conclusions on a short leash.",
   ch3p4_intro_5:"You'll have read-only review inside this office. Nothing leaves the room without context.",
   ch3p4_choice_title:"How do you respond?",
   ch3p4_choice_evidence:"We only need the records separated before anyone forces them into one story.",
   ch3p4_choice_urgency:"The same pattern reshaped forensic timing in Bangkok. Delay helps whoever built it.",
   ch3p4_choice_cooperate:"Your boundaries are fine. We came for verification, not theatre.",
   ch3p4_choice_evidence_r:"Better. Start with evidence and we can keep the politics outside.",
   ch3p4_choice_urgency_r:"Then let's move before your eleven borrowed minutes turn into a day.",
   ch3p4_choice_cooperate_r:"That already puts you ahead of most visitors with a badge.",
   ch3p4_intro_6:"Farid.",
   ch3p4_intro_7:"Morning. Or afternoon. Time gets weird when the logs start arguing.",
   ch3p4_intro_8:"Show them the relay and the duplicate validation headers.",
   ch3p4_intro_9:"Two accepted records, same chain, different timestamps. Either elegant engineering or a migraine with paperwork.",
   ch3p4_intro_10:"Usually both.",
   ch3p4_intro_11:"Knew I liked you.",
   ch3p4_intro_12:"Start with the relay snapshot. Then the dual logs. Then the token policy.",
   ch3p4_relay_1:"The relay snapshot shows a Singapore node accepting a booking-verification request at 06:09.",
   ch3p4_relay_2:"Accepted access. Still not identity.",
   ch3p4_logs_1:"Here are the two headers. One preserves the signed local event at 05:58. The other reflects the revised administrative event at 06:09.",
   ch3p4_logs_2:"Two valid memories in the same machine.",
   ch3p4_token_1:"This offline signature token is the hinge. Delayed sync stays valid if it lands inside the reconciliation window.",
   ch3p4_token_2:"Which means policy can preserve contradiction without calling it one.",
   ch3p4_close_1:"So both records survive because validation checks signature and sync policy, not whether the timeline tells the cleaner truth.",
   ch3p4_close_2:"Authentication proves access. Validation proves the system accepted the record. Neither tells us who shaped the sequence.",
   ch3p4_close_3:"Someone borrowed eleven minutes and taught the system to remember both versions.",
   ch3p4_close_4:"The relay trail resurfaced near Marina Bay twenty minutes ago.",
   ch3p4_close_5:"Then we stop interviewing records and go where the signal went.",
   ch3p4_close_6:"Try not to buy anyone chicken rice before we get there.",
   ch3p4_close_7:"Or Prada.",
   ch3p4_open_access:"SPF LIAISON REVIEW · READ-ONLY SESSION",
   ch3p4_complete_text:"The Singapore office confirms how two valid logs can survive at once. The live relay trail now points toward Marina Bay.",
   ch3p4_continue_phase5:"Continue to Phase V",
   ch3p4_return_title:"Return to Title"
  });
  Object.assign(LANG.th,{
   ch3p4_intro_1:"สารวัตร Cheryl Goh",
   ch3p4_intro_2:"คุณพิสูจน์ได้แล้วว่าแดเนียล วอสส์ไม่ได้เข้าสิงคโปร์ มีแต่บันทึกของเขาที่เข้ามา",
   ch3p4_intro_3:"เรามาที่นี่เพราะบันทึกเหล่านั้นค่ะ",
   ch3p4_intro_4:"ดี งั้นก็อย่ารีบสรุปเกินหลักฐาน",
   ch3p4_intro_5:"คุณจะได้สิทธิ์ตรวจแบบอ่านอย่างเดียวภายในสำนักงานนี้ ยังไม่มีอะไรออกจากห้องนี้ถ้าขาดบริบท",
   ch3p4_choice_title:"คุณจะตอบอย่างไร?",
   ch3p4_choice_evidence:"เราต้องการแยกบันทึกแต่ละชุดออกจากกันก่อนที่จะมีใครบังคับให้มันกลายเป็นเรื่องเดียว",
   ch3p4_choice_urgency:"รูปแบบเดียวกันนี้บิดเวลาในงานนิติวิทยาศาสตร์ที่กรุงเทพฯ ยิ่งช้า คนที่สร้างมันยิ่งได้ประโยชน์",
   ch3p4_choice_cooperate:"ขอบเขตของคุณไม่ใช่ปัญหา เรามาเพื่อยืนยันข้อเท็จจริง ไม่ได้มาสร้างละคร",
   ch3p4_choice_evidence_r:"ดี เริ่มจากหลักฐานก่อน แล้วเราจะปล่อยการเมืองไว้นอกห้องนี้",
   ch3p4_choice_urgency_r:"งั้นก็รีบเถอะ ก่อนสิบเอ็ดนาทีที่ถูกยืมจะกลายเป็นทั้งวัน",
   ch3p4_choice_cooperate_r:"แค่นั้นก็ทำให้คุณเหนือกว่าคนถือป้ายส่วนใหญ่ที่เข้ามาที่นี่แล้ว",
   ch3p4_intro_6:"Farid",
   ch3p4_intro_7:"สวัสดีครับ หรือจะบอกว่าบ่ายแล้วก็ได้ เวลามันชอบเพี้ยนเวลาพวก log เริ่มเถียงกันเอง",
   ch3p4_intro_8:"เอาภาพ relay กับหัวบันทึกที่ validate ซ้ำให้พวกเขาดู",
   ch3p4_intro_9:"สองบันทึกที่ระบบยอมรับใน chain เดียวกัน แต่คนละเวลา จะเรียกว่าวิศวกรรมที่สวยงามหรือไมเกรนพร้อมเอกสารก็ได้ครับ",
   ch3p4_intro_10:"ส่วนใหญ่เป็นทั้งสองอย่าง",
   ch3p4_intro_11:"รู้อยู่แล้วว่าผมต้องชอบคุณ",
   ch3p4_intro_12:"เริ่มจาก relay snapshot แล้วค่อยดู dual logs ก่อนจะไปที่ policy ของ token",
   ch3p4_relay_1:"relay snapshot แสดงให้เห็นว่า node ในสิงคโปร์ยอมรับคำขอตรวจรายการจองเวลา 06:09",
   ch3p4_relay_2:"ยอมรับการเข้าถึง แต่ยังไม่ใช่ตัวตนผู้ใช้",
   ch3p4_logs_1:"นี่คือหัวบันทึกสองชุด ชุดหนึ่งเก็บ signed local event เวลา 05:58 ไว้ อีกชุดสะท้อน administrative event ที่ถูกแก้เป็น 06:09",
   ch3p4_logs_2:"ความทรงจำสองแบบที่ยังใช้ได้ในเครื่องเดียวกัน",
   ch3p4_token_1:"offline signature token คือตัวบานพับ ถ้าส่งข้อมูลช้าแต่ยังอยู่ใน reconciliation window ระบบก็ยังถือว่า valid",
   ch3p4_token_2:"แปลว่านโยบายของระบบรักษาความขัดกันไว้ได้ โดยไม่ยอมเรียกมันว่าความขัดกัน",
   ch3p4_close_1:"งั้นทั้งสองบันทึกจึงอยู่รอดได้ เพราะการ validate ตรวจลายเซ็นกับนโยบายการ sync ไม่ได้ตรวจว่า timeline แบบไหนเล่าเรื่องได้สะอาดกว่า",
   ch3p4_close_2:"Authentication พิสูจน์การเข้าถึง Validation พิสูจน์ว่าระบบยอมรับบันทึก ทั้งคู่ไม่ได้บอกว่าใครจัดลำดับเหตุการณ์",
   ch3p4_close_3:"มีคนยืมเวลาสิบเอ็ดนาที แล้วสอนให้ระบบจำได้ทั้งสองเวอร์ชัน",
   ch3p4_close_4:"เส้นทาง relay โผล่ขึ้นอีกครั้งใกล้ Marina Bay เมื่อยี่สิบนาทีก่อน",
   ch3p4_close_5:"งั้นเราเลิกสอบปากคำบันทึก แล้วไปหาสัญญาณจริงกัน",
   ch3p4_close_6:"พยายามอย่าเพิ่งซื้อข้าวมันไก่ให้ใครระหว่างทางล่ะ",
   ch3p4_close_7:"หรือ Prada",
   ch3p4_open_access:"ตรวจร่วมกับตำรวจสิงคโปร์ · สิทธิ์อ่านอย่างเดียว",
   ch3p4_complete_text:"สำนักงานสิงคโปร์ยืนยันแล้วว่าทำไมสองบันทึกที่ valid ถึงอยู่พร้อมกันได้ เส้นทาง relay ที่ยังมีชีวิตตอนนี้ชี้ไปยัง Marina Bay",
   ch3p4_continue_phase5:"ไปต่อ Phase V",
   ch3p4_return_title:"กลับหน้าแรก"
  });
 }catch(_){}
}

function copy(){return {
 day:tr("DAY 3","วันที่ 3"),
 time:tr("EARLY AFTERNOON","ช่วงบ่ายต้น"),
 place:tr("SINGAPORE · INVESTIGATION OFFICE","สิงคโปร์ · สำนักงานสืบสวน"),
 phase:tr("LOCAL ACCESS, LIMITED TRUST","สิทธิ์เฉพาะพื้นที่ ความไว้ใจอย่างจำกัด"),
 skip:tr("Skip transition","ข้ามฉากเดินทาง"),
 location:tr("Singapore Investigation Office","สำนักงานสืบสวนสิงคโปร์"),
 scene:tr("LOCAL ACCESS, LIMITED TRUST","สิทธิ์เฉพาะพื้นที่ ความไว้ใจอย่างจำกัด"),
 openingObjective:tr("Meet the local liaison and secure office access","พบผู้ประสานงานท้องถิ่นและรับสิทธิ์เข้าตรวจในสำนักงาน"),
 investigateObjective:tr("Inspect relay evidence and explain how both logs remain valid","ตรวจหลักฐาน relay และอธิบายว่าทำไมทั้งสอง log ยัง valid พร้อมกันได้"),
 labels:{relay:tr("Relay Snapshot","ภาพรวม Relay"),logs:tr("Dual Logs","บันทึกสองชุด"),token:tr("Offline Token","Offline Token")},
 evidenceKicker:tr("Office Evidence Review","ตรวจหลักฐานในสำนักงาน"),
 caseEvidence:tr("Case Evidence","หลักฐานในคดี"),
 tap:tr("Tap evidence to inspect","แตะหลักฐานเพื่อตรวจสอบ"),
 inspect:tr("Inspect","ตรวจสอบ"),
 collect:tr("Add to Case File","เพิ่มในแฟ้มคดี"),
 close:tr("Close","ปิด"),
 choiceTitle:tr("How do you respond?","คุณจะตอบอย่างไร?"),
 review:tr("Run Validation Matrix","เปิด Validation Matrix"),
 matrixTitle:tr("Validation Matrix","Validation Matrix"),
 matrixHelp:tr("Assign each fact to the record or rule it belongs to.","จัดข้อเท็จจริงแต่ละข้อให้ตรงกับบันทึกหรือกฎของระบบที่เป็นเจ้าของมัน"),
 matrixA:tr("Record A","บันทึก A"), matrixB:tr("Record B","บันทึก B"), matrixBoth:tr("Both","ทั้งคู่"), matrixPolicy:tr("Policy","นโยบาย"),
 confirm:tr("Confirm Matrix","ยืนยัน Matrix"), reset:tr("Reset","เริ่มใหม่"),
 incomplete:tr("Assign all four facts before confirming.","จัดหมวดข้อเท็จจริงให้ครบทั้งสี่รายการก่อน"),
 wrong:tr("At least one fact belongs elsewhere.","มีอย่างน้อยหนึ่งข้ออยู่ผิดหมวด"),
 matrixCorrect:tr("Now choose the explanation supported by the records.","ตอนนี้เลือกคำอธิบายที่บันทึกรองรับจริง"),
 conclusionTitle:tr("Why can both logs validate?","ทำไมทั้งสอง log จึง validate ได้พร้อมกัน?"),
 beyond:tr("That explanation goes beyond the records.","คำอธิบายนั้นไกลเกินกว่าที่บันทึกยืนยันได้"),
 completeEye:tr("PHASE IV COMPLETE","จบเฟส IV"), completeTitle:tr("LOCAL ACCESS, LIMITED TRUST","สิทธิ์เฉพาะพื้นที่ ความไว้ใจอย่างจำกัด"), completeText:tr(LANG.en.ch3p4_complete_text,LANG.th.ch3p4_complete_text),
 continuePhase5:tr(LANG.en.ch3p4_continue_phase5,LANG.th.ch3p4_continue_phase5), returnTitle:tr(LANG.en.ch3p4_return_title,LANG.th.ch3p4_return_title)
}}

const EVIDENCE={
 relay:{title:{en:"Relay Snapshot",th:"ภาพรวม Relay"},description:{en:"A Singapore relay node accepted a booking-verification request at 06:09. The request carried valid Evidence Division permission and referenced Daniel Voss.",th:"relay node ในสิงคโปร์ยอมรับคำขอตรวจรายการจองเวลา 06:09 คำขอนั้นพกสิทธิ์ฝ่ายพยานหลักฐานที่ระบบยอมรับและอ้างถึงแดเนียล วอสส์"},observation:{en:"The request was accepted locally. That still does not identify the operator.",th:"ระบบในพื้นที่ยอมรับคำขอแล้ว แต่นั่นยังไม่ยืนยันตัวผู้ใช้งาน"}},
 logs:{title:{en:"Dual Validation Headers",th:"หัวบันทึกที่ validate สองชุด"},description:{en:"Record A preserves the signed local event at 05:58. Record B preserves the revised administrative event at 06:09. Both headers validate against the same chain.",th:"บันทึก A เก็บ signed local event เวลา 05:58 ไว้ ส่วนบันทึก B เก็บ administrative event ที่แก้เป็น 06:09 ทั้งสองหัวบันทึก validate ผ่าน chain เดียวกัน"},observation:{en:"Two records can survive together when the system is built to preserve accepted states, not narrative clarity.",th:"บันทึกสองชุดอยู่รอดพร้อมกันได้เมื่อระบบถูกสร้างมาเพื่อรักษาสถานะที่ยอมรับแล้ว ไม่ใช่เพื่อเล่าเรื่องให้ชัด"}},
 token:{title:{en:"Offline Signature Token Policy",th:"นโยบาย Offline Signature Token"},description:{en:"Delayed sync remains valid when a signed local event reaches central infrastructure inside the reconciliation window. The window explains why both records were preserved.",th:"การ sync ที่ล่าช้ายังถือว่า valid หาก signed local event ไปถึงโครงสร้างกลางภายใน reconciliation window กฎนี้อธิบายว่าทำไมทั้งสองบันทึกจึงถูกเก็บไว้"},observation:{en:"Policy can preserve contradiction without resolving attribution.",th:"นโยบายของระบบรักษาความขัดกันไว้ได้ โดยยังไม่แตะคำถามเรื่องตัวผู้ใช้จริง"}}
};
const MATRIX_FACTS={
 signed_local_event:{en:"The signed local event remains at 05:58.",th:"signed local event ยังคงอยู่ที่เวลา 05:58"},
 revised_relay_event:{en:"The revised administrative event is accepted at 06:09.",th:"administrative event ที่แก้ไขแล้วถูกยอมรับที่เวลา 06:09"},
 both_signed:{en:"Both headers carry valid signatures.",th:"หัวบันทึกทั้งสองชุดมีลายเซ็นที่ valid"},
 window_policy:{en:"Delayed sync remains valid inside the reconciliation window.",th:"การ sync ที่ล่าช้ายัง valid ถ้าอยู่ใน reconciliation window"}
};
const CONCLUSIONS=[
 {id:"manual_override",en:"A Singapore officer manually overrode the timeline, making both logs official.",th:"เจ้าหน้าที่สิงคโปร์ override timeline ด้วยตนเอง จึงทำให้ทั้งสอง log กลายเป็นทางการ"},
 {id:"inside_window",en:"Both logs validate because signed delayed-sync events can be accepted inside policy, preserving both records.",th:"ทั้งสอง log validate ได้ เพราะ signed delayed-sync event สามารถถูกยอมรับภายใน policy และเก็บทั้งสองบันทึกไว้"},
 {id:"daniel_present",en:"Daniel authenticated both records in person during travel.",th:"แดเนียลเป็นผู้ยืนยันตัวตนของทั้งสองบันทึกด้วยตนเองระหว่างการเดินทาง"},
 {id:"cctv_corrupt",en:"The CCTV index was corrupted, so the system accepted two replacement logs.",th:"ดัชนีกล้องวงจรปิดเสียหาย ระบบจึงยอมรับ log ทดแทนสองชุด"}
];

function inject(){
 if($("#"+TRANSITION_SCREEN)) return;
 const game=$("#game"); if(!game) return;
 game.insertAdjacentHTML("beforeend",`
 <section id="${TRANSITION_SCREEN}" class="screen ch3-p4-transition" aria-label="Drive to Singapore Investigation Office">
   <video id="ch3Phase4TransitionVideo" class="scene ch3-p4-video" playsinline preload="auto" muted src="${VIDEO_PATH}"></video>
   <div class="overlay ch3-p4-video-overlay"></div>
   <div class="ch3-arrival-card ch3-p4-card"><div id="ch3P4Day" class="eyebrow"></div><div id="ch3P4Time" class="ch3-day-time"></div><h2 id="ch3P4Place"></h2><div class="ch3-rule"></div><p id="ch3P4Phase"></p></div>
   <button id="ch3P4Skip" class="ghost ch3-arrival-skip" type="button"></button>
   <audio id="ch3Phase4TransitionAudio" preload="auto" src="${TRANSITION_AUDIO}"></audio>
 </section>
 <section id="${OFFICE_SCREEN}" class="screen ch3-office ch3-investigation-locked" aria-label="Singapore Investigation Office">
   <img class="scene" src="${OFFICE_IMAGE}" alt="Singapore Investigation Office"><div class="overlay ch3-office-overlay"></div>
   <div class="topbar"><span id="ch3OfficeLocation"></span><div class="hud"><button class="icon ch3-office-save" type="button">💾</button><button class="icon ch3-office-menu" type="button">☰<i class="journal-alert" aria-hidden="true"></i></button></div></div>
   <div id="ch3OfficeSceneLabel" class="ch3-scene-label"></div><div id="ch3OfficeObjective" class="apartment-objective"></div>
   <button class="ch3-office-hotspot hs-relay" data-office-clue="relay" type="button"><i></i><span class="ch3-hotspot-label"></span></button>
   <button class="ch3-office-hotspot hs-logs" data-office-clue="logs" type="button"><i></i><span class="ch3-hotspot-label"></span></button>
   <button class="ch3-office-hotspot hs-token" data-office-clue="token" type="button"><i></i><span class="ch3-hotspot-label"></span></button>
   <div id="chapter3OfficeDialogue" class="dialogue hidden"></div>
   <div id="ch3OfficeChoice" class="choice-panel hidden ch3-office-choice"><div id="ch3OfficeChoiceTitle" class="choice-title"></div><button class="choice-option" data-office-choice="evidence" type="button"></button><button class="choice-option" data-office-choice="urgency" type="button"></button><button class="choice-option" data-office-choice="cooperate" type="button"></button></div>
   <button id="ch3OfficeReview" class="primary ch3-office-review" type="button"></button>
   <div id="ch3OfficeAccess" class="ch3-authorization" aria-live="polite"><strong>SPF LIAISON AUTHORISED</strong><span id="ch3OfficeAccessText"></span></div>
   <div id="ch3OfficeComplete" class="phase-card" style="display:none"><div id="ch3OfficeCompleteEye" class="eyebrow"></div><h2 id="ch3OfficeCompleteTitle"></h2><p id="ch3OfficeCompleteText"></p><button id="ch3OfficeContinuePhase5" class="primary" type="button"></button><button id="ch3OfficeReturnTitle" class="ghost" type="button"></button></div>
   <div class="progress ch3-office-progress"><span id="ch3OfficeProgressText" class="progressText">0%</span><div class="progress-bar"><div id="ch3OfficeProgressFill" class="progress-fill"></div></div></div>
   <audio id="ch3Phase4OfficeAmbience" preload="auto" src="${OFFICE_AUDIO}"></audio>
 </section>
 <div id="ch3OfficeEvidencePanel" class="evidence-panel" aria-hidden="true"><div class="evidence-card"><div id="ch3OfficeEvidenceKicker" class="eyebrow"></div><h3 id="ch3OfficeEvidenceTitle"></h3><div class="evidence-stage"><div id="ch3OfficeEvidenceStamp" class="evidence-stamp"></div><div id="ch3OfficeEvidenceObject" class="evidence-object"></div><div id="ch3OfficeEvidenceHint" class="evidence-zoom-hint"></div></div><div id="ch3OfficeEvidenceMeta" class="evidence-meta"><p id="ch3OfficeEvidenceDescription"></p><div id="ch3OfficeEvidenceObservation" class="evidence-observation"></div></div><div class="evidence-actions"><button id="inspectCh3OfficeEvidence" class="ghost" type="button"></button><button id="collectCh3OfficeEvidence" class="primary" type="button"></button><button id="closeCh3OfficeEvidence" class="ghost" type="button"></button></div></div></div>
 <div id="ch3OfficeMatrix" class="modal ch3-reconcile-modal" aria-hidden="true"><div class="modal-card ch3-reconcile-card"><div class="eyebrow">LAST WITNESS</div><h3 id="ch3OfficeMatrixTitle"></h3><p id="ch3OfficeMatrixHelp" class="ch3-reconcile-help"></p><div id="ch3OfficeFactList" class="ch3-fact-list"></div><div id="ch3OfficeConclusionList" class="ch3-conclusion-list" hidden></div><div id="ch3OfficeMatrixStatus" class="ch3-reconcile-status" aria-live="polite"></div><div class="ch3-reconcile-actions"><button id="ch3OfficeMatrixConfirm" class="primary" type="button"></button><button id="ch3OfficeMatrixReset" class="ghost" type="button"></button><button id="ch3OfficeMatrixClose" class="ghost" type="button"></button></div></div></div>`);
 installPortraits(); installLanguage(); bind(); updateLanguage(); paintHotspots(); setHotspotsLocked(true,false);
}

function runSceneDialogue(lines,done){
 const box=$("#chapter3OfficeDialogue"); if(!box||typeof runDialogue!=="function"){done?.(); return}
 dialogueActive=true; syncAudio();
 runDialogue(box,lines,()=>{dialogueActive=false; syncAudio(); done?.()});
}
function introLines(){return [
 {speaker:"Inspector Cheryl Goh",emotion:"neutral",key:"ch3p4_intro_1"},
 {speaker:"Inspector Cheryl Goh",emotion:"skeptical",key:"ch3p4_intro_2"},
 {speaker:"Benedict",emotion:"serious",key:"ch3p4_intro_3"},
 {speaker:"Inspector Cheryl Goh",emotion:"arms_crossed",key:"ch3p4_intro_4"},
 {speaker:"Inspector Cheryl Goh",emotion:"explaining",key:"ch3p4_intro_5"}
]}
function introPostChoice(choice){return {
 evidence:[{speaker:"Inspector Cheryl Goh",emotion:"faint_smile",key:"ch3p4_choice_evidence_r"}],
 urgency:[{speaker:"Inspector Cheryl Goh",emotion:"alert",key:"ch3p4_choice_urgency_r"}],
 cooperate:[{speaker:"Inspector Cheryl Goh",emotion:"faint_smile",key:"ch3p4_choice_cooperate_r"}]
}[choice]||[]}
function faridLines(){return [
 {speaker:"Inspector Cheryl Goh",emotion:"neutral",key:"ch3p4_intro_6"},
 {speaker:"Farid Rahman",emotion:"smirk",key:"ch3p4_intro_7"},
 {speaker:"Inspector Cheryl Goh",emotion:"explaining",key:"ch3p4_intro_8"},
 {speaker:"Farid Rahman",emotion:"explaining",key:"ch3p4_intro_9"},
 {speaker:"North",emotion:"dry",key:"ch3p4_intro_10"},
 {speaker:"Farid Rahman",emotion:"warm_smile",key:"ch3p4_intro_11"},
 {speaker:"Inspector Cheryl Goh",emotion:"reading",key:"ch3p4_intro_12"}
]}
function evidenceLines(id){return {
 relay:[{speaker:"Farid Rahman",emotion:"tablet",key:"ch3p4_relay_1"},{speaker:"North",emotion:"serious",key:"ch3p4_relay_2"}],
 logs:[{speaker:"Farid Rahman",emotion:"explaining",key:"ch3p4_logs_1"},{speaker:"Benedict",emotion:"thinking",key:"ch3p4_logs_2"}],
 token:[{speaker:"Farid Rahman",emotion:"focused",key:"ch3p4_token_1"},{speaker:"North",emotion:"analyzing",key:"ch3p4_token_2"}]
 }[id]||[]}
function closingLines(){return [
 {speaker:"Farid Rahman",emotion:"explaining",key:"ch3p4_close_1"},
 {speaker:"North",emotion:"analyzing",key:"ch3p4_close_2"},
 {speaker:"Benedict",emotion:"serious",key:"ch3p4_close_3"},
 {speaker:"Inspector Cheryl Goh",emotion:"alert",key:"ch3p4_close_4"},
 {speaker:"Benedict",emotion:"smirk",key:"ch3p4_close_5"},
 {speaker:"North",emotion:"dry",key:"ch3p4_close_6"},
 {speaker:"Farid Rahman",emotion:"amused",key:"ch3p4_close_7"}
]}

function updateProgress(){
 const p=ensureChapterState(); if(!p) return;
 const evidenceCount=collectedSet().size;
 let pct=p.introComplete?22:8; if(p.choiceMade)pct=32; pct+=evidenceCount*16; if(p.matrixComplete)pct=88; if(p.complete)pct=100;
 $("#ch3OfficeProgressText")?.replaceChildren(document.createTextNode(pct+"%")); const fill=$("#ch3OfficeProgressFill"); if(fill) fill.style.width=pct+"%";
}
function setHotspotsLocked(locked,animate=true){
 const root=$("#"+OFFICE_SCREEN); if(!root)return;
 root.classList.toggle("ch3-investigation-locked",locked); root.classList.remove("ch3-investigation-revealing");
 $$('[data-office-clue]',root).forEach((n,i)=>{n.style.setProperty("--ch3-hotspot-order", String(i)); n.disabled=locked; n.setAttribute("aria-disabled", locked?"true":"false"); n.tabIndex=locked?-1:0});
 if(!locked&&animate&&root.classList.contains("active")){void root.offsetWidth; root.classList.add("ch3-investigation-revealing"); setTimeout(()=>root.classList.remove("ch3-investigation-revealing"),900)}
}
function paintHotspots(){const done=collectedSet(); $$('[data-office-clue]').forEach(node=>node.classList.toggle('found',done.has(node.dataset.officeClue)))}
function updateReview(){
 const btn=$("#ch3OfficeReview"); if(!btn)return;
 const p=ensureChapterState(), ready=allEvidenceCollected()&&!p.matrixComplete&&!dialogueActive&&!$("#ch3OfficeEvidencePanel")?.classList.contains("open")&&!$("#ch3OfficeMatrix")?.classList.contains("open")&&!$("#ch3OfficeChoice")?.classList.contains("show");
 btn.classList.toggle("show",ready); btn.disabled=!ready;
}
function syncScene(){paintHotspots(); updateProgress(); updateReview()}

function openChoice(){
 const panel=$("#ch3OfficeChoice"); if(!panel) return;
 choiceLocked=false; panel.classList.remove("hidden"); panel.classList.add("show"); syncAudio();
}
function closeChoice(){ const panel=$("#ch3OfficeChoice"); if(!panel) return; panel.classList.remove("show"); panel.classList.add("hidden"); syncAudio(); }
function showAccess(done){
 const card=$("#ch3OfficeAccess"); if(!card){done?.(); return}
 $("#ch3OfficeAccessText").textContent=tr(LANG.en.ch3p4_open_access,LANG.th.ch3p4_open_access);
 try{window.LastWitnessAudioCue?.playSoftScanner?.()}catch(_){}
 card.classList.add("show"); revealTimer=setTimeout(()=>{card.classList.remove("show"); done?.()},1500);
}
function completeIntro(){
 const p=ensureChapterState(); p.introComplete=true; p.stage="investigation"; gameState().checkpoint="ch3_phase4_investigation"; setHotspotsLocked(false,true); syncScene(); save();
}
function finishChoice(choice){
 if(choiceLocked) return; choiceLocked=true; closeChoice(); const p=ensureChapterState(); p.choiceMade=true; p.choiceKey=choice; p.stage="liaison"; gameState().checkpoint="ch3_phase4_choice";
 runSceneDialogue([{speaker:"Benedict",emotion:"serious",key:"ch3p4_choice_"+choice},{speaker:"Inspector Cheryl Goh",emotion:"faint_smile",key:"ch3p4_choice_"+choice+"_r"}, ...faridLines()], ()=>showAccess(completeIntro)); save();
}
function startIntro(){
 const p=ensureChapterState(); if(dialogueActive||p.introComplete) return;
 p.stage="intro"; gameState().checkpoint="ch3_phase4_intro"; setHotspotsLocked(true,false); $("#ch3OfficeObjective").textContent=copy().openingObjective;
 runSceneDialogue(introLines(), openChoice); save();
}

function beginTransition(force=false){
 inject(); const p=ensureChapterState(); if(!p) return;
 if(p.started&&!force){ if(p.transitionSeen){ enterOffice(); return; } }
 p.started=true; p.stage="transition"; p.transitionSeen=false; gameState().screen=TRANSITION_SCREEN; gameState().checkpoint="ch3_phase4_transition";
 window.LastWitnessChangi?.stopAudio?.(true); stopAudio(true); safeShow(TRANSITION_SCREEN); updateLanguage();
 const v=$("#ch3Phase4TransitionVideo"), a=$("#ch3Phase4TransitionAudio");
 if(v){ try{v.currentTime=0; v.play().catch(()=>{})}catch(_){} }
 if(a&&soundOn()){ try{a.currentTime=0; a.volume=clamp(musicLevel()*.58,0,.46); a.play().catch(()=>{})}catch(_){} }
 clearTimeout(transitionTimer); transitionTimer=setTimeout(enterOffice,10200); save();
}
function enterOffice(){
 clearTimeout(transitionTimer); inject(); const p=ensureChapterState(); if(!p) return;
 p.started=true; p.transitionSeen=true; gameState().screen=OFFICE_SCREEN; gameState().checkpoint=p.introComplete?"ch3_phase4_investigation":"ch3_phase4_intro";
 const v=$("#ch3Phase4TransitionVideo"); if(v){try{v.pause();v.currentTime=0}catch(_){}}
 stopElement($("#ch3Phase4TransitionAudio"),true); safeShow(OFFICE_SCREEN); closeEvidence(); closeMatrix(false); $("#ch3OfficeComplete")?.style.setProperty("display","none"); updateLanguage();
 const o=$("#ch3Phase4OfficeAmbience"); if(o){o.loop=true; if(soundOn()) o.play().catch(()=>{})} syncAudio();
 if(p.complete){showComplete(); return}
 if(p.matrixComplete&&!p.closingDialogueComplete){runClosingDialogue(); return}
 if(p.introComplete||p.evidenceCollected.length){p.introComplete=true; setHotspotsLocked(false,false); syncScene(); return}
 setHotspotsLocked(true,false); setTimeout(startIntro,320);
}

function evidenceVisual(id){
 if(id==="relay")return `<article class="ch3-evidence-visual"><header class="ch3-record-head"><span>SINGAPORE RELAY NODE</span><span>06:09</span></header><dl class="ch3-record-grid"><dt>REQUEST</dt><dd>BOOKING_VERIFY</dd><dt>SUBJECT</dt><dd>DANIEL VOSS</dd><dt>PERMISSION</dt><dd>EVIDENCE DIVISION</dd><dt>STATUS</dt><dd>ACCEPTED</dd><dt>PROFILE</dt><dd>18-07</dd></dl><div class="ch3-record-ok">LOCAL ACCEPTANCE CONFIRMED</div></article>`;
 if(id==="logs")return `<article class="ch3-evidence-visual ch3-dual-headers"><header class="ch3-record-head"><span>DUAL VALIDATION</span><span>HEADER A / B</span></header><table class="ch3-dual-table"><tr><th></th><th>RECORD A</th><th>RECORD B</th></tr><tr><td>TIMESTAMP</td><td>05:58</td><td>06:09</td></tr><tr><td>SIGNATURE</td><td>VALID</td><td>VALID</td></tr><tr><td>CHAIN</td><td>SHARED</td><td>SHARED</td></tr><tr><td>STATE</td><td>LOCAL EVENT</td><td>REVISED EVENT</td></tr></table><div class="ch3-record-alert">BOTH HEADERS VALIDATE</div></article>`;
 return `<article class="ch3-evidence-visual ch3-request-terminal"><header class="ch3-record-head"><span>OFFLINE TOKEN POLICY</span><span>WINDOW: 11 MIN</span></header><pre>TOKEN: OFFLINE_SIGNATURE
LOCAL EVENT: SIGNED
SYNC MODE: DELAYED
WINDOW STATUS: WITHIN POLICY
VALIDATION RESULT: ACCEPTED
ATTRIBUTION RESULT: UNRESOLVED</pre><footer>POLICY PRESERVES ACCEPTED STATES</footer></article>`;
}
function openEvidence(id){
 const item=EVIDENCE[id], panel=$("#ch3OfficeEvidencePanel"); if(!item||!panel) return;
 activeEvidence=id; evidenceInspected=false; panel.classList.add("open"); panel.setAttribute("aria-hidden","false");
 const key=isThai()?"th":"en", set=collectedSet(); $("#ch3OfficeEvidenceTitle").textContent=item.title[key]; $("#ch3OfficeEvidenceDescription").textContent=item.description[key]; $("#ch3OfficeEvidenceObservation").textContent=item.observation[key]; $("#ch3OfficeEvidenceObject").innerHTML=evidenceVisual(id);
 $("#ch3OfficeEvidenceMeta")?.classList.remove("show"); $("#collectCh3OfficeEvidence").disabled=!evidenceInspected||set.has(id); $("#collectCh3OfficeEvidence").classList.toggle("done", set.has(id)); $("#inspectCh3OfficeEvidence").disabled=false; $("#ch3OfficeEvidenceObject")?.classList.remove("inspected"); syncAudio();
}
function inspectEvidence(){
 if(!activeEvidence||evidenceInspected) return; evidenceInspected=true; $("#ch3OfficeEvidenceMeta")?.classList.add("show"); $("#collectCh3OfficeEvidence").disabled=false; $("#ch3OfficeEvidenceObject")?.classList.add("inspected"); runSceneDialogue(evidenceLines(activeEvidence),()=>{}); syncAudio();
}
function collectEvidence(){
 const id=activeEvidence, p=ensureChapterState(); if(!id||!p||!evidenceInspected) return; if(!p.evidenceCollected.includes(id)) p.evidenceCollected.push(id);
 try{window.LastWitnessAudioCue?.playEvidenceAdded?.()}catch(_){}; save(); closeEvidence(); syncScene();
}
function closeEvidence(){ const panel=$("#ch3OfficeEvidencePanel"); if(!panel) return; panel.classList.remove("open"); panel.setAttribute("aria-hidden","true"); activeEvidence=null; evidenceInspected=false; syncAudio(); }

function renderFacts(){
 const wrap=$("#ch3OfficeFactList"), c=copy(); if(!wrap) return; wrap.hidden=false; $("#ch3OfficeConclusionList").hidden=true;
 wrap.innerHTML=MATRIX_ORDER.map(id=>`<div class="ch3-fact-row" data-fact="${id}"><div class="ch3-fact-text">${MATRIX_FACTS[id][isThai()?"th":"en"]}</div><div class="ch3-fact-actions"><button type="button" data-assign="a">${c.matrixA}</button><button type="button" data-assign="b">${c.matrixB}</button><button type="button" data-assign="both">${c.matrixBoth}</button><button type="button" data-assign="policy">${c.matrixPolicy}</button></div></div>`).join("");
 $$('[data-fact]',wrap).forEach(row=>{const id=row.dataset.fact, current=matrixAssignments[id]; if(current) row.querySelector(`[data-assign="${current}"]`)?.classList.add("selected")});
 $$('[data-assign]',wrap).forEach(btn=>btn.addEventListener('click',()=>{const row=btn.closest('[data-fact]'); if(!row)return; const id=row.dataset.fact; matrixAssignments[id]=btn.dataset.assign; const p=ensureChapterState(); if(p) p.matrixAssignments={...matrixAssignments}; save(); renderFacts(); clearMatrixStatus(); }));
}
function renderConclusions(){
 const wrap=$("#ch3OfficeConclusionList"), c=copy(); if(!wrap) return; wrap.hidden=false; $("#ch3OfficeFactList").hidden=true; $("#ch3OfficeMatrixHelp").textContent=c.conclusionTitle;
 wrap.innerHTML=CONCLUSIONS.map(item=>`<button type="button" class="ch3-conclusion-option" data-conclusion="${item.id}">${item[isThai()?"th":"en"]}</button>`).join("");
 $$('[data-conclusion]',wrap).forEach(btn=>btn.addEventListener('click',()=>chooseConclusion(btn.dataset.conclusion)));
}
function clearMatrixStatus(){const node=$("#ch3OfficeMatrixStatus"); if(node){node.textContent=""; node.className="ch3-reconcile-status"}}
function openMatrix(){ const modal=$("#ch3OfficeMatrix"); if(!modal)return; matrixStage="classify"; matrixAssignments={...ensureChapterState().matrixAssignments}; modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); clearMatrixStatus(); renderFacts(); syncAudio(); }
function closeMatrix(resetUI=true){ const modal=$("#ch3OfficeMatrix"); if(!modal)return; modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); if(resetUI){matrixStage='classify';} syncAudio(); }
function resetMatrix(){ matrixAssignments={}; matrixStage='classify'; const p=ensureChapterState(); if(p) p.matrixAssignments={}; save(); clearMatrixStatus(); renderFacts(); }
function confirmMatrix(){
 if(matrixStage!=="classify") return; const c=copy(), status=$("#ch3OfficeMatrixStatus");
 if(MATRIX_ORDER.some(id=>!matrixAssignments[id])){status.textContent=c.incomplete; status.className='ch3-reconcile-status error'; return}
 const wrong=MATRIX_ORDER.filter(id=>matrixAssignments[id]!==MATRIX_CORRECT[id]);
 if(wrong.length){status.textContent=c.wrong; status.className='ch3-reconcile-status error'; return}
 const p=ensureChapterState(); p.matrixAssignments={...matrixAssignments}; status.textContent=c.matrixCorrect; status.className='ch3-reconcile-status success'; matrixStage='conclusion'; save(); renderConclusions();
}
function chooseConclusion(id){
 const status=$("#ch3OfficeMatrixStatus"), c=copy(); if(id!=="inside_window"){status.textContent=c.beyond; status.className='ch3-reconcile-status error'; return}
 const p=ensureChapterState(); p.matrixComplete=true; p.stage='closing'; p.matrixAssignments={...matrixAssignments}; gameState().checkpoint='ch3_phase4_matrix'; status.textContent=tr('Conclusion supported by the office records.','ข้อสรุปนี้ได้รับการรองรับจากบันทึกในสำนักงาน'); status.className='ch3-reconcile-status success';
 try{window.LastWitnessAudioCue?.playPuzzleSuccess?.()}catch(_){}; save(); setTimeout(()=>{closeMatrix(false); runClosingDialogue()},620);
}
function runClosingDialogue(){
 const p=ensureChapterState(); if(dialogueActive||p.complete)return; setHotspotsLocked(false,false); $("#ch3OfficeReview")?.classList.remove('show'); runSceneDialogue(closingLines(),()=>{p.closingDialogueComplete=true; p.complete=true; p.stage='complete'; gameState().checkpoint='ch3_phase4_complete'; showComplete(); save()});
}
function showComplete(){
 const p=ensureChapterState(); p.complete=true; p.closingDialogueComplete=true; p.stage='complete'; $("#chapter3OfficeDialogue")?.classList.add('hidden'); $("#ch3OfficeReview")?.classList.remove('show'); setHotspotsLocked(false,false); $("#ch3OfficeComplete")?.style.setProperty('display','block'); updateProgress(); syncAudio();
}

function appendCaseEntries(){
 const list=$("#caseList"), p=ensureChapterState(); if(!list||!p?.evidenceCollected?.length) return;
 $("[data-p4-case-section]",list)?.remove(); $$('[data-p4-case-entry]',list).forEach(n=>n.remove());
 const heading=document.createElement('div'); heading.className='case-section-title'; heading.dataset.p4CaseSection='1'; heading.textContent=tr('CHAPTER III · SINGAPORE INVESTIGATION OFFICE','บทที่ III · สำนักงานสืบสวนสิงคโปร์'); list.appendChild(heading);
 p.evidenceCollected.forEach(id=>{const item=EVIDENCE[id]; if(!item) return; const row=document.createElement('div'); row.className='case-row'; row.dataset.p4CaseEntry=id; row.innerHTML=`<b>${item.title[isThai()?'th':'en']}</b><div>${item.description[isThai()?'th':'en']}</div>`; list.appendChild(row)});
}
function updateLanguage(){
 if(!$("#"+TRANSITION_SCREEN)) return; installLanguage(); const c=copy();
 $("#ch3P4Day").textContent=c.day; $("#ch3P4Time").textContent=c.time; $("#ch3P4Place").textContent=c.place; $("#ch3P4Phase").textContent=c.phase; $("#ch3P4Skip").textContent=c.skip;
 $("#ch3OfficeLocation").textContent=c.location; $("#ch3OfficeSceneLabel").textContent=c.scene; $("#ch3OfficeObjective").textContent=ensureChapterState()?.introComplete?c.investigateObjective:c.openingObjective; $("#ch3OfficeReview").textContent=c.review;
 $$('[data-office-clue]').forEach(node=>{const label=$(".ch3-hotspot-label",node); if(label) label.textContent=c.labels[node.dataset.officeClue]});
 $("#ch3OfficeEvidenceKicker").textContent=c.evidenceKicker; $("#ch3OfficeEvidenceStamp").textContent=c.caseEvidence; $("#ch3OfficeEvidenceHint").textContent=c.tap; $("#inspectCh3OfficeEvidence").textContent=c.inspect; $("#collectCh3OfficeEvidence").textContent=c.collect; $("#closeCh3OfficeEvidence").textContent=c.close;
 $("#ch3OfficeChoiceTitle").textContent=c.choiceTitle; const [b1,b2,b3]=$$('[data-office-choice]'); if(b1){b1.textContent=tr(LANG.en.ch3p4_choice_evidence,LANG.th.ch3p4_choice_evidence)} if(b2){b2.textContent=tr(LANG.en.ch3p4_choice_urgency,LANG.th.ch3p4_choice_urgency)} if(b3){b3.textContent=tr(LANG.en.ch3p4_choice_cooperate,LANG.th.ch3p4_choice_cooperate)}
 $("#ch3OfficeMatrixTitle").textContent=c.matrixTitle; $("#ch3OfficeMatrixHelp").textContent=matrixStage==="classify"?c.matrixHelp:c.conclusionTitle; $("#ch3OfficeMatrixConfirm").textContent=c.confirm; $("#ch3OfficeMatrixReset").textContent=c.reset; $("#ch3OfficeMatrixClose").textContent=c.close;
 $("#ch3OfficeCompleteEye").textContent=c.completeEye; $("#ch3OfficeCompleteTitle").textContent=c.completeTitle; $("#ch3OfficeCompleteText").textContent=c.completeText; $("#ch3OfficeContinuePhase5").textContent=c.continuePhase5; $("#ch3OfficeReturnTitle").textContent=c.returnTitle;
 if(activeEvidence){const item=EVIDENCE[activeEvidence], key=isThai()?"th":"en"; $("#ch3OfficeEvidenceTitle").textContent=item.title[key]; $("#ch3OfficeEvidenceDescription").textContent=item.description[key]; $("#ch3OfficeEvidenceObservation").textContent=item.observation[key]}
 if($("#ch3OfficeMatrix")?.classList.contains('open')){ if(matrixStage==="classify") renderFacts(); else renderConclusions(); }
 if($("#caseModal")?.classList.contains('open')) appendCaseEntries();
}

function goPhase5Wip(){
 const s=gameState(); if(!s) return; stopAudio(true); s.screen='chapter3Wip';
 const title=$("#chapter3WipTitle"), text=$("#chapter3WipText"), btn=$("#chapter3WipReturnTitle");
 if(title) title.textContent=tr('PHASE V · MARINA BAY','เฟส V · Marina Bay');
 if(text) text.textContent=tr('Phase V is currently in development. Your Chapter III progress has been saved.','เฟส V กำลังอยู่ระหว่างการพัฒนา ความคืบหน้าของ Chapter III ถูกบันทึกไว้แล้ว');
 if(btn) btn.textContent=tr('Return to Title','กลับหน้าแรก');
 safeShow('chapter3Wip'); save();
}
function resumePhase4(screen){ inject(); ensureChapterState(); updateLanguage(); if(screen===TRANSITION_SCREEN){beginTransition(true); return} if(screen===OFFICE_SCREEN){enterOffice(); return} }
function installResumeBridge(){
 const api=window.LastWitnessChapter3; if(api&& !api.__lwPhase40900){ const original=api.resumeFromState; api.resumeFromState=function(screen){ const res=typeof original==='function'?original.apply(this,arguments):undefined; if(internalRouting) return res; if(screen===TRANSITION_SCREEN||screen===OFFICE_SCREEN){setTimeout(()=>resumePhase4(screen),0); return res} return res; }; api.__lwPhase40900=true; }
 window.LastWitnessPhase4={startTransition:beginTransition,resumeFromState:resumePhase4,goPhase5Wip,version:BUILD};
}
function bind(){
 $("#ch3P4Skip")?.addEventListener('click', enterOffice);
 $("#ch3Phase4TransitionVideo")?.addEventListener('ended', enterOffice);
 $$('[data-office-clue]').forEach(node=>node.addEventListener('click',()=>openEvidence(node.dataset.officeClue)));
 $("#inspectCh3OfficeEvidence")?.addEventListener('click', inspectEvidence); $("#ch3OfficeEvidenceObject")?.addEventListener('click', inspectEvidence); $("#collectCh3OfficeEvidence")?.addEventListener('click', collectEvidence); $("#closeCh3OfficeEvidence")?.addEventListener('click', closeEvidence); $("#ch3OfficeEvidencePanel")?.addEventListener('click',e=>{if(e.target===$("#ch3OfficeEvidencePanel")) closeEvidence()});
 $("#ch3OfficeReview")?.addEventListener('click', openMatrix); $("#ch3OfficeMatrixConfirm")?.addEventListener('click', confirmMatrix); $("#ch3OfficeMatrixReset")?.addEventListener('click', resetMatrix); $("#ch3OfficeMatrixClose")?.addEventListener('click',()=>closeMatrix(true));
 $$('[data-office-choice]').forEach(btn=>btn.addEventListener('click',()=>finishChoice(btn.dataset.officeChoice)));
 $("#ch3OfficeContinuePhase5")?.addEventListener('click', goPhase5Wip); $("#ch3OfficeReturnTitle")?.addEventListener('click', ()=>window.LastWitnessChapter2Integration?.returnToTitle?.());
 $("#"+OFFICE_SCREEN+" .ch3-office-save")?.addEventListener('click',()=>manualSave()); $("#"+OFFICE_SCREEN+" .ch3-office-menu")?.addEventListener('click',()=>$("#drawer")?.classList.add('open'));
 $("#caseButton")?.addEventListener('click',()=>setTimeout(appendCaseEntries,0),true);
 $("#soundToggle")?.addEventListener('change', syncAudio, true); $("#musicRange")?.addEventListener('input', syncAudio, true); document.addEventListener('click',e=>{ if(e.target.closest?.('[data-lang]')) setTimeout(updateLanguage,0) }, true); document.addEventListener('visibilitychange',()=>{ if(document.hidden) stopAudio(false); else if(activeScreen()===OFFICE_SCREEN) syncAudio() });
 }
function installBuild(){ const label=$("#settingsVersion"); if(label) label.textContent=`LAST WITNESS · BUILD ${BUILD}`; if(window.LastWitnessSaveManager) window.LastWitnessSaveManager.version=BUILD; }
function initialize(){ inject(); document.body.classList.add('lw-phase4-runtime'); installResumeBridge(); installBuild(); const screen=activeScreen(); if(screen===TRANSITION_SCREEN||screen===OFFICE_SCREEN) setTimeout(()=>resumePhase4(screen),0); }
initialize();
})();
