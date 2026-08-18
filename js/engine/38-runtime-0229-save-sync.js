/* LAST WITNESS - Runtime 0.22.9 Save Metadata Sync 0.22.9-s1
 * Base-runtime bridge for the unchanged 0.7.10-s2 Save Manager implementation.
 * It changes actual newly-created save metadata to Runtime 0.22.9; it does not
 * relabel existing save files or alter restore/state logic.
 */
(function(){
"use strict";
const VERSION="0.22.9-s1";
const BUILD="0.22.9";
if(window.LastWitnessRuntime0229SaveSync?.version===VERSION){try{window.LastWitnessRuntime0229SaveSync.install?.()}catch(_){}return}
let installed=false;
function install(){
 window.LastWitnessRuntimeBuild=BUILD;
 document.documentElement.dataset.runtimeBuild=BUILD;
 try{if(window.LastWitnessSaveManager)window.LastWitnessSaveManager.version=BUILD}catch(_){}
 try{
  const current=typeof snapshot==="function"?snapshot:window.snapshot;
  if(typeof current==="function"&&!current.__lwRuntime0229SaveSync){
   const wrapped=function(){const data=current.apply(this,arguments);if(data&&typeof data==="object")data.build=BUILD;return data};
   wrapped.__lwRuntime0229SaveSync=true;wrapped.__lwOriginal=current;
   try{window.snapshot=wrapped}catch(_){}
   try{snapshot=wrapped}catch(_){}
  }
 }catch(error){console.warn("LAST WITNESS Runtime 0.22.9 save metadata sync skipped",error)}
 installed=true;return true
}
window.LastWitnessRuntime0229SaveSync={version:VERSION,build:BUILD,installed:true,install};
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",install,{once:true});else install();
})();
