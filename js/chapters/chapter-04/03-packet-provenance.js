/* LAST WITNESS - Chapter IV / Packet Provenance 0.16.1
 * Seamless continuation inside the existing Jakarta Verification Lab.
 * Script load is story-state neutral. Phase state is created only on entry,
 * resume, or an intentional Developer jump.
 */
(function(){
"use strict";
if(window.LastWitnessChapter4Phase3?.version==="0.16.1")return;

const BUILD="0.16.1";
const LAB="jakartaVerificationLab";
const LEGACY_COMPLETE="jakartaPhase2Complete";
const COMPLETE="jakartaPacketProvenanceComplete";
const PROVENANCE_IDS=["source_build","relay_exit","broker_handoff","deployment_echo","decision_trigger"];
const PROVENANCE_LAYERS=["authorship","route","distribution","deployment","unresolved"];
const PROVENANCE_CORRECT={
 source_build:"authorship",
 relay_exit:"route",
 broker_handoff:"distribution",
 deployment_echo:"deployment",
 decision_trigger:"unresolved"
};
const MATRIX_IDS=["build_family","jakarta_handoff","broker_distribution","bangkok_condition","target_selector"];
const MATRIX_LEVELS=["proven","supported","unresolved"];
const MATRIX_CORRECT={
 build_family:"proven",
 jakarta_handoff:"proven",
 broker_distribution:"supported",
 bangkok_condition:"supported",
 target_selector:"unresolved"
};
const EVIDENCE_IDS=["source_build_hash","broker_ledger_fragment","jakarta_authorization_echo","deployment_condition_echo"];

const $=(selector,root=document)=>root.querySelector(selector);
const $$=(selector,root=document)=>Array.from(root.querySelectorAll(selector));
const gs=()=>{try{return state}catch(_){return window.state||null}};
const thai=()=>gs()?.language==="th"||document.documentElement.lang==="th";
const tr=(en,th)=>thai()?th:en;
const clone=value=>JSON.parse(JSON.stringify(value));
const clamp=(value,min=0,max=1)=>Math.max(min,Math.min(max,Number(value)||0));
const active=()=>$(".screen.active")?.id||gs()?.screen||"";

let dialogue=null;
let principleOpen=false;
let provenanceOpen=false;
let evidenceOpen=false;
let matrixOpen=false;
let evidenceIndex=0;
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
 principleChosen:false,
 principleKey:"",
 principleApplied:false,
 provenanceAssignments:{},
 provenanceAttempts:0,
 provenanceComplete:false,
 provenanceDebriefSeen:false,
 evidenceCollected:[],
 evidenceViewed:[],
 evidenceDebriefSeen:false,
 evidenceReturnStage:"evidence",
 activeEvidenceId:"",
 authorshipMatrix:{},
 authorshipAttempts:0,
 authorshipComplete:false,
 legalDebriefSeen:false,
 brokerLeadEstablished:false,
 brokerHandle:"",
 armanLeadStatus:"unresolved",
 closingDialogueComplete:false,
 complete:false,
 stage:"capture"
}}
function ensureEntryState(){
 const s=gs();if(!s)return null;
 s.chapter4=s.chapter4||{};
 s.flags=s.flags||{};
 s.relationships=s.relationships||{};
 s.endingProfile=Object.assign(endingDefaults(),s.endingProfile||{});
 const p=s.chapter4.phase3=Object.assign(defaults(),s.chapter4.phase3||{});
 if(!p.provenanceAssignments||typeof p.provenanceAssignments!=="object")p.provenanceAssignments={};
 if(!p.authorshipMatrix||typeof p.authorshipMatrix!=="object")p.authorshipMatrix={};
 if(!Array.isArray(p.evidenceCollected))p.evidenceCollected=[];
 if(!Array.isArray(p.evidenceViewed))p.evidenceViewed=[];
 p.evidenceCollected=[...new Set(p.evidenceCollected.filter(id=>EVIDENCE_IDS.includes(id)))];
 p.evidenceViewed=[...new Set(p.evidenceViewed.filter(id=>EVIDENCE_IDS.includes(id)))];
 Object.keys(p.provenanceAssignments).forEach(id=>{if(!PROVENANCE_IDS.includes(id)||!PROVENANCE_LAYERS.includes(p.provenanceAssignments[id]))delete p.provenanceAssignments[id]});
 Object.keys(p.authorshipMatrix).forEach(id=>{if(!MATRIX_IDS.includes(id)||!MATRIX_LEVELS.includes(p.authorshipMatrix[id]))delete p.authorshipMatrix[id]});
 if(p.complete){
  p.started=true;p.introComplete=true;p.captureAuthorized=true;p.principleChosen=true;p.principleApplied=true;
  p.provenanceComplete=true;p.provenanceDebriefSeen=true;p.evidenceCollected=[...EVIDENCE_IDS];p.evidenceViewed=[...EVIDENCE_IDS];p.evidenceDebriefSeen=true;
  p.authorshipComplete=true;p.legalDebriefSeen=true;p.brokerLeadEstablished=true;p.closingDialogueComplete=true;p.stage="complete"
 }
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
 const overlay=principleOpen||provenanceOpen||evidenceOpen||matrixOpen;
 const duck=(dialogue?.56:1)*(overlay?.66:1);
 const target=enabled&&inLab?clamp(Number(s.music??.33)*.31*duck,0,.34):0;
 if(fadeFrame)cancelAnimationFrame(fadeFrame);
 const start=clamp(audio.volume),began=performance.now(),duration=target>0?380:260;
 if(target>0&&audio.paused){audio.loop=true;audio.muted=false;audio.play().catch(()=>{})}
 const step=now=>{const q=Math.min(1,Math.max(0,(now-began)/duration)),smooth=q*q*(3-2*q);audio.volume=start+(target-start)*smooth;if(q<1)fadeFrame=requestAnimationFrame(step);else{fadeFrame=0;if(target===0)audio.pause()}};
 fadeFrame=requestAnimationFrame(step)
}
function stopAudio(reset=false){
 clearTimeout(transitionTimer);transitionTimer=0;
 if(fadeFrame)cancelAnimationFrame(fadeFrame);fadeFrame=0;
 stopElement(verificationScore(),reset)
}
function playInspection(){try{window.LastWitnessAudioCue?.playInspection?.()}catch(_){} }
function playPuzzleSuccess(){try{window.LastWitnessAudioCue?.playPuzzleSuccess?.()}catch(_){} }

function speakerLabel(name){
 if(name==="Farid Rahman")return thai()?"Farid Rahman (ต่อสายจากสิงคโปร์)":"Farid Rahman (Remote · Singapore)";
 if(!thai())return name;
 const map={"Inspector Cheryl Goh":"สารวัตร Cheryl Goh","Inspector Maya Pranoto":"สารวัตร Maya Pranoto"};return map[name]||name
}
function portraitSource(name,emotion){try{return typeof portrait==="function"?portrait(name,emotion||"neutral"):""}catch(_){return""}}
function recordHistory(line){
 try{const s=gs();s.history=s.history||[];s.history.push({speaker:speakerLabel(line[0]),text:thai()?line[3]:line[2],chapter:4,phase:3})}catch(_){}
}
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
 dialogue={lines,i:0,done};box.classList.remove("hidden");renderDialogue();
 box.onclick=()=>{if(!dialogue)return;recordHistory(dialogue.lines[dialogue.i]);dialogue.i++;if(dialogue.i>=dialogue.lines.length){const fn=dialogue.done;dialogue=null;box.classList.add("hidden");box.onclick=null;syncAudio();fn?.();save()}else renderDialogue()}
}

