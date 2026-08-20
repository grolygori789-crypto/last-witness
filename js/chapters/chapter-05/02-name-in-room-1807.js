/* LAST WITNESS - Chapter V / Phase II: NAME IN ROOM 1807 0.22.27-c5p2r23
 * Production module update under base Runtime 0.22.27.
 * Reuses accepted card/scene/HUD/dialogue shells; Phase II owns only its screens,
 * reconciliation interaction, scoped audio, state, content registration and test entry.
 */
(function(){
"use strict";
const VERSION="0.22.27-c5p2r23";
if(window.LastWitnessChapter5Phase2?.version===VERSION){try{window.LastWitnessChapter5Phase2.install?.()}catch(_){}return}

const BASE="assets/images/chapter-05/phase-02/";
const AUDIO="assets/audio/chapter-05/phase-02/";
const CARD="ch5P2PhaseCard";
const RECORDS="ch5P2Records";
const WORK="ch5P2Workstation";
const COMPLETE="ch5P2Complete";
const SCREENS=new Set([CARD,RECORDS,WORK,COMPLETE]);
const EVIDENCE_IDS=["ch5_p2_kavin_identity","ch5_p2_deployment_edit","ch5_p2_protected_visibility"];
const SOURCE_ORDER=["room","protected","deploy"];
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const gs=()=>{try{return state}catch(_){return window.state||null}};
const thai=()=>gs()?.language==="th"||document.documentElement.lang==="th";
const tr=(en,th)=>thai()?th:en;
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,Number(v)||0));
const clone=v=>JSON.parse(JSON.stringify(v));
const activeScreen=()=>$(".screen.active")?.id||gs()?.screen||"";
const soundOn=()=>gs()?.sound!==false;
const musicLevel=()=>soundOn()?clamp(gs()?.music??.33):0;
const sfxLevel=()=>soundOn()?clamp(gs()?.sfx??.55):0;
const isP2=()=>Number(gs()?.chapter)===5&&SCREENS.has(activeScreen());

let dialogue=null,dialogueActive=false,miniOpen=false,narinOpen=false,selectedSource="";
let backgroundPaused=false,backgroundSnapshot=null,registryInstalled=false,journalNoteTimer=0;
let installTimers=[];
const fadeFrames=new WeakMap();
let cardAutoTimer=0,cardAutoDeadline=0,cardAutoRemaining=3000;
const CARD_AUTO_MS=3000;
let p1HandoffInstalled=false;
let connectOpen=false,connectTimer=0,connectDeadline=0,connectRemaining=1700,connectPhase="idle";
const CONNECT_HANDSHAKE_MS=1900;
const CONNECT_ESTABLISHED_MS=260;

/* The workstation art is 864×1536. The physical LCD opening is measured in source-image pixels.
 * Positioning the HTML UI from these source coordinates (rather than viewport percentages) keeps
 * it glued to the actual monitor after object-fit:cover crops different phone aspect ratios. */
const WORKSTATION_SOURCE={w:864,h:1536};
const WORKSTATION_LCD={x:110,y:434,w:624,h:416};

function defaults(){return{
 started:false,phaseCardSeen:false,recordsIntroComplete:false,terminalOpened:false,
 sourceAssignments:{},sourceComplete:false,identityConfirmed:false,kittisakPossibleReviewed:false,
 attributionChoice:"",attributionComplete:false,narinActive:false,narinContactStarted:false,narinChannelEstablished:false,narinMusicActive:false,narinJournalUnlocked:false,journalFeedbackShown:false,narinLine:0,narinContactComplete:false,
 closingComplete:false,complete:false,stage:"phase-card"
}}
function phaseState(){
 const s=gs();if(!s)return null;s.flags=s.flags||{};
 const raw=s.flags.ch5_p2&&typeof s.flags.ch5_p2==="object"?s.flags.ch5_p2:{};
 const p=Object.assign(defaults(),raw);p.sourceAssignments=Object.assign({},raw.sourceAssignments||{});
 if(p.complete)Object.assign(p,{started:true,phaseCardSeen:true,recordsIntroComplete:true,terminalOpened:true,sourceComplete:true,identityConfirmed:true,kittisakPossibleReviewed:true,attributionChoice:"boundary",attributionComplete:true,narinActive:true,narinContactStarted:true,narinChannelEstablished:true,narinMusicActive:true,narinJournalUnlocked:true,narinContactComplete:true,closingComplete:true,stage:"complete"});
 if(p.narinContactComplete||p.complete||["narin-contact","closing","closing_complete"].includes(String(p.stage||"")))p.narinMusicActive=true;
 s.flags.ch5_p2=p;return p
}
function save(checkpoint){const s=gs();if(!s)return;if(checkpoint)s.checkpoint=checkpoint;try{typeof autoSave==="function"&&autoSave()}catch(_){} }
function setProgress(v){const s=gs();if(s)s.progress=Math.max(0,Math.min(100,Number(v)||0));syncProgress()}
function progressFor(){const p=phaseState();if(p?.complete||activeScreen()===COMPLETE)return 100;if(p?.narinContactComplete)return 94;if(p?.attributionComplete)return 82;if(p?.identityConfirmed)return 64;if(p?.sourceComplete)return 58;if(activeScreen()===WORK)return 34;if(activeScreen()===RECORDS)return p?.recordsIntroComplete?24:12;return 0}
function syncProgress(){const v=Math.max(Number(gs()?.progress)||0,progressFor());$$('.ch5-p2-progress-text').forEach(n=>n.textContent=Math.round(v)+"%");$$('.ch5-p2-progress-fill').forEach(n=>n.style.width=Math.round(v)+"%")}
function progressMarkup(){return '<div class="ch4-p5-progress ch5-p2-progress" aria-label="Phase progress"><span class="ch5-p2-progress-text">0%</span><div><i class="ch4-p5-progress-fill ch5-p2-progress-fill"></i></div></div>'}
function hud(labelId){return `<div class="topbar ch4-p5-topbar"><span id="${labelId}"></span><div class="hud"><button class="icon ch5-p2-save" type="button" aria-label="Save game">💾</button><button class="icon ch5-p2-menu" type="button" aria-label="Game menu">☰<i class="journal-alert" aria-hidden="true"></i></button></div></div>`}
function scene(id,image,labelId){return `<section id="${id}" class="screen ch4-p5-scene ch5-p2-scene"><img class="scene" src="${image}" alt=""><div class="ch4-p5-shade"></div>${hud(labelId)}<div id="${id}Scene" class="ch4-p5-label"></div><div id="${id}Objective" class="ch4-p5-objective"></div><div id="${id}Note" class="ch5-p2-scene-note"></div><div id="${id}Dialogue" class="dialogue ch4-p5-dialogue ch5-p2-dialogue hidden"></div><button id="${id}Action" class="primary ch4-p5-action ch5-p2-action" type="button" hidden></button>${progressMarkup()}</section>`}

function inject(){
 if($("#"+CARD))return true;const game=$("#game");if(!game)return false;
 game.insertAdjacentHTML("beforeend",`
 <section id="${CARD}" class="screen ch4-p4-location ch5-p2-card"><div id="ch5P2CardInner" class="ch4-p4-location-card"><div id="ch5P2CardEye" class="eyebrow"></div><div id="ch5P2CardCity" class="ch4-p4-location-city"></div><h2 id="ch5P2CardTitle"></h2><div class="ch4-p4-location-rule"></div><p id="ch5P2CardBody"></p></div></section>
 ${scene(RECORDS,BASE+"restricted-records-room.png?v=0230c5p2r6","ch5P2RecordsLocation")}
 ${scene(WORK,BASE+"restricted-workstation.png?v=0230c5p2r6","ch5P2WorkLocation")}
 <div id="ch5P2Monitor" class="ch5-p2-monitor-screen" hidden><div class="ch5-p2-monitor-glow"></div><div class="ch5-p2-monitor-ui"><div class="ch5-p2-monitor-head"><div><strong id="ch5P2MonitorTitle"></strong><br><small id="ch5P2MonitorSession"></small></div><small id="ch5P2MonitorFlag"></small></div><div class="ch5-p2-monitor-dashboard"><div class="ch5-p2-monitor-primary"><small>ACTIVE QUERY</small><div id="ch5P2MonitorState" class="ch5-p2-monitor-state"></div><div id="ch5P2MonitorSub" class="ch5-p2-monitor-sub"></div></div><div class="ch5-p2-monitor-path" aria-hidden="true"><div><small>SUBJECT</small><b>ROOM 1807</b></div><div><small>INDEX</small><b>PROTECTED</b></div><div><small>LOCAL</small><b>DEPLOYMENT</b></div></div></div><button id="ch5P2OpenRecon" class="primary ch5-p2-monitor-button" type="button"></button></div></div>
 <div id="ch5P2Recon" class="modal ch5-p2-modal" aria-hidden="true"><div class="modal-card"><header class="ch5-p2-modal-head"><div class="eyebrow" id="ch5P2ReconEye"></div><h3 id="ch5P2ReconTitle"></h3><p id="ch5P2ReconBody"></p><button id="ch5P2ReconClose" class="ghost ch5-p2-close" type="button" aria-label="Close">×</button><div class="ch5-p2-step"><span id="ch5P2ReconStep"></span><div><i id="ch5P2ReconStepFill"></i></div></div></header><div id="ch5P2ReconWork" class="ch5-p2-scroll"></div><div id="ch5P2ReconStatus" class="ch5-p2-status" aria-live="polite"></div><footer class="ch5-p2-modal-foot"><button id="ch5P2ReconReset" class="ghost" type="button"></button><button id="ch5P2ReconConfirm" class="primary" type="button"></button></footer></div></div>
 <div id="ch5P2Connect" class="modal ch5-p2-connect" aria-hidden="true"><div class="ch5-p2-connect-card"><div class="ch5-p2-connect-kicker" id="ch5P2ConnectKicker"></div><h3 id="ch5P2ConnectTitle"></h3><div class="ch5-p2-connect-route"><span id="ch5P2ConnectOrigin"></span><i aria-hidden="true"></i><span id="ch5P2ConnectEndpoint"></span></div><div class="ch5-p2-connect-steps" aria-hidden="true"><b></b><b></b><b></b></div><div id="ch5P2ConnectStatus" class="ch5-p2-connect-status"></div></div></div>
 <div id="ch5P2Narin" class="modal ch5-p2-narin-modal" aria-hidden="true"><div class="modal-card"><button id="ch5P2NarinClose" class="ghost ch5-p2-close" type="button" aria-label="Close">×</button><div class="ch5-p2-narin-shell"><div class="ch5-p2-narin-visual"><div class="ch5-p2-narin-feed"><div class="ch5-p2-narin-feed-label">SECURE REMOTE FEED</div><div class="ch5-p2-narin-feed-frame"><img id="ch5P2NarinImage" src="${BASE}narin-guarded.png?v=0233c5p2r9" alt=""></div></div></div><div class="ch5-p2-narin-copy"><div id="ch5P2NarinEye" class="eyebrow"></div><h3>NARIN</h3><div id="ch5P2NarinRole" class="ch5-p2-narin-role"></div><div class="ch5-p2-narin-line"><div class="ch5-p2-narin-speaker-row"><div id="ch5P2NarinSpeaker" class="ch5-p2-narin-speaker"></div><span id="ch5P2NarinChannel" class="ch5-p2-narin-channel"></span><img id="ch5P2BenedictMini" class="ch5-p2-benedict-mini" src="assets/images/381e0e1f9a98101c.jpg" alt="Benedict"></div><div id="ch5P2NarinText" class="ch5-p2-narin-text"></div></div><button id="ch5P2NarinNext" class="primary" type="button"></button><div id="ch5P2NarinCounter" class="ch5-p2-narin-next"></div></div></div></div></div>
 <div id="ch5P2JournalToast" class="ch5-p2-journal-toast" role="status" aria-live="polite" aria-atomic="true"><small>CHARACTER JOURNAL UPDATED</small><strong>NARIN HAS BEEN ADDED TO THE CHARACTER JOURNAL</strong></div>
 <section id="${COMPLETE}" class="screen ch4-p4-complete ch5-p2-complete"><div class="ch4-p4-complete-card"><div id="ch5P2CompleteEye" class="eyebrow"></div><h2 id="ch5P2CompleteTitle"></h2><div class="ch4-p4-location-rule"></div><p id="ch5P2CompleteBody"></p><div class="ch4-p4-complete-grid"><div><span id="ch5P2ResultIdentity"></span><b id="ch5P2ValueIdentity"></b></div><div><span id="ch5P2ResultNarin"></span><b id="ch5P2ValueNarin"></b></div><div><span id="ch5P2ResultRecord"></span><b id="ch5P2ValueRecord"></b></div><div><span id="ch5P2ResultAttribution"></span><b id="ch5P2ValueAttribution"></b></div></div><strong id="ch5P2Next"></strong><button id="ch5P2ReturnTitle" class="primary" type="button"></button></div>${progressMarkup()}</section>
 <audio id="ch5P2MusicA" preload="auto" loop><source src="${AUDIO}restricted-identity.webm?v=0233c5p2a3" type="audio/webm"><source src="${AUDIO}restricted-identity.mp3?v=0233c5p2a3" type="audio/mpeg"></audio>
 <audio id="ch5P2RoomTone" preload="auto" loop src="${AUDIO}restricted-room-tone.wav?v=0230c5p2r6"></audio>
 <audio id="ch5P2Reveal" preload="auto" src="${AUDIO}kavin-reveal.wav?v=0230c5p2r6"></audio>`);
 const work=$("#"+WORK),monitor=$("#ch5P2Monitor");if(work&&monitor){work.appendChild(monitor);monitor.hidden=false;const image=$(":scope > img.scene",work);image?.addEventListener("load",positionMonitorOverlay,{once:true});requestAnimationFrame(positionMonitorOverlay)}
 bindUi();updateLanguage();syncProgress();registerContent();return true
}

