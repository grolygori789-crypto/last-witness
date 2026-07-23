/* LAST WITNESS — Audio + Professional Save Manager 0.7.6
 * Preserves production audio behaviour while adding named manual saves,
 * IndexedDB persistence, legacy migration, export/import and versioned restore.
 */

/* Classic-script compatibility bridge. The core state is declared with `let`
 * in 01-runtime-data.js, so it is not automatically exposed on window. */
try { if (!window.state && typeof state !== "undefined") window.state = state; } catch (_) {}

function setVolumes(){
AUDIO.theme.volume=state.music;AUDIO.rain.volume=state.music*.48;AUDIO.office.volume=state.music*.82;AUDIO.morningOffice.volume=state.music*.72;AUDIO.cafe.volume=state.music*.78;AUDIO.evidence.volume=state.sfx*.8;AUDIO.police.volume=state.music*.76;AUDIO.crime.volume=state.music*.48;AUDIO.click.volume=Math.min(.22,state.sfx*.34);AUDIO.page.volume=state.sfx;AUDIO.steps.volume=state.sfx*.8;AUDIO.vibrate.volume=state.sfx;AUDIO.chapter.volume=state.music;
}
function stopAudio(audio){if(!audio)return;audio.pause();audio.currentTime=0}
function stopLoops(){[AUDIO.theme,AUDIO.rain,AUDIO.office,AUDIO.crime,AUDIO.morningOffice,AUDIO.cafe,AUDIO.police,document.getElementById("forensicHumAudio"),document.getElementById("medicalRefrigeratorAudio"),document.getElementById("medicalMachineAudio")].forEach(stopAudio)}
function stopPhoneVibration(){clearTimeout(stopPhoneVibration.timer);stopAudio(AUDIO.vibrate)}
function playPhoneVibration(duration=3600){if(!state.sound)return;stopPhoneVibration();AUDIO.vibrate.currentTime=0;AUDIO.vibrate.volume=state.sfx;AUDIO.vibrate.play().catch(()=>{});stopPhoneVibration.timer=setTimeout(stopPhoneVibration,duration)}
function stopChapterAudio(){clearTimeout(stopChapterAudio.timer);stopAudio(AUDIO.chapter);AUDIO.chapter.volume=state.music}
function play(name){if(!state.sound)return;const audio=AUDIO[name];audio.currentTime=0;audio.play().catch(()=>{})}
function ambience(screen){
 stopLoops();stopPhoneVibration();if(screen!=="chapter")stopChapterAudio();if(!state.sound)return;
 if(screen==="title"){AUDIO.theme.play().catch(()=>{});AUDIO.rain.play().catch(()=>{})}
 else if(screen==="office"){AUDIO.office.play().catch(()=>{});AUDIO.rain.play().catch(()=>{})}
 else if(screen==="office2"){AUDIO.morningOffice.play().catch(()=>{})}
 else if(screen==="apartment2"){AUDIO.crime.volume=state.music*.42;AUDIO.crime.play().catch(()=>{})}
 else if(screen==="cafe2"){AUDIO.cafe.play().catch(()=>{})}
 else if(screen==="police2"){AUDIO.police.currentTime=4.6;AUDIO.police.play().catch(()=>{})}
 else if(["crime","phone","deduction"].includes(screen)){AUDIO.crime.volume=state.music*.48;AUDIO.crime.play().catch(()=>{})}
}

const LW_SAVE_FORMAT="LAST_WITNESS_SAVE";
const LW_SAVE_VERSION=1;
const LW_SAVE_BUILD="0.7.6";
const LW_SAVE_DB="last_witness_saves";
const LW_SAVE_STORE="slots";
const LW_SAVE_FALLBACK="last_witness_named_saves_v1";
let lwSaveDbPromise=null;
let lwSaveManagerMode="load";
let lwSaveManagerReady=false;