const D={
 intro:[
  ["Inspector Maya Pranoto","authoritative","Capture authority is active. The room stays read-only; the packet is reconstructed from the preserved response, not chased across a live route.","อำนาจการเก็บ Capture มีผลแล้ว ห้องนี้ยังคงเป็นแบบอ่านอย่างเดียว เราจะสร้าง Packet จาก Response ที่รักษาไว้ ไม่ไล่ตามผ่านเส้นทางจริง"],
  ["Farid Rahman","tablet_read","Original hash still matches in Singapore. I can validate every fragment against the sealed mirror as North separates the layers.","Original Hash ในสิงคโปร์ยังตรงกัน ผมตรวจแต่ละ Fragment เทียบกับ Mirror ที่ปิดผนึกไว้ได้ ขณะที่ North แยกชั้นข้อมูล"],
  ["North","analyzing","Then we stop asking where the packet appeared and ask what each layer was built to do.","งั้นเราหยุดถามว่า Packet ปรากฏที่ไหน แล้วถามว่าแต่ละชั้นถูกสร้างมาเพื่อทำอะไร"],
  ["Inspector Cheryl Goh","serious","And every conclusion keeps its confidence level. Proven, supported or unresolved.","และทุกข้อสรุปต้องรักษาระดับความเชื่อมั่นไว้ ว่าพิสูจน์แล้ว มีหลักฐานสนับสนุน หรือยังไม่คลี่คลาย"],
  ["Benedict","thinking","Good. Blame becomes persuasive when five different hands are printed as one.","ดี ความผิดจะดูน่าเชื่อทันที เมื่อมือห้าข้างถูกพิมพ์ให้เป็นมือเดียว"]
 ],
 afterChoice:[
  ["North","focused","I have five fragments. Build fingerprint, relay exit, broker handoff, deployment echo and decision trigger.","ฉันมีห้า Fragment ได้แก่ Build Fingerprint, Relay Exit, Broker Handoff, Deployment Echo และ Decision Trigger"],
  ["Inspector Maya Pranoto","analytical","Map function before identity. The packet may prove several handlers and still name no decision owner.","จัดตามหน้าที่ก่อนตัวตน Packet อาจพิสูจน์ผู้ส่งต่อได้หลายชั้น แต่ยังไม่ระบุเจ้าของการตัดสินใจ"]
 ],
 provenanceDebrief:[
  ["North","analyzing","The source build belongs to the PALIMPSEST family. Jakarta is the relay and broker route. The local echo describes deployment conditions in Bangkok.","Source Build อยู่ใน Tool Family ของ PALIMPSEST ส่วน Jakarta เป็นเส้นทาง Relay กับ Broker และ Local Echo อธิบายเงื่อนไขการ Deploy ในกรุงเทพฯ"],
  ["Farid Rahman","serious","The decision trigger is valid, but its selector field resolves to no human identity.","Decision Trigger ใช้งานได้จริง แต่ช่อง Selector ไม่เชื่อมไปยังตัวตนมนุษย์"],
  ["Benedict","serious","So the tool can carry an order without telling us who chose the order.","แปลว่าเครื่องมือส่งต่อคำสั่งได้ โดยไม่บอกว่าใครเป็นผู้เลือกคำสั่งนั้น"],
  ["Inspector Cheryl Goh","focused_command","That distinction is now part of the custody record.","ความแตกต่างข้อนี้ถูกบันทึกเป็นส่วนหนึ่งของ Chain of Custody แล้ว"]
 ],
 evidenceDebrief:[
  ["Inspector Maya Pranoto","analytical","Four records survive review. Build hash, broker fragment, Jakarta authorisation echo and Bangkok-linked deployment condition.","มีบันทึกสี่รายการผ่านการตรวจสอบ ได้แก่ Build Hash, Broker Fragment, Jakarta Authorization Echo และ Deployment Condition ที่เชื่อมกับกรุงเทพฯ"],
  ["North","serious","None of them turns authorship into deployment, or deployment into target selection.","ไม่มีรายการใดเปลี่ยน Tool Authorship ให้เป็น Deployment หรือเปลี่ยน Deployment ให้เป็นการเลือกเป้าหมาย"],
  ["Benedict","neutral","Then we grade the claims before someone grades a suspect for us.","งั้นเราจัดระดับข้ออ้าง ก่อนจะมีใครจัดผู้ต้องสงสัยมาให้เสร็จสรรพ"]
 ],
 legalDebrief:[
  ["North","focused","Source-build lineage is proven. Jakarta handoff is proven. Broker distribution and trusted Bangkok deployment conditions are supported. Target selection remains unresolved.","สาย Source Build พิสูจน์แล้ว การส่งต่อผ่าน Jakarta พิสูจน์แล้ว ส่วน Broker Distribution กับเงื่อนไข Deploy ที่เชื่อถือได้ในกรุงเทพฯ มีหลักฐานสนับสนุน ขณะที่การเลือกเป้าหมายยังไม่คลี่คลาย"],
  ["Farid Rahman","tablet_read","A broker handle appears in the ledger fragment, but it is not verified against a person.","มี Broker Handle ปรากฏใน Ledger Fragment แต่ยังไม่ได้ตรวจยืนยันกับบุคคล"],
  ["Inspector Maya Pranoto","authoritative","That is enough for a controlled inquiry into the probable toolmaker or broker. Observation first. Contact only under authority.","เท่านี้เพียงพอสำหรับการสืบสวนแบบควบคุมต่อผู้สร้างเครื่องมือหรือ Broker ที่เป็นไปได้ เริ่มจากการสังเกต การติดต่อจะเกิดภายใต้อำนาจเท่านั้น"],
  ["Inspector Cheryl Goh","serious","The inquiry follows the handle. The accusation does not.","การสืบสวนจะตาม Handle ไป แต่ข้อกล่าวหาจะไม่ตามไปด้วย"],
  ["Benedict","thinking","A man behind an alias may still be hiding from the person who used it.","คนที่อยู่หลังนามแฝง อาจกำลังหลบคนที่นำมันไปใช้ก็ได้"],
  ["North","serious","Then Phase IV starts with the man, not the verdict.","งั้นขั้นต่อไปเริ่มจากตัวคน ไม่ใช่คำตัดสิน"]
 ]
};
const PRINCIPLE_BRANCHES={
 lineage:[
  ["Benedict","serious","Follow the build lineage. Tools remember their makers more reliably than routes remember travellers.","ตามสาย Build Lineage เครื่องมือจดจำผู้สร้างได้ดีกว่าเส้นทางจดจำนักเดินทาง"],
  ["North","focused","Then source structure leads. Route data remains corroboration.","งั้นโครงสร้าง Source เป็นเส้นนำ ส่วน Route Data เป็นหลักฐานประกอบ"]
 ],
 broker:[
  ["Benedict","thinking","Follow the broker's habits. Distribution leaves choices even when identity is stripped.","ตามพฤติกรรมของ Broker การกระจายเครื่องมือทิ้งร่องรอยการเลือกไว้ แม้ตัวตนจะถูกลบ"],
  ["Inspector Cheryl Goh","restrained_amusement","A habit is a lead. You will keep it from becoming a name too early.","พฤติกรรมเป็นเบาะแส คุณต้องกันไม่ให้มันกลายเป็นชื่อเร็วเกินไป"]
 ],
 condition:[
  ["Benedict","serious","Follow the condition that woke the packet. Deployment tells us what the client expected the system to see.","ตามเงื่อนไขที่ปลุก Packet การ Deploy บอกว่า Client ต้องการให้ระบบเห็นอะไร"],
  ["Inspector Maya Pranoto","analytical","Then custody and local conditions lead. The toolmaker remains a separate question.","งั้น Chain of Custody กับเงื่อนไขในพื้นที่เป็นเส้นนำ ส่วนผู้สร้างเครื่องมือยังเป็นอีกคำถาม"]
 ]
};

