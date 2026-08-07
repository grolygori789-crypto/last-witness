/* LAST WITNESS - Chapter IV / Phase VI: THE FALSE SUCCESS 0.19.5
 * Direct Phase V handoff, hotel character beat, controlled false-success hold,
 * read-only reaction-chain reconstruction and Phase VII relay-facility lead.
 * Thai presentation is native-authored subtitle copy: concise, spoken-natural,
 * canon-faithful and never a literal sentence-by-sentence translation.
 */
(function(){
"use strict";
if(window.LastWitnessChapter4Phase6?.version==="0.19.5")return;

const BUILD="0.19.5";
const P5_COMPLETE="arunaPhase5Complete";
const TITLE="falseSuccessPhase6Card";
const HOTEL_CARD="falseSuccessHotelCard";
const BEDROOM="falseSuccessBedroom";
const LOUNGE="falseSuccessLounge";
const TEAM_CG="falseSuccessTeamCG";
const ALERT="falseSuccessAlert";
const LAB_CARD="falseSuccessLabCard";
const LAB="falseSuccessLab";
const COMPLETE="falseSuccessPhase6Complete";
const SCREENS=new Set([TITLE,HOTEL_CARD,BEDROOM,LOUNGE,TEAM_CG,ALERT,LAB_CARD,LAB,COMPLETE]);
const EVIDENCE_IDS=[
 "ch4_p6_controlled_observation_consent",
 "ch4_p6_false_success_receipt_chain",
 "ch4_p6_relay_activation_trace",
 "ch4_p6_jktr7_maintenance_manifest"
];
const CASCADE_IDS=["receipt","watch_closed","archive_queued","handshake","maintenance","owner_claim"];
const CASCADE_GROUPS=["claim","reaction","physical","unproven"];
const CASCADE_CORRECT={receipt:"claim",watch_closed:"reaction",archive_queued:"reaction",handshake:"reaction",maintenance:"physical",owner_claim:"unproven"};
const A=()=>window.LastWitnessPhase6VisualAssets||{};
const PA=()=>window.LastWitnessPhase6PortraitAssets||{};
const AA=()=>window.LastWitnessPhase6AudioAssets||{};
const $=(selector,root=document)=>root.querySelector(selector);
const $$=(selector,root=document)=>Array.from(root.querySelectorAll(selector));
const gs=()=>{try{return state}catch(_){return window.state||null}};
const thai=()=>gs()?.language==="th"||document.documentElement.lang==="th";
const tr=(en,th)=>thai()?th:en;
const clamp=(value,min=0,max=1)=>Math.max(min,Math.min(max,Number(value)||0));
const active=()=>$(".screen.active")?.id||gs()?.screen||"";
const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));

let dialogue=null;
let transitionTimer=0;
let cascadeOpen=false;
let cascadeFocusId="";
let evidenceOpen=false;
let activeEvidenceIndex=0;
let handoffObserver=null;
let registryInstalled=false;
let saveBridgeInstalled=false;
let internalRouting=false;
let hotelAudio=null;
let hotelAudioReady=false;
let webAudio=null;
let ambienceNodes=[];
let audioUnlocked=false;
let cgDialogue=null;

function defaults(){return{
 started:false,titleSeen:false,hotelCardSeen:false,bedroomIntroComplete:false,loungeBriefComplete:false,
 teamCgSeen:false,alertOpened:false,northConsentRecorded:false,consentDialogueComplete:false,
 labCardSeen:false,labBriefComplete:false,cascadeAssignments:{},cascadeAttempts:0,cascadeComplete:false,
 evidenceCollected:[],evidenceViewed:[],relayConfirmed:false,closingComplete:false,complete:false,stage:"title"
}}
function phaseState(){return gs()?.chapter4?.phase6||null}
function ensure(){
 const s=gs();if(!s)return null;s.chapter=4;s.chapter4=s.chapter4||{};s.flags=s.flags||{};s.characters=s.characters||{};s.relationships=s.relationships||{};
 const p=s.chapter4.phase6&&typeof s.chapter4.phase6==="object"?s.chapter4.phase6:{};
 Object.assign(p,Object.assign(defaults(),p));
 if(!p.cascadeAssignments||typeof p.cascadeAssignments!=="object")p.cascadeAssignments={};
 Object.keys(p.cascadeAssignments).forEach(id=>{if(!CASCADE_IDS.includes(id)||!CASCADE_GROUPS.includes(p.cascadeAssignments[id]))delete p.cascadeAssignments[id]});
 if(!Array.isArray(p.evidenceCollected))p.evidenceCollected=[];
 if(!Array.isArray(p.evidenceViewed))p.evidenceViewed=[];
 p.evidenceCollected=[...new Set(p.evidenceCollected.filter(id=>EVIDENCE_IDS.includes(id)))];
 p.evidenceViewed=[...new Set(p.evidenceViewed.filter(id=>EVIDENCE_IDS.includes(id)))];
 if(p.started&&!p.northConsentRecorded&&["lab-card","lab","cascade","evidence","closing","complete"].includes(String(p.stage||""))){
  p.stage="alert";p.labCardSeen=false;p.labBriefComplete=false;p.cascadeComplete=false;p.relayConfirmed=false;p.closingComplete=false;p.complete=false
 }
 if(p.complete){Object.assign(p,{started:true,titleSeen:true,hotelCardSeen:true,bedroomIntroComplete:true,loungeBriefComplete:true,teamCgSeen:true,alertOpened:true,northConsentRecorded:true,consentDialogueComplete:true,labCardSeen:true,labBriefComplete:true,cascadeAssignments:{...CASCADE_CORRECT},cascadeComplete:true,evidenceCollected:[...EVIDENCE_IDS],evidenceViewed:[...EVIDENCE_IDS],relayConfirmed:true,closingComplete:true,stage:"complete"})}
 s.chapter4.phase6=p;return p
}
function save(){try{if(typeof autoSave==="function")autoSave()}catch(_){} }
function setCheckpoint(value){const s=gs();if(s)s.checkpoint=value;save()}
function setBuild(){window.LastWitnessRuntimeBuild=BUILD;document.documentElement.dataset.runtimeBuild=BUILD;try{window.LastWitnessRuntimeBuildLabel?.sync?.()}catch(_){} }
function clearTimers(){clearTimeout(transitionTimer);transitionTimer=0}
function safeShow(id){
 internalRouting=true;
 try{if(typeof show==="function")show(id)}catch(_){}
 if(!$("#"+id)?.classList.contains("active")){$$(".screen.active").forEach(n=>n.classList.remove("active"));$("#"+id)?.classList.add("active");if(gs())gs().screen=id}
 internalRouting=false;setBuild();syncProgress();syncAudio()
}
function stopElement(media,reset=false){if(!media)return;try{media.pause();if(reset)media.currentTime=0}catch(_){} }
function stopForeignAudio(){
 ["LastWitnessChapter4Phase5","LastWitnessChapter4Phase4","LastWitnessChapter4Phase3","LastWitnessChapter4Phase2","LastWitnessChapter4Phase1"].forEach(name=>{try{window[name]?.stopAudio?.(true)}catch(_){}})
}

