/**
 * All visible text of the landing page, in the three languages of the Academy
 * (English `/`, German `/de/`, Vietnamese `/vi/`). Edit here, then `node build.mjs`.
 *
 * Brand rules (Spavio AI Academy, Violet Glam): no em-dashes, hero sub-text of
 * at most 20 words, every CTA label fits one line in every language.
 *
 * The Chinese sample lines are the same in every language (only the pinyin
 * line and the translation change). They are written in Traditional characters
 * because the lecturer studied in Taiwan; change `demo` below if the course
 * teaches Simplified.
 */

/** Shared across languages: Chinese, pinyin. Translations live in each language. */
export const demoShared = [
  { zh: '你好,我想詢問這款產品的價格。', py: 'Nǐ hǎo, wǒ xiǎng xúnwèn zhè kuǎn chǎnpǐn de jiàgé.' },
  { zh: '最少訂購量是多少?', py: 'Zuìshǎo dìnggòu liàng shì duōshǎo?' },
  { zh: '期待合作愉快!', py: 'Qídài hézuò yúkuài!' },
];

/**
 * Marketplaces and trade platforms shown as a scrolling logo strip, same in every
 * language. `logo` is a file in assets/platforms/ (each platform's own app icon); `full: true` marks a complete logo that already contains the name (shown larger, without the text).
 * Names and logos belong to their owners; the page says there is no affiliation.
 */
export const platforms = [
  { name: "Alibaba.com", logo: "alibaba-com.png" },
  { name: "1688", logo: "1688.png" },
  { name: "Taobao", logo: "taobao.png" },
  { name: "AliExpress", logo: "aliexpress.png" },
  { name: "JD.com", logo: "jd-com.png", full: true },
  { name: "Pinduoduo", logo: "pinduoduo.png" },
  { name: "Made-in-China.com", logo: "made-in-china-com.png" },
  { name: "Global Sources", logo: "global-sources.png" },
  { name: "DHgate", logo: "dhgate.png" },
  { name: "Temu", logo: "temu.png" },
];

