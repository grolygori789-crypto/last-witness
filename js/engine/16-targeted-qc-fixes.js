/* LAST WITNESS — Targeted Journal, Dialogue and Portrait QC 0.15.3
 * Scope:
 * - Maya Character Journal name wrapping
 * - Elena Orchid Café canonical line
 * - Kittisak Police Station dialogue framing
 *
 * No gameplay, save-state, portrait registry, image asset or chapter logic changes.
 */
(function(){
"use strict";
const VERSION="0.15.3";
const STYLE_ID="lwTargetedQCFixes0153";

if(window.LastWitnessTargetedQCFixes?.version===VERSION)return;

function installCafeCopy(){
 if(typeof LANG!=="object"||!LANG.en||!LANG.th)return false;

 // Preserve the current canonical English source from Chapter II continuity.
 LANG.en.cafe_06="Only if you ordered the second coffee.";
 LANG.en.cafe_07="The café system says Daniel did.";

 // Elena is the speaker of both lines. Keep her controlled, professional voice.
 LANG.th.cafe_06="ก็เฉพาะถ้าคุณเป็นคนสั่งกาแฟแก้วที่สอง";
 LANG.th.cafe_07="แต่ในระบบของคาเฟ่ระบุว่าแดเนียลเป็นคนสั่งไว้ค่ะ";
 return true
}

function installScopedStyles(){
 if(document.getElementById(STYLE_ID))return true;
 const style=document.createElement("style");
 style.id=STYLE_ID;
 style.textContent=`
/* Maya: full name must remain readable in both Journal grid and detail view. */
#charactersModal #characterDetail .character-detail-head>.maya-meta{
 min-width:0!important;
 width:auto!important;
 max-width:none!important;
 flex:1 1 0!important;
 overflow:visible!important;
}
#charactersModal #characterDetail .character-detail-head>.maya-meta>.character-name,
#charactersModal #characterGrid .character-card[data-character="maya"]>.character-name{
 display:block!important;
 width:auto!important;
 max-width:none!important;
 white-space:normal!important;
 overflow:visible!important;
 text-overflow:clip!important;
 overflow-wrap:normal!important;
 word-break:normal!important;
 hyphens:none!important;
 line-height:1.22!important;
}

/* Kittisak: dialogue-only framing, matching the established Benedict crop.
 * Character Journal portraits and every other speaker remain untouched.
 */
#police2 #policeDialogue .portrait-wrap{
 overflow:hidden!important;
}
#police2 #policeDialogue .portrait.portrait-Kittisak{
 display:block!important;
 width:100%!important;
 height:100%!important;
 max-width:none!important;
 max-height:none!important;
 object-fit:cover!important;
 object-position:center center!important;
 transform:scale(1.10)!important;
 transform-origin:center 45%!important;
 background:transparent!important;
 padding:0!important;
}
`;
 document.head.appendChild(style);
 return true
}

function repairAlreadyVisibleCafeLine(){
 const box=document.getElementById("cafeDialogue");
 if(!box||box.classList.contains("hidden"))return;
 const speaker=box.querySelector(".speaker")?.textContent?.trim();
 const line=box.querySelector(".line");
 if(!line||!["Elena","เอเลนา"].includes(speaker))return;
 if(line.textContent.trim()==="ผมไม่ได้สั่ง แดเนียลต่างหาก"){
  line.textContent=LANG?.th?.cafe_07||"แต่ในระบบของคาเฟ่ระบุว่าแดเนียลเป็นคนสั่งไว้ค่ะ"
 }
}

const copyInstalled=installCafeCopy();
const stylesInstalled=installScopedStyles();
repairAlreadyVisibleCafeLine();

window.LastWitnessTargetedQCFixes={
 version:VERSION,
 installed:Boolean(copyInstalled&&stylesInstalled),
 scope:{
  mayaJournalName:true,
  elenaCafeCopy:true,
  kittisakDialogueFraming:true
 }
};
})();