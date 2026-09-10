const LANG_KEY = "belvia-lang";
let LANG = "en";
const I18N = {
  en: {
    tab_today:"Trip", tab_plan:"Schedule", tab_map:"Places", tab_pack:"Bag", tab_apps:"Tickets",
    welcome:"Welcome to BudVia", newTrip:"New trip", titleDates:"Name and dates", title:"Name",
    starts:"Starts", ends:"Ends", pnr:"Booking code", optional:"You can skip this", create:"Save trip",
    sample:"Load a sample trip", sampleBanner:"This is a sample. Real codes are hidden.",
    upNext:"Next", nothing:"Nothing next", openPlan:"Open schedule", wipe:"Clear this phone",
    wipeQ:"Delete this trip from this phone?", home:"Add to Home Screen",
    homeSafe:"Safari or Chrome. Share, then Add to Home Screen. The trip stays on this phone.",
    itinerary:"Plan", schedule:"Schedule", noRem:"Nothing here yet. Add one below, or load a sample on Trip.",
    prep:"Before you leave", before:"Do these first", addRem:"Add a reminder", add:"Add reminder", notes:"Notes",
    route:"Route", places:"Places", noPlaces:"No places yet. Add one below, or load a sample trip.",
    legs:"Legs", savedDir:"Saved routes", close:"Close", directions:"Directions",
    bag:"Bag", packList:"What goes in the bag.", packed:"packed", kit:"Kit",
    bookings:"Your tickets", tickets:"Tickets", ticketsLead:"One card for each ticket. You do not have to open the airline site.",
    air:"Flight", departs:"Leaves", arrives:"Lands", outbound:"Going", ret:"Back",
    checkin:"Check-in", checkout:"Check-out", flight:"Flight", coach:"Bus", stay:"Stay",
    until:"Until it leaves", passed:"Done", pnrLbl:"Code",
    remindMaps:"Save to calendar", openCarrier:"Open site",
    simGate:"After the SIM", simTitle:"Apps after the local SIM",
    simLead:"Add apps you open only after the local phone number works.",
    afterSim:"After SIM", export:"Export", exportH:"Calendar",
    exportLead:"This saves a file on the phone. Nothing is sent away.",
    icsCal:"Add to Calendar", icsRem:"Add to Reminders",
    icsNeed:"Add a time first.",
    contact:"Contact", privacy:"This stays on the phone. No login. No tracking.",
    example:"How this works", list:"List", date:"Date", time:"Time",
    maps:"Maps", open:"Open", next:"Next",
    months:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec",
    week:"Sun Mon Tue Wed Thu Fri Sat",
    onDevice:"Saved on this phone", missingNight:"Check the Vienna night of 18–19 Sep before 20 Sep."
  }
};
function t(k){ return (I18N.en[k] || k); }
function setLang(){ LANG = "en"; document.documentElement.lang = "en"; if(typeof paintAll==="function") paintAll(); }
function monthNames(){ return t("months").split(" "); }
function weekNames(){ return t("week").split(" "); }
function paintExport(){
  const root = document.getElementById("exportSheet");
  if(!root) return;
  root.innerHTML = '<p class="kicker">Save</p><h3>Calendar</h3><p class="muted">This saves a file on the phone. Nothing is sent away.</p>'+
    '<button class="btn btn-a" type="button" data-act="ics-cal">Add to Calendar</button>'+
    '<button class="btn btn-g" type="button" data-act="ics-rem">Add to Reminders</button>'+
    '<button class="btn btn-g" type="button" data-act="export-close">Close</button>';
}
