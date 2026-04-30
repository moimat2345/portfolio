"use client";

import { useEffect, useRef } from "react";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";
import { useReducedMotionContext } from "@/components/providers/ReducedMotionProvider";
import { useCursorContext } from "@/components/providers/CursorProvider";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouchDevice();
  const reducedMotion = useReducedMotionContext();
  const { isHovering } = useCursorContext();

  const posRef = useRef({ x: 0, y: 0 });
  const circlePos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (isTouch || reducedMotion) return;

    document.body.style.cursor = "none";

    const onMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      const dot = dotRef.current;
      const circle = circleRef.current;
      if (!dot || !circle) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      // Dot follows directly
      dot.style.transform = `translate(${posRef.current.x - 4}px, ${posRef.current.y - 4}px)`;

      // Circle lerps
      circlePos.current.x += (posRef.current.x - circlePos.current.x) * 0.08;
      circlePos.current.y += (posRef.current.y - circlePos.current.y) * 0.08;
      circle.style.transform = `translate(${circlePos.current.x - 20}px, ${circlePos.current.y - 20}px)`;

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isTouch, reducedMotion]);

  if (isTouch || reducedMotion) return null;

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "white",
          boxShadow: isHovering
            ? "0 0 20px 4px rgba(139, 92, 246, 0.8)"
            : "0 0 10px 2px rgba(139, 92, 246, 0.5)",
          transition: "box-shadow 0.2s, width 0.2s, height 0.2s",
        }}
      />
      {/* Trailing circle */}
      <div
        ref={circleRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] will-change-transform"
        style={{
          width: isHovering ? 50 : 40,
          height: isHovering ? 50 : 40,
          borderRadius: "50%",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          transition: "width 0.3s, height 0.3s, border-color 0.3s",
          borderColor: isHovering
            ? "rgba(139, 92, 246, 0.4)"
            : "rgba(255, 255, 255, 0.15)",
        }}
      />
    </>
  );
}
