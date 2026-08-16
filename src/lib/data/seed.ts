import type {
  AnalyticsSnapshot,
  Article,
  Category,
  FaqItem,
  Quote,
  ResourceItem,
  Story,
  TeamMember,
  Testimonial,
  Video,
} from "@/types";
import { names } from "@/lib/i18n/content";
import {
  ARTICLE_COPY,
  FAQ_COPY,
  RESOURCE_COPY,
  STORY_COPY,
  TEAM_COPY,
  TESTIMONIAL_COPY,
} from "@/lib/i18n/editorial";

export const categories: Category[] = [
  {
    id: "cat-inspiration",
    slug: "inspiration",
    name: "Inspiration",
    names: names("Inspiration", "ప్రేరణ", "प्रेरणा", "ஊக்கம்", "ಪ್ರೇರಣೆ", "പ്രചോദനം"),
    description: "Gentle reminders that brighter days are possible.",
    type: "video",
  },
  {
    id: "cat-success",
    slug: "success-stories",
    name: "Success stories",
    names: names("Success stories", "విజయ కథలు", "सफलता की कहानियाँ", "வெற்றிக் கதைகள்", "ಯಶಸ್ಸಿನ ಕಥೆಗಳು", "വിജയകഥകൾ"),
    description: "Journeys of people who rebuilt hope.",
    type: "video",
  },
  {
    id: "cat-students",
    slug: "for-students",
    name: "For students",
    names: names("For students", "విద్యార్థులకు", "विद्यार्थियों के लिए", "மாணவர்களுக்கு", "ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ", "വിദ്യാർത്ഥികൾക്ക്"),
    description: "Support for study, pressure, and belonging.",
    type: "video",
  },
  {
    id: "cat-parents",
    slug: "for-parents",
    name: "For parents",
    names: names("For parents", "తల్లిదండ్రులకు", "माता-पिता के लिए", "பெற்றோருக்கு", "ತಂದೆತಾಯಿಯರಿಗೆ", "മാതാപിതാക്കൾക്ക്"),
    description: "How to listen, support, and stay connected.",
    type: "video",
  },
  {
    id: "cat-youth",
    slug: "for-youth",
    name: "For youth",
    names: names("For youth", "యువత కోసం", "युवाओं के लिए", "இளைஞர்களுக்கு", "ಯುವಜನರಿಗೆ", "യുവാക്കൾക്ക്"),
    description: "Hopeful messages for young adults.",
    type: "video",
  },
  {
    id: "cat-mental-health",
    slug: "mental-health",
    name: "Mental health",
    names: names("Mental health", "మానసిక ఆరోగ్యం", "मानसिक स्वास्थ्य", "மனநலம்", "ಮಾನಸಿಕ ಆರೋಗ್ಯ", "മാനസികാരോഗ്യം"),
    description: "Everyday habits that nourish mind and body.",
    type: "video",
  },
  {
    id: "cat-meditation",
    slug: "meditation",
    name: "Meditation",
    names: names("Meditation", "ధ్యానం", "ध्यान", "தியானம்", "ಧ್ಯಾನ", "ധ്യാനം"),
    description: "Breath, pause, and gentle presence.",
    type: "video",
  },
  {
    id: "cat-spiritual",
    slug: "spiritual",
    name: "Spiritual",
    names: names("Spiritual", "ఆధ్యాత్మికం", "आध्यात्मिक", "ஆன்மீகம்", "ಆಧ್ಯಾತ್ಮಿಕ", "ആധ്യാത്മികം"),
    description: "Quiet meaning without sensational claims.",
    type: "video",
  },
  {
    id: "cat-life-advice",
    slug: "life-advice",
    name: "Life advice",
    names: names("Life advice", "జీవిత సలహాలు", "जीवन सलाह", "வாழ்க்கை அறிவுரை", "ಜೀವನ ಸಲಹೆ", "ജീവിത ഉപദേശം"),
    description: "Small practices for ordinary days.",
    type: "video",
  },
  {
    id: "cat-confidence",
    slug: "self-confidence",
    name: "Self-confidence",
    names: names("Self-confidence", "ఆత్మవిశ్వాసం", "आत्मविश्वास", "ஆத்மநம்பிக்கை", "ಆತ್ಮವಿಶ್ವಾಸ", "ആത്മവിശ്വാസം"),
    description: "Kind strength and a steadier inner voice.",
    type: "video",
  },
  {
    id: "cat-family",
    slug: "family",
    name: "Family & Friends",
    names: names("Family & Friends", "కుటుంబం, స్నేహితులు", "परिवार और मित्र", "குடும்பம் நண்பர்கள்", "ಕುಟುಂಬ ಸ್ನೇಹಿತರು", "കുടുംബവും സുഹൃത്തുക്കളും"),
    description: "How to listen, support, and stay connected.",
    type: "story",
  },
  {
    id: "cat-resilience",
    slug: "resilience",
    name: "Resilience",
    names: names("Resilience", "ధైర్యం", "लचीलापन", "நெகிழ்ச்சி", "ಸ್ಥಿತಿಸ್ಥಾಪಕತ್ವ", "സ്ഥിരോത്സാഹം"),
    description: "Building strength through small, steady steps.",
    type: "story",
  },
  {
    id: "cat-mind",
    slug: "mind",
    name: "Mind & Mood",
    names: names("Mind & Mood", "మనసు, మానసిక స్థితి", "मन और मनोदशा", "மனமும் மனநிலையும்", "ಮನಸ್ಸು ಮತ್ತು ಮನಸ್ಥಿತಿ", "മനസ്സും മാനസികാവസ്ഥയും"),
    description: "Understanding feelings with compassion.",
    type: "blog",
  },
];

