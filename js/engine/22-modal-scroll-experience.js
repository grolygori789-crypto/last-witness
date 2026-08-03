/* LAST WITNESS — Dialogue History + Case File Modal Scroll Experience 0.17.15
 * Scoped presentation owner for two existing read-only modal views.
 *
 * Contract:
 * - Dialogue History remains chronological and opens at the latest line.
 * - Manual upward review is never pulled back automatically.
 * - A floating Latest control returns to the newest line.
 * - Case File never auto-jumps to the bottom and restores its session position.
 * - Both modals receive a permanently reachable top close control.
 *
 * Non-ownership:
 * - does not write game State, Save data, history, evidence, progression,
 *   Character Journal, unread dots, audio, Developer Mode or chapter routing.
 * - installs no MutationObserver, polling loop or global function replacement.
 */
(function(){
"use strict";
const VERSION="0.17.15";
if(window.LastWitnessModalScrollExperience?.version===VERSION&&window.LastWitnessModalScrollExperience?.installed)return;

const SELECTORS={
 history:{
  modal:["#historyModal","#dialogueHistoryModal",'[data-modal="history"]'],
  list:["#historyList","#dialogueHistoryList","#historyContent",".dialogue-history-list",".history-list","[data-dialogue-history-list]"],
  trigger:["#historyButton","#dialogueHistoryButton","[data-open-history]","[data-menu-history]"]
 },
 caseFile:{
  modal:["#caseModal","#caseFileModal",'[data-modal="case"]','[data-modal="case-file"]'],
  list:["#caseList","#caseFileList","[data-case-list]"],
  trigger:["#caseButton","#caseFileButton","[data-open-case]","[data-menu-case]"]
 }
};
const positions={caseFile:0};
const counters={historyOpen:0,caseOpen:0,latestJump:0,closeDelegation:0};

function first(selectors,root=document){
 for(const selector of selectors){const node=root.querySelector(selector);if(node)return node}
 return null
}
function language(){
 try{if(typeof state!=="undefined"&&state?.language==="th")return"th"}catch(_){}
 return document.documentElement.lang?.toLowerCase().startsWith("th")?"th":"en"
}
function text(en,th){return language()==="th"?th:en}
function activeModal(modal){return Boolean(modal&&(modal.classList.contains("open")||modal.classList.contains("show")||modal.getAttribute("aria-hidden")==="false"))}
function resolve(kind){
 const config=SELECTORS[kind],globalList=first(config.list),modal=first(config.modal)||(globalList?.closest(".modal,[role=dialog]")||null),list=first(config.list,modal||document)||globalList;
 if(!modal||!list)return null;
 const card=list.closest(".modal-card,.modal-content,.panel-card")||modal.querySelector(".modal-card,.modal-content,.panel-card")||list.parentElement;
 if(!card)return null;
 return{kind,config,modal,list,card}
}
function defaultTitle(kind){return kind==="history"?text("DIALOGUE HISTORY","ประวัติการสนทนา"):text("CASE FILE","แฟ้มคดี")}
function titleNode(view){
 return view.card.querySelector(":scope > h1,:scope > h2,:scope > h3,:scope > .modal-title,:scope > .title")||view.modal.querySelector("h1,h2,h3,.modal-title,.title")
}
function existingClose(view,exclude){
 const candidates=Array.from(view.card.querySelectorAll('[data-close-modal],.closeModal,.modal-close,.close-button,[aria-label*="close" i],[aria-label*="ปิด" i],button'));
 return candidates.find(node=>node!==exclude&&!node.classList.contains("lw-modal-top-close")&&(
  node.matches('[data-close-modal],.closeModal,.modal-close,.close-button,[aria-label*="close" i],[aria-label*="ปิด" i]')||
  /^(close|ปิด|×|✕)$/i.test(String(node.textContent||"").trim())
 ))||null
}
function closeThroughOwner(view,button){
 const owner=existingClose(view,button);
 if(owner){counters.closeDelegation+=1;owner.click();return}
 view.modal.classList.remove("open","show");
 view.modal.setAttribute("aria-hidden","true")
}
function ensureToolbar(view){
 view.modal.classList.add("lw-scroll-modal","lw-scroll-modal-"+(view.kind==="history"?"history":"case"));
 view.card.classList.add("lw-scroll-modal-card");
 view.list.classList.add("lw-scroll-modal-body");
 let toolbar=view.card.querySelector(":scope > .lw-scroll-modal-toolbar");
 const originalTitle=titleNode(view);
 if(!toolbar){
  toolbar=document.createElement("div");toolbar.className="lw-scroll-modal-toolbar";
  const heading=document.createElement("div");heading.className="lw-scroll-modal-title";
  const close=document.createElement("button");close.type="button";close.className="lw-modal-top-close";close.textContent="×";
  close.addEventListener("click",event=>{event.preventDefault();event.stopPropagation();closeThroughOwner(view,close)});
  toolbar.append(heading,close);view.card.insertBefore(toolbar,view.card.firstChild)
 }
 const heading=toolbar.querySelector(".lw-scroll-modal-title"),close=toolbar.querySelector(".lw-modal-top-close");
 heading.textContent=String(originalTitle?.textContent||defaultTitle(view.kind)).trim()||defaultTitle(view.kind);
 close.setAttribute("aria-label",text("Close","ปิด"));
 if(originalTitle&&originalTitle!==heading){originalTitle.classList.add("lw-scroll-original-title");originalTitle.setAttribute("aria-hidden","true")}
 return toolbar
}
function distanceFromBottom(list){return Math.max(0,list.scrollHeight-list.clientHeight-list.scrollTop)}
function ensureLatestButton(view){
 let button=view.card.querySelector(":scope > .lw-jump-latest");
 if(!button){
  button=document.createElement("button");button.type="button";button.className="lw-jump-latest";
  button.addEventListener("click",()=>{
   counters.latestJump+=1;
   view.list.scrollTo({top:view.list.scrollHeight,behavior:"smooth"});
   requestAnimationFrame(()=>syncLatestButton(view))
  });
  view.card.appendChild(button)
 }
 button.textContent=text("↓ Latest","↓ ล่าสุด");button.setAttribute("aria-label",text("Jump to latest dialogue","ไปยังบทสนทนาล่าสุด"));
 return button
}
function syncLatestButton(view){
 if(view.kind!=="history")return;
 const button=ensureLatestButton(view),hasOverflow=view.list.scrollHeight>view.list.clientHeight+4;
 button.classList.toggle("show",hasOverflow&&distanceFromBottom(view.list)>96)
}
function bindHistory(view){
 if(view.list.dataset.lwHistoryScrollBound===VERSION)return;
 view.list.dataset.lwHistoryScrollBound=VERSION;
 view.list.addEventListener("scroll",()=>syncLatestButton(view),{passive:true})
}
function bindCase(view){
 if(view.list.dataset.lwCaseScrollBound===VERSION)return;
 view.list.dataset.lwCaseScrollBound=VERSION;
 view.list.addEventListener("scroll",()=>{positions.caseFile=view.list.scrollTop},{passive:true})
}
function positionHistory(view){
 if(!activeModal(view.modal))return;
 view.list.scrollTop=view.list.scrollHeight;syncLatestButton(view)
}
function positionCase(view){
 if(!activeModal(view.modal))return;
 const max=Math.max(0,view.list.scrollHeight-view.list.clientHeight);
 view.list.scrollTop=Math.min(positions.caseFile,max)
}
function prepare(kind){
 const view=resolve(kind);if(!view)return false;
 ensureToolbar(view);
 if(kind==="history"){
  bindHistory(view);ensureLatestButton(view);counters.historyOpen+=1;
  requestAnimationFrame(()=>requestAnimationFrame(()=>positionHistory(view)));
  setTimeout(()=>positionHistory(view),80)
 }else{
  bindCase(view);counters.caseOpen+=1;
  requestAnimationFrame(()=>requestAnimationFrame(()=>positionCase(view)))
 }
 return true
}
function triggerKind(target){
 for(const [kind,config] of Object.entries(SELECTORS)){
  if(config.trigger.some(selector=>target.closest?.(selector)))return kind
 }
 const button=target.closest?.("button,[role=button]");
 const label=String(button?.textContent||"").replace(/\s+/g," ").trim().toLowerCase();
 if(["dialogue history","ประวัติการสนทนา"].includes(label))return"history";
 if(["case file","แฟ้มคดี","แฟ้มเอกสาร"].includes(label))return"caseFile";
 return null
}
function installStyles(){
 if(document.getElementById("lwModalScrollExperienceStyle"))return;
 const style=document.createElement("style");style.id="lwModalScrollExperienceStyle";style.textContent=`
  .lw-scroll-modal .lw-scroll-modal-card{position:relative!important;display:flex!important;flex-direction:column!important;overflow:hidden!important;max-height:min(88dvh,820px)!important;padding-top:0!important}
  .lw-scroll-modal-toolbar{position:relative;z-index:5;display:flex;flex:0 0 auto;align-items:center;justify-content:space-between;gap:12px;min-height:56px;padding:12px 12px 12px 18px;border-bottom:1px solid rgba(255,255,255,.10);background:linear-gradient(180deg,rgba(18,20,26,.98),rgba(9,11,15,.96));box-shadow:0 8px 20px rgba(0,0,0,.20)}
  .lw-scroll-modal-title{min-width:0;color:#d8b56e;font-size:12px;font-weight:800;letter-spacing:.15em;line-height:1.35;text-transform:uppercase;overflow-wrap:anywhere}
  .lw-modal-top-close{display:grid;place-items:center;flex:0 0 42px;width:42px;height:42px;margin:0;padding:0;border:1px solid rgba(255,255,255,.18);border-radius:999px;background:rgba(3,4,7,.72);color:#f5efe6;font:300 29px/1 system-ui,sans-serif;cursor:pointer;touch-action:manipulation}
  .lw-modal-top-close:focus-visible,.lw-jump-latest:focus-visible{outline:2px solid #d8b56e;outline-offset:2px}
  .lw-scroll-original-title{display:none!important}
  .lw-scroll-modal .lw-scroll-modal-body{flex:1 1 auto!important;min-height:0!important;max-height:none!important;overflow-x:hidden!important;overflow-y:auto!important;overscroll-behavior:contain!important;-webkit-overflow-scrolling:touch;scrollbar-gutter:stable;padding-bottom:max(18px,env(safe-area-inset-bottom))!important}
  .lw-jump-latest{position:absolute;z-index:7;right:16px;bottom:max(68px,calc(54px + env(safe-area-inset-bottom)));display:flex;align-items:center;justify-content:center;min-height:42px;max-width:calc(100% - 32px);padding:9px 14px;border:1px solid rgba(216,181,110,.72);border-radius:999px;background:rgba(10,12,17,.94);box-shadow:0 10px 28px rgba(0,0,0,.48);color:#f1d49b;font:700 12px/1.2 system-ui,sans-serif;letter-spacing:.06em;opacity:0;visibility:hidden;pointer-events:none;transform:translateY(8px);transition:opacity .16s ease,transform .16s ease,visibility .16s}
  .lw-jump-latest.show{opacity:1;visibility:visible;pointer-events:auto;transform:translateY(0)}
  @media(max-width:520px){.lw-scroll-modal .lw-scroll-modal-card{width:min(94vw,620px)!important;max-height:calc(100dvh - 20px)!important}.lw-scroll-modal-toolbar{padding-top:max(12px,env(safe-area-inset-top));min-height:58px}.lw-scroll-modal-title{font-size:11px}.lw-modal-top-close{flex-basis:40px;width:40px;height:40px}.lw-jump-latest{right:12px;bottom:max(64px,calc(50px + env(safe-area-inset-bottom)))}}
 `;document.head.appendChild(style)
}
function onDocumentClick(event){
 const kind=triggerKind(event.target);if(!kind)return;
 setTimeout(()=>prepare(kind),0);setTimeout(()=>prepare(kind),90)
}
function status(){
 const history=resolve("history"),caseFile=resolve("caseFile");
 return{version:VERSION,historyReady:Boolean(history?.modal.classList.contains("lw-scroll-modal")),caseReady:Boolean(caseFile?.modal.classList.contains("lw-scroll-modal")),caseSessionScroll:positions.caseFile,...counters}
}
function bind(){
 installStyles();document.addEventListener("click",onDocumentClick,true);
 window.addEventListener("pageshow",()=>{prepare("history");prepare("caseFile")});
 window.LastWitnessModalScrollExperience={installed:true,version:VERSION,prepareHistory:()=>prepare("history"),prepareCaseFile:()=>prepare("caseFile"),status}
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",bind,{once:true});else bind()
})();
