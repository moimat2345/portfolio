"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotionContext } from "@/components/providers/ReducedMotionProvider";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  duration?: number;
  className?: string;
  trigger?: boolean;
}

export function AnimatedCounter({
  target,
  suffix = "",
  duration = 2000,
  className,
  trigger = true,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const reducedMotion = useReducedMotionContext();
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (reducedMotion || !trigger || hasAnimated.current) {
      setCount(target);
      return;
    }
    hasAnimated.current = true;

    const startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(animate);
  }, [target, duration, trigger, reducedMotion]);

  return (
    <span className={className}>
      {count}
      {suffix}
    </span>
  );
}
