/* LAST WITNESS - Full Screen Display and Exit Flow 0.8.2
 * Fullscreen uses the document root so every modal remains visible. A defensive
 * overlay-root repair keeps the Save Manager inside the game tree as well.
 */
(function(){
"use strict";

if(window.LastWitnessFullscreen?.version==="0.8.2")return;

const $=(selector,root=document)=>root.querySelector(selector);
let automaticAttempted=false;
let pendingAction=false;
let lastFailure=false;
let exitInProgress=false;

function gameState(){
 try{return typeof state!=="undefined"?state:window.state||null}catch(_){return window.state||null}
}
function language(){return gameState()?.language==="th"||document.documentElement.lang==="th"?"th":"en"}
function copy(){
 const th=language()==="th";
 return th?{
  title:"การแสดงผล",
  help:"ใช้พื้นที่หน้าจอทั้งหมดสำหรับเกม โดยไม่ยืดหรือบีบภาพฉาก",
  enter:"เข้าสู่โหมดเต็มหน้าจอ",
  exit:"ออกจากโหมดเต็มหน้าจอ",
  on:"เปิดอยู่",
  off:"ปิดอยู่",
  unavailable:"ไม่รองรับ",
  failed:"เบราว์เซอร์ไม่อนุญาตให้เข้าสู่โหมดเต็มหน้าจอ",
  exitGame:"ออกจากเกม",
  exitSettingHelp:"บันทึกความคืบหน้าปัจจุบันและออกจาก LAST WITNESS",
  confirmTitle:"ออกจากเกม",
  confirmText:"ต้องการออกจาก LAST WITNESS หรือไม่? ระบบจะบันทึกความคืบหน้าปัจจุบันก่อนออก",
  confirmExit:"ออกจากเกม",
  cancel:"ยกเลิก",
  savedEye:"บันทึกเกมแล้ว",
  closeTab:"เบราว์เซอร์ไม่อนุญาตให้เว็บไซต์ปิดแท็บนี้โดยอัตโนมัติ ตอนนี้สามารถปิดแท็บได้อย่างปลอดภัย",
  resume:"กลับเข้าเกม"
 }:{
  title:"Display",
  help:"Use the full available screen area without stretching or squeezing scene artwork.",
  enter:"Enter Full Screen",
  exit:"Exit Full Screen",
  on:"Active",
  off:"Inactive",
  unavailable:"Unavailable",
  failed:"The browser did not allow full screen.",
  exitGame:"Exit Game",
  exitSettingHelp:"Save current progress and leave LAST WITNESS.",
  confirmTitle:"Exit Game",
  confirmText:"Exit LAST WITNESS? Your current progress will be saved before leaving.",
  confirmExit:"Exit Game",
  cancel:"Cancel",
  savedEye:"Game Saved",
  closeTab:"The browser did not allow this website to close the tab automatically. It is now safe to close this tab.",
  resume:"Return to Game"
 };
}

function fullscreenElement(){return document.fullscreenElement||document.webkitFullscreenElement||null}
function isFullscreen(){return Boolean(fullscreenElement())}
function fullscreenTarget(){
 const root=document.documentElement;
 if(typeof root?.requestFullscreen==="function"||typeof root?.webkitRequestFullscreen==="function")return root;
 return $("#game")||root;
}
function fullscreenSupported(){
 const target=fullscreenTarget();
 if(typeof target?.requestFullscreen==="function")return document.fullscreenEnabled!==false;
 if(typeof target?.webkitRequestFullscreen==="function")return document.webkitFullscreenEnabled!==false;
 return false;
}

function repairOverlayRoot(){
 const game=$("#game"),saveManager=$("#lwSaveManager");
 if(game&&saveManager&&saveManager.parentElement!==game)game.appendChild(saveManager);
}
function dispatchViewportRefresh(){
 requestAnimationFrame(()=>window.dispatchEvent(new Event("resize")));
 setTimeout(()=>window.dispatchEvent(new Event("resize")),180);
}
function syncFullscreenClass(){
 const active=isFullscreen();
 document.documentElement.classList.toggle("lw-fullscreen",active);
 document.body?.classList.toggle("lw-fullscreen",active);
 repairOverlayRoot();
 dispatchViewportRefresh();
}
function notifyFailure(){try{if(typeof showBadge==="function")showBadge(copy().failed)}catch(_){} }
function requestNativeFullscreen(){
 repairOverlayRoot();
 const target=fullscreenTarget();
 if(!target)return Promise.reject(new Error("Fullscreen target unavailable"));
 if(typeof target.requestFullscreen==="function")return Promise.resolve(target.requestFullscreen({navigationUI:"hide"}));
 if(typeof target.webkitRequestFullscreen==="function"){
  try{target.webkitRequestFullscreen();return Promise.resolve()}catch(error){return Promise.reject(error)}
 }
 return Promise.reject(new Error("Fullscreen API unavailable"));
}
function exitNativeFullscreen(){
 if(typeof document.exitFullscreen==="function")return Promise.resolve(document.exitFullscreen());
 if(typeof document.webkitExitFullscreen==="function"){
  try{document.webkitExitFullscreen();return Promise.resolve()}catch(error){return Promise.reject(error)}
 }
 return Promise.resolve();
}

async function enterFullscreen(options={}){
 if(pendingAction||isFullscreen())return isFullscreen();
 pendingAction=true;lastFailure=false;updateUI();
 try{await requestNativeFullscreen();return true}
 catch(_){lastFailure=true;if(!options.quiet)notifyFailure();return false}
 finally{pendingAction=false;updateUI()}
}
async function exitFullscreen(options={}){
 if(pendingAction||!isFullscreen())return !isFullscreen();
 pendingAction=true;lastFailure=false;updateUI();
 try{await exitNativeFullscreen();return true}
 catch(_){lastFailure=true;if(!options.quiet)notifyFailure();return false}
 finally{pendingAction=false;updateUI()}
}
async function toggleFullscreen(options={}){return isFullscreen()?exitFullscreen(options):enterFullscreen(options)}

function injectControls(){
 const settingsVersion=$("#settingsVersion");
 if(settingsVersion&&!$("#lwDisplaySetting")){
  const section=document.createElement("section");
  section.id="lwDisplaySetting";
  section.className="lw-display-setting";
  section.innerHTML='<div class="lw-display-setting-head"><span id="lwDisplayTitle" class="lw-display-setting-title"></span><span id="lwFullscreenStatus" class="lw-fullscreen-status" aria-live="polite"></span></div><p id="lwDisplayHelp" class="lw-display-setting-help"></p><button id="lwSettingsFullscreen" class="ghost lw-fullscreen-button" type="button" aria-pressed="false"></button>';
  settingsVersion.parentNode?.insertBefore(section,settingsVersion);
 }
 const settingsButton=$("#settingsButton");
 if(settingsButton&&!$("#lwMenuFullscreen")){
  const button=document.createElement("button");
  button.id="lwMenuFullscreen";
  button.className="menu-button";
  button.type="button";
  button.setAttribute("aria-pressed","false");
  settingsButton.insertAdjacentElement("afterend",button);
 }
 const loadTitle=$("#loadTitle");
 if(loadTitle&&!$("#lwTitleExit")){
  const button=document.createElement("button");
  button.id="lwTitleExit";
  button.className="ghost lw-exit-button lw-title-exit";
  button.type="button";
  loadTitle.insertAdjacentElement("afterend",button);
 }
 if(settingsVersion&&!$("#lwExitSetting")){
  const section=document.createElement("section");
  section.id="lwExitSetting";
  section.className="lw-exit-setting";
  section.innerHTML='<div id="lwExitSettingTitle" class="lw-exit-setting-title"></div><p id="lwExitSettingHelp" class="lw-exit-setting-help"></p><button id="lwSettingsExit" class="ghost lw-exit-button" type="button"></button>';
  settingsVersion.parentNode?.insertBefore(section,settingsVersion);
 }
 const game=$("#game");
 if(game&&!$("#lwExitConfirm")){
  const modal=document.createElement("div");
  modal.id="lwExitConfirm";
  modal.className="modal lw-exit-confirm";
  modal.setAttribute("aria-hidden","true");
  modal.innerHTML='<div class="modal-card lw-exit-confirm-card" role="dialog" aria-modal="true" aria-labelledby="lwExitConfirmTitle"><div class="eyebrow">LAST WITNESS</div><h3 id="lwExitConfirmTitle"></h3><p id="lwExitConfirmText"></p><div class="lw-exit-confirm-actions"><button id="lwExitConfirmButton" class="primary" type="button"></button><button id="lwExitCancelButton" class="ghost" type="button"></button></div></div>';
  game.appendChild(modal);
 }
 if(game&&!$("#lwExitScreen")){
  const screen=document.createElement("section");
  screen.id="lwExitScreen";
  screen.className="lw-exit-screen";
  screen.setAttribute("aria-hidden","true");
  screen.innerHTML='<div class="chapter-card lw-exit-screen-card"><div id="lwExitSavedEye" class="eyebrow"></div><h2>LAST WITNESS</h2><p id="lwExitScreenText"></p><button id="lwExitReload" class="ghost" type="button"></button></div>';
  game.appendChild(screen);
 }
}
function bindOnce(selector,handler){
 const node=$(selector);if(!node||node.dataset.lwBound0802==="1")return;
 node.dataset.lwBound0802="1";node.addEventListener("click",handler);
}
function bindInjectedControls(){
 bindOnce("#lwSettingsFullscreen",()=>void toggleFullscreen());
 bindOnce("#lwMenuFullscreen",()=>{void toggleFullscreen();$("#drawer")?.classList.remove("open")});
 bindOnce("#lwTitleExit",openExitConfirm);
 bindOnce("#lwSettingsExit",openExitConfirm);
 bindOnce("#lwExitCancelButton",closeExitConfirm);
 bindOnce("#lwExitConfirmButton",()=>void performExit());
 bindOnce("#lwExitReload",()=>location.reload());
 const modal=$("#lwExitConfirm");
 if(modal&&modal.dataset.lwBackdropBound0802!=="1"){
  modal.dataset.lwBackdropBound0802="1";
  modal.addEventListener("click",event=>{if(event.target===modal)closeExitConfirm()});
 }
}
function openExitConfirm(){
 injectControls();bindInjectedControls();
 const modal=$("#lwExitConfirm");if(!modal)return;
 modal.classList.add("open");modal.setAttribute("aria-hidden","false");updateUI();
}
function closeExitConfirm(){
 const modal=$("#lwExitConfirm");if(!modal)return;
 modal.classList.remove("open");modal.setAttribute("aria-hidden","true");
}
function stopAllMedia(){
 document.querySelectorAll("audio,video").forEach(media=>{try{media.pause()}catch(_){} });
 try{window.LastWitnessAudioCue?.stopEvidenceCue?.()}catch(_){}
 try{window.LastWitnessChapter3?.stopPhase2Media?.(false)}catch(_){}
 try{window.LastWitnessChangi?.stopAudio?.(false)}catch(_){}
}
function saveBeforeExit(){
 const screen=gameState()?.screen||$(".screen.active")?.id||"";
 if(["","splash","title"].includes(screen))return;
 try{if(typeof autoSave==="function")autoSave()}catch(_){}
}
function showExitFallback(){
 const screen=$("#lwExitScreen");if(!screen)return;
 screen.classList.add("show");screen.setAttribute("aria-hidden","false");updateUI();
}
async function performExit(){
 if(exitInProgress)return;
 exitInProgress=true;updateUI();
 saveBeforeExit();
 stopAllMedia();
 closeExitConfirm();
 $("#settingsModal")?.classList.remove("open");
 $("#drawer")?.classList.remove("open");
 const leaving={value:false};
 const markLeaving=()=>{leaving.value=true};
 window.addEventListener("pagehide",markLeaving,{once:true});
 const leaveFullscreen=isFullscreen()?exitNativeFullscreen().catch(()=>{}):Promise.resolve();
 try{window.close()}catch(_){}
 await leaveFullscreen;
 if(window.closed)return;
 if(history.length>1){
  try{history.back()}catch(_){}
  await new Promise(resolve=>setTimeout(resolve,500));
  if(leaving.value||document.visibilityState==="hidden")return;
 }
 showExitFallback();
 exitInProgress=false;updateUI();
}

function updateUI(){
 injectControls();bindInjectedControls();repairOverlayRoot();
 const c=copy(),active=isFullscreen(),supported=fullscreenSupported();
 const settingsButton=$("#lwSettingsFullscreen"),menuButton=$("#lwMenuFullscreen"),status=$("#lwFullscreenStatus");
 if($("#lwDisplayTitle"))$("#lwDisplayTitle").textContent=c.title;
 if($("#lwDisplayHelp"))$("#lwDisplayHelp").textContent=c.help;
 const label=active?c.exit:c.enter;
 [settingsButton,menuButton].forEach(button=>{
  if(!button)return;
  button.textContent=supported?label:c.unavailable;
  button.disabled=!supported||pendingAction||exitInProgress;
  button.hidden=false;
  button.setAttribute("aria-pressed",active?"true":"false");
 });
 if(status){
  status.textContent=!supported?c.unavailable:(active?c.on:c.off);
  status.classList.toggle("active",active);
 }
 if($("#lwTitleExit"))$("#lwTitleExit").textContent=c.exitGame;
 if($("#lwExitSettingTitle"))$("#lwExitSettingTitle").textContent=c.exitGame;
 if($("#lwExitSettingHelp"))$("#lwExitSettingHelp").textContent=c.exitSettingHelp;
 if($("#lwSettingsExit")){$("#lwSettingsExit").textContent=c.exitGame;$("#lwSettingsExit").disabled=exitInProgress}
 if($("#lwExitConfirmTitle"))$("#lwExitConfirmTitle").textContent=c.confirmTitle;
 if($("#lwExitConfirmText"))$("#lwExitConfirmText").textContent=c.confirmText;
 if($("#lwExitConfirmButton")){$("#lwExitConfirmButton").textContent=c.confirmExit;$("#lwExitConfirmButton").disabled=exitInProgress}
 if($("#lwExitCancelButton")){ $("#lwExitCancelButton").textContent=c.cancel;$("#lwExitCancelButton").disabled=exitInProgress }
 if($("#lwExitSavedEye"))$("#lwExitSavedEye").textContent=c.savedEye;
 if($("#lwExitScreenText"))$("#lwExitScreenText").textContent=c.closeTab;
 if($("#lwExitReload"))$("#lwExitReload").textContent=c.resume;
 const version=$("#settingsVersion");if(version)version.textContent="LAST WITNESS · BUILD 0.8.2";
 document.documentElement.classList.toggle("lw-fullscreen-failed",lastFailure);
}

function bind(){
 injectControls();bindInjectedControls();repairOverlayRoot();
 queueMicrotask(repairOverlayRoot);
 setTimeout(repairOverlayRoot,0);
 $("#enter")?.addEventListener("click",()=>{
  if(automaticAttempted||isFullscreen()||!fullscreenSupported())return;
  automaticAttempted=true;
  void enterFullscreen({quiet:true});
 },true);
 ["fullscreenchange","webkitfullscreenchange"].forEach(type=>document.addEventListener(type,()=>{syncFullscreenClass();updateUI()}));
 document.addEventListener("click",event=>{
  if(event.target.closest?.(".saveButton,#loadTitle,#loadManual"))repairOverlayRoot();
  if(event.target.closest?.("[data-lang]"))setTimeout(updateUI,0);
 },true);
 window.addEventListener("orientationchange",dispatchViewportRefresh);
 window.visualViewport?.addEventListener?.("resize",dispatchViewportRefresh);
 syncFullscreenClass();updateUI();
}

window.LastWitnessFullscreen={
 enter:enterFullscreen,
 exit:exitFullscreen,
 toggle:toggleFullscreen,
 active:isFullscreen,
 supported:fullscreenSupported,
 repairOverlayRoot,
 openExitConfirm,
 updateLanguage:updateUI,
 version:"0.8.2"
};

if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",bind,{once:true});else bind();
})();
