"use client";

import { useTranslations } from "next-intl";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { GlassCard } from "@/components/ui/GlassCard";
import { CODING_START_YEAR } from "@/lib/constants";

function RichText({ text }: { text: string }) {
  // Split on <strong>...</strong> tags from our own translation files
  const parts = text.split(/(<strong>.*?<\/strong>)/g);
  return (
    <>
      {parts.map((part, i) => {
        const match = part.match(/^<strong>(.*?)<\/strong>$/);
        if (match) {
          return (
            <strong key={i} className="text-white font-semibold">
              {match[1]}
            </strong>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

export function Bio() {
  const t = useTranslations("Bio");
  const yearsCoding = new Date().getFullYear() - CODING_START_YEAR;

  return (
    <SectionWrapper id="about">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
            {t("title")}
          </h2>
          <p className="text-lg text-text-mute leading-relaxed max-w-2xl">
            <RichText text={t.raw("paragraph")} />
          </p>
        </div>

        <GlassCard className="space-y-5">
          <div>
            <p className="text-xs font-mono text-text-mute uppercase tracking-wider mb-1">
              {t("yearsCoding")}
            </p>
            <p className="text-2xl font-bold">{yearsCoding}+</p>
          </div>
          <div>
            <p className="text-xs font-mono text-text-mute uppercase tracking-wider mb-1">
              {t("languages")}
            </p>
            <p className="text-sm">
              🇫🇷 {t("fr")}
              <br />
              🇬🇧 {t("en")}
            </p>
          </div>
          <div>
            <p className="text-xs font-mono text-text-mute uppercase tracking-wider mb-1">
              {t("timezone")}
            </p>
            <p className="text-sm font-mono">{t("timezoneValue")}</p>
          </div>
          <div>
            <p className="text-xs font-mono text-text-mute uppercase tracking-wider mb-1">
              {t("currentProject")}
            </p>
            <p className="text-sm font-semibold gradient-text">{t("currentProjectValue")}</p>
          </div>
        </GlassCard>
      </div>
    </SectionWrapper>
  );
}
