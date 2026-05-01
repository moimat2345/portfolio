"use client";

import { useRef, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotionContext } from "@/components/providers/ReducedMotionProvider";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glareColor?: string;
}

export function TiltCard({ children, className, glareColor = "rgba(139,92,246,0.15)" }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotionContext();
  const rafRef = useRef(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const el = ref.current;
    const glare = glareRef.current;
    if (!el || !glare || reducedMotion) return;

    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      el.style.transform = `perspective(800px) rotateX(${(y - 0.5) * -12}deg) rotateY(${(x - 0.5) * 12}deg)`;
      glare.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, ${glareColor}, transparent 60%)`;
    });
  }, [reducedMotion, glareColor]);

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;
    el.addEventListener("mousemove", handleMouseMove, { passive: true });
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove, handleMouseLeave, reducedMotion]);

  return (
    <div
      ref={ref}
      className={cn(
        "glass rounded-2xl p-6 relative overflow-hidden will-change-transform bg-zinc-950/85",
        "transition-[box-shadow] duration-300 hover:shadow-[0_20px_60px_rgba(139,92,246,0.1)]",
        className
      )}
      style={{ transition: "transform 0.15s ease-out, box-shadow 0.3s" }}
    >
      {!reducedMotion && (
        <div
          ref={glareRef}
          className="absolute inset-0 pointer-events-none z-10 rounded-2xl"
        />
      )}
      <div className="relative z-20">{children}</div>
    </div>
  );
}
