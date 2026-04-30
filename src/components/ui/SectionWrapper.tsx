"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { useReducedMotionContext } from "@/components/providers/ReducedMotionProvider";

gsap.registerPlugin(ScrollTrigger);

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function SectionWrapper({ children, className, id }: SectionWrapperProps) {
  const containerRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotionContext();

  useGSAP(
    () => {
      if (reducedMotion) return;

      gsap.from(containerRef.current, {
        opacity: 0,
        y: 60,
        scale: 0.97,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: containerRef, dependencies: [reducedMotion] }
  );

  return (
    <section
      ref={containerRef}
      id={id}
      className={cn("relative px-6 md:px-12 lg:px-24 py-24 md:py-32 max-w-7xl mx-auto", className)}
    >
      {children}
    </section>
  );
}
