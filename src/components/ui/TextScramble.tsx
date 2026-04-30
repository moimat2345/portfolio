"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotionContext } from "@/components/providers/ReducedMotionProvider";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

interface TextScrambleProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span" | "p";
  delay?: number;
  speed?: number;
  trigger?: boolean;
}

export function TextScramble({
  text,
  className,
  as: Tag = "span",
  delay = 0,
  speed = 30,
  trigger = true,
}: TextScrambleProps) {
  const [displayed, setDisplayed] = useState(text);
  const reducedMotion = useReducedMotionContext();
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (reducedMotion || !trigger || hasAnimated.current) return;
    hasAnimated.current = true;

    let frame = 0;
    const totalFrames = text.length * 2;

    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(
          text
            .split("")
            .map((char, i) => {
              if (char === " ") return " ";
              if (frame / 2 > i) return char;
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );

        frame++;
        if (frame >= totalFrames) {
          clearInterval(interval);
          setDisplayed(text);
        }
      }, speed);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay, speed, trigger, reducedMotion]);

  return <Tag className={cn("font-mono", className)}>{displayed}</Tag>;
}
