/* LAST WITNESS — Scoped Character Notification Contract 0.17.8
 * Repairs two owner-reported notification gaps without replacing the Character
 * Registry, show(), showBadge(), Save Manager or Chapter progression owners.
 *
 * Scope:
 * - Somchai + Kittisak: perform the existing Registry story unlock immediately
 *   after the first Police Station introduction dialogue finishes.
 * - Arman: keep the existing one-time notification visible above the Phase IV
 *   choice modal while preserving the existing unread-dot and Save/Load state.
 */
(function(){
"use strict";
const VERSION="0.17.8";
if(window.LastWitnessCharacterNotificationContract?.version===VERSION&&window.LastWitnessCharacterNotificationContract?.installed)return;

const $=(selector,root=document)=>root.querySelector(selector);
const gs=()=>{try{return state}catch(_){return window.state||null}};
const POLICE_SCREEN="police2";
const POLICE_DIALOGUE="#policeDialogue";
const POLICE_IDS=["somchai","kittisak"];
const ARMAN_TOAST_CLASS="lw-arman-character-toast";
let policeScreenObserver=null;
let badgeObserver=null;
let policeSyncQueued=false;
let policeUnlockCount=0;

function activeScreen(){return $(".screen.active")?.id||gs()?.screen||""}
function save(){try{if(typeof autoSave==="function")autoSave()}catch(_){} }
function devCharacterUnlockActive(){return gs()?.flags?.developer_character_unlock_all===true}
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
function bindLifecycle(){
 bindPoliceDialogue();observePoliceScreen();observeBadge();
 window.addEventListener("pageshow",()=>{bindPoliceDialogue();queuePoliceReconcile(0);syncArmanToastLayer()});
 document.addEventListener("visibilitychange",()=>{if(!document.hidden){bindPoliceDialogue();queuePoliceReconcile(0);syncArmanToastLayer()}},false);
 document.addEventListener("click",event=>{
  if(event.target.closest?.("#continueGame,#loadTitle,#resume,.load-save,.lw-save-load"))setTimeout(()=>{bindPoliceDialogue();queuePoliceReconcile(0)},80)
 },true);
 if(activeScreen()===POLICE_SCREEN)queuePoliceReconcile(0)
}
function contractStatus(){
 const badge=$("#badge");
 return{
  version:VERSION,
  screen:activeScreen(),
  policeIntroComplete:policeIntroComplete(),
  policeCharactersPresent:policeCharactersPresent(),
  policeUnlockCount,
  devCharacterUnlockActive:devCharacterUnlockActive(),
  armanToastVisible:Boolean(badge?.classList.contains(ARMAN_TOAST_CLASS)&&badge.classList.contains("show")),
  armanToastText:String(badge?.textContent||"").trim()
 }
}
function bind(){
 injectArmanToastStyle();bindLifecycle();
 window.LastWitnessCharacterNotificationContract={
  installed:true,version:VERSION,reconcilePoliceCharacters,queuePoliceReconcile,
  syncArmanToastLayer,contractStatus
 }
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",bind,{once:true});else bind();
})();