function ensureAudio(){
 if(!hotelAudio){hotelAudio=new Audio();hotelAudio.id="ch4P6HotelMusic";hotelAudio.loop=true;hotelAudio.preload="auto";hotelAudio.src=AA().hotelMusic||"";hotelAudioReady=Boolean(hotelAudio.src)}
 if(!webAudio){const Ctx=window.AudioContext||window.webkitAudioContext;if(Ctx)try{webAudio=new Ctx()}catch(_){}}
}
function unlockAudio(){ensureAudio();audioUnlocked=true;try{if(webAudio?.state==="suspended")webAudio.resume()}catch(_){} }
function musicTarget(){const s=gs();if(s?.sound===false||Number(s?.music??.33)<=0)return 0;const hotel=[BEDROOM,LOUNGE,TEAM_CG,ALERT].includes(active());if(!hotel)return 0;const duck=(dialogue||cgDialogue)?0.58:((cascadeOpen||evidenceOpen)?0.66:1);return clamp(Number(s.music??.33)*.39*duck,0,.42)}
function setHotelVolume(target){ensureAudio();if(!hotelAudioReady)return;hotelAudio.volume=clamp(target);if(target>0&&hotelAudio.paused){hotelAudio.play().catch(()=>{})}else if(target===0&&!hotelAudio.paused)hotelAudio.pause()}
function stopAmbience(){ambienceNodes.forEach(node=>{try{node.stop?.();node.disconnect?.()}catch(_){}});ambienceNodes=[]}
function startHotelAmbience(){
 ensureAudio();if(!webAudio||ambienceNodes.length||gs()?.sound===false||![BEDROOM,LOUNGE,TEAM_CG,ALERT].includes(active()))return;
 try{
  const seconds=3,buffer=webAudio.createBuffer(1,webAudio.sampleRate*seconds,webAudio.sampleRate),data=buffer.getChannelData(0);
  let last=0;for(let i=0;i<data.length;i++){const white=Math.random()*2-1;last=last*.985+white*.015;data[i]=last*.38}
  const src=webAudio.createBufferSource(),filter=webAudio.createBiquadFilter(),gain=webAudio.createGain();src.buffer=buffer;src.loop=true;filter.type="lowpass";filter.frequency.value=430;gain.gain.value=clamp(Number(gs()?.sfx??.6)*.052,0,.06);src.connect(filter).connect(gain).connect(webAudio.destination);src.start();ambienceNodes.push(src,filter,gain)
 }catch(_){stopAmbience()}
}
function tone(kind){
 ensureAudio();if(!webAudio||gs()?.sound===false)return;try{if(webAudio.state==="suspended")webAudio.resume();const now=webAudio.currentTime,master=webAudio.createGain();master.gain.setValueAtTime(0,now);master.gain.linearRampToValueAtTime(clamp(Number(gs()?.sfx??.6)*.12,0,.14),now+.018);master.gain.exponentialRampToValueAtTime(.0001,now+.72);master.connect(webAudio.destination);
  const notes=kind==="alert"?[659,880]:kind==="relay"?[248,330,496]:kind==="seal"?[392,587]:[220,293];notes.forEach((f,i)=>{const o=webAudio.createOscillator(),g=webAudio.createGain();o.type=i%2?"triangle":"sine";o.frequency.value=f;g.gain.value=1/(notes.length+1);o.connect(g).connect(master);o.start(now+i*.085);o.stop(now+.76+i*.04)});setTimeout(()=>{try{master.disconnect()}catch(_){}},1000)}catch(_){}
}
function labScore(){return $("#ch4P2VerificationScore")}
function syncAudio(){
 const screen=active(),hotel=[BEDROOM,LOUNGE,TEAM_CG,ALERT].includes(screen),lab=[LAB].includes(screen),enabled=gs()?.sound!==false;
 setHotelVolume(hotel?musicTarget():0);
 if(hotel&&enabled)startHotelAmbience();else stopAmbience();
 const score=labScore();if(score){const target=enabled&&lab?clamp(Number(gs()?.music??.33)*.30*(dialogue?0.57:1)*((cascadeOpen||evidenceOpen)?0.67:1),0,.33):0;score.loop=true;score.volume=target;if(target>0&&score.paused)score.play().catch(()=>{});if(target===0&&!score.paused)score.pause()}
}
function stopAudio(reset=false){clearTimers();setHotelVolume(0);if(reset&&hotelAudio)hotelAudio.currentTime=0;stopAmbience();stopElement(labScore(),reset)}

function progressValue(){const p=phaseState();if(!p?.started)return 0;if(p.complete)return 100;switch(String(p.stage||"title")){case"title":return 0;case"hotel-card":return 4;case"bedroom":return 10;case"lounge":return 19;case"team-cg":return 28;case"alert":return p.northConsentRecorded?43:35;case"lab-card":return 48;case"lab":return 56;case"cascade":return p.cascadeComplete?79:58+Object.keys(p.cascadeAssignments||{}).length*3;case"evidence":return 84+Math.min(10,p.evidenceViewed.length*2.5);case"closing":return 97;default:return 5}}
function setProgress(value){const n=Math.round(clamp(value,0,100));$$(".ch4-p6-progress-text").forEach(node=>node.textContent=n+"%");$$(".ch4-p6-progress-fill").forEach(node=>node.style.width=n+"%");if(gs())gs().progress=n}
function syncProgress(){setProgress(progressValue())}
function progressMarkup(){return '<div class="ch4-p5-progress ch4-p6-progress" aria-label="Phase progress"><span class="ch4-p6-progress-text">0%</span><div><i class="ch4-p5-progress-fill ch4-p6-progress-fill"></i></div></div>'}
function phaseHud(labelId){return `<div class="topbar ch4-p5-topbar"><span id="${labelId}"></span><div class="hud"><button class="icon ch4-p6-save" type="button" aria-label="Save game">💾</button><button class="icon ch4-p6-menu" type="button" aria-label="Game menu">☰<i class="journal-alert" aria-hidden="true"></i></button></div></div>`}
function scene(id,extra,image,labelId){return `<section id="${id}" class="screen ch4-p5-scene ch4-p6-screen ${extra}"><img class="scene" src="${image}" alt=""><div class="ch4-p5-shade ch4-p6-shade"></div>${phaseHud(labelId)}<div id="${id}Scene" class="ch4-p5-label"></div><div id="${id}Objective" class="ch4-p5-objective"></div><div id="${id}Dialogue" class="dialogue ch4-p5-dialogue hidden"></div><button id="${id}Action" class="primary ch4-p5-action ch4-p6-action" type="button" hidden></button>${progressMarkup()}</section>`}
function inject(){
 if($("#"+TITLE))return;const game=$("#game");if(!game)return;
 const v=A();game.insertAdjacentHTML("beforeend",`
 <section id="${TITLE}" class="screen ch4-p5-card ch4-p6-card"><div class="ch4-p5-title-card ch4-p6-continuity-card ch4-p5-card-enter"><div id="ch4P6TitleEye" class="eyebrow"></div><h2 id="ch4P6TitleText"></h2><div class="ch4-p5-rule"></div><p id="ch4P6TitleSub" class="ch4-p6-continuity-sub"></p></div></section>
 <section id="${HOTEL_CARD}" class="screen ch4-p5-card ch4-p6-card"><div class="ch4-p5-location-card ch4-p5-card-enter"><div id="ch4P6HotelTime" class="eyebrow"></div><div id="ch4P6HotelCity" class="ch4-p5-location-city"></div><h2 id="ch4P6HotelName"></h2><div class="ch4-p5-rule"></div><p id="ch4P6HotelBody"></p><button id="ch4P6HotelContinue" class="primary" type="button"></button></div></section>
 ${scene(BEDROOM,"ch4-p6-bedroom",v.hotelBedroom,"ch4P6BedroomLocation")}
 ${scene(LOUNGE,"ch4-p6-lounge",v.hotelLounge,"ch4P6LoungeLocation")}
 <section id="${TEAM_CG}" class="screen ch4-p5-marked ch4-p6-cg"><img class="scene" src="${v.hotelCG}" alt=""><div class="ch4-p6-cg-vignette"></div><div id="ch4P6CgDialogue" class="ch4-p6-cg-dialogue hidden"></div>${progressMarkup()}</section>
 <section id="${ALERT}" class="screen ch4-p5-scene ch4-p6-alert"><img class="scene" src="${v.hotelLounge}" alt=""><div class="ch4-p5-shade ch4-p6-alert-shade"></div>${phaseHud("ch4P6AlertLocation")}<div id="ch4P6AlertScene" class="ch4-p5-label"></div><div id="ch4P6AlertObjective" class="ch4-p5-objective"></div><div class="ch4-p6-alert-panel"><div class="eyebrow">ASTER FIELD COMPLETION BUFFER</div><div class="ch4-p6-alert-grid"><span>SUBJECT</span><b>N-32</b><span>STATUS</span><strong>REMOVED</strong><span>RESULT</span><strong>CONFIRMED</strong></div><button id="ch4P6OpenAlert" class="primary" type="button"></button></div><div id="${ALERT}Dialogue" class="dialogue ch4-p5-dialogue hidden"></div>${progressMarkup()}</section>
 <section id="${LAB_CARD}" class="screen ch4-p5-card ch4-p6-card"><div class="ch4-p5-location-card ch4-p5-card-enter"><div id="ch4P6LabTime" class="eyebrow"></div><div id="ch4P6LabCity" class="ch4-p5-location-city"></div><h2 id="ch4P6LabName"></h2><div class="ch4-p5-rule"></div><p id="ch4P6LabBody"></p><button id="ch4P6LabContinue" class="primary" type="button"></button></div></section>
 ${scene(LAB,"ch4-p6-lab","assets/images/chapter-04/phase-02/jakarta-verification-lab.png?v=0146","ch4P6LabLocation")}
 <section id="${COMPLETE}" class="screen ch4-p5-complete ch4-p6-complete"><div class="ch4-p5-complete-card"><div id="ch4P6CompleteEye" class="eyebrow"></div><h2 id="ch4P6CompleteTitle"></h2><div class="ch4-p5-rule"></div><p id="ch4P6CompleteBody"></p><div class="ch4-p6-complete-grid"><div><span id="ch4P6CompleteFalseLabel">FALSE RESULT</span><b id="ch4P6CompleteFalseValue">TRUSTED</b></div><div><span id="ch4P6CompleteArchiveLabel">18-07 ARCHIVE</span><b id="ch4P6CompleteArchiveValue">IN MOTION</b></div><div><span id="ch4P6CompleteRelayLabel">RELAY ROUTE</span><b>JKT-R7</b></div><div><span id="ch4P6CompleteOwnerLabel">DECISION OWNER</span><b id="ch4P6CompleteOwnerValue">UNRESOLVED</b></div></div><strong id="ch4P6CompleteNext"></strong><button id="ch4P6ReturnTitle" class="primary" type="button"></button></div>${progressMarkup()}</section>
 <div id="ch4P6Cascade" class="modal ch4-p5-modal ch4-p6-cascade" aria-hidden="true"><div class="modal-card"><header><div><div id="ch4P6CascadeEye" class="eyebrow"></div><h3 id="ch4P6CascadeTitle"></h3></div><span id="ch4P6CascadeCounter" class="ch4-p5-counter">0 / 6</span></header><div class="ch4-p6-cascade-body"><div id="ch4P6CascadeTrack" class="ch4-p6-cascade-track" aria-label="Cascade items"></div><div id="ch4P6CascadeFocus" class="ch4-p6-cascade-focus"></div><div id="ch4P6CascadeGroups" class="ch4-p6-cascade-groups"></div></div><div id="ch4P6CascadeStatus" class="ch4-p5-status"></div><footer><button id="ch4P6CascadeReset" class="ghost" type="button"></button><button id="ch4P6CascadeConfirm" class="primary" type="button"></button></footer></div></div>
 <div id="ch4P6Evidence" class="modal ch4-p5-modal ch4-p6-evidence" aria-hidden="true"><div class="modal-card"><header><div><div id="ch4P6EvidenceEye" class="eyebrow"></div><h3 id="ch4P6EvidenceTitle"></h3></div><span id="ch4P6EvidenceCounter" class="ch4-p5-counter"></span></header><div id="ch4P6EvidenceBody" class="ch4-p6-evidence-body"></div><footer><button id="ch4P6EvidenceNext" class="primary" type="button"></button></footer></div></div>
 `);
 bindElements();updateLanguage();syncProgress()
}

