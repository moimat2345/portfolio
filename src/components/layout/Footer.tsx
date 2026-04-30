"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { LocaleToggle } from "@/components/ui/LocaleToggle";
import { MagneticIcon } from "@/components/ui/MagneticIcon";
import { GitHubIcon, TwitterIcon, LinkedInIcon, TelegramIcon } from "@/components/ui/SocialIcons";
import { SITE } from "@/lib/constants";

const socials = [
  { icon: GitHubIcon, href: `https://github.com/${SITE.github}`, label: "GitHub" },
  { icon: TwitterIcon, href: `https://x.com/${SITE.twitter}`, label: "X / Twitter" },
  { icon: LinkedInIcon, href: `https://linkedin.com/in/${SITE.linkedin}`, label: "LinkedIn" },
  { icon: TelegramIcon, href: `https://t.me/${SITE.telegram}`, label: "Telegram" },
];

export function Footer() {
  const t = useTranslations("Footer");
  const year = new Date().getFullYear();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <footer ref={ref} className="border-t border-white/[0.06] py-8 px-6 md:px-12">
      <motion.div
        className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 text-xs text-text-mute">
          <span>{t("copyright", { year })}</span>
          <span className="hidden md:inline">·</span>
          <span className="hidden md:inline">{t("builtWith")}</span>
        </div>

        <div className="flex items-center gap-5">
          {socials.map(({ icon: Icon, href, label }) => (
            <MagneticIcon key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-text-mute hover:text-white transition-colors duration-200"
              >
                <Icon size={16} />
              </a>
            </MagneticIcon>
          ))}
          <LocaleToggle />
        </div>
      </motion.div>
    </footer>
  );
}
