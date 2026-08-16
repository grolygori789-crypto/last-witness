/* LAST WITNESS - Chapter V Production Loader 0.22.7-c5b4
 * Historical 0.4.x repair logic remains retired. This file now owns only the
 * scoped Chapter V Phase I production extension loader under Runtime 0.22.7.
 */
(function(){
"use strict";
const VERSION="0.22.7-c5b4";
if(window.LastWitnessChapter5Bootstrap?.version===VERSION)return;
function stylesheet(href,id){if(document.getElementById(id))return;const n=document.createElement("link");n.id=id;n.rel="stylesheet";n.href=href;document.head.appendChild(n)}
function script(src,id,ready){const existing=document.getElementById(id);if(ready?.())return Promise.resolve();if(existing?.dataset.loaded==="1")return Promise.resolve();if(existing?.__lwPromise)return existing.__lwPromise;const n=existing||document.createElement("script");n.id=id;n.src=src;n.async=false;n.__lwPromise=new Promise((resolve,reject)=>{n.addEventListener("load",()=>{n.dataset.loaded="1";resolve()},{once:true});n.addEventListener("error",reject,{once:true})});if(!existing)document.body.appendChild(n);return n.__lwPromise}
function install(){
 stylesheet("css/chapter-05-phase-01.css?v=0227c5p1r6","lwChapter05Phase01Style");
 return script("js/chapters/chapter-05/01-return-to-bangkok.js?v=0227c5p1r6","lwChapter05Phase01Script",()=>Boolean(window.LastWitnessChapter5Phase1?.version==="0.22.7-c5p1r6"&&window.LastWitnessChapter5Phase1?.installed))
  .then(()=>{try{window.LastWitnessChapter5Phase1.install?.()}catch(_){};return script("js/engine/34-chapter-05-owner-walkthrough.js?v=0227c5w1","lwChapter05OwnerWalkthroughScript",()=>Boolean(window.LastWitnessChapter5OwnerWalkthrough?.version==="0.22.7-c5w1"&&window.LastWitnessChapter5OwnerWalkthrough?.installed))})
  .then(()=>{try{window.LastWitnessChapter5OwnerWalkthrough?.install?.()}catch(_){}})
  .catch(error=>console.error("LAST WITNESS Chapter V Phase I extension failed to load",error))
}
window.LastWitnessChapter5Bootstrap={version:VERSION,installed:true,install};
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",install,{once:true});else install();
})();