const HOTEL_PORTRAITS={
 Benedict:{sheet:"benedict",map:{neutral:0,serious:1,thinking:2,smirk:5,flustered:7}},
 North:{sheet:"north",map:{neutral:0,serious:1,focused:2,dry:3,warm:4,skeptical:6}},
 "Inspector Cheryl Goh":{sheet:"cheryl",map:{neutral:0,calm:0,serious:1,smirk:4,soft:7}},
 "Inspector Maya Pranoto":{sheet:"maya",map:{neutral:0,serious:1,playful:5,smirk:5,authoritative:7}}
};
const HOTEL_PORTRAIT_CLASS={Benedict:"benedict",North:"north","Inspector Cheryl Goh":"cheryl","Inspector Maya Pranoto":"maya"};
function hotelPortraitMarkup(name,emotion){
 const spec=HOTEL_PORTRAITS[name];if(!spec)return"";
 const index=spec.map[emotion]??spec.map.neutral??0;
 const src=PA().frames?.[`${spec.sheet}_${index}`]||"";
 const cls=HOTEL_PORTRAIT_CLASS[name]||"";
 return src?`<img class="ch4-p5-card-portrait ${cls}" src="${src}" alt="">`:""
}
function existingPortrait(name,emotion){try{return typeof portrait==="function"?portrait(name,emotion||"neutral"):""}catch(_){return""}}
function speakerLabel(name){if(name==="Farid Rahman")return thai()?"Farid Rahman (ต่อสายจากสิงคโปร์)":"Farid Rahman (Remote · Singapore)";if(!thai())return name;return {"Inspector Cheryl Goh":"สารวัตร Cheryl Goh","Inspector Maya Pranoto":"สารวัตร Maya Pranoto"}[name]||name}
function recordHistory(line){try{const s=gs();s.history=s.history||[];s.history.push({speaker:speakerLabel(line[0]),text:thai()?line[3]:line[2],chapter:4,phase:6})}catch(_){} }
function dialogueBox(){return $("#"+active()+"Dialogue")}
function renderDialogue(){
 const box=dialogueBox();if(!box||!dialogue)return;
 const line=dialogue.lines[dialogue.i],name=line[0],emotion=line[1],hotel=[BEDROOM,LOUNGE,ALERT].includes(active()),right=name!=="Benedict";
 let portraitHtml="";
 if(hotel)portraitHtml=hotelPortraitMarkup(name,emotion);
 else{const src=existingPortrait(name,emotion);portraitHtml=src?`<img class="portrait" src="${src}" alt="">`:""}
 box.className="dialogue ch4-p5-dialogue"+(right?" right":"");
 const label=name==="Farid Rahman"?`Farid Rahman <span class="ch4-p5-remote">${thai()?"(ต่อสายจากสิงคโปร์)":"(Remote · Singapore)"}</span>`:speakerLabel(name);
 box.innerHTML=`<div class="portrait-wrap">${portraitHtml}</div><div class="dialogue-copy"><div class="speaker">${label}</div><div class="line">${thai()?line[3]:line[2]}</div></div><div class="next">${tr("TAP TO CONTINUE","แตะเพื่อดำเนินต่อ")}</div>`;
 syncAudio()
}
function talk(lines,done){const box=dialogueBox();if(!box){done?.();return}const action=$("#"+active()+"Action");if(action)action.hidden=true;dialogue={lines,i:0,done};box.classList.remove("hidden");renderDialogue();box.onclick=()=>{if(!dialogue)return;recordHistory(dialogue.lines[dialogue.i]);dialogue.i++;if(dialogue.i>=dialogue.lines.length){const fn=dialogue.done;dialogue=null;box.classList.add("hidden");box.onclick=null;syncAudio();fn?.();save()}else renderDialogue()}}
function talkCg(lines,done){const box=$("#ch4P6CgDialogue");cgDialogue={lines,i:0,done};box.classList.remove("hidden");const render=()=>{const line=cgDialogue.lines[cgDialogue.i];box.innerHTML=`<div class="speaker">${speakerLabel(line[0])}</div><div class="line">${thai()?line[3]:line[2]}</div><div class="next">${tr("TAP TO CONTINUE","แตะเพื่อดำเนินต่อ")}</div>`;syncAudio()};render();box.onclick=()=>{if(!cgDialogue)return;recordHistory(cgDialogue.lines[cgDialogue.i]);cgDialogue.i++;if(cgDialogue.i>=cgDialogue.lines.length){const fn=cgDialogue.done;cgDialogue=null;box.classList.add("hidden");box.onclick=null;syncAudio();fn?.();save()}else render()}}