function deepClone(value){return JSON.parse(JSON.stringify(value))}
function snapshot(){
 return{
  format:LW_SAVE_FORMAT,saveVersion:LW_SAVE_VERSION,build:LW_SAVE_BUILD,
  screen:state.screen,found:Array.from(state.found||[]),history:deepClone(state.history||[]),time:Date.now(),
  chapter:state.chapter,progress:state.progress,checkpoint:state.checkpoint,
  characters:deepClone(state.characters||{}),relationships:deepClone(state.relationships||{}),flags:deepClone(state.flags||{}),personality:deepClone(state.personality||{}),journal:deepClone(state.journal||{}),
  forensic:deepClone(state.forensic||{}),medical:deepClone(state.medical||{}),chapter3:deepClone(state.chapter3||{}),
  lwCharactersUnlocked:deepClone(state.lwCharactersUnlocked||[]),lwCharactersUnread:deepClone(state.lwCharactersUnread||[]),lwEvidenceUnlocked:deepClone(state.lwEvidenceUnlocked||[]),lwJournalEnabled:Boolean(state.lwJournalEnabled),
  language:state.language,sound:state.sound,music:state.music,sfx:state.sfx
 }
}
function autoSave(){
 if(["splash","title"].includes(state.screen))return;
 try{localStorage.setItem(SAVE.auto,JSON.stringify(snapshot()));flashSave(L("auto_saved"))}catch(error){console.error("LAST WITNESS auto-save failed",error)}
}

