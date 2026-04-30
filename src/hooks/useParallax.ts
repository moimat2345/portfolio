"use client";

import { useRef } from "react";
import { useScroll, useTransform, type MotionValue } from "framer-motion";

export function useParallax(offset: number = 50): {
  ref: React.RefObject<HTMLElement | null>;
  y: MotionValue<number>;
  opacity: MotionValue<number>;
} {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  return { ref, y, opacity };
}
