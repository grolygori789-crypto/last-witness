/* LAST WITNESS — Chapter III / Phase IV: Singapore Investigation Office 0.9.1 */
(function(){
"use strict";
if(window.LastWitnessPhase4?.version==="0.9.1")return;

const BUILD="0.9.1";
const TRANSITION_SCREEN="chapter3Phase4Transition";
const OFFICE_SCREEN="chapter3SingaporeOffice";
const VIDEO_PATH="assets/video/chapter-03/phase-04/drive-to-investigation-office.mp4?v=0910";
const TRANSITION_AUDIO="assets/audio/chapter-03/phase-04/drive-to-investigation-office.mp3?v=0910";
const OFFICE_IMAGE="assets/images/chapter-03/phase-04/singapore-investigation-office.png?v=0910";
const OFFICE_AUDIO="assets/audio/chapter-03/phase-04/singapore-investigation-office-ambience.mp3?v=0910";
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
 if(typeof p.travelCardSeen!=="boolean")p.travelCardSeen=false;
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
function stopAudio(reset=false){
 clearTimeout(transitionTimer);clearTimeout(revealTimer);cancelAnimationFrame(officeFadeFrame);
 stopElement($("#ch3Phase4TransitionAudio"),reset);stopElement($("#ch3Phase4OfficeAmbience"),reset);
 const video=$("#ch3Phase4TransitionVideo");if(video)try{video.pause();if(reset)video.currentTime=0}catch(_){}
}
function resumeTransitionMedia(){
 const p=ensureChapterState();if(activeScreen()!==TRANSITION_SCREEN||p?.travelCardSeen)return;
 const video=$("#ch3Phase4TransitionVideo"),audio=$("#ch3Phase4TransitionAudio");
 if(video)video.play().catch(()=>{});
 if(audio&&soundOn()){audio.volume=clamp(musicLevel()*.58,0,.46);audio.play().catch(()=>{})}
}
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
  const cheryl={neutral:CHERYL_BASE+"neutral.png?v=0910",serious:CHERYL_BASE+"neutral.png?v=0910",skeptical:CHERYL_BASE+"skeptical.png?v=0910",side:CHERYL_BASE+"side.png?v=0910",arms_crossed:CHERYL_BASE+"arms_crossed.png?v=0910",surprised:CHERYL_BASE+"surprised.png?v=0910",thinking:CHERYL_BASE+"thinking.png?v=0910",faint_smile:CHERYL_BASE+"faint_smile.png?v=0910",explaining:CHERYL_BASE+"explaining.png?v=0910",alert:CHERYL_BASE+"alert.png?v=0910",concerned:CHERYL_BASE+"concerned.png?v=0910",reading:CHERYL_BASE+"reading.png?v=0910",closed_off:CHERYL_BASE+"closed_off.png?v=0910"};
  const farid={neutral:FARID_BASE+"neutral.png?v=0910",side:FARID_BASE+"side.png?v=0910",tablet:FARID_BASE+"tablet.png?v=0910",smirk:FARID_BASE+"smirk.png?v=0910",look_up:FARID_BASE+"look_up.png?v=0910",surprised:FARID_BASE+"surprised.png?v=0910",explaining:FARID_BASE+"explaining.png?v=0910",amused:FARID_BASE+"amused.png?v=0910",thinking:FARID_BASE+"thinking.png?v=0910",concerned:FARID_BASE+"concerned.png?v=0910",warm_smile:FARID_BASE+"warm_smile.png?v=0910",focused:FARID_BASE+"focused.png?v=0910",alert:FARID_BASE+"alert.png?v=0910",downcast:FARID_BASE+"downcast.png?v=0910",arms_crossed:FARID_BASE+"arms_crossed.png?v=0910",tablet_read:FARID_BASE+"tablet_read.png?v=0910",coffee:FARID_BASE+"coffee.png?v=0910"};
  PORTRAITS["Inspector Cheryl Goh"]=cheryl; PORTRAITS["สารวัตร Cheryl Goh"]=cheryl;
  PORTRAITS["Farid Rahman"]=farid; PORTRAITS["Farid Rahman (SPF)"]=farid; PORTRAITS["ฟาริด ราห์มาน"]=farid;
 }catch(_){}
}
function installLanguage(){
 try{
  if(typeof LANG!=="object")return;
  Object.assign(LANG.en,{
   ch3p4_intro_1:"Inspector Cheryl Goh.",
   ch3p4_intro_2:"Changi proved Daniel never crossed immigration. The 06:09 request crossed a Singapore relay. Those are different facts.",
   ch3p4_intro_3:"That distinction is why we're here.",
   ch3p4_intro_4:"Good. Then don't turn a route into a suspect.",
   ch3p4_intro_5:"Read-only access. Certified headers and relay acknowledgements only. The raw reconciliation record stays restricted.",
   ch3p4_choice_title:"How do you respond?",
   ch3p4_choice_evidence:"Separate the certified header from the relay acknowledgement. No story until each record stands on its own.",
   ch3p4_choice_urgency:"The same accepted permission moved the collection time before Daniel was officially found. We need to know what Singapore accepted.",
   ch3p4_choice_cooperate:"Read-only is enough. We came to verify the route, not claim the operator.",
   ch3p4_choice_evidence_r:"Good. Evidence first, jurisdiction second, theory last.",
   ch3p4_choice_urgency_r:"Urgency earns attention, not wider conclusions. Keep both.",
   ch3p4_choice_cooperate_r:"Then we understand each other.",
   ch3p4_intro_6:"Farid.",
   ch3p4_intro_7:"Farid Rahman. Digital forensics. Early evening, apparently. The logs are still arguing about the morning.",
   ch3p4_intro_8:"Show them what we can prove, not what the system might be hiding.",
   ch3p4_intro_9:"One original header at 05:58. One corrected header at 06:09. Both validate. The raw event order is still behind secure access.",
   ch3p4_intro_10:"So we have the outline of a rule, not the mechanism.",
   ch3p4_intro_11:"Less satisfying. More honest.",
   ch3p4_intro_12:"Relay acknowledgement first. Header comparison second. Policy marker last.",
   ch3p4_relay_1:"The relay acknowledged the 06:09 verification event. It carried accepted Evidence Division permission and resolved to Temporary Operational Profile 18-07.",
   ch3p4_relay_2:"Same accepted route. Still no operator.",
   ch3p4_logs_1:"The archived original preserves 05:58. The certified corrected header preserves 06:09. Both signatures validate; the corrected event claims FS-12.",
   ch3p4_logs_2:"The same machine signature from a terminal whose local session was offline.",
   ch3p4_token_1:"This is only a policy marker, not the raw record. Signed delayed events inside an eleven-minute reconciliation window remain eligible for acceptance.",
   ch3p4_token_2:"A rule can explain how the contradiction survived. It cannot identify who used it.",
   ch3p4_close_1:"The limited headers establish two accepted states and an eleven-minute policy marker. They do not establish raw event order, source device or operator.",
   ch3p4_close_2:"Authentication proves accepted access. Validation proves accepted records. Attribution is still empty.",
   ch3p4_close_3:"Room 1807 staged a scene with real objects. This stages a timeline with real records.",
   ch3p4_close_4:"Until we obtain the raw reconciliation record, that remains a working theory, not a charge.",
   ch3p4_close_5:"Opening this review woke a dormant audit subscriber. It queried the same transaction through a public network gateway near Marina Bay.",
   ch3p4_close_6:"Automated callback or someone watching us.",
   ch3p4_close_7:"You may verify the endpoint. You may not call it a suspect.",
   ch3p4_close_8:"I prefer suspects with names.",
   ch3p4_close_9:"At the moment, we have a gateway with commitment issues.",
   ch3p4_open_access:"SPF LIAISON REVIEW · LIMITED READ-ONLY ACCESS",
   ch3p4_complete_text:"The office confirms that an eleven-minute reconciliation rule exists, while raw event order and operator remain unproven. A fresh audit query points toward Marina Bay.",
   ch3p4_continue_phase5:"Continue to Phase V",
   ch3p4_return_title:"Return to Title"
  });
  Object.assign(LANG.th,{
   ch3p4_intro_1:"สารวัตร Cheryl Goh",
   ch3p4_intro_2:"ที่ชางงีพิสูจน์แล้วว่าแดเนียลไม่ได้ผ่านตรวจคนเข้าเมือง แต่คำขอเวลา 06:09 ผ่าน relay ในสิงคโปร์ นั่นเป็นข้อเท็จจริงคนละเรื่องกัน",
   ch3p4_intro_3:"เรามาที่นี่เพราะต้องแยกสองเรื่องนี้ออกจากกันค่ะ",
   ch3p4_intro_4:"ดี งั้นก็อย่าเปลี่ยนเส้นทางของข้อมูลให้กลายเป็นผู้ต้องสงสัย",
   ch3p4_intro_5:"สิทธิ์อ่านอย่างเดียว คุณจะเห็นเพียงหัวบันทึกที่รับรองแล้วกับ relay acknowledgement ส่วน raw reconciliation record ยังถูกจำกัดสิทธิ์",
   ch3p4_choice_title:"คุณจะตอบอย่างไร?",
   ch3p4_choice_evidence:"แยก certified header ออกจาก relay acknowledgement ก่อน ยังไม่ควรมีเรื่องเล่าใดจนกว่าบันทึกแต่ละชุดจะยืนได้ด้วยตัวเอง",
   ch3p4_choice_urgency:"สิทธิ์ที่ระบบยอมรับชุดเดียวกันเปลี่ยนเวลาเก็บตัวอย่างก่อนมีรายงานพบแดเนียล เราต้องรู้ว่าสิงคโปร์ยอมรับอะไรเข้าไป",
   ch3p4_choice_cooperate:"สิทธิ์อ่านอย่างเดียวก็พอ เรามายืนยันเส้นทาง ไม่ได้มาระบุตัวผู้ใช้",
   ch3p4_choice_evidence_r:"ดี หลักฐานมาก่อน เขตอำนาจตามมา แล้วค่อยถึงทฤษฎี",
   ch3p4_choice_urgency_r:"ความเร่งด่วนทำให้เรื่องนี้ได้ความสนใจ ไม่ได้ทำให้ข้อสรุปกว้างขึ้น รักษาทั้งสองอย่างไว้",
   ch3p4_choice_cooperate_r:"งั้นเราก็เข้าใจกัน",
   ch3p4_intro_6:"Farid",
   ch3p4_intro_7:"Farid Rahman ฝ่ายดิจิทัลฟอเรนสิกครับ ตอนนี้เย็นแล้ว แต่พวก log ยังเถียงกันเรื่องตอนเช้าอยู่เลย",
   ch3p4_intro_8:"ให้พวกเขาดูเฉพาะสิ่งที่เราพิสูจน์ได้ ไม่ใช่สิ่งที่เราคิดว่าระบบกำลังซ่อน",
   ch3p4_intro_9:"หัวบันทึกต้นฉบับอยู่ที่ 05:58 ฉบับแก้ไขอยู่ที่ 06:09 ทั้งคู่ validate ผ่าน แต่ลำดับ event ดิบยังอยู่หลังสิทธิ์เข้าถึงระดับ secure",
   ch3p4_intro_10:"งั้นเรามีเพียงโครงร่างของกฎ ยังไม่เห็นกลไกจริง",
   ch3p4_intro_11:"น่าพอใจน้อยกว่า แต่ซื่อตรงกว่า",
   ch3p4_intro_12:"เริ่มจาก relay acknowledgement ต่อด้วยการเทียบหัวบันทึก แล้วจบที่ policy marker",
   ch3p4_relay_1:"relay ตอบรับ verification event เวลา 06:09 คำขอนั้นพกสิทธิ์ฝ่ายพยานหลักฐานที่ระบบยอมรับและเชื่อมกับ Temporary Operational Profile 18-07",
   ch3p4_relay_2:"เส้นทางเดิมที่ระบบยอมรับ แต่ยังไม่มีตัวผู้ใช้",
   ch3p4_logs_1:"ต้นฉบับที่เก็บถาวรรักษาเวลา 05:58 ไว้ ส่วนหัวบันทึกฉบับแก้ไขที่รับรองแล้วรักษาเวลา 06:09 ลายเซ็นของทั้งคู่ validate ผ่าน และ event ที่แก้ไขอ้าง FS-12",
   ch3p4_logs_2:"ลายเซ็นของเครื่องเดิม จาก Terminal ที่ local session ถูกบันทึกว่า offline",
   ch3p4_token_1:"นี่เป็นเพียง policy marker ไม่ใช่ raw record signed delayed event ที่เข้ามาภายใน reconciliation window สิบเอ็ดนาทียังมีสิทธิ์ได้รับการยอมรับ",
   ch3p4_token_2:"กฎนี้อธิบายได้ว่าความขัดกันอยู่รอดอย่างไร แต่ระบุตัวคนใช้ไม่ได้",
   ch3p4_close_1:"หัวบันทึกที่เราเห็นพิสูจน์ได้เพียงว่ามีสองสถานะที่ระบบยอมรับ และมี policy marker สิบเอ็ดนาที ยังพิสูจน์ลำดับ event ดิบ อุปกรณ์ต้นทาง หรือตัวผู้ใช้ไม่ได้",
   ch3p4_close_2:"Authentication พิสูจน์การเข้าถึงที่ระบบยอมรับ Validation พิสูจน์บันทึกที่ระบบยอมรับ ส่วน Attribution ยังว่างเปล่า",
   ch3p4_close_3:"ห้อง 1807 จัดฉากด้วยวัตถุจริง ที่นี่จัด timeline ด้วยบันทึกจริง",
   ch3p4_close_4:"จนกว่าเราจะได้ raw reconciliation record นั่นยังเป็นทฤษฎีที่ใช้สืบต่อ ไม่ใช่ข้อกล่าวหา",
   ch3p4_close_5:"การเปิด review ครั้งนี้ปลุก audit subscriber ที่เงียบอยู่ มันร้องขอ transaction เดียวกันผ่าน public network gateway ใกล้ Marina Bay",
   ch3p4_close_6:"อาจเป็น callback อัตโนมัติ หรือมีคนกำลังดูเราอยู่",
   ch3p4_close_7:"พวกคุณตรวจ endpoint ได้ แต่ยังเรียกมันว่าผู้ต้องสงสัยไม่ได้",
   ch3p4_close_8:"ผมชอบผู้ต้องสงสัยที่มีชื่อมากกว่า",
   ch3p4_close_9:"ตอนนี้เรามีแค่ gateway ที่ยังไม่ยอมผูกมัดกับใคร",
   ch3p4_open_access:"ตรวจร่วมกับตำรวจสิงคโปร์ · สิทธิ์อ่านอย่างเดียวแบบจำกัด",
   ch3p4_complete_text:"สำนักงานยืนยันแล้วว่ามีกฎ reconciliation สิบเอ็ดนาที แต่ลำดับ event ดิบและตัวผู้ใช้ยังไม่ถูกพิสูจน์ audit query ใหม่ชี้ต่อไปยัง Marina Bay",
   ch3p4_continue_phase5:"ไปต่อ Phase V",
   ch3p4_return_title:"กลับหน้าแรก"
  });
 }catch(_){}
}