function openSaveDatabase(){
 if(lwSaveDbPromise)return lwSaveDbPromise;
 lwSaveDbPromise=new Promise((resolve,reject)=>{
  if(!window.indexedDB){reject(new Error("IndexedDB unavailable"));return}
  const request=indexedDB.open(LW_SAVE_DB,1);
  request.onupgradeneeded=()=>{const db=request.result;if(!db.objectStoreNames.contains(LW_SAVE_STORE)){const store=db.createObjectStore(LW_SAVE_STORE,{keyPath:"id"});store.createIndex("updatedAt","updatedAt")}};
  request.onsuccess=()=>resolve(request.result);
  request.onerror=()=>reject(request.error||new Error("IndexedDB open failed"));
 });
 return lwSaveDbPromise;
}
function fallbackSlots(){try{const parsed=JSON.parse(localStorage.getItem(LW_SAVE_FALLBACK)||"[]");return Array.isArray(parsed)?parsed:[]}catch(_){return[]}}
function writeFallbackSlots(slots){localStorage.setItem(LW_SAVE_FALLBACK,JSON.stringify(slots))}
async function listNamedSaves(){
 try{
  const db=await openSaveDatabase();
  return await new Promise((resolve,reject)=>{const request=db.transaction(LW_SAVE_STORE,"readonly").objectStore(LW_SAVE_STORE).getAll();request.onsuccess=()=>resolve((request.result||[]).sort((a,b)=>b.updatedAt-a.updatedAt));request.onerror=()=>reject(request.error)});
 }catch(_){return fallbackSlots().sort((a,b)=>b.updatedAt-a.updatedAt)}
}
async function putNamedSave(record){
 try{
  const db=await openSaveDatabase();
  await new Promise((resolve,reject)=>{const request=db.transaction(LW_SAVE_STORE,"readwrite").objectStore(LW_SAVE_STORE).put(record);request.onsuccess=()=>resolve();request.onerror=()=>reject(request.error)});
 }catch(_){const slots=fallbackSlots();const index=slots.findIndex(item=>item.id===record.id);if(index>=0)slots[index]=record;else slots.push(record);writeFallbackSlots(slots)}
}
async function deleteNamedSave(id){
 try{
  const db=await openSaveDatabase();
  await new Promise((resolve,reject)=>{const request=db.transaction(LW_SAVE_STORE,"readwrite").objectStore(LW_SAVE_STORE).delete(id);request.onsuccess=()=>resolve();request.onerror=()=>reject(request.error)});
 }catch(_){writeFallbackSlots(fallbackSlots().filter(item=>item.id!==id))}
}
async function clearNamedSaves(){
 try{
  const db=await openSaveDatabase();
  await new Promise((resolve,reject)=>{const request=db.transaction(LW_SAVE_STORE,"readwrite").objectStore(LW_SAVE_STORE).clear();request.onsuccess=()=>resolve();request.onerror=()=>reject(request.error)});
 }catch(_){try{localStorage.removeItem(LW_SAVE_FALLBACK)}catch(__){}}
}
async function requestPersistentStorage(){try{if(navigator.storage?.persist)await navigator.storage.persist()}catch(_){} }
function newSaveId(){return"lw-"+Date.now().toString(36)+"-"+Math.random().toString(36).slice(2,9)}
function cleanSaveName(value){return String(value||"").replace(/[<>:"/\\|?*\u0000-\u001F]/g," ").replace(/\s+/g," ").trim().slice(0,60)}
function escapeHtml(value){return String(value??"").replace(/[&<>'"]/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[char]))}
function languageCode(){return state?.language==="th"?"th":"en"}
function saveText(en,th){return languageCode()==="th"?th:en}
function screenLabel(data){
 const labels={office:["Chapter I · Detective Office","บทที่ I · สำนักงานนักสืบ"],crime:["Chapter I · Room 1807","บทที่ I · ห้อง 1807"],phone:["Chapter I · Victim's Phone","บทที่ I · โทรศัพท์ผู้ตาย"],summary:["Chapter I · Case Summary","บทที่ I · สรุปคดี"],deduction:["Chapter I · Deduction","บทที่ I · การอนุมาน"],chapter:["Chapter I Complete","จบบทที่ I"],office2:["Chapter II · Detective Office","บทที่ II · สำนักงานนักสืบ"],apartment2:["Chapter II · Victim's Apartment","บทที่ II · อพาร์ตเมนต์ผู้ตาย"],cafe2:["Chapter II · Orchid Café","บทที่ II · Orchid Café"],police2:["Chapter II · Police Station","บทที่ II · สถานีตำรวจ"],forensic2:["Chapter II · Forensic Science Unit","บทที่ II · หน่วยนิติวิทยาศาสตร์"],medical2:["Chapter II · Medical Examiner","บทที่ II · สถาบันนิติเวช"],chapter2Complete:["Chapter II Complete","จบบทที่ II"],chapter3Office:["Chapter III · Detective Office","บทที่ III · สำนักงานนักสืบ"],chapter3Phase2Wip:["Chapter III · In Flight","บทที่ III · ระหว่างเที่ยวบิน"]};
 const pair=labels[data?.screen]||[`Chapter ${data?.chapter||1} · ${data?.checkpoint||"Investigation"}`,`บทที่ ${data?.chapter||1} · ${data?.checkpoint||"การสืบสวน"}`];return pair[languageCode()==="th"?1:0]
}
function formatSaveDate(value){try{return new Intl.DateTimeFormat(languageCode()==="th"?"th-TH":"en-GB",{dateStyle:"medium",timeStyle:"short"}).format(new Date(value))}catch(_){return new Date(value).toLocaleString()}}
function autoRecord(){
 try{const raw=localStorage.getItem(SAVE.auto);if(!raw)return null;const data=JSON.parse(raw);return{id:"__auto__",name:saveText("AUTO SAVE","บันทึกอัตโนมัติ"),createdAt:data.time||Date.now(),updatedAt:data.time||Date.now(),data,automatic:true}}catch(_){return null}
}
async function migrateLegacyManual(){
 try{
  const raw=localStorage.getItem(SAVE.manual);if(!raw)return;
  const data=JSON.parse(raw);const slots=await listNamedSaves();
  if(!slots.some(slot=>slot.legacy===true))await putNamedSave({id:newSaveId(),name:saveText("Legacy Manual Save","บันทึกเดิม"),createdAt:data.time||Date.now(),updatedAt:data.time||Date.now(),data,legacy:true});
  localStorage.removeItem(SAVE.manual)
 }catch(error){console.warn("LAST WITNESS legacy save migration skipped",error)}
}

function injectSaveManager(){
 if(document.getElementById("lwSaveManager")){lwSaveManagerReady=true;return}
 const style=document.createElement("style");style.id="lwSaveManagerStyle";style.textContent=`
 #lwSaveManager{z-index:360;background:rgba(3,4,7,.88);backdrop-filter:blur(8px)}
 #lwSaveManager .modal-card{width:min(92vw,620px);max-height:min(86dvh,820px);overflow:hidden;padding:0;background:linear-gradient(155deg,#17191f,#090b0f 72%);border:1px solid rgba(199,161,94,.42);box-shadow:0 24px 70px rgba(0,0,0,.72)}
 .lw-save-head{padding:22px 22px 15px;border-bottom:1px solid rgba(255,255,255,.09)}.lw-save-head .eyebrow{color:#c7a15e;letter-spacing:.16em;font-size:11px}.lw-save-head h3{margin:5px 0 0;font-size:24px;color:#f4ede3}
 .lw-save-create{padding:16px 22px;border-bottom:1px solid rgba(255,255,255,.08)}.lw-save-create label{display:block;font-size:12px;color:#bbb2a5;margin-bottom:7px}.lw-save-create input{width:100%;box-sizing:border-box;background:#07090d;color:#f5efe6;border:1px solid rgba(199,161,94,.45);border-radius:7px;padding:13px 12px;font:inherit;outline:none}.lw-save-create input:focus{border-color:#d8b56e;box-shadow:0 0 0 2px rgba(216,181,110,.16)}
 .lw-save-create-actions,.lw-save-footer,.lw-save-card-actions{display:flex;gap:9px;flex-wrap:wrap}.lw-save-create-actions{margin-top:11px}.lw-save-scroll{padding:14px 16px 18px;overflow:auto;max-height:54dvh}.lw-save-empty{padding:28px 14px;text-align:center;color:#9f978c}
 .lw-save-card{padding:14px;margin:0 0 10px;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.10);border-radius:8px}.lw-save-card.auto{border-color:rgba(199,161,94,.45);background:rgba(199,161,94,.07)}.lw-save-card h4{margin:0 0 5px;font-size:16px;color:#f4ede3;overflow-wrap:anywhere}.lw-save-meta{font-size:12px;color:#aaa196;line-height:1.5;margin-bottom:11px}.lw-save-card-actions button{font-size:12px;padding:9px 11px}.lw-save-card-actions .danger{border-color:rgba(181,63,56,.55);color:#e29a94}
 .lw-save-footer{padding:14px 18px;border-top:1px solid rgba(255,255,255,.08);justify-content:space-between}.lw-save-footer input{display:none}
 @media(max-width:520px){#lwSaveManager .modal-card{width:94vw;max-height:90dvh}.lw-save-head{padding:18px 17px 13px}.lw-save-create{padding:14px 17px}.lw-save-scroll{padding:12px;max-height:52dvh}.lw-save-card-actions button{flex:1 1 auto}}
 `;document.head.appendChild(style);
 const modal=document.createElement("div");modal.id="lwSaveManager";modal.className="modal";modal.setAttribute("aria-hidden","true");modal.innerHTML=`<div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="lwSaveTitle"><div class="lw-save-head"><div class="eyebrow">LAST WITNESS</div><h3 id="lwSaveTitle"></h3></div><div id="lwSaveCreate" class="lw-save-create"><label id="lwSaveNameLabel" for="lwSaveName"></label><input id="lwSaveName" type="text" maxlength="60" autocomplete="off" enterkeyhint="done"><div class="lw-save-create-actions"><button id="lwSaveCreateButton" class="primary" type="button"></button><button id="lwSaveCancelCreate" class="ghost" type="button"></button></div></div><div id="lwSaveList" class="lw-save-scroll"></div><div class="lw-save-footer"><div><button id="lwImportSave" class="ghost" type="button"></button><input id="lwImportSaveInput" type="file" accept=".lwsave,.json,application/json"></div><button id="lwCloseSaveManager" class="ghost" type="button"></button></div></div>`;
 document.body.appendChild(modal);
 modal.addEventListener("click",event=>{if(event.target===modal)closeSaveManager();const action=event.target.closest?.("[data-save-action]");if(action)handleSaveAction(action.dataset.saveAction,action.dataset.saveId)});
 document.getElementById("lwSaveCreateButton").addEventListener("click",createNamedSaveFromInput);
 document.getElementById("lwSaveCancelCreate").addEventListener("click",()=>{document.getElementById("lwSaveName").value="";if(lwSaveManagerMode==="save")closeSaveManager()});
 document.getElementById("lwCloseSaveManager").addEventListener("click",closeSaveManager);
 document.getElementById("lwImportSave").addEventListener("click",()=>document.getElementById("lwImportSaveInput").click());
 document.getElementById("lwImportSaveInput").addEventListener("change",importSaveFile);
 document.getElementById("lwSaveName").addEventListener("keydown",event=>{if(event.key==="Enter")createNamedSaveFromInput()});
 lwSaveManagerReady=true;updateSaveManagerLanguage()
}
function updateSaveManagerLanguage(){
 if(!lwSaveManagerReady)return;
 document.getElementById("lwSaveTitle").textContent=lwSaveManagerMode==="save"?saveText("SAVE GAME","บันทึกเกม"):saveText("LOAD GAME","โหลดเกม");
 document.getElementById("lwSaveNameLabel").textContent=saveText("Save name","ชื่อบันทึก");
 document.getElementById("lwSaveName").placeholder=saveText("e.g. Before Singapore Flight","เช่น ก่อนออกเดินทางไปสิงคโปร์");
 document.getElementById("lwSaveCreateButton").textContent=saveText("SAVE AS NEW","บันทึกเป็นช่องใหม่");
 document.getElementById("lwSaveCancelCreate").textContent=saveText("CANCEL","ยกเลิก");
 document.getElementById("lwImportSave").textContent=saveText("IMPORT SAVE FILE","นำเข้าไฟล์บันทึก");
 document.getElementById("lwCloseSaveManager").textContent=saveText("CLOSE","ปิด")
}
async function renderSaveManager(){
 const list=document.getElementById("lwSaveList");if(!list)return;list.innerHTML=`<div class="lw-save-empty">${escapeHtml(saveText("Reading saves…","กำลังอ่านข้อมูลบันทึก…"))}</div>`;
 const named=await listNamedSaves();const records=[];const automatic=autoRecord();if(automatic)records.push(automatic);records.push(...named);
 if(!records.length){list.innerHTML=`<div class="lw-save-empty">${escapeHtml(saveText("No saves found.","ยังไม่มีข้อมูลบันทึก"))}</div>`;return}
 list.innerHTML=records.map(record=>{const data=record.data||{};const auto=record.automatic===true;return `<article class="lw-save-card${auto?" auto":""}"><h4>${escapeHtml(record.name)}</h4><div class="lw-save-meta">${escapeHtml(screenLabel(data))}<br>${escapeHtml(formatSaveDate(record.updatedAt||data.time||Date.now()))}</div><div class="lw-save-card-actions"><button class="primary" type="button" data-save-action="load" data-save-id="${escapeHtml(record.id)}">${escapeHtml(saveText("LOAD","โหลด"))}</button><button class="ghost" type="button" data-save-action="export" data-save-id="${escapeHtml(record.id)}">${escapeHtml(saveText("EXPORT","ส่งออก"))}</button>${auto?"":`<button class="ghost danger" type="button" data-save-action="delete" data-save-id="${escapeHtml(record.id)}">${escapeHtml(saveText("DELETE","ลบ"))}</button>`}</div></article>`}).join("")
}
async function openSaveManager(mode="load"){
 injectSaveManager();await migrateLegacyManual();lwSaveManagerMode=mode==="save"?"save":"load";updateSaveManagerLanguage();
 const create=document.getElementById("lwSaveCreate");create.style.display=lwSaveManagerMode==="save"?"block":"none";
 document.getElementById("drawer")?.classList.remove("open");document.getElementById("lwSaveManager").classList.add("open");document.getElementById("lwSaveManager").setAttribute("aria-hidden","false");await renderSaveManager();
 if(lwSaveManagerMode==="save"){const input=document.getElementById("lwSaveName");input.value="";setTimeout(()=>{input.focus();input.select()},80)}
}
function closeSaveManager(){const modal=document.getElementById("lwSaveManager");if(!modal)return;modal.classList.remove("open");modal.setAttribute("aria-hidden","true");document.getElementById("lwImportSaveInput").value=""}
async function createNamedSaveFromInput(){
 const input=document.getElementById("lwSaveName");const name=cleanSaveName(input.value);if(!name){input.focus();return}
 const slots=await listNamedSaves();const existing=slots.find(slot=>slot.name.toLocaleLowerCase()===name.toLocaleLowerCase());
 if(existing&&!window.confirm(saveText("A save with this name already exists. Overwrite it?","มีบันทึกชื่อนี้อยู่แล้ว ต้องการเขียนทับหรือไม่?")))return;
 const now=Date.now();const record={id:existing?.id||newSaveId(),name,createdAt:existing?.createdAt||now,updatedAt:now,data:snapshot()};await putNamedSave(record);await requestPersistentStorage();input.value="";flashSave(saveText("Game saved","บันทึกเกมแล้ว"));await renderSaveManager()
}
async function recordById(id){if(id==="__auto__")return autoRecord();return(await listNamedSaves()).find(item=>item.id===id)||null}
function safeFilename(name){return(cleanSaveName(name)||"Last Witness Save").replace(/\s+/g,"_")+".lwsave"}
async function exportRecord(record){
 if(!record)return;const payload={format:LW_SAVE_FORMAT,version:LW_SAVE_VERSION,exportedAt:Date.now(),slot:{id:record.id==="__auto__"?newSaveId():record.id,name:record.name,createdAt:record.createdAt,updatedAt:record.updatedAt,data:record.data}};
 const blob=new Blob([JSON.stringify(payload,null,2)],{type:"application/json"});const url=URL.createObjectURL(blob);const anchor=document.createElement("a");anchor.href=url;anchor.download=safeFilename(record.name);document.body.appendChild(anchor);anchor.click();anchor.remove();setTimeout(()=>URL.revokeObjectURL(url),1500)
}
function validSaveData(data){return data&&typeof data==="object"&&Number(data.chapter)>=1&&typeof data.screen==="string"&&Array.isArray(data.found||[])}
async function importSaveFile(event){
 const file=event.target.files?.[0];if(!file)return;
 try{
  const parsed=JSON.parse(await file.text());const source=parsed?.format===LW_SAVE_FORMAT&&parsed.slot?parsed.slot:{name:file.name.replace(/\.(lwsave|json)$/i,""),data:parsed};
  if(!validSaveData(source.data))throw new Error("Invalid save data");
  const slots=await listNamedSaves();let name=cleanSaveName(source.name)||saveText("Imported Save","บันทึกที่นำเข้า");const names=new Set(slots.map(slot=>slot.name.toLocaleLowerCase()));if(names.has(name.toLocaleLowerCase())){let n=2;const base=name;while(names.has(`${base} (${n})`.toLocaleLowerCase()))n++;name=`${base} (${n})`}
  const now=Date.now();await putNamedSave({id:newSaveId(),name,createdAt:source.createdAt||now,updatedAt:now,data:source.data});flashSave(saveText("Save imported","นำเข้าบันทึกแล้ว"));await renderSaveManager()
 }catch(error){console.error("LAST WITNESS import failed",error);alert(saveText("This file is not a valid LAST WITNESS save.","ไฟล์นี้ไม่ใช่ข้อมูลบันทึก LAST WITNESS ที่ถูกต้อง"))}finally{event.target.value=""}
}
async function prepareRuntimeFor(data){if(String(data?.screen||"").startsWith("chapter3")){await window.LastWitnessChapter2Integration?.ensureProductionRuntime?.()}}
function applyRestoredSettings(data){
 if(data.language==="th"||data.language==="en")state.language=data.language;if(typeof data.sound==="boolean")state.sound=data.sound;if(Number.isFinite(Number(data.music)))state.music=Math.max(0,Math.min(1,Number(data.music)));if(Number.isFinite(Number(data.sfx)))state.sfx=Math.max(0,Math.min(1,Number(data.sfx)));
 try{document.documentElement.lang=state.language;document.getElementById("soundToggle").checked=state.sound;document.getElementById("musicRange").value=state.music;document.getElementById("sfxRange").value=state.sfx;setVolumes();if(typeof applyLanguage==="function")applyLanguage()}catch(_){}
}
function restore(data){
 if(!validSaveData(data))throw new Error("Invalid save snapshot");
 try{window.LastWitnessChapter3?.stopPhase2Media?.(true)}catch(_){};try{if(typeof closeOverlays==="function")closeOverlays()}catch(_){};
 state.found=new Set(data.found||[]);state.history=data.history||[];state.chapter=data.chapter||1;state.progress=Number(data.progress)||0;state.checkpoint=data.checkpoint||"ch1_start";
 state.characters=Object.assign({Benedict:true,North:state.chapter>=2,Elena:false},data.characters||{});state.relationships=data.relationships||{North:{trust:70,respect:78,attachment:58,suspicion:3}};if(!state.relationships.Elena)state.relationships.Elena={trust:35,respect:52,attachment:18,suspicion:10};
 state.flags=data.flags||{};state.personality=data.personality||{warm:0,observant:0,direct:0};
 const target=data.screen||"crime";const lateChapterTwo=["apartment2","cafe2","police2","forensic2","medical2","chapter2Complete","chapter3Wip","chapter3Office","chapter3Phase2Wip"].includes(target);const journalUnlocked=Boolean(data.journal?.unlocked===true||state.flags.chapter2_character_feature_unlocked===true||Number(state.chapter)>2||lateChapterTwo);
 state.journal=Object.assign({unlocked:journalUnlocked,seen:false,introShown:false},data.journal||{});state.forensic=data.forensic||{};state.medical=data.medical||{};state.chapter3=data.chapter3||{};
 state.lwCharactersUnlocked=Array.isArray(data.lwCharactersUnlocked)?data.lwCharactersUnlocked:[];state.lwCharactersUnread=Array.isArray(data.lwCharactersUnread)?data.lwCharactersUnread:[];state.lwEvidenceUnlocked=Array.isArray(data.lwEvidenceUnlocked)?data.lwEvidenceUnlocked:[];state.lwJournalEnabled=Boolean(data.lwJournalEnabled||journalUnlocked);
 if(state.chapter===2&&!state.flags.police_intro_complete){state.characters.Kittisak=false;state.characters.Somchai=false}
 applyRestoredSettings(data);show(target);
 if(state.chapter===2&&target==="office2")setTimeout(resumeChapter2Office,180);
 else if(state.chapter===2&&target==="apartment2")setTimeout(runApartmentOpening,180);
 else if(state.chapter===2&&target==="cafe2"){state.checkpoint=state.checkpoint||"ch2_cafe_arrival";setTimeout(runCafeOpening,180)}
 else if(state.chapter===2&&target==="police2")setTimeout(runPoliceOpening,180);
 else if(target==="forensic2")setTimeout(()=>window.LastWitnessForensic?.start?.(),120);
 else if(target==="medical2")setTimeout(()=>window.LastWitnessMedicalExaminer?.start?.(),120);
 else if(target.startsWith("chapter3"))setTimeout(()=>window.LastWitnessChapter3?.resumeFromState?.(target),120);
 try{window.LastWitnessContentRegistry?.updateVisibility?.();window.LastWitnessContentRegistry?.renderCharacters?.(true);window.LastWitnessContentRegistry?.updateDots?.()}catch(_){}
}
async function loadRecord(record){if(!record?.data)return;await prepareRuntimeFor(record.data);restore(record.data);closeSaveManager();try{if(typeof closeOverlays==="function")closeOverlays()}catch(_){};flashSave(saveText("Save loaded","โหลดบันทึกแล้ว"))}
async function handleSaveAction(action,id){const record=await recordById(id);if(!record)return;if(action==="load"){await loadRecord(record)}else if(action==="export"){await exportRecord(record)}else if(action==="delete"){if(window.confirm(saveText(`Delete “${record.name}”?`,`ลบ “${record.name}” หรือไม่?`))){await deleteNamedSave(id);await renderSaveManager()}}}
function manualSave(){openSaveManager("save")}
function loadSave(kind){
 if(kind==="manual"){openSaveManager("load");return}
 const raw=localStorage.getItem(SAVE[kind]);if(!raw){alert(L("no_save"));return}
 try{restore(JSON.parse(raw));if(typeof closeOverlays==="function")closeOverlays()}catch(error){console.error("LAST WITNESS load failed",error);alert(saveText("The save could not be loaded.","ไม่สามารถโหลดข้อมูลบันทึกได้"))}
}
function flashSave(text){const element=document.getElementById("saveIndicator");if(!element)return;element.textContent=text;element.classList.add("show");clearTimeout(flashSave.timer);flashSave.timer=setTimeout(()=>element.classList.remove("show"),1100)}
function showBadge(text){const element=document.getElementById("badge");if(!element)return;element.textContent=text;element.classList.add("show");clearTimeout(showBadge.timer);showBadge.timer=setTimeout(()=>element.classList.remove("show"),1500)}

function initSaveManager(){injectSaveManager();const buildLabel=document.getElementById("settingsVersion");if(buildLabel)buildLabel.textContent="LAST WITNESS · BUILD 0.7.6";const resetButton=document.getElementById("devResetSave"),legacyReset=window.devResetSaves;if(resetButton)resetButton.onclick=async()=>{try{legacyReset?.()}catch(_){}await clearNamedSaves();try{localStorage.removeItem(SAVE.auto);localStorage.removeItem(SAVE.manual)}catch(_){}flashSave(saveText("All saves cleared","ลบข้อมูลบันทึกทั้งหมดแล้ว"))};migrateLegacyManual();document.addEventListener("click",event=>{if(event.target.closest?.("[data-lang]"))setTimeout(()=>{updateSaveManagerLanguage();if(document.getElementById("lwSaveManager")?.classList.contains("open"))renderSaveManager()},0)},true);window.LastWitnessSaveManager={open:openSaveManager,list:listNamedSaves,export:exportRecord,importFile:importSaveFile,clearAll:clearNamedSaves,snapshot,restore,version:LW_SAVE_BUILD}}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",initSaveManager,{once:true});else initSaveManager();

PORTRAITS.Elena={"neutral":"assets/images/f6ecc87ac62112b6.jpg","soft":"assets/images/0b58d037372b3893.jpg","warm":"assets/images/3717ee1601191df6.jpg","thinking":"assets/images/17dc23af74dd7be5.jpg","curious":"assets/images/45cdccdac98f15a4.jpg","attentive":"assets/images/ca489d84591703e2.jpg","skeptical":"assets/images/14251628ba5d808c.jpg","smirk":"assets/images/bedce8e0dbb90d49.jpg","confident":"assets/images/798d0dbcf7dc7040.jpg","serious":"assets/images/94c43ae882e43c69.jpg","concerned":"assets/images/258f1557b5b1d98e.jpg","surprised":"assets/images/7e5f812b3c7eec9e.jpg","shocked":"assets/images/54fa2709eff69d56.jpg","worried":"assets/images/39bae3b954927ff5.jpg","sad":"assets/images/c91ad48a8b115dce.jpg","disappointed":"assets/images/cd01390acb6b500a.jpg","embarrassed":"assets/images/2ad821b6a881a4c0.jpg","amused":"assets/images/5b2f58b400414246.jpg","laughing":"assets/images/a192e652ca70c9db.jpg","determined":"assets/images/e77228fe9ffb3470.jpg","calm":"assets/images/8d5572a029fa0d78.jpg","playful":"assets/images/11558d3825786804.jpg","charming":"assets/images/87fb1e543d974f07.jpg","mysterious":"assets/images/33e95d83dec5c517.jpg"};
const JOURNAL_PORTRAITS={Elena:{"neutral":"assets/images/f6ecc87ac62112b6.jpg","soft":"assets/images/0b58d037372b3893.jpg","warm":"assets/images/3717ee1601191df6.jpg","thinking":"assets/images/17dc23af74dd7be5.jpg","curious":"assets/images/45cdccdac98f15a4.jpg","attentive":"assets/images/ca489d84591703e2.jpg","skeptical":"assets/images/14251628ba5d808c.jpg","smirk":"assets/images/bedce8e0dbb90d49.jpg","confident":"assets/images/798d0dbcf7dc7040.jpg","serious":"assets/images/94c43ae882e43c69.jpg","concerned":"assets/images/258f1557b5b1d98e.jpg","surprised":"assets/images/7e5f812b3c7eec9e.jpg","shocked":"assets/images/54fa2709eff69d56.jpg","worried":"assets/images/39bae3b954927ff5.jpg","sad":"assets/images/c91ad48a8b115dce.jpg","disappointed":"assets/images/cd01390acb6b500a.jpg","embarrassed":"assets/images/2ad821b6a881a4c0.jpg","amused":"assets/images/5b2f58b400414246.jpg","laughing":"assets/images/a192e652ca70c9db.jpg","determined":"assets/images/e77228fe9ffb3470.jpg","calm":"assets/images/8d5572a029fa0d78.jpg","playful":"assets/images/11558d3825786804.jpg","charming":"assets/images/87fb1e543d974f07.jpg","mysterious":"assets/images/33e95d83dec5c517.jpg"}};
Object.assign(PORTRAITS,{Kittisak:{neutral:"assets/images/8b34fe5c26f1292e.png",smile:"assets/images/abfdadf0fe1aa1fa.png",thinking:"assets/images/42680de18fd5cf19.png",serious:"assets/images/373da6e479378856.png"},Somchai:{neutral:"assets/images/fd3e65df3ccfc9b2.png",flirty:"assets/images/f5fe30e1f7bcbfa6.png",joking:"assets/images/f3898e8324f35720.png",surprised:"assets/images/dc5c671820c2c534.png",rejected:"assets/images/901cc042184f4edb.png"}});
Object.assign(JOURNAL_PORTRAITS,{Kittisak:{neutral:"assets/images/8b34fe5c26f1292e.png"},Somchai:{neutral:"assets/images/fd3e65df3ccfc9b2.png"}});
