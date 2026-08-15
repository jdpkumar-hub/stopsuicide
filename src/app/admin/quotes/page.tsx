import { DailyMotivationPanel } from "@/components/admin/DailyMotivationPanel";
import { ManagerForm } from "@/components/admin/ManagerForm";
import { Card } from "@/components/ui/primitives";
import { getQuotes } from "@/lib/data/queries";
import { getTodayStamp, listMotivations } from "@/lib/motivation/store";

export default async function QuotesPage() {
  const [quotes, motivations] = await Promise.all([getQuotes(), listMotivations()]);
  const today = getTodayStamp();

  return (
    <div>
      <h1 className="font-serif text-4xl">Quotes manager</h1>
      <p className="mt-2 text-sm text-muted">
        Approve the AI daily motivation before it appears on the homepage. Library quotes remain as fallbacks.
      </p>
      <div className="mt-6">
        <DailyMotivationPanel items={motivations} today={today} />
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="space-y-3">
          <h2 className="font-serif text-2xl">Quote library</h2>
          {quotes.map((quote) => (
            <Card key={quote.id} className="p-4">
              <p className="font-serif text-xl">“{quote.text}”</p>
              <p className="mt-2 text-sm text-muted">{quote.author}</p>
            </Card>
          ))}
        </div>
        <ManagerForm
          endpoint="/api/quotes"
          submitLabel="Add quote"
          fields={[
            { name: "text", label: "Quote (English)", textarea: true },
            { name: "textTe", label: "Quote (Telugu)", textarea: true, required: false, lang: "te" },
            { name: "textHi", label: "Quote (Hindi)", textarea: true, required: false, lang: "hi" },
            { name: "author", label: "Author" },
          ]}
        />
      </div>
    </div>
  );
}
