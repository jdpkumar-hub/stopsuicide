"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  CONTRAST_STORAGE,
  DEFAULT_LOCALE,
  isLocale,
  LOCALE_COOKIE,
  LOCALE_META,
  LOCALE_STORAGE,
  type Locale,
} from "@/lib/i18n/locales";
import { getCachedMessages, loadMessages } from "@/lib/i18n/load-messages";
import { en, type MessageKey, type Messages } from "@/lib/i18n/messages/en";

type I18nValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: MessageKey) => string;
  highContrast: boolean;
  setHighContrast: (value: boolean) => void;
  ready: boolean;
};

const I18nContext = createContext<I18nValue | null>(null);

function persistLocale(locale: Locale) {
  window.localStorage.setItem(LOCALE_STORAGE, locale);
  document.cookie = `${LOCALE_COOKIE}=${locale};path=/;max-age=31536000;samesite=lax`;
}

function applyDocument(locale: Locale, highContrast: boolean) {
  const meta = LOCALE_META[locale];
  document.documentElement.lang = meta.htmlLang;
  document.documentElement.dir = meta.dir;
  document.documentElement.dataset.locale = locale;
  document.documentElement.dataset.contrast = highContrast ? "high" : "normal";
  let link = document.getElementById("indic-font") as HTMLLinkElement | null;
  if (meta.fontHref) {
    if (!link) {
      link = document.createElement("link");
      link.id = "indic-font";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
    if (link.href !== meta.fontHref) link.href = meta.fontHref;
  } else if (link) {
    link.remove();
  }
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [messages, setMessages] = useState<Messages>(en);
  const [highContrast, setHighContrastState] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(LOCALE_STORAGE);
    const params = new URLSearchParams(window.location.search).get("lang");
    const next = isLocale(params) ? params : isLocale(saved) ? saved : DEFAULT_LOCALE;
    const contrast = window.localStorage.getItem(CONTRAST_STORAGE) === "high";
    setHighContrastState(contrast);
    persistLocale(next);
    applyDocument(next, contrast);
    loadMessages(next).then((loaded) => {
      setLocaleState(next);
      setMessages(loaded);
      setReady(true);
    });
  }, []);

  const setLocale = useCallback((next: Locale) => {
    persistLocale(next);
    applyDocument(next, highContrast);
    setLocaleState(next);
    setMessages(getCachedMessages(next));
    void loadMessages(next).then(setMessages);
  }, [highContrast]);

  const setHighContrast = useCallback(
    (value: boolean) => {
      setHighContrastState(value);
      window.localStorage.setItem(CONTRAST_STORAGE, value ? "high" : "normal");
      applyDocument(locale, value);
    },
    [locale],
  );

  const t = useCallback(
    (key: MessageKey) => messages[key] ?? en[key],
    [messages],
  );

  const value = useMemo(
    () => ({ locale, setLocale, t, highContrast, setHighContrast, ready }),
    [locale, setLocale, t, highContrast, setHighContrast, ready],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
