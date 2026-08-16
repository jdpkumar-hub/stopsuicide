import { notFound } from "next/navigation";
import { QuoteForm } from "@/components/admin/QuoteForm";
import { requireAdmin } from "@/lib/admin";
import { canDeleteContent, canPublishContent } from "@/lib/cms/roles";
import { getAllQuotesAdmin } from "@/lib/data/queries";

export default async function EditQuotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [quotes, auth] = await Promise.all([getAllQuotesAdmin(), requireAdmin()]);
  const quote = quotes.find((item) => item.id === id);
  if (!quote) notFound();

  return (
    <div>
      <h1 className="mb-6 font-serif text-4xl">Edit quote</h1>
      <QuoteForm
        quote={quote}
        canDelete={canDeleteContent(auth.role)}
        canPublish={canPublishContent(auth.role)}
      />
    </div>
  );
}
