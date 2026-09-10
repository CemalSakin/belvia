const CACHE = "budvia-home-1";
const PRECACHE = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./app.js",
  "./ui.js",
  "./pages.js",
  "./events.js",
  "./icon.js",
  "./brand.js",
  "./b1.js",
  "./b2.js",
  "./b3.js",
  "./install.js"
];

self.addEventListener("install", function(event){
  event.waitUntil(
    caches.open(CACHE).then(function(cache){ return cache.addAll(PRECACHE); }).then(function(){ return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function(event){
  event.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.filter(function(k){ return k !== CACHE; }).map(function(k){ return caches.delete(k); }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function(event){
  if(event.request.method !== "GET") return;
  var url = new URL(event.request.url);
  if(url.origin !== self.location.origin) return;
  event.respondWith(
    caches.match(event.request).then(function(hit){
      if(hit) return hit;
      return fetch(event.request).then(function(res){
        var copy = res.clone();
        caches.open(CACHE).then(function(cache){ cache.put(event.request, copy); }).catch(function(){});
        return res;
      }).catch(function(){
        return caches.match("./index.html");
      });
    })
  );
});