function positionMonitorOverlay(){
 const work=$("#"+WORK),image=work?.querySelector(":scope > img.scene"),monitor=$("#ch5P2Monitor");if(!work||!image||!monitor)return false;
 const box=work.getBoundingClientRect(),iw=Number(image.naturalWidth)||WORKSTATION_SOURCE.w,ih=Number(image.naturalHeight)||WORKSTATION_SOURCE.h;if(!box.width||!box.height||!iw||!ih)return false;
 const scale=Math.max(box.width/iw,box.height/ih),renderedW=iw*scale,renderedH=ih*scale;
 const cropX=(box.width-renderedW)/2,cropY=(box.height-renderedH)/2;
 const left=cropX+WORKSTATION_LCD.x*scale,top=cropY+WORKSTATION_LCD.y*scale,width=WORKSTATION_LCD.w*scale,height=WORKSTATION_LCD.h*scale;
 monitor.style.left=Math.round(left)+"px";monitor.style.top=Math.round(top)+"px";monitor.style.width=Math.round(width)+"px";monitor.style.height=Math.round(height)+"px";return true
}

function cancelFade(media){const f=fadeFrames.get(media);if(f){cancelAnimationFrame(f);fadeFrames.delete(media)}}
function fade(media,target,duration=420,onDone){
 if(!media){onDone?.();return}cancelFade(media);target=clamp(target,0,.72);const start=clamp(media.volume),began=performance.now();
 const step=now=>{if(document.hidden||backgroundPaused){fadeFrames.delete(media);return}const q=clamp((now-began)/Math.max(1,duration)),smooth=q*q*(3-2*q);media.volume=start+(target-start)*smooth;if(q<1)fadeFrames.set(media,requestAnimationFrame(step));else{fadeFrames.delete(media);onDone?.()}};
 fadeFrames.set(media,requestAnimationFrame(step))
}
function openSave(){try{window.LastWitnessSaveManager?.open?.("save")}catch(_){} }
function openMenu(){try{$("#drawer")?.classList.add("open")}catch(_){} }
function media(id){return $("#"+id)}
function playOne(id,mult=.5){const a=media(id);if(!a||!soundOn())return;try{a.currentTime=0;a.volume=clamp(sfxLevel()*mult,0,.5);a.play().catch(()=>{})}catch(_){} }

let secureCallCtx=null,secureCallBuffer=null,secureCallBufferPromise=null,secureCallSource=null,secureCallGain=null,secureCallOffset=0,secureCallStartedAt=0;
let scoreDuckSource=null,scoreDuckGain=null,scoreDuckMedia=null;
const CONNECT_RELATIVE_GAIN=Math.pow(10,-28/20);
function ensureScoreDuckBridge(){
 const a=scoreMedia(),ctx=secureAudioContext();if(!a||!ctx||typeof ctx.createMediaElementSource!=="function"||typeof ctx.createGain!=="function")return null;
 if(scoreDuckGain&&scoreDuckMedia===a)return{ctx,gain:scoreDuckGain};
 if(scoreDuckSource||scoreDuckGain)return null;
 try{const source=ctx.createMediaElementSource(a),gain=ctx.createGain();gain.gain.value=1;source.connect(gain).connect(ctx.destination);scoreDuckSource=source;scoreDuckGain=gain;scoreDuckMedia=a;return{ctx,gain}}catch(_){return null}
}
function setRelativeScoreGain(target,duration=100,allowCreate=true){
 const bridge=allowCreate?ensureScoreDuckBridge():(scoreDuckGain&&secureCallCtx?{ctx:secureCallCtx,gain:scoreDuckGain}:null);if(!bridge)return false;const ctx=bridge.ctx,g=bridge.gain.gain,now=ctx.currentTime,to=clamp(target,0,1),seconds=Math.max(.01,Number(duration||0)/1000);
 try{g.cancelScheduledValues(now);g.setValueAtTime(clamp(g.value,0,1),now);g.linearRampToValueAtTime(to,now+seconds);return true}catch(_){try{g.value=to;return true}catch(__){return false}}
}
function engageSecureConnectDuck(){const ctx=secureAudioContext();if(!ctx)return Promise.resolve(false);const resume=ctx.state==="suspended"?ctx.resume().catch(()=>false):Promise.resolve(true);return Promise.resolve(resume).then(()=>ctx.state==="running"?setRelativeScoreGain(CONNECT_RELATIVE_GAIN,100,true):false).catch(()=>false)}
function releaseSecureConnectDuck(duration=700){return setRelativeScoreGain(1,duration,false)}
function resetSecureConnectDuck(){if(!scoreDuckGain)return false;const ctx=secureCallCtx;try{const now=ctx?.currentTime||0;scoreDuckGain.gain.cancelScheduledValues(now);scoreDuckGain.gain.setValueAtTime(1,now);return true}catch(_){try{scoreDuckGain.gain.value=1;return true}catch(__){return false}}}
function resumeScoreDuckContext(){const ctx=secureCallCtx;if(!scoreDuckGain||!ctx||ctx.state!=="suspended")return Promise.resolve(true);return ctx.resume().then(()=>true).catch(()=>false)}
function secureAudioContext(){try{const C=window.AudioContext||window.webkitAudioContext;if(!C)return null;if(!secureCallCtx)secureCallCtx=new C();return secureCallCtx}catch(_){return null}}
function preloadHandshakeBuffer(){if(secureCallBuffer)return Promise.resolve(secureCallBuffer);if(secureCallBufferPromise)return secureCallBufferPromise;const ctx=secureAudioContext();if(!ctx)return Promise.resolve(null);secureCallBufferPromise=fetch(AUDIO+"secure-call-establish.wav?v=0231c5p2c2",{cache:"force-cache"}).then(r=>{if(!r.ok)throw new Error("handshake "+r.status);return r.arrayBuffer()}).then(b=>ctx.decodeAudioData(b.slice(0))).then(buf=>secureCallBuffer=buf).catch(()=>null);return secureCallBufferPromise}
function stopHandshakePlayback(reset=false){const ctx=secureCallCtx;if(secureCallSource){if(ctx&&secureCallStartedAt>0)secureCallOffset=Math.max(0,secureCallOffset+(ctx.currentTime-secureCallStartedAt));try{secureCallSource.onended=null;secureCallSource.stop()}catch(_){};try{secureCallSource.disconnect()}catch(_){};secureCallSource=null}secureCallStartedAt=0;if(reset)secureCallOffset=0}
function playHandshake(reset=false){if(!soundOn()||sfxLevel()<=0)return Promise.resolve(false);if(reset)stopHandshakePlayback(true);const ctx=secureAudioContext();if(!ctx)return Promise.resolve(false);const resume=ctx.state==="suspended"?ctx.resume().catch(()=>false):Promise.resolve(true);return resume.then(()=>preloadHandshakeBuffer()).then(buf=>{if(!buf||ctx.state!=="running")return false;stopHandshakePlayback(false);const src=ctx.createBufferSource(),gain=ctx.createGain(),offset=Math.max(0,Math.min(secureCallOffset,Math.max(0,buf.duration-.02)));gain.gain.value=clamp(sfxLevel()*.95,0,.72);src.buffer=buf;src.connect(gain).connect(ctx.destination);secureCallSource=src;secureCallGain=gain;secureCallStartedAt=ctx.currentTime;src.onended=()=>{if(secureCallSource===src){secureCallSource=null;secureCallStartedAt=0;secureCallOffset=0}};try{src.start(0,offset);return true}catch(_){secureCallSource=null;secureCallStartedAt=0;return false}}).catch(()=>false)}
function pauseHandshakePlayback(){stopHandshakePlayback(false)}

