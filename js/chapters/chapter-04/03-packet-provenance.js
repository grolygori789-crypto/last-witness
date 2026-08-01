/* LAST WITNESS - Chapter IV / Packet Trail 0.16.2
 * Seamless continuation inside the existing Jakarta Verification Lab.
 * Evidence review remains repeatable, case-file collection remains one-time,
 * and the investigation advances through a single mobile-first reconstruction.
 * Script load is story-state neutral.
 */
(function(){
"use strict";
if(window.LastWitnessChapter4Phase3?.version==="0.16.2")return;

const BUILD="0.16.2";
const LAB="jakartaVerificationLab";
const LEGACY_COMPLETE="jakartaPhase2Complete";
const COMPLETE="jakartaPacketProvenanceComplete";
const EVIDENCE_IDS=["source_build_hash","broker_ledger_fragment","jakarta_authorization_echo","deployment_condition_echo"];
const TRAIL_IDS=["source_build","relay_exit","broker_handoff","deployment_echo","decision_trigger"];
const TRAIL_LAYERS=["origin","route","broker","deployment","unknown"];
const TRAIL_CORRECT={
 source_build:"origin",
 relay_exit:"route",
 broker_handoff:"broker",
 deployment_echo:"deployment",
 decision_trigger:"unknown"
};
const LEAD_IDS=["accuse_relay","trace_handle","name_deployer"];
const CORRECT_LEAD="trace_handle";

const $=(selector,root=document)=>root.querySelector(selector);
const $$=(selector,root=document)=>Array.from(root.querySelectorAll(selector));
const gs=()=>{try{return state}catch(_){return window.state||null}};
const thai=()=>gs()?.language==="th"||document.documentElement.lang==="th";
const tr=(en,th)=>thai()?th:en;
const clone=value=>JSON.parse(JSON.stringify(value));
const clamp=(value,min=0,max=1)=>Math.max(min,Math.min(max,Number(value)||0));
const active=()=>$(".screen.active")?.id||gs()?.screen||"";

let dialogue=null;
let evidenceOpen=false;
let trailOpen=false;
let leadOpen=false;
let evidenceIndex=0;
let trailIndex=0;
let transitionTimer=0;
let fadeFrame=0;

function endingDefaults(){return{
 evidenceIntegrity:0,attributionProof:0,chainOfCustody:0,witnessProtection:0,northSafety:0,allianceStrength:0,publicRecordControl:0,elenaSuspicion:0,
 accusedParty:"",witnessStatus:"unknown",northStatus:"active",adrianStatus:"unresolved",armanStatus:"unresolved"
}}
function phaseState(){return gs()?.chapter4?.phase3||null}
function defaults(){return{
 started:false,
 introComplete:false,
 captureAuthorized:false,
 evidenceCollected:[],
 evidenceViewed:[],
 activeEvidenceId:"",
 evidenceDebriefSeen:false,
 trailDebriefSeen:false,
 provenanceAssignments:{},
 provenanceAttempts:0,
 provenanceComplete:false,
 activeTrailIndex:0,
 leadChoice:"",
 leadAttempts:0,
 leadComplete:false,
 authorshipComplete:false,
 legalDebriefSeen:false,
 brokerLeadEstablished:false,
 brokerHandle:"",
 armanLeadStatus:"unresolved",
 closingDialogueComplete:false,
 complete:false,
 stage:"capture"
}}
function migrateLegacyState(p){
 if(!p||typeof p!=="object")return p;
 if(!p.provenanceAssignments||typeof p.provenanceAssignments!=="object")p.provenanceAssignments={};
 if(!Number.isInteger(Number(p.activeTrailIndex)))p.activeTrailIndex=0;
 p.activeTrailIndex=clamp(Math.trunc(Number(p.activeTrailIndex)||0),0,TRAIL_IDS.length-1);
 if(typeof p.leadChoice!=="string")p.leadChoice="";
 if(typeof p.trailDebriefSeen!=="boolean")p.trailDebriefSeen=false;if(p.provenanceDebriefSeen===true)p.trailDebriefSeen=true;
 if(typeof p.leadComplete!=="boolean")p.leadComplete=Boolean(p.authorshipComplete);
 if(typeof p.authorshipComplete!=="boolean")p.authorshipComplete=Boolean(p.leadComplete);
 if(!Array.isArray(p.evidenceCollected))p.evidenceCollected=[];
 if(!Array.isArray(p.evidenceViewed))p.evidenceViewed=[];
 p.evidenceCollected=[...new Set(p.evidenceCollected.filter(id=>EVIDENCE_IDS.includes(id)))];
 p.evidenceViewed=[...new Set(p.evidenceViewed.filter(id=>EVIDENCE_IDS.includes(id)))];
 Object.keys(p.provenanceAssignments).forEach(id=>{
  const value=p.provenanceAssignments[id];
  const legacyMap={authorship:"origin",route:"route",distribution:"broker",deployment:"deployment",unresolved:"unknown"};
  if(legacyMap[value])p.provenanceAssignments[id]=legacyMap[value];
  if(!TRAIL_IDS.includes(id)||!TRAIL_LAYERS.includes(p.provenanceAssignments[id]))delete p.provenanceAssignments[id]
 });
 const oldStage=String(p.stage||"");
 if(oldStage==="lead"||p.leadChoice)p.trailDebriefSeen=true;
 if(p.complete){
  p.started=true;p.introComplete=true;p.captureAuthorized=true;p.evidenceCollected=[...EVIDENCE_IDS];p.evidenceViewed=[...EVIDENCE_IDS];
  p.evidenceDebriefSeen=true;p.trailDebriefSeen=true;p.provenanceAssignments={...TRAIL_CORRECT};p.provenanceComplete=true;p.leadChoice=CORRECT_LEAD;p.leadComplete=true;p.authorshipComplete=true;
  p.legalDebriefSeen=true;p.brokerLeadEstablished=true;p.closingDialogueComplete=true;p.stage="complete";return p
 }
 if(p.authorshipComplete||p.leadComplete){p.leadComplete=true;p.authorshipComplete=true;p.stage="legal-debrief";return p}
 if(["matrix","legal-debrief"].includes(oldStage)||Object.keys(p.authorshipMatrix||{}).length){p.evidenceDebriefSeen=true;p.trailDebriefSeen=true;p.stage="lead";return p}
 if(oldStage==="evidence-debrief"||oldStage==="trail-debrief")return p;
 if(p.provenanceComplete){p.stage=p.evidenceCollected.length===EVIDENCE_IDS.length?"lead":"evidence";return p}
 if(["provenance","provenance-debrief"].includes(oldStage)){p.stage=p.evidenceCollected.length===EVIDENCE_IDS.length?"trail":"evidence";return p}
 if(["evidence-review","evidence"].includes(oldStage)){p.stage="evidence";return p}
 if(["principle","principle-dialogue","capture"].includes(oldStage)||!oldStage)p.stage=p.introComplete?"evidence":"capture";
 return p
}
function ensureEntryState(){
 const s=gs();if(!s)return null;
 s.chapter4=s.chapter4||{};s.flags=s.flags||{};s.relationships=s.relationships||{};s.endingProfile=Object.assign(endingDefaults(),s.endingProfile||{});
 let p=s.chapter4.phase3;
 if(!p||typeof p!=="object"){p=defaults();s.chapter4.phase3=p}
 else{const base=defaults();Object.keys(base).forEach(key=>{if(typeof p[key]==="undefined")p[key]=clone(base[key])})}
 migrateLegacyState(p);
 return p
}
function save(){try{if(typeof autoSave==="function")autoSave()}catch(_){} }
function setCheckpoint(value){const s=gs();if(!s)return;s.checkpoint=value;save()}
function safeShow(id){
 try{show(id)}catch(_){$$('.screen').forEach(node=>node.classList.remove('active'));$("#"+id)?.classList.add('active');if(gs())gs().screen=id}
}
function setBuild(){
 if(!isPhase3Active())return;
 const label=$("#settingsVersion");if(label)label.textContent=`LAST WITNESS · BUILD ${BUILD}`;
 if(window.LastWitnessSaveManager)window.LastWitnessSaveManager.version=BUILD
}
function isPhase3Active(){const p=phaseState();return Boolean(p?.started&&(active()===LAB||active()===COMPLETE))}
function stopElement(media,reset=false){if(!media)return;try{media.pause();if(reset)media.currentTime=0}catch(_){} }
function verificationScore(){return $("#ch4P2VerificationScore")}
function syncAudio(){
 const p=phaseState(),audio=verificationScore(),s=gs();if(!audio||!p?.started)return;
 const inLab=active()===LAB&&!p.complete,enabled=s?.sound!==false&&Number(s?.music??.33)>0;
 const overlay=evidenceOpen||trailOpen||leadOpen;
 const duck=(dialogue?.56:1)*(overlay?.66:1);
 const target=enabled&&inLab?clamp(Number(s.music??.33)*.31*duck,0,.34):0;
 if(fadeFrame)cancelAnimationFrame(fadeFrame);
 const start=clamp(audio.volume),began=performance.now(),duration=target>0?380:260;
 if(target>0&&audio.paused){audio.loop=true;audio.muted=false;audio.play().catch(()=>{})}
 const step=now=>{const q=Math.min(1,Math.max(0,(now-began)/duration)),smooth=q*q*(3-2*q);audio.volume=start+(target-start)*smooth;if(q<1)fadeFrame=requestAnimationFrame(step);else{fadeFrame=0;if(target===0)audio.pause()}};
 fadeFrame=requestAnimationFrame(step)
}
function stopAudio(reset=false){clearTimeout(transitionTimer);transitionTimer=0;if(fadeFrame)cancelAnimationFrame(fadeFrame);fadeFrame=0;stopElement(verificationScore(),reset)}
function playInspection(){try{window.LastWitnessAudioCue?.playInspection?.()}catch(_){} }
function playPuzzleSuccess(){try{window.LastWitnessAudioCue?.playPuzzleSuccess?.()}catch(_){} }

function speakerLabel(name){
 if(name==="Farid Rahman")return thai()?"Farid Rahman (ต่อสายจากสิงคโปร์)":"Farid Rahman (Remote · Singapore)";
 if(!thai())return name;
 const map={"Inspector Cheryl Goh":"สารวัตร Cheryl Goh","Inspector Maya Pranoto":"สารวัตร Maya Pranoto"};return map[name]||name
}
function portraitSource(name,emotion){try{return typeof portrait==="function"?portrait(name,emotion||"neutral"):""}catch(_){return""}}
function recordHistory(line){try{const s=gs();s.history=s.history||[];s.history.push({speaker:speakerLabel(line[0]),text:thai()?line[3]:line[2],chapter:4,phase:3})}catch(_){} }
function dialogueBox(){return $("#jakartaVerificationLabDialogue")}
function renderDialogue(){
 const box=dialogueBox();if(!box||!dialogue)return;
 const line=dialogue.lines[dialogue.i],speaker=line[0],right=["North","Inspector Cheryl Goh","Inspector Maya Pranoto","Farid Rahman"].includes(speaker),src=portraitSource(speaker,line[1]),maya=speaker==="Inspector Maya Pranoto";
 box.className="dialogue ch4-p2-dialogue ch4-p3-dialogue"+(right?" right":"");
 box.innerHTML=`<div class="portrait-wrap">${src?`<img class="portrait${maya?" maya-portrait":""}" src="${src}" alt="">`:""}</div><div class="dialogue-copy"><div class="speaker">${speakerLabel(speaker)}</div><div class="line">${thai()?line[3]:line[2]}</div></div><div class="next">${tr("TAP TO CONTINUE","แตะเพื่อดำเนินต่อ")}</div>`;
 syncAudio()
}
function talk(lines,done){
 const box=dialogueBox();if(!box){done?.();return}
 dialogue={lines,i:0,done};box.classList.remove("hidden");paint();renderDialogue();
 box.onclick=()=>{if(!dialogue)return;recordHistory(dialogue.lines[dialogue.i]);dialogue.i++;if(dialogue.i>=dialogue.lines.length){const fn=dialogue.done;dialogue=null;box.classList.add("hidden");box.onclick=null;paint();syncAudio();fn?.();save()}else renderDialogue()}
}

const D={
 intro:[
  ["Inspector Maya Pranoto","authoritative","The capture is authorised. We stay read-only and work from the preserved response. No live trace.","อนุมัติให้เก็บข้อมูลแล้ว ห้องนี้ยังใช้สิทธิ์อ่านอย่างเดียว เราจะทำงานจากข้อมูลตอบกลับที่เก็บรักษาไว้ ไม่มีการตามรอยแบบสด"],
  ["Farid Rahman","tablet_read","The hash still matches the sealed copy in Singapore. North can separate the records; I will verify each one from here.","ค่าแฮชยังตรงกับสำเนาที่ปิดผนึกไว้ในสิงคโปร์ North แยกข้อมูลได้เลย ผมจะตรวจเทียบให้ทีละรายการจากทางนี้"],
  ["North","analyzing","Good. We stop asking where the packet surfaced and start asking what each record actually proves.","ดี งั้นเลิกถามว่าข้อมูลโผล่มาจากไหน แล้วดูว่าแต่ละชิ้นพิสูจน์อะไรได้จริง"],
  ["Inspector Cheryl Goh","serious","And we keep those claims separate: origin, route, deployment, and whoever gave the order.","และต้องไม่เอาข้อสรุปคนละชั้นมารวมกัน ทั้งต้นกำเนิด เส้นทาง การนำไปใช้ และคนออกคำสั่ง"],
  ["Benedict","thinking","Four questions. Better than one convenient suspect.","คำถามสี่ข้อ ยังดีกว่าผู้ต้องสงสัยที่สะดวกเกินไปหนึ่งคน"]
 ],
 evidenceDebrief:[
  ["Inspector Maya Pranoto","analytical","Four records, all preserved. None identifies a person on its own.","หลักฐานครบทั้งสี่รายการ และเก็บรักษาไว้เรียบร้อย ไม่มีชิ้นใดระบุตัวบุคคลได้ด้วยตัวมันเอง"],
  ["North","serious","Then I can reconstruct the trail without turning the trail into the operator.","งั้นฉันก็ต่อเส้นทางได้ โดยไม่เอาเส้นทางไปแทนตัวคนที่ใช้งานมัน"],
  ["Benedict","neutral","Good. Let us see where the evidence stops.","ดี มาดูกันว่าหลักฐานพาเราไปได้ไกลแค่ไหน"]
 ],
 trailDebrief:[
  ["North","focused","The PALIMPSEST build marks the origin. Jakarta carried the handoff. The Bangkok record shows where the tool was deployed. The order itself is still unsigned.","ชุดสร้างของ PALIMPSEST บอกต้นกำเนิด จาการ์ตาเป็นเส้นทางส่งต่อ ส่วนบันทึกจากกรุงเทพฯ บอกจุดที่นำเครื่องมือไปใช้ แต่คำสั่งยังไม่มีชื่อผู้สั่ง"],
  ["Farid Rahman","tablet_read","The ledger gives us a broker handle. It has not been tied to a person.","บัญชีส่งต่อให้นามแฝงของนายหน้ามาหนึ่งชื่อ แต่ยังเชื่อมไปถึงตัวบุคคลไม่ได้"],
  ["Inspector Cheryl Goh","serious","Enough for a controlled inquiry. Not enough for an accusation.","มากพอให้ตามสืบอย่างควบคุมได้ แต่ยังไม่พอสำหรับตั้งข้อกล่าวหา"]
 ],
 legalDebrief:[
  ["Inspector Maya Pranoto","authoritative","That is enough to trace the handle under controlled observation. No contact without authorisation.","เท่านี้ก็พอให้เราตามรอยนามแฝงภายใต้การเฝ้าระวังได้ ห้ามติดต่อจนกว่าจะได้รับอนุญาต"],
  ["North","serious","Then we find the man behind the alias before anyone decides what he is.","งั้นเราต้องหาตัวคนหลังนามแฝงให้เจอ ก่อนใครจะรีบตัดสินว่าเขาเป็นอะไร"],
  ["Benedict","smirk","Good. I prefer introductions before indictments.","ดี ผมชอบให้แนะนำตัวกันก่อนตั้งข้อหา"]
 ]
};

function copy(){return{
 location:tr("Jakarta Verification Lab · 01:24 WIB","ห้องตรวจสอบจาการ์ตา · 01:24 น. WIB"),
 scene:tr("PACKET TRAIL","เส้นทางข้อมูล"),
 evidenceEye:tr("CAPTURED RECORDS","หลักฐานที่บันทึกไว้"),
 addEvidence:tr("ADD TO CASE FILE","เก็บเข้าแฟ้มคดี"),
 reviewed:tr("IN CASE FILE","อยู่ในแฟ้มคดีแล้ว"),
 previousEvidence:tr("PREVIOUS","ก่อนหน้า"),
 nextEvidence:tr("NEXT","ถัดไป"),
 close:tr("CLOSE","ปิด"),
 beginTrail:tr("BEGIN RECONSTRUCTION","เริ่มต่อเส้นทาง"),
 reviewEvidence:tr("REVIEW CAPTURED RECORDS","ตรวจหลักฐานที่บันทึกไว้"),
 trailEye:tr("PACKET TRAIL · STEP BY STEP","เส้นทางข้อมูล · ทีละขั้น"),
 trailTitle:tr("RECONSTRUCT THE PACKET TRAIL","ต่อเส้นทางของข้อมูล"),
 trailQuestion:tr("What does this record establish?","หลักฐานชิ้นนี้ยืนยันเรื่องใด?"),
 back:tr("BACK","ย้อนกลับ"),next:tr("NEXT","ถัดไป"),startOver:tr("START OVER","เริ่มใหม่"),confirmTrail:tr("CONFIRM TRAIL","ยืนยันเส้นทาง"),
 resumeTrail:tr("RESUME RECONSTRUCTION","กลับไปต่อเส้นทาง"),
 leadEye:tr("NEXT LAWFUL LEAD","เบาะแสที่ติดตามต่อได้"),
 leadTitle:tr("What can we pursue without outrunning the evidence?","เราตามเบาะแสใดต่อได้โดยไม่ล้ำเกินหลักฐาน?"),
 confirmLead:tr("CONFIRM NEXT LEAD","ยืนยันเบาะแส"),resumeLead:tr("REVIEW NEXT LEAD","พิจารณาเบาะแสถัดไป"),
 completeEye:tr("CHAPTER IV · JAKARTA VERIFICATION LAB","บทที่ IV · ห้องตรวจสอบจาการ์ตา"),
 completeTitle:tr("PACKET TRAIL RECONSTRUCTED","ต่อเส้นทางข้อมูลสำเร็จ"),
 completeBody:tr("We have separated the tool's origin, its delivery route and its deployment in Bangkok. The person who gave the order is still unknown.","ตอนนี้เราแยกต้นกำเนิดเครื่องมือ เส้นทางส่งต่อ และการนำไปใช้ในกรุงเทพฯ ออกจากกันได้แล้ว แต่ผู้ที่ออกคำสั่งยังไม่ปรากฏตัว"),
 nextStory:tr("NEXT · THE MAN BEHIND THE ALIAS","ถัดไป · คนหลังนามแฝง"),
 returnTitle:tr("RETURN TO TITLE","กลับหน้าหลัก"),
 resultOrigin:tr("TOOL ORIGIN","ต้นกำเนิดเครื่องมือ"),resultRoute:tr("DELIVERY ROUTE","เส้นทางส่งต่อ"),resultDeploy:tr("LOCAL DEPLOYMENT","การนำไปใช้ในพื้นที่"),resultDecision:tr("DECISION MAKER","ผู้สั่งการ"),
 valueOrigin:tr("PALIMPSEST FAMILY","ตระกูล PALIMPSEST"),valueRoute:tr("JAKARTA-LINKED","เชื่อมโยงจาการ์ตา"),valueDeploy:tr("BANGKOK-LINKED","เชื่อมโยงกรุงเทพฯ"),valueDecision:tr("UNKNOWN","ยังไม่ทราบ")
}}
function objectiveText(){
 const p=phaseState();if(!p?.introComplete)return tr("Preserve the captured records without opening a live route","เก็บรักษาหลักฐานโดยไม่เปิดเส้นทางแบบสด");
 if(p.evidenceCollected.length<EVIDENCE_IDS.length)return tr("Review all four records and add each one to the case file","ตรวจหลักฐานทั้งสี่รายการและเก็บเข้าแฟ้มคดีให้ครบ");
 if(!p.provenanceComplete)return tr("Reconstruct what each record proves","ต่อเส้นทางจากสิ่งที่หลักฐานแต่ละชิ้นยืนยันได้");
 if(!p.leadComplete)return tr("Choose the next lead that stays within the evidence","เลือกเบาะแสถัดไปโดยไม่ล้ำเกินหลักฐาน");
 return tr("Preserve the authorised lead into the broker handle","รักษาเบาะแสที่ได้รับอนุญาตเพื่อตามนามแฝงของนายหน้า")
}
function evidenceData(id){return{
 source_build_hash:{title:tr("PALIMPSEST Build Signature","ลายเซ็นชุดสร้าง PALIMPSEST"),code:"SRC-BUILD / 7C4A-19F2",body:tr("The preserved build hash and response pattern match the same PALIMPSEST family in two separate captures.","รหัสชุดสร้างและรูปแบบการตอบสนองตรงกันในหลักฐานคนละชุด จึงยืนยันได้ว่าเครื่องมือมาจากตระกูล PALIMPSEST เดียวกัน"),proof:tr("ESTABLISHES · TOOL ORIGIN","ยืนยันได้ · ต้นกำเนิดเครื่องมือ")},
 broker_ledger_fragment:{title:tr("Broker Ledger Fragment","ส่วนหนึ่งของบัญชีส่งต่อ"),code:"HANDOFF / HANDLE: ARS-17?",body:tr("A repeated handoff pattern appears beside an unverified handle. It points to a broker route, not a named person.","พบรูปแบบการส่งต่อซ้ำอยู่ข้างนามแฝงที่ยังไม่ยืนยัน หลักฐานนี้ชี้ไปยังนายหน้า แต่ยังไม่ใช่ชื่อบุคคล"),proof:tr("SUPPORTS · BROKER HANDOFF","สนับสนุน · การส่งต่อผ่านนายหน้า")},
 jakarta_authorization_echo:{title:tr("Jakarta Relay Authorisation","บันทึกอนุญาตผ่านเครือข่ายจาการ์ตา"),code:"RELAY-AUTH / JKT-PASSIVE",body:tr("The preserved acknowledgement passed through authorised Jakarta-linked infrastructure. It establishes the handoff route, not the operator.","ข้อมูลตอบรับผ่านโครงสร้างพื้นฐานที่เชื่อมโยงกับจาการ์ตาภายใต้สิทธิ์ที่กำหนด จึงยืนยันเส้นทางส่งต่อได้ แต่ยังระบุตัวผู้ใช้งานไม่ได้"),proof:tr("ESTABLISHES · NETWORK ROUTE","ยืนยันได้ · เส้นทางเครือข่าย")},
 deployment_condition_echo:{title:tr("Bangkok Deployment Conditions","เงื่อนไขการนำไปใช้ในกรุงเทพฯ"),code:"TRUSTED-PKG / BKK-CONDITION",body:tr("The activation record references a trusted Bangkok evidence package. It supports local deployment but does not reveal who gave the order.","บันทึกการทำงานอ้างถึงชุดหลักฐานที่เชื่อถือได้จากกรุงเทพฯ จึงสนับสนุนว่ามีการนำเครื่องมือไปใช้ในพื้นที่ แต่ยังไม่บอกว่าใครเป็นคนออกคำสั่ง"),proof:tr("SUPPORTS · LOCAL DEPLOYMENT","สนับสนุน · การนำไปใช้ในพื้นที่")}
}[id]}
function trailItem(id){return{
 source_build:{title:tr("PALIMPSEST Build Signature","ลายเซ็นชุดสร้าง PALIMPSEST"),body:tr("The same build structure appears in two separately preserved captures.","โครงสร้างชุดสร้างแบบเดียวกันปรากฏในหลักฐานสองชุดที่เก็บแยกกัน")},
 relay_exit:{title:tr("Jakarta Relay Exit","จุดออกเครือข่ายจาการ์ตา"),body:tr("This is the last network point visible in the authorised capture.","นี่คือจุดสุดท้ายบนเครือข่ายที่มองเห็นได้จากข้อมูลซึ่งได้รับอนุญาตให้เก็บ")},
 broker_handoff:{title:tr("Broker Ledger Handoff","รายการส่งต่อผ่านนายหน้า"),body:tr("The ledger shows a repeated transfer pattern beside an unverified handle.","บัญชีแสดงรูปแบบการส่งต่อซ้ำอยู่ข้างนามแฝงที่ยังไม่ยืนยัน")},
 deployment_echo:{title:tr("Bangkok Activation Conditions","เงื่อนไขการทำงานในกรุงเทพฯ"),body:tr("The activation record refers to a trusted Bangkok evidence package.","บันทึกการทำงานอ้างถึงชุดหลักฐานที่เชื่อถือได้จากกรุงเทพฯ")},
 decision_trigger:{title:tr("Decision Trigger","สัญญาณเริ่มคำสั่ง"),body:tr("A valid order structure is present, but no person is named as its owner.","พบโครงสร้างคำสั่งที่ระบบยอมรับ แต่ไม่มีชื่อบุคคลเป็นเจ้าของคำสั่ง")}
}[id]}
function layerText(id){return{
 origin:tr("TOOL ORIGIN","ต้นกำเนิดเครื่องมือ"),
 route:tr("NETWORK ROUTE","เส้นทางเครือข่าย"),
 broker:tr("BROKER HANDOFF","การส่งต่อผ่านนายหน้า"),
 deployment:tr("LOCAL DEPLOYMENT","การนำไปใช้ในพื้นที่"),
 unknown:tr("STILL UNKNOWN","ยังระบุไม่ได้")
}[id]}
function leadText(id){return{
 accuse_relay:{title:tr("Name the Jakarta relay operator as the toolmaker","สรุปว่าผู้ดูแลเส้นทางจาการ์ตาคือผู้สร้างเครื่องมือ"),note:tr("The route is proven, but the operator is not.","เรายืนยันเส้นทางได้ แต่ยังยืนยันตัวผู้ใช้งานไม่ได้")},
 trace_handle:{title:tr("Trace the unverified broker handle under controlled observation","ตามรอยนามแฝงของนายหน้าภายใต้การเฝ้าระวัง"),note:tr("This follows a real lead without turning it into an accusation.","เป็นการตามเบาะแสที่มีอยู่จริง โดยยังไม่เปลี่ยนมันเป็นข้อกล่าวหา")},
 name_deployer:{title:tr("Treat the Bangkok deployment record as the decision maker","ถือว่าผู้ใช้เครื่องมือในกรุงเทพฯ คือผู้สั่งการ"),note:tr("Deployment and decision ownership are separate claims.","การนำเครื่องมือไปใช้กับการเป็นผู้สั่งการคือข้อสรุปคนละเรื่อง")}
}[id]}

function progressValue(){
 const p=phaseState();if(!p?.started)return 92;if(p.complete)return 100;if(p.leadChoice)return 99;if(p.provenanceComplete)return 98;
 const assigned=Object.keys(p.provenanceAssignments||{}).length;if(assigned)return Math.min(97,96+Math.ceil(assigned/3));
 const collected=p.evidenceCollected?.length||0;if(collected===4)return 96;if(collected>=2)return 95;if(collected===1)return 94;if(p.introComplete)return 93;return 92
}
function setProgress(value){const n=Math.max(0,Math.min(100,Math.round(value)));$$('.ch4-p2-progress-text').forEach(node=>node.textContent=n+"%");$$('.ch4-p2-progress-fill').forEach(node=>node.style.width=n+"%");if(gs())gs().progress=n}
function paint(){
 const p=phaseState();if(!p?.started)return;const c=copy();
 $("#jakartaVerificationLabLocation")&&($("#jakartaVerificationLabLocation").textContent=c.location);$("#jakartaVerificationLabScene")&&($("#jakartaVerificationLabScene").textContent=c.scene);$("#jakartaVerificationLabObjective")&&($("#jakartaVerificationLabObjective").textContent=objectiveText());
 const action=$("#jakartaVerificationLabAction");if(action){
  const overlayOpen=evidenceOpen||trailOpen||leadOpen;
  const available=p.introComplete&&!p.complete&&!dialogue&&!overlayOpen;
  let label="",handler=null;
  if(available&&p.evidenceCollected.length<EVIDENCE_IDS.length){label=c.reviewEvidence;handler=openEvidence}
  else if(available&&!p.provenanceComplete){label=p.evidenceCollected.length===EVIDENCE_IDS.length?c.resumeTrail:c.reviewEvidence;handler=p.evidenceCollected.length===EVIDENCE_IDS.length?beginReconstruction:openEvidence}
  else if(available&&!p.leadComplete){label=c.resumeLead;handler=openLead}
  action.hidden=!label;action.textContent=label;if(handler)action.onclick=handler
 }
 setProgress(progressValue());syncAudio()
}
function updateLanguage(){
 const c=copy(),map={
  ch4P3EvidenceEye:c.evidenceEye,ch4P3EvidenceClose:c.close,ch4P3EvidencePrevious:c.previousEvidence,ch4P3EvidenceNext:c.nextEvidence,ch4P3EvidenceCollect:c.addEvidence,ch4P3EvidenceBegin:c.beginTrail,
  ch4P3TrailEye:c.trailEye,ch4P3TrailTitle:c.trailTitle,ch4P3TrailQuestion:c.trailQuestion,ch4P3TrailClose:c.close,ch4P3TrailReset:c.startOver,ch4P3TrailBack:c.back,
  ch4P3LeadEye:c.leadEye,ch4P3LeadTitle:c.leadTitle,ch4P3LeadClose:c.close,ch4P3LeadConfirm:c.confirmLead,
  ch4P3CompleteEye:c.completeEye,ch4P3CompleteTitle:c.completeTitle,ch4P3CompleteBody:c.completeBody,ch4P3Next:c.nextStory,ch4P3ReturnTitle:c.returnTitle,
  ch4P3ResultOrigin:c.resultOrigin,ch4P3ResultRoute:c.resultRoute,ch4P3ResultDeploy:c.resultDeploy,ch4P3ResultDecision:c.resultDecision,
  ch4P3ValueOrigin:c.valueOrigin,ch4P3ValueRoute:c.valueRoute,ch4P3ValueDeploy:c.valueDeploy,ch4P3ValueDecision:c.valueDecision
 };
 Object.entries(map).forEach(([id,value])=>{const node=$("#"+id);if(node)node.textContent=value});
 if(dialogue)renderDialogue();if(evidenceOpen)renderEvidence();if(trailOpen)renderTrail();if(leadOpen)renderLead();paint();setBuild()
}

function renderEvidence(){
 const p=ensureEntryState(),id=EVIDENCE_IDS[evidenceIndex]||EVIDENCE_IDS[0],data=evidenceData(id);if(!p||!data)return;
 p.activeEvidenceId=id;if(!p.evidenceViewed.includes(id))p.evidenceViewed.push(id);
 $("#ch4P3EvidenceTitle")&&($("#ch4P3EvidenceTitle").textContent=data.title);$("#ch4P3EvidenceCode")&&($("#ch4P3EvidenceCode").textContent=data.code);$("#ch4P3EvidenceBody")&&($("#ch4P3EvidenceBody").textContent=data.body);$("#ch4P3EvidenceProof")&&($("#ch4P3EvidenceProof").textContent=data.proof);
 const c=copy(),collected=p.evidenceCollected.includes(id),allCollected=p.evidenceCollected.length===EVIDENCE_IDS.length;
 const collect=$("#ch4P3EvidenceCollect");if(collect){collect.textContent=c.addEvidence;collect.hidden=collected||allCollected;collect.disabled=false}
 const reviewed=$("#ch4P3EvidenceReviewed");if(reviewed){reviewed.textContent=c.reviewed;reviewed.hidden=!collected}
 const begin=$("#ch4P3EvidenceBegin");if(begin){begin.textContent=c.beginTrail;begin.hidden=!allCollected}
 $("#ch4P3EvidenceCounter")&&($("#ch4P3EvidenceCounter").textContent=`${evidenceIndex+1} / ${EVIDENCE_IDS.length}`);
 $("#ch4P3EvidencePrevious")&&($("#ch4P3EvidencePrevious").textContent=c.previousEvidence);$("#ch4P3EvidenceNext")&&($("#ch4P3EvidenceNext").textContent=c.nextEvidence);
 paint();save()
}
function openEvidence(){
 if(dialogue)return;const p=ensureEntryState();if(!p)return;
 p.stage="evidence";evidenceOpen=true;evidenceIndex=Math.max(0,EVIDENCE_IDS.indexOf(p.activeEvidenceId||""));
 $("#ch4P3Evidence")?.classList.add("open");$("#ch4P3Evidence")?.setAttribute("aria-hidden","false");renderEvidence();playInspection();syncAudio()
}
function closeEvidence(){const p=ensureEntryState();evidenceOpen=false;$("#ch4P3Evidence")?.classList.remove("open");$("#ch4P3Evidence")?.setAttribute("aria-hidden","true");if(p)p.stage=p.provenanceComplete?"lead":(p.evidenceCollected.length===EVIDENCE_IDS.length?"trail":"evidence");paint();save();syncAudio()}
function collectEvidence(){
 const p=ensureEntryState(),id=EVIDENCE_IDS[evidenceIndex];if(!p||!id||p.evidenceCollected.includes(id))return;
 p.evidenceCollected.push(id);try{gs()?.found?.add?.("ch4_p3_"+id)}catch(_){};setCheckpoint("ch4_phase3_evidence_"+id);renderEvidence();paint();save()
}
function previousEvidence(){evidenceIndex=(evidenceIndex-1+EVIDENCE_IDS.length)%EVIDENCE_IDS.length;playInspection();renderEvidence()}
function nextEvidence(){evidenceIndex=(evidenceIndex+1)%EVIDENCE_IDS.length;playInspection();renderEvidence()}
function beginReconstruction(){
 const p=ensureEntryState();if(!p||p.evidenceCollected.length!==EVIDENCE_IDS.length)return;
 closeEvidence();p.stage="evidence-debrief";setCheckpoint("ch4_phase3_evidence_complete");
 const finish=()=>{p.evidenceDebriefSeen=true;p.stage="trail";setCheckpoint("ch4_phase3_trail");openTrail()};
 if(p.evidenceDebriefSeen){finish();return}talk(D.evidenceDebrief,finish);paint()
}

function trailStatus(text="",kind=""){const node=$("#ch4P3TrailStatus");if(!node)return;node.textContent=text;node.className="ch4-p3-status"+(kind?" "+kind:"")}
function renderTrail(){
 const p=ensureEntryState(),id=TRAIL_IDS[trailIndex]||TRAIL_IDS[0],item=trailItem(id),c=copy();if(!p||!item)return;
 p.activeTrailIndex=trailIndex;trailStatus();
 $("#ch4P3TrailCounter")&&($("#ch4P3TrailCounter").textContent=`${trailIndex+1} / ${TRAIL_IDS.length}`);
 $("#ch4P3TrailRecordTitle")&&($("#ch4P3TrailRecordTitle").textContent=item.title);$("#ch4P3TrailRecordBody")&&($("#ch4P3TrailRecordBody").textContent=item.body);$("#ch4P3TrailQuestion")&&($("#ch4P3TrailQuestion").textContent=c.trailQuestion);
 const options=$("#ch4P3TrailOptions");if(options){const assigned=p.provenanceAssignments[id]||"";options.innerHTML=TRAIL_LAYERS.map(layer=>`<button type="button" data-trail-layer="${layer}" class="${assigned===layer?"selected":""}" aria-pressed="${assigned===layer}"><span>${layerText(layer)}</span></button>`).join("");}
 const back=$("#ch4P3TrailBack"),next=$("#ch4P3TrailNext");if(back){back.textContent=c.back;back.disabled=trailIndex===0}
 if(next){const last=trailIndex===TRAIL_IDS.length-1;next.textContent=last?c.confirmTrail:c.next;next.disabled=last?TRAIL_IDS.some(key=>!p.provenanceAssignments[key]):!p.provenanceAssignments[id]}
 $("#ch4P3TrailReset")&&($("#ch4P3TrailReset").textContent=c.startOver);paint();save()
}
function openTrail(){
 if(dialogue)return;const p=ensureEntryState();if(!p||p.evidenceCollected.length!==EVIDENCE_IDS.length)return;
 p.stage="trail";trailOpen=true;trailIndex=clamp(Number(p.activeTrailIndex)||0,0,TRAIL_IDS.length-1);
 $("#ch4P3Trail")?.classList.add("open");$("#ch4P3Trail")?.setAttribute("aria-hidden","false");renderTrail();syncAudio()
}
function closeTrail(){const p=ensureEntryState();trailOpen=false;$("#ch4P3Trail")?.classList.remove("open");$("#ch4P3Trail")?.setAttribute("aria-hidden","true");if(p)p.stage=p.provenanceComplete?"lead":"trail";paint();save();syncAudio()}
function resetTrail(){const p=ensureEntryState();if(!p)return;p.provenanceAssignments={};trailIndex=0;p.activeTrailIndex=0;renderTrail();paint();save()}
function previousTrail(){if(trailIndex<=0)return;trailIndex--;renderTrail();playInspection()}
function nextTrail(){const p=ensureEntryState();if(!p)return;if(trailIndex===TRAIL_IDS.length-1){confirmTrail();return}const id=TRAIL_IDS[trailIndex];if(!p.provenanceAssignments[id])return;trailIndex++;renderTrail();playInspection()}
function confirmTrail(){
 const p=ensureEntryState();if(!p||TRAIL_IDS.some(id=>!p.provenanceAssignments[id]))return;
 const wrong=TRAIL_IDS.filter(id=>p.provenanceAssignments[id]!==TRAIL_CORRECT[id]);
 if(wrong.length){p.provenanceAttempts++;const first=wrong[0];trailIndex=TRAIL_IDS.indexOf(first);p.activeTrailIndex=trailIndex;renderTrail();const messages={
  source_build:tr("A build signature points to the tool's origin, not the route it travelled.","ลายเซ็นชุดสร้างบอกต้นกำเนิดของเครื่องมือ ไม่ได้บอกเส้นทางที่ข้อมูลเดินทาง"),
  relay_exit:tr("A relay exit establishes the network route, not who built the tool.","จุดออกของเครือข่ายยืนยันเส้นทางได้ แต่ไม่ได้บอกว่าใครสร้างเครื่องมือ"),
  broker_handoff:tr("The ledger records a broker handoff. It does not prove a named operator.","บัญชีนี้บันทึกการส่งต่อผ่านนายหน้า แต่ยังพิสูจน์ตัวผู้ใช้งานไม่ได้"),
  deployment_echo:tr("The Bangkok record supports local deployment, not ownership of the order.","บันทึกจากกรุงเทพฯ สนับสนุนการนำเครื่องมือไปใช้ในพื้นที่ ไม่ได้ยืนยันว่าใครเป็นเจ้าของคำสั่ง"),
  decision_trigger:tr("The trigger carries an order structure, but the decision maker is still unknown.","สัญญาณเริ่มคำสั่งมีโครงสร้างที่ระบบยอมรับ แต่ผู้สั่งการยังระบุไม่ได้")
 };trailStatus(messages[first],"error");save();return}
 p.provenanceComplete=true;p.trailDebriefSeen=false;p.stage="trail-debrief";setCheckpoint("ch4_phase3_trail_complete");closeTrail();playPuzzleSuccess();paint();talk(D.trailDebrief,()=>{p.trailDebriefSeen=true;p.stage="lead";setCheckpoint("ch4_phase3_lead");openLead()})
}

function leadStatus(text="",kind=""){const node=$("#ch4P3LeadStatus");if(!node)return;node.textContent=text;node.className="ch4-p3-status"+(kind?" "+kind:"")}
function renderLead(){
 const p=ensureEntryState(),body=$("#ch4P3LeadOptions"),c=copy();if(!p||!body)return;leadStatus();
 body.innerHTML=LEAD_IDS.map(id=>{const item=leadText(id),selected=p.leadChoice===id;return`<button type="button" data-lead-choice="${id}" class="${selected?"selected":""}" aria-pressed="${selected}"><b>${item.title}</b><small>${item.note}</small></button>`}).join("");
 const confirm=$("#ch4P3LeadConfirm");if(confirm){confirm.textContent=c.confirmLead;confirm.disabled=!p.leadChoice}paint();save()
}
function openLead(){if(dialogue)return;const p=ensureEntryState();if(!p||!p.provenanceComplete)return;p.stage="lead";leadOpen=true;$("#ch4P3Lead")?.classList.add("open");$("#ch4P3Lead")?.setAttribute("aria-hidden","false");renderLead();syncAudio()}
function closeLead(){const p=ensureEntryState();leadOpen=false;$("#ch4P3Lead")?.classList.remove("open");$("#ch4P3Lead")?.setAttribute("aria-hidden","true");if(p)p.stage="lead";paint();save();syncAudio()}
function confirmLead(){
 const p=ensureEntryState();if(!p||!p.leadChoice)return;
 if(p.leadChoice!==CORRECT_LEAD){p.leadAttempts++;const message=p.leadChoice==="accuse_relay"?tr("The Jakarta route is real, but no record identifies its operator as the toolmaker.","เส้นทางจาการ์ตามีอยู่จริง แต่ไม่มีหลักฐานชิ้นใดยืนยันว่าผู้ดูแลเส้นทางคือผู้สร้างเครื่องมือ"):tr("The Bangkok record shows deployment. It does not identify who chose the target or gave the order.","บันทึกจากกรุงเทพฯ แสดงการนำเครื่องมือไปใช้ แต่ไม่ได้ระบุว่าใครเลือกเป้าหมายหรือออกคำสั่ง");leadStatus(message,"error");save();return}
 p.leadComplete=true;p.authorshipComplete=true;p.stage="legal-debrief";setCheckpoint("ch4_phase3_lead_complete");closeLead();playPuzzleSuccess();paint();talk(D.legalDebrief,completePhase)
}

function completePhase(){
 const p=ensureEntryState();if(!p)return;
 p.legalDebriefSeen=true;p.brokerLeadEstablished=true;p.brokerHandle="unverified";p.armanLeadStatus="probable-toolmaker-or-broker";p.closingDialogueComplete=true;p.complete=true;p.stage="complete";
 const s=gs();s.flags.ch4_p3_palimsest_build_proven=true;s.flags.ch4_p3_jakarta_handoff_proven=true;s.flags.ch4_p3_bangkok_deployment_supported=true;s.flags.ch4_p3_decision_owner_unresolved=true;s.flags.ch4_p3_broker_inquiry_authorised=true;
 setCheckpoint("ch4_phase3_complete");setProgress(100);save();syncAudio();clearTimeout(transitionTimer);transitionTimer=setTimeout(showComplete,680)
}
function showComplete(){inject();const p=ensureEntryState();if(!p)return;p.complete=true;p.stage="complete";const s=gs();s.chapter=4;s.screen=COMPLETE;s.progress=100;stopAudio(false);safeShow(COMPLETE);updateLanguage();save()}
function closeAll(){evidenceOpen=trailOpen=leadOpen=false;["ch4P3Evidence","ch4P3Trail","ch4P3Lead"].forEach(id=>{$("#"+id)?.classList.remove("open");$("#"+id)?.setAttribute("aria-hidden","true")});const box=dialogueBox();box?.classList.add("hidden");if(box)box.onclick=null;dialogue=null}
function returnToTitle(){stopAudio(true);closeAll();try{save()}catch(_){};try{window.LastWitnessChapter2Integration?.returnToTitle?.()}catch(_){$$('.screen').forEach(node=>node.classList.remove('active'));$("#title")?.classList.add('active');if(gs())gs().screen="title"}}

function startOpening(){const p=ensureEntryState();if(!p||p.introComplete||dialogue)return;p.captureAuthorized=true;p.stage="capture";setCheckpoint("ch4_phase3_capture");paint();talk(D.intro,()=>{p.introComplete=true;p.stage="evidence";setCheckpoint("ch4_phase3_evidence");paint();openEvidence()})}
function enterLab(){
 inject();const p=ensureEntryState(),s=gs();if(!p||!s)return;p.started=true;p.captureAuthorized=true;s.chapter=4;s.screen=LAB;document.title="Last Witness — Shadow of the Truth";safeShow(LAB);setBuild();updateLanguage();paint();
 if(p.complete){showComplete();return}
 if(p.stage==="evidence-debrief"){const finish=()=>{p.evidenceDebriefSeen=true;p.stage="trail";setCheckpoint("ch4_phase3_trail");openTrail()};if(p.evidenceDebriefSeen)finish();else talk(D.evidenceDebrief,finish);return}
 if(p.stage==="trail-debrief"){const finish=()=>{p.trailDebriefSeen=true;p.stage="lead";setCheckpoint("ch4_phase3_lead");openLead()};if(p.trailDebriefSeen)finish();else talk(D.trailDebrief,finish);return}
 if(p.stage==="legal-debrief"||p.leadComplete||p.authorshipComplete){talk(D.legalDebrief,completePhase);return}
 if(p.provenanceComplete){if(p.trailDebriefSeen)openLead();else{p.stage="trail-debrief";talk(D.trailDebrief,()=>{p.trailDebriefSeen=true;p.stage="lead";setCheckpoint("ch4_phase3_lead");openLead()})}return}
 if(p.evidenceCollected.length===EVIDENCE_IDS.length&&p.stage==="trail"){openTrail();return}
 if(p.introComplete){openEvidence();return}
 transitionTimer=setTimeout(startOpening,180)
}
function startFromPhase2(){
 const s=gs(),p2=s?.chapter4?.phase2;if(!s||!p2?.verificationComplete)return false;
 inject();closeAll();p2.closingDialogueComplete=true;p2.complete=true;p2.stage="complete";const p=ensureEntryState();p.started=true;p.captureAuthorized=true;s.chapter=4;s.screen=LAB;s.checkpoint="ch4_phase3_capture";$("#"+LEGACY_COMPLETE)?.classList.remove("active");safeShow(LAB);setBuild();updateLanguage();paint();save();transitionTimer=setTimeout(startOpening,160);return true
}
function resumeFromState(screen){const p=ensureEntryState();if(!p)return;document.body.classList.remove("lw-ch4-p3-restoring");closeAll();if(screen===COMPLETE||p.complete){showComplete();return}enterLab()}
function resetPhase3(){const s=gs();if(!s)return;s.chapter4=s.chapter4||{};s.chapter4.phase3=defaults();["ch4_p3_palimsest_build_proven","ch4_p3_jakarta_handoff_proven","ch4_p3_bangkok_deployment_supported","ch4_p3_decision_owner_unresolved","ch4_p3_broker_inquiry_authorised"].forEach(key=>delete s.flags?.[key]);EVIDENCE_IDS.forEach(id=>{try{s.found?.delete?.("ch4_p3_"+id)}catch(_){}})}
function primePhase2CompleteForDev(){
 const s=gs();if(!s)return;s.chapter=4;s.chapter4=s.chapter4||{};s.flags=s.flags||{};s.chapter4.phase2=Object.assign({started:true,flightComplete:true,routeCardSeen:true,airportIntroComplete:true,mayaUnlocked:true,mayaUnread:false,officeIntroComplete:true,choiceMade:true,choiceKey:"jurisdiction",choiceApplied:true,legalBriefComplete:true,verificationStarted:true,verificationSteps:["preserve_hash","clone_sandbox","passive_challenge","compare_grammar"],consoleWarnings:0,verificationComplete:true,evidenceCollected:["ch4_verified_rendezvous_token","ch4_broker_response_capture"],closingDialogueComplete:true,complete:true,stage:"complete"},s.chapter4.phase2||{});s.flags.ch4_maya_met=true;s.flags.ch4_token_genuine=true;s.flags.ch4_token_single_use=true;s.flags.ch4_jakarta_broker_route=true;s.flags.ch4_north_role_recognised=true;s.flags.ch4_human_attribution_unresolved=true
}
function startFreshForDev(){stopAudio(true);closeAll();primePhase2CompleteForDev();resetPhase3();startFromPhase2()}

function appendCaseEvidence(){
 const list=$("#caseList"),p=phaseState();if(!list)return;$('[data-ch4-p3-case-section]',list)?.remove();$$('[data-ch4-p3-case-entry]',list).forEach(node=>node.remove());if(!p?.evidenceCollected?.length)return;
 const heading=document.createElement("div");heading.className="case-section-title";heading.dataset.ch4P3CaseSection="1";heading.textContent=tr("CHAPTER IV · PACKET TRAIL","บทที่ IV · เส้นทางข้อมูล");list.appendChild(heading);
 p.evidenceCollected.forEach(id=>{const data=evidenceData(id);if(!data)return;const row=document.createElement("div");row.className="case-row";row.dataset.ch4P3CaseEntry=id;row.innerHTML=`<b>${data.title}</b><div>${data.body}<br><strong>${data.proof}</strong></div>`;list.appendChild(row)})
}

function installHandoffCapture(){
 if(window.__lwCh4P3Handoff0162)return;window.__lwCh4P3Handoff0162=true;
 document.addEventListener("click",event=>{
  const box=event.target.closest?.("#jakartaVerificationLabDialogue");if(!box)return;
  const s=gs(),p2=s?.chapter4?.phase2;if(!p2?.verificationComplete||p2.closingDialogueComplete||phaseState()?.started)return;
  const speaker=$(".speaker",box)?.textContent?.trim()||"",line=$(".line",box)?.textContent?.trim()||"";
  const finalLine=(line==="Then prove who handled it."||line==="งั้นพิสูจน์ว่าใครเป็นผู้ส่งต่อมัน");
  if(!finalLine||!speaker.includes("Maya"))return;
  event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();
  try{const history=s.history=s.history||[];if(history.at(-1)?.text!==line)history.push({speaker,text:line,chapter:4,phase:2})}catch(_){}
  p2.closingDialogueComplete=true;p2.complete=true;p2.stage="complete";s.checkpoint="ch4_phase2_complete";save();startFromPhase2()
 },true)
}
function isSavedPhase3(data){return Boolean(data?.chapter4?.phase3?.started||String(data?.checkpoint||"").startsWith("ch4_phase3_")||data?.screen===COMPLETE)}
function isLegacyHandoff(data){return Boolean(data?.screen===LEGACY_COMPLETE&&data?.chapter4?.phase2?.complete)}
function installSaveBridge(){
 if(window.__lwChapter4Phase3SaveBridge0162)return;window.__lwChapter4Phase3SaveBridge0162=true;
 const baseRestore=typeof restore==="function"?restore:window.restore;
 if(typeof baseRestore==="function"){
  const wrapped=function(data){const owns=isSavedPhase3(data)||isLegacyHandoff(data);if(owns)document.body.classList.add("lw-ch4-p3-restoring");const result=baseRestore.apply(this,arguments);if(owns)setTimeout(()=>{if(isLegacyHandoff(data)&&!data?.chapter4?.phase3?.started)startFromPhase2();else resumeFromState(data.screen)},260);return result};
  try{restore=wrapped}catch(_){}window.restore=wrapped;if(window.LastWitnessSaveManager)window.LastWitnessSaveManager.restore=wrapped
 }
 const baseLabel=typeof screenLabel==="function"?screenLabel:window.screenLabel;
 if(typeof baseLabel==="function"){
  const wrapped=function(data){if(data?.screen===COMPLETE)return tr("Chapter IV · Packet Trail Reconstructed","บทที่ IV · ต่อเส้นทางข้อมูลสำเร็จ");if(data?.screen===LAB&&data?.chapter4?.phase3?.started)return tr("Chapter IV · Packet Trail","บทที่ IV · เส้นทางข้อมูล");return baseLabel.apply(this,arguments)};
  try{screenLabel=wrapped}catch(_){}window.screenLabel=wrapped
 }
}
function installDevJump(){
 const grid=$("#developerModal .dev-grid");if(!grid)return;let button=grid.querySelector('[data-dev-jump="chapter4PacketProvenance"]');if(!button){button=document.createElement("button");button.className="dev-button";button.type="button";button.dataset.devJump="chapter4PacketProvenance";grid.appendChild(button)}button.textContent=tr("Chapter IV · Packet Trail","บทที่ IV · เส้นทางข้อมูล");if(button.dataset.lwBound0162==="1")return;button.dataset.lwBound0162="1";button.addEventListener("click",event=>{event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();$("#developerModal")?.classList.remove("open");startFreshForDev()},true)
}

function inject(){
 if($("#"+COMPLETE))return;const game=$("#game");if(!game)return;
 game.insertAdjacentHTML("beforeend",`
 <div id="ch4P3Evidence" class="modal ch4-p3-modal ch4-p3-evidence" aria-hidden="true"><div class="modal-card"><header><div><div id="ch4P3EvidenceEye" class="eyebrow"></div><h3 id="ch4P3EvidenceTitle"></h3></div><div class="ch4-p3-head-actions"><span id="ch4P3EvidenceReviewed" class="ch4-p3-reviewed" hidden></span><span id="ch4P3EvidenceCounter" class="ch4-p3-counter"></span><button id="ch4P3EvidenceClose" class="ghost ch4-p3-close" type="button"></button></div></header><div class="ch4-p3-evidence-scroll"><div class="ch4-p3-evidence-object"><div class="ch4-p3-code" id="ch4P3EvidenceCode"></div><div class="ch4-p3-signal"><i></i><i></i><i></i><i></i><i></i></div></div><p id="ch4P3EvidenceBody"></p><strong id="ch4P3EvidenceProof"></strong></div><footer class="ch4-p3-evidence-footer"><button id="ch4P3EvidencePrevious" class="ghost" type="button"></button><button id="ch4P3EvidenceNext" class="ghost" type="button"></button><button id="ch4P3EvidenceCollect" class="primary ch4-p3-wide" type="button"></button><button id="ch4P3EvidenceBegin" class="primary ch4-p3-wide" type="button" hidden></button></footer></div></div>
 <div id="ch4P3Trail" class="modal ch4-p3-modal ch4-p3-trail" aria-hidden="true"><div class="modal-card"><header><div><div id="ch4P3TrailEye" class="eyebrow"></div><h3 id="ch4P3TrailTitle"></h3></div><div class="ch4-p3-head-actions"><span id="ch4P3TrailCounter" class="ch4-p3-counter"></span><button id="ch4P3TrailClose" class="ghost ch4-p3-close" type="button"></button></div></header><div class="ch4-p3-trail-scroll"><article class="ch4-p3-record"><h4 id="ch4P3TrailRecordTitle"></h4><p id="ch4P3TrailRecordBody"></p></article><p id="ch4P3TrailQuestion" class="ch4-p3-question"></p><div id="ch4P3TrailOptions" class="ch4-p3-trail-options"></div></div><div id="ch4P3TrailStatus" class="ch4-p3-status" aria-live="polite"></div><footer class="ch4-p3-trail-footer"><button id="ch4P3TrailReset" class="ghost ch4-p3-reset" type="button"></button><button id="ch4P3TrailBack" class="ghost" type="button"></button><button id="ch4P3TrailNext" class="primary" type="button"></button></footer></div></div>
 <div id="ch4P3Lead" class="modal ch4-p3-modal ch4-p3-lead" aria-hidden="true"><div class="modal-card"><header><div><div id="ch4P3LeadEye" class="eyebrow"></div><h3 id="ch4P3LeadTitle"></h3></div><button id="ch4P3LeadClose" class="ghost ch4-p3-close" type="button"></button></header><div id="ch4P3LeadOptions" class="ch4-p3-lead-options"></div><div id="ch4P3LeadStatus" class="ch4-p3-status" aria-live="polite"></div><footer><button id="ch4P3LeadConfirm" class="primary" type="button"></button></footer></div></div>
 <section id="${COMPLETE}" class="screen ch4-p3-complete"><div class="ch4-p3-complete-card"><div id="ch4P3CompleteEye" class="eyebrow"></div><h2 id="ch4P3CompleteTitle"></h2><div class="ch4-p3-rule"></div><p id="ch4P3CompleteBody"></p><div class="ch4-p3-complete-grid"><div><span id="ch4P3ResultOrigin"></span><b id="ch4P3ValueOrigin"></b></div><div><span id="ch4P3ResultRoute"></span><b id="ch4P3ValueRoute"></b></div><div><span id="ch4P3ResultDeploy"></span><b id="ch4P3ValueDeploy"></b></div><div><span id="ch4P3ResultDecision"></span><b id="ch4P3ValueDecision"></b></div></div><strong id="ch4P3Next"></strong><button id="ch4P3ReturnTitle" class="primary" type="button"></button></div></section>`);
 bindElements();updateLanguage()
}
function bindElements(){
 $("#ch4P3EvidenceClose").onclick=closeEvidence;$("#ch4P3EvidencePrevious").onclick=previousEvidence;$("#ch4P3EvidenceNext").onclick=nextEvidence;$("#ch4P3EvidenceCollect").onclick=collectEvidence;$("#ch4P3EvidenceBegin").onclick=beginReconstruction;$("#ch4P3Evidence").onclick=event=>{if(event.target.id==="ch4P3Evidence")closeEvidence()};
 $("#ch4P3TrailClose").onclick=closeTrail;$("#ch4P3TrailReset").onclick=resetTrail;$("#ch4P3TrailBack").onclick=previousTrail;$("#ch4P3TrailNext").onclick=nextTrail;$("#ch4P3Trail").onclick=event=>{if(event.target.id==="ch4P3Trail")closeTrail()};
 $("#ch4P3TrailOptions").onclick=event=>{const button=event.target.closest?.('[data-trail-layer]');if(!button)return;const p=ensureEntryState(),id=TRAIL_IDS[trailIndex];if(!p||!id)return;p.provenanceAssignments[id]=button.dataset.trailLayer;renderTrail();paint();save()};
 $("#ch4P3LeadClose").onclick=closeLead;$("#ch4P3LeadConfirm").onclick=confirmLead;$("#ch4P3Lead").onclick=event=>{if(event.target.id==="ch4P3Lead")closeLead()};
 $("#ch4P3LeadOptions").onclick=event=>{const button=event.target.closest?.('[data-lead-choice]');if(!button)return;const p=ensureEntryState();if(!p)return;p.leadChoice=button.dataset.leadChoice;renderLead();paint();save()};
 $("#ch4P3ReturnTitle").onclick=returnToTitle
}
function bind(){
 inject();installHandoffCapture();installSaveBridge();installDevJump();
 $("#caseButton")?.addEventListener("click",()=>setTimeout(appendCaseEvidence,0),true);
 $("#soundToggle")?.addEventListener("change",()=>{if(isPhase3Active())syncAudio()},true);$("#musicRange")?.addEventListener("input",()=>{if(isPhase3Active())syncAudio()},true);
 document.addEventListener("click",event=>{if(event.target.closest?.("[data-lang]"))setTimeout(()=>{updateLanguage();installDevJump()},0);if(event.target.closest?.("#settingsButton,#settingsVersion,#lwSettingsFullscreen,#lwMenuFullscreen")&&isPhase3Active())setTimeout(setBuild,0)},true);
 document.addEventListener("visibilitychange",()=>{if(!phaseState()?.started)return;if(document.hidden)stopElement(verificationScore(),false);else syncAudio()});
 const p=phaseState(),screen=active();if(p?.started&&(screen===LAB||screen===COMPLETE))setTimeout(()=>resumeFromState(screen),0);else if(screen===LEGACY_COMPLETE&&gs()?.chapter4?.phase2?.complete)setTimeout(startFromPhase2,0)
}

window.LastWitnessChapter4Phase3={startFromPhase2,startFreshForDev,resumeFromState,stopAudio,returnToTitle,appendCaseEvidence,phaseState,version:BUILD};
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",bind,{once:true});else bind();
})();
