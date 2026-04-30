"use client";

import { useTranslations } from "next-intl";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Marquee } from "@/components/ui/Marquee";
import { GlassCard } from "@/components/ui/GlassCard";
import { STACK_ITEMS } from "@/lib/constants";

function StackIcon({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 glass rounded-lg whitespace-nowrap group cursor-default transition-all duration-300 hover:border-violet/30">
      <span className="text-sm text-text-mute group-hover:text-white transition-colors duration-300 group-hover:drop-shadow-[0_0_8px_rgba(139,92,246,0.6)]">
        {name}
      </span>
    </div>
  );
}

export function StackSkills() {
  const t = useTranslations("Stack");

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
      <h2 className="text-3xl md:text-4xl font-bold mb-12 gradient-text text-center">
        {t("title")}
      </h2>

      <div className="space-y-4 mb-12">
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
      </div>

      <GlassCard className="max-w-2xl mx-auto text-center">
        <p className="text-text-mute text-lg leading-relaxed">
          {t("specialty")}
        </p>
      </GlassCard>
    </SectionWrapper>
  );
}
