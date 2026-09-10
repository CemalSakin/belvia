document.addEventListener("click", function(e){
  const goEl=e.target.closest("[data-go]");
  const actEl=e.target.closest("[data-act]");
  if(goEl && (!actEl || actEl===goEl || actEl.getAttribute("data-act")==="go")){ e.preventDefault(); setTab(goEl.getAttribute("data-go")); return; }
  if(!actEl) return;
  const act=actEl.getAttribute("data-act");
  if(act==="toggle"){ if(e.target.closest("a")) return; const id=actEl.getAttribute("data-id"); S.done[id]=!S.done[id]; save(); paintPlan(); paintToday(); }
  else if(act==="pack"){ const id=actEl.getAttribute("data-id"); S.packed[id]=!S.packed[id]; save(); actEl.classList.toggle("on", !!S.packed[id]); const k=$("packCount"); if(k){ const done=PACK.reduce((n,g)=>n+g[1].filter(i=>S.packed[i[0]]).length,0); const total=PACK.reduce((n,g)=>n+g[1].length,0); k.textContent=done+" / "+total+" packed"; } }
  else if(act==="create"){ S.meta.title=((($("nTitle")||{}).value)||"").trim()||"Trip"; S.meta.start=(($("nStart")||{}).value)||""; S.meta.end=(($("nEnd")||{}).value)||""; S.meta.pnr=((($("nPnr")||{}).value)||"").trim(); S.meta.sample=false; save(); paintAll(); }
  else if(act==="demo"){ S=demoState(); S.tickets=S.tickets||[]; S.sim=S.sim||[]; S.hideSample=false; save(); paintAll(); }
  else if(act==="wipe"){ if(confirm("Remove this trip from this phone?")){ S=emptyState(); save(); paintAll(); } }
  else if(act==="add"){ const title=((($("rTitle")||{}).value)||"").trim(); if(!title) return; const date=($("rDate")||{}).value; const time=($("rTime")||{}).value; S.reminders.push({id:"u"+Date.now(),title,notes:((($("rNotes")||{}).value)||"").trim(),list:(($("rList")||{}).value)||"prep",at:date?(date+"T"+(time||"09:00")):""}); save(); paintPlan(); paintToday(); paintChrome(); }
  else if(act==="del-rem"){ S.reminders=S.reminders.filter(r=>r.id!==actEl.getAttribute("data-id")); save(); paintPlan(); paintToday(); }
  else if(act==="del-place"){ S.places=S.places.filter(p=>p.id!==actEl.getAttribute("data-id")); save(); paintMap(); }
  else if(act==="del-route"){ S.routes=S.routes.filter(r=>r.id!==actEl.getAttribute("data-id")); save(); paintMap(); }
  else if(act==="del-ticket"){ if(!S.tickets) S.tickets=[]; const id=actEl.getAttribute("data-id"); S.tickets=S.tickets.filter(x=>x.id!==id); if(id==="ex1") S.hideSample=true; save(); paintApps(); paintToday(); }
  else if(act==="add-ticket"){
    if(!S.tickets) S.tickets=[];
    S.hideSample=true;
    S.tickets.push({id:"t"+Date.now(),kind:(($("tKind")||{}).value)||"flight",carrier:((($("tCarrier")||{}).value)||"").trim()||"Carrier",code:((($("tCode")||{}).value)||"").trim(),from:((($("tFrom")||{}).value)||"").trim(),to:((($("tTo")||{}).value)||"").trim(),fromCity:((($("tFromCity")||{}).value)||"").trim(),toCity:((($("tToCity")||{}).value)||"").trim(),title:((($("tCarrier")||{}).value)||"").trim(),at:((($("tAt")||{}).value)||"").replace(" ","T"),land:((($("tLand")||{}).value)||"").replace(" ","T"),pnr:((($("tCode")||{}).value)||"").trim(),note:""});
    save(); paintApps(); paintToday();
  }
  else if(act==="del-sim"){ if(!S.sim) S.sim=[]; S.sim=S.sim.filter(x=>x.id!==actEl.getAttribute("data-id")); save(); paintApps(); }
  else if(act==="add-sim"){
    if(!S.sim) S.sim=[];
    const name=((($("simName")||{}).value)||"").trim(); if(!name) return;
    S.sim.push({id:"s"+Date.now(),name:name,scheme:((($("simLink")||{}).value)||"").trim(),note:((($("simNote")||{}).value)||"").trim()});
    save(); paintApps();
  }
  else if(act==="app"){ openScheme(actEl.getAttribute("data-scheme")); }
  else if(act==="export"){ if(typeof paintExport==="function") paintExport(); $("export").classList.add("show"); }
  else if(act==="export-close"){ $("export").classList.remove("show"); }
  else if(act==="ics-cal"){ if(!S.reminders.some(r=>r.at)){ alert("Add timed reminders first."); return; } downloadIcs("BudVia-Calendar.ics", buildIcs("event")); }
  else if(act==="ics-rem"){ if(!S.reminders.some(r=>r.at)){ alert("Add timed reminders first."); return; } downloadIcs("BudVia-Reminders.ics", buildIcs("todo")); }
  else if(act==="install"){ if(window.BudViaInstall) window.BudViaInstall.add(); }
});
$("export").addEventListener("click", function(e){ if(e.target.id==="export") $("export").classList.remove("show"); });
document.addEventListener("keydown", function(e){ if(e.key==="Escape") $("export").classList.remove("show"); });
document.addEventListener("change", function(e){ if(e.target && e.target.id==="extra"){ S.extra=e.target.value; save(); } });
(function(){
  const pager=$("pager"); if(!pager) return; let x0=0,y0=0,skip=false;
  pager.addEventListener("touchstart", function(e){ if(e.target.closest("#map, input, textarea, select")){ skip=true; return; } skip=false; x0=e.changedTouches[0].clientX; y0=e.changedTouches[0].clientY; }, {passive:true});
  pager.addEventListener("touchend", function(e){ if(skip) return; const dx=e.changedTouches[0].clientX-x0, dy=e.changedTouches[0].clientY-y0; if(Math.abs(dx)<56 || Math.abs(dx)<Math.abs(dy)*1.25) return; const i=TABS.indexOf(tab); if(dx<0 && i<TABS.length-1) setTab(TABS[i+1]); if(dx>0 && i>0) setTab(TABS[i-1]); }, {passive:true});
})();
window.addEventListener("resize", function(){ const pager=$("pager"); if(pager) pager.scrollLeft=TABS.indexOf(tab)*pager.clientWidth; if(map) map.invalidateSize(); });
function loadScript(src){
  return new Promise(function(ok){
    var s=document.createElement("script");
    s.src=src;
    s.onload=function(){ ok(); };
    s.onerror=function(){ ok(); };
    document.body.appendChild(s);
  });
}
loadScript("./i18n.js?v=en2").then(function(){
  return loadScript("./tickets.js?v=en2");
}).then(function(){
  return loadScript("./install.js?v=en2");
}).then(function(){
  if(!S.tickets) S.tickets=[];
  if(!S.sim) S.sim=[];
  paintAll();
});
