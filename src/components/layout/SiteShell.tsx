import { Footer } from "@/components/layout/Footer";
import { GetHelp } from "@/components/layout/GetHelp";
import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/layout/PageTransition";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <PageTransition>{children}</PageTransition>
      </main>
      <GetHelp />
      <Footer />
      <a
        href="#get-help"
        className="fixed bottom-4 right-4 z-40 rounded-full bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-lg md:hidden"
      >
        Get Help
      </a>
    </>
  );
}
