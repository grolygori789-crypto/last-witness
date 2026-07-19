/* LAST WITNESS — Content Registry, Journal & Dev Audit 0.3.5 */
(function(){
"use strict";
const $=(s,r=document)=>r.querySelector(s); const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const STORE="lastWitness.contentRegistry.v1";
const BASE_CHARACTERS=["benedict","north"];
const CHARACTERS={
 benedict:{name:{en:"Benedict",th:"เบเนดิกต์"},age:42,role:{en:"Detective",th:"นักสืบ"},bio:{en:"A calm, observant detective who uses humour to keep pressure from controlling the room.",th:"นักสืบสุขุม ช่างสังเกต ใช้อารมณ์ขันช่วยควบคุมแรงกดดันในสถานการณ์"},portrait:"Benedict"},
 north:{name:{en:"North",th:"นอร์ธ"},age:32,role:{en:"IT Specialist",th:"ผู้เชี่ยวชาญด้านไอที"},bio:{en:"A precise technical investigator with a dry wit and very little patience for unsupported conclusions.",th:"ผู้สืบสวนด้านเทคนิคที่แม่นยำ มีอารมณ์ขันแห้งๆ และไม่ยอมรับข้อสรุปที่ไร้หลักฐาน"},portrait:"North"},
 elena:{name:{en:"Elena",th:"เอเลนา"},role:{en:"Forensic Analyst",th:"นักวิเคราะห์นิติวิทยาศาสตร์"},bio:{en:"A capable forensic analyst whose technical knowledge becomes central to the investigation.",th:"นักวิเคราะห์นิติวิทยาศาสตร์ฝีมือดี ผู้มีความรู้ทางเทคนิคที่สำคัญต่อการสืบสวน"},portrait:"Elena"},
 somchai:{name:{en:"Somchai",th:"สมชาย"},role:{en:"Police Officer",th:"เจ้าหน้าที่ตำรวจ"},bio:{en:"A Bangkok police officer connected to the official handling of the case.",th:"เจ้าหน้าที่ตำรวจนครบาลที่เกี่ยวข้องกับการดำเนินคดีอย่างเป็นทางการ"},portrait:"Somchai"},
 kittisak:{name:{en:"Kittisak",th:"กิตติศักดิ์"},role:{en:"Police Officer",th:"เจ้าหน้าที่ตำรวจ"},bio:{en:"A disciplined officer whose account helps define the police timeline.",th:"เจ้าหน้าที่ผู้เคร่งครัด ซึ่งคำให้การช่วยกำหนดลำดับเวลาฝั่งตำรวจ"},portrait:"Kittisak"},
 ratchata:{name:{en:"Dr. Ratchata Singh",th:"ดร. รัชตะ ซิงห์"},age:43,role:{en:"Senior Medical Examiner",th:"แพทย์นิติเวชอาวุโส"},bio:{en:"A Thai Sikh forensic pathologist: eccentric in dress, dry-witted in conversation and uncompromising about what the body can actually prove.",th:"แพทย์นิติเวชชาวไทยเชื้อสายซิกข์ แต่งตัวมีเอกลักษณ์ พูดมุกหน้าตาย และเคร่งครัดกับสิ่งที่ร่างกายพิสูจน์ได้จริง"},src:"assets/images/ratchata/profile.png"}
};
const EVIDENCE={
 phone:{phase:"Hotel 1807",title:{en:"Victim's Phone",th:"โทรศัพท์ของผู้ตาย"}}, blood:{phase:"Hotel 1807",title:{en:"Blood-stained Cloth",th:"ผ้าเปื้อนเลือด"}}, laptop:{phase:"Hotel 1807",title:{en:"Victim's Laptop",th:"แล็ปท็อปของผู้ตาย"}}, suitcase:{phase:"Hotel 1807",title:{en:"Suitcase",th:"กระเป๋าเดินทาง"}},
 apt_board:{phase:"Victim's Apartment",title:{en:"Investigation Board",th:"กระดานสืบสวน"}}, apt_documents:{phase:"Victim's Apartment",title:{en:"Recovered Documents",th:"เอกสารที่พบ"}}, apt_laptop:{phase:"Victim's Apartment",title:{en:"Apartment Laptop",th:"แล็ปท็อปในอพาร์ตเมนต์"}}, apt_mug:{phase:"Victim's Apartment",title:{en:"Coffee Mug",th:"แก้วกาแฟ"}},
 accession_record:{phase:"Forensic Science Lab",title:{en:"Laboratory Accession Record",th:"บันทึกรับตัวอย่างของห้องปฏิบัติการ"}}, audit_trace:{phase:"Forensic Science Lab",title:{en:"Workstation Audit Trace",th:"บันทึกตรวจสอบเครื่องเวิร์กสเตชัน"}}, batch_record:{phase:"Forensic Science Lab",title:{en:"Instrument Batch Record",th:"บันทึกรอบการทำงานของเครื่องวิเคราะห์"}}, sealed_sample:{phase:"Forensic Science Lab",title:{en:"Sealed Toxicology Sample",th:"ตัวอย่างพิษวิทยาที่ปิดผนึก"}},
 postmortem:{phase:"Medical Examiner",title:{en:"Postmortem Indicators",th:"ตัวบ่งชี้หลังการเสียชีวิต"}}, identity_tag:{phase:"Medical Examiner",title:{en:"Identification and Intake Tag",th:"ป้ายระบุตัวและรับศพ"}}, autopsy_report:{phase:"Medical Examiner",title:{en:"Preliminary Autopsy Report",th:"รายงานชันสูตรเบื้องต้น"}}, toxicology_sample:{phase:"Medical Examiner",title:{en:"Toxicology Reference Sample",th:"ตัวอย่างอ้างอิงทางพิษวิทยา"}}
};
function language(){try{return window.state?.language==="th"?"th":(document.documentElement.lang==="th"?"th":"en");}catch(_){return document.documentElement.lang==="th"?"th":"en";}}
function loadLocal(){try{return JSON.parse(localStorage.getItem(STORE)||"{}");}catch(_){return {};}}
function ensureState(){
 if(!window.state) window.state={}; const saved=loadLocal();
 state.lwCharactersUnlocked=Array.from(new Set([...(state.lwCharactersUnlocked||saved.charactersUnlocked||[]),...BASE_CHARACTERS]));
 state.lwCharactersUnread=Array.from(new Set(state.lwCharactersUnread||saved.charactersUnread||[]));
 state.lwEvidenceUnlocked=Array.from(new Set(state.lwEvidenceUnlocked||saved.evidenceUnlocked||[]));
 state.lwDeveloperState=Boolean(state.lwDeveloperState||saved.developerState);
}
function persist(){ensureState();try{localStorage.setItem(STORE,JSON.stringify({charactersUnlocked:state.lwCharactersUnlocked,charactersUnread:state.lwCharactersUnread,evidenceUnlocked:state.lwEvidenceUnlocked,developerState:state.lwDeveloperState}));}catch(_){}try{if(typeof autoSave==="function")autoSave();}catch(_){} }
function characterSource(c){if(c.src)return c.src;try{return typeof portrait==="function"?portrait(c.portrait,"neutral"):"";}catch(_){return"";}}
function updateDots(){ensureState();const show=state.lwCharactersUnread.length>0;$$('.journal-alert').forEach(n=>n.classList.toggle('show',show));}
function notifyCharacter(id){const c=CHARACTERS[id];if(!c)return;try{if(typeof showBadge==="function")showBadge(language()==="th"?`เพิ่มตัวละคร: ${c.name.th}`:`Character added: ${c.name.en}`);}catch(_){} const toast=$('#featureToast');if(toast){toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2200);} }
function unlockCharacter(id,opt={}){ensureState();if(!CHARACTERS[id])return false;const fresh=!state.lwCharactersUnlocked.includes(id);if(fresh)state.lwCharactersUnlocked.push(id);if(opt.unread!==false&&fresh&&!state.lwCharactersUnread.includes(id))state.lwCharactersUnread.push(id);if(id==='ratchata'){state.medical=state.medical||{};state.medical.ratchataMet=true;}persist();renderCharacters();updateDots();if(fresh&&opt.source!=='dev')notifyCharacter(id);return fresh;}
function markCharactersRead(){ensureState();state.lwCharactersUnread=[];persist();updateDots();}
function renderCharacters(){
 ensureState();
 const grid=$('#characterGrid');
 if(!grid)return;
 const ids=state.lwCharactersUnlocked.filter(id=>CHARACTERS[id]);
 grid.innerHTML='';
 if(!ids.length){
   const empty=document.createElement('div');
   empty.className='character-empty';
   empty.textContent=language()==='th'?'ยังไม่มีตัวละครที่พบ':'No characters encountered yet.';
   grid.appendChild(empty);
   return;
 }
 ids.forEach(id=>{
   const c=CHARACTERS[id],button=document.createElement('button');
   button.type='button';
   button.className='character-card';
   button.dataset.character=id;
   const src=characterSource(c);
   button.innerHTML=`${src?`<img src="${src}" alt="">`:'<div class="character-portrait-placeholder"></div>'}
     <div class="character-name">${c.name[language()]}</div>
     <div class="character-status">${c.role[language()]}${c.age?` · ${c.age}`:''}</div>`;
   button.addEventListener('click',()=>showDetail(id));
   grid.appendChild(button);
 });
}
function showDetail(id){
 const c=CHARACTERS[id],grid=$('#characterGrid'),detail=$('#characterDetail'),back=$('#charactersBack');
 if(!c||!detail)return;
 const src=characterSource(c);
 detail.innerHTML=`<div class="character-detail-head">${src?`<img src="${src}" alt="">`:''}<div><h3>${c.name[language()]}</h3><div class="character-status">${c.role[language()]}${c.age?` · ${c.age}`:''}</div></div></div><div class="character-notes">${c.bio[language()]}</div>`;
 if(grid)grid.style.display='none';
 detail.style.display='block';
 if(back)back.style.display='block';
}
function openCharacters(e){
 e?.preventDefault();e?.stopPropagation();
 $('#drawer')?.classList.remove('open');
 renderCharacters();
 const grid=$('#characterGrid'),detail=$('#characterDetail'),back=$('#charactersBack');
 if(grid)grid.style.display='grid';
 if(detail)detail.style.display='none';
 if(back)back.style.display='none';
 $('#charactersModal')?.classList.add('open');
 markCharactersRead();
}
function evidenceKeyFromElement(el){for(const a of ['data-clue','data-apt-clue','data-forensic-clue','data-medical-clue'])if(el.hasAttribute?.(a))return el.getAttribute(a);return null;}
function unlockEvidence(id){ensureState();if(!EVIDENCE[id])return false;if(!state.lwEvidenceUnlocked.includes(id))state.lwEvidenceUnlocked.push(id);try{if(state.found?.add)state.found.add(id);}catch(_){}const el=$(`[data-clue="${id}"],[data-apt-clue="${id}"],[data-forensic-clue="${id}"],[data-medical-clue="${id}"]`);el?.classList.add('found');return true;}
function syncPhaseEvidence(){ensureState();const f=['sealed_sample','accession_record','audit_trace','batch_record'].filter(x=>state.lwEvidenceUnlocked.includes(x));state.forensic=state.forensic||{};state.forensic.found=f;state.forensic.collected=f;if(f.length===4)$('#reviewForensic')?.classList.add('show');const m=['postmortem','identity_tag','autopsy_report','toxicology_sample'].filter(x=>state.lwEvidenceUnlocked.includes(x));state.medical=state.medical||{};state.medical.found=m;state.medical.collected=m;if(m.length===4)$('#reviewMedical')?.classList.add('show');$$('[data-clue],[data-apt-clue],[data-forensic-clue],[data-medical-clue]').forEach(el=>{const k=evidenceKeyFromElement(el);if(state.lwEvidenceUnlocked.includes(k))el.classList.add('found');});}
function renderRegistryEvidence(){ensureState();const list=$('#caseList');if(!list)return;list.querySelectorAll('[data-registry-evidence]').forEach(n=>n.remove());let last='';state.lwEvidenceUnlocked.filter(id=>EVIDENCE[id]).forEach(id=>{const e=EVIDENCE[id];if(e.phase!==last){last=e.phase;const h=document.createElement('div');h.className='case-section-title';h.dataset.registryEvidence='section';h.textContent=e.phase;list.appendChild(h);}const row=document.createElement('div');row.className='case-row';row.dataset.registryEvidence=id;row.innerHTML=`<b>${e.title[language()]}</b><div>${language()==='th'?'ปลดล็อกและพร้อมตรวจสอบในโหมดนักพัฒนา':'Unlocked and available for developer inspection.'}</div>`;list.appendChild(row);});}
function devUnlockCharacters(e){e?.preventDefault();e?.stopImmediatePropagation();ensureState();state.lwDeveloperState=true;Object.keys(CHARACTERS).forEach(id=>unlockCharacter(id,{unread:false,source:'dev'}));state.lwCharactersUnread=[];persist();renderCharacters();updateDots();try{if(typeof showBadge==='function')showBadge(language()==='th'?'ปลดล็อกตัวละครครบแล้ว':'All characters unlocked');}catch(_){} }
function devUnlockEvidence(e){e?.preventDefault();e?.stopImmediatePropagation();ensureState();state.lwDeveloperState=true;Object.keys(EVIDENCE).forEach(unlockEvidence);syncPhaseEvidence();persist();renderRegistryEvidence();try{if(typeof showBadge==='function')showBadge(language()==='th'?'ปลดล็อกหลักฐานครบแล้ว':'All evidence unlocked');}catch(_){} }
const sessionSpeakers=new WeakMap();
function observeDialogue(){const observer=new MutationObserver(ms=>{ms.forEach(m=>{const box=m.target.nodeType===1?m.target:m.target.parentElement;if(!box?.classList?.contains('dialogue'))return;let set=sessionSpeakers.get(box)||new Set();const speaker=box.querySelector('.speaker')?.textContent?.trim()?.toLowerCase();const map={elena:'elena',somchai:'somchai',kittisak:'kittisak',ratchata:'ratchata'};if(map[speaker])set.add(map[speaker]);sessionSpeakers.set(box,set);if(box.classList.contains('hidden')||getComputedStyle(box).display==='none'){set.forEach(id=>unlockCharacter(id,{unread:true,source:'story'}));set.clear();}});});$$('.dialogue').forEach(box=>observer.observe(box,{subtree:true,childList:true,attributes:true,attributeFilter:['class','style']}));}
function hydrateLegacy(){ensureState();if(state.medical?.ratchataMet)unlockCharacter('ratchata',{unread:false,source:'hydrate'});['Elena','Somchai','Kittisak'].forEach(name=>{if($(`[data-character="${name}"]`))unlockCharacter(name.toLowerCase(),{unread:false,source:'hydrate'});});syncPhaseEvidence();}
function bind(){ensureState();hydrateLegacy();renderCharacters();updateDots();observeDialogue();const cb=$('#charactersButton');if(cb){cb.hidden=false;cb.style.setProperty('display','block','important');cb.addEventListener('click',openCharacters,true);}document.addEventListener('click',e=>{if(e.target.closest?.('#charactersButton'))setTimeout(markCharactersRead,0);if(e.target.closest?.('[data-lang]'))setTimeout(()=>{renderCharacters();renderRegistryEvidence();},0);},true);const modal=$('#charactersModal');if(modal)new MutationObserver(()=>{if(modal.classList.contains('open'))markCharactersRead();}).observe(modal,{attributes:true,attributeFilter:['class']});$('#charactersBack')?.addEventListener('click',()=>{const g=$('#characterGrid'),d=$('#characterDetail'),b=$('#charactersBack');if(g)g.style.display='grid';if(d)d.style.display='none';if(b)b.style.display='none';});$('#caseButton')?.addEventListener('click',()=>setTimeout(renderRegistryEvidence,0),true);$('#devUnlockCharacters')?.addEventListener('click',devUnlockCharacters,true);$('#devUnlockEvidence')?.addEventListener('click',devUnlockEvidence,true);window.LastWitnessContentRegistry={characters:CHARACTERS,evidence:EVIDENCE,unlockCharacter,unlockEvidence,renderCharacters,renderEvidence:renderRegistryEvidence,devUnlockCharacters,devUnlockEvidence,version:'0.3.5'};}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind,{once:true});else bind();
})();
