(function(){
  function add(src){
    document.write('<script src="'+src+'"><\/script>');
  }
  add('./i18n.js?v=lock3');
  add('./tickets.js?v=lock3');
})();
