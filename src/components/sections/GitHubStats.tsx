"use client";

import { useTranslations } from "next-intl";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { GlassCard } from "@/components/ui/GlassCard";
import { useGitHubStats } from "@/hooks/useGitHubStats";

export function GitHubStats() {
  const t = useTranslations("GitHub");
  const { data, isLoading } = useGitHubStats();

  const cards = [
    { label: t("contributions"), url: data?.statsUrl },
    { label: t("topLanguages"), url: data?.topLangsUrl },
    { label: t("streak"), url: data?.streakUrl },
  ];

  return (
    <SectionWrapper id="github">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 gradient-text text-center">
        {t("title")}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map(({ label, url }) => (
          <GlassCard key={label} hover className="flex flex-col items-center gap-4">
            <h3 className="text-sm font-mono text-text-mute uppercase tracking-wider">
              {label}
            </h3>
            {isLoading || !url ? (
              <div className="w-full aspect-[2/1] bg-white/[0.02] rounded-lg animate-pulse" />
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={url}
                alt={label}
                className="w-full rounded-lg"
                loading="lazy"
              />
            )}
          </GlassCard>
        ))}
      </div>
    </SectionWrapper>
  );
}
