import { names } from "@/lib/i18n/content";
import type { TranslationMap } from "@/types";

export type CatalogQuote = {
  text: string;
  translations: TranslationMap;
};

export const MOTIVATION_CATALOG: CatalogQuote[] = [
  {
    text: "Morning is proof that the night did not get the last word.",
    translations: names(
      "Morning is proof that the night did not get the last word.",
      "ఉదయం అంటే రాత్రికి చివరి మాట లేదని రుజువు.",
      "सुबह इस बात का प्रमाण है कि रात को आखिरी शब्द नहीं मिला।",
      "காலை என்பது இரவுக்கு கடைசி வார்த்தை இல்லை என்பதன் சான்று.",
      "ಬೆಳಿಗ್ಗೆ ಎಂದರೆ ರಾತ್ರಿಗೆ ಕೊನೆಯ ಮಾತು ಸಿಗಲಿಲ್ಲ ಎಂಬ ಸಾಕ್ಷಿ.",
      "പ്രഭാതം രാത്രിക്ക് അവസാന വാക്ക് ലഭിച്ചില്ലെന്ന തെളിവാണ്.",
    ),
  },
  {
    text: "You do not have to feel ready to take the next kind step.",
    translations: names(
      "You do not have to feel ready to take the next kind step.",
      "తదుపరి మృదువైన అడుగు వేయడానికి సిద్ధంగా అనిపించాల్సిన పని లేదు.",
      "अगला दयालु कदम उठाने के लिए तैयार महसूस करना ज़रूरी नहीं।",
      "அடுத்த கனிவான அடியை எடுக்க தயாராக உணர வேண்டியதில்லை.",
      "ಮುಂದಿನ ದಯೆಯ ಹೆಜ್ಜೆ ಇಡಲು ಸಿದ್ಧ ಅನಿಸಬೇಕಿಲ್ಲ.",
      "അടുത്ത ദയയുള്ള ചുവട് വയ്ക്കാൻ തയ്യാറായി തോന്നേണ്ടതില്ല.",
    ),
  },
  {
    text: "Stay for the chapter that has not been written yet.",
    translations: names(
      "Stay for the chapter that has not been written yet.",
      "ఇంకా రాయని అధ్యాయం కోసం నిలబడండి.",
      "जो अध्याय अभी लिखा नहीं गया, उसके लिए रुकिए।",
      "இன்னும் எழுதப்படாத அத்தியாயத்திற்காக நில்லுங்கள்.",
      "ಇನ್ನೂ ಬರೆಯದ ಅಧ್ಯಾಯಕ್ಕಾಗಿ ನಿಲ್ಲಿ.",
      "ഇനിയും എഴുതാത്ത അധ്യായത്തിനായി നിൽക്കുക.",
    ),
  },
  {
    text: "A small kindness toward yourself still counts as courage.",
    translations: names(
      "A small kindness toward yourself still counts as courage.",
      "మీ పట్ల చిన్న దయ కూడా ధైర్యమే.",
      "अपने प्रति छोटी सी दया भी साहस है।",
      "உங்களிடம் ஒரு சிறிய கனிவும் தைரியமே.",
      "ನಿಮ್ಮ ಬಗ್ಗೆ ಸಣ್ಣ ದಯೆಯೂ ಧೈರ್ಯವೇ.",
      "നിങ്ങളോടുള്ള ചെറിയ ദയയും ധൈര്യമാണ്.",
    ),
  },
  {
    text: "Hope can be as quiet as a glass of water and a window opened.",
    translations: names(
      "Hope can be as quiet as a glass of water and a window opened.",
      "ఆశ ఒక గ్లాసు నీరు, తెరిచిన కిటికీంత నిశ్శబ్దంగా ఉండవచ్చు.",
      "आशा एक गिलास पानी और खुली खिड़की जितनी शांत हो सकती है।",
      "நம்பிக்கை ஒரு கிளாஸ் தண்ணீர், திறந்த ஜன்னல் போல் அமைதியாக இருக்கலாம்.",
      "ಆಶೆ ಒಂದು ಗ್ಲಾಸ್ ನೀರು ಮತ್ತು ತೆರೆದ ಕಿಟಕಿಯಷ್ಟು ನಿಶ್ಶಬ್ದವಾಗಿರಬಹುದು.",
      "പ്രത്യാശ ഒരു ഗ്ലാസ് വെള്ളവും തുറന്ന ജനാലയും പോലെ നിശബ്ദമാകാം.",
    ),
  },
  {
    text: "You are allowed to begin again without explaining the pause.",
    translations: names(
      "You are allowed to begin again without explaining the pause.",
      "విరామాన్ని వివరించకుండానే మళ్లీ మొదలుపెట్టవచ్చు.",
      "विराम समझाए बिना फिर से शुरू करने की अनुमति है।",
      "இடைவெளியை விளக்காமல் மீண்டும் தொடங்கலாம்.",
      "ವಿರಾಮವನ್ನು ವಿವರಿಸದೆ ಮತ್ತೆ ಆರಂಭಿಸಬಹುದು.",
      "ഇടവേള വിശദീകരിക്കാതെ വീണ്ടും തുടങ്ങാം.",
    ),
  },
  {
    text: "Connection is a light you can borrow until your own returns.",
    translations: names(
      "Connection is a light you can borrow until your own returns.",
      "మీ వెలుగు తిరిగి వచ్చేంతవరకు అనుబంధం అరువు తీసుకోదగిన వెలుగు.",
      "जुड़ाव वह रोशनी है जिसे अपनी लौटने तक उधार लिया जा सकता है।",
      "இணைப்பு உங்கள் ஒளி திரும்பும் வரை கடன் வாங்கக்கூடிய வெளிச்சம்.",
      "ಸಂಪರ್ಕ ನಿಮ್ಮ ಬೆಳಕು ಹಿಂತಿರುಗುವವರೆಗೆ ಎರವಲು ಪಡೆಯಬಹುದಾದ ಬೆಳಕು.",
      "ബന്ധം നിങ്ങളുടെ വെളിച്ചം മടങ്ങുന്നതുവരെ കടം വാങ്ങാവുന്ന വെളിച്ചമാണ്.",
    ),
  },
  {
    text: "Let today be gentler than the story you told yourself yesterday.",
    translations: names(
      "Let today be gentler than the story you told yourself yesterday.",
      "నిన్న మీరు చెప్పుకున్న కథ కంటే ఈ రోజు మృదువుగా ఉండనివ్వండి.",
      "आज को उस कहानी से कोमल रहने दीजिए जो आपने कल खुद से कही।",
      "நேற்று நீங்கள் சொன்ன கதையைவிட இன்று மென்மையாக இருக்கட்டும்.",
      "ನಿನ್ನೆ ನೀವು ಹೇಳಿಕೊಂಡ ಕಥೆಗಿಂತ ಇಂದು ಮೃದುವಾಗಿರಲಿ.",
      "ഇന്നലെ നിങ്ങൾ പറഞ്ഞ കഥയെക്കാൾ ഇന്ന് മൃദുവായിരിക്കട്ടെ.",
    ),
  },
  {
    text: "Your presence in this hour is already a victory.",
    translations: names(
      "Your presence in this hour is already a victory.",
      "ఈ గంటలో మీ ఉనికే ఇప్పటికే విజయం.",
      "इस घंटे में आपकी उपस्थिति पहले से ही एक जीत है।",
      "இந்த மணியில் உங்கள் இருப்பே ஏற்கனவே வெற்றி.",
      "ಈ ಗಂಟೆಯಲ್ಲಿ ನಿಮ್ಮ ಉಪಸ್ಥಿತಿಯೇ ಈಗಾಗಲೇ ಗೆಲುವು.",
      "ഈ മണിക്കൂറിലെ നിങ്ങളുടെ സാന്നിധ്യം തന്നെ വിജയമാണ്.",
    ),
  },
  {
    text: "Ask for company. Asking is a form of staying.",
    translations: names(
      "Ask for company. Asking is a form of staying.",
      "తోడు అడగండి. అడగడం కూడా నిలబడటమే.",
      "संग माँगिए। माँगना भी रुकने का एक रूप है।",
      "தோழமை கேளுங்கள். கேட்பதும் நிற்பதே.",
      "ಜೊತೆ ಕೇಳಿ. ಕೇಳುವುದೂ ನಿಲ್ಲುವುದೇ.",
      "കൂട്ട് ചോദിക്കുക. ചോദിക്കുന്നതും നിൽക്കലാണ്.",
    ),
  },
  {
    text: "Even a slow sunrise still arrives.",
    translations: names(
      "Even a slow sunrise still arrives.",
      "నెమ్మదైన సూర్యోదయం కూడా వస్తుంది.",
      "धीमी सूर्योदय भी आती है।",
      "மெதுவான சூரிய உதயமும் வரும்.",
      "ನಿಧಾನ ಸೂರ್ಯೋದಯವೂ ಬರುತ್ತದೆ.",
      "മന്ദഗതിയിലുള്ള സൂര്യോദയവും വരും.",
    ),
  },
  {
    text: "Rest is not a detour from healing. It is part of the path.",
    translations: names(
      "Rest is not a detour from healing. It is part of the path.",
      "విశ్రాంతి నయం నుంచి దారి తప్పడం కాదు. అది దారిలో భాగం.",
      "आराम उपचार से भटकना नहीं है। यह रास्ते का हिस्सा है।",
      "ஓய்வு குணமடைவதிலிருந்து விலகல் அல்ல. அது பாதையின் பகுதி.",
      "ವಿಶ್ರಾಂತಿ ಗುಣಪಡಿಸುವಿಕೆಯಿಂದ ದಾರಿತಪ್ಪುವುದಲ್ಲ. ಅದು ದಾರಿಯ ಭಾಗ.",
      "വിശ്രമം സുഖപ്പെടലിൽ നിന്നുള്ള വഴിതെറ്റലല്ല. അത് വഴിയുടെ ഭാഗമാണ്.",
    ),
  },
  {
    text: "Someone is glad you are still here, including a future you.",
    translations: names(
      "Someone is glad you are still here, including a future you.",
      "మీరు ఇంకా ఉన్నందుకు ఎవరో సంతోషిస్తున్నారు — రేపటి మీరు కూడా.",
      "कोई खुश है कि आप अभी यहाँ हैं, आने वाला आप भी।",
      "நீங்கள் இன்னும் இங்கே இருப்பதால் யாரோ மகிழ்ச்சி — நாளைய நீங்களும்.",
      "ನೀವು ಇನ್ನೂ ಇಲ್ಲಿದ್ದೀರಿ ಎಂದು ಯಾರೋ ಸಂತೋಷಪಡುತ್ತಾರೆ — ನಾಳಿನ ನೀವೂ.",
      "നിങ്ങൾ ഇപ്പോഴും ഇവിടെയുള്ളതിൽ ആരോ സന്തോഷിക്കുന്നു — നാളത്തെ നിങ്ങളും.",
    ),
  },
  {
    text: "Breathe out longer than the worry. Then take one ordinary action.",
    translations: names(
      "Breathe out longer than the worry. Then take one ordinary action.",
      "ఆందోళన కంటే ఎక్కువసేపు శ్వాసను వదలండి. తర్వాత ఒక సాధారణ పని చేయండి.",
      "चिंता से लंबी साँस छोड़िए। फिर एक साधारण काम कीजिए।",
      "கவலையைவிட நீளமாக மூச்சை விடுங்கள். பிறகு ஒரு சாதாரண செயல்.",
      "ಆತಂಕಕ್ಕಿಂತ ಉದ್ದವಾಗಿ ಉಸಿರು ಬಿಡಿ. ನಂತರ ಒಂದು ಸಾಮಾನ್ಯ ಕೆಲಸ ಮಾಡಿ.",
      "ആശങ്കയെക്കാൾ നീട്ടി ശ്വാസം വിടുക. പിന്നെ ഒരു സാധാരണ പ്രവൃത്തി.",
    ),
  },
  {
    text: "You can be tired and still worthy of care.",
    translations: names(
      "You can be tired and still worthy of care.",
      "అలసిపోయినా శ్రద్ధకు అర్హులే.",
      "थके होने पर भी आप देखभाल के योग्य हैं।",
      "சோர்வாக இருந்தாலும் பராமரிப்புக்கு தகுதியானவர்கள்.",
      "ಆಯಾಸವಾಗಿದ್ದರೂ ಕಾಳಜಿಗೆ ಅರ್ಹರು.",
      "ക്ഷീണിതരായാലും ശ്രദ്ധയ്ക്ക് അർഹരാണ്.",
    ),
  },
  {
    text: "The world is wider than this difficult afternoon.",
    translations: names(
      "The world is wider than this difficult afternoon.",
      "ఈ కష్టమైన మధ్యాహ్నం కంటే ప్రపంచం విశాలం.",
      "यह कठिन दोपहर दुनिया से छोटी है।",
      "இந்தக் கடினமான மதியத்தைவிட உலகம் விரிவானது.",
      "ಈ ಕಷ್ಟದ ಮಧ್ಯಾಹ್ನಕ್ಕಿಂತ ಜಗತ್ತು ವಿಶಾಲ.",
      "ഈ ബുദ്ധിമുട്ടുള്ള ഉച്ചയെക്കാൾ ലോകം വിശാലമാണ്.",
    ),
  },
  {
    text: "Hold on to one true thing: you matter in rooms you have not entered yet.",
    translations: names(
      "Hold on to one true thing: you matter in rooms you have not entered yet.",
      "ఒక నిజం పట్టుకోండి: మీరు ఇంకా ప్రవేశించని గదుల్లో కూడా మీరు ముఖ్యం.",
      "एक सच पकड़िए: आप उन कमरों में भी मायने रखते हैं जहाँ अभी गए नहीं।",
      "ஒரு உண்மையைப் பிடியுங்கள்: நீங்கள் இன்னும் நுழையாத அறைகளிலும் நீங்கள் முக்கியம்.",
      "ಒಂದು ಸತ್ಯ ಹಿಡಿದುಕೊಳ್ಳಿ: ನೀವು ಇನ್ನೂ ಪ್ರವೇಶಿಸದ ಕೋಣೆಗಳಲ್ಲಿಯೂ ನೀವು ಮುಖ್ಯ.",
      "ഒരു സത്യം പിടിക്കുക: നിങ്ങൾ ഇനിയും കയറാത്ത മുറികളിലും നിങ്ങൾ പ്രധാനമാണ്.",
    ),
  },
  {
    text: "Help is a door, not a verdict. Walk toward it.",
    translations: names(
      "Help is a door, not a verdict. Walk toward it.",
      "సహాయం ఒక తలుపు, తీర్పు కాదు. దాని వైపు నడవండి.",
      "मदद एक दरवाज़ा है, फैसला नहीं। उसकी ओर चलिए।",
      "உதவி ஒரு கதவு, தீர்ப்பு அல்ல. அதை நோக்கி நடவுங்கள்.",
      "ಸಹಾಯ ಒಂದು ಬಾಗಿಲು, ತೀರ್ಪಲ್ಲ. ಅದರ ಕಡೆ ನಡೆಯಿರಿ.",
      "സഹായം ഒരു വാതിൽ, വിധിയല്ല. അതിലേക്ക് നടക്കുക.",
    ),
  },
  {
    text: "Softness with yourself is not giving up. It is making room to continue.",
    translations: names(
      "Softness with yourself is not giving up. It is making room to continue.",
      "మీ పట్ల మృదుత్వం వదులుకోవడం కాదు. కొనసాగడానికి చోటు ఇవ్వడం.",
      "अपने प्रति कोमलता हार मानना नहीं है। यह जारी रखने की जगह बनाना है।",
      "உங்களிடம் மென்மை விட்டுவிடுவதல்ல. தொடர இடம் கொடுப்பது.",
      "ನಿಮ್ಮ ಬಗ್ಗೆ ಮೃದುತ್ವ ಬಿಟ್ಟುಕೊಡುವುದಲ್ಲ. ಮುಂದುವರಿಯಲು ಜಾಗ ಮಾಡುವುದು.",
      "നിങ്ങളോടുള്ള മൃദുത്വം കൈവിടലല്ല. തുടരാൻ ഇടം ഉണ്ടാക്കലാണ്.",
    ),
  },
  {
    text: "Tonight can be survived the way other nights were: one hour at a time.",
    translations: names(
      "Tonight can be survived the way other nights were: one hour at a time.",
      "ఈ రాత్రిని ఇతర రాత్రుల్లాగే దాటవచ్చు: ఒక గంట చొప్పున.",
      "यह रात भी बाकी रातों की तरह गुज़री जा सकती है: एक घंटा एक बार।",
      "இன்றிரவும் மற்ற இரவுகள் போல் கடக்கலாம்: ஒரு மணி நேரம்.",
      "ಈ ರಾತ್ರಿಯನ್ನು ಇತರ ರಾತ್ರಿಗಳಂತೆ ದಾಟಬಹುದು: ಒಂದು ಗಂಟೆಯಂತೆ.",
      "ഈ രാത്രിയും മറ്റ് രാത്രികളെപ്പോലെ കടക്കാം: ഒരു മണിക്കൂർ വീതം.",
    ),
  },
  {
    text: "Your story still has unsent messages and unfinished tea.",
    translations: names(
      "Your story still has unsent messages and unfinished tea.",
      "మీ కథలో ఇంకా పంపని సందేశాలు, తాగని టీ ఉన్నాయి.",
      "आपकी कहानी में अभी बिना भेजे संदेश और अधूरी चाय है।",
      "உங்கள் கதையில் இன்னும் அனுப்பாத செய்திகள், முடிக்காத தேநீர் உண்டு.",
      "ನಿಮ್ಮ ಕಥೆಯಲ್ಲಿ ಇನ್ನೂ ಕಳುಹಿಸದ ಸಂದೇಶಗಳು, ಕುಡಿಯದ ಚಹಾ ಇವೆ.",
      "നിങ്ങളുടെ കഥയിൽ ഇനിയും അയയ്ക്കാത്ത സന്ദേശങ്ങളും കുടിക്കാത്ത ചായയുമുണ്ട്.",
    ),
  },
  {
    text: "Choose the next kind sentence you can say to yourself.",
    translations: names(
      "Choose the next kind sentence you can say to yourself.",
      "మీతో మీరు చెప్పుకోగల తదుపరి మృదువైన వాక్యం ఎంచుకోండి.",
      "अपने से कह सकने वाला अगला कोमल वाक्य चुनिए।",
      "உங்களிடம் நீங்கள் சொல்லக்கூடிய அடுத்த கனிவான வாக்கியத்தை தேர்வு செய்யுங்கள்.",
      "ನಿಮಗೆ ನೀವು ಹೇಳಬಹುದಾದ ಮುಂದಿನ ಮೃದು ವಾಕ್ಯವನ್ನು ಆರಿಸಿ.",
      "നിങ്ങളോട് നിങ്ങൾ പറയാവുന്ന അടുത്ത ദയയുള്ള വാചകം തിരഞ്ഞെടുക്കുക.",
    ),
  },
  {
    text: "There is still a place at the table. Keep your name in the conversation.",
    translations: names(
      "There is still a place at the table. Keep your name in the conversation.",
      "బల్ల వద్ద ఇంకా చోటు ఉంది. సంభాషణలో మీ పేరు ఉంచుకోండి.",
      "मेज़ पर अभी जगह है। बातचीत में अपना नाम रखिए।",
      "மேசையில் இன்னும் இடம் உண்டு. உரையாடலில் உங்கள் பெயரை வையுங்கள்.",
      "ಮೇಜಿನಲ್ಲಿ ಇನ್ನೂ ಜಾಗವಿದೆ. ಮಾತಿನಲ್ಲಿ ನಿಮ್ಮ ಹೆಸರಿಡಿ.",
      "മേശയിൽ ഇനിയും ഇടമുണ്ട്. സംസാരത്തിൽ നിങ്ങളുടെ പേര് വയ്ക്കുക.",
    ),
  },
  {
    text: "Light does not argue with the dark. It simply arrives.",
    translations: names(
      "Light does not argue with the dark. It simply arrives.",
      "వెలుగు చీకటితో వాదించదు. అది వస్తుంది.",
      "रोशनी अँधेरे से बहस नहीं करती। वह आ जाती है।",
      "ஒளி இருளுடன் வாதாடாது. அது வந்துவிடும்.",
      "ಬೆಳಕು ಕತ್ತಲೆಯೊಂದಿಗೆ ವಾದಿಸುವುದಿಲ್ಲ. ಅದು ಬರುತ್ತದೆ.",
      "വെളിച്ചം ഇരുട്ടുമായി തർക്കിക്കുന്നില്ല. അത് വരുന്നു.",
    ),
  },
];
