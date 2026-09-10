const LANG_KEY = "belvia-lang";
let LANG = "en";
const I18N = {
  en: {
    tab_today:"Trip", tab_plan:"Schedule", tab_map:"Places", tab_pack:"Bag", tab_apps:"Tickets",
    welcome:"Welcome to BudVia", newTrip:"New trip", titleDates:"Title and dates", title:"Title",
    starts:"Starts", ends:"Ends", pnr:"Booking code", optional:"Optional", create:"Create trip",
    sample:"Load sample itinerary", sampleBanner:"Sample itinerary. Personal codes and street numbers are hidden.",
    upNext:"Up next", nothing:"Nothing waiting", openPlan:"Open plan", wipe:"Clear this device",
    wipeQ:"Remove this trip from this phone?", home:"Add to Home Screen",
    homeSafe:"Safari or Chrome. Share, then Add to Home Screen. No store login. The trip stays on this phone.",
    itinerary:"Itinerary", schedule:"Schedule", noRem:"No reminders yet. Add one below, or load the sample from Trip.",
    prep:"Prep", before:"Before departure", addRem:"Add a reminder", add:"Add reminder", notes:"Notes",
    route:"Route", places:"Places", noPlaces:"No places yet. Load the sample itinerary to drop pins.",
    legs:"Legs", savedDir:"Saved directions", close:"Close", directions:"Directions",
    bag:"Bag", packList:"Pack list for this trip.", packed:"packed", kit:"Kit",
    bookings:"Bookings", tickets:"Tickets", ticketsLead:"Flights, coaches and stays sit here with dates. Opening the seller app is optional.",
    air:"Air", departs:"Departs", arrives:"Arrives", outbound:"Outbound", ret:"Return",
    checkin:"Check-in", checkout:"Check-out", flight:"Flight", coach:"Coach", stay:"Stay",
    until:"Until departure", passed:"Passed", pnrLbl:"PNR",
    remindMaps:"Reminders + Maps", openCarrier:"Open seller site",
    simGate:"SIM gate", simTitle:"Four apps after the local SIM",
    simLead:"Buy the physical line at BUD T2B arrivals, fit it, then open these. Do not open them on the Turkish number.",
    afterSim:"After SIM", export:"Export", exportH:"Calendar and Reminders",
    exportLead:"This writes an .ics file on the phone. Add to Calendar puts timed events. Add to Reminders puts tasks. Nothing is uploaded.",
    icsCal:"Add to Calendar", icsRem:"Add to Reminders",
    icsNeed:"Add timed reminders first.",
    contact:"Contact", privacy:"This copy never leaves the phone. No login. No analytics.",
    example:"Worked example", list:"List", date:"Date", time:"Time",
    maps:"Maps", open:"Open", next:"What is next",
    months:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec",
    week:"Sun Mon Tue Wed Thu Fri Sat",
    onDevice:"On-device itinerary", missingNight:"Missing night \u2014 confirm the 18\u201319 Sep Vienna booking before 20 Sep."
  }
};
function t(k){ return (I18N.en[k] || k); }
function setLang(){ LANG = "en"; document.documentElement.lang = "en"; if(typeof paintAll==="function") paintAll(); }
function monthNames(){ return t("months").split(" "); }
function weekNames(){ return t("week").split(" "); }
function paintExport(){
  const root = document.getElementById("exportSheet");
  if(!root) return;
  root.innerHTML = '<p class="kicker">'+t("export")+'</p><h3>'+t("exportH")+'</h3><p class="muted">'+t("exportLead")+'</p>'+
    '<button class="btn btn-a" type="button" data-act="ics-cal">'+t("icsCal")+'</button>'+
    '<button class="btn btn-g" type="button" data-act="ics-rem">'+t("icsRem")+'</button>'+
    '<button class="btn btn-g" type="button" data-act="export-close">'+t("close")+'</button>';
}
