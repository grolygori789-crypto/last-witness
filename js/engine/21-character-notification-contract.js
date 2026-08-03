/* LAST WITNESS — Scoped Character Notification Contract 0.17.14
 * Repairs owner-reported Character Journal notification gaps without replacing
 * the Character Registry, show(), showBadge(), Save Manager or chapter owners.
 *
 * Scope:
 * - Somchai + Kittisak: perform the existing Registry story unlock immediately
 *   after the first Police Station introduction dialogue finishes.
 * - Adrian: keep the Hawker HUD marker visually impossible before identity
 *   verification, then show the normal unread dot with the one-time toast.
 * - Arman: keep the existing one-time notification visible above the Phase IV
 *   choice modal while preserving the existing unread-dot and Save/Load state.
 */
(function(){
"use strict";
const VERSION="0.17.14";
if(window.LastWitnessCharacterNotificationContract?.version===VERSION&&window.LastWitnessCharacterNotificationContract?.installed)return;

const $=(selector,root=document)=>root.querySelector(selector);
const $$=(selector,root=document)=>Array.from(root.querySelectorAll(selector));
const gs=()=>{try{return state}catch(_){return window.state||null}};
const POLICE_SCREEN="police2";
const POLICE_DIALOGUE="#policeDialogue";
const POLICE_IDS=["somchai","kittisak"];
const ADRIAN_SCREEN="chapter3HawkerCentre";
const ADRIAN_DIALOGUE="#ch3P7Dialogue";
const ADRIAN_ID="adrian";
const ADRIAN_NAME="Adrian Tan Wei Ming";
const ADRIAN_NOTIFICATION_FLAG="lw_adrian_character_notification_shown_01710";
const ADRIAN_CONTRACT_FLAG="lw_adrian_character_notification_contract";
const ADRIAN_PREVERIFY_CLASS="lw-adrian-preverify";
const ADRIAN_DEV_PREVERIFY_CLASS="lw-adrian-dev-preverify";
const ADRIAN_DEV_FRESH_FLAG="lw_adrian_dev_fresh_entry_01714";
const ARMAN_TOAST_CLASS="lw-arman-character-toast";
let policeScreenObserver=null;
let adrianScreenObserver=null;
let adrianInjectionObserver=null;
let badgeObserver=null;
let policeSyncQueued=false;
let adrianSyncQueued=false;
let policeUnlockCount=0;
let adrianRepairCount=0;
let adrianHudDotRepairCount=0;
let adrianGateSyncCount=0;
let adrianDevFinalizeCount=0;
let adrianDevPending=false;

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
 * Phase VII sets identityVerified before Registry.unlockCharacter(). Registry
 * recovery can therefore make the story unlock non-fresh. The reconciliation
 * below restores one story notification and one unread state after verification.
 *
 * A Developer fresh jump is a different contract. It must begin with prerequisite
 * characters prepared silently, no stale unread marker, and Adrian undiscovered.
 * The bridge resets only that exact startFreshForDev transaction. */
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
function ensureAdrianHudDot(){
 const screen=$("#"+ADRIAN_SCREEN),button=$(".ch3-p7-menu",screen||document);
 if(!screen||!button)return null;
 const dots=$$(".journal-alert",button);
 let dot=dots.shift()||null;
 dots.forEach(node=>node.remove());
 if(!dot){
  dot=document.createElement("i");
  dot.className="journal-alert";
  dot.setAttribute("aria-hidden","true");
  button.appendChild(dot);
  adrianHudDotRepairCount+=1
 }
 dot.dataset.lwAdrianHudDot=VERSION;
 return dot
}
function adrianUnread(){
 const s=gs();
 return Boolean(Array.isArray(s?.lwCharactersUnread)&&s.lwCharactersUnread.includes(ADRIAN_ID))
}
function syncAdrianHudDot(){
 const screen=$("#"+ADRIAN_SCREEN),dot=ensureAdrianHudDot();if(!screen||!dot)return false;
 const verified=adrianVerified();
 if(verified)clearAdrianDevGate();
 screen.classList.toggle(ADRIAN_PREVERIFY_CLASS,!verified);
 screen.dataset.lwAdrianVerified=verified?"1":"0";
 adrianGateSyncCount+=1;
 if(!verified){
  /* Registry.updateDots() may run later and re-add .show because Developer
   * prerequisites are globally unread. The persistent screen class and CSS gate
   * remain authoritative until the story owner verifies Adrian. */
  dot.classList.remove("show");
  dot.setAttribute("aria-hidden","true");
  return false
 }
 try{window.LastWitnessContentRegistry?.updateDots?.()}catch(error){console.error("LAST WITNESS Character unread-dot sync failed",error)}
 const shouldShow=Boolean(adrianUnread()&&gs()?.journal?.seen===false&&!devCharacterUnlockActive());
 dot.classList.toggle("show",shouldShow);
 dot.setAttribute("aria-hidden",shouldShow?"false":"true");
 return shouldShow
}
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
 if(!adrianStoryReady())return false;
 ensureAdrianHudDot();
 if(adrianNotified()){syncAdrianHudDot();return false}
 const s=gs();if(!ensureAdrianState())return false;
 if(!s.lwCharactersUnread.includes(ADRIAN_ID))s.lwCharactersUnread.push(ADRIAN_ID);
 s.journal.unlocked=true;s.journal.seen=false;s.flags[ADRIAN_CONTRACT_FLAG]=VERSION;
 const api=window.LastWitnessContentRegistry;
 try{api?.renderCharacters?.(true)}catch(error){console.error("LAST WITNESS Adrian Character render repair failed",error)}
 syncAdrianHudDot();
 const shown=showAdrianNotification();
 if(shown){adrianRepairCount+=1;save();setTimeout(syncAdrianHudDot,0)}
 return shown
}
function queueAdrianReconcile(delay=0){
 if(adrianSyncQueued)return;
 adrianSyncQueued=true;
 setTimeout(reconcileAdrian,Math.max(0,Number(delay)||0))
}
function finalizeAdrianDevFreshEntry(){
 const s=gs(),p=adrianPhase();
 if(!adrianDevPending||!s||!p||p.identityVerified===true)return false;
 s.flags=s.flags||{};s.journal=s.journal||{unlocked:true,seen:true,introShown:false};
 s.characters=s.characters||{};
 s.lwCharactersUnlocked=Array.isArray(s.lwCharactersUnlocked)?s.lwCharactersUnlocked:[];
 s.lwCharactersUnread=[];
 s.lwCharactersUnlocked=s.lwCharactersUnlocked.filter(id=>id!==ADRIAN_ID);
 s.characters["Adrian Tan"]=false;
 delete s.flags.ch3_adrian_met;
 delete s.flags[ADRIAN_NOTIFICATION_FLAG];
 delete s.flags[ADRIAN_CONTRACT_FLAG];
 s.flags[ADRIAN_DEV_FRESH_FLAG]=VERSION;
 s.journal.seen=true;
 document.documentElement.classList.add(ADRIAN_DEV_PREVERIFY_CLASS);
 $$(".journal-alert.show").forEach(node=>node.classList.remove("show"));
 adrianDevFinalizeCount+=1;
 return true
}
function queueAdrianDevFreshEntry(){
 adrianDevPending=true;
 for(const delay of [0,60,180,360])setTimeout(finalizeAdrianDevFreshEntry,delay)
}
function clearAdrianDevGate(){
 adrianDevPending=false;
 document.documentElement.classList.remove(ADRIAN_DEV_PREVERIFY_CLASS)
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
 const screen=$("#"+ADRIAN_SCREEN);if(!screen)return false;
 bindAdrianDialogue();ensureAdrianHudDot();syncAdrianHudDot();
 if(!adrianScreenObserver){
  adrianScreenObserver=new MutationObserver(()=>{
   if(screen.classList.contains("active")){
    bindAdrianDialogue();queueAdrianReconcile(0);setTimeout(reconcileAdrian,180)
   }
  });
  adrianScreenObserver.observe(screen,{attributes:true,attributeFilter:["class"]})
 }
 if(screen.classList.contains("active")){
  queueAdrianReconcile(0);setTimeout(reconcileAdrian,180)
 }
 return true
}
function observeAdrianInjection(){
 const game=$("#game");if(!game)return false;
 if(observeAdrianScreen()){
  if(adrianInjectionObserver){adrianInjectionObserver.disconnect();adrianInjectionObserver=null}
  return true
 }
 if(adrianInjectionObserver)return false;
 adrianInjectionObserver=new MutationObserver(()=>{
  if(!observeAdrianScreen())return;
  adrianInjectionObserver?.disconnect();adrianInjectionObserver=null
 });
 adrianInjectionObserver.observe(game,{childList:true});
 return false
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
  #${ADRIAN_SCREEN}.${ADRIAN_PREVERIFY_CLASS} .ch3-p7-menu .journal-alert{
   display:none!important;
   opacity:0!important;
   visibility:hidden!important;
  }
  html.${ADRIAN_DEV_PREVERIFY_CLASS} .journal-alert{
   display:none!important;
   opacity:0!important;
   visibility:hidden!important;
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
 bindPoliceDialogue();observeAdrianInjection();observeAdrianScreen();bindAdrianDialogue();
 const screen=activeScreen();
 if(screen!==ADRIAN_SCREEN&&screen!=="chapter3Phase7Card")clearAdrianDevGate();
 queuePoliceReconcile(0);queueAdrianReconcile(0);syncAdrianHudDot();syncArmanToastLayer()
}
function bindLifecycle(){
 bindPoliceDialogue();observePoliceScreen();observeAdrianInjection();observeAdrianScreen();observeBadge();
 window.addEventListener("pageshow",queueAllReconciles);
 document.addEventListener("visibilitychange",()=>{if(!document.hidden)queueAllReconciles()},false);
 window.addEventListener("click",event=>{
  const target=event.target.closest?.("[data-dev-jump]");
  if(!target)return;
  if(target.dataset.devJump==="chapter3Phase7")queueAdrianDevFreshEntry();
  else clearAdrianDevGate()
 },true);
 document.addEventListener("click",event=>{
  /* Phase VII creates its screen/dialogue only when the phase starts. Delegation
   * is mandatory here: a listener attached during bootstrap cannot see an element
   * that does not exist yet. Timers run after the phase owner's final-click handler
   * sets introComplete and identityVerified. */
  if(event.target.closest?.(ADRIAN_DIALOGUE)){
   setTimeout(reconcileAdrian,0);
   setTimeout(reconcileAdrian,80);
   setTimeout(reconcileAdrian,220)
  }
  if(event.target.closest?.("#"+ADRIAN_SCREEN))setTimeout(reconcileAdrian,80);
  if(event.target.closest?.("#charactersButton,#charactersModal .closeModal,#charactersBack")){
   setTimeout(syncAdrianHudDot,0);setTimeout(syncAdrianHudDot,100)
  }
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
  adrianUnread:adrianUnread(),
  adrianNotified:adrianNotified(),
  adrianRepairCount,
  adrianHudDotExists:Boolean($("#"+ADRIAN_SCREEN+" .ch3-p7-menu .journal-alert")),
  adrianHudDotVisible:Boolean($("#"+ADRIAN_SCREEN+" .ch3-p7-menu .journal-alert.show")),
  adrianHudDotRepairCount,
  adrianPreverifyGate:Boolean($("#"+ADRIAN_SCREEN)?.classList.contains(ADRIAN_PREVERIFY_CLASS)),
  adrianDevPreverifyGate:document.documentElement.classList.contains(ADRIAN_DEV_PREVERIFY_CLASS),
  adrianDevPending,adrianDevFinalizeCount,
  adrianGateSyncCount,
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
  reconcileAdrian,queueAdrianReconcile,syncAdrianHudDot,
  queueAdrianDevFreshEntry,finalizeAdrianDevFreshEntry,
  syncArmanToastLayer,contractStatus
 }
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",bind,{once:true});else bind();
})();
