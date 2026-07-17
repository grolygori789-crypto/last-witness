/* Last Witness Full Refactor
 * Audio, save/load and portrait registration
 * Master Source lines 229-315
 */

function setVolumes(){
AUDIO.theme.volume=state.music;AUDIO.rain.volume=state.music*.48;AUDIO.office.volume=state.music*.82;AUDIO.morningOffice.volume=state.music*.72;AUDIO.cafe.volume=state.music*.78;AUDIO.evidence.volume=state.sfx*.8;AUDIO.police.volume=state.music*.76;AUDIO.crime.volume=state.music;AUDIO.click.volume=state.sfx;AUDIO.page.volume=state.sfx;AUDIO.steps.volume=state.sfx*.8;AUDIO.vibrate.volume=state.sfx;AUDIO.chapter.volume=state.music;
}
function stopAudio(audio){
if(!audio)return;
audio.pause();
audio.currentTime=0;
}
function stopLoops(){[AUDIO.theme,AUDIO.rain,AUDIO.office,AUDIO.crime,AUDIO.morningOffice,AUDIO.cafe,AUDIO.police].forEach(stopAudio)}
function stopPhoneVibration(){
clearTimeout(stopPhoneVibration.timer);
stopAudio(AUDIO.vibrate);
}
function playPhoneVibration(duration=3600){
if(!state.sound)return;
stopPhoneVibration();
AUDIO.vibrate.currentTime=0;
AUDIO.vibrate.volume=state.sfx;
AUDIO.vibrate.play().catch(()=>{});
stopPhoneVibration.timer=setTimeout(stopPhoneVibration,duration);
}
function stopChapterAudio(){
clearTimeout(stopChapterAudio.timer);
stopAudio(AUDIO.chapter);
AUDIO.chapter.volume=state.music;
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
state.journal=Object.assign({unlocked:state.chapter>=2,seen:false,introShown:false},data.journal||{});
if(state.chapter===2&&!state.flags.police_intro_complete){
  state.characters.Kittisak=false;
  state.characters.Somchai=false;
}
const target=data.screen||"crime";
show(target);
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