const en = {
  lang: 'en',
  ogLocale: 'en_US',
  label: 'English',
  meta: {
    title: 'Spavio AI Academy | Learn Skills, Grow Business',
    description:
      'Learn the Chinese you need for ordering, import-export and cross-border e-commerce with Minh Khue Tran. Reserve your early-bird seat for 299 €, no payment today.',
  },
  nav: { course: 'The course', lecturer: 'Lecturer', offer: 'Early bird', faq: 'FAQ', reserve: 'Reserve my seat', start: "Start free", academy: "Academy" },
  hero: {
    badge: 'Early bird · 299 €',
    title: 'Chinese for business,',
    titleEm: 'from your first order',
    subtitle:
      'Learn the Chinese you need for ordering, import-export and cross-border e-commerce, with Minh Khue Tran.',
    ctaPrimary: 'Reserve my seat',
    ctaSecondary: 'Meet the lecturer',
    note: 'No payment today. Reserving is free and non-binding.',
  },
  /** Spavio AI Academy promotion: the Academy's own hero and "build" section copy. */
  academy: {
    "hero": {
      "title": "Your expertise as an interactive course,",
      "titleEm": "built in minutes",
      "subtitle": "Describe your topic or upload a PDF. Spavio AI Academy builds the course, AI coach and quizzes.",
      "frameAlt": "The Spavio AI Academy composer, where you describe the course you want to create"
    },
    "build": {
      "eyebrow": "Spavio AI Academy",
      "title": "Describe the course,",
      "titleEm": "we build it",
      "body": "A short interview about goal and level, then the AI writes a course plan. You review, edit and approve.",
      "cta": "Start free",
      "bullets": [
        "Interview about topic, audience and prior knowledge",
        "A blueprint with modules and learning goals that you edit freely",
        "Upload a PDF or your own material as the basis of the course",
        "Courses in 12 languages, interface in German, English and Vietnamese"
      ],
      "imageAlt": "The course blueprint editor with modules and learning goals"
    }
  },
  demo: {
    label: 'A first look: asking a supplier',
    translations: [
      'Hello, I would like to ask about the price of this product.',
      'What is the minimum order quantity?',
      'Looking forward to working together!',
    ],
    pinyinLabel: 'Pinyin',
  },
  preview: {
    "eyebrow": "Lesson Preview",
    "title": "Preview",
    "titleEm": "Business Chinese Fundamentals",
    "body": "One of the lessons in Business Chinese Fundamentals: Meeting a Partner for the First Time at a Beauty Trade Fair.",
    "alt": "Lesson 1, slide {n} of {total}",
    "label": "Lesson 1 slides",
    "prev": "Previous slide",
    "next": "Next slide"
  },
  situations: {
    lead: 'The Chinese you will actually use at work',
    sub: 'Built around real business situations, not textbook small talk.',
    items: [
      "Business greetings",
      "Introducing your company",
      "Asking for quotations",
      "Placing orders",
      "Import and export terms",
      "Shipping and delivery",
      "Cross-border e-commerce",
      "Business emails and messages",
    ],
  },
  platforms: {
    lead: "The platforms where this Chinese is used",
    note: "",
  },
  learn: {
    title: 'What the course',
    titleEm: 'gives you',
    body: 'Business Chinese Fundamentals starts at the basics and goes straight to the situations you meet when you work with Chinese-speaking partners.',
    items: [
      {
        t: 'A solid base',
        d: 'The core words, phrases and sentence patterns you need to be understood in a business setting.',
      },
      {
        t: 'Ordering and quotations',
        d: 'Ask for prices, minimum quantities and terms, and place an order with confidence.',
      },
      {
        t: 'Import, export and shipping',
        d: 'The vocabulary of trade, documents and delivery, taught from real import-export practice.',
      },
      {
        t: 'Cross-border e-commerce',
        d: 'Communicate with suppliers and customers when you sell or source across borders.',
      },
    ],
  },
  how: {
    title: 'How you learn',
    steps: [
      { t: 'Learn the essentials', d: 'Short, focused lessons on Spavio AI Academy, built around one business situation each.' },
      { t: 'Practise with the AI coach', d: 'Quizzes and role-play let you try the phrases before you need them for real.' },
      { t: 'Use it on real tasks', d: 'Apply what you learned to your own orders, emails and conversations.' },
    ],
  },
  lecturer: {
    eyebrow: 'Your lecturer',
    /** Titles of the three credential cards (the bio list is split into three groups of three). */
    groupTitles: ['Education', 'Experience', 'Expertise'],
    name: 'Minh Khue Tran',
    photoAlt: 'Minh Khue Tran',
    bio: [
      'Bachelor’s degree in Business and International Trade, graduated in Taiwan.',
      'Master’s degree in International Information Systems, majoring in Data Analysis and Management, graduated in Germany.',
      'Coursework in Constitutional Law, Criminal Law, Intellectual Property Law and related legal fields in Taipei.',
      '8 years of experience working with Chinese and the Chinese-speaking market.',
      '2 years at a law firm in Taiwan, and a contributor to book publications with the Taipei Bar Association.',
      'Experience in ordering and purchasing, import-export and cross-border e-commerce.',
      'Specialises in teaching Chinese as it is used in real business, trade and import-export.',
      'Applies digital technology, AI and e-commerce platforms to international business.',
      'Experience in training, workforce development and consulting on the digital transformation of learning (Learning & Development) with AI agents at international German corporations such as AUDI and Krones.',
    ],
  },
  offer: {
    eyebrow: 'Early-bird offer',
    title: 'Join the first group',
    titleEm: 'at the early-bird price',
    body: 'We are opening the course to a first group of learners. Reserve your seat now and we will confirm the details by email before anything is charged.',
    badge: 'Early bird',
    price: '299 €',
    regularPrice: "400 €",
    regularLabel: "Regular price",
    limited: "Limited offer for early-bird learners",
    priceNote: 'one-time, for the full course',
    includes: [
      'Business Chinese Fundamentals, the full course',
      'Interactive lessons with AI coach, quizzes and role-play',
      'No payment today: reserve for free, decide later',
    ],
    cta: 'Reserve my seat',
  },
  form: {
    title: 'Reserve your early-bird seat',
    sub: 'It takes one minute. We will write to you with the start date and next steps.',
    name: 'Name',
    namePlaceholder: 'Your name',
    email: 'Email',
    emailPlaceholder: 'you@example.com',
    phone: "Phone number",
    phonePlaceholder: "+49 151 2345 6789",
    phoneVia: "Reachable on",
    goal: 'What do you need Chinese for?',
    goalPlaceholder: 'Choose one',
    goalOther: "Please tell us your goal",
    goalOtherPlaceholder: "For example: sourcing furniture from Taiwan",
    level: "Your current Chinese level",
    levelPlaceholder: "Choose one",
    levelOptions: ["Complete beginner","I know a few words and phrases","Intermediate: I can handle simple conversations","Advanced","Not sure"],
    goalOptions: [
      'Ordering and sourcing from China or Taiwan',
      'Import and export',
      'Cross-border e-commerce',
      'Working with Chinese-speaking partners',
      'Something else',
    ],
    consent: "I agree that Spavio AI may contact me about this course by email and, if I give a number, via Zalo or WhatsApp.",
    privacy: 'Privacy policy',
    submit: 'Reserve my seat',
    sending: 'Sending',
    successTitle: 'Your seat is reserved',
    success: 'Thank you. We will write to you soon with the start date and details. Nothing has been charged.',
    error: 'Sorry, that did not work. Please try again in a moment.',
    notConnected: 'Sign-up is not available right now. Please try again later.',
    required: 'Please fill in this field.',
    invalidEmail: 'Please enter a valid email address.',
    phoneInvalid: "Please enter a valid phone number with country code.",
    viaRequired: "Please choose Zalo or WhatsApp.",
  },
  faq: {
    title: 'Questions, answered',
    items: [
      { q: 'Do I pay when I reserve?', a: 'No. Reserving is free and non-binding. We confirm the details by email first and you decide then.' },
      { q: 'Is 299 € the final price?', a: '299 € is the early-bird price for people who reserve now. It is confirmed in the email we send you before anything is charged.' },
      { q: 'Do I need to know Chinese already?', a: 'The course starts with the fundamentals. If you are unsure about your level, tell us in the form.' },
      { q: 'What happens to my email address?', a: 'We use it only to contact you about this course. You can ask us to delete it at any time.' },
    ],
  },
  final: {
    title: 'Start doing business in Chinese',
    body: 'Reserve your early-bird seat for Business Chinese Fundamentals today.',
    cta: 'Reserve my seat',
  },
  footer: {
    tagline: 'AI learning platform for beauty professionals, trainers, coaches, and educators.',
    academy: 'Spavio AI Academy',
    imprint: 'Imprint',
    privacy: 'Privacy',
  },
};

