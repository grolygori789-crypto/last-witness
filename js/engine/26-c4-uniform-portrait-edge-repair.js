/* LAST WITNESS - Chapter IV Uniform Portrait Edge Repair 0.19.7
 * Targeted to Maya/Cheryl uniform portraits only in Phase IV and Phase VI Jakarta Lab.
 * Phase V resort portraits and Phase VI hotel portraits are intentionally excluded.
 */
(function(){
"use strict";
const VERSION="0.19.7";
if(window.LastWitnessC4UniformPortraitEdgeRepair?.version===VERSION&&window.LastWitnessC4UniformPortraitEdgeRepair?.installed)return;

const TARGET_IDS=[
 "armanStairwellDialogue",
 "armanWorkshopDialogue",
 "armanRevealDialogue",
 "falseSuccessLabDialogue"
];
const TARGET_SELECTOR=TARGET_IDS.map(id=>"#"+id).join(",");
const MAYA="lw-c4-uniform-maya";
const CHERYL="lw-c4-uniform-cheryl";
let observer=null,installed=false;

function classify(box){
 if(!box)return false;
 const img=box.querySelector(".portrait-wrap img.portrait");
 if(!img)return false;
 img.classList.remove(MAYA,CHERYL);
 const speaker=String(box.querySelector(".speaker")?.textContent||"").toLowerCase();
 if(speaker.includes("maya pranoto")){img.classList.add(MAYA);return true}
 if(speaker.includes("cheryl goh")){img.classList.add(CHERYL);return true}
 return false
}
function applyAll(){TARGET_IDS.forEach(id=>classify(document.getElementById(id)))}
function injectStyle(){
 if(document.getElementById("lwC4UniformPortraitEdgeRepairStyle"))return;
 const style=document.createElement("style");style.id="lwC4UniformPortraitEdgeRepairStyle";
 style.textContent=`
 /* Uniform portrait cleanup, Chapter IV only. No Phase V selectors. */
 ${TARGET_SELECTOR} .portrait-wrap{overflow:hidden!important}
 ${TARGET_SELECTOR} img.${MAYA}{
  transform:scale(1.09)!important;
  transform-origin:center top!important;
  object-position:center top!important;
 }
 ${TARGET_SELECTOR} img.${CHERYL}{
  transform:translateX(-1.15%) scale(1.085)!important;
  transform-origin:center top!important;
  object-position:center top!important;
 }
 `;
 document.head.appendChild(style)
}
function install(){
 if(installed){applyAll();return true}
 injectStyle();applyAll();
 observer=new MutationObserver(mutations=>{
  for(const mutation of mutations){
   const box=mutation.target?.closest?.(TARGET_SELECTOR)||[...mutation.addedNodes].find(node=>node?.nodeType===1&&node.matches?.(TARGET_SELECTOR));
   if(box)classify(box)
   else if([...mutation.addedNodes].some(node=>node?.nodeType===1&&node.querySelector?.(TARGET_SELECTOR)))applyAll()
  }
 });
 observer.observe(document.body,{subtree:true,childList:true});
 installed=true;return true
}
window.LastWitnessC4UniformPortraitEdgeRepair={version:VERSION,installed:true,install,applyAll};
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",install,{once:true});else install();
})();