let activeScoreMode="a",audioWatchdogTimer=0,foregroundGesturePending=false,scoreLoopTailArmed=false;
function scoreMode(){return "a"}
function dbGain(db){return Math.pow(10,Number(db||0)/20)}
function scoreBaseTarget(){return isP2()&&soundOn()?clamp(musicLevel()*.28,0,.30):0}
function scoreTarget(){
 const base=scoreBaseTarget();if(base<=0)return 0;
 if(connectOpen)return clamp(base*dbGain(-28.0),0,.30);
 if(narinOpen)return clamp(base*dbGain(-2.8),0,.30);
 if(dialogueActive)return clamp(base*dbGain(-2.0),0,.30);
 return base
}
function roomTarget(){return isP2()&&soundOn()&&!connectOpen?clamp(sfxLevel()*.045,0,.055):0}
function scoreMedia(){return media("ch5P2MusicA")}
function isPlaying(a){return Boolean(a&&!a.paused&&!a.ended)}
function pauseElement(a){if(!a)return;cancelFade(a);try{a.pause()}catch(_){} }
function finiteMediaTime(a){const n=Number(a?.currentTime);return Number.isFinite(n)&&n>=0?n:0}
function restoreMediaPosition(a,time){try{if(Number.isFinite(time)&&Math.abs(finiteMediaTime(a)-time)>.04)a.currentTime=time}catch(_){} }
function installSoftLoopEnvelope(){
 const a=scoreMedia();if(!a||a.dataset.ch5P2SoftLoop==="1")return false;a.dataset.ch5P2SoftLoop="1";
 a.addEventListener("timeupdate",()=>{
  if(!isP2()||document.hidden||backgroundPaused||!soundOn())return;
  const d=Number(a.duration),t=finiteMediaTime(a);if(!Number.isFinite(d)||d<4)return;
  if(!scoreLoopTailArmed&&t>=Math.max(0,d-1.15)){
   scoreLoopTailArmed=true;const target=scoreTarget();if(target>0)fade(a,Math.max(.004,target*.42),620)
  }else if(scoreLoopTailArmed&&t<.70){
   scoreLoopTailArmed=false;const target=scoreTarget();if(target>0)fade(a,target,820)
  }
 });
 return true
}
function playPreservingTime(a,volume){
 if(!a||document.hidden||backgroundPaused||!soundOn())return Promise.resolve(false);
 try{
  a.loop=true;a.muted=false;installSoftLoopEnvelope();const target=clamp(volume,0,.72);
  if(isPlaying(a)){fade(a,target,260);return Promise.resolve(true)}
  a.volume=Math.min(target,Math.max(.008,target*.22));const result=a.play();
  const promise=result&&typeof result.then==="function"?result:Promise.resolve();
  return promise.then(()=>{foregroundGesturePending=false;fade(a,target,900);return true}).catch(()=>{foregroundGesturePending=true;return false})
 }catch(_){foregroundGesturePending=true;return Promise.resolve(false)}
}
function ensureRoomTone(){
 const room=media("ch5P2RoomTone");if(!room)return;
 const target=roomTarget();try{room.loop=true;room.muted=false;if(target>0){room.volume=target;if(room.paused){const r=room.play();if(r&&typeof r.catch==="function")r.catch(()=>{})}}else room.pause()}catch(_){}
}
function ensureScorePlaying(fromGesture=false){
 if(!isP2()||document.hidden||backgroundPaused||!soundOn())return false;
 const a=scoreMedia(),target=scoreTarget();if(!a||target<=0){pauseElement(a);const room=media("ch5P2RoomTone");if(room)room.pause();return false}
 activeScoreMode="a";installSoftLoopEnvelope();
 /* Professional single-track mix:
  * fast, smooth duck under the secure-connect signal; slower release when Narin appears.
  * This changes gain only — never pause/seek/restart the accepted Track A stream. */
 const fadeMs=connectOpen?100:(narinOpen?700:(dialogueActive?300:(fromGesture?180:360)));
 if(isPlaying(a)){foregroundGesturePending=false;try{a.muted=false}catch(_){};fade(a,target,fadeMs)}
 else void playPreservingTime(a,target);
 ensureRoomTone();return isPlaying(a)
}
function syncAudio(){
 if(!isP2()){[scoreMedia(),media("ch5P2RoomTone")].forEach(pauseElement);return false}
 if(document.hidden||backgroundPaused)return false;
 return ensureScorePlaying(false)
}
function scheduleAudioStability(){[0,90,240,600,1200].forEach(ms=>setTimeout(()=>{if(isP2()&&!document.hidden&&!backgroundPaused&&soundOn())ensureScorePlaying(false)},ms))}
function startAudioWatchdog(){if(audioWatchdogTimer)return;audioWatchdogTimer=setInterval(()=>{if(isP2()&&!document.hidden&&!backgroundPaused&&soundOn())ensureScorePlaying(false)},1200)}
function stopAudioWatchdog(){clearInterval(audioWatchdogTimer);audioWatchdogTimer=0}
function stopAudio(reset=false){
 const a=scoreMedia();[a,media("ch5P2RoomTone"),media("ch5P2Reveal")].forEach(x=>{if(!x)return;cancelFade(x);try{x.pause();if(reset)x.currentTime=0;if(x!==media("ch5P2RoomTone"))x.volume=0}catch(_){}});stopHandshakePlayback(reset);resetSecureConnectDuck();activeScoreMode="a";scoreLoopTailArmed=false;foregroundGesturePending=false
}
function stopForeignMedia(){try{window.LastWitnessChapter5Phase1?.stopAudio?.(true)}catch(_){};["LastWitnessChapter4Phase8","LastWitnessChapter4Phase7","LastWitnessChapter4Phase6","LastWitnessChapter4Phase5","LastWitnessChapter4Phase4","LastWitnessChapter4Phase3","LastWitnessChapter4Phase2","LastWitnessChapter4Phase1"].forEach(name=>{try{window[name]?.stopAudio?.(true)}catch(_){}});try{typeof stopLoops==="function"&&stopLoops()}catch(_){} }
function clearCardAuto(reset=true){if(cardAutoTimer){clearTimeout(cardAutoTimer);cardAutoTimer=0}cardAutoDeadline=0;if(reset)cardAutoRemaining=CARD_AUTO_MS}
function scheduleCardAuto(reset=true){clearCardAuto(reset);if(reset)cardAutoRemaining=CARD_AUTO_MS;if(activeScreen()!==CARD)return;const delay=Math.max(0,Number(cardAutoRemaining)||CARD_AUTO_MS);cardAutoDeadline=Date.now()+delay;cardAutoTimer=setTimeout(()=>{cardAutoTimer=0;cardAutoDeadline=0;cardAutoRemaining=CARD_AUTO_MS;if(activeScreen()===CARD)showRecords()},delay)}
function pauseCardAuto(){if(!cardAutoTimer)return;cardAutoRemaining=Math.max(0,cardAutoDeadline-Date.now());clearTimeout(cardAutoTimer);cardAutoTimer=0;cardAutoDeadline=0}
function resumeCardAuto(){if(activeScreen()===CARD&&!cardAutoTimer)scheduleCardAuto(false)}
function p2MediaSnapshotRecord(id,a){
 if(!a)return null;let shouldResume=isPlaying(a);if(id==="ch5P2MusicA"&&!shouldResume)shouldResume=finiteMediaTime(a)>.02;
 return{id,time:finiteMediaTime(a),volume:Number.isFinite(Number(a.volume))?Number(a.volume):1,muted:Boolean(a.muted),playbackRate:Number.isFinite(Number(a.playbackRate))?Number(a.playbackRate):1,wasPlaying:shouldResume}
}
function pauseCapturedMedia(a,record){if(!a||!record)return;cancelFade(a);try{a.pause();restoreMediaPosition(a,record.time)}catch(_){} }
function pauseForBackground(){
 if(backgroundPaused||!isP2())return false;pauseCardAuto();pauseConnectionTransition();pauseHandshakePlayback();
 const ids=["ch5P2MusicA","ch5P2RoomTone"],records={};ids.forEach(id=>{const a=media(id),record=p2MediaSnapshotRecord(id,a);if(record)records[id]=record});
 backgroundSnapshot={activeMode:"a",desiredMode:"a",records};backgroundPaused=true;
 const a=scoreMedia();if(a){cancelFade(a);try{a.volume=0}catch(_){}};const room=media("ch5P2RoomTone");if(room)pauseElement(room);return true
}
function armForegroundGestureRecovery(){if(isP2()&&!document.hidden&&soundOn())foregroundGesturePending=true}
function resumePreviouslyAuthorizedMedia(a,record){
 if(!a||!record?.wasPlaying||!soundOn()||!isP2())return Promise.resolve(false);
 const finalMuted=record.muted,finalVolume=record.volume,start=Math.max(0,Number(record.time)||0);restoreMediaPosition(a,start);a.loop=true;
 const restoreLevel=()=>{try{a.muted=finalMuted;a.volume=finalVolume}catch(_){}};
 if(isPlaying(a)){restoreLevel();return Promise.resolve(true)}
 try{a.muted=true;a.volume=0;const result=a.play(),promise=result&&typeof result.then==="function"?result:Promise.resolve();return promise.then(()=>{restoreLevel();return true}).catch(()=>{restoreLevel();armForegroundGestureRecovery();return false})}catch(_){restoreLevel();armForegroundGestureRecovery();return Promise.resolve(false)}
}
function retryForegroundAudio(){
 if(document.hidden||backgroundPaused||!isP2()||!soundOn())return false;void resumeScoreDuckContext();const a=scoreMedia();if(!isPlaying(a))armForegroundGestureRecovery();else foregroundGesturePending=false;ensureScorePlaying(false);return Boolean(isPlaying(a))
}
function resumeForeground(){
 if(document.hidden)return false;const snap=backgroundSnapshot;
 if(backgroundPaused){
  backgroundPaused=false;activeScoreMode="a";const records=snap?.records||{},a=scoreMedia(),record=records.ch5P2MusicA;
  if(a&&record){restoreMediaPosition(a,record.time);try{a.playbackRate=record.playbackRate;a.muted=record.muted;a.volume=record.volume}catch(_){};resumePreviouslyAuthorizedMedia(a,record).then(ok=>{if(ok){foregroundGesturePending=false;ensureScorePlaying(false)}else armForegroundGestureRecovery()})}
  const roomRecord=records.ch5P2RoomTone,room=media("ch5P2RoomTone");if(room&&roomRecord){restoreMediaPosition(room,roomRecord.time);try{room.playbackRate=roomRecord.playbackRate;room.muted=roomRecord.muted;room.volume=roomRecord.volume}catch(_){};if(roomRecord.wasPlaying){const r=room.play();if(r&&typeof r.catch==="function")r.catch(()=>{})}}
  backgroundSnapshot=null;resumeCardAuto();resumeConnectionTransition()
 }
 if(!isP2())return false;scheduleAudioStability();retryForegroundAudio();return true
}
function queueForegroundResume(){[0,80,220,520,1000,1800].forEach(ms=>setTimeout(()=>{if(!document.hidden){if(backgroundPaused)resumeForeground();else retryForegroundAudio()}},ms))}
function guardBackgroundP2Play(event){
 if(!backgroundPaused)return;const a=event.target;if(!a||a===scoreMedia())return;const record=a?.id?backgroundSnapshot?.records?.[a.id]:null;if(record)pauseCapturedMedia(a,record)
}
function foregroundGestureRecovery(){
 if(document.hidden||backgroundPaused||!isP2()||!soundOn())return;void resumeScoreDuckContext();const a=scoreMedia();if(foregroundGesturePending||!isPlaying(a)){foregroundGesturePending=false;ensureScorePlaying(true)}resumeConnectionTransition()
}