const de = {
  lang: 'de',
  ogLocale: 'de_DE',
  label: 'Deutsch',
  meta: {
    title: 'Business-Chinesisch Grundlagen | Frühbucher 299 € | Spavio AI Academy',
    description:
      'Lerne das Chinesisch für Bestellung, Import-Export und grenzüberschreitenden E-Commerce mit Minh Khue Tran. Sichere dir deinen Frühbucherplatz für 299 €, heute ohne Zahlung.',
  },
  nav: { course: 'Der Kurs', lecturer: 'Kursleitung', offer: 'Frühbucher', faq: 'FAQ', reserve: 'Platz sichern', start: "Kostenlos starten", academy: "Academy" },
  hero: {
    badge: 'Frühbucher · 299 €',
    title: 'Business-Chinesisch,',
    titleEm: 'ab der ersten Bestellung',
    subtitle:
      'Lerne das Chinesisch für Bestellung, Import-Export und grenzüberschreitenden E-Commerce, mit Minh Khue Tran.',
    ctaPrimary: 'Platz sichern',
    ctaSecondary: 'Kursleitung kennenlernen',
    note: 'Heute keine Zahlung. Die Reservierung ist kostenlos und unverbindlich.',
  },
  /** Spavio AI Academy promotion: the Academy's own hero and "build" section copy. */
  academy: {
    "hero": {
      "title": "Dein Wissen als interaktiver Kurs,",
      "titleEm": "in Minuten gebaut",
      "subtitle": "Beschreibe dein Thema oder lade ein PDF hoch. Spavio AI Academy baut daraus Kurs, KI-Coach und Quiz.",
      "frameAlt": "Der Composer von Spavio AI Academy, in dem du beschreibst, welchen Kurs du erstellen möchtest"
    },
    "build": {
      "eyebrow": "Spavio AI Academy",
      "title": "Beschreibe den Kurs,",
      "titleEm": "wir bauen ihn",
      "body": "Ein kurzes Interview zu Ziel und Niveau, dann schreibt die KI einen Kursplan. Du prüfst, änderst und gibst frei.",
      "cta": "Kostenlos starten",
      "bullets": [
        "Interview zu Thema, Zielgruppe und Vorwissen",
        "Blueprint mit Modulen und Lernzielen, den du frei bearbeitest",
        "PDF oder eigenes Material hochladen, als Grundlage für den Kurs",
        "Kurse in 12 Sprachen, Oberfläche auf Deutsch, Englisch und Vietnamesisch"
      ],
      "imageAlt": "Der Blueprint-Editor mit Modulen und Lernzielen eines Kurses"
    }
  },
  demo: {
    label: 'Ein erster Blick: beim Lieferanten anfragen',
    translations: [
      'Guten Tag, ich möchte nach dem Preis dieses Produkts fragen.',
      'Wie hoch ist die Mindestbestellmenge?',
      'Auf eine gute Zusammenarbeit!',
    ],
    pinyinLabel: 'Pinyin',
  },
  preview: {
    "eyebrow": "Lektionsvorschau",
    "title": "Vorschau",
    "titleEm": "Business-Chinesisch Grundlagen",
    "body": "Eine der Lektionen aus Business-Chinesisch Grundlagen: das erste Treffen mit einem Geschäftspartner auf einer Kosmetikmesse.",
    "alt": "Lektion 1, Folie {n} von {total}",
    "label": "Folien der Lektion 1",
    "prev": "Vorherige Folie",
    "next": "Nächste Folie"
  },
  situations: {
    lead: 'Das Chinesisch, das du im Beruf wirklich brauchst',
    sub: 'Aufgebaut an echten Geschäftssituationen, nicht an Lehrbuch-Smalltalk.',
    items: [
      "Begrüßung im Geschäft",
      "Das eigene Unternehmen vorstellen",
      "Angebote anfragen",
      "Bestellungen aufgeben",
      "Import- und Exportbegriffe",
      "Versand und Lieferung",
      "Grenzüberschreitender E-Commerce",
      "Geschäftliche E-Mails und Nachrichten",
    ],
  },
  platforms: {
    lead: "Die Plattformen, auf denen du dieses Chinesisch brauchst",
    note: "",
  },
  learn: {
    title: 'Was der Kurs',
    titleEm: 'dir bringt',
    body: 'Business-Chinesisch Grundlagen beginnt bei den Basics und führt direkt zu den Situationen, die dir in der Zusammenarbeit mit chinesischsprachigen Partnern begegnen.',
    items: [
      {
        t: 'Eine solide Basis',
        d: 'Die wichtigsten Wörter, Wendungen und Satzmuster, damit du im Geschäftsalltag verstanden wirst.',
      },
      {
        t: 'Bestellung und Angebot',
        d: 'Preise, Mindestmengen und Konditionen erfragen und eine Bestellung sicher aufgeben.',
      },
      {
        t: 'Import, Export und Versand',
        d: 'Der Wortschatz rund um Handel, Dokumente und Lieferung, vermittelt aus der echten Import-Export-Praxis.',
      },
      {
        t: 'Grenzüberschreitender E-Commerce',
        d: 'Mit Lieferanten und Kunden kommunizieren, wenn du über Grenzen hinweg verkaufst oder einkaufst.',
      },
    ],
  },
  how: {
    title: 'So lernst du',
    steps: [
      { t: 'Das Wesentliche lernen', d: 'Kurze, fokussierte Lektionen auf Spavio AI Academy, jede rund um eine Geschäftssituation.' },
      { t: 'Mit dem KI-Coach üben', d: 'Quiz und Rollenspiele lassen dich die Wendungen ausprobieren, bevor du sie wirklich brauchst.' },
      { t: 'Im Alltag anwenden', d: 'Setze das Gelernte bei deinen eigenen Bestellungen, E-Mails und Gesprächen ein.' },
    ],
  },
  lecturer: {
    eyebrow: 'Deine Kursleitung',
    groupTitles: ['Ausbildung', 'Erfahrung', 'Schwerpunkte'],
    name: 'Minh Khue Tran',
    photoAlt: 'Minh Khue Tran',
    bio: [
      'Bachelor in Betriebswirtschaft und Internationalem Handel, Abschluss in Taiwan.',
      'Master in Internationalen Informationssystemen, Schwerpunkt Datenanalyse und Datenmanagement, Abschluss in Deutschland.',
      'Studienleistungen in Verfassungsrecht, Strafrecht, Recht des geistigen Eigentums und verwandten Rechtsgebieten in Taipeh.',
      '8 Jahre Erfahrung in der Arbeit mit der chinesischen Sprache und dem chinesischsprachigen Markt.',
      '2 Jahre in einer Anwaltskanzlei in Taiwan sowie Mitwirkung an Buchveröffentlichungen mit der Rechtsanwaltskammer Taipeh.',
      'Erfahrung in Einkauf und Bestellwesen, Import-Export und grenzüberschreitendem E-Commerce.',
      'Spezialisiert darauf, Chinesisch so zu vermitteln, wie es im echten Geschäft, im Handel und im Import-Export gebraucht wird.',
      'Setzt digitale Technologien, KI und E-Commerce-Plattformen im internationalen Geschäft ein.',
      'Erfahrung in Training, Personalentwicklung und Beratung zur digitalen Transformation des Lernens (Learning & Development) mit KI-Agenten bei internationalen deutschen Konzernen wie AUDI und Krones.',
    ],
  },
  offer: {
    eyebrow: 'Frühbucher-Angebot',
    title: 'Sei in der ersten Gruppe',
    titleEm: 'zum Frühbucherpreis',
    body: 'Wir öffnen den Kurs für eine erste Gruppe. Sichere dir jetzt deinen Platz, wir bestätigen die Details per E-Mail, bevor etwas abgebucht wird.',
    badge: 'Frühbucher',
    price: '299 €',
    regularPrice: "400 €",
    regularLabel: "Regulärer Preis",
    limited: "Begrenztes Angebot für Frühbucher",
    priceNote: 'einmalig, für den ganzen Kurs',
    includes: [
      'Business-Chinesisch Grundlagen, der komplette Kurs',
      'Interaktive Lektionen mit KI-Coach, Quiz und Rollenspielen',
      'Heute keine Zahlung: kostenlos reservieren, später entscheiden',
    ],
    cta: 'Platz sichern',
  },
  form: {
    title: 'Sichere dir deinen Frühbucherplatz',
    sub: 'Das dauert eine Minute. Wir melden uns mit Starttermin und nächsten Schritten.',
    name: 'Name',
    namePlaceholder: 'Dein Name',
    email: 'E-Mail',
    emailPlaceholder: 'du@beispiel.de',
    phone: "Telefonnummer",
    phonePlaceholder: "+49 151 2345 6789",
    phoneVia: "Erreichbar über",
    goal: 'Wofür brauchst du Chinesisch?',
    goalPlaceholder: 'Bitte wählen',
    goalOther: "Bitte beschreibe dein Ziel",
    goalOtherPlaceholder: "Zum Beispiel: Möbel aus Taiwan einkaufen",
    level: "Dein aktuelles Chinesisch-Niveau",
    levelPlaceholder: "Bitte wählen",
    levelOptions: ["Absoluter Anfänger","Ich kenne einige Wörter und Wendungen","Mittelstufe: ich kann einfache Gespräche führen","Fortgeschritten","Nicht sicher"],
    goalOptions: [
      'Bestellung und Einkauf in China oder Taiwan',
      'Import und Export',
      'Grenzüberschreitender E-Commerce',
      'Zusammenarbeit mit chinesischsprachigen Partnern',
      'Etwas anderes',
    ],
    consent: "Ich bin einverstanden, dass Spavio AI mich zu diesem Kurs per E-Mail und, falls ich eine Nummer angebe, über Zalo oder WhatsApp kontaktiert.",
    privacy: 'Datenschutz',
    submit: 'Platz sichern',
    sending: 'Wird gesendet',
    successTitle: 'Dein Platz ist reserviert',
    success: 'Danke. Wir melden uns bald mit Starttermin und Details. Es wurde nichts abgebucht.',
    error: 'Das hat leider nicht geklappt. Bitte versuche es gleich noch einmal.',
    notConnected: 'Die Anmeldung ist gerade nicht verfügbar. Bitte versuche es später noch einmal.',
    required: 'Bitte fülle dieses Feld aus.',
    invalidEmail: 'Bitte gib eine gültige E-Mail-Adresse ein.',
    phoneInvalid: "Bitte gib eine gültige Telefonnummer mit Landesvorwahl ein.",
    viaRequired: "Bitte wähle Zalo oder WhatsApp.",
  },
  faq: {
    title: 'Antworten auf häufige Fragen',
    items: [
      { q: 'Zahle ich bei der Reservierung?', a: 'Nein. Die Reservierung ist kostenlos und unverbindlich. Wir bestätigen die Details zuerst per E-Mail, dann entscheidest du.' },
      { q: 'Sind 299 € der endgültige Preis?', a: '299 € ist der Frühbucherpreis für alle, die jetzt reservieren. Er wird in der E-Mail bestätigt, die du von uns bekommst, bevor etwas abgebucht wird.' },
      { q: 'Muss ich schon Chinesisch können?', a: 'Der Kurs beginnt bei den Grundlagen. Wenn du dein Niveau nicht sicher einschätzen kannst, schreib es uns ins Formular.' },
      { q: 'Was passiert mit meiner E-Mail-Adresse?', a: 'Wir nutzen sie nur, um dich zu diesem Kurs zu kontaktieren. Du kannst jederzeit die Löschung verlangen.' },
    ],
  },
  final: {
    title: 'Geschäfte auf Chinesisch machen',
    body: 'Sichere dir heute deinen Frühbucherplatz für Business-Chinesisch Grundlagen.',
    cta: 'Platz sichern',
  },
  footer: {
    tagline: 'KI-Lernplattform für Beauty-Profis, Trainer, Coaches und Lehrende.',
    academy: 'Spavio AI Academy',
    imprint: 'Impressum',
    privacy: 'Datenschutz',
  },
};

