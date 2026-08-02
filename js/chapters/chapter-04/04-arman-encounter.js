/* LAST WITNESS - Chapter IV / Phase IV: THE MAN BEHIND THE ALIAS 0.17.0
 * Physical Arman encounter, controlled-proxy deduction, lawful evidence handling,
 * Character Journal registration, Developer Mode integration and Phase V handoff.
 * Script load is story-state neutral. It does not enter Phase IV or unlock Arman
 * unless the player enters the phase, restores a Phase IV save or explicitly uses Dev Mode.
 */
(function(){
"use strict";
if(window.LastWitnessChapter4Phase4?.version==="0.17.0")return;

const BUILD="0.17.0";
const P3_COMPLETE="jakartaPacketProvenanceComplete";
const APPROACH="armanVehicleApproach";
const LOCATION="armanLocationCard";
const STAIRWELL="armanStairwell";
const WORKSHOP="armanWorkshop";
const REVEAL="armanReveal";
const COMPLETE="armanPhase4Complete";
const SCREENS=new Set([APPROACH,LOCATION,STAIRWELL,WORKSHOP,REVEAL,COMPLETE]);
const BASE="assets/images/chapter-04/phase-04/";
const VIDEO_BASE="assets/video/chapter-04/phase-04/";
const AUDIO_BASE="assets/audio/chapter-04/phase-04/";
const DIMAS_BASE=BASE+"dimas/";
const ARMAN_BASE=BASE+"arman/";

const TRIAD_IDS=["broker_language","workshop_control","false_premise","source_behaviour"];
const TRIAD_LAYERS=["knowledge","access","authorship","contradiction"];
const TRIAD_CORRECT={
 broker_language:"knowledge",
 workshop_control:"access",
 false_premise:"contradiction",
 source_behaviour:"authorship"
};
const CACHE_IDS=["ch4_p4_blind_client_certificate","ch4_p4_analyst_threat_record","ch4_p4_coastal_reservation"];
const EVIDENCE_IDS=["ch4_p4_controlled_proxy","ch4_p4_source_behaviour_match",...CACHE_IDS];
const CHOICE_KINDS=["dimas","arman","cache","north"];

const $=(selector,root=document)=>root.querySelector(selector);
const $$=(selector,root=document)=>Array.from(root.querySelectorAll(selector));
const gs=()=>{try{return state}catch(_){return window.state||null}};
const thai=()=>gs()?.language==="th"||document.documentElement.lang==="th";
const tr=(en,th)=>thai()?th:en;
const clone=value=>JSON.parse(JSON.stringify(value));
const clamp=(value,min=0,max=1)=>Math.max(min,Math.min(max,Number(value)||0));
const active=()=>$(".screen.active")?.id||gs()?.screen||"";

let dialogue=null;
let triadOpen=false;
let triadIndex=0;
let choiceOpen=false;
let activeChoiceKind="";
let cacheOpen=false;
let cacheIndex=0;
let transitionTimer=0;
let fadeFrame=0;
let videoBound=false;
let registryInstalled=false;

function endingDefaults(){return{
 evidenceIntegrity:0,attributionProof:0,chainOfCustody:0,witnessProtection:0,northSafety:0,allianceStrength:0,publicRecordControl:0,elenaSuspicion:0,
 accusedParty:"",witnessStatus:"unknown",northStatus:"active",adrianStatus:"unresolved",armanStatus:"unresolved",
 roleSeparation:0,bangkokChainIntegrity:0,institutionalTrust:0,corroborationBreadth:0,alternativeHypothesesPreserved:0,
 rinStatus:"unknown",localDeployerStatus:"unresolved",fieldOperatorStatus:"unresolved",finalAccused:"",finalCaseVersion:""
}}
function defaults(){return{
 started:false,
 approachComplete:false,
 locationCardSeen:false,
 stairwellComplete:false,
 workshopIntroComplete:false,
 triangulationStarted:false,
 triangulationAssignments:{},
 triangulationIndex:0,
 triangulationAttempts:0,
 triangulationComplete:false,
 proxyExposed:false,
 revealStarted:false,
 revealComplete:false,
 armanUnlocked:false,
 dimasDisposition:"",
 armanDisposition:"",
 cacheDisposition:"",
 northResponse:"",
 choicesApplied:{},
 evidenceCollected:[],
 evidenceViewed:[],
 activeCacheIndex:0,
 cacheReviewComplete:false,
 closingDialogueComplete:false,
 complete:false,
 stage:"approach"
}}
function phaseState(){return gs()?.chapter4?.phase4||null}
function ensureEndingProfile(){const s=gs();if(!s)return endingDefaults();const target=s.endingProfile&&typeof s.endingProfile==="object"?s.endingProfile:{};Object.assign(target,Object.assign(endingDefaults(),target));s.endingProfile=target;return target}
function migratePhase(p){
 const target=p&&typeof p==="object"?p:{};Object.assign(target,Object.assign(defaults(),target));p=target;
 if(!p.triangulationAssignments||typeof p.triangulationAssignments!=="object")p.triangulationAssignments={};
 if(!p.choicesApplied||typeof p.choicesApplied!=="object")p.choicesApplied={};
 if(!Array.isArray(p.evidenceCollected))p.evidenceCollected=[];
 if(!Array.isArray(p.evidenceViewed))p.evidenceViewed=[];
 p.evidenceCollected=p.evidenceCollected.filter(id=>EVIDENCE_IDS.includes(id));
 p.evidenceViewed=p.evidenceViewed.filter(id=>EVIDENCE_IDS.includes(id));
 p.triangulationIndex=clamp(Number(p.triangulationIndex)||0,0,TRIAD_IDS.length-1);
 p.activeCacheIndex=clamp(Number(p.activeCacheIndex)||0,0,CACHE_IDS.length-1);
 if(p.complete){
  p.started=p.approachComplete=p.locationCardSeen=p.stairwellComplete=p.workshopIntroComplete=true;
  p.triangulationStarted=p.triangulationComplete=p.proxyExposed=p.revealStarted=p.revealComplete=p.armanUnlocked=true;
  p.cacheReviewComplete=p.closingDialogueComplete=true;p.stage="complete";
 }
 return p
}
function ensureEntryState(){
 const s=gs();if(!s)return null;s.chapter4=s.chapter4||{};s.flags=s.flags||{};s.characters=s.characters||{};s.relationships=s.relationships||{};ensureEndingProfile();
 s.chapter4.phase4=migratePhase(s.chapter4.phase4);return s.chapter4.phase4
}
function save(){try{if(typeof autoSave==="function")autoSave()}catch(_){} }
function setCheckpoint(value){const s=gs();if(s)s.checkpoint=value;save()}
function setBuild(){const node=$("#settingsVersion");if(node&&SCREENS.has(active()))node.textContent="Build "+BUILD}
function safeShow(id){
 try{typeof show==="function"?show(id):null}catch(_){}
 if(!$("#"+id)?.classList.contains("active")){$$(".screen").forEach(node=>node.classList.remove("active"));$("#"+id)?.classList.add("active");if(gs())gs().screen=id}
 setBuild();syncAudio()
}
function clearTimer(){clearTimeout(transitionTimer);transitionTimer=0}
function stopElement(media,reset=false){if(!media)return;try{media.pause();if(reset)media.currentTime=0}catch(_){} }
function fade(media,target,duration=460){
 if(!media)return;if(fadeFrame)cancelAnimationFrame(fadeFrame);const start=clamp(media.volume),end=clamp(target,0,.9),began=performance.now();
 if(end>0&&media.paused){media.muted=false;media.play().catch(()=>{})}
 const step=now=>{const q=Math.max(0,Math.min(1,(now-began)/duration)),smooth=q*q*(3-2*q);media.volume=start+(end-start)*smooth;if(q<1)fadeFrame=requestAnimationFrame(step);else{fadeFrame=0;if(end===0)media.pause()}};
 fadeFrame=requestAnimationFrame(step)
}
function score(){return $("#ch4P4Score")}
function approachVideo(){return $("#ch4P4ApproachVideo")}
function revealVideo(){return $("#ch4P4RevealVideo")}
function isActive(){return Boolean(phaseState()?.started&&SCREENS.has(active()))}
function overlayOpen(){return triadOpen||choiceOpen||cacheOpen}
function syncAudio(){
 const s=gs(),screen=active(),enabled=s?.sound!==false&&Number(s?.music??.33)>0&&SCREENS.has(screen)&&screen!==COMPLETE,music=clamp(Number(s?.music??.33));
 const dialogueDuck=dialogue?.52:1,overlayDuck=overlayOpen()?.62:1,revealDuck=screen===REVEAL?.17:1,approachDuck=screen===APPROACH?.76:1;
 const target=enabled?music*.34*dialogueDuck*overlayDuck*revealDuck*approachDuck:0;
 fade(score(),target,screen===APPROACH?1250:(screen===REVEAL?260:430));
 const sfx=clamp(Number(s?.sfx??.6));
 const av=approachVideo(),rv=revealVideo();
 if(av)av.volume=s?.sound===false?0:clamp(sfx*.48,0,.62);
 if(rv)rv.volume=s?.sound===false?0:clamp(sfx*.82,0,.88)
}
function stopAudio(reset=false){
 clearTimer();if(fadeFrame)cancelAnimationFrame(fadeFrame);fadeFrame=0;stopElement(score(),reset);stopElement(approachVideo(),reset);stopElement(revealVideo(),reset)
}
function stopForeignAudio(){
 try{window.LastWitnessChapter4Phase3?.stopAudio?.(true)}catch(_){}
 try{window.LastWitnessChapter4Phase2?.stopAudio?.(true)}catch(_){}
 try{window.LastWitnessChapter4Phase1?.stopAudio?.(true)}catch(_){}
}
function playInspection(){try{window.LastWitnessAudioCue?.playInspection?.()}catch(_){} }
function playPuzzleSuccess(){try{window.LastWitnessAudioCue?.playPuzzleSuccess?.()}catch(_){} }
function closeAll(){
 triadOpen=choiceOpen=cacheOpen=false;activeChoiceKind="";
 ["ch4P4Triad","ch4P4Choice","ch4P4Cache"].forEach(id=>{$("#"+id)?.classList.remove("open");$("#"+id)?.setAttribute("aria-hidden","true")});
 const box=dialogueBox();box?.classList.add("hidden");if(box)box.onclick=null;dialogue=null;syncAudio()
}

function speakerLabel(name){
 if(name==="Farid Rahman")return thai()?"Farid Rahman (ต่อสายจากสิงคโปร์)":"Farid Rahman (Remote · Singapore)";
 if(!thai())return name;
 return {"Inspector Cheryl Goh":"สารวัตร Cheryl Goh","Inspector Maya Pranoto":"สารวัตร Maya Pranoto","Dimas Wibowo":"Dimas Wibowo","Arman Suryadi":"Arman Suryadi"}[name]||name
}
function speakerMarkup(name){if(name!=="Farid Rahman")return speakerLabel(name);return `Farid Rahman <span class="ch4-p4-remote-presence">${thai()?"(ต่อสายจากสิงคโปร์)":"(Remote · Singapore)"}</span>`}
function customPortrait(name,emotion){
 if(name==="Dimas Wibowo")return DIMAS_BASE+(emotion||"neutral")+".png?v=0170";
 if(name==="Arman Suryadi")return ARMAN_BASE+(emotion||"neutral")+".png?v=0170";
 try{return typeof portrait==="function"?portrait(name,emotion||"neutral"):""}catch(_){return""}
}
function dialogueBox(){const screen=active();return SCREENS.has(screen)?$("#"+screen+"Dialogue"):null}
function recordHistory(line){try{const s=gs();s.history=s.history||[];s.history.push({speaker:speakerLabel(line[0]),text:thai()?line[3]:line[2],chapter:4,phase:4})}catch(_){} }
function renderDialogue(){
 const box=dialogueBox();if(!box||!dialogue)return;const line=dialogue.lines[dialogue.i],speaker=line[0],emotion=line[1],right=["North","Inspector Cheryl Goh","Inspector Maya Pranoto","Farid Rahman","Dimas Wibowo","Arman Suryadi"].includes(speaker),src=customPortrait(speaker,emotion);
 const custom=speaker==="Dimas Wibowo"?" dimas-portrait":speaker==="Arman Suryadi"?" arman-portrait":"";
 box.className="dialogue ch4-p4-dialogue"+(right?" right":"");
 box.innerHTML=`<div class="portrait-wrap">${src?`<img class="portrait${custom}" src="${src}" alt="">`:""}</div><div class="dialogue-copy"><div class="speaker">${speakerMarkup(speaker)}</div><div class="line">${thai()?line[3]:line[2]}</div></div><div class="next">${tr("TAP TO CONTINUE","แตะเพื่อดำเนินต่อ")}</div>`;
 syncAudio()
}
function talk(lines,done){
 const box=dialogueBox();if(!box){done?.();return}dialogue={lines,i:0,done};box.classList.remove("hidden");renderDialogue();
 box.onclick=()=>{if(!dialogue)return;recordHistory(dialogue.lines[dialogue.i]);dialogue.i++;if(dialogue.i>=dialogue.lines.length){const fn=dialogue.done;dialogue=null;box.classList.add("hidden");box.onclick=null;syncAudio();fn?.();save()}else renderDialogue()}
}

const D={
 stair:[
  ["Inspector Maya Pranoto","authoritative","From here on, nobody touches a device unless I clear it. We have authority to make contact, not to turn the building inside out.","จากตรงนี้ไป ห้ามใครแตะอุปกรณ์จนกว่าฉันจะอนุญาต เรามีอำนาจเข้าพบ ไม่ได้มีสิทธิ์รื้อค้นทั้งตึก"],
  ["Inspector Cheryl Goh","focused_command","Farid has the original response sealed in Singapore. Anything we see here remains a comparison until Maya takes custody.","Farid ปิดผนึกข้อมูลตอบกลับต้นฉบับไว้ที่สิงคโปร์แล้ว สิ่งที่เราเห็นที่นี่เป็นได้แค่ข้อมูลเปรียบเทียบ จนกว่า Maya จะรับเข้ากระบวนการ"],
  ["North","dry","Comforting. I only brought the non-invasive kind of suspicion.","สบายใจขึ้นเยอะ ฉันพกมาแต่ความสงสัยแบบไม่รุกล้ำ"],
  ["Benedict","smirk","You have an invasive kind?","มีแบบรุกล้ำด้วยเหรอ"],
  ["North","playful","Keep talking. I’ll demonstrate later.","พูดต่อไป เดี๋ยวสาธิตให้ดู"],
  ["Inspector Maya Pranoto","restrained_approval","Save the demonstration. The workshop is upstairs.","เก็บการสาธิตไว้ก่อน ห้องทำงานอยู่ชั้นบน"]
 ],
 workshop:[
  ["Dimas Wibowo","guarded","We’re closed.","ร้านปิดแล้ว"],
  ["Inspector Maya Pranoto","authoritative","Dimas Wibowo?","Dimas Wibowo ใช่ไหม"],
  ["Dimas Wibowo","defensive","Depends who’s asking.","แล้วแต่ว่าใครถาม"],
  ["Inspector Maya Pranoto","calm_professional","Inspector Maya Pranoto. This is a voluntary conversation.","สารวัตร Maya Pranoto เรามาคุยกันโดยสมัครใจ"],
  ["Dimas Wibowo","guarded","At two in the morning.","ตอนตีสองเนี่ยนะ"],
  ["Benedict","smirk","Voluntary conversations keep strange hours.","การคุยโดยสมัครใจก็เลือกเวลาแปลกๆ แบบนี้แหละ"],
  ["Dimas Wibowo","rehearsed","You came for Arman.","พวกคุณมาหา Arman"],
  ["North","serious","We came for the person behind a broker handle.","เรามาหาคนที่อยู่หลังนามแฝงของนายหน้า"],
  ["Dimas Wibowo","neutral","Then you found him.","งั้นก็เจอแล้ว"],
  ["Inspector Cheryl Goh","skeptical","That is a claim, not an identification.","นั่นเป็นคำกล่าวอ้าง ยังไม่ใช่การยืนยันตัวตน"],
  ["Dimas Wibowo","guarded","What would satisfy you?","แล้วต้องทำยังไงถึงจะเชื่อ"],
  ["North","analyzing","Answer something nobody prepared for you.","ตอบคำถามที่ไม่มีใครเตรียมคำตอบไว้ให้"]
 ],
 falsePremise:[
  ["North","analyzing","The wrapper rewrites server time before the signed event is accepted. That is how it hides the gap.","Wrapper จะแก้เวลาของเซิร์ฟเวอร์ก่อนระบบรับ Signed Event แบบนั้นถึงซ่อนช่องว่างได้"],
  ["Dimas Wibowo","rehearsed","Exactly.","ถูกต้อง"],
  ["North","skeptical","No. It doesn’t.","ไม่ มันไม่ได้ทำแบบนั้น"],
  ["Dimas Wibowo","defensive","You wanted an answer.","คุณอยากได้คำตอบ"],
  ["North","dry","I offered a bad premise.","ฉันโยนหลักตั้งต้นผิดๆ ให้"],
  ["Benedict","thinking","And you were too eager to be the right man.","แล้วคุณก็รีบเป็นคนที่เราตามหามากเกินไป"]
 ],
 proxyReveal:[
  ["North","confident","He has the vocabulary and the keys. He doesn’t have the source behaviour.","เขามีทั้งคำศัพท์และกุญแจ แต่ไม่มีพฤติกรรมของต้นฉบับ"],
  ["Inspector Cheryl Goh","focused_command","Knowledge and access. No authorship.","มีความรู้ มีสิทธิ์เข้าถึง แต่ไม่มีหลักฐานว่าเป็นผู้สร้าง"],
  ["Inspector Maya Pranoto","authoritative","Mr Wibowo, step away from the terminal.","คุณ Wibowo ถอยออกจากเครื่อง"],
  ["Dimas Wibowo","caught","You don’t understand who you’re dealing with.","พวกคุณไม่รู้หรอกว่ากำลังยุ่งกับใคร"],
  ["Benedict","serious","I think that’s the first honest thing you’ve said.","ผมว่านี่เป็นประโยคแรกที่คุณพูดความจริง"],
  ["Dimas Wibowo","shocked","...","..."],
  ["Benedict","neutral","Arman, aren’t you coming out to say hello?","อามานจะไม่ออกมาทักทายกันหน่อยเหรอ"]
 ],
 armanIntro:[
  ["Arman Suryadi","guarded","You could have asked without making him perform.","จะถามกันตรงๆ ก็ได้ ไม่เห็นต้องให้เขาเล่นละคร"],
  ["Benedict","neutral","We did. He said he was you.","เราถามแล้ว เขาบอกว่าเป็นคุณ"],
  ["Arman Suryadi","side_eye","Dimas is loyal. Precision is not his strongest quality.","Dimas ซื่อสัตย์ แต่ความแม่นยำไม่ใช่จุดแข็งของเขา"],
  ["Dimas Wibowo","defensive","I can still hear you.","ผมยังได้ยินนะ"],
  ["Arman Suryadi","neutral","Good.","ก็ดี"],
  ["North","serious","The wrapper doesn’t rewrite server time.","Wrapper ไม่ได้แก้เวลาของเซิร์ฟเวอร์"],
  ["Arman Suryadi","skeptical","No. It preserves a signed local event and lets the receiving system do exactly what it was designed to do.","ไม่ มันเก็บ Signed Local Event ไว้ แล้วปล่อยให้ระบบปลายทางทำสิ่งที่ถูกออกแบบมาให้ทำ"],
  ["North","analyzing","Put the wrong event inside the right window.","เอาเหตุการณ์ผิดไปวางในกรอบเวลาที่ถูกต้อง"],
  ["Arman Suryadi","warning","Put a valid event inside a valid window. The wrongness belongs to whoever chose the event.","เอาเหตุการณ์ที่ถูกต้องตามกฎเข้าไปในกรอบเวลาที่ถูกต้อง ส่วนความผิดอยู่ที่คนเลือกเหตุการณ์นั้น"],
  ["Inspector Cheryl Goh","serious","You built protection around that choice.","คุณสร้างเกราะป้องกันให้การเลือกนั้น"],
  ["Arman Suryadi","weary","I built protection around delivery.","ผมสร้างชั้นป้องกันให้ช่องทางส่งมอบ"],
  ["Inspector Maya Pranoto","focused","And sold it blind.","แล้วขายแบบไม่ต้องรู้ว่าใครซื้อ"],
  ["Arman Suryadi","neutral","I sold distance. Clients supplied intent.","สิ่งที่ผมขายคือระยะห่าง ส่วนเจตนา ลูกค้าเอามาเอง"]
 ],
 admissions:[
  ["Benedict","serious","What did Bangkok give you?","ฝั่งกรุงเทพฯ ส่งอะไรให้คุณ"],
  ["Arman Suryadi","thinking","A client certificate. Deployment constraints. A tolerance window. No name.","Client Certificate เงื่อนไขการติดตั้ง กรอบเวลาคลาดเคลื่อน ไม่มีชื่อ"],
  ["North","analyzing","Meridian class?","เป็น Certificate ของ Meridian?"],
  ["Arman Suryadi","skeptical","You already know.","คุณรู้อยู่แล้ว"],
  ["North","dry","I know what the certificate claims.","ฉันรู้ว่า Certificate อ้างว่าอะไร"],
  ["Arman Suryadi","smirk","Then you’re learning.","งั้นก็เริ่มเข้าใจแล้ว"],
  ["Inspector Maya Pranoto","authoritative","The cache.","ส่ง Cache มา"],
  ["Arman Suryadi","guarded","A voluntary handover buys me what?","ถ้าส่งมอบโดยสมัครใจ ผมจะได้อะไร"],
  ["Inspector Cheryl Goh","focused_command","A truthful record of cooperation. Nothing more.","บันทึกตามจริงว่าคุณให้ความร่วมมือ แค่นั้น"],
  ["Arman Suryadi","weary","Honest. Unfashionable, but honest.","ตรงดี ไม่ค่อยมีใครพูดกัน แต่ตรงดี"]
 ],
 threat:[
  ["North","concerned","This isn’t a name. It’s a capability profile.","นี่ไม่ใช่ชื่อ เป็นโปรไฟล์ความสามารถ"],
  ["Farid Rahman","serious","Confirmed. The system was tracking analysts who could separate authorship, deployment and decision control.","ยืนยัน ระบบกำลังติดตามนักวิเคราะห์ที่แยกผู้สร้าง ผู้ติดตั้ง และเจ้าของการตัดสินใจออกจากกันได้"],
  ["North","serious","And escalated the person who could.","แล้วก็ยกระดับคนที่ทำได้ให้เป็นเป้าหมาย"],
  ["Arman Suryadi","warning","The client you are chasing does not care who finds the tool. They care who can prove the hand behind it.","ลูกค้าที่พวกคุณตามอยู่ไม่สนว่าใครเจอเครื่องมือ เขาสนว่าใครพิสูจน์มือที่อยู่เบื้องหลังได้"],
  ["Benedict","serious","Can they identify her?","เขาระบุตัวเธอได้หรือยัง"],
  ["Arman Suryadi","thinking","Not from this record alone.","จากบันทึกนี้อย่างเดียวยังไม่ได้"],
  ["North","dry","‘Alone’ is doing a lot of work in that sentence.","คำว่า ‘อย่างเดียว’ นี่ฟังแล้วไม่ค่อยสบายใจเท่าไหร่"],
  ["Inspector Maya Pranoto","authoritative","Then the next location is treated as hostile.","งั้นสถานที่ถัดไปให้ถือว่าเป็นพื้นที่เสี่ยง"],
  ["Farid Rahman","focused","Aster Recovery reserved three rooms and a poolside cabana at Aruna Coastal Hotel. Ten-thirty local time.","Aster Recovery จองสามห้องกับคาบาน่าริมสระที่ Aruna Coastal Hotel เวลา 10:30 น. ตามเวลาท้องถิ่น"],
  ["Arman Suryadi","neutral","Recovery companies do not book cabanas for the towels.","บริษัทกู้คืนทรัพย์สินไม่จองคาบาน่าเพราะอยากได้ผ้าเช็ดตัวหรอก"]
 ],
 closing:[
  ["Inspector Maya Pranoto","authoritative","We move after sunrise. No uniforms. No live credential on site.","เราเคลื่อนตัวหลังพระอาทิตย์ขึ้น ไม่มีเครื่องแบบ และไม่มี Live Credential ในพื้นที่"],
  ["Inspector Cheryl Goh","focused_command","Farid keeps the decoy telemetry in Singapore. The Indonesian team owns the physical perimeter.","Farid ดูแล Decoy Telemetry จากสิงคโปร์ ทีมอินโดนีเซียคุมพื้นที่จริง"],
  ["Arman Suryadi","skeptical","You think this is about surviving?","คุณคิดว่าเรื่องนี้อยู่ที่การรอดชีวิตเหรอ"],
  ["Benedict","serious","No. It’s about what they need the record to say.","ไม่ เรื่องนี้อยู่ที่คนพวกนั้นต้องการให้บันทึกพูดว่าอะไร"]
 ]
};

function closingForNorth(value){
 if(value==="withdraw")return[
  ["Inspector Maya Pranoto","authoritative","We move after sunrise. No uniforms. North stays off the physical perimeter.","เราเคลื่อนตัวหลังพระอาทิตย์ขึ้น ไม่มีเครื่องแบบ ส่วน North ไม่เข้าเขตปฏิบัติการจริง"],
  ["North","serious","Off the ground, not off the channel.","ไม่ลงพื้นที่ แต่ฉันยังอยู่ในช่องสื่อสาร"],
  ["Inspector Cheryl Goh","focused_command","Farid keeps the decoy telemetry in Singapore. The Indonesian team owns the perimeter.","Farid ดูแล Decoy Telemetry จากสิงคโปร์ ทีมอินโดนีเซียคุมพื้นที่"],
  ["Benedict","neutral","You call the analysis. They don’t get to take that from you.","คุณยังเป็นคนคุมการวิเคราะห์ เรื่องนั้นพวกเขาเอาไปจากคุณไม่ได้"],
  ["Arman Suryadi","skeptical","Distance will not make the profile forget her.","ระยะห่างไม่ได้ทำให้โปรไฟล์ลืมเธอ"],
  ["Benedict","serious","No. But it may make them show us what they need the record to say.","ไม่ แต่มันอาจทำให้พวกเขาเผยว่าต้องการให้บันทึกพูดว่าอะไร"]
 ];
 if(value==="compartment")return[
  ["Inspector Maya Pranoto","authoritative","Small team after sunrise. No uniforms. No live credential on site.","หลังพระอาทิตย์ขึ้นเราใช้ทีมเล็ก ไม่มีเครื่องแบบ และไม่มี Live Credential ในพื้นที่"],
  ["Inspector Cheryl Goh","focused_command","Farid keeps the decoy telemetry in Singapore. Everyone else gets only what they need.","Farid ดูแล Decoy Telemetry จากสิงคโปร์ ส่วนคนอื่นรู้เท่าที่จำเป็น"],
  ["North","dry","Compartmentalised. Everyone gets surprised separately.","แบ่งข้อมูลเป็นวงๆ ทุกคนจะได้ตกใจแยกกัน"],
  ["Benedict","smirk","Let’s keep the better surprises on our side.","งั้นเก็บเรื่องน่าประหลาดใจดีๆ ไว้ฝั่งเราบ้าง"],
  ["Arman Suryadi","skeptical","You think this is about surprising them?","คุณคิดว่าเรื่องนี้อยู่ที่ทำให้พวกเขาประหลาดใจเหรอ"],
  ["Benedict","serious","No. It’s about what they need the record to say.","ไม่ เรื่องนี้อยู่ที่คนพวกนั้นต้องการให้บันทึกพูดว่าอะไร"]
 ];
 return[
  ["North","serious","I design the route. Nobody improvises with me in the middle.","ฉันเป็นคนออกแบบเส้นทาง ห้ามใครด้นสดตอนที่ฉันอยู่กลางปฏิบัติการ"],
  ["Inspector Maya Pranoto","authoritative","Agreed. Indonesian officers control the physical perimeter.","ตกลง เจ้าหน้าที่อินโดนีเซียคุมพื้นที่จริง"],
  ["Inspector Cheryl Goh","focused_command","Farid keeps the decoy telemetry in Singapore. If North calls the stop, we stop.","Farid ดูแล Decoy Telemetry จากสิงคโปร์ และถ้า North สั่งหยุด เราหยุด"],
  ["Benedict","neutral","No heroic exceptions.","ไม่มีข้อยกเว้นแบบวีรบุรุษ"],
  ["North","dry","Shame. I had a cape picked out.","น่าเสียดาย ฉันเลือกผ้าคลุมไว้แล้ว"],
  ["Arman Suryadi","skeptical","You think this is about surviving?","คุณคิดว่าเรื่องนี้อยู่ที่การรอดชีวิตเหรอ"],
  ["Benedict","serious","No. It’s about what they need the record to say.","ไม่ เรื่องนี้อยู่ที่คนพวกนั้นต้องการให้บันทึกพูดว่าอะไร"]
 ]
}

function choiceData(kind){
 const map={
  dimas:{
   eye:tr("PROXY DISPOSITION","การจัดสถานะนกต่อ"),title:tr("How should Dimas be handled?","จะดำเนินการกับ Dimas อย่างไร"),
   options:[
    {id:"witness",title:tr("Separate him as a witness","แยกเขาไว้ในฐานะพยาน"),note:tr("Record the lie, then preserve what he can truthfully corroborate.","บันทึกคำโกหกไว้ แล้วรักษาส่วนที่เขายืนยันตามจริงได้")},
    {id:"pressure",title:tr("Press him before the script resets","กดดันก่อนที่เขาจะเรียบเรียงเรื่องใหม่"),note:tr("A faster lead, but a statement that may be challenged as coercive.","อาจได้เบาะแสเร็วขึ้น แต่คำให้การเสี่ยงถูกโต้แย้งเรื่องการกดดัน")},
    {id:"conspirator",title:tr("Treat him as a co-conspirator","ถือว่าเขาเป็นผู้ร่วมขบวนการ"),note:tr("His obstruction is real. His role in the larger crime is not yet proven.","การขัดขวางเป็นเรื่องจริง แต่บทบาทในคดีใหญ่ยังไม่พิสูจน์")}
   ]
  },
  arman:{
   eye:tr("ARMAN STATUS","สถานะของ ARMAN"),title:tr("What role should Arman hold in the investigation?","ควรกำหนดสถานะของ Arman ในการสืบสวนอย่างไร"),
   options:[
    {id:"protected",title:tr("Protected technical witness","พยานด้านเทคนิคภายใต้การคุ้มครอง"),note:tr("Preserves cooperation while keeping his real offences on the record.","รักษาความร่วมมือไว้ โดยไม่ลบความผิดจริงออกจากบันทึก")},
    {id:"asset",title:tr("Confidential source under conditions","แหล่งข่าวลับภายใต้เงื่อนไข"),note:tr("More operational reach, weaker transparency and custody.","เข้าถึงข้อมูลปฏิบัติการได้มากขึ้น แต่ความโปร่งใสและ Chain of Custody อ่อนลง")},
    {id:"suspect",title:tr("Primary suspect pending corroboration","ผู้ต้องสงสัยหลักระหว่างรอหลักฐานยืนยัน"),note:tr("Legally cautious, but risks confusing tool authorship with murder ownership.","ระมัดระวังในทางคดี แต่เสี่ยงสับสนผู้สร้างเครื่องมือกับเจ้าของแผนฆาตกรรม")}
   ]
  },
  cache:{
   eye:tr("CACHE CUSTODY","การจัดการ CACHE"),title:tr("How should the local cache be preserved?","ควรรักษา Local Cache อย่างไร"),
   options:[
    {id:"seal",title:tr("Seal first, analyse second","ปิดผนึกก่อน แล้วค่อยวิเคราะห์"),note:tr("Strongest custody. The active route may expire.","Chain of Custody แข็งแรงที่สุด แต่เส้นทางที่ยังทำงานอยู่อาจหมดอายุ")},
    {id:"trace",title:tr("Request a controlled live trace","ขอทำ Controlled Live Trace"),note:tr("May expose the next handoff, and may expose North in return.","อาจเห็นการส่งต่อครั้งถัดไป และอาจเปิดตำแหน่งของ North กลับไปเช่นกัน")},
    {id:"mirror",title:tr("Create an authenticated safety mirror","สร้าง Safety Mirror ที่ยืนยันตัวตนได้"),note:tr("Preserves a second truth path outside the primary chain, with an admissibility cost.","เก็บเส้นทางความจริงสำรองนอก Chain หลัก แต่มีต้นทุนด้านการรับฟังเป็นหลักฐาน")}
   ]
  },
  north:{
   eye:tr("THREAT RESPONSE","การตอบสนองต่อภัยคุกคาม"),title:tr("How should the team respond to North being marked?","ทีมควรรับมืออย่างไรเมื่อ North ถูกหมายหัว"),
   options:[
    {id:"withdraw",title:tr("Pull North off field duty","ถอน North ออกจากภาคสนาม"),note:tr("Reduces exposure, but gives up the behaviour the adversary expects to see.","ลดการเปิดเผยตัว แต่เสียโอกาสใช้พฤติกรรมที่ฝ่ายตรงข้ามคาดว่าจะเห็น")},
    {id:"counteroperation",title:tr("Let North design the counteroperation","ให้ North ออกแบบปฏิบัติการโต้กลับ"),note:tr("Highest agency and intelligence value, with managed personal risk.","ให้สิทธิ์ตัดสินใจและคุณค่าทางข้อมูลสูงสุด แต่ยังมีความเสี่ยงส่วนบุคคล")},
    {id:"compartment",title:tr("Keep her active under compartmentalized protection","ให้เธอทำงานต่อภายใต้การคุ้มกันแบบจำกัดวง"),note:tr("Preserves secrecy and movement, but weakens wider institutional trust.","รักษาความลับและความคล่องตัว แต่ลดความเชื่อมั่นจากหน่วยงานวงกว้าง")}
   ]
  }
 };return map[kind]
}
function selectedChoice(kind){const p=phaseState();return kind==="dimas"?p?.dimasDisposition:kind==="arman"?p?.armanDisposition:kind==="cache"?p?.cacheDisposition:p?.northResponse}
function setSelectedChoice(kind,value){const p=ensureEntryState();if(!p)return;if(kind==="dimas")p.dimasDisposition=value;else if(kind==="arman")p.armanDisposition=value;else if(kind==="cache")p.cacheDisposition=value;else p.northResponse=value;save()}
function adjust(key,delta){const e=ensureEndingProfile();e[key]=Number(e[key]||0)+Number(delta||0)}
function applyChoice(kind,value){
 const p=ensureEntryState(),e=ensureEndingProfile();if(!p||p.choicesApplied[kind])return;p.choicesApplied[kind]=true;
 if(kind==="dimas"){
  if(value==="witness"){adjust("witnessProtection",2);adjust("allianceStrength",1);adjust("roleSeparation",2);adjust("corroborationBreadth",1)}
  if(value==="pressure"){adjust("attributionProof",1);adjust("witnessProtection",-1);adjust("institutionalTrust",-1)}
  if(value==="conspirator"){adjust("roleSeparation",-2);adjust("alternativeHypothesesPreserved",-1);adjust("institutionalTrust",1)}
 }
 if(kind==="arman"){
  if(value==="protected"){adjust("attributionProof",2);adjust("witnessProtection",1);adjust("alternativeHypothesesPreserved",1);e.armanStatus="protected_witness"}
  if(value==="asset"){adjust("publicRecordControl",1);adjust("chainOfCustody",-1);adjust("attributionProof",1);e.armanStatus="confidential_asset"}
  if(value==="suspect"){adjust("roleSeparation",-2);adjust("institutionalTrust",1);e.armanStatus="prime_suspect"}
 }
 if(kind==="cache"){
  if(value==="seal"){adjust("evidenceIntegrity",2);adjust("chainOfCustody",2);adjust("bangkokChainIntegrity",1)}
  if(value==="trace"){adjust("attributionProof",2);adjust("northSafety",-2);adjust("alternativeHypothesesPreserved",1);gs().flags.ch4_p4_live_trace_attempted=true}
  if(value==="mirror"){adjust("publicRecordControl",2);adjust("chainOfCustody",-1);adjust("evidenceIntegrity",1);gs().flags.ch4_p4_safety_mirror_created=true}
 }
 if(kind==="north"){
  if(value==="withdraw"){adjust("northSafety",2);adjust("attributionProof",-1);e.northStatus="protected_field_withdrawal"}
  if(value==="counteroperation"){adjust("allianceStrength",2);adjust("attributionProof",1);adjust("northSafety",-1);e.northStatus="consenting_counteroperation";gs().flags.ch4_p4_north_consent=true}
  if(value==="compartment"){adjust("allianceStrength",1);adjust("publicRecordControl",1);adjust("institutionalTrust",-1);adjust("northSafety",-1);e.northStatus="compartmentalized_active";gs().flags.ch4_p4_north_consent=true}
 }
 save()
}
function choiceFollowup(kind,value){
 if(kind==="dimas")return value==="witness"?[
  ["Benedict","serious","He is a witness who lied, not the man who wrote the lie. Separate them.","เขาเป็นพยานที่โกหก ไม่ใช่คนเขียนเรื่องโกหก แยกสองคนนี้ออกจากกัน"],
  ["Inspector Maya Pranoto","authoritative","Dimas, you’ll give a recorded statement.","Dimas คุณต้องให้ปากคำโดยบันทึกเสียงและภาพ"],
  ["Dimas Wibowo","guarded","And Arman?","แล้ว Arman ล่ะ"],
  ["Benedict","neutral","He gets his own conversation.","เรื่องของเขา เดี๋ยวแยกคุย"]
 ]:value==="pressure"?[
  ["Benedict","serious","Keep them apart. Ask again before he rebuilds the story.","แยกสองคนนี้ไว้ ถามซ้ำก่อนที่เขาจะเรียบเรียงเรื่องใหม่"],
  ["Inspector Cheryl Goh","focused_command","Document the timing. No threats.","บันทึกเวลาให้ครบ ห้ามข่มขู่"],
  ["Dimas Wibowo","defensive","You make that sound kind.","พูดซะเหมือนใจดี"],
  ["Inspector Cheryl Goh","serious","It isn’t. It’s clean.","ไม่ใช่ความใจดี แค่ทำให้กระบวนการสะอาด"]
 ]:[
  ["Benedict","serious","He knowingly stood between us and the source. Treat him as part of the conspiracy.","เขารู้ตัวว่ากำลังขวางเราจากต้นทาง ให้ดำเนินการในฐานะผู้ร่วมขบวนการ"],
  ["Inspector Maya Pranoto","authoritative","For obstruction, yes. The rest still needs evidence.","ในข้อหาขัดขวาง ใช่ ส่วนที่เหลือต้องมีหลักฐานเพิ่ม"],
  ["Benedict","neutral","Fair.","ตามนั้น"]
 ];
 if(kind==="arman")return value==="protected"?[
  ["Benedict","serious","Record him as a protected technical witness. Keep every offence attached to the file.","บันทึกเขาเป็นพยานด้านเทคนิคภายใต้การคุ้มครอง และเก็บความผิดทุกข้อไว้ในสำนวน"],
  ["Arman Suryadi","skeptical","Protection with an invoice.","การคุ้มครองที่แนบใบแจ้งหนี้มาด้วย"],
  ["Inspector Maya Pranoto","restrained_approval","That is usually how the law works.","กฎหมายก็มักคิดบัญชีแบบนี้แหละ"]
 ]:value==="asset"?[
  ["Benedict","serious","Use him as a confidential source. Every handoff gets a condition and a witness.","ใช้เขาเป็นแหล่งข่าวลับ ทุกการส่งมอบต้องมีเงื่อนไขและพยานรับรู้"],
  ["Inspector Cheryl Goh","skeptical","Useful is not the same as admissible.","ใช้ประโยชน์ได้ ไม่ได้แปลว่าศาลจะรับฟัง"],
  ["Arman Suryadi","smirk","Useful usually gets there first.","ของที่ใช้ได้จริงมักมาถึงก่อนของที่ใช้ในศาลได้"]
 ]:[
  ["Benedict","serious","Primary suspect until the record separates your tool from the killings.","ให้เป็นผู้ต้องสงสัยหลัก จนกว่าหลักฐานจะแยกเครื่องมือของคุณออกจากการฆาตกรรมได้"],
  ["Arman Suryadi","warning","Convenient.","สะดวกสำหรับพวกคุณดี"],
  ["North","serious","Convenience is exactly what we’re trying not to mistake for proof.","เพราะมันสะดวกนี่แหละ เราถึงต้องระวังไม่ให้กลายเป็นหลักฐานในหัวเรา"]
 ];
 if(kind==="cache")return value==="seal"?[
  ["Inspector Maya Pranoto","authoritative","The cache is sealed here. Farid analyses a verified copy after transfer.","ปิดผนึก Cache ที่นี่ Farid จะวิเคราะห์สำเนาที่ตรวจสอบแล้วหลังการส่งมอบ"],
  ["North","serious","We lose the live route.","เราจะเสียเส้นทางที่ยังทำงานอยู่"],
  ["Inspector Cheryl Goh","focused_command","We keep the evidence.","แต่เรารักษาหลักฐานไว้"]
 ]:value==="trace"?[
  ["Inspector Maya Pranoto","authoritative","One controlled trace. Read-only. The moment it leaves the authorised scope, we stop.","ทำ Controlled Trace หนึ่งครั้ง แบบอ่านอย่างเดียว พอออกนอกขอบเขตที่อนุญาต เราหยุดทันที"],
  ["North","concerned","If the route sees the challenge, it may see me.","ถ้าเส้นทางเห็น Challenge มันก็อาจเห็นฉัน"],
  ["Benedict","serious","Then you call the stop.","งั้นคุณเป็นคนสั่งหยุด"]
 ]:[
  ["North","serious","I’ll build a second mirror with an independent hash witness.","ฉันจะสร้าง Mirror ชุดที่สอง โดยมีพยานอิสระรับรอง Hash"],
  ["Inspector Cheryl Goh","focused_command","It may preserve the truth and still lose an admissibility fight.","มันอาจรักษาความจริงไว้ได้ แต่แพ้เรื่องการรับฟังเป็นหลักฐาน"],
  ["Benedict","neutral","Better than losing both.","ยังดีกว่าเสียทั้งสองอย่าง"]
 ];
 return value==="withdraw"?[
  ["Benedict","serious","North comes off field duty until we know what they can see.","North ถอนตัวจากภาคสนาม จนกว่าเราจะรู้ว่าฝั่งนั้นมองเห็นอะไรได้บ้าง"],
  ["North","skeptical","You can recommend it. You don’t get to decide it for me.","คุณเสนอได้ แต่ตัดสินใจแทนฉันไม่ได้"],
  ["Benedict","neutral","Then I’m recommending it.","งั้นผมกำลังเสนอ"],
  ["North","serious","Noted. I’ll take the protected position and stay on the analysis channel.","รับทราบ ฉันจะอยู่ในจุดที่คุ้มกันได้ และทำงานต่อผ่านช่องวิเคราะห์"]
 ]:value==="counteroperation"?[
  ["Benedict","serious","You design the counteroperation. Maya owns the perimeter. Cheryl owns the evidence rules.","คุณออกแบบปฏิบัติการโต้กลับ Maya คุมพื้นที่ Cheryl คุมมาตรฐานหลักฐาน"],
  ["North","confident","And you?","แล้วคุณล่ะ"],
  ["Benedict","smirk","I’ll try not to ruin the elegant parts.","ผมจะพยายามไม่ทำส่วนที่สวยงามของแผนพัง"],
  ["North","dry","A demanding assignment.","งานหนักอยู่นะ"]
 ]:[
  ["Benedict","serious","North stays active. Only this room knows the protection pattern.","North ทำงานต่อ มีเฉพาะคนในห้องนี้ที่รู้รูปแบบการคุ้มกัน"],
  ["Inspector Maya Pranoto","focused","My field team gets what they need, not the whole design.","ทีมภาคสนามของฉันจะรู้เท่าที่จำเป็น ไม่รู้แผนทั้งหมด"],
  ["North","serious","Compartmentalised, not excluded.","จำกัดวง ไม่ใช่กันฉันออก"],
  ["Benedict","neutral","Agreed.","ตกลง"]
 ]
}

function triadData(id){return{
 broker_language:{title:tr("Broker language","ภาษาของนายหน้า"),body:tr("Dimas uses the correct single-use rendezvous phrase and knows the prepared challenge sequence.","Dimas ใช้วลี Single-use Rendezvous ถูกต้อง และรู้ลำดับ Challenge ที่เตรียมไว้"),correct:"knowledge"},
 workshop_control:{title:tr("Workshop control","การควบคุมห้องทำงาน"),body:tr("His keys open the workshop. He knows the inventory, terminals and camera blind spots.","กุญแจของเขาเปิดห้องทำงานได้ เขารู้ตำแหน่งอุปกรณ์ เครื่อง Terminal และมุมอับของกล้อง"),correct:"access"},
 false_premise:{title:tr("Accepted false premise","ยอมรับหลักตั้งต้นที่ผิด"),body:tr("He agrees that PALIMPSEST rewrites server time, even though the preserved source behaviour rejects that mechanism.","เขายอมรับว่า PALIMPSEST แก้เวลาของเซิร์ฟเวอร์ ทั้งที่พฤติกรรมต้นฉบับที่เก็บไว้ปฏิเสธกลไกนี้"),correct:"contradiction"},
 source_behaviour:{title:tr("Source response grammar","รูปแบบการตอบสนองของต้นฉบับ"),body:tr("The sandboxed source rejects North’s premise using the same error grammar as the preserved build. Dimas cannot explain why.","ต้นฉบับใน Sandbox ปฏิเสธหลักของ North ด้วยรูปแบบ Error เดียวกับชุดสร้างที่เก็บไว้ แต่ Dimas อธิบายเหตุผลไม่ได้"),correct:"authorship"}
}[id]}
function layerLabel(id){return{knowledge:tr("SCRIPTED KNOWLEDGE","ความรู้จากบทที่เตรียมไว้"),access:tr("PHYSICAL ACCESS","สิทธิ์เข้าถึงสถานที่"),authorship:tr("SOURCE AUTHORSHIP","ความเป็นผู้สร้างต้นฉบับ"),contradiction:tr("CONTRADICTION","ข้อขัดแย้ง")}[id]}
function triadFeedback(id){return{
 broker_language:tr("Prepared vocabulary proves knowledge, not authorship.","คำศัพท์ที่เตรียมมาพิสูจน์ความรู้ ไม่ได้พิสูจน์ว่าเป็นผู้สร้าง"),
 workshop_control:tr("Keys and familiarity prove access to the room, not control of the source build.","กุญแจและความคุ้นเคยพิสูจน์การเข้าถึงห้อง ไม่ได้พิสูจน์ว่าเป็นผู้ควบคุม Source Build"),
 false_premise:tr("Agreement with a mechanism the source rejects is a contradiction.","การเห็นด้วยกับกลไกที่ต้นฉบับปฏิเสธคือข้อขัดแย้ง"),
 source_behaviour:tr("The source response tests authorship because it exposes logic that cannot be memorised from the handoff script.","การตอบสนองของต้นฉบับทดสอบความเป็นผู้สร้าง เพราะเผยตรรกะที่ท่องจากบทส่งมอบไม่ได้")
}[id]}
function evidenceData(id){return{
 ch4_p4_controlled_proxy:{title:tr("Controlled Proxy Pattern","รูปแบบนกต่อที่ถูกควบคุม"),code:"KNOWLEDGE + ACCESS / AUTHORSHIP MISMATCH",body:tr("Dimas possesses the handoff vocabulary and physical access but fails the source-behaviour test.","Dimas มีทั้งภาษาส่งมอบและสิทธิ์เข้าถึงสถานที่ แต่ไม่ผ่านการทดสอบพฤติกรรมต้นฉบับ"),proof:tr("SUPPORTS: DIMAS ACTED AS A CONTROLLED PROXY","สนับสนุน: DIMAS ทำหน้าที่เป็นนกต่อ"),limit:tr("DOES NOT PROVE: DIMAS KNEW THE CLIENT OR THE MURDER PLAN","ยังไม่พิสูจน์: DIMAS รู้ตัวลูกค้าหรือแผนฆาตกรรม")},
 ch4_p4_source_behaviour_match:{title:tr("Arman Source-Behaviour Match","พฤติกรรมต้นฉบับตรงกับ ARMAN"),code:"PALIMPSEST / ERROR-GRAMMAR MATCH",body:tr("Arman independently corrects the false premise and reproduces the preserved wrapper logic under controlled observation.","Arman แก้หลักตั้งต้นที่ผิดได้โดยอิสระ และแสดงตรรกะของ Wrapper ตรงกับข้อมูลที่เก็บไว้ภายใต้การสังเกตแบบควบคุม"),proof:tr("SUPPORTS: ARMAN AUTHORED OR ADAPTED THE WRAPPER","สนับสนุน: ARMAN สร้างหรือดัดแปลง WRAPPER"),limit:tr("DOES NOT PROVE: ARMAN SELECTED THE VICTIMS","ยังไม่พิสูจน์: ARMAN เป็นผู้เลือกเหยื่อ")},
 ch4_p4_blind_client_certificate:{title:tr("Blind Bangkok Client Certificate","CLIENT CERTIFICATE แบบปกปิดตัวตนจากกรุงเทพฯ"),code:"MERIDIAN-BKK / CERTIFICATE VALID / SUBJECT REDACTED",body:tr("The cache contains a valid Meridian Bangkok client class and deployment constraints, while the broker layer removes the individual client identity.","Cache มี Client Class ของ Meridian Bangkok ที่ถูกต้อง พร้อมเงื่อนไขการนำไปใช้ แต่ชั้นนายหน้าลบตัวตนของลูกค้ารายบุคคลออก"),proof:tr("SUPPORTS: A LEGITIMATE BANGKOK CLIENT SUPPLIED DEPLOYMENT CONDITIONS","สนับสนุน: ลูกค้าฝั่งกรุงเทพฯ ที่มีสิทธิ์ถูกต้องเป็นผู้ส่งเงื่อนไขการนำไปใช้"),limit:tr("DOES NOT PROVE: WHICH PERSON USED THE CERTIFICATE","ยังไม่พิสูจน์: บุคคลใดเป็นผู้ใช้ CERTIFICATE")},
 ch4_p4_analyst_threat_record:{title:tr("Analyst Threat Classification","บันทึกการจัดระดับภัยจากนักวิเคราะห์"),code:"SUBJECT N-32 / CAPABILITY ATTRIBUTION / STATUS ESCALATED",body:tr("The system escalates an analyst who can separate tool authorship, local deployment and decision ownership.","ระบบยกระดับนักวิเคราะห์ที่สามารถแยกผู้สร้างเครื่องมือ ผู้ติดตั้งในพื้นที่ และเจ้าของการตัดสินใจออกจากกัน"),proof:tr("SUPPORTS: NORTH HAS BECOME AN OPERATIONAL TARGET","สนับสนุน: NORTH กลายเป็นเป้าหมายเชิงปฏิบัติการ"),limit:tr("DOES NOT PROVE: WHO ISSUED THE ESCALATION","ยังไม่พิสูจน์: ใครเป็นผู้สั่งยกระดับ")},
 ch4_p4_coastal_reservation:{title:tr("Aster Coastal Reservation","การจองพื้นที่ชายฝั่งของ ASTER"),code:"ASTER RECOVERY / ARUNA COASTAL HOTEL / 10:30 WIB",body:tr("A regional recovery cutout reserves rooms and a poolside cabana after the analyst escalation is created.","บริษัทบังหน้าด้านการกู้คืนทรัพย์สินจองห้องพักและคาบาน่าริมสระหลังมีการสร้างคำสั่งยกระดับนักวิเคราะห์"),proof:tr("SUPPORTS: THE NEXT OPERATIONAL CONTACT IS AT ARUNA COASTAL HOTEL","สนับสนุน: จุดปฏิบัติการถัดไปอยู่ที่ ARUNA COASTAL HOTEL"),limit:tr("DOES NOT PROVE: THE IDENTITY OF THE FIELD OPERATOR","ยังไม่พิสูจน์: ตัวตนของผู้ปฏิบัติการภาคสนาม")}
}[id]}

function registerContent(){
 if(registryInstalled)return true;const api=window.LastWitnessContentRegistry;if(!api?.characters||!api?.evidence)return false;
 api.characters.arman={
  name:{en:"Arman Suryadi",th:"Arman Suryadi"},age:39,
  role:{en:"Wrapper Specialist · Technical Broker",th:"ผู้เชี่ยวชาญ Wrapper · นายหน้าทางเทคนิค"},
  status:{en:"Verified Toolmaker",th:"ผู้สร้างเครื่องมือที่ยืนยันตัวแล้ว"},
  bio:{en:"A PALIMPSEST wrapper specialist and blind broker. His source behaviour supports authorship, while victim selection and decision ownership remain unproven.",th:"ผู้เชี่ยวชาญ Wrapper ของ PALIMPSEST และนายหน้าแบบปกปิดตัวตน พฤติกรรมต้นฉบับสนับสนุนว่าเขาเป็นผู้สร้าง แต่ยังไม่พิสูจน์ว่าเป็นผู้เลือกเหยื่อหรือเจ้าของการตัดสินใจ"},
  src:ARMAN_BASE+"profile.png?v=0170",relation:{value:37},metrics:[
   {key:"trust",label:{en:"Trust",th:"ความไว้วางใจ"},value:24},
   {key:"credibility",label:{en:"Credibility",th:"ความน่าเชื่อถือ"},value:58},
   {key:"respect",label:{en:"Professional Respect",th:"ความนับถือทางวิชาชีพ"},value:69},
   {key:"suspicion",label:{en:"Suspicion",th:"ความสงสัย"},value:72}
  ]
 };
 api.evidence.ch4_p4_controlled_proxy={phase:"Chapter IV · The Man Behind the Alias",title:{en:"Controlled Proxy Pattern",th:"รูปแบบนกต่อที่ถูกควบคุม"}};
 api.evidence.ch4_p4_source_behaviour_match={phase:"Chapter IV · The Man Behind the Alias",title:{en:"Arman Source-Behaviour Match",th:"พฤติกรรมต้นฉบับตรงกับ Arman"}};
 api.evidence.ch4_p4_blind_client_certificate={phase:"Chapter IV · The Man Behind the Alias",title:{en:"Blind Bangkok Client Certificate",th:"Client Certificate แบบปกปิดตัวตนจากกรุงเทพฯ"}};
 api.evidence.ch4_p4_analyst_threat_record={phase:"Chapter IV · The Man Behind the Alias",title:{en:"Analyst Threat Classification",th:"บันทึกการจัดระดับภัยจากนักวิเคราะห์"}};
 api.evidence.ch4_p4_coastal_reservation={phase:"Chapter IV · The Man Behind the Alias",title:{en:"Aster Coastal Reservation",th:"การจองพื้นที่ชายฝั่งของ Aster"}};
 registryInstalled=true;
 const s=gs();if(s?.flags?.developer_character_unlock_all===true)api.unlockCharacter("arman",{unread:false,source:"dev",quiet:true});
 if(s?.flags?.developer_evidence_unlock_all===true)EVIDENCE_IDS.forEach(api.unlockEvidence);
 try{api.renderCharacters?.(true)}catch(_){};return true
}
function unlockArman(){
 const p=ensureEntryState(),api=window.LastWitnessContentRegistry;if(!p||p.armanUnlocked)return;p.armanUnlocked=true;registerContent();
 const fresh=api?.unlockCharacter?.("arman",{unread:true,source:"story"});const s=gs();s.characters=s.characters||{};s.characters["Arman Suryadi"]=true;s.relationships["Arman Suryadi"]=s.relationships["Arman Suryadi"]||{trust:24,respect:69,attachment:8,suspicion:72};
 s.flags.ch4_arman_identity_verified=true;if(fresh===false)try{api?.renderCharacters?.(true)}catch(_){};save()
}
function collectEvidence(id){
 const p=ensureEntryState();if(!p||!EVIDENCE_IDS.includes(id)||p.evidenceCollected.includes(id))return false;p.evidenceCollected.push(id);registerContent();try{window.LastWitnessContentRegistry?.unlockEvidence?.(id)}catch(_){};try{gs()?.found?.add?.(id)}catch(_){};save();return true
}

function triadStatus(text="",kind=""){const node=$("#ch4P4TriadStatus");if(!node)return;node.textContent=text;node.className="ch4-p4-status"+(kind?" "+kind:"")}
function renderTriadResult(){
 $("#ch4P4TriadWork")?.setAttribute("hidden","");
 $("#ch4P4TriadResult")?.removeAttribute("hidden");
 $("#ch4P4TriadResultTitle").textContent=tr("CONTROLLED PROXY","นกต่อที่ถูกควบคุม");
 $("#ch4P4TriadResultBody").textContent=tr("Dimas has prepared knowledge and physical access. The source behaviour places authorship elsewhere.","Dimas มีความรู้ที่เตรียมไว้และเข้าถึงสถานที่ได้ แต่พฤติกรรมต้นฉบับชี้ว่าผู้สร้างอยู่ที่อื่น");
 $("#ch4P4TriadFinish").textContent=tr("EXPOSE THE PROXY","เปิดโปงนกต่อ")
}
function renderTriad(){
 const p=ensureEntryState(),id=TRIAD_IDS[triadIndex],item=triadData(id);if(!p||!item)return;p.triangulationIndex=triadIndex;triadStatus();
 if(p.triangulationComplete){renderTriadResult();save();syncAudio();return}
 $("#ch4P4TriadResult")?.setAttribute("hidden","");$("#ch4P4TriadWork")?.removeAttribute("hidden");
 $("#ch4P4TriadCounter").textContent=`${triadIndex+1} / ${TRIAD_IDS.length}`;$("#ch4P4TriadRecordTitle").textContent=item.title;$("#ch4P4TriadRecordBody").textContent=item.body;
 const options=$("#ch4P4TriadOptions");options.innerHTML=TRIAD_LAYERS.map(layer=>`<button type="button" data-triad-layer="${layer}" class="${p.triangulationAssignments[id]===layer?"selected":""}" aria-pressed="${p.triangulationAssignments[id]===layer}">${layerLabel(layer)}</button>`).join("");
 const back=$("#ch4P4TriadBack"),next=$("#ch4P4TriadNext");back.disabled=triadIndex===0;next.disabled=!p.triangulationAssignments[id];next.textContent=triadIndex===TRIAD_IDS.length-1?tr("VERIFY PROFILE","ตรวจสอบโปรไฟล์"):tr("NEXT CLUE","เบาะแสถัดไป");save();syncAudio()
}
function openTriad(){const p=ensureEntryState();if(!p||dialogue)return;p.triangulationStarted=true;p.stage=p.triangulationComplete?"triangulation-result":"triangulation";triadOpen=true;triadIndex=p.triangulationIndex||0;$("#ch4P4Triad")?.classList.add("open");$("#ch4P4Triad")?.setAttribute("aria-hidden","false");setCheckpoint(p.triangulationComplete?"ch4_phase4_triangulation_result":"ch4_phase4_triangulation");renderTriad()}
function closeTriad(){triadOpen=false;$("#ch4P4Triad")?.classList.remove("open");$("#ch4P4Triad")?.setAttribute("aria-hidden","true");syncAudio()}
function resetTriad(){const p=ensureEntryState();if(!p)return;p.triangulationAssignments={};triadIndex=0;p.triangulationIndex=0;$("#ch4P4TriadResult")?.setAttribute("hidden","");$("#ch4P4TriadWork")?.removeAttribute("hidden");renderTriad()}
function previousTriad(){if(triadIndex<=0)return;triadIndex--;renderTriad();playInspection()}
function nextTriad(){const p=ensureEntryState(),id=TRIAD_IDS[triadIndex];if(!p?.triangulationAssignments[id])return;if(triadIndex<TRIAD_IDS.length-1){triadIndex++;renderTriad();playInspection();return}confirmTriad()}
function confirmTriad(){
 const p=ensureEntryState();if(!p||TRIAD_IDS.some(id=>!p.triangulationAssignments[id]))return;const wrong=TRIAD_IDS.filter(id=>p.triangulationAssignments[id]!==TRIAD_CORRECT[id]);
 if(wrong.length){p.triangulationAttempts++;triadIndex=TRIAD_IDS.indexOf(wrong[0]);p.triangulationIndex=triadIndex;renderTriad();triadStatus(triadFeedback(wrong[0]),"error");save();return}
 p.triangulationComplete=true;p.stage="triangulation-result";collectEvidence("ch4_p4_controlled_proxy");collectEvidence("ch4_p4_source_behaviour_match");playPuzzleSuccess();renderTriadResult();save()
}
function finishTriad(){const p=ensureEntryState();if(!p?.triangulationComplete)return;closeTriad();p.proxyExposed=true;p.stage="proxy-reveal";setCheckpoint("ch4_phase4_proxy_exposed");talk(D.proxyReveal,playReveal)}

function choiceStatus(text="",kind=""){const node=$("#ch4P4ChoiceStatus");if(!node)return;node.textContent=text;node.className="ch4-p4-status"+(kind?" "+kind:"")}
function renderChoice(){
 const p=ensureEntryState(),data=choiceData(activeChoiceKind);if(!p||!data)return;choiceStatus();$("#ch4P4ChoiceEye").textContent=data.eye;$("#ch4P4ChoiceTitle").textContent=data.title;
 const selected=selectedChoice(activeChoiceKind);$("#ch4P4ChoiceOptions").innerHTML=data.options.map(opt=>`<button type="button" data-choice-value="${opt.id}" class="${selected===opt.id?"selected":""}" aria-pressed="${selected===opt.id}"><b>${opt.title}</b><small>${opt.note}</small></button>`).join("");
 const confirm=$("#ch4P4ChoiceConfirm");confirm.textContent=tr("CONFIRM","ยืนยัน");confirm.disabled=!selected;save();syncAudio()
}
function openChoice(kind){const p=ensureEntryState();if(!p||!CHOICE_KINDS.includes(kind))return;activeChoiceKind=kind;choiceOpen=true;p.stage=kind+"-choice";$("#ch4P4Choice")?.classList.add("open");$("#ch4P4Choice")?.setAttribute("aria-hidden","false");setCheckpoint("ch4_phase4_"+kind+"_choice");renderChoice()}
function closeChoice(){choiceOpen=false;activeChoiceKind="";$("#ch4P4Choice")?.classList.remove("open");$("#ch4P4Choice")?.setAttribute("aria-hidden","true");syncAudio()}
function afterChoiceFollowup(kind){
 const p=ensureEntryState();if(!p)return;
 if(kind==="dimas"){p.stage="arman-exchange";setCheckpoint("ch4_phase4_arman_exchange");talk(D.admissions,()=>openChoice("arman"));return}
 if(kind==="arman"){p.stage="cache-choice";setCheckpoint("ch4_phase4_cache_choice");openChoice("cache");return}
 if(kind==="cache"){p.stage="cache-review";setCheckpoint("ch4_phase4_cache_review");openCache();return}
 p.stage="closing";setCheckpoint("ch4_phase4_closing");talk(closingForNorth(p.northResponse),completePhase)
}
function runChoiceFollowup(kind){
 const p=ensureEntryState(),value=selectedChoice(kind);if(!p||!value)return;p.stage=kind+"-followup";setCheckpoint("ch4_phase4_"+kind+"_followup");talk(choiceFollowup(kind,value),()=>afterChoiceFollowup(kind))
}
function confirmChoice(){
 const p=ensureEntryState(),kind=activeChoiceKind,value=selectedChoice(kind);if(!p||!kind||!value)return;applyChoice(kind,value);closeChoice();runChoiceFollowup(kind)
}

function renderCache(){
 const p=ensureEntryState(),id=CACHE_IDS[cacheIndex],data=evidenceData(id);if(!p||!data)return;p.activeCacheIndex=cacheIndex;if(!p.evidenceViewed.includes(id))p.evidenceViewed.push(id);
 $("#ch4P4CacheCounter").textContent=`${cacheIndex+1} / ${CACHE_IDS.length}`;$("#ch4P4CacheTitle").textContent=data.title;$("#ch4P4CacheCode").textContent=data.code;$("#ch4P4CacheBody").textContent=data.body;$("#ch4P4CacheProof").textContent=data.proof;$("#ch4P4CacheLimit").textContent=data.limit;
 const collected=p.evidenceCollected.includes(id),all=CACHE_IDS.every(x=>p.evidenceCollected.includes(x));$("#ch4P4CacheCollect").hidden=collected;$("#ch4P4CacheReviewed").hidden=!collected;$("#ch4P4CacheFinish").hidden=!all;save();syncAudio()
}
function openCache(){const p=ensureEntryState();if(!p)return;cacheOpen=true;cacheIndex=p.activeCacheIndex||0;$("#ch4P4Cache")?.classList.add("open");$("#ch4P4Cache")?.setAttribute("aria-hidden","false");setCheckpoint("ch4_phase4_cache_review");renderCache()}
function closeCache(){cacheOpen=false;$("#ch4P4Cache")?.classList.remove("open");$("#ch4P4Cache")?.setAttribute("aria-hidden","true");syncAudio()}
function collectCache(){const id=CACHE_IDS[cacheIndex];if(collectEvidence(id)){playInspection();renderCache()}}
function nextCache(){cacheIndex=(cacheIndex+1)%CACHE_IDS.length;playInspection();renderCache()}
function previousCache(){cacheIndex=(cacheIndex-1+CACHE_IDS.length)%CACHE_IDS.length;playInspection();renderCache()}
function finishCache(){const p=ensureEntryState();if(!p||!CACHE_IDS.every(id=>p.evidenceCollected.includes(id)))return;p.cacheReviewComplete=true;p.stage="threat";closeCache();setCheckpoint("ch4_phase4_threat");talk(D.threat,()=>openChoice("north"))}

function startScore(){const a=score();if(!a)return;try{a.loop=true;a.currentTime=0;a.muted=false;a.volume=0;a.play().catch(()=>{})}catch(_){};syncAudio()}
function playVideo(video,finish,playButtonSelector){
 const playButton=$(playButtonSelector);playButton?.setAttribute("hidden","");
 if(!video){finish();return}video.currentTime=0;video.muted=false;video.playsInline=true;video.onended=finish;video.onerror=finish;syncAudio();
 const result=video.play();if(result?.then)result.then(()=>playButton?.setAttribute("hidden","")).catch(()=>playButton?.removeAttribute("hidden"))
}
function finishApproach(){const p=ensureEntryState();if(!p||p.approachComplete)return;stopElement(approachVideo(),true);$("#ch4P4VideoPlay")?.setAttribute("hidden","");p.approachComplete=true;p.stage="location";setCheckpoint("ch4_phase4_location");showLocationCard()}
function playApproach(){
 const p=ensureEntryState();if(!p)return;p.started=true;p.stage="approach";const s=gs();s.chapter=4;s.screen=APPROACH;safeShow(APPROACH);startScore();setCheckpoint("ch4_phase4_approach");
 const video=approachVideo();$("#ch4P4ApproachSkip").hidden=false;$("#ch4P4VideoPlay")?.setAttribute("hidden","");playVideo(video,finishApproach,"#ch4P4VideoPlay")
}
function showLocationCard(){const p=ensureEntryState();if(!p)return;p.approachComplete=true;p.stage="location";safeShow(LOCATION);syncAudio();save()}
function enterStairwell(){const p=ensureEntryState();if(!p)return;p.locationCardSeen=true;p.stage="stairwell";setCheckpoint("ch4_phase4_stairwell");safeShow(STAIRWELL);talk(D.stair,()=>{p.stairwellComplete=true;p.stage="workshop";setCheckpoint("ch4_phase4_workshop");enterWorkshop()})}
function enterWorkshop(){
 const p=ensureEntryState();if(!p)return;safeShow(WORKSHOP);if(p.workshopIntroComplete){openTriad();return}
 talk(D.workshop,()=>talk(D.falsePremise,()=>{p.workshopIntroComplete=true;p.stage="triangulation";setCheckpoint("ch4_phase4_triangulation");openTriad()}))
}
function playReveal(){
 const p=ensureEntryState();if(!p)return;p.revealStarted=true;p.stage="reveal";setCheckpoint("ch4_phase4_reveal");safeShow(REVEAL);$("#ch4P4RevealSkip").hidden=false;playVideo(revealVideo(),finishReveal,"#ch4P4RevealPlay")
}
function finishReveal(){
 const p=ensureEntryState();if(!p||p.revealComplete)return;stopElement(revealVideo(),true);$("#ch4P4RevealPlay")?.setAttribute("hidden","");p.revealComplete=true;p.stage="arman-intro";unlockArman();setCheckpoint("ch4_phase4_arman_verified");safeShow(WORKSHOP);talk(D.armanIntro,()=>openChoice("dimas"))
}
function completePhase(){
 const p=ensureEntryState();if(!p)return;p.closingDialogueComplete=true;p.complete=true;p.stage="complete";const s=gs();s.flags.ch4_p4_proxy_verified=true;s.flags.ch4_p4_arman_authorship_supported=true;s.flags.ch4_p4_bangkok_client_certificate=true;s.flags.ch4_p4_north_marked=true;s.flags.ch4_p4_phase5_location_established=true;s.flags.ch4_p4_decision_owner_unresolved=true;s.screen=COMPLETE;s.progress=100;setCheckpoint("ch4_phase4_complete");fade(score(),0,700);clearTimer();transitionTimer=setTimeout(showComplete,720)
}
function showComplete(){const p=ensureEntryState();if(!p)return;p.complete=true;p.stage="complete";safeShow(COMPLETE);stopElement(approachVideo(),true);stopElement(revealVideo(),true);updateLanguage();save()}
function returnToTitle(){stopAudio(true);closeAll();try{save()}catch(_){};try{window.LastWitnessChapter4Phase3?.returnToTitle?.()}catch(_){$$(".screen").forEach(node=>node.classList.remove("active"));$("#title")?.classList.add("active");if(gs())gs().screen="title"}}

function phase3Ready(){return Boolean(gs()?.chapter4?.phase3?.complete&&gs()?.flags?.ch4_p3_broker_inquiry_authorised)}
function startFromPhase3(){
 const s=gs();if(!s||!phase3Ready())return false;inject();stopForeignAudio();closeAll();const p=ensureEntryState();$("#"+P3_COMPLETE)?.classList.remove("active");
 if(p.started&&p.stage!=="approach"){s.chapter=4;resumeFromState(s.screen);return true}
 p.started=true;p.stage="approach";s.chapter=4;s.screen=APPROACH;playApproach();return true
}
function resetPhase4(){const s=gs();if(!s)return;s.chapter4=s.chapter4||{};s.chapter4.phase4=defaults();["ch4_p4_proxy_verified","ch4_p4_arman_authorship_supported","ch4_p4_bangkok_client_certificate","ch4_p4_north_marked","ch4_p4_phase5_location_established","ch4_p4_decision_owner_unresolved","ch4_p4_live_trace_attempted","ch4_p4_safety_mirror_created","ch4_p4_north_consent","ch4_arman_identity_verified"].forEach(key=>delete s.flags?.[key]);EVIDENCE_IDS.forEach(id=>{try{s.found?.delete?.(id)}catch(_){}})}
function primePhase3CompleteForDev(){
 const s=gs();if(!s)return;s.chapter=4;s.chapter4=s.chapter4||{};s.flags=s.flags||{};
 s.chapter4.phase3=Object.assign({started:true,introComplete:true,captureAuthorized:true,evidenceCollected:["source_build_hash","broker_ledger_fragment","jakarta_authorization_echo","deployment_condition_echo"],evidenceViewed:["source_build_hash","broker_ledger_fragment","jakarta_authorization_echo","deployment_condition_echo"],activeEvidenceId:"deployment_condition_echo",evidenceDebriefSeen:true,trailDebriefSeen:true,provenanceAssignments:{source_build:"origin",relay_exit:"route",broker_handoff:"broker",deployment_echo:"deployment",decision_trigger:"unknown"},provenanceAttempts:0,provenanceComplete:true,activeTrailIndex:4,leadChoice:"trace_handle",leadAttempts:0,leadComplete:true,authorshipComplete:true,legalDebriefSeen:true,brokerLeadEstablished:true,brokerHandle:"unverified",armanLeadStatus:"probable-toolmaker-or-broker",closingDialogueComplete:true,complete:true,stage:"complete"},s.chapter4.phase3||{});
 s.flags.ch4_p3_palimsest_build_proven=true;s.flags.ch4_p3_jakarta_handoff_proven=true;s.flags.ch4_p3_bangkok_deployment_supported=true;s.flags.ch4_p3_decision_owner_unresolved=true;s.flags.ch4_p3_broker_inquiry_authorised=true
}
function startFreshForDev(){stopAudio(true);closeAll();primePhase3CompleteForDev();resetPhase4();startFromPhase3()}

function resumeFromState(screen){
 const p=ensureEntryState();if(!p)return;document.body.classList.remove("lw-ch4-p4-restoring");closeAll();
 if(p.complete||screen===COMPLETE){showComplete();return}
 if(p.stage==="approach"){playApproach();return}
 if(p.stage==="location"){showLocationCard();return}
 if(p.stage==="stairwell"){safeShow(STAIRWELL);talk(D.stair,()=>{p.stairwellComplete=true;p.stage="workshop";enterWorkshop()});return}
 safeShow(WORKSHOP);
 if(p.stage==="workshop"){enterWorkshop();return}
 if(p.stage==="triangulation"||p.stage==="triangulation-result"){openTriad();if(p.triangulationComplete){$("#ch4P4TriadWork")?.setAttribute("hidden","");$("#ch4P4TriadResult")?.removeAttribute("hidden")}return}
 if(p.stage==="proxy-reveal"){talk(D.proxyReveal,playReveal);return}
 if(p.stage==="reveal"){playReveal();return}
 if(p.stage==="arman-intro"){unlockArman();talk(D.armanIntro,()=>openChoice("dimas"));return}
 if(p.stage==="dimas-choice"){openChoice("dimas");return}
 if(p.stage==="dimas-followup"){runChoiceFollowup("dimas");return}
 if(p.stage==="arman-exchange"){talk(D.admissions,()=>openChoice("arman"));return}
 if(p.stage==="arman-choice"){openChoice("arman");return}
 if(p.stage==="arman-followup"){runChoiceFollowup("arman");return}
 if(p.stage==="cache-choice"){openChoice("cache");return}
 if(p.stage==="cache-followup"){runChoiceFollowup("cache");return}
 if(p.stage==="cache-review"){openCache();return}
 if(p.stage==="threat"){talk(D.threat,()=>openChoice("north"));return}
 if(p.stage==="north-choice"){openChoice("north");return}
 if(p.stage==="north-followup"){runChoiceFollowup("north");return}
 if(p.stage==="closing"){talk(closingForNorth(p.northResponse),completePhase);return}
 enterWorkshop()
}
function isSavedPhase4(data){return Boolean(data?.chapter4?.phase4?.started||String(data?.checkpoint||"").startsWith("ch4_phase4_")||SCREENS.has(data?.screen))}
function installSaveBridge(){
 if(window.__lwChapter4Phase4SaveBridge0170)return;window.__lwChapter4Phase4SaveBridge0170=true;const baseRestore=typeof restore==="function"?restore:window.restore;
 if(typeof baseRestore==="function"){
  const wrapped=function(data){
   const owns=isSavedPhase4(data);let oldPhase3Started;
   if(owns&&data?.chapter4?.phase3){oldPhase3Started=data.chapter4.phase3.started;data.chapter4.phase3.started=false}
   if(owns)document.body.classList.add("lw-ch4-p4-restoring");const result=baseRestore.apply(this,arguments);
   if(owns&&data?.chapter4?.phase3){data.chapter4.phase3.started=oldPhase3Started;if(gs()?.chapter4?.phase3)gs().chapter4.phase3.started=oldPhase3Started}
   if(owns)setTimeout(()=>resumeFromState(data.screen),340);return result
  };
  try{restore=wrapped}catch(_){}window.restore=wrapped;if(window.LastWitnessSaveManager)window.LastWitnessSaveManager.restore=wrapped
 }
 const baseLabel=typeof screenLabel==="function"?screenLabel:window.screenLabel;if(typeof baseLabel==="function"){
  const wrapped=function(data){if(data?.screen===COMPLETE)return tr("Chapter IV · Arman Identified","บทที่ IV · ยืนยันตัว Arman");if(data?.chapter4?.phase4?.started)return tr("Chapter IV · The Man Behind the Alias","บทที่ IV · ชายผู้อยู่หลังนามแฝง");return baseLabel.apply(this,arguments)};try{screenLabel=wrapped}catch(_){}window.screenLabel=wrapped
 }
}
function installDevJump(){
 const grid=$("#developerModal .dev-grid");if(!grid)return;let button=grid.querySelector('[data-dev-jump="chapter4ArmanEncounter"]');if(!button){button=document.createElement("button");button.className="dev-button";button.type="button";button.dataset.devJump="chapter4ArmanEncounter";grid.appendChild(button)}button.textContent=tr("Chapter IV · The Man Behind the Alias","บทที่ IV · ชายผู้อยู่หลังนามแฝง");if(button.dataset.lwBound0170==="1")return;button.dataset.lwBound0170="1";button.addEventListener("click",event=>{event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();$("#developerModal")?.classList.remove("open");startFreshForDev()},true)
}
function installHandoffButton(){
 const card=$("#"+P3_COMPLETE+" .ch4-p3-complete-card");if(!card)return;let button=$("#ch4P4Continue");if(!button){button=document.createElement("button");button.id="ch4P4Continue";button.type="button";button.className="primary ch4-p4-handoff";card.insertBefore(button,$("#ch4P3ReturnTitle"))}button.textContent=tr("CONTINUE TO PHASE IV","ดำเนินต่อไปยังเฟส IV");if(button.dataset.lwBound0170==="1")return;button.dataset.lwBound0170="1";button.addEventListener("click",event=>{event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();startFromPhase3()},true)
}
function appendCaseEvidence(){
 const list=$("#caseList"),p=phaseState();if(!list)return;$('[data-ch4-p4-case-section]',list)?.remove();$$('[data-ch4-p4-case-entry]',list).forEach(node=>node.remove());if(!p?.evidenceCollected?.length)return;
 const heading=document.createElement("div");heading.className="case-section-title";heading.dataset.ch4P4CaseSection="1";heading.textContent=tr("CHAPTER IV · THE MAN BEHIND THE ALIAS","บทที่ IV · ชายผู้อยู่หลังนามแฝง");list.appendChild(heading);
 p.evidenceCollected.forEach(id=>{const data=evidenceData(id);if(!data)return;const row=document.createElement("div");row.className="case-row";row.dataset.ch4P4CaseEntry=id;row.innerHTML=`<b>${data.title}</b><div>${data.body}<br><strong>${data.proof}</strong><br><small>${data.limit}</small></div>`;list.appendChild(row)})
}

function updateLanguage(){
 const map={
  ch4P4ApproachEye:tr("CHAPTER IV · PHASE IV","บทที่ IV · เฟส IV"),ch4P4ApproachTitle:tr("THE MAN BEHIND THE ALIAS","ชายผู้อยู่หลังนามแฝง"),ch4P4ApproachSkip:tr("SKIP","ข้าม"),ch4P4VideoPlay:tr("PLAY","เล่น"),ch4P4RevealPlay:tr("PLAY REVEAL","เล่นฉากเปิดตัว"),
  ch4P4LocationEye:tr("DAY 5 · 01:52 WIB","วันที่ 5 · 01:52 WIB"),ch4P4LocationCity:tr("EAST JAKARTA","จาการ์ตาตะวันออก"),ch4P4LocationName:"SURYA ELEKTRONIK",ch4P4LocationBody:tr("The broker handle resolves to a workshop operating behind a legitimate electronics storefront.","นามแฝงของนายหน้าชี้มาที่ห้องทำงานซึ่งซ่อนอยู่หลังร้านอิเล็กทรอนิกส์ที่ดำเนินกิจการจริง"),ch4P4LocationContinue:tr("ENTER THE BUILDING","เข้าไปในอาคาร"),
  ch4P4StairLabel:tr("SURYA ELEKTRONIK · SERVICE STAIRWELL","SURYA ELEKTRONIK · บันไดบริการ"),ch4P4StairObjective:tr("Reach the workshop under Maya’s controlled-contact authority.","ขึ้นไปยังห้องทำงานภายใต้อำนาจการเข้าพบแบบควบคุมของ Maya"),
  ch4P4WorkshopLabel:tr("SURYA ELEKTRONIK · WORKSHOP","SURYA ELEKTRONIK · ห้องทำงาน"),ch4P4WorkshopObjective:tr("Verify the person behind the broker handle without mistaking access for identity.","ยืนยันบุคคลหลังนามแฝงของนายหน้า โดยไม่สับสนสิทธิ์เข้าถึงกับตัวตน"),
  ch4P4RevealSkip:tr("SKIP","ข้าม"),ch4P4TriadEye:tr("PERSONA TRIANGULATION","การตรวจสอบตัวตนสามชั้น"),ch4P4TriadTitle:tr("Separate knowledge, access and authorship","แยกความรู้ สิทธิ์เข้าถึง และความเป็นผู้สร้าง"),ch4P4TriadQuestion:tr("Which layer does this observation test?","ข้อสังเกตนี้ใช้ทดสอบชั้นใด"),ch4P4TriadReset:tr("START OVER","เริ่มใหม่"),ch4P4TriadBack:tr("BACK","ย้อนกลับ"),ch4P4TriadSummaryKnowledge:tr("KNOWLEDGE · SUPPORTED","ความรู้ · สนับสนุน"),ch4P4TriadSummaryAccess:tr("ACCESS · SUPPORTED","สิทธิ์เข้าถึง · สนับสนุน"),ch4P4TriadSummaryAuthorship:tr("AUTHORSHIP · CONTRADICTED","ความเป็นผู้สร้าง · ขัดแย้ง"),ch4P4ChoiceClose:tr("RESPONSE REQUIRED","ต้องเลือกคำตอบ"),ch4P4CacheEye:tr("LOCAL CACHE REVIEW","ตรวจสอบ LOCAL CACHE"),ch4P4CacheClose:tr("REVIEW ALL","ตรวจให้ครบ"),ch4P4CachePrevious:tr("PREVIOUS","ก่อนหน้า"),ch4P4CacheNext:tr("NEXT","ถัดไป"),ch4P4CacheCollect:tr("ADD TO CASE FILE","เพิ่มในสำนวน"),ch4P4CacheReviewed:tr("COLLECTED","เก็บแล้ว"),ch4P4CacheFinish:tr("CONNECT THE RECORDS","เชื่อมโยงบันทึก"),
  ch4P4CompleteEye:tr("CHAPTER IV · PHASE IV COMPLETE","บทที่ IV · เฟส IV เสร็จสมบูรณ์"),ch4P4CompleteTitle:tr("IDENTITY VERIFIED","ยืนยันตัวตนแล้ว"),ch4P4CompleteBody:tr("The proxy, toolmaker and Bangkok client layer are separated. The decision owner remains unresolved, and North is now an operational target.","แยกนกต่อ ผู้สร้างเครื่องมือ และชั้นลูกค้าฝั่งกรุงเทพฯ ออกจากกันแล้ว เจ้าของการตัดสินใจยังไม่ถูกระบุ และ North กลายเป็นเป้าหมายเชิงปฏิบัติการ"),ch4P4ResultProxy:tr("PROXY","นกต่อ"),ch4P4ResultToolmaker:tr("TOOLMAKER","ผู้สร้างเครื่องมือ"),ch4P4ResultClient:tr("CLIENT LAYER","ชั้นลูกค้า"),ch4P4ResultDecision:tr("DECISION OWNER","เจ้าของการตัดสินใจ"),ch4P4ValueProxy:"DIMAS WIBOWO",ch4P4ValueToolmaker:"ARMAN SURYADI",ch4P4ValueClient:tr("MERIDIAN BANGKOK · BLIND","MERIDIAN BANGKOK · ปกปิดตัวตน"),ch4P4ValueDecision:tr("UNRESOLVED","ยังระบุไม่ได้"),ch4P4Next:tr("NEXT · PHASE V · NORTH IS MARKED","ถัดไป · เฟส V · NORTH ถูกหมายหัว"),ch4P4ReturnTitle:tr("RETURN TO TITLE","กลับหน้าหลัก")
 };
 Object.entries(map).forEach(([id,value])=>{const node=$("#"+id);if(node)node.textContent=value});
 installHandoffButton();installDevJump();if(dialogue)renderDialogue();if(triadOpen)renderTriad();if(choiceOpen)renderChoice();if(cacheOpen)renderCache();setBuild()
}

function inject(){
 if($("#"+APPROACH))return;const game=$("#game");if(!game)return;
 game.insertAdjacentHTML("beforeend",`
 <section id="${APPROACH}" class="screen ch4-p4-video-screen"><video id="ch4P4ApproachVideo" playsinline preload="auto" poster="${BASE}vehicle-arrival-poster.jpg?v=0170"><source src="${VIDEO_BASE}vehicle-arrival.mp4?v=0170" type="video/mp4"></video><div class="ch4-p4-video-shade"></div><div class="ch4-p4-video-title"><div id="ch4P4ApproachEye" class="eyebrow"></div><h2 id="ch4P4ApproachTitle"></h2></div><button id="ch4P4VideoPlay" class="primary ch4-p4-video-play" type="button" hidden></button><button id="ch4P4ApproachSkip" class="ghost ch4-p4-skip" type="button"></button><div id="${APPROACH}Dialogue" class="dialogue ch4-p4-dialogue hidden"></div></section>
 <section id="${LOCATION}" class="screen ch4-p4-location"><div class="ch4-p4-location-card"><div id="ch4P4LocationEye" class="eyebrow"></div><div id="ch4P4LocationCity" class="ch4-p4-location-city"></div><h2 id="ch4P4LocationName"></h2><div class="ch4-p4-location-rule"></div><p id="ch4P4LocationBody"></p><button id="ch4P4LocationContinue" class="primary" type="button"></button></div><div id="${LOCATION}Dialogue" class="dialogue ch4-p4-dialogue hidden"></div></section>
 <section id="${STAIRWELL}" class="screen ch4-p4-scene ch4-p4-stair"><img class="scene" src="${BASE}stairwell.png?v=0170" alt=""><div class="ch4-p4-overlay"></div><div id="ch4P4StairLabel" class="ch4-p4-label"></div><div id="ch4P4StairObjective" class="ch4-p4-objective"></div><div id="${STAIRWELL}Dialogue" class="dialogue ch4-p4-dialogue hidden"></div></section>
 <section id="${WORKSHOP}" class="screen ch4-p4-scene ch4-p4-workshop"><img class="scene" src="${BASE}workshop.png?v=0170" alt=""><div class="ch4-p4-overlay"></div><div id="ch4P4WorkshopLabel" class="ch4-p4-label"></div><div id="ch4P4WorkshopObjective" class="ch4-p4-objective"></div><div id="${WORKSHOP}Dialogue" class="dialogue ch4-p4-dialogue hidden"></div></section>
 <section id="${REVEAL}" class="screen ch4-p4-video-screen"><video id="ch4P4RevealVideo" playsinline preload="auto" poster="${BASE}arman-reveal-poster.jpg?v=0170"><source src="${VIDEO_BASE}arman-reveal.mp4?v=0170" type="video/mp4"></video><div class="ch4-p4-video-shade ch4-p4-reveal-shade"></div><button id="ch4P4RevealPlay" class="primary ch4-p4-video-play" type="button" hidden></button><button id="ch4P4RevealSkip" class="ghost ch4-p4-skip" type="button"></button><div id="${REVEAL}Dialogue" class="dialogue ch4-p4-dialogue hidden"></div></section>
 <div id="ch4P4Triad" class="modal ch4-p4-modal ch4-p4-triad" aria-hidden="true"><div class="modal-card"><header><div><div id="ch4P4TriadEye" class="eyebrow"></div><h3 id="ch4P4TriadTitle"></h3></div><span id="ch4P4TriadCounter" class="ch4-p4-counter"></span></header><div id="ch4P4TriadWork"><article class="ch4-p4-record"><h4 id="ch4P4TriadRecordTitle"></h4><p id="ch4P4TriadRecordBody"></p></article><p id="ch4P4TriadQuestion" class="ch4-p4-question"></p><div id="ch4P4TriadOptions" class="ch4-p4-triad-options"></div><div id="ch4P4TriadStatus" class="ch4-p4-status" aria-live="polite"></div><footer><button id="ch4P4TriadReset" class="ghost" type="button"></button><button id="ch4P4TriadBack" class="ghost" type="button"></button><button id="ch4P4TriadNext" class="primary" type="button"></button></footer></div><div id="ch4P4TriadResult" class="ch4-p4-triad-result" hidden><div class="ch4-p4-triad-rings"><i></i><i></i><i></i></div><h3 id="ch4P4TriadResultTitle"></h3><p id="ch4P4TriadResultBody"></p><div class="ch4-p4-triad-summary"><span id="ch4P4TriadSummaryKnowledge"></span><span id="ch4P4TriadSummaryAccess"></span><span id="ch4P4TriadSummaryAuthorship"></span></div><button id="ch4P4TriadFinish" class="primary" type="button"></button></div></div></div>
 <div id="ch4P4Choice" class="modal ch4-p4-modal ch4-p4-choice" aria-hidden="true"><div class="modal-card"><header><div><div id="ch4P4ChoiceEye" class="eyebrow"></div><h3 id="ch4P4ChoiceTitle"></h3></div><button id="ch4P4ChoiceClose" class="ghost ch4-p4-close" type="button" disabled></button></header><div id="ch4P4ChoiceOptions" class="ch4-p4-choice-options"></div><div id="ch4P4ChoiceStatus" class="ch4-p4-status" aria-live="polite"></div><footer><button id="ch4P4ChoiceConfirm" class="primary" type="button"></button></footer></div></div>
 <div id="ch4P4Cache" class="modal ch4-p4-modal ch4-p4-cache" aria-hidden="true"><div class="modal-card"><header><div><div id="ch4P4CacheEye" class="eyebrow"></div><h3 id="ch4P4CacheTitle"></h3></div><div class="ch4-p4-head-actions"><span id="ch4P4CacheReviewed" class="ch4-p4-reviewed" hidden></span><span id="ch4P4CacheCounter" class="ch4-p4-counter"></span><button id="ch4P4CacheClose" class="ghost ch4-p4-close" type="button" disabled></button></div></header><div class="ch4-p4-cache-scroll"><div id="ch4P4CacheCode" class="ch4-p4-cache-code"></div><p id="ch4P4CacheBody"></p><strong id="ch4P4CacheProof"></strong><small id="ch4P4CacheLimit"></small></div><footer><button id="ch4P4CachePrevious" class="ghost" type="button"></button><button id="ch4P4CacheNext" class="ghost" type="button"></button><button id="ch4P4CacheCollect" class="primary" type="button"></button><button id="ch4P4CacheFinish" class="primary" type="button" hidden></button></footer></div></div>
 <section id="${COMPLETE}" class="screen ch4-p4-complete"><div class="ch4-p4-complete-card"><div id="ch4P4CompleteEye" class="eyebrow"></div><h2 id="ch4P4CompleteTitle"></h2><div class="ch4-p4-location-rule"></div><p id="ch4P4CompleteBody"></p><div class="ch4-p4-complete-grid"><div><span id="ch4P4ResultProxy"></span><b id="ch4P4ValueProxy"></b></div><div><span id="ch4P4ResultToolmaker"></span><b id="ch4P4ValueToolmaker"></b></div><div><span id="ch4P4ResultClient"></span><b id="ch4P4ValueClient"></b></div><div><span id="ch4P4ResultDecision"></span><b id="ch4P4ValueDecision"></b></div></div><strong id="ch4P4Next"></strong><button id="ch4P4ReturnTitle" class="primary" type="button"></button></div><div id="${COMPLETE}Dialogue" class="dialogue ch4-p4-dialogue hidden"></div></section>
 <audio id="ch4P4Score" preload="auto" loop><source src="${AUDIO_BASE}arman-appearance-loop.ogg?v=0170" type="audio/ogg"><source src="${AUDIO_BASE}arman-appearance-loop.mp3?v=0170" type="audio/mpeg"></audio>`);
 bindElements();updateLanguage()
}
function bindElements(){
 if(videoBound)return;videoBound=true;
 $("#ch4P4ApproachSkip").onclick=finishApproach;$("#ch4P4VideoPlay").onclick=()=>playVideo(approachVideo(),finishApproach,"#ch4P4VideoPlay");$("#ch4P4LocationContinue").onclick=enterStairwell;$("#ch4P4RevealSkip").onclick=finishReveal;$("#ch4P4RevealPlay").onclick=()=>playVideo(revealVideo(),finishReveal,"#ch4P4RevealPlay");
 $("#ch4P4TriadReset").onclick=resetTriad;$("#ch4P4TriadBack").onclick=previousTriad;$("#ch4P4TriadNext").onclick=nextTriad;$("#ch4P4TriadFinish").onclick=finishTriad;
 $("#ch4P4TriadOptions").onclick=event=>{const button=event.target.closest?.("[data-triad-layer]");if(!button)return;const p=ensureEntryState(),id=TRIAD_IDS[triadIndex];p.triangulationAssignments[id]=button.dataset.triadLayer;renderTriad()};
 $("#ch4P4ChoiceConfirm").onclick=confirmChoice;$("#ch4P4ChoiceOptions").onclick=event=>{const button=event.target.closest?.("[data-choice-value]");if(!button)return;setSelectedChoice(activeChoiceKind,button.dataset.choiceValue);renderChoice()};
 $("#ch4P4CachePrevious").onclick=previousCache;$("#ch4P4CacheNext").onclick=nextCache;$("#ch4P4CacheCollect").onclick=collectCache;$("#ch4P4CacheFinish").onclick=finishCache;$("#ch4P4ReturnTitle").onclick=returnToTitle
}
function bind(){
 inject();registerContent();installHandoffButton();installSaveBridge();installDevJump();
 $("#caseButton")?.addEventListener("click",()=>setTimeout(appendCaseEvidence,0),true);
 $("#soundToggle")?.addEventListener("change",()=>{if(isActive())syncAudio()},true);$("#musicRange")?.addEventListener("input",()=>{if(isActive())syncAudio()},true);$("#sfxRange")?.addEventListener("input",()=>{if(isActive())syncAudio()},true);
 document.addEventListener("click",event=>{if(event.target.closest?.("[data-lang]"))setTimeout(()=>{updateLanguage();appendCaseEvidence()},0);if(event.target.closest?.("#settingsButton,#settingsVersion,#lwSettingsFullscreen,#lwMenuFullscreen")&&isActive())setTimeout(setBuild,0)},true);
 document.addEventListener("visibilitychange",()=>{if(!phaseState()?.started)return;if(document.hidden){stopElement(score(),false);stopElement(approachVideo(),false);stopElement(revealVideo(),false)}else syncAudio()});
 const p=phaseState(),screen=active();if(p?.started&&SCREENS.has(screen))setTimeout(()=>resumeFromState(screen),0)
}

window.LastWitnessChapter4Phase4={startFromPhase3,startFreshForDev,resumeFromState,stopAudio,returnToTitle,appendCaseEvidence,registerContent,phaseState,version:BUILD};
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",bind,{once:true});else bind();
})();
