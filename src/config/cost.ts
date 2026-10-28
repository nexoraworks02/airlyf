// Shared copy for the cost hub and city cost guides. Every number comes from
// config/site.ts so these pages always match the booking form.

import { BASIC_INCLUDES, addonPrice, type Province } from "./site";

export const COST_YEAR = 2026;

export const INCLUDED = BASIC_INCLUDES;

export const COMPARE_TIPS = [
  "Count the vents in your home and ask if the quote covers all of them — some companies cap the number and bill extra per vent.",
  "Find out if “furnace” in the quote means a real cleaning of the blower and cabinet, or only a quick look.",
  "Ask what the crew brings: a truck- or portable negative-air machine and rotary brushes, versus a household-style vacuum.",
  "Be wary of very low advertised prices — get the full total, with every extra, in writing before anyone arrives.",
];

// Price FAQs for a place (city or area), written from live prices.
export function costFaqs(place: string, p: Province) {
  const t = p.pricing;
  return [
    {
      question: `What is the price of duct cleaning in ${place}?`,
      answer: `Airlyf's Basic Duct Cleaning is $${t.base.price} in ${place}. It covers every supply and return vent in the home and includes a free furnace inspection.`,
    },
    {
      question: `What does furnace cleaning cost in ${place}?`,
      answer: `Furnace cleaning is added per unit at $${addonPrice(t, "furnace")} each. Set the number of furnaces in the booking form and your total updates straight away.`,
    },
    {
      question: `Is brush cleaning worth adding in ${place}?`,
      answer: `Brush Cleaning costs $${addonPrice(t, "brush-cleaning")} in ${place}. Rotary brushes knock loose dust that has stuck to the duct walls, so it's most useful in older ductwork and after drywall or flooring work.`,
    },
    {
      question: "Will the price change on the day?",
      answer: "No. The basic price covers every vent, and you only pay for the extras you pick. Your total is shown in the booking form before you send it, and we confirm it again before we start.",
    },
  ];
}