export const videos: Video[] = [
  {
    id: "vid-1",
    slug: "you-are-not-alone",
    title: "You Are Not Alone",
    description:
      "A quiet visual reminder that connection is always possible. Let the rhythm of the waves steady your breathing.",
    tags: ["hope", "calm", "connection"],
    categoryId: "cat-inspiration",
    featured: true,
    thumbnailUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
    source: "mp4",
    mp4Url:
      "https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4",
    durationSeconds: 184,
    likes: 1284,
    views: 18420,
    status: "published",
    publishedAt: "2026-03-12T00:00:00.000Z",
  },
  {
    id: "vid-2",
    slug: "morning-light",
    title: "Morning Light: A Gentle Start",
    description:
      "Begin the day with sunlight, slow movement, and a message of self-kindness.",
    tags: ["wellness", "morning", "ritual"],
    categoryId: "cat-mental-health",
    featured: true,
    thumbnailUrl:
      "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1600&q=80",
    source: "mp4",
    mp4Url:
      "https://videos.pexels.com/video-files/853889/853889-hd_1920_1080_25fps.mp4",
    durationSeconds: 210,
    likes: 896,
    views: 12011,
    status: "published",
    publishedAt: "2026-04-02T00:00:00.000Z",
  },
  {
    id: "vid-3",
    slug: "small-steps-home",
    title: "Small Steps Back to Yourself",
    description:
      "Recovery is rarely a straight line. This film honours the courage of taking one kind step at a time.",
    tags: ["recovery", "hope"],
    categoryId: "cat-success",
    featured: true,
    thumbnailUrl:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=80",
    source: "mp4",
    mp4Url:
      "https://videos.pexels.com/video-files/856973/856973-hd_1920_1080_25fps.mp4",
    durationSeconds: 246,
    likes: 1502,
    views: 22190,
    status: "published",
    publishedAt: "2026-02-18T00:00:00.000Z",
  },
  {
    id: "vid-4",
    slug: "how-to-listen",
    title: "How to Listen When Someone Is Hurting",
    description:
      "A practical, compassionate guide for families and friends who want to show up with care.",
    tags: ["family", "support", "listening"],
    categoryId: "cat-parents",
    featured: false,
    thumbnailUrl:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=80",
    source: "youtube",
    youtubeId: "2g811E4x1PQ",
    durationSeconds: 312,
    likes: 640,
    views: 9804,
    status: "published",
    publishedAt: "2026-05-09T00:00:00.000Z",
  },
  {
    id: "vid-5",
    slug: "breathing-with-the-sky",
    title: "Breathing With the Sky",
    description:
      "A short guided pause. Follow the clouds, lengthen your exhale, and give your nervous system a rest.",
    tags: ["calm", "breathing", "wellness"],
    categoryId: "cat-meditation",
    featured: true,
    thumbnailUrl:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=80",
    source: "mp4",
    mp4Url:
      "https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_25fps.mp4",
    durationSeconds: 168,
    likes: 2104,
    views: 30112,
    status: "published",
    publishedAt: "2026-01-20T00:00:00.000Z",
  },
  {
    id: "vid-6",
    slug: "second-chances",
    title: "Stories of Second Chances",
    description:
      "People who chose to stay share what helped them rebuild meaning, friendship, and purpose.",
    tags: ["recovery", "stories", "hope"],
    categoryId: "cat-success",
    featured: true,
    thumbnailUrl:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80",
    source: "vimeo",
    vimeoId: "76979871",
    durationSeconds: 420,
    likes: 1788,
    views: 25400,
    status: "published",
    publishedAt: "2026-06-01T00:00:00.000Z",
  },
  {
    id: "vid-7",
    slug: "strength-in-ordinary-days",
    title: "Strength in Ordinary Days",
    description:
      "Resilience often looks like making tea, sending a message, or stepping outside for five minutes of air.",
    tags: ["resilience", "everyday"],
    categoryId: "cat-life-advice",
    featured: false,
    thumbnailUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=80",
    source: "mp4",
    mp4Url:
      "https://videos.pexels.com/video-files/5752729/5752729-uhd_2560_1440_30fps.mp4",
    durationSeconds: 198,
    likes: 733,
    views: 8120,
    status: "published",
    publishedAt: "2026-07-14T00:00:00.000Z",
  },
  {
    id: "vid-8",
    slug: "a-letter-to-your-future-self",
    title: "A Letter to Your Future Self",
    description:
      "An invitation to imagine a kinder tomorrow and to leave a message of encouragement for the person you are becoming.",
    tags: ["inspiration", "hope"],
    categoryId: "cat-confidence",
    featured: false,
    thumbnailUrl:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1600&q=80",
    source: "mp4",
    mp4Url:
      "https://videos.pexels.com/video-files/1093662/1093662-hd_1920_1080_30fps.mp4",
    durationSeconds: 156,
    likes: 991,
    views: 11004,
    status: "published",
    publishedAt: "2026-08-01T00:00:00.000Z",
  },
];

