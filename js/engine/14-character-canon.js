/* LAST WITNESS — Character Journal Canon Verification 0.9.2
 * Applies the owner-confirmed identity and role data to the authoritative
 * Character Journal registry. One-time mutation only. No polling/observer.
 */
(function(){
"use strict";
const VERSION="0.9.2";
const CANON={
 benedict:{
  name:{en:"Benedict",th:"เบเนดิกต์"},age:42,
  role:{en:"Detective",th:"นักสืบ"},
  status:{en:"Lead Investigator",th:"หัวหน้าผู้สืบสวน"},
  bio:{en:"A calm, observant detective who uses humour to keep pressure from controlling the room.",th:"นักสืบสุขุม ช่างสังเกต ใช้อารมณ์ขันช่วยควบคุมแรงกดดันในสถานการณ์"}
 },
 north:{
  name:{en:"North",th:"นอร์ธ"},age:32,
  role:{en:"IT Specialist",th:"ผู้เชี่ยวชาญด้านไอที"},
  status:{en:"Trusted Partner",th:"คู่หูที่ไว้ใจได้"},
  bio:{en:"A precise technical investigator with dry wit and little patience for unsupported conclusions.",th:"ผู้สืบสวนด้านเทคนิคที่แม่นยำ มีอารมณ์ขันแห้งๆ และไม่ยอมรับข้อสรุปที่ไร้หลักฐาน"}
 },
 elena:{
  name:{en:"Elena",th:"เอเลนา"},
  role:{en:"Forensic Analyst",th:"นักวิเคราะห์นิติวิทยาศาสตร์"},
  status:{en:"Professional Contact",th:"ผู้ร่วมงานในคดี"},
  bio:{en:"A capable forensic analyst whose technical knowledge becomes central to the investigation.",th:"นักวิเคราะห์นิติวิทยาศาสตร์ฝีมือดี ผู้มีความรู้ทางเทคนิคที่สำคัญต่อการสืบสวน"}
 },
 somchai:{
  name:{en:"Somchai",th:"สมชาย"},
  role:{en:"Police Officer",th:"เจ้าหน้าที่ตำรวจ"},
  status:{en:"Cooperative",th:"ให้ความร่วมมือ"},
  bio:{en:"A Bangkok police officer connected to the official handling of the case.",th:"เจ้าหน้าที่ตำรวจนครบาลที่เกี่ยวข้องกับการดำเนินคดีอย่างเป็นทางการ"}
 },
 kittisak:{
  name:{en:"Kittisak Siriwat",th:"กิตติศักดิ์ ศิริวัฒน์"},
  role:{en:"Police Captain",th:"ร้อยตำรวจเอก"},
  status:{en:"Reserved",th:"ระมัดระวังตัว"},
  bio:{en:"A disciplined police captain who controls access to the certified evidence record and refuses conclusions that outrun the evidence.",th:"นายตำรวจยศร้อยตำรวจเอกผู้เคร่งครัด ควบคุมการเข้าถึงบันทึกพยานหลักฐานที่รับรองแล้ว และไม่ยอมรับข้อสรุปที่ไกลเกินหลักฐาน"}
 },
 ratchata:{
  name:{en:"Ratchata (Dr. Singh)",th:"Ratchata (Dr. Singh)"},age:43,
  role:{en:"Senior Medical Examiner",th:"แพทย์นิติเวชอาวุโส"},
  status:{en:"Independent Expert",th:"ผู้เชี่ยวชาญอิสระ"},
  bio:{en:"A Thai Sikh forensic pathologist: dry-witted and uncompromising about what the body can actually prove.",th:"แพทย์นิติเวชชาวไทยเชื้อสายซิกข์ พูดมุกหน้าตาย และเคร่งครัดกับสิ่งที่ร่างกายพิสูจน์ได้จริง"}
 }
};
function applyCanon(){
 const api=window.LastWitnessContentRegistry;
 const characters=api?.characters;
 if(!characters)return false;
 const missing=[];
 for(const [id,data] of Object.entries(CANON)){
  if(!characters[id]){missing.push(id);continue}
  characters[id].name={...data.name};
  if(Object.prototype.hasOwnProperty.call(data,"age"))characters[id].age=data.age;
  else delete characters[id].age;
  characters[id].role={...data.role};
  characters[id].status={...data.status};
  characters[id].bio={...data.bio};
 }
 if(missing.length)console.error("LAST WITNESS character canon missing registry entries:",missing.join(", "));
 try{api.renderCharacters?.(true)}catch(error){console.error("LAST WITNESS character canon render failed",error)}
 window.LastWitnessCharacterCanon={characters:CANON,version:VERSION};
 return missing.length===0
}
if(!applyCanon()){
 document.addEventListener("DOMContentLoaded",()=>queueMicrotask(applyCanon),{once:true});
}
})();
