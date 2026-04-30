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
      if (reducedMotion || !containerRef.current) return;

      // Stagger reveal child elements with data-animate
      const elements = containerRef.current.querySelectorAll("[data-animate]");
      if (elements.length > 0) {
        gsap.from(elements, {
          opacity: 0,
          y: 40,
          duration: 0.7,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }
    },
    { scope: containerRef, dependencies: [reducedMotion] }
  );

  return (
    <section
      ref={containerRef}
      id={id}
      className={cn(
        "relative px-6 md:px-12 lg:px-24 py-24 md:py-32 max-w-7xl mx-auto",
        "before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-24 before:h-px before:bg-gradient-to-r before:from-transparent before:via-violet/30 before:to-transparent",
        className
      )}
    >
      {children}
    </section>
  );
}