export const stories: Story[] = [
  {
    id: "story-1",
    slug: "ananya-learning-to-stay",
    title: "Learning to Stay",
    excerpt:
      "After months of feeling disconnected, Ananya found that asking for help was the bravest sentence she had ever spoken.",
    body: `There was a season when Ananya measured days by how quietly she could move through them. She went to lectures, answered messages with a thumbs-up, and told people she was “fine” because it seemed easier than explaining the heaviness she could not name.

What changed was not a dramatic turning point. It was a friend who sat with her on a hostel terrace and said, “You do not have to carry this alone.” That sentence made room for a conversation with a counsellor, then with her sister, then with herself.

Recovery, for Ananya, looks like morning walks, medicine taken on time, and a group chat that checks in without demanding a performance of happiness. She still has difficult days. She also has evidence that she can survive them.

If you are in a similar season, she wants you to know this: staying is not a small thing. It is a beginning.`,
    authorName: "Ananya M.",
    authorRole: "Student, Bengaluru",
    categoryId: "cat-success",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=80",
    readingMinutes: 4,
    featured: true,
    publishedAt: "2026-05-22T00:00:00.000Z",
  },
  {
    id: "story-2",
    slug: "ravi-and-the-kitchen-light",
    title: "The Kitchen Light",
    excerpt:
      "Ravi’s father learned that support can be as simple as leaving a light on and asking better questions.",
    body: `When Ravi withdrew from family dinners, his father first responded the way many of us do: with advice, then with worry, then with silence. Nothing seemed to reach him.

A counsellor suggested a different posture: curiosity instead of correction. His father began leaving the kitchen light on at night. He started asking, “Would you like company, or space?” He learned to sit nearby without filling every pause.

Ravi says those ordinary gestures mattered more than speeches. They told him he still belonged. Together they found a therapist, rebuilt a walking routine, and made a family plan for hard evenings: no isolation, no lectures, just presence and professional help when needed.

This is a story about recovery, and also about how families can grow softer without giving up.`,
    authorName: "Ravi & family",
    authorRole: "Pune",
    categoryId: "cat-family",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1600&q=80",
    readingMinutes: 5,
    featured: true,
    publishedAt: "2026-04-11T00:00:00.000Z",
  },
  {
    id: "story-3",
    slug: "meera-second-morning",
    title: "A Second Morning",
    excerpt:
      "Meera describes the slow return of colour after treatment, friendship, and a promise to keep choosing tomorrow.",
    body: `Meera used to believe that strength meant never needing anyone. That belief nearly cost her the life she now protects with both hands.

Her turning toward help included a trusted doctor, a support group, and a neighbour who brought extra tea without asking for explanations. Healing was not instant. It was appointments kept, sleep rebuilt, and a notebook of reasons to stay: her niece’s laugh, monsoon evenings, unfinished paintings.

Today she volunteers with youth wellness workshops. She does not romanticise pain. She talks about hope as a practice: one message sent, one meal eaten, one night survived.

“If you are reading this in the dark,” she writes, “borrow my morning until yours returns.”`,
    authorName: "Meera S.",
    authorRole: "Designer, Kochi",
    categoryId: "cat-resilience",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
    readingMinutes: 4,
    featured: true,
    publishedAt: "2026-06-30T00:00:00.000Z",
  },
  {
    id: "story-4",
    slug: "arjun-team-captain",
    title: "The Captain Who Asked for a Substitution",
    excerpt:
      "A college athlete learned that asking to rest was not failure. It was leadership.",
    body: `Arjun was the teammate everyone leaned on. When anxiety began stealing his sleep, he hid it because captains were supposed to be unshakeable.

A physiotherapist noticed the exhaustion and asked a careful question. That opened a path to campus counselling and a conversation with his coach. The team did not collapse. They adjusted. Arjun learned that vulnerability can be a form of leadership.

He still plays. He also keeps therapy appointments the way he keeps training. His message to other young men is simple: strength includes knowing when to ask for a substitution.`,
    authorName: "Arjun K.",
    authorRole: "Athlete, Delhi",
    categoryId: "cat-resilience",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1600&q=80",
    readingMinutes: 3,
    featured: false,
    publishedAt: "2026-07-19T00:00:00.000Z",
  },
].map((story) => ({
  ...story,
  ...STORY_COPY[story.id],
}));

