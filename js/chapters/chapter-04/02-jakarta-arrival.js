/* LAST WITNESS — Chapter IV / Phase II: JAKARTA ARRIVAL 0.14.2 */
(function(){
"use strict";
if(window.LastWitnessChapter4Phase2?.version==="0.14.2")return;

const BUILD="0.14.2";
const FLIGHT="jakartaFlight";
const AIRPORT="jakartaAirport";
const OFFICE="jakartaCybercrimeOffice";
const LAB="jakartaVerificationLab";
const COMPLETE="jakartaPhase2Complete";
const SCREENS=new Set([FLIGHT,AIRPORT,OFFICE,LAB,COMPLETE]);
const BASE="assets/images/chapter-04/phase-02/";
const MAYA_BASE=BASE+"maya/";
const AUDIO_BASE="assets/audio/chapter-04/phase-02/";
const TAKEOFF_VIDEO="assets/video/chapter-03/phase-02/airplane-takeoff.mp4?v=074";
const TAKEOFF_POSTER="assets/video/chapter-03/phase-02/airplane-takeoff-poster.jpg?v=074";
const VERIFY_ORDER=["preserve_hash","clone_sandbox","passive_challenge","compare_grammar"];

const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const gs=()=>{try{return state}catch(_){return window.state||null}};
const thai=()=>gs()?.language==="th"||document.documentElement.lang==="th";
const tr=(en,th)=>thai()?th:en;
const clamp=(n,min=0,max=1)=>Math.max(min,Math.min(max,Number(n)||0));
const clone=v=>JSON.parse(JSON.stringify(v));
const active=()=>$(".screen.active")?.id||gs()?.screen||"";
let dialogue=null,choiceOpen=false,consoleOpen=false,internalRouting=false;
let flightTimer=0,transitionTimer=0;
const fadeFrames=new Map();
let journalObserver=null,screenObserver=null;

function endingDefaults(){return{
 evidenceIntegrity:0,attributionProof:0,chainOfCustody:0,witnessProtection:0,northSafety:0,allianceStrength:0,publicRecordControl:0,elenaSuspicion:0,
 accusedParty:"",witnessStatus:"unknown",northStatus:"active",adrianStatus:"unresolved",armanStatus:"unresolved"
}}
function ensureEndingProfile(){const s=gs();if(!s)return endingDefaults();s.endingProfile=Object.assign(endingDefaults(),s.endingProfile||{});return s.endingProfile}
function ensure(){
 const s=gs();if(!s)return null;s.chapter=4;s.chapter4=s.chapter4||{};s.flags=s.flags||{};s.relationships=s.relationships||{};ensureEndingProfile();
 const p=s.chapter4.phase2=s.chapter4.phase2||{};
 ["started","flightComplete","routeCardSeen","airportIntroComplete","mayaUnlocked","officeIntroComplete","choiceMade","choiceApplied","legalBriefComplete","verificationStarted","verificationComplete","closingDialogueComplete","complete"].forEach(k=>{if(typeof p[k]!=="boolean")p[k]=false});
 if(typeof p.choiceKey!=="string")p.choiceKey="";
 if(!Array.isArray(p.verificationSteps))p.verificationSteps=[];
 p.verificationSteps=p.verificationSteps.filter(id=>VERIFY_ORDER.includes(id));
 if(!Array.isArray(p.evidenceCollected))p.evidenceCollected=[];
 if(!Number.isFinite(Number(p.consoleWarnings)))p.consoleWarnings=0;
 if(typeof p.mayaUnread!=="boolean")p.mayaUnread=false;
 if(p.complete){p.started=true;p.flightComplete=true;p.routeCardSeen=true;p.airportIntroComplete=true;p.mayaUnlocked=true;p.officeIntroComplete=true;p.choiceMade=true;p.choiceApplied=true;p.legalBriefComplete=true;p.verificationStarted=true;p.verificationSteps=[...VERIFY_ORDER];p.verificationComplete=true;p.closingDialogueComplete=true;p.stage="complete"}
 if(!p.stage){
  if(p.complete)p.stage="complete";
  else if(p.verificationComplete)p.stage="debrief";
  else if(p.verificationStarted)p.stage="verification";
  else if(p.legalBriefComplete)p.stage="lab";
  else if(p.officeIntroComplete)p.stage="choice";
  else if(p.airportIntroComplete)p.stage="office";
  else if(p.routeCardSeen)p.stage="airport";
  else p.stage="flight"
 }
 return p
}
function save(){try{if(typeof autoSave==="function")autoSave()}catch(_){} }
function setCheckpoint(value){const s=gs();if(s)s.checkpoint=value;save()}
function stopElement(media,reset=false){if(!media)return;try{media.pause();if(reset)media.currentTime=0}catch(_){} }
function fade(media,target,duration=430){
 if(!media)return;const previous=fadeFrames.get(media);if(previous)cancelAnimationFrame(previous);
 const start=clamp(media.volume),end=clamp(target,0,.9),began=performance.now();
 if(end>0&&media.paused){media.volume=0;media.muted=false;media.play().catch(()=>{})}
 const step=now=>{const q=Math.max(0,Math.min(1,(now-began)/duration)),smooth=q*q*(3-2*q);media.volume=start+(end-start)*smooth;if(q<1)fadeFrames.set(media,requestAnimationFrame(step));else{fadeFrames.delete(media);if(end===0)media.pause()}};
 fadeFrames.set(media,requestAnimationFrame(step))
}
function overlaysOpen(){return choiceOpen||consoleOpen}
function syncAudio(){
 const s=gs(),screen=active(),enabled=s?.sound!==false&&Number(s?.music??.33)>0,music=clamp(Number(s?.music??.33));
 const inFlight=screen===FLIGHT,inAirport=screen===AIRPORT,inOffice=screen===OFFICE,inLab=screen===LAB,inComplete=screen===COMPLETE;
 const dialogueDuck=dialogue?.56:1,overlayDuck=overlaysOpen()?.64:1;
 const arrival=$("#ch4P2ArrivalScore"),verify=$("#ch4P2VerificationScore"),airport=$("#ch4P2AirportAmbience"),airportBase=$("#ch4P2AirportFieldBase"),office=$("#ch4P2OfficeAmbience"),officeBase=$("#ch4P2OfficeFieldBase"),takeoff=$("#ch4P2TakeoffAmbience");
 [arrival,verify,airport,airportBase,office,officeBase].forEach(a=>{if(a)a.loop=true});
 fade(arrival,enabled&&(inFlight||inAirport||inOffice)?music*.34*dialogueDuck*overlayDuck:0,screen===FLIGHT?700:400);
 fade(verify,enabled&&(inLab||inComplete)?music*.31*dialogueDuck*overlayDuck*(inComplete?.58:1):0,460);
 fade(airport,enabled&&inAirport?music*.34*dialogueDuck:0,430);
 fade(airportBase,enabled&&inAirport?music*.04*dialogueDuck:0,430);
 fade(office,enabled&&(inOffice||inLab)?music*(inLab?.24:.42)*dialogueDuck*overlayDuck:0,430);
 fade(officeBase,enabled&&(inOffice||inLab)?music*(inLab?.03:.06)*dialogueDuck*overlayDuck:0,430);
 if(takeoff){if(enabled&&inFlight){takeoff.muted=false;takeoff.volume=clamp(music*.36*overlayDuck,0,.8);if(takeoff.paused&&takeoff.currentTime<.15)takeoff.play().catch(()=>{})}else fade(takeoff,0,220)}
}
function stopAudio(reset=false){
 clearTimeout(flightTimer);clearTimeout(transitionTimer);flightTimer=transitionTimer=0;
 for(const frame of fadeFrames.values())cancelAnimationFrame(frame);fadeFrames.clear();
 ["ch4P2ArrivalScore","ch4P2VerificationScore","ch4P2AirportAmbience","ch4P2AirportFieldBase","ch4P2OfficeAmbience","ch4P2OfficeFieldBase","ch4P2TakeoffAmbience"].forEach(id=>stopElement($("#"+id),reset));
 const video=$("#ch4P2FlightVideo");if(video)try{video.pause();if(reset)video.currentTime=0}catch(_){}
}
function stopForeignAudio(){
 try{window.LastWitnessChapter4Phase1?.stopAudio?.(true)}catch(_){}
 try{window.LastWitnessPhase9?.stopAudio?.(true)}catch(_){}
 try{window.LastWitnessPhase8?.stopAudio?.(true)}catch(_){}
 try{window.LastWitnessPhase7?.stopAudio?.(true)}catch(_){}
}
function safeShow(id){
 internalRouting=true;try{show(id)}catch(_){$$('.screen').forEach(n=>n.classList.remove('active'));$("#"+id)?.classList.add('active');if(gs())gs().screen=id}finally{internalRouting=false}
 syncMayaDot();syncAudio()
}
function speakerLabel(name){if(name==="Farid Rahman")return thai()?"Farid Rahman (ต่อสายจากสิงคโปร์)":"Farid Rahman (Remote · Singapore)";if(!thai())return name;const map={"Inspector Cheryl Goh":"สารวัตร Cheryl Goh","Inspector Maya Pranoto":"สารวัตร Maya Pranoto","Farid Rahman":"Farid Rahman (ต่อสายจากสิงคโปร์)"};return map[name]||name}
function portraitSource(name,emotion){try{return typeof portrait==="function"?portrait(name,emotion||"neutral"):""}catch(_){return""}}
function recordHistory(line){try{const s=gs();s.history=s.history||[];s.history.push({speaker:speakerLabel(line[0]),text:thai()?line[3]:line[2],chapter:4,phase:2})}catch(_){} }
function dialogueBox(){const id=active();return SCREENS.has(id)?$("#"+id+"Dialogue"):null}
function renderDialogue(){
 const box=dialogueBox();if(!box||!dialogue)return;const line=dialogue.lines[dialogue.i],speaker=line[0],right=["North","Inspector Cheryl Goh","Inspector Maya Pranoto","Farid Rahman"].includes(speaker),src=portraitSource(speaker,line[1]),maya=speaker==="Inspector Maya Pranoto";
 if(maya)unlockMaya();
 box.className="dialogue ch4-p2-dialogue"+(right?" right":"");
 box.innerHTML=`<div class="portrait-wrap">${src?`<img class="portrait${maya?" maya-portrait":""}" src="${src}" alt="">`:""}</div><div class="dialogue-copy"><div class="speaker">${speakerLabel(speaker)}</div><div class="line">${thai()?line[3]:line[2]}</div></div><div class="next">${tr("TAP TO CONTINUE","แตะเพื่อดำเนินต่อ")}</div>`;
 syncAudio()
}
function talk(lines,done){
 const box=dialogueBox();if(!box){done?.();return}dialogue={lines,i:0,done};box.classList.remove("hidden");renderDialogue();
 box.onclick=()=>{if(!dialogue)return;recordHistory(dialogue.lines[dialogue.i]);dialogue.i++;if(dialogue.i>=dialogue.lines.length){const fn=dialogue.done;dialogue=null;box.classList.add("hidden");box.onclick=null;syncAudio();fn?.();save()}else renderDialogue()}
}

const D={
 airport:[
  ["Inspector Cheryl Goh","serious","Local time, 00:10. Farid confirms the raw mirror is sealed in Singapore.","เวลาท้องถิ่น 00:10 น. Farid ยืนยันว่า Raw Mirror ถูกปิดผนึกไว้ที่สิงคโปร์แล้ว"],
  ["Benedict","smirk","Good. I prefer my evidence rested when I am not.","ดี ผมชอบให้หลักฐานได้พัก แม้ตัวเองจะไม่ได้พักก็ตาม"],
  ["Inspector Maya Pranoto","authoritative","Inspector Maya Pranoto, Indonesian National Police Cybercrime. Your transfer order covers the preserved token, its certificate wrapper and one passive response. Nothing more.","สารวัตร Maya Pranoto ตำรวจไซเบอร์อินโดนีเซีย คำสั่งส่งต่อของคุณครอบคลุม Token ที่รักษาไว้ Certificate Wrapper และ Passive Response หนึ่งครั้ง เท่านั้น"],
  ["Inspector Cheryl Goh","focused_command","No live trace, no intrusion, no physical attribution from a relay address.","ไม่มี Live Trace ไม่มีการเจาะระบบ และไม่มีการระบุตัวบุคคลจาก Relay Address"],
  ["Inspector Maya Pranoto","restrained_approval","Good. That saves us an argument before baggage claim.","ดี แบบนี้เราประหยัดข้อโต้แย้งไปได้หนึ่งเรื่องก่อนรับกระเป๋า"],
  ["Benedict","neutral","I was hoping for one. Long flights make me optimistic.","ผมกำลังหวังว่าจะได้สักเรื่อง เที่ยวบินยาวทำให้ผมมองโลกในแง่ดี"],
  ["Inspector Maya Pranoto","calm_professional","Jakarta may be educational, then.","งั้น Jakarta อาจให้บทเรียนคุณได้"],
  ["North","serious","Farid holds the original capture. I brought a sanitised analysis clone with no live credential and no callback route.","Farid ดูแล Capture ต้นฉบับ ฉันนำ Analysis Clone ที่ผ่านการแยกความเสี่ยงมา ไม่มี Live Credential และไม่มี Callback Route"],
  ["Inspector Maya Pranoto","analytical","Then the evidence travelled as a copy, not as a suspect. We can work with that.","งั้นหลักฐานเดินทางมาในฐานะสำเนา ไม่ใช่ผู้ต้องสงสัย แบบนี้ทำงานต่อได้"]
 ],
 officeIntro:[
  ["Inspector Maya Pranoto","authoritative","This room has read-only access to the certificate wrapper, relay acknowledgement, broker challenge-response and traffic metadata.","ห้องนี้เข้าถึง Certificate Wrapper, Relay Acknowledgement, Broker Challenge-Response และ Traffic Metadata ได้แบบอ่านอย่างเดียว"],
  ["Inspector Maya Pranoto","focused","It does not authorise a live rendezvous, an active trace or a raid built from an IP address.","สิทธิ์นี้ไม่ครอบคลุม Live Rendezvous, Active Trace หรือการเข้าค้นที่ตั้งต้นจาก IP Address"],
  ["North","analyzing","And it cannot turn PALIMPSEST from a tool family into a person.","และมันเปลี่ยน PALIMPSEST จาก Tool Family ให้กลายเป็นบุคคลไม่ได้"],
  ["Inspector Cheryl Goh","serious","Singapore preserved the route. Indonesia decides what may be tested here.","สิงคโปร์รักษาเส้นทางไว้ อินโดนีเซียเป็นผู้กำหนดว่าสิ่งใดทดสอบได้ที่นี่"],
  ["Benedict","thinking","Then we agree on the first sentence before the system supplies the wrong ending.","งั้นเราตกลงประโยคแรกให้ตรงกัน ก่อนระบบจะเติมตอนจบผิดเรื่อง"]
 ],
 choiceCommon:[
  ["Inspector Maya Pranoto","authoritative","We preserve the token hash, clone it into an isolated sandbox, send one passive challenge and compare response grammar. In that order.","เราจะรักษา Token Hash, Clone เข้า Isolated Sandbox, ส่ง Passive Challenge หนึ่งครั้ง แล้วเปรียบเทียบ Response Grammar ตามลำดับนี้"],
  ["Inspector Cheryl Goh","focused_command","The token remains evidence throughout. No one promotes it to a witness.","Token ยังคงเป็นหลักฐานตลอดกระบวนการ ไม่มีใครเลื่อนสถานะมันเป็นพยาน"],
  ["North","dry","A healthy boundary. Systems become unreliable the moment people ask them to remember faces.","ขอบเขตที่ดี ระบบไม่น่าเชื่อถือทันทีที่คนขอให้มันจำใบหน้า"],
  ["Benedict","neutral","Let us ask it what it handled, not who we hope handled it.","งั้นถามว่ามันจัดการอะไร ไม่ใช่ถามว่าเราอยากให้ใครเป็นคนจัดการ"]
 ],
 debrief:[
  ["Farid Rahman","tablet_read","Passive response preserved. The packet separates into five layers.","รักษา Passive Response แล้ว Packet แยกออกได้ห้าชั้น"],
  ["North","analyzing","Source-build fingerprint. Jakarta relay exit. Broker handoff. Local deployment echo. Decision trigger.","Source-Build Fingerprint, Jakarta Relay Exit, Broker Handoff, Local Deployment Echo และ Decision Trigger"],
  ["Farid Rahman","serious","The last layer carries a valid trigger structure. It names no owner.","ชั้นสุดท้ายมีโครงสร้าง Trigger ที่ถูกต้อง แต่ไม่ระบุเจ้าของ"],
  ["Inspector Maya Pranoto","analytical","The rendezvous token is genuine, single-use and linked to a Jakarta broker route. It gives us no face, address or sender identity.","Rendezvous Token เป็นของจริง ใช้ได้ครั้งเดียว และเชื่อมกับ Broker Route ใน Jakarta แต่มันไม่ให้ใบหน้า ที่อยู่ หรือตัวตนผู้ส่ง"],
  ["Inspector Cheryl Goh","serious","A valid response proves controlled access. It does not identify the hand on the control.","Response ที่ถูกต้องพิสูจน์การเข้าถึงแบบควบคุม ไม่ได้ระบุมือที่อยู่บนตัวควบคุม"],
  ["North","alert","It never asked my name. It recognised my role: ATTRIBUTION ANALYST.","มันไม่เคยถามชื่อฉัน มันจดจำบทบาทของฉันว่า ATTRIBUTION ANALYST"],
  ["Benedict","serious","So the route is watching the question, not answering it.","แปลว่าเส้นทางกำลังเฝ้าดูคำถาม ไม่ได้ตอบคำถาม"],
  ["Inspector Maya Pranoto","decisive","I am authorising a controlled packet capture. Phase Three begins with provenance, not pursuit.","ฉันอนุมัติ Controlled Packet Capture เฟสสามจะเริ่มจาก Provenance ไม่ใช่การไล่ล่า"],
  ["Benedict","thinking","It was never a meeting place.","มันไม่เคยเป็นสถานที่นัดพบ"],
  ["North","serious","No. It is a receipt.","ไม่ใช่ มันคือใบรับรายการ"],
  ["Inspector Maya Pranoto","authoritative","Then prove who handled it.","งั้นพิสูจน์ว่าใครเป็นผู้ส่งต่อมัน"]
 ]
};
const CHOICE_BRANCHES={
 tool:[
  ["Benedict","serious","We are tracing a tool, not accusing a city.","เรากำลังตามรอยเครื่องมือ ไม่ได้กล่าวหาเมืองหนึ่งเมือง"],
  ["Inspector Maya Pranoto","restrained_approval","Then behaviour comes first. A location remains context until corroboration makes it more.","งั้นเริ่มจากพฤติกรรม สถานที่ยังเป็นเพียงบริบท จนกว่าหลักฐานร่วมจะพิสูจน์ได้มากกว่านั้น"]
 ],
 jurisdiction:[
  ["Benedict","serious","Jurisdiction first. Attribution after preservation.","เขตอำนาจมาก่อน การระบุตัวตามหลังการรักษาหลักฐาน"],
  ["Inspector Maya Pranoto","calm_professional","That order keeps evidence admissible and investigators honest.","ลำดับนั้นรักษาทั้งน้ำหนักหลักฐานและความซื่อตรงของผู้สืบสวน"]
 ],
 trap:[
  ["Benedict","thinking","Someone expects us to mistake a route for a person.","มีคนคาดว่าเราจะเข้าใจผิดว่าเส้นทางคือบุคคล"],
  ["North","skeptical","Then the shortcut is part of the design.","งั้นทางลัดนั้นก็เป็นส่วนหนึ่งของการออกแบบ"],
  ["Inspector Maya Pranoto","analytical","We deny them the shortcut and preserve the route anyway.","เราจะไม่เดินตามทางลัดนั้น และยังรักษาเส้นทางไว้ครบถ้วน"]
 ]
};

function copy(){return{
 flightHead:tr("CHAPTER IV · PHASE II","บทที่ IV · เฟส II"),flightStatus:tr("OPERATIONAL TRANSFER","การเคลื่อนย้ายเชิงปฏิบัติการ"),skip:tr("SKIP TRANSITION","ข้ามฉากเดินทาง"),
 routeEye:tr("SINGAPORE → JAKARTA","สิงคโปร์ → JAKARTA"),routeTitle:tr("JAKARTA ARRIVAL","เดินทางถึง JAKARTA"),depart:tr("DEPARTURE","ออกเดินทาง"),arrive:tr("ARRIVAL","เดินทางถึง"),flightTime:tr("Flight time 1 h 50 m · Jakarta is one hour behind Singapore · Day 5","ใช้เวลาบิน 1 ชม. 50 นาที · Jakarta ช้ากว่าสิงคโปร์หนึ่งชั่วโมง · วันที่ 5"),continueAirport:tr("CONTINUE TO OPERATIONS CORRIDOR","ไปยัง OPERATIONS CORRIDOR"),
 airportLocation:tr("Soekarno-Hatta · Operations Corridor · 00:10 WIB","Soekarno-Hatta · Operations Corridor · 00:10 WIB"),airportScene:tr("JAKARTA ARRIVAL","เดินทางถึง JAKARTA"),airportObjective:tr("Meet the local liaison and preserve the limits of the transfer order","พบผู้ประสานงานท้องถิ่นและรักษาขอบเขตของคำสั่งส่งต่อ"),
 officeLocation:tr("INP Cybercrime Operations · 01:05 WIB","ศูนย์ปฏิบัติการตำรวจไซเบอร์อินโดนีเซีย · 01:05 WIB"),officeScene:tr("JURISDICTION BEFORE ATTRIBUTION","เขตอำนาจก่อนการระบุตัว"),officeObjective:officeObjective(),
 choiceTitle:tr("WHAT PRINCIPLE LEADS THE VERIFICATION?","หลักใดควรนำการตรวจสอบ"),tool:tr("WE ARE TRACING A TOOL, NOT ACCUSING A CITY","เรากำลังตามรอยเครื่องมือ ไม่ได้กล่าวหาเมือง"),jurisdiction:tr("JURISDICTION FIRST. ATTRIBUTION AFTER PRESERVATION","เขตอำนาจมาก่อน การระบุตัวตามหลังการรักษาหลักฐาน"),trap:tr("SOMEONE EXPECTS US TO MISTAKE A ROUTE FOR A PERSON","มีคนคาดว่าเราจะเข้าใจผิดว่าเส้นทางคือบุคคล"),enterLab:tr("ENTER VERIFICATION LAB","เข้าสู่ VERIFICATION LAB"),
 labLocation:tr("Jakarta Verification Lab · 01:18 WIB","ห้องตรวจสอบ Jakarta · 01:18 WIB"),labScene:tr("THE TOKEN ANSWERS","TOKEN ตอบกลับ"),labObjective:labObjective(),openConsole:tr("OPEN TOKEN SANDBOX","เปิด TOKEN SANDBOX"),resumeConsole:tr("RESUME TOKEN SANDBOX","กลับเข้า TOKEN SANDBOX"),
 consoleEye:tr("READ ONLY · JOINT AUTHORITY","อ่านอย่างเดียว · อำนาจร่วม"),consoleTitle:tr("RENDEZVOUS TOKEN VERIFICATION","การตรวจสอบ RENDEZVOUS TOKEN"),close:tr("Close","ปิด"),
 preserve_hash:tr("1 · PRESERVE TOKEN HASH","1 · รักษา TOKEN HASH"),clone_sandbox:tr("2 · CLONE INTO SANDBOX","2 · CLONE เข้า SANDBOX"),passive_challenge:tr("3 · SEND PASSIVE CHALLENGE","3 · ส่ง PASSIVE CHALLENGE"),compare_grammar:tr("4 · COMPARE RESPONSE GRAMMAR","4 · เปรียบเทียบ RESPONSE GRAMMAR"),open_live:tr("OPEN LIVE RENDEZVOUS","เปิด LIVE RENDEZVOUS"),trace_responder:tr("TRACE RESPONDER","TRACE ผู้ตอบกลับ"),
 completeEye:tr("PHASE II COMPLETE","จบเฟส II"),completeTitle:tr("JAKARTA ARRIVAL","เดินทางถึง JAKARTA"),completeBody:tr("The token is genuine and the Jakarta broker route is real. Neither identifies the toolmaker, operator, deployer or decision owner.","Token เป็นของจริงและ Broker Route ใน Jakarta มีอยู่จริง แต่ทั้งสองอย่างยังไม่ระบุตัวผู้สร้างเครื่องมือ ผู้ใช้งาน ผู้ Deploy หรือเจ้าของการตัดสินใจ"),next:tr("NEXT · PHASE III · PACKET PROVENANCE","ถัดไป · เฟส III · PACKET PROVENANCE"),returnTitle:tr("RETURN TO TITLE","กลับหน้าแรก"),continueFromP1:tr("CONTINUE TO PHASE II","ไปต่อเฟส II")
}}
function officeObjective(){const p=ensure();if(!p?.officeIntroComplete)return tr("Establish lawful access before touching the token","กำหนดสิทธิ์ตามกฎหมายก่อนแตะ Token");if(!p.choiceMade)return tr("Choose the principle that governs verification","เลือกหลักที่จะกำกับการตรวจสอบ");if(!p.legalBriefComplete)return tr("Confirm the read-only verification sequence","ยืนยันลำดับการตรวจสอบแบบอ่านอย่างเดียว");return tr("Move the preserved clone into the verification lab","นำ Clone ที่รักษาไว้เข้าสู่ห้องตรวจสอบ")}
function labObjective(){const p=ensure();if(!p?.verificationStarted)return tr("Verify the token without opening a live route","ตรวจ Token โดยไม่เปิดเส้นทางสด");if(!p.verificationComplete)return tr("Complete the four authorised verification steps","ดำเนินการตรวจสอบที่ได้รับอนุญาตให้ครบสี่ขั้น");return tr("Separate packet provenance from human attribution","แยกที่มาของ Packet ออกจากการระบุตัวบุคคล")}

function installPortraits(){
 const maya={
  neutral:MAYA_BASE+"neutral.png?v=0142",focused:MAYA_BASE+"focused.png?v=0142",skeptical:MAYA_BASE+"skeptical.png?v=0142",analytical:MAYA_BASE+"analytical.png?v=0142",authoritative:MAYA_BASE+"authoritative.png?v=0142",questioning:MAYA_BASE+"questioning.png?v=0142",restrained_approval:MAYA_BASE+"restrained-approval.png?v=0142",calm_professional:MAYA_BASE+"calm-professional.png?v=0142",alert:MAYA_BASE+"alert.png?v=0142",decisive:MAYA_BASE+"decisive.png?v=0142",guarded:MAYA_BASE+"guarded.png?v=0142",softened_respect:MAYA_BASE+"softened-respect.png?v=0142",serious:MAYA_BASE+"focused.png?v=0142"
 };
 try{PORTRAITS["Inspector Maya Pranoto"]=maya;PORTRAITS["สารวัตร Maya Pranoto"]=maya;PORTRAITS["Maya Pranoto"]=maya}catch(_){}
}
function mayaData(){return{
 name:{en:"Inspector Maya Pranoto",th:"สารวัตร Maya Pranoto"},age:37,
 role:{en:"Indonesian National Police Cybercrime Liaison",th:"ผู้ประสานงานตำรวจไซเบอร์อินโดนีเซีย"},
 status:{en:"Jurisdictional Partner",th:"พันธมิตรด้านเขตอำนาจ"},
 bio:{en:"A disciplined Indonesian cybercrime liaison who understands local infrastructure and refuses to collapse route, tool, operator and decision ownership into one conclusion.",th:"ผู้ประสานงานตำรวจไซเบอร์อินโดนีเซียผู้มีวินัย เข้าใจโครงสร้างพื้นฐานในพื้นที่ และไม่ยอมรวมเส้นทาง เครื่องมือ ผู้ใช้งาน และเจ้าของการตัดสินใจให้เป็นข้อสรุปเดียว"},
 src:MAYA_BASE+"profile.png?v=0142",relation:{value:61},metrics:[
  {key:"trust",label:{en:"Trust",th:"ความไว้วางใจ"},value:48},{key:"respect",label:{en:"Professional Respect",th:"ความนับถือทางวิชาชีพ"},value:66},{key:"rapport",label:{en:"Rapport",th:"ความคุ้นเคย"},value:8},{key:"suspicion",label:{en:"Suspicion",th:"ความสงสัย"},value:20}
 ]
}}
function installCanonExtension(){
 const data=mayaData(),api=window.LastWitnessContentRegistry;
 if(api?.characters&&!api.characters.maya)api.characters.maya=data;
 try{if(window.LastWitnessCharacterCanon?.characters&&!window.LastWitnessCharacterCanon.characters.maya)window.LastWitnessCharacterCanon.characters.maya=data}catch(_){}
}
function unlockMaya(){
 const s=gs(),p=ensure();if(!s||!p)return;const fresh=!p.mayaUnlocked;
 p.mayaUnlocked=true;if(fresh)p.mayaUnread=true;s.flags.ch4_maya_met=true;s.characters=s.characters||{};s.characters["Maya Pranoto"]=true;
 s.relationships["Maya Pranoto"]=s.relationships["Maya Pranoto"]||{trust:48,respect:66,attachment:8,suspicion:20};
 s.journal=s.journal||{unlocked:true,seen:false,introShown:true};s.journal.unlocked=true;if(fresh)s.journal.seen=false;
 renderMayaCard();syncMayaDot();save();if(fresh)try{showBadge(tr("Character added: Inspector Maya Pranoto","เพิ่มตัวละคร: สารวัตร Maya Pranoto"))}catch(_){}
}
function mayaVisible(){const s=gs(),p=ensure();return Boolean(p?.mayaUnlocked||s?.flags?.ch4_maya_met||s?.flags?.developer_character_unlock_all)}
function relationAverage(r){return Math.round((Number(r.trust||0)+Number(r.respect||0)+Number(r.attachment||0)+(100-Number(r.suspicion||0)))/4)}
function renderMayaCard(){
 const grid=$("#characterGrid"),s=gs();if(!grid||!mayaVisible())return;if(grid.querySelector('[data-character="maya"]'))return;
 const data=mayaData(),r=s?.relationships?.["Maya Pranoto"]||{trust:48,respect:66,attachment:8,suspicion:20},button=document.createElement("button");button.type="button";button.className="character-card";button.dataset.character="maya";
 button.innerHTML=`<img src="${data.src}" alt="" width="512" height="640" loading="eager" decoding="async" data-character-image="maya"><div class="character-name">${data.name[thai()?"th":"en"]}</div><div class="character-status">${data.status[thai()?"th":"en"]}</div><div class="relation-summary"><div class="relation-label-row"><span>${tr("Relationship","ความสัมพันธ์")}</span><strong>${relationAverage(r)}%</strong></div><div class="relation-bar"><div class="relation-fill" style="width:${relationAverage(r)}%"></div></div></div>`;
 grid.appendChild(button)
}
function showMayaDetail(){
 const grid=$("#characterGrid"),detail=$("#characterDetail"),back=$("#charactersBack"),s=gs(),d=mayaData(),r=s?.relationships?.["Maya Pranoto"]||{trust:48,respect:66,attachment:8,suspicion:20};if(!detail)return;
 const metrics=[
  [tr("Trust","ความไว้วางใจ"),r.trust,false],[tr("Professional Respect","ความนับถือทางวิชาชีพ"),r.respect,false],[tr("Rapport","ความคุ้นเคย"),r.attachment,false],[tr("Suspicion","ความสงสัย"),r.suspicion,true]
 ];
 detail.innerHTML=`<div data-detail-shell><div class="character-detail-head"><img data-detail-portrait data-detail-image="maya" src="${d.src}" alt="" width="512" height="640" loading="eager" decoding="async"><div class="maya-meta"><div class="character-name">${d.name[thai()?"th":"en"]}</div><div class="character-status">${d.role[thai()?"th":"en"]}<br><span class="character-age">37</span></div></div></div><div class="relation-metrics">${metrics.map(m=>`<div class="relation-metric${m[2]?" suspicion":""}"><div class="relation-metric-head"><span>${m[0]}</span><strong>${Math.round(Number(m[1])||0)}%</strong></div><div class="relation-bar"><div class="relation-fill" style="width:${Math.round(Number(m[1])||0)}%"></div></div></div>`).join("")}</div><div class="character-notes">${d.bio[thai()?"th":"en"]}</div></div>`;
 if(grid)grid.style.display="none";detail.style.display="block";if(back)back.style.display="block"
}
function syncMayaDot(){const s=gs(),p=ensure(),mayaUnread=Boolean(mayaVisible()&&p?.mayaUnread),baseUnread=Boolean((s?.lwCharactersUnread||[]).length&&s?.journal?.seen===false);$$('.journal-alert').forEach(node=>node.classList.toggle('show',mayaUnread||baseUnread))}
function markMayaRead(){const p=ensure();if(!p?.mayaUnread)return;p.mayaUnread=false;syncMayaDot();save()}
function installJournalExtension(){
 installCanonExtension();const modal=$("#charactersModal"),grid=$("#characterGrid");
 grid?.addEventListener("click",event=>{const card=event.target.closest?.('[data-character="maya"]');if(!card)return;event.preventDefault();event.stopPropagation();showMayaDetail()});
 if(journalObserver)journalObserver.disconnect();journalObserver=new MutationObserver(()=>{renderMayaCard();if(modal?.classList.contains("open")){markMayaRead();renderMayaCard()}});
 if(modal)journalObserver.observe(modal,{attributes:true,attributeFilter:["class"],subtree:true,childList:true});
 if(screenObserver)screenObserver.disconnect();screenObserver=new MutationObserver(()=>setTimeout(()=>{syncMayaDot();if(!SCREENS.has(active()))stopAudio(true);else syncAudio()},0));$$('.screen').forEach(screen=>screenObserver.observe(screen,{attributes:true,attributeFilter:["class"]}));
 renderMayaCard();syncMayaDot()
}

function injectStyle(){if($("#lwChapter04Phase02Style"))return;const link=document.createElement("link");link.id="lwChapter04Phase02Style";link.rel="stylesheet";link.href="css/chapter-04-phase-02.css?v=0142";document.head.appendChild(link)}
function audioMarkup(){return `<audio id="ch4P2ArrivalScore" preload="auto" loop><source src="${AUDIO_BASE}jakarta-arrival-loop.webm?v=0142" type="audio/webm"><source src="${AUDIO_BASE}jakarta-arrival-loop.mp3?v=0142" type="audio/mpeg"></audio><audio id="ch4P2VerificationScore" preload="auto" loop><source src="${AUDIO_BASE}token-verification-loop.webm?v=0142" type="audio/webm"><source src="${AUDIO_BASE}token-verification-loop.mp3?v=0142" type="audio/mpeg"></audio><audio id="ch4P2AirportAmbience" preload="auto" loop><source src="${AUDIO_BASE}jakarta-airport-ops-loop.webm?v=0142" type="audio/webm"><source src="${AUDIO_BASE}jakarta-airport-ops-loop.mp3?v=0142" type="audio/mpeg"></audio><audio id="ch4P2AirportFieldBase" preload="auto" loop src="assets/audio/chapter-03/phase-03/changi-airport-ambience.mp3?v=0800"></audio><audio id="ch4P2OfficeAmbience" preload="auto" loop><source src="${AUDIO_BASE}jakarta-cybercrime-office-loop.webm?v=0142" type="audio/webm"><source src="${AUDIO_BASE}jakarta-cybercrime-office-loop.mp3?v=0142" type="audio/mpeg"></audio><audio id="ch4P2OfficeFieldBase" preload="auto" loop src="assets/audio/chapter-03/phase-04/singapore-investigation-office-ambience.mp3?v=0920"></audio>`}
function sharedScene(id,classes,image,alt){return `<section id="${id}" class="screen ch4-p2-screen ${classes}"><img class="scene" src="${image}" alt="${alt}"><div class="overlay ch4-p2-overlay"></div><div class="topbar"><span id="${id}Location"></span><div class="hud"><button class="icon ch4-p2-save" type="button">💾</button><button class="icon ch4-p2-menu" type="button">☰<i class="journal-alert" aria-hidden="true"></i></button></div></div><div id="${id}Scene" class="ch4-p2-label"></div><div id="${id}Objective" class="ch4-p2-objective"></div><div id="${id}Dialogue" class="dialogue ch4-p2-dialogue hidden"></div><button id="${id}Action" class="primary ch4-p2-action" type="button" hidden></button><div class="ch4-p2-progress"><span class="ch4-p2-progress-text">0%</span><div><i class="ch4-p2-progress-fill"></i></div></div></section>`}
function inject(){
 if($("#"+FLIGHT))return;const game=$("#game");if(!game)return;
 game.insertAdjacentHTML("beforeend",`
 <section id="${FLIGHT}" class="screen ch4-p2-flight"><video id="ch4P2FlightVideo" poster="${TAKEOFF_POSTER}" preload="auto" playsinline muted><source src="${TAKEOFF_VIDEO}" type="video/mp4"></video><div class="ch4-p2-flight-shade"></div><div class="ch4-p2-flight-head"><span id="ch4P2FlightHead"></span><span id="ch4P2FlightStatus"></span></div><div id="ch4P2FlightRoute" class="ch4-p2-flight-route"><div id="ch4P2RouteEye" class="eyebrow"></div><h2 id="ch4P2RouteTitle"></h2><div class="ch4-p2-route-grid"><div><span id="ch4P2DepartLabel"></span><strong>SINGAPORE<br>23:20 SGT</strong></div><div class="ch4-p2-route-arrow">→</div><div><span id="ch4P2ArriveLabel"></span><strong>JAKARTA<br>00:10 WIB</strong></div></div><p id="ch4P2FlightTime"></p><button id="ch4P2RouteContinue" class="primary" type="button"></button></div><button id="ch4P2Skip" class="ghost ch4-p2-skip" type="button"></button></section>
 ${sharedScene(AIRPORT,"ch4-p2-airport",BASE+"jakarta-airport-operations-corridor.png?v=0142","Jakarta airport operations corridor at night")}
 ${sharedScene(OFFICE,"ch4-p2-office",BASE+"jakarta-cybercrime-office.png?v=0142","Jakarta cybercrime operations office")}
 ${sharedScene(LAB,"ch4-p2-lab",BASE+"jakarta-verification-lab.png?v=0142","Jakarta verification laboratory")}
 <section id="${COMPLETE}" class="screen ch4-p2-complete"><div class="ch4-p2-complete-card"><div id="ch4P2CompleteEye" class="eyebrow"></div><h2 id="ch4P2CompleteTitle"></h2><div class="ch4-p2-rule"></div><p id="ch4P2CompleteBody"></p><div class="ch4-p2-complete-grid"><div><span>TOKEN</span><b>GENUINE · SINGLE USE</b></div><div><span>BROKER ROUTE</span><b>JAKARTA-LINKED</b></div><div><span>ATTRIBUTION ROLE</span><b>NORTH</b></div><div><span>HUMAN IDENTITY</span><b>UNRESOLVED</b></div></div><strong id="ch4P2Next"></strong><button id="ch4P2ReturnTitle" class="primary" type="button"></button></div></section>
 <div id="ch4P2Choice" class="modal ch4-p2-choice" aria-hidden="true"><div class="modal-card"><div class="eyebrow">BENEDICT · OPERATIONAL PRINCIPLE</div><h3 id="ch4P2ChoiceTitle"></h3><button type="button" data-ch4-p2-choice="tool"></button><button type="button" data-ch4-p2-choice="jurisdiction"></button><button type="button" data-ch4-p2-choice="trap"></button></div></div>
 <div id="ch4P2Console" class="modal ch4-p2-console" aria-hidden="true"><div class="modal-card"><header><div><div id="ch4P2ConsoleEye" class="eyebrow"></div><h3 id="ch4P2ConsoleTitle"></h3></div><button id="ch4P2ConsoleClose" class="ghost" type="button">×</button></header><div class="ch4-p2-console-readout"><span>TOKEN STATE</span><strong id="ch4P2TokenState">PRESERVED · SINGLE USE</strong><span>NETWORK</span><b id="ch4P2NetworkState">DISCONNECTED</b><span>ATTRIBUTION</span><b id="ch4P2AttributionState">UNRESOLVED</b></div><div id="ch4P2ConsoleLog" class="ch4-p2-console-log"></div><div id="ch4P2ConsoleActions" class="ch4-p2-console-actions">${["preserve_hash","clone_sandbox","passive_challenge","compare_grammar","open_live","trace_responder"].map(id=>`<button type="button" data-verify-action="${id}"></button>`).join("")}</div><div id="ch4P2ConsoleStatus" class="ch4-p2-console-status" aria-live="polite"></div></div></div>
 ${audioMarkup()}`);
 bindElements();updateLanguage();paint()
}
function ensurePhase1Continue(){
 const card=$("#chapter4Phase1Complete .ch4-p1-complete-card"),returnButton=$("#ch4P1ReturnTitle");if(!card||!returnButton)return;
 let button=$("#ch4P2ContinueFromP1");if(!button){button=document.createElement("button");button.id="ch4P2ContinueFromP1";button.className="primary";button.type="button";card.insertBefore(button,returnButton);returnButton.classList.remove("primary");returnButton.classList.add("ghost");button.addEventListener("click",event=>{event.preventDefault();event.stopPropagation();startFromPhase1()})}
 button.textContent=copy().continueFromP1
}
function setProgress(value){const n=Math.max(0,Math.min(100,Math.round(value)));$$('.ch4-p2-progress-text').forEach(node=>node.textContent=n+"%");$$('.ch4-p2-progress-fill').forEach(node=>node.style.width=n+"%");if(gs())gs().progress=n}
function progressValue(){const p=ensure();if(p.complete)return 100;if(p.verificationComplete)return 92;if(p.verificationSteps.length)return 68+Math.round(p.verificationSteps.length*5);if(p.verificationStarted)return 66;if(p.legalBriefComplete)return 58;if(p.choiceMade)return 48;if(p.officeIntroComplete)return 40;if(p.airportIntroComplete)return 30;if(p.routeCardSeen)return 18;if(p.started)return 7;return 0}
function paint(){
 const p=ensure(),c=copy();setProgress(progressValue());
 const officeAction=$("#"+OFFICE+"Action"),labAction=$("#"+LAB+"Action");
 if(officeAction){officeAction.hidden=!(p.legalBriefComplete&&!dialogue);officeAction.textContent=c.enterLab}
 if(labAction){labAction.hidden=!(p.legalBriefComplete&&!p.verificationComplete&&!dialogue);labAction.textContent=p.verificationStarted?c.resumeConsole:c.openConsole}
 $("#"+OFFICE+"Objective")&&($("#"+OFFICE+"Objective").textContent=officeObjective());$("#"+LAB+"Objective")&&($("#"+LAB+"Objective").textContent=labObjective());syncAudio();syncMayaDot()
}
function updateLanguage(){
 if(!$("#"+FLIGHT))return;const c=copy(),map={ch4P2FlightHead:c.flightHead,ch4P2FlightStatus:c.flightStatus,ch4P2Skip:c.skip,ch4P2RouteEye:c.routeEye,ch4P2RouteTitle:c.routeTitle,ch4P2DepartLabel:c.depart,ch4P2ArriveLabel:c.arrive,ch4P2FlightTime:c.flightTime,ch4P2RouteContinue:c.continueAirport,
  [AIRPORT+"Location"]:c.airportLocation,[AIRPORT+"Scene"]:c.airportScene,[AIRPORT+"Objective"]:c.airportObjective,[OFFICE+"Location"]:c.officeLocation,[OFFICE+"Scene"]:c.officeScene,[OFFICE+"Objective"]:c.officeObjective,[OFFICE+"Action"]:c.enterLab,[LAB+"Location"]:c.labLocation,[LAB+"Scene"]:c.labScene,[LAB+"Objective"]:c.labObjective,[LAB+"Action"]:(ensure().verificationStarted?c.resumeConsole:c.openConsole),ch4P2ChoiceTitle:c.choiceTitle,ch4P2ConsoleEye:c.consoleEye,ch4P2ConsoleTitle:c.consoleTitle,ch4P2CompleteEye:c.completeEye,ch4P2CompleteTitle:c.completeTitle,ch4P2CompleteBody:c.completeBody,ch4P2Next:c.next,ch4P2ReturnTitle:c.returnTitle};
 Object.entries(map).forEach(([id,value])=>{const node=$("#"+id);if(node)node.textContent=value});
 $$('[data-ch4-p2-choice]').forEach(button=>button.textContent=c[button.dataset.ch4P2Choice]);$$('[data-verify-action]').forEach(button=>button.textContent=c[button.dataset.verifyAction]);
 ensurePhase1Continue();if(dialogue)renderDialogue();if(consoleOpen)renderConsole();renderMayaCard();paint();setBuild()
}

function startFromPhase1(){
 inject();ensurePhase1Continue();stopForeignAudio();closeAll();const p=ensure();p.started=true;gs().chapter=4;document.title="Last Witness — Shadow of the Truth";
 if(p.complete){showComplete();return}if(p.verificationStarted||p.legalBriefComplete){enterLab();return}if(p.airportIntroComplete||p.officeIntroComplete||p.choiceMade){enterOffice();return}if(p.routeCardSeen){enterAirport();return}enterFlight()
}
function enterFlight(){
 const p=ensure();p.started=true;p.stage="flight";setCheckpoint("ch4_phase2_flight");safeShow(FLIGHT);$("#ch4P2FlightRoute")?.classList.remove("show");$("#ch4P2Skip")&&( $("#ch4P2Skip").hidden=false );updateLanguage();
 const video=$("#ch4P2FlightVideo");if(!video){showRouteCard();return}try{video.currentTime=0;video.muted=true;video.play().catch(()=>{flightTimer=setTimeout(showRouteCard,1200)})}catch(_){flightTimer=setTimeout(showRouteCard,800)}
}
function showRouteCard(){
 clearTimeout(flightTimer);const p=ensure();p.flightComplete=true;p.routeCardSeen=true;p.stage="route-card";setCheckpoint("ch4_phase2_route_card");safeShow(FLIGHT);const video=$("#ch4P2FlightVideo");try{video.pause()}catch(_){};$("#ch4P2FlightRoute")?.classList.add("show");$("#ch4P2Skip")&&( $("#ch4P2Skip").hidden=true );updateLanguage();save()
}
function enterAirport(){
 const p=ensure();clearTimeout(transitionTimer);p.stage="airport";setCheckpoint("ch4_phase2_airport");safeShow(AIRPORT);updateLanguage();paint();
 if(p.airportIntroComplete){transitionTimer=setTimeout(enterOffice,260);return}setTimeout(()=>talk(D.airport,()=>{p.airportIntroComplete=true;p.stage="office";setCheckpoint("ch4_phase2_airport_complete");paint();transitionTimer=setTimeout(enterOffice,420)}),360)
}
function enterOffice(){
 const p=ensure();p.stage=p.legalBriefComplete?"office-ready":(p.officeIntroComplete?"choice":"office-intro");setCheckpoint("ch4_phase2_office");safeShow(OFFICE);updateLanguage();paint();
 if(p.legalBriefComplete)return;if(p.choiceMade){if(!dialogue)talk([...CHOICE_BRANCHES[p.choiceKey],...D.choiceCommon],finishLegalBrief);return}if(p.officeIntroComplete){setTimeout(openChoice,120);return}setTimeout(()=>talk(D.officeIntro,()=>{p.officeIntroComplete=true;p.stage="choice";setCheckpoint("ch4_phase2_choice");paint();openChoice()}),320)
}
function openChoice(){if(dialogue||ensure().choiceMade)return;choiceOpen=true;$("#ch4P2Choice")?.classList.add("open");$("#ch4P2Choice")?.setAttribute("aria-hidden","false");syncAudio()}
function closeChoice(){choiceOpen=false;$("#ch4P2Choice")?.classList.remove("open");$("#ch4P2Choice")?.setAttribute("aria-hidden","true");syncAudio()}
function applyChoice(key){
 const p=ensure(),s=gs();if(p.choiceApplied)return;p.choiceApplied=true;const profile=ensureEndingProfile(),maya=s.relationships["Maya Pranoto"]=s.relationships["Maya Pranoto"]||{trust:48,respect:66,attachment:8,suspicion:20},north=s.relationships.North=s.relationships.North||{trust:70,respect:78,attachment:58,suspicion:3};
 if(key==="tool"){profile.attributionProof+=1;maya.respect=clamp(maya.respect+2,0,100);s.flags.ch4_p2_tool_not_city=true}
 if(key==="jurisdiction"){profile.chainOfCustody+=1;maya.trust=clamp(maya.trust+2,0,100);s.flags.ch4_p2_jurisdiction_first=true}
 if(key==="trap"){profile.northSafety+=1;north.trust=clamp(north.trust+1,0,100);maya.respect=clamp(maya.respect+1,0,100);s.flags.ch4_p2_route_identity_trap=true}
}
function choosePrinciple(key){const p=ensure();if(p.choiceMade||!CHOICE_BRANCHES[key])return;p.choiceMade=true;p.choiceKey=key;p.stage="legal-brief";applyChoice(key);closeChoice();setCheckpoint("ch4_phase2_legal_brief");paint();talk([...CHOICE_BRANCHES[key],...D.choiceCommon],finishLegalBrief)}
function finishLegalBrief(){const p=ensure();p.legalBriefComplete=true;p.stage="office-ready";setCheckpoint("ch4_phase2_office_ready");paint();save()}
function enterLab(){
 const p=ensure();p.stage=p.verificationComplete?"debrief":"lab";setCheckpoint("ch4_phase2_lab");safeShow(LAB);updateLanguage();paint();
 if(p.complete){showComplete();return}if(p.verificationComplete&&!p.closingDialogueComplete){setTimeout(startDebrief,260);return}if(p.verificationStarted&&!p.verificationComplete)setTimeout(openConsole,160)
}
function openConsole(){const p=ensure();if(dialogue||p.verificationComplete)return;p.verificationStarted=true;p.stage="verification";setCheckpoint("ch4_phase2_verification");consoleOpen=true;$("#ch4P2Console")?.classList.add("open");$("#ch4P2Console")?.setAttribute("aria-hidden","false");renderConsole();paint();syncAudio()}
function closeConsole(user=true){consoleOpen=false;$("#ch4P2Console")?.classList.remove("open");$("#ch4P2Console")?.setAttribute("aria-hidden","true");if(user)paint();syncAudio()}
function verifyCopy(id){const c=copy();return c[id]||id}
function consoleLogs(){
 const steps=ensure().verificationSteps,rows=[`<div class="gold">[JOINT AUTHORITY] READ-ONLY VERIFICATION SESSION</div>`,`<div>[TOKEN] SEALED DEAD-DROP COPY LOADED</div>`];
 if(steps.includes("preserve_hash"))rows.push(`<div class="ok">[HASH] SHA-256 MATCH · CHAIN INTACT · SINGLE_USE=TRUE</div>`);
 if(steps.includes("clone_sandbox"))rows.push(`<div class="ok">[SANDBOX] ISOLATED CLONE READY · LIVE CREDENTIAL REMOVED</div>`);
 if(steps.includes("passive_challenge"))rows.push(`<div class="ok">[RESPONSE] PASSIVE ACK RECEIVED · JAKARTA-LINKED BROKER HOP</div>`);
 if(steps.includes("compare_grammar"))rows.push(`<div class="ok">[GRAMMAR] PALIMPSEST FAMILY MATCH · HUMAN ATTRIBUTION ABSENT</div>`,`<div class="gold">[ROLE MATCH] ATTRIBUTION ANALYST · PERSONAL NAME NOT REQUESTED</div>`);
 return rows.join("")
}
function renderConsole(){
 const p=ensure(),c=copy(),log=$("#ch4P2ConsoleLog"),status=$("#ch4P2ConsoleStatus"),next=VERIFY_ORDER[p.verificationSteps.length]||"";if(log)log.innerHTML=consoleLogs();if(status){status.textContent=p.verificationComplete?tr("Verification complete. Packet layers preserved for provenance analysis.","ตรวจสอบเสร็จแล้ว รักษาชั้นข้อมูลของ Packet ไว้สำหรับวิเคราะห์ Provenance"):tr("Follow the authorised sequence. Dangerous shortcuts are rejected without penalty.","ดำเนินตามลำดับที่ได้รับอนุญาต ทางลัดที่เสี่ยงจะถูกปฏิเสธโดยไม่ลงโทษผู้เล่น");status.className="ch4-p2-console-status"+(p.verificationComplete?" success":"")}
 $$('[data-verify-action]').forEach(button=>{const id=button.dataset.verifyAction;button.textContent=c[id];button.classList.toggle("done",p.verificationSteps.includes(id));button.classList.toggle("correct-next",id===next);button.disabled=p.verificationSteps.includes(id)||p.verificationComplete});
 $("#ch4P2NetworkState")&&($("#ch4P2NetworkState").textContent=p.verificationSteps.includes("passive_challenge")?"PASSIVE RESPONSE CAPTURED":(p.verificationSteps.includes("clone_sandbox")?"SANDBOX · PASSIVE ONLY":"DISCONNECTED"));
 $("#ch4P2AttributionState")&&($("#ch4P2AttributionState").textContent=p.verificationSteps.includes("compare_grammar")?"ROLE MATCH · PERSON ABSENT":"UNRESOLVED");paint()
}
function consoleMessage(text,kind=""){const node=$("#ch4P2ConsoleStatus");if(!node)return;node.textContent=text;node.className="ch4-p2-console-status"+(kind?" "+kind:"")}
function handleVerifyAction(id){
 const p=ensure(),expected=VERIFY_ORDER[p.verificationSteps.length];if(p.verificationComplete)return;
 if(id==="open_live"){p.consoleWarnings++;consoleMessage(tr("Rejected: opening the live rendezvous would consume the token against an uncontrolled endpoint.","ปฏิเสธ: การเปิด Live Rendezvous จะใช้ Token กับปลายทางที่ควบคุมไม่ได้"),"error");save();return}
 if(id==="trace_responder"){p.consoleWarnings++;consoleMessage(tr("Rejected: a relay route cannot support physical attribution or a location raid.","ปฏิเสธ: Relay Route ไม่เพียงพอสำหรับระบุตัวบุคคลหรือเข้าค้นสถานที่"),"error");save();return}
 if(id!==expected){consoleMessage(tr("Sequence rejected: preserve each layer before asking the next one to respond.","ลำดับถูกปฏิเสธ: ต้องรักษาแต่ละชั้นก่อนขอให้ชั้นถัดไปตอบกลับ"),"error");return}
 p.verificationSteps.push(id);setCheckpoint("ch4_phase2_verify_"+id);
 if(id==="preserve_hash")consoleMessage(tr("Token hash preserved. The sealed dead-drop copy is unchanged.","รักษา Token Hash แล้ว สำเนาจาก Dead Drop ที่ปิดผนึกยังไม่เปลี่ยนแปลง"),"success");
 if(id==="clone_sandbox")consoleMessage(tr("Isolated clone created. Live credentials and callback routes are disabled.","สร้าง Isolated Clone แล้ว ปิด Live Credential และ Callback Route"),"success");
 if(id==="passive_challenge")consoleMessage(tr("Passive acknowledgement received through a Jakarta-linked broker route.","ได้รับ Passive Acknowledgement ผ่าน Broker Route ที่เชื่อมกับ Jakarta"),"success");
 if(id==="compare_grammar")consoleMessage(tr("Response grammar matches the PALIMPSEST tool family. Human attribution remains absent.","Response Grammar ตรงกับ Tool Family ของ PALIMPSEST แต่ยังไม่มีการระบุตัวบุคคล"),"success");
 if(p.verificationSteps.length===VERIFY_ORDER.length){completeVerification();return}const message=$("#ch4P2ConsoleStatus")?.textContent||"",kind=$("#ch4P2ConsoleStatus")?.classList.contains("success")?"success":"";renderConsole();if(message)consoleMessage(message,kind);save()
}
function addEvidence(){
 const s=gs(),p=ensure();for(const id of ["ch4_verified_rendezvous_token","ch4_broker_response_capture"]){if(!p.evidenceCollected.includes(id))p.evidenceCollected.push(id);try{s.found?.add?.(id)}catch(_){}}
 s.flags.ch4_token_genuine=true;s.flags.ch4_token_single_use=true;s.flags.ch4_jakarta_broker_route=true;s.flags.ch4_north_role_recognised=true;s.flags.ch4_human_attribution_unresolved=true
}
function completeVerification(){
 const p=ensure();p.verificationComplete=true;p.stage="debrief";addEvidence();ensureEndingProfile().evidenceIntegrity+=1;setCheckpoint("ch4_phase2_verification_complete");try{window.LastWitnessAudioCue?.playPuzzleSuccess?.()}catch(_){};renderConsole();paint();save();transitionTimer=setTimeout(()=>{closeConsole(false);startDebrief()},720)
}
function startDebrief(){const p=ensure();if(p.closingDialogueComplete||dialogue)return;safeShow(LAB);talk(D.debrief,completePhase)}
function completePhase(){const p=ensure();p.closingDialogueComplete=true;p.complete=true;p.stage="complete";setCheckpoint("ch4_phase2_complete");setProgress(100);paint();save();transitionTimer=setTimeout(showComplete,480)}
function showComplete(){const p=ensure();p.complete=true;p.stage="complete";gs().chapter=4;gs().screen=COMPLETE;setProgress(100);safeShow(COMPLETE);updateLanguage();save()}
function closeAll(){choiceOpen=consoleOpen=false;["ch4P2Choice","ch4P2Console"].forEach(id=>{$("#"+id)?.classList.remove("open");$("#"+id)?.setAttribute("aria-hidden","true")});const box=dialogueBox();box?.classList.add("hidden");dialogue=null}
function returnToTitle(){stopAudio(true);stopForeignAudio();closeAll();try{save()}catch(_){};try{window.LastWitnessChapter2Integration?.returnToTitle?.()}catch(_){$$('.screen').forEach(n=>n.classList.remove('active'));$("#title")?.classList.add('active');if(gs())gs().screen="title"}setTimeout(()=>{if(!SCREENS.has(active()))stopAudio(true)},0)}
function resetPhase2(){const s=gs();if(!s)return;s.chapter4=s.chapter4||{};s.chapter4.phase2={started:false,flightComplete:false,routeCardSeen:false,airportIntroComplete:false,mayaUnlocked:false,mayaUnread:false,officeIntroComplete:false,choiceMade:false,choiceKey:"",choiceApplied:false,legalBriefComplete:false,verificationStarted:false,verificationSteps:[],consoleWarnings:0,verificationComplete:false,evidenceCollected:[],closingDialogueComplete:false,complete:false,stage:"flight"};["ch4_maya_met","ch4_p2_tool_not_city","ch4_p2_jurisdiction_first","ch4_p2_route_identity_trap","ch4_token_genuine","ch4_token_single_use","ch4_jakarta_broker_route","ch4_north_role_recognised","ch4_human_attribution_unresolved"].forEach(k=>delete s.flags[k]);try{s.found?.delete?.("ch4_verified_rendezvous_token");s.found?.delete?.("ch4_broker_response_capture")}catch(_){} }
function startFreshForDev(){stopAudio(true);closeAll();primePhase1CompleteForDev();resetPhase2();startFromPhase1()}
function jumpVerificationForDev(){stopAudio(true);closeAll();primePhase1CompleteForDev();resetPhase2();const p=ensure();p.started=true;p.flightComplete=true;p.routeCardSeen=true;p.airportIntroComplete=true;p.mayaUnlocked=true;p.officeIntroComplete=true;p.choiceMade=true;p.choiceKey="jurisdiction";p.choiceApplied=true;p.legalBriefComplete=true;p.stage="lab";gs().flags.ch4_maya_met=true;unlockMaya();enterLab()}
function primePhase1CompleteForDev(){
 const s=gs();if(!s)return;s.chapter=4;s.chapter4=s.chapter4||{};s.chapter4.phase1=Object.assign({started:true,chapterCardSeen:true,locationCardSeen:true,introComplete:true,choiceMade:true,choiceKey:"source",choiceApplied:true,boardAssignments:{wrapper_fingerprint:"jakarta",rendezvous_token:"jakarta",bangkok_package:"bangkok",cleanup_credential:"bangkok",decision_owner:"unresolved"},boardAttempts:0,boardComplete:true,boardDebriefSeen:true,workingTheoryAdded:true,querySeen:true,queryCuePlayed:true,queryAcknowledged:true,closingDialogueComplete:true,complete:true,stage:"complete"},s.chapter4.phase1||{});s.flags=s.flags||{};s.flags.chapter2_character_feature_unlocked=true;s.journal=Object.assign({unlocked:true,seen:true,introShown:true},s.journal||{})
}
function appendCaseEvidence(){
 const list=$("#caseList"),p=ensure();if(!list)return;$('[data-ch4-p2-case-section]',list)?.remove();$$('[data-ch4-p2-case-entry]',list).forEach(n=>n.remove());if(!p?.evidenceCollected?.length)return;
 const h=document.createElement("div");h.className="case-section-title";h.dataset.ch4P2CaseSection="1";h.textContent=tr("CHAPTER IV · JAKARTA ARRIVAL","บทที่ IV · เดินทางถึง JAKARTA");list.appendChild(h);
 const entries={ch4_verified_rendezvous_token:[tr("Verified Rendezvous Token","Rendezvous Token ที่ตรวจสอบแล้ว"),tr("The sealed token is genuine and single-use. It proves a controlled access mechanism, not the sender's identity.","Token ที่ปิดผนึกเป็นของจริงและใช้ได้ครั้งเดียว มันพิสูจน์กลไกการเข้าถึงแบบควบคุม ไม่ได้พิสูจน์ตัวตนผู้ส่ง")],ch4_broker_response_capture:[tr("Broker Response Capture","Broker Response Capture"),tr("A passive response matches PALIMPSEST-family grammar through Jakarta-linked broker infrastructure. No name, face, address or human operator is attributed.","Passive Response ตรงกับ Grammar ของ Tool Family PALIMPSEST ผ่านโครงสร้าง Broker ที่เชื่อม Jakarta แต่ยังไม่มีชื่อ ใบหน้า ที่อยู่ หรือการระบุตัวผู้ใช้งานมนุษย์")]};
 p.evidenceCollected.forEach(id=>{const e=entries[id];if(!e)return;const row=document.createElement("div");row.className="case-row";row.dataset.ch4P2CaseEntry=id;row.innerHTML=`<b>${e[0]}</b><div>${e[1]}</div>`;list.appendChild(row)})
}
function setBuild(){const label=$("#settingsVersion");if(label)label.textContent=`LAST WITNESS · BUILD ${BUILD}`;if(window.LastWitnessSaveManager)window.LastWitnessSaveManager.version=BUILD}
function installSaveBridge(){
 if(window.__lwChapter4Phase2SaveBridge0142)return;window.__lwChapter4Phase2SaveBridge0142=true;
 const baseRestore=typeof restore==="function"?restore:window.restore;
 if(typeof baseRestore==="function"){
  const wrapped=function(data){stopAudio(true);const result=baseRestore.apply(this,arguments);if(SCREENS.has(String(data?.screen||""))){const s=gs();if(s)s.chapter4=clone(data?.chapter4||s.chapter4||{});setTimeout(()=>resumeFromState(data.screen),170)}return result};
  try{restore=wrapped}catch(_){}window.restore=wrapped;if(window.LastWitnessSaveManager)window.LastWitnessSaveManager.restore=wrapped
 }
 const baseLabel=typeof screenLabel==="function"?screenLabel:window.screenLabel;
 if(typeof baseLabel==="function"){
  const wrapped=function(data){const labels={jakartaFlight:["Chapter IV · Singapore to Jakarta","บทที่ IV · สิงคโปร์สู่ Jakarta"],jakartaAirport:["Chapter IV · Jakarta Airport","บทที่ IV · สนามบิน Jakarta"],jakartaCybercrimeOffice:["Chapter IV · Jakarta Cybercrime Office","บทที่ IV · สำนักงานตำรวจไซเบอร์ Jakarta"],jakartaVerificationLab:["Chapter IV · Token Verification","บทที่ IV · การตรวจสอบ Token"],jakartaPhase2Complete:["Chapter IV · Phase II Complete","บทที่ IV · จบเฟส II"]};const pair=labels[data?.screen];return pair?pair[thai()?1:0]:baseLabel.apply(this,arguments)};
  try{screenLabel=wrapped}catch(_){}window.screenLabel=wrapped
 }
}
function resumeFromState(screen){
 inject();ensurePhase1Continue();installPortraits();installJournalExtension();setBuild();const p=ensure();document.title="Last Witness — Shadow of the Truth";updateLanguage();
 if(screen===FLIGHT){if(p.routeCardSeen)showRouteCard();else enterFlight();return}
 if(screen===AIRPORT){enterAirport();return}
 if(screen===OFFICE){enterOffice();return}
 if(screen===LAB){enterLab();return}
 if(screen===COMPLETE){showComplete();return}
 if(p.complete)showComplete();else startFromPhase1()
}
function installDevJumps(){
 const grid=$("#developerModal .dev-grid");if(!grid)return;
 const add=(key,label,handler)=>{let b=grid.querySelector(`[data-dev-jump="${key}"]`);if(!b){b=document.createElement("button");b.className="dev-button";b.type="button";b.dataset.devJump=key;grid.appendChild(b)}b.textContent=label;if(b.dataset.lwBound0142==="1")return;b.dataset.lwBound0142="1";b.addEventListener("click",event=>{event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();$("#developerModal")?.classList.remove("open");handler()},true)};
 add("chapter4Phase2",tr("Chapter IV · Phase II · Jakarta Arrival","บทที่ IV · เฟส II · เดินทางถึง Jakarta"),startFreshForDev);
 add("chapter4Phase2Verification",tr("Chapter IV · Phase II · Token Verification","บทที่ IV · เฟส II · ตรวจสอบ Token"),jumpVerificationForDev)
}
function bindElements(){
 $("#ch4P2FlightVideo")?.addEventListener("ended",showRouteCard);$("#ch4P2FlightVideo")?.addEventListener("error",()=>{flightTimer=setTimeout(showRouteCard,300)});$("#ch4P2Skip").onclick=showRouteCard;$("#ch4P2RouteContinue").onclick=enterAirport;
 $$('.ch4-p2-save').forEach(b=>b.onclick=()=>{try{manualSave()}catch(_){}});$$('.ch4-p2-menu').forEach(b=>b.onclick=()=>$("#drawer")?.classList.add("open"));
 $("#"+OFFICE+"Action").onclick=enterLab;$("#"+LAB+"Action").onclick=openConsole;$$('[data-ch4-p2-choice]').forEach(b=>b.onclick=()=>choosePrinciple(b.dataset.ch4P2Choice));
 $("#ch4P2ConsoleClose").onclick=()=>closeConsole(true);$("#ch4P2Console").onclick=e=>{if(e.target.id==="ch4P2Console")closeConsole(true)};$$('[data-verify-action]').forEach(b=>b.onclick=()=>handleVerifyAction(b.dataset.verifyAction));$("#ch4P2ReturnTitle").onclick=returnToTitle
}
function bind(){
 injectStyle();inject();installPortraits();installCanonExtension();installJournalExtension();installSaveBridge();installDevJumps();ensurePhase1Continue();setBuild();updateLanguage();
 $("#caseButton")?.addEventListener("click",()=>setTimeout(appendCaseEvidence,0),true);$("#soundToggle")?.addEventListener("change",syncAudio,true);$("#musicRange")?.addEventListener("input",syncAudio,true);
 document.addEventListener("click",event=>{if(event.target.closest?.("[data-lang]"))setTimeout(()=>{updateLanguage();installDevJumps();renderMayaCard()},0);if(event.target.closest?.("#settingsButton,#settingsVersion,#lwSettingsFullscreen,#lwMenuFullscreen"))setTimeout(setBuild,0);if(event.target.closest?.("#restart")&&SCREENS.has(active())){event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();$("#drawer")?.classList.remove("open");startFreshForDev()}},true);
 document.addEventListener("visibilitychange",()=>{if(document.hidden)stopAudio(false);else syncAudio()});
 const screen=active();if(SCREENS.has(screen))setTimeout(()=>resumeFromState(screen),0)
}

window.LastWitnessChapter4Phase2={startFromPhase1,startFreshForDev,jumpVerificationForDev,resumeFromState,stopAudio,returnToTitle,appendCaseEvidence,version:BUILD};
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",bind,{once:true});else bind();
})();
