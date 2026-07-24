/* LAST WITNESS — Full Screen Display 0.8.1
 * Best-effort fullscreen entry from Tap to Begin plus explicit controls in
 * Settings and Game Menu. Fullscreen state belongs to the browser and is not
 * written to Save/Load state.
 */
(function(){
"use strict";

if(window.LastWitnessFullscreen?.version==="0.8.1")return;

const $=(selector,root=document)=>root.querySelector(selector);
let automaticAttempted=false;
let pendingAction=false;
let lastFailure=false;

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
  failed:"เบราว์เซอร์ไม่อนุญาตให้เข้าสู่โหมดเต็มหน้าจอ"
 }:{
  title:"Display",
  help:"Use the full available screen area without stretching or squeezing scene artwork.",
  enter:"Enter Full Screen",
  exit:"Exit Full Screen",
  on:"Active",
  off:"Inactive",
  unavailable:"Unavailable",
  failed:"The browser did not allow full screen."
 };
}

function fullscreenElement(){return document.fullscreenElement||document.webkitFullscreenElement||null}
function isFullscreen(){return Boolean(fullscreenElement())}
function gameElement(){return $("#game")||document.documentElement}
function fullscreenSupported(){
 const target=gameElement();
 if(typeof target?.requestFullscreen==="function")return document.fullscreenEnabled!==false;
 if(typeof target?.webkitRequestFullscreen==="function")return document.webkitFullscreenEnabled!==false;
 return false;
}

function dispatchViewportRefresh(){
 requestAnimationFrame(()=>window.dispatchEvent(new Event("resize")));
 setTimeout(()=>window.dispatchEvent(new Event("resize")),180);
}
function syncFullscreenClass(){
 const active=isFullscreen();
 document.documentElement.classList.toggle("lw-fullscreen",active);
 document.body?.classList.toggle("lw-fullscreen",active);
 dispatchViewportRefresh();
}
function notifyFailure(){
 try{if(typeof showBadge==="function")showBadge(copy().failed)}catch(_){}
}
function requestNativeFullscreen(){
 const target=gameElement();
 if(!target)return Promise.reject(new Error("Game element unavailable"));
 if(typeof target.requestFullscreen==="function")return Promise.resolve(target.requestFullscreen());
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
}

function updateUI(){
 injectControls();
 const c=copy(),active=isFullscreen(),supported=fullscreenSupported();
 const settingsButton=$("#lwSettingsFullscreen"),menuButton=$("#lwMenuFullscreen"),status=$("#lwFullscreenStatus");
 if($("#lwDisplayTitle"))$("#lwDisplayTitle").textContent=c.title;
 if($("#lwDisplayHelp"))$("#lwDisplayHelp").textContent=c.help;
 const label=active?c.exit:c.enter;
 [settingsButton,menuButton].forEach(button=>{
  if(!button)return;
  button.textContent=supported?label:c.unavailable;
  button.disabled=!supported||pendingAction;
  button.hidden=false;
  button.setAttribute("aria-pressed",active?"true":"false");
 });
 if(status){
  status.textContent=!supported?c.unavailable:(active?c.on:c.off);
  status.classList.toggle("active",active);
 }
 const version=$("#settingsVersion");if(version)version.textContent="LAST WITNESS · BUILD 0.8.1";
 document.documentElement.classList.toggle("lw-fullscreen-failed",lastFailure);
}

function bind(){
 injectControls();
 /* Capture phase preserves the same user gesture before Chapter I's existing
  * Tap to Begin handler moves from Splash to Title and starts normal audio. */
 $("#enter")?.addEventListener("click",()=>{
  if(automaticAttempted||isFullscreen()||!fullscreenSupported())return;
  automaticAttempted=true;
  void enterFullscreen({quiet:true});
 },true);
 $("#lwSettingsFullscreen")?.addEventListener("click",()=>void toggleFullscreen());
 $("#lwMenuFullscreen")?.addEventListener("click",()=>{
  void toggleFullscreen();
  $("#drawer")?.classList.remove("open");
 });
 ["fullscreenchange","webkitfullscreenchange"].forEach(type=>document.addEventListener(type,()=>{syncFullscreenClass();updateUI()}));
 document.addEventListener("click",event=>{if(event.target.closest?.("[data-lang]"))setTimeout(updateUI,0)},true);
 window.addEventListener("orientationchange",dispatchViewportRefresh);
 window.visualViewport?.addEventListener?.("resize",dispatchViewportRefresh);
 syncFullscreenClass();
 updateUI();
}

window.LastWitnessFullscreen={
 enter:enterFullscreen,
 exit:exitFullscreen,
 toggle:toggleFullscreen,
 active:isFullscreen,
 supported:fullscreenSupported,
 updateLanguage:updateUI,
 version:"0.8.1"
};

if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",bind,{once:true});else bind();
})();
