"use client";

import { cn } from "@/lib/utils";
import { useMagnetic } from "@/hooks/useMagnetic";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
  onClick?: () => void;
  download?: boolean;
}

export function MagneticButton({
  children,
  className,
  variant = "primary",
  href,
  onClick,
  download,
}: MagneticButtonProps) {
  const { ref, handleMouseLeave } = useMagnetic<HTMLAnchorElement & HTMLButtonElement>();

  const baseStyles =
    "relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 will-change-transform";

  const variants = {
    primary:
      "bg-gradient-to-r from-violet to-cyan text-white hover:shadow-[0_0_30px_rgba(139,92,246,0.4)]",
    secondary:
      "glass border-white/[0.12] text-white hover:bg-white/[0.08] hover:border-white/[0.2]",
    ghost:
      "text-text-mute hover:text-white hover:bg-white/[0.04]",
  };

  const props = {
    ref,
    className: cn(baseStyles, variants[variant], className),
    onMouseLeave: handleMouseLeave,
  };

  if (href) {
    return (
      <a {...props} href={href} download={download}>
        {children}
      </a>
    );
  }

  return (
    <button {...props} onClick={onClick}>
      {children}
    </button>
  );
}
