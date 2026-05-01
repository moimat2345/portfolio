"use client";

import { cn } from "@/lib/utils";

interface TextHaloProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "span";
  intensity?: "light" | "medium" | "strong";
}

const intensities = {
  light: "bg-black/25 backdrop-blur-sm",
  medium: "bg-black/35 backdrop-blur-md",
  strong: "bg-black/50 backdrop-blur-lg",
};

export function TextHalo({
  children,
  className,
  as: Tag = "div",
  intensity = "medium",
}: TextHaloProps) {
  return (
    <Tag
      className={cn(
        "inline-block px-4 py-2 rounded-2xl",
        intensities[intensity],
        className
      )}
    >
      {children}
    </Tag>
  );
}