function copy(){return{
 location:tr("Jakarta Verification Lab · 01:24 WIB","Jakarta Verification Lab · 01:24 WIB"),
 scene:tr("PACKET PROVENANCE","ที่มาของ PACKET"),
 objective:objectiveText(),
 principleTitle:tr("WHICH LINE LEADS THE RECONSTRUCTION?","เส้นใดควรนำการสร้างข้อมูลกลับคืน"),
 lineage:tr("FOLLOW BUILD LINEAGE","ตาม BUILD LINEAGE"),
 broker:tr("FOLLOW THE BROKER'S HABITS","ตามพฤติกรรมของ BROKER"),
 condition:tr("FOLLOW THE CONDITION THAT WOKE THE PACKET","ตามเงื่อนไขที่ปลุก PACKET"),
 provenanceEye:tr("CONTROLLED PACKET CAPTURE","CONTROLLED PACKET CAPTURE"),
 provenanceTitle:tr("PACKET PROVENANCE RECONSTRUCTION","สร้างที่มาของ PACKET กลับคืน"),
 provenanceHelp:tr("Assign every fragment to the layer it can actually prove.","จัด Fragment ทุกชิ้นเข้ากับชั้นที่มันพิสูจน์ได้จริง"),
 reset:tr("RESET","เริ่มใหม่"),confirm:tr("CONFIRM MAPPING","ยืนยันการจัดชั้น"),close:tr("CLOSE","ปิด"),
 evidenceEye:tr("EVIDENCE REVIEW","ตรวจสอบหลักฐาน"),addEvidence:tr("ADD TO CASE FILE","เพิ่มในแฟ้มคดี"),reviewed:tr("REVIEWED","ตรวจสอบแล้ว"),previousEvidence:tr("PREVIOUS RECORD","รายการก่อนหน้า"),nextEvidence:tr("NEXT RECORD","รายการถัดไป"),continueMatrix:tr("CONTINUE TO MATRIX","ไปยังตารางวิเคราะห์"),reviewEvidence:tr("REVIEW EVIDENCE","ตรวจสอบหลักฐาน"),
 matrixEye:tr("CONFIDENCE MATRIX","ตารางระดับความเชื่อมั่น"),matrixTitle:tr("AUTHORSHIP / DEPLOYMENT MATRIX","AUTHORSHIP / DEPLOYMENT MATRIX"),matrixHelp:tr("Classify each claim as proven, supported or unresolved.","จัดระดับแต่ละข้ออ้างว่า พิสูจน์แล้ว มีหลักฐานสนับสนุน หรือยังไม่คลี่คลาย"),matrixConfirm:tr("CONFIRM CONFIDENCE LEVELS","ยืนยันระดับความเชื่อมั่น"),
 completeEye:tr("CHAPTER IV · JAKARTA VERIFICATION LAB","บทที่ IV · JAKARTA VERIFICATION LAB"),completeTitle:tr("PACKET PROVENANCE COMPLETE","วิเคราะห์ที่มาของ PACKET เสร็จสิ้น"),
 completeBody:tr("The tool family, broker route and Bangkok-linked deployment conditions are separated. The decision owner remains unresolved.","แยก Tool Family, Broker Route และเงื่อนไขการ Deploy ที่เชื่อมกรุงเทพฯ ออกจากกันแล้ว ส่วนเจ้าของการตัดสินใจยังไม่คลี่คลาย"),
 next:tr("NEXT · PHASE IV · THE MAN BEHIND THE ALIAS","ถัดไป · เฟส IV · บุคคลเบื้องหลังนามแฝง"),
 returnTitle:tr("RETURN TO TITLE","กลับหน้าหลัก")
}}
function objectiveText(){
 const p=phaseState();
 if(!p?.introComplete)return tr("Preserve the controlled capture and separate the packet's five functional layers","รักษา Controlled Capture และแยกหน้าที่ทั้งห้าชั้นของ Packet");
 if(!p.principleChosen)return tr("Choose the investigative line that leads the reconstruction","เลือกเส้นสืบสวนที่จะนำการสร้างข้อมูลกลับคืน");
 if(!p.provenanceComplete)return tr("Map each packet fragment to the layer it proves","จัด Packet Fragment แต่ละชิ้นเข้ากับชั้นที่มันพิสูจน์");
 if(p.evidenceCollected.length<EVIDENCE_IDS.length)return tr("Review and preserve all four provenance records","ตรวจสอบและรักษาบันทึก Provenance ทั้งสี่รายการ");
 if(!p.authorshipComplete)return tr("Grade authorship, brokerage, deployment and decision claims","จัดระดับข้ออ้างเรื่อง Authorship, Brokerage, Deployment และ Decision");
 return tr("Establish the lawful lead into the probable toolmaker or broker","สร้างฐานทางกฎหมายสำหรับตามผู้สร้างเครื่องมือหรือ Broker ที่เป็นไปได้")
}
function provenanceItem(id){
 const items={
  source_build:[tr("Source-Build Fingerprint","Source-Build Fingerprint"),tr("Compiler structure and response grammar survive relay changes.","โครงสร้าง Compiler กับ Response Grammar ยังคงอยู่แม้เส้นทาง Relay เปลี่ยน")],
  relay_exit:[tr("Jakarta Relay Exit","Jakarta Relay Exit"),tr("Last observable network exit inside the authorised capture.","Network Exit สุดท้ายที่สังเกตได้ภายใน Capture ที่ได้รับอนุญาต")],
  broker_handoff:[tr("Broker Handoff","Broker Handoff"),tr("Distribution receipt carries an unverified handle and transfer pattern.","ใบรับการกระจายมี Handle ที่ยังไม่ยืนยันและรูปแบบการส่งต่อ")],
  deployment_echo:[tr("Local Deployment Echo","Local Deployment Echo"),tr("Trusted Bangkok package conditions appear in the activation grammar.","เงื่อนไข Trusted Package ในกรุงเทพฯ ปรากฏใน Activation Grammar")],
  decision_trigger:[tr("Decision Trigger","Decision Trigger"),tr("A valid selector structure exists, but no owner identity resolves.","มีโครงสร้าง Selector ที่ถูกต้อง แต่ไม่เชื่อมไปยังตัวตนเจ้าของ")]
 };
 return items[id]
}
function layerText(id){return{
 authorship:tr("TOOL AUTHORSHIP","TOOL AUTHORSHIP"),route:tr("NETWORK ROUTE","NETWORK ROUTE"),distribution:tr("BROKER DISTRIBUTION","BROKER DISTRIBUTION"),deployment:tr("DEPLOYMENT CONDITIONS","DEPLOYMENT CONDITIONS"),unresolved:tr("DECISION OWNER · UNRESOLVED","DECISION OWNER · ยังไม่คลี่คลาย")
}[id]}
function evidenceData(id){return{
 source_build_hash:{title:tr("PALIMPSEST Source-Build Hash","PALIMPSEST Source-Build Hash"),code:"SRC-BUILD / 7C4A-19F2",body:tr("The preserved build hash and response grammar match the PALIMPSEST tool family across separate captures.","Build Hash กับ Response Grammar ที่รักษาไว้ตรงกับ Tool Family ของ PALIMPSEST ใน Capture ที่แยกกัน"),proof:tr("PROVES: TOOL-FAMILY BUILD LINEAGE","พิสูจน์: สาย BUILD ของ TOOL FAMILY")},
 broker_ledger_fragment:{title:tr("Broker Ledger Fragment","Broker Ledger Fragment"),code:"HANDOFF / HANDLE: ARS-17?",body:tr("A distribution fragment records a repeated transfer pattern and an unverified broker handle. It does not identify a person.","Distribution Fragment บันทึกรูปแบบการส่งต่อซ้ำและ Broker Handle ที่ยังไม่ยืนยัน ไม่ได้ระบุตัวบุคคล"),proof:tr("SUPPORTS: BROKER DISTRIBUTION","สนับสนุน: BROKER DISTRIBUTION")},
 jakarta_authorization_echo:{title:tr("Jakarta Authorization Echo","Jakarta Authorization Echo"),code:"RELAY-AUTH / JKT-PASSIVE",body:tr("The passive acknowledgement passed through authorised Jakarta-linked broker infrastructure without revealing the sender or operator.","Passive Acknowledgement ผ่านโครงสร้าง Broker ที่เชื่อม Jakarta ภายใต้อำนาจที่กำหนด โดยไม่เผยผู้ส่งหรือผู้ใช้งาน"),proof:tr("PROVES: JAKARTA HANDOFF ROUTE","พิสูจน์: เส้นทางส่งต่อใน JAKARTA")},
 deployment_condition_echo:{title:tr("Deployment Condition Echo","Deployment Condition Echo"),code:"TRUSTED-PKG / BKK-CONDITION",body:tr("Activation conditions reference a trusted Bangkok evidence package. The echo supports local deployment, not the decision owner's identity.","เงื่อนไข Activation อ้างถึง Trusted Evidence Package ในกรุงเทพฯ Echo นี้สนับสนุน Local Deployment ไม่ใช่ตัวตนเจ้าของการตัดสินใจ"),proof:tr("SUPPORTS: BANGKOK-LINKED DEPLOYMENT","สนับสนุน: DEPLOYMENT ที่เชื่อมกรุงเทพฯ")}
}[id]}
function matrixItem(id){return{
 build_family:[tr("Source-Build Hash → PALIMPSEST Family","Source-Build Hash → PALIMPSEST Family"),tr("Independent captures preserve the same build lineage.","Capture ที่แยกกันรักษา Build Lineage เดียวกัน")],
 jakarta_handoff:[tr("Jakarta Authorization Echo → Local Handoff","Jakarta Authorization Echo → Local Handoff"),tr("The authorised passive response confirms infrastructure handling.","Passive Response ที่ได้รับอนุญาตยืนยันการจัดการโดย Infrastructure")],
 broker_distribution:[tr("Broker Handle → Distribution","Broker Handle → Distribution"),tr("Pattern and handle support brokerage, but the handle is unverified.","Pattern กับ Handle สนับสนุน Brokerage แต่ Handle ยังไม่ยืนยัน")],
 bangkok_condition:[tr("Deployment Echo → Trusted Bangkok Conditions","Deployment Echo → Trusted Bangkok Conditions"),tr("Activation grammar supports a Bangkok-linked deployment condition.","Activation Grammar สนับสนุนเงื่อนไข Deploy ที่เชื่อมกรุงเทพฯ")],
 target_selector:[tr("Decision Trigger → Target Selector","Decision Trigger → Target Selector"),tr("The trigger structure carries no resolved human owner.","โครงสร้าง Trigger ไม่ระบุเจ้าของที่เป็นมนุษย์")]
}[id]}
function confidenceText(id){return{proven:tr("PROVEN","พิสูจน์แล้ว"),supported:tr("SUPPORTED","มีหลักฐานสนับสนุน"),unresolved:tr("UNRESOLVED","ยังไม่คลี่คลาย")}[id]}

