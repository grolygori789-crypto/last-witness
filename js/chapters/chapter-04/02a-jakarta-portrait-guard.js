/* LAST WITNESS — Chapter IV Phase II Portrait Registry Guard 0.15.0
 * Deterministic one-time registry fill for Cheryl and Farid.
 * No observer, timer, polling, CSS, image processing or dialogue mutation.
 * Existing approved mappings always win; only missing mappings are supplied.
 */
(function(){
"use strict";
if(window.LastWitnessJakartaPortraitGuard?.version==="0.15.0")return;

const CHERYL_BASE="assets/images/chapter-03/phase-04/cheryl/";
const FARID_BASE="assets/images/chapter-03/phase-04/farid/";

function mergeCharacter(names,defaults){
 const existing=names.map(name=>PORTRAITS[name]).find(Boolean)||{};
 const merged=Object.assign({},defaults,existing);
 names.forEach(name=>{PORTRAITS[name]=merged});
 return merged
}

function install(){
 if(typeof PORTRAITS!=="object"||!PORTRAITS)return false;

 const cheryl=mergeCharacter(
  ["Inspector Cheryl Goh","สารวัตร Cheryl Goh"],
  {
   neutral:CHERYL_BASE+"neutral.png?v=0930",
   serious:CHERYL_BASE+"neutral.png?v=0930",
   skeptical:CHERYL_BASE+"skeptical.png?v=0930",
   side:CHERYL_BASE+"side.png?v=0930",
   arms_crossed:CHERYL_BASE+"arms_crossed.png?v=0930",
   surprised:CHERYL_BASE+"surprised.png?v=0930",
   thinking:CHERYL_BASE+"thinking.png?v=0930",
   faint_smile:CHERYL_BASE+"faint_smile.png?v=0930",
   explaining:CHERYL_BASE+"explaining.png?v=0930",
   alert:CHERYL_BASE+"alert.png?v=0930",
   concerned:CHERYL_BASE+"concerned.png?v=0930",
   reading:CHERYL_BASE+"reading.png?v=0930",
   closed_off:CHERYL_BASE+"closed_off.png?v=0930",
   focused:CHERYL_BASE+"thinking.png?v=0930",
   focused_command:CHERYL_BASE+"arms_crossed.png?v=0930",
   restrained_amusement:CHERYL_BASE+"faint_smile.png?v=0930",
   professional_fluster:CHERYL_BASE+"surprised.png?v=0930",
   softened_professional:CHERYL_BASE+"faint_smile.png?v=0930"
  }
 );

 const farid=mergeCharacter(
  ["Farid Rahman","Farid Rahman (SPF)","ฟาริด ราห์มาน"],
  {
   neutral:FARID_BASE+"neutral.png?v=0930",
   serious:FARID_BASE+"neutral.png?v=0930",
   side:FARID_BASE+"side.png?v=0930",
   tablet:FARID_BASE+"tablet.png?v=0930",
   smirk:FARID_BASE+"smirk.png?v=0930",
   look_up:FARID_BASE+"look_up.png?v=0930",
   surprised:FARID_BASE+"surprised.png?v=0930",
   explaining:FARID_BASE+"explaining.png?v=0930",
   amused:FARID_BASE+"amused.png?v=0930",
   thinking:FARID_BASE+"thinking.png?v=0930",
   concerned:FARID_BASE+"concerned.png?v=0930",
   warm_smile:FARID_BASE+"warm_smile.png?v=0930",
   focused:FARID_BASE+"focused.png?v=0930",
   alert:FARID_BASE+"alert.png?v=0930",
   downcast:FARID_BASE+"downcast.png?v=0930",
   arms_crossed:FARID_BASE+"arms_crossed.png?v=0930",
   tablet_read:FARID_BASE+"tablet_read.png?v=0930",
   coffee:FARID_BASE+"coffee.png?v=0930"
  }
 );

 const required={
  cheryl:["neutral","serious","focused_command"],
  farid:["neutral","serious","tablet_read"]
 };
 const missing=[
  ...required.cheryl.filter(key=>!cheryl[key]).map(key=>"Cheryl."+key),
  ...required.farid.filter(key=>!farid[key]).map(key=>"Farid."+key)
 ];

 window.LastWitnessJakartaPortraitGuard={
  version:"0.15.0",
  installed:missing.length===0,
  missing,
  characters:{cheryl:missing.every(item=>!item.startsWith("Cheryl.")),farid:missing.every(item=>!item.startsWith("Farid."))}
 };

 if(missing.length)console.error("LAST WITNESS Phase II portrait mappings missing:",missing.join(", "));
 return missing.length===0
}

if(!install())console.error("LAST WITNESS Phase II portrait registry guard failed");
})();