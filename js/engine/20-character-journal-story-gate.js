/* LAST WITNESS — Character Journal Story Gate 0.17.4
 * Restores the original progression contract:
 * - Chapter I: Character Journal and unread dots are hidden.
 * - Chapter II: they unlock only after the North introduction completes.
 * - Chapter III onward: they remain available.
 * - An explicit Developer "Unlock Characters" action may bypass the story gate.
 */
(function(){
"use strict";
const VERSION="0.17.4";
if(window.LastWitnessCharacterJournalStoryGate?.version===VERSION&&window.LastWitnessCharacterJournalStoryGate?.installed)return;

const $=(selector,root=document)=>root.querySelector(selector);
const $$=(selector,root=document)=>Array.from(root.querySelectorAll(selector));
const gs=()=>{try{return state}catch(_){return window.state||null}};
const active=()=>$(".screen.active")?.id||gs()?.screen||"";
let devUnlockSession=false;
let earlyResetDone=false;
let apiWrapped=false;
let syncQueued=false;
let observer=null;
let originalUnlockCharacter=null;
let originalUpdateVisibility=null;
let originalUpdateDots=null;

function chapter(){return Number(gs()?.chapter||1)}
function northJournalUnlocked(){return gs()?.flags?.chapter2_character_feature_unlocked===true}
function storyAllowsJournal(){
 if(devUnlockSession)return true;
 if(chapter()>=3)return true;
 return chapter()===2&&northJournalUnlocked()
}
function earlyStoryGate(){
 if(devUnlockSession)return false;
 return chapter()===1||(chapter()===2&&!northJournalUnlocked())
}
function setButtonVisible(button,visible){
 if(!button)return;
 const mode=visible?"1":"0",actuallyVisible=!button.hidden&&button.style.display!=="none";
 if(button.dataset.lwJournalGateVisible===mode&&actuallyVisible===visible)return;
 button.dataset.lwJournalGateVisible=mode;
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
function resetEarlyStoryRegistry(){
 const api=window.LastWitnessContentRegistry,s=gs();
 if(!api||!s||!earlyStoryGate()||earlyResetDone)return false;
 earlyResetDone=true;
 try{api.resetForChapter2?.()}catch(error){console.error("LAST WITNESS Character Journal early-story reset failed",error)}
 s.flags=s.flags||{};
 delete s.flags.developer_character_unlock_all;
 delete s.flags.developer_evidence_unlock_all;
 s.lwJournalEnabled=false;
 if(s.journal&&typeof s.journal==="object"){s.journal.unlocked=false;s.journal.seen=true}
 enforceDOM();
 return true
}
function wrapAPI(){
 const api=window.LastWitnessContentRegistry;if(!api||apiWrapped)return Boolean(api);
 apiWrapped=true;
 originalUnlockCharacter=api.unlockCharacter?.bind(api)||null;
 originalUpdateVisibility=api.updateVisibility?.bind(api)||null;
 originalUpdateDots=api.updateDots?.bind(api)||null;
 if(originalUnlockCharacter){
  const wrapped=function(id,opt={}){
   if(opt?.source==="dev"&&earlyStoryGate()&&!devUnlockSession)return false;
   const result=originalUnlockCharacter(id,opt);
   queueSync();
   return result
  };
  wrapped.__lwJournalStoryGate=VERSION;
  api.unlockCharacter=wrapped
 }
 if(originalUpdateVisibility)api.updateVisibility=function(){const result=originalUpdateVisibility();enforceDOM();return result};
 if(originalUpdateDots)api.updateDots=function(){const result=originalUpdateDots();enforceDOM();return result};
 return true
}
function sync(){
 syncQueued=false;
 wrapAPI();
 if(earlyStoryGate())resetEarlyStoryRegistry();else earlyResetDone=false;
 enforceDOM()
}
function queueSync(){
 if(syncQueued)return;syncQueued=true;
 requestAnimationFrame(()=>{sync();setTimeout(sync,80)})
}
function markExplicitDevUnlock(){
 devUnlockSession=true;earlyResetDone=false;
 try{sessionStorage.setItem("lastWitness.devCharacterUnlockSession","1")}catch(_){}
 queueSync()
}
function clearDevSession(){
 devUnlockSession=false;earlyResetDone=false;
 try{sessionStorage.removeItem("lastWitness.devCharacterUnlockSession")}catch(_){}
 queueSync()
}
function bindClicks(){
 document.addEventListener("click",event=>{
  if(event.target.closest?.("#devUnlockCharacters")){markExplicitDevUnlock();return}
  if(event.target.closest?.("#newGame,#restart")){clearDevSession();return}
  if(event.target.closest?.("#charactersButton")&&!storyAllowsJournal()){
   event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();enforceDOM()
  }
  setTimeout(queueSync,0)
 },true)
}
function bindObserver(){
 observer?.disconnect();
 observer=new MutationObserver(queueSync);
 observer.observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:["class","hidden","style"]})
}
function bind(){
 try{devUnlockSession=sessionStorage.getItem("lastWitness.devCharacterUnlockSession")==="1"}catch(_){}
 wrapAPI();bindClicks();bindObserver();sync();
 window.LastWitnessCharacterJournalStoryGate={
  installed:true,version:VERSION,sync,storyAllowsJournal,earlyStoryGate,
  markExplicitDevUnlock,clearDevSession,
  contractStatus:()=>({
   chapter:chapter(),screen:active(),northUnlocked:northJournalUnlocked(),
   developerSession:devUnlockSession,allowed:storyAllowsJournal(),
   buttonVisible:Boolean($("#charactersButton")&&!$("#charactersButton").hidden&&getComputedStyle($("#charactersButton")).display!=="none"),
   redDots:$$(".journal-alert.show").length
  })
 }
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",bind,{once:true});else bind();
})();