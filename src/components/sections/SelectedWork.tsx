"use client";

import { useTranslations } from "next-intl";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { MockBrowserFrame } from "@/components/ui/MockBrowserFrame";
import { Chip } from "@/components/ui/Chip";
import { GradientText } from "@/components/ui/GradientText";

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
  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
        reverse ? "lg:[&>:first-child]:order-2" : ""
      }`}
    >
      <MockBrowserFrame url={url}>
        <div className="flex items-center justify-center h-full bg-gradient-to-br from-violet/10 via-bg to-cyan/10 p-8">
          <GradientText as="span" className="text-4xl font-bold">
            {name}
          </GradientText>
        </div>
      </MockBrowserFrame>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h3 className="text-2xl font-bold">{name}</h3>
          <Chip className="text-[10px]">{tag}</Chip>
        </div>
        <p className="text-lg text-text-mute italic">{subtitle}</p>

        <div className="space-y-3">
          <div>
            <p className="text-xs font-mono text-text-mute uppercase tracking-wider mb-1">Problem</p>
            <p className="text-sm text-text-mute leading-relaxed">{problem}</p>
          </div>
          <div>
            <p className="text-xs font-mono text-text-mute uppercase tracking-wider mb-1">Solution</p>
            <p className="text-sm text-text-mute leading-relaxed">{solution}</p>
          </div>
        </div>

        {metrics && (
          <div className="flex flex-wrap gap-2 pt-2">
            {metrics.map((m) => (
              <Chip key={m} className="bg-violet/10 border-violet/20 text-white">
                {m}
              </Chip>
            ))}
          </div>
        )}

        {stack && (
          <div className="flex flex-wrap gap-2 pt-1">
            {stack.map((s) => (
              <span key={s} className="text-[10px] font-mono text-text-mute px-2 py-1 glass rounded">
                {s}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function SelectedWork() {
  const t = useTranslations("Work");

  return (
    <SectionWrapper id="work">
      <h2 className="text-3xl md:text-4xl font-bold mb-16 gradient-text text-center">
        {t("title")}
      </h2>

      <div className="space-y-24">
        <ProjectCard
          name={t("velora.name")}
          tag={t("velora.tag")}
          subtitle={t("velora.subtitle")}
          problem={t("velora.problem")}
          solution={t("velora.solution")}
          metrics={[t("velora.metric1"), t("velora.metric2"), t("velora.metric3")]}
          stack={[
            "Next.js",
            "FastAPI",
            "AWS EC2",
            "Supabase",
            "Microsoft Graph",
            "Telegram",
            "Claude API",
            "Gemini",
            "Stripe",
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
