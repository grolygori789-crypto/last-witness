/* LAST WITNESS — Legacy Compatibility Shim + Chapter IV Bootstrap 0.14.0
 * Historical repair logic remains consolidated elsewhere. This file installs no
 * repair listeners or polling loops. It only loads the approved Chapter IV
 * modules once, in deterministic narrative order.
 */
(function(){
"use strict";
window.LastWitnessLegacyHotfix={disabled:true,version:"0.5.0"};

function stylesheet(href,id){
 if(document.getElementById(id))return;const link=document.createElement("link");link.id=id;link.rel="stylesheet";link.href=href;document.head.appendChild(link)
}
function script(src,id,ready){
 const existing=document.getElementById(id);if(ready?.())return Promise.resolve();if(existing?.dataset.loaded==="1")return Promise.resolve();if(existing?.__lwPromise)return existing.__lwPromise;
 const node=existing||document.createElement("script");node.id=id;node.src=src;node.async=false;
 node.__lwPromise=new Promise((resolve,reject)=>{node.addEventListener("load",()=>{node.dataset.loaded="1";resolve()},{once:true});node.addEventListener("error",reject,{once:true})});
 if(!existing)document.body.appendChild(node);return node.__lwPromise
}

script("js/chapters/chapter-04/01-afterimage.js?v=0132","lwChapter04Phase01Script",()=>Boolean(window.LastWitnessChapter4Phase1))
 .then(()=>{stylesheet("css/chapter-04-phase-02.css?v=0140","lwChapter04Phase02Style");return script("js/chapters/chapter-04/02-jakarta-arrival.js?v=0140","lwChapter04Phase02Script",()=>Boolean(window.LastWitnessChapter4Phase2))})
 .catch(error=>console.error("LAST WITNESS Chapter IV bootstrap failed",error));
})();
