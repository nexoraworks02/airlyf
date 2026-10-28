// Customer reviews shown in the homepage "What clients say" section.
//
// ONLY add real reviews here — copy them word-for-word from Airlyf's
// Google Business Profile (name as shown on Google, star rating,
// text, and the city if the customer mentioned it). Never invent reviews:
// fake testimonials mislead customers and break Canada's Competition Act and
// Google's policies.
//
// While this list is empty, the section shows clearly-labelled SAMPLE cards
// so the layout can be reviewed. Add at least 3 real reviews before the site
// goes live.

export type Review = {
  name: string; // as shown on Google, e.g. "Priya S."
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  location?: string; // e.g. "Mississauga, ON"
  date?: string; // e.g. "March 2026"
};

export const reviews: Review[] = [
  // { name: "Customer Name", rating: 5, text: "Exact review text from Google…", location: "Toronto, ON", date: "October 2026" },
];

// Link to the Google Business Profile reviews page (set once the profile is
// claimed). Leave "" to hide the "See all reviews on Google" button.
export const googleReviewsUrl = "";