function progressValue(){
 const p=phaseState();if(!p?.started)return 92;if(p.complete)return 100;if(p.closingDialogueComplete||p.legalDebriefSeen)return 99;if(p.authorshipComplete)return 98;
 if(Object.keys(p.authorshipMatrix||{}).length)return 97;
 if(p.evidenceCollected.length===EVIDENCE_IDS.length)return 96;
 if(p.evidenceCollected.length)return 95;
 if(p.provenanceComplete)return 94;
 if(Object.keys(p.provenanceAssignments||{}).length)return 93;
 if(p.principleChosen||p.introComplete)return 92;
 return 92
}
function setProgress(value){
 const n=Math.max(0,Math.min(100,Math.round(value)));$$('.ch4-p2-progress-text').forEach(node=>node.textContent=n+"%");$$('.ch4-p2-progress-fill').forEach(node=>node.style.width=n+"%");if(gs())gs().progress=n
}
function paint(){
 const p=phaseState();if(!p?.started)return;
 const c=copy();$("#jakartaVerificationLabLocation")&&($("#jakartaVerificationLabLocation").textContent=c.location);$("#jakartaVerificationLabScene")&&($("#jakartaVerificationLabScene").textContent=c.scene);$("#jakartaVerificationLabObjective")&&($("#jakartaVerificationLabObjective").textContent=objectiveText());
 const action=$("#jakartaVerificationLabAction");if(action){
  const overlayOpen=principleOpen||provenanceOpen||evidenceOpen||matrixOpen;
  const canReview=p.provenanceComplete&&!p.complete&&!dialogue&&!overlayOpen;
  action.hidden=!canReview;action.textContent=canReview?c.reviewEvidence:"";if(canReview)action.onclick=openEvidence
 }
 setProgress(progressValue());syncAudio()
}
function updateLanguage(){
 const c=copy(),map={ch4P3PrincipleTitle:c.principleTitle,ch4P3ProvenanceEye:c.provenanceEye,ch4P3ProvenanceTitle:c.provenanceTitle,ch4P3ProvenanceHelp:c.provenanceHelp,ch4P3ProvenanceReset:c.reset,ch4P3ProvenanceConfirm:c.confirm,ch4P3EvidenceEye:c.evidenceEye,ch4P3EvidenceClose:c.close,ch4P3EvidencePrevious:c.previousEvidence,ch4P3EvidenceNext:c.nextEvidence,ch4P3EvidenceContinue:c.continueMatrix,ch4P3MatrixEye:c.matrixEye,ch4P3MatrixTitle:c.matrixTitle,ch4P3MatrixHelp:c.matrixHelp,ch4P3MatrixReset:c.reset,ch4P3MatrixConfirm:c.matrixConfirm,ch4P3CompleteEye:c.completeEye,ch4P3CompleteTitle:c.completeTitle,ch4P3CompleteBody:c.completeBody,ch4P3Next:c.next,ch4P3ReturnTitle:c.returnTitle};
 Object.entries(map).forEach(([id,value])=>{const node=$("#"+id);if(node)node.textContent=value});
 $$('[data-ch4-p3-principle]').forEach(button=>button.textContent=c[button.dataset.ch4P3Principle]);
 if(dialogue)renderDialogue();if(provenanceOpen)renderProvenance();if(evidenceOpen)renderEvidence();if(matrixOpen)renderMatrix();paint();setBuild()
}

