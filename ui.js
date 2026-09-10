const $ = (id) => document.getElementById(id);
function esc(s){
  return String(s == null ? "" : s).replace(/[&<>"']/g, function(c){
    if(c === "&") return "&";
    if(c === "<") return "<";
    if(c === ">") return ">";
    if(c === '"') return """;
    return "&#39;";
  });
}
function load(){ try { const raw = localStorage.getItem(KEY); return raw ? Object.assign(emptyState(), JSON.parse(raw)) : emptyState(); } catch(e){ return emptyState(); } }
function save(){ try { localStorage.setItem(KEY, JSON.stringify(S)); } catch(e){} }
let S = load();
let tab = "today";
let map = null;
let mapSig = "";
function hasTrip(){ return !!(S.meta.title || S.reminders.length); }
function placeBy(id){ return S.places.find(p => p.id === id); }
function mapsUrl(p){ if(!p) return ""; return "https://maps.apple.com/?daddr=" + encodeURIComponent(p.name + ", " + p.address) + "&dirflg=d&t=m"; }
function routeUrl(r){ const a=placeBy(r.from), b=placeBy(r.to); if(!a||!b) return ""; return "https://maps.apple.com/?saddr="+encodeURIComponent(a.name)+"&daddr="+encodeURIComponent(b.name)+"&dirflg="+(r.mode||"d")+"&t=m"; }
function fmtWhen(iso){
  if(!iso) return { day:"Prep", time:"\u2014" };
  const parts = String(iso).split("T");
  const d = (parts[0]||"").split("-");
  if(d.length!==3) return { day:"Prep", time:"\u2014" };
  const wd = new Date(Date.UTC(+d[0], +d[1]-1, +d[2])).getUTCDay();
  return { day: WEEK[wd] + " " + (+d[2]) + " " + MONTHS[+d[1]-1], time: (parts[1]||"\u2014").slice(0,5) };
}
function rangeLabel(){
  if(!S.meta.start) return "On-device itinerary";
  const a=S.meta.start.split("-"), b=(S.meta.end||S.meta.start).split("-");
  return (+a[2])+" "+MONTHS[+a[1]-1]+" \u2013 "+(+b[2])+" "+MONTHS[+b[1]-1];
}
function nextUp(){
  const now=Date.now();
  return S.reminders.filter(r=>r.at && !S.done[r.id]).map(r=>({r,t:Date.parse(r.at.length===16?r.at+":00":r.at)})).filter(x=>!Number.isNaN(x.t)&&x.t>=now-36e5).sort((a,b)=>a.t-b.t)[0];
}
function stamp(iso){ const [d,t="09:00"]=String(iso).split("T"); return d.replace(/-/g,"")+"T"+t.replace(":","")+"00"; }
function fold(s){ const t=String(s).replace(/\n/g,"\\n").replace(/,/g,"\\,"); const o=[]; for(let i=0;i<t.length;i+=74) o.push((i?" ":"")+t.slice(i,i+74)); return o.join("\r\n"); }
function buildIcs(kind){
  const now=stamp(new Date().toISOString().slice(0,16));
  const lines=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Belvia//Travel//EN","CALSCALE:GREGORIAN","METHOD:PUBLISH","X-WR-CALNAME:"+(S.meta.title||"Belvia")];
  S.reminders.filter(r=>r.at).forEach(r=>{
    const start=stamp(r.at);
    const hm=(r.at.split("T")[1]||"09:00").split(":");
    let eh=+hm[0], em=+hm[1]+40; if(em>=60){ eh+=1; em-=60; }
    const end=r.at.split("T")[0].replace(/-/g,"")+"T"+String(eh).padStart(2,"0")+String(em).padStart(2,"0")+"00";
    const place=placeBy(r.place);
    if(kind==="event"){
      lines.push("BEGIN:VEVENT","UID:"+r.id+"@belvia.app","DTSTAMP:"+now+"Z","DTSTART:"+start,"DTEND:"+end,fold("SUMMARY:"+r.title));
      if(r.notes) lines.push(fold("DESCRIPTION:"+r.notes));
      if(place){ lines.push(fold("LOCATION:"+place.address)); lines.push("GEO:"+place.lat+";"+place.lng); }
      lines.push("BEGIN:VALARM","ACTION:DISPLAY","TRIGGER:-PT45M","DESCRIPTION:"+r.title,"END:VALARM","END:VEVENT");
    } else {
      lines.push("BEGIN:VTODO","UID:"+r.id+"-todo@belvia.app","DTSTAMP:"+now+"Z","DTSTART:"+start,"DUE:"+start,fold("SUMMARY:"+r.title),"STATUS:NEEDS-ACTION");
      if(r.notes) lines.push(fold("DESCRIPTION:"+r.notes));
      lines.push("BEGIN:VALARM","ACTION:DISPLAY","TRIGGER:-PT30M","DESCRIPTION:"+r.title,"END:VALARM","END:VTODO");
    }
  });
  lines.push("END:VCALENDAR");
  return lines.join("\r\n")+"\r\n";
}
function downloadIcs(name,body){
  const blob=new Blob([body],{type:"text/calendar;charset=utf-8"});
  const file=new File([blob],name,{type:"text/calendar"});
  if(navigator.canShare && navigator.canShare({files:[file]})){ navigator.share({files:[file],title:name}).catch(function(){}); return; }
  const a=document.createElement("a"); a.href=URL.createObjectURL(blob); a.download=name; document.body.appendChild(a); a.click(); a.remove();
}
function openScheme(scheme){ const a=document.createElement("a"); a.href=scheme; a.rel="noopener noreferrer"; document.body.appendChild(a); a.click(); a.remove(); }
function setTab(id){
  if(TABS.indexOf(id)<0) return;
  tab=id;
  document.querySelectorAll("#pills button, #dock button").forEach(b=>b.classList.toggle("on", b.getAttribute("data-go")===id));
  const pager=$("pager");
  pager.scrollLeft = TABS.indexOf(id) * pager.clientWidth;
  if(id==="map") setTimeout(ensureMap, 80);
}
function paintChrome(){
  $("hdrTitle").textContent = S.meta.title || "Belvia";
  $("hdrSub").textContent = hasTrip() ? rangeLabel() : "On-device itinerary";
  $("pills").innerHTML = TABS.map(t=>'<button type="button" data-go="'+t+'"'+(t===tab?' class="on"':'')+'>'+LABELS[t]+'</button>').join("");
  const icons={
    today:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="5" width="16" height="15" rx="3"/><path d="M8 3v4M16 3v4M4 10h16"/></svg>',
    plan:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/></svg>',
    map:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 4l-5 2v14l5-2 6 2 5-2V4l-5 2-6-2z"/><path d="M9 4v14M15 6v14"/></svg>',
    pack:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M7 8V7a5 5 0 0 1 10 0v1M6 8h12l-1 13H7L6 8z"/></svg>',
    apps:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="4" width="7" height="7" rx="1.6"/><rect x="13" y="4" width="7" height="7" rx="1.6"/><rect x="4" y="13" width="7" height="7" rx="1.6"/><rect x="13" y="13" width="7" height="7" rx="1.6"/></svg>'
  };
  $("dock").innerHTML = TABS.map(t=>'<button type="button" data-go="'+t+'"'+(t===tab?' class="on"':'')+'>'+icons[t]+LABELS[t]+'</button>').join("");
}
function paintToday(){
  const root=$("page-today");
  if(!hasTrip()){
    root.innerHTML='<p class="kicker">Belvia</p><h2>A private trip, on this device.</h2><p class="muted">Reminders, maps, packing and the apps already on your phone.</p><div class="stack" style="margin-top:16px"><div class="card"><div class="pad"><p class="kicker">New trip</p><h3>Title and dates</h3></div><div class="field"><label>Title</label><input id="nTitle" placeholder="Ankara \u2192 Budapest" /></div><div class="grid2"><div class="field"><label>Starts</label><input id="nStart" type="date" /></div><div class="field"><label>Ends</label><input id="nEnd" type="date" /></div></div><div class="field"><label>Booking code</label><input id="nPnr" placeholder="Optional" autocomplete="off" /></div><div class="pad"><button class="btn btn-a" type="button" data-act="create">Create trip</button></div></div><button class="btn btn-g" type="button" data-act="demo">Load sample itinerary</button><p class="muted">Sample: 14\u201321 Sep 2026 Ankara\u2013Budapest\u2013Vienna. Codes and street numbers removed.</p></div>';
    return;
  }
  const n=nextUp();
  root.innerHTML=(S.meta.sample?'<div class="banner">Sample itinerary. Personal codes and street numbers are hidden.</div>':'')+'<p class="kicker">'+esc(rangeLabel())+'</p><h2>'+esc(S.meta.title)+'</h2><p class="muted">'+(S.meta.pnr?'Booking ref '+esc(S.meta.pnr):'Add a booking code when you have one.')+'</p><div class="stack" style="margin-top:16px">'+flightCard()+'<div class="card"><div class="pad"><p class="kicker">Up next</p>'+(n?'<h3>'+esc(n.r.title)+'</h3><p class="note">'+esc(fmtWhen(n.r.at).day+' \u00b7 '+fmtWhen(n.r.at).time)+'</p>'+(n.r.notes?'<p class="note">'+esc(n.r.notes)+'</p>':''):'<h3>Nothing waiting</h3><p class="note">Open Plan to add a reminder.</p>')+'</div></div><button class="btn btn-a" type="button" data-act="go" data-go="plan">Open plan</button><button class="btn btn-g" type="button" data-act="wipe">Clear this device</button></div>';
}
function flightCard(){
  const out=S.reminders.find(r=>r.id==="d14b"); const ret=S.reminders.find(r=>r.id==="d21c");
  if(!out) return "";
  const a=fmtWhen(out.at), b=ret?fmtWhen(ret.at):null;
  return '<div class="ticket"><p class="kicker">Air</p><div class="codes"><div><div class="code">ESB</div><div class="city">Ankara</div></div><div class="mid">Wizz Air</div><div style="text-align:right"><div class="code">BUD</div><div class="city">Budapest</div></div></div><div class="meta"><div><span>Outbound</span><b>'+esc(a.day)+' \u00b7 '+esc(a.time)+'</b></div><div style="text-align:right"><span>Return</span><b>'+(b?esc(b.day+' \u00b7 '+b.time):'\u2014')+'</b></div></div></div>';
}
