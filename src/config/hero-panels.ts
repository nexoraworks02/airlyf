// The four "piano key" panels in the homepage hero — one per service.
//
// A panel with `video` plays that clip (from /public/videos/hero/); the photo
// shows underneath until the clip starts. A panel without one shows the photo
// with a slow zoom and animated dust being pulled toward a vacuum point.

export type HeroPanel = {
  key: string;
  label: string; // shown on the panel
  href: string; // service page it links to
  image: string; // photo (and video poster fallback)
  imagePosition: string; // CSS object-position for the crop
  // Where the dust is pulled to, as % of the panel (the hose / vent opening).
  suction: { x: number; y: number };
  video?: string; // e.g. "/videos/hero/hero-vents.mp4"
  videoPosition?: string; // object-position for the (portrait) clip
  poster?: string; // still frame shown while the video loads
};

export const heroPanels: HeroPanel[] = [
  {
    key: "vents",
    label: "Vent cleaning",
    href: "/services/air-duct-cleaning/",
    image: "/images/photos/tech-ceiling-vent.webp",
    imagePosition: "62% 28%",
    suction: { x: 62, y: 26 },
    video: "/videos/hero/hero-vents.mp4",
    videoPosition: "50% 30%",
  },
  {
    key: "furnace",
    label: "Furnace & HVAC",
    href: "/services/furnace-cleaning/",
    image: "/images/photos/tech-duct-system.webp",
    imagePosition: "66% 30%",
    suction: { x: 58, y: 22 },
    video: "/videos/hero/hero-furnace.mp4",
    videoPosition: "50% 50%",
  },
  {
    key: "ducts",
    label: "Duct cleaning",
    href: "/services/air-duct-cleaning/",
    image: "/images/photos/duct-inside.webp",
    imagePosition: "50% 45%",
    suction: { x: 52, y: 44 },
  },
  {
    key: "ac",
    label: "AC cleaning",
    href: "/services/ac-cleaning/",
    image: "/images/photos/ac-unit.webp",
    imagePosition: "30% 55%",
    suction: { x: 34, y: 52 },
    video: "/videos/hero/hero-ac.mp4",
    videoPosition: "50% 62%",
  },
];
