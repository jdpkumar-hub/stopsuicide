import { jsonError, requireAdmin } from "@/lib/admin";
import { videoCopy } from "@/lib/i18n/content";

const GLOSSARY: Array<[RegExp, string]> = [
  [/you are not alone/gi, "మీరు ఒంటరివారు కాదు"],
  [/hope/gi, "ఆశ"],
  [/life/gi, "జీవితం"],
  [/inspiration/gi, "ప్రేరణ"],
  [/happiness|joy/gi, "సంతోషం"],
  [/success/gi, "విజయం"],
  [/meditation/gi, "ధ్యానం"],
  [/help/gi, "సహాయం"],
  [/recovery/gi, "కోలుకోవడం"],
  [/your life is precious/gi, "మీ జీవితం అమూల్యం"],
];

function draftTelugu(text: string) {
  let next = text;
  for (const [pattern, replacement] of GLOSSARY) {
    next = next.replace(pattern, replacement);
  }
  return next;
}

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (auth.error) return jsonError(auth.error, auth.status);

  const body = await request.json();
  const title = String(body.title || "");
  const description = String(body.description || "");

  const known = Object.values(videoCopy).find(
    (item) => item.titles.en?.toLowerCase() === title.toLowerCase(),
  );

  if (known?.titles.te && known.descriptions.te) {
    return Response.json({
      title: known.titles.te,
      description: known.descriptions.te,
      source: "catalog",
      needsReview: false,
    });
  }

  const endpoint = process.env.TRANSLATE_API_URL;
  const key = process.env.TRANSLATE_API_KEY;
  if (endpoint && key) {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        q: [title, description],
        source: "en",
        target: "te",
      }),
    });
    if (response.ok) {
      const json = await response.json();
      const translated = json.translatedText || json.translations || json;
      return Response.json({
        title: Array.isArray(translated) ? translated[0] : title,
        description: Array.isArray(translated) ? translated[1] : description,
        source: "api",
        needsReview: true,
        note: "Draft translation — edit before publishing.",
      });
    }
  }

  return Response.json({
    title: draftTelugu(title),
    description: draftTelugu(description),
    source: "draft",
    needsReview: true,
    note: "Draft Telugu created for review. Edit before publishing. Add TRANSLATE_API_URL for live translation.",
  });
}
