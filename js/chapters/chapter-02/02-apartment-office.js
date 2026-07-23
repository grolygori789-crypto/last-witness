/* Last Witness Full Refactor
 * Chapter 2 apartment and office progression
 * Canonical Character Journal and narrative continuity 0.7.7
 */

(function installChapter2ContinuityCopy(){
 if(typeof LANG!=="object")return;
 Object.assign(LANG.en,{
  case_closed:"CHAPTER COMPLETE",
  apt_documents_title:"Temporary Profile 18-07",
  apt_documents_desc:"A printed access log shows temporary profile 18-07 accepted twice: once under Daniel’s resident-access role and once under an unnamed temporary role. Neither entry identifies the person at the terminal.",
  apt_documents_obs:"North: 18-07 is a role profile carrying accepted access. The log identifies permissions, not the person using them.",
  apt_board_desc:"Daniel linked Hotel 1807, three shell companies and a handwritten note: ‘Ask E. about the corrected time.’",
  apt_board_obs:"Benedict: Room 1807 is no longer only a room number. Daniel was following it through other records.",
  apt_laptop_desc:"A recovered draft names Orchid Café and 09:30. The recipient field was erased, but the message reads: ‘Bring the archived original. Come alone.’",
  apt_laptop_obs:"North: The draft was edited at 05:51, four minutes after profile 18-07 was accepted by the building system.",
  cafe_07:"The café system says Daniel did.",
  cafe_08:"At 09:30. After his estimated time of death."
 });
 Object.assign(LANG.th,{
  case_closed:"จบบท",
  apt_documents_title:"โปรไฟล์ชั่วคราว 18-07",
  apt_documents_desc:"บันทึกการเข้าอาคารระบุว่าโปรไฟล์ชั่วคราว 18-07 ถูกระบบยอมรับสองครั้ง ครั้งหนึ่งภายใต้บทบาทผู้พักอาศัยของแดเนียล และอีกครั้งภายใต้บทบาทชั่วคราวที่ไม่ระบุชื่อ ทั้งสองรายการไม่ได้ยืนยันว่าใครเป็นผู้ใช้งานที่เครื่อง",
  apt_documents_obs:"North: 18-07 เป็นโปรไฟล์ตามบทบาทที่พกสิทธิ์ซึ่งระบบยอมรับ บันทึกระบุสิทธิ์ ไม่ได้ระบุตัวคนใช้",
  apt_board_desc:"แดเนียลเชื่อมโยงโรงแรมห้อง 1807 บริษัทบังหน้าสามแห่ง และข้อความเขียนมือว่า ‘ถาม E. เรื่องเวลาที่ถูกแก้’",
  apt_board_obs:"Benedict: ห้อง 1807 ไม่ได้เป็นเพียงเลขห้องอีกแล้ว แดเนียลกำลังตามหมายเลขนี้ผ่านบันทึกอื่น",
  apt_laptop_desc:"ร่างข้อความที่กู้คืนได้ระบุ Orchid Café เวลา 09:30 ช่องผู้รับถูกลบ แต่ข้อความเขียนว่า ‘นำต้นฉบับจากคดีเก่ามา มาคนเดียว’",
  apt_laptop_obs:"North: ร่างข้อความถูกแก้เวลา 05:51 สี่นาทีหลังระบบอาคารยอมรับโปรไฟล์ 18-07",
  cafe_07:"ระบบของคาเฟ่ระบุว่าแดเนียลเป็นคนสั่ง",
  cafe_08:"เวลา 09:30 หลังช่วงเวลาที่คาดว่าเขาเสียชีวิตแล้ว"
 });
})();

