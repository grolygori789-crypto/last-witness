/* LAST WITNESS - CH5P1 Police next-morning cue 0.22.8-c5t1
 * Additive time-transition layer only. It does not change CH5P1 dialogue,
 * routing, audio, evidence, choices, progress or established scene geometry.
 */
(function(){
"use strict";
const VERSION="0.22.8-c5t1";
const POLICE_ID="ch5P1Police";
const TOTAL_MS=3200;
const EXIT_MS=480;
if(window.LastWitnessChapter5PoliceTimeCue?.version===VERSION){try{window.LastWitnessChapter5PoliceTimeCue.install?.()}catch(_){}return}
const $=(selector,root=document)=>root.querySelector(selector);
const gs=()=>{try{return state}catch(_){return window.state||null}};
const thai=()=>gs()?.language==="th"||document.documentElement.lang==="th";
let observer=null;
let running=false;
let remaining=TOTAL_MS;
let startedAt=0;
let exitTimer=0;
let finishTimer=0;
let installTimer=0;

function clearTimers(){clearTimeout(exitTimer);clearTimeout(finishTimer);exitTimer=finishTimer=0}
function screen(){return $("#"+POLICE_ID)}
function overlay(){return $("#ch5P1PoliceTimeCue")}
function phase(){try{return gs()?.flags?.ch5_p1||{}}catch(_){return{}}}
function updateText(){
 const o=overlay();if(!o)return;
 const set=(selector,value)=>{const n=$(selector,o);if(n)n.textContent=value};
 if(thai()){
  set(".ch5-p1-police-time-cue-eyebrow","กรุงเทพฯ · ประเทศไทย");
  set(".ch5-p1-police-time-cue-title","เช้าวันถัดมา");
  set(".ch5-p1-police-time-cue-time","วันที่ 7 · 08:45 น.");
  set(".ch5-p1-police-time-cue-location","สถานีตำรวจ · ฝ่ายพยานหลักฐาน");
 }else{
  set(".ch5-p1-police-time-cue-eyebrow","BANGKOK · THAILAND");
  set(".ch5-p1-police-time-cue-title","NEXT MORNING");
  set(".ch5-p1-police-time-cue-time","DAY 7 · 08:45 ICT");
  set(".ch5-p1-police-time-cue-location","POLICE STATION · EVIDENCE DIVISION");
 }
}
function inject(){
 const s=screen();if(!s)return false;
 if(!overlay())s.insertAdjacentHTML("beforeend",'<div id="ch5P1PoliceTimeCue" class="ch5-p1-police-time-cue" hidden aria-hidden="true"><div class="ch5-p1-police-time-cue-card"><div class="eyebrow ch5-p1-police-time-cue-eyebrow"></div><h2 class="ch5-p1-police-time-cue-title"></h2><div class="ch5-p1-police-time-cue-rule"></div><p class="ch5-p1-police-time-cue-time"></p><p class="ch5-p1-police-time-cue-location"></p></div></div>');
 updateText();return true
}
function markSeen(){
 try{
  const s=gs();if(!s)return;s.flags=s.flags||{};s.flags.ch5_p1=s.flags.ch5_p1||{};s.flags.ch5_p1.policeTimeCueSeen=true;
  if(typeof autoSave==="function")autoSave()
 }catch(_){}
}
function shouldStart(){
 const s=screen(),p=phase();
 return Boolean(s?.classList.contains("active")&&p?.arrivalSeen&&!p?.policeIntroComplete&&!p?.policeTimeCueSeen)
}
function schedule(){
 if(!running||document.hidden)return;
 clearTimers();startedAt=performance.now();
 const o=overlay();if(o){if(remaining>EXIT_MS)o.classList.remove("is-leaving");else o.classList.add("is-leaving")}
 exitTimer=setTimeout(()=>overlay()?.classList.add("is-leaving"),Math.max(0,remaining-EXIT_MS));
 finishTimer=setTimeout(finish,Math.max(0,remaining))
}
function begin(){
 if(running||!inject())return;
 const s=screen(),o=overlay();if(!s||!o)return;
 running=true;remaining=TOTAL_MS;updateText();markSeen();
 s.classList.add("ch5-p1-police-timecue-active");
 o.hidden=false;o.setAttribute("aria-hidden","false");o.classList.remove("is-leaving");
 void o.offsetWidth;
 schedule()
}
function pause(){
 if(!running||document.hidden===false)return;
 if(startedAt)remaining=Math.max(0,remaining-(performance.now()-startedAt));
 startedAt=0;clearTimers()
}
function resume(){
 if(!running||document.hidden)return;
 if(remaining<=0){finish();return}
 schedule()
}
function finish(){
 clearTimers();startedAt=0;
 const s=screen(),o=overlay();
 running=false;remaining=TOTAL_MS;
 s?.classList.remove("ch5-p1-police-timecue-active");
 if(o){o.hidden=true;o.setAttribute("aria-hidden","true");o.classList.remove("is-leaving")}
}
function sync(){
 if(!inject())return;
 if(shouldStart())begin();
 else if(running&&!screen()?.classList.contains("active"))finish()
}
function install(){
 clearTimeout(installTimer);
 if(!inject()){installTimer=setTimeout(install,80);return false}
 if(!observer){observer=new MutationObserver(sync);observer.observe(screen(),{attributes:true,attributeFilter:["class"]})}
 document.addEventListener("visibilitychange",()=>{if(document.hidden)pause();else resume()});
 document.addEventListener("click",event=>{if(event.target.closest?.("[data-lang]"))setTimeout(updateText,0)},true);
 sync();return true
}
window.LastWitnessChapter5PoliceTimeCue={version:VERSION,installed:true,install,stop:finish};
install();
})();
