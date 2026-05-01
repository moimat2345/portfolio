"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { TiltCard } from "@/components/ui/TiltCard";
import { RevealText } from "@/components/ui/RevealText";
import { Phone, FileSearch, Code, Rocket } from "lucide-react";

const STEP_ICONS = [Phone, FileSearch, Code, Rocket];

export function Process() {
  const t = useTranslations("Process");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  const steps = [
    { key: "step1", icon: STEP_ICONS[0] },
    { key: "step2", icon: STEP_ICONS[1] },
    { key: "step3", icon: STEP_ICONS[2] },
    { key: "step4", icon: STEP_ICONS[3] },
  ] as const;

  return (
    <SectionWrapper id="process">
      <div ref={ref}>
        <RevealText
          as="h2"
          className="text-4xl md:text-5xl font-bold mb-16 gradient-text text-center"
          wordByWord
          halo
        >
          {t("title")}
        </RevealText>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map(({ key, icon: Icon }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * i, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <TiltCard className="h-full text-center space-y-4">
                {/* Step number */}
                <div className="flex items-center justify-center">
                  <span className="w-10 h-10 rounded-full bg-gradient-to-br from-violet to-cyan flex items-center justify-center text-sm font-bold">
                    {i + 1}
                  </span>
                </div>

                {/* Icon */}
                <div className="flex justify-center text-text-mute">
                  <Icon size={24} />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold">{t(`${key}.title`)}</h3>

                {/* Duration */}
                <p className="text-xs font-mono text-violet">{t(`${key}.duration`)}</p>

                {/* Description */}
                <p className="text-sm text-text-mute leading-relaxed">
                  {t(`${key}.description`)}
                </p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
