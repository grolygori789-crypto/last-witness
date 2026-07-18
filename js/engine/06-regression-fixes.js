/* Last Witness Regression Fix
 * Fixes:
 * 1) Live TH/EN switching for Police Station dialogue and UI
 * 2) Police Station save icon consistency
 * 3) Police evidence two-step inspection flow matching Victim's Apartment
 * 4) Case File opens reliably and includes Police Station evidence
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

/* History follows the selected language for bilingual Police Station entries. */
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

/* Evidence registry used by Case File.
 * Unknown future evidence receives a safe fallback instead of crashing the menu.
 */
const CASE_FILE_SPECIAL={
  tox_original_intake:{
    chapter:2,
    title:{
      en:"Original Toxicology Intake Record",
      th:"บันทึกรับรายงานพิษวิทยาฉบับต้นฉบับ"
    },
    description:{
      en:"The original report entered police custody at 06:17—three minutes before Daniel Voss was officially found. Its collection time was later moved forward by eleven minutes using a valid internal credential from a workstation recorded as offline.",
      th:"รายงานต้นฉบับเข้าสู่ระบบของกลางเวลา 06:17 ก่อนพบศพ Daniel Voss อย่างเป็นทางการสามนาที เวลาเก็บตัวอย่างถูกเลื่อนไปข้างหน้าสิบเอ็ดนาทีด้วยสิทธิ์ภายในที่ถูกต้องจากเครื่องที่ระบบระบุว่าปิดอยู่"
    }
  }
};

function caseFileRecord(id){
  const special=CASE_FILE_SPECIAL[id];
  if(special){
    return{
      chapter:special.chapter,
      title:localized(special.title),
      description:localized(special.description)
    };
  }

  const data=clueData[id];
  if(data&&data.length>=2){
    return{
      chapter:APARTMENT_CLUES.includes(id)?2:1,
      title:L(data[0]),
      description:L(data[1])
    };
  }

  return{
    chapter:state.chapter>=2?2:1,
    title:state.language==="th"?"หลักฐานที่บันทึกไว้":"Recorded Evidence",
    description:state.language==="th"
      ?"หลักฐานชิ้นนี้ถูกเพิ่มไว้ในแฟ้มคดีแล้ว"
      :"This evidence has been added to the case file."
  };
}

const caseButton=$("#caseButton");
if(caseButton){
  caseButton.onclick=function(){
    const sections={1:[],2:[]};

    Array.from(state.found).forEach(function(id){
      const record=caseFileRecord(id);
      const row='<div class="case-row"><b>'+record.title+'</b><div>'+record.description+"</div></div>";
      sections[record.chapter===2?2:1].push(row);
    });

    let caseHtml="";
    if(sections[1].length){
      caseHtml+='<div class="case-section-title">'+L("chapter_i")+"</div>"+sections[1].join("");
    }
    if(sections[2].length){
      caseHtml+='<div class="case-section-title">'+L("chapter_ii")+"</div>"+sections[2].join("");
    }

    $("#caseList").innerHTML=caseHtml||L("no_evidence");
    $("#caseModal").classList.add("open");
  };
}

/* Bind Police evidence controls. */
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
