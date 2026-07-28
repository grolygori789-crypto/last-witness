/* LAST WITNESS — Legacy Compatibility Shim + Season 2 Bootstrap 0.13.2
 * Historical 0.3.9 repair logic remains consolidated in
 * 11-production-stabilization.js. This file installs no repair listeners,
 * observers, polling loops or audio overrides. It only loads the approved
 * Chapter IV runtime once from the existing static chain.
 */
(function(){
"use strict";
window.LastWitnessLegacyHotfix={disabled:true,version:"0.5.0"};
if(document.getElementById("lwChapter04Phase01Script"))return;
const script=document.createElement("script");
script.id="lwChapter04Phase01Script";
script.src="js/chapters/chapter-04/01-afterimage.js?v=0132";
script.async=false;
document.body.appendChild(script);
})();
