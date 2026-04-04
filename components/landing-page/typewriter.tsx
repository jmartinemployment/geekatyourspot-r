"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const words = ["Efficiency", "Automation", "Revenue", "Growth"];

export default function Typewriter() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="inline-block text-white text-[5.5rem]  leading-[0.95] font-black font-[var(--font-sora)] shadow-text"
        >
          {words[index]}.
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
