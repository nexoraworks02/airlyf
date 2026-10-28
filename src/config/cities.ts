// City pages (/[area]/[city]/) and city cost guides (/duct-cleaning-cost/[city]/).
// Each city has its OWN local content — climate, housing, neighbourhoods,
// cost factors and FAQs — so no two pages are copies of each other.
// Prices are NOT written here: they come from the area's pricing in
// config/site.ts, so a price change updates every city page automatically.

import { provincePages } from "./service-areas";
import { provinces, type Province } from "./site";

export type City = {
  slug: string; // URL, e.g. "toronto"
  name: string;
  areaSlug: string; // parent area page, e.g. "ontario" → /ontario/toronto/
  neighbourhoods: string[];
  intro: string;
  climate: string; // how the local climate affects duct systems
  homes: string; // local housing stock
  costFactors: { title: string; text: string }[];
  faqs: { question: string; answer: string }[];
  nearby?: string[]; // surrounding towns also served (shown on the city page)
};

export const cities: City[] = [
  /* ---------------- Ontario: Toronto & the GTA ---------------- */
  {
    slug: "toronto",
    name: "Toronto",
    areaSlug: "ontario",
    neighbourhoods: ["The Annex", "Leslieville", "Leaside", "North York", "Scarborough", "Etobicoke", "East York", "The Beaches"],
    intro:
      "Airlyf cleans ducts, furnaces and dryer vents in every corner of Toronto — Victorian semis downtown, mid-century bungalows in Scarborough and Etobicoke, and newer townhomes in North York.",
    climate:
      "Toronto's heating season runs from October to April, and by June the same ducts are carrying air-conditioned air. With the system moving air almost all year, dust and pollen never really get a chance to settle out — they just keep circulating.",
    homes:
      "Much of the city's older housing has ductwork that's been extended, rerouted and patched through decades of renovations. Every renovation leaves a layer of plaster and drywall dust in the returns, and it's one of the main things we pull out of Toronto homes.",
    costFactors: [
      { title: "Long, patched duct runs", text: "Older homes in neighbourhoods like The Annex and Leslieville often have extra branches added over the years. Our Basic Duct Cleaning covers every vent, but if you're comparing quotes, check that theirs does too." },
      { title: "Post-renovation dust", text: "Fresh drywall dust sticks to duct walls. If you've renovated in the last few years, Brush Cleaning is worth adding." },
      { title: "One furnace or two", text: "Homes with a basement apartment sometimes run a second furnace. Furnace cleaning is priced per unit, so you only pay for the ones you have." },
    ],
    faqs: [
      { question: "Do you clean semis and townhouses in Toronto?", answer: "Yes — detached houses, semis, row houses, townhomes and duplexes. For condo units, send us a message with your system type and we'll let you know what we can clean." },
      { question: "Which parts of Toronto do you cover?", answer: "The whole city: downtown, East York, North York, Scarborough and Etobicoke. Pick Ontario in the booking form to see your prices, and we call to confirm a morning, afternoon or evening arrival." },
    ],
  },
  {
    slug: "mississauga",
    name: "Mississauga",
    areaSlug: "ontario",
    neighbourhoods: ["Port Credit", "Streetsville", "Meadowvale", "Erin Mills", "Clarkson", "Cooksville", "Churchill Meadows", "Malton"],
    intro:
      "From the lakefront in Port Credit and Clarkson to the family streets of Meadowvale, Erin Mills and Churchill Meadows, Airlyf handles duct and furnace cleaning for homes right across Mississauga.",
    climate:
      "Lake Ontario keeps Mississauga humid in summer and damp in spring and fall. When moisture meets dust inside the ductwork, you get that stale, musty smell when the system first switches on.",
    homes:
      "A lot of Mississauga was built between the '70s and early 2000s, so plenty of original duct systems have now been running for 25 to 50 years. Finished basements are everywhere here, adding extra supply vents and returns.",
    costFactors: [
      { title: "Finished basements", text: "Extra basement vents are included — Basic Duct Cleaning covers every vent in the house, not a fixed number." },
      { title: "Decades-old ductwork", text: "Systems that have never been cleaned since the house was built usually carry the heaviest buildup. Brush Cleaning helps shift it." },
      { title: "Central air", text: "Most homes here have central AC. Adding the AC coil cleaning while we're on site saves a separate visit." },
    ],
    faqs: [
      { question: "How long does a Mississauga duct cleaning take?", answer: "Usually two to four hours, depending on the size of the home, how many vents it has and which extras you choose." },
      { question: "Can you do the dryer vent on the same visit?", answer: "Yes. Tick Dryer Vent in the booking form and it's done during the same appointment." },
    ],
  },
  {
    slug: "brampton",
    name: "Brampton",
    areaSlug: "ontario",
    neighbourhoods: ["Bramalea", "Springdale", "Heart Lake", "Castlemore", "Mount Pleasant", "Fletcher’s Meadow", "Sandringham-Wellington", "Credit Valley"],
    intro:
      "Airlyf works in Brampton every week — in established neighbourhoods like Bramalea and Heart Lake and in the newer subdivisions of Springdale, Castlemore, Mount Pleasant and Credit Valley.",
    climate:
      "Brampton's winters keep the furnace on for months, and humid summers keep the AC running. That near-constant airflow loads the ducts with dust, pollen and pet hair faster than you'd expect.",
    homes:
      "Brampton has grown quickly, and many homes are less than twenty years old. New builds are often the dustiest we see: drywall dust, sawdust and debris land in the ducts during construction and start circulating the day you move in. Larger households and basement suites add to the load.",
    costFactors: [
      { title: "Builder's dust", text: "If your home has never been cleaned since it was built, the first cleaning usually makes the biggest difference." },
      { title: "Basement suites", text: "A legal basement apartment may have its own furnace. Set furnace cleaning to 2 in the booking form so both are covered." },
      { title: "Busy households", text: "More people and pets means more dust and hair in the system — and a good reason to clean a little more often." },
    ],
    faqs: [
      { question: "My house is new — does it really need duct cleaning?", answer: "Very often, yes. Construction dust settles in new ductwork and gets blown around for years. Cleaning it out is one of the most noticeable changes new-home owners make." },
      { question: "Can you clean two furnaces in one visit?", answer: "Yes. Add Furnace Cleaning in the booking form, set the quantity, and both units are done in the same appointment." },
    ],
  },
  {
    slug: "vaughan",
    name: "Vaughan",
    areaSlug: "ontario",
    neighbourhoods: ["Woodbridge", "Maple", "Kleinburg", "Thornhill", "Concord", "Vellore Village", "Patterson"],
    intro:
      "Airlyf cleans ducts and furnaces across Vaughan, with regular bookings in Woodbridge, Maple, Kleinburg, Thornhill and Concord.",
    climate:
      "Vaughan sees the same long heating seasons and sticky summers as the rest of the GTA. Bigger homes move a lot more air, so whatever's sitting in the ducts gets spread through a lot more rooms.",
    homes:
      "Vaughan is known for large detached homes, and big houses are more likely to have two furnaces, zoned systems, long duct runs and extra returns. Newer communities like Vellore Village and Patterson also carry construction dust in the ducts.",
    costFactors: [
      { title: "Multiple furnaces or zones", text: "Furnace cleaning is a set price per unit, so you'll know the total for two or three furnaces before we arrive." },
      { title: "Large floor plans", text: "Big homes have more ductwork, but our Basic Duct Cleaning covers every vent rather than charging vent by vent." },
      { title: "HRVs", text: "Many newer, tighter homes have an HRV. Cleaning it in the same visit keeps fresh air flowing properly." },
    ],
    faqs: [
      { question: "Do you come to Kleinburg and Woodbridge?", answer: "Yes — all of Vaughan, including Kleinburg, Woodbridge, Maple, Thornhill and Concord." },
      { question: "Should I add HRV cleaning?", answer: "If you have one, it's a good idea. A dusty HRV core and filters cut down the fresh air it brings in. Add it in the booking form." },
    ],
  },
  {
    slug: "markham",
    name: "Markham",
    areaSlug: "ontario",
    neighbourhoods: ["Unionville", "Markham Village", "Cornell", "Berczy Village", "Cathedraltown", "Milliken", "Box Grove"],
    intro:
      "Airlyf works throughout Markham — heritage homes near Main Street Unionville and Markham Village as well as newer streets in Cornell, Cathedraltown and Box Grove.",
    climate:
      "Cold winters and warm, humid summers keep Markham's furnaces and air conditioners busy. Spring and fall pollen gets pulled into the returns and keeps circulating long after the season ends.",
    homes:
      "Markham combines older heritage houses with large modern family homes. The older ones may have ductwork that's never been cleaned; the newer ones often still hold construction dust and have HRVs that need attention.",
    costFactors: [
      { title: "Older vs. newer homes", text: "Older homes may need Brush Cleaning for years of buildup; newer homes mostly need a thorough first clean to clear construction dust." },
      { title: "Allergies at home", text: "For allergy sufferers, a full duct cleaning plus AC coil cleaning targets the spots where pollen and dust collect most." },
      { title: "Second furnace", text: "Larger homes with two furnaces can add both in the booking form so the whole system is done." },
    ],
    faqs: [
      { question: "Will duct cleaning help with allergies?", answer: "Removing dust, pollen and pet dander from the ducts means less of it gets blown back into your rooms. Most families notice the biggest difference when they also keep up with filter changes." },
      { question: "Do you work in Unionville?", answer: "Yes — Unionville, Markham Village, Cornell, Berczy Village and the rest of Markham." },
    ],
  },

  {
    slug: "hamilton",
    name: "Hamilton",
    areaSlug: "ontario",
    neighbourhoods: ["Westdale", "Ancaster", "Dundas", "Stoney Creek", "Hamilton Mountain", "Waterdown", "Kirkendall", "Binbrook"],
    intro:
      "Airlyf cleans ducts, furnaces and dryer vents across Hamilton — the lower city, the Mountain, and out to Ancaster, Dundas, Stoney Creek and Waterdown.",
    climate:
      "Wedged between the lake and the escarpment, Hamilton gets cold winters and muggy summers. Busy roads and the industrial waterfront also mean more fine dust making its way inside.",
    homes:
      "Lower-city neighbourhoods are full of older brick homes with original ductwork, while Binbrook, Waterdown and upper Stoney Creek have plenty of new construction. Older systems carry decades of buildup; newer ones carry builder's dust.",
    costFactors: [
      { title: "Original ductwork", text: "Brick homes in the lower city often have ducts that are decades old. Brush Cleaning lifts the dust that suction alone can't." },
      { title: "Outdoor dust", text: "Homes near major roads or the waterfront collect more fine dust, so regular cleanings and filter changes pay off more." },
      { title: "Long dryer vents", text: "Older homes often have long dryer vent runs that clog quickly. Adding it to your visit is inexpensive and reduces fire risk." },
    ],
    faqs: [
      { question: "Do you cover the Mountain and Stoney Creek?", answer: "Yes — the whole Hamilton area, including the Mountain, Stoney Creek, Ancaster, Dundas and Waterdown." },
      { question: "How can I tell if my older home needs a cleaning?", answer: "Dust puffing out of the vents, dust that comes back days after you clean, a musty smell on start-up, or rooms with weak airflow are all good signs." },
    ],
  },
  {
    slug: "ottawa",
    name: "Ottawa",
    areaSlug: "ontario",
    neighbourhoods: ["Kanata", "Orléans", "Barrhaven", "Nepean", "The Glebe", "Westboro", "Stittsville", "Alta Vista"],
    intro:
      "Airlyf provides duct and furnace cleaning in Ottawa's suburbs — Kanata, Orléans, Barrhaven, Nepean and Stittsville — and in central neighbourhoods like the Glebe and Westboro.",
    climate:
      "Ottawa winters are longer and colder than in most of southern Ontario, so furnaces here put in serious hours. Humid summers follow right behind, and the ducts rarely get a break.",
    homes:
      "Ottawa's suburbs are full of homes built from the 1980s onward, plus fast-growing new developments. Long heating seasons mean dust in the ducts is in circulation for most of the year.",
    costFactors: [
      { title: "Hours of furnace runtime", text: "The more the furnace runs, the more dust the blower and ducts pick up. Duct cleaning and furnace cleaning together make sense here." },
      { title: "HRVs in newer homes", text: "Energy-efficient homes rely on an HRV for fresh air. Add HRV cleaning so it keeps doing its job through the winter." },
      { title: "Number of furnaces", text: "Most homes have one. If yours has two, set the quantity in the booking form." },
    ],
    faqs: [
      { question: "When's the best time to book in Ottawa?", answer: "Late summer and early fall are popular so the system goes into winter clean. Spring is also good for clearing out a winter's worth of dust before AC season." },
      { question: "Do you go to Kanata and Orléans?", answer: "Yes — Kanata, Orléans, Barrhaven, Nepean, Stittsville and central Ottawa." },
    ],
  },

  /* ---------------- Alberta ---------------- */
  {
    slug: "calgary",
    name: "Calgary",
    areaSlug: "alberta",
    neighbourhoods: ["Beltline", "Bridgeland", "Inglewood", "Tuscany", "Signal Hill", "Mahogany", "Evanston", "Lake Bonavista"],
    intro:
      "Airlyf cleans ducts and furnaces across Calgary — inner-city communities like Bridgeland and Inglewood, and suburbs such as Tuscany, Mahogany, Evanston and Lake Bonavista.",
    climate:
      "Calgary's air is dry and its heating season is long, with chinooks flipping the furnace on and off through the winter. Dry dust settles easily in the ducts, and smoky summers leave fine residue behind.",
    homes:
      "The city keeps expanding, so many Calgarians live in newer homes that still carry construction dust in the ductwork. Older inner-city houses often have original systems that have rarely, if ever, been cleaned.",
    costFactors: [
      { title: "Dry, dusty air", text: "Low humidity keeps dust airborne until it lands in your ducts. Homes with pets see it build up fastest." },
      { title: "Wildfire smoke", text: "After a smoky summer, a duct cleaning and a new filter help clear the fine particles pulled into the system." },
      { title: "New communities", text: "Homes in newer areas like Mahogany and Evanston often haven't been cleaned since construction — the first cleaning is the one you'll notice most." },
    ],
    faqs: [
      { question: "Is it worth cleaning ducts after wildfire smoke?", answer: "It helps. Smoke particles settle in filters and on duct walls. A cleaning plus a fresh filter removes what the system has pulled in." },
      { question: "Do you cover every Calgary community?", answer: "Yes. Choose Alberta in the booking form to see your prices, and we call to set an arrival window." },
    ],
  },
  {
    slug: "edmonton",
    name: "Edmonton",
    areaSlug: "alberta",
    neighbourhoods: ["Old Strathcona", "Glenora", "Windermere", "Summerside", "Terwillegar", "Westmount", "Mill Woods", "The Hamptons"],
    intro:
      "Airlyf cleans ducts, furnaces and dryer vents for Edmonton homes in Old Strathcona, Westmount, Mill Woods, Terwillegar, Windermere, Summerside and beyond.",
    climate:
      "Edmonton's winters are among the longest and coldest of any big Canadian city, which means many months of furnace runtime. Every hour the blower runs, it pushes whatever is in the ducts back into your home.",
    homes:
      "Mature neighbourhoods such as Glenora and Westmount have older homes with original ductwork. The newer southwest and southeast suburbs are full of homes with HRVs — and construction dust in the system.",
    costFactors: [
      { title: "Furnace hours", text: "With so much heating, a clean blower and clean ducts go together. Add furnace cleaning to the same visit." },
      { title: "Mature-neighbourhood ductwork", text: "Original ducts that have never been cleaned usually need Brush Cleaning to get the stuck-on layer." },
      { title: "HRVs", text: "Many newer Edmonton homes have an HRV. Cleaning it keeps your fresh-air supply working through the winter." },
    ],
    faqs: [
      { question: "How often should Edmonton ducts be cleaned?", answer: "Given how long furnaces run here, every two to three years is common — sooner with pets, allergies or recent renovations." },
      { question: "Can you clean the furnace too?", answer: "Yes. Every duct cleaning includes a free furnace inspection, and you can add a full furnace cleaning for each unit." },
    ],
  },

  /* ---------------- Quebec ---------------- */
  {
    slug: "montreal",
    name: "Montreal",
    areaSlug: "quebec",
    neighbourhoods: ["Plateau-Mont-Royal", "Rosemont", "Verdun", "Notre-Dame-de-Grâce", "Outremont", "Saint-Laurent", "Ahuntsic", "Villeray"],
    nearby: [
      "Laval", "Terrebonne", "Repentigny", "Mascouche", "Blainville", "Boisbriand", "Sainte-Thérèse", "Saint-Eustache",
      "Longueuil", "Brossard", "Boucherville", "Saint-Bruno-de-Montarville", "La Prairie", "Candiac", "Châteauguay",
      "Varennes", "Sainte-Julie", "Saint-Jean-sur-Richelieu",
      "Dorval", "Pointe-Claire", "Kirkland", "Dollard-des-Ormeaux", "Vaudreuil-Dorion",
    ],
    intro:
      "Airlyf offers duct, furnace, dryer vent and HRV cleaning across Montreal — the Plateau, Rosemont, Verdun, NDG, Saint-Laurent, Ahuntsic and the surrounding suburbs.",
    climate:
      "Montreal swings from snowy, bitter winters to hot, humid summers. Humidity inside dusty ductwork is a common cause of musty smells, so a clean system matters in July as much as in January.",
    homes:
      "Many of Montreal's classic plexes are heated with electric baseboards and have no ducts at all. Homes with forced-air heating, central air, a ducted heat pump or an HRV do benefit from cleaning — and nearly every home has a dryer vent worth clearing.",
    costFactors: [
      { title: "Your type of system", text: "Not every Montreal home has ductwork. Tell us your heating and cooling setup and we'll only quote what applies — sometimes that's just the dryer vent or HRV." },
      { title: "Heat pumps and central air", text: "Ducted heat pumps and central AC move air year-round. Add AC coil cleaning to keep cooling efficient." },
      { title: "Dryer vents in older buildings", text: "Long, twisting vent runs in older buildings clog fast. It's an inexpensive add-on that lowers fire risk." },
    ],
    faqs: [
      { question: "My plex has baseboard heaters — do I need duct cleaning?", answer: "If there's no ductwork, no. You may still want the dryer vent or HRV cleaned. Message us and we'll tell you straight what's worth doing." },
      { question: "Do you cover all Montreal boroughs?", answer: "Yes, along with Laval, the North and South Shores and the West Island. Choose Quebec in the booking form to see your prices." },
    ],
  },
  {
    slug: "quebec-city",
    name: "Quebec City",
    areaSlug: "quebec",
    neighbourhoods: ["Sainte-Foy", "Limoilou", "Charlesbourg", "Beauport", "Montcalm", "Sillery", "Saint-Roch", "Lebourgneuf"],
    intro:
      "Airlyf cleans ducts, furnaces and HRVs in Quebec City — Sainte-Foy, Sillery, Limoilou, Charlesbourg, Beauport, Montcalm and nearby.",
    climate:
      "Quebec City winters are long and snowy, and homes stay sealed up for months. With the windows shut, the same air circulates over and over — along with whatever is sitting in the ducts.",
    homes:
      "Newer homes in the region are built tight and depend on an HRV for fresh air, so a clogged core or filter quietly reduces ventilation all winter. Older homes in Limoilou and Montcalm often have a mix of heating systems.",
    costFactors: [
      { title: "HRV upkeep", text: "If you have an HRV, cleaning it is one of the most useful things you can do for winter air." },
      { title: "Heating type", text: "Forced-air and ducted heat-pump homes benefit most from duct cleaning. Let us know your system and we'll recommend only what fits." },
      { title: "Sealed-up winters", text: "Months of recirculated air means more dust settles inside. Cleaning before the cold sets in keeps things fresher until spring." },
    ],
    faqs: [
      { question: "Why does HRV cleaning matter here?", answer: "Tight homes rely on the HRV to swap stale, humid air for fresh air. Dirty cores and filters slow that down; cleaning brings it back." },
      { question: "Do you serve Sainte-Foy and Charlesbourg?", answer: "Yes — Quebec City and its surrounding communities. Choose Quebec in the booking form to see your prices." },
    ],
  },
  {
    slug: "laval",
    name: "Laval",
    areaSlug: "quebec",
    neighbourhoods: ["Chomedey", "Sainte-Dorothée", "Vimont", "Fabreville", "Duvernay", "Sainte-Rose", "Laval-des-Rapides", "Auteuil"],
    intro:
      "Airlyf cleans ducts, furnaces, dryer vents and HRVs across Laval, including Chomedey, Sainte-Dorothée, Vimont, Fabreville, Duvernay and Sainte-Rose.",
    climate:
      "Laval shares Montreal's weather — cold winters, humid summers — and most homes switch between heating and cooling over the year. Clean ducts help keep humid months from turning into musty ones.",
    homes:
      "Laval is mostly suburban, with plenty of detached and semi-detached family homes. Compared with older city plexes, many more have forced-air heating, central air or ducted heat pumps — which makes duct cleaning a natural fit.",
    costFactors: [
      { title: "Ducted systems", text: "Suburban forced-air and heat-pump homes move air all year, so dust builds up steadily. Our basic cleaning covers every vent." },
      { title: "Central AC", text: "If you cool with central air, adding AC coil cleaning helps the system keep up on hot days." },
      { title: "Kids and pets", text: "Busy family homes collect more hair and dust in the ducts — a good reason to stay on a regular schedule." },
    ],
    faqs: [
      { question: "Do you clean heat-pump ductwork?", answer: "Yes. Ducted heat pumps get the same treatment as a furnace system — every duct and vent." },
      { question: "Which parts of Laval do you cover?", answer: "All of it, including Chomedey, Sainte-Dorothée, Vimont, Fabreville, Duvernay and Sainte-Rose." },
    ],
  },

  /* ---------------- British Columbia ---------------- */
  {
    slug: "vancouver",
    name: "Vancouver",
    areaSlug: "british-columbia",
    neighbourhoods: ["Kitsilano", "Mount Pleasant", "Kerrisdale", "Dunbar", "Hastings-Sunrise", "Killarney", "Marpole", "Grandview-Woodland"],
    intro:
      "Airlyf cleans ducts, furnaces, dryer vents and HRVs across Vancouver — Kitsilano, Mount Pleasant, Kerrisdale, Dunbar, Hastings-Sunrise and more.",
    climate:
      "Vancouver's mild, wet weather keeps indoor humidity up for much of the year. Damp air and dust inside the ducts are a recipe for musty odours, and smoky summers leave fine particles in the system too.",
    homes:
      "The city mixes older character houses, homes with basement suites, and newer builds with heat pumps and HRVs. Homes with a suite may have a second furnace or separate ventilation to clean.",
    costFactors: [
      { title: "Damp, musty ducts", text: "Moisture plus dust is what makes ducts smell. A thorough cleaning — and a clean HRV — keeps the air fresh." },
      { title: "Basement suites", text: "If the suite has its own furnace, set the furnace quantity in the booking form so both systems are covered." },
      { title: "Smoke seasons", text: "Fine smoke particles settle in filters and ducts. A cleaning and fresh filter help clear them." },
    ],
    faqs: [
      { question: "Do you clean HRVs in Vancouver?", answer: "Yes. Add HRV cleaning in the booking form and it's done during the same visit." },
      { question: "Can you clean a house with a suite?", answer: "Yes. If the suite has its own furnace, choose the right number of furnaces and we'll clean both systems." },
    ],
  },
  {
    slug: "surrey",
    name: "Surrey",
    areaSlug: "british-columbia",
    neighbourhoods: ["Fleetwood", "Guildford", "Newton", "Cloverdale", "South Surrey", "Whalley", "Panorama Ridge"],
    intro:
      "Airlyf cleans ducts, furnaces and dryer vents throughout Surrey — Fleetwood, Guildford, Newton, Cloverdale, Panorama Ridge and South Surrey.",
    climate:
      "Surrey's mild, damp climate keeps humidity up indoors, and dust plus moisture in the ducts can leave air smelling stale. Wildfire smoke drifts into the Fraser Valley in some summers as well.",
    homes:
      "Surrey is one of the fastest-growing cities in Canada, with lots of new and large family homes — many with suites and more than one furnace. New construction also leaves dust behind in the ducts.",
    costFactors: [
      { title: "Two or three furnaces", text: "Big homes with suites often run multiple furnaces. Each one is priced individually, so there are no surprises." },
      { title: "Construction dust", text: "Newer homes often still have builder's dust in the system. The first cleaning clears it out." },
      { title: "Large households", text: "Multi-generational homes make more lint and dust — dryer vent cleaning is a smart add-on." },
    ],
    faqs: [
      { question: "We have three furnaces — can you clean them all?", answer: "Yes. Add Furnace Cleaning in the booking form, set it to 3, and every unit is cleaned in one appointment." },
      { question: "Do you cover South Surrey and Cloverdale?", answer: "Yes — all of Surrey, including South Surrey, Cloverdale, Fleetwood, Guildford and Newton." },
    ],
  },

  /* ---------------- Manitoba ---------------- */
  {
    slug: "winnipeg",
    name: "Winnipeg",
    areaSlug: "manitoba",
    neighbourhoods: ["Osborne Village", "Wolseley", "River Heights", "St. Vital", "Transcona", "Charleswood", "St. James", "Bridgwater"],
    intro:
      "Airlyf cleans ducts, furnaces and dryer vents across Winnipeg — Wolseley, River Heights, Osborne Village, St. Vital, Transcona, Charleswood and newer areas like Bridgwater.",
    climate:
      "Winnipeg winters rank among the coldest of any major Canadian city, so furnaces run hard for months with every window shut. Summers bring humidity, pollen and plenty of AC use.",
    homes:
      "Character neighbourhoods like Wolseley and River Heights are full of older homes whose ducts may never have been cleaned. Newer suburbs have tight homes with HRVs and construction dust.",
    costFactors: [
      { title: "Character homes", text: "Decades of buildup in older ductwork usually calls for Brush Cleaning." },
      { title: "Hard winters", text: "Heavy furnace use keeps dust moving. Cleaning before winter keeps the air fresher until spring." },
      { title: "HRVs", text: "If your home has one, add HRV cleaning so ventilation keeps working through the closed-up months." },
    ],
    faqs: [
      { question: "When should I book in Winnipeg?", answer: "Late summer and fall are busiest so the system is clean before the cold, but any time of year makes a difference." },
      { question: "Do you cover all of Winnipeg?", answer: "Yes. Choose Manitoba in the booking form to see your prices, and we call to set an arrival window between 8 am and 6 pm." },
    ],
  },

  /* ---------------- Saskatchewan ---------------- */
  {
    slug: "saskatoon",
    name: "Saskatoon",
    areaSlug: "saskatchewan",
    neighbourhoods: ["Nutana", "City Park", "Willowgrove", "Stonebridge", "Evergreen", "Lakewood", "Brighton", "Rosewood"],
    intro:
      "Airlyf cleans ducts and furnaces in Saskatoon — from Nutana and City Park to newer areas like Stonebridge, Evergreen, Brighton and Rosewood.",
    climate:
      "Long, very cold winters and dry air mean Saskatoon furnaces run for months and fine dust settles easily in the ducts. Warm summers add pollen and AC use.",
    homes:
      "Mature neighbourhoods along the river have older homes with original ducts. The city's many newer suburbs have tight homes, HRVs and leftover construction dust.",
    costFactors: [
      { title: "Prairie dust", text: "Dry air carries a lot of fine dust. Cleaning removes what has settled in the supply lines and returns." },
      { title: "Newer suburbs", text: "Homes in Brighton, Rosewood and similar areas often hold construction dust — a first cleaning helps most." },
      { title: "Furnace runtime", text: "A dusty blower works harder over a long winter. Add furnace cleaning — and remember every duct cleaning includes a free furnace inspection." },
    ],
    faqs: [
      { question: "Does dry air make ducts dustier?", answer: "Dry air keeps fine dust floating, and much of it ends up in your filters and ducts. Regular filter changes and periodic cleanings keep it in check." },
      { question: "Do you cover all of Saskatoon?", answer: "Yes. Choose Saskatchewan in the booking form to see your prices." },
    ],
  },
  {
    slug: "regina",
    name: "Regina",
    areaSlug: "saskatchewan",
    neighbourhoods: ["Cathedral", "Lakeview", "The Crescents", "Harbour Landing", "Whitmore Park", "Hillsdale", "Glencairn", "Normanview"],
    intro:
      "Airlyf cleans ducts, furnaces and dryer vents for Regina homes in Cathedral, Lakeview, the Crescents, Harbour Landing, Whitmore Park and more.",
    climate:
      "Regina is windy and dry, with cold winters and warm summers. Wind-driven prairie dust finds its way inside, and a long heating season keeps it moving through the ducts.",
    homes:
      "Cathedral and the Crescents have character homes with original ductwork, while Harbour Landing and other newer neighbourhoods are full of modern, tight homes — many with HRVs.",
    costFactors: [
      { title: "Wind-blown dust", text: "Windy days push more dust indoors, where it settles in the system. Regular cleaning stops it recirculating." },
      { title: "Older homes", text: "Original ducts in older houses often need Brush Cleaning to remove stuck-on buildup." },
      { title: "HRVs", text: "If you have an HRV, adding its cleaning keeps fresh air moving properly." },
    ],
    faqs: [
      { question: "Do you come to Harbour Landing?", answer: "Yes — all of Regina, including Harbour Landing, Cathedral, Lakeview and Whitmore Park." },
      { question: "What's included in Basic Duct Cleaning?", answer: "Every supply and return vent in the home, cleaned under negative air pressure with rotary tools — plus a free furnace inspection." },
    ],
  },

  /* ---------------- Maritimes ---------------- */
  {
    slug: "halifax",
    name: "Halifax",
    areaSlug: "maritime-provinces",
    neighbourhoods: ["South End", "North End", "Clayton Park", "Bedford", "Dartmouth", "Fairview", "Spryfield", "Cole Harbour"],
    intro:
      "Airlyf cleans ducts, HRVs and dryer vents in Halifax — the South End, North End, Clayton Park, Bedford, Dartmouth, Cole Harbour and nearby.",
    climate:
      "Halifax's coastal weather is damp and foggy much of the year. High humidity plus dust in the ductwork is a classic source of musty smells, so clean ventilation really matters here.",
    homes:
      "Halifax homes use everything from forced-air furnaces to heat pumps and other systems. Many newer houses rely on an HRV, and older homes on the peninsula may have ductwork that hasn't been touched in years.",
    costFactors: [
      { title: "Type of heating", text: "Forced-air and ducted heat-pump homes benefit most. Tell us your system and we'll only suggest what applies." },
      { title: "Humidity and HRVs", text: "In a damp climate, a clean HRV helps push stale, humid air out. It's one of the most useful add-ons here." },
      { title: "Dryer vents", text: "Damp lint clogs vents quickly. Dryer vent cleaning is inexpensive and cuts fire risk." },
    ],
    faqs: [
      { question: "Do you clean ducted heat pumps?", answer: "Yes. If your heat pump is ducted, we clean the ducts and vents just like a furnace system." },
      { question: "Do you cover Dartmouth and Bedford?", answer: "Yes — Halifax, Dartmouth, Bedford and the surrounding area. Choose Maritime Provinces in the booking form to see your prices." },
    ],
  },
];

/* ---------------- Helpers ---------------- */

export function getCity(slug: string) {
  return cities.find((c) => c.slug === slug);
}

// The area page a city belongs to (name, URL) and its province (prices).
export function cityArea(city: City): { name: string; slug: string; province: Province } {
  const page = provincePages.find((p) => p.slug === city.areaSlug)!;
  const province = provinces.find((p) => p.code === page.code)!;
  return { name: page.name, slug: page.slug, province };
}

export const cityUrl = (c: City) => `/${c.areaSlug}/${c.slug}/`;
export const costUrl = (c: City) => `/duct-cleaning-cost/${c.slug}/`;

export function citiesIn(areaSlug: string) {
  return cities.filter((c) => c.areaSlug === areaSlug);
}
