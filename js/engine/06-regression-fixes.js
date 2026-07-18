/* Last Witness Regression Fix
 * Fixes:
 * 1) Live TH/EN switching for Police Station dialogue and UI
 * 2) Police Station save icon consistency
 * 3) Police evidence two-step inspection flow matching Victim's Apartment
 */
(function(){
"use strict";

function localized(value){
  if(value&&typeof value==="object"&&Object.prototype.hasOwnProperty.call(value,"en")){
    return state.language==="th"?value.th:value.en;
  }
  return value||"";
}

/* Keep police text language-neutral until each render. */
policeText=function(en,th){return{en:en,th:th}};

/* Replace dialogue renderer so already-open Police Station dialogue can re-render on language change. */
runDialogue=function(container,lines,onComplete){
  let index=0,lastRecorded=-1;
  function draw(){
    const current=lines[index];
    const right=current.speaker==="North";
    const raw=current.key?L(current.key):current.text;
    const text=localized(raw);
    if(lastRecorded!==index){
      state.history.push({speaker:current.speaker,key:current.key||null,text:current.text||text});
      lastRecorded=index;
    }
    container.className="dialogue"+(right?" right":"");
    container.innerHTML='<div class="portrait-wrap"><img class="portrait portrait-'+current.speaker+'" src="'+portrait(current.speaker,current.emotion||"neutral")+'"></div><div class="dialogue-copy"><div class="speaker">'+current.speaker+'</div><div class="line">'+text+'</div></div><div class="next">'+(index===lines.length-1?L("next_continue"):L("next_tap"))+"</div>";
  }
  activeDialogueRender=draw;
  container.onclick=function(){
    play("click");
    index++;
    if(index>=lines.length){
      container.classList.add("hidden");
      container.onclick=null;
      activeDialogueRender=null;
      autoSave();
      if(onComplete)onComplete();
    }else draw();
  };
  draw();
};

/* Wrap language refresh so all Police Station UI re-renders immediately. */
const originalApplyLanguage=applyLanguage;
applyLanguage=function(){
  originalApplyLanguage();
  if(typeof setPoliceUI==="function"&&(state.screen==="police2"||$("#policeEvidencePanel").classList.contains("open"))){
    setPoliceUI();
  }
};

/* Make setPoliceUI consume deferred bilingual values safely. */
const originalSetPoliceUI=setPoliceUI;
setPoliceUI=function(){
  const oldPoliceText=policeText;
  policeText=function(en,th){return state.language==="th"?th:en};
  try{originalSetPoliceUI()}finally{policeText=oldPoliceText}
};

let policeEvidenceInspected=false;

function resetPoliceEvidenceInspection(){
  policeEvidenceInspected=false;
  $("#policeEvidenceObject").classList.remove("inspecting");
  $("#policeEvidenceMeta").classList.remove("show");
  $("#inspectPoliceEvidence").style.display="block";
}

function revealPoliceEvidenceDetails(){
  policeEvidenceInspected=true;
  $("#policeEvidenceObject").classList.add("inspecting");
  $("#policeEvidenceMeta").classList.add("show");
  $("#inspectPoliceEvidence").style.display="none";
}

/* Wrap the post-choice flow so opening evidence always starts in preview mode. */
const originalRunPolicePostChoice=runPolicePostChoice;
runPolicePostChoice=function(choice){
  originalRunPolicePostChoice(choice);
  const observer=new MutationObserver(function(){
    if($("#policeEvidencePanel").classList.contains("open")){
      resetPoliceEvidenceInspection();
      observer.disconnect();
    }
  });
  observer.observe($("#policeEvidencePanel"),{attributes:true,attributeFilter:["class"]});
};

/* History also follows the selected language for bilingual Police Station entries. */
const historyButton=$("#historyButton");
if(historyButton){
  historyButton.onclick=function(){
    $("#historyList").innerHTML=state.history.map(function(item){
      const text=item.key?L(item.key):localized(item.text);
      return'<div class="history-row"><b>'+item.speaker+'</b><div>'+text+"</div></div>";
    }).join("")||L("no_dialogue");
    $("#historyModal").classList.add("open");
  };
}

/* Bind newly added Police evidence controls. */
$("#inspectPoliceEvidence").onclick=revealPoliceEvidenceDetails;
$("#policeEvidenceObject").onclick=revealPoliceEvidenceDetails;

/* Ensure save icon consistency even if cached markup is restored. */
$$(".saveButton").forEach(function(button){
  if(button.textContent.trim()==="S")button.textContent="💾";
});

/* Rebind Save buttons after the index replacement added/changed controls. */
$$(".saveButton").forEach(function(button){button.onclick=manualSave});

/* Initial localization pass for newly added data-i18n elements. */
applyLanguage();
})();
