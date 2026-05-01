"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { TiltCard } from "@/components/ui/TiltCard";
import { RevealText } from "@/components/ui/RevealText";
import { GradientText } from "@/components/ui/GradientText";
import { Chip } from "@/components/ui/Chip";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ExternalLink } from "lucide-react";

const STACK = [
  "Next.js", "FastAPI", "AWS EC2", "Supabase",
  "Microsoft Graph", "Telegram", "Claude API", "Gemini", "Stripe",
];

export function VeloraFeatured() {
  const t = useTranslations("Velora");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <SectionWrapper id="velora">
      <div ref={ref}>
        <RevealText
          as="h2"
          className="text-4xl md:text-5xl font-bold mb-16 gradient-text text-center"
          wordByWord
        >
          {t("title")}
        </RevealText>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <TiltCard className="max-w-3xl mx-auto text-center space-y-6">
            <GradientText as="h3" className="text-5xl md:text-6xl font-bold">
              {t("name")}
            </GradientText>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ type: "spring", delay: 0.5 }}
            >
              <Chip pulse className="text-xs">{t("status")}</Chip>
            </motion.div>

            <p className="text-lg text-text-mute leading-relaxed max-w-xl mx-auto">
              {t("pitch")}
            </p>

            <div className="flex flex-wrap justify-center gap-2 pt-2">
              {STACK.map((s, i) => (
                <motion.span
                  key={s}
                  className="text-[10px] font-mono text-text-mute px-2 py-1 glass rounded hover:text-white hover:border-violet/30 transition-all cursor-default"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.7 + i * 0.05 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  {s}
                </motion.span>
              ))}
            </div>

            <div className="pt-4">
              <MagneticButton
                variant="primary"
                href="https://getvelora.info"
              >
                {t("cta")}
                <ExternalLink size={14} />
              </MagneticButton>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
