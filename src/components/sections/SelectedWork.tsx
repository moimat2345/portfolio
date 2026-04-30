"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { TiltCard } from "@/components/ui/TiltCard";
import { MockBrowserFrame } from "@/components/ui/MockBrowserFrame";
import { Chip } from "@/components/ui/Chip";
import { GradientText } from "@/components/ui/GradientText";
import { RevealText } from "@/components/ui/RevealText";
import { TextScramble } from "@/components/ui/TextScramble";

function ProjectCard({
  name,
  tag,
  subtitle,
  problem,
  solution,
  metrics,
  stack,
  url,
  reverse,
}: {
  name: string;
  tag: string;
  subtitle: string;
  problem: string;
  solution: string;
  metrics?: string[];
  stack?: string[];
  url?: string;
  reverse?: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <div
      ref={ref}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
        reverse ? "lg:[&>:first-child]:order-2" : ""
      }`}
    >
      <motion.div
        ref={scrollRef}
        initial={{ opacity: 0, x: reverse ? 60 : -60, rotateY: reverse ? -10 : 10 }}
        animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ y: imageY }}
      >
        <TiltCard className="p-0 overflow-hidden" glareColor="rgba(236,72,153,0.12)">
          <MockBrowserFrame url={url}>
            <div className="flex items-center justify-center h-full bg-gradient-to-br from-violet/10 via-bg to-cyan/10 p-12">
              <motion.div
                animate={isInView ? { scale: [0.8, 1.05, 1], opacity: [0, 1] } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <GradientText as="span" className="text-5xl font-bold">
                  {name}
                </GradientText>
              </motion.div>
            </div>
          </MockBrowserFrame>
        </TiltCard>
      </motion.div>

      <motion.div
        className="space-y-5"
        initial={{ opacity: 0, x: reverse ? -40 : 40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <div className="flex items-center gap-3">
          <TextScramble
            as="h3"
            text={name}
            className="text-3xl font-bold !font-sans"
            trigger={isInView}
            delay={300}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ type: "spring", delay: 0.5 }}
          >
            <Chip className="text-[10px]">{tag}</Chip>
          </motion.div>
        </div>

        <RevealText as="p" className="text-lg text-text-mute italic" delay={0.3}>
          {subtitle}
        </RevealText>

        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
          >
            <p className="text-xs font-mono text-violet uppercase tracking-wider mb-1">Problem</p>
            <p className="text-sm text-text-mute leading-relaxed">{problem}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.65 }}
          >
            <p className="text-xs font-mono text-cyan uppercase tracking-wider mb-1">Solution</p>
            <p className="text-sm text-text-mute leading-relaxed">{solution}</p>
          </motion.div>
        </div>

        {metrics && (
          <div className="flex flex-wrap gap-2 pt-2">
            {metrics.map((m, i) => (
              <motion.div
                key={m}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ type: "spring", delay: 0.8 + i * 0.1 }}
              >
                <Chip className="bg-violet/10 border-violet/20 text-white hover:bg-violet/20 transition-colors cursor-default">
                  {m}
                </Chip>
              </motion.div>
            ))}
          </div>
        )}

        {stack && (
          <div className="flex flex-wrap gap-2 pt-1">
            {stack.map((s, i) => (
              <motion.span
                key={s}
                className="text-[10px] font-mono text-text-mute px-2 py-1 glass rounded hover:text-white hover:border-violet/30 transition-all cursor-default"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 1 + i * 0.05 }}
                whileHover={{ scale: 1.1, y: -2 }}
              >
                {s}
              </motion.span>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

export function SelectedWork() {
  const t = useTranslations("Work");

  return (
    <SectionWrapper id="work">
      <RevealText
        as="h2"
        className="text-4xl md:text-5xl font-bold mb-20 gradient-text text-center"
        wordByWord
      >
        {t("title")}
      </RevealText>

      <div className="space-y-32">
        <ProjectCard

          name={t("velora.name")}
          tag={t("velora.tag")}
          subtitle={t("velora.subtitle")}
          problem={t("velora.problem")}
          solution={t("velora.solution")}
          metrics={[t("velora.metric1"), t("velora.metric2"), t("velora.metric3")]}
          stack={[
            "Next.js", "FastAPI", "AWS EC2", "Supabase",
            "Microsoft Graph", "Telegram", "Claude API", "Gemini", "Stripe",
          ]}
          url="velora.app"
        />

        <ProjectCard

          name={t("tooling.name")}
          tag={t("tooling.tag")}
          subtitle={t("tooling.subtitle")}
          problem={t("tooling.problem")}
          solution={t("tooling.solution")}
          stack={["Claude API", "Python", "AWS EC2", "Telegram"]}
          url="github.com/moimat2345"
          reverse
        />
      </div>
    </SectionWrapper>
  );
}
