"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

type From = "up" | "down" | "left" | "right" | "zoom" | "fade";

const offsets: Record<From, { x?: number; y?: number; scale?: number }> = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: -60 },
  right: { x: 60 },
  zoom: { scale: 0.88 },
  fade: {},
};

/** Scroll-triggered entrance animation (runs once). Honours reduced motion. */
export function Reveal({
  children,
  delay = 0,
  from = "up",
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  from?: From;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, ...offsets[from] }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.5, 0.27, 1] }}
    >
      {children}
    </motion.div>
  );
}

const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const staggerChild: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.5, 0.27, 1] } },
};

/** Parent that reveals its <StaggerItem> children one after another. */
export function Stagger({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={staggerParent}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={staggerChild}>
      {children}
    </motion.div>
  );
}
