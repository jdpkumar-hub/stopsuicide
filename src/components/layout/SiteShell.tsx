import { FloatingHelp, SkipLink } from "@/components/a11y/SkipLink";
import { InspirationBanner } from "@/components/home/InspirationBanner";
import { Footer } from "@/components/layout/Footer";
import { GetHelp } from "@/components/layout/GetHelp";
import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/layout/PageTransition";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SkipLink />
      <Header />
      <InspirationBanner />
      <main id="main">
        <PageTransition>{children}</PageTransition>
      </main>
      <GetHelp />
      <Footer />
      <FloatingHelp />
    </>
  );
}
