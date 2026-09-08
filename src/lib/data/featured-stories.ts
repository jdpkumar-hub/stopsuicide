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
  reminder?: TranslationMap;
  takeaways?: TranslationMap[];
};

function points(
  en: readonly [string, string, string],
  te: readonly [string, string, string],
  hi: readonly [string, string, string],
  ta: readonly [string, string, string],
  kn: readonly [string, string, string],
  ml: readonly [string, string, string],
): TranslationMap[] {
  return [0, 1, 2].map((index) => names(en[index], te[index], hi[index], ta[index], kn[index], ml[index]));
}

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
      "ఒక కొత్త ప్రారంభం",
      "एक नई शुरुआत",
      "ஒரு புதிய தொடக்கம்",
      "ಹೊಸ ಆರಂಭ",
      "ഒരു പുതിയ തുടക്കം",
    ),
    shortDescription:
      "After the hardest season, ordinary days can return. Sometimes hope begins with something very small — a conversation, a friend who listens, or simply choosing to take one more step.",
    shortDescriptions: names(
      "After the hardest season, ordinary days can return. Sometimes hope begins with something very small — a conversation, a friend who listens, or simply choosing to take one more step.",
      "ఎంత కష్టమైన సమయం అయినా శాశ్వతం కాదు. కొన్నిసార్లు ఆశ ఒక పెద్ద మార్పుతో కాదు — మనసులోని మాటను ఎవరికైనా చెప్పడం, ఒక చిన్న అడుగు ముందుకు వేయడం ద్వారా మొదలవుతుంది.",
      "सबसे कठिन मौसम के बाद साधारण दिन लौट सकते हैं। कभी-कभी आशा बहुत छोटी चीज़ से शुरू होती है — एक बातचीत, सुनने वाला मित्र, या एक और कदम चुनना।",
      "கடினமான காலத்திற்குப் பிறகு சாதாரண நாட்கள் திரும்பலாம். சில வேளை நம்பிக்கை மிகச் சிறியதில் தொடங்கும் — ஒரு உரையாடல், கேட்கும் நண்பர், இன்னொரு அடி.",
      "ಕಷ್ಟದ ಋತುವಿನ ನಂತರ ಸಾಮಾನ್ಯ ದಿನಗಳು ಹಿಂದಿರುಗಬಹುದು. ಕೆಲವೊಮ್ಮೆ ಆಶೆ ತುಂಬಾ ಸಣ್ಣದರಿಂದ ಆರಂಭವಾಗುತ್ತದೆ — ಒಂದು ಮಾತು, ಕೇಳುವ ಸ್ನೇಹಿತ, ಇನ್ನೊಂದು ಹೆಜ್ಜೆ.",
      "കഠിനമായ കാലത്തിന് ശേഷം സാധാരണ ദിനങ്ങൾ മടങ്ങാം. ചിലപ്പോൾ പ്രത്യാശ വളരെ ചെറിയതിൽ തുടങ്ങും — ഒരു സംഭാഷണം, കേൾക്കുന്ന സുഹൃത്ത്, ഒരു ചുവടുകൂടി.",
    ),
    category: "Recovery",
    categories: names("Recovery", "కోలుకోవడం", "रिकवरी", "மீட்பு", "ಚೇತರಿಕೆ", "കരകയറ്റം"),
    image: "/images/stories/a-new-beginning.jpg",
    href: "/stories/ananya-learning-to-stay",
    reminder: names(
      "A small step forward is still progress.",
      "చిన్న అడుగు ముందుకు వేసినా అది ముందడుగే.",
      "एक छोटा कदम आगे बढ़ना भी प्रगति है।",
      "சிறிய அடி முன்னே செல்வதும் முன்னேற்றமே.",
      "ಸಣ್ಣ ಹೆಜ್ಜೆ ಮುಂದೆ ಇಟ್ಟರೂ ಅದು ಮುನ್ನಡೆ.",
      "ചെറിയ ഒരു ചുവട് മുന്നോട്ട് വെച്ചാലും അത് മുന്നേറ്റമാണ്.",
    ),
    takeaways: points(
      ["Asking for support is a strength", "Small steps still move us forward", "Hope can return gradually"],
      ["సహాయం అడగడం బలహీనత కాదు", "చిన్న అడుగు కూడా ముందడుగే", "ఆశకు తిరిగి రావడానికి సమయం ఇవ్వాలి"],
      ["सहारा माँगना एक शक्ति है", "छोटे कदम भी हमें आगे ले जाते हैं", "आशा धीरे-धीरे लौट सकती है"],
      ["உதவி கேட்பது ஒரு வலிமை", "சிறிய அடிகளும் முன்னேற்றம் தரும்", "நம்பிக்கை மெல்லத் திரும்பலாம்"],
      ["ಸಹಾಯ ಕೇಳುವುದು ಒಂದು ಶಕ್ತಿ", "ಸಣ್ಣ ಹೆಜ್ಜೆಗಳೂ ಮುಂದಕ್ಕೆ ಕೊಂಡೊಯ್ಯುತ್ತವೆ", "ಆಶೆ ನಿಧಾನವಾಗಿ ಹಿಂದಿರುಗಬಹುದು"],
      ["സഹായം ചോദിക്കുന്നത് ഒരു ശക്തിയാണ്", "ചെറിയ ചുവടുകളും മുന്നോട്ട് നയിക്കും", "പ്രത്യാശ ക്രമേണ മടങ്ങാം"],
    ),
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
      "Strength did not arrive all at once. It grew in quiet choices — asking for help, staying with a friend, and taking the next small step even when the day felt heavy.",
    shortDescriptions: names(
      "Strength did not arrive all at once. It grew in quiet choices — asking for help, staying with a friend, and taking the next small step even when the day felt heavy.",
      "బలం ఒక్కసారిగా రాలేదు. సహాయం అడగడం, స్నేహితునితో ఉండటం, బరువైన రోజున కూడా మరో చిన్న అడుగు వేయడం — ఆ నిశ్శబ్ద ఎంపికల్లో పెరిగింది.",
      "शक्ति एक साथ नहीं आई। मदद माँगने, किसी मित्र के साथ ठहरने, और भारी दिन में भी अगला छोटा कदम बढ़ाने से वह बढ़ी।",
      "வலிமை ஒரே நேரத்தில் வரவில்லை. உதவி கேட்பது, ஒரு நண்பருடன் இருப்பது, கனமான நாளிலும் அடுத்த சிறிய அடி — இவற்றில்தான் அது வளர்ந்தது.",
      "ಶಕ್ತಿ ಒಮ್ಮೆಲೇ ಬರಲಿಲ್ಲ. ಸಹಾಯ ಕೇಳುವುದು, ಸ್ನೇಹಿತನೊಂದಿಗೆ ಇರುವುದು, ಭಾರವಾದ ದಿನದಲ್ಲಿಯೂ ಮುಂದಿನ ಸಣ್ಣ ಹೆಜ್ಜೆ — ಇವುಗಳಲ್ಲಿ ಅದು ಬೆಳೆಯಿತು.",
      "ശക്തി ഒറ്റയടിക്ക് വന്നില്ല. സഹായം ചോദിക്കൽ, ഒരു സുഹൃത്തിനൊപ്പം നിൽക്കൽ, ഭാരമുള്ള ദിവസത്തിലും അടുത്ത ചെറിയ ചുവട് — ഇവയിൽ അത് വളർന്നു.",
    ),
    category: "Resilience",
    categories: names("Resilience", "స్థిరత్వం", "लचीलापन", "மீள்திறன்", "ಸ್ಥಿತಿಸ್ಥಾಪಕತ್ವ", "സ്ഥിരത"),
    image: "/images/stories/finding-my-strength.jpg",
    href: "/stories/ravi-and-the-kitchen-light",
    reminder: names(
      "Strength grows in quiet, kind choices.",
      "బలం నిశ్శబ్దమైన, దయగల ఎంపికల్లో పెరుగుతుంది.",
      "शक्ति शांत, कोमल चुनावों में बढ़ती है।",
      "வலிமை அமைதியான, கனிவான தேர்வுகளில் வளரும்.",
      "ಶಕ್ತಿ ಶಾಂತ, ದಯೆಯ ಆಯ್ಕೆಗಳಲ್ಲಿ ಬೆಳೆಯುತ್ತದೆ.",
      "ശക്തി ശാന്തവും ദയയുള്ളതുമായ തിരഞ്ഞെടുപ്പുകളിൽ വളരുന്നു.",
    ),
    takeaways: points(
      ["Asking for help is courage", "Strength grows in small acts", "You do not have to do this alone"],
      ["సహాయం అడగడం ధైర్యమే", "బలం చిన్న పనుల్లో పెరుగుతుంది", "దీన్ని ఒంటరిగా మోయాల్సిన అవసరం లేదు"],
      ["मदद माँगना साहस है", "शक्ति छोटे कामों में बढ़ती है", "इसे अकेले नहीं उठाना है"],
      ["உதவி கேட்பது தைரியம்", "வலிமை சிறிய செயல்களில் வளரும்", "இதைத் தனியாகச் சுமக்க வேண்டாம்"],
      ["ಸಹಾಯ ಕೇಳುವುದು ಧೈರ್ಯ", "ಶಕ್ತಿ ಸಣ್ಣ ಕೆಲಸಗಳಲ್ಲಿ ಬೆಳೆಯುತ್ತದೆ", "ಇದನ್ನು ಒಂಟಿಯಾಗಿ ಹೊರುವ ಅಗತ್ಯವಿಲ್ಲ"],
      ["സഹായം ചോദിക്കുന്നത് ധൈര്യമാണ്", "ശക്തി ചെറിയ പ്രവൃത്തികളിൽ വളരും", "ഇത് ഒറ്റയ്ക്ക് ചുമക്കേണ്ടതില്ല"],
    ),
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
      "Healing is not a straight line. One honest conversation, one morning of light, one person who stays — these can open a path that felt closed.",
    shortDescriptions: names(
      "Healing is not a straight line. One honest conversation, one morning of light, one person who stays — these can open a path that felt closed.",
      "కోలుకోవడం సరళరేఖ కాదు. ఒక నిజాయితీ సంభాషణ, ఒక వెలుగు ఉదయం, నిలబడే ఒక వ్యక్తి — ఇవి మూసుకుపోయిన దారిని తెరవగలవు.",
      "उपचार सीधी रेखा नहीं है। एक ईमानदार बातचीत, एक उजली सुबह, कोई जो ठहरता है — ये बंद लगा रास्ता खोल सकते हैं।",
      "குணமடைதல் நேர்க்கோடு அல்ல. ஒரு நேர்மையான உரையாடல், ஒளி நிறைந்த காலை, நிற்கும் ஒருவர் — மூடிய பாதையைத் திறக்கும்.",
      "ಗುಣಮುಖವಾಗುವುದು ನೇರ ರೇಖೆ ಅಲ್ಲ. ಒಂದು ಪ್ರಾಮಾಣಿಕ ಮಾತು, ಬೆಳಕಿನ ಬೆಳಿಗ್ಗೆ, ನಿಲ್ಲುವ ಒಬ್ಬರು — ಮುಚ್ಚಿದ ದಾರಿ ತೆರೆಯಬಹುದು.",
      "കോളുക്കൽ നേർരേഖയല്ല. ഒരു സത്യസന്ധ സംഭാഷണം, വെളിച്ചമുള്ള പ്രഭാതം, നിൽക്കുന്ന ഒരാൾ — അടഞ്ഞ വഴി തുറക്കാം.",
    ),
    category: "Hope",
    categories: names("Hope", "ఆశ", "आशा", "நம்பிக்கை", "ಆಶೆ", "പ്രത്യാശ"),
    image: "/images/stories/one-step-forward.jpg",
    href: "/stories/meera-second-morning",
    reminder: names(
      "One honest conversation can open a closed path.",
      "ఒక నిజాయితీ సంభాషణ మూసుకుపోయిన దారిని తెరవగలదు.",
      "एक ईमानदार बातचीत बंद रास्ता खोल सकती है।",
      "ஒரு நேர்மையான உரையாடல் மூடிய பாதையைத் திறக்கும்.",
      "ಒಂದು ಪ್ರಾಮಾಣಿಕ ಮಾತು ಮುಚ್ಚಿದ ದಾರಿ ತೆರೆಯಬಹುದು.",
      "ഒരു സത്യസന്ധ സംഭാഷണം അടഞ്ഞ വഴി തുറക്കാം.",
    ),
    takeaways: points(
      ["One conversation can change a day", "Healing can be uneven and still real", "Tomorrow can hold more light"],
      ["ఒక సంభాషణ ఒక రోజును మార్చగలదు", "కోలుకోవడం అసమానంగా ఉన్నా నిజమే", "రేపు ఎక్కువ వెలుగు ఉంచవచ్చు"],
      ["एक बातचीत एक दिन बदल सकती है", "उपचार असमान होकर भी सच्चा हो सकता है", "कल अधिक प्रकाश रख सकता है"],
      ["ஒரு உரையாடல் ஒரு நாளை மாற்றும்", "குணமடைதல் சமமில்லாமல் இருந்தாலும் உண்மை", "நாளை அதிக ஒளி தரலாம்"],
      ["ಒಂದು ಮಾತು ಒಂದು ದಿನವನ್ನು ಬದಲಾಯಿಸಬಹುದು", "ಗುಣಮುಖ ಅಸಮವಾಗಿದ್ದರೂ ನಿಜವಾಗಿರಬಹುದು", "ನಾಳೆ ಹೆಚ್ಚು ಬೆಳಕು ಇರಬಹುದು"],
      ["ഒരു സംഭാഷണം ഒരു ദിവസം മാറ്റാം", "കോളുക്കൽ അസമമായാലും യഥാർത്ഥമാകാം", "നാളെ കൂടുതൽ വെളിച്ചം നൽകാം"],
    ),
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
      "Hope can be borrowed until it belongs to you again. Care, time, and a community that listens can slowly rebuild what felt lost.",
    shortDescriptions: names(
      "Hope can be borrowed until it belongs to you again. Care, time, and a community that listens can slowly rebuild what felt lost.",
      "ఆశను అరువు తెచ్చుకోవచ్చు — అది మళ్లీ మీది అయ్యే వరకు. శ్రద్ధ, సమయం, వినే సముదాయం కోల్పోయినదాన్ని నెమ్మదిగా నిర్మించగలవు.",
      "आशा उधार ली जा सकती है जब तक वह फिर आपकी न हो जाए। देखभाल, समय और सुनने वाला समुदाय खोए हुए को धीरे गढ़ सकते हैं।",
      "நம்பிக்கையை இரவல் வாங்கலாம் — அது மீண்டும் உங்களுடையதாகும் வரை. அக்கறை, நேரம், கேட்கும் சமூகம் இழந்ததை மெல்ல மீட்கும்.",
      "ಆಶೆಯನ್ನು ಎರವಲು ಪಡೆಯಬಹುದು — ಅದು ಮತ್ತೆ ನಿಮ್ಮದಾಗುವವರೆಗೆ. ಕಾಳಜಿ, ಸಮಯ, ಕೇಳುವ ಸಮುದಾಯ ಕಳೆದುಕೊಂಡದ್ದನ್ನು ನಿಧಾನವಾಗಿ ಮರುನಿರ್ಮಿಸಬಹುದು.",
      "പ്രത്യാശ കടം വാങ്ങാം — അത് വീണ്ടും നിങ്ങളുടേതാകും വരെ. ശ്രദ്ധ, സമയം, കേൾക്കുന്ന സമൂഹം നഷ്ടപ്പെട്ടത് ക്രമേണ പുനർനിർമിക്കാം.",
    ),
    category: "Hope",
    categories: names("Hope", "ఆశ", "आशा", "நம்பிக்கை", "ಆಶೆ", "പ്രത്യാശ"),
    image: "/images/stories/learning-to-hope-again.jpg",
    href: "/stories/arjun-team-captain",
    reminder: names(
      "Hope can be borrowed until it belongs to you again.",
      "ఆశను అరువు తెచ్చుకోవచ్చు — అది మళ్లీ మీది అయ్యే వరకు.",
      "आशा उधार ली जा सकती है जब तक वह फिर आपकी न हो जाए।",
      "நம்பிக்கையை இரவல் வாங்கலாம் — அது மீண்டும் உங்களுடையதாகும் வரை.",
      "ಆಶೆಯನ್ನು ಎರವಲು ಪಡೆಯಬಹುದು — ಅದು ಮತ್ತೆ ನಿಮ್ಮದಾಗುವವರೆಗೆ.",
      "പ്രത്യാശ കടം വാങ്ങാം — അത് വീണ്ടും നിങ്ങളുടേതാകും വരെ.",
    ),
    takeaways: points(
      ["Hope can be shared until it returns", "Care and time still matter", "Belonging helps us stay"],
      ["ఆశను పంచుకోవచ్చు — అది తిరిగి వచ్చే వరకు", "శ్రద్ధ, సమయం ఇంకా ముఖ్యమే", "చెందిక మనల్ని నిలబెడుతుంది"],
      ["आशा बाँटी जा सकती है जब तक वह लौटे", "देखभाल और समय अब भी मायने रखते हैं", "जुड़ाव हमें ठहराता है"],
      ["நம்பிக்கையைப் பகிரலாம் — அது திரும்பும் வரை", "அக்கறையும் நேரமும் இன்னும் முக்கியம்", "சேர்ந்திருத்தல் நம்மை நிறுத்தும்"],
      ["ಆಶೆಯನ್ನು ಹಂಚಿಕೊಳ್ಳಬಹುದು — ಅದು ಹಿಂದಿರುಗುವವರೆಗೆ", "ಕಾಳಜಿ ಮತ್ತು ಸಮಯ ಇನ್ನೂ ಮುಖ್ಯ", "ಸೇರಿರುವುದು ನಮ್ಮನ್ನು ನಿಲ್ಲಿಸುತ್ತದೆ"],
      ["പ്രത്യാശ പങ്കിടാം — അത് മടങ്ങും വരെ", "ശ്രദ്ധയും സമയവും ഇപ്പോഴും പ്രധാനം", "ചേർന്നിരിക്കൽ നമ്മെ നിർത്തുന്നു"],
    ),
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
      "The story is not over. Tomorrow can hold more light than today can see — one hour, one morning, one kind step at a time.",
    shortDescriptions: names(
      "The story is not over. Tomorrow can hold more light than today can see — one hour, one morning, one kind step at a time.",
      "కథ ఇంకా ముగియలేదు. రేపు ఈ రోజు కంటే ఎక్కువ వెలుగు ఉంచవచ్చు — ఒక గంట, ఒక ఉదయం, ఒక దయగల అడుగు చొప్పున.",
      "कहानी अभी खत्म नहीं हुई। कल आज से अधिक प्रकाश रख सकता है — एक घंटा, एक सुबह, एक कोमल कदम।",
      "கதை இன்னும் முடியவில்லை. நாளை இன்றைவிட அதிக ஒளி தரலாம் — ஒரு மணி, ஒரு காலை, ஒரு கனிவான அடி.",
      "ಕಥೆ ಇನ್ನೂ ಮುಗಿದಿಲ್ಲ. ನಾಳೆ ಇಂದಿಗಿಂತ ಹೆಚ್ಚು ಬೆಳಕು ಇರಬಹುದು — ಒಂದು ಗಂಟೆ, ಒಂದು ಬೆಳಿಗ್ಗೆ, ಒಂದು ದಯೆಯ ಹೆಜ್ಜೆ.",
      "കഥ ഇതുവരെ അവസാനിച്ചിട്ടില്ല. നാളെ ഇന്നത്തേക്കാൾ വെളിച്ചം നൽകാം — ഒരു മണിക്കൂർ, ഒരു പ്രഭാതം, ഒരു ദയയുള്ള ചുവട്.",
    ),
    category: "Hope",
    categories: names("Hope", "ఆశ", "आशा", "நம்பிக்கை", "ಆಶೆ", "പ്രത്യാശ"),
    image: "/images/stories/a-journey-toward-tomorrow.jpg",
    href: "/stories",
    reminder: names(
      "The story is not over. Tomorrow can hold more light.",
      "కథ ఇంకా ముగియలేదు. రేపు ఎక్కువ వెలుగు ఉంచవచ్చు.",
      "कहानी अभी खत्म नहीं हुई। कल अधिक प्रकाश रख सकता है।",
      "கதை இன்னும் முடியவில்லை. நாளை அதிக ஒளி தரலாம்.",
      "ಕಥೆ ಇನ್ನೂ ಮುಗಿದಿಲ್ಲ. ನಾಳೆ ಹೆಚ್ಚು ಬೆಳಕು ಇರಬಹುದು.",
      "കഥ ഇതുവരെ അവസാനിച്ചിട്ടില്ല. നാളെ കൂടുതൽ വെളിച്ചം നൽകാം.",
    ),
    takeaways: points(
      ["Your story is still being written", "One hour at a time is enough", "Light can return gradually"],
      ["మీ కథ ఇంకా రాయబడుతోంది", "ఒక గంట చొప్పున సరిపోతుంది", "వెలుగు నెమ్మదిగా తిరిగి రాగలదు"],
      ["आपकी कहानी अभी लिखी जा रही है", "एक घंटा एक साथ काफी है", "प्रकाश धीरे-धीरे लौट सकता है"],
      ["உங்கள் கதை இன்னும் எழுதப்படுகிறது", "ஒரு மணி நேரம் போதும்", "ஒளி மெல்லத் திரும்பலாம்"],
      ["ನಿಮ್ಮ ಕಥೆ ಇನ್ನೂ ಬರೆಯಲಾಗುತ್ತಿದೆ", "ಒಂದು ಗಂಟೆ ಸಾಕು", "ಬೆಳಕು ನಿಧಾನವಾಗಿ ಹಿಂದಿರುಗಬಹುದು"],
      ["നിങ്ങളുടെ കഥ ഇപ്പോഴും എഴുതപ്പെടുന്നു", "ഒരു മണിക്കൂർ മതി", "വെളിച്ചം ക്രമേണ മടങ്ങാം"],
    ),
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
