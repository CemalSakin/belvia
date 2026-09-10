function liveTickets(){
  if(!S.tickets) S.tickets = [];
  return S.tickets;
}
function liveSim(){
  if(!S.sim) S.sim = [];
  return S.sim;
}
function sampleTicket(){
  return {id:"ex1",kind:"flight",carrier:"Wizz Air",code:"W6 2488",from:"ESB",to:"BUD",fromCity:"Ankara",toCity:"Budapest",at:"2026-09-14T10:25",land:"2026-09-14T11:55",pnr:"\u2022\u2022\u2022\u2022\u2022\u2022",scheme:"wizzair://",note:"One sample. Delete it and add your own."};
}
function untilLabel(iso){
  if(!iso) return "";
  const ts = Date.parse(iso.length === 16 ? iso + ":00" : iso);
  if(Number.isNaN(ts)) return "";
  const d = ts - Date.now();
  if(d <= 0) return "Passed";
  const days = Math.floor(d / 864e5);
  const hrs = Math.floor((d % 864e5) / 36e5);
  const min = Math.floor((d % 36e5) / 6e4);
  if(days >= 1) return days + "d " + hrs + "h";
  return hrs + "h " + min + "m";
}
function renderTicket(item){
  const a = fmtWhen(item.at);
  const b = item.land ? fmtWhen(item.land) : null;
  const wait = untilLabel(item.at);
  const kind = item.kind === "coach" ? "Coach" : item.kind === "stay" ? "Stay" : "Flight";
  const left = item.kind === "stay" ? (item.title || item.carrier) : (item.from || "");
  const right = item.kind === "stay" ? (item.toCity || "") : (item.to || "");
  const leftCity = item.fromCity || "";
  const rightCity = item.kind === "stay" ? item.carrier : (item.toCity || "");
  const depL = item.kind === "stay" ? "Check-in" : "Departs";
  const arrL = item.kind === "stay" ? "Check-out" : "Arrives";
  const note = item.note || item.notes_en || "";
  return '<div class="ticket" style="margin-top:10px"><p class="kicker">'+esc(kind)+(wait?" \u00b7 "+esc(wait):"")+'</p>'+
    '<div class="codes"><div><div class="code">'+esc(left)+'</div><div class="city">'+esc(leftCity)+'</div></div>'+
    '<div class="mid">'+esc(item.carrier||"")+(item.code?"<br/>"+esc(item.code):"")+'</div>'+
    '<div style="text-align:right"><div class="code">'+esc(right)+'</div><div class="city">'+esc(rightCity)+'</div></div></div>'+
    '<div class="meta"><div><span>'+esc(depL)+'</span><b>'+esc(a.day+" \u00b7 "+a.time)+'</b></div>'+
    '<div style="text-align:right"><span>'+esc(arrL)+'</span><b>'+(b?esc(b.day+" \u00b7 "+b.time):"\u2014")+'</b></div></div>'+
    (item.pnr?'<p class="note" style="margin-top:10px">PNR '+esc(item.pnr)+'</p>':'')+
    (note?'<p class="note">'+esc(note)+'</p>':'')+
    '<button class="btn btn-a" type="button" data-act="export" style="margin-top:12px">Reminders + Maps</button>'+
    (item.scheme?'<button class="btn btn-g" type="button" data-act="app" data-scheme="'+esc(item.scheme)+'" style="margin-top:8px">Open seller site</button>':'')+
    '<button class="btn btn-g" type="button" data-act="del-ticket" data-id="'+esc(item.id)+'" style="margin-top:8px">Delete ticket</button>'+
    '</div>';
}
function renderAirPair(){
  const list = liveTickets();
  if(list[0]) return renderTicket(list[0]);
  if(S.hideSample) return "";
  return renderTicket(sampleTicket());
}
function renderSimGate(){
  const list = liveSim();
  let html = '<div class="card" style="margin-top:14px"><div class="pad"><p class="kicker">SIM gate</p><h3>After the local SIM</h3><p class="note">Add the apps you will open only after the local line is live.</p></div>';
  if(!list.length) html += '<div class="pad"><p class="muted">None yet. Add one below.</p></div>';
  list.forEach(function(app, i){
    html += '<div class="row"><span class="when"><b>'+(i+1)+'</b><span>After SIM</span></span><span style="flex:1"><p class="ttl">'+esc(app.name)+'</p><p class="note">'+esc(app.note||"")+'</p></span><button class="act" type="button" data-act="app" data-scheme="'+esc(app.scheme||"")+'">Open</button><button class="act" type="button" data-act="del-sim" data-id="'+esc(app.id)+'">Delete</button></div>';
  });
  html += '<div class="field" style="padding-top:12px"><label>Name</label><input id="simName" placeholder="Bumble" /></div>';
  html += '<div class="field"><label>Link</label><input id="simLink" placeholder="https://bumble.com/" /></div>';
  html += '<div class="field"><label>Note</label><input id="simNote" placeholder="Open after the local number works" /></div>';
  html += '<div class="pad"><button class="btn btn-a" type="button" data-act="add-sim">Add SIM app</button></div></div>';
  return html;
}
function renderAddTicket(){
  return '<div class="card" style="margin-top:14px"><div class="pad"><p class="kicker">New ticket</p><h3>Add one booking</h3></div>'+
    '<div class="field"><label>Kind</label><select id="tKind"><option value="flight">Flight</option><option value="coach">Coach</option><option value="stay">Stay</option></select></div>'+
    '<div class="field"><label>Carrier</label><input id="tCarrier" placeholder="Wizz Air" /></div>'+
    '<div class="grid2"><div class="field"><label>From</label><input id="tFrom" placeholder="ESB" /></div><div class="field"><label>To</label><input id="tTo" placeholder="BUD" /></div></div>'+
    '<div class="grid2"><div class="field"><label>From city</label><input id="tFromCity" placeholder="Ankara" /></div><div class="field"><label>To city</label><input id="tToCity" placeholder="Budapest" /></div></div>'+
    '<div class="grid2"><div class="field"><label>Leaves</label><input id="tAt" type="datetime-local" /></div><div class="field"><label>Arrives</label><input id="tLand" type="datetime-local" /></div></div>'+
    '<div class="field"><label>Code / PNR</label><input id="tCode" placeholder="W6 2488" /></div>'+
    '<div class="pad"><button class="btn btn-a" type="button" data-act="add-ticket">Add ticket</button></div></div>';
}
function renderTicketBoard(){
  const list = liveTickets();
  let html = '<p class="kicker">Bookings</p><h2>Tickets</h2><p class="muted">One card per booking. Add yours. Delete what you do not need.</p>';
  if(list.length){
    list.forEach(function(item){ html += renderTicket(item); });
  } else if(!S.hideSample){
    html += '<div class="banner" style="margin-top:10px">One sample card. Delete it when you add a real ticket.</div>';
    html += renderTicket(sampleTicket());
  }
  html += renderAddTicket();
  html += renderSimGate();
  html += '<div class="card" style="margin-top:14px"><div class="pad"><p class="kicker">Home screen</p><h3>Add to Home Screen</h3><p class="note">Safari or Chrome. Share, then Add to Home Screen. The trip stays on this phone.</p></div><div class="pad" style="padding-top:0"><button class="btn btn-a" type="button" data-act="install">Add to Home Screen</button></div></div>';
  html += '<div class="card" style="margin-top:12px"><div class="pad"><p class="kicker">Export</p><h3>Calendar and Reminders</h3><p class="note">Writes an .ics file on this phone. Nothing is uploaded.</p></div><div class="pad" style="padding-top:0"><button class="btn btn-a" type="button" data-act="export">Add to Calendar</button></div></div>';
  return html;
}
