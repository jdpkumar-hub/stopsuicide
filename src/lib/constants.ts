import type { CrisisResource, SiteSettings } from "@/types";

export const SITE_NAME = "stopsuicide.in";
export const SITE_TAGLINE = "You Are Not Alone";

export const NAV_LINKS = [
  { href: "/", labelKey: "nav.home" as const },
  { href: "/videos", labelKey: "nav.videos" as const },
  { href: "/stories", labelKey: "nav.stories" as const },
  { href: "/blog", labelKey: "nav.blog" as const },
  { href: "/resources", labelKey: "nav.resources" as const },
  { href: "/about", labelKey: "nav.about" as const },
  { href: "/contact", labelKey: "nav.contact" as const },
];

export const DEFAULT_SETTINGS: SiteSettings = {
  siteName: SITE_NAME,
  tagline: SITE_TAGLINE,
  contactEmail: "hello@stopsuicide.in",
  social: {
    instagram: "https://instagram.com/stopsuicide.in",
    youtube: "https://youtube.com/@stopsuicide",
    twitter: "https://x.com/stopsuicide_in",
    facebook: "https://facebook.com/stopsuicide.in",
  },
};

export const CRISIS_RESOURCES: CrisisResource[] = [
  {
    id: "tele-manas",
    name: "Tele-MANAS",
    description: "24/7 government mental health support across India.",
    phone: "14416",
    hours: "24/7",
    url: "https://telemanas.mohfw.gov.in",
    region: "india",
  },
  {
    id: "kiran",
    name: "KIRAN Helpline",
    description: "National mental health rehabilitation helpline.",
    phone: "1800-599-0019",
    hours: "24/7",
    region: "india",
  },
  {
    id: "icall",
    name: "iCall (TISS)",
    description: "Psychosocial counselling by trained professionals.",
    phone: "9152987821",
    hours: "Mon–Sat, 8am–10pm IST",
    url: "https://icallhelpline.org",
    region: "india",
  },
  {
    id: "aasra",
    name: "AASRA",
    description: "Emotional support for people in distress.",
    phone: "+91 98204 66726",
    hours: "24/7",
    url: "https://www.aasra.info",
    region: "india",
  },
  {
    id: "vandrevala",
    name: "Vandrevala Foundation",
    description: "Confidential mental health support in multiple languages.",
    phone: "+91 9999 666 555",
    hours: "24/7",
    url: "https://www.vandrevalafoundation.com",
    region: "india",
  },
  {
    id: "iasp",
    name: "IASP resources",
    description: "Find local support anywhere in the world.",
    url: "https://www.iasp.info/suicidalthoughts/",
    region: "international",
  },
  {
    id: "988",
    name: "988 Suicide & Crisis Lifeline",
    description: "For people in the United States.",
    phone: "988",
    hours: "24/7",
    url: "https://988lifeline.org",
    region: "international",
  },
];

export const HERO_VIDEO =
  "https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4";

export const LOCALES = [
  { code: "en" as const, label: "English" },
  { code: "hi" as const, label: "हिन्दी" },
];