const D={
 bedroom:[
  ["Inspector Maya Pranoto","authoritative","Ika is in local custody. This floor is sealed, and nobody leaves alone.","Ika อยู่ในการควบคุมตัวของตำรวจอินโดนีเซียแล้ว ชั้นนี้ปิดพื้นที่ทั้งหมด ห้ามแยกกันไปไหนคนเดียว"],
  ["Inspector Cheryl Goh","serious","Her devices are bagged. The original chain stays with Maya's team; Singapore receives only the authorised mirror.","อุปกรณ์ของเธอถูกเก็บเป็นหลักฐานหมดแล้ว ของจริงอยู่กับทีม Maya สิงคโปร์รับแค่สำเนาที่ได้รับอนุญาต"],
  ["North","focused","The buffer on the service token is still waiting for a completion receipt.","บัฟเฟอร์ใน Service Token ยังรอใบยืนยันว่างานเสร็จอยู่"],
  ["Benedict","thinking","So the people behind her still don't know the attempt failed.","งั้นคนที่อยู่เบื้องหลังก็ยังไม่รู้ว่าแผนล้มเหลว"],
  ["Inspector Maya Pranoto","serious","For the moment. We decide what happens to that moment before it decides for us.","ตอนนี้ยังไม่รู้ เราต้องใช้ช่องว่างนี้ให้เป็นประโยชน์ ก่อนมันจะย้อนเล่นงานเรา"]
 ],
 lounge:[
  ["Benedict","neutral","Four people, one secure floor. We could save time and use one room.","สี่คน ชั้นเดียวกัน ปิดพื้นที่หมดแล้ว... ใช้ห้องเดียวกันน่าจะง่ายกว่านะ"],
  ["North","dry","Efficient. You can monitor the door from the floor.","ประหยัดดี คุณนอนเฝ้าประตูบนพื้นไปเลย"],
  ["Inspector Maya Pranoto","playful","The sofa is available. Pending a risk assessment.","โซฟายังว่างนะ ถ้าผ่านการประเมินความเสี่ยง"],
  ["Inspector Cheryl Goh","smirk","His confidence was listed as an operational asset. We should stress-test it.","ในรายงานบอกว่าความมั่นใจของเขาเป็นข้อได้เปรียบ งั้นลองกดดูหน่อยว่ารับแรงได้แค่ไหน"],
  ["North","skeptical","That sounded rehearsed.","ฟังเหมือนเตรียมมา"],
  ["Inspector Maya Pranoto","smirk","Very rehearsed.","เตรียมมาดีด้วย"],
  ["Inspector Cheryl Goh","calm","I document patterns. This one was overdue.","ฉันจดพฤติกรรมไว้ตลอด อันนี้ถึงคิวสักที"],
  ["Benedict","smirk","I'm glad morale survived the attack.","อย่างน้อยขวัญกำลังใจของทีมก็ยังไม่ตาย"]
 ],
 cg:[
  ["Benedict","flustered","There is an entire sofa around us.","โซฟาก็กว้างตั้งเยอะนะ"],
  ["North","dry","This angle shows the tablet better.","มุมนี้เห็นแท็บเล็ตชัดกว่า"],
  ["Inspector Maya Pranoto","playful","Much better.","ชัดขึ้นเยอะ"],
  ["Inspector Cheryl Goh","smirk","Your pulse suggests the display is not the problem.","ชีพจรคุณบอกว่าปัญหาไม่น่าจะใช่หน้าจอนะ"],
  ["Benedict","flustered","Are we reviewing evidence or conducting an experiment?","นี่เรากำลังดูหลักฐาน หรือทดลองอะไรกับผมอยู่กันแน่"],
  ["North","warm","Both can be true.","ทำสองอย่างพร้อมกันก็ได้"]
 ],
 consent:[
  ["North","serious","It already says I'm gone.","ในระบบ ฉันหายไปแล้ว"],
  ["Inspector Cheryl Goh","serious","We did not create that record. We can observe what it triggers, but only with your consent and a fixed stop condition.","บันทึกนั้นไม่ใช่ฝีมือเรา เราดูต่อได้ว่ามันจะกระตุ้นอะไร แต่ต้องได้ความยินยอมจากคุณ และตกลงกันก่อนว่าจะหยุดเมื่อไหร่"],
  ["Inspector Maya Pranoto","authoritative","I own the local operation. If your safety changes or the record reaches a public system, I terminate the hold.","ปฏิบัติการในอินโดนีเซียฉันคุมเอง ถ้าคุณเริ่มไม่ปลอดภัย หรือข้อมูลนี้หลุดเข้าไปในระบบสาธารณะ ฉันหยุดทันที"],
  ["North","focused","No public record. No fake death report. We watch the existing buffer, preserve every reaction, and stop on Maya's order.","ไม่สร้างบันทึกสาธารณะ ไม่ทำรายงานตายปลอม เราแค่เฝ้าดู Buffer เดิม เก็บทุกปฏิกิริยา แล้วหยุดทันทีที่ Maya สั่ง"],
  ["Benedict","serious","Your call, North.","คุณตัดสินใจเอง North"],
  ["North","serious","Hold it. Read-only. I stay active, and I see every step.","ปล่อยไว้แบบนั้น อ่านอย่างเดียว ฉันยังทำงานตามปกติ และต้องเห็นทุกขั้นตอน"],
  ["Inspector Cheryl Goh","soft","Recorded.","บันทึกแล้ว"]
 ],
 lab:[
  ["Farid Rahman","tablet_read","The false completion receipt was accepted at 05:43. The mirror hash still matches Singapore.","ระบบรับใบยืนยันปลอมตอน 05:43 แฮชของสำเนายังตรงกับฝั่งสิงคโปร์"],
  ["North","analyzing","One minute later, my attribution-watch subscription closed itself.","อีกหนึ่งนาที ระบบติดตามต้นทางของฉันก็ปิดตัวเอง"],
  ["Inspector Cheryl Goh","serious","That proves reliance on the record. It does not prove who authored it.","แปลว่าระบบเชื่อบันทึกนั้น แต่ยังบอกไม่ได้ว่าใครเป็นคนสร้าง"],
  ["Inspector Maya Pranoto","analytical","At 05:46, the 18-07 archive entered a continuity-transfer queue. At 05:51, it opened a one-time handshake to JKT-R7.","05:46 คลัง 18-07 เข้าคิวโอนย้ายเพื่อให้ระบบทำงานต่อ แล้ว 05:51 มันเปิดการเชื่อมต่อครั้งเดียวไปที่ JKT-R7"],
  ["Benedict","thinking","The lie stayed digital. The reaction gave it a physical address.","เรื่องโกหกยังอยู่ในระบบ แต่ปฏิกิริยาของมันกลับชี้ไปถึงสถานที่จริง"],
  ["North","focused","Let's separate what the record claims from what the system actually did.","แยกให้ชัด บันทึกอ้างว่าอะไร กับระบบทำอะไรจริง"]
 ],
 closing:[
  ["Farid Rahman","serious","Maintenance slot confirmed: 07:30 to 07:45. Aster Recovery is listed as the service contractor.","ยืนยันช่วงบำรุงรักษาแล้ว 07:30 ถึง 07:45 ผู้รับเหมาคือ Aster Recovery"],
  ["Inspector Maya Pranoto","authoritative","I can secure the perimeter and obtain the local warrant. Nobody enters before my team.","ฉันปิดพื้นที่และขอหมายในอินโดนีเซียได้ ไม่มีใครเข้าไปก่อนทีมฉัน"],
  ["Inspector Cheryl Goh","serious","Singapore will preserve the remote mirror. No live credential crosses the border.","สิงคโปร์จะเก็บสำเนาไว้ฝั่งนั้น และจะไม่มีการส่ง Credential ที่ยังใช้งานได้ข้ามพรมแดน"],
  ["North","focused","The route opened because the system believed I was gone.","เส้นทางนี้เปิด เพราะระบบเชื่อว่าฉันหายไปแล้ว"],
  ["Benedict","smirk","Then let's be polite and use the door it opened.","งั้นก็อย่าเสียมารยาท ใช้ประตูที่มันเปิดให้เรา"],
  ["Inspector Cheryl Goh","smirk","Try not to look too pleased with yourself.","อย่าเพิ่งทำหน้าภูมิใจขนาดนั้น"],
  ["Inspector Maya Pranoto","playful","Too late.","สายไปแล้ว"],
  ["North","dry","Documented.","จดไว้แล้ว"]
 ]
};

