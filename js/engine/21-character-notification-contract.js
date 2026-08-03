/* LAST WITNESS — Scoped Character Notification Contract 0.17.9
 * Repairs owner-reported Character Journal notification gaps without replacing
 * the Character Registry, show(), showBadge(), Save Manager or chapter owners.
 *
 * Scope:
 * - Somchai + Kittisak: perform the existing Registry story unlock immediately
 *   after the first Police Station introduction dialogue finishes.
 * - Adrian: repair the Phase VII recovery race so first verified discovery owns
 *   one Character Added toast and one unread dot, including affected old saves.
 * - Arman: keep the existing one-time notification visible above the Phase IV
 *   choice modal while preserving the existing unread-dot and Save/Load state.
 */
(function(){
"use strict";
const VERSION="0.17.9";
if(window.LastWitnessCharacterNotificationContract?.version===VERSION&&window.LastWitnessCharacterNotificationContract?.installed)return;

const $=(selector,root=document)=>root.querySelector(selector);
const gs=()=>{try{return state}catch(_){return window.state||null}};
const POLICE_SCREEN="police2";
const POLICE_DIALOGUE="#policeDialogue";
const POLICE_IDS=["somchai","kittisak"];
const ADRIAN_SCREEN="chapter3HawkerCentre";
const ADRIAN_DIALOGUE="#ch3P7Dialogue";
const ADRIAN_ID="adrian";
const ADRIAN_NAME="Adrian Tan Wei Ming";
const ADRIAN_NOTIFICATION_FLAG="lw_adrian_character_notification_shown_0179";
const ADRIAN_CONTRACT_FLAG="lw_adrian_character_notification_contract";
const ARMAN_TOAST_CLASS="lw-arman-character-toast";
let policeScreenObserver=null;
let adrianScreenObserver=null;
let badgeObserver=null;
let policeSyncQueued=false;
let adrianSyncQueued=false;
let policeUnlockCount=0;
let adrianRepairCount=0;

function activeScreen(){return $(".screen.active")?.id||gs()?.screen||""}
function save(){try{if(typeof autoSave==="function")autoSave()}catch(_){} }
function language(){return gs()?.language==="th"?"th":"en"}
function devCharacterUnlockActive(){return gs()?.flags?.developer_character_unlock_all===true}

/* Police Station contract. */
function policeIntroComplete(){return gs()?.flags?.police_intro_complete===true}
function policeCharactersPresent(){
 const unlocked=new Set(Array.isArray(gs()?.lwCharactersUnlocked)?gs().lwCharactersUnlocked:[]);
 return POLICE_IDS.every(id=>unlocked.has(id))
}
function policeStoryReady(){
 const s=gs();
 return Boolean(s&&policeIntroComplete()&&!devCharacterUnlockActive())
}
function reconcilePoliceCharacters(){
 policeSyncQueued=false;
 if(!policeStoryReady()||policeCharactersPresent())return false;
 const api=window.LastWitnessContentRegistry;
 if(typeof api?.unlockPoliceCast!=="function")return false;
 const changed=Boolean(api.unlockPoliceCast());
 if(changed){
  const s=gs();s.flags=s.flags||{};
  s.flags.lw_police_character_notification_contract=VERSION;
  policeUnlockCount+=1;save()
 }
 return changed
}
function queuePoliceReconcile(delay=0){
 if(policeSyncQueued)return;
 policeSyncQueued=true;
 setTimeout(reconcilePoliceCharacters,Math.max(0,Number(delay)||0))
}
function bindPoliceDialogue(){
 const box=$(POLICE_DIALOGUE);if(!box||box.dataset.lwCharacterNotificationBound===VERSION)return;
 box.dataset.lwCharacterNotificationBound=VERSION;
 box.addEventListener("click",()=>queuePoliceReconcile(0),false)
}
function observePoliceScreen(){
 const screen=$("#"+POLICE_SCREEN);if(!screen||policeScreenObserver)return;
 policeScreenObserver=new MutationObserver(()=>{
  if(screen.classList.contains("active")){
   bindPoliceDialogue();queuePoliceReconcile(0);setTimeout(reconcilePoliceCharacters,180)
  }
 });
 policeScreenObserver.observe(screen,{attributes:true,attributeFilter:["class"]})
}

/* Adrian Phase VII contract.
 * The Phase VII owner sets identityVerified before calling Registry.unlockCharacter().
 * Registry.ensureState() therefore recovers Adrian first and makes the subsequent
 * story unlock non-fresh. This scoped reconciliation restores the missing one-time
 * unread state and toast without changing the Registry or Phase VII progression. */
function adrianPhase(){return gs()?.chapter3?.phase7||null}
function adrianDialogueClosed(){
 const box=$(ADRIAN_DIALOGUE);
 if(!box)return true;
 return Boolean(box.classList.contains("hidden")||box.hidden||getComputedStyle(box).display==="none")
}
function adrianVerified(){
 const s=gs(),p=adrianPhase();
 return Boolean(s&&p?.identityVerified===true&&(p.introComplete===true||s.flags?.ch3_adrian_met===true))
}
function adrianStoryReady(){
 return Boolean(activeScreen()===ADRIAN_SCREEN&&adrianVerified()&&adrianDialogueClosed()&&!devCharacterUnlockActive())
}
function adrianNotified(){return gs()?.flags?.[ADRIAN_NOTIFICATION_FLAG]===true}
function ensureAdrianState(){
 const s=gs();if(!s)return false;
 s.flags=s.flags||{};s.journal=s.journal||{unlocked:true,seen:true,introShown:false};
 s.characters=s.characters||{};s.relationships=s.relationships||{};
 s.lwCharactersUnlocked=Array.isArray(s.lwCharactersUnlocked)?s.lwCharactersUnlocked:[];
 s.lwCharactersUnread=Array.isArray(s.lwCharactersUnread)?s.lwCharactersUnread:[];
 if(!s.lwCharactersUnlocked.includes(ADRIAN_ID))s.lwCharactersUnlocked.push(ADRIAN_ID);
 s.characters["Adrian Tan"]=true;
 s.relationships["Adrian Tan"]=s.relationships["Adrian Tan"]||{trust:28,respect:64,attachment:14,suspicion:62};
 return true
}
function showAdrianNotification(){
 const s=gs();if(!s||adrianNotified()||typeof window.showBadge!=="function")return false;
 s.flags[ADRIAN_NOTIFICATION_FLAG]=true;
 try{
  window.showBadge(language()==="th"?`เพิ่มตัวละคร: ${ADRIAN_NAME}`:`Character added: ${ADRIAN_NAME}`);
  return true
 }catch(error){
  delete s.flags[ADRIAN_NOTIFICATION_FLAG];
  console.error("LAST WITNESS Adrian Character notification failed",error);
  return false
 }
}
function reconcileAdrian(){
 adrianSyncQueued=false;
 if(!adrianStoryReady()||adrianNotified())return false;
 const s=gs();if(!ensureAdrianState())return false;
 if(!s.lwCharactersUnread.includes(ADRIAN_ID))s.lwCharactersUnread.push(ADRIAN_ID);
 s.journal.unlocked=true;s.journal.seen=false;s.flags[ADRIAN_CONTRACT_FLAG]=VERSION;
 const api=window.LastWitnessContentRegistry;
 try{api?.renderCharacters?.(true)}catch(error){console.error("LAST WITNESS Adrian Character render repair failed",error)}
 try{api?.updateDots?.()}catch(error){console.error("LAST WITNESS Adrian unread-dot repair failed",error)}
 const shown=showAdrianNotification();
 if(shown){adrianRepairCount+=1;save()}
 return shown
}
function queueAdrianReconcile(delay=0){
 if(adrianSyncQueued)return;
 adrianSyncQueued=true;
 setTimeout(reconcileAdrian,Math.max(0,Number(delay)||0))
}
function bindAdrianDialogue(){
 const box=$(ADRIAN_DIALOGUE);if(!box||box.dataset.lwCharacterNotificationBound===VERSION)return;
 box.dataset.lwCharacterNotificationBound=VERSION;
 box.addEventListener("click",()=>{
  queueAdrianReconcile(0);
  setTimeout(reconcileAdrian,80)
 },false)
}
function observeAdrianScreen(){
 const screen=$("#"+ADRIAN_SCREEN);if(!screen||adrianScreenObserver)return;
 adrianScreenObserver=new MutationObserver(()=>{
  if(screen.classList.contains("active")){
   bindAdrianDialogue();queueAdrianReconcile(0);setTimeout(reconcileAdrian,180)
  }
 });
 adrianScreenObserver.observe(screen,{attributes:true,attributeFilter:["class"]})
}

/* Arman toast layer contract. */
function isArmanCharacterToast(text){
 const value=String(text||"").trim().toLowerCase();
 const characterMessage=value.includes("character added")||value.includes("เพิ่มตัวละคร");
 return characterMessage&&value.includes("arman suryadi")
}
function injectArmanToastStyle(){
 if($("#lwCharacterNotificationContractStyle"))return;
 const style=document.createElement("style");
 style.id="lwCharacterNotificationContractStyle";
 style.textContent=`
  #badge.${ARMAN_TOAST_CLASS}{
   z-index:560!important;
   pointer-events:none!important;
   max-width:min(420px,calc(100vw - 24px));
   white-space:normal;
  }
 `;
 document.head.appendChild(style)
}
function syncArmanToastLayer(){
 const badge=$("#badge");if(!badge)return false;
 const arman=isArmanCharacterToast(badge.textContent);
 const visible=badge.classList.contains("show");
 const shouldRaise=arman&&visible;
 if(shouldRaise&&!badge.classList.contains(ARMAN_TOAST_CLASS))badge.classList.add(ARMAN_TOAST_CLASS);
 if(!shouldRaise&&badge.classList.contains(ARMAN_TOAST_CLASS))badge.classList.remove(ARMAN_TOAST_CLASS);
 return shouldRaise
}
function observeBadge(){
 const badge=$("#badge");if(!badge||badgeObserver)return;
 badgeObserver=new MutationObserver(syncArmanToastLayer);
 badgeObserver.observe(badge,{attributes:true,attributeFilter:["class"],childList:true,subtree:true,characterData:true});
 syncArmanToastLayer()
}
function queueAllReconciles(){
 bindPoliceDialogue();bindAdrianDialogue();
 queuePoliceReconcile(0);queueAdrianReconcile(0);syncArmanToastLayer()
}
function bindLifecycle(){
 bindPoliceDialogue();observePoliceScreen();bindAdrianDialogue();observeAdrianScreen();observeBadge();
 window.addEventListener("pageshow",queueAllReconciles);
 document.addEventListener("visibilitychange",()=>{if(!document.hidden)queueAllReconciles()},false);
 document.addEventListener("click",event=>{
  if(event.target.closest?.("#continueGame,#loadTitle,#resume,.load-save,.lw-save-load"))setTimeout(queueAllReconciles,80)
 },true);
 if(activeScreen()===POLICE_SCREEN)queuePoliceReconcile(0);
 if(activeScreen()===ADRIAN_SCREEN)queueAdrianReconcile(0)
}
function contractStatus(){
 const s=gs(),badge=$("#badge");
 return{
  version:VERSION,
  screen:activeScreen(),
  policeIntroComplete:policeIntroComplete(),
  policeCharactersPresent:policeCharactersPresent(),
  policeUnlockCount,
  adrianVerified:adrianVerified(),
  adrianDialogueClosed:adrianDialogueClosed(),
  adrianUnlocked:Boolean(s?.lwCharactersUnlocked?.includes?.(ADRIAN_ID)),
  adrianUnread:Boolean(s?.lwCharactersUnread?.includes?.(ADRIAN_ID)),
  adrianNotified:adrianNotified(),
  adrianRepairCount,
  devCharacterUnlockActive:devCharacterUnlockActive(),
  armanToastVisible:Boolean(badge?.classList.contains(ARMAN_TOAST_CLASS)&&badge.classList.contains("show")),
  badgeText:String(badge?.textContent||"").trim()
 }
}
function bind(){
 injectArmanToastStyle();bindLifecycle();
 window.LastWitnessCharacterNotificationContract={
  installed:true,version:VERSION,
  reconcilePoliceCharacters,queuePoliceReconcile,
  reconcileAdrian,queueAdrianReconcile,
  syncArmanToastLayer,contractStatus
 }
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",bind,{once:true});else bind();
})();
