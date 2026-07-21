/*
 * LAST WITNESS — Chapter III development module
 * CHAPTER III: THE BORROWED MINUTES
 * Phase 1: Bangkok / The Missing Passenger
 *
 * This file is intentionally isolated from Chapter I–II. It can run from
 * chapter3-dev.html now, then be connected to the production engine later.
 */
(function(){
  "use strict";

  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
  const APP=$("#chapter3DevApp");
  const PREVIEW_KEY="last_witness_ch3_phase1_dev";
  const AUTO_SAVE_KEY="last_witness_rc1_auto";

  const PORTRAITS={
    Benedict:{
      neutral:"assets/images/381e0e1f9a98101c.jpg",
      smile:"assets/images/fe04f1468bad8d82.jpg",
      thinking:"assets/images/a0fc6623ca50a308.jpg",
      serious:"assets/images/11088c10c5b3cfe6.jpg",
      surprised:"assets/images/e0dcf52db888a816.jpg",
      smirk:"assets/images/57c2b9cd8b54b14f.jpg",
      somber:"assets/images/c2c68545464bad83.jpg",
      suspicious:"assets/images/945c34cdf1a35f78.jpg"
    },
    North:{
      neutral:"assets/images/c50ad1d603cb4eae.jpg",
      analyzing:"assets/images/c52000aa1f740adf.jpg",
      serious:"assets/images/a32595ad37b3c868.jpg",
      skeptical:"assets/images/6931139ef06e0b99.jpg",
      dry:"assets/images/520455a5f976f4e5.jpg",
      smile:"assets/images/e8858b221595c517.jpg",
      concerned:"assets/images/5a51446056fdcb0a.jpg",
      determined:"assets/images/083c49be64c0c61b.jpg",
      pensive:"assets/images/1ae925a2f06c17ee.jpg",
      confident:"assets/images/b9e5ed1a6d0365a9.jpg"
    }
  };

  const COPY={
    en:{
      dev:"CHAPTER III · DEVELOPMENT ENTRY",
      launchTitle:"Select the Chapter II route",
      launchBody:"This temporary entry simulates the final Medical Examiner choice without changing the playable Chapter II build.",
      timeline:"Altered Timeline",
      timelineDesc:"Begin with the raw audit trail and the six disputed timestamps.",
      old_cases:"Older Cases",
      oldCasesDesc:"Begin with Daniel's archived investigations and the recurring anomaly.",
      access:"Personnel Access",
      accessDesc:"Begin with the valid credentials and the people authorised to use them.",
      resume:"Resume Phase 1",
      chapter:"CHAPTER III",
      chapterTitle:"THE BORROWED MINUTES",
      day:"DAY 3",
      dayPlace:"BANGKOK · 08:40 AM",
      dayCaption:"The morning after the record split in two",
      location:"Detective Office · Bangkok",
      scene:"THE MISSING PASSENGER",
      objective:"Reconstruct Daniel Voss's final verified timeline",
      choose:"Choose an investigative approach",
      systemChoice:"Follow the system — The relay is the crime scene.",
      danielChoice:"Follow Daniel — The booking tells us what he expected to find.",
      operatorChoice:"Follow the operator — Someone activated the booking this morning.",
      puzzleKicker:"Interactive Deduction",
      puzzleTitle:"Reconstruct the Timeline",
      puzzleBody:"Tap each event in the order it physically occurred. Tap a placed event to return it.",
      available:"Unsorted evidence",
      ordered:"Reconstructed sequence",
      reset:"Reset",
      check:"Check Sequence",
      feedbackStart:"Six verified events. One official story that cannot contain all of them.",
      feedbackIncomplete:"Place all six events before checking the sequence.",
      feedbackWrong:"The order still gives the official record too much credit.",
      feedbackHint:"Hint: begin with the first verified use of credential 18-07.",
      feedbackCorrect:"Sequence confirmed. The 05:58 → 06:09 revision borrowed exactly eleven minutes. The sample was then accepted three minutes before Daniel was officially discovered.",
      continue:"Continue",
      phaseComplete:"CHAPTER III · PHASE 1 COMPLETE",
      phaseName:"THE RECORD HAS A DEPARTURE GATE",
      phaseBody:"Daniel could not board the flight. Someone still activated his journey. The investigation now crosses into Singapore.",
      nextPhase:"Continue to Phase II",
      returnDev:"Return to Developer Entry",
      phase2:"PHASE II — DEPARTURE",
      phase2Wip:"Reserved for the next Chapter III build.",
      tap:"Tap to continue",
      route:"Route",
      routeTimeline:"ALTERED TIMELINE",
      routeOld:"OLDER CASES",
      routeAccess:"PERSONNEL ACCESS",
      saved:"Checkpoint saved",
      noSaved:"No Chapter III checkpoint found"
    },
    th:{
      dev:"บทที่ III · ทางเข้าโหมดพัฒนา",
      launchTitle:"เลือกเส้นทางจากตอนจบบทที่ II",
      launchBody:"ทางเข้าชั่วคราวนี้จำลองตัวเลือกสุดท้ายที่ห้องตรวจศพ โดยไม่เปลี่ยนแปลงบทที่ II ซึ่งเล่นได้อยู่",
      timeline:"ลำดับเวลาที่ถูกแก้",
      timelineDesc:"เริ่มจาก audit trail ดิบและเวลาพิรุธทั้งหกจุด",
      old_cases:"คดีเก่า",
      oldCasesDesc:"เริ่มจากแฟ้มสืบสวนของแดเนียลและความผิดปกติที่เกิดซ้ำ",
      access:"สิทธิ์เข้าถึงของบุคลากร",
      accessDesc:"เริ่มจาก credential ที่ถูกต้องและผู้ที่ได้รับอนุญาตให้ใช้งาน",
      resume:"เล่น Phase 1 ต่อ",
      chapter:"บทที่ III",
      chapterTitle:"สิบเอ็ดนาทีที่ถูกยืม",
      day:"วันที่ 3",
      dayPlace:"กรุงเทพฯ · 08:40 น.",
      dayCaption:"เช้าวันถัดมาหลังหลักฐานแยกออกเป็นสองเรื่อง",
      location:"สำนักงานนักสืบ · กรุงเทพฯ",
      scene:"ผู้โดยสารที่หายไป",
      objective:"เรียบเรียงลำดับเหตุการณ์สุดท้ายที่ยืนยันได้ของแดเนียล วอสส์",
      choose:"เลือกแนวทางสืบสวน",
      systemChoice:"ตามระบบ — relay ต่างหากคือสถานที่เกิดเหตุ",
      danielChoice:"ตามแดเนียล — การจองจะบอกว่าเขาคาดว่าจะพบอะไร",
      operatorChoice:"ตามผู้ใช้งาน — มีคนเปิดใช้งานการเดินทางเมื่อเช้านี้",
      puzzleKicker:"การอนุมานแบบโต้ตอบ",
      puzzleTitle:"เรียบเรียงลำดับเวลา",
      puzzleBody:"แตะเหตุการณ์ตามลำดับที่เกิดขึ้นจริง แตะเหตุการณ์ที่วางแล้วเพื่อนำกลับ",
      available:"หลักฐานที่ยังไม่เรียง",
      ordered:"ลำดับเหตุการณ์ที่ประกอบขึ้นใหม่",
      reset:"เริ่มใหม่",
      check:"ตรวจสอบลำดับ",
      feedbackStart:"เหตุการณ์ที่ยืนยันได้หกจุด แต่เรื่องราวทางการหนึ่งเรื่องไม่อาจบรรจุทั้งหมดไว้ด้วยกัน",
      feedbackIncomplete:"วางเหตุการณ์ให้ครบทั้งหกก่อนตรวจสอบ",
      feedbackWrong:"ลำดับนี้ยังเชื่อเรื่องในบันทึกทางการมากเกินไป",
      feedbackHint:"คำใบ้: เริ่มจากการใช้ credential 18-07 ครั้งแรกที่ยืนยันได้",
      feedbackCorrect:"ยืนยันลำดับแล้ว การแก้เวลา 05:58 → 06:09 ยืมเวลาไปสิบเอ็ดนาทีพอดี จากนั้นตัวอย่างถูกลงรับก่อนการพบศพอย่างเป็นทางการสามนาที",
      continue:"ดำเนินต่อ",
      phaseComplete:"จบบทที่ III · Phase 1",
      phaseName:"บันทึกนี้มีประตูขึ้นเครื่อง",
      phaseBody:"แดเนียลขึ้นเครื่องไม่ได้ แต่ยังมีคนเปิดใช้งานการเดินทางของเขา การสืบสวนกำลังข้ามไปยังสิงคโปร์",
      nextPhase:"ไปยัง Phase II",
      returnDev:"กลับสู่ทางเข้าโหมดพัฒนา",
      phase2:"PHASE II — ออกเดินทาง",
      phase2Wip:"เตรียมไว้สำหรับ Chapter III build ถัดไป",
      tap:"แตะเพื่อดำเนินต่อ",
      route:"เส้นทาง",
      routeTimeline:"ลำดับเวลาที่ถูกแก้",
      routeOld:"คดีเก่า",
      routeAccess:"สิทธิ์เข้าถึง",
      saved:"บันทึก checkpoint แล้ว",
      noSaved:"ไม่พบ checkpoint ของบทที่ III"
    }
  };

  const EVENTS=[
    {id:"access",time:"05:47",en:"Credential 18-07 enters Daniel's building.",th:"Credential 18-07 เข้าสู่อาคารของแดเนียล"},
    {id:"draft",time:"05:51",en:"Daniel's Orchid Café draft is edited.",th:"ร่างข้อความนัดพบที่ Orchid Café ของแดเนียลถูกแก้ไข"},
    {id:"sample",time:"05:58",en:"The original toxicology sample is collected.",th:"เก็บตัวอย่างพิษวิทยาตามเวลาต้นฉบับ"},
    {id:"revision",time:"06:09",en:"The collection time is revised by a valid credential.",th:"เวลารวบรวมตัวอย่างถูกแก้ด้วย credential ที่ถูกต้อง"},
    {id:"intake",time:"06:17",en:"The laboratory accepts the toxicology sample.",th:"ห้องปฏิบัติการลงรับตัวอย่างพิษวิทยา"},
    {id:"discovery",time:"06:20",en:"Daniel is officially reported discovered.",th:"มีการรายงานการพบแดเนียลอย่างเป็นทางการ"}
  ];
  const CORRECT=EVENTS.map(e=>e.id);
  const SHUFFLED=["revision","access","intake","draft","discovery","sample"];

  let game={
    language:localStorage.getItem("last_witness_language")||"en",
    route:null,
    checkpoint:"launcher",
    approach:null,
    attempts:0,
    ordered:[],
    history:[],
    relationships:{North:{trust:70,respect:78,attachment:58,suspicion:3}},
    personality:{warm:0,observant:0,direct:0}
  };
  let dialogueIndex=0,dialogueLines=[],dialogueDone=null;
  let toastTimer=null;

  function c(key){return COPY[game.language][key]||COPY.en[key]||key}
  function localized(obj){return typeof obj==="string"?obj:(obj?.[game.language]||obj?.en||"")}
  function portrait(speaker,emotion){return PORTRAITS[speaker]?.[emotion]||PORTRAITS[speaker]?.neutral||""}

  function readChapter2Save(){
    try{
      const data=JSON.parse(localStorage.getItem(AUTO_SAVE_KEY)||"null");
      if(!data)return null;
      const flags=data.flags||{};
      const route=flags.chapter3_timeline?"timeline":flags.chapter3_old_cases?"old_cases":flags.chapter3_access?"access":null;
      return {route,relationships:data.relationships,personality:data.personality};
    }catch(_){return null}
  }
  function dominantPersonality(){
    const entries=Object.entries(game.personality||{}).sort((a,b)=>(b[1]||0)-(a[1]||0));
    return entries[0]?.[1]>0?entries[0][0]:"neutral";
  }
  function loadDevSave(){
    try{return JSON.parse(localStorage.getItem(PREVIEW_KEY)||"null")}catch(_){return null}
  }
  function save(){
    localStorage.setItem(PREVIEW_KEY,JSON.stringify(game));
    toast(c("saved"));
  }
  function clearDevSave(){localStorage.removeItem(PREVIEW_KEY)}

  function clickSound(){
    const a=$("#ch3Click");if(!a)return;
    try{a.currentTime=0;a.volume=.36;a.play().catch(()=>{})}catch(_){}
  }
  function pageSound(){
    const a=$("#ch3Page");if(!a)return;
    try{a.currentTime=0;a.volume=.28;a.play().catch(()=>{})}catch(_){}
  }
  function startAudio(){
    const ambience=$("#ch3OfficeAmbience"),music=$("#ch3InvestigationMusic");
    if(ambience){ambience.loop=true;ambience.volume=.17;ambience.play().catch(()=>{})}
    if(music){
      music.loop=false;
      music.volume=.082;
      try{music.currentTime=20}catch(_){}
      music.play().catch(()=>{});
      music.ontimeupdate=()=>{if(music.currentTime>=138)music.currentTime=20};
    }
  }
  function stopAudio(){
    ["#ch3OfficeAmbience","#ch3InvestigationMusic"].forEach(id=>{const a=$(id);if(a){a.pause();a.currentTime=0}});
  }
  function setMusic(mode){
    const music=$("#ch3InvestigationMusic"),ambience=$("#ch3OfficeAmbience");
    if(!music||!ambience)return;
    const targets={dialogue:[.062,.16],puzzle:[.102,.13],choice:[.074,.15],complete:[.055,.09]}[mode]||[.082,.17];
    ramp(music,targets[0]);ramp(ambience,targets[1]);
  }
  function ramp(audio,target){
    const from=audio.volume,steps=12;let i=0;clearInterval(audio._ch3Ramp);
    audio._ch3Ramp=setInterval(()=>{i++;audio.volume=Math.max(0,Math.min(1,from+(target-from)*(i/steps)));if(i>=steps)clearInterval(audio._ch3Ramp)},35);
  }

  function toast(text){
    const t=$("#ch3Toast");if(!t)return;
    t.textContent=text;t.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove("show"),1300);
  }
  function showScreen(id){
    $$(".ch3-screen").forEach(s=>s.classList.remove("active"));
    $("#"+id)?.classList.add("active");
  }
  function routeLabel(){return c(game.route==="timeline"?"routeTimeline":game.route==="old_cases"?"routeOld":"routeAccess")}

  function renderShell(){
    APP.innerHTML=`
      <section id="ch3Launcher" class="ch3-screen ch3-launcher active"></section>
      <section id="ch3Intro" class="ch3-screen ch3-cinematic"></section>
      <section id="ch3Day" class="ch3-screen ch3-day"></section>
      <section id="ch3Office" class="ch3-screen">
        <img class="ch3-scene" src="assets/images/e49ae621ba4833ff.png" alt="Detective Office">
        <div class="ch3-vignette"></div>
        <div class="ch3-topbar"><div class="ch3-location"></div><div class="ch3-hud"><button id="ch3LanguageButton" class="ch3-icon" type="button">${game.language.toUpperCase()}</button><button id="ch3Restart" class="ch3-icon" type="button">↻</button></div></div>
        <div class="ch3-progress"><div class="ch3-progress-track"><div id="ch3ProgressFill" class="ch3-progress-fill"></div></div><div id="ch3ProgressText" class="ch3-progress-text">0%</div></div>
        <div id="ch3Objective" class="ch3-objective"></div>
        <div id="ch3SceneLabel" class="ch3-scene-label"></div>
        <div id="ch3DataCard" class="ch3-data-card"></div>
        <div id="ch3Dialogue" class="ch3-dialogue" hidden></div>
        <div id="ch3Choice" class="ch3-choice" hidden></div>
        <div id="ch3Puzzle" class="ch3-puzzle" aria-hidden="true"></div>
      </section>
      <section id="ch3Complete" class="ch3-screen ch3-phase-complete"></section>
      <section id="ch3Phase2Wip" class="ch3-screen ch3-cinematic"></section>
      <div id="ch3Toast" class="ch3-toast"></div>
    `;
    bindStatic();
    renderLauncher();
    localizeStatic();
  }

  function localizeStatic(){
    document.documentElement.lang=game.language;
    $("#ch3LanguageButton")&&( $("#ch3LanguageButton").textContent=game.language.toUpperCase() );
    $(".ch3-location")&&( $(".ch3-location").textContent=c("location") );
    $("#ch3Objective")&&( $("#ch3Objective").textContent=c("objective") );
    $("#ch3SceneLabel")&&( $("#ch3SceneLabel").textContent=c("scene") );
    if($("#ch3Launcher")?.classList.contains("active"))renderLauncher();
    if($("#ch3Puzzle")?.classList.contains("open"))renderPuzzle();
  }

  function renderLauncher(){
    const root=$("#ch3Launcher");if(!root)return;
    const saved=loadDevSave();
    const ch2=readChapter2Save();
    root.innerHTML=`<div class="ch3-launch-card">
      <div class="ch3-brand">LAST WITNESS</div>
      <h1>${c("dev")}</h1>
      <p>${c("launchBody")}</p>
      <div class="ch3-route-grid">
        <button class="ch3-route" data-route="timeline"><strong>${c("timeline")}</strong><span>${c("timelineDesc")}</span></button>
        <button class="ch3-route" data-route="old_cases"><strong>${c("old_cases")}</strong><span>${c("oldCasesDesc")}</span></button>
        <button class="ch3-route" data-route="access"><strong>${c("access")}</strong><span>${c("accessDesc")}</span></button>
      </div>
      ${ch2?.route?`<button class="ch3-primary ch3-resume" data-route="${ch2.route}">${c("continue")} · ${routeName(ch2.route)}</button>`:""}
      ${saved?.route?`<button id="ch3Resume" class="ch3-ghost ch3-resume">${c("resume")} · ${routeName(saved.route)}</button>`:""}
      <div class="ch3-language"><button data-language="en" class="${game.language==="en"?"active":""}">EN</button><button data-language="th" class="${game.language==="th"?"active":""}">TH</button></div>
    </div>`;
    $$('[data-route]',root).forEach(b=>b.addEventListener("click",()=>begin(b.dataset.route,false)));
    $("#ch3Resume",root)?.addEventListener("click",()=>resume(saved));
    $$('[data-language]',root).forEach(b=>b.addEventListener("click",()=>setLanguage(b.dataset.language)));
  }
  function routeName(route){return c(route==="timeline"?"timeline":route==="old_cases"?"old_cases":"access")}

  function bindStatic(){
    $("#ch3LanguageButton")?.addEventListener("click",()=>setLanguage(game.language==="en"?"th":"en"));
    $("#ch3Restart")?.addEventListener("click",()=>{clickSound();clearDevSave();stopAudio();renderShell()});
  }
  function setLanguage(lang){
    game.language=lang;localStorage.setItem("last_witness_language",lang);localizeStatic();
    if(!$("#ch3Launcher")?.classList.contains("active")){
      const current=$(".ch3-screen.active")?.id;
      if(current==="ch3Intro")renderIntro();
      if(current==="ch3Day")renderDay();
      if(current==="ch3Complete")renderComplete();
      if(current==="ch3Phase2Wip")renderPhase2Wip();
      if(!$("#ch3Dialogue")?.hidden)drawDialogue();
      if(!$("#ch3Choice")?.hidden)renderApproachChoice();
    }
  }

  function begin(route,resuming){
    clickSound();
    const source=readChapter2Save();
    game.route=route;
    game.checkpoint="intro";
    game.approach=null;
    game.attempts=0;
    game.ordered=[];
    game.history=[];
    if(source){
      game.relationships=source.relationships||game.relationships;
      game.personality=source.personality||game.personality;
    }
    save();startAudio();renderIntro();showScreen("ch3Intro");
    setTimeout(()=>{renderDay();showScreen("ch3Day")},2850);
    setTimeout(()=>{showOffice();runOpening()},5000);
  }
  function resume(saved){
    clickSound();Object.assign(game,saved||{});startAudio();showOffice();
    if(game.checkpoint==="complete")renderComplete();
    else if(game.checkpoint==="choice")renderApproachChoice();
    else if(game.checkpoint==="post_puzzle")runPostPuzzle();
    else if(game.checkpoint==="puzzle")openPuzzle();
    else runOpening();
  }

  function renderIntro(){
    $("#ch3Intro").innerHTML=`<div class="ch3-cinematic-card"><div class="ch3-brand">LAST WITNESS</div><div class="ch3-chapter-number">${c("chapter")}</div><div class="ch3-chapter-title">${c("chapterTitle")}</div><div class="ch3-rule"></div></div>`;
    const a=$("#ch3Chapter");if(a){a.currentTime=0;a.volume=.36;a.play().catch(()=>{})}
  }
  function renderDay(){
    $("#ch3Day").innerHTML=`<div><div class="day">${c("day")}</div><div class="place">${c("dayPlace")}</div><div class="caption">${c("dayCaption")}</div></div>`;
  }
  function showOffice(){
    showScreen("ch3Office");localizeStatic();setProgress(1);setMusic("dialogue");
  }
  function setProgress(n){
    const pct=Math.max(0,Math.min(12,n));
    $("#ch3ProgressFill").style.width=`${pct/12*100}%`;
    $("#ch3ProgressText").textContent=`${pct}%`;
  }
  function showDataCard(key,value,sub){
    const box=$("#ch3DataCard");
    box.innerHTML=`<div class="key">${key}</div><div class="value">${value}</div><div class="sub">${sub}</div>`;
    box.classList.add("show");
  }
  function hideDataCard(){$("#ch3DataCard")?.classList.remove("show")}

  function personalityOpening(){
    const p=dominantPersonality();
    if(p==="warm")return [
      L("Benedict","smile","You look like you slept less than the evidence.","ดูเหมือนคุณจะได้นอนน้อยกว่าหลักฐานอีกนะ"),
      L("North","dry","The evidence did not argue with a regional server until three in the morning.","หลักฐานไม่ได้เถียงกับเซิร์ฟเวอร์ภูมิภาคถึงตีสามนี่")
    ];
    if(p==="observant")return [
      L("Benedict","thinking","Two printouts, no coffee, and the Singapore clock is open on your screen.","มีเอกสารสองชุด ไม่มีกาแฟ แล้วนาฬิกาสิงคโปร์ก็เปิดอยู่บนจอคุณ"),
      L("North","dry","Good. I can skip the part where I pretend this is local.","ดี งั้นฉันข้ามส่วนที่ต้องแกล้งทำว่าเรื่องนี้อยู่แค่ในประเทศได้เลย")
    ];
    if(p==="direct")return [
      L("Benedict","serious","Tell me why we're going to Singapore.","บอกผมมาว่าทำไมเราต้องไปสิงคโปร์"),
      L("North","neutral","Because the record left Bangkok before Daniel could.","เพราะบันทึกออกจากกรุงเทพฯ ก่อนที่แดเนียลจะทำได้")
    ];
    return [
      L("North","neutral","Morning.","สวัสดีตอนเช้า"),
      L("Benedict","smirk","That depends on what the screens are about to tell me.","จะเช้าดีหรือไม่ คงต้องดูว่าจอพวกนั้นกำลังจะบอกอะไรผม")
    ];
  }
  function routeOpening(){
    if(game.route==="timeline")return [
      L("North","analyzing","I rebuilt the audit trail from the raw exports. Terminal Three never sent the revision.","ฉันประกอบ audit trail ใหม่จากข้อมูลดิบ Terminal Three ไม่เคยส่งรายการแก้นั้นออกมา"),
      L("Benedict","serious","It was offline. We knew that.","มันออฟไลน์อยู่ เรื่องนั้นเรารู้แล้ว"),
      L("North","serious","We knew the machine was offline. We did not know the event arrived through a delayed reconciliation queue in Singapore.","เรารู้ว่าเครื่องออฟไลน์ แต่ยังไม่รู้ว่าเหตุการณ์นั้นเข้ามาผ่านคิวปรับข้อมูลย้อนหลังที่สิงคโปร์")
    ];
    if(game.route==="old_cases")return [
      L("North","analyzing","Daniel archived four cases with the same symptom: valid evidence, corrected chronology, no broken seal.","แดเนียลเก็บคดีเก่าสี่คดีที่มีอาการเดียวกัน หลักฐานถูกต้อง ลำดับเวลาถูกแก้ และไม่มีซีลชำรุด"),
      L("Benedict","thinking","All shifted by eleven minutes?", "ทั้งหมดถูกเลื่อนไปสิบเอ็ดนาทีหรือ"),
      L("North","serious","Not all. The oldest two used nine. Then ten. Eleven appears after a Singapore service contract was renewed.","ไม่ทั้งหมด สองคดีแรกใช้เก้านาที ต่อมาเป็นสิบนาที ส่วนสิบเอ็ดนาทีเริ่มหลังสัญญาบริการในสิงคโปร์ถูกต่ออายุ")
    ];
    return [
      L("North","analyzing","Credential 18-07 was not cloned inside Daniel's building. It was reissued by a regional signing authority.","Credential 18-07 ไม่ได้ถูกโคลนภายในอาคารของแดเนียล มันถูกออกใหม่โดยหน่วยลงนามระดับภูมิภาค"),
      L("Benedict","serious","Authorised by whom?", "ใครเป็นผู้อนุมัติ"),
      L("North","serious","That is the problem. The authority is valid. The operator identity is blank. The certificate resolves to Singapore.","นั่นแหละปัญหา หน่วยออกสิทธิ์ถูกต้อง แต่ช่องผู้ใช้งานว่างเปล่า และ certificate ชี้ไปที่สิงคโปร์")
    ];
  }
  function sharedOpening(){
    return [
      L("North","determined","All three trails touch the same node: MERIDIAN RELAY SG-04.","ร่องรอยทั้งสามเส้นมาบรรจบที่ node เดียวกัน MERIDIAN RELAY SG-04"),
      L("Benedict","thinking","A server?", "เซิร์ฟเวอร์หรือ"),
      L("North","analyzing","A reconciliation service. When a trusted site goes offline, it holds signed events and synchronises them later.","บริการปรับข้อมูลให้ตรงกัน เมื่อจุดที่ระบบไว้ใจออฟไลน์ มันจะพักเหตุการณ์ที่ลงนามไว้แล้วซิงก์ภายหลัง"),
      L("Benedict","serious","How much later?", "ภายหลังได้นานแค่ไหน"),
      L("North","serious","Eleven minutes before mandatory review.","สิบเอ็ดนาทีก่อนระบบบังคับตรวจสอบ"),
      L("Benedict","somber","The lie was not inside the test. It was built inside the grace period.","เรื่องโกหกไม่ได้อยู่ในผลตรวจ แต่มันถูกสร้างไว้ในช่วงเวลาผ่อนผันของระบบ"),
      L("North","neutral","Elena compared the metadata from Hotel 1807 with Daniel's toxicology revision. Same reconciliation profile: SG-RC-11. Scientific files untouched.","Elena เปรียบเทียบ metadata ของ Hotel 1807 กับรายการแก้พิษวิทยาของแดเนียลแล้ว ทั้งคู่ใช้ reconciliation profile เดียวกัน SG-RC-11 และไฟล์วิทยาศาสตร์ไม่ถูกแตะต้อง"),
      L("Benedict","suspicious","So Room 1807 and credential 18-07 were not a coincidence.","งั้นห้อง 1807 กับ credential 18-07 ก็ไม่ใช่เรื่องบังเอิญ"),
      L("North","skeptical","Not proof of the same operator. Proof of the same trusted route.","ยังไม่ใช่หลักฐานว่าเป็นผู้ใช้งานคนเดียวกัน แต่เป็นหลักฐานว่าใช้เส้นทางที่ระบบไว้ใจเส้นเดียวกัน"),
      L("Benedict","neutral","Show me the sequence.","แสดงลำดับให้ผมดู")
    ];
  }
  function L(speaker,emotion,en,th){return{speaker,emotion,text:{en,th}}}

  function runOpening(){
    game.checkpoint="opening";save();
    runDialogue([...personalityOpening(),...routeOpening(),...sharedOpening()],()=>{
      game.checkpoint="puzzle";save();openPuzzle();
    });
  }

  function runDialogue(lines,onDone){
    hideDataCard();setMusic("dialogue");
    dialogueLines=lines;dialogueIndex=0;dialogueDone=onDone;
    const box=$("#ch3Dialogue");box.hidden=false;drawDialogue();
    box.onclick=()=>{
      clickSound();dialogueIndex++;
      if(dialogueIndex>=dialogueLines.length){box.hidden=true;box.onclick=null;dialogueDone?.();return}
      drawDialogue();
    };
  }
  function drawDialogue(){
    const line=dialogueLines[dialogueIndex];if(!line)return;
    const box=$("#ch3Dialogue"),right=line.speaker==="North";
    box.className="ch3-dialogue"+(right?" right":"");
    const image=`<div class="ch3-portrait-wrap"><img class="ch3-portrait" src="${portrait(line.speaker,line.emotion)}" alt="${line.speaker}"></div>`;
    const copy=`<div class="ch3-copy"><div class="ch3-speaker">${line.speaker}</div><div class="ch3-line">${localized(line.text)}</div></div>`;
    box.innerHTML=(right?copy+image:image+copy)+`<div class="ch3-next">${c("tap")}</div>`;
    game.history.push({speaker:line.speaker,text:localized(line.text)});
  }

  function openPuzzle(){
    setMusic("puzzle");hideDataCard();
    $("#ch3Dialogue").hidden=true;$("#ch3Choice").hidden=true;
    const puzzle=$("#ch3Puzzle");puzzle.classList.add("open");puzzle.setAttribute("aria-hidden","false");
    renderPuzzle();
  }
  function renderPuzzle(feedback){
    const puzzle=$("#ch3Puzzle");if(!puzzle)return;
    const available=SHUFFLED.filter(id=>!game.ordered.includes(id));
    const eventButton=(id,placed)=>{const e=EVENTS.find(x=>x.id===id);return `<button class="ch3-event" data-event="${id}" data-placed="${placed?1:0}"><span class="time">${e.time}</span><span class="event-text">${game.language==="th"?e.th:e.en}</span></button>`};
    puzzle.innerHTML=`<div class="ch3-puzzle-card">
      <div class="ch3-puzzle-head"><div><div class="ch3-puzzle-kicker">${c("puzzleKicker")}</div><h2>${c("puzzleTitle")}</h2><p>${c("puzzleBody")}</p></div><button id="ch3ClosePuzzle" class="ch3-icon" type="button">×</button></div>
      <div class="ch3-puzzle-grid">
        <section class="ch3-puzzle-section"><div class="ch3-puzzle-label">${c("available")}</div><div class="ch3-event-list">${available.map(id=>eventButton(id,false)).join("")||"—"}</div></section>
        <section class="ch3-puzzle-section"><div class="ch3-puzzle-label">${c("ordered")} · ${game.ordered.length}/6</div><div class="ch3-event-list">${game.ordered.map(id=>eventButton(id,true)).join("")||"—"}</div></section>
      </div>
      <div class="ch3-puzzle-actions"><button id="ch3ResetPuzzle" class="ch3-ghost">${c("reset")}</button><button id="ch3CheckPuzzle" class="ch3-primary">${c("check")}</button></div>
      <div class="ch3-feedback">${feedback||c("feedbackStart")}</div>
    </div>`;
    $$('[data-event]',puzzle).forEach(b=>b.addEventListener("click",()=>{
      clickSound();const id=b.dataset.event;
      if(b.dataset.placed==="1")game.ordered=game.ordered.filter(x=>x!==id);else game.ordered.push(id);
      save();renderPuzzle();
    }));
    $("#ch3ResetPuzzle")?.addEventListener("click",()=>{clickSound();game.ordered=[];renderPuzzle()});
    $("#ch3CheckPuzzle")?.addEventListener("click",checkPuzzle);
    $("#ch3ClosePuzzle")?.addEventListener("click",()=>toast(c("objective")));
  }
  function checkPuzzle(){
    clickSound();
    if(game.ordered.length<6){renderPuzzle(c("feedbackIncomplete"));return}
    if(game.ordered.join("|")!==CORRECT.join("|")){
      game.attempts++;save();renderPuzzle(game.attempts>=2?`${c("feedbackWrong")} ${c("feedbackHint")}`:c("feedbackWrong"));return;
    }
    const puzzle=$("#ch3Puzzle");
    $$('[data-event="sample"],[data-event="revision"]',puzzle).forEach(n=>n.classList.add("correct-shift"));
    $$('[data-event="intake"],[data-event="discovery"]',puzzle).forEach(n=>n.classList.add("correct-paradox"));
    $(".ch3-feedback",puzzle).textContent=c("feedbackCorrect");
    $("#ch3CheckPuzzle",puzzle).textContent=c("continue");
    $("#ch3CheckPuzzle",puzzle).onclick=()=>{
      pageSound();puzzle.classList.remove("open");puzzle.setAttribute("aria-hidden","true");
      game.checkpoint="post_puzzle";setProgress(5);save();runPostPuzzle();
    };
  }

  function runPostPuzzle(){
    setProgress(5);
    const routeLine=game.route==="timeline"
      ?L("North","analyzing","The correction did not overwrite the event. It entered during the relay's tolerance window and was ordered as if it had always been local.","รายการแก้ไม่ได้เขียนทับเหตุการณ์ แต่มันเข้าสู่ช่วงเวลาผ่อนผันของ relay แล้วถูกจัดลำดับราวกับเกิดในเครื่องตั้งแต่แรก")
      :game.route==="old_cases"
      ?L("North","serious","The older cases were not random errors. They show the tolerance window being refined before Daniel's case.","คดีเก่าไม่ใช่ข้อผิดพลาดสุ่ม แต่แสดงให้เห็นว่าช่วงเวลาผ่อนผันถูกปรับจนลงตัวก่อนคดีของแดเนียล")
      :L("North","serious","The same trusted route reissued 18-07 and accepted the laboratory signature. Valid access, operator unknown.","เส้นทางที่ระบบไว้ใจเส้นเดียวกันออก 18-07 ใหม่และรับลายเซ็นห้องปฏิบัติการ สิทธิ์ถูกต้อง แต่ไม่รู้ตัวผู้ใช้งาน");
    runDialogue([
      routeLine,
      L("Benedict","thinking","Why would Daniel care about the relay itself?", "ทำไมแดเนียลถึงสนใจตัว relay"),
      L("North","neutral","Because he booked a flight to Singapore for today. Departure 12:05.","เพราะเขาจองเที่ยวบินไปสิงคโปร์ไว้วันนี้ เวลาออกเดินทาง 12:05 น."),
      L("Benedict","serious","He died before he could use it.","เขาเสียชีวิตก่อนจะได้ใช้ตั๋ว"),
      L("North","concerned","The booking was activated at 07:58 this morning. Checked in. No gate scan.","การจองถูกเปิดใช้งานเมื่อ 07:58 น. เช็กอินแล้ว แต่ไม่มีการสแกนที่ประตูขึ้นเครื่อง"),
      L("Benedict","suspicious","Someone checked in a dead man.","มีคนเช็กอินให้คนตาย"),
      L("North","analyzing","And a serviced apartment in Singapore issued temporary credential 18-07 to the same booking. Paid by Meridian Ledger Pte. Ltd.—one of the shell companies on Daniel's board.","และ serviced apartment ในสิงคโปร์ออก credential ชั่วคราว 18-07 ให้การจองเดียวกัน ค่าใช้จ่ายมาจาก Meridian Ledger Pte. Ltd. หนึ่งในบริษัทเปลือกบนกระดานของแดเนียล"),
      L("Benedict","serious","Who has the local records?", "ใครมีบันทึกต้นทาง"),
      L("North","neutral","Changi retains the arrival operations copy. The relay data requires a local warrant. Captain Kittisak arranged a liaison—Inspector Cheryl Goh.","ฝ่ายปฏิบัติการขาเข้าที่ชางงีเก็บสำเนาไว้ ส่วนข้อมูล relay ต้องใช้หมายในประเทศ ผู้กองกิตติศักดิ์ประสาน Inspector Cheryl Goh ให้แล้ว"),
      L("Benedict","smirk","Any restrictions?", "มีข้อจำกัดอะไรบ้าง"),
      L("North","dry","No arrests. No touching live systems. No international improvisation.","ห้ามจับกุม ห้ามแตะระบบที่กำลังทำงาน และห้ามด้นสดข้ามประเทศ"),
      L("Benedict","smirk","He removed my three strongest methods.","เขาตัดวิธีถนัดที่สุดของผมออกครบสามอย่างเลย"),
      L("North","dry","You still have questions. Use those.","คุณยังมีคำถาม ใช้มันแทน")
    ],()=>{
      showDataCard(game.language==="th"?"บันทึกการเดินทาง":"TRAVEL RECORD","BW 221 · BANGKOK → SINGAPORE · 12:05",game.language==="th"?"เช็กอิน 07:58 · ไม่มีการสแกนประตู · credential 18-07 ถูกออกในสิงคโปร์":"CHECK-IN 07:58 · NO GATE SCAN · CREDENTIAL 18-07 ISSUED IN SINGAPORE");
      game.checkpoint="choice";save();renderApproachChoice();
    });
  }

  function renderApproachChoice(){
    setMusic("choice");
    const box=$("#ch3Choice");box.hidden=false;
    box.innerHTML=`<div class="ch3-choice-title">${c("choose")}</div>
      <button data-approach="system">${c("systemChoice")}</button>
      <button data-approach="daniel">${c("danielChoice")}</button>
      <button data-approach="operator">${c("operatorChoice")}</button>`;
    $$('[data-approach]',box).forEach(b=>b.addEventListener("click",()=>chooseApproach(b.dataset.approach)));
  }
  function chooseApproach(approach){
    clickSound();hideDataCard();$("#ch3Choice").hidden=true;
    game.approach=approach;
    const rel=game.relationships.North||(game.relationships.North={trust:70,respect:78,attachment:58,suspicion:3});
    let response;
    if(approach==="system"){
      rel.respect=(rel.respect||0)+3;
      response=[
        L("Benedict","serious","The relay is the crime scene. We start with the system that made the impossible record look ordinary.","Relay คือสถานที่เกิดเหตุ เราเริ่มจากระบบที่ทำให้บันทึกเป็นไปไม่ได้ดูเหมือนเรื่องธรรมดา"),
        L("North","confident","Then Farid's lab comes first. Cheryl can preserve the legal route while we preserve the technical one.","งั้นห้องแล็บของ Farid มาก่อน Cheryl จะรักษาเส้นทางกฎหมาย ส่วนเรารักษาเส้นทางเทคนิค")
      ];
    }else if(approach==="daniel"){
      rel.trust=(rel.trust||0)+1;rel.respect=(rel.respect||0)+2;
      response=[
        L("Benedict","thinking","Daniel chose Singapore before anyone knew we'd find the eleven minutes. We follow what he intended to do.","แดเนียลเลือกสิงคโปร์ก่อนใครจะรู้ว่าเราพบสิบเอ็ดนาที เราตามสิ่งที่เขาตั้งใจจะทำ"),
        L("North","neutral","Changi first, then the apartment. His route may explain which record he trusted last.","เริ่มที่ชางงี แล้วไปอพาร์ตเมนต์ เส้นทางของเขาอาจบอกว่าบันทึกใดเป็นสิ่งสุดท้ายที่เขายังเชื่อ")
      ];
    }else{
      rel.trust=(rel.trust||0)+1;game.flags={...(game.flags||{}),request_live_watch:true};
      response=[
        L("Benedict","suspicious","Someone activated the booking after Daniel died. I want the person who expected his identity to keep moving.","มีคนเปิดใช้งานการจองหลังแดเนียลตาย ผมต้องการคนที่คาดว่าตัวตนของเขาจะยังเดินทางต่อ"),
        L("North","concerned","I'll ask Cheryl for a live watch. Quietly. If the operator is still active, they may already know we opened the file.","ฉันจะขอให้ Cheryl เฝ้าระบบแบบสดๆ อย่างเงียบที่สุด ถ้าผู้ใช้งานยังเคลื่อนไหว เขาอาจรู้แล้วว่าเราเปิดแฟ้ม")
      ];
    }
    game.checkpoint="departure";setProgress(8);save();
    runDialogue([...response,
      L("North","neutral","I reserved two seats while you were deciding.","ฉันจองที่นั่งสองที่ไว้ระหว่างที่คุณกำลังตัดสินใจ"),
      L("Benedict","surprised","You waited until after the choice to tell me?", "คุณรอให้ผมเลือกเสร็จแล้วค่อยบอกหรือ"),
      L("North","dry","I wanted you to feel involved.","ฉันอยากให้คุณรู้สึกว่ามีส่วนร่วม"),
      L("Benedict","smile","That's very considerate.","ช่างใส่ใจจริงๆ"),
      L("North","dry","Pack light. Your luggage has a history of becoming evidence.","จัดกระเป๋าให้น้อย ของในกระเป๋าคุณมีประวัติชอบกลายเป็นหลักฐาน")
    ],finishPhase);
  }

  function finishPhase(){
    game.checkpoint="complete";setProgress(12);save();setMusic("complete");renderComplete();
  }
  function renderComplete(){
    stopAudio();showScreen("ch3Complete");
    const a=$("#ch3Chapter");if(a){a.currentTime=0;a.volume=.44;a.play().catch(()=>{})}
    $("#ch3Complete").innerHTML=`<div class="ch3-phase-card"><div class="ch3-brand">LAST WITNESS</div><h2>${c("phaseComplete")}</h2><div class="phase-name">${c("phaseName")}</div><p>${c("phaseBody")}</p><button id="ch3NextPhase" class="ch3-primary">${c("nextPhase")}</button><button id="ch3BackDev" class="ch3-ghost">${c("returnDev")}</button></div>`;
    $("#ch3NextPhase").onclick=()=>{clickSound();renderPhase2Wip();showScreen("ch3Phase2Wip")};
    $("#ch3BackDev").onclick=()=>{clickSound();stopAudio();renderShell()};
  }
  function renderPhase2Wip(){
    $("#ch3Phase2Wip").innerHTML=`<div class="ch3-cinematic-card"><div class="ch3-brand">LAST WITNESS</div><div class="ch3-chapter-number">${c("phase2")}</div><div class="ch3-chapter-title">SINGAPORE</div><div class="ch3-rule"></div><p style="color:#939aa4;margin:20px 0">${c("phase2Wip")}</p><button id="ch3Phase2Back" class="ch3-ghost">${c("returnDev")}</button></div>`;
    $("#ch3Phase2Back").onclick=()=>{clickSound();renderShell()};
  }

  window.LastWitnessChapter3Phase1={
    start:(route="timeline")=>begin(route,false),
    resume:()=>resume(loadDevSave()),
    reset:()=>{clearDevSave();stopAudio();renderShell()},
    version:"0.1.0-phase1"
  };

  renderShell();
})();
