"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { TiltCard } from "@/components/ui/TiltCard";
import { RevealText } from "@/components/ui/RevealText";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { TextScramble } from "@/components/ui/TextScramble";
import { CODING_START_YEAR } from "@/lib/constants";


export function Bio() {
  const t = useTranslations("Bio");
  const yearsCoding = Math.max(1, new Date().getFullYear() - CODING_START_YEAR);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <SectionWrapper id="about">
      <div ref={ref} className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 items-start">
        <div>
          <RevealText
            as="h2"
            className="text-4xl md:text-5xl font-bold mb-8 gradient-text"
            wordByWord
          >
            {t("title")}
          </RevealText>
          <RevealText
            as="p"
            className="text-lg text-text-mute leading-relaxed max-w-2xl"
            delay={0.3}
          >
            {t.raw("paragraph").replace(/<\/?strong>/g, "")}
          </RevealText>
        </div>

        <TiltCard className="space-y-6">
          {/* Years coding with animated counter */}
          <div data-animate>
            <p className="text-xs font-mono text-text-mute uppercase tracking-wider mb-1">
              <TextScramble text={t("yearsCoding")} trigger={isInView} delay={200} />
            </p>
            <p className="text-4xl font-bold gradient-text">
              <AnimatedCounter target={yearsCoding} suffix="+" trigger={isInView} />
            </p>
          </div>
          <div data-animate>
            <p className="text-xs font-mono text-text-mute uppercase tracking-wider mb-1">
              <TextScramble text={t("languages")} trigger={isInView} delay={400} />
            </p>
            <p className="text-sm">
              🇫🇷 {t("fr")}
              <br />
              🇬🇧 {t("en")}
              <br />
              🇩🇪 {t("de")}
            </p>
          </div>
          <div data-animate>
            <p className="text-xs font-mono text-text-mute uppercase tracking-wider mb-1">
              <TextScramble text={t("timezone")} trigger={isInView} delay={600} />
            </p>
            <p className="text-sm font-mono">{t("timezoneValue")}</p>
          </div>
          <div data-animate>
            <p className="text-xs font-mono text-text-mute uppercase tracking-wider mb-1">
              <TextScramble text={t("currentProject")} trigger={isInView} delay={800} />
            </p>
            <motion.p
              className="text-lg font-bold gradient-text"
              animate={isInView ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 0.6, delay: 1 }}
            >
              {t("currentProjectValue")}
            </motion.p>
          </div>
        </TiltCard>
      </div>
    </SectionWrapper>
  );
}
