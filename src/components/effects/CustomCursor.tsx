"use client";

import { useEffect, useRef } from "react";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";
import { useReducedMotionContext } from "@/components/providers/ReducedMotionProvider";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouchDevice();
  const reducedMotion = useReducedMotionContext();

  const posRef = useRef({ x: 0, y: 0 });
  const circlePos = useRef({ x: 0, y: 0 });
  const hoveringRef = useRef(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (isTouch || reducedMotion) return;

    document.body.style.cursor = "none";

    const onMouseMove = (e: MouseEvent) => {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;
    };

    // Detect hovering over interactive elements via event delegation
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest("a, button, [role='button'], input, textarea, select");
      if (isInteractive && !hoveringRef.current) {
        hoveringRef.current = true;
        if (dotRef.current) dotRef.current.style.boxShadow = "0 0 20px 4px rgba(139,92,246,0.8)";
        if (circleRef.current) {
          circleRef.current.style.width = "50px";
          circleRef.current.style.height = "50px";
          circleRef.current.style.borderColor = "rgba(139,92,246,0.4)";
        }
      } else if (!isInteractive && hoveringRef.current) {
        hoveringRef.current = false;
        if (dotRef.current) dotRef.current.style.boxShadow = "0 0 10px 2px rgba(139,92,246,0.5)";
        if (circleRef.current) {
          circleRef.current.style.width = "40px";
          circleRef.current.style.height = "40px";
          circleRef.current.style.borderColor = "rgba(255,255,255,0.15)";
        }
      }
    };

    const animate = () => {
      const dot = dotRef.current;
      const circle = circleRef.current;
      if (dot) {
        dot.style.transform = `translate(${posRef.current.x - 4}px, ${posRef.current.y - 4}px)`;
      }
      if (circle) {
        circlePos.current.x += (posRef.current.x - circlePos.current.x) * 0.08;
        circlePos.current.y += (posRef.current.y - circlePos.current.y) * 0.08;
        circle.style.transform = `translate(${circlePos.current.x - 20}px, ${circlePos.current.y - 20}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isTouch, reducedMotion]);

  if (isTouch || reducedMotion) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "white",
          boxShadow: "0 0 10px 2px rgba(139,92,246,0.5)",
          transition: "box-shadow 0.2s",
        }}
      />
      <div
        ref={circleRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] will-change-transform"
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.15)",
          transition: "width 0.3s, height 0.3s, border-color 0.3s",
        }}
      />
    </>
  );
}
