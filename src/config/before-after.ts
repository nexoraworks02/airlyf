// Real before/after photos from Airlyf jobs, shown in the homepage
// before-and-after slider. ONLY add genuine photos of Airlyf's own work —
// never stock or AI images presented as results.
//
// The section stays hidden while this list is empty. To add a pair: drop two
// photos of the SAME spot, same angle, same crop (4:3 landscape works best)
// in /public/images/before-after/ and add a line below.

export type BeforeAfterPair = {
  before: string; // e.g. "/images/before-after/vent-01-before.webp"
  after: string;
  caption: string; // what and where, e.g. "Return-air duct · Mississauga, ON"
};

export const beforeAfterPairs: BeforeAfterPair[] = [
  // { before: "/images/before-after/vent-01-before.webp", after: "/images/before-after/vent-01-after.webp", caption: "Main supply trunk · Toronto, ON" },
];

export const hasBeforeAfter = beforeAfterPairs.length > 0;
