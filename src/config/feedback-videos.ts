// Real Airlyf customer video testimonials (only with the customer's
// permission). Files live in /public/videos/feedback — compressed copies
// (H.264, ≤720px tall, faststart) with the Airlyf logo watermark
// burned in. Each clip has a .webp poster.
//
// The homepage section and the "Reviews" menu link stay hidden until at least
// one clip is listed below. To add a video: drop `feedback-NN.mp4` +
// `feedback-NN.webp` in that folder and add a `clip(NN, seconds)` line.

export type FeedbackVideo = {
  src: string;
  poster: string;
  seconds: number; // shown as a duration badge
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- used once clips are added below
const clip = (n: number, seconds: number): FeedbackVideo => {
  const id = String(n).padStart(2, "0");
  return {
    src: `/videos/feedback/feedback-${id}.mp4`,
    poster: `/videos/feedback/feedback-${id}.webp`,
    seconds,
  };
};

// Professionally edited video shown as the section's centrepiece.
// Drop `featured.mp4` + `featured.webp` in /public/videos/feedback and set its length.
export const featuredVideo: FeedbackVideo = {
  src: "/videos/feedback/featured.mp4",
  poster: "/videos/feedback/featured.webp",
  seconds: 30,
};

export const customerVideos: FeedbackVideo[] = [
  // clip(1, 20),
];

export const hasVideoTestimonials = customerVideos.length > 0;
