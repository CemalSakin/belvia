const TICKETS = [
  {id:"f1",kind:"flight",carrier:"Wizz Air",code:"W6 2488",from:"ESB",to:"BUD",fromCity:"Ankara",toCity:"Budapest",at:"2026-09-14T10:25",land:"2026-09-14T11:55",pnr:"\u2022\u2022\u2022\u2022\u2022\u2022",scheme:"wizzair://",notes:"Keep the pass offline. Land T2B."},
  {id:"f2",kind:"flight",carrier:"Wizz Air",code:"W6 2487",from:"BUD",to:"ESB",fromCity:"Budapest",toCity:"Ankara",at:"2026-09-21T06:20",land:"2026-09-21T09:50",pnr:"\u2022\u2022\u2022\u2022\u2022\u2022",scheme:"wizzair://",notes:"Leave the stay at 03:30. Night 100E does not run."},
  {id:"c1",kind:"coach",carrier:"FlixBus",code:"QR 11B",from:"BUD",to:"VIE",fromCity:"N\u00e9pliget",toCity:"Erdberg",at:"2026-09-17T06:00",land:"2026-09-17T08:50",scheme:"flixbus://",notes:"Save the QR offline before you leave the stay."},
  {id:"c2",kind:"coach",carrier:"FlixBus",code:"QR 3A",from:"VIE",to:"BUD",fromCity:"Wien Hbf",toCity:"N\u00e9pliget",at:"2026-09-19T23:45",land:"2026-09-20T02:50",scheme:"flixbus://",notes:"Signage may say Budapest Airport. Leave at N\u00e9pliget."},
  {id:"s1",kind:"stay",carrier:"Airbnb",title:"Budapest stay",fromCity:"District XIII",toCity:"Lehel t\u00e9r",at:"2026-09-14T15:00",land:"2026-09-17T04:45",scheme:"airbnb://",notes:"Sample pin only. Confirm the arrival window."},
  {id:"s2",kind:"stay",carrier:"Booking.com",title:"Vienna hostel",fromCity:"Marina Tower",toCity:"17\u201318 Sep",at:"2026-09-17T15:00",land:"2026-09-18T11:00",scheme:"booking://",notes:"Second Vienna night is a separate booking. Confirm 18\u201319 Sep."}
];
const BOOK_APPS = [
  ["wizz","Wizz Air","wizzair://","Boarding pass and check-in"],
  ["flixbus","FlixBus","flixbus://","Coach QR codes"],
  ["airbnb","Airbnb","airbnb://","Stay and host messages"],
  ["booking","Booking.com","booking://","Hotel reservations"]
];
const SIM_AFTER = [
  ["bubi","MOL Bubi","bubi://","City bikes. Needs the local number."],
  ["bumble","Bumble","bumble://","Lock the pin after the SIM is in."],
  ["timeleft","Timeleft","timeleft://","Wednesday table. Local line."],
  ["nomad","Nomadtable","nomadtable://","Solo meetups after the SIM."]
];
function untilLabel(iso){
  if(!iso) return "";
  const t=Date.parse(iso.length===16?iso+":00":iso);
  if(Number.isNaN(t)) return "";
  const d=t-Date.now();
  if(d<=0) return "Passed";
  const days=Math.floor(d/864e5);
  const hrs=Math.floor((d%864e5)/36e5);
  if(days>=1) return days+"d "+hrs+"h";
  const min=Math.floor((d%36e5)/6e4);
  return hrs+"h "+min+"m";
}
function ticketKind(k){
  if(k==="flight") return "Flight";
  if(k==="coach") return "Coach";
  if(k==="stay") return "Stay";
  return "Ticket";
}
function renderTicket(t){
  const a=fmtWhen(t.at);
  const b=t.land?fmtWhen(t.land):null;
  const left=t.from||t.fromCity||"";
  const right=t.to||t.toCity||"";
  const mid=t.code||t.carrier||"";
  const wait=untilLabel(t.at);
  return '<div class="ticket" style="margin-top:10px"><p class="kicker">'+esc(ticketKind(t.kind))+(wait?" \u00b7 "+wait:"")+'</p>'+
    '<div class="codes"><div><div class="code">'+esc(left)+'</div><div class="city">'+esc(t.fromCity||"")+'</div></div>'+
    '<div class="mid">'+esc(t.carrier||"")+(t.code?"<br/>"+esc(t.code):"")+'</div>'+
    '<div style="text-align:right"><div class="code">'+esc(right)+'</div><div class="city">'+esc(t.toCity||"")+'</div></div></div>'+
    '<div class="meta"><div><span>'+(t.kind==="stay"?"Check-in":"Departs")+'</span><b>'+esc(a.day+" \u00b7 "+a.time)+'</b></div>'+
    '<div style="text-align:right"><span>'+(t.kind==="stay"?"Check-out":"Arrives")+'</span><b>'+(b?esc(b.day+" \u00b7 "+b.time):"\u2014")+'</b></div></div>'+
    (t.pnr?'<p class="note" style="margin-top:10px">PNR '+esc(t.pnr)+'</p>':'')+
    (t.notes?'<p class="note">'+esc(t.notes)+'</p>':'')+
    (t.scheme?'<button class="btn btn-g" type="button" data-act="app" data-scheme="'+esc(t.scheme)+'" style="margin-top:12px">Open '+esc(t.carrier)+'</button>':'')+
    '</div>';
}
