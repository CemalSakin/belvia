if(typeof window.t!=="function") window.t=function(k){ return k; };
if(typeof window.renderTicketBoard!=="function") window.renderTicketBoard=function(){ return ""; };
function teach(title, body){
  return '<div class="card example-card" style="margin-top:18px"><div class="pad"><p class="kicker">Worked example</p><h3>'+title+'</h3><p class="muted">'+body+'</p></div></div>';
}
function paintPlan(){
  const groups={}; S.reminders.forEach(r=>{ const k=r.at?r.at.slice(0,10):"prep"; (groups[k]||(groups[k]=[])).push(r); });
  const keys=Object.keys(groups).sort();
  let html='<p class="kicker">Itinerary</p><h2>Schedule</h2><div class="stack">';
  if(!keys.length) html+='<div class="banner">No reminders yet. Add one below.</div>';
  keys.forEach(k=>{
    html+='<div class="card"><div class="pad"><p class="kicker">'+(k==="prep"?"Prep":k)+'</p><h3>'+(k==="prep"?"Before departure":fmtWhen(k+"T12:00").day)+'</h3></div>';
    groups[k].forEach(r=>{
      const w=fmtWhen(r.at), place=placeBy(r.place);
      html+='<div class="row'+(S.done[r.id]?' on':'')+'"><button type="button" class="check" data-act="toggle" data-id="'+esc(r.id)+'"></button><span class="when"><span>'+esc(w.day)+'</span><b>'+esc(w.time)+'</b></span><span style="flex:1"><p class="ttl">'+esc(r.title)+'</p>'+(r.notes?'<p class="note">'+esc(r.notes)+'</p>':'')+'</span>'+(place?'<a class="act" href="'+esc(mapsUrl(place))+'" rel="noopener noreferrer" target="_blank">Maps</a>':'')+'<button class="act" type="button" data-act="del-rem" data-id="'+esc(r.id)+'">Delete</button></div>';
    });
    html+='</div>';
  });
  html+='</div><div class="card" style="margin-top:14px"><div class="pad"><p class="kicker">New</p><h3>Add a reminder</h3></div><div class="field"><label>Title</label><input id="rTitle" placeholder="Mudam" /></div><div class="grid2"><div class="field"><label>Date</label><input id="rDate" type="date" /></div><div class="field"><label>Time</label><input id="rTime" type="time" /></div></div><div class="field"><label>List</label><select id="rList">'+LISTS.map(l=>'<option value="'+l[0]+'">'+l[1]+'</option>').join("")+'</select></div><div class="field"><label>Notes</label><textarea id="rNotes" rows="2" placeholder="Optional"></textarea></div><div class="pad"><button class="btn btn-a" type="button" data-act="add">Add reminder</button></div></div>';
  html+=teach("One row, one clock","A reminder is a sentence with a time. Tick when done. Delete when you do not need it.");
  $("page-plan").innerHTML=html;
}
function paintMap(){
  let html='<p class="kicker">Route</p><h2>Places</h2><div class="mapwrap card"><button class="mapclose" type="button" data-act="go" data-go="today">Close</button><div id="map"></div></div><div class="card" style="margin-top:12px">';
  if(!S.places.length) html+='<div class="pad"><p class="muted">No places yet. Load the sample itinerary to drop pins.</p></div>';
  else S.places.forEach(p=>{ html+='<div class="row"><span style="flex:1"><p class="ttl">'+esc(p.name)+'</p><p class="note">'+esc(p.address)+'</p></span><a class="act" href="'+esc(mapsUrl(p))+'" rel="noopener noreferrer" target="_blank">Directions</a><button class="act" type="button" data-act="del-place" data-id="'+esc(p.id)+'">Delete</button></div>'; });
  html+='</div>';
  if(S.routes.length){ html+='<div class="card" style="margin-top:12px"><div class="pad"><p class="kicker">Legs</p><h3>Saved directions</h3></div>'; S.routes.forEach(r=>{ html+='<div class="row"><span style="flex:1"><p class="ttl">'+esc(r.label)+'</p><p class="note">'+esc(r.when)+'</p></span><a class="act" href="'+esc(routeUrl(r))+'" rel="noopener noreferrer" target="_blank">Open</a><button class="act" type="button" data-act="del-route" data-id="'+esc(r.id)+'">Delete</button></div>'; }); html+='</div>'; }
  html+=teach("A pin is a place you will stand","Directions opens Maps. Delete a pin you do not need.");
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
  let html='<p class="kicker" id="packCount">'+done+' / '+total+' packed</p><h2>Bag</h2><p class="muted">Pack list for this trip.</p><div class="stack">';
  PACK.forEach(g=>{ html+='<div class="card"><div class="pad"><p class="kicker">Kit</p><h3>'+esc(g[0])+'</h3></div>'; g[1].forEach(item=>{ html+='<button type="button" class="row'+(S.packed[item[0]]?' on':'')+'" data-act="pack" data-id="'+item[0]+'"><span class="check"></span><span><p class="ttl">'+esc(item[1])+'</p>'+(item[2]?'<p class="note">'+esc(item[2])+'</p>':'')+'</span></button>'; }); html+='</div>'; });
  html+='</div><div class="card" style="margin-top:12px"><div class="field" style="padding-top:14px"><label>Notes</label><textarea id="extra" rows="3">'+esc(S.extra)+'</textarea></div></div>';
  html+=teach("A bag is a checklist","Tick what is in the bag. The count at the top is packed / total.");
  $("page-pack").innerHTML=html;
}
function paintApps(){
  $("page-apps").innerHTML=renderTicketBoard()+
    '<div class="card" style="margin-top:12px"><div class="pad"><p class="kicker">Contact</p><h3>BUD&VIA</h3><img class="example-shot" alt="BudVia otter" src="./0875CF7C-5ACB-48B1-B2CD-57E02C5C9B58.jpeg?v=en2"/><p class="note">An idiot admires complexity, a genius admires simplicity.</p><p class="note">\u2014 Terry A. Davis</p><p class="note">This copy never leaves the phone. No login. No analytics.</p><p class="note">Publisher: Tahsin Sakin.</p><p class="note"><a class="act" href="https://www.linkedin.com/in/tahsin-sakin-390961199" rel="noopener noreferrer" target="_blank">LinkedIn</a></p></div></div>';
}
function paintAll(){ paintChrome(); paintToday(); paintPlan(); paintMap(); paintPack(); paintApps(); if(typeof paintExport==="function") paintExport(); }
