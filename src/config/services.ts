import { addonPrice, provinces } from "./site";

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceProcessStep {
  title: string;
  description: string;
}

export interface ServiceDetail {
  slug: string;
  name: string;
  headline: string;
  short: string;
  priceNote: string;
  priceValue?: string;
  intro: string;
  whyItMatters: string;
  whatIsIncluded: string[];
  process: ServiceProcessStep[];
  faqs: ServiceFAQ[];
  metaTitle: string;
  metaDescription: string;
}

// Prices are read from the tiers in site.ts — never typed here.
const ON = provinces.find((p) => p.code === "ON")!.pricing;
const REST = provinces.find((p) => p.code === "AB")!.pricing;
const on = (id: string) => `$${id === "basic" ? ON.base.price : addonPrice(ON, id)}`;
const rest = (id: string) => `$${id === "basic" ? REST.base.price : addonPrice(REST, id)}`;

export const serviceDetails: Record<string, ServiceDetail> = {
  "air-duct-cleaning": {
    slug: "air-duct-cleaning",
    name: "Air Duct Cleaning",
    headline: "Whole-Home Air Duct Cleaning",
    short: "Every supply and return line cleaned, from the furnace to the last register.",
    priceNote: `Basic Duct Cleaning ${on("basic")} in Ontario · ${rest("basic")} in every other region — free furnace inspection included`,
    priceValue: on("basic"),
    intro: "Your ductwork carries every breath of heated and cooled air in the house. We clean the whole network — main trunks, branch lines, registers and returns — so the air coming out of your vents is as clean as the room you just dusted.",
    whyItMatters: "Ducts quietly collect drywall dust, pet hair, pollen and lint for years. Each time the blower starts, some of that gets pushed back into your rooms and onto the furnace filter. Cleaning the system cuts down on dust settling on furniture, helps people with allergies, and lets air move freely so the furnace and AC don't strain to reach the thermostat setting.",
    whatIsIncluded: [
      "All supply and return vents in the home",
      "Main trunk lines and branch runs",
      "Negative-air vacuum with rotary tools",
      "Registers and grilles wiped down",
      "Free furnace inspection with the visit",
    ],
    process: [
      {
        title: "Walk-through",
        description: "We look over the furnace, trunks and a few vents with you, note any problem spots and confirm the price before starting.",
      },
      {
        title: "Seal & connect",
        description: "Registers are covered and our vacuum is connected to the main line, putting the whole system under negative pressure so dust is pulled away from your rooms.",
      },
      {
        title: "Room-by-room agitation",
        description: "At each vent we work air whips and brushes into the branch line to knock dust off the walls and send it down to the vacuum.",
      },
      {
        title: "Wipe-down & airflow check",
        description: "Grilles are cleaned and put back, the system is switched on, and we check that air is moving well at the registers before we pack up.",
      },
    ],
    faqs: [
      {
        question: "How often should ducts be cleaned?",
        answer: "For most homes, every two to four years is plenty. Book sooner if you've just renovated, moved into a resale home, have several pets, or someone in the house has allergies or asthma.",
      },
      {
        question: "Will dust end up in my house during the cleaning?",
        answer: "No. The system is under negative pressure for the whole job, so loosened dust travels toward our vacuum — not out of your vents. We also lay down floor runners where we walk.",
      },
      {
        question: "Do you use chemicals?",
        answer: "The standard cleaning is mechanical — vacuum, brushes and air tools — with no sprays. If you'd like a sanitizer applied, ask when you book and we'll explain the options first.",
      },
      {
        question: "How long does it take?",
        answer: "Plan on about two to four hours for a typical house. Larger homes, multiple furnaces or lots of extras take longer, and we'll give you an estimate when we confirm.",
      },
    ],
    metaTitle: "Air Duct Cleaning in Canada | Airlyf",
    metaDescription: `Whole-home air duct cleaning in ON, AB, QC, BC, MB, SK & the Maritimes from ${on("basic")}. Every vent cleaned and a free furnace inspection. Get a free quote.`,
  },
  "furnace-cleaning": {
    slug: "furnace-cleaning",
    name: "Furnace Cleaning",
    headline: "Furnace Cleaning & Blower Service",
    short: "Blower, cabinet and burners cleaned so your furnace runs quietly all winter.",
    priceNote: `Furnace cleaning add-on ${on("furnace")} per furnace in Ontario · ${rest("furnace")} in every other region`,
    priceValue: on("furnace"),
    intro: "Duct cleaning clears the pipes; furnace cleaning clears the machine that pushes air through them. We open the cabinet and clean the parts that collect the most dust.",
    whyItMatters: "A dusty blower wheel moves less air, so the furnace runs longer for the same heat and the motor works harder. Dust on burners and sensors can cause short cycling or failed ignitions on the coldest night of the year. A clean furnace is quieter, more efficient and less likely to surprise you with a service call.",
    whatIsIncluded: [
      "Blower wheel and motor housing cleaned",
      "Cabinet and return plenum vacuumed",
      "Burner area and flame sensor checked",
      "Filter slot cleaned and filter checked",
      "Test run with airflow check",
    ],
    process: [
      {
        title: "Power down",
        description: "We switch off power to the furnace and make sure it's safe to open before any panels come off.",
      },
      {
        title: "Open & inspect",
        description: "Access panels are removed so we can look at the blower, burners and cabinet and point out anything worth a repair call.",
      },
      {
        title: "Clean",
        description: "Dust and lint are brushed and vacuumed from the blower, cabinet and surrounding plenum.",
      },
      {
        title: "Restart & test",
        description: "Everything goes back together and we run a heating cycle to make sure it fires and moves air properly.",
      },
    ],
    faqs: [
      {
        question: "Is the free furnace inspection the same as a cleaning?",
        answer: "No. Every duct cleaning includes a free visual inspection of the furnace. Furnace cleaning is the hands-on service where we open the unit and clean the blower and cabinet — it's added per furnace.",
      },
      {
        question: "What does it cost?",
        answer: `Furnace cleaning is ${on("furnace")} per furnace in Ontario and ${rest("furnace")} per furnace in all other regions, done during the same visit as your duct cleaning.`,
      },
      {
        question: "Is this a full tune-up?",
        answer: "It's a cleaning, not a gas-fitter tune-up. If we spot something that needs a licensed technician — a cracked part, a gas smell, an error code — we'll tell you so you can book a repair.",
      },
      {
        question: "When is the best time to clean the furnace?",
        answer: "Late summer or early fall, before the heating season starts, so it goes into winter clean.",
      },
    ],
    metaTitle: "Furnace Cleaning in Canada | Airlyf",
    metaDescription: `Furnace blower and cabinet cleaning from ${on("furnace")} per furnace, added to your duct cleaning. Quieter, more efficient heating across Canada. Book a free quote.`,
  },
  "ac-cleaning": {
    slug: "ac-cleaning",
    name: "AC Cleaning",
    headline: "Air Conditioner Coil Cleaning",
    short: "Clean coils and a clear drain for stronger, cheaper summer cooling.",
    priceNote: `AC cleaning add-on ${on("ac")} in Ontario · ${rest("ac")} in every other region`,
    priceValue: on("ac"),
    intro: "When the AC coil is coated in dust, cold air can't get through it. We clean the indoor coil area and the outdoor unit so your system cools the house the way it did when it was new.",
    whyItMatters: "A dirty evaporator coil acts like a blanket, so the AC runs longer and pulls less humidity out of the air. A blocked condensate drain can back up and leak onto the basement floor. Clean coils mean faster cooling, lower hydro bills and less wear on the compressor.",
    whatIsIncluded: [
      "Indoor coil area inspected and cleaned",
      "Condensate pan and drain line flushed",
      "Outdoor condenser fins cleared of debris",
      "Leaves and grass cleared around the unit",
      "Cooling run check after cleaning",
    ],
    process: [
      {
        title: "Access",
        description: "We find the indoor coil above the furnace and open the access point where the unit allows it.",
      },
      {
        title: "Drain flush",
        description: "The condensate pan is checked and the drain line is flushed to clear slime and blockages.",
      },
      {
        title: "Coil cleaning",
        description: "Dust is brushed off and a coil cleaner is applied where needed to restore heat transfer.",
      },
      {
        title: "Outdoor unit",
        description: "We clear the condenser fins and the area around the outdoor unit, then run the AC to check it.",
      },
    ],
    faqs: [
      {
        question: "How do I know the AC needs cleaning?",
        answer: "Weak cold air, the unit running non-stop on mild days, a musty smell when it kicks on, or water around the furnace are the usual signs.",
      },
      {
        question: "Will it lower my energy bill?",
        answer: "Usually, yes. A clean coil transfers heat faster, so the AC reaches the set temperature in shorter cycles.",
      },
      {
        question: "Can you clean the AC in winter?",
        answer: "We can clean the indoor coil and drain any time, but the outdoor unit is best done when it isn't buried in snow. Spring is ideal.",
      },
      {
        question: "How often should coils be cleaned?",
        answer: "Every year or two, depending on how much you run the AC and how dusty the house is.",
      },
    ],
    metaTitle: "AC Coil Cleaning in Canada | Airlyf",
    metaDescription: `Air conditioner coil and drain cleaning from ${on("ac")} as an add-on to duct cleaning. Cooler air, lower bills, fewer leaks. Get a free quote from Airlyf.`,
  },
  "dryer-vent-cleaning": {
    slug: "dryer-vent-cleaning",
    name: "Dryer Vent Cleaning",
    headline: "Dryer Vent Cleaning",
    short: "Lint cleared from dryer to outside wall — faster drying and less fire risk.",
    priceNote: `Dryer vent add-on ${on("dryer")} in Ontario · ${rest("dryer")} in every other region`,
    priceValue: on("dryer"),
    intro: "Lint that gets past the trap packs into the vent pipe behind the dryer. We clear the full run from the machine to the outside hood so hot, damp air can escape the way it should.",
    whyItMatters: "A restricted dryer vent makes the dryer run hotter and longer, wears out its heating element and leaves clothes damp after a full cycle. Packed lint is also flammable, and dryer fires are a well-known household hazard. Clearing the vent is one of the cheapest safety jobs you can do for your home.",
    whatIsIncluded: [
      "Full vent run brushed and vacuumed",
      "Transition hose behind the dryer cleared",
      "Exterior hood and flap cleaned",
      "Nest or blockage removal where reachable",
      "Airflow check at the outside hood",
    ],
    process: [
      {
        title: "Pull out the dryer",
        description: "We move the dryer and disconnect the hose to get at the start of the vent.",
      },
      {
        title: "Brush the line",
        description: "A rotary brush is fed through the whole vent to break up packed lint.",
      },
      {
        title: "Vacuum",
        description: "Loosened lint is vacuumed out at the same time so it doesn't end up in the laundry room.",
      },
      {
        title: "Check outside",
        description: "We clean the exterior hood, make sure the flap opens and closes, and confirm strong airflow.",
      },
    ],
    faqs: [
      {
        question: "What are signs of a blocked dryer vent?",
        answer: "Loads that need a second cycle, a dryer that's hot to the touch, a burning smell, or a flap outside that barely opens when the dryer runs.",
      },
      {
        question: "What does it cost?",
        answer: `Dryer vent cleaning is ${on("dryer")} in Ontario and ${rest("dryer")} in all other regions when added to a duct cleaning.`,
      },
      {
        question: "How often should it be done?",
        answer: "Once a year for most families, or more often for big households that run the dryer daily.",
      },
      {
        question: "Can you remove a bird's nest?",
        answer: "Yes, when it's reachable from inside or from the exterior hood. If the hood is broken we'll recommend a replacement so it doesn't happen again.",
      },
    ],
    metaTitle: "Dryer Vent Cleaning in Canada | Airlyf",
    metaDescription: `Dryer vent cleaning from ${on("dryer")} with your duct cleaning. Clear lint from dryer to outside wall for faster drying and a safer home. Book with Airlyf.`,
  },
  "filter-change": {
    slug: "filter-change",
    name: "Filter Change",
    headline: "Furnace Filter Replacement",
    short: "A fresh, correctly sized filter installed while we're already there.",
    priceNote: "Filter change quoted on request (depends on filter size and type)",
    priceValue: undefined,
    intro: "After the ducts are clean, a fresh filter keeps them that way. We fit the right size and type for your furnace and show you how to swap it next time.",
    whyItMatters: "The filter protects the blower and coil from dust and catches particles before they reach your rooms. Once it's clogged, airflow drops, the furnace can overheat and trip its safety limit, and dust starts slipping around the edges into freshly cleaned ductwork.",
    whatIsIncluded: [
      "Old filter removed and disposed of",
      "Filter slot and rack vacuumed",
      "Correct-size replacement installed",
      "Airflow direction and fit checked",
      "Advice on how often to change it",
    ],
    process: [
      {
        title: "Find the filter",
        description: "We locate the filter slot — usually at the furnace or on the return plenum — and check its size.",
      },
      {
        title: "Clean the slot",
        description: "Dust and hair in the rack are vacuumed out before the new filter goes in.",
      },
      {
        title: "Install",
        description: "The new filter is fitted with the arrow pointing toward the furnace.",
      },
      {
        title: "Check the seal",
        description: "We make sure there are no gaps where air could bypass the filter.",
      },
    ],
    faqs: [
      {
        question: "How often should I change my filter?",
        answer: "Thin 1-inch filters usually need changing every one to three months. Thicker 4–5 inch media filters last about six months to a year.",
      },
      {
        question: "Which MERV rating should I use?",
        answer: "Most homes do well with MERV 8–11. Higher ratings catch finer particles but can restrict airflow on some furnaces, so we'll suggest what fits your system.",
      },
      {
        question: "Do you supply the filter?",
        answer: "Yes. We'll quote the filter when you book based on your size, or you can supply your own and we'll install it.",
      },
      {
        question: "What happens if I never change it?",
        answer: "Airflow drops, the furnace works harder, and in summer the AC coil can freeze up. A clogged filter also lets dust bypass it and settle in the ducts.",
      },
    ],
    metaTitle: "Furnace Filter Replacement in Canada | Airlyf",
    metaDescription: "Correct-size furnace filter installed with your duct cleaning. Protect your blower and keep clean ducts clean. Get a free quote from Airlyf.",
  },
  "brush-cleaning": {
    slug: "brush-cleaning",
    name: "Brush Cleaning",
    headline: "Rotary Brush Duct Cleaning",
    short: "Spinning brushes scrub stuck-on dust off duct walls.",
    priceNote: `Brush Cleaning add-on ${on("brush-cleaning")} in Ontario · ${rest("brush-cleaning")} in every other region`,
    priceValue: on("brush-cleaning"),
    intro: "Suction lifts loose dust. Brushing goes after the layer that's stuck to the metal. Add it when your ducts have gone years without cleaning or after a renovation.",
    whyItMatters: "Drywall dust, cooking residue and humidity can glue a fine layer of grime to the inside of ducts. It won't all come off with air pressure alone. Rotary brushes scrub that layer loose so the vacuum can carry it away, giving you a noticeably deeper clean.",
    whatIsIncluded: [
      "Rotary brushing of reachable duct runs",
      "Vacuum running the whole time",
      "Extra attention to heavily soiled sections",
      "Ideal after renovations or in older homes",
      "Added to any duct cleaning",
    ],
    process: [
      {
        title: "Spot the buildup",
        description: "During the walk-through we look for sections with caked-on dust that need brushing.",
      },
      {
        title: "Vacuum on",
        description: "The negative-air vacuum is connected first so everything loosened is captured.",
      },
      {
        title: "Brush",
        description: "Flexible rotary brushes are fed through the duct runs to scrub the walls.",
      },
      {
        title: "Verify",
        description: "We check the cleaned sections and airflow at the registers before finishing.",
      },
    ],
    faqs: [
      {
        question: "What does brush cleaning cost?",
        answer: `It's ${on("brush-cleaning")} in Ontario and ${rest("brush-cleaning")} in all other regions, added on top of Basic Duct Cleaning.`,
      },
      {
        question: "Do I need it?",
        answer: "It's worth it for older homes, ducts that have never been cleaned, and houses that just had drywall, flooring or other dusty work done.",
      },
      {
        question: "Can brushing damage my ducts?",
        answer: "No. The brushes are made for residential ductwork, and our crews adjust them for flex lines and older metal.",
      },
      {
        question: "How do I add it?",
        answer: "Tick Brush Cleaning under the extras in the booking form, or ask the technician on the day.",
      },
    ],
    metaTitle: `Brush Duct Cleaning in Canada | From ${on("brush-cleaning")} | Airlyf`,
    metaDescription: `Rotary brush duct cleaning from ${on("brush-cleaning")} as an add-on. Scrub stuck-on dust off duct walls for a deeper clean. Book with Airlyf.`,
  },
};