function applyPrinciple(key){
 const p=ensureEntryState(),s=gs();if(!p||p.principleApplied)return;
 p.principleApplied=true;const profile=s.endingProfile;
 if(key==="lineage"){profile.attributionProof+=1;s.flags.ch4_p3_follow_build_lineage=true}
 if(key==="broker"){profile.allianceStrength+=1;s.flags.ch4_p3_follow_broker_habits=true}
 if(key==="condition"){profile.chainOfCustody+=1;s.flags.ch4_p3_follow_deployment_condition=true}
}
function openPrinciple(){if(dialogue)return;principleOpen=true;$("#ch4P3Principle")?.classList.add("open");$("#ch4P3Principle")?.setAttribute("aria-hidden","false");syncAudio()}
function closePrinciple(){principleOpen=false;$("#ch4P3Principle")?.classList.remove("open");$("#ch4P3Principle")?.setAttribute("aria-hidden","true");syncAudio()}
function choosePrinciple(key){
 const p=ensureEntryState();if(!p||p.principleChosen||!PRINCIPLE_BRANCHES[key])return;
 p.principleChosen=true;p.principleKey=key;p.stage="principle-dialogue";applyPrinciple(key);closePrinciple();setCheckpoint("ch4_phase3_principle");paint();talk([...PRINCIPLE_BRANCHES[key],...D.afterChoice],()=>{p.stage="provenance";setCheckpoint("ch4_phase3_provenance");openProvenance()})
}

function provenanceStatus(text="",kind=""){const node=$("#ch4P3ProvenanceStatus");if(!node)return;node.textContent=text;node.className="ch4-p3-status"+(kind?" "+kind:"")}
function renderProvenance(){
 const p=ensureEntryState(),body=$("#ch4P3ProvenanceBody");if(!p||!body)return;provenanceStatus();
 body.innerHTML=PROVENANCE_IDS.map(id=>{const item=provenanceItem(id),assigned=p.provenanceAssignments[id]||"";return`<article class="ch4-p3-map-card" data-provenance-card="${id}"><div class="ch4-p3-map-copy"><b>${item[0]}</b><small>${item[1]}</small></div><div class="ch4-p3-map-options">${PROVENANCE_LAYERS.map(layer=>`<button type="button" data-provenance-layer="${layer}" class="${assigned===layer?"selected":""}">${layerText(layer)}</button>`).join("")}</div></article>`}).join("");
 $$('[data-provenance-layer]',body).forEach(button=>button.onclick=()=>{const card=button.closest('[data-provenance-card]');p.provenanceAssignments[card.dataset.provenanceCard]=button.dataset.provenanceLayer;renderProvenance();paint();save()})
}
function openProvenance(){if(dialogue)return;provenanceOpen=true;$("#ch4P3Provenance")?.classList.add("open");$("#ch4P3Provenance")?.setAttribute("aria-hidden","false");renderProvenance();syncAudio()}
function closeProvenance(user=true){provenanceOpen=false;$("#ch4P3Provenance")?.classList.remove("open");$("#ch4P3Provenance")?.setAttribute("aria-hidden","true");if(user)paint();syncAudio()}
function resetProvenance(){const p=ensureEntryState();if(!p)return;p.provenanceAssignments={};renderProvenance();paint();save()}
function confirmProvenance(){
 const p=ensureEntryState();if(!p)return;
 if(PROVENANCE_IDS.some(id=>!p.provenanceAssignments[id])){provenanceStatus(tr("Assign all five fragments before confirming.","จัด Fragment ทั้งห้ารายการให้ครบก่อนยืนยัน"),"error");return}
 const wrong=PROVENANCE_IDS.filter(id=>p.provenanceAssignments[id]!==PROVENANCE_CORRECT[id]);
 if(wrong.length){p.provenanceAttempts++;const decisionWrong=p.provenanceAssignments.decision_trigger!=="unresolved";provenanceStatus(decisionWrong?tr("A valid trigger structure does not resolve the human decision owner.","โครงสร้าง Trigger ที่ถูกต้องไม่ได้ระบุตัวเจ้าของการตัดสินใจที่เป็นมนุษย์"):tr("At least one fragment confuses route, brokerage or deployment with authorship.","มีอย่างน้อยหนึ่ง Fragment ที่สับสน Route, Brokerage หรือ Deployment กับ Authorship"),"error");save();return}
 p.provenanceComplete=true;p.stage="provenance-debrief";setCheckpoint("ch4_phase3_provenance_complete");closeProvenance(false);playPuzzleSuccess();paint();talk(D.provenanceDebrief,()=>{p.provenanceDebriefSeen=true;p.stage="evidence";setCheckpoint("ch4_phase3_evidence");openEvidence()})
}

