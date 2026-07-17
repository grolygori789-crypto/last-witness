/* Last Witness Full Refactor
 * Chapter 2 café and police station
 * Master Source lines 612-795
 */

function unlockElena(){
if(!state.characters.Elena){
state.characters.Elena=true;
state.relationships.Elena=state.relationships.Elena||{trust:35,respect:52,attachment:18,suspicion:10};
state.flags.elena_unlocked=true;
const note=$("#cafeIntroNote");
if(note){note.classList.add("show");setTimeout(()=>note.classList.remove("show"),2600)}
state.journal.seen=false;syncJournalAlert();autoSave()
}}
function applyCafeChoice(choice){
state.flags.cafe_first_elena_choice=choice;
state.personality[choice]=(state.personality[choice]||0)+1;
const rel=state.relationships.Elena;
if(choice==="friendly"){rel.trust+=4;rel.attachment+=3}
if(choice==="analytical"){rel.respect+=5;rel.suspicion+=1}
if(choice==="guarded"){rel.respect+=2;rel.suspicion+=4}
$("#cafeChoice").classList.add("hidden");
state.checkpoint="ch2_cafe_after_choice";autoSave();updateProgress();
const pair={
friendly:[{speaker:"Benedict",emotion:"smile",key:"cafe_friendly_01"},{speaker:"Elena",emotion:"soft",key:"cafe_friendly_02"}],
analytical:[{speaker:"Benedict",emotion:"serious",key:"cafe_analytical_01"},{speaker:"Elena",emotion:"calm",key:"cafe_analytical_02"}],
guarded:[{speaker:"Benedict",emotion:"serious",key:"cafe_guarded_01"},{speaker:"Elena",emotion:"attentive",key:"cafe_guarded_02"}]
}[choice];
runDialogue($("#cafeDialogue"),pair.concat([
{speaker:"Elena",emotion:"serious",key:"cafe_14"},{speaker:"North",emotion:"serious",key:"cafe_15"},
{speaker:"Elena",emotion:"attentive",key:"cafe_16"},{speaker:"Benedict",emotion:"serious",key:"cafe_17"},
{speaker:"Elena",emotion:"calm",key:"cafe_18"},{speaker:"North",emotion:"serious",key:"cafe_19"},
{speaker:"Elena",emotion:"neutral",key:"cafe_20"},{speaker:"Benedict",emotion:"serious",key:"cafe_21"},
{speaker:"Elena",emotion:"attentive",key:"cafe_22"},{speaker:"North",emotion:"dry",key:"cafe_23"},
{speaker:"Elena",emotion:"soft",key:"cafe_24"},{speaker:"Benedict",emotion:"neutral",key:"cafe_25"},
{speaker:"Elena",emotion:"neutral",key:"cafe_26"},{speaker:"Benedict",emotion:"smirk",key:"cafe_27"},
{speaker:"Elena",emotion:"amused",key:"cafe_28"}
]),()=>{state.flags.cafe_complete=true;state.checkpoint="ch2_police_arrival";autoSave();updateProgress();play("steps");setTimeout(()=>show("police2"),650)})
}

