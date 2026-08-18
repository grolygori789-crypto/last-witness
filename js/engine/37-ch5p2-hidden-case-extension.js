/* LAST WITNESS - Chapter V Phase II Hidden Case Extension 0.22.11-c5h3
 * Idempotent Chapter V Phase II evidence interpretation layered over the accepted
 * Hidden Case 0.21.0 engine. No relationship mutation and no Elena leakage.
 */
(function(){
"use strict";
const VERSION="0.22.11-c5h3";
if(window.LastWitnessChapter5Phase2HiddenCase?.version===VERSION&&window.LastWitnessChapter5Phase2HiddenCase?.installed)return;
const clone=v=>JSON.parse(JSON.stringify(v));
const gs=()=>{try{return state}catch(_){return window.state||null}};
const clamp=(n,min=-99,max=99)=>Math.max(min,Math.min(max,Number(n)||0));
const dims=["attribution","motive","means","opportunity","concealment","corroboration","admissibility","breadth","institutional","contradiction"];
let installed=false,base=null;
function flag(id){return Boolean(gs()?.flags?.[id])}
function hasEntry(snapshot,id){return Array.isArray(snapshot?.ledger)&&snapshot.ledger.some(x=>x?.id===id)}
function add(snapshot,id,source,effects,note){
 if(hasEntry(snapshot,id))return;
 const normalized={suspects:{},globals:{}};
 Object.entries(effects?.suspects||{}).forEach(([who,changes])=>{
  const target=snapshot?.suspects?.[who];if(!target)return;normalized.suspects[who]={};
  Object.entries(changes||{}).forEach(([dim,delta])=>{if(!(dim in target))return;delta=Number(delta)||0;target[dim]=clamp(target[dim]+delta);normalized.suspects[who][dim]=delta})
 });
 Object.entries(effects?.globals||{}).forEach(([key,delta])=>{if(!(key in (snapshot?.globals||{})))return;delta=Number(delta)||0;snapshot.globals[key]=clamp(snapshot.globals[key]+delta);normalized.globals[key]=delta});
 snapshot.ledger.push({id,source,effects:normalized,note})
}
function rerank(snapshot){
 const out=[];Object.entries(snapshot?.suspects||{}).forEach(([who,d])=>{let value=0;["attribution","motive","means","opportunity","concealment","corroboration","admissibility","breadth","institutional"].forEach(k=>value+=Number(d?.[k]||0));value-=Math.max(0,Number(d?.contradiction||0)*.55);out.push({id:who,value:Number(value.toFixed(2))})});out.sort((a,b)=>b.value-a.value);snapshot.ranked=out;snapshot.leader=out[0]?.id||"unresolved";return snapshot
}
function augment(raw){
 const snapshot=clone(raw||{});snapshot.ledger=Array.isArray(snapshot.ledger)?snapshot.ledger:[];
 if(flag("ch5_p2_kavin_identity_confirmed"))add(snapshot,"native.ch5.p2.kavin_identity","Chapter V · Phase II",{globals:{originalRecordIntegrity:2,evidenceIntegrity:1,corroborationBreadth:1,physicalTruthIntegrity:1}},"Room 1807 victim identity resolves to Kavin Nopparat through a protected record bridge. Identity recovery strengthens the record without attributing the murder.");
 if(flag("ch5_p2_deployment_record_altered"))add(snapshot,"native.ch5.p2.narin_deployment","Chapter V · Phase II",{suspects:{narin:{motive:2,opportunity:3,concealment:3,corroboration:2,breadth:1}},globals:{chronologyIntegrity:2,originalRecordIntegrity:1,evidenceIntegrity:1,corroborationBreadth:1}},"Narin had trusted Bangkok deployment access and the deployment record carries a post-disappearance alteration/suppression signal. This sharply raises operational suspicion.");
 if(flag("ch5_p2_kittisak_prior_knowledge_possible"))add(snapshot,"native.ch5.p2.protected_visibility","Chapter V · Phase II",{suspects:{kittisak:{institutional:1,concealment:1,contradiction:1}},globals:{alternativeHypothesesPreserved:1,institutionalTrust:1}},"Protected-identity visibility may have existed inside Bangkok before Benedict received the name. Earlier Kittisak knowledge remains possible, not proved.");
 if(flag("ch5_p2_attribution_boundary_preserved"))add(snapshot,"choice.ch5.p2.attribution_boundary","Chapter V · Phase II finding",{suspects:{narin:{contradiction:2}},globals:{alternativeHypothesesPreserved:3,evidenceIntegrity:2,corroborationBreadth:1}},"The player preserves the distinction between access/record concealment and murder attribution, keeping causal attribution open.");
 if(flag("ch5_p2_narin_contact_complete"))add(snapshot,"native.ch5.p2.narin_contact","Chapter V · Phase II",{suspects:{narin:{concealment:1,corroboration:1,contradiction:1}},globals:{alternativeHypothesesPreserved:1}},"Narin refuses to explain the record change over the controlled line. The refusal supports concealment pressure but is not a murder confession.");
 return rerank(snapshot)
}
function install(){
 if(installed)return true;const api=window.LastWitnessHiddenCase;if(!api?.derive||api.__ch5p2Wrapped===VERSION)return Boolean(api);
 base={derive:api.derive.bind(api),recompute:api.recompute?.bind(api),snapshot:api.snapshot?.bind(api),inspectorText:api.inspectorText?.bind(api)};
 const derive=()=>augment(base.derive());
 const recompute=()=>{const out=derive(),s=gs();if(s){s.hiddenCase=s.hiddenCase&&typeof s.hiddenCase==="object"?s.hiddenCase:{};s.hiddenCase.version=api.version||"0.21.0";s.hiddenCase.derived=clone(out)}return out};
 const snapshot=()=>clone(recompute());
 api.derive=derive;api.recompute=recompute;api.snapshot=snapshot;api.inspectorText=()=>JSON.stringify(snapshot(),null,2);api.__ch5p2Wrapped=VERSION;
 installed=true;window.LastWitnessChapter5Phase2HiddenCase={version:VERSION,installed:true,install,augment};try{recompute()}catch(_){}return true
}
function schedule(){[0,120,320,700,1400,2600,4800].forEach(ms=>setTimeout(install,ms))}
window.LastWitnessChapter5Phase2HiddenCase={version:VERSION,installed:false,install,augment};
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",schedule,{once:true});else schedule();
})();