function renderEvidence(){
 const p=ensureEntryState(),id=EVIDENCE_IDS[evidenceIndex]||EVIDENCE_IDS[0],data=evidenceData(id);if(!p||!data)return;
 p.activeEvidenceId=id;if(!p.evidenceViewed.includes(id))p.evidenceViewed.push(id);
 $("#ch4P3EvidenceTitle")&&($("#ch4P3EvidenceTitle").textContent=data.title);$("#ch4P3EvidenceCode")&&($("#ch4P3EvidenceCode").textContent=data.code);$("#ch4P3EvidenceBody")&&($("#ch4P3EvidenceBody").textContent=data.body);$("#ch4P3EvidenceProof")&&($("#ch4P3EvidenceProof").textContent=data.proof);
 const c=copy(),collected=p.evidenceCollected.includes(id),allCollected=p.evidenceCollected.length===EVIDENCE_IDS.length;
 const collect=$("#ch4P3EvidenceCollect");if(collect){collect.textContent=c.addEvidence;collect.hidden=collected;collect.disabled=false}
 const reviewed=$("#ch4P3EvidenceReviewed");if(reviewed){reviewed.textContent=c.reviewed;reviewed.hidden=!collected}
 const proceed=$("#ch4P3EvidenceContinue");if(proceed){proceed.textContent=c.continueMatrix;proceed.hidden=!allCollected}
 $("#ch4P3EvidenceCounter")&&($("#ch4P3EvidenceCounter").textContent=`${evidenceIndex+1} / ${EVIDENCE_IDS.length}`);
 $("#ch4P3EvidencePrevious")&&($("#ch4P3EvidencePrevious").textContent=c.previousEvidence);$("#ch4P3EvidenceNext")&&($("#ch4P3EvidenceNext").textContent=c.nextEvidence);
 paint();save()
}
function openEvidence(){
 if(dialogue)return;const p=ensureEntryState();if(!p)return;
 if(p.stage!=="evidence-review")p.evidenceReturnStage=p.stage||"evidence";p.stage="evidence-review";evidenceOpen=true;evidenceIndex=Math.max(0,EVIDENCE_IDS.indexOf(p.activeEvidenceId||""));
 $("#ch4P3Evidence")?.classList.add("open");$("#ch4P3Evidence")?.setAttribute("aria-hidden","false");renderEvidence();playInspection();syncAudio()
}
function closeEvidence(){
 const p=ensureEntryState();evidenceOpen=false;$("#ch4P3Evidence")?.classList.remove("open");$("#ch4P3Evidence")?.setAttribute("aria-hidden","true");
 if(p?.stage==="evidence-review")p.stage=p.evidenceReturnStage||"evidence";paint();save();syncAudio()
}
function collectEvidence(){
 const p=ensureEntryState(),id=EVIDENCE_IDS[evidenceIndex];if(!p||!id||p.evidenceCollected.includes(id))return;
 p.evidenceCollected.push(id);try{gs()?.found?.add?.("ch4_p3_"+id)}catch(_){};setCheckpoint("ch4_phase3_evidence_"+id);renderEvidence();paint();save()
}
function previousEvidence(){evidenceIndex=(evidenceIndex-1+EVIDENCE_IDS.length)%EVIDENCE_IDS.length;playInspection();renderEvidence()}
function nextEvidence(){evidenceIndex=(evidenceIndex+1)%EVIDENCE_IDS.length;playInspection();renderEvidence()}
function continueToMatrix(){
 let p=ensureEntryState();if(!p||p.evidenceCollected.length!==EVIDENCE_IDS.length)return;
 closeEvidence();p=ensureEntryState();if(!p)return;p.stage="evidence-debrief";setCheckpoint("ch4_phase3_evidence_complete");
 const finish=()=>{p.evidenceDebriefSeen=true;p.stage="matrix";setCheckpoint("ch4_phase3_matrix");openMatrix()};
 if(p.evidenceDebriefSeen){finish();return}talk(D.evidenceDebrief,finish);paint()
}

function matrixStatus(text="",kind=""){const node=$("#ch4P3MatrixStatus");if(!node)return;node.textContent=text;node.className="ch4-p3-status"+(kind?" "+kind:"")}
function renderMatrix(){
 const p=ensureEntryState(),body=$("#ch4P3MatrixBody");if(!p||!body)return;matrixStatus();
 body.innerHTML=MATRIX_IDS.map(id=>{const item=matrixItem(id),assigned=p.authorshipMatrix[id]||"";return`<article class="ch4-p3-matrix-row" data-matrix-row="${id}"><div><b>${item[0]}</b><small>${item[1]}</small></div><div class="ch4-p3-confidence">${MATRIX_LEVELS.map(level=>`<button type="button" data-matrix-level="${level}" class="${assigned===level?"selected":""}">${confidenceText(level)}</button>`).join("")}</div></article>`}).join("");
 $$('[data-matrix-level]',body).forEach(button=>button.onclick=()=>{const row=button.closest('[data-matrix-row]');p.authorshipMatrix[row.dataset.matrixRow]=button.dataset.matrixLevel;renderMatrix();paint();save()})
}
function openMatrix(){if(dialogue)return;matrixOpen=true;$("#ch4P3Matrix")?.classList.add("open");$("#ch4P3Matrix")?.setAttribute("aria-hidden","false");renderMatrix();syncAudio()}
function closeMatrix(user=true){matrixOpen=false;$("#ch4P3Matrix")?.classList.remove("open");$("#ch4P3Matrix")?.setAttribute("aria-hidden","true");if(user)paint();syncAudio()}
function resetMatrix(){const p=ensureEntryState();if(!p)return;p.authorshipMatrix={};renderMatrix();paint();save()}
function confirmMatrix(){
 const p=ensureEntryState();if(!p)return;
 if(MATRIX_IDS.some(id=>!p.authorshipMatrix[id])){matrixStatus(tr("Classify all five claims before confirming.","จัดระดับข้ออ้างทั้งห้ารายการให้ครบก่อนยืนยัน"),"error");return}
 const wrong=MATRIX_IDS.filter(id=>p.authorshipMatrix[id]!==MATRIX_CORRECT[id]);
 if(wrong.length){p.authorshipAttempts++;const targetWrong=p.authorshipMatrix.target_selector!=="unresolved";matrixStatus(targetWrong?tr("The trigger supports no resolved target selector or decision owner.","Trigger ยังไม่สนับสนุน Target Selector หรือเจ้าของการตัดสินใจที่ระบุตัวได้"):tr("Confidence must match the strength of the preserved evidence.","ระดับความเชื่อมั่นต้องตรงกับน้ำหนักของหลักฐานที่รักษาไว้"),"error");save();return}
 p.authorshipComplete=true;p.stage="legal-debrief";setCheckpoint("ch4_phase3_matrix_complete");closeMatrix(false);playPuzzleSuccess();paint();talk(D.legalDebrief,completePhase)
}

function completePhase(){
 const p=ensureEntryState();if(!p)return;
 p.legalDebriefSeen=true;p.brokerLeadEstablished=true;p.brokerHandle="unverified";p.armanLeadStatus="probable-toolmaker-or-broker";p.closingDialogueComplete=true;p.complete=true;p.stage="complete";
 const s=gs();s.flags.ch4_p3_palimsest_build_proven=true;s.flags.ch4_p3_jakarta_handoff_proven=true;s.flags.ch4_p3_bangkok_deployment_supported=true;s.flags.ch4_p3_decision_owner_unresolved=true;s.flags.ch4_p3_broker_inquiry_authorised=true;
 setCheckpoint("ch4_phase3_complete");setProgress(100);save();syncAudio();clearTimeout(transitionTimer);transitionTimer=setTimeout(showComplete,680)
}
function showComplete(){
 inject();const p=ensureEntryState();if(!p)return;p.complete=true;p.stage="complete";const s=gs();s.chapter=4;s.screen=COMPLETE;s.progress=100;stopAudio(false);safeShow(COMPLETE);updateLanguage();save()
}
function closeAll(){
 principleOpen=provenanceOpen=evidenceOpen=matrixOpen=false;
 ["ch4P3Principle","ch4P3Provenance","ch4P3Evidence","ch4P3Matrix"].forEach(id=>{$("#"+id)?.classList.remove("open");$("#"+id)?.setAttribute("aria-hidden","true")});
 const box=dialogueBox();box?.classList.add("hidden");if(box)box.onclick=null;dialogue=null
}
function returnToTitle(){
 stopAudio(true);closeAll();try{save()}catch(_){};try{window.LastWitnessChapter2Integration?.returnToTitle?.()}catch(_){$$('.screen').forEach(node=>node.classList.remove('active'));$("#title")?.classList.add('active');if(gs())gs().screen="title"}
}