function positionSceneNotes(){
 requestAnimationFrame(()=>{
  [RECORDS,WORK].forEach(id=>{const screen=$("#"+id),objective=$("#"+id+"Objective"),note=$("#"+id+"Note");if(!screen||!objective||!note||!screen.classList.contains("active"))return;const sr=screen.getBoundingClientRect(),or=objective.getBoundingClientRect();if(or.height>0)note.style.top=Math.round(or.bottom-sr.top+6)+"px"})
 })
}
function safeShow(id){
 if(typeof show==="function")show(id);if(!$("#"+id)?.classList.contains("active")){$$(".screen").forEach(n=>n.classList.remove("active"));$("#"+id)?.classList.add("active");if(gs())gs().screen=id}
 gs().chapter=5;syncProgress();updateLanguage();positionSceneNotes();syncAudio();scheduleAudioStability()
}
function originalPortrait(name,emotion){try{if(name==="Narin")return BASE+`narin-${emotion||"neutral"}.png?v=0230c5p2r6`;if(typeof portrait==="function")return portrait(name,emotion||"neutral");return PORTRAITS?.[name]?.[emotion||"neutral"]||PORTRAITS?.[name]?.neutral||""}catch(_){return""}}
function dialogueBox(){return $("#"+activeScreen()+"Dialogue")}
function recordLine(line){try{const s=gs();s.history=s.history||[];s.history.push({speaker:line.speaker,text:thai()?line.th:line.en,chapter:5,phase:2})}catch(_){} }
function renderDialogue(){const box=dialogueBox();if(!box||!dialogue)return;const line=dialogue.lines[dialogue.i];if(!line)return;const src=originalPortrait(line.speaker,line.emotion||"neutral"),speakerKey=String(line.speaker||"character").toLowerCase().replace(/[^a-z0-9]+/g,"-");const cls=["portrait","ch5-p2-portrait"];if(line.speaker==="Narin")cls.push("ch5-p2-narin-portrait");const next=tr("Tap&nbsp;to&nbsp;continue","แตะเพื่อดำเนินต่อ"),remoteMeta=line.remote?tr("BENEDICT'S CONDO · SAFE LOCATION · REMOTE","คอนโดของ BENEDICT · จุดปลอดภัย · REMOTE"):"";box.className=`dialogue ch4-p5-dialogue ch5-p2-dialogue ch5-p2-speaker-${speakerKey} right${line.remote?" ch5-p2-remote-dialogue":""}`;box.innerHTML=`<div class="portrait-wrap">${src?`<img class="${cls.join(" ")}" src="${src}" alt="">`:""}</div><div class="dialogue-copy"><div class="speaker">${line.speaker}${line.remote?' <span class="ch5-p2-remote-tag">· SECURE COMMS</span>':''}</div>${line.remote?`<div class="ch5-p2-remote-meta">${remoteMeta}</div>`:""}<div class="line">${thai()?line.th:line.en}</div></div><div class="next">${next}</div>`;box.classList.remove("hidden");dialogueActive=true}
function startDialogue(lines,onDone){dialogue={lines:clone(lines),i:0,onDone};recordLine(dialogue.lines[0]);renderDialogue()}
function advanceDialogue(){if(!dialogue)return;dialogue.i++;if(dialogue.i>=dialogue.lines.length){const done=dialogue.onDone;dialogue=null;dialogueActive=false;dialogueBox()?.classList.add("hidden");done?.();return}recordLine(dialogue.lines[dialogue.i]);renderDialogue()}

function openingLines(){return[
 {speaker:"Benedict",emotion:"thinking",en:"Room 1807 gave us a body before it gave us a name.",th:"ห้อง 1807 ให้ศพกับเราก่อนจะยอมให้ชื่อ"},
 {speaker:"North",emotion:"analytical",remote:true,en:"The protected reference from Jakarta is enough to ask the archive a better question.",th:"ข้อมูลอ้างอิงที่ถูกปกป้องจาก Jakarta มากพอให้เราถามคลังข้อมูลด้วยคำถามที่ถูกกว่าเดิม"},
 {speaker:"Benedict",emotion:"serious",en:"And not enough to accuse anyone.",th:"แต่ยังไม่มากพอจะกล่าวหาใคร"},
 {speaker:"North",emotion:"dry",remote:true,en:"You remembered the rules. I'm touched.",th:"ยังจำกติกาได้ด้วย ซึ้งเลยนะ"},
 {speaker:"Benedict",emotion:"smirk",en:"Write it down. It may not happen twice.",th:"จดไว้เลย เดี๋ยวอาจไม่มีครั้งที่สอง"}
]}
function postMatchLines(){return[
 {speaker:"North",emotion:"serious",remote:true,en:"There. The Room 1807 victim wasn't anonymous. He was hidden.",th:"เจอแล้ว ผู้ตายในห้อง 1807 ไม่ได้ไร้ชื่อ เขาถูกซ่อนชื่อ"},
 {speaker:"Benedict",emotion:"serious",en:"Kavin Nopparat.",th:"Kavin Nopparat"},
 {speaker:"North",emotion:"concerned",remote:true,en:"And the Bangkok deployment record was changed after he disappeared.",th:"แล้วบันทึกการ Deploy ฝั่งกรุงเทพฯ ถูกแก้หลังจากเขาหายตัวไป"},
 {speaker:"Benedict",emotion:"thinking",en:"Who had trusted local access?",th:"ใครมีสิทธิ์เข้าถึงงาน Deploy ในพื้นที่แบบที่ระบบไว้ใจ"},
 {speaker:"North",emotion:"analytical",remote:true,en:"Narin did. That makes him relevant. It doesn't make him the killer.",th:"Narin มี แต่นั่นทำให้เขาเกี่ยวข้อง ไม่ได้ทำให้เขากลายเป็นฆาตกร"},
 {speaker:"Benedict",emotion:"determined",en:"Then we ask the question he doesn't want on the record.",th:"งั้นเราถามคำถามที่เขาไม่อยากให้มีอยู่ในบันทึก"}
]}
function closingLines(){return[
 {speaker:"North",emotion:"skeptical",remote:true,en:"He protected the deployment, not the explanation.",th:"เขาปกป้องข้อมูล Deploy แต่ไม่ได้ให้คำอธิบาย"},
 {speaker:"Benedict",emotion:"serious",en:"And a protected identity was visible inside Bangkok before it was visible to us.",th:"และตัวตนที่ถูกปกป้องมองเห็นได้จากฝั่งกรุงเทพฯ ก่อนที่เราจะเห็น"},
 {speaker:"North",emotion:"analytical",remote:true,en:"Kittisak may have known the name earlier. May. Not proved.",th:"Kittisak อาจรู้ชื่อนี้ก่อนเรา แค่อาจ ยังพิสูจน์ไม่ได้"},
 {speaker:"Benedict",emotion:"thinking",en:"Good. Phase III gets the map. We keep the verbs separate from the names.",th:"ดี เฟส III ค่อยวางทุกอย่างบนแผนผัง เราจะแยกสิ่งที่แต่ละคนทำออกจากชื่อของเขาให้ชัด"}
]}
const NARIN_LINES=[
 {speaker:"Benedict",emotion:"guarded",en:"You knew Kavin Nopparat.",th:"คุณรู้จัก Kavin Nopparat"},
 {speaker:"Narin",emotion:"guarded",en:"I knew the deployment he was attached to.",th:"ผมรู้จักงาน Deploy ที่เขาเกี่ยวข้อง"},
 {speaker:"Benedict",emotion:"guarded",en:"A deployment record changed after he disappeared.",th:"บันทึกการ Deploy ถูกแก้หลังจากเขาหายตัวไป"},
 {speaker:"Narin",emotion:"pressured",en:"Because the record was wrong before anyone touched it.",th:"เพราะบันทึกนั้นผิดอยู่ก่อนแล้ว ก่อนที่ใครจะเข้าไปแก้"},
 {speaker:"Benedict",emotion:"guarded",en:"Who changed it?",th:"ใครเป็นคนแก้"},
 {speaker:"Narin",emotion:"defensive",en:"I'm not answering that on an unsecured line.",th:"ผมจะไม่ตอบเรื่องนั้นผ่านสายที่ไม่ปลอดภัย"},
 {speaker:"Benedict",emotion:"guarded",en:"That's not a denial.",th:"นั่นไม่ใช่คำปฏิเสธ"},
 {speaker:"Narin",emotion:"pensive",en:"No. It's a boundary.",th:"ไม่ใช่ มันคือเส้นที่ผมจะไม่ข้าม"}
];

