/* LAST WITNESS — Safe Character Journal Progression Gate 0.17.7
 * Recovery goals:
 * - preserve the authoritative 06-content-registry-dev.js character truth
 * - keep Character Journal hidden throughout Chapter I
 * - reveal it after North's first Chapter II conversation completes
 * - keep Developer Unlock data silent behind the normal early-story gate
 * - defer Maya's existing early notification until her first conversation ends
 * - never poll and never observe document.body
 */
(function(){
"use strict";
const VERSION="0.17.7";
if(window.LastWitnessCharacterJournalStoryGate?.version===VERSION&&window.LastWitnessCharacterJournalStoryGate?.installed)return;

const $=(selector,root=document)=>root.querySelector(selector);
const $$=(selector,root=document)=>Array.from(root.querySelectorAll(selector));
const gs=()=>{try{return state}catch(_){return window.state||null}};
const active=()=>$(".screen.active")?.id||gs()?.screen||"";
const CHAPTER_ONE=new Set(["office","crime","phone","summary","deduction","chapter"]);
const EARLY_CHAPTER_TWO=new Set(["office2"]);
const MAYA_DIALOGUE="#jakartaAirportDialogue";
const RATCHATA_DIALOGUE="#medicalDialogue";
let originalShow=null;
let originalShowBadge=null;
let mayaPending=null;
let ratchataPending=null;
let syncQueued=false;

function language(){return gs()?.language==="th"?"th":"en"}
function chapterOneScreen(screen=active()){return CHAPTER_ONE.has(screen)}
function earlyChapterTwoScreen(screen=active()){
 return EARLY_CHAPTER_TWO.has(screen)&&gs()?.flags?.chapter2_character_feature_unlocked!==true
}
function storyAllowsJournal(screen=active()){
 if(chapterOneScreen(screen)||earlyChapterTwoScreen(screen))return false;
 if(screen==="splash"||screen==="title"||screen==="chapterIntro"||!screen)return false;
 const s=gs();
 if(Number(s?.chapter)>=3)return true;
 return Boolean(Number(s?.chapter)===2&&s?.flags?.chapter2_character_feature_unlocked===true)
}
function setMenuButtonVisible(visible){
 const button=$("#charactersButton");if(!button)return;
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
  button.style.setProperty("height","0","important");
  button.style.setProperty("min-height","0","important");
  button.style.setProperty("margin-top","0","important");
  button.style.setProperty("padding","0","important");
  button.style.setProperty("border","0","important");
  button.style.setProperty("overflow","hidden","important")
 }
}
function clearCharacterBadgeDuringEarlyStory(){
 if(storyAllowsJournal())return;
 const badge=$("#badge");if(!badge)return;
 const text=String(badge.textContent||"").toLowerCase();
 if(text.includes("character added")||text.includes("เพิ่มตัวละคร")){
  badge.textContent="";badge.classList.remove("show")
 }
}
function updateDots(visible){
 const s=gs();
 const baseUnread=Boolean(Array.isArray(s?.lwCharactersUnread)&&s.lwCharactersUnread.length&&s?.journal?.seen===false);
 const mayaUnread=Boolean(s?.chapter4?.phase2?.mayaUnread===true);
 const armanUnread=Boolean(s?.chapter4?.phase4?.armanJournalUnread===true);
 const show=Boolean(visible&&(baseUnread||mayaUnread||armanUnread));
 $$(".journal-alert").forEach(dot=>dot.classList.toggle("show",show))
}
function correctEarlyChapterNumber(){
 const s=gs(),screen=active();if(!s)return;
 if(chapterOneScreen(screen))s.chapter=1;
 else if(EARLY_CHAPTER_TWO.has(screen))s.chapter=2
}
function rehydrateDeveloperCharacters(){
 const s=gs(),api=window.LastWitnessContentRegistry;
 if(!s?.flags?.lw_dev_characters_prepared||!storyAllowsJournal()||!api?.characters||!api?.unlockCharacter)return;
 for(const id of Object.keys(api.characters)){
  try{api.unlockCharacter(id,{unread:false,source:"dev",quiet:true})}catch(_){}
 }
 s.lwCharactersUnread=[];if(s.journal)s.journal.seen=true;
 try{api.renderCharacters?.(true)}catch(_){}
}
function enforce(){
 syncQueued=false;sanitizeLoadedEarlyState();correctEarlyChapterNumber();
 const allowed=storyAllowsJournal();
 rehydrateDeveloperCharacters();
 try{window.LastWitnessContentRegistry?.updateVisibility?.()}catch(_){}
 setMenuButtonVisible(allowed);
 if(gs())gs().lwJournalEnabled=allowed;
 updateDots(allowed);clearCharacterBadgeDuringEarlyStory();maybeReleaseMaya();maybeReleaseRatchata();
 return allowed
}
function queueEnforce(){
 if(syncQueued)return;syncQueued=true;
 requestAnimationFrame(enforce)
}
function sanitizeLoadedEarlyState(){
 const s=gs(),api=window.LastWitnessContentRegistry;if(!s||!chapterOneScreen())return false;
 const contaminated=Boolean(
  Number(s.chapter)!==1||s.lwJournalEnabled===true||s.journal?.unlocked===true||
  s.flags?.chapter2_character_feature_unlocked===true||s.flags?.ch4_arman_identity_verified===true||
  (Array.isArray(s.lwCharactersUnread)&&s.lwCharactersUnread.length)
 );
 if(!contaminated)return false;
 try{api?.resetForChapter2?.()}catch(_){}
 s.chapter=1;s.flags=s.flags||{};delete s.flags.ch4_arman_identity_verified;delete s.flags.lw_dev_characters_prepared;
 s.lwJournalEnabled=false;s.lwCharactersUnread=[];
 if(s.journal)Object.assign(s.journal,{unlocked:false,seen:true,introShown:false});
 return true
}
function resetForNewGame(){
 const s=gs(),api=window.LastWitnessContentRegistry;if(!s)return;
 try{api?.resetForChapter2?.()}catch(_){}
 s.chapter=1;s.progress=0;s.flags=s.flags||{};
 delete s.flags.lw_dev_characters_prepared;delete s.flags.ch4_arman_identity_verified;
 delete s.chapter3;delete s.chapter4;delete s.endingProfile;
 s.lwJournalEnabled=false;s.lwCharactersUnread=[];
 if(s.journal)Object.assign(s.journal,{unlocked:false,seen:true,introShown:false});
 mayaPending=null;ratchataPending=null;clearCharacterBadgeDuringEarlyStory();enforce()
}
function preserveHiddenDeveloperUnlock(){
 const s=gs(),api=window.LastWitnessContentRegistry;if(!s||storyAllowsJournal())return;
 const unlocked=Array.isArray(s.lwCharactersUnlocked)?[...s.lwCharactersUnlocked]:[];
 const characterFlags=Object.assign({},s.characters||{});
 try{api?.resetForChapter2?.()}catch(_){}
 s.flags=s.flags||{};s.flags.developer_character_unlock_all=true;s.flags.lw_dev_characters_prepared=true;
 s.lwCharactersUnlocked=unlocked;s.lwCharactersUnread=[];s.characters=characterFlags;
 s.lwJournalEnabled=false;
 if(s.journal)Object.assign(s.journal,{unlocked:false,seen:true,introShown:false});
 enforce()
}
function dialogueVisible(box){return Boolean(box&&!box.classList.contains("hidden")&&!box.hidden&&getComputedStyle(box).display!=="none")}
function characterToast(text,name){const value=String(text||"").toLowerCase();return value.includes(name)&&(value.includes("character added")||value.includes("เพิ่มตัวละคร"))}
function mayaToast(text){return characterToast(text,"maya pranoto")}
function ratchataToast(text){const value=String(text||"").toLowerCase();return (value.includes("ratchata")||value.includes("รัชตะ"))&&(value.includes("character added")||value.includes("เพิ่มตัวละคร"))}
function hideMayaCard(){
 const card=$("#characterGrid [data-character='maya']");if(card)card.style.setProperty("display","none","important")
}
function showMayaCard(){
 const card=$("#characterGrid [data-character='maya']");if(card)card.style.removeProperty("display")
}
function hideRatchataCard(){const card=$("#characterGrid [data-character='ratchata']");if(card)card.style.setProperty("display","none","important")}
function showRatchataCard(){const card=$("#characterGrid [data-character='ratchata']");if(card)card.style.removeProperty("display")}
function queueMayaNotification(message,args){
 const s=gs(),p=s?.chapter4?.phase2;if(!s||!p)return false;
 mayaPending={message,args};s.flags=s.flags||{};s.flags.lw_maya_notification_pending=true;
 p.mayaUnread=false;hideMayaCard();
 $$(".journal-alert").forEach(dot=>dot.classList.remove("show"));
 try{if(typeof autoSave==="function")autoSave()}catch(_){}
 return true
}
function queueRatchataNotification(message,args){
 const s=gs();if(!s)return false;
 ratchataPending={message,args};s.flags=s.flags||{};s.flags.lw_ratchata_notification_pending=true;
 s.lwCharactersUnread=(s.lwCharactersUnread||[]).filter(id=>id!=="ratchata");
 if(s.journal&&s.lwCharactersUnread.length===0)s.journal.seen=true;
 hideRatchataCard();updateDots(storyAllowsJournal());
 try{if(typeof autoSave==="function")autoSave()}catch(_){}
 return true
}
function maybeReleaseMaya(){
 const s=gs(),p=s?.chapter4?.phase2;if(!s||!p)return false;
 if(!mayaPending&&s.flags?.lw_maya_notification_pending===true){
  mayaPending={message:language()==="th"?"เพิ่มตัวละคร: สารวัตร Maya Pranoto":"Character added: Inspector Maya Pranoto",args:[]}
 }
 if(!mayaPending||active()!=="jakartaAirport")return false;
 const box=$(MAYA_DIALOGUE);if(!box||dialogueVisible(box))return false;
 p.mayaUnread=true;s.journal=s.journal||{};s.journal.seen=false;
 s.flags.lw_maya_notification_pending=false;s.flags.lw_maya_notification_shown=true;
 showMayaCard();
 const pending=mayaPending;mayaPending=null;
 try{originalShowBadge?.(pending.message,...(pending.args||[]))}catch(_){}
 try{window.LastWitnessContentRegistry?.updateDots?.()}catch(_){}
 $$(".journal-alert").forEach(dot=>dot.classList.add("show"));
 try{if(typeof autoSave==="function")autoSave()}catch(_){}
 return true
}
function maybeReleaseRatchata(){
 const s=gs();if(!s)return false;
 if(!ratchataPending&&s.flags?.lw_ratchata_notification_pending===true){
  ratchataPending={message:language()==="th"?"เพิ่มตัวละคร: รัชตะ (ดร. ซิงห์)":"Character added: Ratchata (Dr. Singh)",args:[]}
 }
 if(!ratchataPending||active()!=="medical2"||s.medical?.introComplete!==true)return false;
 const box=$(RATCHATA_DIALOGUE);if(!box||dialogueVisible(box))return false;
 s.lwCharactersUnread=Array.from(new Set([...(s.lwCharactersUnread||[]),"ratchata"]));
 s.journal=s.journal||{};s.journal.seen=false;s.flags.lw_ratchata_notification_pending=false;s.flags.lw_ratchata_notification_shown=true;
 showRatchataCard();const pending=ratchataPending;ratchataPending=null;
 try{originalShowBadge?.(pending.message,...(pending.args||[]))}catch(_){}
 try{window.LastWitnessContentRegistry?.updateDots?.()}catch(_){};updateDots(storyAllowsJournal());
 try{if(typeof autoSave==="function")autoSave()}catch(_){}
 return true
}
function wrapShowBadge(){
 if(typeof window.showBadge!=="function"||window.showBadge.__lwSafeCharacterGate===VERSION)return;
 originalShowBadge=window.showBadge;
 const wrapped=function(message,...args){
  if(mayaToast(message)){
   if(gs()?.flags?.lw_maya_notification_shown===true)return;
   if(dialogueVisible($(MAYA_DIALOGUE))&&queueMayaNotification(message,args))return
  }
  if(ratchataToast(message)){
   if(gs()?.flags?.lw_ratchata_notification_shown===true)return;
   if(queueRatchataNotification(message,args))return
  }
  return originalShowBadge.apply(this,[message,...args])
 };
 wrapped.__lwSafeCharacterGate=VERSION;window.showBadge=wrapped
}
function wrapShow(){
 if(typeof window.show!=="function"||window.show.__lwSafeCharacterGate===VERSION)return;
 originalShow=window.show;
 const wrapped=function(screen){const result=originalShow.apply(this,arguments);queueEnforce();return result};
 wrapped.__lwSafeCharacterGate=VERSION;window.show=wrapped
}
function bindClicks(){
 document.addEventListener("click",event=>{
  const target=event.target;
  if(target.closest?.("#newGame")){setTimeout(resetForNewGame,0);return}
  if(target.closest?.("#devUnlockCharacters")){setTimeout(preserveHiddenDeveloperUnlock,0);return}
  if(target.closest?.(MAYA_DIALOGUE)){setTimeout(()=>{maybeReleaseMaya();enforce()},0);return}
  if(target.closest?.(RATCHATA_DIALOGUE)){setTimeout(()=>{maybeReleaseRatchata();enforce()},0);return}
  if(target.closest?.("#charactersButton")&&!storyAllowsJournal()){
   event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();enforce();return
  }
  if(target.closest?.(".menuButton,#resume,#settingsButton,#titleButton,#restart"))queueEnforce()
 },true)
}
function bind(){
 wrapShowBadge();wrapShow();bindClicks();sanitizeLoadedEarlyState();enforce();
 document.addEventListener("visibilitychange",()=>{if(!document.hidden)queueEnforce()});
 window.LastWitnessCharacterJournalStoryGate={
  installed:true,version:VERSION,enforce,storyAllowsJournal,resetForNewGame,
  maybeReleaseMaya,maybeReleaseRatchata,
  contractStatus:()=>({
   screen:active(),chapter:Number(gs()?.chapter||0),allowed:storyAllowsJournal(),
   buttonVisible:Boolean($("#charactersButton")&&!$("#charactersButton").hidden&&getComputedStyle($("#charactersButton")).display!=="none"),
   redDots:$$('.journal-alert.show').length,mayaPending:Boolean(mayaPending||gs()?.flags?.lw_maya_notification_pending),ratchataPending:Boolean(ratchataPending||gs()?.flags?.lw_ratchata_notification_pending),armanUnread:Boolean(gs()?.chapter4?.phase4?.armanJournalUnread)
  })
 }
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",bind,{once:true});else bind();
})();