function startOpening(){
 const p=ensureEntryState();if(!p||p.introComplete||dialogue)return;
 p.captureAuthorized=true;p.stage="capture";setCheckpoint("ch4_phase3_capture");paint();talk(D.intro,()=>{p.introComplete=true;p.stage="principle";setCheckpoint("ch4_phase3_principle");paint();openPrinciple()})
}
function enterLab(){
 inject();const p=ensureEntryState(),s=gs();if(!p||!s)return;
 p.started=true;p.captureAuthorized=true;s.chapter=4;s.screen=LAB;document.title="Last Witness — Shadow of the Truth";safeShow(LAB);setBuild();updateLanguage();paint();
 if(p.complete){showComplete();return}
 if(p.authorshipComplete){talk(D.legalDebrief,completePhase);return}
 if(p.stage==="evidence-review"){openEvidence();return}
 if(p.stage==="evidence-debrief"){const finish=()=>{p.evidenceDebriefSeen=true;p.stage="matrix";setCheckpoint("ch4_phase3_matrix");openMatrix()};if(p.evidenceDebriefSeen)finish();else talk(D.evidenceDebrief,finish);return}
 if(Object.keys(p.authorshipMatrix).length||p.stage==="matrix"||p.evidenceDebriefSeen){openMatrix();return}
 if(p.provenanceComplete){openEvidence();return}
 if(p.principleChosen){openProvenance();return}
 if(p.introComplete){openPrinciple();return}
 transitionTimer=setTimeout(startOpening,180)
}
function startFromPhase2(){
 const s=gs(),p2=s?.chapter4?.phase2;if(!s||!p2?.verificationComplete)return false;
 inject();closeAll();p2.closingDialogueComplete=true;p2.complete=true;p2.stage="complete";const p=ensureEntryState();p.started=true;p.captureAuthorized=true;s.chapter=4;s.screen=LAB;s.checkpoint="ch4_phase3_capture";$("#"+LEGACY_COMPLETE)?.classList.remove("active");safeShow(LAB);setBuild();updateLanguage();paint();save();transitionTimer=setTimeout(startOpening,160);return true
}
function resumeFromState(screen){
 const p=ensureEntryState();if(!p)return;
 document.body.classList.remove("lw-ch4-p3-restoring");
 if(screen===COMPLETE||p.complete){showComplete();return}
 enterLab()
}
function rollbackPrinciple(){
 const s=gs(),p=phaseState();if(!s||!p?.principleApplied)return;const profile=s.endingProfile=Object.assign(endingDefaults(),s.endingProfile||{});
 if(p.principleKey==="lineage")profile.attributionProof=Math.max(0,Number(profile.attributionProof||0)-1);
 if(p.principleKey==="broker")profile.allianceStrength=Math.max(0,Number(profile.allianceStrength||0)-1);
 if(p.principleKey==="condition")profile.chainOfCustody=Math.max(0,Number(profile.chainOfCustody||0)-1)
}
function resetPhase3(){const s=gs();if(!s)return;rollbackPrinciple();s.chapter4=s.chapter4||{};s.chapter4.phase3=defaults();["ch4_p3_follow_build_lineage","ch4_p3_follow_broker_habits","ch4_p3_follow_deployment_condition","ch4_p3_palimsest_build_proven","ch4_p3_jakarta_handoff_proven","ch4_p3_bangkok_deployment_supported","ch4_p3_decision_owner_unresolved","ch4_p3_broker_inquiry_authorised"].forEach(key=>delete s.flags?.[key]);EVIDENCE_IDS.forEach(id=>{try{s.found?.delete?.("ch4_p3_"+id)}catch(_){}})}
function primePhase2CompleteForDev(){
 const s=gs();if(!s)return;s.chapter=4;s.chapter4=s.chapter4||{};s.flags=s.flags||{};s.chapter4.phase2=Object.assign({started:true,flightComplete:true,routeCardSeen:true,airportIntroComplete:true,mayaUnlocked:true,mayaUnread:false,officeIntroComplete:true,choiceMade:true,choiceKey:"jurisdiction",choiceApplied:true,legalBriefComplete:true,verificationStarted:true,verificationSteps:["preserve_hash","clone_sandbox","passive_challenge","compare_grammar"],consoleWarnings:0,verificationComplete:true,evidenceCollected:["ch4_verified_rendezvous_token","ch4_broker_response_capture"],closingDialogueComplete:true,complete:true,stage:"complete"},s.chapter4.phase2||{});s.flags.ch4_maya_met=true;s.flags.ch4_token_genuine=true;s.flags.ch4_token_single_use=true;s.flags.ch4_jakarta_broker_route=true;s.flags.ch4_north_role_recognised=true;s.flags.ch4_human_attribution_unresolved=true
}
function startFreshForDev(){stopAudio(true);closeAll();primePhase2CompleteForDev();resetPhase3();startFromPhase2()}

function appendCaseEvidence(){
 const list=$("#caseList"),p=phaseState();if(!list)return;$('[data-ch4-p3-case-section]',list)?.remove();$$('[data-ch4-p3-case-entry]',list).forEach(node=>node.remove());if(!p?.evidenceCollected?.length)return;
 const heading=document.createElement("div");heading.className="case-section-title";heading.dataset.ch4P3CaseSection="1";heading.textContent=tr("CHAPTER IV · PACKET PROVENANCE","บทที่ IV · ที่มาของ PACKET");list.appendChild(heading);
 p.evidenceCollected.forEach(id=>{const data=evidenceData(id);if(!data)return;const row=document.createElement("div");row.className="case-row";row.dataset.ch4P3CaseEntry=id;row.innerHTML=`<b>${data.title}</b><div>${data.body}<br><strong>${data.proof}</strong></div>`;list.appendChild(row)})
}

