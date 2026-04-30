"use client";

import { cn } from "@/lib/utils";
import { useReducedMotionContext } from "@/components/providers/ReducedMotionProvider";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
}

export function Marquee({ children, className, reverse = false, pauseOnHover = true }: MarqueeProps) {
  const reducedMotion = useReducedMotionContext();

  return (
    <div
      className={cn(
        "flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        pauseOnHover && "group",
        className
      )}
    >
      <div
        className={cn(
          "flex shrink-0 items-center gap-8",
          !reducedMotion && (reverse ? "animate-marquee-reverse" : "animate-marquee"),
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