export const articles: Article[] = [
  {
    id: "blog-1",
    slug: "five-gentle-ways-to-steady-a-hard-day",
    title: "Five Gentle Ways to Steady a Hard Day",
    excerpt:
      "Small, body-based practices that can help you feel a little safer in the present moment.",
    body: `A hard day does not have to be solved in one sitting. These practices are invitations, not assignments.

1. Lengthen the exhale. Inhale for four counts, exhale for six. Repeat ten times.
2. Name five things you can see. Orientation tells the nervous system you are here, now.
3. Drink a glass of water slowly. Care can be this ordinary.
4. Send one honest message to someone safe: “Can you talk later?”
5. Step outside, even for two minutes. Light and air are underrated medicines.

If the day still feels too heavy, reach out to a trusted person or a professional helpline. You deserve support that is real, not only advice.`,
    categoryId: "cat-mind",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1600&q=80",
    tags: ["coping", "wellness"],
    aiGenerated: false,
    readingMinutes: 4,
    publishedAt: "2026-06-08T00:00:00.000Z",
  },
  {
    id: "blog-2",
    slug: "hope-is-a-practice",
    title: "Hope Is a Practice, Not a Mood",
    excerpt:
      "An inspirational reflection on building hope the way we build any other habit: with patience and repetition.",
    body: `Hope is often described as a feeling that arrives uninvited. For many people, it is more like a muscle. It grows when we use it in small ways: keeping a routine, letting someone in, believing that tomorrow can be different even when today is grey.

You do not have to feel hopeful to act with hope. Sending the message, filling the prescription, walking to the balcony — these are hopeful acts. They do not erase pain. They keep a door open.

If hope feels far away, borrow it from a story, a friend, a sunrise, or a helpline. Community can hold the light until you can carry it again.`,
    categoryId: "cat-inspiration",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80",
    tags: ["hope", "inspiration"],
    aiGenerated: true,
    readingMinutes: 3,
    publishedAt: "2026-07-02T00:00:00.000Z",
  },
  {
    id: "blog-3",
    slug: "how-to-support-someone-you-love",
    title: "How to Support Someone You Love",
    excerpt:
      "Listening well, reducing isolation, and knowing when to involve professional help.",
    body: `You cannot fix another person’s pain, and you do not have to. What helps most is a steady, non-judgemental presence.

Ask open questions. Avoid rushing to silver linings. Offer practical help: a meal, a ride, sitting together during a difficult evening. Encourage professional support without making it a threat.

Take care of yourself too. Supporting someone is meaningful work, and you are allowed to seek guidance from helplines and clinicians. Connection heals more than advice does.`,
    categoryId: "cat-mind",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1600&q=80",
    tags: ["family", "support"],
    aiGenerated: false,
    readingMinutes: 5,
    publishedAt: "2026-03-28T00:00:00.000Z",
  },
  {
    id: "blog-4",
    slug: "the-quiet-courage-of-continuing",
    title: "The Quiet Courage of Continuing",
    excerpt:
      "An AI-assisted meditation on the bravery found in ordinary persistence.",
    body: `Courage is not always loud. Sometimes it is washing a cup. Sometimes it is answering a call. Sometimes it is simply remaining until the next hour.

If you are in a season of endurance, honour that. You are allowed to rest. You are allowed to ask for company. You are allowed to believe that your life still holds unwritten chapters.

May you meet yourself with the same gentleness you would offer a friend.`,
    categoryId: "cat-inspiration",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=1600&q=80",
    tags: ["inspiration", "resilience"],
    aiGenerated: true,
    readingMinutes: 2,
    publishedAt: "2026-08-05T00:00:00.000Z",
  },
  {
    id: "blog-5",
    slug: "sleep-sunlight-and-steady-meals",
    title: "Sleep, Sunlight, and Steady Meals",
    excerpt:
      "Three foundations of mental wellness that are easy to overlook when life feels overwhelming.",
    body: `When the mind is noisy, the basics can feel too simple to matter. They matter a great deal.

Sleep: keep a consistent wind-down, dim screens, and treat rest as care rather than laziness.
Sunlight: ten minutes of morning light can help reset mood and body clock.
Meals: regular food is nervous-system support. Keep easy options available for low-energy days.

These are not replacements for therapy or medical care. They are companions to it — small ways of telling your body it is worth looking after.`,
    categoryId: "cat-mind",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1493770348161-369560ae630e?auto=format&fit=crop&w=1600&q=80",
    tags: ["wellness", "habits"],
    aiGenerated: false,
    readingMinutes: 4,
    publishedAt: "2026-02-14T00:00:00.000Z",
  },
].map((article) => ({
  ...article,
  ...ARTICLE_COPY[article.id],
}));

