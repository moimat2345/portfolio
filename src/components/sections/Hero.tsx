"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Chip } from "@/components/ui/Chip";
import { useGitHubStats } from "@/hooks/useGitHubStats";
import { useReducedMotionContext } from "@/components/providers/ReducedMotionProvider";
import { ArrowDown, Download, GitCommit } from "lucide-react";

const HeroScene = dynamic(
  () => import("@/components/three/HeroScene").then((mod) => ({ default: mod.HeroScene })),
  { ssr: false }
);

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function Hero() {
  const t = useTranslations("Hero");
  const { data } = useGitHubStats();
  const reducedMotion = useReducedMotionContext();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* 3D scene or static gradient fallback */}
      {reducedMotion ? (
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.15),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(6,182,212,0.1),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(236,72,153,0.1),transparent_60%)]" />
        </div>
      ) : (
        <HeroScene />
      )}

      {/* Name */}
      <motion.div
        className="text-center relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-[clamp(3rem,10vw,14vw)] font-bold leading-[0.85] tracking-[-0.03em]">
          <motion.span
            className="block gradient-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {t("firstName")}
          </motion.span>
          <motion.span
            className="block text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            {t("lastName")}
          </motion.span>
        </h1>
      </motion.div>

      {/* Tagline + Subline */}
      <motion.div
        className="mt-8 text-center max-w-xl relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <p className="text-xl md:text-2xl text-text-mute leading-relaxed">
          {t("tagline")}
        </p>
        <p className="mt-3 text-sm font-mono text-text-mute">
          {t("subline")}
        </p>
      </motion.div>

      {/* CTAs */}
      <motion.div
        className="mt-8 flex flex-col sm:flex-row items-center gap-4 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <MagneticButton variant="primary" href="#work">
          {t("ctaWork")}
          <ArrowDown size={16} />
        </MagneticButton>
        <MagneticButton variant="secondary" href="/cv-mateo-nuskovski.pdf" download>
          <Download size={16} />
          {t("ctaCv")}
        </MagneticButton>
      </motion.div>

      {/* Live chips */}
      <motion.div
        className="mt-6 flex items-center gap-3 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.5 }}
      >
        <Chip icon={<GitCommit size={12} />}>
          {t("lastCommit")}: {data?.lastPush ? timeAgo(data.lastPush) : "..."}
        </Chip>
        <Chip pulse>
          {t("available")}
        </Chip>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="text-text-mute"
        >
          <ArrowDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
