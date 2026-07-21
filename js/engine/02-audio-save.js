/* Last Witness Full Refactor
 * Audio, save/load and portrait registration
 * Chapter I-II journal timing + scene ambience repair 0.4.13
 */

function extendedAudio(){
return{
forensicHum:$("#forensicHumAudio"),
medicalRefrigerator:$("#medicalRefrigeratorAudio"),
medicalMachine:$("#medicalMachineAudio")
}
}
function clampVolume(value){return Math.max(0,Math.min(1,Number(value)||0))}
function sceneMusicLevel(){
const value=Number(state&&state.music);
return Number.isFinite(value)?clampVolume(value):.33
}
function dialogueIsActive(screen){
const map={forensic2:"#forensicDialogue",medical2:"#medicalDialogue"};
const selector=map[screen];
if(!selector)return false;
const box=$(selector);
return Boolean(box&&!box.classList.contains("hidden")&&getComputedStyle(box).display!=="none")
}
function fadeAudioVolume(audio,target,duration=320){
if(!audio)return;
target=clampVolume(target);
const start=clampVolume(audio.volume);
if(Math.abs(start-target)<.004){audio.volume=target;return}
const token=(audio._lwFadeToken||0)+1;
audio._lwFadeToken=token;
const began=performance.now();
function step(now){
if(audio._lwFadeToken!==token)return;
const progress=Math.min(1,(now-began)/Math.max(1,duration));
const eased=1-Math.pow(1-progress,3);
audio.volume=clampVolume(start+(target-start)*eased);
if(progress<1)requestAnimationFrame(step)
}
requestAnimationFrame(step)
}
function ensureLoopPlaying(audio){
if(!audio||!state.sound)return;
audio.loop=true;
if(audio.paused)audio.play().catch(()=>{})
}
function stopExtendedAmbience(reset=true){
const ext=extendedAudio();
[ext.forensicHum,ext.medicalRefrigerator,ext.medicalMachine].forEach(audio=>{
if(!audio)return;
audio._lwFadeToken=(audio._lwFadeToken||0)+1;
audio.pause();
if(reset)audio.currentTime=0
})
}
function syncExtendedAmbience(screen){
const ext=extendedAudio();
const active=screen||$(".screen.active")?.id||state.screen||"";
const masterOn=state.sound!==false;
const music=sceneMusicLevel();
const duck=dialogueIsActive(active)?.84:1;

if(!masterOn){stopExtendedAmbience(false);return}

if(active==="forensic2"){
if(ext.medicalRefrigerator){ext.medicalRefrigerator.pause();ext.medicalRefrigerator.currentTime=0}
if(ext.medicalMachine){ext.medicalMachine.pause();ext.medicalMachine.currentTime=0}
if(ext.forensicHum){
ensureLoopPlaying(ext.forensicHum);
fadeAudioVolume(ext.forensicHum,music*.48*duck,360)
}
return
}

if(active==="medical2"){
if(ext.forensicHum){ext.forensicHum.pause();ext.forensicHum.currentTime=0}
if(ext.medicalRefrigerator){
ensureLoopPlaying(ext.medicalRefrigerator);
fadeAudioVolume(ext.medicalRefrigerator,music*.52*duck,360)
}
if(ext.medicalMachine){
ensureLoopPlaying(ext.medicalMachine);
fadeAudioVolume(ext.medicalMachine,music*.20*duck,360)
}
return
}

stopExtendedAmbience(true)
}

function anyDialogueActive(screen){
const panel=$("#"+screen);
if(!panel)return false;
return Boolean(Array.from(panel.querySelectorAll(".dialogue")).some(box=>
!box.classList.contains("hidden")&&getComputedStyle(box).display!=="none"
))
}
function ambientFloorFor(id){
if(state.sound===false)return null;
const screen=$(".screen.active")?.id||state.screen||"";
const music=sceneMusicLevel();
const duck=anyDialogueActive(screen)?.86:1;
const profile={
office:{officeAudio:.46,rainAudio:.18},
crime:{crimeAudio:.34},
phone:{crimeAudio:.34},
deduction:{crimeAudio:.34},
office2:{morningOfficeAudio:.42},
apartment2:{crimeAudio:.30},
cafe2:{cafeAudio:.40},
police2:{policeAudio:.30},
forensic2:{forensicHumAudio:.48},
medical2:{medicalRefrigeratorAudio:.52,medicalMachineAudio:.20}
}[screen];
if(!profile||profile[id]===undefined)return null;
return clampVolume(music*profile[id]*duck)
}
function mediaVolumeDescriptor(){
let proto=window.HTMLMediaElement&&HTMLMediaElement.prototype;
while(proto){
const descriptor=Object.getOwnPropertyDescriptor(proto,"volume");
if(descriptor&&descriptor.get&&descriptor.set)return descriptor;
proto=Object.getPrototypeOf(proto)
}
return null
}
function installAmbientVolumeGuards(){
const descriptor=mediaVolumeDescriptor();
if(!descriptor)return;
[
"officeAudio","rainAudio","crimeAudio","morningOfficeAudio","cafeAudio","policeAudio",
"forensicHumAudio","medicalRefrigeratorAudio","medicalMachineAudio"
].forEach(id=>{
const audio=$("#"+id);
if(!audio||audio.dataset.lwVolumeGuard==="1")return;
audio.dataset.lwVolumeGuard="1";
try{
Object.defineProperty(audio,"volume",{
configurable:true,
enumerable:false,
get(){return descriptor.get.call(audio)},
set(value){
let requested=clampVolume(value);
const floor=ambientFloorFor(id);
if(floor!==null)requested=Math.max(requested,floor);
descriptor.set.call(audio,clampVolume(requested))
}
})
}catch(_){audio.dataset.lwVolumeGuard="0"}
})
}

