/* LAST WITNESS — Police Dialogue Portrait Alignment QC 0.15.4
 * Scope:
 * - Police Station / Evidence Division dialogue portrait framing only
 * - Somchai
 * - Elena
 * - Benedict
 * - Preserve the earlier Kittisak dialogue-only correction
 *
 * No gameplay, save-state, journal portrait, image asset or chapter logic changes.
 */
(function(){
"use strict";
const VERSION="0.15.4";
const STYLE_ID="lwPolicePortraitAlignment0154";

if(window.LastWitnessPolicePortraitAlignment?.version===VERSION)return;

function installScopedStyles(){
 if(document.getElementById(STYLE_ID))return true;
 const style=document.createElement("style");
 style.id=STYLE_ID;
 style.textContent=`
/* Police-station dialogue portraits only. Keep Character Journal and every other
 * screen untouched. Standardize top-edge spacing to a professional, stable crop.
 */
#police2 #policeDialogue .portrait-wrap{
 overflow:hidden!important;
}

/* Common police-dialogue portrait treatment for the affected speakers only. */
#police2 #policeDialogue .portrait.portrait-Somchai,
#police2 #policeDialogue .portrait.portrait-Elena,
#police2 #policeDialogue .portrait.portrait-Benedict,
#police2 #policeDialogue .portrait.portrait-Kittisak{
 display:block!important;
 width:100%!important;
 height:100%!important;
 max-width:none!important;
 max-height:none!important;
 object-fit:cover!important;
 background:transparent!important;
 padding:0!important;
}

/* Somchai was falling the most. Lift more aggressively while keeping his face and
 * pointing hand comfortably inside frame.
 */
#police2 #policeDialogue .portrait.portrait-Somchai{
 object-position:center 8%!important;
 transform:scale(1.13)!important;
 transform-origin:center top!important;
}

/* Elena needs a cleaner top anchor with only a light scale-up. */
#police2 #policeDialogue .portrait.portrait-Elena{
 object-position:center 10%!important;
 transform:scale(1.08)!important;
 transform-origin:center top!important;
}

/* Benedict should visually match the established hero framing standard. */
#police2 #policeDialogue .portrait.portrait-Benedict{
 object-position:center 9%!important;
 transform:scale(1.09)!important;
 transform-origin:center top!important;
}

/* Preserve the earlier Kittisak correction, but anchor it from the top so the
 * upper gap stays consistent with the others.
 */
#police2 #policeDialogue .portrait.portrait-Kittisak{
 object-position:center 9%!important;
 transform:scale(1.10)!important;
 transform-origin:center top!important;
}
`;
 document.head.appendChild(style);
 return true
}

const installed=installScopedStyles();

window.LastWitnessPolicePortraitAlignment={
 version:VERSION,
 installed:Boolean(installed),
 scope:{
  policeDialogueOnly:true,
  somchai:true,
  elena:true,
  benedict:true,
  kittisak:true
 }
};
})();