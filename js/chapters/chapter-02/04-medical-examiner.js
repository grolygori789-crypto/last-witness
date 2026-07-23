/* LAST WITNESS — Chapter II / Medical Examiner 0.7.11
 * Persistent narrative-first lifecycle, consistent inspect/collect meaning,
 * reliable review gating and final continuity into Chapter III.
 */
(function(){
"use strict";
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const IDS=["postmortem","identity_tag","autopsy_report","toxicology_sample"];
const C={
 en:{location:"Bangkok City Medical Examiner",objective:"Examine what the body proves",remaining:n=>`${n} finding${n===1?"":"s"} remaining`,reviewObjective:"Reconcile the body with the altered timeline",scene:"THE BODY KEEPS ITS OWN TIME",review:"Review the Findings",evidenceInspection:"Evidence Inspection",caseEvidence:"Case Evidence",hint:"Tap evidence to inspect",inspect:"Inspect",collect:"Add to Case File",close:"Close",choiceTitle:"Where should the investigation go next?",choices:{timeline:"Follow the altered timeline.",old_cases:"Trace Daniel’s previous cases.",access:"Trace temporary profile 18-07."},completeTitle:"CHAPTER II COMPLETE",completeText:"The science is genuine. The timeline around it was engineered. Daniel was following the same pattern through older cases—and someone made sure he could not finish.",returnTitle:"Return to Title",unlocked:"Review unlocked",caseSection:"CHAPTER II · MEDICAL EXAMINER"},
 th:{location:"สถาบันนิติเวช กรุงเทพมหานคร",objective:"ตรวจสอบสิ่งที่ร่างกายพิสูจน์ได้",remaining:n=>`เหลือสิ่งที่ต้องตรวจอีก ${n} จุด`,reviewObjective:"เปรียบเทียบผลชันสูตรกับลำดับเวลาที่ถูกแก้ไข",scene:"ร่างกายมีเวลาของมันเอง",review:"ทบทวนผลการตรวจ",evidenceInspection:"ตรวจสอบหลักฐาน",caseEvidence:"หลักฐานในคดี",hint:"แตะหลักฐานเพื่อตรวจสอบ",inspect:"ตรวจสอบ",collect:"เพิ่มในแฟ้มคดี",close:"ปิด",choiceTitle:"การสืบสวนควรเดินต่อไปทางใด?",choices:{timeline:"ตามรอยลำดับเวลาที่ถูกแก้ไข",old_cases:"ตรวจสอบคดีเก่าที่แดเนียลกำลังติดตาม",access:"ตามรอยโปรไฟล์ชั่วคราว 18-07"},completeTitle:"จบบทที่ II",completeText:"ผลทางวิทยาศาสตร์เป็นของจริง แต่ลำดับเวลารอบมันถูกจัดวาง แดเนียลกำลังตามรอยรูปแบบเดียวกันในคดีเก่า และมีใครบางคนทำให้เขาไปต่อไม่ได้",returnTitle:"กลับหน้าหลัก",unlocked:"ปลดล็อกการทบทวนผลแล้ว",caseSection:"บทที่ II · สถาบันนิติเวช"}
};
const E={
 postmortem:{title:{en:"Postmortem Indicators",th:"ตัวบ่งชี้หลังการเสียชีวิต"},description:{en:"Body temperature, lividity and early rigor place Daniel’s death before the corrected digital collection time.",th:"อุณหภูมิร่างกาย การตกของเลือด และการแข็งตัวระยะแรกชี้ว่าแดเนียลเสียชีวิตก่อนเวลารวบรวมตัวอย่างที่ถูกแก้ในระบบ"},observation:{en:"The body cannot support 06:09 as the beginning of the evidence timeline. The biological window begins earlier.",th:"ร่างกายไม่สนับสนุนว่าเวลา 06:09 เป็นจุดเริ่มต้นของลำดับหลักฐาน ช่วงเวลาทางชีวภาพเริ่มก่อนหน้านั้น"},kind:"body"},
 identity_tag:{title:{en:"Identification and Intake Tag",th:"ป้ายระบุตัวและรับศพ"},description:{en:"Daniel’s intake tag records the official discovery at 06:20. The tag was created after the laboratory accession at 06:17.",th:"ป้ายรับศพระบุเวลาพบแดเนียลอย่างเป็นทางการที่ 06:20 ซึ่งเกิดหลังการรับตัวอย่างเข้าห้องปฏิบัติการเวลา 06:17"},observation:{en:"The physical intake sequence confirms the contradiction: the sample entered the system before the case officially existed.",th:"ลำดับการรับศพยืนยันความขัดแย้ง ตัวอย่างเข้าสู่ระบบก่อนที่คดีจะเริ่มต้นอย่างเป็นทางการ"},kind:"tag"},
 autopsy_report:{title:{en:"Preliminary Autopsy Report",th:"รายงานชันสูตรเบื้องต้น"},description:{en:"The preliminary findings narrow the death window without relying on the altered database fields.",th:"ผลชันสูตรเบื้องต้นจำกัดช่วงเวลาตายได้โดยไม่อาศัยช่องข้อมูลในฐานข้อมูลที่ถูกแก้ไข"},observation:{en:"The eleven-minute correction did not change the body. It changed how the body’s evidence appeared to enter custody.",th:"การแก้เวลาสิบเอ็ดนาทีไม่ได้เปลี่ยนสิ่งที่เกิดกับร่างกาย แต่เปลี่ยนภาพว่าหลักฐานจากร่างกายเข้าสู่การครอบครองเมื่อใด"},kind:"report"},
 toxicology_sample:{title:{en:"Toxicology Reference Sample",th:"ตัวอย่างอ้างอิงทางพิษวิทยา"},description:{en:"The reference vial is sealed and its raw analytical hash matches the Forensic Science Unit result.",th:"หลอดตัวอย่างอ้างอิงยังปิดผนึก และค่าแฮชผลวิเคราะห์ดิบตรงกับผลจากหน่วยนิติวิทยาศาสตร์"},observation:{en:"The toxicology result is authentic. The manipulation targeted chronology, not the scientific measurement.",th:"ผลพิษวิทยาเป็นของจริง การบิดเบือนมุ่งไปที่ลำดับเวลา ไม่ใช่ค่าที่เครื่องมือวัดได้"},kind:"sample"}
};
const local={started:false,introComplete:false,inspected:new Set(),collected:new Set(),active:null,dialogue:null,choice:null};
const lang=()=>window.state&&state.language==="th"?"th":(document.documentElement.lang==="th"?"th":"en");
const t=()=>C[lang()];
const l=v=>v[lang()]||v.en;
function lifecycle(){return window.LastWitnessInvestigationLifecycle;}
function play(sel,vol=.5){const a=$(sel);if(!a)return;try{a.pause();a.currentTime=0;a.volume=vol;a.play().catch(()=>{});}catch(_){}}
function stopMedicalAudio(){["#medicalRefrigeratorAudio","#medicalMachineAudio"].forEach(s=>{const a=$(s);if(a)a.pause();});}
function startMedicalAudio(){window.LastWitnessProductionAudio?.refresh?.();}
function portraitSrc(speaker,emotion){
 if(speaker==="Ratchata")return `assets/images/ratchata/${emotion||"neutral"}.png`;
 try{return typeof portrait==="function"?portrait(speaker,emotion||"neutral"):"";}catch(_){return"";}
}
function ensureRatchataUnlockedAtIntroduction(){
 if(!window.state)return false;
 state.medical=state.medical||{};state.flags=state.flags||{};state.characters=state.characters||{};
 const first=state.medical.ratchataJournalUnlocked!==true;
 state.medical.ratchataMet=true;state.medical.ratchataJournalUnlocked=true;state.flags.journal_story_ratchata_unlocked=true;state.characters.Ratchata=true;
 const registry=window.LastWitnessContentRegistry;if(registry?.unlockCharacter)registry.unlockCharacter("ratchata",{unread:first,source:"story"});
 try{window.LastWitnessStoryCharacterGates?.reconcile?.();}catch(_){}
 if(first)try{if(typeof autoSave==="function")autoSave();}catch(_){}
 return first;
}
function renderDialogue(){
 const d=local.dialogue,box=$("#medicalDialogue");if(!d||!box)return;
 const line=d.lines[d.index],right=line.speaker==="North"||line.speaker==="Elena";
 if(line.speaker==="Ratchata")ensureRatchataUnlockedAtIntroduction();
 const src=portraitSrc(line.speaker,line.emotion);
 box.className=`dialogue${right?" right":""}`;
 box.innerHTML=`<div class="portrait-wrap">${src?`<img class="portrait portrait-${line.speaker}" src="${src}" alt="" onerror="this.onerror=null;this.src='assets/images/ratchata/neutral.png'">`:""}</div><div class="dialogue-copy"><div class="speaker">${line.speaker}</div><div class="line">${l(line.text)}</div></div><div class="next">${lang()==="th"?"แตะเพื่อดำเนินต่อ":"TAP TO CONTINUE"}</div>`;
}
function dialogue(lines,done){
 const box=$("#medicalDialogue");if(!box){done?.();return;}
 local.dialogue={lines,index:0,done};box.classList.remove("hidden");renderDialogue();updateReview();
 box.onclick=()=>{
  if(!local.dialogue)return;
  local.dialogue.index++;
  if(local.dialogue.index>=local.dialogue.lines.length){
   const fn=local.dialogue.done;local.dialogue=null;box.classList.add("hidden");box.onclick=null;fn?.();updateReview();
   try{if(typeof autoSave==="function")autoSave();}catch(_){}
  }else renderDialogue();
 };
}
function completeMedicalIntro(){
 local.introComplete=true;local.started=true;
 if(window.state){state.medical=state.medical||{};state.medical.introComplete=true;state.medical.started=true;state.medical.lifecycleVersion=1;state.checkpoint="ch2_medical_investigation";}
 lifecycle()?.completeIntro?.("medical2");updateObjective();
 try{if(typeof autoSave==="function")autoSave();}catch(_){}
}
function intro(){
 dialogue([
  {speaker:"Benedict",emotion:"neutral",text:{en:"Please tell me the body kept better records than the database.",th:"ช่วยบอกทีว่าร่างกายเก็บบันทึกได้ดีกว่าฐานข้อมูล"}},
  {speaker:"Ratchata",emotion:"dry_amused",text:{en:"It did. The body did not have administrator access.",th:"ดีกว่าครับ ร่างกายไม่มีสิทธิ์ผู้ดูแลระบบ"}},
  {speaker:"North",emotion:"focused",text:{en:"Dr. Singh?",th:"ดร. ซิงห์?"}},
  {speaker:"Ratchata",emotion:"warm_smile",text:{en:"Ratchata Singh. Senior medical examiner. The skeleton cats are not part of the accreditation.",th:"รัชตะ ซิงห์ครับ แพทย์นิติเวชอาวุโส ส่วนแมวโครงกระดูกไม่ได้อยู่ในใบรับรองวิชาชีพ"}}
 ],()=>{
  ensureRatchataUnlockedAtIntroduction();
  dialogue([
   {speaker:"Elena",emotion:"neutral",text:{en:"We need an independent death window and confirmation that the reference sample is intact.",th:"เราต้องการช่วงเวลาตายที่เป็นอิสระจากระบบ และยืนยันว่าตัวอย่างอ้างอิงยังสมบูรณ์"}},
   {speaker:"Ratchata",emotion:"serious",text:{en:"Then we begin with what the body can prove. Not what anyone wants it to prove.",th:"งั้นเริ่มจากสิ่งที่ร่างกายพิสูจน์ได้ ไม่ใช่สิ่งที่ใครอยากให้มันพิสูจน์"}}
  ],completeMedicalIntro);
 });
}
function evidenceMarkup(kind){
 if(kind==="body")return `<div class="medical-body-card"><div class="medical-body-silhouette"></div><b>Daniel Voss</b><br>Biological window independent of database timestamps.</div>`;
 if(kind==="tag")return `<article class="medical-tag-card"><strong>BANGKOK CITY MEDICAL EXAMINER</strong><dl><dt>DECEDENT</dt><dd>DANIEL VOSS</dd><dt>DISCOVERED</dt><dd>06:20</dd><dt>LAB ACCESSION</dt><dd>06:17</dd></dl></article>`;
 if(kind==="report")return `<article class="medical-report-card"><strong>PRELIMINARY AUTOPSY REPORT</strong><p>Independent biological death-window assessment</p><p>Corrected database fields excluded from estimate</p></article>`;
 return `<div class="medical-sample-card"><div class="medical-vial"></div><strong>DV-1807-TX-04</strong><small>REFERENCE SAMPLE · SEALED</small></div>`;
}
function syncState(){
 if(!window.state)return;
 state.medical=state.medical||{};state.medical.started=true;state.medical.introComplete=local.introComplete;state.medical.lifecycleVersion=1;
 state.medical.inspected=[...local.inspected];state.medical.found=[...local.inspected];state.medical.collected=[...local.collected];state.medical.choice=local.choice;
}
function paintHotspots(){
 $$('[data-medical-clue]').forEach(node=>node.classList.toggle("found",local.collected.has(node.dataset.medicalClue)));
}
function openEvidence(id){
 const e=E[id],panel=$("#medicalEvidencePanel");if(!e||!panel)return;
 local.active=id;$("#medicalEvidenceTitle").textContent=l(e.title);$("#medicalEvidenceDescription").textContent=l(e.description);$("#medicalEvidenceObservation").textContent=l(e.observation);$("#medicalEvidenceObservation").style.display="none";$("#medicalEvidenceObject").innerHTML=evidenceMarkup(e.kind);
 $("#inspectMedicalEvidence").style.display="";$("#collectMedicalEvidence").style.display="none";$("#closeMedicalEvidence").style.display="none";
 panel.classList.add("open");panel.setAttribute("aria-hidden","false");if(id==="toxicology_sample")play("#medicalBarcodeAudio",.3);updateReview();
}
function inspect(){
 const id=local.active;if(!id)return;
 local.inspected.add(id);syncState();paintHotspots();
 $("#medicalEvidenceObject").classList.add("inspecting");$("#medicalEvidenceObservation").style.display="";$("#inspectMedicalEvidence").style.display="none";$("#collectMedicalEvidence").style.display=local.collected.has(id)?"none":"";$("#closeMedicalEvidence").style.display="";
 updateProgress();try{if(typeof autoSave==="function")autoSave();}catch(_){}
}
function closeEvidence(){
 const panel=$("#medicalEvidencePanel");if(!panel)return;
 panel.classList.remove("open");panel.setAttribute("aria-hidden","true");$("#medicalEvidenceObject").classList.remove("inspecting");local.active=null;updateReview();
}
function collect(){
 const id=local.active;if(!id||!local.inspected.has(id))return;
 const wasNew=!local.collected.has(id);local.collected.add(id);syncState();paintHotspots();
 if(window.state&&state.found&&typeof state.found.add==="function")state.found.add(`medical_${id}`);
 closeEvidence();updateProgress();
 if(wasNew&&local.collected.size===4)try{if(typeof showBadge==="function")showBadge(t().unlocked);}catch(_){}
 lifecycle()?.evidenceChanged?.("medical2");try{if(typeof autoSave==="function")autoSave();}catch(_){}
}
function updateObjective(){
 const o=$("#medicalObjective");if(!o)return;
 const n=4-local.collected.size;o.innerHTML=n>0?`<span>${t().objective}</span><small>${t().remaining(n)}</small>`:t().reviewObjective;
}
function updateProgress(){
 const milestones=local.collected.size+(local.choice?2:0);const pct=Math.min(100,88+Math.round(12*milestones/6));
 if($("#medicalProgressText"))$("#medicalProgressText").textContent=`${pct}%`;if($("#medicalProgressFill"))$("#medicalProgressFill").style.width=`${pct}%`;
 if(window.state)state.progress=Math.max(Number(state.progress)||0,pct);updateObjective();updateReview();
}
function updateReview(){
 const b=$("#reviewMedical");if(!b)return;
 const ready=local.collected.size===4&&!local.dialogue&&!$("#medicalEvidencePanel")?.classList.contains("open")&&!local.choice;
 b.classList.toggle("show",ready);b.disabled=!ready;
}
function review(){
 if(local.collected.size<4)return;
 dialogue([
  {speaker:"Ratchata",emotion:"analytical",text:{en:"The body places death before the corrected collection time. The intake tag places official discovery at 06:20.",th:"ร่างกายชี้ว่าเสียชีวิตก่อนเวลารวบรวมตัวอย่างที่ถูกแก้ ส่วนป้ายรับศพระบุเวลาพบอย่างเป็นทางการที่ 06:20"}},
  {speaker:"North",emotion:"focused",text:{en:"And the laboratory accepted the sample at 06:17. Three minutes before the case officially existed.",th:"แต่ห้องปฏิบัติการรับตัวอย่างเวลา 06:17 ก่อนที่คดีจะเริ่มอย่างเป็นทางการสามนาที"}},
  {speaker:"Elena",emotion:"thoughtful",text:{en:"The raw result is still genuine. Whoever altered the chronology wanted valid science attached to a false sequence.",th:"ผลดิบยังเป็นของจริง คนที่แก้ลำดับเวลาต้องการให้วิทยาศาสตร์ที่ถูกต้องไปรับรองเหตุการณ์ที่ไม่จริง"}},
  {speaker:"Benedict",emotion:"serious",text:{en:"So the lie was not inside the test. It was built around it.",th:"งั้นเรื่องโกหกไม่ได้อยู่ในผลตรวจ แต่มันถูกสร้างครอบผลตรวจไว้"}},
  {speaker:"Ratchata",emotion:"solemn",text:{en:"The body proves the corrected chronology cannot be natural. It cannot tell you who arranged it, or why Daniel was targeted.",th:"ร่างกายพิสูจน์ได้ว่าลำดับเวลาที่ถูกแก้ไม่อาจเกิดขึ้นตามธรรมชาติ แต่มันบอกไม่ได้ว่าใครเป็นคนจัดวาง หรือเหตุใดแดเนียลจึงตกเป็นเป้าหมาย"}},
  {speaker:"Benedict",emotion:"serious",text:{en:"That part belongs to the living.",th:"ส่วนนั้นเป็นหน้าที่ของคนเป็น"}}
 ],()=>$("#medicalChoice").classList.remove("hidden"));
}
function choose(path){
 local.choice=path;syncState();
 if(window.state){state.flags=state.flags||{};["timeline","old_cases","access"].forEach(routeId=>delete state.flags[`chapter3_${routeId}`]);state.flags[`chapter3_${path}`]=true;}
 $("#medicalChoice").classList.add("hidden");updateProgress();
 const branch={
  timeline:{en:"I’ll start with the altered timestamps. Whoever moved them left a route.",th:"ฉันจะเริ่มจากเวลาที่ถูกแก้ คนที่ขยับมันต้องทิ้งเส้นทางไว้"},
  old_cases:{en:"I’ll pull every archived case Daniel marked. Patterns survive longer than witnesses.",th:"ฉันจะดึงคดีเก่าทุกคดีที่แดเนียลทำเครื่องหมายไว้ รูปแบบอยู่ได้นานกว่าพยาน"},
  access:{en:"I’ll trace who could issue profile 18-07, what permission it carried and where it was used.",th:"ฉันจะตามว่าใครออกโปรไฟล์ 18-07 ได้ มันพกสิทธิ์อะไร และถูกใช้ที่ไหนบ้าง"}
 }[path];
 dialogue([
  {speaker:"North",emotion:"neutral",text:branch},
  {speaker:"Benedict",emotion:"serious",text:{en:"Different door. Same house.",th:"คนละประตู แต่ยังเป็นบ้านหลังเดียวกัน"}},
  {speaker:"Ratchata",emotion:"dry_amused",text:{en:"Try not to bring the house back here. My refrigerator is full.",th:"อย่าเอาทั้งบ้านกลับมาที่นี่นะครับ ตู้เย็นผมเต็มแล้ว"}}
 ],finish);
}
function finish(){
 if(window.state){state.medical=state.medical||{};state.medical.complete=true;state.screen="chapter2Complete";state.progress=100;}
 updateProgress();stopMedicalAudio();play("#chapterAudio",.65);try{if(typeof autoSave==="function")autoSave();}catch(_){}
 if(window.LastWitnessChapter2Integration?.showChapter2Complete)window.LastWitnessChapter2Integration.showChapter2Complete();else{$$(".screen").forEach(s=>s.classList.remove("active"));$("#chapter2Complete")?.classList.add("active");}
}
function returnTitle(){
 if(window.LastWitnessChapter2Integration?.returnToTitle){window.LastWitnessChapter2Integration.returnToTitle();return;}
 stopMedicalAudio();try{if(typeof autoSave==="function")autoSave();}catch(_){}if(typeof showScreen==="function")showScreen("title");
}
function resetFreshState(){
 local.started=false;local.introComplete=false;local.inspected=new Set();local.collected=new Set();local.active=null;local.dialogue=null;local.choice=null;
 const panel=$("#medicalEvidencePanel");if(panel){panel.classList.remove("open");panel.setAttribute("aria-hidden","true");}
 $("#medicalEvidenceObject")?.classList.remove("inspecting");$("#medicalEvidenceMeta")?.classList.remove("show");const observation=$("#medicalEvidenceObservation");if(observation)observation.style.display="none";
 const inspectButton=$("#inspectMedicalEvidence"),collectButton=$("#collectMedicalEvidence"),closeButton=$("#closeMedicalEvidence");if(inspectButton)inspectButton.style.display="";if(collectButton)collectButton.style.display="none";if(closeButton)closeButton.style.display="none";
 $$('[data-medical-clue]').forEach(node=>node.classList.remove("found"));$("#reviewMedical")?.classList.remove("show");lifecycle()?.reset?.("medical2");
}
function migrateLegacyState(){
 if(!window.state||!state.medical||Number(state.medical.lifecycleVersion)>=1)return;
 const inspected=new Set(state.medical.inspected||state.medical.found||[]),collected=new Set(state.medical.collected||[]);
 inspected.forEach(id=>collected.add(id));state.medical.collected=[...collected];state.medical.lifecycleVersion=1;
 if(inspected.size||collected.size||state.medical.choice||state.medical.complete)state.medical.introComplete=true;
 collected.forEach(id=>{try{state.found?.add?.(`medical_${id}`);}catch(_){}});
}
function restore(){
 $$('[data-medical-clue]').forEach(node=>node.classList.remove("found"));migrateLegacyState();
 if(window.state&&state.medical){
  local.inspected=new Set(state.medical.inspected||state.medical.found||[]);local.collected=new Set(state.medical.collected||[]);local.choice=state.medical.choice||null;
  local.introComplete=Boolean(state.medical.introComplete||local.inspected.size||local.collected.size||local.choice||state.medical.complete);local.started=local.introComplete||Boolean(local.choice);
  if(local.introComplete){state.medical.introComplete=true;state.medical.started=true;}
 }else{local.inspected=new Set();local.collected=new Set();local.choice=null;local.introComplete=false;local.started=false;}
 paintHotspots();if(state?.medical?.ratchataMet)addRatchataJournal();if(state?.medical?.complete)setTimeout(()=>window.LastWitnessChapter2Integration?.showChapter2Complete?.(),0);
 syncState();updateProgress();lifecycle()?.prepare?.("medical2");
}
function show(){
 $$(".screen").forEach(s=>s.classList.remove("active"));$("#medical2")?.classList.add("active");
 if(window.state){state.screen="medical2";state.medical=state.medical||{started:true,introComplete:false,lifecycleVersion:1,inspected:[],found:[],collected:[]};}
 play("#medicalDoorAudio",.42);startMedicalAudio();restore();updateUI();
 if(!local.started&&!local.choice&&!local.introComplete){local.started=true;if(window.state){state.medical.started=true;state.medical.introComplete=false;}setTimeout(intro,260);}
 try{if(typeof autoSave==="function")autoSave();}catch(_){}
}
function addRatchataJournal(){ensureRatchataUnlockedAtIntroduction();}
function appendCase(){
 const list=$("#caseList");if(!list||!window.state||!state.medical?.collected?.length)return;
 $('[data-medical-case-section]',list)?.remove();$$('[data-medical-case-entry]',list).forEach(n=>n.remove());const h=document.createElement("div");h.className="case-section-title";h.dataset.medicalCaseSection="1";h.textContent=t().caseSection;list.appendChild(h);
 state.medical.collected.forEach(id=>{const e=E[id];if(!e)return;const row=document.createElement("div");row.className="case-row";row.dataset.medicalCaseEntry=id;row.innerHTML=`<b>${l(e.title)}</b><div>${l(e.description)}</div>`;list.appendChild(row);});
}
function updateUI(){
 if($("#medicalLocation"))$("#medicalLocation").textContent=t().location;if($("#medicalSceneLabel"))$("#medicalSceneLabel").textContent=t().scene;if($("#reviewMedical"))$("#reviewMedical").textContent=t().review;if($("#medicalChoiceTitle"))$("#medicalChoiceTitle").textContent=t().choiceTitle;
 $$('[data-medical-choice]').forEach(b=>b.textContent=t().choices[b.dataset.medicalChoice]);if($("#medicalEvidenceKicker"))$("#medicalEvidenceKicker").textContent=t().evidenceInspection;if($("#medicalEvidenceStamp"))$("#medicalEvidenceStamp").textContent=t().caseEvidence;if($("#medicalEvidenceHint"))$("#medicalEvidenceHint").textContent=t().hint;
 if($("#inspectMedicalEvidence"))$("#inspectMedicalEvidence").textContent=t().inspect;if($("#collectMedicalEvidence"))$("#collectMedicalEvidence").textContent=t().collect;if($("#closeMedicalEvidence"))$("#closeMedicalEvidence").textContent=t().close;
 if($("#chapter2CompleteTitle"))$("#chapter2CompleteTitle").textContent=t().completeTitle;if($("#chapter2CompleteText"))$("#chapter2CompleteText").textContent=t().completeText;if($("#chapter2ReturnTitle"))$("#chapter2ReturnTitle").textContent=t().returnTitle;
 if(local.active){const e=E[local.active];$("#medicalEvidenceTitle").textContent=l(e.title);$("#medicalEvidenceDescription").textContent=l(e.description);$("#medicalEvidenceObservation").textContent=l(e.observation);}
 if(local.dialogue)renderDialogue();updateObjective();if($("#caseModal")?.classList.contains("open"))appendCase();
}
function bind(){
 $$('[data-medical-clue]').forEach(b=>b.addEventListener("click",()=>openEvidence(b.dataset.medicalClue)));$("#inspectMedicalEvidence")?.addEventListener("click",inspect);$("#medicalEvidenceObject")?.addEventListener("click",inspect);$("#collectMedicalEvidence")?.addEventListener("click",collect);$("#closeMedicalEvidence")?.addEventListener("click",closeEvidence);$("#reviewMedical")?.addEventListener("click",review);
 $$('[data-medical-choice]').forEach(b=>b.addEventListener("click",()=>choose(b.dataset.medicalChoice)));$("#chapter2ReturnTitle")?.addEventListener("click",returnTitle);$("#caseButton")?.addEventListener("click",()=>setTimeout(appendCase,0),true);document.addEventListener("click",e=>{if(e.target.closest?.("[data-lang]"))setTimeout(updateUI,0);},true);
 const devGrid=$("#developerModal .dev-grid");if(devGrid&&!$('[data-dev-jump="medical2"]')){const b=document.createElement("button");b.className="dev-button";b.dataset.devJump="medical2";b.textContent="Medical Examiner";b.onclick=()=>{$("#developerModal")?.classList.remove("open");show();};devGrid.appendChild(b);}
 window.LastWitnessMedicalExaminer={
  start:show,
  startFresh:()=>{
   if(window.state){state.medical={started:true,introComplete:false,lifecycleVersion:1,inspected:[],found:[],collected:[],active:null,choice:null,complete:false,ratchataMet:false,ratchataJournalUnlocked:false,sceneCompleteFeedback0711:false};IDS.forEach(id=>{try{state.found?.delete?.(`medical_${id}`);}catch(_){}});}
   resetFreshState();show();
  },
  resetFreshState,updateLanguage:updateUI,version:"0.7.11"
 };
 updateUI();
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",bind,{once:true});else bind();
})();