function evidenceData(id){const map={
 ch4_p6_controlled_observation_consent:{title:tr("Controlled Observation Consent","ข้อตกลงเฝ้าดูแบบจำกัดขอบเขต"),body:tr("North authorises a read-only hold on an adversary-created completion record under Maya's local stop authority.","North ยินยอมให้คงบันทึก “งานเสร็จ” ที่อีกฝ่ายสร้างไว้ตามเดิม เปิดดูได้อย่างเดียว และ Maya สั่งหยุดได้ทุกเมื่อ"),proof:tr("Supports: lawful, bounded observation with North still active.","ยืนยันได้ว่า: การเฝ้าดูได้รับความยินยอม มีขอบเขตชัด และ North ยังปฏิบัติงานอยู่"),limit:tr("Does not prove: who created the record or ordered the removal.","ยังยืนยันไม่ได้ว่า: ใครสร้างบันทึก หรือใครสั่งให้ N-32 ถูกนำออก")},
 ch4_p6_false_success_receipt_chain:{title:tr("False Success Receipt Chain","ลำดับใบยืนยันผลลัพธ์ปลอม"),body:tr("The N-32 removal result is accepted, followed by automatic closure of the attribution-watch subscription.","ระบบรับผลว่า N-32 ถูกนำออก จากนั้นระบบติดตามต้นทางก็ปิดเอง"),proof:tr("Supports: downstream systems relied on the false result.","ยืนยันได้ว่า: ระบบปลายทางเชื่อและนำผลลัพธ์ปลอมไปใช้"),limit:tr("Does not prove: the identity of the author or Decision Owner.","ยังยืนยันไม่ได้ว่า: ใครสร้างบันทึก หรือใครคือคนสั่งการ")},
 ch4_p6_relay_activation_trace:{title:tr("Relay Activation Trace","ร่องรอยการเปิด Relay"),body:tr("The 18-07 archive enters continuity transfer and opens a one-time handshake to JKT-R7.","คลัง 18-07 เข้าคิวโอนย้ายเพื่อให้ระบบทำงานต่อ ก่อนเปิดการเชื่อมต่อครั้งเดียวไปยัง JKT-R7"),proof:tr("Supports: a system reaction connected the archive to a physical relay route.","ยืนยันได้ว่า: ปฏิกิริยาของระบบเชื่อมคลังข้อมูลไปถึงเส้นทาง Relay ที่มีสถานที่จริง"),limit:tr("Does not prove: that the credential holder is the mastermind.","ยังยืนยันไม่ได้ว่า: ผู้ถือ Credential คือคนบงการ")},
 ch4_p6_jktr7_maintenance_manifest:{title:tr("JKT-R7 Maintenance Manifest","บันทึกช่วงบำรุงรักษา JKT-R7"),body:tr("Aster Recovery reserves a 07:30–07:45 physical maintenance window at the relay facility.","Aster Recovery จองช่วงเข้าบำรุงรักษาที่สถานี Relay เวลา 07:30–07:45"),proof:tr("Supports: a time-bounded physical lead for Phase VII.","ยืนยันได้ว่า: มีเบาะแสในโลกจริงที่ระบุสถานที่และเวลาได้ชัดเจน"),limit:tr("Does not prove: Ika committed the earlier murders or selected the victims.","ยังยืนยันไม่ได้ว่า: Ika ก่อคดีฆาตกรรมก่อนหน้า หรือเป็นคนเลือกเหยื่อ")}
 };return map[id]}
function registerContent(){if(registryInstalled)return true;const api=window.LastWitnessContentRegistry;if(!api?.evidence)return false;api.evidence.ch4_p6_controlled_observation_consent={phase:"Chapter IV · The False Success",title:{en:"Controlled Observation Consent",th:"ข้อตกลงเฝ้าดูแบบจำกัดขอบเขต"}};api.evidence.ch4_p6_false_success_receipt_chain={phase:"Chapter IV · The False Success",title:{en:"False Success Receipt Chain",th:"ลำดับใบยืนยันผลลัพธ์ปลอม"}};api.evidence.ch4_p6_relay_activation_trace={phase:"Chapter IV · The False Success",title:{en:"Relay Activation Trace",th:"ร่องรอยการเปิด Relay"}};api.evidence.ch4_p6_jktr7_maintenance_manifest={phase:"Chapter IV · The False Success",title:{en:"JKT-R7 Maintenance Manifest",th:"บันทึกช่วงบำรุงรักษา JKT-R7"}};registryInstalled=true;if(gs()?.flags?.developer_evidence_unlock_all===true)EVIDENCE_IDS.forEach(id=>api.unlockEvidence?.(id));return true}
function collectEvidence(id){const p=ensure();if(!p||!EVIDENCE_IDS.includes(id)||p.evidenceCollected.includes(id))return false;p.evidenceCollected.push(id);registerContent();try{window.LastWitnessContentRegistry?.unlockEvidence?.(id)}catch(_){}try{gs()?.found?.add?.(id)}catch(_){}save();return true}
function appendCaseEvidence(){const list=$("#caseList"),p=phaseState();if(!list)return;$('[data-ch4-p6-case-section]',list)?.remove();$$('[data-ch4-p6-case-entry]',list).forEach(n=>n.remove());if(!p?.evidenceCollected?.length)return;const head=document.createElement("div");head.className="case-section-title";head.dataset.ch4P6CaseSection="1";head.textContent=tr("CHAPTER IV · THE FALSE SUCCESS","บทที่ IV · ความสำเร็จจอมปลอม");list.appendChild(head);p.evidenceCollected.forEach(id=>{const d=evidenceData(id);if(!d)return;const row=document.createElement("div");row.className="case-row";row.dataset.ch4P6CaseEntry=id;row.innerHTML=`<b>${d.title}</b><div>${d.body}<br><strong>${d.proof}</strong><br><small>${d.limit}</small></div>`;list.appendChild(row)})}