function installHandoffCapture(){
 if(window.__lwCh4P3Handoff0161)return;window.__lwCh4P3Handoff0161=true;
 document.addEventListener("click",event=>{
  const box=event.target.closest?.("#jakartaVerificationLabDialogue");if(!box)return;
  const s=gs(),p2=s?.chapter4?.phase2;if(!p2?.verificationComplete||p2.closingDialogueComplete||phaseState()?.started)return;
  const speaker=$(".speaker",box)?.textContent?.trim()||"",line=$(".line",box)?.textContent?.trim()||"";
  const finalLine=(line==="Then prove who handled it."||line==="งั้นพิสูจน์ว่าใครเป็นผู้ส่งต่อมัน");
  if(!finalLine||!speaker.includes("Maya"))return;
  event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();
  try{const history=s.history=s.history||[];if(history.at(-1)?.text!==line)history.push({speaker:speaker,text:line,chapter:4,phase:2})}catch(_){}
  p2.closingDialogueComplete=true;p2.complete=true;p2.stage="complete";s.checkpoint="ch4_phase2_complete";save();startFromPhase2()
 },true)
}
function isSavedPhase3(data){return Boolean(data?.chapter4?.phase3?.started||String(data?.checkpoint||"").startsWith("ch4_phase3_")||data?.screen===COMPLETE)}
function isLegacyHandoff(data){return Boolean(data?.screen===LEGACY_COMPLETE&&data?.chapter4?.phase2?.complete)}
function installSaveBridge(){
 if(window.__lwChapter4Phase3SaveBridge0161)return;window.__lwChapter4Phase3SaveBridge0161=true;
 const baseRestore=typeof restore==="function"?restore:window.restore;
 if(typeof baseRestore==="function"){
  const wrapped=function(data){const owns=isSavedPhase3(data)||isLegacyHandoff(data);if(owns)document.body.classList.add("lw-ch4-p3-restoring");const result=baseRestore.apply(this,arguments);if(owns)setTimeout(()=>{if(isLegacyHandoff(data)&&!data?.chapter4?.phase3?.started)startFromPhase2();else resumeFromState(data.screen)},260);return result};
  try{restore=wrapped}catch(_){}window.restore=wrapped;if(window.LastWitnessSaveManager)window.LastWitnessSaveManager.restore=wrapped
 }
 const baseLabel=typeof screenLabel==="function"?screenLabel:window.screenLabel;
 if(typeof baseLabel==="function"){
  const wrapped=function(data){if(data?.screen===COMPLETE)return tr("Chapter IV · Packet Provenance Complete","บทที่ IV · วิเคราะห์ที่มาของ Packet เสร็จสิ้น");if(data?.screen===LAB&&data?.chapter4?.phase3?.started)return tr("Chapter IV · Packet Provenance","บทที่ IV · ที่มาของ Packet");return baseLabel.apply(this,arguments)};
  try{screenLabel=wrapped}catch(_){}window.screenLabel=wrapped
 }
}
function installDevJump(){
 const grid=$("#developerModal .dev-grid");if(!grid)return;let button=grid.querySelector('[data-dev-jump="chapter4PacketProvenance"]');if(!button){button=document.createElement("button");button.className="dev-button";button.type="button";button.dataset.devJump="chapter4PacketProvenance";grid.appendChild(button)}button.textContent=tr("Chapter IV · Packet Provenance","บทที่ IV · ที่มาของ Packet");if(button.dataset.lwBound0161==="1")return;button.dataset.lwBound0161="1";button.addEventListener("click",event=>{event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();$("#developerModal")?.classList.remove("open");startFreshForDev()},true)
}

function inject(){
 if($("#"+COMPLETE))return;const game=$("#game");if(!game)return;
 game.insertAdjacentHTML("beforeend",`
 <div id="ch4P3Principle" class="modal ch4-p3-modal ch4-p3-principle" aria-hidden="true"><div class="modal-card"><div class="eyebrow">BENEDICT · INVESTIGATIVE LINE</div><h3 id="ch4P3PrincipleTitle"></h3><div class="ch4-p3-principle-options">${["lineage","broker","condition"].map(id=>`<button type="button" data-ch4-p3-principle="${id}"></button>`).join("")}</div></div></div>
 <div id="ch4P3Provenance" class="modal ch4-p3-modal ch4-p3-provenance" aria-hidden="true"><div class="modal-card"><header><div><div id="ch4P3ProvenanceEye" class="eyebrow"></div><h3 id="ch4P3ProvenanceTitle"></h3></div><button id="ch4P3ProvenanceClose" class="ghost" type="button">×</button></header><p id="ch4P3ProvenanceHelp" class="ch4-p3-help"></p><div id="ch4P3ProvenanceBody" class="ch4-p3-scroll"></div><div id="ch4P3ProvenanceStatus" class="ch4-p3-status" aria-live="polite"></div><footer><button id="ch4P3ProvenanceReset" class="ghost" type="button"></button><button id="ch4P3ProvenanceConfirm" class="primary" type="button"></button></footer></div></div>
 <div id="ch4P3Evidence" class="modal ch4-p3-modal ch4-p3-evidence" aria-hidden="true"><div class="modal-card"><header><div><div id="ch4P3EvidenceEye" class="eyebrow"></div><h3 id="ch4P3EvidenceTitle"></h3></div><div class="ch4-p3-evidence-head-actions"><span id="ch4P3EvidenceReviewed" class="ch4-p3-reviewed" hidden></span><span id="ch4P3EvidenceCounter"></span><button id="ch4P3EvidenceClose" class="ghost" type="button"></button></div></header><div class="ch4-p3-evidence-scroll"><div class="ch4-p3-evidence-object"><div class="ch4-p3-code" id="ch4P3EvidenceCode"></div><div class="ch4-p3-signal"><i></i><i></i><i></i><i></i><i></i></div></div><p id="ch4P3EvidenceBody"></p><strong id="ch4P3EvidenceProof"></strong></div><footer><button id="ch4P3EvidencePrevious" class="ghost" type="button"></button><button id="ch4P3EvidenceNext" class="ghost" type="button"></button><button id="ch4P3EvidenceCollect" class="primary ch4-p3-evidence-primary" type="button"></button><button id="ch4P3EvidenceContinue" class="primary ch4-p3-evidence-primary" type="button" hidden></button></footer></div></div>
 <div id="ch4P3Matrix" class="modal ch4-p3-modal ch4-p3-matrix" aria-hidden="true"><div class="modal-card"><header><div><div id="ch4P3MatrixEye" class="eyebrow"></div><h3 id="ch4P3MatrixTitle"></h3></div><button id="ch4P3MatrixClose" class="ghost" type="button">×</button></header><p id="ch4P3MatrixHelp" class="ch4-p3-help"></p><div id="ch4P3MatrixBody" class="ch4-p3-scroll"></div><div id="ch4P3MatrixStatus" class="ch4-p3-status" aria-live="polite"></div><footer><button id="ch4P3MatrixReset" class="ghost" type="button"></button><button id="ch4P3MatrixConfirm" class="primary" type="button"></button></footer></div></div>
 <section id="${COMPLETE}" class="screen ch4-p3-complete"><div class="ch4-p3-complete-card"><div id="ch4P3CompleteEye" class="eyebrow"></div><h2 id="ch4P3CompleteTitle"></h2><div class="ch4-p3-rule"></div><p id="ch4P3CompleteBody"></p><div class="ch4-p3-complete-grid"><div><span>SOURCE BUILD</span><b>PALIMPSEST FAMILY</b></div><div><span>BROKER HANDLE</span><b>UNVERIFIED</b></div><div><span>DEPLOYMENT CONDITION</span><b>BANGKOK-LINKED</b></div><div><span>DECISION OWNER</span><b>UNRESOLVED</b></div></div><strong id="ch4P3Next"></strong><button id="ch4P3ReturnTitle" class="primary" type="button"></button></div></section>`);
 bindElements();updateLanguage()
}
function bindElements(){
 $$('[data-ch4-p3-principle]').forEach(button=>button.onclick=()=>choosePrinciple(button.dataset.ch4P3Principle));
 $("#ch4P3ProvenanceClose").onclick=()=>closeProvenance(true);$("#ch4P3ProvenanceReset").onclick=resetProvenance;$("#ch4P3ProvenanceConfirm").onclick=confirmProvenance;
 $("#ch4P3EvidenceClose").onclick=closeEvidence;$("#ch4P3EvidencePrevious").onclick=previousEvidence;$("#ch4P3EvidenceNext").onclick=nextEvidence;$("#ch4P3EvidenceCollect").onclick=collectEvidence;$("#ch4P3EvidenceContinue").onclick=continueToMatrix;$("#ch4P3Evidence").onclick=event=>{if(event.target.id==="ch4P3Evidence")closeEvidence()};
 $("#ch4P3MatrixClose").onclick=()=>closeMatrix(true);$("#ch4P3MatrixReset").onclick=resetMatrix;$("#ch4P3MatrixConfirm").onclick=confirmMatrix;
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
