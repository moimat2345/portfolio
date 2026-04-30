"use client";

import { useRef, useCallback, useEffect } from "react";
import { useIsTouchDevice } from "./useIsTouchDevice";
import { useReducedMotion } from "./useReducedMotion";

const MAGNETIC_RADIUS = 60;
const STRENGTH = 0.35;

export function useMagnetic<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const isTouch = useIsTouchDevice();
  const reducedMotion = useReducedMotion();
  const frameRef = useRef<number>(0);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const el = ref.current;
      if (!el || isTouch || reducedMotion) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const dist = Math.sqrt(distX * distX + distY * distY);

      if (dist < MAGNETIC_RADIUS + rect.width / 2) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = requestAnimationFrame(() => {
          el.style.transform = `translate(${distX * STRENGTH}px, ${distY * STRENGTH}px)`;
        });
      } else {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = requestAnimationFrame(() => {
          el.style.transform = "translate(0px, 0px)";
        });
      }
    },
    [isTouch, reducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px)";
  }, []);

  useEffect(() => {
    if (isTouch || reducedMotion) return;

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frameRef.current);
    };
  }, [handleMouseMove, isTouch, reducedMotion]);

  return { ref, handleMouseLeave };
}
