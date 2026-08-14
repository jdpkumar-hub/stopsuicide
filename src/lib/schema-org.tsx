import { DEFAULT_SETTINGS, SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
import { siteUrl } from "@/lib/utils";
import type { Article, Story, Video } from "@/types";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: SITE_NAME,
    url: siteUrl(),
    email: DEFAULT_SETTINGS.contactEmail,
    slogan: SITE_TAGLINE,
    description:
      "Hope, resilience, recovery, and mental wellness through stories, videos, and education.",
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: siteUrl(),
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl()}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function videoSchema(video: Video) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description: video.description,
    thumbnailUrl: video.thumbnailUrl,
    uploadDate: video.publishedAt,
    duration: `PT${Math.floor(video.durationSeconds / 60)}M${video.durationSeconds % 60}S`,
  };
}

export function articleSchema(item: Article | Story, kind: "Article" | "NewsArticle" = "Article") {
  return {
    "@context": "https://schema.org",
    "@type": kind,
    headline: item.title,
    description: "excerpt" in item ? item.excerpt : "",
    datePublished: item.publishedAt,
    image: item.thumbnailUrl,
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
