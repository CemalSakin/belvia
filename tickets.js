const TICKETS = [
  {id:"f1",kind:"flight",carrier:"Wizz Air",code:"W6 2488",from:"ESB",to:"BUD",fromCity:"Ankara",toCity:"Budapest",at:"2026-09-14T10:25",land:"2026-09-14T11:55",pnr:"\u2022\u2022\u2022\u2022\u2022\u2022",scheme:"wizzair://",notes_en:"Keep the pass offline. Land T2B.",notes_tr:"Pasi cevrimdisi tut. T2B'ye in."},
  {id:"f2",kind:"flight",carrier:"Wizz Air",code:"W6 2487",from:"BUD",to:"ESB",fromCity:"Budapest",toCity:"Ankara",at:"2026-09-21T06:20",land:"2026-09-21T09:50",pnr:"\u2022\u2022\u2022\u2022\u2022\u2022",scheme:"wizzair://",notes_en:"Leave the stay at 03:30. Night 100E does not run.",notes_tr:"Konaklamadan 03:30'da cik. Gece 100E calismaz."},
  {id:"c1",kind:"coach",carrier:"FlixBus",code:"QR 11B",from:"NPG",to:"VIE",fromCity:"Nepliget",toCity:"Erdberg",at:"2026-09-17T06:00",land:"2026-09-17T08:50",scheme:"flixbus://",notes_en:"Save the QR offline before you leave.",notes_tr:"Cikmadan QR'i cevrimdisi kaydet."},
  {id:"c2",kind:"coach",carrier:"FlixBus",code:"QR 3A",from:"HBF",to:"NPG",fromCity:"Wien Hbf",toCity:"Nepliget",at:"2026-09-19T23:45",land:"2026-09-20T02:50",scheme:"flixbus://",notes_en:"Signage may say Budapest Airport. Leave at Nepliget.",notes_tr:"Tabela Budapest Airport diyebilir. Nepliget'te in."},
  {id:"s1",kind:"stay",carrier:"Airbnb",title:"Budapest stay",fromCity:"District XIII",toCity:"Lehel ter",at:"2026-09-14T15:00",land:"2026-09-17T04:45",scheme:"airbnb://",notes_en:"Sample pin only. Confirm the arrival window.",notes_tr:"Ornek igne. Varis saatini dogrula."},
  {id:"s2",kind:"stay",carrier:"Booking.com",title:"Vienna hostel",fromCity:"Marina Tower",toCity:"17-18 Sep",at:"2026-09-17T15:00",land:"2026-09-18T11:00",scheme:"booking://",notes_en:"Second Vienna night is a separate booking.",notes_tr:"Ikinci Viyana gecesi ayri rezervasyon."}
];
const SIM_AFTER = [
  {id:"bumble",name:"Bumble",scheme:"bumble://",en:"Dating. Pin Budapest / Vienna after the local line is live. Do not open on the Turkish number.",tr:"Tanisma. Konum Budapeste / Viyana. SIM ve numara dogrulamasi sonrasi ac. Turk hattiyla acma."},
  {id:"timeleft",name:"Timeleft",scheme:"timeleft://",en:"Shared dinner. Budapest 14-16, Vienna 17-19. Book after the SIM.",tr:"Yabanci masada aksam yemegi. Budapeste 14-16, Viyana 17-19. SIM'den sonra."},
  {id:"nomad",name:"Nomadtable",scheme:"nomadtable://",en:"Solo-traveller tables. Open one walk or meal on landing day after the SIM.",tr:"Solo gezgin aktiviteleri. Inis gunu bir yemek veya yuruyus. SIM'den sonra."},
  {id:"bubi",name:"MOL Bubi",scheme:"bubi://",en:"Budapest city bikes. Register after the SIM - it asks for phone verification.",tr:"Budapeste kamu bisikleti. SIM takildiktan sonra kaydol - telefon dogrulamasi ister."}
];
function untilLabel(iso){
  if(!iso) return "";
  const ts = Date.parse(iso.length === 16 ? iso + ":00" : iso);
  if(Number.isNaN(ts)) return "";
  const d = ts - Date.now();
  if(d <= 0) return t("passed");
  const days = Math.floor(d / 864e5);
  const hrs = Math.floor((d % 864e5) / 36e5);
  const min = Math.floor((d % 36e5) / 6e4);
  if(LANG === "tr"){
    if(days >= 1) return days + "g " + hrs + "s";
    return hrs + "s " + min + "dk";
  }
  if(days >= 1) return days + "d " + hrs + "h";
  return hrs + "h " + min + "m";
}
function ticketNote(item){
  return LANG === "tr" ? (item.notes_tr || item.notes_en || "") : (item.notes_en || item.notes_tr || "");
}
function renderTicket(item){
  const a = fmtWhen(item.at);
  const b = item.land ? fmtWhen(item.land) : null;
  const wait = untilLabel(item.at);
  const kind = item.kind === "flight" ? t("flight") : item.kind === "coach" ? t("coach") : t("stay");
  const left = item.kind === "stay" ? (item.title || item.carrier) : (item.from || "");
  const right = item.kind === "stay" ? (item.toCity || "") : (item.to || "");
  const leftCity = item.fromCity || "";
  const rightCity = item.kind === "stay" ? item.carrier : (item.toCity || "");
  const depL = item.kind === "stay" ? t("checkin") : t("departs");
  const arrL = item.kind === "stay" ? t("checkout") : t("arrives");
  return '<div class="ticket" style="margin-top:10px"><p class="kicker">'+esc(kind)+(wait?" \u00b7 "+esc(wait):"")+'</p>'+
    '<div class="codes"><div><div class="code">'+esc(left)+'</div><div class="city">'+esc(leftCity)+'</div></div>'+
    '<div class="mid">'+esc(item.carrier||"")+(item.code?"<br/>"+esc(item.code):"")+'</div>'+
    '<div style="text-align:right"><div class="code">'+esc(right)+'</div><div class="city">'+esc(rightCity)+'</div></div></div>'+
    '<div class="meta"><div><span>'+esc(depL)+'</span><b>'+esc(a.day+" \u00b7 "+a.time)+'</b></div>'+
    '<div style="text-align:right"><span>'+esc(arrL)+'</span><b>'+(b?esc(b.day+" \u00b7 "+b.time):"\u2014")+'</b></div></div>'+
    (item.pnr?'<p class="note" style="margin-top:10px">'+t("pnrLbl")+" "+esc(item.pnr)+'</p>':'')+
    (ticketNote(item)?'<p class="note">'+esc(ticketNote(item))+'</p>':'')+
    '<button class="btn btn-a" type="button" data-act="export" style="margin-top:12px">'+t("remindMaps")+'</button>'+
    (item.scheme?'<button class="btn btn-g" type="button" data-act="app" data-scheme="'+esc(item.scheme)+'" style="margin-top:8px">'+t("openCarrier")+'</button>':'')+
    '</div>';
}
function renderAirPair(){
  const out = TICKETS.find(x => x.id === "f1");
  const ret = TICKETS.find(x => x.id === "f2");
  if(!out) return "";
  const a = fmtWhen(out.at);
  const b = ret ? fmtWhen(ret.at) : null;
  const wait = untilLabel(out.at);
  return '<div class="ticket"><p class="kicker">'+t("until")+' \u00b7 '+esc(wait||t("passed"))+'</p>'+
    '<div class="codes"><div><div class="code">ESB</div><div class="city">Ankara</div></div>'+
    '<div class="mid">Wizz Air<br/>W6 2488</div>'+
    '<div style="text-align:right"><div class="code">BUD</div><div class="city">Budapest</div></div></div>'+
    '<div class="meta"><div><span>'+t("outbound")+'</span><b>'+esc(a.day+" \u00b7 "+a.time)+'</b></div>'+
    '<div style="text-align:right"><span>'+t("ret")+'</span><b>'+(b?esc(b.day+" \u00b7 "+b.time):"\u2014")+'</b></div></div>'+
    '<p class="note" style="margin-top:10px">'+t("pnrLbl")+' \u2022\u2022\u2022\u2022\u2022\u2022</p>'+
    '<button class="btn btn-a" type="button" data-act="export" style="margin-top:12px">'+t("remindMaps")+'</button></div>';
}
function renderSimGate(){
  let html = '<div class="card" style="margin-top:14px"><div class="pad"><p class="kicker">'+t("simGate")+'</p><h3>'+t("simTitle")+'</h3><p class="note">'+t("simLead")+'</p></div>';
  SIM_AFTER.forEach(function(app, i){
    const note = LANG === "tr" ? app.tr : app.en;
    html += '<button type="button" class="row" data-act="app" data-scheme="'+esc(app.scheme)+'"><span class="when"><b>'+(i+1)+'</b><span>'+t("afterSim")+'</span></span><span style="flex:1"><p class="ttl">'+esc(app.name)+'</p><p class="note">'+esc(note)+'</p></span><span class="act">'+t("open")+'</span></button>';
  });
  html += '</div>';
  return html;
}
function renderTicketBoard(){
  const flights = TICKETS.filter(x => x.kind === "flight");
  const coaches = TICKETS.filter(x => x.kind === "coach");
  const stays = TICKETS.filter(x => x.kind === "stay");
  let html = '<p class="kicker">'+t("bookings")+'</p><h2>'+t("tickets")+'</h2><p class="muted">'+t("ticketsLead")+'</p>';
  html += renderAirPair();
  html += '<div class="banner" style="margin-top:10px">'+t("missingNight")+'</div>';
  flights.forEach(function(item){ html += renderTicket(item); });
  coaches.forEach(function(item){ html += renderTicket(item); });
  stays.forEach(function(item){ html += renderTicket(item); });
  html += renderSimGate();
  html += '<div class="card" style="margin-top:14px"><div class="pad"><p class="kicker">'+t("home")+'</p><h3>'+t("home")+'</h3><p class="note">'+t("homeSafe")+'</p></div><div class="pad" style="padding-top:0"><button class="btn btn-a" type="button" data-act="install">'+t("home")+'</button></div></div>';
  html += '<div class="card" style="margin-top:12px"><div class="pad"><p class="kicker">'+t("export")+'</p><h3>'+t("exportH")+'</h3><p class="note">'+t("exportLead")+'</p></div><div class="pad" style="padding-top:0"><button class="btn btn-a" type="button" data-act="export">'+t("icsCal")+'</button></div></div>';
  return html;
}
