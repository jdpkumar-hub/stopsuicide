import { ManagerForm } from "@/components/admin/ManagerForm";
import { Card } from "@/components/ui/primitives";
import { getQuotes } from "@/lib/data/queries";

export default async function QuotesPage() {
  const quotes = await getQuotes();
  return (
    <div>
      <h1 className="font-serif text-4xl">Quotes manager</h1>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="space-y-3">
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
            { name: "text", label: "Quote", textarea: true },
            { name: "textHi", label: "Quote (Hindi)", textarea: true },
            { name: "author", label: "Author" },
          ]}
        />
      </div>
    </div>
  );
}