const SOURCES={
 room:{tag:"PRIMARY SUBJECT",en:"ROOM 1807 SUBJECT",th:"ข้อมูลผู้ตาย · ห้อง 1807",detailEn:"Victim file · legal identity redacted at source.",detailTh:"แฟ้มผู้ตาย · ชื่อตามกฎหมายถูกปิดจากข้อมูลต้นทาง"},
 protected:{tag:"RESTRICTED LEGACY",en:"PROTECTED IDENTITY INDEX",th:"ดัชนีตัวตนที่ได้รับการปกป้อง",detailEn:"Shielded identity path · manual reconciliation required.",detailTh:"เส้นทางตัวตนที่ถูกปกป้อง · ต้อง Reconcile แบบกำกับสิทธิ์"},
 deploy:{tag:"LOCAL OPERATIONS",en:"BANGKOK DEPLOYMENT ARCHIVE",th:"คลังบันทึกการ Deploy · กรุงเทพฯ",detailEn:"Trusted local deployment record · post-disappearance edit marker.",detailTh:"บันทึก Deploy ที่ระบบเชื่อถือ · พบเครื่องหมายการแก้ไขหลังการหายตัว"},
 hotel:{tag:"EXHAUSTED SOURCE",en:"HOTEL GUEST MANIFEST",th:"รายชื่อผู้เข้าพักโรงแรม",detailEn:"Proxy identity already exhausted in the Room 1807 inquiry.",detailTh:"ตัวตน Proxy ถูกตรวจจนสุดทางแล้วในคดีห้อง 1807"},
 custody:{tag:"CHAIN RECORD",en:"EVIDENCE CUSTODY LOG",th:"บันทึกสายการครอบครองหลักฐาน",detailEn:"Valid handling record · not an identity bridge.",detailTh:"บันทึกการครอบครองถูกต้อง · ไม่ใช่เส้นทางเชื่อมตัวตน"}
};
function sourceName(id){const r=SOURCES[id];return thai()?r.th:r.en}
function reconStatus(text="",kind=""){const n=$("#ch5P2ReconStatus");if(!n)return;n.textContent=text;n.className="ch5-p2-status"+(kind?" "+kind:"")}
function renderRecon(){
 const p=phaseState(),work=$("#ch5P2ReconWork");if(!work)return;
 if(!p.identityConfirmed){
  $("#ch5P2ReconStep").textContent=tr("STEP 1 / 2 · SOURCE BRIDGE","ขั้น 1 / 2 · เชื่อมแหล่งข้อมูล");$("#ch5P2ReconStepFill").style.width="50%";
  const order=["room","protected","deploy","custody","hotel"];
  const assigned=new Set(Object.values(p.sourceAssignments));
  work.innerHTML=`<div class="ch5-p2-bridge-map">${[1,2,3].map(slot=>{const id=p.sourceAssignments[slot];return `<button class="ch5-p2-slot${id?" filled":""}" type="button" data-c5p2-slot="${slot}"><small>${tr(`BRIDGE ${slot}`,`ลำดับ ${slot}`)}</small><strong>${id?sourceName(id):tr("SELECT SOURCE","เลือกแหล่งข้อมูล")}</strong></button>`}).join("")}</div><div class="ch5-p2-source-grid">${order.map(id=>{const r=SOURCES[id],selected=assigned.has(id);return `<button class="ch5-p2-source${selected?" selected":""}" type="button" data-c5p2-source="${id}" aria-pressed="${selected}"><small>${r.tag}</small><b>${thai()?r.th:r.en}</b><span>${thai()?r.detailTh:r.detailEn}</span></button>`}).join("")}</div>`;
  $("#ch5P2ReconReset").hidden=false;$("#ch5P2ReconReset").textContent=tr("RESET","เริ่มใหม่");$("#ch5P2ReconConfirm").textContent=tr("CONFIRM BRIDGE","ยืนยันการเชื่อม");reconStatus();return
 }
 $("#ch5P2ReconStep").textContent=tr("STEP 2 / 2 · ATTRIBUTION BOUNDARY","ขั้น 2 / 2 · ขอบเขตการระบุตัวผู้กระทำ");$("#ch5P2ReconStepFill").style.width="100%";
 const selected=p.attributionChoice,readonly=p.attributionComplete;
 work.innerHTML=`<div class="ch5-p2-match-compact"><div class="ch5-p2-kavin"><img src="${BASE}kavin-nopparat.png?v=0230c5p2r6" alt=""></div><div class="ch5-p2-match-copy"><div class="eyebrow">${tr("IDENTITY MATCH · CONFIRMED","ยืนยันการจับคู่ตัวตน")}</div><h4>Kavin Nopparat</h4><p>${tr("Room 1807 resolves to Kavin Nopparat. A linked Bangkok deployment record was edited after he disappeared.","ห้อง 1807 ยืนยันตัวตนเป็น Kavin Nopparat และบันทึก Deployment กรุงเทพฯ ที่เชื่อมกันถูกแก้หลังจากเขาหายตัวไป")}</p><div class="ch5-p2-proof-row"><span><b>${tr("SUPPORTED","รองรับ")}</b>${tr("Narin had trusted deployment access.","Narin มีสิทธิ์ Deployment ที่ระบบไว้ใจ")}</span><span><b>${tr("NOT PROVED","ยังไม่พิสูจน์")}</b>${tr("Who owned the murder decision.","ใครเป็นเจ้าของการตัดสินใจฆาตกรรม")}</span></div></div></div><div class="ch5-p2-conclusions"><button class="ch5-p2-conclusion${selected==="killer"?" selected":""}" data-c5p2-conclusion="killer" type="button" ${readonly?"disabled":""}><small>${tr("OVERREACH","สรุปเกินหลักฐาน")}</small>${tr("The altered record proves Narin killed Kavin.","บันทึกที่ถูกแก้พิสูจน์ว่า Narin ฆ่า Kavin")}</button><button class="ch5-p2-conclusion${selected==="boundary"?" selected":""}" data-c5p2-conclusion="boundary" type="button" ${readonly?"disabled":""}><small>${tr("EVIDENCE BOUNDARY","ขอบเขตหลักฐาน")}</small>${tr("Narin's access and concealment are supported. Murder attribution is not.","หลักฐานรองรับสิทธิ์เข้าถึงและการปกปิดของ Narin แต่ยังไม่รองรับการระบุว่าเขาเป็นฆาตกร")}</button><button class="ch5-p2-conclusion${selected==="kittisak"?" selected":""}" data-c5p2-conclusion="kittisak" type="button" ${readonly?"disabled":""}><small>${tr("OVERREACH","สรุปเกินหลักฐาน")}</small>${tr("Earlier visibility proves Kittisak ordered the concealment.","การมองเห็นข้อมูลก่อนหน้าพิสูจน์ว่า Kittisak สั่งปกปิด")}</button></div>`;
 $("#ch5P2ReconReset").hidden=true;$("#ch5P2ReconConfirm").textContent=readonly?tr("CLOSE RECORD","ปิดบันทึก"):tr("CONFIRM FINDING","ยืนยันข้อสรุป");if(readonly)reconStatus(tr("VERIFIED RECORD · ATTRIBUTION REMAINS UNRESOLVED","บันทึกที่ยืนยันแล้ว · การระบุตัวผู้กระทำยังไม่ยุติ"),"success");else reconStatus()
}
function openRecon(){const p=phaseState();p.terminalOpened=true;miniOpen=true;$("#ch5P2Recon")?.classList.add("open");$("#ch5P2Recon")?.setAttribute("aria-hidden","false");renderRecon();save("ch5_p2_reconciliation")}
function closeRecon(paused=true){miniOpen=false;$("#ch5P2Recon")?.classList.remove("open");$("#ch5P2Recon")?.setAttribute("aria-hidden","true");if(paused)save("ch5_p2_reconciliation_paused")}
function resetRecon(){const p=phaseState();if(!p.identityConfirmed){p.sourceAssignments={};selectedSource=""}else p.attributionChoice="";renderRecon();save()}
function confirmRecon(){
 const p=phaseState();if(p.attributionComplete){closeRecon(false);return}if(!p.identityConfirmed){const good=SOURCE_ORDER.every((id,i)=>p.sourceAssignments[i+1]===id);if(!good){reconStatus(tr("NOT SUPPORTED BY THE RECORD · Build the bridge from subject → protected identity → deployment.","หลักฐานไม่รองรับ · เชื่อมจากผู้ตาย → ตัวตนที่ถูกปกป้อง → บันทึกการ Deploy"),"error");return}p.sourceComplete=true;p.identityConfirmed=true;p.kittisakPossibleReviewed=true;p.stage="identity";const s=gs();s.flags.ch5_p2_kavin_identity_confirmed=true;s.flags.ch5_p2_deployment_record_altered=true;s.flags.ch5_p2_kittisak_prior_knowledge_possible=true;collectEvidence("ch5_p2_kavin_identity");collectEvidence("ch5_p2_deployment_edit");collectEvidence("ch5_p2_protected_visibility");setProgress(64);save("ch5_p2_kavin_identity");setTimeout(()=>playOne("ch5P2Reveal",.10),100);try{window.LastWitnessHiddenCase?.recompute?.()}catch(_){};ensureScorePlaying(true);scheduleAudioStability();renderRecon();reconStatus(tr("IDENTITY RECONCILIATION CONFIRMED","ยืนยันการเชื่อมตัวตนแล้ว"),"success");return}
 if(p.attributionChoice!=="boundary"){reconStatus(tr("NOT SUPPORTED BY THE RECORD · Separate concealment from murder attribution.","หลักฐานไม่รองรับ · แยกการปกปิดออกจากการระบุว่าใครเป็นฆาตกร"),"error");return}
 p.attributionComplete=true;p.narinActive=true;p.stage="narin-lead";const s=gs();s.flags.ch5_p2_narin_active=true;s.flags.ch5_p2_attribution_boundary_preserved=true;prepareTrackBForNarin();setProgress(82);save("ch5_p2_attribution_boundary");try{window.LastWitnessHiddenCase?.recompute?.()}catch(_){};reconStatus(tr("FINDING PRESERVED · NARIN ELEVATED TO ACTIVE SCRUTINY","เก็บข้อสรุปแล้ว · ยกระดับ NARIN เป็นบุคคลที่ต้องตรวจเชิงรุก"),"success");setTimeout(()=>{closeRecon();startDialogue(postMatchLines(),()=>{updateMonitor();save("ch5_p2_narin_contact_ready")})},480)
}

function narinImage(emotion){return BASE+`narin-${emotion}.png?v=0233c5p2r9`}
function journalToastText(){const toast=$("#ch5P2JournalToast");if(!toast)return false;const small=toast.querySelector("small"),strong=toast.querySelector("strong");if(small)small.textContent=tr("CHARACTER JOURNAL UPDATED","อัปเดตบันทึกตัวละครแล้ว");if(strong)strong.textContent=tr("NARIN HAS BEEN ADDED TO THE CHARACTER JOURNAL","เพิ่ม NARIN ลงในบันทึกตัวละครแล้ว");return true}
function showNarinJournalNote(){const toast=$("#ch5P2JournalToast");if(!toast)return false;journalToastText();toast.classList.remove("show");void toast.offsetWidth;toast.classList.add("show");clearTimeout(journalNoteTimer);journalNoteTimer=setTimeout(()=>toast.classList.remove("show"),3600);return true}
function narinJournalPresent(){const s=gs(),ext=window.LastWitnessNarinCharacterRegistry;try{if(ext?.present?.())return true}catch(_){};return Boolean(s?.flags?.ch5_p2_narin_journal_unlocked===true||s?.flags?.ch5_p2?.narinJournalUnlocked===true)}
function renderNarin(){
 const p=phaseState(),i=Math.max(0,Math.min(NARIN_LINES.length-1,p.narinLine||0)),line=NARIN_LINES[i],benedict=line.speaker==="Benedict";
 $("#ch5P2NarinImage").src=narinImage(line.speaker==="Narin"?line.emotion:"guarded");
 $("#ch5P2NarinSpeaker").textContent=line.speaker;
 const channel=$("#ch5P2NarinChannel");if(channel)channel.textContent=benedict?tr("SECURE VOICE","เสียงผ่านช่องทางปลอดภัย"):tr("REMOTE ENDPOINT","ปลายสายระยะไกล");
 const mini=$("#ch5P2BenedictMini");if(mini){mini.hidden=!benedict;mini.setAttribute("aria-hidden",benedict?"false":"true")}
 $("#ch5P2NarinText").textContent=thai()?line.th:line.en;
 $("#ch5P2NarinNext").textContent=i===NARIN_LINES.length-1?tr("CLOSE CONTACT","ปิดการติดต่อ"):tr("CONTINUE","ดำเนินต่อ");
 $("#ch5P2NarinCounter").textContent=`${String(i+1).padStart(2,"0")} / ${String(NARIN_LINES.length).padStart(2,"0")}`
}
function unlockNarinJournal(opt={}){
 registerContent();const s=gs(),p=phaseState(),api=window.LastWitnessContentRegistry,ext=window.LastWitnessNarinCharacterRegistry;
 if(!s||!p||!api?.characters?.narin)return false;s.flags=s.flags||{};s.characters=s.characters||{};s.characters.Narin=true;
 const forceUnread=opt.forceUnread===true,notify=opt.notify===true;let present=narinJournalPresent();
 if(!present||forceUnread)try{present=Boolean(ext?.ensureUnlocked?.({unread:true,forceUnread,source:"story"}))||present}catch(error){console.error("LAST WITNESS Narin registry extension unlock failed",error)}
 if(!present)try{api.unlockCharacter?.("narin",{unread:true,source:"story"});present=narinJournalPresent()}catch(error){console.error("LAST WITNESS Narin journal unlock failed",error)}
 if(!present)return false;
 p.narinJournalUnlocked=true;s.flags.ch5_p2_narin_journal_unlocked=true;if(forceUnread)s.flags.ch5_p2_narin_journal_unread=true;try{api.renderCharacters?.(true);api.updateDots?.();ext?.ensureCard?.();ext?.syncDot?.()}catch(_){}
 if(notify)s.flags.ch5_p2_narin_journal_notified=true;
 save("ch5_p2_narin_journal_unlocked");return true
}
/* Legacy function names are retained only so accepted gameplay call-sites remain untouched.
 * Phase II now has one music owner: Track A. These functions only duck/restore that same stream. */
