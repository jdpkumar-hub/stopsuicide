import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { SiteShell } from "@/components/layout/SiteShell";
import { Providers } from "@/components/providers";
import { JsonLd, organizationSchema, websiteSchema } from "@/lib/schema-org";
import { defaultMetadata } from "@/lib/seo";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
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
  ],
  authors: [{ name: "stopsuicide.in" }],
  category: "health",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${plusJakarta.variable} ${fraunces.variable} font-sans antialiased`}>
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        <Providers>
          <SiteShell>{children}</SiteShell>
        </Providers>
      </body>
    </html>
  );
}
