/* LAST WITNESS — Chapter III Phase 1
 * THE BORROWED MINUTES / THE MISSING PASSENGER
 * Uses the exact shared UI classes from Chapter I–II.
 * Defect repair 0.4.2: calibrated audio mix, dialogue ducking, and deterministic puzzle state.
 */
(function(){
"use strict";
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const DEV_SAVE="last_witness_ch3_phase1_dev";
const CH2_SAVES=["last_witness_rc1_auto","last_witness_rc1_manual"];

const PORTRAITS={
 Benedict:{neutral:"assets/images/381e0e1f9a98101c.jpg",smile:"assets/images/fe04f1468bad8d82.jpg",thinking:"assets/images/a0fc6623ca50a308.jpg",serious:"assets/images/11088c10c5b3cfe6.jpg",smirk:"assets/images/57c2b9cd8b54b14f.jpg",somber:"assets/images/c2c68545464bad83.jpg",suspicious:"assets/images/945c34cdf1a35f78.jpg"},
 North:{neutral:"assets/images/c50ad1d603cb4eae.jpg",analyzing:"assets/images/c52000aa1f740adf.jpg",serious:"assets/images/a32595ad37b3c868.jpg",skeptical:"assets/images/6931139ef06e0b99.jpg",dry:"assets/images/520455a5f976f4e5.jpg",concerned:"assets/images/5a51446056fdcb0a.jpg",determined:"assets/images/083c49be64c0c61b.jpg",pensive:"assets/images/1ae925a2f06c17ee.jpg",confident:"assets/images/b9e5ed1a6d0365a9.jpg"}
};

const CHARACTER_DATA={
 Benedict:{portrait:"assets/images/381e0e1f9a98101c.jpg",status:{en:"Lead Investigator",th:"หัวหน้าผู้สืบสวน"},notes:{en:"Calm, observant, and responsible for the final deductions. His choices continue to shape the investigation.",th:"สุขุม ช่างสังเกต และเป็นผู้สรุปข้อเท็จจริงของคดี การตัดสินใจของเขายังคงกำหนดทิศทางการสืบสวน"}},
 North:{portrait:"assets/images/c50ad1d603cb4eae.jpg",status:{en:"Trusted Partner · IT Specialist",th:"คู่หูที่ไว้ใจ · ผู้เชี่ยวชาญไอที"},notes:{en:"Technical investigator and Benedict's established partner. She trusts evidence more than convenient explanations.",th:"ผู้สืบสวนด้านเทคนิคและคู่หูของ Benedict เธอเชื่อหลักฐานมากกว่าคำอธิบายที่ฟังสะดวก"}},
 Elena:{portrait:"assets/images/f6ecc87ac62112b6.jpg",status:{en:"Forensic Analyst",th:"นักวิเคราะห์นิติวิทยาศาสตร์"},notes:{en:"Independent forensic analyst helping trace the untouched scientific data and the altered chronology from Bangkok.",th:"นักวิเคราะห์นิติวิทยาศาสตร์อิสระ ผู้ช่วยตามรอยข้อมูลวิทยาศาสตร์ที่ยังสมบูรณ์และลำดับเวลาที่ถูกแก้จากกรุงเทพฯ"}},
 Somchai:{portrait:"assets/images/fd3e65df3ccfc9b2.png",status:{en:"Investigation Officer",th:"เจ้าหน้าที่สืบสวน"},notes:{en:"Evidence Division officer who witnessed authorised access and helped verify the impossible intake sequence.",th:"เจ้าหน้าที่ฝ่ายหลักฐาน ผู้เป็นพยานเรื่องการเข้าถึงที่ได้รับอนุญาตและช่วยยืนยันลำดับการรับหลักฐานที่เป็นไปไม่ได้"}},
 Kittisak:{portrait:"assets/images/8b34fe5c26f1292e.png",status:{en:"Police Captain",th:"ร้อยตำรวจเอก · หัวหน้าคดี"},notes:{en:"The commanding officer preserving the original evidence and coordinating the formal Singapore request.",th:"หัวหน้าคดีผู้รักษาหลักฐานต้นฉบับและประสานคำร้องอย่างเป็นทางการไปยังสิงคโปร์"}},
 Ratchata:{portrait:null,status:{en:"Senior Medical Examiner",th:"แพทย์นิติเวชอาวุโส"},notes:{en:"Independent medical examiner who proved that the body kept a timeline the database could not rewrite.",th:"แพทย์นิติเวชอิสระ ผู้พิสูจน์ว่าร่างกายเก็บลำดับเวลาที่ฐานข้อมูลไม่สามารถเขียนทับได้"}}
};
const CHARACTER_ORDER=["Benedict","North","Elena","Somchai","Kittisak","Ratchata"];

const TEXT={
 en:{
  routeTitle:"CHAPTER III",routeText:"Choose the Chapter II lead for this development playthrough.",savedRoute:"Continue from Chapter II",timeline:"Altered Timeline",old_cases:"Older Cases",access:"Personnel Access",
  chapter:"CHAPTER III",chapterTitle:"THE BORROWED MINUTES",dayEyebrow:"INVESTIGATION DAY",day:"DAY 3",dayLocation:"BANGKOK · 08:40 AM",dayText:"The official record has crossed a border.",
  location:"Detective Office • Day 3",objective:"Reconstruct the eleven-minute sequence",scene:"THE MISSING PASSENGER",puzzleButton:"Reconstruct Timeline",choiceTitle:"Choose the first Singapore lead",system:"Follow the system",daniel:"Follow Daniel",operator:"Follow the operator",
  completeTitle:"THE RECORD CROSSED A BORDER",completeText:"Daniel never reached Singapore. His credential did.",continuePhase2:"Continue to Phase II",phase2Title:"PHASE I COMPLETE",phase2Text:"The Singapore departure sequence will continue in Phase II.",returnEntry:"Return to Chapter III Entry",
  puzzleEyebrow:"TIMELINE RECONSTRUCTION",puzzleTitle:"Put the official events in order",puzzleHelp:"Tap each event from earliest to latest. The sequence can be reset without penalty.",available:"Available Events",selected:"Your Sequence",confirm:"Confirm Sequence",reset:"Reset",returnOffice:"Return to Office",placeholder:"No events selected yet.",correct:"Sequence confirmed. The records overlap inside the system's eleven-minute reconciliation window.",wrong:"That order does not match the verified evidence. Review the timestamps and try again.",puzzleSolved:"Timeline reconstructed",
  menu:"Game Menu",resume:"Resume",save:"Save Game",saveSmall:"Save this Chapter III checkpoint",load:"Load Game",history:"Dialogue History",caseFile:"Case File",characters:"Characters",settings:"Settings",restart:"Restart Phase",close:"Close",back:"Back",language:"Language",masterSound:"Master Sound",music:"Music",sfx:"SFX",saved:"Saved",noSave:"No Chapter III save found.",noHistory:"No dialogue yet.",noEvidence:"No Chapter III evidence yet.",
  approachSaved:"Investigation approach saved",routeLead:"Opening Lead",timelineEvidence:"Reconstructed Timeline",passengerEvidence:"Missing Passenger Record",apartmentEvidence:"Singapore Apartment Access",
  events:{entry:["05:47","Credential 18-07 enters Daniel's building"],draft:["05:51","Daniel's café draft is edited"],sample:["05:58","Original toxicology sample is collected"],revision:["06:09","Collection time is revised"],intake:["06:17","Laboratory accepts the sample"],discovery:["06:20","Daniel's body is officially discovered"]}
 },
 th:{
  routeTitle:"บทที่ III",routeText:"เลือกเบาะแสจากตอนจบบทที่ II สำหรับการทดสอบรอบนี้",savedRoute:"ดำเนินต่อจากบทที่ II",timeline:"ลำดับเวลาที่ถูกแก้",old_cases:"คดีเก่า",access:"สิทธิ์การเข้าถึงของบุคลากร",
  chapter:"บทที่ III",chapterTitle:"สิบเอ็ดนาทีที่ถูกยืม",dayEyebrow:"วันที่ของการสืบสวน",day:"วันที่ 3",dayLocation:"กรุงเทพฯ · 08:40 น.",dayText:"บันทึกทางการข้ามพรมแดนไปแล้ว",
  location:"สำนักงานนักสืบ • วันที่ 3",objective:"เรียงลำดับเหตุการณ์สิบเอ็ดนาที",scene:"ผู้โดยสารที่หายไป",puzzleButton:"เรียงลำดับเวลา",choiceTitle:"เลือกเบาะแสแรกในสิงคโปร์",system:"ตามระบบ",daniel:"ตามรอยแดเนียล",operator:"ตามหาผู้ใช้งาน", 
  completeTitle:"บันทึกข้ามพรมแดน",completeText:"แดเนียลไปไม่ถึงสิงคโปร์ แต่ credential ของเขาไปถึง",continuePhase2:"ไปยังเฟสที่ II",phase2Title:"จบเฟสที่ I",phase2Text:"การเดินทางไปสิงคโปร์จะดำเนินต่อในเฟสที่ II",returnEntry:"กลับทางเข้าบทที่ III",
  puzzleEyebrow:"ประกอบลำดับเวลา",puzzleTitle:"เรียงเหตุการณ์ทางการให้ถูกต้อง",puzzleHelp:"แตะเหตุการณ์จากเวลาแรกสุดไปยังเวลาหลังสุด รีเซ็ตได้โดยไม่มีบทลงโทษ",available:"เหตุการณ์ที่มี",selected:"ลำดับของคุณ",confirm:"ยืนยันลำดับ",reset:"เริ่มใหม่",returnOffice:"กลับสำนักงาน",placeholder:"ยังไม่ได้เลือกเหตุการณ์",correct:"ยืนยันลำดับแล้ว บันทึกทั้งหมดซ้อนทับกันอยู่ในช่วงปรับข้อมูลย้อนหลังสิบเอ็ดนาทีของระบบ",wrong:"ลำดับนี้ไม่ตรงกับหลักฐานที่ยืนยันแล้ว ตรวจเวลาอีกครั้งแล้วลองใหม่",puzzleSolved:"ประกอบลำดับเวลาแล้ว", 
  menu:"เมนูเกม",resume:"เล่นต่อ",save:"บันทึกเกม",saveSmall:"บันทึก checkpoint ของบทที่ III",load:"โหลดเกม",history:"ประวัติการสนทนา",caseFile:"แฟ้มคดี",characters:"ตัวละคร",settings:"การตั้งค่า",restart:"เริ่มเฟสใหม่",close:"ปิด",back:"กลับ",language:"ภาษา",masterSound:"เสียงทั้งหมด",music:"ดนตรี",sfx:"เอฟเฟกต์เสียง",saved:"บันทึกแล้ว",noSave:"ไม่พบเซฟของบทที่ III",noHistory:"ยังไม่มีบทสนทนา",noEvidence:"ยังไม่มีหลักฐานในบทที่ III", 
  approachSaved:"บันทึกแนวทางการสืบสวนแล้ว",routeLead:"เบาะแสเปิดเรื่อง",timelineEvidence:"ลำดับเวลาที่ประกอบแล้ว",passengerEvidence:"บันทึกผู้โดยสารที่หายไป",apartmentEvidence:"การเข้าห้องพักในสิงคโปร์",
  events:{entry:["05:47","Credential 18-07 เข้าอาคารของแดเนียล"],draft:["05:51","ร่างข้อความนัดพบของแดเนียลถูกแก้"],sample:["05:58","เก็บตัวอย่างพิษวิทยาต้นฉบับ"],revision:["06:09","เวลาเก็บตัวอย่างถูกแก้ไข"],intake:["06:17","ห้องปฏิบัติการรับตัวอย่าง"],discovery:["06:20","พบศพแดเนียลอย่างเป็นทางการ"]}
 }
};

const game={
 language:localStorage.getItem("last_witness_language")||"en",route:null,approach:null,checkpoint:"entry",history:[],evidence:[],selected:[],puzzleComplete:false,puzzleFeedback:null,dialogue:null,dialogueIndex:0,sound:true,music:.33,sfx:.55,characters:{Benedict:true,North:true,Elena:true,Somchai:true,Kittisak:true,Ratchata:true},
 relationships:{North:{trust:70,respect:78,attachment:58,suspicion:3}},personality:{warm:0,observant:0,direct:0}
};
const order=["entry","draft","sample","revision","intake","discovery"];
const shuffled=["intake","entry","revision","discovery","draft","sample"];

function t(key){return TEXT[game.language][key]??TEXT.en[key]??key}
function line(speaker,emotion,en,th){return{speaker,emotion,text:{en,th}}}
function portrait(speaker,emotion){const set=PORTRAITS[speaker]||PORTRAITS.Benedict;return set[emotion]||set.neutral}
const AUDIO_MIX={
 normal:{officeAmbience:.22,officeScore:.045},
 dialogue:{officeAmbience:.13,officeScore:.016},
 puzzle:{officeAmbience:.17,officeScore:.026},
 overlay:{officeAmbience:.11,officeScore:.012},
 click:.42,
 page:.50
};
const fadeTimers=new WeakMap();
const sfxLastPlayed=new Map();
let audioMode="normal";
function clampVolume(value){return Math.max(0,Math.min(1,Number(value)||0))}
function play(id,volume,minGap=0){
 if(!game.sound)return;
 const a=$(id);if(!a)return;
 const now=performance.now();
 const last=sfxLastPlayed.get(id)||0;
 if(minGap&&now-last<minGap)return;
 sfxLastPlayed.set(id,now);
 try{a.pause();a.currentTime=0;a.volume=clampVolume(volume);a.play().catch(()=>{})}catch(_){}
}
function stop(id){const a=$(id);if(!a)return;const timer=fadeTimers.get(a);if(timer)clearInterval(timer);fadeTimers.delete(a);try{a.pause();a.currentTime=0;a.volume=0}catch(_){}}
function fadeLoop(audio,target,duration=900){
 if(!audio||!game.sound)return;
 const previous=fadeTimers.get(audio);if(previous)clearInterval(previous);
 audio.loop=true;
 if(audio.paused){audio.volume=0;audio.play().catch(()=>{})}
 const start=Number(audio.volume)||0;
 const began=performance.now();
 const timer=setInterval(()=>{
  const p=Math.min(1,(performance.now()-began)/duration);
  audio.volume=clampVolume(start+(target-start)*p);
  if(p>=1){clearInterval(timer);fadeTimers.delete(audio)}
 },40);
 fadeTimers.set(audio,timer)
}
function click(){play("#ch3ClickAudio",game.sfx*AUDIO_MIX.click,65)}
function pageSound(){play("#ch3PageAudio",game.sfx*AUDIO_MIX.page,220)}
function flash(text=t("saved")){const e=$("#saveIndicator");e.textContent=text;e.classList.add("show");clearTimeout(flash.timer);flash.timer=setTimeout(()=>e.classList.remove("show"),900)}
function badge(text){const e=$("#badge");e.textContent=text;e.classList.add("show");clearTimeout(badge.timer);badge.timer=setTimeout(()=>e.classList.remove("show"),1500)}
function showScreen(id){
 $$('.screen').forEach(s=>s.classList.remove('active'));
 $("#"+id)?.classList.add('active');
 game.checkpoint=id;
 closeOverlays(false);
 if(id==="chapter3Office")startOfficeAudio();else stopOfficeAudio()
}
function hasOpenOverlay(){return Boolean($("#drawer")?.classList.contains("open")||$$('.modal.open').length)}
function preferredAudioMode(){
 if(game.dialogue)return "dialogue";
 if($("#ch3PuzzleModal")?.classList.contains("open"))return "puzzle";
 if(hasOpenOverlay())return "overlay";
 return "normal"
}
function applyOfficeMix(mode=preferredAudioMode(),duration=650){
 audioMode=mode;
 if(!$("#chapter3Office")?.classList.contains("active")||!game.sound)return;
 const mix=AUDIO_MIX[mode]||AUDIO_MIX.normal;
 fadeLoop($("#ch3OfficeAudio"),game.music*mix.officeAmbience,duration);
 fadeLoop($("#ch3MusicAudio"),game.music*mix.officeScore,duration+180)
}
function closeOverlays(refresh=true){
 $("#drawer")?.classList.remove("open");
 $$('.modal.open').forEach(m=>m.classList.remove('open'));
 if(refresh)requestAnimationFrame(()=>applyOfficeMix())
}
function startOfficeAudio(){
 if(!game.sound){stopOfficeAudio();return}
 applyOfficeMix(preferredAudioMode(),1100)
}
function stopOfficeAudio(){stop("#ch3OfficeAudio");stop("#ch3MusicAudio");audioMode="normal"}

function readChapter2(){for(const key of CH2_SAVES){try{const raw=localStorage.getItem(key);if(!raw)continue;const data=JSON.parse(raw);const flags=data.flags||{};let route=flags.chapter3_timeline?"timeline":flags.chapter3_old_cases?"old_cases":flags.chapter3_access?"access":data.medical?.choice||null;if(route)return{route,relationships:data.relationships,personality:data.personality,characters:data.characters||{},journal:data.journal||{}}}catch(_){}}return null}
function save(silent=false){localStorage.setItem(DEV_SAVE,JSON.stringify({...game,dialogue:null}));if(!silent)flash()}
function load(){try{const raw=localStorage.getItem(DEV_SAVE);if(!raw){badge(t("noSave"));return}const data=JSON.parse(raw);Object.assign(game,data);game.selected=Array.isArray(data.selected)?data.selected:[];game.puzzleFeedback=null;if(game.puzzleComplete&&["puzzle","puzzle_ready"].includes(game.checkpoint))game.checkpoint="post_puzzle";const targetCheckpoint=game.checkpoint;game.characters=Object.assign({Benedict:true,North:true,Elena:true,Somchai:true,Kittisak:true,Ratchata:true},data.characters||{});CHARACTER_ORDER.forEach(name=>{game.characters[name]=true});applyLanguage();if($("#ch3SoundToggle"))$("#ch3SoundToggle").checked=game.sound!==false;if($("#ch3MusicRange"))$("#ch3MusicRange").value=String(game.music);if($("#ch3SfxRange"))$("#ch3SfxRange").value=String(game.sfx);if(targetCheckpoint==="chapter3Phase2Wip")showScreen("chapter3Phase2Wip");else{showScreen("chapter3Office");game.checkpoint=targetCheckpoint;restoreCheckpoint()}}catch(_){badge(t("noSave"))}}
function restart(){const route=game.route||readChapter2()?.route||"timeline";localStorage.removeItem(DEV_SAVE);begin(route)}

function showChapterIntro(onComplete){const intro=$("#chapterIntro");$("#chapterIntroNumber").textContent=t("chapter");$("#chapterIntroTitle").textContent=t("chapterTitle");intro.setAttribute("aria-hidden","false");intro.classList.add("instant","show");void intro.offsetWidth;intro.classList.remove("instant");setTimeout(()=>{onComplete?.();requestAnimationFrame(()=>{intro.classList.remove("show");intro.setAttribute("aria-hidden","true")})},2850)}
function begin(route){stop("#ch3ClickAudio");const source=readChapter2();game.route=route;game.approach=null;game.history=[];game.evidence=[];game.selected=[];game.puzzleComplete=false;game.puzzleFeedback=null;game.checkpoint="intro";if(source){game.relationships=source.relationships||game.relationships;game.personality=source.personality||game.personality;game.characters=Object.assign({},game.characters,source.characters||{})}
 CHARACTER_ORDER.forEach(name=>{game.characters[name]=true});save(true);showChapterIntro(()=>{localizeDay();showScreen("chapter3Day");setTimeout(()=>{showScreen("chapter3Office");startOpening()},2100)})}

function personalityOpening(){const p=dominantPersonality();if(p==="warm")return[
 line("Benedict","smile","You look like you slept less than the evidence.","ดูเหมือนคุณจะได้นอนน้อยกว่าหลักฐานอีกนะ"),
 line("North","dry","The evidence did not argue with a regional server until three in the morning.","หลักฐานไม่ได้เถียงกับเซิร์ฟเวอร์ภูมิภาคถึงตีสามนี่")];
 if(p==="observant")return[
 line("Benedict","thinking","Two printouts, no coffee, and the Singapore clock is open on your screen.","มีเอกสารสองชุด ไม่มีกาแฟ แล้วนาฬิกาสิงคโปร์ก็เปิดอยู่บนจอคุณ"),
 line("North","dry","Good. I can skip the part where I pretend this is still local.","ดี งั้นฉันข้ามส่วนที่ต้องแกล้งทำว่าเรื่องนี้ยังอยู่แค่ในประเทศได้เลย")];
 if(p==="direct")return[
 line("Benedict","serious","Tell me why we're going to Singapore.","บอกผมมาว่าทำไมเราต้องไปสิงคโปร์"),
 line("North","neutral","Because the record left Bangkok before Daniel could.","เพราะบันทึกออกจากกรุงเทพฯ ก่อนที่แดเนียลจะทำได้")];
 return[line("North","neutral","Morning.","สวัสดีตอนเช้า"),line("Benedict","smirk","That depends on what those screens are about to tell me.","จะเป็นเช้าที่ดีหรือไม่ คงต้องดูว่าจอพวกนั้นกำลังจะบอกอะไรผม")]
}
function dominantPersonality(){const entries=Object.entries(game.personality||{}).sort((a,b)=>(b[1]||0)-(a[1]||0));return entries[0]?.[1]>0?entries[0][0]:null}
function routeOpening(){if(game.route==="timeline")return[
 line("North","analyzing","I rebuilt the audit trail from the raw exports. Terminal Three never transmitted the revision.","ฉันประกอบ audit trail ใหม่จากข้อมูลดิบ Terminal Three ไม่เคยส่งรายการแก้นั้นออกมา"),
 line("Benedict","serious","It was offline. We already proved that.","มันออฟไลน์อยู่ เราพิสูจน์เรื่องนั้นแล้ว"),
 line("North","serious","The event entered through a delayed reconciliation queue hosted in Singapore.","เหตุการณ์นั้นเข้ามาผ่านคิวปรับข้อมูลย้อนหลังที่โฮสต์อยู่ในสิงคโปร์")];
 if(game.route==="old_cases")return[
 line("North","analyzing","Daniel archived six older cases. Three carry the same reconciliation profile as his toxicology record.","แดเนียลเก็บคดีเก่าหกคดี สามคดีใช้ reconciliation profile เดียวกับบันทึกพิษวิทยาของเขา"),
 line("Benedict","thinking","One of them connects to Hotel 1807.","หนึ่งในนั้นเชื่อมกับโรงแรมห้อง 1807"),
 line("North","serious","To the company that leased it. Their regional service contract is administered in Singapore.","เชื่อมถึงบริษัทที่เช่าห้องนั้น และสัญญาบริการระดับภูมิภาคของบริษัทถูกดูแลจากสิงคโปร์")];
 return[
 line("North","analyzing","Credential 18-07 was not cloned inside Daniel's building. It was reissued by a regional signing authority.","Credential 18-07 ไม่ได้ถูกโคลนภายในอาคารของแดเนียล มันถูกออกใหม่โดยหน่วยลงนามระดับภูมิภาค"),
 line("Benedict","serious","Authorised by whom?","ใครเป็นผู้อนุมัติ"),
 line("North","serious","The authority is valid. The operator identity is blank. The certificate resolves to Singapore.","หน่วยออกสิทธิ์ถูกต้อง แต่ช่องผู้ใช้งานว่างเปล่า และ certificate ชี้ไปที่สิงคโปร์")]
}
function sharedOpening(){return[
 line("North","determined","All three trails touch the same node: Meridian Relay SG-04.","ร่องรอยทั้งสามเส้นมาบรรจบที่ node เดียวกัน Meridian Relay SG-04"),
 line("Benedict","thinking","A server?","เซิร์ฟเวอร์หรือ"),
 line("North","analyzing","A reconciliation service. When a trusted site goes offline, it holds signed events and synchronises them later.","บริการปรับข้อมูลให้ตรงกัน เมื่อจุดที่ระบบไว้ใจออฟไลน์ มันจะพักเหตุการณ์ที่ลงนามไว้แล้วซิงก์ภายหลัง"),
 line("Benedict","serious","How much later?","ภายหลังได้นานแค่ไหน"),
 line("North","serious","Eleven minutes before mandatory review.","สิบเอ็ดนาทีก่อนระบบบังคับตรวจสอบ"),
 line("Benedict","somber","The lie was not inside the test. It was built inside the grace period.","เรื่องโกหกไม่ได้อยู่ในผลตรวจ แต่มันถูกสร้างไว้ในช่วงเวลาผ่อนผันของระบบ"),
 line("North","neutral","Elena matched the Hotel 1807 metadata to Daniel's toxicology revision. Same trusted route. The scientific files were untouched.","Elena เทียบ metadata ของโรงแรมห้อง 1807 กับรายการแก้พิษวิทยาของแดเนียลแล้ว ทั้งคู่ใช้เส้นทางที่ระบบไว้ใจเส้นเดียวกัน และไฟล์วิทยาศาสตร์ไม่ถูกแตะต้อง"),
 line("Benedict","suspicious","So Room 1807 and credential 18-07 were not a coincidence.","งั้นห้อง 1807 กับ credential 18-07 ก็ไม่ใช่เรื่องบังเอิญ"),
 line("North","skeptical","Not proof of the same operator. Proof of the same route.","ยังไม่ใช่หลักฐานว่าเป็นผู้ใช้งานคนเดียวกัน แต่เป็นหลักฐานว่าใช้เส้นทางเดียวกัน"),
 line("Benedict","neutral","Show me the sequence.","แสดงลำดับให้ผมดู")]
}
function startOpening(){setProgress(3);$("#ch3PuzzleButton").classList.remove("show");$("#ch3Choice").classList.add("hidden");$("#ch3PhaseComplete").style.display="none";game.checkpoint="opening";save(true);setTimeout(()=>$("#ch3SceneLabel").classList.add("fade"),2400);runDialogue([...personalityOpening(),...routeOpening(),...sharedOpening()],()=>{$("#ch3PuzzleButton").classList.add("show");game.checkpoint="puzzle_ready";setProgress(6);save(true)})}

function runDialogue(lines,onComplete){game.dialogue=lines;game.dialogueIndex=0;game.dialogueComplete=onComplete;applyOfficeMix("dialogue",420);drawDialogue()}
function drawDialogue(){const box=$("#ch3Dialogue"),current=game.dialogue?.[game.dialogueIndex];if(!current){box.classList.add("hidden");applyOfficeMix();return}const right=current.speaker==="North";const text=current.text[game.language]||current.text.en;if(!current.recorded){game.history.push({speaker:current.speaker,text});current.recorded=true}box.className="dialogue"+(right?" right":"");box.innerHTML='<div class="portrait-wrap"><img class="portrait portrait-'+current.speaker+'" src="'+portrait(current.speaker,current.emotion||"neutral")+'"></div><div class="dialogue-copy"><div class="speaker">'+current.speaker+'</div><div class="line">'+text+'</div></div><div class="next">'+(game.dialogueIndex===game.dialogue.length-1?(game.language==="th"?"ดำเนินต่อ":"Continue"):(game.language==="th"?"แตะเพื่อดำเนินต่อ":"Tap to continue"))+'</div>';box.onclick=()=>{click();game.dialogueIndex++;if(game.dialogueIndex>=game.dialogue.length){box.classList.add("hidden");box.onclick=null;const done=game.dialogueComplete;game.dialogue=null;game.dialogueComplete=null;save(true);applyOfficeMix("normal",520);done?.()}else drawDialogue()}}

function clearPuzzleFeedback(){game.puzzleFeedback=null;const status=$("#ch3PuzzleStatus");if(status){status.textContent="";status.className="ch3-puzzle-status"}}
function closePuzzle(hideLauncher=false){
 $("#ch3PuzzleModal").classList.remove("open");
 clearPuzzleFeedback();
 if(hideLauncher)$("#ch3PuzzleButton").classList.remove("show");
 requestAnimationFrame(()=>applyOfficeMix())
}
function openPuzzle(){
 if(game.puzzleComplete)return;
 click();
 clearPuzzleFeedback();
 renderPuzzle();
 $("#ch3PuzzleModal").classList.add("open");
 game.checkpoint="puzzle";
 save(true);
 applyOfficeMix("puzzle",420)
}
function renderPuzzle(){
 game.selected=Array.isArray(game.selected)?game.selected.filter(id=>order.includes(id)):[];
 const available=shuffled.filter(id=>!game.selected.includes(id));
 $("#ch3AvailableEvents").innerHTML=available.map(id=>eventButton(id,false)).join("")||'<div class="ch3-selected-placeholder">—</div>';
 $("#ch3SelectedEvents").innerHTML=game.selected.length?game.selected.map(id=>eventButton(id,true)).join(""):'<div class="ch3-selected-placeholder">'+t("placeholder")+'</div>';
 const status=$("#ch3PuzzleStatus");
 status.textContent=game.puzzleFeedback?t(game.puzzleFeedback):"";
 status.className="ch3-puzzle-status"+(game.puzzleFeedback==="wrong"?" error":"");
 $("#ch3ConfirmPuzzle").disabled=game.selected.length!==order.length;
 $("#ch3ResetPuzzle").disabled=game.selected.length===0;
 $$('[data-event-id]').forEach(b=>b.onclick=()=>{
  click();
  const id=b.dataset.eventId;
  if(b.dataset.selected==="1")game.selected=game.selected.filter(x=>x!==id);
  else if(!game.selected.includes(id))game.selected.push(id);
  game.puzzleFeedback=null;
  renderPuzzle();
  save(true)
 })
}
function eventButton(id,selected){const e=TEXT[game.language].events[id];return '<button class="ch3-event-button" data-event-id="'+id+'" data-selected="'+(selected?"1":"0")+'" type="button"><strong>'+e[0]+'</strong><span>'+e[1]+'</span></button>'}
function confirmPuzzle(){
 if(game.selected.length!==order.length)return;
 click();
 const ok=game.selected.every((id,i)=>id===order[i]);
 if(!ok){game.puzzleFeedback="wrong";renderPuzzle();save(true);return}
 game.puzzleComplete=true;
 game.puzzleFeedback=null;
 $("#ch3PuzzleButton").classList.remove("show");
 addEvidence("timelineEvidence",game.selected.map(id=>TEXT[game.language].events[id].join(" — ")).join(" · "));
 setProgress(8);
 game.checkpoint="post_puzzle";
 save(true);
 closePuzzle(true);
 badge(t("puzzleSolved"));
 setTimeout(runPostPuzzle,240)
}
function resetPuzzle(){click();game.selected=[];clearPuzzleFeedback();renderPuzzle();save(true)}

function runPostPuzzle(){closePuzzle(true);game.checkpoint="post_puzzle";save(true);runDialogue([
 line("North","analyzing","There. No single record is impossible by itself. The impossibility appears when they are placed together.","เห็นไหม ไม่มีบันทึกใดเป็นไปไม่ได้เมื่อดูแยกกัน ความเป็นไปไม่ได้เกิดขึ้นเมื่อวางทั้งหมดต่อกัน"),
 line("Benedict","thinking","The system allowed the revised time to exist before anyone was required to question it.","ระบบยอมให้เวลาที่ถูกแก้ดำรงอยู่ก่อนที่ใครจะต้องตั้งคำถาม"),
 line("North","serious","Daniel found the same window in Hotel 1807. Then he booked a flight to Singapore.","แดเนียลพบช่วงเวลาเดียวกันในโรงแรมห้อง 1807 จากนั้นเขาจองเที่ยวบินไปสิงคโปร์"),
 line("Benedict","serious","He never boarded.","เขาไม่ได้ขึ้นเครื่อง"),
 line("North","concerned","No passport scan. No immigration record. He was a confirmed no-show.","ไม่มีการสแกนหนังสือเดินทาง ไม่มีบันทึกตรวจคนเข้าเมือง เขาไม่ได้เดินทางแน่นอน"),
 line("North","determined","But at 14:22 Singapore time, credential 18-07 opened a serviced apartment reserved through one of his shell companies.","แต่เวลา 14:22 น. ตามเวลาสิงคโปร์ credential 18-07 เปิดห้องพักเซอร์วิสอพาร์ตเมนต์ที่จองผ่านหนึ่งในบริษัทบังหน้าที่เขาตามอยู่"),
 line("Benedict","suspicious","The passenger never arrived. His credential did.","ผู้โดยสารไปไม่ถึง แต่ credential ของเขาไปถึง"),
 line("North","neutral","The apartment gateway keeps its raw reconciliation record for seventy-two hours. Inspector Cheryl Goh has placed a preservation hold on the room.","gateway ของห้องเก็บบันทึก reconciliation ดิบไว้เจ็ดสิบสองชั่วโมง Inspector Cheryl Goh สั่งคงสภาพห้องไว้แล้ว"),
 line("Benedict","thinking","Why do they need us there?","ทำไมฝั่งนั้นต้องให้เราไป"),
 line("North","analyzing","They have the Singapore endpoint. We have the Bangkok source hashes and Daniel's case key. The comparison needs both.","พวกเขามี endpoint ฝั่งสิงคโปร์ เรามี source hash ฝั่งกรุงเทพฯ กับกุญแจแฟ้มคดีของแดเนียล การเทียบข้อมูลต้องใช้ทั้งสองฝั่ง"),
 line("Benedict","neutral","Then we choose which trail we touch first.","งั้นเราต้องเลือกว่าจะเริ่มแตะร่องรอยไหนก่อน")
 ],()=>{$("#ch3Choice").classList.remove("hidden");game.checkpoint="choice";setProgress(9);save(true)})}

function chooseApproach(approach){click();game.approach=approach;const north=game.relationships.North||(game.relationships.North={trust:70,respect:78,attachment:58,suspicion:3});if(approach==="system")north.respect=(north.respect||0)+3;if(approach==="daniel"){north.trust=(north.trust||0)+2;north.attachment=(north.attachment||0)+1}if(approach==="operator"){north.respect=(north.respect||0)+1;game.personality.direct=(game.personality.direct||0)+1}$("#ch3Choice").classList.add("hidden");badge(t("approachSaved"));addEvidence("passengerEvidence",game.language==="th"?"แดเนียลไม่ได้ขึ้นเที่ยวบิน แต่ credential 18-07 ถูกใช้ในสิงคโปร์":"Daniel did not board his flight, but credential 18-07 was used in Singapore.");addEvidence("apartmentEvidence",game.language==="th"?"เซอร์วิสอพาร์ตเมนต์บันทึกการเข้าเวลา 14:22 น. และเก็บ raw reconciliation record ไว้ 72 ชั่วโมง":"A serviced apartment recorded entry at 14:22 SGT and retains its raw reconciliation record for 72 hours.");const branch={system:[
 line("Benedict","serious","We follow the relay. If the route was trusted, the route kept a receipt.","เราตาม relay ถ้าเส้นทางนั้นได้รับความไว้ใจ เส้นทางนั้นต้องทิ้งใบรับไว้"),line("North","confident","Cheryl has already cleared a workstation at their investigation office.","Cheryl เตรียม workstation ที่สำนักงานสืบสวนไว้แล้ว")],daniel:[
 line("Benedict","serious","We follow Daniel's destination. He chose Singapore before they chose his timeline.","เราตามจุดหมายของแดเนียล เขาเลือกสิงคโปร์ก่อนที่คนพวกนั้นจะเลือกลำดับเวลาให้เขา"),line("North","neutral","Apartment first. Whatever he expected to find may still be there.","ไปห้องพักก่อน สิ่งที่เขาคาดว่าจะพบอาจยังอยู่ที่นั่น")],operator:[
 line("Benedict","serious","We find who used 18-07. Systems do not walk into apartments.","เราหาคนที่ใช้ 18-07 ระบบเดินเข้าอพาร์ตเมนต์เองไม่ได้"),line("North","skeptical","Access first, accusation later.","ตรวจสิทธิ์ก่อน กล่าวหาทีหลัง")]}[approach];runDialogue([...branch,
 line("North","neutral","Flight departs at 12:05. Kittisak sent the formal request. Elena will keep tracing the Bangkok source while we're gone.","เที่ยวบินออก 12:05 น. Kittisak ส่งคำร้องอย่างเป็นทางการแล้ว ส่วน Elena จะตามต้นทางฝั่งกรุงเทพฯ ต่อระหว่างที่เราไม่อยู่"),
 line("Benedict","smirk","You booked it before asking me.","คุณจองก่อนถามผมอีกแล้ว"),
 line("North","dry","I asked the evidence. It was more decisive.","ฉันถามหลักฐานแล้ว มันตัดสินใจเก่งกว่าคุณ"),
 line("Benedict","smile","I should pack.","ผมควรไปเก็บของ"),
 line("North","dry","You should learn how.","คุณควรเรียนรู้วิธีเก็บด้วย")
 ],finishPhase)}
function finishPhase(){game.checkpoint="complete";setProgress(12);$("#ch3PhaseComplete").style.display="block";save(true)}
function addEvidence(key,description){if(game.evidence.some(e=>e.key===key))return;game.evidence.push({key,description});pageSound()}

function setProgress(value){const pct=Math.round(value/12*100);$("#ch3ProgressText").textContent=pct+"%";$("#ch3ProgressFill").style.width=pct+"%"}
function restoreCheckpoint(){localizeOffice();if(game.checkpoint==="complete"){$("#ch3PhaseComplete").style.display="block";setProgress(12)}else if(game.checkpoint==="choice"){$("#ch3Choice").classList.remove("hidden");setProgress(9)}else if(game.checkpoint==="post_puzzle"){game.puzzleComplete=true;closePuzzle(true);runPostPuzzle();}else if(game.checkpoint==="puzzle"){setProgress(6);openPuzzle()}else if(game.checkpoint==="puzzle_ready"){$("#ch3PuzzleButton").classList.add("show");setProgress(6)}else startOpening()}

function renderHistory(){const list=$("#ch3HistoryList");list.innerHTML=game.history.length?game.history.map(h=>'<div class="history-row"><b>'+h.speaker+'</b><div>'+h.text+'</div></div>').join(""):'<div class="history-row">'+t("noHistory")+'</div>'}
function renderCase(){const list=$("#ch3CaseList");const routeDesc={timeline:game.language==="th"?"audit trail ชี้ไปยัง delayed reconciliation queue ในสิงคโปร์":"The audit trail points to a delayed reconciliation queue in Singapore.",old_cases:game.language==="th"?"คดีเก่าของแดเนียลเชื่อม Hotel 1807 กับสัญญาบริการในสิงคโปร์":"Daniel's older cases connect Hotel 1807 to a Singapore service contract.",access:game.language==="th"?"Credential 18-07 ถูกออกใหม่โดยหน่วยลงนามที่ชี้ไปสิงคโปร์":"Credential 18-07 was reissued by a signing authority resolving to Singapore."}[game.route];let rows=game.route?[{key:"routeLead",description:routeDesc},...game.evidence]:game.evidence;list.innerHTML=rows.length?rows.map(e=>'<div class="case-row"><b>'+t(e.key)+'</b><div>'+e.description+'</div></div>').join(""):'<div class="case-row">'+t("noEvidence")+'</div>'}

function visibleCharacters(){return CHARACTER_ORDER.filter(name=>game.characters?.[name]!==false)}
function characterAvatar(name,detail=false){const data=CHARACTER_DATA[name];if(data?.portrait)return '<img src="'+data.portrait+'" alt="'+name+'">';return '<div class="'+(detail?'ch3-detail-avatar':'ch3-character-avatar')+'" aria-hidden="true">'+name.charAt(0)+'</div>'}
function renderCharacters(){const grid=$("#ch3CharacterGrid");const detail=$("#ch3CharacterDetail");const back=$("#ch3CharactersBack");if(!grid)return;detail.style.display="none";back.style.display="none";grid.style.display="";grid.innerHTML=visibleCharacters().map(name=>{const data=CHARACTER_DATA[name];return '<button class="character-card" data-character="'+name+'" type="button">'+characterAvatar(name)+'<div class="ch3-character-copy"><div class="ch3-character-name">'+name+'</div><div class="ch3-character-status">'+data.status[game.language]+'</div><div class="ch3-character-note">'+data.notes[game.language]+'</div></div></button>'}).join("");$$('[data-character]',grid).forEach(button=>button.onclick=()=>showCharacterDetail(button.dataset.character))}
function showCharacterDetail(name){click();const data=CHARACTER_DATA[name];const grid=$("#ch3CharacterGrid"),detail=$("#ch3CharacterDetail"),back=$("#ch3CharactersBack");grid.style.display="none";back.style.display="block";detail.style.display="block";let relationship="";const rel=game.relationships?.[name];if(rel){const metrics=[[game.language==="th"?"ความไว้วางใจ":"Trust",rel.trust],[game.language==="th"?"ความเคารพ":"Respect",rel.respect],[game.language==="th"?"ความผูกพัน":"Attachment",rel.attachment],[game.language==="th"?"ความระแวง":"Suspicion",rel.suspicion]];relationship='<div class="relation-metrics">'+metrics.map(([label,value])=>'<div class="relation-metric"><div class="relation-metric-head"><span>'+label+'</span><strong>'+Math.max(0,Math.min(100,Number(value)||0))+'</strong></div><div class="relation-bar"><div class="relation-fill" style="width:'+Math.max(0,Math.min(100,Number(value)||0))+'%"></div></div></div>').join("")+'</div>'}detail.innerHTML='<div class="character-detail-head">'+characterAvatar(name,true)+'<div><strong>'+name+'</strong><div class="ch3-character-status">'+data.status[game.language]+'</div></div></div><div class="character-notes">'+data.notes[game.language]+'</div>'+relationship}
function openCharacters(){renderCharacters();closeOverlays(false);$("#ch3CharactersModal").classList.add("open");applyOfficeMix("overlay",420)}

function applyLanguage(){document.documentElement.lang=game.language;if($("#ch3SoundToggle"))$("#ch3SoundToggle").checked=game.sound!==false;if($("#ch3MusicRange"))$("#ch3MusicRange").value=String(game.music);if($("#ch3SfxRange"))$("#ch3SfxRange").value=String(game.sfx);localStorage.setItem("last_witness_language",game.language);$$('[data-lang]').forEach(b=>b.classList.toggle('active',b.dataset.lang===game.language));$("#ch3RouteTitle").textContent=t("routeTitle");$("#ch3RouteText").textContent=t("routeText");const routeButtons=$$('.ch3-route-button');routeButtons[0].textContent=t("timeline");routeButtons[1].textContent=t("old_cases");routeButtons[2].textContent=t("access");localizeDay();localizeOffice();localizePuzzle();localizeMenu();if(game.dialogue)drawDialogue();renderPuzzle();const source=readChapter2();if(source&&$("#ch3SavedRoute")){const b=$("#ch3SavedRoute");b.textContent=t("savedRoute")+" · "+t(source.route)}if($("#ch3CharactersModal")?.classList.contains("open"))renderCharacters()}
function localizeDay(){$("#ch3DayEyebrow").textContent=t("dayEyebrow");$("#ch3DayTitle").textContent=t("day");$("#ch3DayLocation").textContent=t("dayLocation");$("#ch3DayText").textContent=t("dayText")}
function localizeOffice(){$("#ch3Location").textContent=t("location");$("#ch3Objective").innerHTML='<strong>'+(game.language==="th"?"เป้าหมาย":"Objective")+'</strong> · '+t("objective");$("#ch3SceneLabel").textContent=t("scene");$("#ch3PuzzleButton").textContent=t("puzzleButton");$("#ch3ChoiceTitle").textContent=t("choiceTitle");const a=$$('[data-approach]');a[0].textContent=t("system");a[1].textContent=t("daniel");a[2].textContent=t("operator");$("#ch3CompleteTitle").textContent=t("completeTitle");$("#ch3CompleteText").textContent=t("completeText");$("#ch3ContinuePhase2").textContent=t("continuePhase2");$("#ch3Phase2Title").textContent=t("phase2Title");$("#ch3Phase2Text").textContent=t("phase2Text");$("#ch3ReturnEntry").textContent=t("returnEntry")}
function localizePuzzle(){$("#ch3PuzzleEyebrow").textContent=t("puzzleEyebrow");$("#ch3PuzzleTitle").textContent=t("puzzleTitle");$("#ch3PuzzleHelp").textContent=t("puzzleHelp");$("#ch3AvailableTitle").textContent=t("available");$("#ch3SelectedTitle").textContent=t("selected");$("#ch3ConfirmPuzzle").textContent=t("confirm");$("#ch3ResetPuzzle").textContent=t("reset")}
function localizeMenu(){$("#ch3MenuTitle").textContent=t("menu");$("#ch3ResumeMenu").textContent=t("resume");$("#ch3SaveLabel").textContent=t("save");$("#ch3SaveSmall").textContent=t("saveSmall");$("#ch3LoadMenu").textContent=t("load");$("#ch3HistoryMenu").textContent=t("history");$("#ch3CaseMenu").textContent=t("caseFile");$("#ch3CharactersMenu").textContent=t("characters");$("#ch3SettingsMenu").textContent=t("settings");$("#ch3RestartMenu").textContent=t("restart");$("#ch3EntryMenu").textContent=t("returnEntry");$("#ch3HistoryTitle").textContent=t("history");$("#ch3CaseTitle").textContent=t("caseFile");$("#ch3CharactersTitle").textContent=t("characters");$("#ch3CharactersBack").textContent=t("back");$("#ch3SettingsTitle").textContent=t("settings");$("#ch3LanguageLabel").textContent=t("language");$("#ch3MasterSoundLabel").textContent=t("masterSound");$("#ch3MusicLabel").textContent=t("music");$("#ch3SfxLabel").textContent=t("sfx");$$('.ch3-close-modal').forEach(b=>b.textContent=t("close"))}

function bind(){const source=readChapter2();if(source){const b=$("#ch3SavedRoute");b.hidden=false;b.textContent=t("savedRoute")+" · "+t(source.route);b.onclick=()=>begin(source.route)}$$('.ch3-route-button').forEach(b=>b.onclick=()=>begin(b.dataset.route));$$('[data-lang]').forEach(b=>b.onclick=()=>{click();game.language=b.dataset.lang;applyLanguage()});$("#ch3PuzzleButton").onclick=openPuzzle;$("#ch3ConfirmPuzzle").onclick=confirmPuzzle;$("#ch3ResetPuzzle").onclick=resetPuzzle;$$('[data-approach]').forEach(b=>b.onclick=()=>chooseApproach(b.dataset.approach));$("#ch3ContinuePhase2").onclick=()=>{click();showScreen("chapter3Phase2Wip");save(true)};$("#ch3ReturnEntry").onclick=()=>{showScreen("chapter3Route");applyLanguage()};$("#ch3MenuButton").onclick=()=>{$("#drawer").classList.add("open");applyOfficeMix("overlay",420)};$("#ch3SaveButton").onclick=()=>save();$("#ch3ResumeMenu").onclick=closeOverlays;$("#ch3SaveMenu").onclick=()=>{save();closeOverlays()};$("#ch3LoadMenu").onclick=()=>{closeOverlays();load()};$("#ch3HistoryMenu").onclick=()=>{renderHistory();closeOverlays(false);$("#ch3HistoryModal").classList.add("open");applyOfficeMix("overlay",420)};$("#ch3CaseMenu").onclick=()=>{renderCase();closeOverlays(false);$("#ch3CaseModal").classList.add("open");applyOfficeMix("overlay",420)};$("#ch3CharactersMenu").onclick=openCharacters;$("#ch3CharactersBack").onclick=renderCharacters;$("#ch3SettingsMenu").onclick=()=>{closeOverlays(false);$("#ch3SettingsModal").classList.add("open");applyOfficeMix("overlay",420)};$("#ch3RestartMenu").onclick=()=>{closeOverlays();restart()};$("#ch3EntryMenu").onclick=()=>{closeOverlays();showScreen("chapter3Route")};$$('.ch3-close-modal').forEach(b=>b.onclick=closeOverlays);$("#ch3SoundToggle").checked=game.sound;$("#ch3SoundToggle").onchange=e=>{game.sound=Boolean(e.target.checked);if(game.sound&&$("#chapter3Office").classList.contains("active"))startOfficeAudio();else stopOfficeAudio();save(true)};$("#ch3MusicRange").value=String(game.music);$("#ch3SfxRange").value=String(game.sfx);$("#ch3MusicRange").oninput=e=>{game.music=Number(e.target.value);if($("#chapter3Office").classList.contains("active"))applyOfficeMix(preferredAudioMode(),280);save(true)};$("#ch3SfxRange").oninput=e=>{game.sfx=Number(e.target.value);save(true)};applyLanguage()}

if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",bind,{once:true});else bind();
})();
