/* LAST WITNESS - Hidden Case Architecture 0.21.0
 * Owner-auditable, player-invisible, deterministic and idempotent case-state derivation.
 * Relationship values remain untouched and are never repurposed as criminal attribution.
 */
(function(){
"use strict";
const VERSION="0.21.0";
if(window.LastWitnessHiddenCase?.version===VERSION)return;

const DIMENSIONS=["attribution","motive","means","opportunity","concealment","corroboration","admissibility","breadth","institutional","contradiction"];
const PRINCIPALS=["kittisak","narin","adrian","arman","ika","elena"];
const GLOBALS=["evidenceIntegrity","chainOfCustody","witnessProtection","northSafety","publicRecordControl","institutionalTrust","corroborationBreadth","alternativeHypothesesPreserved","physicalTruthIntegrity","chronologyIntegrity","originalRecordIntegrity"];
const gs=()=>{try{return state}catch(_){return window.state||null}};
const clone=v=>JSON.parse(JSON.stringify(v));
const zeroCase=()=>Object.fromEntries(DIMENSIONS.map(k=>[k,0]));
const zeroGlobal=()=>Object.fromEntries(GLOBALS.map(k=>[k,0]));
const principalMap=()=>Object.fromEntries(PRINCIPALS.map(k=>[k,zeroCase()]));
const clamp=(n,min=-99,max=99)=>Math.max(min,Math.min(max,Number(n)||0));

function foundHas(id){const f=gs()?.found;try{return typeof f?.has==="function"?f.has(id):Array.isArray(f)?f.includes(id):false}catch(_){return false}}
function phase(n){return gs()?.chapter4?.["phase"+n]||{}}
function c3phase(n){return gs()?.chapter3?.["phase"+n]||{}}
function flag(id){return Boolean(gs()?.flags?.[id])}

function add(ledger,suspects,globals,id,source,effects,note){
 const normalized={suspects:{},globals:{}};
 Object.entries(effects?.suspects||{}).forEach(([who,dims])=>{
  if(!suspects[who])return;normalized.suspects[who]={};
  Object.entries(dims||{}).forEach(([dim,delta])=>{if(!(dim in suspects[who]))return;delta=Number(delta)||0;suspects[who][dim]=clamp(suspects[who][dim]+delta);normalized.suspects[who][dim]=delta})
 });
 Object.entries(effects?.globals||{}).forEach(([key,delta])=>{if(!(key in globals))return;delta=Number(delta)||0;globals[key]=clamp(globals[key]+delta);normalized.globals[key]=delta});
 ledger.push({id,source,effects:normalized,note:note||""})
}

function derive(){
 const s=gs()||{},suspects=principalMap(),globals=zeroGlobal(),ledger=[];
 const p4=phase(4),p5=phase(5),p6=phase(6),p7=phase(7),p8=phase(8);
 const c3p4=c3phase(4),c3p6=c3phase(6),c3p8=c3phase(8),c3p9=c3phase(9);

 /* Legacy interpretation: read accepted state only. Nothing below mutates old chapters,
  * and relationship values are intentionally ignored. Early chapters carry low case weight. */
 const ch1Core=["phone","blood","laptop","suitcase"].filter(foundHas);
 const ch1Record=["message","calls","note"].filter(foundHas);
 if(ch1Core.length>=3)add(ledger,suspects,globals,"legacy.ch1.room1807.core","Chapter I · Room 1807",{globals:{physicalTruthIntegrity:1,corroborationBreadth:1,alternativeHypothesesPreserved:1}},"Room 1807 core evidence was substantially preserved. Early-scene evidence informs investigative breadth only.");
 if(ch1Record.length>=2)add(ledger,suspects,globals,"legacy.ch1.room1807.record","Chapter I · Room 1807",{globals:{originalRecordIntegrity:1,chronologyIntegrity:1}},"The R.-linked phone record survived. It is a record-layer lead, not criminal attribution.");

 switch(String(s?.flags?.chapter2_first_choice||"")){
  case"warm":add(ledger,suspects,globals,"legacy.ch2.first.warm","Chapter II choice",{globals:{institutionalTrust:1}},"A cooperative opening style is recoverable from the stored Chapter II choice.");break;
  case"observant":add(ledger,suspects,globals,"legacy.ch2.first.observant","Chapter II choice",{globals:{corroborationBreadth:1,chronologyIntegrity:1}},"An observational opening style strengthens later cross-checking without naming a suspect.");break;
  case"direct":add(ledger,suspects,globals,"legacy.ch2.first.direct","Chapter II choice",{globals:{evidenceIntegrity:1}},"A direct evidence-first style is retained as a weak global investigation signal.");break;
 }
 switch(String(s?.flags?.cafe_first_elena_choice||"")){
  case"friendly":add(ledger,suspects,globals,"legacy.ch2.cafe.friendly","Chapter II choice",{globals:{institutionalTrust:1}},"The café response is treated only as investigative/social method. It never scores Elena as a criminal suspect.");break;
  case"analytical":add(ledger,suspects,globals,"legacy.ch2.cafe.analytical","Chapter II choice",{globals:{chronologyIntegrity:1,corroborationBreadth:1}},"The analytical café response weakly reinforces chronology review, not Elena attribution.");break;
  case"guarded":add(ledger,suspects,globals,"legacy.ch2.cafe.guarded","Chapter II choice",{globals:{alternativeHypothesesPreserved:1}},"The guarded café response preserves hypothesis breadth without converting relationship suspicion into case score.");break;
 }
 switch(String(s?.flags?.police_approach||"")){
  case"charm":add(ledger,suspects,globals,"legacy.ch2.police.charm","Chapter II choice",{globals:{institutionalTrust:1,chainOfCustody:1}},"Professional cooperation with Evidence Division is retained as a weak institutional signal.");break;
  case"precision":add(ledger,suspects,globals,"legacy.ch2.police.precision","Chapter II choice",{globals:{evidenceIntegrity:1,chainOfCustody:1}},"Precision at Evidence Division weakly strengthens evidence handling.");break;
  case"pressure":add(ledger,suspects,globals,"legacy.ch2.police.pressure","Chapter II choice",{globals:{chronologyIntegrity:1,alternativeHypothesesPreserved:1}},"Pressure on the impossible timestamp keeps contradiction pressure alive without assigning guilt.");break;
 }
 if(flag("police_evidence_collected"))add(ledger,suspects,globals,"legacy.ch2.police.accession","Chapter II · Evidence Division",{globals:{originalRecordIntegrity:1,chronologyIntegrity:2,evidenceIntegrity:1}},"The certified accession contradiction was preserved before later cross-border reconstruction.");

 switch(String(c3p4?.choiceKey||"")){
  case"evidence":add(ledger,suspects,globals,"legacy.ch3.p4.evidence","Chapter III · Singapore Office choice",{globals:{evidenceIntegrity:2,alternativeHypothesesPreserved:1}},"Certified header and relay acknowledgement were deliberately separated before theory.");break;
  case"urgency":add(ledger,suspects,globals,"legacy.ch3.p4.urgency","Chapter III · Singapore Office choice",{globals:{chronologyIntegrity:2,corroborationBreadth:1}},"The accepted permission and impossible chronology were prioritized for cross-checking.");break;
  case"cooperate":add(ledger,suspects,globals,"legacy.ch3.p4.cooperate","Chapter III · Singapore Office choice",{globals:{institutionalTrust:2,chainOfCustody:1}},"The investigation stayed inside read-only jurisdictional scope.");break;
 }
 switch(String(c3p6?.entryChoiceKey||"")){
  case"preserve":add(ledger,suspects,globals,"legacy.ch3.p6.preserve","Chapter III · Serviced Apartment choice",{globals:{evidenceIntegrity:2,physicalTruthIntegrity:1}},"Scene positions were preserved before interpreting the safehouse narrative.");break;
  case"network":add(ledger,suspects,globals,"legacy.ch3.p6.network","Chapter III · Serviced Apartment choice",{globals:{corroborationBreadth:1,alternativeHypothesesPreserved:1}},"Network path was separated from human presence.");break;
  case"departure":add(ledger,suspects,globals,"legacy.ch3.p6.departure","Chapter III · Serviced Apartment choice",{globals:{physicalTruthIntegrity:1,alternativeHypothesesPreserved:2}},"Departure evidence was read as staged narrative rather than identity proof.");break;
 }
 if(c3p8?.bundleSealed||c3p8?.complete)add(ledger,suspects,globals,"legacy.ch3.p8.mirror_bundle","Chapter III · The Mirror Remembers",{globals:{evidenceIntegrity:2,chainOfCustody:2,originalRecordIntegrity:2,chronologyIntegrity:2}},"The mirror bundle preserved raw receipt order and the distinction between accepted access and human identity.");
 if(c3p9?.bundleSealed||c3p9?.complete)add(ledger,suspects,globals,"legacy.ch3.p9.callback_bundle","Chapter III · Callback",{globals:{evidenceIntegrity:2,corroborationBreadth:2,alternativeHypothesesPreserved:2}},"The callback bundle preserved volatile material, dead-drop integrity and dual-origin uncertainty.");
 switch(String(c3p9?.choiceKey||"")){
  case"authorship":add(ledger,suspects,globals,"legacy.ch3.p9.authorship","Chapter III · Callback choice",{globals:{alternativeHypothesesPreserved:1,evidenceIntegrity:1}},"Authorship was kept separate from principal responsibility.");break;
  case"motive":add(ledger,suspects,globals,"legacy.ch3.p9.motive","Chapter III · Callback choice",{globals:{corroborationBreadth:1,alternativeHypothesesPreserved:1}},"Motive was tested without assuming the technical author ordered the murders.");break;
  case"fear":add(ledger,suspects,globals,"legacy.ch3.p9.fear","Chapter III · Callback choice",{globals:{alternativeHypothesesPreserved:2}},"Fear of misattribution was retained as a reason to preserve role separation.");break;
 }

 /* Chapter IV legacy interpretation continues from accepted runtime. */
 if(p4?.complete||flag("ch4_arman_identity_verified"))add(ledger,suspects,globals,"legacy.ch4.p4.arman_verified","Chapter IV · Phase IV",{suspects:{arman:{attribution:2,means:2,concealment:1,contradiction:1}},globals:{alternativeHypothesesPreserved:1}},"Arman is verified as a real technical actor; identity is not equivalent to principal responsibility.");
 if((p4?.evidenceCollected||[]).includes("ch4_p4_controlled_proxy")||foundHas("ch4_p4_controlled_proxy"))add(ledger,suspects,globals,"legacy.ch4.p4.controlled_proxy","Chapter IV · Phase IV",{suspects:{arman:{means:2,corroboration:1,contradiction:1}},globals:{corroborationBreadth:1}},"Controlled proxy evidence supports tool-chain involvement while preserving role separation.");
 if((p4?.evidenceCollected||[]).includes("ch4_p4_source_behaviour_match")||foundHas("ch4_p4_source_behaviour_match"))add(ledger,suspects,globals,"legacy.ch4.p4.behaviour_match","Chapter IV · Phase IV",{suspects:{arman:{means:2,concealment:2}},globals:{evidenceIntegrity:1}},"Behavioural fingerprint supports authorship of a technical layer, not victim selection.");
 if((p4?.evidenceCollected||[]).includes("ch4_p4_blind_client_certificate")||foundHas("ch4_p4_blind_client_certificate"))add(ledger,suspects,globals,"legacy.ch4.p4.blind_client","Chapter IV · Phase IV",{suspects:{arman:{concealment:2,contradiction:2}},globals:{alternativeHypothesesPreserved:2}},"Blind-client design preserves uncertainty about the instructing party.");

 if(p5?.complete||flag("ch4_p5_ika_identified"))add(ledger,suspects,globals,"legacy.ch4.p5.ika_identified","Chapter IV · Phase V",{suspects:{ika:{attribution:2,opportunity:1,concealment:2}},globals:{witnessProtection:1,northSafety:1}},"Ika is a real hostile field actor; the accepted timeline does not make her the murder principal.");

 if(p6?.complete||flag("ch4_p6_relay_route_supported"))add(ledger,suspects,globals,"legacy.ch4.p6.route_supported","Chapter IV · Phase VI",{globals:{physicalTruthIntegrity:2,chronologyIntegrity:1,corroborationBreadth:1,alternativeHypothesesPreserved:1}},"The relay route is supported without resolving the human decision layer.");
 if(flag("ch4_p6_maintenance_window_preserved"))add(ledger,suspects,globals,"legacy.ch4.p6.window_preserved","Chapter IV · Phase VI",{globals:{evidenceIntegrity:2,chainOfCustody:1,chronologyIntegrity:2}},"Maintenance-window material survived in a form usable for later reconstruction.");
 if(flag("ch4_p6_north_active"))add(ledger,suspects,globals,"legacy.ch4.p6.north_active","Chapter IV · Phase VI",{globals:{northSafety:1,witnessProtection:1}},"North remains an active technical investigator.");

 if(p7?.complete||flag("ch4_p7_facility_lawfully_inspected"))add(ledger,suspects,globals,"legacy.ch4.p7.lawful_facility","Chapter IV · Phase VII",{globals:{chainOfCustody:3,evidenceIntegrity:2,physicalTruthIntegrity:3,institutionalTrust:1}},"JKT-R7 was inspected under lawful scope.");
 if(flag("ch4_p7_reader_clock_normalized"))add(ledger,suspects,globals,"legacy.ch4.p7.clock","Chapter IV · Phase VII",{globals:{chronologyIntegrity:3,corroborationBreadth:1}},"Reader clock was normalized before inference.");
 if(flag("ch4_p7_r18_correlated"))add(ledger,suspects,globals,"legacy.ch4.p7.r18","Chapter IV · Phase VII",{globals:{physicalTruthIntegrity:3,corroborationBreadth:2}},"R-18 correlation establishes a physical route, not a human identity.");
 if(flag("ch4_p7_isolation_order_authorized"))add(ledger,suspects,globals,"legacy.ch4.p7.authorized_isolation","Chapter IV · Phase VII",{globals:{chainOfCustody:2,institutionalTrust:1}},"Isolation was authorized and auditable.");
 if(flag("ch4_p7_secondary_continuity_supported"))add(ledger,suspects,globals,"legacy.ch4.p7.secondary_path","Chapter IV · Phase VII",{suspects:{adrian:{means:1,contradiction:1},arman:{means:1,contradiction:1},narin:{opportunity:1,contradiction:1}},globals:{alternativeHypothesesPreserved:2,physicalTruthIntegrity:2}},"Secondary continuity keeps architecture, wrapper and deployment theories simultaneously viable.");

 /* Phase VIII factual gates. These are derived from the phase state, never incremented on entry. */
 if(p8?.matrixComplete)add(ledger,suspects,globals,"native.ch4.p8.cooperation_paradox","Chapter IV · Phase VIII",{suspects:{adrian:{contradiction:2,concealment:1},arman:{contradiction:2,concealment:1},ika:{contradiction:2,concealment:1}},globals:{alternativeHypothesesPreserved:3,corroborationBreadth:1}},"Truthful partial disclosures are distinguished from complete disclosure.");
 if(p8?.armanBoundaryReviewed)add(ledger,suspects,globals,"native.ch4.p8.arman_boundary","Chapter IV · Phase VIII",{suspects:{arman:{concealment:3,means:2,corroboration:1,contradiction:2},narin:{opportunity:1}},globals:{alternativeHypothesesPreserved:1}},"The authentic execution package does not cover the deeper broker-behaviour layer.");
 if(p8?.ikaPreAsterReviewed)add(ledger,suspects,globals,"native.ch4.p8.ika_pre_aster","Chapter IV · Phase VIII",{suspects:{ika:{opportunity:3,concealment:3,corroboration:1,contradiction:2}},globals:{chronologyIntegrity:2,alternativeHypothesesPreserved:1}},"Aster recruitment remains true while pre-Aster history remains only partly verified.");
 if(p8?.bangkokNoticeReviewed)add(ledger,suspects,globals,"native.ch4.p8.bangkok_notice","Chapter IV · Phase VIII",{suspects:{kittisak:{institutional:3,concealment:2,admissibility:1},narin:{institutional:1},adrian:{institutional:1}},globals:{chainOfCustody:1,institutionalTrust:1,publicRecordControl:1}},"A lawful-looking preservation order creates an institutional handling question without proving criminal intent.");
 if(p8?.registrarTraceReviewed)add(ledger,suspects,globals,"native.ch4.p8.registrar_trace","Chapter IV · Phase VIII",{suspects:{kittisak:{contradiction:1},narin:{contradiction:1},adrian:{contradiction:1},arman:{contradiction:1},ika:{contradiction:1}},globals:{originalRecordIntegrity:2,chronologyIntegrity:2,alternativeHypothesesPreserved:2}},"R. is retained as a record-layer lead rather than a suspect identity.");
 if(p8?.northRemovalPreserved)add(ledger,suspects,globals,"native.ch4.p8.false_record","Chapter IV · Phase VIII",{globals:{northSafety:3,witnessProtection:2,publicRecordControl:2}},"The team deliberately preserves North's public removal status as protective operational cover.");

 /* Ordinary player choices. One choice never resolves a principal; each shifts multiple proof conditions. */
 switch(String(p8?.theoryApproach||"")){
  case"boundaries":add(ledger,suspects,globals,"choice.ch4.p8.theory.boundaries","Chapter IV · Phase VIII choice",{suspects:{adrian:{contradiction:1},arman:{contradiction:1},ika:{contradiction:1}},globals:{alternativeHypothesesPreserved:3,corroborationBreadth:2}},"Preserve omitted boundaries before narrowing the theory.");break;
  case"chronology":add(ledger,suspects,globals,"choice.ch4.p8.theory.chronology","Chapter IV · Phase VIII choice",{suspects:{ika:{opportunity:2,contradiction:1},narin:{opportunity:1,contradiction:1}},globals:{chronologyIntegrity:3,corroborationBreadth:1}},"Cross-check omissions against the physical chronology.");break;
  case"custody":add(ledger,suspects,globals,"choice.ch4.p8.theory.custody","Chapter IV · Phase VIII choice",{suspects:{kittisak:{institutional:2,admissibility:1,contradiction:1}},globals:{chainOfCustody:3,institutionalTrust:2,evidenceIntegrity:1}},"Audit custody and authority before chasing another name.");break;
 }
 switch(String(p8?.bangkokResponse||"")){
  case"written":add(ledger,suspects,globals,"choice.ch4.p8.bangkok.written","Chapter IV · Phase VIII choice",{suspects:{kittisak:{corroboration:2,institutional:1}},globals:{chainOfCustody:2,institutionalTrust:2}},"Request written scope while preserving cooperation.");break;
  case"parallel":add(ledger,suspects,globals,"choice.ch4.p8.bangkok.parallel","Chapter IV · Phase VIII choice",{suspects:{kittisak:{concealment:1,contradiction:1}},globals:{evidenceIntegrity:3,originalRecordIntegrity:1,publicRecordControl:1}},"Preserve an independent comparison before transfer.");break;
  case"log":add(ledger,suspects,globals,"choice.ch4.p8.bangkok.log","Chapter IV · Phase VIII choice",{suspects:{kittisak:{admissibility:1}},globals:{chainOfCustody:2,institutionalTrust:3}},"Accept the lawful order and log the complete transfer boundary.");break;
 }

 const strength={};
 PRINCIPALS.forEach(who=>{const d=suspects[who];strength[who]=d.attribution+d.motive+d.means+d.opportunity+d.concealment+d.corroboration+d.admissibility+d.breadth+d.institutional-Math.max(0,d.contradiction*.55)});
 const ranked=Object.entries(strength).sort((a,b)=>b[1]-a[1]).map(([id,value])=>({id,value:Number(value.toFixed(2))}));
 return {version:VERSION,suspects,globals,ledger,ranked,leader:ranked[0]?.id||"unresolved",relationshipSystemUntouched:true}
}

function recompute(){const snapshot=derive();const s=gs();if(s){s.hiddenCase=s.hiddenCase&&typeof s.hiddenCase==="object"?s.hiddenCase:{};s.hiddenCase.version=VERSION;s.hiddenCase.derived=clone(snapshot)}return snapshot}
function snapshot(){return clone(recompute())}
function inspectorText(){const d=snapshot();return JSON.stringify(d,null,2)}

window.LastWitnessHiddenCase={version:VERSION,dimensions:[...DIMENSIONS],principals:[...PRINCIPALS],globals:[...GLOBALS],derive,recompute,snapshot,inspectorText};
})();