function prepareTrackBForNarin(){return true}
function armTrackBForNarinFromGesture(){ensureScorePlaying(true);return Promise.resolve(true)}
function promoteArmedTrackB(){ensureScorePlaying(false);return true}
function activateNarinTrackB(){const p=phaseState();if(p)p.narinMusicActive=true;ensureScorePlaying(false);return true}
function stabilizeNarinScore(){return activateNarinTrackB()}
function reassertNarinTrackBFromGesture(){const p=phaseState();if(p)p.narinMusicActive=true;ensureScorePlaying(true);return Promise.resolve(true)}
function openNarinDirect(){const p=phaseState();p.narinContactStarted=true;p.narinChannelEstablished=true;p.narinMusicActive=true;p.stage="narin-contact";const s=gs();s.flags=s.flags||{};s.flags.ch5_p2_narin_channel_established=true;narinOpen=true;$("#ch5P2Narin")?.classList.add("open");$("#ch5P2Narin")?.setAttribute("aria-hidden","false");ensureScorePlaying(false);renderNarin();save("ch5_p2_narin_contact");return true}

function setConnectEstablishedVisual(){const n=$("#ch5P2Connect");n?.classList.add("established");const status=$("#ch5P2ConnectStatus");if(status)status.textContent=tr("SECURE CHANNEL ESTABLISHED","เชื่อมต่อช่องสัญญาณปลอดภัยแล้ว")}
function clearConnectTimer(){if(connectTimer){clearTimeout(connectTimer);connectTimer=0}connectDeadline=0}
function scheduleConnectTimer(){clearConnectTimer();if(!connectOpen||backgroundPaused||document.hidden)return;const delay=Math.max(20,Number(connectRemaining)||20);connectDeadline=Date.now()+delay;connectTimer=setTimeout(advanceConnectPhase,delay)}
function startNarinConnection(reset=true){
 const p=phaseState();p.narinContactStarted=true;
 if(p.narinChannelEstablished){p.stage="narin-contact";p.narinMusicActive=true;openNarinDirect();return}
 p.narinMusicActive=false;p.stage="narin-connecting";connectOpen=true;connectPhase="handshake";connectRemaining=CONNECT_HANDSHAKE_MS;
 const n=$("#ch5P2Connect");n?.classList.add("open");n?.classList.remove("established");n?.setAttribute("aria-hidden","false");updateLanguage();
 void engageSecureConnectDuck();ensureScorePlaying(true);playHandshake(reset);save("ch5_p2_narin_connecting");scheduleConnectTimer()
}
function revealNarinWhenScoreReady(){
 connectOpen=false;connectPhase="idle";connectRemaining=CONNECT_HANDSHAKE_MS;const n=$("#ch5P2Connect");n?.classList.remove("open","established");n?.setAttribute("aria-hidden","true");stopHandshakePlayback(true);releaseSecureConnectDuck(700);return openNarinDirect()
}
function advanceConnectPhase(){clearConnectTimer();if(!connectOpen)return;if(document.hidden||backgroundPaused){scheduleConnectTimer();return}if(connectPhase==="handshake"){connectPhase="established";connectRemaining=CONNECT_ESTABLISHED_MS;const p=phaseState();p.narinChannelEstablished=true;const s=gs();s.flags=s.flags||{};s.flags.ch5_p2_narin_channel_established=true;setConnectEstablishedVisual();save("ch5_p2_narin_channel_established");scheduleConnectTimer();return}revealNarinWhenScoreReady()}
function pauseConnectionTransition(){if(!connectOpen)return;if(connectTimer){connectRemaining=Math.max(20,connectDeadline-Date.now());clearConnectTimer()}pauseHandshakePlayback() }
function resumeConnectionTransition(){if(!connectOpen||document.hidden||backgroundPaused)return;if(connectPhase==="handshake")playHandshake(false);scheduleConnectTimer()}
function closeConnection(reset=false){connectOpen=false;connectPhase="idle";connectRemaining=CONNECT_HANDSHAKE_MS;clearConnectTimer();const n=$("#ch5P2Connect");n?.classList.remove("open","established");n?.setAttribute("aria-hidden","true");stopHandshakePlayback(reset);if(reset)resetSecureConnectDuck();else releaseSecureConnectDuck(180) }
function closeNarin(paused=true){narinOpen=false;$("#ch5P2Narin")?.classList.remove("open");$("#ch5P2Narin")?.setAttribute("aria-hidden","true");updateMonitor();if(paused&&!phaseState().narinContactComplete)save("ch5_p2_narin_contact_paused")}
function advanceNarin(){const p=phaseState();if(p.narinLine>=NARIN_LINES.length-1){p.narinContactComplete=true;p.stage="closing";const s=gs();s.flags.ch5_p2_narin_contact_complete=true;setProgress(94);save("ch5_p2_narin_contact_complete");closeNarin(false);const unlocked=unlockNarinJournal({notify:false,forceUnread:true}),liveJournal=phaseState();if(unlocked&&!liveJournal.journalFeedbackShown){liveJournal.journalFeedbackShown=true;s.flags.ch5_p2_narin_journal_notified=true;showNarinJournalNote();save("ch5_p2_narin_journal_feedback")}startDialogue(closingLines(),()=>{const live=phaseState();live.closingComplete=true;live.stage="closing_complete";setProgress(99);save("ch5_p2_closing_complete");updateMonitor()});return}p.narinLine++;renderNarin();save()}

function showCard(resetTimer=true){const p=phaseState();p.stage="phase-card";safeShow(CARD);setProgress(0);save("ch5_p2_phase_card");scheduleCardAuto(resetTimer)}
function showRecords(){clearCardAuto(true);const p=phaseState();p.phaseCardSeen=true;p.stage="records";safeShow(RECORDS);setProgress(12);save("ch5_p2_records");if(!p.recordsIntroComplete){startDialogue(openingLines(),()=>{const live=phaseState();live.recordsIntroComplete=true;live.stage="records_ready";setProgress(24);save("ch5_p2_records_ready");const b=$("#"+RECORDS+"Action");if(b){b.hidden=false;b.textContent=tr("OPEN RESTRICTED WORKSTATION","เปิดเครื่อง Restricted Workstation")}})}else{const b=$("#"+RECORDS+"Action");if(b){b.hidden=false;b.textContent=tr("OPEN RESTRICTED WORKSTATION","เปิดเครื่อง Restricted Workstation")}}}
function showWork(){const p=phaseState();p.stage=p.identityConfirmed?(p.attributionComplete?"narin-lead":"identity"):"workstation";safeShow(WORK);setProgress(Math.max(34,progressFor()));save(p.identityConfirmed?"ch5_p2_identity_review":"ch5_p2_workstation");const b=$("#"+WORK+"Action");if(b)b.hidden=true;positionMonitorOverlay();updateMonitor();if(p.narinContactComplete&&!p.closingComplete&&!dialogue){startDialogue(closingLines(),()=>{const live=phaseState();live.closingComplete=true;live.stage="closing_complete";setProgress(99);save("ch5_p2_closing_complete");updateMonitor()})}}
function completePhase(){unlockNarinJournal({notify:false,forceUnread:false});const p=phaseState();p.complete=true;p.narinChannelEstablished=true;p.narinMusicActive=true;p.narinJournalUnlocked=true;p.stage="complete";const s=gs();s.flags=s.flags||{};s.flags.ch5_p2_complete=true;s.flags.ch5_p2_kavin_identity_confirmed=true;s.flags.ch5_p2_narin_active=true;s.flags.ch5_p2_narin_channel_established=true;s.flags.ch5_p2_narin_journal_unlocked=true;s.flags.ch5_p2_deployment_record_altered=true;s.flags.ch5_p2_attribution_boundary_preserved=true;s.chapter=5;try{window.LastWitnessHiddenCase?.recompute?.()}catch(_){};safeShow(COMPLETE);ensureScorePlaying(true);scheduleAudioStability();setProgress(100);save("ch5_phase2_complete")}
function updateMonitor(){const p=phaseState(),button=$("#ch5P2OpenRecon");$("#ch5P2MonitorFlag").textContent=p.closingComplete?"PHASE REVIEW COMPLETE":p.attributionComplete?"BOUNDARY PRESERVED":p.identityConfirmed?"MATCH CONFIRMED":"MANUAL BRIDGE REQUIRED";$("#ch5P2MonitorState").textContent=p.identityConfirmed?"KAVIN NOPPARAT":"ROOM 1807 · IDENTITY LOCKED";$("#ch5P2MonitorSub").textContent=p.identityConfirmed?tr("Protected identity resolved. Deployment record carries a post-disappearance edit marker.","ยืนยันตัวตนที่ถูกปกป้องแล้ว และพบบันทึกการ Deploy ถูกแก้หลังการหายตัว"):tr("Three records must be reconciled without converting access into attribution.","ต้องเชื่อมบันทึกสามชุดโดยไม่เปลี่ยนสิทธิ์เข้าถึงให้กลายเป็นการระบุตัวผู้กระทำ");if(button)button.textContent=p.closingComplete?tr("COMPLETE PHASE II","จบเฟส II"):p.attributionComplete?(p.narinContactStarted&&!p.narinContactComplete?tr("RESUME SECURE CONTACT","กลับไปยังการติดต่อแบบ Secure"):p.narinContactComplete?tr("REVIEW COMPLETE","ตรวจเสร็จแล้ว"):tr("OPEN SECURE CONTACT","เปิดการติดต่อแบบ Secure")):p.identityConfirmed?tr("REVIEW ATTRIBUTION","ตรวจขอบเขตการระบุตัว"):tr("OPEN IDENTITY RECONCILIATION","เปิด Identity Reconciliation")}
function activateMonitorAction(){const p=phaseState();if(p.closingComplete){completePhase();return}if(p.attributionComplete){if(!p.narinContactComplete)startNarinConnection(!p.narinChannelEstablished);return}openRecon()}

function registerContent(){
 if(registryInstalled)return true;const api=window.LastWitnessContentRegistry;if(!api?.characters||!api?.evidence)return false;
 try{window.LastWitnessNarinCharacterRegistry?.register?.()}catch(_){}
 if(!api.characters.narin)return false;
 api.evidence.ch5_p2_kavin_identity={phase:"Chapter V · Name in Room 1807",title:{en:"Kavin Nopparat — Identity Reconciliation",th:"Kavin Nopparat — การยืนยันตัวตน"}};
 api.evidence.ch5_p2_deployment_edit={phase:"Chapter V · Name in Room 1807",title:{en:"Bangkok Deployment Record — Edit Marker",th:"บันทึก Deployment กรุงเทพฯ — ร่องรอยการแก้ไข"}};
 api.evidence.ch5_p2_protected_visibility={phase:"Chapter V · Name in Room 1807",title:{en:"Protected Identity Visibility",th:"สิทธิ์มองเห็นตัวตนที่ถูกปกป้อง"}};
 registryInstalled=true;try{api.renderCharacters?.(true)}catch(_){}return true
}
function collectEvidence(id){if(!EVIDENCE_IDS.includes(id))return;registerContent();try{window.LastWitnessContentRegistry?.unlockEvidence?.(id)}catch(_){};try{gs()?.found?.add?.(id)}catch(_){} }
function ensureNarinJournalFromSave(){const s=gs(),p=phaseState();if(!s||!p)return false;const completed=Boolean(p.narinContactComplete||p.complete||s.flags?.ch5_p2_narin_contact_complete===true||s.flags?.ch5_p2_complete===true);if(!completed)return false;return narinJournalPresent()||unlockNarinJournal({notify:false,forceUnread:false})}