function policeText(en,th){return state.language==="th"?th:en}
function setPoliceUI(){
  $("#policeLocationLabel").textContent=policeText("Police Station • Evidence Division","สถานีตำรวจ • ฝ่ายพยานหลักฐาน");
  $("#policeObjective").innerHTML="<strong>"+policeText("OBJECTIVE","เป้าหมาย")+"</strong> · "+policeText("Verify the 06:17 intake and the eleven-minute correction","ตรวจสอบการรับหลักฐานเวลา 06:17 และเวลาที่ถูกแก้ไปสิบเอ็ดนาที");
  $("#policeChoiceTitle").textContent=policeText("How does Benedict get Somchai to stop performing and start helping?","Benedict จะทำให้สมชายเลิกเล่นมุกแล้วเริ่มช่วยงานอย่างไร?");
  const labels={
    charm:[policeText("Out-charm him — politely.","ใช้คารมเหนือกว่าแบบสุภาพ"),policeText("Benedict turns the joke back on Somchai without humiliating him.","Benedict พลิกมุกกลับโดยไม่ทำให้สมชายเสียหน้า")],
    precision:[policeText("Ask the one question only a competent officer can answer.","ถามคำถามที่ตำรวจทำงานเก่งเท่านั้นถึงจะตอบได้"),policeText("Benedict appeals to Somchai's professional pride.","Benedict ดึงความภูมิใจในหน้าที่ของสมชายออกมา")],
    pressure:[policeText("Point out the impossible timestamp.","ชี้เวลาเป็นไปไม่ได้ตรง ๆ"),policeText("Benedict forces the room to focus on the contradiction.","Benedict บังคับให้ทุกคนกลับมาโฟกัสความขัดแย้ง")]
  };
  $$("[data-police-choice]").forEach(b=>{const x=labels[b.dataset.policeChoice];b.innerHTML="<b>"+x[0]+"</b><small style='display:block;margin-top:4px;color:#bfb5a7'>"+x[1]+"</small>"});
  $("#policeEvidenceKicker").textContent=policeText("CASE EVIDENCE","หลักฐานในคดี");
  $("#policeEvidenceTitle").textContent=policeText("Original Toxicology Intake Record","บันทึกรับรายงานพิษวิทยาฉบับต้นฉบับ");
  $("#policeEvidenceDescription").textContent=policeText("The original report entered police custody at 06:17—three minutes before Daniel Voss was officially found.","รายงานต้นฉบับเข้าสู่ระบบของกลางเวลา 06:17 ก่อนมีการพบศพ Daniel Voss อย่างเป็นทางการสามนาที");
  $("#policeEvidenceObservation").textContent=policeText("The collection time was later moved forward by eleven minutes. The amendment carries a valid internal credential—but the terminal signature belongs to a workstation that was offline.","เวลาเก็บตัวอย่างถูกเลื่อนไปข้างหน้าสิบเอ็ดนาทีในภายหลัง การแก้ไขใช้สิทธิ์ภายในที่ถูกต้อง แต่ลายเซ็นเครื่องมาจากเครื่องที่ระบบระบุว่าปิดอยู่");
  $("#collectPoliceEvidence").textContent=policeText("Add to Evidence Log","เพิ่มลง Evidence Log");
  $("#policeCompleteTitle").textContent=policeText("Police Station Phase Complete","จบช่วงสถานีตำรวจ");
  $("#policeCompleteText").textContent=policeText("A valid credential, an impossible workstation, and a report that arrived before the body. Someone did not break into the system—they used it correctly at the wrong time.","สิทธิ์ที่ถูกต้อง เครื่องที่ไม่น่าทำงานได้ และรายงานที่มาถึงก่อนพบศพ ใครบางคนไม่ได้เจาะระบบ แต่ใช้ระบบอย่างถูกต้องในเวลาที่เป็นไปไม่ได้");
  $("#policeReturnTitle").textContent=policeText("Return to Title","กลับหน้าหลัก");
}
function unlockPoliceCharacters(){
  let added=false;
  if(!state.characters.Kittisak){state.characters.Kittisak=true;added=true}
  if(!state.characters.Somchai){state.characters.Somchai=true;added=true}
  state.relationships.Kittisak=state.relationships.Kittisak||{trust:42,respect:62,attachment:8,suspicion:12};
  state.relationships.Somchai=state.relationships.Somchai||{trust:48,respect:50,attachment:20,suspicion:5};
  if(added){
    state.flags.police_characters_unlocked=true;
    state.journal.unlocked=true;
    state.journal.seen=false;
    syncJournalAlert();
    autoSave();
  }
}
function runPoliceOpening(){
  setPoliceUI();
  if(!state.flags.police_intro_complete){
    /* New characters stay hidden from the Journal until their first introduction ends. */
    state.characters.Kittisak=false;
    state.characters.Somchai=false;
  }
  if(state.flags.police_phase_complete){unlockPoliceCharacters();$("#policePhaseComplete").style.display="block";return}
  if(state.flags.police_intro_complete){
    unlockPoliceCharacters();
    if(!state.flags.police_approach)$("#policeChoice").classList.remove("hidden");
    else if(!state.flags.police_evidence_collected)runPolicePostChoice(state.flags.police_approach);
    return;
  }
  state.flags.police_intro_started=true;
  const cafeChoice=state.flags.cafe_first_elena_choice||"analytical";
  const elenaLine={
    friendly:policeText("You made good time. I was beginning to think your famous charm only opened café doors.","มากันเร็วกว่าที่คิดนะ ฉันกำลังจะเชื่อแล้วว่าเสน่ห์อันเลื่องชื่อของคุณเปิดได้แค่ประตูคาเฟ่"),
    analytical:policeText("You are exactly on time. I assumed you would want to test the intake record before accepting my correction.","มาตรงเวลาพอดี ฉันคิดว่าคุณคงอยากตรวจบันทึกรับหลักฐานก่อนเชื่อการแก้เวลาของฉัน"),
    guarded:policeText("You came. Good. The original record is still sealed, so neither of us has to rely on trust.","คุณมา ดีค่ะ ต้นฉบับยังถูกปิดผนึกอยู่ อย่างน้อยเราก็ไม่ต้องพึ่งความไว้ใจกัน")
  }[cafeChoice];
  setTimeout(()=>runDialogue($("#policeDialogue"),[
    {speaker:"North",emotion:"serious",text:policeText("Evidence Division. Same building, somehow twice as many forms.","ฝ่ายพยานหลักฐาน ตึกเดิม แต่แบบฟอร์มเหมือนเพิ่มเป็นสองเท่า")},
    {speaker:"Benedict",emotion:"smirk",text:policeText("Paperwork is how institutions prove they were awake.","เอกสารคือวิธีที่หน่วยงานใช้พิสูจน์ว่าตัวเองตื่นอยู่")},
    {speaker:"Somchai",emotion:"flirty",text:policeText("And here I thought you came because Officer Somchai was on duty. Detective North, the station is suddenly much brighter.","ผมนึกว่ามาเพราะดาบสมชายเข้าเวรเสียอีก คุณนักสืบ North ครับ สถานีสว่างขึ้นทันตาเลย")},
    {speaker:"North",emotion:"dry",text:policeText("That is the fluorescent light. It flickers when it is dying.","นั่นไฟฟลูออเรสเซนต์ค่ะ มันจะกะพริบตอนใกล้พัง")},
    {speaker:"Benedict",emotion:"smile",text:policeText("She likes you. North only compares people to failing infrastructure when she is comfortable.","เธอชอบคุณนะ North จะเปรียบคนกับสาธารณูปโภคใกล้พังเฉพาะตอนรู้สึกสบายใจ")},
    {speaker:"Somchai",emotion:"surprised",text:policeText("A promising start. I have survived worse performance reviews.","เริ่มต้นมีอนาคตดีครับ ผมเคยรอดจากการประเมินที่แรงกว่านี้")},
    {speaker:"Kittisak",emotion:"serious",text:policeText("Somchai. They are here about Voss, not your social life.","สมชาย เขามาเรื่อง Voss ไม่ใช่ชีวิตรักคุณ")},
    {speaker:"Benedict",emotion:"neutral",text:policeText("Captain Kittisak Siriwat. Thank you for keeping the original report sealed.","ร้อยตำรวจเอกกิตติศักดิ์ ศิริวัฒน์ ขอบคุณที่เก็บรายงานต้นฉบับไว้ในซีลครับ")},
    {speaker:"Kittisak",emotion:"neutral",text:policeText("You are consultants, not officers. You may observe because the intake time predates the discovery of the body. You touch nothing without authorization.","พวกคุณเป็นที่ปรึกษา ไม่ใช่ตำรวจ ผมให้สังเกตการณ์เพราะเวลารับหลักฐานเกิดก่อนพบศพ ห้ามแตะอะไรโดยไม่ได้รับอนุญาต")},
    {speaker:"Elena",emotion:"neutral",text:elenaLine},
    {speaker:"North",emotion:"serious",text:policeText("And the laboratory key?","แล้วกุญแจห้องแล็บล่ะ?")},
    {speaker:"Elena",emotion:"amused",text:policeText("Still mine. The captain agreed to open the room. He did not agree to lend Benedict institutional authority.","ยังอยู่กับฉันค่ะ ผู้กองยอมให้เปิดห้อง แต่ไม่ได้ยอมให้ Benedict ยืมอำนาจราชการ")},
    {speaker:"Benedict",emotion:"smirk",text:policeText("Sensibly cautious. Authority clashes with my wardrobe.","รอบคอบดีครับ อำนาจราชการไม่ค่อยเข้ากับชุดผมเท่าไร")}
  ],()=>{state.flags.police_intro_complete=true;unlockPoliceCharacters();state.checkpoint="ch2_police_choice";autoSave();$("#policeChoice").classList.remove("hidden")}),500);
}
function applyPoliceChoice(choice){
  state.flags.police_approach=choice;
  $("#policeChoice").classList.add("hidden");
  const r=state.relationships.Somchai;
  if(choice==="charm"){r.attachment+=4;r.trust+=2;state.personality.warm=(state.personality.warm||0)+1}
  if(choice==="precision"){r.respect+=5;state.personality.observant=(state.personality.observant||0)+1}
  if(choice==="pressure"){r.respect+=2;r.suspicion+=2;state.personality.direct=(state.personality.direct||0)+1}
  state.checkpoint="ch2_police_after_choice";autoSave();
  runPolicePostChoice(choice);
}
function runPolicePostChoice(choice){
  const branch={
    charm:[
      {speaker:"Benedict",emotion:"smirk",text:policeText("Sergeant, North has already rejected you efficiently. Impress her with something rarer: useful information.","ดาบครับ North ปฏิเสธคุณอย่างมีประสิทธิภาพแล้ว ลองทำให้เธอประทับใจด้วยของหายากกว่านั้น—ข้อมูลที่ใช้ได้จริง")},
      {speaker:"Somchai",emotion:"joking",text:policeText("Cruel, elegant, and technically a request. I respect the craftsmanship.","โหด สุภาพ และยังนับเป็นคำขอ งานฝีมือดี ผมนับถือครับ")}
    ],
    precision:[
      {speaker:"Benedict",emotion:"serious",text:policeText("Who verifies a hand-delivered forensic document before it enters evidence custody?","ใครเป็นคนตรวจเอกสารนิติวิทยาศาสตร์ที่นำมาส่งด้วยมือก่อนเข้าสู่ระบบของกลาง?")},
      {speaker:"Somchai",emotion:"neutral",text:policeText("Duty intake officer, then the terminal credential. And yes—that is the useful question.","เจ้าหน้าที่รับของกลางเวรนั้น แล้วจึงตรวจสิทธิ์เครื่อง และใช่ครับ นั่นเป็นคำถามที่มีประโยชน์")}
    ],
    pressure:[
      {speaker:"Benedict",emotion:"serious",text:policeText("The body was found at 06:20. Your system accepted its toxicology report at 06:17. Either time is lying, or someone inside the chain is.","พบศพเวลา 06:20 แต่ระบบรับรายงานพิษวิทยาเวลา 06:17 ไม่เวลาก็คนในสายงานนี้ที่กำลังโกหก")},
      {speaker:"Kittisak",emotion:"serious",text:policeText("Careful. Contradiction is evidence. Accusation requires more.","ระวังคำพูด ความขัดแย้งเป็นหลักฐาน แต่การกล่าวหาต้องมีมากกว่านั้น")}
    ]
  }[choice];
  runDialogue($("#policeDialogue"),branch.concat([
    {speaker:"Somchai",emotion:"neutral",text:policeText("The intake officer recorded a sealed envelope at 06:17. No sender signature. The terminal accepted a valid Evidence Division credential.","เจ้าหน้าที่เวรบันทึกซองปิดผนึกเวลา 06:17 ไม่มีลายเซ็นผู้ส่ง เครื่องรับสิทธิ์ฝ่ายพยานหลักฐานที่ถูกต้อง")},
    {speaker:"North",emotion:"serious",text:policeText("So the credential was stolen?","แปลว่าสิทธิ์ถูกขโมย?")},
    {speaker:"Kittisak",emotion:"thinking",text:policeText("Not necessarily. The credential belongs to an active analyst. We have not named that person because access alone is not guilt.","ยังสรุปไม่ได้ สิทธิ์เป็นของนักวิเคราะห์ที่ยังปฏิบัติงาน เราไม่เปิดชื่อเพราะการเข้าถึงไม่ใช่ความผิด")},
    {speaker:"Elena",emotion:"serious",text:policeText("Open the laboratory record. The original and revised collection times should both be there.","เปิดบันทึกห้องแล็บค่ะ เวลาเก็บตัวอย่างทั้งต้นฉบับและฉบับแก้ควรอยู่ในนั้น")},
    {speaker:"Kittisak",emotion:"neutral",text:policeText("Use your key. Somchai witnesses. Benedict and North observe.","ใช้กุญแจคุณ สมชายเป็นพยาน Benedict กับ North สังเกตการณ์")},
    {speaker:"Benedict",emotion:"smile",text:policeText("A key, a witness, and adult supervision. I feel almost respectable.","มีกุญแจ มีพยาน และมีผู้ใหญ่คุม ผมเกือบดูน่าเชื่อถือแล้วครับ")},
    {speaker:"North",emotion:"dry",text:policeText("Do not ruin the moment.","อย่าทำลายช่วงเวลาดี ๆ")}
  ]),()=>{$("#policeEvidencePanel").classList.add("open");$("#policeEvidencePanel").setAttribute("aria-hidden","false");setPoliceUI()});
}
function collectPoliceEvidence(){
  state.found.add("tox_original_intake");
  state.flags.police_evidence_collected=true;
  state.checkpoint="ch2_police_deduction";
  $("#policeEvidencePanel").classList.remove("open");
  $("#policeEvidencePanel").setAttribute("aria-hidden","true");
  showBadge(policeText("NEW EVIDENCE: Original Toxicology Intake","หลักฐานใหม่: บันทึกรับรายงานพิษวิทยาต้นฉบับ"));
  autoSave();updateProgress();
  runDialogue($("#policeDialogue"),[
    {speaker:"North",emotion:"analyzing",text:policeText("Original collection: 05:58. Revised collection: 06:09. Exactly eleven minutes.","เก็บตัวอย่างต้นฉบับ 05:58 ฉบับแก้ 06:09 ต่างกันสิบเอ็ดนาทีพอดี")},
    {speaker:"Elena",emotion:"attentive",text:policeText("The revision credential is valid. But the workstation signature is Lab Terminal Three.","สิทธิ์ที่ใช้แก้ถูกต้อง แต่ลายเซ็นเครื่องคือเครื่องแล็บหมายเลขสาม")},
    {speaker:"Somchai",emotion:"surprised",text:policeText("Terminal Three was offline. Maintenance pulled its network module yesterday evening.","เครื่องสามปิดใช้งานครับ ฝ่ายซ่อมถอดโมดูลเครือข่ายตั้งแต่เย็นวาน")},
    {speaker:"Kittisak",emotion:"serious",text:policeText("Then someone copied a trusted terminal signature, not merely a password.","งั้นมีคนคัดลอกลายเซ็นเครื่องที่ระบบเชื่อถือ ไม่ใช่แค่รหัสผ่าน")},
    {speaker:"Benedict",emotion:"thinking",text:policeText("And delivered the original before the body was found. That is not a forged report. It is a rehearsal performed too early.","และส่งต้นฉบับก่อนพบศพ นี่ไม่ใช่แค่รายงานปลอม แต่เป็นการซ้อมที่ลงมือเร็วเกินไป")},
    {speaker:"North",emotion:"serious",text:policeText("Meaning the sender knew when Daniel was supposed to be found.","แปลว่าคนส่งรู้ว่า Daniel ควรถูกพบเมื่อไร")},
    {speaker:"Benedict",emotion:"serious",text:policeText("Or believed they controlled it. Either way, our next witness is the maintenance record for Terminal Three.","หรือเชื่อว่าตัวเองควบคุมเวลานั้นได้ ไม่ว่าทางไหน พยานคนถัดไปของเราคือบันทึกซ่อมเครื่องสาม")}
  ],()=>{state.flags.police_phase_complete=true;state.checkpoint="ch2_police_phase_complete";$("#policePhaseComplete").style.display="block";autoSave();updateProgress()});
}

