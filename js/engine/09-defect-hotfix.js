/* LAST WITNESS — Legacy Compatibility Shim + Runtime Bootstrap 0.15.3
 * Loads approved localization and targeted QC before dynamic Chapter IV modules.
 * Targeted QC failure is non-blocking so Chapter IV remains playable.
 * No repair polling, scene mutation or gameplay override is installed here.
 */
(function(){
"use strict";
window.LastWitnessLegacyHotfix={disabled:true,version:"0.5.0"};

function stylesheet(href,id){
 if(document.getElementById(id))return;const link=document.createElement("link");link.id=id;link.rel="stylesheet";link.href=href;document.head.appendChild(link)
}
function script(src,id,ready){
 const existing=document.getElementById(id);if(ready?.())return Promise.resolve();if(existing?.dataset.loaded==="1")return Promise.resolve();if(existing?.__lwPromise)return existing.__lwPromise;
 const node=existing||document.createElement("script");node.id=id;node.src=src;node.async=false;
 node.__lwPromise=new Promise((resolve,reject)=>{node.addEventListener("load",()=>{node.dataset.loaded="1";resolve()},{once:true});node.addEventListener("error",reject,{once:true})});
 if(!existing)document.body.appendChild(node);return node.__lwPromise
}

script("js/engine/15-thai-localization.js?v=0152","lwThaiLocalizationScript",()=>Boolean(window.LastWitnessThaiLocalization?.version==="0.15.2"&&window.LastWitnessThaiLocalization?.installed))
 .then(()=>script(
  "js/engine/16-targeted-qc-fixes.js?v=0153",
  "lwTargetedQCFixesScript",
  ()=>Boolean(window.LastWitnessTargetedQCFixes?.version==="0.15.3"&&window.LastWitnessTargetedQCFixes?.installed)
 ).catch(error=>console.error("LAST WITNESS targeted QC failed to load",error)))
 .then(()=>script(
  "js/engine/17-police-portrait-alignment.js?v=0154",
  "lwPolicePortraitAlignmentScript",
  ()=>Boolean(window.LastWitnessPolicePortraitAlignment?.version==="0.15.4"&&window.LastWitnessPolicePortraitAlignment?.installed)
 ).catch(error=>console.error("LAST WITNESS police portrait alignment failed to load",error)))
 .then(()=>script("js/chapters/chapter-04/01-afterimage.js?v=0132","lwChapter04Phase01Script",()=>Boolean(window.LastWitnessChapter4Phase1)))
 .then(()=>{
  stylesheet("css/chapter-04-phase-02.css?v=0149","lwChapter04Phase02Style");
  return script("js/chapters/chapter-04/02a-jakarta-portrait-guard.js?v=0150","lwChapter04Phase02PortraitGuard",()=>Boolean(window.LastWitnessJakartaPortraitGuard?.version==="0.15.0"&&window.LastWitnessJakartaPortraitGuard?.installed))
 })
 .then(()=>script("js/chapters/chapter-04/02-jakarta-arrival.js?v=0147","lwChapter04Phase02Script",()=>Boolean(window.LastWitnessChapter4Phase2)))
 .catch(error=>console.error("LAST WITNESS runtime bootstrap failed",error));
})();