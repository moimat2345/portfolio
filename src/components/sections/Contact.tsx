"use client";

import { useTranslations } from "next-intl";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { GradientText } from "@/components/ui/GradientText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { GitHubIcon, TwitterIcon, LinkedInIcon, TelegramIcon } from "@/components/ui/SocialIcons";
import { SITE } from "@/lib/constants";
import { Mail, Calendar, Download } from "lucide-react";

const socials = [
  { icon: GitHubIcon, href: `https://github.com/${SITE.github}`, label: "GitHub" },
  { icon: TwitterIcon, href: `https://x.com/${SITE.twitter}`, label: "X / Twitter" },
  { icon: LinkedInIcon, href: `https://linkedin.com/in/${SITE.linkedin}`, label: "LinkedIn" },
  { icon: TelegramIcon, href: `https://t.me/${SITE.telegram}`, label: "Telegram" },
];

export function Contact() {
  const t = useTranslations("Contact");

  return (
    <SectionWrapper id="contact" className="text-center">
      <GradientText
        as="h2"
        className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-3xl mx-auto mb-12"
      >
        {t("headline")}
      </GradientText>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
        <MagneticButton
          variant="primary"
          href={`mailto:${SITE.email}`}
        >
          <Mail size={16} />
          {t("ctaEmail")}
        </MagneticButton>
        <MagneticButton
          variant="secondary"
          href={`https://cal.com/${SITE.calcom}`}
        >
          <Calendar size={16} />
          {t("ctaCal")}
        </MagneticButton>
        <MagneticButton
          variant="ghost"
          href="/cv-mateo-nuskovski.pdf"
          download
        >
          <Download size={16} />
          {t("ctaCv")}
        </MagneticButton>
      </div>

      <div className="flex items-center justify-center gap-6">
        {socials.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="text-text-mute hover:text-white transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]"
          >
            <Icon size={24} />
          </a>
        ))}
      </div>
    </SectionWrapper>
  );
}
