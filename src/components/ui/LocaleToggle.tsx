"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const locales = ["en", "fr"] as const;

export function LocaleToggle({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    if (newLocale === locale) return;
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className={cn("relative flex items-center glass rounded-full p-1", className)}>
      {locales.map((l) => (
        <button
          key={l}
          onClick={() => switchLocale(l)}
          className="relative z-10 px-3 py-1 text-xs font-mono uppercase transition-colors duration-200"
          style={{ color: locale === l ? "#ffffff" : "rgba(255,255,255,0.5)" }}
        >
          {l}
          {locale === l && (
            <motion.div
              layoutId="locale-indicator"
              className="absolute inset-0 bg-white/[0.1] rounded-full"
              transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
            />
          )}
        </button>
      ))}
    </div>
  );
}
