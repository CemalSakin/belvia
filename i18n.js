const LANG_KEY = "belvia-lang";
function readLang(){
  try { const v = localStorage.getItem(LANG_KEY); if(v === "tr" || v === "en") return v; } catch(e){}
  return String(navigator.language || "").toLowerCase().indexOf("tr") === 0 ? "tr" : "en";
}
let LANG = readLang();
const I18N = {
  en: {
    tab_today:"Trip", tab_plan:"Schedule", tab_map:"Places", tab_pack:"Bag", tab_apps:"Tickets",
    welcome:"Welcome to BudVia", newTrip:"New trip", titleDates:"Title and dates", title:"Title",
    starts:"Starts", ends:"Ends", pnr:"Booking code", optional:"Optional", create:"Create trip",
    sample:"Load sample itinerary", sampleBanner:"Sample itinerary. Personal codes and street numbers are hidden.",
    upNext:"Up next", nothing:"Nothing waiting", openPlan:"Open plan", wipe:"Clear this device",
    wipeQ:"Remove this trip from this phone?", home:"Add to Home Screen",
    homeSafe:"Safari or Chrome. Share → Add to Home Screen. No App Store login. The trip stays on this phone.",
    itinerary:"Itinerary", schedule:"Schedule", noRem:"No reminders yet. Add one below, or load the sample from Trip.",
    prep:"Prep", before:"Before departure", addRem:"Add a reminder", add:"Add reminder", notes:"Notes",
    route:"Route", places:"Places", noPlaces:"No places yet. Load the sample itinerary to drop pins.",
    legs:"Legs", savedDir:"Saved directions", close:"Close", directions:"Directions",
    bag:"Bag", packList:"Pack list for this trip.", packed:"packed", kit:"Kit",
    bookings:"Bookings", tickets:"Tickets", ticketsLead:"Flights, coaches and stays sit here with dates. Opening the seller app is optional.",
    air:"Air", departs:"Departs", arrives:"Arrives", outbound:"Outbound", ret:"Return",
    checkin:"Check-in", checkout:"Check-out", flight:"Flight", coach:"Coach", stay:"Stay",
    until:"Until departure", passed:"Passed", pnrLbl:"PNR",
    remindMaps:"Reminders + Maps", openCarrier:"Open seller app",
    simGate:"SIM gate", simTitle:"Four apps after the local SIM",
    simLead:"Buy the physical line at BUD T2B arrivals, fit it, then open these. Do not open them on the Turkish number.",
    afterSim:"After SIM", export:"Export", exportH:"Calendar and Reminders",
    exportLead:"This writes an .ics file on the phone. Add to Calendar puts timed events. Add to Reminders puts tasks. Nothing is uploaded.",
    icsCal:"Add to Calendar", icsRem:"Add to Reminders",
    icsNeed:"Add timed reminders first.",
    contact:"Contact", privacy:"This copy never leaves the phone. No login. No analytics.",
    example:"Example", list:"List", date:"Date", time:"Time",
    maps:"Maps", open:"Open", next:"What is next",
    months:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec",
    week:"Sun Mon Tue Wed Thu Fri Sat",
    onDevice:"On-device itinerary", missingNight:"Missing night — confirm the 18–19 Sep Vienna booking before 20 Sep."
  },
  tr: {
    tab_today:"Gezi", tab_plan:"Plan", tab_map:"Yerler", tab_pack:"Çanta", tab_apps:"Biletler",
    welcome:"BudVia'ya hoş geldin", newTrip:"Yeni gezi", titleDates:"Başlık ve tarihler", title:"Başlık",
    starts:"Başlangıç", ends:"Bitiş", pnr:"Rezervasyon kodu", optional:"İsteğe bağlı", create:"Gezi oluştur",
    sample:"Örnek güzergahı yükle", sampleBanner:"Örnek güzergah. Kişisel kodlar ve ev numaraları gizli.",
    upNext:"Sıradaki", nothing:"Bekleyen yok", openPlan:"Planı aç", wipe:"Bu telefondan sil",
    wipeQ:"Bu geziyi telefondan silmek istiyor musun?", home:"Ana ekrana ekle",
    homeSafe:"Safari veya Chrome. Paylaş → Ana Ekrana Ekle. Mağaza hesabı yok. Plan bu telefonda kalır.",
    itinerary:"Güzergah", schedule:"Plan", noRem:"Henüz anımsatıcı yok. Aşağıdan ekle veya Gezi'den örneği yükle.",
    prep:"Hazırlık", before:"Kalkıştan önce", addRem:"Anımsatıcı ekle", add:"Ekle", notes:"Not",
    route:"Rota", places:"Yerler", noPlaces:"Henüz yer yok. Örnek güzergah iğneleri koyar.",
    legs:"Bacaklar", savedDir:"Kayıtlı yollar", close:"Kapat", directions:"Yol tarifi",
    bag:"Çanta", packList:"Bu gezi için paket listesi.", packed:"paketlendi", kit:"Kit",
    bookings:"Rezervasyonlar", tickets:"Biletler", ticketsLead:"Uçak, otöbüs ve konaklama tarihleriyle burada durur. Satıcı uygulamayı açmak isteğe bağlıdır.",
    air:"Uçuş", departs:"Kalkış", arrives:"Varış", outbound:"Gidiş", ret:"Dönüş",
    checkin:"Giriş", checkout:"Çıkış", flight:"Uçuş", coach:"Otöbüs", stay:"Konaklama",
    until:"Kalkışa", passed:"Geçti", pnrLbl:"PNR",
    remindMaps:"Anımsatıcılar + Haritalar", openCarrier:"Satıcı uygulamayı aç",
    simGate:"SIM kapısı", simTitle:"SIM'den sonra dört uygulama",
    simLead:"BUD T2B varış holünde fiziksel hattı al, tak, sonra aç. Türk numarasıyla hesap açma.",
    afterSim:"SIM'den sonra", export:"Dışa aktar", exportH:"Takvim ve Anımsatıcılar",
    exportLead:"Telefona bir .ics dosyası yazar. Takvime Ekle saatli olay koyar. Anımsatıcılara Ekle görev koyar. Hiçbir şey yüklenmez.",
    icsCal:"Takvime ekle", icsRem:"Anımsatıcılara ekle",
    icsNeed:"Önce saatli anımsatıcı ekle.",
    contact:"İletişim", privacy:"Bu kopya telefondan çıkmaz. Hesap yok. Analitik yok.",
    example:"Örnek", list:"Liste", date:"Tarih", time:"Saat",
    maps:"Harita", open:"Aç", next:"Sıradaki iş",
    months:"Oca Şub Mar Nis May Haz Tem Ağu Eyl Eki Kas Ara",
    week:"Paz Pzt Sal Çar Per Cum Cmt",
    onDevice:"Cihazdaki güzergah", missingNight:"Eksik gece — 18–19 Eyl Viyana rezervasyonunu 20 Eyl öncesi doğrula."
  }
};
function t(k){ const pack = I18N[LANG] || I18N.en; return pack[k] || I18N.en[k] || k; }
function setLang(l){
  LANG = (l === "tr") ? "tr" : "en";
  try { localStorage.setItem(LANG_KEY, LANG); } catch(e){}
  document.documentElement.lang = LANG;
  paintAll();
  paintExport();
}
function monthNames(){ return t("months").split(" "); }
function weekNames(){ return t("week").split(" "); }
function paintExport(){
  const root = $("exportSheet");
  if(!root) return;
  root.innerHTML = '<p class="kicker">'+t("export")+'</p><h3>'+t("exportH")+'</h3><p class="muted">'+t("exportLead")+'</p>'+
    '<button class="btn btn-a" type="button" data-act="ics-cal">'+t("icsCal")+'</button>'+
    '<button class="btn btn-g" type="button" data-act="ics-rem">'+t("icsRem")+'</button>'+
    '<button class="btn btn-g" type="button" data-act="export-close">'+t("close")+'</button>';
}