function updateLanguage(){
 const p=phaseState()||defaults(),map={
 ch5P2CardEye:tr("CHAPTER V · PHASE II","บทที่ V · เฟส II"),ch5P2CardCity:tr("POLICE STATION · RESTRICTED RECORDS","สถานีตำรวจ · RESTRICTED RECORDS"),ch5P2CardTitle:tr("NAME IN ROOM 1807","ชื่อในห้อง 1807"),ch5P2CardBody:tr("A protected identity reference forces the Room 1807 file open again.","ข้อมูลตัวตนที่ถูกปกป้องทำให้แฟ้มห้อง 1807 ต้องถูกเปิดขึ้นมาอีกครั้ง"),
 ch5P2RecordsLocation:tr("POLICE STATION · RESTRICTED RECORDS","สถานีตำรวจ · RESTRICTED RECORDS"),ch5P2RecordsScene:"",ch5P2RecordsObjective:tr("Resolve the protected Room 1807 identity without outrunning the record.","ยืนยันตัวตนที่ถูกปกป้องของห้อง 1807 โดยไม่สรุปไกลเกินหลักฐาน"),ch5P2RecordsNote:"",
 ch5P2WorkLocation:tr("RESTRICTED WORKSTATION · INTERNAL","RESTRICTED WORKSTATION · INTERNAL"),ch5P2WorkstationScene:"",ch5P2WorkstationObjective:tr("Bridge the protected identity path, then separate concealment from attribution.","เชื่อมเส้นทางตัวตนที่ถูกปกป้อง แล้วแยกการปกปิดออกจากการระบุตัวผู้กระทำ"),ch5P2WorkstationNote:"ACCESS LOGGED · READ / RECONCILE ONLY",
 ch5P2MonitorTitle:"IDENTITY RECONCILIATION",ch5P2MonitorSession:"SESSION · ROOM 1807",ch5P2ReconEye:"RESTRICTED INTERNAL",ch5P2ReconTitle:"IDENTITY RECONCILIATION",ch5P2ReconBody:tr("Build the only source bridge the record supports. Closing pauses the task; it does not complete it.","เชื่อมเฉพาะแหล่งข้อมูลที่หลักฐานรองรับ การกด X เป็นเพียงการพัก ไม่ถือว่าจบขั้นตอน"),
 ch5P2ConnectKicker:tr("SECURE CONTACT REQUEST","คำขอเชื่อมต่อแบบปลอดภัย"),ch5P2ConnectTitle:tr("ESTABLISHING SECURE CONTACT","กำลังเชื่อมต่อช่องสัญญาณปลอดภัย"),ch5P2ConnectOrigin:tr("RESTRICTED RECORDS · BENEDICT","RESTRICTED RECORDS · BENEDICT"),ch5P2ConnectEndpoint:"NARIN · REMOTE ENDPOINT",ch5P2ConnectStatus:connectPhase==="established"?tr("SECURE CHANNEL ESTABLISHED","เชื่อมต่อช่องสัญญาณปลอดภัยแล้ว"):tr("ENCRYPTED HANDSHAKE · CONTROLLED LINE","ENCRYPTED HANDSHAKE · CONTROLLED LINE"),
 ch5P2NarinEye:tr("NARIN · REMOTE CONTACT","NARIN · REMOTE CONTACT"),ch5P2NarinRole:tr("CONTROLLED SECURE LINE · REMOTE ENDPOINT","CONTROLLED SECURE LINE · REMOTE ENDPOINT"),
 ch5P2CompleteEye:tr("CHAPTER V · PHASE II COMPLETE","บทที่ V · จบเฟส II"),ch5P2CompleteTitle:tr("NAME IN ROOM 1807","ชื่อในห้อง 1807"),ch5P2CompleteBody:tr("Room 1807 has a name. Narin now has a serious record problem. Neither fact resolves the murder decision.","ห้อง 1807 มีชื่อแล้ว และ Narin มีปัญหาจากบันทึกที่จริงจังขึ้น แต่ทั้งสองอย่างยังไม่ตอบว่าใครเป็นเจ้าของการตัดสินใจฆาตกรรม"),
 ch5P2ResultIdentity:tr("ROOM 1807 IDENTITY","ตัวตนห้อง 1807"),ch5P2ValueIdentity:"KAVIN NOPPARAT",ch5P2ResultNarin:"NARIN",ch5P2ValueNarin:tr("ACTIVE SCRUTINY","ACTIVE SCRUTINY"),ch5P2ResultRecord:tr("DEPLOYMENT RECORD","บันทึก DEPLOYMENT"),ch5P2ValueRecord:tr("ALTERED AFTER DISAPPEARANCE","แก้ไขหลังการหายตัว"),ch5P2ResultAttribution:tr("ATTRIBUTION","การระบุตัวผู้กระทำ"),ch5P2ValueAttribution:tr("UNRESOLVED","ยังไม่ยุติ"),ch5P2Next:tr("NEXT · PHASE III · ROOM / PROFILE CROSS-MAP","ถัดไป · เฟส III · ROOM / PROFILE CROSS-MAP"),ch5P2ReturnTitle:tr("RETURN TO TITLE","กลับหน้าหลัก")};
 Object.entries(map).forEach(([id,text])=>{const n=$("#"+id);if(n)n.textContent=text});journalToastText();if(connectPhase==="established")setConnectEstablishedVisual();updateMonitor();if(miniOpen)renderRecon();if(narinOpen)renderNarin();installToolLabels();positionSceneNotes()
}

function bindUi(){
 document.addEventListener("pointerdown",event=>{if(isP2()&&!document.hidden&&!backgroundPaused&&event.target?.closest?.("#game"))ensureScorePlaying(true)},true);
 [RECORDS,WORK].forEach(id=>{$("#"+id+"Dialogue")?.addEventListener("click",event=>{if(activeScreen()!==id||!dialogue)return;event.preventDefault();event.stopPropagation();advanceDialogue()})});
 $("#"+RECORDS+"Action")?.addEventListener("click",showWork);
 $("#ch5P2OpenRecon")?.addEventListener("click",activateMonitorAction);
 $("#ch5P2ReconClose")?.addEventListener("click",()=>closeRecon());$("#ch5P2ReconReset")?.addEventListener("click",resetRecon);$("#ch5P2ReconConfirm")?.addEventListener("click",confirmRecon);
 $("#ch5P2Recon")?.addEventListener("click",event=>{const source=event.target.closest?.("[data-c5p2-source]")?.dataset.c5p2Source;if(source){const p=phaseState(),existing=Object.keys(p.sourceAssignments).find(k=>p.sourceAssignments[k]===source);if(existing)delete p.sourceAssignments[existing];else{const empty=[1,2,3].find(slot=>!p.sourceAssignments[slot]);if(empty)p.sourceAssignments[empty]=source;else{reconStatus(tr("BRIDGE FULL · Remove one source before replacing it.","BRIDGE เต็ม · แตะช่องด้านบนเพื่อนำแหล่งข้อมูลออกก่อน"),"error");return}}renderRecon();save();return}const slot=event.target.closest?.("[data-c5p2-slot]")?.dataset.c5p2Slot;if(slot){const p=phaseState();if(p.sourceAssignments[slot]){delete p.sourceAssignments[slot];renderRecon();save()}return}const c=event.target.closest?.("[data-c5p2-conclusion]")?.dataset.c5p2Conclusion;if(c){phaseState().attributionChoice=c;renderRecon();save()}});
 $("#"+WORK+"Action")?.addEventListener("click",activateMonitorAction);
 $("#ch5P2NarinClose")?.addEventListener("click",()=>closeNarin(true));$("#ch5P2NarinNext")?.addEventListener("click",()=>{reassertNarinTrackBFromGesture();advanceNarin()});
 $("#ch5P2ReturnTitle")?.addEventListener("click",()=>{stopAudio(true);try{if(typeof window.LastWitnessChapter2Integration?.returnToTitle==="function")window.LastWitnessChapter2Integration.returnToTitle();else if(typeof show==="function")show("title")}catch(_){try{show("title")}catch(__){}}});
 $$(".ch5-p2-save").forEach(button=>button.addEventListener("click",openSave));
 $$(".ch5-p2-menu").forEach(button=>button.addEventListener("click",openMenu));
 const restartButton=$("#restart");if(restartButton&&!restartButton.__lwCh5P2RestartR8){restartButton.__lwCh5P2RestartR8=true;restartButton.addEventListener("click",event=>{if(!isP2())return;event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();$("#drawer")?.classList.remove("open");startFreshForDev()},true)}
 ["soundToggle","musicRange","sfxRange"].forEach(id=>$("#"+id)?.addEventListener("input",()=>{if(isP2())requestAnimationFrame(()=>syncAudio(true))}));
 document.addEventListener("click",event=>{if(event.target.closest?.("[data-lang]"))setTimeout(updateLanguage,0);if(isP2()&&event.target.closest?.("#newGame,#continueGame,#loadTitle,[data-dev-jump]"))stopAudio(true)},true);
 window.addEventListener("resize",()=>{positionSceneNotes();if(activeScreen()===WORK)requestAnimationFrame(positionMonitorOverlay)});window.addEventListener("orientationchange",()=>setTimeout(positionMonitorOverlay,120));
}

