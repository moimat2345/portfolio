"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotionContext } from "@/components/providers/ReducedMotionProvider";

interface MagneticIconProps {
  children: React.ReactNode;
  className?: string;
}

export function MagneticIcon({ children, className }: MagneticIconProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotionContext();
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPos({ x: x * 0.3, y: y * 0.3 });
  };

  return (
    <motion.div
      ref={ref}
      className={cn("inline-flex items-center justify-center cursor-pointer", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={pos}
      transition={{ type: "spring", stiffness: 300, damping: 15, mass: 0.5 }}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
    >
      {children}
    </motion.div>
  );
}
