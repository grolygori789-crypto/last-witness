/* LAST WITNESS - Legacy Compatibility Shim + Runtime Bootstrap 0.17.3
 * Loads approved localization and targeted QC before dynamic Chapter IV modules.
 * Existing Phase I through Phase III order is preserved. Phase IV 0.17.0 loads first,
 * followed by the owner-approved consistency repair 0.17.3,
 * then the direct Phase III handoff and Developer Phase Navigation patches.
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
 .then(()=>script("js/chapters/chapter-04/02-jakarta-arrival.js?v=0164","lwChapter04Phase02Script",()=>Boolean(window.LastWitnessChapter4Phase2?.version==="0.14.9")))
 .then(()=>{
  stylesheet("css/chapter-04-phase-03.css?v=0163","lwChapter04Phase03Style");
  return script("js/chapters/chapter-04/03-packet-provenance.js?v=0163d2","lwChapter04Phase03Script",()=>Boolean(window.LastWitnessChapter4Phase3?.version==="0.16.3"))
   .catch(error=>console.error("LAST WITNESS Packet Provenance failed to load",error))
 })
 .then(()=>{
  stylesheet("css/chapter-04-phase-04.css?v=0170","lwChapter04Phase04Style");
  return script("js/chapters/chapter-04/04-arman-encounter.js?v=0170","lwChapter04Phase04Script",()=>Boolean(window.LastWitnessChapter4Phase4?.version==="0.17.0"))
   .catch(error=>console.error("LAST WITNESS The Man Behind the Alias failed to load",error))
 })
 .then(()=>{
  stylesheet("css/chapter-04-phase-04-revision.css?v=0173","lwChapter04Phase04RevisionStyle");
  return script(
   "js/chapters/chapter-04/04a-arman-encounter-revision.js?v=0173",
   "lwChapter04Phase04RevisionScript",
   ()=>Boolean(window.LastWitnessChapter4Phase4Revision?.version==="0.17.3"&&window.LastWitnessChapter4Phase4Revision?.installed)
  ).catch(error=>console.error("LAST WITNESS Phase IV consistency repair failed to load",error))
 })
 .then(()=>script(
  "js/engine/19-ch4-phase3-direct-handoff.js?v=0170d2",
  "lwChapter4Phase3DirectHandoffScript",
  ()=>Boolean(window.LastWitnessPhase3DirectHandoff?.version==="0.17.0-d2"&&window.LastWitnessPhase3DirectHandoff?.installed)
 ).catch(error=>console.error("LAST WITNESS Phase III direct handoff failed to load",error)))
 .then(()=>script(
  "js/engine/18-developer-phase-navigation.js?v=0170d2",
  "lwDeveloperPhaseNavigationScript",
  ()=>Boolean(window.LastWitnessDeveloperPhaseNavigation?.version==="0.17.0-d2"&&window.LastWitnessDeveloperPhaseNavigation?.installed)
 ).catch(error=>console.error("LAST WITNESS Developer Phase Navigation failed to load",error)))
 .catch(error=>console.error("LAST WITNESS runtime bootstrap failed",error));
})();