function cascadeCardData(){return{
 receipt:{title:tr("N-32 removal receipt accepted","ระบบรับผลว่า N-32 ถูกนำออก"),detail:"05:43"},
 watch_closed:{title:tr("Attribution-watch subscription closed","ระบบปิดการติดตามต้นทาง"),detail:"05:44"},
 archive_queued:{title:tr("18-07 archive queued for continuity transfer","คลัง 18-07 เข้าคิวส่งต่อ"),detail:"05:46"},
 handshake:{title:tr("One-time handshake opened to JKT-R7","เปิดการเชื่อมต่อครั้งเดียวไปยัง JKT-R7"),detail:"05:51"},
 maintenance:{title:tr("Aster maintenance slot reserved","Aster จองช่วงบำรุงรักษา"),detail:"07:30–07:45"},
 owner_claim:{title:tr("Credential holder equals Decision Owner","ผู้ถือ Credential คือคนสั่งการ"),detail:tr("ASSUMPTION","ข้อสันนิษฐาน")}
}}
function groupData(){return{
 claim:{title:tr("RECORD CLAIM","คำอ้างในบันทึก"),desc:tr("What the report says happened","สิ่งที่บันทึกระบุว่าเกิดขึ้น")},
 reaction:{title:tr("SYSTEM REACTION","การตอบสนองของระบบ"),desc:tr("What the system did because it trusted the report","สิ่งที่ระบบทำหลังเชื่อบันทึกนั้น")},
 physical:{title:tr("PHYSICAL LEAD","เบาะแสในโลกจริง"),desc:tr("A place, time or movement in the real world","สถานที่ เวลา หรือการเคลื่อนไหวที่เกิดขึ้นจริง")},
 unproven:{title:tr("NOT PROVEN","ยังสรุปไม่ได้"),desc:tr("A conclusion the evidence cannot support","ข้อสรุปที่หลักฐานตอนนี้ยังไม่พอรองรับ")}
}}
function renderCascade(){
 const p=ensure(),cards=cascadeCardData(),groups=groupData(),selected=Object.keys(p.cascadeAssignments).length;
 $("#ch4P6CascadeCounter").textContent=`${selected} / ${CASCADE_IDS.length}`;
 if(!cascadeFocusId||!CASCADE_IDS.includes(cascadeFocusId)){
  cascadeFocusId=CASCADE_IDS.find(id=>!p.cascadeAssignments[id])||CASCADE_IDS[0]
 }
 $("#ch4P6CascadeTrack").innerHTML=CASCADE_IDS.map((id,index)=>`<button type="button" class="ch4-p6-cascade-node${id===cascadeFocusId?" active":""}${p.cascadeAssignments[id]?" done":""}" data-chain-nav="${id}" aria-label="${index+1}"><span>${index+1}</span></button>`).join("");
 $$("[data-chain-nav]").forEach(button=>button.onclick=()=>{cascadeFocusId=button.dataset.chainNav;renderCascade()});
 const current=cards[cascadeFocusId],assigned=p.cascadeAssignments[cascadeFocusId]||"";
 $("#ch4P6CascadeFocus").innerHTML=`<div class="ch4-p6-focus-time">${current.detail}</div><div class="ch4-p6-focus-copy"><span>${tr("CLASSIFY THIS EVENT","เหตุการณ์นี้อยู่หมวดไหน")}</span><b>${current.title}</b>${assigned?`<small>${groups[assigned].title}</small>`:""}</div>`;
 $("#ch4P6CascadeGroups").innerHTML=CASCADE_GROUPS.map(id=>`<button class="ch4-p6-chain-group${assigned===id?" selected":""}" type="button" data-chain-group="${id}"><b>${groups[id].title}</b><span>${groups[id].desc}</span></button>`).join("");
 $$("[data-chain-group]").forEach(button=>button.onclick=()=>{
  p.cascadeAssignments[cascadeFocusId]=button.dataset.chainGroup;
  const currentIndex=CASCADE_IDS.indexOf(cascadeFocusId);
  const next=CASCADE_IDS.slice(currentIndex+1).find(id=>!p.cascadeAssignments[id])||CASCADE_IDS.find(id=>!p.cascadeAssignments[id]);
  if(next)cascadeFocusId=next;
  save();renderCascade();
  $("#ch4P6CascadeStatus").textContent=Object.keys(p.cascadeAssignments).length===CASCADE_IDS.length?tr("All six events are classified. Confirm the reconstruction.","ครบทั้งหกเหตุการณ์แล้ว ยืนยันลำดับได้เลย"):tr("Classification recorded. Continue through the chain.","บันทึกแล้ว ไปเหตุการณ์ถัดไป")
 })
}
function openCascade(){cascadeOpen=true;$("#ch4P6Cascade")?.classList.add("open");$("#ch4P6Cascade")?.setAttribute("aria-hidden","false");renderCascade();syncAudio()}
function closeCascade(){cascadeOpen=false;$("#ch4P6Cascade")?.classList.remove("open");$("#ch4P6Cascade")?.setAttribute("aria-hidden","true");syncAudio()}
function resetCascade(){const p=ensure();p.cascadeAssignments={};p.cascadeAttempts=0;cascadeFocusId=CASCADE_IDS[0];save();renderCascade();$("#ch4P6CascadeStatus").textContent=tr("Assignments cleared.","ล้างคำตอบแล้ว")}
function confirmCascade(){const p=ensure();if(Object.keys(p.cascadeAssignments).length<CASCADE_IDS.length){$("#ch4P6CascadeStatus").textContent=tr("Classify all six items before confirming.","จัดให้ครบทั้งหกเหตุการณ์ก่อน");return}const wrong=CASCADE_IDS.filter(id=>p.cascadeAssignments[id]!==CASCADE_CORRECT[id]);p.cascadeAttempts++;if(wrong.length){wrong.forEach(id=>delete p.cascadeAssignments[id]);save();renderCascade();$("#ch4P6CascadeStatus").textContent=tr(`${wrong.length} ${wrong.length===1?"item needs":"items need"} another look. Correct assignments remain in place.`,`มี ${wrong.length} รายการยังไม่ถูก ลองดูใหม่ ส่วนที่ถูกเก็บไว้แล้ว`);return}p.cascadeComplete=true;p.stage="evidence";gs().flags.ch4_p6_false_success_trusted=true;gs().flags.ch4_p6_downstream_reliance_observed=true;gs().flags.ch4_p6_18_07_archive_moving=true;setCheckpoint("ch4_phase6_evidence");closeCascade();tone("relay");transitionTimer=setTimeout(()=>openEvidence(0),300)}
function openEvidence(index=0){const p=ensure();evidenceOpen=true;activeEvidenceIndex=clamp(index,0,EVIDENCE_IDS.length-1);const id=EVIDENCE_IDS[activeEvidenceIndex],d=evidenceData(id);collectEvidence(id);if(!p.evidenceViewed.includes(id))p.evidenceViewed.push(id);$("#ch4P6EvidenceCounter").textContent=`${activeEvidenceIndex+1} / ${EVIDENCE_IDS.length}`;$("#ch4P6EvidenceTitle").textContent=d.title;$("#ch4P6EvidenceBody").innerHTML=`<p>${d.body}</p><strong>${d.proof}</strong><small>${d.limit}</small>`;$("#ch4P6EvidenceNext").textContent=activeEvidenceIndex<EVIDENCE_IDS.length-1?tr("NEXT EVIDENCE","หลักฐานถัดไป"):tr("PRESERVE CHAIN","เก็บหลักฐานครบชุด");$("#ch4P6Evidence")?.classList.add("open");$("#ch4P6Evidence")?.setAttribute("aria-hidden","false");tone("seal");save();syncAudio()}
function nextEvidence(){if(activeEvidenceIndex<EVIDENCE_IDS.length-1){openEvidence(activeEvidenceIndex+1);return}evidenceOpen=false;$("#ch4P6Evidence")?.classList.remove("open");$("#ch4P6Evidence")?.setAttribute("aria-hidden","true");const p=ensure();p.relayConfirmed=true;p.stage="closing";const s=gs();Object.assign(s.flags,{ch4_p6_relay_route_supported:true,ch4_p6_maintenance_window_preserved:true,ch4_p6_false_success_hold_active:true,ch4_p6_north_active:true,ch4_p6_decision_owner_unresolved:true});setCheckpoint("ch4_phase6_route");syncAudio();setTimeout(()=>talk(D.closing,finishPhase),280)}