function copy(){return {
 day:tr("DAY 3","วันที่ 3"),
 time:tr("EARLY EVENING","ช่วงเย็นต้นๆ"),
 place:tr("SINGAPORE · INVESTIGATION OFFICE","สิงคโปร์ · สำนักงานสืบสวน"),
 phase:tr("LOCAL ACCESS, LIMITED TRUST","สิทธิ์เฉพาะพื้นที่ ความไว้ใจอย่างจำกัด"),
 skip:tr("Skip transition","ข้ามฉากเดินทาง"),
 location:tr("Singapore Investigation Office","สำนักงานสืบสวนสิงคโปร์"),
 scene:tr("LOCAL ACCESS, LIMITED TRUST","สิทธิ์เฉพาะพื้นที่ ความไว้ใจอย่างจำกัด"),
 openingObjective:tr("Meet the local liaison and secure limited office access","พบผู้ประสานงานท้องถิ่นและรับสิทธิ์เข้าตรวจแบบจำกัด"),
 investigateObjective:tr("Compare the relay acknowledgement, validation headers and policy marker","เปรียบเทียบ relay acknowledgement หัวบันทึกที่ validate และ policy marker"),
 labels:{relay:tr("Relay Acknowledgement","Relay Acknowledgement"),logs:tr("Validation Headers","หัวบันทึกที่ Validate"),token:tr("Policy Marker","Policy Marker")},
 evidenceKicker:tr("Limited Office Review","การตรวจแบบจำกัดในสำนักงาน"),
 caseEvidence:tr("Case Evidence","หลักฐานในคดี"),
 tap:tr("Tap evidence to inspect","แตะหลักฐานเพื่อตรวจสอบ"),
 inspect:tr("Inspect","ตรวจสอบ"),
 collect:tr("Add to Case File","เพิ่มในแฟ้มคดี"),
 close:tr("Close","ปิด"),
 choiceTitle:tr("How do you respond?","คุณจะตอบอย่างไร?"),
 review:tr("Compare Limited Headers","เปรียบเทียบหัวบันทึกที่เปิดให้ดู"),
 matrixTitle:tr("Limited Header Comparison","การเปรียบเทียบหัวบันทึกแบบจำกัด"),
 matrixHelp:tr("Assign each verified fact to the source that actually establishes it.","จัดข้อเท็จจริงแต่ละข้อให้ตรงกับแหล่งที่พิสูจน์มันได้จริง"),
 matrixA:tr("Original Header","หัวบันทึกต้นฉบับ"), matrixB:tr("Corrected Header","หัวบันทึกแก้ไข"), matrixBoth:tr("Shared","ข้อมูลร่วม"), matrixPolicy:tr("Policy Marker","Policy Marker"),
 confirm:tr("Confirm Comparison","ยืนยันการเปรียบเทียบ"), reset:tr("Reset","เริ่มใหม่"),
 incomplete:tr("Assign all four facts before confirming.","จัดหมวดข้อเท็จจริงให้ครบทั้งสี่รายการก่อน"),
 wrong:tr("At least one fact is assigned beyond what its source proves.","มีอย่างน้อยหนึ่งข้อถูกจัดเกินกว่าสิ่งที่แหล่งข้อมูลพิสูจน์ได้"),
 matrixCorrect:tr("The records are separated. Choose the conclusion these limited headers support.","แยกบันทึกออกจากกันแล้ว เลือกข้อสรุปที่หัวบันทึกแบบจำกัดเหล่านี้รองรับ"),
 conclusionTitle:tr("What do these limited records prove?","บันทึกแบบจำกัดเหล่านี้พิสูจน์อะไรได้?"),
 beyond:tr("That conclusion requires the raw reconciliation record or operator evidence.","ข้อสรุปนั้นต้องอาศัย raw reconciliation record หรือหลักฐานระบุตัวผู้ใช้"),
 completeEye:tr("PHASE IV COMPLETE","จบเฟส IV"), completeTitle:tr("LOCAL ACCESS, LIMITED TRUST","สิทธิ์เฉพาะพื้นที่ ความไว้ใจอย่างจำกัด"), completeText:tr(LANG.en.ch3p4_complete_text,LANG.th.ch3p4_complete_text),
 continuePhase5:tr(LANG.en.ch3p4_continue_phase5,LANG.th.ch3p4_continue_phase5), returnTitle:tr(LANG.en.ch3p4_return_title,LANG.th.ch3p4_return_title)
}}