export const quotes: Quote[] = [
  {
    id: "q1",
    text: "However deep the night, sunrise still comes.",
    translations: names(
      "However deep the night, sunrise still comes.",
      "చీకటి ఎంత గాఢమైనా...\nసూర్యోదయం తప్పకుండా వస్తుంది.",
      "रात जितनी गहरी हो, सूर्योदय आता ही है।",
      "இருள் எவ்வளவு ஆழமானாலும் சூரிய உதயம் வரும்.",
      "ಕತ್ತಲೆ ಎಷ್ಟೇ ಆಳವಾದರೂ ಸೂರ್ಯೋದಯ ಬರುತ್ತದೆ.",
      "ഇരുട്ട് എത്ര ആഴമുള്ളതായാലും സൂര്യോദയം വരും.",
    ),
    author: "stopsuicide.in",
    active: true,
  },
  {
    id: "q2",
    text: "Your life is precious.",
    translations: names(
      "Your life is precious.",
      "మీ జీవితం అమూల్యం.",
      "आपका जीवन अमूल्य है।",
      "உங்கள் வாழ்க்கை விலைமதிப்பற்றது.",
      "ನಿಮ್ಮ ಜೀವನ ಅಮೂಲ್ಯ.",
      "നിങ്ങളുടെ ജീവിതം അമൂല്യമാണ്.",
    ),
    author: "Community voices",
    active: true,
  },
  {
    id: "q3",
    text: "The world needs your smile.",
    translations: names(
      "The world needs your smile.",
      "మీ నవ్వు ప్రపంచానికి అవసరం.",
      "दुनिया को आपकी मुस्कान चाहिए।",
      "உலகிற்கு உங்கள் புன்னகை தேவை.",
      "ಜಗತ್ತಿಗೆ ನಿಮ್ಮ ನಗು ಬೇಕು.",
      "ലോകത്തിന് നിങ്ങളുടെ പുഞ്ചിരി വേണം.",
    ),
    author: "Survivor community",
    active: true,
  },
  {
    id: "q4",
    text: "Stand today. Tomorrow’s victory can still be yours.",
    translations: names(
      "Stand today. Tomorrow’s victory can still be yours.",
      "ఈ రోజు నిలబడండి...\nరేపు విజయం మీదే.",
      "आज खड़े रहिए। कल की जीत अभी भी आपकी हो सकती है।",
      "இன்று நில்லுங்கள். நாளை வெற்றி உங்களுடையதாக இருக்கலாம்.",
      "ಇಂದು ನಿಲ್ಲಿ. ನಾಳೆಯ ಗೆಲುವು ನಿಮ್ಮದಾಗಬಹುದು.",
      "ഇന്ന് നിൽക്കുക. നാളത്തെ വിജയം നിങ്ങളുടേതാകാം.",
    ),
    author: "Hope notes",
    active: true,
  },
  {
    id: "q5",
    text: "Your story is not finished yet.",
    translations: names(
      "Your story is not finished yet.",
      "మీ కథ ఇంకా పూర్తికాలేదు.",
      "आपकी कहानी अभी खत्म नहीं हुई।",
      "உங்கள் கதை இன்னும் முடியவில்லை.",
      "ನಿಮ್ಮ ಕಥೆ ಇನ್ನೂ ಮುಗಿದಿಲ್ಲ.",
      "നിങ്ങളുടെ കഥ ഇനിയും തീർന്നിട്ടില്ല.",
    ),
    author: "stopsuicide.in",
    active: true,
  },
  {
    id: "q6",
    text: "Connection is medicine. Let someone sit beside you.",
    translations: names(
      "Connection is medicine. Let someone sit beside you.",
      "అనుబంధం ఒక మందు. ఎవరినైనా పక్కన కూర్చోనివ్వండి.",
      "जुड़ाव एक दवा है। किसी को अपने पास बैठने दीजिए।",
      "இணைப்பு ஒரு மருந்து. யாரையாவது அருகில் அமர விடுங்கள்.",
      "ಸಂಪರ್ಕವೇ ಔಷಧ. ಯಾರನ್ನಾದರೂ ಹತ್ತಿರ ಕುಳಿತುಕೊಳ್ಳಲು ಬಿಡಿ.",
      "ബന്ധം ഒരു മരുന്നാണ്. ആരെയെങ്കിലും അരികിൽ ഇരിക്കാൻ അനുവദിക്കുക.",
    ),
    author: "Wellness circle",
    active: true,
  },
  {
    id: "q7",
    text: "You are not alone. Help is real, and so is hope.",
    translations: names(
      "You are not alone. Help is real, and so is hope.",
      "మీరు ఒంటరివారు కాదు. సహాయం నిజం, ఆశ కూడా నిజం.",
      "आप अकेले नहीं हैं। मदद सच है, और आशा भी।",
      "நீங்கள் தனியாக இல்லை. உதவியும் நம்பிக்கையும் உண்மை.",
      "ನೀವು ಒಂಟಿಯಲ್ಲ. ಸಹಾಯ ನಿಜ, ಆಶೆಯೂ ನಿಜ.",
      "നിങ്ങൾ ഒറ്റയ്ക്കല്ല. സഹായവും പ്രത്യാശയും സത്യമാണ്.",
    ),
    author: "stopsuicide.in",
    active: true,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Nisha",
    role: "Teacher, Jaipur",
    quote:
      "The stories reminded me that recovery can be quiet and still be real. I sent the Get Help page to a student who needed it.",
    quotes: TESTIMONIAL_COPY.t1.quotes,
    roles: TESTIMONIAL_COPY.t1.roles,
    avatarUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "t2",
    name: "Kabir",
    role: "Software engineer, Hyderabad",
    quote:
      "I watched the breathing film on a difficult night. It did not fix everything. It helped me stay until morning.",
    quotes: TESTIMONIAL_COPY.t2.quotes,
    roles: TESTIMONIAL_COPY.t2.roles,
    avatarUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "t3",
    name: "Leela & Suresh",
    role: "Parents, Chennai",
    quote:
      "The family guidance taught us to listen without rushing to solutions. Our home feels safer for our son.",
    quotes: TESTIMONIAL_COPY.t3.quotes,
    roles: TESTIMONIAL_COPY.t3.roles,
    avatarUrl:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
  },
];