function updateLanguage(){if(!$("#"+TITLE))return;const map={
 ch4P6TitleEye:tr("CHAPTER IV · PHASE VI","บทที่ IV · เฟส VI"),ch4P6TitleText:tr("SAME DAY · 22:18 WIB","วันเดียวกัน · 22:18 น."),ch4P6TitleSub:tr("THE FALSE SUCCESS","ความสำเร็จจอมปลอม"),
 ch4P6HotelTime:tr("DAY 5 · 22:18 WIB","วันที่ 5 · 22:18 น."),ch4P6HotelCity:tr("INDONESIA · COASTAL DISTRICT","อินโดนีเซีย · เขตชายฝั่ง"),ch4P6HotelName:"ARUNA COASTAL HOTEL",ch4P6HotelBody:tr("VIP SUITE · SECURED FLOOR","ห้องวีไอพี · ชั้นรักษาความปลอดภัย"),ch4P6HotelContinue:tr("ENTER THE SUITE","เข้าห้องพัก"),
 ch4P6BedroomLocation:tr("ARUNA COASTAL HOTEL · VIP SUITE","โรงแรมอรุณา โคสตัล · ห้องวีไอพี"),[BEDROOM+"Scene"]:tr("NIGHT SECURITY BRIEF","สรุปความปลอดภัยก่อนพัก"),[BEDROOM+"Objective"]:tr("Confirm custody, evidence control and the team's immediate safety boundary.","เช็กการควบคุมตัว หลักฐาน และความปลอดภัยของทีมให้เรียบร้อย"),[BEDROOM+"Action"]:tr("MOVE TO THE LOUNGE","ไปยังห้องรับรอง"),
 ch4P6LoungeLocation:tr("ARUNA COASTAL HOTEL · PRIVATE LOUNGE","โรงแรมอรุณา โคสตัล · ห้องรับรองส่วนตัว"),[LOUNGE+"Scene"]:tr("SECURE FLOOR · 22:31 WIB","ชั้นรักษาความปลอดภัย · 22:31 น."),[LOUNGE+"Objective"]:tr("Set the overnight watch without losing the team's sense of each other.","จัดเวรคืนนี้ โดยอย่าให้แรงกดดันทำทีมเสียจังหวะ"),[LOUNGE+"Action"]:tr("REVIEW THE TABLET","ตรวจข้อมูลในแท็บเล็ต"),
 ch4P6AlertLocation:tr("ARUNA COASTAL HOTEL · PRIVATE LOUNGE","โรงแรมอรุณา โคสตัล · ห้องรับรองส่วนตัว"),ch4P6AlertScene:tr("UNEXPECTED SYSTEM RECEIPT","ใบยืนยันจากระบบที่ไม่ควรเกิดขึ้น"),ch4P6AlertObjective:tr("Determine whether the team can lawfully observe the existing false result.","หาทางเฝ้าดูผลลัพธ์ปลอมนี้ต่อโดยไม่ข้ามเส้นกฎหมาย"),ch4P6OpenAlert:tr("OPEN SECURE RECEIPT","เปิดใบยืนยันที่เข้ารหัส"),
 ch4P6LabTime:tr("DAY 6 · 05:40 WIB","วันที่ 6 · 05:40 น."),ch4P6LabCity:tr("JAKARTA · CYBERCRIME DIRECTORATE","จาการ์ตา · กองบังคับการตำรวจไซเบอร์"),ch4P6LabName:tr("VERIFICATION LAB","ห้องปฏิบัติการตรวจสอบ"),ch4P6LabBody:tr("READ-ONLY MIRROR · CONTROLLED OBSERVATION","สำเนาแบบอ่านอย่างเดียว · เฝ้าดูภายใต้การควบคุม"),ch4P6LabContinue:tr("ENTER THE LAB","เข้าห้องปฏิบัติการ"),
 ch4P6LabLocation:tr("JAKARTA CYBERCRIME · VERIFICATION LAB","ตำรวจไซเบอร์จาการ์ตา · ห้องตรวจสอบ"),[LAB+"Scene"]:tr("FALSE SUCCESS REACTION CHAIN","ลำดับปฏิกิริยาจากผลลัพธ์ปลอม"),[LAB+"Objective"]:tr("Separate the record's claim, the system's reaction, the physical lead and what remains unproven.","แยกให้ชัดว่าอะไรคือคำอ้างในบันทึก อะไรคือปฏิกิริยาของระบบ อะไรคือเบาะแสในโลกจริง และอะไรยังสรุปไม่ได้"),[LAB+"Action"]:tr("RECONSTRUCT REACTION CHAIN","ไล่ลำดับปฏิกิริยา"),
 ch4P6CascadeEye:tr("READ-ONLY ANALYSIS · REACTION CHAIN","วิเคราะห์แบบอ่านอย่างเดียว · ไล่ลำดับปฏิกิริยา"),ch4P6CascadeTitle:tr("FALSE SUCCESS CASCADE","ลูกโซ่จากผลลัพธ์ปลอม"),ch4P6CascadeReset:tr("RESET","เริ่มใหม่"),ch4P6CascadeConfirm:tr("CONFIRM ANALYSIS","ยืนยันลำดับ"),
 ch4P6EvidenceEye:tr("CASE EVIDENCE · PRESERVED COPY","หลักฐานคดี · สำเนาที่เก็บรักษา"),
 ch4P6CompleteFalseLabel:tr("FALSE RESULT","ผลลัพธ์ปลอม"),ch4P6CompleteFalseValue:tr("TRUSTED","ระบบเชื่อแล้ว"),ch4P6CompleteArchiveLabel:tr("18-07 ARCHIVE","คลัง 18-07"),ch4P6CompleteArchiveValue:tr("IN MOTION","กำลังถูกส่งต่อ"),ch4P6CompleteRelayLabel:tr("RELAY ROUTE","เส้นทาง Relay"),ch4P6CompleteOwnerLabel:tr("DECISION OWNER","ผู้สั่งการ"),ch4P6CompleteOwnerValue:tr("UNRESOLVED","ยังไม่ระบุตัว"),
 ch4P6CompleteEye:tr("CHAPTER IV · PHASE VI COMPLETE","บทที่ IV · จบเฟส VI"),ch4P6CompleteTitle:tr("THE DOOR THEY OPENED","ประตูที่พวกนั้นเปิดเอง"),ch4P6CompleteBody:tr("They believed North was gone. So they opened the door she had been looking for.","พวกนั้นเชื่อว่า North หายไปแล้ว จึงเปิดประตูที่เธอตามหามาตลอด"),ch4P6CompleteNext:tr("NEXT · RELAY FACILITY CLIMAX","ต่อไป · สถานี Relay JKT-R7"),ch4P6ReturnTitle:tr("RETURN TO TITLE","กลับหน้าหลัก")
 };Object.entries(map).forEach(([id,value])=>{const node=$("#"+id);if(node)node.textContent=value});if(dialogue)renderDialogue();if(cgDialogue){const box=$("#ch4P6CgDialogue");const line=cgDialogue.lines[cgDialogue.i];if(box&&line)box.innerHTML=`<div class="speaker">${speakerLabel(line[0])}</div><div class="line">${thai()?line[3]:line[2]}</div><div class="next">${tr("TAP TO CONTINUE","แตะเพื่อดำเนินต่อ")}</div>`}if(cascadeOpen)renderCascade();if(evidenceOpen)openEvidence(activeEvidenceIndex);syncProgress();setBuild()}

