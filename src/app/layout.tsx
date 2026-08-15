import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { SiteShell } from "@/components/layout/SiteShell";
import { Providers } from "@/components/providers";
import { JsonLd, organizationSchema, websiteSchema } from "@/lib/schema-org";
import { defaultMetadata } from "@/lib/seo";
import { LOCALE_META } from "@/lib/i18n/locales";
import { getRequestLocale } from "@/lib/i18n/request-locale";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  ...defaultMetadata,
  title: {
    default: "stopsuicide.in — You Are Not Alone",
    template: "%s | stopsuicide.in",
  },
  keywords: [
    "mental wellness",
    "hope",
    "recovery",
    "suicide prevention",
    "India helpline",
    "inspirational stories",
    "తెలుగు",
    "మీరు ఒంటరివారు కాదు",
    "మానసిక ఆరోగ్యం",
  ],
  authors: [{ name: "stopsuicide.in" }],
  category: "health",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getRequestLocale();
  const meta = LOCALE_META[locale];
  return (
    <html lang={meta.htmlLang} data-locale={locale} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {meta.fontHref ? (
          <link id="indic-font" rel="stylesheet" href={meta.fontHref} />
        ) : null}
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        <Providers>
          <SiteShell>{children}</SiteShell>
        </Providers>
      </body>
    </html>
  );
}
