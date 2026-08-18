/* LAST WITNESS - CH5P2 Silent Interaction Surface 0.22.11-p2s3
 * Removes shared tactile click audio from high-frequency Phase II investigation
 * controls without blocking their pointer/click events or changing global Menu/Settings audio.
 */
(function(){
"use strict";
const VERSION="0.22.11-p2s3";
if(window.LastWitnessChapter5Phase2SilentUI?.version===VERSION){try{window.LastWitnessChapter5Phase2SilentUI.install?.()}catch(_){}return}
const SELECTOR=[
 ".ch5-p2-dialogue",
 "[data-c5p2-source]","[data-c5p2-slot]","[data-c5p2-conclusion]",
 "#ch5P2OpenRecon","#ch5P2ReconReset","#ch5P2ReconConfirm","#ch5P2ReconClose",
 "#ch5P2NarinNext","#ch5P2NarinClose"
].join(",");
let wrapped=null;
function install(){
 const current=window.__lwPointerClickHandler;
 if(typeof current!=="function")return false;
 if(current.__lwCh5P2SilentUI===VERSION)return true;
 try{document.removeEventListener("pointerdown",current,true)}catch(_){}
 wrapped=function(event){if(event.target?.closest?.(SELECTOR))return;return current.call(this,event)};
 wrapped.__lwCh5P2SilentUI=VERSION;wrapped.__lwOriginal=current;
 window.__lwPointerClickHandler=wrapped;
 document.addEventListener("pointerdown",wrapped,true);
 return true
}
function schedule(){[0,80,220,600,1200].forEach(ms=>setTimeout(install,ms))}
window.LastWitnessChapter5Phase2SilentUI={version:VERSION,installed:true,install,selector:SELECTOR};
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",schedule,{once:true});else schedule();
})();
