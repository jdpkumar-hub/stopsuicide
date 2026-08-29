import { names } from "@/lib/i18n/content";
import type { Category, Story, TranslationMap } from "@/types";

export type FeaturedHeroStory = {
  id: string;
  title: string;
  titles?: TranslationMap;
  shortDescription: string;
  shortDescriptions?: TranslationMap;
  category: string;
  categories?: TranslationMap;
  image: string;
  href: string;
};

/**
 * Demo featured stories for the home hero.
 * When 4+ CMS stories are marked featured, those records replace this list
 * without changing the carousel component.
 */
export const FEATURED_HERO_PLACEHOLDERS: FeaturedHeroStory[] = [
  {
    id: "featured-1",
    title: "A New Beginning",
    titles: names(
      "A New Beginning",
      "కొత్త మొదలు",
      "एक नई शुरुआत",
      "ஒரு புதிய தொடக்கம்",
      "ಹೊಸ ಆರಂಭ",
      "ഒരു പുതിയ തുടക്കം",
    ),
    shortDescription:
      "After the hardest season, ordinary days can return: morning light, a friend’s message, and the choice to stay.",
    shortDescriptions: names(
      "After the hardest season, ordinary days can return: morning light, a friend’s message, and the choice to stay.",
      "కష్టమైన కాలం తర్వాత సాధారణ రోజులు తిరిగి రావచ్చు: ఉదయపు వెలుగు, స్నేహితుని సందేశం, నిలబడే నిర్ణయం.",
      "सबसे कठिन मौसम के बाद साधारण दिन लौट सकते हैं: सुबह की रोशनी, एक संदेश, और रुकने का निर्णय।",
      "கடினமான காலத்திற்குப் பிறகு சாதாரண நாட்கள் திரும்பலாம்: காலை வெளிச்சம், ஒரு செய்தி, நிற்கும் முடிவு.",
      "ಕಷ್ಟದ ಋತುವಿನ ನಂತರ ಸಾಮಾನ್ಯ ದಿನಗಳು ಹಿಂದಿರುಗಬಹುದು: ಬೆಳಗಿನ ಬೆಳಕು, ಸಂದೇಶ, ನಿಲ್ಲುವ ನಿರ್ಧಾರ.",
      "കഠിനമായ കാലത്തിന് ശേഷം സാധാരണ ദിനങ്ങൾ മടങ്ങാം: പ്രഭാത വെളിച്ചം, ഒരു സന്ദേശം, നിൽക്കാനുള്ള തീരുമാനം.",
    ),
    category: "Recovery",
    categories: names("Recovery", "కోలుకోవడం", "रिकवरी", "மீட்பு", "ಚೇತರಿಕೆ", "കരകയറ്റം"),
    image: "/images/stories/a-new-beginning.jpg",
    href: "/stories/ananya-learning-to-stay",
  },
  {
    id: "featured-2",
    title: "Finding My Strength",
    titles: names(
      "Finding My Strength",
      "నా బలాన్ని కనుగొనడం",
      "अपनी शक्ति पाना",
      "என் வலிமையைக் கண்டறிதல்",
      "ನನ್ನ ಶಕ್ತಿಯನ್ನು ಕಂಡುಕೊಳ್ಳುವುದು",
      "എന്റെ ശക്തി കണ്ടെത്തൽ",
    ),
    shortDescription:
      "Strength did not arrive all at once. It grew in small acts of asking for help and taking the next step.",
    shortDescriptions: names(
      "Strength did not arrive all at once. It grew in small acts of asking for help and taking the next step.",
      "బలం ఒక్కసారిగా రాలేదు. సహాయం అడగడం, మరో అడుగు వేయడం — ఆ చిన్న పనుల్లో పెరిగింది.",
      "शक्ति एक साथ नहीं आई। मदद माँगने और अगला कदम बढ़ाने से वह धीरे-धीरे बढ़ी।",
      "வலிமை ஒரே நேரத்தில் வரவில்லை. உதவி கேட்பதும் அடுத்த அடியும் அதை வளர்த்தன.",
      "ಶಕ್ತಿ ಒಮ್ಮೆಲೇ ಬರಲಿಲ್ಲ. ಸಹಾಯ ಕೇಳುವುದು ಮತ್ತು ಮುಂದಿನ ಹೆಜ್ಜೆ ಇಡುವುದರಿಂದ ಬೆಳೆಯಿತು.",
      "ശക്തി ഒറ്റയടിക്ക് വന്നില്ല. സഹായം ചോദിക്കലും അടുത്ത അടിയും അത് വളർത്തി.",
    ),
    category: "Resilience",
    categories: names("Resilience", "స్థిరత్వం", "लचीलापन", "மீள்திறன்", "ಸ್ಥಿತಿಸ್ಥಾಪಕತ್ವ", "സ്ഥിരത"),
    image: "/images/stories/finding-my-strength.jpg",
    href: "/stories/ravi-and-the-kitchen-light",
  },
  {
    id: "featured-3",
    title: "One Step Forward",
    titles: names(
      "One Step Forward",
      "ఒక అడుగు ముందుకు",
      "एक कदम आगे",
      "ஒரு அடி முன்னே",
      "ಒಂದು ಹೆಜ್ಜೆ ಮುಂದೆ",
      "ഒരു അടി മുന്നോട്ട്",
    ),
    shortDescription:
      "Healing is not a straight line. One honest conversation can open a path that felt closed.",
    shortDescriptions: names(
      "Healing is not a straight line. One honest conversation can open a path that felt closed.",
      "కోలుకోవడం సరళరేఖ కాదు. ఒక నిజాయితీ సంభాషణ మూసుకుపోయిన దారిని తెరవగలదు.",
      "उपचार सीधी रेखा नहीं है। एक ईमानदार बातचीत बंद लगा रास्ता खोल सकती है।",
      "குணமடைதல் நேர்க்கோடு அல்ல. ஒரு நேர்மையான உரையாடல் மூடிய பாதையைத் திறக்கும்.",
      "ಗುಣಮುಖವಾಗುವುದು ನೇರ ರೇಖೆ ಅಲ್ಲ. ಒಂದು ಪ್ರಾಮಾಣಿಕ ಮಾತು ಮುಚ್ಚಿದ ದಾರಿ ತೆರೆಯಬಹುದು.",
      "കോളുക്കൽ നേർരേഖയല്ല. ഒരു സത്യസന്ധ സംഭാഷണം അടഞ്ഞ വഴി തുറക്കാം.",
    ),
    category: "Hope",
    categories: names("Hope", "ఆశ", "आशा", "நம்பிக்கை", "ಆಶೆ", "പ്രത്യാശ"),
    image: "/images/stories/one-step-forward.jpg",
    href: "/stories/meera-second-morning",
  },
  {
    id: "featured-4",
    title: "Learning to Hope Again",
    titles: names(
      "Learning to Hope Again",
      "మళ్లీ ఆశించడం నేర్చుకోవడం",
      "फिर से आशा करना सीखना",
      "மீண்டும் நம்பிக்கை கொள்ளக் கற்றல்",
      "ಮತ್ತೆ ಆಶಿಸಲು ಕಲಿಯುವುದು",
      "വീണ്ടും പ്രത്യാശിക്കാൻ പഠിക്കൽ",
    ),
    shortDescription:
      "Hope can be borrowed until it belongs to you again. Care, time, and community can rebuild what felt lost.",
    shortDescriptions: names(
      "Hope can be borrowed until it belongs to you again. Care, time, and community can rebuild what felt lost.",
      "ఆశను అరువు తెచ్చుకోవచ్చు — అది మళ్లీ మీది అయ్యే వరకు. శ్రద్ధ, సమయం, సముదాయం కోల్పోయినదాన్ని నిర్మించగలవు.",
      "आशा उधार ली जा सकती है जब तक वह फिर आपकी न हो जाए। देखभाल, समय और समुदाय खोए हुए को गढ़ सकते हैं।",
      "நம்பிக்கையை இரவல் வாங்கலாம் — அது மீண்டும் உங்களுடையதாகும் வரை. அக்கறை, நேரம், சமூகம் மீட்கும்.",
      "ಆಶೆಯನ್ನು ಎರವಲು ಪಡೆಯಬಹುದು — ಅದು ಮತ್ತೆ ನಿಮ್ಮದಾಗುವವರೆಗೆ. ಕಾಳಜಿ, ಸಮಯ, ಸಮುದಾಯ ಮರುನಿರ್ಮಿಸಬಹುದು.",
      "പ്രത്യാശ കടം വാങ്ങാം — അത് വീണ്ടും നിങ്ങളുടേതാകും വരെ. ശ്രദ്ധ, സമയം, സമൂഹം പുനർനിർമിക്കാം.",
    ),
    category: "Belonging",
    categories: names("Belonging", "చెందిక", "जुड़ाव", "சேர்ந்திருத்தல்", "ಸೇರಿರುವುದು", "ചേർന്നിരിക്കൽ"),
    image: "/images/stories/learning-to-hope-again.jpg",
    href: "/stories/arjun-team-captain",
  },
  {
    id: "featured-5",
    title: "A Journey Toward Tomorrow",
    titles: names(
      "A Journey Toward Tomorrow",
      "రేపటి వైపు ఒక ప్రయాణం",
      "कल की ओर एक यात्रा",
      "நாளை நோக்கி ஒரு பயணம்",
      "ನಾಳೆಯೆಡೆಗೆ ಒಂದು ಪ್ರಯಾಣ",
      "നാളെയിലേക്ക് ഒരു യാത്ര",
    ),
    shortDescription:
      "The story is not over. Tomorrow can hold more light than today can see — one hour, one morning at a time.",
    shortDescriptions: names(
      "The story is not over. Tomorrow can hold more light than today can see — one hour, one morning at a time.",
      "కథ ఇంకా ముగియలేదు. రేపు ఈ రోజు కంటే ఎక్కువ వెలుగు ఉంచవచ్చు — ఒక గంట, ఒక ఉదయం చొప్పున.",
      "कहानी अभी खत्म नहीं हुई। कल आज से अधिक प्रकाश रख सकता है — एक घंटा, एक सुबह।",
      "கதை இன்னும் முடியவில்லை. நாளை இன்றைவிட அதிக ஒளி தரலாம் — ஒரு மணி, ஒரு காலை.",
      "ಕಥೆ ಇನ್ನೂ ಮುಗಿದಿಲ್ಲ. ನಾಳೆ ಇಂದಿಗಿಂತ ಹೆಚ್ಚು ಬೆಳಕು ಇರಬಹುದು — ಒಂದು ಗಂಟೆ, ಒಂದು ಬೆಳಿಗ್ಗೆ.",
      "കഥ ഇതുവരെ അവസാനിച്ചിട്ടില്ല. നാളെ ഇന്നത്തേക്കാൾ വെളിച്ചം നൽകാം — ഒരു മണിക്കൂർ, ഒരു പ്രഭാതം.",
    ),
    category: "Tomorrow",
    categories: names("Tomorrow", "రేపు", "कल", "நாளை", "ನಾಳೆ", "നാളെ"),
    image: "/images/stories/a-journey-toward-tomorrow.jpg",
    href: "/stories",
  },
];

export function resolveFeaturedHeroStories(
  stories: Story[],
  categories: Category[],
): FeaturedHeroStory[] {
  const featured = stories.filter((story) => story.featured).slice(0, 5);
  if (featured.length < 4) return FEATURED_HERO_PLACEHOLDERS;

  return featured.map((story) => {
    const category = categories.find((item) => item.id === story.categoryId);
    return {
      id: story.id,
      title: story.title,
      titles: story.titles,
      shortDescription: story.excerpt,
      shortDescriptions: story.excerpts,
      category: category?.name ?? "Story",
      categories: category?.names,
      image: story.thumbnailUrl || FEATURED_HERO_PLACEHOLDERS[0].image,
      href: `/stories/${story.slug}`,
    };
  });
}
