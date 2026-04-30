"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Chip } from "@/components/ui/Chip";
import { TextScramble } from "@/components/ui/TextScramble";
import { useGitHubStats } from "@/hooks/useGitHubStats";
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

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6">
      {/* 3D chrome form — floats behind the text */}
      <HeroScene />

      {/* Name */}
      <motion.div
        className="text-center relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-[clamp(3rem,12vw,16vw)] font-bold leading-[0.82] tracking-[-0.04em]">
          <motion.span
            className="block gradient-text"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <TextScramble text={t("firstName")} className="!font-sans" speed={40} delay={200} />
          </motion.span>
          <motion.span
            className="block text-white"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <TextScramble text={t("lastName")} className="!font-sans" speed={35} delay={600} />
          </motion.span>
        </h1>
      </motion.div>

      {/* Tagline */}
      <motion.div
        className="mt-8 text-center max-w-xl relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <p className="text-xl md:text-2xl text-text-mute leading-relaxed">
          {t("tagline")}
        </p>
        <motion.p
          className="mt-3 text-sm font-mono text-text-mute"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          {t("subline")}
        </motion.p>
      </motion.div>

      {/* CTAs */}
      <motion.div
        className="mt-8 flex flex-col sm:flex-row items-center gap-4 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
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
        transition={{ delay: 2.2, duration: 0.5 }}
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
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.5 }}
      >
        <motion.div
          className="relative flex items-center justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <motion.div
            className="absolute w-10 h-10 rounded-full border border-white/10"
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
          />
          <ArrowDown size={20} className="text-text-mute" />
        </motion.div>
      </motion.div>
    </section>
  );
}
