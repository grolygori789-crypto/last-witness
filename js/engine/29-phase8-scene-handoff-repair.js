/* LAST WITNESS - Phase VIII Scene Repair Neutralizer 0.21.4
 * 0.21.3's global MutationObserver was unsafe and could starve the main UI loop.
 * Scene-shell compatibility now lives directly in 08-shadow-of-truth.js.
 */
(function(){
"use strict";
window.LastWitnessPhase8SceneRepair={
 version:"0.21.3",
 installed:true,
 neutralized:true,
 install(){return true},
 applyPhase7Shell(){return true},
 recoverDebrief(){return false},
 check(){return true}
};
})();
