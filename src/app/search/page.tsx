import { SearchContent } from "@/components/search/SearchContent";
import { searchAll } from "@/lib/data/queries";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Search",
  description: "Search inspirational videos, recovery stories, and mental wellness articles.",
  path: "/search",
  localeAware: true,
});

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const results = await searchAll(q);
  return <SearchContent q={q} results={results} />;
}
