"use client";

import { useState, useEffect, useRef } from "react";

export function useScrollDirection(): { direction: "up" | "down"; scrollY: number } {
  const [direction, setDirection] = useState<"up" | "down">("up");
  const [scrollY, setScrollY] = useState(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handler = () => {
      const current = window.scrollY;
      setScrollY(current);
      if (current > lastScrollY.current && current > 80) {
        setDirection("down");
      } else if (current < lastScrollY.current) {
        setDirection("up");
      }
      lastScrollY.current = current;
    };

    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return { direction, scrollY };
}
