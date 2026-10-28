// Customer testimonials shown in the homepage "Testimonials" section.
//
// ONLY real reviews, copied word-for-word (text, name, city). The six below
// are Airlyf's own customer testimonials, carried over from the previous
// airlyf.ca site. Never invent or edit reviews: fake testimonials mislead
// customers and break Canada's Competition Act and Google's policies.
//
// `rating` is optional — add it only when the real review has a star rating
// (e.g. from Google). Stars are shown only for reviews that have one.

export type Review = {
  name: string; // as the customer gave it
  text: string; // word-for-word
  location?: string; // e.g. "Mississauga, ON"
  rating?: 1 | 2 | 3 | 4 | 5;
  date?: string; // e.g. "March 2026"
};

export const reviews: Review[] = [
  {
    name: "Rachel Bennett",
    location: "Brampton, ON",
    text: "AIRLYF were fantastic from start to finish. Their team arrived on time, explained the entire process, and used advanced equipment to clean our air ducts thoroughly. The air feels so much fresher, and my family has noticed a huge improvement in comfort and cleanliness.",
  },
  {
    name: "Daniel Morgan",
    location: "London, ON",
    text: "The service from AIRLYF exceeded my expectations. They were punctual, explained everything clearly, and used top-notch equipment to clean our ducts thoroughly. The air in our home feels noticeably fresher, and I appreciate their attention to detail. high-quality service",
  },
  {
    name: "Radhika Raj",
    location: "Calgary, AB",
    text: "Using AIRLYF was a great decision. Their staff was friendly, efficient, and very professional. I love that they use safe, natural sanitizers that are harmless for kids and pets. Our home feels cleaner, fresher, and healthier than ever. I would recommend them to anyone looking for quality duct cleaning.",
  },
  {
    name: "Pradeep Singh",
    location: "Edmonton, AB",
    text: "I was impressed by the professionalism and care of AIRLYF team. They allowed me to inspect their equipment before starting, explained each step clearly, and left my HVAC system spotless. The improvement in air quality and airflow is remarkable, and I will definitely use their services again.",
  },
  {
    name: "Olivia Carter",
    location: "Regina, SK",
    text: "AIRLYF were outstanding. They arrived on time, used advanced equipment, and ensured our ducts were perfectly cleaned. The air feels fresher, and the process was smooth and stress-free. Highly professional and trustworthy team!",
  },
  {
    name: "Nathan Brooks",
    location: "Saskatoon, SK",
    text: "Professional, friendly, and extremely thorough. AIRLYF cleaned our ducts with great care, explaining every step of the process. The air in our home feels so much cleaner, and I feel confident recommending them to friends and family",
  },
];

// Link to the Google Business Profile reviews page (set once the profile is
// claimed). Leave "" to hide the "See all reviews on Google" button.
export const googleReviewsUrl = "";