function start(){inject();stopForeignMedia();const s=gs();if(!s)return false;s.chapter=5;s.flags=s.flags||{};const p=phaseState();p.started=true;registerContent();showCard(true);return true}
function clearP2StateForDev(){const s=gs();if(!s)return;s.flags=s.flags||{};delete s.flags.ch5_p2;["ch5_p2_complete","ch5_p2_kavin_identity_confirmed","ch5_p2_deployment_record_altered","ch5_p2_kittisak_prior_knowledge_possible","ch5_p2_narin_active","ch5_p2_narin_channel_established","ch5_p2_narin_journal_unlocked","ch5_p2_narin_journal_unread","ch5_p2_narin_journal_notified","ch5_p2_attribution_boundary_preserved","ch5_p2_narin_contact_complete"].forEach(k=>delete s.flags[k]);EVIDENCE_IDS.forEach(id=>{try{s.found?.delete?.(id)}catch(_){};if(Array.isArray(s.lwEvidenceUnlocked))s.lwEvidenceUnlocked=s.lwEvidenceUnlocked.filter(x=>x!==id)});if(Array.isArray(s.lwCharactersUnlocked))s.lwCharactersUnlocked=s.lwCharactersUnlocked.filter(id=>id!=="narin");if(Array.isArray(s.lwCharactersUnread))s.lwCharactersUnread=s.lwCharactersUnread.filter(id=>id!=="narin");if(s.characters)delete s.characters.Narin;try{window.LastWitnessHiddenCase?.recompute?.()}catch(_){}}
function startFreshForDev(){inject();stopForeignMedia();stopAudio(true);closeRecon(false);closeConnection(true);closeNarin(false);const s=gs();if(!s)return false;clearP2StateForDev();s.chapter=5;s.flags=s.flags||{};s.flags.ch5_p1_complete=true;s.flags.ch5_p1_room1807_identity_reference=true;s.checkpoint="ch5_p2_phase_card";s.progress=0;const p=phaseState();p.started=true;registerContent();showCard(true);save("ch5_p2_phase_card");return true}
function resumeFromState(target){inject();const s=gs();if(!s)return false;s.chapter=5;const p=phaseState();registerContent();ensureNarinJournalFromSave();const known=SCREENS.has(target)?target:(p.complete?COMPLETE:(p.terminalOpened||p.identityConfirmed||p.attributionComplete||p.narinContactStarted)?WORK:p.recordsIntroComplete?RECORDS:CARD);if(known===CARD)showCard(true);else{safeShow(known);setProgress(progressFor());if(known===RECORDS)showRecords();else if(known===WORK)showWork();else if(known===COMPLETE)completePhase();else syncAudio(true)}return true}
function resumeSavedEntry(){const target=String(gs()?.screen||"");const checkpoint=String(gs()?.checkpoint||"");if(target.startsWith("ch5P2")||checkpoint.startsWith("ch5_p2")||checkpoint==="ch5_phase2_complete")setTimeout(()=>resumeFromState(target),0)}

let saveBridgeInstalled=false,saveBridgeBusy=false,originalLoadSave=null,originalManagerRestore=null;
function p2RestoreTarget(){const s=gs();return String(s?.screen||"").startsWith("ch5P2")||String(s?.checkpoint||"").startsWith("ch5_p2")||String(s?.checkpoint||"")==="ch5_phase2_complete"}
function resumeAfterExternalRestore(beforeFlags=null){if(saveBridgeBusy)return;saveBridgeBusy=true;const started=performance.now();const poll=()=>{try{const restored=beforeFlags==null||gs()?.flags!==beforeFlags;if(restored&&p2RestoreTarget()){resumeFromState(String(gs()?.screen||""));saveBridgeBusy=false;return}}catch(_){}if(performance.now()-started<4000){setTimeout(poll,80);return}saveBridgeBusy=false};setTimeout(poll,0)}
function installSaveRestoreBridge(){
 if(saveBridgeInstalled)return true;saveBridgeInstalled=true;
 /* Auto-save/Continue path: the classic global loadSave() is the only legacy entry that can restore before the Save Manager click path. P2 is already injected when this bridge installs. */
 try{if(typeof window.loadSave==="function"&&!window.loadSave.__lwCh5P2Wrapped){originalLoadSave=window.loadSave;const wrapped=function(kind){const before=gs()?.flags;const result=originalLoadSave.apply(this,arguments);if(kind!=="manual")resumeAfterExternalRestore(before);return result};wrapped.__lwCh5P2Wrapped=true;window.loadSave=wrapped}}catch(_){}
 /* Named Save Manager path: its internal restore function is closure-scoped, so use capture only as a post-load resume trigger. No save bytes or accepted manager logic are changed. */
 document.addEventListener("click",event=>{const button=event.target.closest?.('#lwSaveManager [data-save-action="load"]');if(button)resumeAfterExternalRestore(gs()?.flags)},true);
 try{const manager=window.LastWitnessSaveManager;if(manager&&typeof manager.restore==="function"&&!manager.restore.__lwCh5P2Wrapped){originalManagerRestore=manager.restore;const wrapped=function(data){const before=gs()?.flags;const result=originalManagerRestore.apply(this,arguments);resumeAfterExternalRestore(before);return result};wrapped.__lwCh5P2Wrapped=true;manager.restore=wrapped}}catch(_){}
 return true
}

async function copyText(value){try{if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(value);return true}}catch(_){}const a=document.createElement("textarea");a.value=value;a.setAttribute("readonly","");a.style.position="fixed";a.style.opacity="0";document.body.appendChild(a);a.select();const ok=document.execCommand?.("copy")===true;a.remove();return ok}
function testerAuthorized(){try{return sessionStorage.getItem("last_witness_north_qa_role")==="tester"}catch(_){return false}}
function qaInfo(){const s=gs()||{},p=phaseState();return["LAST WITNESS QA","Build: "+String(window.LastWitnessRuntimeBuild||"0.22.27"),"Access: NORTH QA","QA Module: "+String(window.LastWitnessNorthQA?.version||"0.22.27"),"Chapter V Phase II: "+VERSION,"Chapter: 5","Phase: 2","Screen: "+activeScreen(),"Checkpoint: "+(s.checkpoint||"unresolved"),"Stage: "+(p?.stage||"unresolved"),"Language: "+(s.language==="th"?"TH":"EN"),"Visibility: "+(document.hidden?"hidden":"visible")].join("\n")}
function closeToolOverlays(){$("#drawer")?.classList.remove("open");$$('.modal.open').forEach(n=>n.classList.remove("open"));["developerModal","northQaModal","devAccessModal"].forEach(id=>$("#"+id)?.classList.remove("open"))}
function positionAfter(node,anchor,container){if(!node||!container)return;if(anchor&&anchor.parentElement===container){if(anchor.nextElementSibling!==node)anchor.insertAdjacentElement("afterend",node)}else if(node.parentElement!==container||container.lastElementChild!==node)container.appendChild(node)}
function installDevButton(){const grid=$("#developerModal .dev-grid");if(!grid)return false;let b=$("#ch5P2DeveloperJump");if(!b){b=document.createElement("button");b.id="ch5P2DeveloperJump";b.type="button";b.className="dev-button";b.dataset.ch5P2Jump="1";b.addEventListener("click",event=>{event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();closeToolOverlays();startFreshForDev()},true)}positionAfter(b,$("#ch5P1DeveloperJump")||grid.querySelector('[data-dev-jump="chapter4ShadowTruth"]'),grid);installToolLabels();return true}
function installQaButton(){const grid=$("#northQaModal .north-qa-grid");if(!grid)return false;let b=$("#ch5P2NorthQaJump");if(!b){b=document.createElement("button");b.id="ch5P2NorthQaJump";b.type="button";b.className="dev-button";b.dataset.northQaAction="chapter5phase2"}positionAfter(b,$("#ch5P1NorthQaJump")||grid.querySelector('[data-north-qa-action="chapter4phase8"]'),grid);const head=$("#northQaModal .north-qa-head");if(head&&!$("#ch5P2QaExtension")){const n=document.createElement("div");n.id="ch5P2QaExtension";n.className="ch5-p2-tool-note";head.appendChild(n)}const n=$("#ch5P2QaExtension");if(n)n.textContent="CH V PHASE II "+VERSION;installToolLabels();return true}
function installToolLabels(){const d=$("#ch5P2DeveloperJump"),q=$("#ch5P2NorthQaJump");if(d)d.textContent=tr("Chapter V · Phase II · Name in Room 1807","บทที่ V · เฟส II · ชื่อในห้อง 1807");if(q)q.textContent="CHAPTER V · PHASE II"}
function installP1AutoHandoff(){
 if(p1HandoffInstalled)return true;
 const current=window.show;if(typeof current!=="function")return false;
 if(current.__lwCh5P2AutoHandoff){p1HandoffInstalled=true;return true}
 const original=current;
 const wrapped=function(screen){
  const result=original.apply(this,arguments);
  if(screen==="ch5P1Complete")queueMicrotask(()=>{const s=gs(),p=phaseState();if(Number(s?.chapter)===5&&s?.flags?.ch5_p1_complete===true&&!p?.started)start()});
  return result
 };
 wrapped.__lwCh5P2AutoHandoff=true;wrapped.__lwOriginalShow=original;window.show=wrapped;p1HandoffInstalled=true;return true
}
function installQaInterceptors(){if(document.documentElement.dataset.ch5P2QaIntercept==="1")return;document.documentElement.dataset.ch5P2QaIntercept="1";document.addEventListener("click",event=>{const action=event.target.closest?.("[data-north-qa-action]")?.dataset.northQaAction;if(!action)return;const inP2=isP2();if(action==="chapter5phase2"){if(!testerAuthorized())return;event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();closeToolOverlays();startFreshForDev();return}if(inP2&&action==="restart"){event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();closeToolOverlays();startFreshForDev();return}if(inP2&&action==="copy"){event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();void copyText(qaInfo()).then(ok=>{const n=$("#northQaStatus");if(n)n.textContent=ok?"Test information copied.":"Unable to copy test information."});return}if(inP2&&action==="title"){stopAudio(true);return}if(inP2&&action.startsWith("chapter"))stopAudio(true)},true)}
function scheduleIntegrations(){installTimers.forEach(clearTimeout);installTimers=[];[0,180,500,1000,1900,3300,5500].forEach(ms=>installTimers.push(setTimeout(()=>{installDevButton();installQaButton();installP1AutoHandoff();registerContent()},ms)))}

function install(){
 inject();preloadHandshakeBuffer();startAudioWatchdog();installSaveRestoreBridge();installQaInterceptors();installP1AutoHandoff();scheduleIntegrations();
 document.addEventListener("click",event=>{if(event.target.closest?.("#developerMenuButton,#northQaMenuButton,#northQaTitleButton,#settingsVersion"))setTimeout(()=>{installDevButton();installQaButton();installP1AutoHandoff()},0)},true);
 document.addEventListener("play",guardBackgroundP2Play,true);
 document.addEventListener("visibilitychange",()=>{if(document.hidden)pauseForBackground();else queueForegroundResume()});
 window.addEventListener("pagehide",pauseForBackground);window.addEventListener("pageshow",queueForegroundResume);window.addEventListener("focus",()=>{if(!document.hidden)queueForegroundResume()});
 try{document.addEventListener("freeze",pauseForBackground);document.addEventListener("resume",queueForegroundResume)}catch(_){}
 document.addEventListener("pointerdown",foregroundGestureRecovery,true);document.addEventListener("touchstart",foregroundGestureRecovery,true);document.addEventListener("keydown",foregroundGestureRecovery,true);
 resumeSavedEntry();return true
}

window.LastWitnessChapter5Phase2={version:VERSION,installed:true,install,start,startFreshForDev,resumeFromState,stopAudio,openReconciliation:openRecon,getState:()=>clone(phaseState()),audioState:()=>({mode:"a",activeMode:"a",aPaused:media("ch5P2MusicA")?.paused,bPaused:true,aTime:media("ch5P2MusicA")?.currentTime||0,bTime:0,aVolume:media("ch5P2MusicA")?.volume||0,bVolume:0,trackBConfirmed:false,trackBArmedForNarin:false,trackBRevealFromStart:false,handshakeContext:secureCallCtx?.state||"none",connectOpen,connectPhase,backgroundPaused,foregroundGesturePending,singleTrack:true}),screens:[...SCREENS],qaInfo,installP1AutoHandoff};
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",install,{once:true});else install();
})();
