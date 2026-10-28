// Blog articles (/blog/[slug]/). Paragraphs support inline links written as
// [label](/path/) — rendered by components/RichText. Prices are pulled from
// config/site.ts so articles never go out of date when prices change.

import { provinces } from "./site";

export type BlogSection = { heading: string; paragraphs: string[]; bullets?: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  date: string; // ISO date, shown as "Published"
  readMins: number;
  intro: string;
  sections: BlogSection[];
  faqs?: { question: string; answer: string }[];
};

// "$129" etc. for the Basic Duct Cleaning ("basic") or an add-on, in a given area code.
const price = (code: string, id: string) => {
  const t = provinces.find((p) => p.code === code)!.pricing;
  const item = [t.base, ...t.addons].find((x) => x.id === id)!;
  return `$${item.price}`;
};

const PUBLISHED = "2026-10-23";

export const blogPosts: BlogPost[] = [
  {
    slug: "how-much-does-duct-cleaning-cost",
    title: "Air Duct Cleaning Prices in Canada: What You Should Pay",
    metaTitle: "Air Duct Cleaning Prices in Canada | Airlyf",
    description:
      "What air duct cleaning really costs in Canada, what a fair quote includes, the extras that change the total, and Airlyf's published prices by region.",
    date: PUBLISHED,
    readMins: 6,
    intro:
      "Ask three duct cleaning companies for a price and you can get three very different numbers — and the lowest one isn't always the cheapest by the time the job is done. Here's how pricing works, what should be included, and exactly what we charge.",
    sections: [
      {
        heading: "Airlyf prices",
        paragraphs: [
          `Our Basic Duct Cleaning covers every supply and return vent in your home and includes a free furnace inspection. It's ${price("ON", "basic")} in Ontario and ${price("AB", "basic")} in Alberta, Quebec, British Columbia, Manitoba, Saskatchewan and the Maritimes. If you want the furnace itself cleaned, that's ${price("ON", "furnace")} per furnace in Ontario and ${price("AB", "furnace")} per furnace elsewhere.`,
          "The full list for your region, with every extra, is on our [duct cleaning cost guide](/duct-cleaning-cost/). City guides are also available for [Toronto](/duct-cleaning-cost/toronto/), [Ottawa](/duct-cleaning-cost/ottawa/), [Calgary](/duct-cleaning-cost/calgary/), [Montreal](/duct-cleaning-cost/montreal/), [Vancouver](/duct-cleaning-cost/vancouver/) and [Winnipeg](/duct-cleaning-cost/winnipeg/).",
        ],
      },
      {
        heading: "What a fair price should cover",
        paragraphs: [
          "The most common catch in this industry is a low price that only covers a set number of vents, with each additional one billed on top. Before you compare, make sure the quote includes the whole system. Our basic visit includes:",
        ],
        bullets: [
          "Every supply and return vent — no vent count",
          "Main trunk lines and branch runs",
          "Negative-air vacuum and rotary agitation tools",
          "Registers and grilles cleaned",
          "A free furnace inspection",
        ],
      },
      {
        heading: "What makes the total go up",
        paragraphs: ["A few things legitimately change what you'll pay:"],
        bullets: [
          `Furnaces — cleaning is priced per unit (${price("ON", "furnace")} in Ontario, ${price("AB", "furnace")} elsewhere). Homes with a suite or a big addition sometimes have two or three.`,
          "Extras — AC coil, dryer vent, HRV, heat pump, central vacuum, exhaust fans and Brush Cleaning are all optional. Add only what your home actually has.",
          "Heavy buildup — ducts that have never been cleaned, or that went through a renovation, are good candidates for [Brush Cleaning](/services/brush-cleaning/).",
          "Where you live — Ontario pricing differs from our other regions.",
        ],
      },
      {
        heading: "Extras and their prices",
        paragraphs: [
          `Ontario: AC cleaning ${price("ON", "ac")}, dryer vent ${price("ON", "dryer")}, HRV ${price("ON", "hrv")}, heat pump ${price("ON", "heat-pump")}, central vacuum ${price("ON", "central-vacuum")}, exhaust fans ${price("ON", "exhaust-fan")} each, Brush Cleaning ${price("ON", "brush-cleaning")}.`,
          `All other regions: AC cleaning ${price("AB", "ac")}, dryer vent ${price("AB", "dryer")}, HRV ${price("AB", "hrv")}, heat pump ${price("AB", "heat-pump")}, central vacuum ${price("AB", "central-vacuum")}, exhaust fans ${price("AB", "exhaust-fan")} each, Brush Cleaning ${price("AB", "brush-cleaning")}.`,
          "Furnace filters are quoted separately because sizes and ratings vary from home to home.",
        ],
      },
      {
        heading: "Is it money well spent?",
        paragraphs: [
          "If dust puffs out of your vents, comes back the day after you clean, or you've just renovated or moved into a new build, you'll see and feel the difference. Run through the [signs your ducts need cleaning](/blog/signs-you-need-air-duct-cleaning/), or [book online](/#quote) — it takes about two minutes.",
        ],
      },
    ],
    faqs: [
      { question: "What does duct cleaning cost in Ontario?", answer: `Basic Duct Cleaning is ${price("ON", "basic")} in Ontario with a free furnace inspection. Furnace cleaning adds ${price("ON", "furnace")} per furnace.` },
      { question: "Will I be charged extra on the day?", answer: "No. The basic price covers every vent. Extras are only added if you choose them, and you see the full total in the booking form before you send it." },
    ],
  },
  {
    slug: "how-often-should-you-clean-air-ducts",
    title: "How Often Do Air Ducts Need Cleaning?",
    metaTitle: "How Often Do Air Ducts Need Cleaning? | Airlyf",
    description:
      "A practical schedule for duct cleaning in Canadian homes, plus the situations — pets, allergies, renovations, new builds — when you shouldn't wait.",
    date: PUBLISHED,
    readMins: 5,
    intro:
      "Every home is different, so there's no single date on the calendar. But there is a sensible range — and a handful of situations where it's worth booking sooner.",
    sections: [
      {
        heading: "A sensible baseline",
        paragraphs: [
          "Industry groups commonly suggest every three to five years for a typical home. In much of Canada, every two to four years is more realistic: furnaces run for half the year or more, and windows stay shut all winter, so the same air passes through the ducts again and again.",
        ],
      },
      {
        heading: "Book sooner when…",
        paragraphs: ["Some homes collect dust much faster. Move your cleaning up if:"],
        bullets: [
          "You have dogs or cats that shed",
          "Someone at home has allergies or asthma",
          "You've had drywall, flooring or other dusty work done",
          "You moved into a new build that's never been cleaned",
          "You bought a resale home and have no idea when the ducts were last done",
          "You can see dust coming out of the vents",
        ],
      },
      {
        heading: "The rest of the system has its own schedule",
        paragraphs: [
          "Check the furnace filter every one to three months. Clean the dryer vent about once a year in a busy household — our [dryer vent safety guide](/blog/dryer-vent-cleaning-fire-safety/) explains why. If you have an HRV, its core and filters need regular attention too.",
        ],
      },
      {
        heading: "Where you live matters",
        paragraphs: [
          "In cold cities like [Edmonton](/alberta/edmonton/), [Winnipeg](/manitoba/winnipeg/) and [Ottawa](/ontario/ottawa/), furnaces run for months on end. On the coasts, in [Vancouver](/british-columbia/vancouver/) and [Halifax](/maritime-provinces/halifax/), humidity and musty smells are the bigger issue. Either way, a system that works harder needs cleaning more often.",
          "When you're ready, see [our prices](/duct-cleaning-cost/) or [book online](/#quote).",
        ],
      },
    ],
  },
  {
    slug: "signs-you-need-air-duct-cleaning",
    title: "7 Signs Your Air Ducts Are Due for a Cleaning",
    metaTitle: "7 Signs Your Air Ducts Need Cleaning | Airlyf",
    description:
      "Dust puffing from vents, stale smells, uneven heating and more — seven signs it's time to have your home's ductwork professionally cleaned.",
    date: PUBLISHED,
    readMins: 5,
    intro:
      "Ductwork lives behind walls and ceilings, so it's easy to forget about. Your house usually drops a few hints when it needs attention.",
    sections: [
      {
        heading: "1. A puff of dust when the system starts",
        paragraphs: ["If you see dust drift out when the furnace or AC kicks on — or grey shadows around the vent covers — there's buildup inside."],
      },
      {
        heading: "2. You dust, and it's back tomorrow",
        paragraphs: ["Shelves and screens that need wiping again a day later often mean the ducts are recirculating dust faster than you can remove it."],
      },
      {
        heading: "3. A stale or musty smell",
        paragraphs: ["A musty odour when the system first runs usually points to dust and moisture inside the ducts — especially common in basements and humid regions."],
      },
      {
        heading: "4. Some rooms never feel right",
        paragraphs: ["Restricted ducts can leave the rooms farthest from the furnace colder in winter and warmer in summer than the rest of the house."],
      },
      {
        heading: "5. You've just renovated",
        paragraphs: ["Return vents pull renovation dust straight into the system, where it settles and sticks. A post-renovation cleaning clears it out, and [Brush Cleaning](/services/brush-cleaning/) handles the stuck-on layer."],
      },
      {
        heading: "6. Your home is brand new",
        paragraphs: ["New builds often hold a surprising amount of construction dust. Families in fast-growing areas like [Brampton](/ontario/brampton/), [Surrey](/british-columbia/surrey/) and [Calgary](/alberta/calgary/) are often shocked by what comes out the first time."],
      },
      {
        heading: "7. Nobody knows when they were last cleaned",
        paragraphs: [
          "If the answer is \"never\" or \"no idea\" — especially in a home you've just bought — it's time. Here's [how often ducts should be cleaned](/blog/how-often-should-you-clean-air-ducts/).",
          "Spotted a few of these? [See our prices](/duct-cleaning-cost/) and [book online](/#quote).",
        ],
      },
    ],
  },
  {
    slug: "dryer-vent-cleaning-fire-safety",
    title: "Dryer Vents and Fire Safety: A Homeowner's Guide",
    metaTitle: "Dryer Vent Cleaning & Fire Safety | Airlyf",
    description:
      "How lint builds up in dryer vents, why it's a fire risk, the warning signs of a blocked vent, and how often to get it cleaned.",
    date: PUBLISHED,
    readMins: 5,
    intro:
      "Your lint trap does a good job, but it doesn't catch everything. What slips past it collects inside the vent pipe — and lint is extremely flammable.",
    sections: [
      {
        heading: "Why a blocked vent is a hazard",
        paragraphs: [
          "Fire services regularly point to uncleaned dryers as a leading cause of dryer fires. As lint narrows the vent, hot, damp air has nowhere to go. The dryer runs hotter and longer, and the lint packed in the pipe can catch.",
        ],
      },
      {
        heading: "Signs your vent is clogged",
        paragraphs: ["Keep an eye out for:"],
        bullets: [
          "Loads that need a second cycle to dry",
          "A dryer or laundry room that feels unusually hot",
          "A faint burning smell while the dryer runs",
          "An outside flap that barely lifts",
          "Lint gathering behind the dryer or around the outside hood",
        ],
      },
      {
        heading: "How often to have it cleaned",
        paragraphs: [
          "Once a year suits most homes. Big families, long vent runs and vents that exit through the roof may need it more often. And empty the lint trap after every load.",
        ],
      },
      {
        heading: "How Airlyf does it",
        paragraphs: [
          "We pull the dryer out, disconnect the hose, run a rotary brush through the whole vent while vacuuming out the loosened lint, then check that the outside flap opens freely. More details are on our [dryer vent cleaning](/services/dryer-vent-cleaning/) page.",
          `It's an add-on to any duct cleaning — ${price("ON", "dryer")} in Ontario and ${price("AB", "dryer")} in other regions. [Book online](/#quote) to include it.`,
        ],
      },
    ],
  },
  {
    slug: "benefits-of-clean-air-ducts",
    title: "What Clean Air Ducts Actually Do for Your Home",
    metaTitle: "Benefits of Clean Air Ducts | Airlyf",
    description:
      "An honest look at what duct cleaning does: less dust, fresher-smelling air, more even airflow and less strain on your furnace and AC.",
    date: PUBLISHED,
    readMins: 4,
    intro:
      "Duct cleaning won't cure everything, and we won't claim it does. But in a home where the ducts are genuinely dirty, the change is easy to notice.",
    sections: [
      {
        heading: "Less dust on every surface",
        paragraphs: ["Dirty ducts send a little dust back into your rooms every time the blower runs. Take the buildup out and there's less to settle on furniture, floors and screens."],
      },
      {
        heading: "Air that smells cleaner",
        paragraphs: ["Dust, pet dander and moisture inside ductwork can give the air a stale or musty edge. After a cleaning, most people notice it first when the heat or AC switches on."],
      },
      {
        heading: "More even heating and cooling",
        paragraphs: ["Buildup restricts airflow. Clearing it helps air reach the far rooms properly, so the bedroom at the end of the hall isn't always the cold one."],
      },
      {
        heading: "An easier life for your equipment",
        paragraphs: ["A dusty blower and clogged system make the furnace and AC work harder. Every booking includes a free furnace inspection, and you can add [furnace cleaning](/services/furnace-cleaning/) and [AC coil cleaning](/services/ac-cleaning/) to the same visit."],
      },
      {
        heading: "A clean start",
        paragraphs: [
          "After a renovation or a move, you don't really know what's in the ducts. A professional cleaning resets the system.",
          "Read more about [air duct cleaning](/services/air-duct-cleaning/), see [our prices](/duct-cleaning-cost/), or [book online](/#quote).",
        ],
      },
    ],
  },
  {
    slug: "what-to-expect-professional-duct-cleaning",
    title: "What Happens During a Professional Duct Cleaning",
    metaTitle: "What to Expect From a Duct Cleaning | Airlyf",
    description:
      "A step-by-step look at a professional duct cleaning visit: how to prepare, what the crew does, how long it takes and what a good job looks like.",
    date: PUBLISHED,
    readMins: 5,
    intro:
      "If it's your first duct cleaning, here's what the visit looks like from start to finish — and what you should expect from a crew that does it properly.",
    sections: [
      {
        heading: "Before the crew arrives",
        paragraphs: [
          "When you [book online](/#quote), you pick your extras and a morning, afternoon or evening arrival window (8 am – 6 pm). On the day, clear a path to the furnace and move any furniture that's covering a vent.",
        ],
      },
      {
        heading: "Step 1: Walk-through",
        paragraphs: ["The technician looks at the furnace, the main trunks and a few vents, notes anything unusual and confirms the price with you."],
      },
      {
        heading: "Step 2: Negative pressure",
        paragraphs: ["The vacuum is connected to the main line and registers are covered, so the whole system pulls air — and dust — toward the machine, not into your rooms."],
      },
      {
        heading: "Step 3: Agitation, room by room",
        paragraphs: ["At each vent, air whips and brushes knock dust loose so the vacuum can carry it away. If you added [Brush Cleaning](/services/brush-cleaning/), rotary brushes give the duct walls an extra scrub."],
      },
      {
        heading: "Step 4: Furnace and extras",
        paragraphs: ["The free furnace inspection happens here, along with any extras you chose — furnace cleaning, AC coil, dryer vent, HRV or exhaust fans."],
      },
      {
        heading: "Step 5: Wrap-up",
        paragraphs: ["Grilles go back on, the system is switched on, and the crew checks airflow at the registers before tidying up."],
      },
      {
        heading: "How long will it take?",
        paragraphs: [
          "A typical house takes two to four hours, depending on its size, number of vents and the extras you add. Kids and pets can stay home — we just ask that pets are kept away from the equipment.",
          "See [our prices](/duct-cleaning-cost/) or read [how often ducts need cleaning](/blog/how-often-should-you-clean-air-ducts/).",
        ],
      },
    ],
  },
];

export function getPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