function revealApartmentEvidenceDetails(){
apartmentEvidenceInspected=true;
$("#apartmentEvidenceObject").classList.add("inspecting");
$("#apartmentEvidenceMeta").classList.add("show");
$("#inspectApartmentEvidence").style.display="none"
}
function openApartmentEvidence(id){
pendingApartmentEvidence=id;
apartmentEvidenceInspected=state.found.has(id);
$("#apartmentEvidenceTitle").textContent=L(clueData[id][0]);
$("#apartmentEvidenceDescription").textContent=L(clueData[id][1]);
$("#apartmentEvidenceObservation").textContent=L(APARTMENT_OBSERVATIONS[id]);
$("#apartmentEvidenceObject").innerHTML=EVIDENCE_VISUALS[id]||EVIDENCE_VISUALS.apt_documents;
$("#apartmentEvidenceObject").classList.toggle("inspecting",apartmentEvidenceInspected);
$("#apartmentEvidenceMeta").classList.toggle("show",apartmentEvidenceInspected);
$("#inspectApartmentEvidence").style.display=apartmentEvidenceInspected?"none":"block";
$("#collectApartmentEvidence").style.display=state.found.has(id)?"none":"block";
$("#closeApartmentEvidence").style.display=state.found.has(id)?"block":"none";
$("#apartmentEvidence").classList.add("open");
$("#apartmentEvidence").setAttribute("aria-hidden","false")
}
function collectApartmentEvidence(){
const id=pendingApartmentEvidence;
if(!id||state.found.has(id))return closeApartmentEvidence();
state.found.add(id);
state.flags["found_"+id]=true;
state.checkpoint="ch2_apartment_"+apartmentFoundCount();
if(AUDIO.evidence){AUDIO.evidence.currentTime=0;AUDIO.evidence.play().catch(()=>{})}
showBadge(L("evidence_collected")+": "+L(clueData[id][0]));
autoSave();closeApartmentEvidence();refreshApartment();updateProgress()
}
const APARTMENT_CLUES=["apt_mug","apt_documents","apt_board","apt_laptop"];
const APARTMENT_OBSERVATIONS={
apt_mug:"apt_mug_obs",apt_documents:"apt_documents_obs",apt_board:"apt_board_obs",apt_laptop:"apt_laptop_obs"
};
function apartmentFoundCount(){return APARTMENT_CLUES.filter(id=>state.found.has(id)).length}
function refreshApartment(){
const count=apartmentFoundCount();
$$("[data-apt-clue]").forEach(button=>button.classList.toggle("found",state.found.has(button.dataset.aptClue)));
$("#apartmentObjective").innerHTML='<strong>'+L("inspect_apartment")+'</strong> · '+L("evidence_count")+" "+count+"/"+APARTMENT_CLUES.length;
const introComplete=Boolean(state.flags.apartment_intro_complete);
const dialogueIdle=$("#apartmentDialogue").classList.contains("hidden");
const canReview=count===APARTMENT_CLUES.length&&introComplete&&dialogueIdle&&!state.flags.apartment_reviewed;
$("#reviewApartment").classList.toggle("show",canReview)
}
function inspectApartmentClue(id){
if(!APARTMENT_CLUES.includes(id))return;
if(state.found.has(id))play("page");
openApartmentEvidence(id)
}
function closeApartmentEvidence(){
$("#apartmentEvidence").classList.remove("open");
$("#apartmentEvidence").setAttribute("aria-hidden","true");
pendingApartmentEvidence=null;apartmentEvidenceInspected=false
}
function runApartmentOpening(){
refreshApartment();
if(state.flags.apartment_intro_complete)return;
state.flags.apartment_intro_seen=true;
state.flags.apartment_intro_complete=false;
autoSave();
setTimeout(()=>runDialogue($("#apartmentDialogue"),[
{speaker:"Benedict",emotion:"serious",key:"apt_intro_01"},
{speaker:"North",emotion:"serious",key:"apt_intro_02"},
{speaker:"Benedict",emotion:"neutral",key:"apt_intro_03"},
{speaker:"North",emotion:"dry",key:"apt_intro_04"}
],()=>{
state.flags.apartment_intro_complete=true;
autoSave();
refreshApartment()
}),550)
}
function reviewApartment(){
state.flags.apartment_reviewed=true;
$("#reviewApartment").classList.remove("show");
state.checkpoint="ch2_cafe_arrival";
autoSave();
runDialogue($("#apartmentDialogue"),[
{speaker:"Benedict",emotion:"serious",text:state.language==="th"?"กาแฟสองแก้ว โปรไฟล์ 18-07 แล้วก็ห้อง 1807 บนกระดานของเขา":"Coffee for two. Profile 18-07. And Room 1807 on his board."},
{speaker:"North",emotion:"serious",text:state.language==="th"?"รวมถึงนัดที่คาเฟ่ซึ่งถูกกำหนดไว้หลังเขาเสียชีวิตแล้ว":"And a café meeting scheduled after he was already dead."},
{speaker:"Benedict",emotion:"thinking",text:state.language==="th"?"มีคนคาดหวังให้แดเนียลไปตามนัด หรือคาดหวังให้เราเจอมัน":"Someone expected Daniel to keep it. Or expected us to find it."},
{speaker:"North",emotion:"analyzing",text:state.language==="th"?"ฉันจับคู่ ‘E.’ กับ Elena นักวิเคราะห์นิติวิทยาศาสตร์ในรายชื่อติดต่อของแดเนียล เธอยืนยันนัดที่คาเฟ่แล้ว":"I matched ‘E.’ to Elena, a forensic analyst in Daniel’s contacts. She confirmed the café meeting."},
{speaker:"Benedict",emotion:"neutral",text:state.language==="th"?"งั้นผู้รับที่ถูกลบก็มีชื่อแล้ว":"Then the erased recipient has a name."},
{speaker:"North",emotion:"serious",text:state.language==="th"?"และเข้าถึงบันทึกห้องปฏิบัติการที่แดเนียลต้องการให้ตรวจ":"And access to the laboratory record Daniel wanted checked."},
{speaker:"Benedict",emotion:"serious",text:state.language==="th"?"ไป Orchid Café ก่อน ส่วนบันทึกปล่อยให้อยู่ในที่ที่ยังถูกปิดผนึก":"Orchid Café first. The record can wait where it is still sealed."}
],()=>{play("steps");setTimeout(()=>{show("cafe2");runCafeOpening()},600)})
}

