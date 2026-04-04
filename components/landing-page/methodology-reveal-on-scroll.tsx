"use client";

import { motion } from "motion/react";

interface MethogologyRevealOnScrollProps {
  readonly children: React.ReactNode;
  readonly delay?: number;
  readonly direction?: "up" | "down" | "left" | "right";
}
export function MethogologyRevealOnScroll({
  children,
  delay = 0,
  direction = "up",
}: MethogologyRevealOnScrollProps) {
  const variants = {
    up: { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 } },
    down: { initial: { opacity: 0, y: -40 }, animate: { opacity: 1, y: 0 } },
    left: { initial: { opacity: 0, x: 40 }, animate: { opacity: 1, x: 0 } },
    right: { initial: { opacity: 0, x: -40 }, animate: { opacity: 1, x: 0 } },
  };

  return (
    <motion.div
      initial={variants[direction].initial}
      whileInView={variants[direction].animate}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
