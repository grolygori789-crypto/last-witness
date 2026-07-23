/* Last Witness Full Refactor
 * Chapter 2 café and police station
 * Final narrative continuity + Police choice repair 0.7.10
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
{speaker:"Elena",emotion:"serious",text:policeText("Daniel asked me to verify a toxicology record from one of his archived cases.","แดเนียลขอให้ฉันตรวจบันทึกพิษวิทยาจากคดีเก่าคดีหนึ่งของเขา")},
{speaker:"North",emotion:"serious",text:policeText("The original and the corrected copy?","ทั้งต้นฉบับกับฉบับแก้?")},
{speaker:"Elena",emotion:"attentive",text:policeText("Both validate. The corrected copy moves COLLECTION_TIME from 05:58 to 06:09.","ทั้งสองฉบับผ่านการตรวจสอบ ฉบับแก้เลื่อน COLLECTION_TIME จาก 05:58 เป็น 06:09")},
{speaker:"Benedict",emotion:"serious",text:policeText("Eleven minutes is very specific.","สิบเอ็ดนาทีเจาะจงมาก")},
{speaker:"Elena",emotion:"calm",text:policeText("Specific enough that Daniel marked the same shift in three older cases.","เจาะจงพอที่แดเนียลทำเครื่องหมายช่วงเวลาที่ถูกเลื่อนแบบเดียวกันไว้ในคดีเก่าสามคดี")},
{speaker:"North",emotion:"serious",text:policeText("And this morning?","แล้วเช้าวันนี้ล่ะ?")},
{speaker:"Elena",emotion:"neutral",text:policeText("Daniel’s own laboratory accession was created at 06:17. His official discovery was recorded at 06:20.","บันทึกรับตัวอย่างของแดเนียลเองถูกสร้างเวลา 06:17 ส่วนเวลาพบอย่างเป็นทางการถูกบันทึกไว้ที่ 06:20")},
{speaker:"Benedict",emotion:"serious",text:policeText("His evidence entered the system before his case existed.","หลักฐานของเขาเข้าสู่ระบบก่อนที่คดีจะมีอยู่")},
{speaker:"Elena",emotion:"attentive",text:policeText("The certified export says exactly that. The source record is still inside Forensic Science.","ข้อมูลส่งออกที่รับรองแล้วระบุแบบนั้นค่ะ ส่วนบันทึกต้นทางยังอยู่ในหน่วยนิติวิทยาศาสตร์")},
{speaker:"North",emotion:"serious",text:policeText("What does Evidence Division have?","ฝ่ายพยานหลักฐานมีอะไรอยู่?")},
{speaker:"Elena",emotion:"neutral",text:policeText("The certified extract and its sealed custody envelope. Enough to verify the contradiction before we inspect the source.","สำเนารับรองกับซองห่วงโซ่การครอบครองที่ยังปิดผนึก เพียงพอให้ตรวจความขัดแย้งก่อนเราไปดูต้นทาง")},
{speaker:"Benedict",emotion:"neutral",text:policeText("Then we test the export before asking the source to contradict it.","งั้นเราตรวจข้อมูลส่งออกก่อน แล้วค่อยให้ข้อมูลต้นทางหักล้างมัน")},
{speaker:"Elena",emotion:"neutral",text:policeText("I’ll meet you there. I have the lab key they will not lend you.","ฉันจะไปเจอที่นั่นค่ะ ฉันมีกุญแจห้องแล็บที่พวกเขาไม่ยอมให้คุณยืม")},
{speaker:"Benedict",emotion:"smirk",text:policeText("I was hoping charm still opened doors.","ผมยังหวังว่าเสน่ห์จะเปิดประตูได้อยู่")},
{speaker:"Elena",emotion:"amused",text:policeText("It does. Just rarely the correct ones.","เปิดได้ค่ะ เพียงแต่น้อยครั้งจะเป็นประตูที่ถูกต้อง")}
]),()=>{state.flags.cafe_complete=true;state.checkpoint="ch2_police_arrival";autoSave();updateProgress();play("steps");setTimeout(()=>show("police2"),650)})
}

function policeText(en,th){return state.language==="th"?th:en}
function setPoliceUI(){
  $("#policeLocationLabel").textContent=policeText("Police Station • Evidence Division","สถานีตำรวจ • ฝ่ายพยานหลักฐาน");
  $("#policeObjective").innerHTML="<strong>"+policeText("OBJECTIVE","เป้าหมาย")+"</strong> · "+policeText("Verify the certified 06:17 accession extract and the eleven-minute amendment","ตรวจสอบสำเนารับรองการรับตัวอย่างเวลา 06:17 และการแก้เวลาสิบเอ็ดนาที");
  $("#policeChoiceTitle").textContent=policeText("How does Benedict get Somchai to stop performing and start helping?","Benedict จะทำให้สมชายเลิกเล่นมุกแล้วเริ่มช่วยงานอย่างไร?");
  const labels={
    charm:[policeText("Out-charm him — politely.","ใช้คารมเหนือกว่าแบบสุภาพ"),policeText("Benedict turns the joke back on Somchai without humiliating him.","Benedict พลิกมุกกลับโดยไม่ทำให้สมชายเสียหน้า")],
    precision:[policeText("Ask the one question only a competent officer can answer.","ถามคำถามที่ตำรวจทำงานเก่งเท่านั้นถึงจะตอบได้"),policeText("Benedict appeals to Somchai's professional pride.","Benedict ดึงความภูมิใจในหน้าที่ของสมชายออกมา")],
    pressure:[policeText("Point out the impossible timestamp.","ชี้เวลาเป็นไปไม่ได้ตรง ๆ"),policeText("Benedict forces the room to focus on the contradiction.","Benedict บังคับให้ทุกคนกลับมาโฟกัสความขัดแย้ง")]
  };
  $$("[data-police-choice]").forEach(b=>{const x=labels[b.dataset.policeChoice];b.innerHTML="<b>"+x[0]+"</b><small style='display:block;margin-top:4px;color:#bfb5a7'>"+x[1]+"</small>"});
  $("#policeEvidenceKicker").textContent=policeText("CASE EVIDENCE","หลักฐานในคดี");
  $("#policeEvidenceTitle").textContent=policeText("Certified Laboratory Accession Extract","สำเนารับรองบันทึกรับตัวอย่างของห้องปฏิบัติการ");
  $("#policeEvidenceDescription").textContent=policeText("The certified export records Daniel’s laboratory accession at 06:17, three minutes before his official discovery at 06:20.","สำเนารับรองระบุว่าห้องปฏิบัติการรับตัวอย่างของแดเนียลเวลา 06:17 ก่อนเวลาพบอย่างเป็นทางการเมื่อ 06:20 อยู่สามนาที");
  $("#policeEvidenceObservation").textContent=policeText("The extract preserves collection at 05:58 and amendment at 06:09. The amendment carried accepted Evidence Division permission through temporary profile 18-07, while its workstation signature claims an offline terminal.","สำเนาระบุเวลาเก็บตัวอย่าง 05:58 และเวลาแก้ 06:09 การแก้ไขพกสิทธิ์ฝ่ายพยานหลักฐานที่ระบบยอมรับผ่านโปรไฟล์ชั่วคราว 18-07 แต่ลายเซ็นเครื่องกลับอ้างถึงเครื่องที่ออฟไลน์อยู่");
  $("#collectPoliceEvidence").textContent=policeText("Add to Case File","เพิ่มในแฟ้มคดี");
  $("#policeCompleteTitle").textContent=policeText("Police Station Phase Complete","จบช่วงสถานีตำรวจ");
  $("#policeCompleteText").textContent=policeText("Accepted permission, an impossible workstation and an accession created before official discovery. Someone used trusted rules to arrange the chronology.","สิทธิ์ที่ระบบยอมรับ เครื่องที่ไม่น่าทำงานได้ และบันทึกรับตัวอย่างที่เกิดก่อนการพบอย่างเป็นทางการ ใครบางคนใช้กฎที่ระบบเชื่อถือเพื่อจัดวางลำดับเวลา");
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
    {speaker:"North",emotion:"serious",text:policeText("Evidence Division. Somehow twice as many forms.","ฝ่ายพยานหลักฐาน แบบฟอร์มเหมือนเพิ่มเป็นสองเท่า")},
    {speaker:"Benedict",emotion:"smirk",text:policeText("Paperwork is how institutions prove they were awake.","เอกสารคือวิธีที่หน่วยงานใช้พิสูจน์ว่าตัวเองตื่นอยู่")},
    {speaker:"Somchai",emotion:"flirty",text:policeText("And here I thought you came because Officer Somchai was on duty. Detective North, the station is suddenly much brighter.","ผมนึกว่ามาเพราะดาบสมชายเข้าเวรเสียอีก คุณนักสืบ North ครับ สถานีสว่างขึ้นทันตาเลย")},
    {speaker:"North",emotion:"dry",text:policeText("That is the fluorescent light. It flickers when it is dying.","นั่นไฟฟลูออเรสเซนต์ค่ะ มันจะกะพริบตอนใกล้พัง")},
    {speaker:"Benedict",emotion:"smile",text:policeText("She likes you. North only compares people to failing infrastructure when she is comfortable.","เธอชอบคุณนะ North จะเปรียบคนกับสาธารณูปโภคใกล้พังเฉพาะตอนรู้สึกสบายใจ")},
    {speaker:"Somchai",emotion:"surprised",text:policeText("A promising start. I have survived worse performance reviews.","เริ่มต้นมีอนาคตดีครับ ผมเคยรอดจากการประเมินที่แรงกว่านี้")},
    {speaker:"Kittisak",emotion:"serious",text:policeText("Somchai. They are here about Voss, not your social life.","สมชาย เขามาเรื่อง Voss ไม่ใช่ชีวิตรักคุณ")},
    {speaker:"Benedict",emotion:"neutral",text:policeText("Captain Kittisak Siriwat. Thank you for keeping the certified extract and custody envelope sealed.","ร้อยตำรวจเอกกิตติศักดิ์ ศิริวัฒน์ ขอบคุณที่เก็บสำเนารับรองกับซองห่วงโซ่การครอบครองไว้ในซีลครับ")},
    {speaker:"Kittisak",emotion:"neutral",text:policeText("You are consultants, not officers. You may observe because the certified accession predates official discovery. You touch nothing without authorization.","พวกคุณเป็นที่ปรึกษา ไม่ใช่ตำรวจ ผมให้สังเกตการณ์เพราะบันทึกรับตัวอย่างที่รับรองแล้วเกิดก่อนเวลาพบอย่างเป็นทางการ ห้ามแตะอะไรโดยไม่ได้รับอนุญาต")},
    {speaker:"Elena",emotion:"neutral",text:elenaLine},
    {speaker:"North",emotion:"serious",text:policeText("And the laboratory key?","แล้วกุญแจห้องแล็บล่ะ?")},
    {speaker:"Elena",emotion:"amused",text:policeText("Still mine. The captain agreed to open the room. He did not agree to lend Benedict institutional authority.","ยังอยู่กับฉันค่ะ ผู้กองยอมให้เปิดห้อง แต่ไม่ได้ยอมให้ Benedict ยืมอำนาจราชการ")},
    {speaker:"Benedict",emotion:"smirk",text:policeText("Sensibly cautious. Authority clashes with my wardrobe.","รอบคอบดีครับ อำนาจราชการไม่ค่อยเข้ากับชุดผมเท่าไร")}
  ],()=>{state.flags.police_intro_complete=true;state.checkpoint="ch2_police_choice";autoSave();$("#policeChoice").classList.remove("hidden")}),500);
}
function ensurePoliceRelationships(){
  state.relationships=state.relationships||{};
  state.relationships.Somchai=state.relationships.Somchai||{trust:48,respect:50,attachment:20,suspicion:5};
  state.relationships.Kittisak=state.relationships.Kittisak||{trust:42,respect:62,attachment:8,suspicion:12};
}
function applyPoliceChoice(choice){
  ensurePoliceRelationships();
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
      {speaker:"Benedict",emotion:"smirk",text:policeText("Sergeant, North has already rejected you efficiently. Impress her with something rarer: useful information.","ดาบครับ North ปฏิเสธคุณอย่างมีประสิทธิภาพแล้ว ลองทำให้เธอประทับใจด้วยของหายากกว่านั้น ข้อมูลที่ใช้ได้จริง")},
      {speaker:"Somchai",emotion:"joking",text:policeText("Cruel, elegant, and technically a request. I respect the craftsmanship.","โหด สุภาพ และยังนับเป็นคำขอ งานฝีมือดี ผมนับถือครับ")}
    ],
    precision:[
      {speaker:"Benedict",emotion:"serious",text:policeText("Who verifies a certified laboratory extract before it enters evidence custody?","ใครเป็นคนตรวจสำเนารับรองจากห้องปฏิบัติการก่อนเข้าสู่ระบบของกลาง?")},
      {speaker:"Somchai",emotion:"neutral",text:policeText("The duty intake officer verifies the envelope and certificate, then logs custody. The record inside is an export, not the source.","เจ้าหน้าที่รับของกลางเวรนั้นตรวจซองกับใบรับรอง แล้วจึงลงบันทึกการครอบครอง ข้อมูลข้างในเป็นข้อมูลส่งออก ไม่ใช่ต้นทาง")}
    ],
    pressure:[
      {speaker:"Benedict",emotion:"serious",text:policeText("Daniel was officially found at 06:20. This certified extract records laboratory accession at 06:17. Either the chronology is false, or someone inside the chain made it so.","มีการพบแดเนียลอย่างเป็นทางการเวลา 06:20 แต่สำเนารับรองนี้ระบุการรับตัวอย่างเวลา 06:17 ไม่ลำดับเวลาก็คนในสายงานนี้ที่ทำให้มันเป็นเท็จ")},
      {speaker:"Kittisak",emotion:"serious",text:policeText("Careful. Contradiction is evidence. Accusation requires more.","ระวังคำพูด ความขัดแย้งเป็นหลักฐาน แต่การกล่าวหาต้องมีมากกว่านั้น")}
    ]
  }[choice];
  runDialogue($("#policeDialogue"),branch.concat([
    {speaker:"Somchai",emotion:"neutral",text:policeText("The intake officer logged a sealed custody envelope. Inside, the certified extract records laboratory accession at 06:17. No courier signature.","เจ้าหน้าที่เวรลงบันทึกซองห่วงโซ่การครอบครองที่ปิดผนึก ข้างในมีสำเนารับรองการรับตัวอย่างเวลา 06:17 และไม่มีลายเซ็นผู้นำส่ง")},
    {speaker:"North",emotion:"serious",text:policeText("And the permission behind the 06:09 amendment?","แล้วสิทธิ์ที่อยู่เบื้องหลังการแก้เวลา 06:09 ล่ะ?")},
    {speaker:"Kittisak",emotion:"thinking",text:policeText("Accepted Evidence Division permission. It resolves to temporary profile 18-07, not a named user.","เป็นสิทธิ์ฝ่ายพยานหลักฐานที่ระบบยอมรับ และเชื่อมกับโปรไฟล์ชั่วคราว 18-07 ไม่ใช่ชื่อบุคคล")},
    {speaker:"Elena",emotion:"serious",text:policeText("Which is why the source audit matters. The export tells us what was certified, not where the command originated.","เพราะอย่างนั้นบันทึกตรวจสอบต้นทางจึงสำคัญค่ะ ข้อมูลส่งออกบอกได้ว่าอะไรถูกรับรอง แต่ไม่ได้บอกว่าคำสั่งมาจากที่ใด")},
    {speaker:"Kittisak",emotion:"neutral",text:policeText("Use your key. Somchai witnesses. Benedict and North observe.","ใช้กุญแจคุณ สมชายเป็นพยาน Benedict กับ North สังเกตการณ์")},
    {speaker:"Benedict",emotion:"smile",text:policeText("A key, a witness, and adult supervision. I feel almost respectable.","มีกุญแจ มีพยาน และมีผู้ใหญ่คุม ผมเกือบดูน่าเชื่อถือแล้วครับ")},
    {speaker:"North",emotion:"dry",text:policeText("Do not ruin the moment.","อย่าทำลายช่วงเวลาดีๆ")}
  ]),()=>{$("#policeEvidencePanel").classList.add("open");$("#policeEvidencePanel").setAttribute("aria-hidden","false");setPoliceUI()});
}
function collectPoliceEvidence(){
  state.found.add("tox_original_intake");
  state.flags.police_evidence_collected=true;
  state.checkpoint="ch2_police_deduction";
  $("#policeEvidencePanel").classList.remove("open");
  $("#policeEvidencePanel").setAttribute("aria-hidden","true");
  showBadge(policeText("NEW EVIDENCE: Certified Laboratory Accession Extract","หลักฐานใหม่: สำเนารับรองบันทึกรับตัวอย่างของห้องปฏิบัติการ"));
  autoSave();updateProgress();
  runDialogue($("#policeDialogue"),[
    {speaker:"North",emotion:"analyzing",text:policeText("Original collection: 05:58. Revised collection: 06:09. Exactly eleven minutes.","เก็บตัวอย่างต้นฉบับ 05:58 แก้เป็น 06:09 ต่างกันสิบเอ็ดนาทีพอดี")},
    {speaker:"Elena",emotion:"attentive",text:policeText("The amendment carries accepted Evidence Division permission. Its route metadata resolves to profile 18-07, and the event claims FS-12.","การแก้ไขพกสิทธิ์ฝ่ายพยานหลักฐานที่ระบบยอมรับ ข้อมูลเส้นทางเชื่อมกับโปรไฟล์ 18-07 และเหตุการณ์อ้างว่ามาจาก FS-12")},
    {speaker:"Somchai",emotion:"surprised",text:policeText("FS-12. We call it Terminal Three. Maintenance pulled its network module yesterday evening.","FS-12 ครับ ที่นี่เรียกกันว่าเครื่องสาม ฝ่ายซ่อมถอดโมดูลเครือข่ายออกตั้งแต่เย็นวาน")},
    {speaker:"Kittisak",emotion:"serious",text:policeText("Then the event presents a trusted machine signature that could not have originated from a local session.","งั้นเหตุการณ์นี้แสดงลายเซ็นเครื่องที่ระบบเชื่อถือ ทั้งที่ไม่อาจมาจากเซสชันภายในเครื่องได้")},
    {speaker:"Benedict",emotion:"thinking",text:policeText("And the accession existed before Daniel was officially found. Someone did not forge the science. They arranged when it appeared.","และบันทึกรับตัวอย่างเกิดขึ้นก่อนพบแดเนียลอย่างเป็นทางการ ใครบางคนไม่ได้ปลอมผลวิทยาศาสตร์ แต่จัดวางเวลาที่มันปรากฏ")},
    {speaker:"North",emotion:"serious",text:policeText("Meaning whoever did this knew when Daniel was supposed to enter the record.","แปลว่าคนทำรู้ว่าแดเนียลควรถูกบันทึกเข้าสู่ระบบเมื่อไร")},
    {speaker:"Benedict",emotion:"serious",text:policeText("Or believed they controlled it. The police export has taken us as far as it can. We go to the source.","หรือเชื่อว่าตัวเองควบคุมมันได้ ข้อมูลส่งออกของตำรวจพาเราได้ไกลเท่านี้ ต่อไปเราไปดูต้นทาง")}
  ],()=>{state.flags.police_phase_complete=true;state.checkpoint="ch2_police_phase_complete";$("#policePhaseComplete").style.display="block";autoSave();updateProgress()});
}

function runCafeOpening(){
if(state.flags.cafe_complete){show("police2");return}
if(state.flags.cafe_first_elena_choice){setTimeout(()=>applyCafeChoice(state.flags.cafe_first_elena_choice),350);return}
if(state.flags.cafe_intro_complete){$("#cafeChoice").classList.remove("hidden");return}
state.flags.cafe_intro_started=true;
setTimeout(()=>runDialogue($("#cafeDialogue"),[
{speaker:"North",emotion:"serious",text:policeText("Elena is already here.","Elena มาถึงแล้ว")},{speaker:"Benedict",emotion:"neutral",text:policeText("The analyst from Daniel’s contacts?","นักวิเคราะห์จากรายชื่อติดต่อของแดเนียล?")},
{speaker:"North",emotion:"neutral",text:policeText("The same one.","คนเดียวกัน")},{speaker:"Elena",emotion:"neutral",key:"cafe_04"},
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
apt_laptop:`<svg viewBox="0 0 320 280"><rect x="52" y="42" width="216" height="150" rx="8" fill="#1d222a" stroke="#69727d" stroke-width="5"/><rect x="66" y="57" width="188" height="120" fill="#d7d8d5"/><rect x="82" y="72" width="156" height="16" fill="#303845"/><text x="160" y="84" text-anchor="middle" fill="#eee" font-size="10" font-family="monospace">UNSENT DRAFT</text><text x="88" y="113" fill="#343434" font-size="12" font-family="monospace">ORCHID CAFÉ · 09:30</text><text x="88" y="140" fill="#343434" font-size="10" font-family="monospace">Bring the archived original.</text><path d="M30 204h260l-25 32H55z" fill="#737b84" stroke="#343941" stroke-width="4"/></svg>`
};
let pendingApartmentEvidence=null;
let apartmentEvidenceInspected=false;