const EVIDENCE={
 relay:{title:{en:"Singapore Relay Acknowledgement",th:"Relay Acknowledgement จากสิงคโปร์"},description:{en:"Singapore infrastructure acknowledged the 06:09 verification event. The request carried accepted Evidence Division permission, referenced Daniel's booking and resolved to Temporary Operational Profile 18-07. The operator remains unverified.",th:"โครงสร้างพื้นฐานสิงคโปร์ตอบรับ verification event เวลา 06:09 คำขอนั้นพกสิทธิ์ฝ่ายพยานหลักฐานที่ระบบยอมรับ อ้างถึงรายการจองของแดเนียล และเชื่อมกับ Temporary Operational Profile 18-07 โดยยังยืนยันตัวผู้ใช้ไม่ได้"},observation:{en:"The relay proves accepted cross-border access, not that Daniel travelled or that the operator was in Singapore.",th:"relay พิสูจน์การเข้าถึงข้ามพรมแดนที่ระบบยอมรับ ไม่ได้พิสูจน์ว่าแดเนียลเดินทางหรือผู้ใช้อยู่ในสิงคโปร์"}},
 logs:{title:{en:"Original and Corrected Validation Headers",th:"หัวบันทึกต้นฉบับและฉบับแก้ไข"},description:{en:"The archived original header preserves 05:58. The certified corrected header preserves 06:09. Both signatures validate. The corrected event claims FS-12, while Chapter II established that the terminal's local session was offline.",th:"หัวบันทึกต้นฉบับที่เก็บถาวรรักษาเวลา 05:58 ไว้ ส่วนฉบับแก้ไขที่รับรองแล้วรักษาเวลา 06:09 ลายเซ็นของทั้งคู่ validate ผ่าน โดย event ที่แก้ไขอ้าง FS-12 ขณะที่ Chapter II พิสูจน์แล้วว่า local session ของ Terminal อยู่ในสถานะ offline"},observation:{en:"A trusted machine signature is a claimed device field. It does not establish the command's physical origin.",th:"ลายเซ็นของเครื่องที่ระบบเชื่อถือเป็นเพียงข้อมูลอุปกรณ์ที่ event อ้าง ไม่ได้ยืนยันต้นทางทางกายภาพของคำสั่ง"}},
 token:{title:{en:"Eleven-Minute Reconciliation Policy Marker",th:"Policy Marker ของ Reconciliation Window สิบเอ็ดนาที"},description:{en:"A limited policy marker states that signed delayed events submitted inside an eleven-minute reconciliation window remain eligible for acceptance. The raw ordering record and submitting device are not included in the office view.",th:"policy marker แบบจำกัดระบุว่า signed delayed event ที่ถูกส่งเข้ามาภายใน reconciliation window สิบเอ็ดนาทียังมีสิทธิ์ได้รับการยอมรับ โดยหน้าจอสำนักงานไม่แสดงลำดับ event ดิบหรืออุปกรณ์ที่ส่งข้อมูล"},observation:{en:"The marker establishes that the rule exists. It does not yet prove exactly how the 05:58 and 06:09 events were ordered or who submitted them.",th:"marker พิสูจน์ว่ากฎนี้มีอยู่จริง แต่ยังไม่พิสูจน์ว่า event เวลา 05:58 และ 06:09 ถูกจัดลำดับอย่างไรหรือใครเป็นผู้ส่ง"}}
};
const MATRIX_FACTS={
 signed_local_event:{en:"The archived original header preserves 05:58.",th:"หัวบันทึกต้นฉบับที่เก็บถาวรรักษาเวลา 05:58 ไว้"},
 revised_relay_event:{en:"The certified corrected header preserves 06:09.",th:"หัวบันทึกฉบับแก้ไขที่รับรองแล้วรักษาเวลา 06:09 ไว้"},
 both_signed:{en:"Both headers validate; the corrected header claims FS-12.",th:"หัวบันทึกทั้งสองชุด validate ผ่าน โดยหัวบันทึกที่แก้ไขอ้าง FS-12"},
 window_policy:{en:"A policy marker names an eleven-minute reconciliation window.",th:"policy marker ระบุ reconciliation window สิบเอ็ดนาที"}
};
const CONCLUSIONS=[
 {id:"manual_override",en:"A Singapore officer manually created both versions and therefore operated profile 18-07.",th:"เจ้าหน้าที่สิงคโปร์สร้างทั้งสองเวอร์ชันด้วยตนเองและเป็นผู้ใช้โปรไฟล์ 18-07"},
 {id:"inside_window",en:"Two versions passed validation and an eleven-minute reconciliation rule exists, but raw event order, source device and operator remain unproven.",th:"บันทึกสองเวอร์ชันผ่านการ validate และมีกฎ reconciliation สิบเอ็ดนาที แต่ลำดับ event ดิบ อุปกรณ์ต้นทาง และตัวผู้ใช้ยังไม่ถูกพิสูจน์"},
 {id:"daniel_present",en:"Daniel personally used FS-12 and sent both records while travelling to Singapore.",th:"แดเนียลใช้ FS-12 ด้วยตนเองและส่งบันทึกทั้งสองชุดระหว่างเดินทางมาสิงคโปร์"},
 {id:"method_proven",en:"The limited headers fully prove the attack method and identify the remote device.",th:"หัวบันทึกแบบจำกัดพิสูจน์วิธีโจมตีทั้งหมดและระบุอุปกรณ์ทางไกลได้แล้ว"}
];

