"use client";

import { MotionConfig } from "framer-motion";

/** Site-wide: framer-motion skips transform/layout animations for visitors
 *  who ask their OS for reduced motion (opacity fades still run). */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
