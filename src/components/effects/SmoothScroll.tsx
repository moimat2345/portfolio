"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useReducedMotionContext } from "@/components/providers/ReducedMotionProvider";

export function SmoothScroll() {
  const reducedMotion = useReducedMotionContext();

  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, [reducedMotion]);

  return null;
}
