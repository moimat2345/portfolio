import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { geistSans, geistMono } from "@/lib/fonts";
import { Providers } from "@/components/providers/Providers";
import { SITE } from "@/lib/constants";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = await params;
  const isEN = locale === "en";

  const title = SITE.title;
  const description = isEN
    ? "Solo founder building Velora, an AI-native CRM for B2B operators. Based in Bangkok."
    : "Solo founder, je construis Velora, un CRM IA natif pour opérateurs B2B. Basé à Bangkok.";

  return {
    title,
    description,
    metadataBase: new URL(SITE.url),
    alternates: {
      canonical: isEN ? "/" : `/${locale}`,
      languages: {
        en: "/",
        fr: "/fr",
      },
    },
    openGraph: {
      title,
      description,
      url: SITE.url,
      siteName: SITE.name,
      type: "website",
      locale: isEN ? "en_US" : "fr_FR",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: `@${SITE.twitter}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "fr")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-bg text-text-primary`}
      >
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <a href="#main" className="skip-to-content">
              Skip to content
            </a>
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