const vi = {
  lang: 'vi',
  ogLocale: 'vi_VN',
  label: 'Tiếng Việt',
  meta: {
    title: 'Tiếng Trung thương mại cơ bản | Đăng ký sớm 299 € | Spavio AI Academy',
    description:
      'Học tiếng Trung dùng trong đặt hàng, xuất nhập khẩu và thương mại điện tử xuyên biên giới cùng Minh Khue Tran. Giữ chỗ ưu đãi đăng ký sớm 299 €, hôm nay chưa cần thanh toán.',
  },
  nav: { course: 'Khóa học', lecturer: 'Giảng viên', offer: 'Đăng ký sớm', faq: 'Hỏi đáp', reserve: 'Giữ chỗ ngay', start: "Dùng miễn phí", academy: "Academy" },
  hero: {
    badge: 'Đăng ký sớm · 299 €',
    title: 'Tiếng Trung thương mại,',
    titleEm: 'từ đơn hàng đầu tiên',
    subtitle:
      'Tiếng Trung cho đặt hàng, xuất nhập khẩu và thương mại điện tử xuyên biên giới.',
    ctaPrimary: 'Giữ chỗ ngay',
    ctaSecondary: 'Gặp giảng viên',
    note: 'Hôm nay chưa cần thanh toán. Giữ chỗ miễn phí và không ràng buộc.',
  },
  /** Spavio AI Academy promotion: the Academy's own hero and "build" section copy. */
  academy: {
    "hero": {
      "title": "Kiến thức của bạn thành khóa học tương tác,",
      "titleEm": "xây xong trong vài phút",
      "subtitle": "Mô tả chủ đề hoặc tải lên tệp PDF. Spavio AI Academy tạo khóa học, huấn luyện viên AI và bài kiểm tra.",
      "frameAlt": "Trình soạn của Spavio AI Academy, nơi bạn mô tả khóa học muốn tạo"
    },
    "build": {
      "eyebrow": "Spavio AI Academy",
      "title": "Bạn mô tả khóa học,",
      "titleEm": "chúng tôi xây dựng",
      "body": "Một cuộc phỏng vấn ngắn về mục tiêu và trình độ, sau đó AI viết kế hoạch khóa học. Bạn xem lại, chỉnh sửa và duyệt.",
      "cta": "Dùng miễn phí",
      "bullets": [
        "Phỏng vấn về chủ đề, đối tượng và kiến thức nền",
        "Bản thiết kế với các mô-đun và mục tiêu học tập, bạn tự do chỉnh sửa",
        "Tải lên PDF hoặc tài liệu riêng làm nền tảng cho khóa học",
        "Khóa học bằng 12 ngôn ngữ, giao diện tiếng Đức, Anh và Việt"
      ],
      "imageAlt": "Trình chỉnh sửa bản thiết kế khóa học với các mô-đun và mục tiêu học tập"
    }
  },
  demo: {
    label: 'Xem thử: hỏi nhà cung cấp',
    translations: [
      'Xin chào, tôi muốn hỏi giá của sản phẩm này.',
      'Số lượng đặt hàng tối thiểu là bao nhiêu?',
      'Mong được hợp tác vui vẻ!',
    ],
    pinyinLabel: 'Pinyin',
  },
  preview: {
    "eyebrow": "Xem trước bài học",
    "title": "Xem trước",
    "titleEm": "Tiếng Trung thương mại cơ bản",
    "body": "Một trong các bài học của khóa Tiếng Trung thương mại cơ bản: Gặp đối tác lần đầu tại hội chợ làm đẹp.",
    "alt": "Bài 1, slide {n} / {total}",
    "label": "Slide Bài 1",
    "prev": "Slide trước",
    "next": "Slide tiếp theo"
  },
  situations: {
    lead: 'Tiếng Trung bạn thật sự dùng khi đi làm',
    sub: 'Xây dựng quanh các tình huống kinh doanh thực tế, không phải hội thoại sách giáo khoa.',
    items: [
      "Chào hỏi trong kinh doanh",
      "Giới thiệu công ty",
      "Hỏi báo giá",
      "Đặt hàng",
      "Thuật ngữ xuất nhập khẩu",
      "Vận chuyển và giao hàng",
      "Thương mại điện tử xuyên biên giới",
      "Email và tin nhắn kinh doanh",
    ],
  },
  platforms: {
    lead: "Những nền tảng nơi bạn dùng tiếng Trung này",
    note: "",
  },
  learn: {
    title: 'Khóa học',
    titleEm: 'mang lại gì cho bạn',
    body: 'Tiếng Trung thương mại cơ bản bắt đầu từ nền tảng và đi thẳng vào những tình huống bạn gặp khi làm việc với đối tác nói tiếng Trung.',
    items: [
      {
        t: 'Nền tảng vững chắc',
        d: 'Những từ vựng, mẫu câu và cấu trúc cốt lõi để bạn được hiểu trong môi trường kinh doanh.',
      },
      {
        t: 'Đặt hàng và báo giá',
        d: 'Hỏi giá, số lượng tối thiểu, điều khoản và tự tin đặt một đơn hàng.',
      },
      {
        t: 'Xuất nhập khẩu và vận chuyển',
        d: 'Từ vựng về thương mại, chứng từ và giao hàng, được dạy từ thực tế xuất nhập khẩu.',
      },
      {
        t: 'Thương mại điện tử xuyên biên giới',
        d: 'Giao tiếp với nhà cung cấp và khách hàng khi bạn bán hoặc nhập hàng qua biên giới.',
      },
    ],
  },
  how: {
    title: 'Bạn học như thế nào',
    steps: [
      { t: 'Học điều cốt lõi', d: 'Các bài học ngắn, tập trung trên Spavio AI Academy, mỗi bài xoay quanh một tình huống kinh doanh.' },
      { t: 'Luyện cùng huấn luyện viên AI', d: 'Bài kiểm tra và nhập vai giúp bạn thử các mẫu câu trước khi cần dùng thật.' },
      { t: 'Áp dụng vào công việc thật', d: 'Dùng ngay những gì đã học cho đơn hàng, email và cuộc trò chuyện của bạn.' },
    ],
  },
  lecturer: {
    eyebrow: 'Giảng viên của bạn',
    groupTitles: ['Học vấn', 'Kinh nghiệm', 'Chuyên môn'],
    name: 'Minh Khue Tran',
    photoAlt: 'Minh Khue Tran',
    bio: [
      'Cử nhân Kinh doanh và Thương mại Quốc tế tại Đài Loan.',
      'Thạc sĩ Hệ thống Thông tin Quốc tế, chuyên ngành Phân tích và Quản lý Dữ liệu tại CHLB Đức.',
      'Hoàn thành các khóa học về Luật Hiến pháp, Luật Hình sự, Luật Sở hữu trí tuệ và các lĩnh vực pháp lý liên quan tại Đài Bắc.',
      '8 năm kinh nghiệm làm việc với tiếng Trung và thị trường Hoa ngữ.',
      '2 năm kinh nghiệm làm việc tại hãng luật ở Đài Loan và tham gia xuất bản sách cùng Đoàn Luật sư Đài Bắc.',
      'Có kinh nghiệm trong lĩnh vực đặt hàng, xuất nhập khẩu và thương mại điện tử xuyên biên giới.',
      'Chuyên hướng dẫn tiếng Trung ứng dụng trong môi trường kinh doanh, thương mại và xuất nhập khẩu thực tế.',
      'Ứng dụng công nghệ số, AI và các nền tảng thương mại điện tử vào hoạt động kinh doanh quốc tế.',
      'Kinh nghiệm trong lĩnh vực đào tạo, phát triển năng lực nhân sự và tư vấn chuyển đổi số lĩnh vực học tập (Learning & Development) với AI Agents tại các tập đoàn quốc tế của Đức như AUDI và Krones.',
    ],
  },
  offer: {
    eyebrow: 'Ưu đãi đăng ký sớm',
    title: 'Vào nhóm đầu tiên',
    titleEm: 'với giá đăng ký sớm',
    body: 'Chúng tôi mở khóa học cho nhóm học viên đầu tiên. Giữ chỗ ngay, chúng tôi sẽ xác nhận chi tiết qua email trước khi thu bất kỳ khoản phí nào.',
    badge: 'Đăng ký sớm',
    price: '299 €',
    regularPrice: "400 €",
    regularLabel: "Giá gốc",
    limited: "Ưu đãi dành cho các học viên đăng ký sớm",
    priceNote: 'một lần, cho toàn bộ khóa học',
    includes: [
      'Tiếng Trung thương mại cơ bản, toàn bộ khóa học',
      'Bài học tương tác với huấn luyện viên AI, bài kiểm tra và nhập vai',
      'Hôm nay chưa thanh toán: giữ chỗ miễn phí, quyết định sau',
    ],
    cta: 'Giữ chỗ ngay',
  },
  form: {
    title: 'Giữ chỗ ưu đãi đăng ký sớm',
    sub: 'Chỉ mất một phút. Chúng tôi sẽ liên hệ với ngày khai giảng và các bước tiếp theo.',
    name: 'Họ tên',
    namePlaceholder: 'Tên của bạn',
    email: 'Email',
    emailPlaceholder: 'ban@example.com',
    phone: "Số điện thoại",
    phonePlaceholder: "+84 90 123 4567",
    phoneVia: "Liên hệ qua",
    goal: 'Bạn cần tiếng Trung để làm gì?',
    goalPlaceholder: 'Chọn một mục',
    goalOther: "Hãy cho chúng tôi biết mục tiêu của bạn",
    goalOtherPlaceholder: "Ví dụ: nhập đồ nội thất từ Đài Loan",
    level: "Trình độ tiếng Trung hiện tại của bạn",
    levelPlaceholder: "Chọn một mục",
    levelOptions: ["Mới bắt đầu hoàn toàn","Tôi biết một số từ và mẫu câu","Trung cấp: tôi có thể trò chuyện đơn giản","Nâng cao","Chưa chắc"],
    goalOptions: [
      'Đặt hàng và nhập hàng từ Trung Quốc hoặc Đài Loan',
      'Xuất nhập khẩu',
      'Thương mại điện tử xuyên biên giới',
      'Làm việc với đối tác nói tiếng Trung',
      'Mục đích khác',
    ],
    consent: "Tôi đồng ý để Spavio AI liên hệ với tôi về khóa học này qua email và, nếu tôi cung cấp số điện thoại, qua Zalo hoặc WhatsApp.",
    privacy: 'Chính sách bảo mật',
    submit: 'Giữ chỗ ngay',
    sending: 'Đang gửi',
    successTitle: 'Bạn đã giữ chỗ thành công',
    success: 'Cảm ơn bạn. Chúng tôi sẽ sớm liên hệ với ngày khai giảng và chi tiết. Chưa có khoản phí nào được thu.',
    error: 'Rất tiếc, chưa gửi được. Vui lòng thử lại sau ít phút.',
    notConnected: 'Hiện chưa thể đăng ký. Vui lòng thử lại sau.',
    required: 'Vui lòng điền mục này.',
    invalidEmail: 'Vui lòng nhập địa chỉ email hợp lệ.',
    phoneInvalid: "Vui lòng nhập số điện thoại hợp lệ, kèm mã quốc gia.",
    viaRequired: "Vui lòng chọn Zalo hoặc WhatsApp.",
  },
  faq: {
    title: 'Câu hỏi thường gặp',
    items: [
      { q: 'Tôi có phải trả tiền khi giữ chỗ không?', a: 'Không. Giữ chỗ miễn phí và không ràng buộc. Chúng tôi xác nhận chi tiết qua email trước, sau đó bạn quyết định.' },
      { q: '299 € có phải giá cuối cùng không?', a: '299 € là giá đăng ký sớm cho những người giữ chỗ ngay bây giờ. Mức giá này được xác nhận trong email chúng tôi gửi cho bạn trước khi thu bất kỳ khoản phí nào.' },
      { q: 'Tôi có cần biết tiếng Trung trước không?', a: 'Khóa học bắt đầu từ nền tảng. Nếu chưa chắc về trình độ của mình, bạn hãy ghi vào biểu mẫu.' },
      { q: 'Email của tôi được dùng như thế nào?', a: 'Chúng tôi chỉ dùng để liên hệ với bạn về khóa học này. Bạn có thể yêu cầu xóa bất cứ lúc nào.' },
    ],
  },
  final: {
    title: 'Bắt đầu làm kinh doanh bằng tiếng Trung',
    body: 'Hôm nay hãy giữ chỗ ưu đãi đăng ký sớm cho khóa Tiếng Trung thương mại cơ bản.',
    cta: 'Giữ chỗ ngay',
  },
  footer: {
    tagline: 'Nền tảng học tập AI dành cho chuyên gia làm đẹp, giảng viên, coach và nhà giáo dục.',
    academy: 'Spavio AI Academy',
    imprint: 'Thông tin pháp lý',
    privacy: 'Bảo mật',
  },
};

export const COPY = { en, de, vi };
export const LOCALES = ['en', 'de', 'vi'];
/** `/` is English (x-default), the others live under their language code. */
export const PATH = { en: '/', de: '/de/', vi: '/vi/' };
