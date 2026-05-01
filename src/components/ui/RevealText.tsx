"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotionContext } from "@/components/providers/ReducedMotionProvider";

interface RevealTextProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  wordByWord?: boolean;
  halo?: boolean;
}

export function RevealText({
  children,
  className,
  as: Tag = "p",
  delay = 0,
  wordByWord = false,
  halo = false,
}: RevealTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const reducedMotion = useReducedMotionContext();

  const haloClass = halo ? "bg-black/30 backdrop-blur-sm px-4 py-2 rounded-2xl inline-block" : "";

  if (reducedMotion) {
    return (
      <div className={haloClass}>
        <Tag className={className}>{children}</Tag>
      </div>
    );
  }

  if (wordByWord) {
    const words = children.split(" ");
    return (
      <div className={haloClass}>
        <Tag ref={ref} className={cn("flex flex-wrap gap-x-[0.3em]", className)}>
          {words.map((word, i) => (
            <span key={i} className="overflow-hidden inline-block">
              <motion.span
                className="inline-block"
                initial={{ y: "100%", opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
                transition={{
                  duration: 0.5,
                  delay: delay + i * 0.04,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </Tag>
      </div>
    );
  }

  return (
    <div ref={ref} className={cn("overflow-hidden", haloClass)}>
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
        transition={{
          duration: 0.6,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        <Tag className={className}>{children}</Tag>
      </motion.div>
    </div>
  );
}
