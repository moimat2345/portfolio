"use client";

import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { LocaleToggle } from "@/components/ui/LocaleToggle";
import { NAV_LINKS } from "@/lib/constants";
import { Download } from "lucide-react";

export function Header() {
  const t = useTranslations("Nav");
  const { direction, scrollY } = useScrollDirection();
  const isScrolled = scrollY > 50;
  const isHidden = direction === "down" && scrollY > 200;

  const navLabels: Record<string, string> = {
    About: t("about"),
    Stack: t("stack"),
    GitHub: t("github"),
    Work: t("work"),
    Process: t("process"),
    Contact: t("contact"),
  };

  return (
    <AnimatePresence>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-zinc-950/80 backdrop-blur-xl border-b border-white/[0.06] py-3"
            : "bg-black/30 backdrop-blur-sm py-5"
        )}
        initial={{ y: 0 }}
        animate={{ y: isHidden ? -100 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <nav className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <a
            href="#"
            className="text-lg font-bold tracking-tight text-white text-shadow"
          >
            MN
          </a>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-zinc-300 hover:text-white transition-colors duration-200 text-shadow"
              >
                {navLabels[link.label] || link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/cv-mateo-nuskovski.pdf"
              download
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-zinc-300 hover:text-white transition-colors text-shadow"
            >
              <Download size={14} />
              {t("downloadCv")}
            </a>
            <LocaleToggle />
          </div>
        </nav>
      </motion.header>
    </AnimatePresence>
  );
}