function canonicalJournalUnlocked(){
try{
const chapter=Number(state.chapter)||1;
if(chapter>2)return true;
if(chapter<2)return false;
const screen=$(".screen.active")?.id||state.screen||"";
const legacyLateChapterTwo=["apartment2","cafe2","police2","forensic2","medical2","chapter2Complete","chapter3Wip"].includes(screen);
return Boolean(
state.flags&&state.flags.chapter2_character_feature_unlocked===true||
state.journal&&state.journal.unlocked===true||
legacyLateChapterTwo
)
}catch(_){return false}
}
let journalVisibilitySyncing=false;
function syncCharacterJournalVisibility(){
if(journalVisibilitySyncing)return;
const button=$("#charactersButton");
if(!button)return;
journalVisibilitySyncing=true;
try{
const visible=canonicalJournalUnlocked();
button.hidden=!visible;
button.toggleAttribute("aria-hidden",!visible);
button.style.setProperty("display",visible?"block":"none","important");
button.style.setProperty("visibility",visible?"visible":"hidden","important");
button.style.setProperty("opacity",visible?"1":"0","important");
button.style.setProperty("pointer-events",visible?"auto":"none","important");

if(typeof state!=="undefined"){
state.lwJournalEnabled=visible;
const storeKey="lastWitness.contentRegistry.v1";
try{
const registry=JSON.parse(localStorage.getItem(storeKey)||"{}");
if(Boolean(registry.journalEnabled)!==visible){
registry.journalEnabled=visible;
localStorage.setItem(storeKey,JSON.stringify(registry))
}
}catch(_){}
}
}finally{
journalVisibilitySyncing=false
}
}
function installChapter12SystemRepair(){
if(window.__lastWitnessChapter12SystemRepair)return;
window.__lastWitnessChapter12SystemRepair=true;
installAmbientVolumeGuards();

const root=$("#game")||document.body;
const observer=new MutationObserver(()=>{
queueMicrotask(()=>{
syncCharacterJournalVisibility();
syncExtendedAmbience()
})
});
observer.observe(root,{subtree:true,childList:true,attributes:true,attributeFilter:["class","style","hidden"]});

const musicRange=$("#musicRange");
const soundToggle=$("#soundToggle");
musicRange&&musicRange.addEventListener("input",()=>{setVolumes();syncExtendedAmbience()},true);
soundToggle&&soundToggle.addEventListener("change",()=>setTimeout(()=>syncExtendedAmbience(),0),true);

document.addEventListener("visibilitychange",()=>{
if(document.hidden)return;
syncCharacterJournalVisibility();
syncExtendedAmbience()
});

syncCharacterJournalVisibility();
syncExtendedAmbience();
setInterval(()=>{
syncCharacterJournalVisibility();
const screen=$(".screen.active")?.id||state.screen||"";
if(screen==="forensic2"||screen==="medical2")syncExtendedAmbience(screen)
},1400)
}

