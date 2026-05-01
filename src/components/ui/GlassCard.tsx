"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className, hover = false }: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "glass rounded-2xl p-6 bg-zinc-950/85",
        hover && "transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:border-white/[0.15]",
        className
      )}
      whileHover={hover ? { boxShadow: "0 20px 60px rgba(139, 92, 246, 0.1)" } : undefined}
    >
      {children}
    </motion.div>
  );
}
