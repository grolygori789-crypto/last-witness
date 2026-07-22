/* LAST WITNESS — Chapter II / Chapter III Production Integration 0.6.6
 * Owns the Medical transition and loads Chapter III on demand.
 * Production Runtime 11 is loaded once by 08-stability-repair.js.
 */
(function(){
"use strict";
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
let medicalTransitioning=false;
function language(){try{return window.state?.language==="th"?"th":"en";}catch(_){return document.documentElement.lang==="th"?"th":"en";}}
function stopAudio(audio,reset=true){if(!audio)return;try{audio.pause();if(reset)audio.currentTime=0;}catch(_){}}
function activateScreen(id){$$('.screen').forEach(screen=>screen.classList.remove('active'));const target=document.getElementById(id);target?.classList.add('active');if(window.state&&target)state.screen=target.id;}
function closeOverlays(){
 $("#drawer")?.classList.remove("open");
 $$(".modal.open").forEach(modal=>modal.classList.remove("open"));
 $("#forensicPhaseComplete")?.style.setProperty("display","none");
 ["apartmentEvidence","policeEvidencePanel","forensicEvidencePanel","medicalEvidencePanel"].forEach(id=>{const panel=$("#"+id);if(panel){panel.classList.remove("open");panel.setAttribute("aria-hidden","true");}});
 $("#medicalChoice")?.classList.add("hidden");
 $("#medicalDialogue")?.classList.add("hidden");
}
function titleAudioState(){
 $$('audio').forEach(audio=>stopAudio(audio,true));
 if(window.state?.sound===false)return;
 const music=Number(window.state?.music);const level=Number.isFinite(music)?Math.max(0,Math.min(1,music)):0.33;
 const theme=$("#themeAudio"),rain=$("#rainAudio");
 if(theme){theme.loop=true;theme.volume=level;theme.play().catch(()=>{});}if(rain){rain.loop=true;rain.volume=level*.48;rain.play().catch(()=>{});}
}
function showChapter2Complete(){
 closeOverlays();
 ["medicalRefrigeratorAudio","medicalMachineAudio","forensicHumAudio","policeAudio","morningOfficeAudio","cafeAudio","crimeAudio","officeAudio"].forEach(id=>stopAudio(document.getElementById(id),true));
 activateScreen("chapter2Complete");localizeEnding();
 try{state.medical=state.medical||{};state.medical.complete=true;state.progress=100;if(typeof autoSave==="function")autoSave();}catch(_){}
}
function returnToTitle(){
 try{if(typeof autoSave==="function")autoSave();}catch(_){}
 closeOverlays();$$('audio').forEach(audio=>stopAudio(audio,true));activateScreen("title");requestAnimationFrame(titleAudioState);
}
function enterMedicalExaminer(event){
 event?.preventDefault();event?.stopImmediatePropagation();
 if(medicalTransitioning)return;
 medicalTransitioning=true;
 const complete=$("#forensicPhaseComplete");
 if(complete){complete.style.setProperty("display","none","important");complete.setAttribute("aria-hidden","true");}
 stopAudio($("#forensicHumAudio"),true);
 window.LastWitnessAudioCue?.stopEvidenceCue?.();
 if(window.state){
  state.medical={started:true,inspected:[],found:[],collected:[],active:null,choice:null,complete:false,ratchataMet:false,ratchataJournalUnlocked:false};
  ["postmortem","identity_tag","autopsy_report","toxicology_sample"].forEach(id=>{try{state.found?.delete?.("medical_"+id);}catch(_){}});
 }
 const medical=window.LastWitnessMedicalExaminer;
 try{
  if(medical?.startFresh)medical.startFresh();
  else if(medical?.start)medical.start();
 }finally{
  /* Release the short transition lock after the synchronous screen change.
   * forensicIsComplete() also requires state.screen === "forensic2", so
   * queued callbacks cannot reopen Medical after the screen has changed. */
  medicalTransitioning=false;
 }
}
function forensicIsComplete(){
 try{return Boolean(window.state&&state.screen==="forensic2"&&(state.forensic?.complete===true||state.forensic?.choice));}
 catch(_){return false;}
}
function transitionCompletedForensic(){
 if(!forensicIsComplete())return false;
 enterMedicalExaminer();
 return true;
}
function installDirectForensicTransition(){
 if(!$("#lwDirectForensicMedical065")){
  const style=document.createElement("style");
  style.id="lwDirectForensicMedical065";
  style.textContent="#forensicPhaseComplete{display:none!important}";
  document.head.appendChild(style);
 }
 const complete=$("#forensicPhaseComplete");
 if(complete){complete.style.setProperty("display","none","important");complete.setAttribute("aria-hidden","true");}
}
function addStylesheetOnce(href,id){if(document.getElementById(id))return;const link=document.createElement("link");link.id=id;link.rel="stylesheet";link.href=href;document.head.appendChild(link);}
function loadScriptOnce(src,id){
 const existing=document.getElementById(id);
 if(existing?.dataset.loaded==="1")return Promise.resolve();
 if(existing?.__lwPromise)return existing.__lwPromise;
 const script=existing||document.createElement("script");script.id=id;script.src=src;script.async=false;
 script.__lwPromise=new Promise((resolve,reject)=>{script.addEventListener("load",()=>{script.dataset.loaded="1";resolve();},{once:true});script.addEventListener("error",reject,{once:true});});
 if(!existing)document.body.appendChild(script);return script.__lwPromise;
}
let runtimePromise=null;
function ensureProductionRuntime(){
 if(runtimePromise)return runtimePromise;
 addStylesheetOnce("css/chapter-03.css?v=063","lwChapter03Style");
 runtimePromise=loadScriptOnce("js/chapters/chapter-03/01-title-phase1.js?v=063","lwChapter03Script").catch(error=>{console.error("LAST WITNESS Chapter III runtime failed to load",error);throw error;});
 return runtimePromise;
}
async function startChapter3(event){
 event?.preventDefault();event?.stopImmediatePropagation();stopAudio($("#chapterAudio"),true);closeOverlays();
 try{await ensureProductionRuntime();if(!window.LastWitnessChapter3?.startFromChapter2)throw new Error("Chapter III runtime unavailable");window.LastWitnessChapter3.startFromChapter2();}
 catch(_){activateScreen("chapter3Wip");localizeEnding();}
}
function localizeEnding(){
 const th=language()==="th";
 const copy=th?{eyebrow:"ปิดคดี",title:"จบบทที่ II",caseName:"คำลวงสิบเอ็ดนาที",body:"ผลทางวิทยาศาสตร์เป็นของจริง แต่ลำดับเวลารอบมันถูกจัดวาง การสืบสวนยังดำเนินต่อไป",continueLabel:"ไปต่อบทที่ III",returnLabel:"กลับหน้าแรก",wipTitle:"บทที่ III",wipText:"ไม่สามารถโหลดบทที่ III ได้ในขณะนี้ ความคืบหน้าของบทที่ II ถูกบันทึกแล้ว"}:{eyebrow:"Case Closed",title:"CHAPTER II COMPLETE",caseName:"THE ELEVEN-MINUTE LIE",body:"The science is genuine. The timeline around it was engineered. The investigation continues.",continueLabel:"Continue to Chapter III",returnLabel:"Return to Title",wipTitle:"CHAPTER III",wipText:"Chapter III could not be loaded. Your Chapter II progress has been saved."};
 if($("#chapter2CompleteEyebrow"))$("#chapter2CompleteEyebrow").textContent=copy.eyebrow;
 if($("#chapter2CompleteTitle"))$("#chapter2CompleteTitle").textContent=copy.title;
 if($("#chapter2CompleteCase"))$("#chapter2CompleteCase").textContent=copy.caseName;
 if($("#chapter2CompleteText"))$("#chapter2CompleteText").textContent=copy.body;
 if($("#continueChapter3"))$("#continueChapter3").textContent=copy.continueLabel;
 if($("#chapter2ReturnTitle"))$("#chapter2ReturnTitle").textContent=copy.returnLabel;
 if($("#chapter3WipTitle"))$("#chapter3WipTitle").textContent=copy.wipTitle;
 if($("#chapter3WipText"))$("#chapter3WipText").textContent=copy.wipText;
 if($("#chapter3WipReturnTitle"))$("#chapter3WipReturnTitle").textContent=copy.returnLabel;
}
function bind(){
 localizeEnding();
 installDirectForensicTransition();
 $("#continueChapter3")?.addEventListener("click",startChapter3,true);
 $("#chapter2ReturnTitle")?.addEventListener("click",returnToTitle,true);
 $("#chapter3WipReturnTitle")?.addEventListener("click",returnToTitle,true);
 $("#continueMedicalExaminer")?.addEventListener("click",enterMedicalExaminer,true);
 document.addEventListener("click",event=>{
  if(event.target.closest?.("[data-lang]"))setTimeout(localizeEnding,0);
  if(event.target.closest?.("#forensicDialogue"))setTimeout(transitionCompletedForensic,0);
  if(event.target.closest?.("#continueGame,#loadTitle,#loadManual"))setTimeout(transitionCompletedForensic,80);
 },true);
 queueMicrotask(transitionCompletedForensic);
 window.LastWitnessChapter2Integration={showChapter2Complete,returnToTitle,enterMedicalExaminer,transitionCompletedForensic,startChapter3,ensureProductionRuntime,titleAudioState,version:"0.6.6"};
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",bind,{once:true});else bind();
})();
