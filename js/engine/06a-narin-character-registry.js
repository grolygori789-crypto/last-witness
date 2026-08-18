/* LAST WITNESS - Canon Narin Character Registry Extension 0.22.11-nj1
 * Registers Narin before Chapter V Phase II loads and repairs saves where the
 * Phase II unlock flag exists but the canonical Character Journal array missed him.
 * Uses the existing Content Registry unlock/render/dot mechanisms only.
 */
(function(){
"use strict";
const VERSION="0.22.11-nj1";
if(window.LastWitnessNarinCharacterRegistry?.version===VERSION&&window.LastWitnessNarinCharacterRegistry?.installed){try{window.LastWitnessNarinCharacterRegistry.repair?.()}catch(_){}return}
const DATA={
 name:{en:"Narin",th:"Narin"},
 role:{en:"Bangkok Deployment Operations",th:"ฝ่ายปฏิบัติการ Deployment กรุงเทพฯ"},
 status:{en:"Active Scrutiny",th:"อยู่ระหว่างการตรวจเชิงรุก"},
 bio:{en:"A trusted Bangkok deployment actor with real access and real record-concealment exposure. Phase II makes his operational proximity serious evidence without treating it as proof of murder.",th:"บุคคลฝั่งงาน Deployment กรุงเทพฯ ที่ได้รับความไว้วางใจ มีสิทธิ์เข้าถึงจริง และมีความเสี่ยงจากการปกปิดบันทึกจริง เฟส II ทำให้ความใกล้ชิดเชิงปฏิบัติการของเขากลายเป็นหลักฐานสำคัญ โดยยังไม่ถือว่าเป็นหลักฐานฆาตกรรม"},
 src:"assets/images/chapter-05/phase-02/narin-neutral.png?v=0231c5p2r7",
 relation:{value:31},
 metrics:[
  {key:"access",label:{en:"Operational Access",th:"สิทธิ์เข้าถึงเชิงปฏิบัติการ"},value:82},
  {key:"disclosure",label:{en:"Disclosure Confidence",th:"ความน่าเชื่อถือในการเปิดเผยข้อมูล"},value:28},
  {key:"record",label:{en:"Record Integrity Concern",th:"ความกังวลด้านความสมบูรณ์ของบันทึก"},value:88}
 ]
};
function gs(){try{return state}catch(_){return window.state||null}}
function api(){return window.LastWitnessContentRegistry}
function register(){const a=api();if(!a?.characters)return false;a.characters.narin=DATA;return true}
function present(){const s=gs();return Boolean(Array.isArray(s?.lwCharactersUnlocked)&&s.lwCharactersUnlocked.includes("narin"))}
function shouldRepair(){const s=gs(),p=s?.flags?.ch5_p2;return Boolean(s&&(s.flags?.ch5_p2_narin_journal_unlocked===true||p?.narinJournalUnlocked===true||p?.narinChannelEstablished===true||s.flags?.ch5_p2_narin_channel_established===true))}
function ensureUnlocked(opt={}){
 if(!register())return false;const s=gs(),a=api();if(!s||!a)return false;
 s.characters=s.characters||{};s.characters.Narin=true;if(!Array.isArray(s.lwCharactersUnlocked))s.lwCharactersUnlocked=[];if(!Array.isArray(s.lwCharactersUnread))s.lwCharactersUnread=[];
 if(!present())try{a.unlockCharacter?.("narin",{unread:opt.unread!==false,source:opt.source||"story",quiet:opt.quiet===true})}catch(error){console.error("LAST WITNESS Narin canonical unlock failed",error)}
 if(!present()){s.lwCharactersUnlocked.push("narin");if(opt.unread!==false&&!s.lwCharactersUnread.includes("narin"))s.lwCharactersUnread.push("narin")}
 s.characters.Narin=true;try{a.renderCharacters?.(true);a.updateDots?.()}catch(_){}return present()
}
function repair(){if(!register())return false;if(!shouldRepair())return true;return ensureUnlocked({unread:true,source:"story",quiet:true})}
function schedule(){[0,80,220,600,1400,3000].forEach(ms=>setTimeout(repair,ms))}
window.LastWitnessNarinCharacterRegistry={version:VERSION,installed:true,register,ensureUnlocked,repair,present};
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",schedule,{once:true});else schedule();
window.addEventListener("pageshow",()=>setTimeout(repair,40));document.addEventListener("visibilitychange",()=>{if(!document.hidden)setTimeout(repair,60)});
})();