function runCafeOpening(){
if(state.flags.cafe_complete){show("police2");return}
if(state.flags.cafe_first_elena_choice){setTimeout(()=>applyCafeChoice(state.flags.cafe_first_elena_choice),350);return}
if(state.flags.cafe_intro_complete){$("#cafeChoice").classList.remove("hidden");return}
state.flags.cafe_intro_started=true;
setTimeout(()=>runDialogue($("#cafeDialogue"),[
{speaker:"North",emotion:"serious",key:"cafe_01"},{speaker:"Benedict",emotion:"neutral",key:"cafe_02"},
{speaker:"North",emotion:"neutral",key:"cafe_03"},{speaker:"Elena",emotion:"neutral",key:"cafe_04"},
{speaker:"Benedict",emotion:"smirk",key:"cafe_05"},{speaker:"Elena",emotion:"soft",key:"cafe_06"},
{speaker:"Elena",emotion:"neutral",key:"cafe_07"},{speaker:"North",emotion:"serious",key:"cafe_08"},
{speaker:"Elena",emotion:"calm",key:"cafe_09"},{speaker:"Benedict",emotion:"serious",key:"cafe_10"},
{speaker:"Elena",emotion:"attentive",key:"cafe_11"},{speaker:"Benedict",emotion:"serious",key:"cafe_12"},
{speaker:"Elena",emotion:"soft",key:"cafe_13"}
],()=>{state.flags.cafe_intro_complete=true;unlockElena();state.checkpoint="ch2_cafe_choice";autoSave();$("#cafeChoice").classList.remove("hidden")}),550)
}