async function showTitle(){const p=ensure();p.started=true;p.stage="title";setCheckpoint("ch4_phase6_title");stopForeignAudio();safeShow(TITLE);updateLanguage();await delay(p.titleSeen?120:1350);p.titleSeen=true;p.hotelCardSeen=true;save();enterBedroom()}
function enterBedroom(){unlockAudio();const p=ensure();p.hotelCardSeen=true;p.stage="bedroom";setCheckpoint("ch4_phase6_bedroom");safeShow(BEDROOM);updateLanguage();if(p.bedroomIntroComplete){showBedroomAction();return}setTimeout(()=>talk(D.bedroom,()=>{p.bedroomIntroComplete=true;save();showBedroomAction()}),320)}
function showBedroomAction(){const b=$("#"+BEDROOM+"Action");if(b){b.hidden=false;b.onclick=enterLounge}}
function enterLounge(){const p=ensure();p.stage="lounge";setCheckpoint("ch4_phase6_lounge");safeShow(LOUNGE);updateLanguage();const b=$("#"+BEDROOM+"Action");if(b)b.hidden=true;if(p.loungeBriefComplete){showLoungeAction();return}setTimeout(()=>talk(D.lounge,()=>{p.loungeBriefComplete=true;save();showLoungeAction()}),300)}
function showLoungeAction(){const b=$("#"+LOUNGE+"Action");if(b){b.hidden=false;b.onclick=showTeamCg}}
function showTeamCg(){const p=ensure();p.stage="team-cg";setCheckpoint("ch4_phase6_team_cg");safeShow(TEAM_CG);syncProgress();const b=$("#"+LOUNGE+"Action");if(b)b.hidden=true;if(p.teamCgSeen){enterAlert();return}setTimeout(()=>talkCg(D.cg,()=>{p.teamCgSeen=true;save();tone("alert");transitionTimer=setTimeout(enterAlert,450)}),500)}
function enterAlert(){const p=ensure();p.stage="alert";setCheckpoint("ch4_phase6_consent");safeShow(ALERT);updateLanguage();const button=$("#ch4P6OpenAlert");button.hidden=p.alertOpened;button.onclick=openAlert}
function completeConsent(){const p=ensure();p.northConsentRecorded=true;p.consentDialogueComplete=true;const s=gs();Object.assign(s.flags,{ch4_p6_north_consent_recorded:true,ch4_p6_north_active:true,ch4_p6_decision_owner_unresolved:true});collectEvidence("ch4_p6_controlled_observation_consent");save();transitionTimer=setTimeout(showLabCard,600)}
function openAlert(){const p=ensure();p.alertOpened=true;$("#ch4P6OpenAlert").hidden=true;tone("alert");save();setTimeout(()=>talk(D.consent,completeConsent),260)}
function showLabCard(){const p=ensure();p.stage="lab-card";p.labCardSeen=true;setCheckpoint("ch4_phase6_lab_card");stopAudio(false);safeShow(LAB_CARD);updateLanguage()}
function enterLab(){const p=ensure();p.stage="lab";setCheckpoint("ch4_phase6_lab");safeShow(LAB);updateLanguage();if(p.labBriefComplete){showLabAction();return}setTimeout(()=>talk(D.lab,()=>{p.labBriefComplete=true;p.stage="cascade";save();showLabAction()}),340)}
function showLabAction(){const b=$("#"+LAB+"Action");if(b){b.hidden=false;b.onclick=openCascade}}
function finishPhase(){const p=ensure();p.closingComplete=true;p.complete=true;p.stage="complete";const s=gs();Object.assign(s.flags,{ch4_p6_false_success_trusted:true,ch4_p6_downstream_reliance_observed:true,ch4_p6_18_07_archive_moving:true,ch4_p6_relay_route_supported:true,ch4_p6_maintenance_window_preserved:true,ch4_p6_false_success_hold_active:true,ch4_p6_north_active:true,ch4_p6_decision_owner_unresolved:true,ch4_p6_phase7_handoff_ready:true});setCheckpoint("ch4_phase6_complete");stopAudio(false);safeShow(COMPLETE);updateLanguage();syncProgress();save()}
function showComplete(){const p=ensure();p.complete=true;p.stage="complete";safeShow(COMPLETE);updateLanguage();syncProgress()}
function returnToTitle(){stopAudio(true);cascadeOpen=evidenceOpen=false;$("#ch4P6Cascade")?.classList.remove("open");$("#ch4P6Evidence")?.classList.remove("open");try{if(typeof window.LastWitnessChapter2Integration?.returnToTitle==="function")window.LastWitnessChapter2Integration.returnToTitle();else if(typeof show==="function")show("title")}catch(_){try{show("title")}catch(__){}}}
function startFromPhase5(){inject();const p=ensure();if(!gs()?.chapter4?.phase5?.complete&&!gs()?.flags?.ch4_p5_false_success_basis)return false;stopForeignAudio();if(p.complete){showComplete();return true}if(p.started){resumeFromState();return true}showTitle();return true}
function startFreshForDev(){inject();stopAudio(true);stopForeignAudio();const s=gs();s.chapter=4;s.chapter4=s.chapter4||{};s.chapter4.phase5=s.chapter4.phase5||{};Object.assign(s.chapter4.phase5,{started:true,complete:true,closingComplete:true,stage:"complete"});s.flags=s.flags||{};Object.assign(s.flags,{ch4_p5_false_success_basis:true,ch4_p5_north_active:true,ch4_p5_decision_owner_unresolved:true});s.chapter4.phase6=defaults();showTitle();return true}
function resumeFromState(){inject();const p=ensure();if(p.complete){showComplete();return}switch(String(p.stage||"title")){case"hotel-card":enterBedroom();break;case"bedroom":enterBedroom();break;case"lounge":enterLounge();break;case"team-cg":showTeamCg();break;case"alert":enterAlert();if(p.alertOpened&&!p.northConsentRecorded)setTimeout(()=>talk(D.consent,completeConsent),300);break;case"lab-card":showLabCard();break;case"lab":case"cascade":case"evidence":case"closing":enterLab();if(p.cascadeComplete&&!p.relayConfirmed)setTimeout(()=>openEvidence(p.evidenceViewed.length),350);else if(p.relayConfirmed&&!p.closingComplete)setTimeout(()=>talk(D.closing,finishPhase),350);break;default:showTitle()}}

function removePhase5EndCard(){const screen=$("#"+P5_COMPLETE);if(!screen)return;screen.classList.add("ch4-p6-handoff-source");$(".ch4-p5-complete-card",screen)?.remove()}
function handoffReady(){const p5=gs()?.chapter4?.phase5;return Boolean(p5?.complete||gs()?.flags?.ch4_p5_false_success_basis)}
function watchHandoff(){removePhase5EndCard();if(handoffObserver)handoffObserver.disconnect();const screen=$("#"+P5_COMPLETE);if(screen){handoffObserver=new MutationObserver(()=>{if(screen.classList.contains("active")&&handoffReady()){screen.classList.remove("active");startFromPhase5()}});handoffObserver.observe(screen,{attributes:true,attributeFilter:["class"]})}if(active()===P5_COMPLETE&&handoffReady())startFromPhase5()}
function installSaveBridge(){if(saveBridgeInstalled||!window.LastWitnessSaveManager?.restore)return false;const api=window.LastWitnessSaveManager,base=api.restore;if(base.__lwPhase6Bridge){saveBridgeInstalled=true;return true}function owns(data){return Boolean(data?.chapter4?.phase6?.started||String(data?.checkpoint||"").startsWith("ch4_phase6_")||SCREENS.has(String(data?.screen||"")))}api.restore=function(data){if(!owns(data))return base.call(this,data);const p5=data?.chapter4?.phase5,started=p5?.started;if(p5)p5.started=false;let result;try{result=base.call(this,data)}finally{if(p5)p5.started=started}Promise.resolve(result).finally(()=>setTimeout(()=>resumeFromState(),0));return result};api.restore.__lwPhase6Bridge=true;saveBridgeInstalled=true;return true}
function installDevJump(){
 try{return window.LastWitnessDeveloperPhaseNavigation?.install?.()===true}catch(_){return false}
}
function bindElements(){
 $("#ch4P6HotelContinue").onclick=enterBedroom;$("#ch4P6LabContinue").onclick=enterLab;$("#ch4P6CascadeReset").onclick=resetCascade;$("#ch4P6CascadeConfirm").onclick=confirmCascade;$("#ch4P6EvidenceNext").onclick=nextEvidence;$("#ch4P6ReturnTitle").onclick=returnToTitle;
 $$(".ch4-p6-save").forEach(b=>b.onclick=()=>{try{if(window.LastWitnessSaveManager?.open)window.LastWitnessSaveManager.open("save");else if(typeof manualSave==="function")manualSave()}catch(_){}});$$(".ch4-p6-menu").forEach(b=>b.onclick=()=>$("#drawer")?.classList.add("open"));
 $("#ch4P6Cascade")?.addEventListener("click",event=>{if(event.target.id==="ch4P6Cascade")closeCascade()});document.addEventListener("pointerdown",unlockAudio,{once:true,capture:true})
}
function bind(){inject();ensure();registerContent();watchHandoff();installSaveBridge();installDevJump();setBuild();updateLanguage();$("#caseButton")?.addEventListener("click",()=>setTimeout(appendCaseEvidence,0),true);$("#soundToggle")?.addEventListener("change",syncAudio,true);$("#musicRange")?.addEventListener("input",syncAudio,true);$("#sfxRange")?.addEventListener("input",syncAudio,true);document.addEventListener("click",event=>{if(event.target.closest?.("[data-lang]"))setTimeout(()=>{updateLanguage();installDevJump()},0);
 if(event.target.closest?.("#developerMenuButton,#settingsVersion"))setTimeout(()=>{installDevJump();setBuild()},0);
 else if(event.target.closest?.("#settingsButton,#northQaMenuButton"))setTimeout(setBuild,0)},true);document.addEventListener("visibilitychange",()=>{if(document.hidden)stopAudio(false);else syncAudio()});[0,300,900,1800,3200].forEach(ms=>setTimeout(()=>{if(!saveBridgeInstalled)installSaveBridge()},ms));
 [0,250,700,1600].forEach(ms=>setTimeout(installDevJump,ms));
 if(SCREENS.has(active())||phaseState()?.started)setTimeout(resumeFromState,0)}

window.LastWitnessChapter4Phase6={startFromPhase5,startFreshForDev,resumeFromState,stopAudio,returnToTitle,appendCaseEvidence,registerContent,phaseState,version:BUILD};
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",bind,{once:true});else bind();
})();
