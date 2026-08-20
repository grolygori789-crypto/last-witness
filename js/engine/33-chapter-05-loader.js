/* LAST WITNESS - Chapter V Production Loader 0.22.19-c5b27
 * Historical 0.4.x repair logic remains retired. This file owns the scoped
 * Chapter V production extensions under base Runtime 0.22.19.
 */
(function(){
"use strict";
const VERSION="0.22.19-c5b27";
if(window.LastWitnessChapter5Bootstrap?.version===VERSION)return;
function stylesheet(href,id){if(document.getElementById(id))return;const n=document.createElement("link");n.id=id;n.rel="stylesheet";n.href=href;document.head.appendChild(n)}
function stylesheetAsync(href,id){const existing=document.getElementById(id);if(existing?.dataset.loaded==="1"||existing?.sheet)return Promise.resolve();if(existing?.__lwPromise)return existing.__lwPromise;const n=existing||document.createElement("link");n.id=id;n.rel="stylesheet";n.href=href;n.__lwPromise=new Promise((resolve,reject)=>{n.addEventListener("load",()=>{n.dataset.loaded="1";resolve()},{once:true});n.addEventListener("error",reject,{once:true})});if(!existing)document.head.appendChild(n);return n.__lwPromise}
function script(src,id,ready){const existing=document.getElementById(id);if(ready?.())return Promise.resolve();if(existing?.dataset.loaded==="1")return Promise.resolve();if(existing?.__lwPromise)return existing.__lwPromise;const n=existing||document.createElement("script");n.id=id;n.src=src;n.async=false;n.__lwPromise=new Promise((resolve,reject)=>{n.addEventListener("load",()=>{n.dataset.loaded="1";resolve()},{once:true});n.addEventListener("error",reject,{once:true})});if(!existing)document.body.appendChild(n);return n.__lwPromise}
function install(){
 stylesheet("css/chapter-05-phase-01.css?v=0228c5p1r10","lwChapter05Phase01Style");
 return script("js/chapters/chapter-05/01-return-to-bangkok.js?v=0228c5p1r10","lwChapter05Phase01Script",()=>Boolean(window.LastWitnessChapter5Phase1?.version==="0.22.8-c5p1r10"&&window.LastWitnessChapter5Phase1?.installed))
  .then(()=>{try{window.LastWitnessChapter5Phase1.install?.()}catch(_){};return script("js/engine/35-ch5p1-north-portrait-fix.js?v=0228c5n1","lwChapter05NorthPortraitFixScript",()=>Boolean(window.LastWitnessChapter5NorthPortraitFix?.version==="0.22.8-c5n1"&&window.LastWitnessChapter5NorthPortraitFix?.installed))})
  .then(()=>{try{window.LastWitnessChapter5NorthPortraitFix.install?.()}catch(_){};return stylesheetAsync("css/ch5p1-police-time-cue.css?v=0228c5t1","lwChapter05PoliceTimeCueStyle")})
  .then(()=>script("js/engine/36-ch5p1-police-time-cue.js?v=0228c5t1","lwChapter05PoliceTimeCueScript",()=>Boolean(window.LastWitnessChapter5PoliceTimeCue?.version==="0.22.8-c5t1"&&window.LastWitnessChapter5PoliceTimeCue?.installed)))
  .then(()=>{try{window.LastWitnessChapter5PoliceTimeCue.install?.()}catch(_){};return stylesheetAsync("css/chapter-05-phase-02.css?v=0239c5p2r15","lwChapter05Phase02Style")})
  .then(()=>script("js/chapters/chapter-05/02-name-in-room-1807.js?v=0241c5p2r17","lwChapter05Phase02Script",()=>Boolean(window.LastWitnessChapter5Phase2?.version==="0.22.19-c5p2r17"&&window.LastWitnessChapter5Phase2?.installed)))
  .then(()=>{try{window.LastWitnessChapter5Phase2.install?.()}catch(_){};return script("js/engine/37-ch5p2-hidden-case-extension.js?v=0231c5h3","lwChapter05Phase02HiddenCaseScript",()=>Boolean(window.LastWitnessChapter5Phase2HiddenCase?.version==="0.22.11-c5h3"&&window.LastWitnessChapter5Phase2HiddenCase?.installed))})
  .then(()=>{try{window.LastWitnessChapter5Phase2HiddenCase.install?.()}catch(_){};return script("js/engine/34-chapter-05-owner-walkthrough.js?v=0231c5w4","lwChapter05OwnerWalkthroughScript",()=>Boolean(window.LastWitnessChapter5OwnerWalkthrough?.version==="0.22.11-c5w4"&&window.LastWitnessChapter5OwnerWalkthrough?.installed))})
  .then(()=>{try{window.LastWitnessChapter5OwnerWalkthrough?.install?.()}catch(_){}})
  .catch(error=>console.error("LAST WITNESS Chapter V extension failed to load",error))
}
window.LastWitnessChapter5Bootstrap={version:VERSION,installed:true,install};
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",install,{once:true});else install();
})();
