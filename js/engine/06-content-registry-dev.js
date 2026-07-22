/* LAST WITNESS — Canon Character Journal + Registry/Dev Integration 0.5.0
 * Story-gated journal visibility, canonical relationship metrics and no polling.
 */
(function(){
"use strict";
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const STORE="lastWitness.contentRegistry.v2";
const BASE_CHARACTERS=["benedict","north"];
const STORY_NAMES={benedict:"Benedict",north:"North",elena:"Elena",somchai:"Somchai",kittisak:"Kittisak",ratchata:"Ratchata"};
const LATE_CH2=new Set(["apartment2","cafe2","police2","forensic2","medical2","chapter2Complete","chapter3Office","chapter3Phase2Wip","chapter3Wip"]);

const CHARACTERS={
 benedict:{name:{en:"Benedict",th:"เบเนดิกต์"},age:42,role:{en:"Detective",th:"นักสืบ"},status:{en:"Lead Investigator",th:"หัวหน้าผู้สืบสวน"},bio:{en:"A calm, observant detective who uses humour to keep pressure from controlling the room.",th:"นักสืบสุขุม ช่างสังเกต ใช้อารมณ์ขันช่วยควบคุมแรงกดดันในสถานการณ์"},portrait:"Benedict",relation:{label:{en:"Professional Focus",th:"สมาธิในการทำงาน"},value:86},metrics:[{key:"resolve",label:{en:"Resolve",th:"ความมุ่งมั่น"},value:86},{key:"insight",label:{en:"Insight",th:"การหยั่งรู้"},value:82},{key:"composure",label:{en:"Composure",th:"ความสุขุม"},value:88},{key:"empathy",label:{en:"Empathy",th:"ความเข้าใจผู้อื่น"},value:76}]},
 north:{name:{en:"North",th:"นอร์ธ"},age:32,role:{en:"IT Specialist",th:"ผู้เชี่ยวชาญด้านไอที"},status:{en:"Trusted Partner",th:"คู่หูที่ไว้ใจได้"},bio:{en:"A precise technical investigator with dry wit and little patience for unsupported conclusions.",th:"ผู้สืบสวนด้านเทคนิคที่แม่นยำ มีอารมณ์ขันแห้งๆ และไม่ยอมรับข้อสรุปที่ไร้หลักฐาน"},portrait:"North",relation:{label:{en:"Relationship",th:"ความสัมพันธ์"},value:84},metrics:[{key:"trust",label:{en:"Trust",th:"ความไว้วางใจ"},value:84},{key:"respect",label:{en:"Respect",th:"ความนับถือ"},value:89},{key:"attachment",label:{en:"Affection",th:"ความผูกพัน"},value:58},{key:"suspicion",label:{en:"Suspicion",th:"ความสงสัย"},value:3}]},
 elena:{name:{en:"Elena",th:"เอเลนา"},role:{en:"Forensic Analyst",th:"นักวิเคราะห์นิติวิทยาศาสตร์"},status:{en:"Professional Contact",th:"ผู้ร่วมงานในคดี"},bio:{en:"A capable forensic analyst whose technical knowledge becomes central to the investigation.",th:"นักวิเคราะห์นิติวิทยาศาสตร์ฝีมือดี ผู้มีความรู้ทางเทคนิคที่สำคัญต่อการสืบสวน"},portrait:"Elena",relation:{label:{en:"Relationship",th:"ความสัมพันธ์"},value:56},metrics:[{key:"trust",label:{en:"Trust",th:"ความไว้วางใจ"},value:35},{key:"respect",label:{en:"Respect",th:"ความนับถือ"},value:52},{key:"attachment",label:{en:"Affection",th:"ความผูกพัน"},value:18},{key:"suspicion",label:{en:"Suspicion",th:"ความสงสัย"},value:10}]},
 somchai:{name:{en:"Somchai",th:"สมชาย"},role:{en:"Police Officer",th:"เจ้าหน้าที่ตำรวจ"},status:{en:"Cooperative",th:"ให้ความร่วมมือ"},bio:{en:"A Bangkok police officer connected to the official handling of the case.",th:"เจ้าหน้าที่ตำรวจนครบาลที่เกี่ยวข้องกับการดำเนินคดีอย่างเป็นทางการ"},portrait:"Somchai",relation:{label:{en:"Cooperation",th:"ความร่วมมือ"},value:61},metrics:[{key:"cooperation",label:{en:"Cooperation",th:"ความร่วมมือ"},value:61},{key:"credibility",label:{en:"Credibility",th:"ความน่าเชื่อถือ"},value:58},{key:"respect",label:{en:"Professional Respect",th:"ความนับถือทางวิชาชีพ"},value:64},{key:"suspicion",label:{en:"Suspicion",th:"ความสงสัย"},value:22}]},
 kittisak:{name:{en:"Kittisak",th:"กิตติศักดิ์"},role:{en:"Police Officer",th:"เจ้าหน้าที่ตำรวจ"},status:{en:"Reserved",th:"ระมัดระวังตัว"},bio:{en:"A disciplined officer whose account helps define the police timeline.",th:"เจ้าหน้าที่ผู้เคร่งครัด ซึ่งคำให้การช่วยกำหนดลำดับเวลาฝั่งตำรวจ"},portrait:"Kittisak",relation:{label:{en:"Cooperation",th:"ความร่วมมือ"},value:48},metrics:[{key:"cooperation",label:{en:"Cooperation",th:"ความร่วมมือ"},value:48},{key:"credibility",label:{en:"Credibility",th:"ความน่าเชื่อถือ"},value:62},{key:"respect",label:{en:"Professional Respect",th:"ความนับถือทางวิชาชีพ"},value:55},{key:"suspicion",label:{en:"Suspicion",th:"ความระแวง"},value:35}]},
 ratchata:{name:{en:"Dr. Ratchata Singh",th:"ดร. รัชตะ ซิงห์"},age:43,role:{en:"Senior Medical Examiner",th:"แพทย์นิติเวชอาวุโส"},status:{en:"Independent Expert",th:"ผู้เชี่ยวชาญอิสระ"},bio:{en:"A Thai Sikh forensic pathologist: dry-witted and uncompromising about what the body can actually prove.",th:"แพทย์นิติเวชชาวไทยเชื้อสายซิกข์ พูดมุกหน้าตาย และเคร่งครัดกับสิ่งที่ร่างกายพิสูจน์ได้จริง"},src:"assets/images/ratchata/profile.png",relation:{label:{en:"Professional Trust",th:"ความไว้วางใจทางวิชาชีพ"},value:67},metrics:[{key:"trust",label:{en:"Professional Trust",th:"ความไว้วางใจทางวิชาชีพ"},value:67},{key:"credibility",label:{en:"Credibility",th:"ความน่าเชื่อถือ"},value:91},{key:"respect",label:{en:"Professional Respect",th:"ความนับถือทางวิชาชีพ"},value:82},{key:"suspicion",label:{en:"Suspicion",th:"ความสงสัย"},value:8}]}
};

const EVIDENCE={
 phone:{phase:"Room 1807",title:{en:"Victim's Phone",th:"โทรศัพท์ของผู้ตาย"}},blood:{phase:"Room 1807",title:{en:"Blood-stained Cloth",th:"ผ้าเปื้อนเลือด"}},laptop:{phase:"Room 1807",title:{en:"Victim's Laptop",th:"แล็ปท็อปของผู้ตาย"}},suitcase:{phase:"Room 1807",title:{en:"Suitcase",th:"กระเป๋าเดินทาง"}},
 apt_board:{phase:"Victim's Apartment",title:{en:"Investigation Board",th:"กระดานสืบสวน"}},apt_documents:{phase:"Victim's Apartment",title:{en:"Recovered Documents",th:"เอกสารที่พบ"}},apt_laptop:{phase:"Victim's Apartment",title:{en:"Apartment Laptop",th:"แล็ปท็อปในอพาร์ตเมนต์"}},apt_mug:{phase:"Victim's Apartment",title:{en:"Coffee Mug",th:"แก้วกาแฟ"}},
 accession_record:{phase:"Forensic Science Lab",title:{en:"Laboratory Accession Record",th:"บันทึกรับตัวอย่างของห้องปฏิบัติการ"}},audit_trace:{phase:"Forensic Science Lab",title:{en:"Workstation Audit Trace",th:"บันทึกตรวจสอบเครื่องเวิร์กสเตชัน"}},batch_record:{phase:"Forensic Science Lab",title:{en:"Instrument Batch Record",th:"บันทึกรอบการทำงานของเครื่องวิเคราะห์"}},sealed_sample:{phase:"Forensic Science Lab",title:{en:"Sealed Toxicology Sample",th:"ตัวอย่างพิษวิทยาที่ปิดผนึก"}},
 postmortem:{phase:"Medical Examiner",title:{en:"Postmortem Indicators",th:"ตัวบ่งชี้หลังการเสียชีวิต"}},identity_tag:{phase:"Medical Examiner",title:{en:"Identification and Intake Tag",th:"ป้ายระบุตัวและรับศพ"}},autopsy_report:{phase:"Medical Examiner",title:{en:"Preliminary Autopsy Report",th:"รายงานชันสูตรเบื้องต้น"}},toxicology_sample:{phase:"Medical Examiner",title:{en:"Toxicology Reference Sample",th:"ตัวอย่างอ้างอิงทางพิษวิทยา"}}
};

function language(){try{return window.state?.language==="th"?"th":(document.documentElement.lang==="th"?"th":"en");}catch(_){return"en";}}
function currentScreen(){return $(".screen.active")?.id||window.state?.screen||"";}
function clamp(v){return Math.max(0,Math.min(100,Math.round(Number(v)||0)));}
function readStore(){try{return JSON.parse(localStorage.getItem(STORE)||"{}");}catch(_){return{};}}
function writeStore(){try{localStorage.setItem(STORE,JSON.stringify({charactersUnlocked:state.lwCharactersUnlocked||[],charactersUnread:state.lwCharactersUnread||[],evidenceUnlocked:state.lwEvidenceUnlocked||[]}));}catch(_){}}

function canonicalJournalEnabled(){
 const chapter=Number(window.state?.chapter)||1;
 if(chapter>2)return true;
 if(chapter<2)return false;
 if(window.state?.flags?.chapter2_character_feature_unlocked===true&&window.state?.journal?.unlocked===true)return true;
 return LATE_CH2.has(currentScreen());
}

function ensureState(){
 if(!window.state)window.state={};
 const saved=readStore();
 state.characters=state.characters||{Benedict:true};
 state.journal=state.journal||{unlocked:false,seen:true,introShown:false};
 state.flags=state.flags||{};
 state.lwJournalEnabled=canonicalJournalEnabled();
 const unlocked=new Set(Array.isArray(state.lwCharactersUnlocked)?state.lwCharactersUnlocked:[]);
 if(state.lwJournalEnabled){
  (saved.charactersUnlocked||[]).forEach(id=>unlocked.add(id));
  BASE_CHARACTERS.forEach(id=>unlocked.add(id));
  Object.entries(STORY_NAMES).forEach(([id,name])=>{if(state.characters?.[name]===true)unlocked.add(id);});
 }
 state.lwCharactersUnlocked=[...unlocked].filter(id=>CHARACTERS[id]);
 state.lwCharactersUnread=[...new Set(Array.isArray(state.lwCharactersUnread)?state.lwCharactersUnread:(saved.charactersUnread||[]))].filter(id=>CHARACTERS[id]);
 state.lwEvidenceUnlocked=[...new Set(Array.isArray(state.lwEvidenceUnlocked)?state.lwEvidenceUnlocked:(saved.evidenceUnlocked||[]))].filter(id=>EVIDENCE[id]);
}

function updateJournalVisibility(){
 ensureState();
 const button=$("#charactersButton");if(!button)return;
 const visible=canonicalJournalEnabled();
 state.lwJournalEnabled=visible;
 button.hidden=!visible;
 button.disabled=!visible;
 button.toggleAttribute("aria-hidden",!visible);
 if(visible){
  button.style.removeProperty("display");button.style.removeProperty("visibility");button.style.removeProperty("opacity");button.style.removeProperty("pointer-events");button.style.removeProperty("margin-top");button.style.removeProperty("min-height");button.style.removeProperty("padding");button.style.removeProperty("border");
 }else{
  button.style.setProperty("display","none","important");button.style.setProperty("visibility","hidden","important");button.style.setProperty("opacity","0","important");button.style.setProperty("pointer-events","none","important");button.style.setProperty("margin-top","0","important");button.style.setProperty("min-height","0","important");button.style.setProperty("padding","0","important");button.style.setProperty("border","0","important");
 }
}

function updateDots(){ensureState();const show=canonicalJournalEnabled()&&state.lwCharactersUnread.length>0;$$('.journal-alert').forEach(n=>n.classList.toggle('show',show));}
function persist(){ensureState();writeStore();try{if(typeof autoSave==='function')autoSave();}catch(_){}}
function enableJournal(){ensureState();if(canonicalJournalEnabled())return false;state.flags.chapter2_character_feature_unlocked=true;state.journal.unlocked=true;state.journal.seen=false;state.lwJournalEnabled=true;BASE_CHARACTERS.forEach(id=>{if(!state.lwCharactersUnlocked.includes(id))state.lwCharactersUnlocked.push(id);});persist();updateJournalVisibility();updateDots();return true;}
function characterSource(c){if(c.src)return c.src;try{return typeof portrait==='function'?portrait(c.portrait,'neutral'):'';}catch(_){return'';}}

function unlockCharacter(id,opt={}){
 ensureState();if(!CHARACTERS[id])return false;
 if(!canonicalJournalEnabled())enableJournal();
 const fresh=!state.lwCharactersUnlocked.includes(id);
 if(fresh)state.lwCharactersUnlocked.push(id);
 const storyName=STORY_NAMES[id];if(storyName){state.characters=state.characters||{};state.characters[storyName]=true;}
 if(opt.unread!==false&&fresh&&!state.lwCharactersUnread.includes(id))state.lwCharactersUnread.push(id);
 if(id==='ratchata'){state.medical=state.medical||{};state.medical.ratchataMet=true;}
 persist();renderCharacters();updateDots();
 if(fresh&&opt.source!=='dev')try{showBadge(language()==='th'?`เพิ่มตัวละคร: ${CHARACTERS[id].name.th}`:`Character added: ${CHARACTERS[id].name.en}`);}catch(_){}
 return fresh;
}

function relationshipRecord(id){const name=STORY_NAMES[id];return name?window.state?.relationships?.[name]:null;}
function dynamicMetrics(id,c){
 const r=relationshipRecord(id);
 if(r){return[
  {key:'trust',label:{en:'Trust',th:'ความไว้วางใจ'},value:clamp(r.trust)},
  {key:'respect',label:{en:'Respect',th:'ความนับถือ'},value:clamp(r.respect)},
  {key:'attachment',label:{en:'Affection',th:'ความผูกพัน'},value:clamp(r.attachment)},
  {key:'suspicion',label:{en:'Suspicion',th:'ความสงสัย'},value:clamp(r.suspicion)}
 ];}
 return c.metrics||[];
}
function averageFor(id,c){
 const r=relationshipRecord(id);
 if(r)return clamp((Number(r.trust||0)+Number(r.respect||0)+Number(r.attachment||0)+(100-Number(r.suspicion||0)))/4);
 const metrics=dynamicMetrics(id,c);if(!metrics.length)return clamp(c.relation?.value||50);
 const total=metrics.reduce((sum,m)=>sum+(m.key==='suspicion'?100-clamp(m.value):clamp(m.value)),0);
 return clamp(total/metrics.length);
}
function relationSummary(id,c){const value=averageFor(id,c);return `<div class="relation-summary"><div class="relation-label-row"><span>${language()==='th'?'ความสัมพันธ์':'Relationship'}</span><strong>${value}%</strong></div><div class="relation-bar"><div class="relation-fill" style="width:${value}%"></div></div></div>`;}
function relationMetrics(id,c){return `<div class="relation-metrics">${dynamicMetrics(id,c).map(m=>`<div class="relation-metric ${m.key==='suspicion'?'suspicion':''}"><div class="relation-metric-head"><span>${m.label[language()]||m.label.en}</span><strong>${clamp(m.value)}%</strong></div><div class="relation-bar"><div class="relation-fill" style="width:${clamp(m.value)}%"></div></div></div>`).join('')}</div>`;}

function renderCharacters(){
 ensureState();const grid=$("#characterGrid");if(!grid)return;
 if(!canonicalJournalEnabled()){grid.innerHTML='';return;}
 const ids=state.lwCharactersUnlocked.filter(id=>CHARACTERS[id]);
 grid.innerHTML=ids.map(id=>{const c=CHARACTERS[id],src=characterSource(c);return `<button type="button" class="character-card" data-character="${id}">${src?`<img src="${src}" alt="">`:''}<div class="character-name">${c.name[language()]}</div><div class="character-status">${c.status[language()]||c.role[language()]}</div>${relationSummary(id,c)}</button>`;}).join('');
 $$('[data-character]',grid).forEach(button=>button.addEventListener('click',()=>showDetail(button.dataset.character)));
}
function showDetail(id){const c=CHARACTERS[id],grid=$("#characterGrid"),detail=$("#characterDetail"),back=$("#charactersBack");if(!c||!detail)return;const src=characterSource(c);detail.innerHTML=`<div class="character-detail-head">${src?`<img src="${src}" alt="">`:''}<div><div class="character-name">${c.name[language()]}</div><div class="character-status">${c.role[language()]}${c.age?` · ${c.age}`:''}</div></div></div>${relationMetrics(id,c)}<div class="character-notes">${c.bio[language()]}</div>`;if(grid)grid.style.display='none';detail.style.display='block';if(back)back.style.display='block';}
function markCharactersRead(){ensureState();state.lwCharactersUnread=[];state.journal.seen=true;persist();updateDots();}
function openCharacters(event){const button=event.target.closest?.('#charactersButton');if(!button)return;event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();if(!canonicalJournalEnabled()){updateJournalVisibility();return;}$("#drawer")?.classList.remove('open');renderCharacters();const grid=$("#characterGrid"),detail=$("#characterDetail"),back=$("#charactersBack");if(grid)grid.style.display='grid';if(detail)detail.style.display='none';if(back)back.style.display='none';$("#charactersModal")?.classList.add('open');markCharactersRead();}
function backToGrid(event){if(!event.target.closest?.('#charactersBack'))return;event.preventDefault();const grid=$("#characterGrid"),detail=$("#characterDetail"),back=$("#charactersBack");if(grid)grid.style.display='grid';if(detail)detail.style.display='none';if(back)back.style.display='none';}

function evidenceKeyFromElement(el){for(const a of ['data-clue','data-apt-clue','data-forensic-clue','data-medical-clue'])if(el.hasAttribute?.(a))return el.getAttribute(a);return null;}
function unlockEvidence(id){ensureState();if(!EVIDENCE[id])return false;if(!state.lwEvidenceUnlocked.includes(id))state.lwEvidenceUnlocked.push(id);try{state.found?.add?.(id);}catch(_){}const el=$(`[data-clue="${id}"],[data-apt-clue="${id}"],[data-forensic-clue="${id}"],[data-medical-clue="${id}"]`);el?.classList.add('found');return true;}
function renderRegistryEvidence(){ensureState();const list=$("#caseList");if(!list)return;list.querySelectorAll('[data-registry-evidence]').forEach(n=>n.remove());let last='';state.lwEvidenceUnlocked.filter(id=>EVIDENCE[id]).forEach(id=>{const e=EVIDENCE[id];if(e.phase!==last){last=e.phase;const h=document.createElement('div');h.className='case-section-title';h.dataset.registryEvidence='section';h.textContent=e.phase;list.appendChild(h);}const row=document.createElement('div');row.className='case-row';row.dataset.registryEvidence=id;row.innerHTML=`<b>${e.title[language()]}</b><div>${language()==='th'?'ปลดล็อกในโหมดนักพัฒนา':'Unlocked in developer mode.'}</div>`;list.appendChild(row);});}
function devUnlockCharacters(event){event?.preventDefault();event?.stopImmediatePropagation();enableJournal();Object.keys(CHARACTERS).forEach(id=>unlockCharacter(id,{unread:false,source:'dev'}));state.lwCharactersUnread=[];persist();renderCharacters();updateDots();try{showBadge(language()==='th'?'ปลดล็อกตัวละครครบแล้ว':'All characters unlocked');}catch(_){} }
function devUnlockEvidence(event){event?.preventDefault();event?.stopImmediatePropagation();Object.keys(EVIDENCE).forEach(unlockEvidence);persist();renderRegistryEvidence();try{showBadge(language()==='th'?'ปลดล็อกหลักฐานครบแล้ว':'All evidence unlocked');}catch(_){} }

function observeDialogueUnlocks(){const sessions=new WeakMap();const map={elena:'elena',somchai:'somchai',kittisak:'kittisak',ratchata:'ratchata'};const observer=new MutationObserver(records=>records.forEach(record=>{const box=record.target.closest?.('.dialogue')||record.target;if(!box?.classList?.contains('dialogue'))return;const set=sessions.get(box)||new Set();const speaker=box.querySelector('.speaker')?.textContent?.trim()?.toLowerCase();if(map[speaker])set.add(map[speaker]);sessions.set(box,set);if(box.classList.contains('hidden')||getComputedStyle(box).display==='none'){set.forEach(id=>unlockCharacter(id,{unread:true,source:'story'}));set.clear();}}));$$('.dialogue').forEach(box=>observer.observe(box,{subtree:true,childList:true,attributes:true,attributeFilter:['class']}));}
function observeScreens(){const observer=new MutationObserver(()=>{ensureState();updateJournalVisibility();updateDots();});$$('.screen').forEach(screen=>observer.observe(screen,{attributes:true,attributeFilter:['class']}));}

function bind(){
 ensureState();
 if(LATE_CH2.has(currentScreen())&&!state.journal.unlocked){state.flags.chapter2_character_feature_unlocked=true;state.journal.unlocked=true;BASE_CHARACTERS.forEach(id=>{if(!state.lwCharactersUnlocked.includes(id))state.lwCharactersUnlocked.push(id);});}
 updateJournalVisibility();renderCharacters();updateDots();observeDialogueUnlocks();observeScreens();
 document.addEventListener('click',openCharacters,true);document.addEventListener('click',backToGrid,true);
 document.addEventListener('click',event=>{if(event.target.closest?.('[data-lang]'))setTimeout(()=>{renderCharacters();renderRegistryEvidence();},0);},true);
 $("#caseButton")?.addEventListener('click',()=>setTimeout(renderRegistryEvidence,0),true);
 $("#devUnlockCharacters")?.addEventListener('click',devUnlockCharacters,true);
 $("#devUnlockEvidence")?.addEventListener('click',devUnlockEvidence,true);
 window.LastWitnessContentRegistry={characters:CHARACTERS,evidence:EVIDENCE,unlockCharacter,unlockEvidence,renderCharacters,renderEvidence:renderRegistryEvidence,devUnlockCharacters,devUnlockEvidence,enableJournal,updateVisibility:updateJournalVisibility,canonicalJournalEnabled,version:'0.5.0'};
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind,{once:true});else bind();
})();