function setVolumes(){
AUDIO.theme.volume=state.music;AUDIO.rain.volume=state.music*.48;AUDIO.office.volume=state.music*.82;AUDIO.morningOffice.volume=state.music*.72;AUDIO.cafe.volume=state.music*.78;AUDIO.evidence.volume=state.sfx*.8;AUDIO.police.volume=state.music*.76;AUDIO.crime.volume=state.music;AUDIO.click.volume=state.sfx;AUDIO.page.volume=state.sfx;AUDIO.steps.volume=state.sfx*.8;AUDIO.vibrate.volume=state.sfx;AUDIO.chapter.volume=state.music;
const ext=extendedAudio();
if(ext.forensicHum)ext.forensicHum.volume=state.music*.48;
if(ext.medicalRefrigerator)ext.medicalRefrigerator.volume=state.music*.52;
if(ext.medicalMachine)ext.medicalMachine.volume=state.music*.20
}
function stopAudio(audio){
if(!audio)return;
audio.pause();
audio.currentTime=0
}
function stopLoops(){
const ext=extendedAudio();
[AUDIO.theme,AUDIO.rain,AUDIO.office,AUDIO.crime,AUDIO.morningOffice,AUDIO.cafe,AUDIO.police,ext.forensicHum,ext.medicalRefrigerator,ext.medicalMachine].forEach(stopAudio)
}
function stopPhoneVibration(){
clearTimeout(stopPhoneVibration.timer);
stopAudio(AUDIO.vibrate)
}
function playPhoneVibration(duration=3600){
if(!state.sound)return;
stopPhoneVibration();
AUDIO.vibrate.currentTime=0;
AUDIO.vibrate.volume=state.sfx;
AUDIO.vibrate.play().catch(()=>{});
stopPhoneVibration.timer=setTimeout(stopPhoneVibration,duration)
}
function stopChapterAudio(){
clearTimeout(stopChapterAudio.timer);
stopAudio(AUDIO.chapter);
AUDIO.chapter.volume=state.music
}
function play(name){if(!state.sound)return;const audio=AUDIO[name];audio.currentTime=0;audio.play().catch(()=>{})}
function ambience(screen){
stopLoops();
stopPhoneVibration();
if(screen!=="chapter")stopChapterAudio();
if(!state.sound)return;
if(screen==="title"){AUDIO.theme.play().catch(()=>{});AUDIO.rain.play().catch(()=>{})}
else if(screen==="office"){AUDIO.office.play().catch(()=>{});AUDIO.rain.play().catch(()=>{})}
else if(screen==="office2"){AUDIO.morningOffice.play().catch(()=>{})}
else if(screen==="apartment2"){AUDIO.crime.volume=state.music*.45;AUDIO.crime.play().catch(()=>{})}
else if(screen==="cafe2"){AUDIO.cafe.play().catch(()=>{})}
else if(screen==="police2"){AUDIO.police.currentTime=4.6;AUDIO.police.play().catch(()=>{})}
else if(screen==="forensic2"||screen==="medical2"){syncExtendedAmbience(screen)}
else if(["crime","phone","deduction"].includes(screen)){AUDIO.crime.play().catch(()=>{})}
}
function snapshot(){return{screen:state.screen,found:Array.from(state.found),history:state.history,time:Date.now(),chapter:state.chapter,checkpoint:state.checkpoint,characters:state.characters,relationships:state.relationships,flags:state.flags,personality:state.personality,journal:state.journal}}
function autoSave(){if(["splash","title"].includes(state.screen))return;localStorage.setItem(SAVE.auto,JSON.stringify(snapshot()));flashSave(L("auto_saved"))}
function manualSave(){localStorage.setItem(SAVE.manual,JSON.stringify(snapshot()));flashSave(L("manual_saved"))}
function restore(data){
state.found=new Set(data.found||[]);state.history=data.history||[];state.chapter=data.chapter||1;state.checkpoint=data.checkpoint||"ch1_start";
state.characters=Object.assign({Benedict:true,North:state.chapter>=2,Elena:false},data.characters||{});
state.relationships=data.relationships||{North:{trust:70,respect:78,attachment:58,suspicion:3}};
if(!state.relationships.Elena)state.relationships.Elena={trust:35,respect:52,attachment:18,suspicion:10};
state.flags=data.flags||{};state.personality=data.personality||{warm:0,observant:0,direct:0};
const restoredJournalUnlocked=Boolean(
data.journal&&data.journal.unlocked===true||
state.flags.chapter2_character_feature_unlocked===true||
Number(state.chapter)>2
);
state.journal=Object.assign({unlocked:restoredJournalUnlocked,seen:false,introShown:false},data.journal||{});
if(state.chapter===2&&!state.flags.police_intro_complete){
state.characters.Kittisak=false;
state.characters.Somchai=false
}
const target=data.screen||"crime";
show(target);
syncCharacterJournalVisibility();
setTimeout(()=>syncExtendedAmbience(target),0);
if(state.chapter===2&&target==="office2")setTimeout(resumeChapter2Office,350);
if(state.chapter===2&&target==="apartment2")setTimeout(runApartmentOpening,350);
if(state.chapter===2&&target==="cafe2"){state.checkpoint=state.checkpoint||"ch2_cafe_arrival";setTimeout(runCafeOpening,350)}
if(state.chapter===2&&target==="police2")state.checkpoint="ch2_police_arrival"
}
function loadSave(kind){const raw=localStorage.getItem(SAVE[kind]);if(!raw){alert(L("no_save"));return}restore(JSON.parse(raw));closeOverlays()}
function flashSave(text){const element=$("#saveIndicator");element.textContent=text;element.classList.add("show");clearTimeout(flashSave.timer);flashSave.timer=setTimeout(()=>element.classList.remove("show"),900)}
function showBadge(text){const element=$("#badge");element.textContent=text;element.classList.add("show");clearTimeout(showBadge.timer);showBadge.timer=setTimeout(()=>element.classList.remove("show"),1500)}
PORTRAITS.Elena={"neutral":"assets/images/f6ecc87ac62112b6.jpg","soft":"assets/images/0b58d037372b3893.jpg","warm":"assets/images/3717ee1601191df6.jpg","thinking":"assets/images/17dc23af74dd7be5.jpg","curious":"assets/images/45cdccdac98f15a4.jpg","attentive":"assets/images/ca489d84591703e2.jpg","skeptical":"assets/images/14251628ba5d808c.jpg","smirk":"assets/images/bedce8e0dbb90d49.jpg","confident":"assets/images/798d0dbcf7dc7040.jpg","serious":"assets/images/94c43ae882e43c69.jpg","concerned":"assets/images/258f1557b5b1d98e.jpg","surprised":"assets/images/7e5f812b3c7eec9e.jpg","shocked":"assets/images/54fa2709eff69d56.jpg","worried":"assets/images/39bae3b954927ff5.jpg","sad":"assets/images/c91ad48a8b115dce.jpg","disappointed":"assets/images/cd01390acb6b500a.jpg","embarrassed":"assets/images/2ad821b6a881a4c0.jpg","amused":"assets/images/5b2f58b400414246.jpg","laughing":"assets/images/a192e652ca70c9db.jpg","determined":"assets/images/e77228fe9ffb3470.jpg","calm":"assets/images/8d5572a029fa0d78.jpg","playful":"assets/images/11558d3825786804.jpg","charming":"assets/images/87fb1e543d974f07.jpg","mysterious":"assets/images/33e95d83dec5c517.jpg"};
const JOURNAL_PORTRAITS={Elena:{"neutral":"assets/images/f6ecc87ac62112b6.jpg","soft":"assets/images/0b58d037372b3893.jpg","warm":"assets/images/3717ee1601191df6.jpg","thinking":"assets/images/17dc23af74dd7be5.jpg","curious":"assets/images/45cdccdac98f15a4.jpg","attentive":"assets/images/ca489d84591703e2.jpg","skeptical":"assets/images/14251628ba5d808c.jpg","smirk":"assets/images/bedce8e0dbb90d49.jpg","confident":"assets/images/798d0dbcf7dc7040.jpg","serious":"assets/images/94c43ae882e43c69.jpg","concerned":"assets/images/258f1557b5b1d98e.jpg","surprised":"assets/images/7e5f812b3c7eec9e.jpg","shocked":"assets/images/54fa2709eff69d56.jpg","worried":"assets/images/39bae3b954927ff5.jpg","sad":"assets/images/c91ad48a8b115dce.jpg","disappointed":"assets/images/cd01390acb6b500a.jpg","embarrassed":"assets/images/2ad821b6a881a4c0.jpg","amused":"assets/images/5b2f58b400414246.jpg","laughing":"assets/images/a192e652ca70c9db.jpg","determined":"assets/images/e77228fe9ffb3470.jpg","calm":"assets/images/8d5572a029fa0d78.jpg","playful":"assets/images/11558d3825786804.jpg","charming":"assets/images/87fb1e543d974f07.jpg","mysterious":"assets/images/33e95d83dec5c517.jpg"}};

Object.assign(PORTRAITS,{
Kittisak:{
neutral:"assets/images/8b34fe5c26f1292e.png",
smile:"assets/images/abfdadf0fe1aa1fa.png",
thinking:"assets/images/42680de18fd5cf19.png",
serious:"assets/images/373da6e479378856.png"
},
Somchai:{
neutral:"assets/images/fd3e65df3ccfc9b2.png",
flirty:"assets/images/f5fe30e1f7bcbfa6.png",
joking:"assets/images/f3898e8324f35720.png",
surprised:"assets/images/dc5c671820c2c534.png",
rejected:"assets/images/901cc042184f4edb.png"
}
});
Object.assign(JOURNAL_PORTRAITS,{
Kittisak:{neutral:"assets/images/8b34fe5c26f1292e.png"},
Somchai:{neutral:"assets/images/fd3e65df3ccfc9b2.png"}
});

installChapter12SystemRepair();
