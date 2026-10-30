// Province landing pages (/ontario/, /alberta/, …). Each page gets its own
// SEO title/description and copy written for Airlyf.

export type ProvinceSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  closing?: string; // paragraph shown after the bullet list
};

export type ProvincePage = {
  slug: string; // e.g. "british-columbia" → /british-columbia/
  code: string; // must match provinces in site config (pricing)
  name: string;
  metaTitle: string;
  metaDescription: string;
  heroImage: string;
  sideImage: string;
  sections: ProvinceSection[];
  cities: string[];
};

export const provincePages: ProvincePage[] = [
  {
    slug: "ontario",
    code: "ON",
    name: "Ontario",
    metaTitle: "Duct Cleaning Ontario | Toronto, GTA & Beyond | Airlyf",
    metaDescription:
      "Air duct, furnace and dryer vent cleaning across Ontario — Toronto, the GTA, Hamilton, Ottawa and more. Flat prices and a free furnace inspection. Get a quote.",
    heroImage: "/images/photos/ontario.webp",
    sideImage: "/images/photos/tech-duct-system.webp",
    sections: [
      {
        heading: "Duct Cleaning Across Ontario",
        paragraphs: [
          "Ontario homes run the furnace for half the year and the AC for much of the rest, so the ductwork rarely gets a break. Airlyf crews clean the full system — trunks, branch lines, every register and return — and check the furnace while we're there.",
          "We work in detached houses, semis, townhomes, condos with ducted systems and small commercial units. You'll know the price before we start, and it won't change once the hoses are out.",
        ],
      },
      {
        heading: "What Ontario Ducts Collect",
        paragraphs: [
          "Basement renovations, new-build drywall dust, pets and the spring pollen season all end up in the return ducts. Once it's in there, the blower keeps sending it back through the house until someone takes it out.",
        ],
      },
      {
        heading: "Toronto, the GTA and the Golden Horseshoe",
        paragraphs: [
          "The GTA is our busiest area. We book daily in Toronto, Mississauga, Brampton, Vaughan, Markham, Richmond Hill and Oakville, and regularly in Hamilton, Ottawa, London, Kitchener and Windsor.",
          "Older homes in the city often have ductwork that's never been touched, while new subdivisions are full of construction dust from the day the keys are handed over. Both benefit from a proper clean.",
        ],
        bullets: [
          "Less dust settling on floors and furniture",
          "Better airflow to rooms far from the furnace",
          "A furnace that doesn't strain through the winter",
          "Free furnace inspection with every booking",
        ],
        closing: "Book online in a couple of minutes, or send us a WhatsApp message for a quote.",
      },
    ],
    cities: [
      // Ordered by population (Statistics Canada, 2021 Census)
      "Toronto", "Ottawa", "Mississauga", "Brampton", "Hamilton", "London",
      "Markham", "Vaughan", "Kitchener", "Windsor", "Oakville", "Richmond Hill",
      "Burlington", "Oshawa", "Greater Sudbury", "Barrie", "Guelph", "Cambridge",
      "Whitby", "St. Catharines", "Milton", "Kingston", "Ajax", "Waterloo",
      "Thunder Bay", "Brantford", "Clarington", "Pickering", "Niagara Falls", "Newmarket",
      "Peterborough", "Caledon", "Sault Ste. Marie", "Sarnia", "Halton Hills", "Aurora",
      "Welland", "Belleville", "North Bay", "Whitchurch-Stouffville", "Cornwall",
    ],
  },
  {
    slug: "alberta",
    code: "AB",
    name: "Alberta",
    metaTitle: "Duct Cleaning Alberta | Calgary & Edmonton | Airlyf",
    metaDescription:
      "Air duct and furnace cleaning in Calgary, Edmonton, Red Deer and across Alberta. Every vent cleaned, free furnace inspection, price confirmed up front.",
    heroImage: "/images/photos/alberta.webp",
    sideImage: "/images/photos/duct-hose.webp",
    sections: [
      {
        heading: "Duct Cleaning for Alberta Homes",
        paragraphs: [
          "Alberta furnaces work hard — long, cold winters and quick temperature swings mean the blower is moving air for months on end. Airlyf cleans the entire duct system so that air isn't carrying years of dust along with it.",
          "We serve Calgary and Edmonton every week and travel to Red Deer, Lethbridge, Airdrie, St. Albert, Medicine Hat and the surrounding towns. Houses, townhomes, acreages with forced air and small commercial spaces are all on our list.",
        ],
      },
      {
        heading: "Dry Air, Dust and Busy Furnaces",
        paragraphs: [
          "Low humidity lets fine dust stay airborne longer, and new communities on the edges of Calgary and Edmonton add construction dust for years after move-in. Wildfire smoke seasons leave their own fine residue in the system.",
          "Our crews put the ducts under negative pressure, brush the branch lines and clean every register, then check that air is moving properly before we leave.",
        ],
      },
      {
        heading: "Why Albertans Book Airlyf",
        paragraphs: [],
        bullets: [
          "Published prices — no surprise add-ons on the day",
          "Free furnace inspection with every visit",
          "Crews that protect floors and clean up after themselves",
          "Morning, afternoon or evening arrival windows",
        ],
      },
    ],
    cities: [
      // Ordered by population (Statistics Canada, 2021 Census)
      "Calgary", "Edmonton", "Red Deer", "Lethbridge", "Airdrie", "Sherwood Park",
      "Fort McMurray", "St. Albert", "Grande Prairie", "Medicine Hat", "Spruce Grove", "Leduc",
      "Cochrane", "Okotoks", "Fort Saskatchewan", "Chestermere", "Beaumont", "Lloydminster",
      "Camrose", "Stony Plain", "Sylvan Lake", "Canmore", "Cold Lake", "Brooks",
      "Strathmore", "High River", "Lacombe", "Wetaskiwin",
    ],
  },
  {
    slug: "quebec",
    code: "QC",
    name: "Quebec",
    metaTitle: "Duct Cleaning Quebec | Montreal, Laval & Quebec City | Airlyf",
    metaDescription:
      "Air duct, furnace and HRV cleaning in Montreal, Laval, the North and South Shores and Quebec City. Clear pricing and a free furnace inspection.",
    heroImage: "/images/photos/quebec.webp",
    sideImage: "/images/photos/tech-ceiling-vent.webp",
    sections: [
      {
        heading: "Duct and HRV Cleaning in Quebec",
        paragraphs: [
          "From Montreal plexes to new builds on the South Shore, Quebec homes have a wide mix of heating and ventilation. Airlyf cleans forced-air duct systems and HRVs, and checks the furnace on every visit.",
          "We cover Montreal, Laval and Longueuil, the North Shore (Terrebonne, Blainville, Saint-Eustache), the South Shore (Brossard, Boucherville, Châteauguay), the West Island, and Quebec City, Gatineau and Sherbrooke.",
          "Our crews protect your floors, work room by room, and leave the vents cleaner than they've been in years.",
        ],
      },
      {
        heading: "Built for Quebec Winters and Humid Summers",
        paragraphs: [
          "Tight, energy-efficient homes rely on the ventilation system to swap stale air for fresh. When ducts and HRV cores are dusty, that exchange slows down and rooms feel stuffy. Humid summers add moisture to the mix.",
          "An Airlyf visit helps you:",
        ],
        bullets: [
          "Restore airflow to rooms that never feel warm enough",
          "Cut down on dust and odours from the vents",
          "Keep the HRV exchanging air the way it was designed to",
          "Take some strain off the furnace and AC",
        ],
        closing:
          "Furnace cleaning, dryer vent, HRV and AC cleaning can all be added to the same appointment in the booking form.",
      },
    ],
    cities: [
      // Ordered by population (Statistics Canada, 2021 Census)
      "Montreal", "Quebec City", "Laval", "Gatineau", "Longueuil", "Sherbrooke",
      "Lévis", "Saguenay", "Trois-Rivières", "Terrebonne", "Saint-Jean-sur-Richelieu", "Brossard",
      "Repentigny", "Saint-Jérôme", "Drummondville", "Granby", "Mirabel", "Blainville",
      "Saint-Hyacinthe", "Mascouche", "Châteauguay", "Dollard-des-Ormeaux", "Saint-Eustache", "Vaudreuil-Dorion",
      "Boucherville", "Pointe-Claire", "Sainte-Julie", "Boisbriand", "Saint-Bruno-de-Montarville", "La Prairie",
      "Sainte-Thérèse", "Candiac", "Varennes", "Kirkland", "Dorval",
    ],
  },
  {
    slug: "british-columbia",
    code: "BC",
    name: "British Columbia",
    metaTitle: "Duct Cleaning BC | Vancouver, Surrey & Okanagan | Airlyf",
    metaDescription:
      "Air duct, furnace and dryer vent cleaning in Vancouver, Surrey, Burnaby, the Fraser Valley, Kelowna and Kamloops. Price confirmed before we start.",
    heroImage: "/images/photos/british-columbia.webp",
    sideImage: "/images/photos/duct-inside.webp",
    sections: [
      {
        heading: "Duct Cleaning Across British Columbia",
        paragraphs: [
          "BC homes deal with two very different climates: damp, mild air on the coast and hot, dry summers in the Interior. Both leave their mark inside the ductwork. Airlyf cleans the whole system and checks the furnace on every visit.",
          "We book across Metro Vancouver — Vancouver, Surrey, Richmond, Burnaby and Coquitlam — out to Langley, Abbotsford and Chilliwack, and in the Okanagan and Thompson regions including Kelowna and Kamloops.",
          "Every job uses a negative-air vacuum, rotary tools in the branch lines and a final check of airflow at the registers.",
        ],
      },
      {
        heading: "Coastal Damp, Interior Dust, Wildfire Smoke",
        paragraphs: [
          "On the coast, moisture can help dust cling to duct walls. In the Interior, summer wildfire smoke and dry dust work their way into return ducts. Many BC homes now pair a furnace with a heat pump that runs year-round, so the ducts are moving air in every season.",
          "Booking a cleaning helps you:",
        ],
        bullets: [
          "Clear smoke residue and fine dust from the system",
          "Get better airflow from heat pumps and furnaces",
          "Reduce musty smells from damp ductwork",
          "Spend less time dusting between cleanings",
        ],
        closing:
          "Add heat pump, dryer vent or HRV cleaning to the same visit when you book online.",
      },
    ],
    cities: [
      // Ordered by population (Statistics Canada, 2021 Census)
      "Vancouver", "Surrey", "Burnaby", "Richmond", "Abbotsford", "Coquitlam",
      "Kelowna", "Langley Township", "Saanich", "Delta", "Nanaimo", "Kamloops",
      "Chilliwack", "Victoria", "Maple Ridge", "North Vancouver", "New Westminster", "Prince George",
      "Port Coquitlam", "Vernon", "West Vancouver", "Mission", "Penticton", "Campbell River",
      "Port Moody",
    ],
  },
  {
    slug: "manitoba",
    code: "MB",
    name: "Manitoba",
    metaTitle: "Duct Cleaning Manitoba | Winnipeg & Brandon | Airlyf",
    metaDescription:
      "Air duct and furnace cleaning in Winnipeg, Brandon, Steinbach and across Manitoba. Every vent cleaned and a free furnace inspection with every visit.",
    heroImage: "/images/photos/manitoba.webp",
    sideImage: "/images/photos/tech-attic.webp",
    sections: [
      {
        heading: "Duct Cleaning in Manitoba",
        paragraphs: [
          "Few places ask more of a furnace than a Manitoba January. When the system runs that hard, everything in the ducts gets recirculated again and again. Airlyf clears it out so the air your furnace moves is clean.",
          "We clean character homes in Winnipeg's older neighbourhoods, newer houses in the suburbs, and homes in Brandon, Steinbach, Portage la Prairie and Selkirk.",
          "Every visit includes a free look at the furnace, and we'll let you know if anything needs a repair technician.",
        ],
      },
      {
        heading: "Long Winters, Closed Windows",
        paragraphs: [
          "With windows shut for months, the duct system is the main way air moves around the house. Dust, pet hair and cooking residue build up faster, and rooms at the end of long duct runs can start to feel cold.",
          "Our crews clean the main trunks and every branch line and register, then confirm airflow at the vents before we finish. You'll know your price before we start.",
          "Pair it with furnace cleaning or a filter change to head into winter with the whole system in good shape.",
        ],
      },
    ],
    cities: [
      // Ordered by population (Statistics Canada, 2021 Census)
      "Winnipeg", "Brandon", "Steinbach", "Winkler", "Portage la Prairie", "Thompson",
      "Selkirk", "Morden", "Dauphin",
    ],
  },
  {
    slug: "saskatchewan",
    code: "SK",
    name: "Saskatchewan",
    metaTitle: "Duct Cleaning Saskatchewan | Saskatoon & Regina | Airlyf",
    metaDescription:
      "Air duct and furnace cleaning in Saskatoon, Regina, Prince Albert and Moose Jaw. Clear prices, careful crews and a free furnace inspection.",
    heroImage: "/images/photos/saskatchewan.webp",
    sideImage: "/images/photos/tech-ladder.webp",
    sections: [
      {
        heading: "Duct Cleaning for Saskatchewan Homes",
        paragraphs: [
          "Prairie wind carries fine dust into every home, and a long heating season means the furnace keeps that dust moving. Airlyf cleans the full duct system — supply, return and every register — to break the cycle.",
          "We serve Saskatoon and Regina regularly and travel to Prince Albert and Moose Jaw. Older bungalows and brand-new builds both get the same careful, room-by-room approach.",
          "You'll get the price before we start, and the crew will protect floors and tidy up when they're done.",
        ],
      },
      {
        heading: "Cleaner Ducts, Easier Heating",
        paragraphs: [
          "When ducts and the blower are coated in dust, the furnace has to run longer to keep the house warm. Cleaning the system takes that load off.",
          "An Airlyf visit helps you:",
        ],
        bullets: [
          "Cut down on prairie dust coming out of the vents",
          "Improve airflow to cold basement and upstairs rooms",
          "Take strain off the furnace through the winter",
          "Spot furnace issues early with a free inspection",
        ],
        closing:
          "Add furnace cleaning, dryer vent or a filter change in the booking form and it's all done in one visit.",
      },
    ],
    cities: [
      // Ordered by population (Statistics Canada, 2021 Census)
      "Saskatoon", "Regina", "Prince Albert", "Moose Jaw", "Swift Current", "Yorkton",
      "North Battleford", "Warman", "Weyburn", "Estevan", "Martensville",
    ],
  },
  {
    slug: "maritime-provinces",
    code: "MT",
    name: "Maritime Provinces",
    metaTitle: "Duct Cleaning Nova Scotia, NB, PEI & NL | Airlyf",
    metaDescription:
      "Air duct, HRV and dryer vent cleaning in Halifax, Moncton, Saint John, Fredericton, Charlottetown and St. John's. Price confirmed before we start.",
    heroImage: "/images/photos/technicians-flex-duct.webp",
    sideImage: "/images/photos/tech-duct-system.webp",
    sections: [
      {
        heading: "Duct Cleaning in Atlantic Canada",
        paragraphs: [
          "Sea air, fog and damp springs make Atlantic Canada beautiful — and hard on indoor air. Airlyf brings the same whole-system duct cleaning we do across the country to Nova Scotia, New Brunswick, Prince Edward Island and Newfoundland and Labrador, with HRV and dryer vent cleaning available on the same visit.",
        ],
      },
      {
        heading: "Why Maritime Homes Benefit",
        paragraphs: [
          "Many East Coast homes mix forced air with heat pumps and HRVs, and older houses often have ductwork that hasn't been opened in decades. Humidity helps dust stick inside the system, where it can carry musty smells into every room. A thorough cleaning clears that buildup, improves airflow and lets your heating and ventilation work the way they should.",
        ],
      },
    ],
    cities: [
      // Ordered by population (Statistics Canada, 2021 Census)
      "Halifax", "St. John’s", "Cape Breton", "Moncton", "Saint John", "Fredericton",
      "Charlottetown", "Dieppe", "Conception Bay South", "Paradise", "Mount Pearl", "Riverview",
      "Corner Brook", "Quispamsis", "Miramichi", "Edmundston", "Summerside", "Truro",
    ],
  },
];
