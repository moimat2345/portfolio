"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { MagneticIcon } from "@/components/ui/MagneticIcon";
import { RevealText } from "@/components/ui/RevealText";
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <SectionWrapper id="contact" className="text-center">
      <div ref={ref}>
        <RevealText
          as="h2"
          className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight max-w-4xl mx-auto mb-16 gradient-text"
          wordByWord
        >
          {t("headline")}
        </RevealText>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <MagneticButton variant="primary" href={`mailto:${SITE.email}`}>
            <Mail size={16} />
            {t("ctaEmail")}
          </MagneticButton>
          <MagneticButton variant="secondary" href={`https://cal.com/${SITE.calcom}`}>
            <Calendar size={16} />
            {t("ctaCal")}
          </MagneticButton>
          <MagneticButton variant="ghost" href="/cv-mateo-nuskovski.pdf" download>
            <Download size={16} />
            {t("ctaCv")}
          </MagneticButton>
        </motion.div>

        <div className="flex items-center justify-center gap-8">
          {socials.map(({ icon: Icon, href, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 + i * 0.1, type: "spring" }}
            >
              <MagneticIcon>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="block text-text-mute hover:text-white transition-all duration-300 hover:drop-shadow-[0_0_12px_rgba(139,92,246,0.6)]"
                >
                  <Icon size={28} />
                </a>
              </MagneticIcon>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
