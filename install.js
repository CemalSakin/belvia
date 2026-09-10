(function(){
  var DISMISS = "belvia-install-dismiss";
  var deferred = null;

  function standalone(){
    return window.matchMedia("(display-mode: standalone)").matches
      || window.navigator.standalone === true;
  }
  function ios(){
    return /iphone|ipad|ipod/i.test(navigator.userAgent);
  }

  function hideBar(){
    var bar = document.getElementById("installBar");
    if(bar) bar.remove();
    var help = document.getElementById("installHelp");
    if(help) help.classList.remove("show");
  }

  function helpHtml(title, body){
    return '<p class="kicker">Home screen</p><h3>'+title+'</h3><p class="muted">'+body+'</p>';
  }

  function showHelp(title, body){
    var ov = document.getElementById("installHelp");
    var inner = helpHtml(title, body) + '<button class="btn btn-a" type="button" data-act="install">Add to Home Screen</button><button class="btn btn-g" type="button" data-act="install-close">Close</button>';
    if(!ov){
      ov = document.createElement("div");
      ov.id = "installHelp";
      ov.className = "overlay";
      ov.innerHTML = '<div class="sheet stack">'+inner+'</div>';
      document.body.appendChild(ov);
      ov.addEventListener("click", function(e){
        if(e.target.id === "installHelp") ov.classList.remove("show");
      });
    } else {
      ov.querySelector(".sheet").innerHTML = inner;
    }
    ov.classList.add("show");
  }

  function add(){
    if(standalone()){
      hideBar();
      return;
    }
    if(deferred){
      var ev = deferred;
      deferred = null;
      ev.prompt();
      ev.userChoice.then(function(res){
        if(res && res.outcome === "accepted") hideBar();
        else bar();
      }).catch(function(){ bar(); });
      return;
    }
    if(ios()){
      showHelp("Safari, then Share", "Apple blocks one-tap install. Tap Share, then Add to Home Screen.");
      return;
    }
    showHelp("Chrome install", "If the system sheet did not open, tap the Chrome menu and choose Install app. Stay on this page, then tap Add to Home Screen again.");
  }

  function bar(){
    if(standalone()) return;
    if(sessionStorage.getItem(DISMISS) === "1") return;
    if(document.getElementById("installBar")) return;
    var header = document.querySelector("#app header.top");
    if(!header) return;
    var b = document.createElement("div");
    b.id = "installBar";
    b.innerHTML = '<button class="btn btn-a" type="button" data-act="install" style="min-height:40px;margin-top:8px">Add to Home Screen</button>';
    header.appendChild(b);
  }

  window.addEventListener("beforeinstallprompt", function(e){
    e.preventDefault();
    deferred = e;
    bar();
  });
  window.addEventListener("appinstalled", hideBar);

  document.addEventListener("click", function(e){
    var el = e.target.closest("[data-act]");
    if(!el) return;
    var act = el.getAttribute("data-act");
    if(act === "install"){
      e.preventDefault();
      add();
    } else if(act === "install-close"){
      var help = document.getElementById("installHelp");
      if(help) help.classList.remove("show");
    } else if(act === "install-later"){
      sessionStorage.setItem(DISMISS, "1");
      hideBar();
    }
  });

  if("serviceWorker" in navigator){
    navigator.serviceWorker.register("./sw.js").catch(function(){});
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", bar);
  } else {
    bar();
  }

  window.BudViaInstall = { add: add };
})();