function inject(){
 if($("#"+TRANSITION_SCREEN)) return;
 const game=$("#game"); if(!game) return;
 game.insertAdjacentHTML("beforeend",`
 <section id="${TRANSITION_SCREEN}" class="screen ch3-p4-transition" aria-label="Drive to Singapore Investigation Office">
   <div id="ch3P4VideoLayer" class="ch3-p4-video-layer">
    <video id="ch3Phase4TransitionVideo" playsinline preload="auto" muted src="${VIDEO_PATH}"></video>
    <div class="ch3-p4-video-shade"></div>
    <button id="ch3P4Skip" class="ghost ch3-p4-skip" type="button"></button>
   </div>
   <div id="ch3P4TravelCard" class="ch3-p4-travel-card" aria-hidden="true"><div class="chapter-card ch3-day-card"><div id="ch3P4Day" class="eyebrow"></div><div id="ch3P4Time" class="ch3-day-time"></div><h2 id="ch3P4Place"></h2><div class="ch3-rule"></div><p id="ch3P4Phase"></p></div></div>
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
 const box=$("#chapter3OfficeDialogue"); if(!box||typeof runDialogue!=="function"){dialogueActive=false;updateReview();done?.(); return}
 dialogueActive=true; updateReview(); syncAudio();
 runDialogue(box,lines,()=>{dialogueActive=false; updateReview(); syncAudio(); done?.()});
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
 {speaker:"Inspector Cheryl Goh",emotion:"skeptical",key:"ch3p4_close_4"},
 {speaker:"Farid Rahman",emotion:"alert",key:"ch3p4_close_5"},
 {speaker:"North",emotion:"serious",key:"ch3p4_close_6"},
 {speaker:"Inspector Cheryl Goh",emotion:"arms_crossed",key:"ch3p4_close_7"},
 {speaker:"Benedict",emotion:"smirk",key:"ch3p4_close_8"},
 {speaker:"North",emotion:"dry",key:"ch3p4_close_9"}
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

function hideTransitionLayers(){
 const layer=$("#ch3P4VideoLayer"),card=$("#ch3P4TravelCard");
 layer?.classList.remove("show");card?.classList.remove("show");card?.setAttribute("aria-hidden","true");
}
function showTravelCard(){
 clearTimeout(transitionTimer);inject();const p=ensureChapterState();if(!p||activeScreen()!==TRANSITION_SCREEN)return;
 const v=$("#ch3Phase4TransitionVideo");if(v)try{v.pause();v.currentTime=0}catch(_){}
 stopElement($("#ch3Phase4TransitionAudio"),true);$("#ch3P4VideoLayer")?.classList.remove("show");
 const card=$("#ch3P4TravelCard");card?.classList.add("show");card?.setAttribute("aria-hidden","false");
 p.transitionSeen=true;p.travelCardSeen=true;p.stage="arrival-card";gameState().checkpoint="ch3_phase4_arrival_card";save();
 transitionTimer=setTimeout(enterOffice,2500);
}
function beginTransition(force=false){
 inject(); const p=ensureChapterState(); if(!p) return;
 if(p.started&&!force){if(p.travelCardSeen){safeShow(TRANSITION_SCREEN);updateLanguage();showTravelCard();return}if(p.transitionSeen){enterOffice();return}}
 p.started=true;p.stage="transition";p.transitionSeen=false;p.travelCardSeen=false;gameState().screen=TRANSITION_SCREEN;gameState().checkpoint="ch3_phase4_transition";
 window.LastWitnessChangi?.stopAudio?.(true);stopAudio(true);safeShow(TRANSITION_SCREEN);updateLanguage();hideTransitionLayers();
 const layer=$("#ch3P4VideoLayer"),v=$("#ch3Phase4TransitionVideo"),a=$("#ch3Phase4TransitionAudio");layer?.classList.add("show");
 if(v){try{v.currentTime=0;v.play().catch(()=>{})}catch(_){}}
 if(a&&soundOn()){try{a.currentTime=0;a.volume=clamp(musicLevel()*.58,0,.46);a.play().catch(()=>{})}catch(_){}}
 clearTimeout(transitionTimer);transitionTimer=setTimeout(showTravelCard,10400);save();
}
function enterOffice(){
 clearTimeout(transitionTimer);inject();const p=ensureChapterState();if(!p)return;
 p.started=true;p.transitionSeen=true;p.travelCardSeen=true;gameState().screen=OFFICE_SCREEN;gameState().checkpoint=p.introComplete?"ch3_phase4_investigation":"ch3_phase4_intro";
 const v=$("#ch3Phase4TransitionVideo");if(v)try{v.pause();v.currentTime=0}catch(_){};hideTransitionLayers();stopElement($("#ch3Phase4TransitionAudio"),true);
 safeShow(OFFICE_SCREEN);closeEvidence();closeMatrix(false);$("#ch3OfficeComplete")?.style.setProperty("display","none");updateLanguage();
 const o=$("#ch3Phase4OfficeAmbience");if(o){o.loop=true;if(soundOn())o.play().catch(()=>{})}syncAudio();
 if(p.complete){showComplete();return}
 if(p.matrixComplete&&!p.closingDialogueComplete){runClosingDialogue();return}
 if(p.introComplete||p.evidenceCollected.length){p.introComplete=true;setHotspotsLocked(false,false);syncScene();return}
 setHotspotsLocked(true,false);setTimeout(startIntro,320);
}

function evidenceVisual(id){
 if(id==="relay")return `<article class="ch3-evidence-visual"><header class="ch3-record-head"><span>SINGAPORE RELAY ACKNOWLEDGEMENT</span><span>06:09</span></header><dl class="ch3-record-grid"><dt>EVENT</dt><dd>VERIFICATION</dd><dt>SUBJECT</dt><dd>DANIEL VOSS</dd><dt>PERMISSION</dt><dd>EVIDENCE DIVISION</dd><dt>STATUS</dt><dd>ACCEPTED</dd><dt>PROFILE</dt><dd>18-07</dd><dt>OPERATOR</dt><dd>UNVERIFIED</dd></dl><div class="ch3-record-ok">CROSS-BORDER ACCESS CONFIRMED</div></article>`;
 if(id==="logs")return `<article class="ch3-evidence-visual ch3-dual-headers"><header class="ch3-record-head"><span>LIMITED HEADER COMPARISON</span><span>ORIGINAL / CORRECTED</span></header><table class="ch3-dual-table"><tr><th></th><th>ORIGINAL</th><th>CORRECTED</th></tr><tr><td>COLLECTION_TIME</td><td>05:58</td><td>06:09</td></tr><tr><td>SIGNATURE</td><td>VALID</td><td>VALID</td></tr><tr><td>CLAIMED DEVICE</td><td>NOT EXPOSED</td><td>FS-12</td></tr><tr><td>RAW ORDER</td><td>RESTRICTED</td><td>RESTRICTED</td></tr></table><div class="ch3-record-alert">VALID HEADERS · OPERATOR UNRESOLVED</div></article>`;
 return `<article class="ch3-evidence-visual ch3-request-terminal"><header class="ch3-record-head"><span>RECONCILIATION POLICY MARKER</span><span>WINDOW: 11 MIN</span></header><pre>SIGNED DELAYED EVENT: ELIGIBLE
WINDOW: ELEVEN MINUTES
RAW EVENT ORDER: RESTRICTED
SUBMITTING DEVICE: NOT EXPOSED
OPERATOR ATTRIBUTION: UNRESOLVED</pre><footer>RULE EXISTS · METHOD NOT YET PROVEN</footer></article>`;
}
function openEvidence(id){
 const item=EVIDENCE[id], panel=$("#ch3OfficeEvidencePanel"); if(!item||!panel) return;
 activeEvidence=id; evidenceInspected=false; panel.classList.add("open"); panel.setAttribute("aria-hidden","false");
 const key=isThai()?"th":"en", set=collectedSet(); $("#ch3OfficeEvidenceTitle").textContent=item.title[key]; $("#ch3OfficeEvidenceDescription").textContent=item.description[key]; $("#ch3OfficeEvidenceObservation").textContent=item.observation[key]; $("#ch3OfficeEvidenceObject").innerHTML=evidenceVisual(id);
 $("#ch3OfficeEvidenceMeta")?.classList.remove("show"); $("#collectCh3OfficeEvidence").disabled=!evidenceInspected||set.has(id); $("#collectCh3OfficeEvidence").classList.toggle("done", set.has(id)); $("#inspectCh3OfficeEvidence").disabled=false; $("#ch3OfficeEvidenceObject")?.classList.remove("inspected"); syncAudio();
}
function inspectEvidence(){
 if(!activeEvidence||evidenceInspected)return;evidenceInspected=true;$("#ch3OfficeEvidenceMeta")?.classList.add("show");$("#collectCh3OfficeEvidence").disabled=false;$("#ch3OfficeEvidenceObject")?.classList.add("inspected");syncAudio();
}
function collectEvidence(){
 const id=activeEvidence,p=ensureChapterState();if(!id||!p||!evidenceInspected||p.evidenceCollected.includes(id))return;
 p.evidenceCollected.push(id);dialogueActive=true;try{gameState().found?.add?.("office_"+id)}catch(_){};closeEvidence();paintHotspots();updateProgress();updateReview();
 try{window.LastWitnessAudioCue?.playCollection?.()}catch(_){};try{if(typeof showBadge==="function")showBadge(tr("Evidence added","เพิ่มหลักฐานแล้ว"))}catch(_){}
 runSceneDialogue(evidenceLines(id),()=>{if(allEvidenceCollected())try{if(typeof showBadge==="function")showBadge(tr("Limited header comparison unlocked","ปลดล็อกการเปรียบเทียบหัวบันทึกแล้ว"))}catch(_){};syncScene();save()});save();
}
function closeEvidence(){const panel=$("#ch3OfficeEvidencePanel");if(!panel)return;panel.classList.remove("open");panel.setAttribute("aria-hidden","true");activeEvidence=null;evidenceInspected=false;updateReview();syncAudio();}

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
 const p=ensureChapterState(); p.matrixComplete=true; p.stage='closing'; p.matrixAssignments={...matrixAssignments}; gameState().checkpoint='ch3_phase4_matrix'; status.textContent=tr('Conclusion supported within the limits of the available headers.','ข้อสรุปนี้ได้รับการรองรับภายในขอบเขตของหัวบันทึกที่เปิดให้ตรวจ'); status.className='ch3-reconcile-status success';
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
function resumePhase4(screen){inject();const p=ensureChapterState();updateLanguage();if(screen===TRANSITION_SCREEN){if(p?.travelCardSeen){safeShow(TRANSITION_SCREEN);showTravelCard()}else beginTransition(true);return}if(screen===OFFICE_SCREEN){enterOffice();return}}
function installResumeBridge(){
 const api=window.LastWitnessChapter3; if(api&& !api.__lwPhase40910){ const original=api.resumeFromState; api.resumeFromState=function(screen){ const res=typeof original==='function'?original.apply(this,arguments):undefined; if(internalRouting) return res; if(screen===TRANSITION_SCREEN||screen===OFFICE_SCREEN){setTimeout(()=>resumePhase4(screen),0); return res} return res; }; api.__lwPhase40910=true; }
 window.LastWitnessPhase4={startTransition:beginTransition,resumeFromState:resumePhase4,goPhase5Wip,version:BUILD};
}
function bind(){
 $("#ch3P4Skip")?.addEventListener('click',showTravelCard);
 $("#ch3Phase4TransitionVideo")?.addEventListener('ended',showTravelCard);
 $$('[data-office-clue]').forEach(node=>node.addEventListener('click',()=>openEvidence(node.dataset.officeClue)));
 $("#inspectCh3OfficeEvidence")?.addEventListener('click', inspectEvidence); $("#ch3OfficeEvidenceObject")?.addEventListener('click', inspectEvidence); $("#collectCh3OfficeEvidence")?.addEventListener('click', collectEvidence); $("#closeCh3OfficeEvidence")?.addEventListener('click', closeEvidence); $("#ch3OfficeEvidencePanel")?.addEventListener('click',e=>{if(e.target===$("#ch3OfficeEvidencePanel")) closeEvidence()});
 $("#ch3OfficeReview")?.addEventListener('click', openMatrix); $("#ch3OfficeMatrixConfirm")?.addEventListener('click', confirmMatrix); $("#ch3OfficeMatrixReset")?.addEventListener('click', resetMatrix); $("#ch3OfficeMatrixClose")?.addEventListener('click',()=>closeMatrix(true));
 $$('[data-office-choice]').forEach(btn=>btn.addEventListener('click',()=>finishChoice(btn.dataset.officeChoice)));
 $("#ch3OfficeContinuePhase5")?.addEventListener('click', goPhase5Wip); $("#ch3OfficeReturnTitle")?.addEventListener('click', ()=>window.LastWitnessChapter2Integration?.returnToTitle?.());
 $("#"+OFFICE_SCREEN+" .ch3-office-save")?.addEventListener('click',()=>manualSave()); $("#"+OFFICE_SCREEN+" .ch3-office-menu")?.addEventListener('click',()=>$("#drawer")?.classList.add('open'));
 $("#caseButton")?.addEventListener('click',()=>setTimeout(appendCaseEntries,0),true);
 $("#soundToggle")?.addEventListener('change', syncAudio, true); $("#musicRange")?.addEventListener('input', syncAudio, true); document.addEventListener('click',e=>{ if(e.target.closest?.('[data-lang]')) setTimeout(updateLanguage,0) }, true); document.addEventListener('visibilitychange',()=>{if(document.hidden)stopAudio(false);else if(activeScreen()===TRANSITION_SCREEN)resumeTransitionMedia();else if(activeScreen()===OFFICE_SCREEN)syncAudio()});
 }
function installBuild(){ const label=$("#settingsVersion"); if(label) label.textContent=`LAST WITNESS · BUILD ${BUILD}`; if(window.LastWitnessSaveManager) window.LastWitnessSaveManager.version=BUILD; }
function initialize(){ inject(); document.body.classList.add('lw-phase4-runtime'); installResumeBridge(); installBuild(); const screen=activeScreen(); if(screen===TRANSITION_SCREEN||screen===OFFICE_SCREEN) setTimeout(()=>resumePhase4(screen),0); }
initialize();
})();
