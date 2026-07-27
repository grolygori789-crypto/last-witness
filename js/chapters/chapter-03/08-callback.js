/* LAST WITNESS - Chapter III / Phase IX: Callback 0.12.1 */
(function(){
"use strict";
if(window.LastWitnessPhase9?.version==="0.12.1")return;

const BUILD="0.12.1";
const SCREEN="chapter3Callback";
const END_SCREEN="chapter3Complete";
const TEASER_SCREEN="chapter3Phase9Teaser";
const SCREENS=new Set([SCREEN,END_SCREEN,TEASER_SCREEN]);
const IMAGE="assets/images/chapter-03/phase-09/north-workstation.png?v=0121";
const FEED_BASE="assets/images/chapter-03/phase-09/palimpsest-feed/";
const AUDIO_BASE="assets/audio/chapter-03/phase-09/";
const CONTAIN_IDS=["memory","packet","credential","process"];
const CONTAIN_CORRECT=["memory","packet","credential","process"];
const CONTAIN_DISPLAY=["process","packet","memory","credential"];
const EVIDENCE_IDS=["volatile_capture","watcher_delivery","dead_drop","dual_origin"];

const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const gs=()=>{try{return state}catch(_){return window.state||null}};
const thai=()=>gs()?.language==="th"||document.documentElement.lang==="th";
const tr=(en,th)=>thai()?th:en;
const clamp=(n,min=0,max=1)=>Math.max(min,Math.min(max,Number(n)||0));
const active=()=>$(".screen.active")?.id||gs()?.screen||"";
let dialogue=null,internal=false,consoleOpen=false,choiceOpen=false,decisionOpen=false,dropOpen=false;
let introTimer=0,endingTimer=0;
const fadeFrames=new Map();

function ensure(){
 const s=gs();if(!s)return null;s.chapter=3;s.chapter3=s.chapter3||{};s.flags=s.flags||{};
 const p=s.chapter3.phase9=s.chapter3.phase9||{};
 const bools=["started","introComplete","unknownRevealPlayed","containmentComplete","containmentDebriefSeen","choiceMade","contactComplete","cleanupDetected","cleanupDecisionComplete","deadDropAvailable","deadDropHashPreserved","deadDropAccepted","bundleSealed","closingDialogueComplete","complete","chapterCardSeen","teaserSeen","relationshipApplied"];
 bools.forEach(k=>{if(typeof p[k]!=="boolean")p[k]=false});
 if(!Array.isArray(p.containmentOrder))p.containmentOrder=[];
 p.containmentOrder=p.containmentOrder.filter(x=>CONTAIN_IDS.includes(x));
 if(!Number.isFinite(Number(p.containmentAttempts)))p.containmentAttempts=0;
 if(!p.choiceKey)p.choiceKey="";
 if(!Array.isArray(p.evidenceCollected))p.evidenceCollected=[];
 p.evidenceCollected=p.evidenceCollected.filter(x=>EVIDENCE_IDS.includes(x));
 if(p.bundleSealed){p.deadDropAccepted=true;p.deadDropHashPreserved=true;p.deadDropAvailable=true;p.cleanupDecisionComplete=true;p.cleanupDetected=true;p.contactComplete=true;p.choiceMade=true;p.containmentDebriefSeen=true;p.containmentComplete=true;p.introComplete=true}
 if(p.complete){p.bundleSealed=true;p.closingDialogueComplete=true;p.deadDropAccepted=true;p.deadDropHashPreserved=true;p.deadDropAvailable=true;p.cleanupDecisionComplete=true;p.cleanupDetected=true;p.contactComplete=true;p.choiceMade=true;p.containmentDebriefSeen=true;p.containmentComplete=true;p.introComplete=true;p.evidenceCollected=[...EVIDENCE_IDS]}
 if(!p.stage){
  if(p.complete)p.stage="complete";
  else if(p.bundleSealed)p.stage="closing";
  else if(p.deadDropAvailable)p.stage="dead-drop";
  else if(p.cleanupDetected)p.stage="cleanup";
  else if(p.choiceMade)p.stage="contact";
  else if(p.containmentComplete)p.stage="contact";
  else if(p.introComplete)p.stage="containment";
  else p.stage="callback";
 }
 return p
}

function save(){try{if(typeof autoSave==="function")autoSave()}catch(_){} }
function safeShow(id){internal=true;try{show(id)}finally{internal=false}}
function foundAdd(id){try{const f=gs()?.found;if(typeof f?.add==="function")f.add(id);else if(Array.isArray(f)&&!f.includes(id))f.push(id)}catch(_){} }
function addEvidence(id){const p=ensure();if(!EVIDENCE_IDS.includes(id)||p.evidenceCollected.includes(id))return;p.evidenceCollected.push(id);foundAdd("callback_"+id);save()}
function stopElement(media,reset=false){if(!media)return;try{media.pause();if(reset)media.currentTime=0}catch(_){} }
function stopAudio(reset=false){
 clearTimeout(introTimer);introTimer=0;clearTimeout(endingTimer);endingTimer=0;
 for(const frame of fadeFrames.values())cancelAnimationFrame(frame);fadeFrames.clear();
 ["ch3P9Score","ch3P9StingerUnknown","ch3P9StingerCleanup","ch3P9StingerDeadDrop","ch3P9StingerClose"].forEach(id=>stopElement($("#"+id),reset))
}
function fade(media,target,duration=420){
 if(!media)return;const old=fadeFrames.get(media);if(old)cancelAnimationFrame(old);
 const start=clamp(media.volume),end=clamp(target,0,.18),began=performance.now();
 if(end>0&&media.paused){media.volume=0;media.muted=false;media.play().catch(()=>{})}
 const step=now=>{const q=Math.min(1,Math.max(0,(now-began)/duration));media.volume=start+(end-start)*q;if(q<1)fadeFrames.set(media,requestAnimationFrame(step));else{fadeFrames.delete(media);if(end===0)media.pause()}};
 fadeFrames.set(media,requestAnimationFrame(step))
}
const STINGERS={unknown:"ch3P9StingerUnknown",cleanup:"ch3P9StingerCleanup",deadDrop:"ch3P9StingerDeadDrop",close:"ch3P9StingerClose"};
function playStinger(key,gain=.25){const s=gs(),a=$("#"+STINGERS[key]);if(!a||s?.sound===false)return;const level=clamp(Number(s?.sfx??.55)*gain,0,.32);try{a.pause();a.currentTime=0;a.volume=level;a.play().catch(()=>{})}catch(_){} }
function overlaysOpen(){return consoleOpen||choiceOpen||decisionOpen||dropOpen}
function syncAudio(){
 const s=gs(),on=SCREENS.has(active()),enabled=s?.sound!==false&&Number(s?.music??.33)>0,p=ensure();
 const score=$("#ch3P9Score");if(score)score.loop=true;
 const dialogueDuck=dialogue?.62:1,overlayDuck=overlaysOpen()?.84:1,endingDuck=(active()===END_SCREEN||active()===TEASER_SCREEN)?0.58:1;
 const scoreActive=enabled&&on&&!p?.complete;
 const scoreTarget=scoreActive?Math.min(.16,Number(s.music??.33)*.38*dialogueDuck*overlayDuck):0;
 fade(score,scoreTarget,scoreActive?720:420)
}

const FEED_BY_EMOTION={neutral:"connected.png",side:"connected.png",guarded:"connected.png",thinking:"connected.png",leaning:"warning.png",warning:"warning.png"};
function feedPlateSource(mode,emotion){const file=mode==="unknown"?"unknown.png":(FEED_BY_EMOTION[emotion]||"connected.png");return FEED_BASE+file+"?v=0121"}
function portraitSource(speaker,emotion){
 if(speaker==="UNKNOWN SOURCE"||speaker==="PALIMPSEST")return "";
 try{return typeof portrait==="function"?portrait(speaker,emotion||"neutral"):""}catch(_){return""}
}
function speakerLabel(speaker){if(!thai())return speaker;const map={"Inspector Cheryl Goh":"สารวัตร Cheryl Goh","Farid Rahman":"Farid Rahman","Adrian Tan":"Adrian Tan","UNKNOWN SOURCE":"แหล่งสัญญาณไม่ทราบที่มา","PALIMPSEST":"PALIMPSEST"};return map[speaker]||speaker}
function recordHistory(line){try{const s=gs();s.history=s.history||[];s.history.push({speaker:speakerLabel(line[0]),text:thai()?line[3]:line[2],chapter:3,phase:9})}catch(_){} }
function feedModeForSpeaker(speaker,emotion,line){
 if(speaker==="UNKNOWN SOURCE")setLaptopFeed("unknown",emotion);
 else if(speaker==="PALIMPSEST")setLaptopFeed("palimpsest",emotion);
 else if(speaker==="North"&&String(line?.[2]||"").startsWith("Feed severed"))setLaptopFeed("severed")
}
function renderDialogue(){
 const box=$("#ch3P9Dialogue");if(!box||!dialogue)return;
 const line=dialogue.lines[dialogue.i],speaker=line[0],right=speaker==="North"||speaker==="Inspector Cheryl Goh",remote=speaker==="UNKNOWN SOURCE"||speaker==="PALIMPSEST"||speaker==="Adrian Tan",screenOnly=speaker==="UNKNOWN SOURCE"||speaker==="PALIMPSEST",src=screenOnly?"":portraitSource(speaker,line[1]);
 feedModeForSpeaker(speaker,line[1],line);
 if(speaker==="UNKNOWN SOURCE"&&!ensure().unknownRevealPlayed){ensure().unknownRevealPlayed=true;playStinger("unknown",.27);save()}
 box.className="dialogue ch3-p9-dialogue"+(right?" right":"")+(remote?" remote":"")+(screenOnly?" no-portrait":"");
 box.innerHTML=`${src?`<div class="portrait-wrap"><img class="portrait" src="${src}" alt=""></div>`:""}<div class="dialogue-copy"><div class="speaker">${speakerLabel(speaker)}</div><div class="line">${thai()?line[3]:line[2]}</div></div><div class="next">${tr("TAP TO CONTINUE","แตะเพื่อดำเนินต่อ")}</div>`;
 syncAudio()
}
function talk(lines,done){
 const box=$("#ch3P9Dialogue");if(!box){done?.();return}
 dialogue={lines,i:0,done};box.classList.remove("hidden");renderDialogue();
 box.onclick=()=>{if(!dialogue)return;recordHistory(dialogue.lines[dialogue.i]);dialogue.i++;if(dialogue.i>=dialogue.lines.length){const fn=dialogue.done;dialogue=null;box.classList.add("hidden");box.onclick=null;syncAudio();fn?.();save()}else renderDialogue()}
}
function talkAfterModal(lines,done){closeAllModals(false);talk(lines,()=>{done?.();paint()})}

const D={
 intro:[
  ["North","alert","The process is still alive. It is not coming through the mirror. It is waking up inside my laptop.","Process ยังทำงานอยู่ มันไม่ได้เข้ามาทาง Mirror แต่มันกำลังตื่นขึ้นจากในแล็ปท็อปของฉัน"],
  ["Farid Rahman","alert","That machine is isolated. It never touched an outbound service.","เครื่องนั้นถูกแยกจากระบบ ไม่เคยเชื่อมบริการขาออก"],
  ["North","analyzing","It touched a signed forensic package in Bangkok. The package carried a dormant watcher.","มันเคยเปิด Forensic Package ที่ลงลายเซ็นจากกรุงเทพฯ Package นั้นพา Watcher ที่หลับอยู่เข้ามา"],
  ["Inspector Cheryl Goh","focused_command","Can you hold it without executing it?","คุณตรึงมันไว้โดยไม่รันคำสั่งได้ไหม"],
  ["North","serious","For a little while. The callback wants a route, not control.","ได้สักพัก Callback ต้องการเส้นทาง ไม่ได้ต้องการควบคุมเครื่อง"],
  ["Benedict","serious","Then let it believe it has an audience.","งั้นปล่อยให้มันคิดว่ามีคนกำลังฟัง"],
  ["UNKNOWN SOURCE","neutral","You preserved the mirror.","พวกคุณรักษา Mirror ไว้ได้"],
  ["Benedict","neutral","You sound disappointed.","น้ำเสียงคุณฟังดูผิดหวัง"],
  ["UNKNOWN SOURCE","side","Surprised.","ประหลาดใจ"],
  ["Benedict","neutral","Same thing, with better posture.","เรื่องเดียวกัน แค่ยืนให้ดูดีขึ้น"],
  ["UNKNOWN SOURCE","guarded","You think the mirror called me.","พวกคุณคิดว่า Mirror เรียกฉันมา"],
  ["North","alert","It didn't?","ไม่ใช่หรือ"],
  ["UNKNOWN SOURCE","leaning","No. Your laptop did.","ไม่ใช่ แล็ปท็อปของเธอต่างหาก"]
 ],
 containmentDebrief:[
  ["North","focused","Memory frozen. Outbound packet cloned. Credential handshake isolated. Callback quarantined.","ตรึง Memory แล้ว Clone Packet ขาออกแล้ว แยก Credential Handshake แล้ว และกัก Callback เรียบร้อย"],
  ["Farid Rahman","tablet_read","The watcher arrived inside a package accepted by the Bangkok evidence chain.","Watcher เข้ามาใน Package ที่ Bangkok Evidence Chain ยอมรับ"],
  ["Inspector Cheryl Goh","serious","Accepted by which credential?","ยอมรับด้วย Credential ใด"],
  ["Farid Rahman","focused","A valid forensic synchronization credential. Human identity unresolved.","Forensic Synchronization Credential ที่ถูกต้อง ส่วนตัวตนมนุษย์ยังไม่คลี่คลาย"],
  ["Benedict","thinking","The same old trick. A door opened. No witness saw the hand.","กลเม็ดเดิมๆ ประตูเปิด แต่ไม่มีพยานคนไหนเห็นมือที่เปิด"],
  ["North","analyzing","Fingerprint match. Retry cadence, scrub pattern, wrapper grammar.","Fingerprint ตรงกัน ทั้งจังหวะ Retry รูปแบบการลบข้อมูล และโครงสร้าง Wrapper"],
  ["UNKNOWN SOURCE","thinking","You may call me PALIMPSEST.","เรียกฉันว่า PALIMPSEST ก็ได้"],
  ["Inspector Cheryl Goh","focused_command","Alias, not identity.","Alias ไม่ใช่ตัวตน"],
  ["PALIMPSEST","guarded","You people do love your distinctions.","พวกคุณช่างหลงใหลการแบ่งแยกจริงๆ"],
  ["Benedict","serious","They keep innocent people alive.","มันช่วยให้ผู้บริสุทธิ์ยังมีชีวิตอยู่"]
 ],
 commonContact:[
  ["PALIMPSEST","thinking","I built a way for records to survive a broken clock. Someone else taught it to lie.","ฉันสร้างวิธีให้บันทึกรอดจากนาฬิกาที่พัง คนอื่นต่างหากที่สอนให้มันโกหก"],
  ["Benedict","serious","You did not choose Daniel.","คุณไม่ได้เลือก Daniel"],
  ["PALIMPSEST","side","I did not choose the body, the room, or the minute.","ฉันไม่ได้เลือกศพ ห้อง หรือช่วงเวลา"],
  ["Benedict","thinking","But you know who borrowed them.","แต่คุณรู้ว่าใครยืมสิ่งเหล่านั้นไปใช้"],
  ["PALIMPSEST","guarded","I know who paid not to be remembered.","ฉันรู้ว่าใครจ่ายเงินเพื่อไม่ให้ตัวเองถูกจดจำ"],
  ["North","serious","Room 1807 gave us a victim without a name. Daniel gave us a credential without an operator.","ห้อง 1807 ให้ผู้ตายที่ไม่มีชื่อ ส่วน Daniel ให้ Credential ที่ไม่มีผู้ใช้งาน"],
  ["PALIMPSEST","leaning","And you still think absence means missing.","แล้วพวกคุณยังคิดว่าความว่างเปล่าหมายถึงสิ่งที่หายไป"],
  ["Benedict","serious","No. Sometimes it means removed.","ไม่ บางครั้งมันหมายถึงถูกเอาออกไป"]
 ],
 cleanup:[
  ["Adrian Tan","serious","That is not the wrapper. That is cleanup.","นั่นไม่ใช่ Wrapper นั่นคือ Cleanup"],
  ["North","alert","Separate signature. It is erasing the callback token, not the mirror.","เป็น Signature คนละชุด มันกำลังลบ Callback Token ไม่ใช่ Mirror"],
  ["Farid Rahman","tablet_read","The remote route resolves toward Jakarta. The cleanup trigger came through the Bangkok evidence chain.","เส้นทางระยะไกลมุ่งไปทาง Jakarta แต่ Cleanup Trigger เข้ามาทาง Bangkok Evidence Chain"],
  ["Inspector Cheryl Goh","serious","When was it deployed?","มันถูกวางไว้เมื่อไร"],
  ["North","analyzing","Before we left Bangkok.","ก่อนเราออกจากกรุงเทพฯ"],
  ["Benedict","serious","The route points outward. The decision points home.","เส้นทางชี้ออกไปข้างนอก แต่การตัดสินใจชี้กลับบ้าน"]
 ],
 afterCleanup:[
  ["PALIMPSEST","warning","Now you understand why I called.","ตอนนี้คงเข้าใจแล้วว่าทำไมฉันถึงติดต่อมา"],
  ["Benedict","neutral","Because someone is cleaning up after both of us.","เพราะมีใครบางคนกำลังเก็บกวาดตามหลังเราทั้งคู่"],
  ["PALIMPSEST","guarded","Because they are better at it than you think.","เพราะพวกเขาเก่งกว่าที่คุณคิด"],
  ["North","alert","Encrypted dead drop incoming. Eleven-minute access window.","มี Encrypted Dead Drop เข้ามา หน้าต่างเข้าถึงสิบเอ็ดนาที"],
  ["Inspector Cheryl Goh","focused_command","Preserve its hash before accepting a byte.","รักษา Hash ก่อนรับข้อมูลแม้แต่ Byte เดียว"],
  ["Benedict","thinking","The eleven minutes finally brought us something honest.","ในที่สุดสิบเอ็ดนาทีก็เอาอะไรที่ซื่อตรงมาให้เราสักอย่าง"]
 ],
 closing:[
  ["Benedict","neutral","You could have sent the file without the theatre.","คุณส่งไฟล์มาโดยไม่ต้องจัดการแสดงก็ได้"],
  ["PALIMPSEST","side","You would have trusted it less.","คุณคงเชื่อมันน้อยลง"],
  ["Benedict","serious","No. I would have trusted you less.","ไม่ ผมคงเชื่อคุณน้อยลง"],
  ["PALIMPSEST","thinking","You do not trust me now.","ตอนนี้คุณก็ไม่ได้เชื่อฉัน"],
  ["Benedict","neutral","Trust is a commitment. I avoid those.","ความไว้ใจคือข้อผูกมัด ผมหลีกเลี่ยงของแบบนั้น"],
  ["PALIMPSEST","guarded","Then we may understand each other.","งั้นเราอาจเข้าใจกัน"],
  ["Benedict","neutral","Do not make it sentimental.","อย่าทำให้มันซาบซึ้งเกินไป"],
  ["PALIMPSEST","warning","You are still looking for the person who entered the room. Look for the person who decided when the room would be found.","พวกคุณยังตามหาคนที่เข้าไปในห้อง จงตามหาคนที่ตัดสินใจว่าห้องนั้นควรถูกพบเมื่อไร"],
  ["North","alert","Feed severed. Dead drop remains intact.","Feed ถูกตัดแล้ว Dead Drop ยังสมบูรณ์"],
  ["Inspector Cheryl Goh","softened_professional","You enjoyed that.","คุณสนุกกับมัน"],
  ["Benedict","neutral","I enjoy people who think they are unreadable.","ผมชอบคนที่คิดว่าตัวเองอ่านไม่ออก"],
  ["Inspector Cheryl Goh","restrained_amusement","That includes you.","รวมถึงคุณด้วย"],
  ["Benedict","neutral","Especially me.","โดยเฉพาะผม"],
  ["Inspector Cheryl Goh","focused_command","The dead drop goes into evidence. You are not following it alone.","Dead Drop ต้องเข้าสู่หลักฐาน และคุณจะไม่ตามมันไปคนเดียว"],
  ["Benedict","neutral","That sounded dangerously like a commitment.","ฟังดูใกล้เคียงข้อผูกมัดอย่างอันตราย"],
  ["Inspector Cheryl Goh","restrained_amusement","Consider it jurisdiction.","ถือว่าเป็นเขตอำนาจแล้วกัน"],
  ["North","side","I am recording jurisdiction as the official explanation.","ฉันจะบันทึกว่าเขตอำนาจคือคำอธิบายอย่างเป็นทางการค่ะ"],
  ["North","serious","Jakarta may lead us to the toolmaker. It will not tell us who placed the watcher on my machine.","Jakarta อาจพาเราไปหาคนสร้างเครื่องมือ แต่มันจะไม่บอกว่าใครวาง Watcher ไว้ในเครื่องฉัน"],
  ["Benedict","serious","Then we follow both hands.","งั้นเราตามมือทั้งสองข้าง"],
  ["Inspector Cheryl Goh","focused_command","One in Jakarta. One in Bangkok.","ข้างหนึ่งอยู่ Jakarta อีกข้างอยู่กรุงเทพฯ"],
  ["Benedict","thinking","We came to Singapore looking for where the lie travelled. It was waiting in the evidence we brought with us.","เรามาสิงคโปร์เพื่อตามหาว่าคำโกหกเดินทางไปที่ไหน ที่แท้มันรออยู่ในหลักฐานที่เราพกมาด้วย"]
 ]
};

const CHOICE_BRANCHES={
 authorship:[
  ["Benedict","serious","You did not call to frighten us. You called because someone left your fingerprints on their work.","คุณไม่ได้ติดต่อมาเพื่อขู่เรา คุณติดต่อมาเพราะมีคนทิ้งลายนิ้วมือของคุณไว้บนงานของเขา"],
  ["PALIMPSEST","guarded","Authorship matters when blame is cheap.","ความเป็นเจ้าของผลงานสำคัญ เมื่อการโยนความผิดมีราคาถูก"]
 ],
 motive:[
  ["Benedict","neutral","Murderers protect outcomes. Craftsmen protect authorship. Which one brought you here?","ฆาตกรปกป้องผลลัพธ์ ช่างฝีมือปกป้องผลงาน อะไรพาคุณมาที่นี่"],
  ["PALIMPSEST","thinking","Craftsmen know when their work has been corrupted.","ช่างฝีมือรู้เมื่องานของตัวเองถูกบิดเบือน"]
 ],
 fear:[
  ["Benedict","serious","You are not afraid we will find you. You are afraid we will mistake you for whoever gave the order.","คุณไม่ได้กลัวว่าเราจะพบตัวคุณ คุณกลัวว่าเราจะเข้าใจว่าคุณคือคนที่ออกคำสั่ง"],
  ["PALIMPSEST","side","Mistaken identity is a crude form of burial.","การถูกสวมตัวตนผิดๆ คือการฝังศพแบบหยาบที่สุด"]
 ]
};

const E={
 volatile_capture:{title:{en:"Volatile Callback Memory Capture",th:"การเก็บ Volatile Memory ของ Callback"},description:{en:"A live-memory capture preserves the dormant watcher, outbound packet and credential handshake before quarantine. The watcher awakened only after the secure mirror's raw receipt order was preserved.",th:"การเก็บ Live Memory รักษา Dormant Watcher, Packet ขาออก และ Credential Handshake ไว้ก่อนกักระบบ โดย Watcher ตื่นขึ้นหลังลำดับรับข้อมูลดิบของ Secure Mirror ถูกเก็บรักษา"},observation:{en:"The trigger proves foreknowledge of the investigative milestone. It does not identify who planted the watcher.",th:"Trigger พิสูจน์ว่าผู้วางระบบคาดการณ์จุดสำคัญของการสืบสวนไว้ล่วงหน้า แต่ยังไม่ระบุตัวคนวาง Watcher"}},
 watcher_delivery:{title:{en:"Trusted Evidence-Chain Watcher",th:"Watcher ใน Trusted Evidence Chain"},description:{en:"The dormant process entered North's laptop through a signed forensic package accepted by the Bangkok evidence chain. A second cleanup process used a valid forensic synchronization credential and was deployed before the team left Bangkok.",th:"Dormant Process เข้าสู่แล็ปท็อปของ North ผ่าน Forensic Package ที่ลงลายเซ็นและได้รับการยอมรับจาก Bangkok Evidence Chain ส่วน Cleanup Process ชุดที่สองใช้ Forensic Synchronization Credential ที่ถูกต้องและถูกวางไว้ก่อนทีมออกจากกรุงเทพฯ"},observation:{en:"A valid local credential proves authorized access to the evidence chain, not the identity of the operator or decision owner.",th:"Local Credential ที่ถูกต้องพิสูจน์การเข้าถึง Evidence Chain ที่ได้รับอนุญาต แต่ไม่พิสูจน์ตัวผู้ใช้งานหรือเจ้าของการตัดสินใจ"}},
 dead_drop:{title:{en:"PALIMPSEST Encrypted Dead Drop",th:"Encrypted Dead Drop ของ PALIMPSEST"},description:{en:"The hash-preserved bundle identifies inherited architecture, the PALIMPSEST tool family, a valid local deployment credential, an unknown decision owner and a Jakarta rendezvous token. Sender identity remains unconfirmed.",th:"Bundle ที่รักษา Hash ระบุสถาปัตยกรรมที่ถูกสืบทอด Tool Family ของ PALIMPSEST, Local Deployment Credential ที่ถูกต้อง, Decision Owner ที่ยังไม่ทราบ และ Jakarta Rendezvous Token โดยยังยืนยันตัวผู้ส่งไม่ได้"},observation:{en:"The dead drop creates a lawful next lead to Jakarta without converting an alias or infrastructure nexus into a human identity.",th:"Dead Drop สร้างเบาะแสถัดไปสู่ Jakarta อย่างถูกต้อง โดยไม่สรุป Alias หรือ Infrastructure Nexus ให้กลายเป็นตัวบุคคล"}},
 dual_origin:{title:{en:"Dual-Origin Correlation",th:"การเชื่อมโยงแหล่งกำเนิดสองทิศทาง"},description:{en:"The PALIMPSEST route points to Jakarta-linked infrastructure while the watcher and cleanup trigger entered through the Bangkok evidence chain. The external tool route and local decision path are demonstrably separate.",th:"เส้นทาง PALIMPSEST ชี้ไปยังโครงสร้างพื้นฐานที่เชื่อมโยงกับ Jakarta ขณะที่ Watcher และ Cleanup Trigger เข้ามาทาง Bangkok Evidence Chain โดยเส้นทางเครื่องมือภายนอกกับเส้นทางการตัดสินใจภายในแยกจากกันอย่างพิสูจน์ได้"},observation:{en:"The toolmaker, deployer and decision owner may be different people.",th:"คนสร้างเครื่องมือ คน Deploy และเจ้าของการตัดสินใจอาจเป็นคนละคนกัน"}}
};

function copy(){return{
 location:tr("SPF Digital Forensics Lab · North's Workstation","ห้องปฏิบัติการดิจิทัลฟอเรนสิก SPF · Workstation ของ North"),
 scene:tr("CALLBACK","เสียงตอบกลับ"),
 objective:objectiveText(),
 stabilize:tr("STABILIZE CALLBACK","ตรึง CALLBACK"),
 containTitle:tr("VOLATILE CALLBACK CONTAINMENT","การควบคุม VOLATILE CALLBACK"),
 containHelp:tr("Preserve live evidence in forensic order. Cutting the connection first destroys the volatile trail.","รักษาหลักฐานสดตามลำดับนิติวิทยาศาสตร์ การตัดการเชื่อมต่อก่อนจะทำลายร่องรอย Volatile"),
 selected:tr("PRESERVATION ORDER","ลำดับการรักษา"),confirm:tr("CONFIRM CONTAINMENT","ยืนยันการควบคุม"),reset:tr("RESET","เริ่มใหม่"),
 choiceTitle:tr("CHOOSE BENEDICT'S APPROACH","เลือกแนวทางของ BENEDICT"),
 authorship:tr("Challenge authorship","ท้าทายความเป็นเจ้าของผลงาน"),motive:tr("Challenge motive","ท้าทายแรงจูงใจ"),fear:tr("Challenge fear","ท้าทายความกลัว"),
 decisionTitle:tr("SECOND PROCESS DETECTED","ตรวจพบ PROCESS ชุดที่สอง"),
 preserveToken:tr("PRESERVE CLEANUP CREDENTIAL","รักษา CLEANUP CREDENTIAL"),cutAll:tr("CUT ALL CONNECTIONS","ตัดการเชื่อมต่อทั้งหมด"),activeTrace:tr("TRACE ACTIVE OPERATOR","ติดตามผู้ใช้งานแบบ ACTIVE"),
 dropTitle:tr("ENCRYPTED DEAD DROP","ENCRYPTED DEAD DROP"),hash:tr("PRESERVE DEAD-DROP HASH","รักษา HASH ของ DEAD DROP"),accept:tr("ACCEPT ENCRYPTED TRANSFER","รับ ENCRYPTED TRANSFER"),seal:tr("SEAL RENDEZVOUS BUNDLE","ปิดผนึก RENDEZVOUS BUNDLE"),
 chapterEyebrow:tr("CHAPTER III COMPLETE","จบบทที่ III"),chapterTitle:tr("THE BORROWED MINUTES","สิบเอ็ดนาทีที่ถูกยืม"),
 principle:tr("A VALID CREDENTIAL PROVES ACCESS, NOT IDENTITY.","CREDENTIAL ที่ถูกต้องพิสูจน์การเข้าถึง ไม่ใช่ตัวตน"),
 continue4:tr("CONTINUE TO CHAPTER IV","ไปต่อบทที่ IV"),returnTitle:tr("RETURN TO TITLE","กลับหน้าแรก"),
 teaserEyebrow:tr("CHAPTER IV","บทที่ IV"),teaserTitle:"SHADOW OF THE TRUTH",teaserPlace:"JAKARTA · PALIMPSEST",teaserText:tr("A toolmaker waits behind an alias. A watcher remains inside the Bangkok evidence chain.","คนสร้างเครื่องมือรออยู่หลัง Alias ขณะที่ Watcher ยังคงซ่อนอยู่ใน Bangkok Evidence Chain"),
 bookFlight:tr("BOOK THE FLIGHT.","จองเที่ยวบิน")
}}
function objectiveText(){const p=ensure();if(!p?.introComplete)return tr("Keep the callback alive without surrendering the workstation","รักษา Callback ให้ทำงานโดยไม่เสียการควบคุม Workstation");if(!p.containmentComplete)return tr("Preserve volatile evidence before quarantine","รักษาหลักฐาน Volatile ก่อนกักระบบ");if(!p.choiceMade)return tr("Use Benedict's read of PALIMPSEST to expose motive","ใช้การอ่านคนของ Benedict เปิดแรงจูงใจของ PALIMPSEST");if(!p.cleanupDecisionComplete)return tr("Preserve the cleanup credential before it erases itself","รักษา Cleanup Credential ก่อนมันลบตัวเอง");if(!p.bundleSealed)return tr("Hash, receive and seal the eleven-minute dead drop","รักษา Hash รับข้อมูล และปิดผนึก Dead Drop สิบเอ็ดนาที");return tr("Follow both hands: Jakarta and Bangkok","ตามมือทั้งสองข้าง: Jakarta และกรุงเทพฯ")}
function containData(id){const m={memory:["01","FREEZE VOLATILE MEMORY","ตรึง VOLATILE MEMORY","Preserves the live watcher state","รักษาสถานะ Watcher ที่ยังทำงาน"],packet:["02","CLONE OUTBOUND PACKET","CLONE PACKET ขาออก","Captures destination and payload","เก็บปลายทางและ Payload"],credential:["03","ISOLATE CREDENTIAL HANDSHAKE","แยก CREDENTIAL HANDSHAKE","Preserves accepted access proof","รักษาหลักฐานสิทธิ์ที่ระบบยอมรับ"],process:["04","QUARANTINE CALLBACK PROCESS","กัก CALLBACK PROCESS","Contains execution after capture","กักการทำงานหลังเก็บหลักฐาน"]};const x=m[id];return{num:x[0],label:thai()?x[2]:x[1],note:thai()?x[4]:x[3]}}

function inject(){
 if($("#"+SCREEN))return;const game=$("#game");if(!game)return;
 game.insertAdjacentHTML("beforeend",`
 <section id="${SCREEN}" class="screen ch3-p9-scene"><img class="scene" src="${IMAGE}" alt="North's laptop at the Singapore digital forensics lab"><div class="overlay ch3-p9-overlay"></div><div class="topbar"><span id="ch3P9Location"></span><div class="hud"><button class="icon ch3-p9-save" type="button">💾</button><button class="icon ch3-p9-menu" type="button">☰</button></div></div><div id="ch3P9SceneLabel" class="ch3-p9-label"></div><div id="ch3P9Objective" class="ch3-p9-objective"></div>
 <div id="ch3P9LaptopScreen" class="ch3-p9-laptop-screen" aria-live="polite"><div class="ch3-p9-feed-head"><span id="ch3P9FeedSource">CALLBACK PROBE</span><b id="ch3P9FeedState">VOLATILE</b></div><div id="ch3P9FeedBody" class="ch3-p9-feed-body"><div class="ch3-p9-terminal"><i>FORENSIC CHANNEL · READ ONLY</i><span>CALLBACK PROBE DETECTED</span><span>LOCAL PROCESS · ACTIVE</span><span>REMOTE ROUTE · UNVERIFIED</span></div></div><div class="ch3-p9-signal"><span id="ch3P9SignalLabel">SESSION STABILITY</span><div><i id="ch3P9SignalFill"></i></div><b id="ch3P9SignalValue">62%</b></div></div>
 <div id="ch3P9Dialogue" class="dialogue ch3-p9-dialogue hidden"></div><button id="ch3P9Action" class="primary ch3-p9-action" type="button" hidden></button>
 <audio id="ch3P9Score" preload="auto" loop><source src="${AUDIO_BASE}true-crime-callback-loop.webm?v=0121" type="audio/webm"><source src="${AUDIO_BASE}true-crime-callback-loop.mp3?v=0121" type="audio/mpeg"></audio>
 <audio id="ch3P9StingerUnknown" preload="auto" src="${AUDIO_BASE}stingers/unknown-source-reveal.wav?v=0120"></audio><audio id="ch3P9StingerCleanup" preload="auto" src="${AUDIO_BASE}stingers/cleanup-process-detected.wav?v=0120"></audio><audio id="ch3P9StingerDeadDrop" preload="auto" src="${AUDIO_BASE}stingers/dead-drop-available.wav?v=0120"></audio><audio id="ch3P9StingerClose" preload="auto" src="${AUDIO_BASE}stingers/chapter-three-close.wav?v=0120"></audio></section>
 <section id="${END_SCREEN}" class="screen ch3-p9-end"><div class="ch3-p9-end-card"><div id="ch3P9EndEyebrow" class="eyebrow"></div><h2 id="ch3P9EndTitle"></h2><div class="ch3-p9-end-rule"></div><p id="ch3P9Principle" class="ch3-p9-principle"></p><div class="ch3-p9-end-grid"><div><span>MECHANISM</span><b>PROVEN</b></div><div><span>PALIMPSEST</span><b>ALIAS</b></div><div><span>NEXT NODE</span><b>JAKARTA</b></div><div><span>DECISION OWNER</span><b>UNKNOWN</b></div></div><div class="ch3-p9-dead-status"><i>DEAD DROP PRESERVED</i><strong>IDENTITY · UNCONFIRMED</strong></div><button id="ch3P9Continue4" class="primary" type="button"></button><button id="ch3P9ReturnTitle" class="ghost" type="button"></button></div></section>
 <section id="${TEASER_SCREEN}" class="screen ch3-p9-teaser"><div class="ch3-p9-teaser-map"></div><div class="ch3-p9-teaser-card"><div id="ch3P9TeaserEyebrow" class="eyebrow"></div><h2 id="ch3P9TeaserTitle"></h2><div id="ch3P9TeaserPlace" class="ch3-p9-teaser-place"></div><p id="ch3P9TeaserText"></p><blockquote id="ch3P9BookFlight"></blockquote><button id="ch3P9TeaserReturn" class="primary" type="button"></button></div></section>
 <div id="ch3P9Console" class="modal ch3-p9-console" aria-hidden="true"><div class="modal-card"><header><div><div class="eyebrow">LIVE EVIDENCE · READ ONLY</div><h3 id="ch3P9ConsoleTitle"></h3></div><button id="ch3P9ConsoleClose" class="ghost" type="button">×</button></header><div id="ch3P9ConsoleBody"></div><div id="ch3P9Status" class="ch3-p9-status" aria-live="polite"></div></div></div>
 <div id="ch3P9Choice" class="modal ch3-p9-choice" aria-hidden="true"><div class="modal-card"><div class="eyebrow">PSYCHOLOGICAL PRESSURE</div><h3 id="ch3P9ChoiceTitle"></h3><button type="button" data-p9-choice="authorship"></button><button type="button" data-p9-choice="motive"></button><button type="button" data-p9-choice="fear"></button></div></div>
 <div id="ch3P9Decision" class="modal ch3-p9-decision" aria-hidden="true"><div class="modal-card"><div class="eyebrow">CHAIN OF CUSTODY AT RISK</div><h3 id="ch3P9DecisionTitle"></h3><div class="ch3-p9-decision-readout"><span>REMOTE ROUTE</span><b>JAKARTA-LINKED</b><span>LOCAL TRIGGER</span><b>BANGKOK EVIDENCE CHAIN</b></div><button id="ch3P9PreserveToken" class="primary" type="button"></button><button id="ch3P9CutAll" class="ghost" type="button"></button><button id="ch3P9ActiveTrace" class="ghost" type="button"></button><div id="ch3P9DecisionStatus" class="ch3-p9-status"></div></div></div>
 <div id="ch3P9DeadDrop" class="modal ch3-p9-drop" aria-hidden="true"><div class="modal-card"><div class="ch3-p9-drop-head"><div><div class="eyebrow">PALIMPSEST · ENCRYPTED TRANSFER</div><h3 id="ch3P9DropTitle"></h3></div><strong id="ch3P9DropTimer">11:00</strong></div><div class="ch3-p9-drop-data"><div><span>ARCHITECTURE</span><b>INHERITED</b></div><div><span>TOOL FAMILY</span><b>PALIMPSEST</b></div><div><span>DEPLOYMENT AUTHORITY</span><b>VALID LOCAL CREDENTIAL</b></div><div><span>DECISION OWNER</span><b>UNKNOWN</b></div><div><span>RENDEZVOUS TOKEN</span><b>JAKARTA</b></div></div><button id="ch3P9Hash" class="primary" type="button"></button><button id="ch3P9Accept" class="ghost" type="button"></button><button id="ch3P9Seal" class="ghost" type="button"></button><div id="ch3P9DropStatus" class="ch3-p9-status"></div></div></div>`);
 bindElements();updateLanguage();paint()
}

function setLaptopFeed(mode,emotion="neutral"){
 const body=$("#ch3P9FeedBody"),source=$("#ch3P9FeedSource"),stateNode=$("#ch3P9FeedState"),fill=$("#ch3P9SignalFill"),value=$("#ch3P9SignalValue");if(!body)return;
 const p=ensure();
 if(mode==="probe"){
  source.textContent="CALLBACK PROBE";stateNode.textContent="VOLATILE";body.innerHTML='<div class="ch3-p9-terminal"><i>FORENSIC CHANNEL · READ ONLY</i><span>CALLBACK PROBE DETECTED</span><span>LOCAL PROCESS · ACTIVE</span><span>REMOTE ROUTE · UNVERIFIED</span></div>';fill.style.width="62%";value.textContent="62%";return
 }
 if(mode==="unknown"||mode==="palimpsest"){
  source.textContent=mode==="unknown"?tr("UNKNOWN SOURCE","แหล่งสัญญาณไม่ทราบที่มา"):"PALIMPSEST";stateNode.textContent="LIVE FEED";body.innerHTML=`<div class="ch3-p9-remote-feed"><img class="ch3-p9-feed-plate" src="${feedPlateSource(mode,emotion)}" alt=""><div class="ch3-p9-screen-glass"></div><div class="ch3-p9-scanlines"></div><span>${mode==="unknown"?"IDENTITY · UNVERIFIED":"TOOL FAMILY · MATCH"}</span></div>`;fill.style.width=p.containmentComplete?"88%":"69%";value.textContent=p.containmentComplete?"88%":"69%";return
 }
 if(mode==="cleanup"){
  source.textContent="SECOND PROCESS";stateNode.textContent="CLEANUP";body.innerHTML='<div class="ch3-p9-cleanup-feed"><strong>CLEANUP PROCESS DETECTED</strong><span>CALLBACK TOKEN · ERASE REQUEST</span><span>LOCAL CREDENTIAL · ACCEPTED</span><span>DEPLOYED · BEFORE SINGAPORE</span></div>';fill.style.width="41%";value.textContent="41%";return
 }
 if(mode==="dead-drop"){
  source.textContent="PALIMPSEST";stateNode.textContent="DEAD DROP";body.innerHTML='<div class="ch3-p9-drop-feed"><strong>ENCRYPTED DEAD DROP AVAILABLE</strong><span>WINDOW · 11:00</span><span>ORIGIN NODE · JAKARTA</span><span>IDENTITY · UNCONFIRMED</span></div>';fill.style.width="76%";value.textContent="76%";return
 }
 if(mode==="severed"){
  source.textContent="REMOTE FEED";stateNode.textContent="SEVERED";body.innerHTML='<div class="ch3-p9-cleanup-feed"><strong>ENCRYPTED FEED SEVERED</strong><span>DEAD DROP · INTACT</span><span>CALLBACK TOKEN · PRESERVED</span><span>REMOTE IDENTITY · UNCONFIRMED</span></div>';fill.style.width="73%";value.textContent="73%";return
 }
 if(mode==="sealed"){
  source.textContent="EVIDENCE CAPTURE";stateNode.textContent="SEALED";body.innerHTML='<div class="ch3-p9-sealed-feed"><strong>DEAD DROP PRESERVED</strong><span>HASH VERIFIED</span><span>RENDEZVOUS TOKEN · JAKARTA</span><span>DECISION OWNER · UNKNOWN</span></div>';fill.style.width="100%";value.textContent="100%"
 }
}

function updateLanguage(){
 const c=copy(),map={ch3P9Location:c.location,ch3P9SceneLabel:c.scene,ch3P9Objective:c.objective,ch3P9Action:c.stabilize,ch3P9ConsoleTitle:c.containTitle,ch3P9ChoiceTitle:c.choiceTitle,ch3P9DecisionTitle:c.decisionTitle,ch3P9PreserveToken:c.preserveToken,ch3P9CutAll:c.cutAll,ch3P9ActiveTrace:c.activeTrace,ch3P9DropTitle:c.dropTitle,ch3P9Hash:c.hash,ch3P9Accept:c.accept,ch3P9Seal:c.seal,ch3P9EndEyebrow:c.chapterEyebrow,ch3P9EndTitle:c.chapterTitle,ch3P9Principle:c.principle,ch3P9Continue4:c.continue4,ch3P9ReturnTitle:c.returnTitle,ch3P9TeaserEyebrow:c.teaserEyebrow,ch3P9TeaserTitle:c.teaserTitle,ch3P9TeaserPlace:c.teaserPlace,ch3P9TeaserText:c.teaserText,ch3P9BookFlight:c.bookFlight,ch3P9TeaserReturn:c.returnTitle};
 Object.entries(map).forEach(([id,v])=>{const n=$("#"+id);if(n)n.textContent=v});
 const buttons=$$("[data-p9-choice]");buttons.forEach(b=>b.textContent=c[b.dataset.p9Choice]);
 if(dialogue)renderDialogue();if(consoleOpen)renderContainment();if(dropOpen)renderDeadDrop();paint()
}
function paint(){const p=ensure(),action=$("#ch3P9Action");if($("#ch3P9Objective"))$("#ch3P9Objective").textContent=objectiveText();if(action){action.hidden=true;if(p.introComplete&&!p.containmentComplete&&!dialogue){action.hidden=false;action.textContent=copy().stabilize}}syncAudio()}

function status(text="",kind=""){const n=$("#ch3P9Status");if(!n)return;n.textContent=text;n.className="ch3-p9-status"+(kind?" "+kind:"")}
function closeAllModals(user=true){
 consoleOpen=choiceOpen=decisionOpen=dropOpen=false;
 ["ch3P9Console","ch3P9Choice","ch3P9Decision","ch3P9DeadDrop"].forEach(id=>{const m=$("#"+id);m?.classList.remove("open");m?.setAttribute("aria-hidden","true")});
 if(user)paint();syncAudio()
}
function openContainment(){if(dialogue||ensure().containmentComplete)return;consoleOpen=true;const m=$("#ch3P9Console");m.classList.add("open");m.setAttribute("aria-hidden","false");renderContainment();syncAudio()}
function renderContainment(){
 const p=ensure(),c=copy(),body=$("#ch3P9ConsoleBody");if(!body)return;status();
 body.innerHTML=`<p class="ch3-p9-help">${c.containHelp}</p><div class="ch3-p9-live-meter"><span>LIVE EVIDENCE</span><div><i style="width:${48+p.containmentOrder.length*11}%"></i></div><b>${48+p.containmentOrder.length*11}%</b></div><div class="ch3-p9-contain-grid">${CONTAIN_DISPLAY.map(id=>{const x=containData(id),chosen=p.containmentOrder.includes(id);return`<button type="button" data-p9-contain="${id}" class="${chosen?"selected":""}" ${chosen?"disabled":""}><i>${x.num}</i><span><b>${x.label}</b><small>${x.note}</small></span></button>`}).join("")}</div><div class="ch3-p9-order"><b>${c.selected}</b><ol>${p.containmentOrder.map(id=>{const x=containData(id);return`<li data-p9-remove="${id}"><i>${x.num}</i><span>${x.label}</span></li>`}).join("")||`<li class="empty">${tr("Tap an action to build the preservation order","แตะคำสั่งเพื่อจัดลำดับการรักษา")}</li>`}</ol></div><div class="ch3-p9-actions"><button id="ch3P9ContainConfirm" class="primary" type="button">${c.confirm}</button><button id="ch3P9ContainReset" class="ghost" type="button">${c.reset}</button></div>`;
 $$("[data-p9-contain]",body).forEach(b=>b.onclick=()=>{p.containmentOrder.push(b.dataset.p9Contain);renderContainment();save()});
 $$("[data-p9-remove]",body).forEach(li=>li.onclick=()=>{p.containmentOrder=p.containmentOrder.filter(x=>x!==li.dataset.p9Remove);renderContainment();save()});
 $("#ch3P9ContainReset").onclick=()=>{p.containmentOrder=[];renderContainment();save()};$("#ch3P9ContainConfirm").onclick=confirmContainment
}
function confirmContainment(){
 const p=ensure();if(p.containmentOrder.length!==CONTAIN_CORRECT.length){status(tr("Place all four preservation actions before confirming.","จัดคำสั่งรักษาหลักฐานให้ครบทั้งสี่รายการก่อนยืนยัน"),"error");return}
 if(p.containmentOrder.some((x,i)=>x!==CONTAIN_CORRECT[i])){p.containmentAttempts++;status(tr("Quarantine came too early. Preserve volatile evidence before containing execution.","กัก Process เร็วเกินไป ต้องรักษาหลักฐาน Volatile ก่อนควบคุมการทำงาน"),"error");save();return}
 p.containmentComplete=true;p.stage="containment-debrief";gs().checkpoint="ch3_phase9_containment_complete";addEvidence("volatile_capture");try{window.LastWitnessAudioCue?.playPuzzleSuccess?.()}catch(_){}save();talkAfterModal(D.containmentDebrief,()=>{p.containmentDebriefSeen=true;p.stage="contact";gs().checkpoint="ch3_phase9_contact";save();openChoice()})
}

function openChoice(){if(dialogue||ensure().choiceMade)return;choiceOpen=true;const m=$("#ch3P9Choice");m.classList.add("open");m.setAttribute("aria-hidden","false");syncAudio()}
function chooseApproach(key){
 const p=ensure();if(p.choiceMade||!CHOICE_BRANCHES[key])return;p.choiceMade=true;p.choiceKey=key;p.stage="contact-dialogue";choiceOpen=false;$("#ch3P9Choice")?.classList.remove("open");save();
 talk([...CHOICE_BRANCHES[key],...D.commonContact],()=>{p.contactComplete=true;p.stage="cleanup";p.cleanupDetected=true;gs().checkpoint="ch3_phase9_cleanup";setLaptopFeed("cleanup");playStinger("cleanup",.27);save();talk(D.cleanup,openCleanupDecision)})
}

function openCleanupDecision(){if(dialogue||ensure().cleanupDecisionComplete)return;decisionOpen=true;const m=$("#ch3P9Decision");m.classList.add("open");m.setAttribute("aria-hidden","false");$("#ch3P9DecisionStatus").textContent="";syncAudio()}
function cleanupWrong(type){const n=$("#ch3P9DecisionStatus");if(!n)return;n.className="ch3-p9-status error";n.textContent=type==="cut"?tr("Cutting the connection destroys the volatile cleanup token.","การตัดการเชื่อมต่อจะทำลาย Cleanup Token ที่ยังอยู่ใน Memory"):tr("An active trace would contaminate the read-only evidence channel.","Active Trace จะปนเปื้อนช่องทางหลักฐานแบบอ่านอย่างเดียว")}
function preserveCleanup(){
 const p=ensure();if(p.cleanupDecisionComplete)return;p.cleanupDecisionComplete=true;p.stage="dead-drop-intro";addEvidence("watcher_delivery");addEvidence("dual_origin");decisionOpen=false;$("#ch3P9Decision")?.classList.remove("open");save();
 talk(D.afterCleanup,()=>{p.deadDropAvailable=true;p.stage="dead-drop";gs().checkpoint="ch3_phase9_dead_drop";setLaptopFeed("dead-drop");playStinger("deadDrop",.27);save();openDeadDrop()})
}

function openDeadDrop(){if(dialogue||ensure().bundleSealed)return;dropOpen=true;const m=$("#ch3P9DeadDrop");m.classList.add("open");m.setAttribute("aria-hidden","false");renderDeadDrop();syncAudio()}
function renderDeadDrop(){
 const p=ensure(),c=copy(),hash=$("#ch3P9Hash"),accept=$("#ch3P9Accept"),seal=$("#ch3P9Seal"),timer=$("#ch3P9DropTimer"),stat=$("#ch3P9DropStatus");if(!hash||!accept||!seal)return;
 hash.textContent=p.deadDropHashPreserved?tr("HASH PRESERVED","รักษา HASH แล้ว"):c.hash;hash.disabled=p.deadDropHashPreserved;
 accept.textContent=p.deadDropAccepted?tr("TRANSFER RECEIVED","รับ TRANSFER แล้ว"):c.accept;accept.disabled=!p.deadDropHashPreserved||p.deadDropAccepted;
 seal.textContent=c.seal;seal.disabled=!p.deadDropAccepted;
 timer.textContent=p.deadDropAccepted?"10:31":p.deadDropHashPreserved?"10:47":"11:00";
 stat.className="ch3-p9-status"+(p.deadDropAccepted?" success":"");stat.textContent=p.deadDropAccepted?tr("Encrypted payload received. Seal the chain-of-custody bundle.","รับ Encrypted Payload แล้ว ปิดผนึก Chain-of-Custody Bundle"):p.deadDropHashPreserved?tr("Hash preserved. Encrypted transfer may be accepted.","รักษา Hash แล้ว สามารถรับ Encrypted Transfer ได้"):tr("Preserve the source hash before accepting any data.","รักษา Source Hash ก่อนรับข้อมูล")
}
function preserveHash(){const p=ensure();if(p.deadDropHashPreserved)return;p.deadDropHashPreserved=true;p.stage="dead-drop-hashed";renderDeadDrop();save()}
function acceptTransfer(){const p=ensure();if(!p.deadDropHashPreserved||p.deadDropAccepted)return;p.deadDropAccepted=true;p.stage="dead-drop-received";renderDeadDrop();save()}
function sealDeadDrop(){
 const p=ensure();if(!p.deadDropAccepted||p.bundleSealed)return;p.bundleSealed=true;p.stage="closing";addEvidence("dead_drop");gs().checkpoint="ch3_phase9_closing";setLaptopFeed("sealed");dropOpen=false;$("#ch3P9DeadDrop")?.classList.remove("open");save();talk(D.closing,completePhase9)
}

function applyRelationshipBeat(){const p=ensure();if(p.relationshipApplied)return;p.relationshipApplied=true;const r=gs().relationships=gs().relationships||{},ch=r["Cheryl Goh"]=r["Cheryl Goh"]||{trust:48,respect:68,attachment:12,suspicion:18};ch.respect=Math.min(100,Number(ch.respect||0)+4);ch.attachment=Math.min(100,Number(ch.attachment||0)+3)}
function completePhase9(){
 const p=ensure();p.closingDialogueComplete=true;p.complete=true;p.stage="complete";p.chapterCardSeen=true;applyRelationshipBeat();gs().checkpoint="ch3_complete";gs().progress=100;save();stopAudio(false);playStinger("close",.27);showChapterComplete()
}
function showChapterComplete(){
 inject();closeAllModals(false);stopAudio(false);const p=ensure();p.complete=true;p.chapterCardSeen=true;p.stage="complete";gs().screen=END_SCREEN;safeShow(END_SCREEN);updateLanguage();syncAudio();save()
}
function showTeaser(){const p=ensure();p.teaserSeen=true;p.stage="teaser";gs().screen=TEASER_SCREEN;safeShow(TEASER_SCREEN);updateLanguage();syncAudio();save()}
function returnToTitle(){
 stopAudio(true);closeAllModals(false);
 try{window.LastWitnessChapter2Integration?.returnToTitle?.()}catch(_){try{$$(".screen").forEach(n=>n.classList.remove("active"));$("#title")?.classList.add("active");if(gs())gs().screen="title"}catch(__){}}
}

function startIntro(){
 const p=ensure();if(p.introComplete||dialogue)return;setLaptopFeed("probe");talk(D.intro,()=>{p.introComplete=true;p.stage="containment";gs().checkpoint="ch3_phase9_containment";paint();save();openContainment()})
}
function enter(){
 inject();const p=ensure();
 if(p.complete){if(p.stage==="teaser"||gs()?.screen===TEASER_SCREEN)showTeaser();else showChapterComplete();return}
 gs().screen=SCREEN;safeShow(SCREEN);updateLanguage();syncAudio();
 if(p.bundleSealed&&!p.closingDialogueComplete){setLaptopFeed("sealed");talk(D.closing,completePhase9);return}
 if(p.deadDropAvailable&&!p.bundleSealed){setLaptopFeed("dead-drop");openDeadDrop();return}
 if(p.cleanupDetected&&!p.cleanupDecisionComplete){setLaptopFeed("cleanup");openCleanupDecision();return}
 if(p.choiceMade&&!p.contactComplete){setLaptopFeed("palimpsest","guarded");talk([...CHOICE_BRANCHES[p.choiceKey||"authorship"],...D.commonContact],()=>{p.contactComplete=true;p.cleanupDetected=true;p.stage="cleanup";setLaptopFeed("cleanup");playStinger("cleanup",.27);save();talk(D.cleanup,openCleanupDecision)});return}
 if(p.containmentComplete&&!p.containmentDebriefSeen){talk(D.containmentDebrief,()=>{p.containmentDebriefSeen=true;p.stage="contact";save();openChoice()});return}
 if(p.containmentComplete&&!p.choiceMade){setLaptopFeed("palimpsest","neutral");openChoice();return}
 if(p.introComplete&&!p.containmentComplete){setLaptopFeed("unknown","neutral");openContainment();return}
 setLaptopFeed("probe");clearTimeout(introTimer);introTimer=setTimeout(startIntro,650)
}
function startFromPhase8(){
 inject();try{window.LastWitnessPhase8?.stopAudio?.(true)}catch(_){}const p=ensure();if(p.complete){showChapterComplete();return}p.started=true;p.stage=p.stage||"callback";gs().checkpoint="ch3_phase9_callback";save();enter()
}
function startFreshForDev(){const s=gs();if(!s)return;s.chapter3=s.chapter3||{};s.chapter3.phase9={started:true,introComplete:false,unknownRevealPlayed:false,containmentOrder:[],containmentAttempts:0,containmentComplete:false,containmentDebriefSeen:false,choiceMade:false,choiceKey:"",contactComplete:false,cleanupDetected:false,cleanupDecisionComplete:false,deadDropAvailable:false,deadDropHashPreserved:false,deadDropAccepted:false,bundleSealed:false,evidenceCollected:[],closingDialogueComplete:false,complete:false,chapterCardSeen:false,teaserSeen:false,relationshipApplied:false,stage:"callback"};startFromPhase8()}
function resume(screen){inject();updateLanguage();if(screen===SCREEN){enter();return}if(screen===END_SCREEN){showChapterComplete();return}if(screen===TEASER_SCREEN){showTeaser();return}if(screen==="chapter3Wip"&&gs()?.chapter3?.phase8?.complete)startFromPhase8()}

function appendCase(){
 const list=$("#caseList"),p=ensure();if(!list||!p.evidenceCollected.length)return;
 $("[data-p9-case-section]",list)?.remove();$$('[data-p9-case-entry]',list).forEach(n=>n.remove());
 const h=document.createElement("div");h.className="case-section-title";h.dataset.p9CaseSection="1";h.textContent=tr("CHAPTER III · CALLBACK","บทที่ III · เสียงตอบกลับ");list.appendChild(h);
 p.evidenceCollected.forEach(id=>{const e=E[id],k=thai()?"th":"en",row=document.createElement("div");row.className="case-row";row.dataset.p9CaseEntry=id;row.innerHTML=`<b>${e.title[k]}</b><div>${e.description[k]}</div>`;list.appendChild(row)})
}
function bindElements(){
 $("#ch3P9Action").onclick=openContainment;$("#ch3P9ConsoleClose").onclick=()=>closeAllModals(true);$("#ch3P9Console").onclick=e=>{if(e.target.id==="ch3P9Console")closeAllModals(true)};
 $$("[data-p9-choice]").forEach(b=>b.onclick=()=>chooseApproach(b.dataset.p9Choice));
 $("#ch3P9PreserveToken").onclick=preserveCleanup;$("#ch3P9CutAll").onclick=()=>cleanupWrong("cut");$("#ch3P9ActiveTrace").onclick=()=>cleanupWrong("trace");
 $("#ch3P9Hash").onclick=preserveHash;$("#ch3P9Accept").onclick=acceptTransfer;$("#ch3P9Seal").onclick=sealDeadDrop;
 $("#ch3P9Continue4").onclick=showTeaser;$("#ch3P9ReturnTitle").onclick=returnToTitle;$("#ch3P9TeaserReturn").onclick=returnToTitle;
 $(".ch3-p9-save").onclick=()=>{try{manualSave()}catch(_){}};$(".ch3-p9-menu").onclick=()=>$("#drawer")?.classList.add("open")
}
function installBridge(){
 const api=window.LastWitnessChapter3;if(api&&!api.__lwPhase90121){const old=api.resumeFromState;api.resumeFromState=function(screen){const result=typeof old==="function"?old.apply(this,arguments):undefined;if(internal)return result;if(SCREENS.has(screen)||(screen==="chapter3Wip"&&gs()?.chapter3?.phase8?.complete)){setTimeout(()=>resume(screen),0);return result}if(screen==="chapter3DigitalForensicsLab"&&gs()?.chapter3?.phase8?.complete&&!ensure().started)setTimeout(startFromPhase8,0);return result};api.__lwPhase90121=true}
 window.LastWitnessPhase9={startFromPhase8,startFreshForDev,resumeFromState:resume,stopAudio,showChapterComplete,returnToTitle,version:BUILD}
}
function bind(){
 inject();installBridge();updateLanguage();$("#caseButton")?.addEventListener("click",()=>setTimeout(appendCase,0),true);$("#soundToggle")?.addEventListener("change",syncAudio,true);$("#musicRange")?.addEventListener("input",syncAudio,true);document.addEventListener("click",e=>{if(e.target.closest?.("[data-lang]"))setTimeout(updateLanguage,0)},true);
 document.addEventListener("visibilitychange",()=>{if(document.hidden){clearTimeout(introTimer);introTimer=0;stopAudio(false)}else{if(active()===SCREEN&&!ensure().introComplete&&!dialogue)introTimer=setTimeout(startIntro,500);syncAudio()}});
 const label=$("#settingsVersion");if(label)label.textContent=`LAST WITNESS · BUILD ${BUILD}`;if(window.LastWitnessSaveManager)window.LastWitnessSaveManager.version=BUILD;
 const screen=active();if(SCREENS.has(screen)||(screen==="chapter3Wip"&&gs()?.chapter3?.phase8?.complete))setTimeout(()=>resume(screen),0)
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",bind,{once:true});else bind();
})();
