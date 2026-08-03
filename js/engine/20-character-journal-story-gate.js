/* LAST WITNESS — Character Discovery Contract 0.17.5
 * Authoritative Journal timing guard for every implemented story character.
 *
 * Contract:
 * 1. Chapter I never exposes Character Journal or unread dots.
 * 2. Chapter II exposes the Journal only after North's first conversation ends.
 * 3. A new character is unlocked after their first introduction dialogue ends.
 * 4. A first story unlock produces one notification and one unread red dot.
 * 5. Opening Character Journal clears the unread dot.
 * 6. Developer unlocks are silent and never create unread dots.
 *
 * This layer uses the active screen as story authority. state.chapter is only a
 * fallback because restored or partially-reset saves can carry a stale chapter.
 */
(function(){
"use strict";
const VERSION="0.17.5";
if(window.LastWitnessCharacterJournalStoryGate?.version===VERSION&&window.LastWitnessCharacterJournalStoryGate?.installed)return;

const $=(selector,root=document)=>root.querySelector(selector);
const $$=(selector,root=document)=>Array.from(root.querySelectorAll(selector));
const gs=()=>{try{return state}catch(_){return window.state||null}};
const active=()=>$(".screen.active")?.id||gs()?.screen||"";
const normal=value=>String(value||"").trim().toLowerCase();

const CHAPTER_ONE=new Set(["office","crime","phone","summary","deduction"]);
const CHAPTER_TWO=new Set(["office2","apartment2","cafe2","police2","forensic2","medical2","chapter2Complete"]);
const NON_STORY=new Set(["","splash","title","chapterIntro"]);

const CONTRACTS={
 north:{screens:new Set(["office2"]),aliases:["north","นอร์ธ"],kind:"north"},
 elena:{screens:new Set(["cafe2"]),aliases:["elena","เอเลนา"]},
 somchai:{screens:new Set(["police2"]),aliases:["somchai","สมชาย"],kind:"police"},
 kittisak:{screens:new Set(["police2"]),aliases:["kittisak","kittisak siriwat","กิตติศักดิ์","กิตติศักดิ์ ศิริวัฒน์"],kind:"police"},
 ratchata:{screens:new Set(["medical2"]),aliases:["ratchata","ratchata (dr. singh)","รัชตะ","ดร. ซิงห์"]},
 cheryl:{screens:new Set(["chapter3SingaporeOffice"]),aliases:["inspector cheryl goh","cheryl goh","สารวัตร cheryl goh"]},
 farid:{screens:new Set(["chapter3SingaporeOffice"]),aliases:["farid rahman","farid rahman (spf)","ฟาริด ราห์มาน"]},
 adrian:{screens:new Set(["chapter3HawkerCentre"]),aliases:["adrian tan","adrian tan wei ming"]},
 maya:{screens:new Set(["jakartaAirport"]),aliases:["inspector maya pranoto","maya pranoto","สารวัตร maya pranoto"]},
 arman:{screens:new Set(["armanWorkshop"]),aliases:["arman suryadi"]}
};
const CONTRACT_IDS=Object.keys(CONTRACTS);

let devUnlockSession=false;
let apiWrapped=false;
let showBadgeWrapped=false;
let syncQueued=false;
let bodyObserver=null;
let dialogueObserver=null;
let originalUnlockCharacter=null;
let originalUpdateVisibility=null;
let originalUpdateDots=null;
let originalUnlockChapter2North=null;
let originalUnlockPoliceCast=null;
let originalShowBadge=null;
let internalFinalizeDepth=0;
let lastEarlySanitizeKey="";
const dialogueSessions=new WeakMap();
const pendingIntroductions=new Set();
const confirmedDiscoveries=new Set();
const notificationLog=[];

function screenChapter(screen=active()){
 if(NON_STORY.has(screen))return 0;
 if(CHAPTER_ONE.has(screen))return 1;
 if(CHAPTER_TWO.has(screen))return 2;
 if(screen.startsWith("chapter3"))return 3;
 if(screen.startsWith("chapter4")||screen.startsWith("jakarta")||screen.startsWith("arman"))return 4;
 const fallback=Number(gs()?.chapter||0);
 return Number.isFinite(fallback)?fallback:0
}
function northJournalUnlocked(){return gs()?.flags?.chapter2_character_feature_unlocked===true}
function isDevModeState(){return gs()?.flags?.developer_character_unlock_all===true}
function storyAllowsJournal(){
 const chapter=screenChapter();
 if(devUnlockSession)return true;
 if(chapter>=3)return true;
 return chapter===2&&northJournalUnlocked()
}
function earlyStoryGate(){
 if(devUnlockSession)return false;
 const chapter=screenChapter();
 return chapter===1||(chapter===2&&!northJournalUnlocked())
}
function shouldHideOutsideStory(){return screenChapter()===0&&!devUnlockSession}
function setButtonVisible(button,visible){
 if(!button)return;
 const mode=visible?"1":"0";
 const actual=Boolean(!button.hidden&&button.style.display!=="none"&&button.style.visibility!=="hidden");
 if(button.dataset.lwCharacterContractVisible===mode&&actual===visible)return;
 button.dataset.lwCharacterContractVisible=mode;
 button.hidden=!visible;button.disabled=!visible;button.toggleAttribute("aria-hidden",!visible);
 if(visible){
  button.removeAttribute("hidden");
  button.style.setProperty("display","block","important");
  button.style.setProperty("visibility","visible","important");
  button.style.setProperty("opacity","1","important");
  button.style.setProperty("pointer-events","auto","important");
  ["height","overflow","margin-top","min-height","padding","border"].forEach(name=>button.style.removeProperty(name))
 }else{
  button.style.setProperty("display","none","important");
  button.style.setProperty("visibility","hidden","important");
  button.style.setProperty("opacity","0","important");
  button.style.setProperty("pointer-events","none","important");
  button.style.setProperty("margin-top","0","important");
  button.style.setProperty("min-height","0","important");
  button.style.setProperty("height","0","important");
  button.style.setProperty("padding","0","important");
  button.style.setProperty("border","0","important");
  button.style.setProperty("overflow","hidden","important")
 }
}
function enforceDOM(){
 const allowed=storyAllowsJournal(),s=gs();
 setButtonVisible($("#charactersButton"),allowed);
 const showDot=Boolean(allowed&&Array.isArray(s?.lwCharactersUnread)&&s.lwCharactersUnread.length>0&&s?.journal?.seen===false);
 $$(".journal-alert").forEach(dot=>dot.classList.toggle("show",showDot));
 return allowed
}
function forbiddenEarlyState(){
 const s=gs();if(!s)return false;
 const unlocked=Array.isArray(s.lwCharactersUnlocked)?s.lwCharactersUnlocked:[];
 const unread=Array.isArray(s.lwCharactersUnread)?s.lwCharactersUnread:[];
 return Boolean(
  northJournalUnlocked()||s.lwJournalEnabled===true||s.journal?.unlocked===true||unread.length||
  unlocked.some(id=>id!=="benedict")||s.flags?.developer_character_unlock_all===true||
  s.flags?.ch4_arman_identity_verified===true
 )
}
function sanitizeEarlyStory(force=false){
 const api=window.LastWitnessContentRegistry,s=gs();
 if(!api||!s||!earlyStoryGate())return false;
 const key=active()+"|"+String(s.checkpoint||"")+"|"+String(s.flags?.chapter2_character_feature_unlocked);
 if(!force&&!forbiddenEarlyState()&&lastEarlySanitizeKey===key)return false;
 lastEarlySanitizeKey=key;
 try{api.resetForChapter2?.()}catch(error){console.error("LAST WITNESS Character Journal early-story reset failed",error)}
 s.flags=s.flags||{};
 delete s.flags.developer_character_unlock_all;
 delete s.flags.ch4_arman_identity_verified;
 s.lwJournalEnabled=false;
 s.lwCharactersUnlocked=Array.isArray(s.lwCharactersUnlocked)?s.lwCharactersUnlocked.filter(id=>id==="benedict"):[];
 s.lwCharactersUnread=[];
 s.characters=s.characters||{};
 for(const name of ["North","Elena","Somchai","Kittisak","Ratchata","Cheryl Goh","Farid Rahman","Adrian Tan","Inspector Maya Pranoto","Arman Suryadi"])s.characters[name]=false;
 s.journal=Object.assign(s.journal||{},{unlocked:false,seen:true,introShown:false});
 pendingIntroductions.clear();
 confirmedDiscoveries.clear();
 try{api.renderCharacters?.(true);api.updateDots?.()}catch(_){}
 enforceDOM();
 return true
}
function characterIdFromText(text){
 const value=normal(text);
 if(!value)return"";
 for(const [id,contract] of Object.entries(CONTRACTS)){
  if(contract.aliases.some(alias=>value===normal(alias)||value.startsWith(normal(alias)+" ")||value.includes(normal(alias))))return id
 }
 return""
}
function sessionScreenAllowed(id,screen){return Boolean(CONTRACTS[id]?.screens?.has(screen))}
function characterDialogueCurrentlyOpen(id){
 return $$(".dialogue").some(box=>dialogueVisible(box)&&characterIdFromText(box.querySelector(".speaker")?.textContent||"")===id)
}
function characterUnlocked(id){return Boolean(gs()?.lwCharactersUnlocked?.includes?.(id))}
function removePrematureUnlock(id){
 const s=gs();if(!s||!CONTRACT_IDS.includes(id))return;
 if(Array.isArray(s.lwCharactersUnlocked))s.lwCharactersUnlocked=s.lwCharactersUnlocked.filter(value=>value!==id);
 if(Array.isArray(s.lwCharactersUnread))s.lwCharactersUnread=s.lwCharactersUnread.filter(value=>value!==id);
 if(id==="arman"){
  if(s.characters)s.characters["Arman Suryadi"]=false;
  if(s.flags)delete s.flags.ch4_arman_identity_verified
 }
 if(id==="maya"&&s.characters)s.characters["Inspector Maya Pranoto"]=false;
}
function dialogueVisible(box){
 if(!box||box.classList.contains("hidden")||box.hidden)return false;
 const style=getComputedStyle(box);return style.display!=="none"&&style.visibility!=="hidden"
}
function recordDialogue(box){
 if(!box?.classList?.contains("dialogue"))return;
 const visible=dialogueVisible(box),speaker=box.querySelector(".speaker")?.textContent||"",id=characterIdFromText(speaker);
 let session=dialogueSessions.get(box);
 if(visible){
  if(!session){session={screen:box.closest(".screen")?.id||active(),ids:new Set(),startedAt:Date.now()};dialogueSessions.set(box,session)}
  if(id&&sessionScreenAllowed(id,session.screen)&&!confirmedDiscoveries.has(id)){
   session.ids.add(id);pendingIntroductions.add(id);
   if(characterUnlocked(id)){removePrematureUnlock(id);try{window.LastWitnessContentRegistry?.renderCharacters?.(true)}catch(_){}}
  }
  return
 }
 if(session){
  dialogueSessions.delete(box);
  for(const discoveredId of session.ids)pendingIntroductions.delete(discoveredId);
  finalizeSession(session)
 }
}
function finalizeSession(session){
 if(!session?.ids?.size)return;
 queueMicrotask(()=>{
  const ids=[...session.ids].filter(id=>sessionScreenAllowed(id,session.screen));
  if(ids.includes("north"))finalizeCharacter("north",session.screen);
  if(ids.includes("somchai")||ids.includes("kittisak"))finalizePolice(session.screen);
  for(const id of ids){if(id!=="north"&&id!=="somchai"&&id!=="kittisak")finalizeCharacter(id,session.screen)}
  queueSync()
 })
}
function validArmanContext(){
 const p=gs()?.chapter4?.phase4,stage=String(p?.stage||"");
 return active()==="armanWorkshop"&&p?.started===true&&p?.revealComplete===true&&!pendingIntroductions.has("arman")&&!['proxy-reveal','reveal','arman-intro'].includes(stage)
}
function validUnlockContext(id,screen=active()){
 if(devUnlockSession)return true;
 if(!CONTRACT_IDS.includes(id))return true;
 if(!sessionScreenAllowed(id,screen))return false;
 if(id==="arman")return validArmanContext();
 return !pendingIntroductions.has(id)&&!characterDialogueCurrentlyOpen(id)
}
function finalizeCharacter(id,screen){
 const api=window.LastWitnessContentRegistry;if(!api||!sessionScreenAllowed(id,screen))return false;
 if(id==="arman"&&!validArmanContext())return false;
 if(characterUnlocked(id)){confirmedDiscoveries.add(id);return false}
 internalFinalizeDepth++;
 try{
  const fresh=id==="north"?Boolean(api.unlockChapter2North?.({showToast:true})):Boolean(api.unlockCharacter?.(id,{unread:true,source:"story"}));
  if(characterUnlocked(id))confirmedDiscoveries.add(id);
  return fresh
 }finally{internalFinalizeDepth--}
}
function finalizePolice(screen){
 const api=window.LastWitnessContentRegistry;
 if(!api||screen!=="police2")return false;
 if(characterUnlocked("somchai")&&characterUnlocked("kittisak")){confirmedDiscoveries.add("somchai");confirmedDiscoveries.add("kittisak");return false}
 internalFinalizeDepth++;
 try{
  const fresh=Boolean(api.unlockPoliceCast?.());
  if(characterUnlocked("somchai"))confirmedDiscoveries.add("somchai");
  if(characterUnlocked("kittisak"))confirmedDiscoveries.add("kittisak");
  return fresh
 }finally{internalFinalizeDepth--}
}
function characterNotification(text){
 const value=normal(text);
 if(!value)return"";
 if(value.includes("character added")||value.includes("เพิ่มตัวละคร")||value.includes("character journal updated")||value.includes("อัปเดต character journal"))return characterIdFromText(value)||"character";
 return""
}
function wrapShowBadge(){
 if(showBadgeWrapped||typeof window.showBadge!=="function")return false;
 originalShowBadge=window.showBadge.bind(window);
 window.showBadge=function(message,...rest){
  const id=characterNotification(message);
  if(id){
   const invalid=devUnlockSession||earlyStoryGate()||shouldHideOutsideStory()||(id!=="character"&&!validUnlockContext(id));
   if(invalid){notificationLog.push({message:String(message),screen:active(),suppressed:true,time:Date.now()});return false}
   notificationLog.push({message:String(message),screen:active(),suppressed:false,time:Date.now()})
  }
  return originalShowBadge(message,...rest)
 };
 window.showBadge.__lwCharacterContract=VERSION;showBadgeWrapped=true;return true
}
function wrapAPI(){
 const api=window.LastWitnessContentRegistry;if(!api)return false;
 if(!apiWrapped){
  originalUnlockCharacter=api.unlockCharacter?.bind(api)||null;
  originalUpdateVisibility=api.updateVisibility?.bind(api)||null;
  originalUpdateDots=api.updateDots?.bind(api)||null;
  originalUnlockChapter2North=api.unlockChapter2North?.bind(api)||null;
  originalUnlockPoliceCast=api.unlockPoliceCast?.bind(api)||null;
  if(originalUnlockCharacter){
   const wrapped=function(id,opt={}){
    const source=opt?.source||"";
    if(source==="dev"&&!devUnlockSession)return false;
    if(source==="story"&&CONTRACT_IDS.includes(id)&&internalFinalizeDepth===0){
     if(!validUnlockContext(id))return false
    }
    const result=originalUnlockCharacter(id,opt);queueSync();return result
   };
   wrapped.__lwCharacterContract=VERSION;api.unlockCharacter=wrapped
  }

  if(originalUnlockChapter2North){
   api.unlockChapter2North=function(options={}){
    if(!devUnlockSession&&internalFinalizeDepth===0&&(active()!=="office2"||pendingIntroductions.has("north")))return false;
    const result=originalUnlockChapter2North(options);queueSync();return result
   }
  }
  if(originalUnlockPoliceCast){
   api.unlockPoliceCast=function(...args){
    if(!devUnlockSession&&internalFinalizeDepth===0&&(active()!=="police2"||pendingIntroductions.has("somchai")||pendingIntroductions.has("kittisak")))return false;
    const result=originalUnlockPoliceCast(...args);queueSync();return result
   }
  }
  if(originalUpdateVisibility)api.updateVisibility=function(){const result=originalUpdateVisibility();enforceDOM();return result};
  if(originalUpdateDots)api.updateDots=function(){const result=originalUpdateDots();enforceDOM();return result};
  apiWrapped=true
 }
 wrapShowBadge();return true
}
function scanDialogues(){
 $$(".dialogue").forEach(recordDialogue);
 for(const id of pendingIntroductions){
  if(characterUnlocked(id)){removePrematureUnlock(id);try{window.LastWitnessContentRegistry?.renderCharacters?.(true)}catch(_){}}
 }
}
function auditCharacters(){
 const s=gs(),screen=active();
 return Object.fromEntries(CONTRACT_IDS.map(id=>[id,{
  unlocked:Boolean(s?.lwCharactersUnlocked?.includes?.(id)),
  unread:Boolean(s?.lwCharactersUnread?.includes?.(id)),
  pending:pendingIntroductions.has(id),confirmed:confirmedDiscoveries.has(id),
  validHere:validUnlockContext(id,screen),
  screens:[...CONTRACTS[id].screens]
 }]))
}
function sync(){
 syncQueued=false;wrapAPI();scanDialogues();
 if(earlyStoryGate())sanitizeEarlyStory();else lastEarlySanitizeKey="";
 if(devUnlockSession)for(const id of gs()?.lwCharactersUnlocked||[])if(CONTRACT_IDS.includes(id))confirmedDiscoveries.add(id);
 enforceDOM()
}
function queueSync(){
 if(syncQueued)return;syncQueued=true;
 requestAnimationFrame(()=>{sync();setTimeout(sync,70)})
}
function markExplicitDevUnlock(){
 devUnlockSession=true;lastEarlySanitizeKey="";
 try{sessionStorage.setItem("lastWitness.devCharacterUnlockSession","1")}catch(_){}
 queueSync()
}
function clearDevSession(){
 devUnlockSession=false;lastEarlySanitizeKey="";
 try{sessionStorage.removeItem("lastWitness.devCharacterUnlockSession")}catch(_){}
 queueSync()
}
function bindClicks(){
 document.addEventListener("click",event=>{
  if(event.target.closest?.("#devUnlockCharacters")){markExplicitDevUnlock();return}
  if(event.target.closest?.("#newGame,#restart")){clearDevSession();setTimeout(()=>sanitizeEarlyStory(true),80);return}
  if(event.target.closest?.("#charactersButton")&&!storyAllowsJournal()){
   event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();enforceDOM();return
  }
  setTimeout(queueSync,0)
 },true)
}
function bindObservers(){
 bodyObserver?.disconnect();dialogueObserver?.disconnect();
 bodyObserver=new MutationObserver(queueSync);
 bodyObserver.observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:["class","hidden","style"]});
 dialogueObserver=new MutationObserver(records=>{
  const boxes=new Set();
  for(const record of records){const box=record.target.closest?.(".dialogue")||(record.target.classList?.contains("dialogue")?record.target:null);if(box)boxes.add(box)}
  boxes.forEach(recordDialogue);queueSync()
 });
 $$(".dialogue").forEach(box=>dialogueObserver.observe(box,{subtree:true,childList:true,attributes:true,attributeFilter:["class","hidden","style"]}))
}
function bind(){
 try{devUnlockSession=sessionStorage.getItem("lastWitness.devCharacterUnlockSession")==="1"}catch(_){}
 for(const id of gs()?.lwCharactersUnlocked||[])if(CONTRACT_IDS.includes(id))confirmedDiscoveries.add(id);
 wrapAPI();bindClicks();bindObservers();sync();
 window.LastWitnessCharacterJournalStoryGate={
  installed:true,version:VERSION,sync,storyAllowsJournal,earlyStoryGate,screenChapter,
  markExplicitDevUnlock,clearDevSession,auditCharacters,
  contractStatus:()=>({
   effectiveChapter:screenChapter(),stateChapter:Number(gs()?.chapter||0),screen:active(),northUnlocked:northJournalUnlocked(),
   developerSession:devUnlockSession,allowed:storyAllowsJournal(),
   buttonVisible:Boolean($("#charactersButton")&&!$("#charactersButton").hidden&&getComputedStyle($("#charactersButton")).display!=="none"),
   redDots:$$(".journal-alert.show").length,pending:[...pendingIntroductions],confirmed:[...confirmedDiscoveries],notifications:[...notificationLog]
  })
 }
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",bind,{once:true});else bind();
})();
