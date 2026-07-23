/* LAST WITNESS — Chapter II / Forensic Science 0.7.11
 * Preserves the established evidence UI while adding persistent,
 * narrative-first investigation lifecycle state.
 */
(function(){
"use strict";
const $=(selector,root=document)=>root.querySelector(selector);
const $$=(selector,root=document)=>Array.from(root.querySelectorAll(selector));
const PHASE_ID="forensic2";
const EVIDENCE_IDS=["sealed_sample","accession_record","audit_trace","batch_record"];
const COPY={
 en:{location:"Bangkok City Police Department • Forensic Science Unit",objective:"Trace the original laboratory record",remaining:n=>`${n} record${n===1?"":"s"} remaining`,compareObjective:"Compare the laboratory records",sceneLabel:"CHAIN OF CUSTODY",compare:"Compare Records",choiceTitle:"What does the contradiction prove?",choices:{identity:"A valid credential proves access—not identity.",custody:"The physical sample and the digital timeline were handled separately.",route:"The record was deliberately altered through an authorized access path."},inspect:"Inspect",collect:"Add to Case File",close:"Close",evidenceInspection:"Evidence Inspection",caseEvidence:"Case Evidence",tapEvidence:"Tap evidence to inspect",tapContinue:"Tap to continue",needAll:"Inspect all four records first.",added:"Evidence added",compareUnlocked:"Record comparison unlocked",wipTitle:"WORK IN PROGRESS",wipText:"The Medical Examiner phase is currently in development. Your progress has been saved.",returnTitle:"Return to Title",caseSection:"CHAPTER II · FORENSIC SCIENCE",zoomOut:"Zoom out",resetView:"Reset view",zoomIn:"Zoom in"},
 th:{location:"กองบัญชาการตำรวจนครบาล • หน่วยนิติวิทยาศาสตร์",objective:"ตรวจสอบต้นทางของบันทึกห้องปฏิบัติการ",remaining:n=>`เหลือบันทึกที่ต้องตรวจอีก ${n} ชิ้น`,compareObjective:"เปรียบเทียบบันทึกจากห้องปฏิบัติการ",sceneLabel:"ห่วงโซ่การครอบครองหลักฐาน",compare:"เปรียบเทียบบันทึก",choiceTitle:"ความขัดแย้งนี้พิสูจน์อะไรได้แน่?",choices:{identity:"สิทธิ์ที่ถูกต้องยืนยันเพียงการเข้าถึง ไม่ได้ยืนยันตัวบุคคล",custody:"ตัวอย่างจริงกับลำดับเวลาในระบบถูกจัดการแยกจากกัน",route:"บันทึกถูกแก้ไขโดยผ่านช่องทางที่ระบบยอมรับสิทธิ์"},inspect:"ตรวจสอบ",collect:"เพิ่มในแฟ้มคดี",close:"ปิด",evidenceInspection:"ตรวจสอบหลักฐาน",caseEvidence:"หลักฐานในคดี",tapEvidence:"แตะหลักฐานเพื่อตรวจสอบ",tapContinue:"แตะเพื่อดำเนินต่อ",needAll:"ต้องตรวจสอบบันทึกให้ครบทั้งสี่ชิ้นก่อน",added:"เพิ่มหลักฐานแล้ว",compareUnlocked:"ปลดล็อกการเปรียบเทียบบันทึกแล้ว",wipTitle:"อยู่ระหว่างการพัฒนา",wipText:"เนื้อหาช่วงแผนกนิติเวชกำลังอยู่ในขั้นตอนการพัฒนา ความคืบหน้าของคุณถูกบันทึกแล้ว",returnTitle:"กลับหน้าหลัก",caseSection:"บทที่ II · หน่วยนิติวิทยาศาสตร์",zoomOut:"ย่อ",resetView:"คืนขนาด",zoomIn:"ขยาย"}
};
const EVIDENCE={
 sealed_sample:{title:{en:"Sealed Toxicology Sample",th:"ตัวอย่างพิษวิทยาที่ปิดผนึก"},description:{en:"Sample DV-1807-TX-04 remains physically sealed. Its label and accession number match the original laboratory intake.",th:"ตัวอย่าง DV-1807-TX-04 ยังปิดผนึกสมบูรณ์ หมายเลขบนฉลากตรงกับบันทึกรับตัวอย่างฉบับต้นทาง"},observation:{en:"No visible break appears in the physical chain of custody. The alteration occurred in a different layer of the record.",th:"ไม่พบร่องรอยการขาดช่วงในห่วงโซ่การครอบครองตัวอย่างจริง การแก้ไขจึงเกิดขึ้นในข้อมูลอีกชั้นหนึ่ง"},kind:"vial"},
 accession_record:{title:{en:"Laboratory Accession Record",th:"บันทึกรับตัวอย่างของห้องปฏิบัติการ"},description:{en:"The source record logs accession DV-1807-TX-04 at 06:17—three minutes before Daniel was officially discovered at 06:20. The entry was never regenerated.",th:"บันทึกต้นทางระบุว่ารับตัวอย่าง DV-1807-TX-04 เวลา 06:17 ก่อนเวลาพบแดเนียลอย่างเป็นทางการเมื่อ 06:20 อยู่สามนาที และรายการนี้ไม่เคยถูกสร้างขึ้นใหม่"},observation:{en:"The impossible timestamp exists in the laboratory source record, not only in the police export.",th:"เวลาที่เป็นไปไม่ได้ปรากฏอยู่ในข้อมูลต้นทางของห้องปฏิบัติการ ไม่ได้เกิดขึ้นเฉพาะในสำเนาที่ส่งให้ตำรวจ"},kind:"document"},
 audit_trace:{title:{en:"Workstation Audit Trace",th:"บันทึกตรวจสอบเครื่องเวิร์กสเตชัน"},description:{en:"Accepted Evidence Division permission changed COLLECTION_TIME from 05:58 to 06:09—an eleven-minute shift. The event resolves to temporary profile 18-07 and claims workstation FS-12 while its local session was offline.",th:"สิทธิ์ฝ่ายพยานหลักฐานที่ระบบยอมรับเปลี่ยน COLLECTION_TIME จาก 05:58 เป็น 06:09 ซึ่งต่างกันสิบเอ็ดนาที เหตุการณ์เชื่อมกับโปรไฟล์ชั่วคราว 18-07 และอ้างว่ามาจากเครื่อง FS-12 ทั้งที่เซสชันภายในเครื่องออฟไลน์อยู่"},observation:{en:"The system proves that accepted permission was used. It does not establish the operator or where the command originated.",th:"ระบบยืนยันได้ว่ามีการใช้สิทธิ์ที่ระบบยอมรับ แต่ยังยืนยันไม่ได้ว่าใครเป็นผู้ใช้ หรือคำสั่งถูกส่งมาจากที่ใด"},kind:"terminal"},
 batch_record:{title:{en:"Instrument Batch Record",th:"บันทึกรอบการทำงานของเครื่องวิเคราะห์"},description:{en:"Analyzer TX-3 processed the sealed sample in Batch 0614-B. The raw-result hash and instrument time remain unchanged.",th:"เครื่องวิเคราะห์ TX-3 ประมวลผลตัวอย่างที่ปิดผนึกในรอบ 0614-B ค่าแฮชของผลดิบและเวลาจากเครื่องไม่เคยถูกแก้ไข"},observation:{en:"The scientific result and the administrative timeline are separate layers. One can remain authentic while the other is manipulated.",th:"ผลทางวิทยาศาสตร์กับลำดับเวลาทางธุรการเป็นข้อมูลคนละชั้น ชั้นหนึ่งอาจยังเป็นของจริง ขณะที่อีกชั้นถูกบิดเบือน"},kind:"batch"}
};
const local={started:false,introComplete:false,found:new Set(),collected:new Set(),active:null,inspected:false,choice:null,compared:false,dialogue:null};
function lifecycle(){return window.LastWitnessInvestigationLifecycle;}
function language(){if(window.state&&state.language==="th")return"th";return document.documentElement.lang==="th"?"th":"en";}
function text(){return COPY[language()];}
function localized(value){return value[language()]||value.en;}
function safePlay(selector,volume){const audio=$(selector);if(!audio)return;try{audio.pause();audio.currentTime=0;if(typeof volume==="number")audio.volume=volume;audio.play().catch(()=>{});}catch(_){}}
function stopHum(){const audio=$("#forensicHumAudio");if(audio)audio.pause();}
function normalizeMarkup(){
 const panel=$("#forensicEvidencePanel");
 if(panel){panel.innerHTML=`<div class="evidence-card"><div class="eyebrow" id="forensicEvidenceKicker"></div><h3 id="forensicEvidenceTitle"></h3><div class="evidence-stage"><div class="evidence-stamp" id="forensicEvidenceStamp"></div><div id="forensicEvidenceObject" class="evidence-object"></div><div id="forensicEvidenceHint" class="evidence-zoom-hint"></div></div><div id="forensicEvidenceMeta" class="evidence-meta"><p id="forensicEvidenceDescription"></p><div id="forensicEvidenceObservation" class="evidence-observation"></div></div><div class="evidence-actions"><button id="inspectForensicEvidence" class="ghost" type="button"></button><button id="collectForensicEvidence" class="primary" type="button"></button><button id="closeForensicEvidence" class="ghost evidence-collect-only" type="button"></button></div></div>`;}
 const oldAccuse=$('[data-forensic-choice="accuse"]');if(oldAccuse)oldAccuse.dataset.forensicChoice="route";
 const complete=$("#forensicPhaseComplete");
 if(complete){complete.innerHTML=`<div class="eyebrow">LAST WITNESS</div><h2 id="forensicCompleteTitle"></h2><p id="forensicCompleteText"></p><button id="continueMedicalExaminer" class="primary" type="button"></button>`;}
 $("#reviewForensic")?.classList.remove("show");
 $("#reviewForensic")?.setAttribute("hidden","");
}
function evidenceMarkup(kind){
 if(kind==="vial")return `<div class="forensic-vial-document"><div class="forensic-vial-cap"></div><div class="forensic-vial-body"><div class="forensic-vial-label"><strong>BANGKOK CITY FORENSIC SCIENCE UNIT</strong><span>SAMPLE: DV-1807-TX-04</span><span>TYPE: TOXICOLOGY</span><span>STATUS: SEALED</span><span>ACCESSION: 06:17</span></div><div class="forensic-seal">EVIDENCE SEAL INTACT</div></div></div>`;
 if(kind==="document")return `<article class="forensic-document forensic-full-record"><header><strong>BANGKOK CITY</strong><strong>FORENSIC SCIENCE UNIT</strong><small>LABORATORY ACCESSION RECORD</small></header><dl><dt>CASE</dt><dd>DANIEL VOSS</dd><dt>ACCESSION</dt><dd>DV-1807-TX-04</dd><dt>SAMPLE TYPE</dt><dd>TOXICOLOGY</dd><dt>RECEIVED</dt><dd>06:17</dd><dt>STATUS</dt><dd>SEALED / ACCEPTED</dd><dt>SOURCE EVENT</dt><dd>INTAKE_CREATED</dd><dt>REGENERATED</dt><dd>NO</dd></dl><div class="forensic-record-alert">OFFICIAL DISCOVERY RECORD: 06:20</div><footer>CHAIN OF CUSTODY VERIFIED · SOURCE RECORD</footer></article>`;
 if(kind==="terminal")return `<article class="forensic-terminal forensic-full-record"><header>[AUDIT TRACE / FS-12]</header><pre>05:58  COLLECTION_TIME = 05:58
06:08  PERMISSION ACCEPTED
06:09  FIELD REVISED
       05:58 → 06:09
06:09  LOCAL SESSION: OFFLINE
06:09  SOURCE ROUTE: UNRESOLVED

PROFILE: 18-07
PERMISSION: ACCEPTED
OPERATOR: UNVERIFIED
TIME SHIFT: +00:11:00</pre><footer>AUTHENTICATION ≠ ATTRIBUTION</footer></article>`;
 return `<article class="forensic-batch forensic-full-record"><header><strong>TX-3 · INSTRUMENT BATCH 0614-B</strong><small>RAW ANALYTICAL RECORD</small></header><dl><dt>SAMPLE</dt><dd>DV-1807-TX-04</dd><dt>RUN START</dt><dd>06:42</dd><dt>RAW RESULT HASH</dt><dd>7A-19-C4</dd><dt>HASH MODIFIED</dt><dd>NO</dd><dt>CLOCK DRIFT</dt><dd>+00:00:02</dd><dt>VALIDATION</dt><dd>PASS</dd></dl><div class="forensic-record-ok">RAW DATA VERIFIED</div><footer>INSTRUMENT RECORD LOCKED AFTER VALIDATION</footer></article>`;
}
function currentProgressBase(){if(window.state&&Number.isFinite(Number(state.progress)))return Math.max(0,Math.min(100,Number(state.progress)));const shown=parseInt($("#forensicProgressText")?.textContent||"",10);return Number.isFinite(shown)?shown:64;}
const phaseBase={value:null};
function syncForensicControls(){
 const review=$("#reviewForensic");if(!review)return;
 const dialogueVisible=Boolean(local.dialogue)||!$("#forensicDialogue")?.classList.contains("hidden");
 const evidenceOpen=$("#forensicEvidencePanel")?.classList.contains("open");
 const choiceOpen=!$("#forensicChoice")?.classList.contains("hidden");
 const completeOpen=$("#forensicPhaseComplete")?.style.display==="block";
 const ready=local.found.size===4&&!local.compared;
 const shouldShow=ready&&!dialogueVisible&&!evidenceOpen&&!choiceOpen&&!completeOpen;
 review.classList.toggle("show",shouldShow);review.toggleAttribute("hidden",!shouldShow);
}
function updateProgress(){
 if(phaseBase.value===null)phaseBase.value=currentProgressBase();
 const milestones=local.found.size+(local.compared?1:0)+(local.choice?1:0);
 const targetEnd=Math.max(phaseBase.value,88);
 const pct=Math.round(phaseBase.value+((targetEnd-phaseBase.value)*milestones/6));
 const label=$("#forensicProgressText"),fill=$("#forensicProgressFill");
 if(label)label.textContent=`${pct}%`;if(fill)fill.style.width=`${pct}%`;
 if(window.state)state.progress=Math.max(Number(state.progress)||0,pct);
 updateObjective();
}
function updateObjective(){const objective=$("#forensicObjective");if(!objective)return;const remaining=4-local.found.size;if(remaining>0)objective.innerHTML=`<span>${text().objective}</span><small>${text().remaining(remaining)}</small>`;else objective.textContent=text().compareObjective;}
function portraitSource(name,emotion){try{return typeof portrait==="function"?portrait(name,emotion||"neutral"):"";}catch(_){return"";}}
function renderDialogueLine(){
 const session=local.dialogue,box=$("#forensicDialogue");if(!session||!box)return;
 const line=session.lines[session.index],right=line.speaker==="North",image=portraitSource(line.speaker,line.emotion);
 box.className=`dialogue${right?" right":""}`;
 box.innerHTML=`<div class="portrait-wrap">${image?`<img class="portrait portrait-${line.speaker}" src="${image}" alt="">`:""}</div><div class="dialogue-copy"><div class="speaker">${line.speaker}</div><div class="line">${localized(line.text)}</div></div><div class="next">${text().tapContinue}</div>`;
}
function dialogue(lines,onDone){
 const box=$("#forensicDialogue");if(!box){onDone?.();return;}
 local.dialogue={lines,index:0,onDone};box.classList.remove("hidden");syncForensicControls();renderDialogueLine();
 box.onclick=()=>{if(!local.dialogue)return;local.dialogue.index+=1;if(local.dialogue.index>=local.dialogue.lines.length){const done=local.dialogue.onDone;local.dialogue=null;box.classList.add("hidden");box.onclick=null;done?.();syncForensicControls();try{if(typeof autoSave==="function")autoSave();}catch(_){}}else renderDialogueLine();};
}
function completeForensicIntro(){
 local.introComplete=true;local.started=true;
 if(window.state){state.forensic=state.forensic||{};state.forensic.introComplete=true;state.forensic.started=true;state.forensic.lifecycleVersion=1;state.checkpoint="ch2_forensic_investigation";}
 lifecycle()?.completeIntro?.(PHASE_ID);updateObjective();
 try{if(typeof autoSave==="function")autoSave();}catch(_){}
}
function runIntro(){dialogue([
 {speaker:"Benedict",emotion:"neutral",text:{en:"So this is where timestamps come to acquire a respectable education.",th:"ที่นี่สินะ สถานที่ที่เวลาถูกส่งมาเรียนให้ดูน่าเชื่อถือ"}},
 {speaker:"Elena",emotion:"professional",text:{en:"Only the respectable ones. The others become paperwork.",th:"เฉพาะเวลาที่ประพฤติตัวดีค่ะ ที่เหลือกลายเป็นงานเอกสาร"}},
 {speaker:"North",emotion:"focused",text:{en:"The police record is an export. I want the source transaction, the workstation audit and the instrument batch.",th:"บันทึกของตำรวจเป็นข้อมูลส่งออก ฉันต้องดูรายการต้นทาง บันทึกตรวจสอบเครื่อง และรอบการทำงานของเครื่องวิเคราะห์"}},
 {speaker:"Elena",emotion:"neutral",text:{en:"Then we separate what the laboratory measured from what the system later claimed happened.",th:"งั้นเราแยกสิ่งที่ห้องปฏิบัติการวัดได้ ออกจากสิ่งที่ระบบอ้างว่าเกิดขึ้นภายหลัง"}}
],completeForensicIntro);}
function openEvidence(id){
 const evidence=EVIDENCE[id],panel=$("#forensicEvidencePanel");if(!evidence||!panel)return;
 local.active=id;local.inspected=false;
 $("#forensicEvidenceTitle").textContent=localized(evidence.title);$("#forensicEvidenceDescription").textContent=localized(evidence.description);$("#forensicEvidenceObservation").textContent=localized(evidence.observation);$("#forensicEvidenceObservation").style.display="none";$("#forensicEvidenceMeta").classList.remove("show");$("#forensicEvidenceObject").classList.remove("inspecting");$("#forensicEvidenceObject").innerHTML=evidenceMarkup(evidence.kind);
 $("#inspectForensicEvidence").style.display="";$("#collectForensicEvidence").style.display="none";$("#closeForensicEvidence").style.display="none";
 panel.classList.add("open");panel.setAttribute("aria-hidden","false");safePlay("#evidenceAudio",.55);syncForensicControls();updateUI();
}
function inspectEvidence(){if(!local.active||local.inspected)return;local.inspected=true;$("#forensicEvidenceObject").classList.add("inspecting");$("#forensicEvidenceMeta").classList.add("show");$("#forensicEvidenceObservation").style.display="";$("#inspectForensicEvidence").style.display="none";$("#collectForensicEvidence").style.display="";$("#closeForensicEvidence").style.display="";}
function closeEvidence(){const panel=$("#forensicEvidencePanel");if(!panel)return;panel.classList.remove("open");panel.setAttribute("aria-hidden","true");local.active=null;local.inspected=false;$("#forensicEvidenceObject")?.classList.remove("inspecting");$("#forensicEvidenceMeta")?.classList.remove("show");syncForensicControls();}
function collectEvidence(){
 const id=local.active;if(!id)return;const wasNew=!local.collected.has(id);local.found.add(id);local.collected.add(id);
 if(window.state){state.forensic=state.forensic||{};state.forensic.found=Array.from(local.found);state.forensic.collected=Array.from(local.collected);state.forensic.introComplete=true;state.forensic.started=true;state.forensic.lifecycleVersion=1;if(state.found&&typeof state.found.add==="function")state.found.add(`forensic_${id}`);}
 $(`[data-forensic-clue="${id}"]`)?.classList.add("found");closeEvidence();updateProgress();
 if(wasNew)try{if(typeof showBadge==="function")showBadge(text().added);}catch(_){}
 if(local.found.size===4)try{if(typeof showBadge==="function")showBadge(text().compareUnlocked);}catch(_){}
 lifecycle()?.evidenceChanged?.(PHASE_ID);syncForensicControls();try{if(typeof autoSave==="function")autoSave();}catch(_){}
}
function startCompare(){
 if(local.found.size<4){try{if(typeof showBadge==="function")showBadge(text().needAll);}catch(_){}return;}
 local.compared=true;syncForensicControls();if(window.state){state.forensic=state.forensic||{};state.forensic.compared=true;}updateProgress();
 dialogue([
  {speaker:"North",emotion:"focused",text:{en:"The seal is intact. The analyzer's raw hash is intact. Only the administrative time moved.",th:"ซีลยังสมบูรณ์ ค่าแฮชผลดิบจากเครื่องก็ยังสมบูรณ์ มีเพียงเวลาทางธุรการที่ถูกเลื่อน"}},
  {speaker:"Benedict",emotion:"serious",text:{en:"And the system points to a workstation that insists it was offline.",th:"และระบบชี้ไปยังเครื่องที่ยืนยันว่าตัวเองออฟไลน์อยู่"}},
  {speaker:"Elena",emotion:"thoughtful",text:{en:"The permission was accepted through profile 18-07. That confirms access, not the person using it. A copied token, remote session or delayed synchronization could produce the same result.",th:"ระบบยอมรับสิทธิ์ผ่านโปรไฟล์ 18-07 ค่ะ แต่นั่นยืนยันได้เพียงการเข้าถึง ไม่ได้ยืนยันว่าใครเป็นคนใช้ โทเคนที่ถูกคัดลอก การเชื่อมต่อระยะไกล หรือการซิงก์ล่าช้าก็สร้างผลแบบเดียวกันได้"}}
 ],()=>$("#forensicChoice")?.classList.remove("hidden"));
}
function choose(path){
 local.choice=path;if(window.state){state.forensic=state.forensic||{};state.forensic.choice=path;state.flags=state.flags||{};state.flags[`forensic_${path}`]=true;}
 $("#forensicChoice")?.classList.add("hidden");updateProgress();
 let response;
 if(path==="identity")response=[{speaker:"North",emotion:"neutral",text:{en:"Authentication is not attribution.",th:"การยืนยันสิทธิ์ไม่ใช่การยืนยันตัวบุคคล"}},{speaker:"Elena",emotion:"warm",text:{en:"Exactly. We know which permission the system trusted—not who exercised it.",th:"ถูกต้องค่ะ เรารู้ว่าระบบเชื่อถือสิทธิ์ใด แต่ยังไม่รู้ว่าใครเป็นผู้ใช้สิทธิ์นั้น"}}];
 else if(path==="custody")response=[{speaker:"Benedict",emotion:"serious",text:{en:"So the toxicology can be genuine while the timeline around it is manufactured.",th:"แปลว่าผลพิษวิทยาอาจเป็นของจริง ขณะที่ลำดับเวลารอบมันถูกสร้างขึ้น"}},{speaker:"Elena",emotion:"neutral",text:{en:"That is the furthest the evidence lets us go.",th:"หลักฐานพาเราไปได้ไกลที่สุดเพียงเท่านี้ค่ะ"}}];
 else response=[{speaker:"North",emotion:"skeptical",text:{en:"The alteration used a route the system trusted. That still leaves the operator unresolved.",th:"การแก้ไขผ่านช่องทางที่ระบบเชื่อถือ แต่ตัวผู้ใช้งานยังไม่ถูกยืนยัน"}},{speaker:"Elena",emotion:"concerned",text:{en:"Right. An authorized path is evidence of method, not identity.",th:"ใช่ค่ะ ช่องทางที่ได้รับอนุญาตเป็นหลักฐานของวิธีการ ไม่ใช่ตัวตน"}}];
 response.push({speaker:"Benedict",emotion:"serious",text:{en:"The database tells us what changed. The body may tell us which timeline is real.",th:"ฐานข้อมูลบอกแล้วว่าอะไรถูกเปลี่ยน ร่างกายอาจบอกได้ว่าลำดับเวลาใดเป็นของจริง"}});
 dialogue(response,finishPhase);
}
function finishPhase(){const complete=$("#forensicPhaseComplete");if(!complete)return;if(window.state){state.forensic=state.forensic||{};state.forensic.complete=true;state.screen=PHASE_ID;}updateProgress();updateUI();complete.style.display="block";syncForensicControls();try{if(typeof autoSave==="function")autoSave();}catch(_){}}
function returnToTitle(){
 stopHum();["#policeAudio","#cafeAudio","#morningOfficeAudio","#officeAudio","#crimeAudio","#rainAudio"].forEach(selector=>{const audio=$(selector);if(audio)audio.pause();});try{if(typeof autoSave==="function")autoSave();}catch(_){}
 if(typeof showScreen==="function")showScreen("title");else{$$(".screen").forEach(screen=>screen.classList.remove("active"));$("#title")?.classList.add("active");if(window.state)state.screen="title";}
 const theme=$("#themeAudio");if(theme){try{theme.loop=true;theme.volume=.42;if(theme.currentTime>=theme.duration-.2||!Number.isFinite(theme.currentTime))theme.currentTime=0;theme.play().catch(()=>{});}catch(_){}}
}
function updateUI(){
 const copy=text(),location=$("#forensicLocation"),sceneLabel=$("#forensicSceneLabel"),compare=$("#reviewForensic"),choiceTitle=$("#forensicChoiceTitle");
 if(location)location.textContent=copy.location;if(sceneLabel)sceneLabel.textContent=copy.sceneLabel;if(compare)compare.textContent=copy.compare;if(choiceTitle)choiceTitle.textContent=copy.choiceTitle;
 $$('[data-forensic-choice]').forEach(button=>{const key=button.dataset.forensicChoice;if(copy.choices[key])button.textContent=copy.choices[key];});
 const kicker=$("#forensicEvidenceKicker"),stamp=$("#forensicEvidenceStamp"),hint=$("#forensicEvidenceHint");if(kicker)kicker.textContent=copy.evidenceInspection;if(stamp)stamp.textContent=copy.caseEvidence;if(hint)hint.textContent=copy.tapEvidence;
 const inspect=$("#inspectForensicEvidence"),collect=$("#collectForensicEvidence"),close=$("#closeForensicEvidence");if(inspect)inspect.textContent=copy.inspect;if(collect)collect.textContent=copy.collect;if(close)close.textContent=copy.close;
 const completeTitle=$("#forensicCompleteTitle"),completeText=$("#forensicCompleteText"),completeButton=$("#continueMedicalExaminer");if(completeTitle)completeTitle.textContent=copy.wipTitle;if(completeText)completeText.textContent=copy.wipText;if(completeButton)completeButton.textContent=copy.returnTitle;
 if(local.active){const evidence=EVIDENCE[local.active];if(evidence){$("#forensicEvidenceTitle").textContent=localized(evidence.title);$("#forensicEvidenceDescription").textContent=localized(evidence.description);$("#forensicEvidenceObservation").textContent=localized(evidence.observation);}}
 if(local.dialogue)renderDialogueLine();updateObjective();refreshCaseEntries();
}
function appendCaseEntries(){
 const list=$("#caseList");if(!list||!window.state||!state.forensic)return;$('[data-forensic-case-section]',list)?.remove();$$('[data-forensic-case-entry]',list).forEach(node=>node.remove());const ids=state.forensic.collected||[];if(!ids.length)return;
 const heading=document.createElement("div");heading.className="case-section-title";heading.dataset.forensicCaseSection="1";heading.textContent=text().caseSection;list.appendChild(heading);
 ids.forEach(id=>{const evidence=EVIDENCE[id];if(!evidence)return;const row=document.createElement("div");row.className="case-row";row.dataset.forensicCaseEntry=id;row.innerHTML=`<b>${localized(evidence.title)}</b><div>${localized(evidence.description)}</div>`;list.appendChild(row);});
}
function refreshCaseEntries(){if($("#caseModal")?.classList.contains("open"))appendCaseEntries();}
function restoreState(){
 if(window.state&&state.forensic){
  local.collected=new Set(state.forensic.collected||[]);local.found=new Set([...(state.forensic.found||[]),...local.collected]);local.choice=state.forensic.choice||null;local.compared=Boolean(state.forensic.compared);state.forensic.found=[...local.found];state.forensic.collected=[...local.collected];state.forensic.lifecycleVersion=1;
  local.introComplete=Boolean(state.forensic.introComplete||local.found.size||local.collected.size||local.choice||state.forensic.complete);
  local.started=local.introComplete||Boolean(local.choice);
  if(local.introComplete){state.forensic.introComplete=true;state.forensic.started=true;}
 }else{local.found=new Set();local.collected=new Set();local.choice=null;local.compared=false;local.introComplete=false;local.started=false;}
 $$('[data-forensic-clue]').forEach(node=>node.classList.toggle("found",local.collected.has(node.dataset.forensicClue)));
 if(local.choice)finishPhase();updateProgress();syncForensicControls();lifecycle()?.prepare?.(PHASE_ID);
}
function showPhase(){
 $$(".screen").forEach(screen=>screen.classList.remove("active"));$("#forensic2")?.classList.add("active");
 if(window.state){state.screen=PHASE_ID;state.chapter=Math.max(Number(state.chapter)||2,2);state.forensic=state.forensic||{};}
 safePlay("#forensicDoorAudio",.55);const hum=$("#forensicHumAudio");if(hum){hum.volume=.10;hum.play().catch(()=>{});}updateUI();restoreState();syncForensicControls();
 if(!local.started&&!local.choice&&!local.introComplete){local.started=true;if(window.state){state.forensic=state.forensic||{};state.forensic.started=true;}setTimeout(runIntro,420);}
 try{if(typeof autoSave==="function")autoSave();}catch(_){}
}
function bindPoliceToForensicDirectly(){
 const complete=$("#policePhaseComplete");if(!complete)return;let transitioning=false;
 const continueNow=()=>{if(transitioning)return;const visible=complete.style.display!=="none"&&getComputedStyle(complete).display!=="none";if(!visible)return;transitioning=true;complete.style.display="none";try{if(window.state){state.policePhaseComplete=true;state.screen=PHASE_ID;}if(typeof autoSave==="function")autoSave();}catch(_){}setTimeout(()=>{showPhase();transitioning=false;},60);};
 new MutationObserver(continueNow).observe(complete,{attributes:true,attributeFilter:["style","class"]});document.addEventListener("lastwitness:police-complete",continueNow);setTimeout(continueNow,0);
}
function bind(){
 normalizeMarkup();bindPoliceToForensicDirectly();updateUI();
 $$('[data-forensic-clue]').forEach(button=>button.addEventListener("click",()=>openEvidence(button.dataset.forensicClue)));
 $("#inspectForensicEvidence")?.addEventListener("click",inspectEvidence);$("#forensicEvidenceObject")?.addEventListener("click",inspectEvidence);$("#collectForensicEvidence")?.addEventListener("click",collectEvidence);$("#closeForensicEvidence")?.addEventListener("click",closeEvidence);$("#reviewForensic")?.addEventListener("click",startCompare);
 $$('[data-forensic-choice]').forEach(button=>button.addEventListener("click",()=>choose(button.dataset.forensicChoice)));
 $("#continueMedicalExaminer")?.addEventListener("click",returnToTitle);
 const policeContinue=$("#policeReturnTitle");if(policeContinue)policeContinue.addEventListener("click",event=>{event.preventDefault();event.stopImmediatePropagation();const complete=$("#policePhaseComplete");if(complete)complete.style.display="none";showPhase();},true);
 $("#caseButton")?.addEventListener("click",()=>setTimeout(appendCaseEntries,0),true);
 document.addEventListener("click",event=>{if(event.target.closest?.("[data-lang]")){setTimeout(updateUI,0);setTimeout(updateUI,80);}},true);
 new MutationObserver(()=>updateUI()).observe(document.documentElement,{attributes:true,attributeFilter:["lang"]});
 const devGrid=$("#developerModal .dev-grid");if(devGrid&&!$('[data-dev-jump="forensic2"]')){const button=document.createElement("button");button.className="dev-button";button.dataset.devJump=PHASE_ID;button.textContent="Forensic Science Lab";button.addEventListener("click",()=>{$("#developerModal")?.classList.remove("open");showPhase();});devGrid.appendChild(button);}
 window.LastWitnessForensic={start:showPhase,updateLanguage:updateUI,openEvidence,regressionVersion:"0.7.11"};
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",bind,{once:true});else bind();
})();
