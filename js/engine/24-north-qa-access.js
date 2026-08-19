/* LAST WITNESS - Limited North QA Access 0.22.20
 * Session-scoped tester navigation using the existing BUILD x7 access door.
 * Chapter IV Phases I-VIII route through the same canonical Developer Phase
 * Navigation owner so modal lifecycle, media cleanup and state reset stay identical.
 */
(function(){
"use strict";
const VERSION="0.22.20";
if(window.LastWitnessNorthQA?.version===VERSION&&window.LastWitnessNorthQA?.installed){
 try{window.LastWitnessNorthQA.install?.()}catch(_){}
 return
}
const $=(selector,root=document)=>root.querySelector(selector);
const $$=(selector,root=document)=>Array.from(root.querySelectorAll(selector));
const gs=()=>{try{return state}catch(_){return window.state||null}};
const runtimeBuild=()=>String(window.LastWitnessRuntimeBuild||window.LastWitnessRuntimeBuildLabel?.version||VERSION);
const ROLE_KEY="last_witness_north_qa_role";
const TESTER_ROLE="tester";
const TESTER_CODE="tester";
const CHAPTER4_IDS={1:"chapter4Phase1",2:"chapter4Phase2",3:"chapter4PacketProvenance",4:"chapter4ArmanEncounter",5:"chapter4NorthMarked",6:"chapter4FalseSuccess",7:"chapter4RelayFacility",8:"chapter4ShadowTruth"};
const TITLE_MEDIA_ALLOW=new Set(["themeAudio","rainAudio","clickAudio"]);
let running=false,installed=false,memoryRole="",titleExitGuard=false,titleGuardEpoch=0,titleGuardTimers=[];

function testerAuthorized(){try{const role=sessionStorage.getItem(ROLE_KEY);if(role)return role===TESTER_ROLE}catch(_){}return memoryRole===TESTER_ROLE}
function setTesterAuthorized(value){memoryRole=value?TESTER_ROLE:"";try{if(value)sessionStorage.setItem(ROLE_KEY,TESTER_ROLE);else sessionStorage.removeItem(ROLE_KEY)}catch(_){}syncAccessButtons()}
function activeScreen(){return $(".screen.active")?.id||gs()?.screen||"unknown"}
function closeOverlays(){
 $("#drawer")?.classList.remove("open");
 $$(".modal.open").forEach(modal=>modal.classList.remove("open"));
 ["northQaModal","developerModal","devAccessModal"].forEach(id=>$("#"+id)?.classList.remove("open"))
}
function stopCurrentMedia(){
 ["LastWitnessChapter4Phase8","LastWitnessChapter4Phase7","LastWitnessChapter4Phase6","LastWitnessChapter4Phase5","LastWitnessChapter4Phase4","LastWitnessChapter4Phase3","LastWitnessChapter4Phase2","LastWitnessChapter4Phase1","LastWitnessPhase9","LastWitnessPhase8","LastWitnessPhase7","LastWitnessPhase6","LastWitnessPhase5","LastWitnessPhase4","LastWitnessChangi"].forEach(name=>{try{window[name]?.stopAudio?.(true)}catch(_){}});
 try{window.LastWitnessChapter3?.stopPhase2Media?.()}catch(_){}
 $$("video").forEach(video=>{try{video.pause();video.currentTime=0}catch(_){}})
}
function clearTitleGuardTimers(){titleGuardTimers.forEach(timer=>clearTimeout(timer));titleGuardTimers=[]}
function stopNonTitleMedia(reset=true){$$("audio,video").forEach(media=>{if(TITLE_MEDIA_ALLOW.has(media.id))return;try{media.pause();if(reset)media.currentTime=0}catch(_){}})}
function forceTitleScreen(){const title=$("#title");if(!title)return false;$$('.screen.active').forEach(screen=>screen.classList.remove("active"));title.classList.add("active");const s=gs();if(s)s.screen="title";document.title="Last Witness";return true}
function titleAudioMissing(){const s=gs();if(s?.sound===false||Number(s?.music??.33)<=0)return false;const theme=$("#themeAudio"),rain=$("#rainAudio");return Boolean((theme&&theme.paused)||(rain&&rain.paused))}
function restoreTitleAudio(){
 try{
  if(typeof window.LastWitnessChapter2Integration?.titleAudioState==="function"){window.LastWitnessChapter2Integration.titleAudioState();return}
  const s=gs();if(s?.sound===false)return;const level=Math.max(0,Math.min(1,Number(s?.music??.33)||0));
  [["themeAudio",level],["rainAudio",level*.48]].forEach(([id,volume])=>{const media=$("#"+id);if(!media)return;try{media.loop=true;media.volume=volume;media.play().catch(()=>{})}catch(_){}})
 }catch(error){console.warn("LAST WITNESS North QA title audio restore skipped",error)}
}
function enforceTitleBoundary(epoch=titleGuardEpoch){if(!titleExitGuard||epoch!==titleGuardEpoch||!testerAuthorized())return;const drifted=activeScreen()!=="title"||!$("#title")?.classList.contains("active");if(drifted)forceTitleScreen();stopNonTitleMedia(true);if(drifted||titleAudioMissing())restoreTitleAudio();syncAccessButtons()}
function armTitleBoundary(){clearTitleGuardTimers();titleExitGuard=true;const epoch=++titleGuardEpoch;[0,50,180,520,900,1500,3000,4500].forEach(ms=>titleGuardTimers.push(setTimeout(()=>enforceTitleBoundary(epoch),ms)));return epoch}
function disarmTitleBoundary(){titleExitGuard=false;titleGuardEpoch++;clearTitleGuardTimers()}
function guardTitlePlayback(event){if(!titleExitGuard||!testerAuthorized())return;const media=event.target;if(!media?.matches?.("audio,video")||TITLE_MEDIA_ALLOW.has(media.id))return;try{media.pause();media.currentTime=0}catch(_){};const epoch=titleGuardEpoch;setTimeout(()=>enforceTitleBoundary(epoch),0)}
function guardIntentionalTitleDeparture(event){if(titleExitGuard&&event.target.closest?.("#newGame,#continueGame,#loadTitle"))disarmTitleBoundary()}
function status(text="",kind=""){const node=$("#northQaStatus");if(!node)return;node.textContent=text;node.className="north-qa-status"+(kind?" "+kind:"")}
function notify(text){try{if(typeof showBadge==="function")showBadge(text)}catch(_){}}
function setBusy(value){running=value;$$('#northQaModal button[data-north-qa-action]').forEach(button=>button.disabled=value)}
function requireTester(){if(testerAuthorized())return true;status("Tester access is no longer active.","error");syncAccessButtons();return false}
function waitFor(predicate,timeout=5000){return new Promise(resolve=>{const started=performance.now();const check=()=>{let passed=false;try{passed=Boolean(predicate())}catch(_){}if(passed){resolve(true);return}if(performance.now()-started>=timeout){resolve(false);return}setTimeout(check,45)};check()})}
function chapter4Phase(){
 const nav=window.LastWitnessDeveloperPhaseNavigation;
 const canonical=Number(nav?.currentPhase?.());if(canonical>=1&&canonical<=8)return canonical;
 const s=gs(),chapter4=s?.chapter4||{};
 /* State is authoritative. Phase II and Phase III intentionally share
    jakartaVerificationLab, so screen-first detection can misidentify Phase III. */
 for(let phase=8;phase>=1;phase--){if(chapter4["phase"+phase]?.started)return phase}
 const screen=activeScreen(),matches=(nav?.phases||[]).filter(item=>Array.isArray(item.screens)&&item.screens.includes(screen));
 return matches.length===1?(Number(matches[0].phase)||null):null
}
function phaseLabel(){const chapter=Number(gs()?.chapter)||1;return chapter===4?String(chapter4Phase()||"UNRESOLVED"):"N/A"}
function syncAccessButtons(){const active=testerAuthorized(),menu=$("#northQaMenuButton"),title=$("#northQaTitleButton"),owner=$("#developerMenuButton");if(menu)menu.style.display=active?"block":"none";if(title)title.style.display=active?"inline-flex":"none";if(active&&owner)owner.style.display="none"}
function showQa(){if(!requireTester())return;status();syncAccessButtons();$("#northQaModal")?.classList.add("open")}
function lockTesterAccess(){disarmTitleBoundary();setTesterAuthorized(false);$("#northQaModal")?.classList.remove("open");status()}
function showAuthFlash(){const flash=$("#northQaFlash");if(!flash){showQa();return}flash.classList.add("show");setTimeout(()=>{flash.classList.remove("show");showQa()},900)}
function authenticateTester(event){event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();try{if(typeof lockDeveloperAccess==="function")lockDeveloperAccess()}catch(_){}setTesterAuthorized(true);const input=$("#devAccessCode");if(input)input.value="";if($("#devAccessStatus"))$("#devAccessStatus").textContent="";$("#devAccessModal")?.classList.remove("open");showAuthFlash()}
function handleAccessAttempt(event){const input=$("#devAccessCode");if(!input)return;const code=String(input.value||"").trim().toLowerCase();if(code===TESTER_CODE){authenticateTester(event);return}setTimeout(()=>{let ownerActive=false;try{ownerActive=typeof developerUnlocked==="function"&&developerUnlocked()}catch(_){}if(!ownerActive){const access=$("#devAccessModal"),owner=$("#developerMenuButton");ownerActive=Boolean(access&&!access.classList.contains("open")&&owner&&getComputedStyle(owner).display!=="none")}if(ownerActive)lockTesterAccess()},0)}
function guardOwnerConsole(event){if(!testerAuthorized())return;if(event.target.closest?.("#developerMenuButton,#developerModal")){event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();$("#developerModal")?.classList.remove("open");showQa()}}

async function enterChapter1(){const fn=typeof startNewGame==="function"?startNewGame:window.startNewGame;if(typeof fn!=="function")throw new Error("Chapter I entry API unavailable");stopCurrentMedia();fn();return Number(gs()?.chapter)===1&&gs()?.checkpoint==="ch1_start"}
async function enterChapter2(){const fn=typeof developerJump==="function"?developerJump:window.developerJump;if(typeof fn!=="function")throw new Error("Chapter II entry API unavailable");stopCurrentMedia();fn("office2");return await waitFor(()=>Number(gs()?.chapter)===2&&activeScreen()==="office2",2500)}
async function enterChapter3(){const integration=window.LastWitnessChapter2Integration;if(typeof integration?.ensureProductionRuntime!=="function")throw new Error("Chapter III loader unavailable");await integration.ensureProductionRuntime();if(typeof window.LastWitnessChapter3?.startFromChapter2!=="function")throw new Error("Chapter III entry API unavailable");stopCurrentMedia();document.title="Last Witness — The Borrowed Minutes";window.LastWitnessChapter3.startFromChapter2();return await waitFor(()=>Number(gs()?.chapter)===3&&activeScreen().startsWith("chapter3"),5000)}
async function enterChapter4(phase){const nav=window.LastWitnessDeveloperPhaseNavigation,id=CHAPTER4_IDS[phase];if(!id||typeof nav?.run!=="function")throw new Error("Chapter IV phase navigation unavailable");return await nav.run(id)}
async function runNavigation(action){
 if(!requireTester()||running)return false;
 const chapter4Action=/^chapter4phase[1-8]$/.test(action);
 disarmTitleBoundary();setBusy(true);
 /* Chapter IV uses the canonical navigator, which owns the no-flash modal
    lifecycle and closes QA/Dev overlays only when the target API is ready. */
 if(!chapter4Action)closeOverlays();
 try{
  let success=false;
  if(action==="chapter1")success=await enterChapter1();
  else if(action==="chapter2")success=await enterChapter2();
  else if(action==="chapter3")success=await enterChapter3();
  else if(chapter4Action)success=await enterChapter4(Number(action.slice(-1)));
  else throw new Error("Unknown tester navigation action");
  if(!success)throw new Error("The requested entry did not confirm its canonical checkpoint");
  notify("North QA test entry opened");return true
 }catch(error){console.error("LAST WITNESS North QA navigation failed",error);status("Unable to open the requested test entry.","error");notify("Unable to open test entry");return false}
 finally{setBusy(false)}
}
async function restartCurrent(){if(!requireTester()||running)return;const chapter=Number(gs()?.chapter)||1;if(chapter===1){await runNavigation("chapter1");return}if(chapter===2){await runNavigation("chapter2");return}if(chapter===3){await runNavigation("chapter3");return}if(chapter===4){const phase=chapter4Phase();if(phase){await runNavigation("chapter4phase"+phase);return}}status("Current chapter or phase could not be identified.","error")}
function testInfo(){const s=gs()||{};return["LAST WITNESS QA","Build: "+runtimeBuild(),"Access: NORTH QA","QA Module: "+VERSION,"Chapter: "+(Number(s.chapter)||1),"Phase: "+phaseLabel(),"Screen: "+activeScreen(),"Checkpoint: "+(s.checkpoint||"unresolved"),"Language: "+(s.language==="th"?"TH":"EN"),"Visibility: "+(document.hidden?"hidden":"visible")].join("\n")}
async function copyText(value){if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(value);return true}const area=document.createElement("textarea");area.value=value;area.setAttribute("readonly","");area.style.position="fixed";area.style.opacity="0";document.body.appendChild(area);area.select();const copied=document.execCommand?.("copy")===true;area.remove();return copied}
async function copyTestInfo(){if(!requireTester()||running)return;try{const copied=await copyText(testInfo());if(!copied)throw new Error("Clipboard copy failed");status("Test information copied.","success");notify("Test information copied")}catch(error){console.error("LAST WITNESS North QA copy failed",error);status("Unable to copy test information.","error")}}
function returnToTitle(){if(!requireTester())return;const epoch=armTitleBoundary();stopCurrentMedia();closeOverlays();try{if(typeof window.LastWitnessChapter2Integration?.returnToTitle==="function")window.LastWitnessChapter2Integration.returnToTitle();else if(typeof show==="function")show("title")}catch(error){console.error("LAST WITNESS North QA title return failed",error);try{show("title")}catch(_){}}enforceTitleBoundary(epoch)}

function createStyle(){if($("#northQaStyle"))return;const style=document.createElement("style");style.id="northQaStyle";style.textContent=`
#northQaModal{z-index:390;background:rgba(3,4,7,.9);backdrop-filter:blur(8px)}
#northQaModal .modal-card{width:min(92vw,620px);max-height:min(88dvh,860px);overflow:auto;overscroll-behavior:contain;background:linear-gradient(155deg,#17191f,#090b0f 72%);border:1px solid rgba(199,161,94,.44);box-shadow:0 24px 70px rgba(0,0,0,.74)}
.north-qa-head{margin-bottom:16px}.north-qa-head strong{display:block;color:#f4ede3;font-size:22px;letter-spacing:.05em}.north-qa-build{margin-top:5px;color:#c7a15e;font-size:11px;font-weight:800;letter-spacing:.17em}.north-qa-module{margin-top:3px;color:#8f887e;font-size:9px;font-weight:800;letter-spacing:.13em}.north-qa-note{margin:11px 0 0;color:#a9a196;font-size:12px;line-height:1.5}
.north-qa-section{margin:17px 0 8px;color:#c7a15e;font-size:10px;font-weight:800;letter-spacing:.18em}.north-qa-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}.north-qa-grid .dev-button{min-height:48px;text-align:left}.north-qa-session{display:grid;gap:9px}.north-qa-session button{width:100%}
.north-qa-status{min-height:20px;margin:12px 0 4px;color:#c7a15e;font-size:12px;font-weight:700}.north-qa-status.error{color:#e29a94}.north-qa-status.success{color:#9dd6ad}
#northQaTitleButton{display:none;align-items:center;justify-content:center;margin-top:8px}#northQaMenuButton{display:none}#northQaFlash{z-index:430}.north-qa-lock{border-color:rgba(181,63,56,.55)!important;color:#e29a94!important}
@media(max-width:520px){.north-qa-grid{grid-template-columns:1fr}#northQaModal .modal-card{width:94vw;max-height:calc(100dvh - 20px)}}`;
 document.head.appendChild(style)
}
function createUi(){
 createStyle();
 if(!$("#northQaModal")){
  const modal=document.createElement("div");modal.id="northQaModal";modal.className="modal";
  modal.innerHTML=`<div class="modal-card"><div class="north-qa-head"><strong>NORTH QA ACCESS</strong><div class="north-qa-build">BUILD ${runtimeBuild()}</div><div class="north-qa-module">QA MODULE ${VERSION}</div><p class="north-qa-note">Use an Incognito window for isolated testing. QA navigation changes only the current browser test session.</p></div><div class="north-qa-section">TEST NAVIGATION</div><div class="north-qa-grid"><button class="dev-button" type="button" data-north-qa-action="chapter1">CHAPTER I</button><button class="dev-button" type="button" data-north-qa-action="chapter2">CHAPTER II</button><button class="dev-button" type="button" data-north-qa-action="chapter3">CHAPTER III</button><button class="dev-button" type="button" data-north-qa-action="chapter4phase1">CHAPTER IV · PHASE I</button><button class="dev-button" type="button" data-north-qa-action="chapter4phase2">CHAPTER IV · PHASE II</button><button class="dev-button" type="button" data-north-qa-action="chapter4phase3">CHAPTER IV · PHASE III</button><button class="dev-button" type="button" data-north-qa-action="chapter4phase4">CHAPTER IV · PHASE IV</button><button class="dev-button" type="button" data-north-qa-action="chapter4phase5">CHAPTER IV · PHASE V</button><button class="dev-button" type="button" data-north-qa-action="chapter4phase6">CHAPTER IV · PHASE VI</button><button class="dev-button" type="button" data-north-qa-action="chapter4phase7">CHAPTER IV · PHASE VII</button><button class="dev-button" type="button" data-north-qa-action="chapter4phase8">CHAPTER IV · PHASE VIII</button></div><div class="north-qa-section">SESSION</div><div class="north-qa-session"><button class="ghost" type="button" data-north-qa-action="restart">RESTART CURRENT CHAPTER / PHASE</button><button class="ghost" type="button" data-north-qa-action="copy">COPY TEST INFO</button><button class="ghost" type="button" data-north-qa-action="title">RETURN TO TITLE</button><button class="ghost north-qa-lock" type="button" data-north-qa-action="lock">LOCK TESTER ACCESS</button><button class="ghost" type="button" data-north-qa-action="close">CLOSE</button></div><div id="northQaStatus" class="north-qa-status" aria-live="polite"></div></div>`;
  document.body.appendChild(modal)
 }
 if(!$("#northQaFlash")){const flash=document.createElement("div");flash.id="northQaFlash";flash.className="dev-access-flash";flash.innerHTML="<div><strong>AUTHENTICATION SUCCESSFUL</strong><br><small>NORTH QA ACCESS UNLOCKED</small></div>";document.body.appendChild(flash)}
 if(!$("#northQaMenuButton")){const button=document.createElement("button");button.id="northQaMenuButton";button.className="menu-button";button.type="button";button.textContent="North QA Access";const restart=$("#restart");restart?.parentNode?.insertBefore(button,restart)}
 if(!$("#northQaTitleButton")){const button=document.createElement("button");button.id="northQaTitleButton";button.className="ghost";button.type="button";button.textContent="NORTH QA ACCESS";$("#title .title-ui")?.appendChild(button)}
}
function bindUi(){
 $("#northQaMenuButton")?.addEventListener("click",showQa);$("#northQaTitleButton")?.addEventListener("click",showQa);
 $("#northQaModal")?.addEventListener("click",event=>{
  if(event.target===$("#northQaModal")){event.currentTarget.classList.remove("open");return}
  const action=event.target.closest?.("[data-north-qa-action]")?.dataset.northQaAction;if(!action)return;
  event.preventDefault();event.stopPropagation();
  if(action.startsWith("chapter")){void runNavigation(action);return}
  if(action==="restart"){void restartCurrent();return}
  if(action==="copy"){void copyTestInfo();return}
  if(action==="title"){returnToTitle();return}
  if(action==="lock"){lockTesterAccess();return}
  if(action==="close")$("#northQaModal")?.classList.remove("open")
 });
 $("#devAccessSubmit")?.addEventListener("click",handleAccessAttempt,true);$("#devAccessCode")?.addEventListener("keydown",event=>{if(event.key==="Enter")handleAccessAttempt(event)},true);
 document.addEventListener("click",guardOwnerConsole,true);document.addEventListener("click",guardIntentionalTitleDeparture,true);document.addEventListener("play",guardTitlePlayback,true)
}
function install(){if(installed){syncAccessButtons();return true}createUi();bindUi();syncAccessButtons();installed=true;return true}
window.LastWitnessNorthQA={version:VERSION,installed:true,install,runNavigation,restartCurrent,returnToTitle,testInfo};
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",install,{once:true});else install();
})();
