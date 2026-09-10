function shotCard(src, label){
  if(!src || String(src).length<40) return "";
  return '<div class="card" style="margin-top:18px"><div class="pad"><p class="kicker">Example</p></div><img class="shot" alt="'+(label||"Example")+'" decoding="async" src="'+src+'" style="background:transparent;filter:none;min-height:0;object-fit:contain"/></div>';
}
function paintPlan(){
  const groups={}; S.reminders.forEach(r=>{ const k=r.at?r.at.slice(0,10):"prep"; (groups[k]||(groups[k]=[])).push(r); });
  const keys=Object.keys(groups).sort();
  let html='<p class="kicker">Itinerary</p><h2>Schedule</h2><div class="stack">';
  if(!keys.length) html+='<div class="banner">No reminders yet. Add one below, or load the sample from Trip.</div>';
  keys.forEach(k=>{
    html+='<div class="card"><div class="pad"><p class="kicker">'+(k==="prep"?"Prep":k)+'</p><h3>'+(k==="prep"?"Before departure":fmtWhen(k+"T12:00").day)+'</h3></div>';
    groups[k].forEach(r=>{
      const w=fmtWhen(r.at), place=placeBy(r.place);
      html+='<button type="button" class="row'+(S.done[r.id]?' on':'')+'" data-act="toggle" data-id="'+esc(r.id)+'"><span class="check"></span><span class="when"><span>'+esc(w.day)+'</span><b>'+esc(w.time)+'</b></span><span style="flex:1"><p class="ttl">'+esc(r.title)+'</p>'+(r.notes?'<p class="note">'+esc(r.notes)+'</p>':'')+'</span>'+(place?'<a class="act" href="'+esc(mapsUrl(place))+'" rel="noopener noreferrer">Maps</a>':'')+'</button>';
    });
    html+='</div>';
  });
  html+='</div><div class="card" style="margin-top:14px"><div class="pad"><p class="kicker">New</p><h3>Add a reminder</h3></div><div class="field"><label>Title</label><input id="rTitle" placeholder="Mudam morning ticket" /></div><div class="grid2"><div class="field"><label>Date</label><input id="rDate" type="date" /></div><div class="field"><label>Time</label><input id="rTime" type="time" /></div></div><div class="field"><label>List</label><select id="rList">'+LISTS.map(l=>'<option value="'+l[0]+'">'+l[1]+'</option>').join("")+'</select></div><div class="field"><label>Notes</label><textarea id="rNotes" rows="2" placeholder="Optional"></textarea></div><div class="pad"><button class="btn btn-a" type="button" data-act="add">Add reminder</button></div></div>';
  html+=shotCard(window.EX_SCHED||window.EXAMPLE_TRIP,"Schedule example");
  $("page-plan").innerHTML=html;
}
function paintMap(){
  let html='<p class="kicker">Route</p><h2>Places</h2><div class="mapwrap card"><button class="mapclose" type="button" data-act="go" data-go="today">Close</button><div id="map"></div></div><div class="card" style="margin-top:12px">';
  if(!S.places.length) html+='<div class="pad"><p class="muted">No places yet. Load the sample itinerary to drop pins.</p></div>';
  else S.places.forEach(p=>{ html+='<a class="row" href="'+esc(mapsUrl(p))+'" rel="noopener noreferrer"><span style="flex:1"><p class="ttl">'+esc(p.name)+'</p><p class="note">'+esc(p.address)+'</p></span><span class="act">Directions</span></a>'; });
  html+='</div>';
  if(S.routes.length){ html+='<div class="card" style="margin-top:12px"><div class="pad"><p class="kicker">Legs</p><h3>Saved directions</h3></div>'; S.routes.forEach(r=>{ html+='<a class="row" href="'+esc(routeUrl(r))+'" rel="noopener noreferrer"><span style="flex:1"><p class="ttl">'+esc(r.label)+'</p><p class="note">'+esc(r.when)+'</p></span><span class="act">Open</span></a>'; }); html+='</div>'; }
  html+=exampleCard("Tap Directions on a pin","Apple Maps opens that street. The pin stays on this phone.","Deleuze \u0026 Guattari","[ pin ] ----walk---- [ door ]");
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
  let html='<p class="kicker" id="packCount">'+done+' / '+total+' packed</p><h2>Bag</h2><p class="muted">An example of an 8-day December trip to Luxembourg.</p><div class="stack">';
  PACK.forEach(g=>{ html+='<div class="card"><div class="pad"><p class="kicker">Dec kit</p><h3>'+esc(g[0])+'</h3></div>'; g[1].forEach(item=>{ html+='<button type="button" class="row'+(S.packed[item[0]]?' on':'')+'" data-act="pack" data-id="'+item[0]+'"><span class="check"></span><span><p class="ttl">'+esc(item[1])+'</p>'+(item[2]?'<p class="note">'+esc(item[2])+'</p>':'')+'</span></button>'; }); html+='</div>'; });
  html+='</div><div class="card" style="margin-top:12px"><div class="field" style="padding-top:14px"><label>Notes</label><textarea id="extra" rows="3" placeholder="Adapters, meds, gifts">'+esc(S.extra)+'</textarea></div></div>';
  html+=exampleCard("Tick the rain shell and the Type C plug","The count at the top moves. That is the whole trick.","Jung","[ wool coat ] [ scarf ] [ wet boots ] [ Type C ]");
  $("page-pack").innerHTML=html;
}
function paintApps(){
  $("page-apps").innerHTML='<p class="kicker">Bookings</p><h2>Tickets</h2><p class="muted">Open the apps where you bought the cheap seats and rooms.</p><div class="card" style="margin-top:12px">'+APPS.map(a=>'<button type="button" class="row" data-act="app" data-scheme="'+a[2]+'"><span style="flex:1"><p class="ttl">'+esc(a[1])+'</p><p class="note">'+esc(a[3])+'</p></span><span class="act">Open</span></button>').join("")+'</div>'+shotCard(window.EX_TIX||window.EXAMPLE_TRIP,"Tickets example")+'<div class="card" style="margin-top:12px"><div class="pad"><p class="kicker">Contact</p><h3>BUD&VIA</h3><img class="brandshot" alt="BUD&VIA" src="./budvia.jpg" onerror="this.onerror=null;this.src=(window.BUDVIA_SHOT||window.BUDVIA_ICON||\'\')"/><p class="note">An idiot admires complexity, a genius admires simplicity.</p><p class="note">\u2014 Terry A. Davis</p><p class="note">Physical copy: this otter, printed on a card in the bag pocket.</p><p class="note">Publisher: Tahsin Sakin.</p><p class="note"><a class="act" href="https://www.linkedin.com/in/tahsinsakin" rel="noopener noreferrer">LinkedIn</a></p><p class="note" style="opacity:.4;font-size:9px;letter-spacing:.16em">TO BE CONTINUED \u2192</p></div></div>';
}
function paintAll(){ paintChrome(); paintToday(); paintPlan(); paintMap(); paintPack(); paintApps(); }
