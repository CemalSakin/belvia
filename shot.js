/* Pinned examples. Keys are tabs. Values are files that exist on main. */
window.SHOT = {
  trip: "./IMG_0554.jpeg",
  schedule: "./IMG_0555.jpeg",
  tickets: "./IMG_0556.jpeg",
  routes: "./IMG_0557.jpeg",
  bag: "./IMG_0559.jpeg",
  apps: "./IMG_0564.jpeg",
  otter: "./0875CF7C-5ACB-48B1-B2CD-57E02C5C9B58.jpeg"
};
window.SHOT_V = "pin2";
window.EX = {
  trip: window.SHOT.trip + "?v=" + window.SHOT_V,
  schedule: window.SHOT.schedule + "?v=" + window.SHOT_V,
  tickets: window.SHOT.tickets + "?v=" + window.SHOT_V,
  routes: window.SHOT.routes + "?v=" + window.SHOT_V,
  bag: window.SHOT.bag + "?v=" + window.SHOT_V,
  apps: window.SHOT.apps + "?v=" + window.SHOT_V,
  otter: window.SHOT.otter + "?v=" + window.SHOT_V
};
window.exampleShot = function(src, label){
  var url = src;
  if(window.EX && window.EX[src]) url = window.EX[src];
  if(!url) return "";
  var cap = label || "Example";
  return '<div class="card example-card" style="margin-top:18px"><div class="pad"><p class="kicker">'+cap+'</p></div><img class="example-shot" alt="'+cap+'" decoding="async" src="'+url+'"/></div>';
};