export const resources: ResourceItem[] = [
  {
    id: "res-1",
    slug: "mental-wellness-tips",
    title: "Mental wellness tips",
    summary: "Everyday practices that support a calmer nervous system.",
    category: "tips",
    icon: "sun",
    body: `Protect sleep, eat regularly, and get a little morning light. Limit late-night news if it agitates you. Keep a short list of people you can text. Move your body in a way that feels kind, not punishing. Notice caffeine and alcohol, which can intensify anxiety for some people. None of this replaces professional care, but each habit can make care more possible.`,
    ...RESOURCE_COPY["res-1"],
  },
  {
    id: "res-2",
    slug: "coping-strategies",
    title: "Coping strategies",
    summary: "Grounding skills you can use when emotions feel overwhelming.",
    category: "coping",
    icon: "heart",
    body: `Try the 5-4-3-2-1 senses exercise. Hold something cool or warm. Name the feeling without judging it. Breathe out longer than you breathe in. If thoughts race, write them down and close the notebook. Put your feet on the floor and describe the room out loud. If you feel unsafe, contact a helpline or someone you trust immediately.`,
    ...RESOURCE_COPY["res-2"],
  },
  {
    id: "res-3",
    slug: "family-guidance",
    title: "Family guidance",
    summary: "How loved ones can offer presence without pressure.",
    category: "family",
    icon: "users",
    body: `Listen more than you lecture. Avoid dismissing feelings. Ask what would help today. Reduce access to isolation when someone is struggling, and involve professionals early. Take threats of self-harm seriously and seek urgent help. Caregivers need rest and their own support. You can love someone and still set boundaries that keep everyone safer.`,
    ...RESOURCE_COPY["res-3"],
  },
  {
    id: "res-4",
    slug: "frequently-asked-questions",
    title: "Frequently asked questions",
    summary: "Clear answers about this platform, privacy, and getting help.",
    category: "faq",
    icon: "help",
    body: `Is this a crisis service? No. We share hope and education, and we always point people toward trained helplines and clinicians. Is content moderated? Yes. We do not publish graphic or sensational material. Can I share my story? Yes, through the contact and volunteer forms. We edit for safety and dignity. Do you replace therapy? Never. Professional support saves lives.`,
    ...RESOURCE_COPY["res-4"],
  },
];

