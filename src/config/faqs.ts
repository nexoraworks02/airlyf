// Homepage FAQ content — shared by the FAQ section (client) and the
// FAQPage JSON-LD schema on the homepage (server). Prices come from site.ts.
import { provinces } from "./site";

const on = provinces.find((p) => p.code === "ON")!.pricing.base.price;
const rest = provinces.find((p) => p.code === "AB")!.pricing.base.price;

export const faqs = [
  {
    q: "What does duct cleaning cost with Airlyf?",
    a: `Our Basic Duct Cleaning is $${on} in Ontario and $${rest} in Alberta, Quebec, BC, Manitoba, Saskatchewan and the Maritimes. That covers every supply and return vent in the home plus a free furnace inspection. Extras such as furnace cleaning, dryer vent, HRV, AC, heat pump, central vacuum, exhaust fans and brush cleaning are listed with their prices in the booking form, so you see the total before you confirm.`,
  },
  {
    q: "How long does a visit take?",
    a: "A typical house takes about two to four hours, depending on its size, how many vents it has and which extras you add. We'll give you a time estimate when we confirm your booking.",
  },
  {
    q: "Which arrival times can I choose?",
    a: "We book between 8 am and 6 pm. Pick a morning (8 – 12), afternoon (12 – 4) or evening (4 – 6) window on the day you want, and we'll call or message to confirm.",
  },
  {
    q: "Do I need to be home, and can my pets stay?",
    a: "Someone over 18 should be home to let the crew in and point out the furnace and vents. Pets can stay — we just ask that they're kept in a room we're not working in while the equipment is running.",
  },
  {
    q: "Do you work on condos and commercial units?",
    a: "Yes. Along with detached houses and townhomes, we clean condos with ducted systems, duplexes and small commercial spaces. Pick the property type when you book, or send us a WhatsApp message for anything unusual.",
  },
  {
    q: "What if I'm not happy with the result?",
    a: "Tell us within a few days and we'll come back to look at the problem area at no charge. We'd rather fix it than leave you with a vent that isn't right.",
  },
];
