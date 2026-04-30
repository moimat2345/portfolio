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

      // Stagger reveal all child elements with data-animate
      const elements = containerRef.current.querySelectorAll("[data-animate]");
      if (elements.length > 0) {
        gsap.from(elements, {
          opacity: 0,
          y: 80,
          scale: 0.95,
          rotateX: 5,
          duration: 0.9,
          stagger: 0.08,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }

      // Parallax on decorative elements
      const decorative = containerRef.current.querySelectorAll("[data-parallax]");
      decorative.forEach((el) => {
        const speed = parseFloat((el as HTMLElement).dataset.parallax || "0.5");
        gsap.to(el, {
          y: speed * -100,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    },
    { scope: containerRef, dependencies: [reducedMotion] }
  );

  return (
    <section
      ref={containerRef}
      id={id}
      className={cn(
        "relative px-6 md:px-12 lg:px-24 py-24 md:py-32 max-w-7xl mx-auto",
        // Section separator line
        "before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-24 before:h-px before:bg-gradient-to-r before:from-transparent before:via-violet/30 before:to-transparent",
        className
      )}
    >
      {/* Decorative floating orbs that parallax */}
      {!reducedMotion && (
        <>
          <div
            data-parallax="0.3"
            className="absolute -right-20 top-20 w-72 h-72 rounded-full bg-violet/[0.03] blur-[100px] pointer-events-none"
          />
          <div
            data-parallax="0.6"
            className="absolute -left-32 bottom-10 w-96 h-96 rounded-full bg-cyan/[0.02] blur-[120px] pointer-events-none"
          />
        </>
      )}
      {children}
    </section>
  );
}
