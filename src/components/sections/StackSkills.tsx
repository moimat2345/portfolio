"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Marquee } from "@/components/ui/Marquee";
import { TiltCard } from "@/components/ui/TiltCard";
import { RevealText } from "@/components/ui/RevealText";
import { MagneticIcon } from "@/components/ui/MagneticIcon";
import { STACK_ITEMS } from "@/lib/constants";

function StackIcon({ name }: { name: string }) {
  return (
    <MagneticIcon>
      <motion.div
        className="flex items-center gap-2 px-5 py-3 bg-zinc-900/90 backdrop-blur-md border border-white/[0.15] rounded-xl whitespace-nowrap group cursor-default transition-all duration-300 hover:border-violet/40 hover:bg-zinc-800/90"
        whileHover={{
          boxShadow: "0 0 30px rgba(139, 92, 246, 0.2), 0 0 60px rgba(139, 92, 246, 0.1)",
          borderColor: "rgba(139, 92, 246, 0.4)",
        }}
      >
        <span className="text-sm text-white group-hover:text-white transition-colors duration-300 group-hover:drop-shadow-[0_0_12px_rgba(139,92,246,0.8)]">
          {name}
        </span>
      </motion.div>
    </MagneticIcon>
  );
}

export function StackSkills() {
  const t = useTranslations("Stack");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  const row1 = [
    ...STACK_ITEMS.frontend,
    ...STACK_ITEMS.backend,
    ...STACK_ITEMS.ai,
  ];
  const row2 = [
    ...STACK_ITEMS.infra,
    ...STACK_ITEMS.auth,
    ...STACK_ITEMS.tools,
  ];

  return (
    <SectionWrapper id="stack">
      <div ref={ref}>
        <RevealText
          as="h2"
          className="text-4xl md:text-5xl font-bold mb-16 section-heading text-center"
          wordByWord
        >
          {t("title")}
        </RevealText>

        <motion.div
          className="space-y-6 mb-16"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Marquee>
            {row1.map((item) => (
              <StackIcon key={item.name} name={item.name} />
            ))}
          </Marquee>
          <Marquee reverse>
            {row2.map((item) => (
              <StackIcon key={item.name} name={item.name} />
            ))}
          </Marquee>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <TiltCard className="max-w-2xl mx-auto text-center" glareColor="rgba(6,182,212,0.12)">
            <RevealText
              as="p"
              className="text-text-mute text-lg leading-relaxed"
              delay={0.8}
            >
              {t("specialty")}
            </RevealText>
          </TiltCard>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
