/* LAST WITNESS - Phase VIII Disclosure Matrix Exit Controller 0.22.7-m1
 * Surgical UX extension for Chapter IV Phase VIII.
 * Adds explicit Close + Resume without mutating matrix placements, attempts,
 * checkpoint, Save data, Hidden Case, dialogue geometry, Progress or routing.
 * The underlying P8 matrix stage remains canonical; pause is presentation-only.
 */
(function(){
"use strict";
const VERSION="0.22.7-m1";
if(window.LastWitnessP8MatrixExit?.version===VERSION&&window.LastWitnessP8MatrixExit?.installed){
 try{window.LastWitnessP8MatrixExit.install?.()}catch(_){}
 return
}
const $=(s,r=document)=>r.querySelector(s);
const gs=()=>{try{return state}catch(_){return window.state||null}};
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,Number(v)||0));
const thai=()=>gs()?.language==="th"||document.documentElement.lang==="th";
const DEBRIEF="shadowTruthDebrief";
let paused=false;
let installed=false;
let installAttempts=0;
let pauseTimer=0;
let audioTimers=[];

function phaseApi(){return window.LastWitnessChapter4Phase8||null}
function phaseState(){try{return phaseApi()?.phaseState?.()||null}catch(_){return null}}
function matrix(){return $("#ch4P8Matrix")}
function resumeButton(){return $("#ch4P8MatrixResume")}
function activeScreen(){return $(".screen.active")?.id||gs()?.screen||""}
function clearAudioTimers(){audioTimers.forEach(clearTimeout);audioTimers=[]}
function queueAudio(fn){clearAudioTimers();[0,90,620].forEach(ms=>audioTimers.push(setTimeout(fn,ms)))}
function applyAudioMode(){
 const s=gs(),p=phaseState(),screen=activeScreen(),investigation=$("#ch4P8InvestigationMusic"),room=$("#ch4P8RoomAmb"),roomBase=$("#ch4P8RoomBase");
 if(!p||screen!==DEBRIEF)return;
 const on=s?.sound!==false,music=clamp(Number(s?.music??.33)),sfx=clamp(Number(s?.sfx??.55));
 const investigationTarget=on?clamp(music*.40*(paused?1:.48),0,.85):0;
 const roomTarget=on?clamp(sfx*.028,0,.85):0,roomBaseTarget=on?clamp(sfx*.010,0,.85):0;
 [[investigation,investigationTarget],[room,roomTarget],[roomBase,roomBaseTarget]].forEach(([media,target])=>{
  if(!media)return;
  try{media.volume=target;if(target>0&&media.paused)media.play().catch(()=>{});if(target===0&&!media.paused)media.pause()}catch(_){}
 })
}
function updateCopy(){
 const close=$("#ch4P8MatrixClose"),resume=resumeButton();
 if(close){close.setAttribute("aria-label",thai()?"ปิดมินิเกมและกลับไปที่ห้องสรุปปฏิบัติการ":"Close minigame and return to Secure Debrief");close.title=close.getAttribute("aria-label")}
 if(resume){resume.innerHTML=thai()?'<span>กลับไปที่</span><strong>DISCLOSURE MATRIX</strong>':'<span>RESUME</span><strong>DISCLOSURE MATRIX</strong>';resume.setAttribute("aria-label",thai()?"กลับไปทำ Disclosure Matrix ต่อ":"Resume Disclosure Matrix")}
}
function showResume(){const b=resumeButton();if(b){b.hidden=false;b.setAttribute("aria-hidden","false")}updateCopy()}
function hideResume(){const b=resumeButton();if(b){b.hidden=true;b.setAttribute("aria-hidden","true")}}
function clearPause(){paused=false;clearTimeout(pauseTimer);pauseTimer=0;hideResume();matrix()?.classList.remove("lw-p8-matrix-paused");clearAudioTimers()}
function canPause(){const p=phaseState(),m=matrix();return Boolean(p&&!p.matrixComplete&&p.stage==="matrix"&&m?.classList.contains("open"))}
function pauseMatrix(event){
 event?.preventDefault?.();event?.stopPropagation?.();event?.stopImmediatePropagation?.();
 if(!canPause())return false;
 const m=matrix();paused=true;m.classList.add("lw-p8-matrix-paused");m.classList.remove("open");m.setAttribute("aria-hidden","true");showResume();queueAudio(applyAudioMode);startPauseGuard();resumeButton()?.focus?.({preventScroll:true});return true
}
function resumeMatrix(event){
 event?.preventDefault?.();event?.stopPropagation?.();
 const p=phaseState(),m=matrix();if(!paused||!p||p.matrixComplete||p.stage!=="matrix"||!m){clearPause();return false}
 paused=false;hideResume();m.classList.remove("lw-p8-matrix-paused");m.classList.add("open");m.setAttribute("aria-hidden","false");queueAudio(applyAudioMode);
 setTimeout(()=>{const target=$("#ch4P8SubjectTabs button.active")||$("#ch4P8MatrixCards button")||$("#ch4P8MatrixConfirm");target?.focus?.({preventScroll:true})},30);return true
}
function startPauseGuard(){
 clearTimeout(pauseTimer);
 const tick=()=>{
  if(!paused)return;
  const p=phaseState(),m=matrix();
  if(!p||p.matrixComplete||p.stage!=="matrix"){clearPause();return}
  if(activeScreen()===DEBRIEF){m?.classList.add("lw-p8-matrix-paused");m?.classList.remove("open");m?.setAttribute("aria-hidden","true");showResume()}
  applyAudioMode();pauseTimer=setTimeout(tick,360)
 };
 pauseTimer=setTimeout(tick,360)
}
function ensureUi(){
 try{phaseApi()?.install?.()}catch(_){}
 const m=matrix(),head=$("#ch4P8Matrix .ch4-p8-matrix-head"),screen=$("#"+DEBRIEF);if(!m||!head||!screen)return false;
 let close=$("#ch4P8MatrixClose");if(!close){close=document.createElement("button");close.id="ch4P8MatrixClose";close.className="ch4-p8-matrix-close";close.type="button";close.innerHTML='<span aria-hidden="true">×</span>';close.addEventListener("click",pauseMatrix,true);head.appendChild(close)}
 let resume=resumeButton();if(!resume){resume=document.createElement("button");resume.id="ch4P8MatrixResume";resume.className="ch4-p8-matrix-resume";resume.type="button";resume.hidden=true;resume.setAttribute("aria-hidden","true");resume.addEventListener("click",resumeMatrix);screen.appendChild(resume)}
 updateCopy();return true
}
function install(){
 if(!ensureUi()){installAttempts++;if(installAttempts<40)setTimeout(install,80);else console.warn("LAST WITNESS P8 Matrix Exit could not attach to Matrix UI");return false}
 installAttempts=0;
 if(installed)return true;installed=true;if(window.LastWitnessP8MatrixExit)window.LastWitnessP8MatrixExit.installed=true;
 document.addEventListener("click",event=>{
  if(event.target.closest?.("[data-lang]"))setTimeout(updateCopy,0);
  if(paused&&event.target.closest?.("#soundToggle,#musicRange,#sfxRange,#resume,.closeModal,#settingsButton,#historyButton,#charactersButton,#caseButton"))queueAudio(applyAudioMode)
 },true);
 document.addEventListener("input",event=>{if(paused&&event.target.closest?.("#musicRange,#sfxRange"))queueAudio(applyAudioMode)},true);
 document.addEventListener("change",event=>{if(paused&&event.target.closest?.("#soundToggle,#musicRange,#sfxRange"))queueAudio(applyAudioMode)},true);
 document.addEventListener("visibilitychange",()=>{if(paused&&!document.hidden)queueAudio(applyAudioMode)});
 window.addEventListener("focus",()=>{if(paused)queueAudio(applyAudioMode)});
 document.addEventListener("lw-state-restored",()=>{if(paused)startPauseGuard()});
 document.addEventListener("keydown",event=>{if(event.key==="Escape"&&canPause())pauseMatrix(event)});
 return true
}
window.LastWitnessP8MatrixExit={version:VERSION,installed:false,install,pause:pauseMatrix,resume:resumeMatrix,isPaused:()=>paused};
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",install,{once:true});else install();
})();
