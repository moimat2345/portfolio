"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { TiltCard } from "@/components/ui/TiltCard";
import { RevealText } from "@/components/ui/RevealText";
import { useGitHubStats } from "@/hooks/useGitHubStats";

function StatCard({ label, url, index, isInView }: { label: string; url?: string; index: number; isInView: boolean }) {
  const [failed, setFailed] = useState(false);

  if (failed || !url) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateY: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: 0.2 + index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <TiltCard className="flex flex-col items-center gap-4">
        <h3 className="text-xs font-mono text-text-mute uppercase tracking-wider">
          {label}
        </h3>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={url}
          alt={label}
          className="w-full rounded-lg"
          loading="lazy"
          onError={() => setFailed(true)}
        />
      </TiltCard>
    </motion.div>
  );
}

export function GitHubStats() {
  const t = useTranslations("GitHub");
  const { data, isLoading } = useGitHubStats();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  const cards = [
    { label: t("contributions"), url: data?.statsUrl },
    { label: t("topLanguages"), url: data?.topLangsUrl },
    { label: t("streak"), url: data?.streakUrl },
  ];

  return (
    <SectionWrapper id="github">
      <div ref={ref}>
        <RevealText
          as="h2"
          className="text-4xl md:text-5xl font-bold mb-16 gradient-text text-center"
          wordByWord
        >
          {t("title")}
        </RevealText>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {isLoading ? (
            // Skeleton placeholders while loading
            Array.from({ length: 3 }).map((_, i) => (
              <TiltCard key={i} className="flex flex-col items-center gap-4">
                <div className="h-4 w-24 bg-white/[0.04] rounded animate-pulse" />
                <div className="w-full aspect-[2/1] bg-white/[0.02] rounded-lg animate-pulse" />
              </TiltCard>
            ))
          ) : (
            cards.map(({ label, url }, i) => (
              <StatCard key={label} label={label} url={url} index={i} isInView={isInView} />
            ))
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}
