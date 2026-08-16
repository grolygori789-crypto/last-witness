/* LAST WITNESS - Chapter V Owner Walkthrough Extension 0.22.7-c5w1
 * Read-only Chapter V Phase I extension for the accepted Owner Walkthrough UI.
 * It reads screen/checkpoint/Phase I state only and never mutates gameplay,
 * Save, Hidden Case, evidence, choices, progress, audio or North QA state.
 */
(function(){
"use strict";
const VERSION="0.22.7-c5w1";
const BASE_VERSION="0.22.3-w1";
if(window.LastWitnessChapter5OwnerWalkthrough?.version===VERSION){try{window.LastWitnessChapter5OwnerWalkthrough.install?.()}catch(_){}return}
const $=(s,r=document)=>r.querySelector(s);
const gs=()=>{try{return state}catch(_){return window.state||null}};
const thai=()=>gs()?.language==="th"||document.documentElement.lang==="th";
const tr=(en,th)=>thai()?th:en;
const activeScreen=()=>$(".screen.active")?.id||gs()?.screen||"unknown";
const phaseState=()=>{try{return window.LastWitnessChapter5Phase1?.getState?.()||gs()?.flags?.ch5_p1||{}}catch(_){return gs()?.flags?.ch5_p1||{}}};
const SCREENS=new Set(["ch5P1Landing","ch5P1ArrivalCard","ch5P1Police","ch5P1Briefing","ch5P1CondoWalk","ch5P1CondoCard","ch5P1Condo","ch5P1NorthReveal","ch5P1Complete"]);
const STEPS=[
 {id:"c5p1-arrival",screens:["ch5P1Landing","ch5P1ArrivalCard"],title:["PHASE I · RETURN TO BANGKOK","PHASE I · กลับสู่กรุงเทพฯ"],action:["Watch or skip the Bangkok landing cinematic. The arrival card then holds briefly and advances automatically to Evidence Division.","ดูหรือข้ามคลิปเครื่องบินลงกรุงเทพฯ จากนั้นการ์ดเดินทางถึงจะแสดงชั่วครู่และเข้าสู่ฝ่ายพยานหลักฐานโดยอัตโนมัติ"],hint:["There is no Continue button on the Bangkok arrival card. Leave it alone for about three seconds.","การ์ดเดินทางถึงกรุงเทพฯ ไม่มีปุ่ม Continue ปล่อยไว้ประมาณสามวินาที"],solution:["LANDING CINEMATIC → ~3 SECOND RETURN TO BANGKOK CARD → POLICE STATION · EVIDENCE DIVISION.","LANDING CINEMATIC → การ์ด RETURN TO BANGKOK ราว 3 วินาที → POLICE STATION · EVIDENCE DIVISION"],nofail:true},
 {id:"c5p1-briefing",screens:["ch5P1Police","ch5P1Briefing"],title:["EVIDENCE DIVISION · RETURN BRIEFING","ฝ่ายพยานหลักฐาน · RETURN BRIEFING"],action:["Continue the return briefing. Separate what Singapore/Jakarta actually proved from what Bangkok still has to verify.","เดิน Return Briefing ต่อ แยกสิ่งที่ Singapore/Jakarta พิสูจน์แล้วออกจากสิ่งที่ Bangkok ยังต้องตรวจ"],hint:["Kittisak's instruction is procedurally defensible. Suspicion comes from timing, not from an invalid order.","คำสั่งของ Kittisak อธิบายได้ตามขั้นตอน จุดน่าสงสัยอยู่ที่จังหวะเวลา ไม่ใช่คำสั่งที่ผิดระเบียบ"],solution:["Continue through the registrar lead and the North-status question. This is narrative investigation, not a pass/fail puzzle.","เล่นต่อผ่านเบาะแส Registrar และคำถามเรื่องสถานะของ North ช่วงนี้เป็นการสืบสวนเชิงเรื่องราว ไม่ใช่ปริศนาผ่าน/ตก"],nofail:true},
 {id:"c5p1-cover",screens:["ch5P1Briefing"],title:["NORTH · PUBLIC COVER STORY","NORTH · เรื่องที่ให้คนอื่นเชื่อ"],action:["Let Benedict deliver the restrained cover story and read each reaction without treating emotion as proof.","ปล่อยให้ Benedict เล่นบทปกปิดอย่างสำรวม แล้วอ่านปฏิกิริยาของแต่ละคนโดยไม่ถืออารมณ์เป็นหลักฐาน"],hint:["Somchai is genuinely shocked and saddened. Elena is naturally sympathetic. Kittisak stays controlled. None of those reactions proves attribution.","Somchai ตกใจและเสียใจจริง Elena แสดงความเห็นใจอย่างเป็นธรรมชาติ ส่วน Kittisak คุมอารมณ์ ทุกปฏิกิริยายังไม่ใช่หลักฐานระบุตัวผู้กระทำ"],solution:["Continue until Kittisak explains the sealed records and Somchai confirms the hand-carry transfer.","เล่นต่อจน Kittisak อธิบายการปิดผนึกบันทึก และ Somchai ยืนยันการเคลื่อนย้ายแฟ้มด้วยตัวเอง"],nofail:true},
 {id:"c5p1-custody",screens:["ch5P1Briefing"],title:["CUSTODY WINDOW","CUSTODY WINDOW"],action:["Reconstruct the documented custody sequence, then choose only the conclusion supported by the record.","เรียงลำดับสายการครอบครองหลักฐานตามบันทึก แล้วเลือกข้อสรุปที่หลักฐานรองรับเท่านั้น"],hint:["Authority can be valid while timing remains suspicious. Do not turn access or physical handling into automatic guilt.","อำนาจอนุมัติอาจถูกต้องได้พร้อมกับเวลาที่น่าสงสัย อย่าเปลี่ยนการเข้าถึงหรือการถือแฟ้มให้กลายเป็นความผิดโดยอัตโนมัติ"],solution:["ORDER: PROTECTION ORDER → RECORDS SEALED → HAND-CARRY TRANSFER. FINDING: THE CHAIN IS VALID; THE TIMING STILL DESERVES REVIEW. The following investigative-emphasis choice has no failure path.","ลำดับ: PROTECTION ORDER → RECORDS SEALED → HAND-CARRY TRANSFER · ข้อสรุป: สายการครอบครองหลักฐานถูกต้อง แต่จังหวะเวลายังควรตรวจต่อ · Choice น้ำหนักการสืบสวนหลังจากนั้นไม่มีเส้นทางตก"]},
 {id:"c5p1-condo",screens:["ch5P1CondoWalk","ch5P1CondoCard","ch5P1Condo","ch5P1NorthReveal"],title:["PRIVATE ROUTE · NORTH REVEAL","เส้นทางส่วนตัว · NORTH REVEAL"],action:["Leave the station, watch/skip the condominium walk transition, then continue into Benedict's private residence and the North reveal.","ออกจากสถานีตำรวจ ดูหรือข้ามคลิปเดินเข้าคอนโด แล้วเข้าสู่ที่พักส่วนตัวของ Benedict และฉากเฉลย North"],hint:["The public story and the private reality are intentionally separated. The Somchai coffee beat pays off here without changing the investigation facts.","เรื่องที่คนอื่นเชื่อกับความจริงในพื้นที่ส่วนตัวถูกแยกออกจากกันโดยตั้งใจ มุกกาแฟของ Somchai มาปิดจังหวะตรงนี้โดยไม่เปลี่ยนข้อเท็จจริงของคดี"],solution:["Continue the North reveal and private debrief. Kittisak remains plausible-but-review-worthy, Somchai remains documented, Elena remains low-signal. The next lead is a protected identity reference tied to Room 1807.","เล่น North Reveal และ Private Debrief ต่อ Kittisak ยังน่าสงสัยแต่มีเหตุผลรองรับ Somchai ยังมีบันทึกการเคลื่อนย้ายชัด และ Elena ยัง Low-signal เบาะแสถัดไปคือข้อมูลตัวตนที่ถูกปกป้องซึ่งผูกกับ Room 1807"],nofail:true},
 {id:"c5p1-complete",screens:["ch5P1Complete"],title:["PHASE I COMPLETE · THE NEXT NAME","จบ PHASE I · ชื่อถัดไป"],action:["Verify the Phase I completion card and the Phase II handoff.","ตรวจการ์ดจบ Phase I และ Handoff ไป Phase II"],hint:["Phase I ends without identifying a culprit. It preserves the custody contradiction and the Room 1807 identity reference.","Phase I จบโดยยังไม่ระบุตัวคนร้าย แต่เก็บความผิดปกติด้าน Custody และข้อมูลตัวตนที่โยงกับ Room 1807 ไว้"],solution:["Expected: BANGKOK RETURN COMPLETE · NORTH PUBLIC RECORD REMOVED · CUSTODY WINDOW VERIFIED / REVIEW TIMING · ROOM 1807 IDENTITY REFERENCE · NEXT PHASE II NAME IN ROOM 1807.","ค่าที่คาดหวัง: BANGKOK RETURN COMPLETE · NORTH PUBLIC RECORD REMOVED · CUSTODY WINDOW VERIFIED / REVIEW TIMING · ROOM 1807 IDENTITY REFERENCE · ถัดไป PHASE II NAME IN ROOM 1807"],nofail:true}
];
let active=false,manual=false,index=0,hint=false,solution=false,syncTimer=0,catalogPatched=false,installTimers=[];
function walk(){return window.LastWitnessOwnerWalkthrough}
function currentIsChapter5(){return Number(gs()?.chapter)===5&&SCREENS.has(activeScreen())}
function ownerUiOpen(){return Boolean($("#lwOwnerWalkthrough")?.classList.contains("open")||$("#lwOwnerWalkthroughPill")?.hidden===false)}
function stepIndexFromGame(){
 const screen=activeScreen(),p=phaseState(),checkpoint=String(gs()?.checkpoint||"");
 if(screen==="ch5P1Complete")return 5;
 if(["ch5P1CondoWalk","ch5P1CondoCard","ch5P1Condo","ch5P1NorthReveal"].includes(screen))return 4;
 if(screen==="ch5P1Briefing"){
  if(p?.custodyStarted||p?.custodyComplete||String(p?.stage||"").includes("custody")||checkpoint.includes("custody"))return 3;
  if(p?.northCoverPlayed||checkpoint.includes("north_cover")||p?.briefingIntroComplete)return 2;
  return 1
 }
 if(screen==="ch5P1Police")return 1;
 return 0
}
function markBaseManual(){
 const select=$("#lwWalkChapter");if(!select)return;
 const fallback=Array.from(select.options).some(o=>o.value==="4")?"4":select.options[0]?.value;
 if(!fallback)return;select.value=fallback;select.dispatchEvent(new Event("change",{bubbles:true}))
}
function ensureChapterOption(){const select=$("#lwWalkChapter");if(!select)return false;if(!select.querySelector('option[value="5"]')){const option=document.createElement("option");option.value="5";option.textContent="CHAPTER V";select.appendChild(option)}return true}
function resetBaseBuildLabel(){const n=$("#lwOwnerWalkthrough .lw-walk-build");if(n)n.textContent=BASE_VERSION}
function render(){
 if(!active||!ensureChapterOption())return false;index=Math.max(0,Math.min(STEPS.length-1,index));const step=STEPS[index],ctx=activeScreen(),checkpoint=String(gs()?.checkpoint||"");
 const chapter=$("#lwWalkChapter"),phase=$("#lwWalkPhase");chapter.value="5";phase.innerHTML='<option value="1">PHASE I</option>';phase.value="1";
 const set=(id,value)=>{const n=$(id);if(n)n.textContent=value};
 set("#lwWalkMode",manual?tr("BROWSE MODE","โหมดเปิดดู"):tr("SYNCED TO GAME","ซิงก์กับเกม"));set("#lwWalkScreen",ctx+(checkpoint?" · "+checkpoint:""));set("#lwWalkStepText",`CHAPTER V · PHASE I · ${String(index+1).padStart(2,"0")}/${String(STEPS.length).padStart(2,"0")}`);
 const fill=$("#lwWalkStepFill");if(fill)fill.style.width=`${((index+1)/STEPS.length)*100}%`;const badge=$("#lwWalkNoFail");if(badge)badge.hidden=!step.nofail;
 set("#lwWalkTitle",tr(step.title[0],step.title[1]));set("#lwWalkActionLabel",tr("NEXT ACTION","ทำอะไรต่อ"));set("#lwWalkAction",tr(step.action[0],step.action[1]));set("#lwWalkHintLabel",tr("HINT","คำใบ้"));set("#lwWalkHint",tr(step.hint[0],step.hint[1]));set("#lwWalkSolutionLabel",tr("VERIFIED SOLUTION","คำตอบที่ตรวจจาก Production"));set("#lwWalkSolution",tr(step.solution[0],step.solution[1]));
 const hb=$("#lwWalkHintBlock"),sb=$("#lwWalkSolutionBlock");if(hb)hb.hidden=!hint;if(sb)sb.hidden=!solution;set("#lwWalkHintButton",hint?tr("HIDE HINT","ซ่อนคำใบ้"):tr("HINT","คำใบ้"));set("#lwWalkSolutionButton",solution?tr("HIDE SOLUTION","ซ่อนคำตอบ"):tr("SHOW SOLUTION","แสดงคำตอบ"));
 const prev=$("#lwWalkPrev"),next=$("#lwWalkNext");if(prev)prev.disabled=index===0;if(next)next.disabled=index===STEPS.length-1;const pill=$("#lwOwnerWalkthroughPill");if(pill)pill.textContent=`WALKTHROUGH · C5P1 · ${index+1}/${STEPS.length}`;const build=$("#lwOwnerWalkthrough .lw-walk-build");if(build)build.textContent=`${BASE_VERSION} · C5 ${VERSION}`;return true
}
function activate(sync=true){
 const base=walk();if(!base)return false;if(!$("#lwOwnerWalkthrough"))base.install?.();if(!$("#lwOwnerWalkthrough"))return false;markBaseManual();active=true;manual=!sync;hint=false;solution=false;index=sync?stepIndexFromGame():0;render();armSync();return true
}
function openForChapter5(){const base=walk();if(!base)return false;const ok=base.open?.();if(ok===false)return false;return activate(true)}
function armSync(){clearTimeout(syncTimer);if(!active||manual||!ownerUiOpen())return;syncTimer=setTimeout(()=>{if(active&&!manual&&ownerUiOpen()){const next=stepIndexFromGame();if(next!==index){index=next;hint=false;solution=false;render()}armSync()}},650)}
function patchCatalog(){const base=walk();if(!base||catalogPatched)return false;const original=base.getCatalog?.bind(base);if(typeof original!=="function")return false;base.getCatalog=()=>original().concat(STEPS.map(step=>({chapter:5,phase:1,id:step.id,title:tr(step.title[0],step.title[1])})));base.chapter5ExtensionVersion=VERSION;catalogPatched=true;return true}
function intercept(event){
 const target=event.target;
 if(target.closest?.("#lwOwnerWalkthroughButton")&&currentIsChapter5()){
  event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();openForChapter5();return
 }
 if(target.closest?.("#lwWalkChapter"))return;
 if(!active)return;
 if(target.closest?.("#lwWalkPrev")){event.preventDefault();event.stopImmediatePropagation();index=Math.max(0,index-1);manual=true;hint=false;solution=false;render();return}
 if(target.closest?.("#lwWalkNext")){event.preventDefault();event.stopImmediatePropagation();index=Math.min(STEPS.length-1,index+1);manual=true;hint=false;solution=false;render();return}
 if(target.closest?.("#lwWalkHintButton")){event.preventDefault();event.stopImmediatePropagation();hint=!hint;render();return}
 if(target.closest?.("#lwWalkSolutionButton")){event.preventDefault();event.stopImmediatePropagation();solution=!solution;render();return}
 if(target.closest?.("#lwWalkSync")){
  if(currentIsChapter5()){event.preventDefault();event.stopImmediatePropagation();manual=false;hint=false;solution=false;index=stepIndexFromGame();render();armSync()}else{active=false;manual=false;resetBaseBuildLabel()}
  return
 }
 if(target.closest?.("#lwWalkClose")){active=false;manual=false;clearTimeout(syncTimer);resetBaseBuildLabel();return}
 if(target.closest?.("#lwWalkMinimize,#lwOwnerWalkthroughPill")){setTimeout(()=>{if(active){render();armSync()}},0)}
}
function interceptChange(event){
 if(event.target?.id!=="lwWalkChapter")return;const value=String(event.target.value||"");
 if(value==="5"){
  event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();active=true;manual=true;index=0;hint=false;solution=false;render();clearTimeout(syncTimer);return
 }
 if(active){active=false;manual=false;clearTimeout(syncTimer);resetBaseBuildLabel()}
}
function install(){patchCatalog();if($("#lwOwnerWalkthrough"))ensureChapterOption();installTimers.forEach(clearTimeout);installTimers=[];[150,500,1100,2200,4200,7200].forEach(ms=>installTimers.push(setTimeout(()=>{patchCatalog();if($("#lwOwnerWalkthrough"))ensureChapterOption()},ms)));return true}
document.addEventListener("click",intercept,true);document.addEventListener("change",interceptChange,true);document.addEventListener("click",event=>{if(event.target.closest?.("[data-lang]"))setTimeout(()=>{if(active)render()},0);if(event.target.closest?.("#developerMenuButton,#settingsVersion"))setTimeout(()=>{patchCatalog();ensureChapterOption()},80)},true);window.addEventListener("pageshow",()=>{install();if(active&&ownerUiOpen()){render();armSync()}});
window.LastWitnessChapter5OwnerWalkthrough={version:VERSION,installed:true,install,getSteps:()=>STEPS.map(step=>({chapter:5,phase:1,id:step.id,title:tr(step.title[0],step.title[1])})),renderCurrent:()=>{if(!active)activate(true);else render()}};
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",install,{once:true});else install();
})();