const EVIDENCE_VISUALS={
apt_mug:`<svg viewBox="0 0 320 280"><ellipse cx="160" cy="245" rx="102" ry="18" fill="#000" opacity=".28"/><path d="M85 80h130v110c0 35-25 52-65 52s-65-17-65-52z" fill="#d9d0c3" stroke="#6f665d" stroke-width="5"/><path d="M214 105h23c36 0 36 65 0 65h-23" fill="none" stroke="#8f8376" stroke-width="14"/><ellipse cx="150" cy="82" rx="64" ry="18" fill="#433126"/><ellipse cx="150" cy="78" rx="57" ry="12" fill="#6e4c35"/></svg>`,
apt_documents:`<svg viewBox="0 0 320 280"><g transform="rotate(-3 160 140)"><rect x="55" y="28" width="210" height="230" rx="5" fill="#e7ddc9" stroke="#716553" stroke-width="4"/><rect x="76" y="52" width="168" height="18" fill="#2e3440"/><text x="160" y="65" text-anchor="middle" fill="#eee" font-size="11" font-family="monospace">BUILDING ACCESS LOG</text><g stroke="#8e826f" stroke-width="2"><line x1="78" y1="95" x2="242" y2="95"/><line x1="78" y1="126" x2="242" y2="126"/><line x1="78" y1="157" x2="242" y2="157"/></g><text x="88" y="117" fill="#39342e" font-size="14" font-family="monospace">18-07  DANIEL VOSS</text><text x="88" y="148" fill="#39342e" font-size="14" font-family="monospace">18-07  TEMP RES.</text><rect x="82" y="132" width="150" height="22" fill="none" stroke="#a53631" stroke-width="3"/></g></svg>`,
apt_board:`<svg viewBox="0 0 320 280"><rect x="38" y="30" width="244" height="220" rx="8" fill="#7b5a3c" stroke="#3d2b1d" stroke-width="7"/><g fill="#e7decf" stroke="#8a7e6e" stroke-width="2"><rect x="62" y="55" width="78" height="58" transform="rotate(-4 101 84)"/><rect x="176" y="48" width="82" height="62" transform="rotate(5 217 79)"/><rect x="112" y="150" width="100" height="67" transform="rotate(-2 162 183)"/></g><g stroke="#b43d37" stroke-width="3"><line x1="135" y1="84" x2="188" y2="80"/><line x1="108" y1="112" x2="143" y2="157"/><line x1="216" y1="109" x2="185" y2="153"/></g><text x="101" y="80" text-anchor="middle" fill="#332f2b" font-size="13" font-family="monospace">HOTEL 1807</text><text x="162" y="180" text-anchor="middle" fill="#332f2b" font-size="12" font-family="monospace">ASK E.</text></svg>`,
apt_laptop:`<svg viewBox="0 0 320 280"><rect x="52" y="42" width="216" height="150" rx="8" fill="#1d222a" stroke="#69727d" stroke-width="5"/><rect x="66" y="57" width="188" height="120" fill="#d7d8d5"/><rect x="82" y="72" width="156" height="16" fill="#303845"/><text x="160" y="84" text-anchor="middle" fill="#eee" font-size="10" font-family="monospace">UNSENT DRAFT</text><text x="88" y="113" fill="#343434" font-size="12" font-family="monospace">ORCHID CAFÉ · 09:30</text><text x="88" y="140" fill="#343434" font-size="10" font-family="monospace">Bring the original report.</text><path d="M30 204h260l-25 32H55z" fill="#737b84" stroke="#343941" stroke-width="4"/></svg>`
};
let pendingApartmentEvidence=null;
let apartmentEvidenceInspected=false;