export const faqs: FaqItem[] = FAQ_COPY.map((faq) => ({
  id: faq.id,
  question: faq.questions.en ?? "",
  answer: faq.answers.en ?? "",
  questions: faq.questions,
  answers: faq.answers,
}));

export const team: TeamMember[] = [
  {
    id: "tm1",
    name: "Dr. Aisha Rahman",
    role: "Clinical advisor",
    bio: "Psychiatrist focused on community mental health and compassionate public education.",
    roles: TEAM_COPY.tm1.roles,
    bios: TEAM_COPY.tm1.bios,
    imageUrl:
      "https://images.unsplash.com/photo-1559839734-166b3806ba4c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "tm2",
    name: "Vikram Shah",
    role: "Founder & editor",
    bio: "Builds hopeful media that helps people stay, connect, and ask for help sooner.",
    roles: TEAM_COPY.tm2.roles,
    bios: TEAM_COPY.tm2.bios,
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "tm3",
    name: "Priya Nair",
    role: "Community lead",
    bio: "Coordinates volunteers, survivor-story ethics, and family education programmes.",
    roles: TEAM_COPY.tm3.roles,
    bios: TEAM_COPY.tm3.bios,
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=800&q=80",
  },
];

export const analyticsSnapshot: AnalyticsSnapshot = {
  visitors: 48210,
  videoViews: 126440,
  storiesRead: 18402,
  newsletterSignups: 3211,
  helpClicks: 8904,
  weekly: [
    { label: "Mon", views: 4200, visitors: 1600 },
    { label: "Tue", views: 5100, visitors: 1880 },
    { label: "Wed", views: 4680, visitors: 1720 },
    { label: "Thu", views: 6020, visitors: 2100 },
    { label: "Fri", views: 7340, visitors: 2460 },
    { label: "Sat", views: 8120, visitors: 2800 },
    { label: "Sun", views: 6900, visitors: 2310 },
  ],
};

export const adminUsers = [
  {
    id: "u1",
    email: "hello@stopsuicide.in",
    fullName: "Platform Admin",
    role: "admin" as const,
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "u2",
    email: "editor@stopsuicide.in",
    fullName: "Content Editor",
    role: "editor" as const,
    createdAt: "2026-03-12T00:00:00.000Z",
  },
  {
    id: "u3",
    email: "author@stopsuicide.in",
    fullName: "Story Author",
    role: "author" as const,
    createdAt: "2026-05-01T00:00:00.000Z",
  },
];
