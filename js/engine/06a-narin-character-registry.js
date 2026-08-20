/* LAST WITNESS - Narin Character Journal Integration 0.22.22-nj12
 * Surgical Chapter V Phase II bridge for the legacy Character Journal allowlist.
 * Narin remains story-gated to completed secure contact; existing characters/rendering
 * are untouched. The extension augments only Narin's card/detail and unread state.
 */
(function(){
"use strict";
const VERSION="0.22.22-nj12";
if(window.LastWitnessNarinCharacterRegistry?.version===VERSION&&window.LastWitnessNarinCharacterRegistry?.installed){try{window.LastWitnessNarinCharacterRegistry.repair?.()}catch(_){}return}
const THUMB_SRC="assets/images/chapter-05/phase-02/narin-journal.png?v=0242nj12";
const DATA={
 name:{en:"Narin",th:"Narin"},
 role:{en:"Bangkok Deployment Operations",th:"ฝ่ายปฏิบัติการ Deployment กรุงเทพฯ"},
 status:{en:"Active Scrutiny",th:"อยู่ระหว่างการตรวจเชิงรุก"},
 bio:{en:"A trusted Bangkok deployment actor with real access and real record-concealment exposure. Phase II makes his operational proximity serious evidence without treating it as proof of murder.",th:"บุคคลฝั่งงาน Deployment กรุงเทพฯ ที่ได้รับความไว้วางใจ มีสิทธิ์เข้าถึงจริง และมีความเสี่ยงจากการปกปิดบันทึกจริง เฟส II ทำให้ความใกล้ชิดเชิงปฏิบัติการของเขากลายเป็นหลักฐานสำคัญ โดยยังไม่ถือว่าเป็นหลักฐานฆาตกรรม"},
 src:"assets/images/chapter-05/phase-02/narin-neutral.png?v=0231c5p2r7",
 relation:{value:31},
 metrics:[
  {key:"access",label:{en:"Operational Access",th:"สิทธิ์เข้าถึงเชิงปฏิบัติการ"},value:82},
  {key:"disclosure",label:{en:"Disclosure Confidence",th:"ความน่าเชื่อถือในการเปิดเผยข้อมูล"},value:28},
  {key:"record",label:{en:"Record Integrity Concern",th:"ความกังวลด้านความสมบูรณ์ของบันทึก"},value:88}
 ]
};
const $=(s,r=document)=>r.querySelector(s);const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
function gs(){try{return state}catch(_){return window.state||null}}
function api(){return window.LastWitnessContentRegistry}
function thai(){return gs()?.language==="th"||document.documentElement.lang==="th"}
function text(pair){return pair?.[thai()?"th":"en"]||pair?.en||""}
function journalUnlocked(){const s=gs(),p=s?.flags?.ch5_p2;return Boolean(s&&(s.flags?.ch5_p2_narin_journal_unlocked===true||p?.narinJournalUnlocked===true))}
function contactComplete(){const s=gs(),p=s?.flags?.ch5_p2;return Boolean(s&&(p?.narinContactComplete===true||p?.complete===true||s.flags?.ch5_p2_narin_contact_complete===true||s.flags?.ch5_p2_complete===true))}
function eligible(){return Boolean(journalUnlocked()||contactComplete())}
function register(){const a=api();if(!a?.characters)return false;a.characters.narin=DATA;return true}
function present(){return journalUnlocked()}
function setStoryFlags(unread=true){const s=gs();if(!s)return false;s.flags=s.flags||{};s.flags.ch5_p2=s.flags.ch5_p2&&typeof s.flags.ch5_p2==="object"?s.flags.ch5_p2:{};s.flags.ch5_p2_narin_journal_unlocked=true;s.flags.ch5_p2.narinJournalUnlocked=true;s.flags.ch5_p2_narin_journal_unread=unread===true;s.characters=s.characters||{};s.characters.Narin=true;return true}
function relationSummary(){return`<div class="relation-summary"><div class="relation-label-row"><span>${thai()?"ความสัมพันธ์":"Relationship"}</span><strong>${DATA.relation.value}%</strong></div><div class="relation-bar"><div class="relation-fill" style="width:${DATA.relation.value}%"></div></div></div>`}
function metricMarkup(){return`<div class="relation-metrics">${DATA.metrics.map(m=>`<div class="relation-metric"><div class="relation-metric-head"><span>${text(m.label)}</span><strong>${m.value}%</strong></div><div class="relation-bar"><div class="relation-fill" style="width:${m.value}%"></div></div></div>`).join("")}</div>`}
function ensureNarinDetailStyle(){
 if($("#lwNarinJournalDetailStyle"))return true;const style=document.createElement("style");style.id="lwNarinJournalDetailStyle";style.textContent=`
 #characterDetail [data-narin-detail="1"] .character-detail-head{align-items:flex-start;gap:14px}
 #characterDetail [data-narin-detail="1"] [data-detail-portrait-frame]{width:138px;height:173px;flex:0 0 138px;overflow:hidden;border-radius:11px;background:#090a0e}
 #characterDetail [data-narin-detail="1"] [data-detail-portrait]{display:block;width:100%!important;height:100%!important;max-width:none!important;object-fit:cover!important;object-position:center center!important;transform:scale(1.90);transform-origin:50% 50%;border-radius:0!important;margin:0!important}
 @media(max-width:390px){#characterDetail [data-narin-detail="1"] [data-detail-portrait-frame]{width:132px;height:165px;flex-basis:132px}}
 `;document.head.appendChild(style);return true
}
function showDetail(){
 ensureNarinDetailStyle();const grid=$("#characterGrid"),detail=$("#characterDetail"),back=$("#charactersBack");if(!detail)return false;
 detail.innerHTML=`<div data-detail-shell data-narin-detail="1"><div class="character-detail-head"><div data-detail-portrait-frame><img data-detail-portrait alt="" width="512" height="640" loading="eager" decoding="async"></div><div><div class="character-name" data-detail-name></div><div class="character-status" data-detail-status></div></div></div><div data-detail-metrics></div><div class="character-notes" data-detail-notes></div></div>`;
 const image=detail.querySelector("[data-detail-portrait]");if(image)image.src=DATA.src;detail.querySelector("[data-detail-name]").textContent=text(DATA.name);detail.querySelector("[data-detail-status]").textContent=text(DATA.role);detail.querySelector("[data-detail-metrics]").innerHTML=metricMarkup();detail.querySelector("[data-detail-notes]").textContent=text(DATA.bio);if(grid)grid.style.display="none";detail.style.display="block";if(back)back.style.display="block";return true
}
let injecting=false,observer=null,modalObserver=null;
function ensureCard(){
 if(!journalUnlocked()||injecting)return false;register();const grid=$("#characterGrid");if(!grid)return false;if(grid.querySelector('[data-character="narin"]'))return true;
 injecting=true;try{const button=document.createElement("button");button.type="button";button.className="character-card";button.dataset.character="narin";button.dataset.narinJournal="1";button.innerHTML=`<img src="${THUMB_SRC}" alt="" width="512" height="640" loading="eager" decoding="async" data-character-image="narin" style="object-fit:cover;object-position:center center"><div class="character-name">${text(DATA.name)}</div><div class="character-status">${text(DATA.status)}</div>${relationSummary()}`;button.addEventListener("click",event=>{event.preventDefault();event.stopPropagation();showDetail()});grid.appendChild(button)}finally{injecting=false}syncDot();return true
}
function syncDot(){const s=gs();if(!s)return;const own=journalUnlocked()&&s.flags?.ch5_p2_narin_journal_unread===true;const legacy=Array.isArray(s.lwCharactersUnread)&&s.lwCharactersUnread.length>0&&s.journal?.seen===false;$$('.journal-alert').forEach(node=>node.classList.toggle('show',Boolean(own||legacy)))}
function persist(){try{typeof autoSave==="function"&&autoSave()}catch(_){} }
function markRead(){const s=gs();if(!s?.flags)return;s.flags.ch5_p2_narin_journal_unread=false;syncDot();persist()}
function ensureUnlocked(opt={}){
 if(!register())return false;const s=gs(),a=api();if(!s||!a||!contactComplete())return false;const wasUnlocked=journalUnlocked(),unread=opt.forceUnread===true?true:(opt.unread!==false&&!wasUnlocked);setStoryFlags(unread);
 /* Best-effort base registration is retained for future registry versions, but
    visibility does not depend on the legacy fixed allowlist. */
 try{a.unlockCharacter?.("narin",{unread:opt.unread!==false,source:opt.source||"story",quiet:true})}catch(_){}
 ensureCard();syncDot();return true
}
function revokePrematureStoryUnlock(){const s=gs(),p=s?.flags?.ch5_p2;if(!s||!p||contactComplete()||!journalUnlocked())return false;s.flags.ch5_p2_narin_journal_unlocked=false;p.narinJournalUnlocked=false;s.flags.ch5_p2_narin_journal_unread=false;s.flags.ch5_p2_narin_journal_notified=false;if(Array.isArray(s.lwCharactersUnlocked))s.lwCharactersUnlocked=s.lwCharactersUnlocked.filter(id=>id!=="narin");if(Array.isArray(s.lwCharactersUnread))s.lwCharactersUnread=s.lwCharactersUnread.filter(id=>id!=="narin");if(s.characters)delete s.characters.Narin;$("#characterGrid [data-character='narin']")?.remove();syncDot();return true}
function repair(){if(!register())return false;if(!contactComplete()&&journalUnlocked())revokePrematureStoryUnlock();if(!eligible())return true;if(!journalUnlocked())return ensureUnlocked({unread:true,source:"story",quiet:true});setStoryFlags(gs()?.flags?.ch5_p2_narin_journal_unread===true);ensureCard();syncDot();return true}
function journalOpen(){return Boolean($("#charactersModal")?.classList.contains("open"))}
function onJournalOpened(){if(!journalOpen())return;ensureCard();markRead()}
function watchGrid(){const grid=$("#characterGrid");if(!grid||observer)return;observer=new MutationObserver(()=>{if(journalUnlocked()&&!grid.querySelector('[data-character="narin"]'))queueMicrotask(ensureCard);if(journalOpen()&&journalUnlocked())queueMicrotask(onJournalOpened)});observer.observe(grid,{childList:true})}
function watchJournalModal(){const modal=$("#charactersModal");if(!modal||modalObserver)return;modalObserver=new MutationObserver(()=>{if(modal.classList.contains("open")&&journalUnlocked())queueMicrotask(onJournalOpened)});modalObserver.observe(modal,{attributes:true,attributeFilter:["class"]});if(modal.classList.contains("open")&&journalUnlocked())queueMicrotask(onJournalOpened)}
function afterJournalOpen(){setTimeout(onJournalOpened,0);setTimeout(()=>{ensureCard();if(journalOpen())markRead()},80)}
function schedule(){ensureNarinDetailStyle();[0,80,220,600,1400,3000].forEach(ms=>setTimeout(()=>{register();watchGrid();watchJournalModal();repair()},ms))}
document.addEventListener("click",event=>{if(event.target.closest?.("#charactersButton"))afterJournalOpen();if(event.target.closest?.("[data-lang]"))setTimeout(()=>{if(journalUnlocked()){const old=$("#characterGrid [data-character='narin']");if(old)old.remove();ensureCard();if($("#characterDetail [data-narin-detail='1']"))showDetail()}},0)},true);
window.LastWitnessNarinCharacterRegistry={version:VERSION,installed:true,register,ensureUnlocked,repair,present,eligible,contactComplete,revokePrematureStoryUnlock,ensureCard,syncDot,showDetail,watchJournalModal};
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",schedule,{once:true});else schedule();window.addEventListener("pageshow",()=>setTimeout(()=>{repair();watchGrid();watchJournalModal()},40));document.addEventListener("visibilitychange",()=>{if(!document.hidden)setTimeout(repair,60)});
})();