/* The registry is the single owner of the Character Journal unlock. The old
 * implementation set the same flags, showed the toast, called the registry,
 * dispatched another unlock event and then recalculated again on Apartment
 * entry. That produced the duplicate red notification. */
function unlockChapter2CharacterJournal(){
 state.flags=state.flags||{};
 const registry=window.LastWitnessContentRegistry;
 if(registry?.unlockChapter2North){
  registry.unlockChapter2North({showToast:true});
 }else{
  const first=state.flags.chapter2_character_feature_unlocked!==true;
  state.characters=state.characters||{};state.journal=state.journal||{unlocked:false,seen:true,introShown:false};
  state.flags.chapter2_character_feature_unlocked=true;state.characters.Benedict=true;state.characters.North=true;state.journal.unlocked=true;
  if(first){state.journal.seen=false;state.lwCharactersUnread=[...(state.lwCharactersUnread||[]),"north"]}
  state.lwCharactersUnlocked=Array.from(new Set([...(state.lwCharactersUnlocked||[]),"benedict","north"]));
  if(first&&!state.flags.chapter2_character_toast_shown){state.flags.chapter2_character_toast_shown=true;showFeatureToast()}
  syncJournalAlert();autoSave()
 }
}

function runChapter2PostChoice(choice){
const responseKey={warm:"c2_07_warm",observant:"c2_07_observant",direct:"c2_07_direct"}[choice]||"c2_07_direct";
runDialogue($("#office2Dialogue"),[
{speaker:"North",emotion:choice==="warm"?"dry":"serious",key:responseKey},
{speaker:"Benedict",emotion:"neutral",text:state.language==="th"?"คดีใหม่ หรือห้องที่ถูกจัดฉากอีกห้อง?":"A new case, or another staged room?"},
{speaker:"North",emotion:"serious",text:state.language==="th"?"เหยื่อคนละคน แดเนียล วอสส์ อายุสามสิบแปด พบเสียชีวิตในอพาร์ตเมนต์เวลา 06:20":"Different victim. Daniel Voss, thirty-eight. Found dead in his apartment at 06:20."},
{speaker:"Benedict",emotion:"serious",text:state.language==="th"?"สาเหตุการตาย?":"Cause of death?"},
{speaker:"North",emotion:"serious",text:state.language==="th"?"ยังรอผล แต่เวลา 05:47 ระบบเข้าอาคารยอมรับโปรไฟล์ชั่วคราว 18-07 ภายใต้สิทธิ์ผู้พักอาศัย บันทึกระบุบทบาท ไม่ได้ระบุตัวบุคคล":"Pending. But at 05:47 the building accepted temporary profile 18-07 under resident access. The record names a role, not a person."},
{speaker:"Benedict",emotion:"smirk",text:state.language==="th"?"งั้นอาคารนี้ก็มีผี...":"So either the building has a ghost..."},
{speaker:"North",emotion:"dry",text:state.language==="th"?"...หรือมีคนเรียนรู้วิธีจัดฉากบันทึกให้เรียบร้อยพอๆ กับห้อง 1807":"...or someone learned to stage records as neatly as Room 1807."},
{speaker:"Benedict",emotion:"neutral",text:state.language==="th"?"ไปอพาร์ตเมนต์ก่อน":"Apartment first."},
{speaker:"North",emotion:"neutral",text:state.language==="th"?"ส่งที่อยู่เข้าโทรศัพท์คุณแล้ว":"Already sent the address to your phone."},
{speaker:"Benedict",emotion:"smile",text:state.language==="th"?"คุณทำให้ความโรแมนติกของงานนักสืบหายไปหมด":"You do take the romance out of detective work."},
{speaker:"North",emotion:"dry",text:state.language==="th"?"กาแฟมีไว้ชดเชยเรื่องนั้น":"That is what the coffee is for."}
],()=>{
state.checkpoint="ch2_apartment_arrival";
unlockChapter2CharacterJournal();
play("steps");
setTimeout(()=>{
 show("apartment2");
 try{window.LastWitnessContentRegistry?.updateVisibility?.();}catch(_){ }
 try{window.LastWitnessContentRegistry?.updateDots?.();}catch(_){ }
 runApartmentOpening()
},550)
})
}
function applyChapter2Choice(choice){
state.personality[choice]=(state.personality[choice]||0)+1;
state.flags.chapter2_first_choice=choice;
state.checkpoint="ch2_office_after_choice";
if(choice==="warm"){state.relationships.North.trust+=2;state.relationships.North.attachment+=2}
if(choice==="observant"){state.relationships.North.respect+=3}
if(choice==="direct"){state.relationships.North.respect+=1;state.flags.professional_opening=true}
$("#office2Choice").classList.add("hidden");
autoSave();
runChapter2PostChoice(choice)
}
function runChapter2Opening(){
$("#office2Choice").classList.add("hidden");
setTimeout(()=>runDialogue($("#office2Dialogue"),[
{speaker:"North",emotion:"neutral",key:"c2_01"},
{speaker:"Benedict",emotion:"smirk",key:"c2_02"},
{speaker:"North",emotion:"dry",key:"c2_03"}
],()=>{$("#office2Choice").classList.remove("hidden")}),600)
}
function resumeChapter2Office(){
if(state.checkpoint==="ch2_office_after_choice"&&state.flags.chapter2_first_choice)runChapter2PostChoice(state.flags.chapter2_first_choice);
else runChapter2Opening()
}
function startChapter2(){
stopChapterAudio();
state.chapter=2;
state.checkpoint="ch2_office_opening";
state.characters=state.characters||{};
state.characters.North=true;
state.flags=state.flags||{};
state.flags.chapter2_character_feature_unlocked=false;
state.flags.chapter2_character_toast_shown=false;
state.flags.chapter2_character_journal_opened=false;
state.journal={unlocked:false,seen:true,introShown:false};
state.lwJournalEnabled=false;
state.lwCharactersUnread=[];

/* A new Chapter II run must never inherit completed Forensic/Medical evidence
 * from an older save in the same tab. Reset both state and visible hotspots. */
state.forensic={};
state.medical={};
[
 "police_intro_started","police_intro_complete","police_approach","police_evidence_collected","police_phase_complete",
 "forensic_identity","forensic_custody","forensic_route",
 "chapter3_timeline","chapter3_old_cases","chapter3_access"
].forEach(key=>delete state.flags[key]);
$$('[data-forensic-clue],[data-medical-clue]').forEach(node=>node.classList.remove("found"));
$("#forensicPhaseComplete")?.style.setProperty("display","none");
$("#reviewForensic")?.classList.remove("show");
$("#reviewMedical")?.classList.remove("show");

const button=$("#charactersButton");
if(button){
 button.hidden=true;
 button.disabled=true;
 button.setAttribute("aria-hidden","true");
 button.style.setProperty("display","none","important");
 button.style.setProperty("margin-top","0","important");
 button.style.setProperty("min-height","0","important");
 button.style.setProperty("height","0","important");
 button.style.setProperty("padding","0","important");
 button.style.setProperty("border","0","important");
}
syncJournalAlert();
try{window.LastWitnessContentRegistry?.resetForChapter2?.();}catch(_){ }
try{window.LastWitnessContentRegistry?.updateVisibility?.();}catch(_){ }

showChapterIntro(2,()=>{
show("office2");
autoSave();
setTimeout(runChapter2Opening,350)
})
}
