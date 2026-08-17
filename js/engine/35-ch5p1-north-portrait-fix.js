/* LAST WITNESS - CH5P1 North portrait asset fix 0.22.8-c5n1
 * Replaces only the two owner-approved North portrait shots that remained open
 * in Chapter V / Phase I and leaves all other portrait mappings untouched.
 */
(function(){
"use strict";
const VERSION="0.22.8-c5n1";
if(window.LastWitnessChapter5NorthPortraitFix?.version===VERSION)return;
const NORTH_CONCERNED="assets/images/76e0d6b4a8c0dd91.jpg?v=0228c5n1";
const NORTH_RELIEVED="assets/images/4f6ec1f83a9b7d20.jpg?v=0228c5n1";
function install(){
 try{
  window.PORTRAITS=window.PORTRAITS||{};
  window.PORTRAITS.North=window.PORTRAITS.North||{};
  window.PORTRAITS.North.concerned=NORTH_CONCERNED;
  window.PORTRAITS.North.relieved=NORTH_RELIEVED;
 }catch(_){}
 try{
  if(typeof window.portrait==="function" && window.__lwCh5NorthPortraitFixWrapped!==VERSION){
   const original=window.portrait;
   window.portrait=function(name,mood){
    const speaker=String(name||"");
    const emotion=String(mood||"neutral");
    if(speaker==="North"&&emotion==="concerned")return NORTH_CONCERNED;
    if(speaker==="North"&&emotion==="relieved")return NORTH_RELIEVED;
    return original.apply(this,arguments);
   };
   window.__lwCh5NorthPortraitFixWrapped=VERSION;
  }
 }catch(_){}
}
window.LastWitnessChapter5NorthPortraitFix={version:VERSION,installed:true,install};
install();
})();
