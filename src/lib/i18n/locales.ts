export const LOCALES = ["en", "te", "hi", "ta", "kn", "ml"] as const;

export type Locale = (typeof LOCALES)[number];

export type TranslationMap = Partial<Record<Locale, string>>;

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_COOKIE = "ss_locale";
export const LOCALE_STORAGE = "stopsuicide-locale";
export const CONTRAST_STORAGE = "stopsuicide-contrast";

export const LOCALE_META: Record<
  Locale,
  {
    nativeName: string;
    englishName: string;
    htmlLang: string;
    hreflang: string;
    ogLocale: string;
    tts: string;
    fontFamily: string;
    fontHref: string;
    dir: "ltr";
  }
> = {
  en: {
    nativeName: "English",
    englishName: "English",
    htmlLang: "en",
    hreflang: "en",
    ogLocale: "en_IN",
    tts: "en-IN",
    fontFamily: 'var(--font-inter), Inter, ui-sans-serif, sans-serif',
    fontHref: "",
    dir: "ltr",
  },
  te: {
    nativeName: "తెలుగు",
    englishName: "Telugu",
    htmlLang: "te",
    hreflang: "te",
    ogLocale: "te_IN",
    tts: "te-IN",
    fontFamily: '"Noto Sans Telugu", "Noto Sans", sans-serif',
    fontHref:
      "https://fonts.googleapis.com/css2?family=Noto+Sans+Telugu:wght@400;500;600;700&display=swap",
    dir: "ltr",
  },
  hi: {
    nativeName: "हिन्दी",
    englishName: "Hindi",
    htmlLang: "hi",
    hreflang: "hi",
    ogLocale: "hi_IN",
    tts: "hi-IN",
    fontFamily: '"Noto Sans Devanagari", "Noto Sans", sans-serif',
    fontHref:
      "https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700&family=Noto+Serif+Devanagari:wght@500;600;700&display=swap",
    dir: "ltr",
  },
  ta: {
    nativeName: "தமிழ்",
    englishName: "Tamil",
    htmlLang: "ta",
    hreflang: "ta",
    ogLocale: "ta_IN",
    tts: "ta-IN",
    fontFamily: '"Noto Sans Tamil", "Noto Sans", sans-serif',
    fontHref:
      "https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@400;500;600;700&family=Noto+Serif+Tamil:wght@500;600;700&display=swap",
    dir: "ltr",
  },
  kn: {
    nativeName: "ಕನ್ನಡ",
    englishName: "Kannada",
    htmlLang: "kn",
    hreflang: "kn",
    ogLocale: "kn_IN",
    tts: "kn-IN",
    fontFamily: '"Noto Sans Kannada", "Noto Sans", sans-serif',
    fontHref:
      "https://fonts.googleapis.com/css2?family=Noto+Sans+Kannada:wght@400;500;600;700&family=Noto+Serif+Kannada:wght@500;600;700&display=swap",
    dir: "ltr",
  },
  ml: {
    nativeName: "മലയാളം",
    englishName: "Malayalam",
    htmlLang: "ml",
    hreflang: "ml",
    ogLocale: "ml_IN",
    tts: "ml-IN",
    fontFamily: '"Noto Sans Malayalam", "Noto Sans", sans-serif',
    fontHref:
      "https://fonts.googleapis.com/css2?family=Noto+Sans+Malayalam:wght@400;500;600;700&family=Noto+Serif+Malayalam:wght@500;600;700&display=swap",
    dir: "ltr",
  },
};

export function isLocale(value: string | null | undefined): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}

export function pickLocalized(
  locale: Locale,
  map: TranslationMap | undefined,
  fallback: string,
) {
  return map?.[locale] || map?.en || fallback;
}

export function unicodeNormalize(value: string) {
  return value.normalize("NFC").toLowerCase();
}
