function paintPlan(){
  const groups={}; S.reminders.forEach(r=>{ const k=r.at?r.at.slice(0,10):"prep"; (groups[k]||(groups[k]=[])).push(r); });
  const keys=Object.keys(groups).sort();
  let html='<p class="kicker">'+t("itinerary")+'</p><h2>'+t("schedule")+'</h2><div class="stack">';
  if(!keys.length) html+='<div class="banner">'+t("noRem")+'</div>';
  keys.forEach(k=>{
    html+='<div class="card"><div class="pad"><p class="kicker">'+(k==="prep"?t("prep"):k)+'</p><h3>'+(k==="prep"?t("before"):fmtWhen(k+"T12:00").day)+'</h3></div>';
    groups[k].forEach(r=>{
      const w=fmtWhen(r.at), place=placeBy(r.place);
      html+='<button type="button" class="row'+(S.done[r.id]?' on':'')+'" data-act="toggle" data-id="'+esc(r.id)+'"><span class="check"></span><span class="when"><span>'+esc(w.day)+'</span><b>'+esc(w.time)+'</b></span><span style="flex:1"><p class="ttl">'+esc(r.title)+'</p>'+(r.notes?'<p class="note">'+esc(r.notes)+'</p>':'')+'</span>'+(place?'<a class="act" href="'+esc(mapsUrl(place))+'" rel="noopener noreferrer">'+t("maps")+'</a>':'')+'</button>';
    });
    html+='</div>';
  });
  html+='</div><div class="card" style="margin-top:14px"><div class="pad"><p class="kicker">'+t("newTrip")+'</p><h3>'+t("addRem")+'</h3></div><div class="field"><label>'+t("title")+'</label><input id="rTitle" placeholder="Mudam" /></div><div class="grid2"><div class="field"><label>'+t("date")+'</label><input id="rDate" type="date" /></div><div class="field"><label>'+t("time")+'</label><input id="rTime" type="time" /></div></div><div class="field"><label>'+t("list")+'</label><select id="rList">'+LISTS.map(l=>'<option value="'+l[0]+'">'+l[1]+'</option>').join("")+'</select></div><div class="field"><label>'+t("notes")+'</label><textarea id="rNotes" rows="2" placeholder="'+t("optional")+'"></textarea></div><div class="pad"><button class="btn btn-a" type="button" data-act="add">'+t("add")+'</button></div></div>';
  html+=exampleShot(EX.schedule,t("example"));
  $("page-plan").innerHTML=html;
}
function paintMap(){
  let html='<p class="kicker">'+t("route")+'</p><h2>'+t("places")+'</h2><div class="mapwrap card"><button class="mapclose" type="button" data-act="go" data-go="today">'+t("close")+'</button><div id="map"></div></div><div class="card" style="margin-top:12px">';
  if(!S.places.length) html+='<div class="pad"><p class="muted">'+t("noPlaces")+'</p></div>';
  else S.places.forEach(p=>{ html+='<a class="row" href="'+esc(mapsUrl(p))+'" rel="noopener noreferrer"><span style="flex:1"><p class="ttl">'+esc(p.name)+'</p><p class="note">'+esc(p.address)+'</p></span><span class="act">'+t("directions")+'</span></a>'; });
  html+='</div>';
  if(S.routes.length){ html+='<div class="card" style="margin-top:12px"><div class="pad"><p class="kicker">'+t("legs")+'</p><h3>'+t("savedDir")+'</h3></div>'; S.routes.forEach(r=>{ html+='<a class="row" href="'+esc(routeUrl(r))+'" rel="noopener noreferrer"><span style="flex:1"><p class="ttl">'+esc(r.label)+'</p><p class="note">'+esc(r.when)+'</p></span><span class="act">'+t("open")+'</span></a>'; }); html+='</div>'; }
  html+=exampleShot(EX.routes,t("example"));
  $("page-map").innerHTML=html; map=null; mapSig="";
}
function ensureMap(){
  const el=$("map"); if(!el || typeof L==="undefined") return;
  const sig=S.places.map(p=>p.id).join(",");
  if(map && mapSig===sig){ map.invalidateSize(); return; }
  if(map){ try{ map.remove(); }catch(e){} map=null; }
  const start=S.places[0]||{lat:47.5,lng:19.05};
  map=L.map(el,{zoomControl:true,attributionControl:false});
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"\u00a9 OpenStreetMap"}).addTo(map);
  const pts=[]; S.places.forEach(p=>{ L.circleMarker([p.lat,p.lng],{radius:7,color:"#fff",weight:2,fillColor:"#1d1d1f",fillOpacity:1}).addTo(map); pts.push([p.lat,p.lng]); });
  if(pts.length>1) map.fitBounds(pts,{padding:[24,24]}); else map.setView([start.lat,start.lng],12);
  mapSig=sig; setTimeout(function(){ if(map) map.invalidateSize(); },80);
}
function paintPack(){
  const done=PACK.reduce((n,g)=>n+g[1].filter(i=>S.packed[i[0]]).length,0);
  const total=PACK.reduce((n,g)=>n+g[1].length,0);
  let html='<p class="kicker" id="packCount">'+done+' / '+total+' '+t("packed")+'</p><h2>'+t("bag")+'</h2><p class="muted">'+t("packList")+'</p><div class="stack">';
  PACK.forEach(g=>{ html+='<div class="card"><div class="pad"><p class="kicker">'+t("kit")+'</p><h3>'+esc(g[0])+'</h3></div>'; g[1].forEach(item=>{ html+='<button type="button" class="row'+(S.packed[item[0]]?' on':'')+'" data-act="pack" data-id="'+item[0]+'"><span class="check"></span><span><p class="ttl">'+esc(item[1])+'</p>'+(item[2]?'<p class="note">'+esc(item[2])+'</p>':'')+'</span></button>'; }); html+='</div>'; });
  html+='</div><div class="card" style="margin-top:12px"><div class="field" style="padding-top:14px"><label>'+t("notes")+'</label><textarea id="extra" rows="3">'+esc(S.extra)+'</textarea></div></div>';
  html+=exampleShot(EX.bag,t("example"));
  $("page-pack").innerHTML=html;
}
function paintApps(){
  $("page-apps").innerHTML=renderTicketBoard()+exampleShot(EX.tickets,t("example"))+exampleShot(EX.apps,t("example"))+
    '<div class="card" style="margin-top:12px"><div class="pad"><p class="kicker">'+t("contact")+'</p><h3>BUD&VIA</h3><img class="example-shot" alt="BUD&VIA" src="'+EX.otter+'"/><p class="note">An idiot admires complexity, a genius admires simplicity.</p><p class="note">\u2014 Terry A. Davis</p><p class="note">'+t("privacy")+'</p><p class="note">Publisher: Tahsin Sakin.</p><p class="note"><a class="act" href="https://www.linkedin.com/in/tahsin-sakin-390961199" rel="noopener noreferrer">LinkedIn</a></p></div></div>';
}
function paintAll(){ paintChrome(); paintToday(); paintPlan(); paintMap(); paintPack(); paintApps(); if(typeof paintExport==="function") paintExport(); }
