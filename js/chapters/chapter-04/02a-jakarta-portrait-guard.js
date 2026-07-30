/* LAST WITNESS — Chapter IV Phase II Cheryl Portrait Guard 0.14.9
 * Deterministic one-time registry fill. No observer, timer or polling.
 * Existing approved mappings always win; only missing mappings are supplied.
 */
(function(){
"use strict";
if(window.LastWitnessJakartaPortraitGuard?.version==="0.14.9")return;

const BASE="assets/images/chapter-03/phase-04/cheryl/";
function install(){
 if(typeof PORTRAITS!=="object"||!PORTRAITS)return false;
 const existing=PORTRAITS["Inspector Cheryl Goh"]||{};
 const defaults={
  neutral:BASE+"neutral.png?v=0930",
  serious:BASE+"neutral.png?v=0930",
  skeptical:BASE+"skeptical.png?v=0930",
  side:BASE+"side.png?v=0930",
  arms_crossed:BASE+"arms_crossed.png?v=0930",
  surprised:BASE+"surprised.png?v=0930",
  thinking:BASE+"thinking.png?v=0930",
  faint_smile:BASE+"faint_smile.png?v=0930",
  explaining:BASE+"explaining.png?v=0930",
  alert:BASE+"alert.png?v=0930",
  concerned:BASE+"concerned.png?v=0930",
  reading:BASE+"reading.png?v=0930",
  closed_off:BASE+"closed_off.png?v=0930",
  focused:BASE+"thinking.png?v=0930",
  focused_command:BASE+"arms_crossed.png?v=0930",
  restrained_amusement:BASE+"faint_smile.png?v=0930",
  professional_fluster:BASE+"surprised.png?v=0930",
  softened_professional:BASE+"faint_smile.png?v=0930"
 };
 const merged=Object.assign({},defaults,existing);
 PORTRAITS["Inspector Cheryl Goh"]=merged;
 PORTRAITS["สารวัตร Cheryl Goh"]=merged;
 window.LastWitnessJakartaPortraitGuard={
  version:"0.14.9",
  installed:Boolean(merged.neutral&&merged.serious&&merged.focused_command)
 };
 return window.LastWitnessJakartaPortraitGuard.installed
}
if(!install())console.error("LAST WITNESS Cheryl portrait registry unavailable");
})();