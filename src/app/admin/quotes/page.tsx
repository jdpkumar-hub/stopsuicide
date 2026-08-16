import { DailyMotivationPanel } from "@/components/admin/DailyMotivationPanel";
import { QuoteForm } from "@/components/admin/QuoteForm";
import { QuoteManager } from "@/components/admin/QuoteManager";
import { requireAdmin } from "@/lib/admin";
import { canDeleteContent, canPublishContent } from "@/lib/cms/roles";
import { getAllQuotesAdmin } from "@/lib/data/queries";
import { getTodayStamp, listMotivations } from "@/lib/motivation/store";

export default async function QuotesPage() {
  const [quotes, motivations, auth] = await Promise.all([
    getAllQuotesAdmin(),
    listMotivations(),
    requireAdmin(),
  ]);
  const today = getTodayStamp();

  return (
    <div>
      <h1 className="font-serif text-4xl">Quotes</h1>
      <p className="mt-2 text-sm text-muted">
        Approve AI daily motivation first. Featured or scheduled library quotes appear on the homepage when no approved motivation exists.
      </p>
      <div className="mt-6">
        <DailyMotivationPanel items={motivations} today={today} />
      </div>
      <div className="mt-8">
        <h2 className="mb-4 font-serif text-2xl">Quote library</h2>
        <QuoteManager quotes={quotes} />
      </div>
      <div className="mt-8">
        <h2 className="mb-4 font-serif text-2xl">Add quote</h2>
        <QuoteForm canDelete={canDeleteContent(auth.role)} canPublish={canPublishContent(auth.role)} />
      </div>
    </div>
  );
}
