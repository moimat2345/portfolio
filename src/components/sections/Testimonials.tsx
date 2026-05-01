"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { TiltCard } from "@/components/ui/TiltCard";
import { RevealText } from "@/components/ui/RevealText";
import { Quote } from "lucide-react";

export function Testimonials() {
  const t = useTranslations("Testimonials");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <SectionWrapper id="testimonials">
      <div ref={ref}>
        <RevealText
          as="h2"
          className="text-4xl md:text-5xl font-bold mb-16 gradient-text text-center"
          wordByWord
        >
          {t("title")}
        </RevealText>

        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* TODO: replace with real client quote from Velora */}
          <TiltCard className="text-center space-y-6">
            <div className="flex justify-center text-violet/40">
              <Quote size={32} />
            </div>

            <blockquote className="text-lg md:text-xl text-text-mute leading-relaxed italic">
              &ldquo;{t("quote")}&rdquo;
            </blockquote>

            <div className="flex items-center justify-center gap-2">
              <p className="text-sm font-medium">— {t("author")}</p>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-magenta/20 text-magenta border border-magenta/30">
                {t("placeholder")}
              </span>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
