"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotionContext } from "@/components/providers/ReducedMotionProvider";
import { useCursorContext } from "@/components/providers/CursorProvider";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glareColor?: string;
}

export function TiltCard({ children, className, glareColor = "rgba(139,92,246,0.15)" }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotionContext();
  const { setIsHovering } = useCursorContext();
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTransform({
      rotateX: (y - 0.5) * -20,
      rotateY: (x - 0.5) * 20,
      glareX: x * 100,
      glareY: y * 100,
    });
  };

  const handleMouseLeave = () => {
    setTransform({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
    setIsHovering(false);
  };

  return (
    <motion.div
      ref={ref}
      className={cn("glass rounded-2xl p-6 relative overflow-hidden transition-shadow duration-300", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: reducedMotion
          ? undefined
          : `perspective(800px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
        transition: "transform 0.1s ease-out",
      }}
      whileHover={{ boxShadow: "0 25px 80px rgba(139, 92, 246, 0.15), 0 0 40px rgba(6, 182, 212, 0.08)" }}
    >
      {/* Glare effect */}
      {!reducedMotion && (
        <div
          className="absolute inset-0 pointer-events-none z-10 rounded-2xl"
          style={{
            background: `radial-gradient(circle at ${transform.glareX}% ${transform.glareY}%, ${glareColor}, transparent 60%)`,
          }}
        />
      )}
      <div className="relative z-20">{children}</div>
    </motion.div>
  );
}
