/* LAST WITNESS - Chapter III / Phase VIII: The Mirror Remembers 0.12.0 */
(function(){
"use strict";
if(window.LastWitnessPhase8?.version==="0.12.0")return;

const BUILD="0.12.0";
const CARD="chapter3Phase8Card";
const SCREEN="chapter3DigitalForensicsLab";
const SCREENS=new Set([CARD,SCREEN]);
const IMAGE="assets/images/chapter-03/phase-08/digital-forensics-lab.png?v=0120";
const AUDIO_BASE="assets/audio/chapter-03/phase-08/";
const CHERYL_BASE="assets/images/chapter-03/phase-08/cheryl/";
const RECEIPT_IDS=["original","reconnect","late_event","permission","header"];
const RECEIPT_CORRECT=["original","reconnect","late_event","permission","header"];
const RECEIPT_DISPLAY=["permission","original","header","reconnect","late_event"];
const TRUST_IDS=["signature","permission","device_time","display_order","operator","credential_identity"];
const TRUST_CORRECT={signature:"proven",permission:"proven",device_time:"claimed",display_order:"derived",operator:"unresolved",credential_identity:"unresolved"};
const WRAPPER_IDS=["digest","queue","relay_failover","operator_scrub","certificate_chain"];
const WRAPPER_CORRECT=["relay_failover","operator_scrub","certificate_chain"];
const EVIDENCE_IDS=["raw_record","fork_comparison","tool_fingerprint","jakarta_fragment"];

const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const gs=()=>{try{return state}catch(_){return window.state||null}};
const thai=()=>gs()?.language==="th"||document.documentElement.lang==="th";
const tr=(en,th)=>thai()?th:en;
const active=()=>$(".screen.active")?.id||gs()?.screen||"";
const clamp=(n,min=0,max=1)=>Math.max(min,Math.min(max,Number(n)||0));
let dialogue=null,internal=false,cardTimer=0,consoleOpen=false;
const fadeFrames=new Map();

function installPortraits(){
 try{
  const current=PORTRAITS["Inspector Cheryl Goh"]||{};
  const expanded=Object.assign({},current,{
   restrained_amusement:CHERYL_BASE+"restrained_amusement.png?v=0120",
   professional_fluster:CHERYL_BASE+"professional_fluster.png?v=0120",
   softened_professional:CHERYL_BASE+"softened_professional.png?v=0120",
   focused_command:CHERYL_BASE+"focused_command.png?v=0120"
  });
  PORTRAITS["Inspector Cheryl Goh"]=expanded;
  PORTRAITS["สารวัตร Cheryl Goh"]=expanded;
 }catch(_){}
}

function ensure(){
 const s=gs();if(!s)return null;s.chapter=3;s.chapter3=s.chapter3||{};s.flags=s.flags||{};
 const p=s.chapter3.phase8=s.chapter3.phase8||{};
 const bools=["started","locationCardSeen","introComplete","accessAuthorized","receiptComplete","receiptDebriefSeen","trustComplete","trustDebriefSeen","wrapperComplete","wrapperDebriefSeen","mirrorPreserved","passiveTraceCaptured","bundleSealed","closingDialogueComplete","complete","chemistryBeatApplied","closingBeatApplied"];
 bools.forEach(k=>{if(typeof p[k]!=="boolean")p[k]=false});
 if(!Array.isArray(p.receiptOrder))p.receiptOrder=[];p.receiptOrder=p.receiptOrder.filter(x=>RECEIPT_IDS.includes(x));
 if(!Number.isFinite(Number(p.receiptAttempts)))p.receiptAttempts=0;
 if(!p.trustAssignments||typeof p.trustAssignments!=="object")p.trustAssignments={};
 if(!Number.isFinite(Number(p.trustAttempts)))p.trustAttempts=0;
 if(!Array.isArray(p.wrapperFindings))p.wrapperFindings=[];p.wrapperFindings=p.wrapperFindings.filter(x=>WRAPPER_IDS.includes(x));
 if(!Number.isFinite(Number(p.wrapperAttempts)))p.wrapperAttempts=0;
 if(!Array.isArray(p.evidenceCollected))p.evidenceCollected=[];p.evidenceCollected=p.evidenceCollected.filter(x=>EVIDENCE_IDS.includes(x));
 if(p.passiveTraceCaptured){p.mirrorPreserved=true;p.wrapperComplete=true}
 if(p.bundleSealed){p.passiveTraceCaptured=true;p.mirrorPreserved=true;p.evidenceCollected=[...EVIDENCE_IDS]}
 if(p.complete){p.introComplete=true;p.accessAuthorized=true;p.receiptComplete=true;p.receiptDebriefSeen=true;p.trustComplete=true;p.trustDebriefSeen=true;p.wrapperComplete=true;p.wrapperDebriefSeen=true;p.mirrorPreserved=true;p.passiveTraceCaptured=true;p.bundleSealed=true;p.closingDialogueComplete=true;p.evidenceCollected=[...EVIDENCE_IDS]}
 if(!p.stage){
  if(p.complete)p.stage="complete";
  else if(p.bundleSealed)p.stage="closing";
  else if(p.passiveTraceCaptured)p.stage="bundle";
  else if(p.wrapperComplete&&p.wrapperDebriefSeen)p.stage="climax";
  else if(p.trustComplete&&p.trustDebriefSeen)p.stage="wrapper";
  else if(p.receiptComplete&&p.receiptDebriefSeen)p.stage="trust";
  else if(p.accessAuthorized)p.stage="receipt";
  else if(p.introComplete)p.stage="access";
  else p.stage="location-card";
 }
 return p;
}

function save(){try{if(typeof autoSave==="function")autoSave()}catch(_){} }
function safeShow(id){internal=true;try{show(id)}finally{internal=false}}
function foundAdd(id){try{const f=gs()?.found;if(typeof f?.add==="function")f.add(id);else if(Array.isArray(f)&&!f.includes(id))f.push(id)}catch(_){} }
function addEvidence(id){const p=ensure();if(!EVIDENCE_IDS.includes(id)||p.evidenceCollected.includes(id))return;p.evidenceCollected.push(id);foundAdd("lab_"+id);save()}
function stopElement(media,reset=false){if(!media)return;try{media.pause();if(reset)media.currentTime=0}catch(_){} }
function stopAudio(reset=false){if(reset){clearTimeout(cardTimer);cardTimer=0}for(const frame of fadeFrames.values())cancelAnimationFrame(frame);fadeFrames.clear();["ch3P8Ambience","ch3P8Score",...Object.keys(SFX).map(k=>SFX[k])].forEach(id=>stopElement($("#"+id),reset))}
function fade(media,target,duration=360){if(!media)return;const old=fadeFrames.get(media);if(old)cancelAnimationFrame(old);const start=clamp(media.volume),end=clamp(target,0,.18),began=performance.now();if(end>0&&media.paused){media.volume=0;media.muted=false;media.play().catch(()=>{})}const step=now=>{const q=Math.min(1,Math.max(0,(now-began)/duration));media.volume=start+(end-start)*q;if(q<1)fadeFrames.set(media,requestAnimationFrame(step));else{fadeFrames.delete(media);if(end===0)media.pause()}};fadeFrames.set(media,requestAnimationFrame(step))}
const SFX={access:"ch3P8SfxAccess",lock:"ch3P8SfxLock",trust:"ch3P8SfxTrust",anomaly:"ch3P8SfxAnomaly",warning:"ch3P8SfxWarning",severed:"ch3P8SfxSevered",snapshot:"ch3P8SfxSnapshot",query:"ch3P8SfxQuery"};
function playCue(key,gain=.28){const s=gs(),a=$("#"+SFX[key]);if(!a||s?.sound===false)return;const level=clamp(Number(s?.sfx??.55)*gain,0,.34);try{a.pause();a.currentTime=0;a.volume=level;a.play().catch(()=>{})}catch(_){} }
function overlaysOpen(){return Boolean($("#ch3P8Access")?.classList.contains("open")||$("#ch3P8Console")?.classList.contains("open"))}
function syncAudio(){
 const s=gs(),enabled=s?.sound!==false&&Number(s?.music??.33)>0,on=active()===SCREEN,p=ensure();
 const ambience=$("#ch3P8Ambience"),score=$("#ch3P8Score");if(ambience)ambience.loop=true;if(score)score.loop=true;
 const dialogueDuck=dialogue?.54:1,overlayDuck=overlaysOpen()?.82:1;
 const analysis=p?.accessAuthorized&&!p?.bundleSealed;
 const ambTarget=enabled&&on?Math.min(.072,Number(s.music??.33)*.18*dialogueDuck*overlayDuck):0;
 const scoreTarget=enabled&&on&&analysis?Math.min(.095,Number(s.music??.33)*.245*dialogueDuck):0;
 fade(ambience,ambTarget,420);fade(score,scoreTarget,analysis?520:300)
}
function portraitSource(speaker,emotion){try{return typeof portrait==="function"?portrait(speaker,emotion||"neutral"):""}catch(_){return""}}
function recordHistory(line){try{const s=gs();s.history=s.history||[];s.history.push({speaker:line[0],text:thai()?line[3]:line[2],chapter:3,phase:8})}catch(_){} }
function renderDialogue(){const box=$("#ch3P8Dialogue");if(!box||!dialogue)return;const line=dialogue.lines[dialogue.i],right=line[0]==="North"||line[0]==="Inspector Cheryl Goh",remote=line[0]==="Adrian Tan",src=portraitSource(line[0],line[1]);box.className="dialogue ch3-p8-dialogue"+(right?" right":"")+(remote?" remote":"");box.innerHTML=`<div class="portrait-wrap">${src?`<img class="portrait" src="${src}" alt="">`:""}</div><div class="dialogue-copy"><div class="speaker">${line[0]}</div><div class="line">${thai()?line[3]:line[2]}</div></div><div class="next">${tr("TAP TO CONTINUE","แตะเพื่อดำเนินต่อ")}</div>`;syncAudio()}
function talk(lines,done){const box=$("#ch3P8Dialogue");if(!box){done?.();return}dialogue={lines,i:0,done};box.classList.remove("hidden");renderDialogue();box.onclick=()=>{if(!dialogue)return;recordHistory(dialogue.lines[dialogue.i]);dialogue.i++;if(dialogue.i>=dialogue.lines.length){const fn=dialogue.done;dialogue=null;box.classList.add("hidden");box.onclick=null;syncAudio();fn?.();save()}else renderDialogue()}}
function talkFromConsole(lines,done){closeConsole(false);talk(lines,()=>{done?.();paint();if(!dialogue&&active()===SCREEN&&!ensure().bundleSealed)openConsole()})}

const D={
 intro:[
  ["Inspector Cheryl Goh","focused_command","The controlled-access order cleared at 3:07. The lab is on isolated power. No outbound services, no removable media, no exceptions.","คำสั่งอนุญาตเข้าถึงแบบควบคุมผ่านเมื่อ 15:07 น. ห้องแล็บใช้ระบบไฟแยก ไม่มีบริการขาออก ไม่มีสื่อบันทึกถอดได้ และไม่มีข้อยกเว้น"],
  ["Farid Rahman","tablet_read","The mirror is a sealed read replica. I can hash what it returns, not alter what it holds.","Mirror เป็นสำเนาอ่านอย่างเดียวที่ถูกปิดผนึก ผมทำ hash สิ่งที่มันส่งออกมาได้ แต่แก้สิ่งที่อยู่ข้างในไม่ได้"],
  ["North","focused","Adrian's locator is authentic. His second key opens the schema layer only, not the evidence record.","Locator ของ Adrian เป็นของจริง กุญแจดอกที่สองเปิดได้เฉพาะชั้น schema ไม่ได้เปิดให้แก้บันทึกหลักฐาน"],
  ["Benedict","thinking","A man who wanted to disappear gave us a door that records everyone who enters.","คนที่อยากหายตัวไปกลับมอบประตูที่บันทึกทุกคนที่ผ่านเข้าไปให้เรา"],
  ["Inspector Cheryl Goh","skeptical","You trust him?","คุณไว้ใจเขาหรือ"],
  ["Benedict","serious","I trust the boundary he chose. Fear makes people hide. Guilt makes them edit.","ผมไว้ใจขอบเขตที่เขาเลือก ความกลัวทำให้คนซ่อนตัว ความรู้สึกผิดทำให้คนแก้บันทึก"],
  ["Inspector Cheryl Goh","restrained_amusement","You make that sound tidy.","คุณพูดเหมือนมันเป็นเรื่องเรียบร้อยดี"],
  ["Benedict","neutral","People are not tidy. Their limits usually are.","คนไม่เคยเรียบร้อย แต่ขอบเขตของพวกเขามักชัดเจน"],
  ["North","side","Should I leave you two alone with the philosophy, or may I get back to the evidence?","จะให้ฉันปล่อยสองคนไว้กับบทปรัชญานี่ หรือฉันกลับไปทำงานกับหลักฐานต่อได้คะ"],
  ["Inspector Cheryl Goh","focused_command","The evidence, North.","หลักฐานค่ะ North"],
  ["Farid Rahman","amused","Authorization channel ready.","ช่องทางอนุมัติพร้อมแล้วครับ"],
  ["Adrian Tan","serious","Key handshake incoming. Do not run an active trace until you preserve the raw receipt order.","กำลังส่ง Key Handshake อย่าเริ่ม Active Trace จนกว่าจะรักษาลำดับรับข้อมูลดิบไว้ก่อน"],
  ["Benedict","thinking","He knows we are listening.","เขารู้ว่าเรากำลังฟัง"],
  ["North","focused","He knows the mirror will remember whether we listened.","เขารู้ว่า Mirror จะจำได้ว่าเราฟังคำเตือนหรือเปล่า"],
  ["Inspector Cheryl Goh","serious","Open the session. Preserve first.","เปิด Session รักษาหลักฐานก่อน"]
 ],
 access:[
  ["Inspector Cheryl Goh","focused_command","SPF authorization accepted.","การอนุมัติของ SPF ผ่านแล้ว"],
  ["Adrian Tan","guarded","Recovery shard responding. It will expire when the mirror closes.","Recovery Shard ตอบสนองแล้ว มันจะหมดอายุเมื่อ Mirror ปิด"],
  ["Farid Rahman","focused","Schema unlocked. Read-only controls remain intact.","ปลดล็อก Schema แล้ว การควบคุมแบบอ่านอย่างเดียวยังคงอยู่"],
  ["North","analyzing","Raw receipt order is visible.","เห็นลำดับรับข้อมูลดิบแล้ว"]
 ],
 receiptDebrief:[
  ["North","focused","The late signed event reached the server at 06:09. Display order moved its claimed device time back beside the 05:58 accession.","Signed Event ที่ส่งล่าช้ามาถึง Server เวลา 06:09 แต่ Display Order ย้ายเวลาที่อุปกรณ์อ้างกลับไปอยู่ข้าง Accession เวลา 05:58"],
  ["Farid Rahman","focused","The mirror confirms the certified chronology was rebuilt after receipt.","Mirror ยืนยันว่า Certified Chronology ถูกสร้างใหม่หลังรับ Event"],
  ["Benedict","serious","The clock did not move. The story did.","นาฬิกาไม่ได้ขยับ เรื่องราวต่างหากที่ถูกย้าย"],
  ["Inspector Cheryl Goh","softened_professional","Keep that sentence for the affidavit.","เก็บประโยคนั้นไว้ใช้ในคำให้การ"],
  ["Benedict","neutral","I was hoping for a plaque.","ผมนึกว่าจะได้ทำเป็นป้ายเสียอีก"],
  ["Inspector Cheryl Goh","restrained_amusement","Do not push your luck.","อย่าได้ใจเกินไป"]
 ],
 trustDebrief:[
  ["North","analyzing","Validation proves the signature and accepted permission. Device time remains a claim.","Validation พิสูจน์ลายเซ็นและสิทธิ์ที่ระบบยอมรับ ส่วนเวลาของอุปกรณ์ยังเป็นเพียงคำกล่าวอ้าง"],
  ["Farid Rahman","focused","Display order is derived from that claim.","Display Order ถูกสร้างต่อจากคำกล่าวอ้างนั้น"],
  ["Inspector Cheryl Goh","serious","And the operator?","แล้วผู้ใช้งานล่ะ"],
  ["Benedict","thinking","Still a person-shaped hole in a machine record.","ยังมีช่องว่างรูปคนอยู่ในบันทึกของเครื่อง"]
 ],
 wrapperDebrief:[
  ["Farid Rahman","alert","This is not Adrian's subscriber template. It is a fork wrapped around it.","นี่ไม่ใช่ Subscriber Template ของ Adrian แต่เป็น Fork ที่ครอบงานของเขาไว้อีกชั้น"],
  ["Adrian Tan","serious","I did not write that retry signature.","ผมไม่ได้เขียน Retry Signature แบบนั้น"],
  ["North","alert","The recovered incident signatures point to one tool-family alias: PALIMPSEST.","ลายเซ็นจากเหตุการณ์ที่กู้คืนได้ชี้ไปยัง Tool Family ที่รู้จักกันใน Alias ว่า PALIMPSEST"],
  ["Inspector Cheryl Goh","serious","Alias, not identity.","Alias ไม่ใช่ตัวตน"],
  ["Farid Rahman","tablet_read","Regional infrastructure nexus: Indonesia. A Jakarta relay and an Indonesian shell certificate sit in the wrapper chain.","จุดเชื่อมโยงโครงสร้างพื้นฐานระดับภูมิภาคอยู่ในอินโดนีเซีย มี Jakarta Relay และ Shell Certificate จากผู้ให้บริการอินโดนีเซียอยู่ใน Wrapper Chain"],
  ["Inspector Cheryl Goh","focused_command","Nexus, not nationality. Infrastructure, not a person.","จุดเชื่อมโยง ไม่ใช่สัญชาติ โครงสร้างพื้นฐาน ไม่ใช่บุคคล"],
  ["Benedict","serious","Someone wanted the system to remember the credential and forget the hand.","ใครบางคนต้องการให้ระบบจำ Credential แต่ลืมมือที่ใช้มัน"],
  ["North","focused","PALIMPSEST.","PALIMPSEST"],
  ["Adrian Tan","guarded","The wrapper has seen your query. Preserve the mirror before you touch the relay.","Wrapper เห็น Query ของพวกคุณแล้ว รักษา Mirror ก่อนแตะ Relay"]
 ],
 closing:[
  ["Farid Rahman","focused","Capture bundle sealed. Four artifacts, hash-verified.","ปิดผนึก Capture Bundle แล้ว หลักฐานสี่รายการผ่านการตรวจ Hash"],
  ["North","analyzing","PALIMPSEST is a tool-family alias. The wrapper touches Jakarta-linked infrastructure. Identity remains unconfirmed.","PALIMPSEST เป็น Alias ของ Tool Family ส่วน Wrapper เชื่อมกับโครงสร้างพื้นฐานที่โยงถึง Jakarta แต่ยังยืนยันตัวตนไม่ได้"],
  ["Inspector Cheryl Goh","serious","That distinction stays in every report.","ความแตกต่างนั้นต้องอยู่ในรายงานทุกฉบับ"],
  ["Adrian Tan","downcast","The fork was built from my architecture.","Fork นี้ถูกสร้างจากสถาปัตยกรรมของผม"],
  ["Benedict","serious","Architecture is inherited. Decisions are not.","สถาปัตยกรรมถูกสืบทอดได้ การตัดสินใจไม่ได้สืบทอดตามกัน"],
  ["Adrian Tan","guarded","You say that like it helps.","คุณพูดเหมือนมันช่วยอะไรได้"],
  ["Benedict","thinking","No. I say it because blame is lazy and evidence is not.","ไม่ ผมพูดเพราะการโยนความผิดเป็นเรื่องมักง่าย แต่หลักฐานไม่ใช่"],
  ["Inspector Cheryl Goh","softened_professional","You read people well.","คุณอ่านคนเก่ง"],
  ["Benedict","neutral","Systems are harder. People at least lie for reasons.","ระบบยากกว่า อย่างน้อยคนก็โกหกเพราะมีเหตุผล"],
  ["Inspector Cheryl Goh","restrained_amusement","And you never do?","แล้วคุณไม่เคยโกหกหรือ"],
  ["Benedict","neutral","Only recreationally.","เฉพาะเวลานึกสนุก"],
  ["North","side","For the record, that answer proves neither access nor identity.","ขอบันทึกไว้ว่า คำตอบนั้นพิสูจน์ไม่ได้ทั้งการเข้าถึงและตัวตนค่ะ"],
  ["Farid Rahman","amused","I am preserving that one.","ผมจะเก็บประโยคนั้นไว้ครับ"],
  ["Inspector Cheryl Goh","focused_command","Do not.","ห้าม"],
  ["North","alert","Wait. The passive fragment carried a callback probe.","เดี๋ยวก่อน Passive Fragment พา Callback Probe กลับมาด้วย"],
  ["Farid Rahman","alert","To whose device?","ไปที่อุปกรณ์ของใคร"],
  ["North","serious","Mine.","ของฉัน"],
  ["Benedict","serious","Disconnect nothing. Photograph first.","อย่าตัดการเชื่อมต่ออะไรทั้งนั้น ถ่ายภาพก่อน"],
  ["Inspector Cheryl Goh","focused_command","Seal the room. Farid, preserve network state. No one touches North's machine.","ปิดผนึกห้อง Farid รักษาสถานะ Network ไว้ ห้ามใครแตะเครื่องของ North"],
  ["North","side","I was planning to object, but apparently my laptop has representation.","ฉันกำลังจะคัดค้าน แต่ดูเหมือนแล็ปท็อปของฉันจะมีทนายแล้ว"],
  ["Benedict","serious","Good. Keep it talking.","ดี ปล่อยให้มันพูดต่อ"]
 ]
};

const E={
 raw_record:{title:{en:"Raw Reconciliation Receipt Record",th:"บันทึกลำดับรับข้อมูลดิบจาก Reconciliation"},description:{en:"The secure mirror preserves server receipt order for the 06:09 transaction. It shows the late signed local event arriving after the original 05:58 accession, before permission resolution and certified-header reconstruction.",th:"Secure Mirror เก็บลำดับการรับของ Server สำหรับ Transaction เวลา 06:09 โดยแสดงว่า Signed Local Event ที่ส่งล่าช้ามาถึงหลัง Accession ต้นฉบับเวลา 05:58 และมาก่อนการ Resolve Permission กับการสร้าง Certified Header ใหม่"},observation:{en:"Raw receipt order proves the chronology was reconstructed after arrival. It does not identify the human operator.",th:"ลำดับรับข้อมูลดิบพิสูจน์ว่า Chronology ถูกสร้างใหม่หลัง Event มาถึง แต่ยังไม่ระบุตัวผู้ใช้งาน"}},
 fork_comparison:{title:{en:"Subscriber Fork Comparison",th:"การเปรียบเทียบ Subscriber Fork"},description:{en:"A side-by-side comparison separates Adrian's original digest-preservation template from an active outer wrapper containing adaptive relay failover, operator-metadata scrubbing and a foreign certificate chain.",th:"การเปรียบเทียบแบบเคียงกันแยก Template รักษา Digest ต้นฉบับของ Adrian ออกจาก Outer Wrapper ที่มี Adaptive Relay Failover การลบ Operator Metadata และ Certificate Chain ภายนอก"},observation:{en:"The active subscriber inherited Adrian's architecture but was modified by another tool layer.",th:"Active Subscriber สืบทอดสถาปัตยกรรมของ Adrian แต่ถูกดัดแปลงด้วย Tool Layer อื่น"}},
 tool_fingerprint:{title:{en:"PALIMPSEST Tool-Family Fingerprint",th:"ลายนิ้วมือ Tool Family ของ PALIMPSEST"},description:{en:"Retry cadence, metadata scrubbing and wrapper construction match a recovered tool family known by the alias PALIMPSEST. The alias identifies a tool lineage, not a person.",th:"จังหวะ Retry การลบ Metadata และโครงสร้าง Wrapper ตรงกับ Tool Family ที่กู้คืนได้ซึ่งใช้ Alias ว่า PALIMPSEST โดย Alias นี้ระบุสายตระกูลเครื่องมือ ไม่ใช่บุคคล"},observation:{en:"Tool-family attribution narrows the method. Human identity remains unconfirmed.",th:"การระบุ Tool Family ทำให้วิธีการแคบลง แต่ยังยืนยันตัวบุคคลไม่ได้"}},
 jakarta_fragment:{title:{en:"Jakarta Relay Fragment",th:"ชิ้นส่วนข้อมูล Jakarta Relay"},description:{en:"A passive route fragment records a Jakarta-linked relay and an Indonesian shell certificate in the wrapper chain before the remote session severs.",th:"Passive Route Fragment บันทึก Relay ที่เชื่อมโยงกับ Jakarta และ Shell Certificate จากผู้ให้บริการอินโดนีเซียใน Wrapper Chain ก่อน Remote Session ถูกตัด"},observation:{en:"This establishes a regional infrastructure nexus. It does not prove nationality, location or identity of the operator.",th:"หลักฐานนี้ยืนยันจุดเชื่อมโยงโครงสร้างพื้นฐานระดับภูมิภาค แต่ไม่พิสูจน์สัญชาติ ตำแหน่ง หรืออัตลักษณ์ของผู้ใช้งาน"}}
};

function copy(){return{
 day:tr("DAY 4","วันที่ 4"),time:"3:20 PM",place:tr("SINGAPORE · SPF DIGITAL FORENSICS LAB","สิงคโปร์ · ห้องปฏิบัติการดิจิทัลฟอเรนสิก SPF"),phase:tr("THE MIRROR REMEMBERS","กระจกเงาไม่เคยลืม"),
 location:tr("SPF Digital Forensics Lab · Secure Reconciliation Facility","ห้องปฏิบัติการดิจิทัลฟอเรนสิก SPF · Secure Reconciliation Facility"),scene:tr("THE MIRROR REMEMBERS","กระจกเงาไม่เคยลืม"),
 objective:objectiveText(),open:tr("OPEN SECURE MIRROR","เปิด SECURE MIRROR"),authorize:tr("AUTHORIZE MIRROR ACCESS","อนุมัติการเข้าถึง MIRROR"),close:tr("Close","ปิด"),
 receiptTitle:tr("1 · RAW RECEIPT ORDER","1 · ลำดับรับข้อมูลดิบ"),receiptHelp:tr("Select events in the order the server actually received them.","เลือก Event ตามลำดับที่ Server รับเข้าจริง"),selected:tr("SELECTED ORDER","ลำดับที่เลือก"),confirm:tr("CONFIRM ORDER","ยืนยันลำดับ"),reset:tr("RESET","เริ่มใหม่"),
 trustTitle:tr("2 · TRUST LAYER MAPPING","2 · การจำแนกชั้นความน่าเชื่อถือ"),trustHelp:tr("Classify what each field actually proves.","จำแนกว่าส่วนข้อมูลแต่ละรายการพิสูจน์อะไรได้จริง"),
 wrapperTitle:tr("3 · WRAPPER TRACE","3 · การตรวจร่องรอย WRAPPER"),wrapperHelp:tr("Select only the markers that do not belong to Adrian's original template.","เลือกเฉพาะ Marker ที่ไม่ใช่ส่วนหนึ่งของ Template ต้นฉบับของ Adrian"),
 analyze:tr("CONFIRM ANALYSIS","ยืนยันการวิเคราะห์"),preserve:tr("PRESERVE RAW MIRROR","รักษา RAW MIRROR"),trace:tr("CAPTURE PASSIVE ROUTE FRAGMENT","บันทึก PASSIVE ROUTE FRAGMENT"),seal:tr("SEAL CAPTURE BUNDLE","ปิดผนึก CAPTURE BUNDLE"),
 accessKicker:tr("DUAL AUTHORIZATION REQUIRED","ต้องได้รับการอนุมัติสองฝ่าย"),spfKey:tr("SPF CONTROL KEY","กุญแจควบคุม SPF"),recoveryKey:tr("ARCHITECT RECOVERY SHARD","ARCHITECT RECOVERY SHARD"),
 proven:tr("PROVEN","พิสูจน์แล้ว"),claimed:tr("CLAIMED","ข้อมูลอ้าง"),derived:tr("DERIVED","ข้อมูลที่สร้างต่อ"),unresolved:tr("UNRESOLVED","ยังไม่คลี่คลาย"),
 consoleKicker:tr("SECURE RECONCILIATION MIRROR · READ ONLY","SECURE RECONCILIATION MIRROR · อ่านอย่างเดียว"),bundleTitle:tr("FORENSIC CAPTURE BUNDLE","FORENSIC CAPTURE BUNDLE"),bundleHelp:tr("Four artifacts are ready for hash verification and Case File registration.","หลักฐานสี่รายการพร้อมตรวจ Hash และลงทะเบียนในแฟ้มคดี"),
 decay:tr("PRIVILEGE DECAY","สิทธิ์กำลังหมดอายุ"),phase9Title:tr("PHASE IX · CALLBACK","เฟส IX · การตอบกลับ"),phase9Text:tr("The raw order is preserved. PALIMPSEST remains an alias, and the Jakarta-linked infrastructure remains a nexus rather than an identity. Before the session closes, a callback probe reaches North's laptop. Phase IX is currently in development; your progress has been saved.","ลำดับดิบถูกเก็บรักษาไว้ PALIMPSEST ยังคงเป็นเพียง Alias และโครงสร้างพื้นฐานที่เชื่อมโยงกับ Jakarta ยังคงเป็นจุดเชื่อมโยง ไม่ใช่ตัวตน ก่อน Session ปิด Callback Probe เข้าถึงแล็ปท็อปของ North ขณะนี้เฟส IX อยู่ระหว่างการพัฒนาและบันทึกความคืบหน้าแล้ว")
}}
function objectiveText(){const p=ensure();if(!p?.introComplete)return tr("Secure lawful access to the reconciliation mirror","ขอสิทธิ์เข้าถึง Reconciliation Mirror อย่างถูกต้อง");if(!p.accessAuthorized)return tr("Complete dual authorization without altering the record","ดำเนินการอนุมัติสองฝ่ายโดยไม่เปลี่ยนแปลงบันทึก");if(!p.receiptComplete)return tr("Reconstruct server receipt order","สร้างลำดับการรับของ Server ใหม่");if(!p.trustComplete)return tr("Separate proof, claims, derivation and uncertainty","แยกสิ่งที่พิสูจน์แล้ว ข้อมูลอ้าง สิ่งที่สร้างต่อ และความไม่แน่นอน");if(!p.wrapperComplete)return tr("Identify the outer wrapper without assigning a human identity","ระบุ Outer Wrapper โดยไม่สรุปเป็นตัวบุคคล");if(!p.bundleSealed)return tr("Preserve the mirror before capturing the passive route fragment","รักษา Mirror ก่อนบันทึก Passive Route Fragment");return tr("Preserve the callback state on North's laptop","รักษาสถานะ Callback บนแล็ปท็อปของ North")}

function receiptData(id){const m={
 original:["05:58:14","ORIGINAL ACCESSION RECEIVED","รับ ORIGINAL ACCESSION"],
 reconnect:["06:08:57","OFFLINE DEVICE RECONNECTED","อุปกรณ์ OFFLINE เชื่อมต่อใหม่"],
 late_event:["06:09:02","SIGNED LOCAL EVENT RECEIVED","รับ SIGNED LOCAL EVENT"],
 permission:["06:09:03","PROFILE 18-07 PERMISSION ACCEPTED","ยอมรับสิทธิ์ PROFILE 18-07"],
 header:["06:09:05","CERTIFIED HEADER REBUILT","สร้าง CERTIFIED HEADER ใหม่"]};const x=m[id];return{time:x[0],label:thai()?x[2]:x[1]}}
function trustText(id){const m={signature:["Cryptographic signature validates","ลายเซ็นเข้ารหัส Validate ผ่าน"],permission:["Evidence Division permission accepted","ระบบยอมรับสิทธิ์ฝ่ายพยานหลักฐาน"],device_time:["Device timestamp: 05:58","เวลาบนอุปกรณ์ 05:58"],display_order:["Certified displayed chronology","ลำดับเวลาที่ Certified Header แสดง"],operator:["Human operator of the 06:09 event","ผู้ใช้งานมนุษย์ของ Event เวลา 06:09"],credential_identity:["Identity behind Profile 18-07","ตัวตนเบื้องหลัง Profile 18-07"]};return thai()?m[id][1]:m[id][0]}
function wrapperText(id){const m={digest:["Digest preservation","Preserves signed digest","รักษา Digest","รักษา Signed Digest"],queue:["Receipt queue handling","Read-only mirror queue","การจัดการ Receipt Queue","Mirror Queue แบบอ่านอย่างเดียว"],relay_failover:["Retry behavior","Adaptive relay failover","พฤติกรรม Retry","Adaptive Relay Failover"],operator_scrub:["Operator metadata","Scrubbed after dispatch","Operator Metadata","ถูกลบหลัง Dispatch"],certificate_chain:["Certificate wrapper","Jakarta relay · IDN shell chain","Certificate Wrapper","Jakarta Relay · IDN Shell Chain"]};const x=m[id];return{left:thai()?x[2]:x[0],right:thai()?x[3]:x[1]}}

function inject(){if($("#"+CARD))return;const game=$("#game");if(!game)return;game.insertAdjacentHTML("beforeend",`
<section id="${CARD}" class="screen ch3-p8-card"><div class="chapter-card"><div id="ch3P8Day" class="eyebrow"></div><div id="ch3P8Time" class="ch3-p8-time"></div><h2 id="ch3P8Place"></h2><div class="ch3-p8-rule"></div><p id="ch3P8Phase"></p></div></section>
<section id="${SCREEN}" class="screen ch3-p8-scene"><img class="scene" src="${IMAGE}" alt="Singapore digital forensics lab and secure server facility"><div class="overlay ch3-p8-overlay"></div><div class="topbar"><span id="ch3P8Location"></span><div class="hud"><button class="icon ch3-p8-save" type="button">💾</button><button class="icon ch3-p8-menu" type="button">☰</button></div></div><div id="ch3P8Scene" class="ch3-p8-label"></div><div id="ch3P8Objective" class="ch3-p8-objective"></div><div id="ch3P8Dialogue" class="dialogue ch3-p8-dialogue hidden"></div><button id="ch3P8Open" class="primary ch3-p8-open" type="button" hidden></button><div class="ch3-p8-progress"><span id="ch3P8ProgressText">0%</span><div><i id="ch3P8ProgressFill"></i></div></div>
<audio id="ch3P8Ambience" preload="auto" loop><source src="${AUDIO_BASE}secure-mirror-lab-loop.webm?v=0120" type="audio/webm"><source src="${AUDIO_BASE}secure-mirror-lab-loop.mp3?v=0120" type="audio/mpeg"></audio>
<audio id="ch3P8Score" preload="auto" loop><source src="${AUDIO_BASE}mirror-analysis-score-loop.webm?v=0120" type="audio/webm"><source src="${AUDIO_BASE}mirror-analysis-score-loop.mp3?v=0120" type="audio/mpeg"></audio>
<audio id="ch3P8SfxAccess" preload="auto" src="${AUDIO_BASE}sfx/mirror-access-granted.wav?v=0120"></audio><audio id="ch3P8SfxLock" preload="auto" src="${AUDIO_BASE}sfx/event-lock.wav?v=0120"></audio><audio id="ch3P8SfxTrust" preload="auto" src="${AUDIO_BASE}sfx/trust-layer-match.wav?v=0120"></audio><audio id="ch3P8SfxAnomaly" preload="auto" src="${AUDIO_BASE}sfx/wrapper-anomaly-reveal.wav?v=0120"></audio><audio id="ch3P8SfxWarning" preload="auto" src="${AUDIO_BASE}sfx/privilege-decay-warning.wav?v=0120"></audio><audio id="ch3P8SfxSevered" preload="auto" src="${AUDIO_BASE}sfx/session-severed.wav?v=0120"></audio><audio id="ch3P8SfxSnapshot" preload="auto" src="${AUDIO_BASE}sfx/forensic-snapshot-captured.wav?v=0120"></audio><audio id="ch3P8SfxQuery" preload="auto" src="${AUDIO_BASE}sfx/mirror-query-accepted.wav?v=0120"></audio></section>
<div id="ch3P8Access" class="modal ch3-p8-access" aria-hidden="true"><div class="modal-card"><div id="ch3P8AccessKicker" class="eyebrow"></div><h3>SECURE MIRROR M-06:09</h3><div class="ch3-p8-key-grid"><div><i>01</i><b id="ch3P8SpfKey"></b><span>READY</span></div><div><i>02</i><b id="ch3P8RecoveryKey"></b><span>HANDSHAKE VERIFIED</span></div></div><p>READ ONLY · CHAIN OF CUSTODY ACTIVE</p><button id="ch3P8Authorize" class="primary" type="button"></button></div></div>
<div id="ch3P8Console" class="modal ch3-p8-console" aria-hidden="true"><div class="modal-card"><header><div><div id="ch3P8ConsoleKicker" class="eyebrow"></div><h3 id="ch3P8ConsoleTitle"></h3></div><button id="ch3P8ConsoleClose" class="ghost" type="button">×</button></header><div class="ch3-p8-stepper"><i data-p8-step="receipt">1</i><i data-p8-step="trust">2</i><i data-p8-step="wrapper">3</i><i data-p8-step="capture">4</i></div><div id="ch3P8ConsoleBody"></div><div id="ch3P8Status" class="ch3-p8-status" aria-live="polite"></div></div></div>`);bindElements();updateLanguage();paint()}

function progress(){const p=ensure();let n=5;if(p.introComplete)n=18;if(p.accessAuthorized)n=28;if(p.receiptComplete)n=46;if(p.trustComplete)n=62;if(p.wrapperComplete)n=78;if(p.mirrorPreserved)n=86;if(p.passiveTraceCaptured)n=94;if(p.complete)n=100;$("#ch3P8ProgressText").textContent=n+"%";$("#ch3P8ProgressFill").style.width=n+"%"}
function currentStage(){const p=ensure();if(p.passiveTraceCaptured)return"capture";if(p.wrapperComplete&&p.wrapperDebriefSeen)return"capture";if(p.trustComplete&&p.trustDebriefSeen)return"wrapper";if(p.receiptComplete&&p.receiptDebriefSeen)return"trust";return"receipt"}
function updateLanguage(){const c=copy(),map={ch3P8Day:c.day,ch3P8Time:c.time,ch3P8Place:c.place,ch3P8Phase:c.phase,ch3P8Location:c.location,ch3P8Scene:c.scene,ch3P8Objective:c.objective,ch3P8Open:c.open,ch3P8AccessKicker:c.accessKicker,ch3P8SpfKey:c.spfKey,ch3P8RecoveryKey:c.recoveryKey,ch3P8Authorize:c.authorize,ch3P8ConsoleKicker:c.consoleKicker};Object.entries(map).forEach(([id,v])=>{const n=$("#"+id);if(n)n.textContent=v});if(dialogue)renderDialogue();if(consoleOpen)renderConsole();paint()}
function paint(){const p=ensure();progress();const c=copy();if($("#ch3P8Objective"))$("#ch3P8Objective").textContent=objectiveText();const open=$("#ch3P8Open");if(open){const ready=p.introComplete&&!p.bundleSealed&&!dialogue;open.hidden=!ready;open.textContent=p.accessAuthorized?c.open:c.authorize}syncAudio()}

function openAccess(){if(dialogue||ensure().accessAuthorized)return;const m=$("#ch3P8Access");m.classList.add("open");m.setAttribute("aria-hidden","false");syncAudio()}
function closeAccess(){const m=$("#ch3P8Access");m.classList.remove("open");m.setAttribute("aria-hidden","true");syncAudio()}
function authorize(){const p=ensure();if(p.accessAuthorized)return;p.accessAuthorized=true;p.stage="receipt";gs().checkpoint="ch3_phase8_receipt";closeAccess();playCue("access",.32);save();talk(D.access,()=>{paint();openConsole()})}
function openConsole(){const p=ensure();if(!p.accessAuthorized||dialogue||p.bundleSealed)return;consoleOpen=true;const m=$("#ch3P8Console");m.classList.add("open");m.setAttribute("aria-hidden","false");renderConsole();syncAudio()}
function closeConsole(user=true){consoleOpen=false;const m=$("#ch3P8Console");m?.classList.remove("open");m?.setAttribute("aria-hidden","true");if(user)paint();syncAudio()}
function status(text="",kind=""){const n=$("#ch3P8Status");if(!n)return;n.textContent=text;n.className="ch3-p8-status"+(kind?" "+kind:"")}
function renderStepper(){const stage=currentStage(),order=["receipt","trust","wrapper","capture"],index=order.indexOf(stage);$$('[data-p8-step]').forEach((n,i)=>{n.classList.toggle("active",i===index);n.classList.toggle("done",i<index)})}
function renderConsole(){const p=ensure(),c=copy(),body=$("#ch3P8ConsoleBody"),title=$("#ch3P8ConsoleTitle");if(!body||!title)return;status();renderStepper();if(!p.receiptComplete||!p.receiptDebriefSeen){title.textContent=c.receiptTitle;renderReceipt(body,c);return}if(!p.trustComplete||!p.trustDebriefSeen){title.textContent=c.trustTitle;renderTrust(body,c);return}if(!p.wrapperComplete||!p.wrapperDebriefSeen){title.textContent=c.wrapperTitle;renderWrapper(body,c);return}title.textContent=c.bundleTitle;renderCapture(body,c)}

function renderReceipt(body,c){const p=ensure();body.innerHTML=`<p class="ch3-p8-help">${c.receiptHelp}</p><div class="ch3-p8-display-banner"><b>CERTIFIED DISPLAY</b><span>COLLECTION · 05:58</span></div><div class="ch3-p8-receipt-grid">${RECEIPT_DISPLAY.map(id=>{const x=receiptData(id),chosen=p.receiptOrder.includes(id);return`<button type="button" data-p8-receipt="${id}" class="${chosen?"selected":""}" ${chosen?"disabled":""}><time>${x.time}</time><span>${x.label}</span></button>`}).join("")}</div><div class="ch3-p8-order"><b>${c.selected}</b><ol>${p.receiptOrder.map(id=>{const x=receiptData(id);return`<li data-p8-remove="${id}"><time>${x.time}</time><span>${x.label}</span></li>`}).join("")||`<li class="empty">${tr("Tap an event to place it","แตะ Event เพื่อจัดลำดับ")}</li>`}</ol></div><div class="ch3-p8-actions"><button id="ch3P8ReceiptConfirm" class="primary" type="button">${c.confirm}</button><button id="ch3P8ReceiptReset" class="ghost" type="button">${c.reset}</button></div>`;$$('[data-p8-receipt]',body).forEach(b=>b.onclick=()=>{p.receiptOrder.push(b.dataset.p8Receipt);playCue("lock",.22);renderConsole();save()});$$('[data-p8-remove]',body).forEach(li=>li.onclick=()=>{p.receiptOrder=p.receiptOrder.filter(x=>x!==li.dataset.p8Remove);renderConsole();save()});$("#ch3P8ReceiptReset").onclick=()=>{p.receiptOrder=[];renderConsole();save()};$("#ch3P8ReceiptConfirm").onclick=confirmReceipt}
function confirmReceipt(){const p=ensure();if(p.receiptOrder.length!==RECEIPT_CORRECT.length){status(tr("Place all five events before confirming.","จัด Event ให้ครบทั้งห้ารายการก่อนยืนยัน"),"error");return}if(p.receiptOrder.some((x,i)=>x!==RECEIPT_CORRECT[i])){p.receiptAttempts++;status(tr("That sequence follows displayed chronology, not server receipt order.","ลำดับนี้ยังเดินตาม Chronology ที่แสดง ไม่ใช่ลำดับการรับของ Server"),"error");save();return}p.receiptComplete=true;p.stage="receipt-debrief";gs().checkpoint="ch3_phase8_receipt_complete";playCue("snapshot",.24);save();talkFromConsole(D.receiptDebrief,()=>{p.receiptDebriefSeen=true;p.stage="trust";applyChemistryBeat();gs().checkpoint="ch3_phase8_trust";save()})}
function applyChemistryBeat(){const p=ensure();if(p.chemistryBeatApplied)return;p.chemistryBeatApplied=true;const r=gs().relationships=gs().relationships||{};const ch=r["Cheryl Goh"]=r["Cheryl Goh"]||{trust:48,respect:68,attachment:12,suspicion:18};ch.respect=Math.min(100,Number(ch.respect||0)+4);ch.attachment=Math.min(100,Number(ch.attachment||0)+2)}

function renderTrust(body,c){const p=ensure(),labels={proven:c.proven,claimed:c.claimed,derived:c.derived,unresolved:c.unresolved};body.innerHTML=`<p class="ch3-p8-help">${c.trustHelp}</p><div class="ch3-p8-trust-grid">${TRUST_IDS.map(id=>`<div class="ch3-p8-trust-row" data-p8-trust-row="${id}"><p>${trustText(id)}</p><div>${Object.keys(labels).map(k=>`<button type="button" data-p8-trust="${k}" class="${p.trustAssignments[id]===k?"selected":""}">${labels[k]}</button>`).join("")}</div></div>`).join("")}</div><div class="ch3-p8-actions"><button id="ch3P8TrustConfirm" class="primary" type="button">${c.analyze}</button><button id="ch3P8TrustReset" class="ghost" type="button">${c.reset}</button></div>`;$$('[data-p8-trust]',body).forEach(b=>b.onclick=()=>{const id=b.closest('[data-p8-trust-row]').dataset.p8TrustRow;p.trustAssignments[id]=b.dataset.p8Trust;playCue("trust",.14);renderConsole();save()});$("#ch3P8TrustReset").onclick=()=>{p.trustAssignments={};renderConsole();save()};$("#ch3P8TrustConfirm").onclick=confirmTrust}
function confirmTrust(){const p=ensure();if(TRUST_IDS.some(id=>!p.trustAssignments[id])){status(tr("Classify every field first.","จำแนกข้อมูลทุกส่วนก่อน"),"error");return}if(TRUST_IDS.some(id=>p.trustAssignments[id]!==TRUST_CORRECT[id])){p.trustAttempts++;status(tr("At least one label claims more than the record proves.","มีอย่างน้อยหนึ่งป้ายที่สรุปเกินกว่าบันทึกพิสูจน์ได้"),"error");save();return}p.trustComplete=true;p.stage="trust-debrief";gs().checkpoint="ch3_phase8_trust_complete";try{window.LastWitnessAudioCue?.playPuzzleSuccess?.()}catch(_){playCue("trust",.28)}save();talkFromConsole(D.trustDebrief,()=>{p.trustDebriefSeen=true;p.stage="wrapper";gs().checkpoint="ch3_phase8_wrapper";save()})}

function renderWrapper(body,c){const p=ensure();body.innerHTML=`<p class="ch3-p8-help">${c.wrapperHelp}</p><div class="ch3-p8-compare-head"><span>ADRIAN TEMPLATE</span><span>ACTIVE SUBSCRIBER</span></div><div class="ch3-p8-wrapper-grid">${WRAPPER_IDS.map(id=>{const x=wrapperText(id),selected=p.wrapperFindings.includes(id);return`<button type="button" data-p8-wrapper="${id}" class="${selected?"selected":""}"><span>${x.left}</span><i></i><span>${x.right}</span></button>`}).join("")}</div><div class="ch3-p8-actions"><button id="ch3P8WrapperConfirm" class="primary" type="button">${c.analyze}</button><button id="ch3P8WrapperReset" class="ghost" type="button">${c.reset}</button></div>`;$$('[data-p8-wrapper]',body).forEach(b=>b.onclick=()=>{const id=b.dataset.p8Wrapper;p.wrapperFindings=p.wrapperFindings.includes(id)?p.wrapperFindings.filter(x=>x!==id):[...p.wrapperFindings,id];renderConsole();save()});$("#ch3P8WrapperReset").onclick=()=>{p.wrapperFindings=[];renderConsole();save()};$("#ch3P8WrapperConfirm").onclick=confirmWrapper}
function confirmWrapper(){const p=ensure(),selected=[...p.wrapperFindings].sort(),correct=[...WRAPPER_CORRECT].sort();if(selected.length!==correct.length||selected.some((x,i)=>x!==correct[i])){p.wrapperAttempts++;status(tr("Select the three markers introduced by the outer wrapper.","เลือก Marker สามรายการที่ Outer Wrapper เพิ่มเข้ามา"),"error");save();return}p.wrapperComplete=true;p.stage="wrapper-debrief";gs().checkpoint="ch3_phase8_wrapper_complete";playCue("anomaly",.28);save();talkFromConsole(D.wrapperDebrief,()=>{p.wrapperDebriefSeen=true;p.stage="climax";gs().checkpoint="ch3_phase8_climax";playCue("warning",.23);save()})}

function renderCapture(body,c){const p=ensure();if(p.passiveTraceCaptured){body.innerHTML=`<p class="ch3-p8-help">${c.bundleHelp}</p><div class="ch3-p8-bundle">${EVIDENCE_IDS.map(id=>{const e=E[id],k=thai()?"th":"en";return`<article><i>HASH VERIFIED</i><b>${e.title[k]}</b><p>${e.observation[k]}</p></article>`}).join("")}</div><button id="ch3P8Seal" class="primary ch3-p8-seal" type="button">${c.seal}</button>`;$("#ch3P8Seal").onclick=sealBundle;return}const meter=p.mirrorPreserved?18:42;body.innerHTML=`<div class="ch3-p8-decay"><div><b>${c.decay}</b><span>${p.mirrorPreserved?"ROUTE WINDOW · PASSIVE ONLY":"MIRROR WRITE LOCK · AT RISK"}</span></div><meter min="0" max="100" value="${meter}"></meter></div><div class="ch3-p8-pal"><small>TOOL FAMILY MATCH</small><strong>PALIMPSEST</strong><dl><dt>IDENTITY</dt><dd>UNCONFIRMED</dd><dt>REGIONAL NEXUS</dt><dd>INDONESIA</dd><dt>RELAY FRAGMENT</dt><dd>JAKARTA-LINKED</dd></dl></div><div class="ch3-p8-capture-actions"><button id="ch3P8Preserve" class="primary" type="button" ${p.mirrorPreserved?"disabled":""}>${p.mirrorPreserved?tr("RAW MIRROR PRESERVED","รักษา RAW MIRROR แล้ว"):c.preserve}</button><button id="ch3P8Trace" class="ghost" type="button" ${p.mirrorPreserved?"":"disabled"}>${c.trace}</button></div>`;$("#ch3P8Preserve").onclick=preserveMirror;$("#ch3P8Trace").onclick=captureTrace}
function preserveMirror(){const p=ensure();if(p.mirrorPreserved)return;p.mirrorPreserved=true;p.stage="climax-preserved";addEvidence("raw_record");addEvidence("fork_comparison");addEvidence("tool_fingerprint");gs().checkpoint="ch3_phase8_mirror_preserved";playCue("snapshot",.3);renderConsole();save()}
function captureTrace(){const p=ensure();if(!p.mirrorPreserved){status(tr("Preserve the raw mirror before tracing the route.","รักษา Raw Mirror ก่อนตรวจ Route"),"error");return}if(p.passiveTraceCaptured)return;p.passiveTraceCaptured=true;p.stage="bundle";addEvidence("jakarta_fragment");gs().checkpoint="ch3_phase8_bundle";playCue("query",.24);setTimeout(()=>playCue("severed",.24),320);renderConsole();save()}
function sealBundle(){const p=ensure();if(!p.passiveTraceCaptured||p.bundleSealed)return;p.bundleSealed=true;p.stage="closing";gs().checkpoint="ch3_phase8_closing";playCue("snapshot",.24);closeConsole(false);save();startClosing()}

function startClosing(){const p=ensure();if(p.closingDialogueComplete||p.complete)return;talk(D.closing,completePhase8)}
function applyClosingBeat(){const p=ensure();if(p.closingBeatApplied)return;p.closingBeatApplied=true;const r=gs().relationships=gs().relationships||{};const ch=r["Cheryl Goh"]=r["Cheryl Goh"]||{trust:48,respect:68,attachment:12,suspicion:18};ch.respect=Math.min(100,Number(ch.respect||0)+3);ch.attachment=Math.min(100,Number(ch.attachment||0)+3)}
function completePhase8(){const p=ensure();p.closingDialogueComplete=true;p.complete=true;p.stage="complete";applyClosingBeat();gs().checkpoint="ch3_phase8_complete";progress();save();showPhase9Fallback()}
function showPhase9Fallback(){stopAudio(true);if(window.LastWitnessPhase9?.startFromPhase8){window.LastWitnessPhase9.startFromPhase8();return}const s=gs();if(!s)return;s.screen="chapter3Wip";const c=copy(),title=$("#chapter3WipTitle"),text=$("#chapter3WipText"),btn=$("#chapter3WipReturnTitle");if(title)title.textContent=c.phase9Title;if(text)text.textContent=c.phase9Text;if(btn)btn.textContent=tr("Return to Title","กลับหน้าแรก");safeShow("chapter3Wip")}

function scheduleEnter(delay){clearTimeout(cardTimer);cardTimer=setTimeout(()=>{cardTimer=0;enter()},delay)}
function enter(){inject();installPortraits();const p=ensure();gs().screen=SCREEN;safeShow(SCREEN);updateLanguage();syncAudio();if(p.complete){showPhase9Fallback();return}if(p.bundleSealed&&!p.closingDialogueComplete){startClosing();return}if(!p.introComplete){p.stage="intro";gs().checkpoint="ch3_phase8_intro";paint();talk(D.intro,()=>{p.introComplete=true;p.stage="access";gs().checkpoint="ch3_phase8_access";paint();save();openAccess()});return}if(!p.accessAuthorized){p.stage="access";paint();setTimeout(openAccess,0);return}if(p.receiptComplete&&!p.receiptDebriefSeen){talk(D.receiptDebrief,()=>{p.receiptDebriefSeen=true;p.stage="trust";applyChemistryBeat();save();openConsole()});return}if(p.trustComplete&&!p.trustDebriefSeen){talk(D.trustDebrief,()=>{p.trustDebriefSeen=true;p.stage="wrapper";save();openConsole()});return}if(p.wrapperComplete&&!p.wrapperDebriefSeen){talk(D.wrapperDebrief,()=>{p.wrapperDebriefSeen=true;p.stage="climax";playCue("warning",.23);save();openConsole()});return}paint();setTimeout(openConsole,0)}
function startFromPhase7(){const p=ensure();if(p.complete){showPhase9Fallback();return}if(p.started&&active()===CARD&&cardTimer)return;stopAudio(true);p.started=true;p.locationCardSeen=true;p.stage="location-card";gs().screen=CARD;gs().checkpoint="ch3_phase8_location_card";safeShow(CARD);updateLanguage();scheduleEnter(2850);save()}
function startFreshForDev(){const s=gs();if(!s)return;s.chapter3=s.chapter3||{};s.chapter3.phase8={started:false,locationCardSeen:false,introComplete:false,accessAuthorized:false,receiptOrder:[],receiptAttempts:0,receiptComplete:false,receiptDebriefSeen:false,trustAssignments:{},trustAttempts:0,trustComplete:false,trustDebriefSeen:false,wrapperFindings:[],wrapperAttempts:0,wrapperComplete:false,wrapperDebriefSeen:false,mirrorPreserved:false,passiveTraceCaptured:false,bundleSealed:false,evidenceCollected:[],closingDialogueComplete:false,complete:false,chemistryBeatApplied:false,closingBeatApplied:false,stage:"location-card"};startFromPhase7()}
function resume(screen){inject();installPortraits();updateLanguage();if(screen===CARD){safeShow(CARD);scheduleEnter(1600);return}if(screen===SCREEN){enter();return}if(screen==="chapter3Wip"&&ensure()?.complete)showPhase9Fallback();else if(screen==="chapter3Wip"&&gs()?.chapter3?.phase7?.complete)startFromPhase7()}
function appendCase(){const list=$("#caseList"),p=ensure();if(!list||!p.evidenceCollected.length)return;$("[data-p8-case-section]",list)?.remove();$$('[data-p8-case-entry]',list).forEach(n=>n.remove());const h=document.createElement("div");h.className="case-section-title";h.dataset.p8CaseSection="1";h.textContent=tr("CHAPTER III · DIGITAL FORENSICS LAB","บทที่ III · ห้องปฏิบัติการดิจิทัลฟอเรนสิก");list.appendChild(h);p.evidenceCollected.forEach(id=>{const e=E[id],k=thai()?"th":"en",row=document.createElement("div");row.className="case-row";row.dataset.p8CaseEntry=id;row.innerHTML=`<b>${e.title[k]}</b><div>${e.description[k]}</div>`;list.appendChild(row)})}
function bindElements(){$("#ch3P8Open").onclick=()=>ensure().accessAuthorized?openConsole():openAccess();$("#ch3P8Authorize").onclick=authorize;$("#ch3P8Access").onclick=e=>{if(e.target.id==="ch3P8Access")closeAccess()};$("#ch3P8ConsoleClose").onclick=()=>closeConsole(true);$("#ch3P8Console").onclick=e=>{if(e.target.id==="ch3P8Console")closeConsole(true)};$(".ch3-p8-save").onclick=()=>{try{manualSave()}catch(_){}};$(".ch3-p8-menu").onclick=()=>$("#drawer")?.classList.add("open")}
function installBridge(){const api=window.LastWitnessChapter3;if(api&&!api.__lwPhase80120){const old=api.resumeFromState;api.resumeFromState=function(screen){const result=typeof old==="function"?old.apply(this,arguments):undefined;if(internal)return result;if(SCREENS.has(screen)||(screen==="chapter3Wip"&&(ensure()?.complete||gs()?.chapter3?.phase7?.complete))){setTimeout(()=>resume(screen),0);return result}if(screen==="chapter3HawkerCentre"&&gs()?.chapter3?.phase7?.complete&&!ensure().started)setTimeout(startFromPhase7,0);return result};api.__lwPhase80120=true}window.LastWitnessPhase8={startFromPhase7,startFreshForDev,resumeFromState:resume,stopAudio,showPhase9Fallback,version:BUILD}}
function bind(){installPortraits();inject();installBridge();updateLanguage();$("#caseButton")?.addEventListener("click",()=>setTimeout(appendCase,0),true);$("#soundToggle")?.addEventListener("change",syncAudio,true);$("#musicRange")?.addEventListener("input",syncAudio,true);$("#sfxRange")?.addEventListener("input",()=>{},true);document.addEventListener("click",e=>{if(e.target.closest?.("[data-lang]"))setTimeout(updateLanguage,0)},true);document.addEventListener("visibilitychange",()=>{if(document.hidden){if(active()===CARD){clearTimeout(cardTimer);cardTimer=0}stopAudio(false)}else{if(active()===CARD&&!cardTimer)scheduleEnter(650);syncAudio()}});const label=$("#settingsVersion");if(label)label.textContent=`LAST WITNESS · BUILD ${BUILD}`;if(window.LastWitnessSaveManager)window.LastWitnessSaveManager.version=BUILD;const screen=active();if(SCREENS.has(screen)||(screen==="chapter3Wip"&&(ensure()?.complete||gs()?.chapter3?.phase7?.complete)))setTimeout(()=>resume(screen),0)}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",bind,{once:true});else bind();
})();
