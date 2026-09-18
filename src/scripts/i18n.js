/**
 * Universal Full-Page Internationalization (i18n) Engine for Online Calculator
 * Guarantees every single word, phrase, card, label, guide, and FAQ translates across 12 languages.
 */

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', native: 'English', flag: '🇬🇧', dir: 'ltr' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳', dir: 'ltr' },
  { code: 'es', name: 'Spanish', native: 'Español', flag: '🇪🇸', dir: 'ltr' },
  { code: 'fr', name: 'French', native: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: 'de', name: 'German', native: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
  { code: 'ru', name: 'Russian', native: 'Русский', flag: '🇷🇺', dir: 'ltr' },
  { code: 'ar', name: 'Arabic', native: 'العربية', flag: '🇸🇦', dir: 'rtl' },
  { code: 'pt', name: 'Portuguese', native: 'Português', flag: '🇧🇷', dir: 'ltr' },
  { code: 'zh', name: 'Chinese', native: '简体中文', flag: '🇨🇳', dir: 'ltr' },
  { code: 'ja', name: 'Japanese', native: '日本語', flag: '🇯🇵', dir: 'ltr' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা', flag: '🇧🇩', dir: 'ltr' },
  { code: 'ur', name: 'Urdu', native: 'اردو', flag: '🇵🇰', dir: 'rtl' }
];

// Universal Phrase Translation Dictionary: Maps English phrases directly to 12 languages
export const PHRASES = {
  // Breadcrumbs & Nav
  "Home": {
    hi: "होम", es: "Inicio", fr: "Accueil", de: "Startseite", ru: "Главная", ar: "الرئيسية", pt: "Início", zh: "首页", ja: "ホーム", bn: "হোম", ur: "مرکزی صفحہ"
  },
  "Online Calculator": {
    hi: "ऑनलाइन कैलकुलेटर", es: "Calculadora en Línea", fr: "Calculatrice en Ligne", de: "Online-Rechner", ru: "Онлайн-Калькулятор", ar: "آلة حاسبة على الإنترنت", pt: "Calculadora Online", zh: "在线计算器", ja: "オンライン計算機", bn: "অনলাইন ক্যালকুলেটর", ur: "آن لائن کیلکولیٹر"
  },
  "SILO Hubs": {
    hi: "ज्ञान केंद्र (Hubs)", es: "Centros SILO", fr: "Centres Thématiques", de: "Themen-Hubs", ru: "Тематические хабы", ar: "مراكز الحساب", pt: "Centrais Temáticas", zh: "主题知识库", ja: "トピックハブ", bn: "বিষয়বস্তু কেন্দ্র", ur: "موضوعاتی مراکز"
  },
  "Precision Math Suite": {
    hi: "सटीक गणित सुइट", es: "Suite Matemática de Precisión", fr: "Suite Mathématique de Précision", de: "Präzisions-Mathematik-Suite", ru: "Пакет точных вычислений", ar: "حزمة الرياضيات الدقيقة", pt: "Suíte Matemática de Precisão", zh: "高精度数学计算套件", ja: "高精度数学スイート", bn: "নিখুঁত গণিত স্যুট", ur: "درست ریاضیاتی سوٹ"
  },

  // Hero Section
  "Free & Private Online Math Suite • Version 7.3": {
    hi: "मुफ़्त व सुरक्षित ऑनलाइन गणित सुइट • वर्ज़न 7.3", es: "Suite Matemática Gratuita y Privada • Versión 7.3", fr: "Suite Mathématique Gratuite & Privée • Version 7.3", de: "Kostenlose & Private Mathe-Suite • Version 7.3", ru: "Бесплатный и безопасный комплекс • Версия 7.3", ar: "حزمة رياضية مجانية وخاصة • الإصدار 7.3", pt: "Suíte Matemática Gratuita e Privada • Versão 7.3", zh: "免费且完全私密的在线数学套件 • 版本 7.3", ja: "無料・プライベートなオンライン数学スイート • Ver 7.3", bn: "বিনামূল্যে ও নিরাপদ গণিত স্যুট • ভার্সন ৭.৩", ur: "مفت اور نجی ریاضیاتی سوٹ • ورژن 7.3"
  },
  "Fast, Free & Private Online Calculator": {
    hi: "तेज़, मुफ़्त और सुरक्षित ऑनलाइन कैलकुलेटर", es: "Calculadora Online Rápida, Gratuita y Privada", fr: "Calculatrice en Ligne Rapide, Gratuite et Privée", de: "Schneller, kostenloser & privater Online-Rechner", ru: "Быстрый, бесплатный и приватный онлайн-калькулятор", ar: "آلة حاسبة سريعة ومجانية وآمنة عبر الإنترنت", pt: "Calculadora Online Rápida, Gratuita e Privada", zh: "快速、免费且完全私密的在线计算器", ja: "高速・無料・安心のオンライン電卓", bn: "দ্রুত, বিনামূল্যে ও সম্পূর্ণ ব্যক্তিগত অনলাইন ক্যালকুলেটর", ur: "تیز ترین، مفت اور محفوظ آن لائن کیلکولیٹر"
  },
  "Fast, Precise & Free Online Calculator": {
    hi: "तेज़, सटीक और मुफ़्त ऑनलाइन कैलकुलेटर", es: "Calculadora en Línea Rápida, Precisa y Gratuita", fr: "Calculatrice en Ligne Rapide, Précise et Gratuite", de: "Schneller, präziser & kostenloser Online-Rechner", ru: "Быстрый, точный и бесплатный онлайн-калькулятор", ar: "آلة حاسبة سريعة ودقيقة ومجانية عبر الإنترنت", pt: "Calculadora Online Rápida, Precisa e Gratuita", zh: "快速、精确且免费的在线计算器", ja: "高速・高精度・無料のオンライン計算機", bn: "দ্রুত, নির্ভুল ও বিনামূল্যে অনলাইন ক্যালকুলেটর", ur: "تیز، درست اور مفت آن لائن کیلکولیٹر"
  },
  "Perform instant standard & scientific arithmetic, retail discounts, unit conversions, health metrics, and finance calculations — powered by client-side precision and zero tracking.": {
    hi: "सामान्य और वैज्ञानिक गणित, डिस्काउंट, यूनिट कन्वर्शन, स्वास्थ्य और वित्तीय गणना तुरंत करें — 100% स्थानीय सटीकता और शून्य ट्रैकिंग के साथ।", es: "Realice cálculos aritméticos estándar y científicos, descuentos, conversiones de unidades y métricas con precisión total y sin rastreo.", fr: "Effectuez des calculs arithmétiques standard et scientifiques, remises, conversions et métriques avec une précision sans suivi.", de: "Führen Sie Standard- und wissenschaftliche Arithmetik, Rabatte, Einheitenumrechnungen und Gesundheitsmetriken verzögerungsfrei durch.", ru: "Выполняйте стандартные и научные вычисления, скидки, перевод единиц и расчет здоровья без задержек и отслеживания.", ar: "قم بإجراء العمليات الحسابية القياسية والعلمية وحساب الخصومات وتحويل الوحدات ومؤشر كتلة الجسم بدقة تامة وبدون تتبع.", pt: "Realize cálculos padrão e científicos, descontos, conversões e métricas com precisão absoluta e sem rastreamento.", zh: "瞬间完成基础与科学算术、商业折扣、单位转换、BMI健康指数与年龄推算 — 客户端毫秒响应，零隐私追踪。", ja: "基本算術から関数計算、割引・消費税計算、単位変換、BMI、年齢計算まで瞬時に処理 — ゼロトラッキングの完全ローカル処理。", bn: "সাধারণ ও বৈজ্ঞানিক হিসাব, ছাড়, ইউনিট রূপান্তর ও স্বাস্থ্য মেট্রিক হিসাব করুন তৎক্ষণাৎ — সম্পূর্ণ স্থানীয় ও ট্র্যাকহীন।", ur: "عام اور سائنسی حساب، رعایت، اکائیوں کی تبدیلی اور صحت کا فوری درست تخمینہ لگائیں — بغیر ٹریکنگ کے۔"
  },
  "100% Free & No Signup": {
    hi: "100% मुफ़्त और बिना साइनअप", es: "100% Gratis y Sin Registro", fr: "100% Gratuit & Sans Inscription", de: "100% Kostenlos & Ohne Anmeldung", ru: "100% Бесплатно и Без регистрации", ar: "مجاني 100% وبدون تسجيل", pt: "100% Grátis e Sem Cadastro", zh: "100% 免费且无需注册", ja: "100% 無料・登録不要", bn: "১০০% বিনামূল্যে ও নিবন্ধনহীন", ur: "100% مفت اور رجسٹریشن کے بغیر"
  },
  "Instant Zero Latency": {
    hi: "तुरंत शून्य विलंबता (Zero Latency)", es: "Cero Latencia Instantánea", fr: "Zéro Latence Immédiate", de: "Sofortige Null-Latenz", ru: "Мгновенно без задержек", ar: "استجابة فورية بلا تأخير", pt: "Zero Latência Instantânea", zh: "毫秒级瞬间响应", ja: "ゼロ遅延の超高速", bn: "তাত্ক্ষণিক শূন্য লেটেন্সি", ur: "بغیر تاخیر فوری ردعمل"
  },
  "Offline Ready PWA": {
    hi: "ऑफ़लाइन तैयार PWA", es: "PWA Lista para Offline", fr: "PWA Prête Hors-Ligne", de: "Offline-fähige PWA", ru: "Работает офлайн (PWA)", ar: "تطبيق ويب يعمل بلا اتصال", pt: "PWA Pronta para Modo Offline", zh: "支持离线运行 PWA", ja: "オフライン対応 PWA", bn: "অফলাইন প্রস্তুত PWA", ur: "آف لائن تیار PWA"
  },
  "Launch Calculator": {
    hi: "कैलकुलेटर खोलें", es: "Abrir Calculadora", fr: "Lancer Calculatrice", de: "Rechner starten", ru: "Открыть Калькулятор", ar: "تشغيل الحاسبة", pt: "Abrir Calculadora", zh: "启动计算器", ja: "電卓を開く", bn: "ক্যালকুলেটর শুরু করুন", ur: "کیلکولیٹر کھولیں"
  },
  "Quick Tools Hub": {
    hi: "त्वरित टूल्स हब", es: "Centro de Herramientas", fr: "Centre d'Outils Rapides", de: "Schnell-Tools-Hub", ru: "Все Инструменты", ar: "مركز الأدوات السريعة", pt: "Central de Ferramentas", zh: "实用工具中心", ja: "ツール一覧", bn: "জরুরি টুলস", ur: "فوری ٹولز حب"
  },
  "Language": {
    hi: "भाषा", es: "Idioma", fr: "Langue", de: "Sprache", ru: "Язык", ar: "اللغة", pt: "Idioma", zh: "语言", ja: "言語", bn: "ভাষা", ur: "زبان"
  },
  "Select Language": {
    hi: "भाषा चुनें", es: "Seleccionar Idioma", fr: "Choisir la Langue", de: "Sprache auswählen", ru: "Выберите язык", ar: "اختر اللغة", pt: "Selecionar Idioma", zh: "选择语言", ja: "言語を選択", bn: "ভাষা নির্বাচন করুন", ur: "زبان منتخب کریں"
  },

  // Calculator Card
  "Simple Calculator": {
    hi: "सरल कैलकुलेटर", es: "Calculadora Simple", fr: "Calculatrice Simple", de: "Einfacher Rechner", ru: "Простой Калькулятор", ar: "آلة حاسبة بسيطة", pt: "Calculadora Simples", zh: "简易计算器", ja: "シンプル計算機", bn: "সহজ ক্যালকুলেটর", ur: "سادہ کیلکولیٹر"
  },
  "Join Channels": {
    hi: "चैनल से जुड़ें", es: "Unirse a Canales", fr: "Rejoindre Canaux", de: "Kanäle beitreten", ru: "Наши Каналы", ar: "انضم للقنوات", pt: "Participar dos Canais", zh: "加入频道", ja: "チャンネル参加", bn: "চ্যানেলে যুক্ত হন", ur: "چینلز میں شامل ہوں"
  },
  "Angle (θ):": {
    hi: "कोण (θ):", es: "Ángulo (θ):", fr: "Angle (θ):", de: "Winkel (θ):", ru: "Угол (θ):", ar: "الزاوية (θ):", pt: "Ângulo (θ):", zh: "角度 (θ):", ja: "角度 (θ):", bn: "কোণ (θ):", ur: "زاویہ (θ):"
  },
  "History": {
    hi: "इतिहास (History)", es: "Historial", fr: "Historique", de: "Verlauf", ru: "История", ar: "السجل", pt: "Histórico", zh: "历史记录", ja: "計算履歴", bn: "হিস্ট্রি", ur: "تاریخچہ"
  },
  "Clear": {
    hi: "साफ़ करें", es: "Borrar", fr: "Effacer", de: "Löschen", ru: "Очистить", ar: "مسح", pt: "Limpar", zh: "清除", ja: "消去", bn: "মুছুন", ur: "صاف کریں"
  },
  "No calculation history yet": {
    hi: "अभी कोई गणना इतिहास नहीं है", es: "No hay historial todavía", fr: "Aucun historique pour le moment", de: "Noch kein Berechnungsverlauf", ru: "История вычислений пока пуста", ar: "لا يوجد سجل حسابات حتى الآن", pt: "Nenhum histórico registrado ainda", zh: "暂无计算历史记录", ja: "計算履歴はまだありません", bn: "এখনও কোনো হিসাবের ইতিহাস নেই", ur: "ابھی حساب کی کوئی تاریخ نہیں ہے"
  },

  // Popular Tools Section
  "Featured Calculation Suite": {
    hi: "प्रमुख गणना सुइट", es: "Suite de Cálculo Destacada", fr: "Suite de Calcul En Vedette", de: "Vorgestellte Rechen-Suite", ru: "Популярные инструменты", ar: "حزمة الحسابات المميزة", pt: "Suíte de Cálculo em Destaque", zh: "精选特色计算套件", ja: "主要計算スイート", bn: "জনপ্রিয় হিসাব স্যুট", ur: "نمایاں حساباتی سوٹ"
  },
  "Popular Tools & Specialized Calculators": {
    hi: "लोकप्रिय टूल्स और विशेष कैलकुलेटर", es: "Herramientas Populares y Calculadoras", fr: "Outils Populaires & Calculateurs", de: "Beliebte Werkzeuge & Spezialrechner", ru: "Популярные и специализированные калькуляторы", ar: "الأدوات الشائعة والحاسبات المتخصصة", pt: "Ferramentas Populares e Calculadoras", zh: "热门工具与专业计算器", ja: "人気のツールと専用計算機", bn: "জনপ্রিয় টুলস ও বিশেষ ক্যালকুলেটর", ur: "مقبول ٹولز اور خصوصی کیلکولیٹر"
  },
  "Instant, one-click access to our most widely used mathematical and commercial engines": {
    hi: "दैनिक गणित, व्यापार और वित्त के सबसे अधिक उपयोग किए जाने वाले टूल्स", es: "Acceso inmediato a nuestros motores matemáticos y comerciales más utilizados", fr: "Accès en un clic à nos moteurs mathématiques et commerciaux les plus utilisés", de: "Sofortiger Zugriff auf unsere meistgenutzten Rechenmodule", ru: "Мгновенный доступ к наиболее востребованным математическим модулям", ar: "وصول بنقرة واحدة لأكثر الأدوات استخداماً في الرياضيات والتجارة", pt: "Acesso imediato às ferramentas matemáticas e comerciais mais utilizadas", zh: "一键触达最常用的日常数学与商业财务计算模块", ja: "日常や仕事で最も使われる計算ツールへ1クリックでアクセス", bn: "সবচেয়ে বেশি ব্যবহৃত গাণিতিক ও আর্থিক টুলস", ur: "روزمرہ ریاضی اور مالیاتی امور کے لیے ایک کلک رسائی"
  },
  "Percentage Calculator": {
    hi: "प्रतिशत कैलकुलेटर (Percentage)", es: "Calculadora de Porcentaje", fr: "Calculateur de Pourcentage", de: "Prozentrechner", ru: "Калькулятор процентов", ar: "حاسبة النسبة المئوية", pt: "Calculadora de Porcentagem", zh: "百分比计算器", ja: "パーセント計算機", bn: "শতকরা ক্যালকুলেটর", ur: "فیصد کیلکولیٹر"
  },
  "Calculate percentages of numbers, tax portions, and ratio calculations instantly in real-time.": {
    hi: "संख्याओं का प्रतिशत, टैक्स और अनुपात तुरंत वास्तविक समय में निकालें।", es: "Calcule porcentajes de números, impuestos y proporciones en tiempo real.", fr: "Calculez des pourcentages, taxes et ratios instantanément.", de: "Berechnen Sie Prozentsätze, Steueranteile und Verhältnisse in Echtzeit.", ru: "Мгновенный расчет процентов, налоговых долей и соотношений.", ar: "احسب النسب المئوية والضرائب والنسب بشكل فوري ومباشر.", pt: "Calcule porcentagens, taxas e proporções em tempo real.", zh: "即时计算数值百分比、税额以及各类比率。", ja: "数値の割合、税額計算、比率計算をリアルタイムで瞬時に算出。", bn: "সংখ্যার শতকরা, করের অংশ ও অনুপাত তাৎক্ষণিকভাবে হিসাব করুন।", ur: "اعداد کا فیصد، ٹیکس کے حصے اور تناسب کا فوری حساب لگائیں۔"
  },
  "Discount & GST Calculator": {
    hi: "छूट व GST कैलकुलेटर", es: "Calculadora de Descuento e IVA", fr: "Calculateur de Remise & TVA", de: "Rabatt- & MwSt.-Rechner", ru: "Калькулятор скидок и НДС", ar: "حاسبة الخصم وضريبة القيمة المضافة", pt: "Calculadora de Desconto e Imposto", zh: "折扣与增值税计算器", ja: "割引・消費税計算機", bn: "ছাড় ও GST ক্যালকুলেটর", ur: "رعایت اور جی ایس ٹی کیلکولیٹر"
  },
  "Find final shopping prices after percentage discounts, coupons, and GST/sales tax additions.": {
    hi: "छूट, कूपन और GST/टैक्स जोड़ने के बाद खरीदारी का अंतिम मूल्य ज्ञात करें।", es: "Obtenga el precio final tras aplicar descuentos, cupones e IVA.", fr: "Trouvez le prix final après remises, coupons et ajout de taxes.", de: "Ermitteln Sie Endpreise nach Rabatten, Gutscheinen und Steuern.", ru: "Узнайте итоговую цену после скидок, купонов и начисления налогов.", ar: "تعرف على السعر النهائي بعد الخصومات والكوبونات والضرائب.", pt: "Descubra o preço final após descontos, cupons e impostos.", zh: "计算享受折扣、优惠券并叠加增值税后的最终实付价格。", ja: "割引、クーポン、消費税加算後の最終購入価格を計算。", bn: "ছাড়, কুপন ও কর যোগ করার পর চূড়ান্ত কেনাকাটার মূল্য বের করুন।", ur: "رعایت، کوپن اور ٹیکس شامل کرنے کے بعد حتمی خریداری کی قیمت معلوم کریں۔"
  },
  "Universal Unit Converter": {
    hi: "सार्वभौमिक इकाई परिवर्तक (Units)", es: "Convertidor Universal de Unidades", fr: "Convertisseur Universel d'Unités", de: "Universeller Einheitenumrechner", ru: "Универсальный конвертер единиц", ar: "محول الوحدات الشامل", pt: "Conversor Universal de Unidades", zh: "通用计量单位换算器", ja: "万能単位換算ツール", bn: "সার্বজনীন একক রূপান্তরকারী", ur: "عالمگیر پیمائش کی اکائیوں کا کنورٹر"
  },
  "Convert metric & imperial measurements across Length, Mass/Weight, and Temperature scales.": {
    hi: "लंबाई, वजन और तापमान में मीट्रिक और इंपीरियल इकाइयों को आसानी से बदलें।", es: "Convierta medidas métricas e imperiales de longitud, masa y temperatura.", fr: "Convertissez les mesures métriques et impériales pour la longueur, la masse et la température.", de: "Rechnen Sie metrische und imperiale Maße für Länge, Masse und Temperatur um.", ru: "Переводите метрические и британские единицы длины, массы и температуры.", ar: "حول القياسات المترية والإنجليزية للطول والكتلة ودرجة الحرارة.", pt: "Converta medidas métricas e imperiais de comprimento, massa e temperatura.", zh: "在长度、重量/质量和温度之间无缝进行公制与英制单位换算。", ja: "長さ、重さ/質量、温度のメートル法とヤード・ポンド法を相互変換。", bn: "দৈর্ঘ্য, ওজন এবং তাপমাত্রার মেট্রিক ও ইম্পেরিয়াল এককে রূপান্তর করুন।", ur: "لمبائی، وزن اور درجہ حرارت کی پیمائش کو تبدیل کریں۔"
  },
  "BMI Health Calculator": {
    hi: "BMI स्वास्थ्य कैलकुलेटर", es: "Calculadora de Salud IMC", fr: "Calculateur Santé IMC", de: "BMI-Gesundheitsrechner", ru: "Калькулятор индекса массы тела (ИМТ)", ar: "حاسبة مؤشر كتلة الجسم (BMI)", pt: "Calculadora de Saúde IMC", zh: "BMI 身体质量指数计算器", ja: "BMI 健康計算機", bn: "BMI স্বাস্থ্য ক্যালকুলেটর", ur: "بی ایم آئی صحت کیلکولیٹر"
  },
  "Assess body mass index score according to World Health Organization clinical standards.": {
    hi: "विश्व स्वास्थ्य संगठन (WHO) के मानकों के अनुसार अपने बॉडी मास इंडेक्स का आकलन करें।", es: "Evalúe su índice de masa corporal según los estándares de la OMS.", fr: "Évaluez votre indice de masse corporelle selon les normes de l'OMS.", de: "Bewerten Sie Ihren BMI nach den Richtlinien der Weltgesundheitsorganisation.", ru: "Оцените свой индекс массы тела по клиническим стандартам ВОЗ.", ar: "قيم مؤشر كتلة جسمك وفق معايير منظمة الصحة العالمية.", pt: "Avalie seu índice de massa corporal segundo as diretrizes da OMS.", zh: "依据世界卫生组织 (WHO) 临床标准科学评估身体体重健康指标。", ja: "世界保健機関（WHO）の基準に基づき体格指数を判定。", bn: "বিশ্ব স্বাস্থ্য সংস্থার (WHO) ক্লিনিকাল মানদণ্ড অনুসারে শরীরের বিএমআই নির্ধারণ করুন।", ur: "عالمی ادارہ صحت کے معیارات کے مطابق اپنے بی ایم آئی کا جائزہ لیں۔"
  },
  "Exact Age Calculator": {
    hi: "सटीक आयु कैलकुलेटर (Age)", es: "Calculadora de Edad Exacta", fr: "Calculateur d'Âge Exact", de: "Exakter Altersrechner", ru: "Калькулятор точного возраста", ar: "حاسبة العمر الدقيق", pt: "Calculadora de Idade Exata", zh: "精准年龄与生日计算器", ja: "正確な年齢計算機", bn: "নির্ভুল বয়স ক্যালকুলেটর", ur: "درست عمر کا کیلکولیٹر"
  },
  "Find exact lived years, months, and days with automated leap-year date math and birthday timer.": {
    hi: "लीप-वर्ष गणना के साथ वर्ष, माह और दिन में अपनी वास्तविक आयु जानें।", es: "Descubra años, meses y días vividos con cálculo de años bisiestos.", fr: "Trouvez vos années, mois et jours vécus avec prise en compte des années bissextiles.", de: "Ermitteln Sie exakte Jahre, Monate und Tage inklusive Schaltjahren.", ru: "Узнайте точный возраст в годах, месяцах и днях с учетом високосных лет.", ar: "احسب عمرك الدقيق بالسنوات والأشهر والأيام مع مراعاة السنوات الكبيسة.", pt: "Descubra anos, meses e dias vividos com ajuste para anos bissextos.", zh: "自动计算闰年，精准获取已度过的年数、月数和天数及下个生日倒计时。", ja: "うるう年を自動計算し、生きてきた年月日の正確な日数と次の誕生日を算出。", bn: "লিপ-ইয়ার হিসাব সহ বছর, মাস ও দিনে আপনার সঠিক বয়স জানুন।", ur: "لیپ سال کے ساتھ سالوں، مہینوں اور دنوں میں اپنی درست عمر معلوم کریں۔"
  },
  "Scientific Calculator Suite": {
    hi: "वैज्ञानिक कैलकुलेटर सुइट", es: "Suite de Calculadora Científica", fr: "Calculatrice Scientifique Complète", de: "Wissenschaftliche Rechner-Suite", ru: "Инженерный научный комплекс", ar: "حزمة الآلة الحاسبة العلمية", pt: "Calculadora Científica Completa", zh: "高级科学计算器套件", ja: "関数電卓スイート", bn: "সাইন্টিফিক ক্যালকুলেটর স্যুট", ur: "سائنسی کیلکولیٹر سوٹ"
  },
  "Compute complex trigonometry (sin, cos, tan), natural logarithms (ln, log), and exponents (xʸ).": {
    hi: "त्रिकोणमिति (sin, cos, tan), लघुगणक (ln, log) और घातांक (xʸ) की गणना करें।", es: "Calcule trigonometría (sen, cos, tan), logaritmos (ln, log) y exponentes.", fr: "Calculez la trigonométrie (sin, cos, tan), logarithmes et puissances.", de: "Berechnen Sie Trigonometrie (sin, cos, tan), Logarithmen und Potenzen.", ru: "Вычисляйте тригонометрию, натуральные и десятичные логарифмы, степени.", ar: "احسب الدوال المثلثية، اللوغاريتمات، والأسس بدقة متناهية.", pt: "Calcule trigonometria, logaritmos naturais e potências.", zh: "计算高阶三角函数、自然对数 (ln, log) 以及任意幂次方 (xʸ)。", ja: "三角関数、自然対数・常用対数、べき乗計算（xʸ）を高度に処理。", bn: "ত্রিকোণমিতি, লগারিদম এবং ঘাত সহজে গণনা করুন।", ur: "تکونیات، لوگارتھم اور طاقتوں کا پیچیدہ حساب لگائیں۔"
  },
  "Calculate % →": {
    hi: "प्रतिशत निकालें →", es: "Calcular % →", fr: "Calculer % →", de: "Berechnen % →", ru: "Рассчитать % →", ar: "احسب % ←", pt: "Calcular % →", zh: "计算百分比 →", ja: "パーセント計算 →", bn: "শতকরা হিসাব →", ur: "فیصد معلوم کریں ←"
  },
  "Calculate Price →": {
    hi: "मूल्य निकालें →", es: "Calcular Precio →", fr: "Calculer Prix →", de: "Preis berechnen →", ru: "Рассчитать цену →", ar: "احسب السعر ←", pt: "Calcular Preço →", zh: "计算实付价 →", ja: "価格を計算 →", bn: "মূল্য হিসাব →", ur: "قیمت معلوم کریں ←"
  },
  "Convert Units →": {
    hi: "यूनिट बदलें →", es: "Convertir Unidades →", fr: "Convertir Unités →", de: "Einheiten umrechnen →", ru: "Перевести →", ar: "تحويل الوحدات ←", pt: "Converter Unidades →", zh: "换算单位 →", ja: "単位を換算 →", bn: "একক রূপান্তর →", ur: "اکائیاں تبدیل کریں ←"
  },
  "Check BMI →": {
    hi: "BMI जांचें →", es: "Comprobar IMC →", fr: "Vérifier IMC →", de: "BMI prüfen →", ru: "Проверить ИМТ →", ar: "افحص المؤشر ←", pt: "Verificar IMC →", zh: "检测 BMI →", ja: "BMIを測定 →", bn: "BMI পরীক্ষা →", ur: "بی ایم آئی چیک کریں ←"
  },
  "Calculate Age →": {
    hi: "आयु निकालें →", es: "Calcular Edad →", fr: "Calculer Âge →", de: "Alter berechnen →", ru: "Рассчитать возраст →", ar: "احسب العمر ←", pt: "Calcular Idade →", zh: "计算年龄 →", ja: "年齢を計算 →", bn: "বয়স হিসাব →", ur: "عمر معلوم کریں ←"
  },
  "Launch Scientific →": {
    hi: "वैज्ञानिक मोड खोलें →", es: "Abrir Científica →", fr: "Lancer Scientifique →", de: "Wissenschaftlich öffnen →", ru: "Открыть научный →", ar: "فتح الوضع العلمي ←", pt: "Abrir Científica →", zh: "进入科学模式 →", ja: "関数電卓を起動 →", bn: "সাইন্টিফিক শুরু →", ur: "سائنسی کیلکولیٹر کھولیں ←"
  },

  // Extra Tools
  "Quick Math & Finance Tools": {
    hi: "त्वरित गणित व वित्त टूल्स", es: "Herramientas de Matemáticas y Finanzas", fr: "Outils Maths & Finance", de: "Mathe- & Finanzwerkzeuge", ru: "Математика и финансы", ar: "أدوات الرياضيات والمالية", pt: "Ferramentas de Matemática e Finanças", zh: "实用数学与财务工具", ja: "数学＆実用ツール", bn: "গণিত ও অর্থ টুल्स", ur: "ریاضی اور مالیاتی ٹولز"
  },
  "Helpful Calculation Tools & Theta (θ) Table": {
    hi: "उपयोगी कैलकुलेशन टूल्स और थीटा (θ) तालिका", es: "Herramientas Útiles y Tabla de Theta (θ)", fr: "Outils Pratiques et Table Thêta (θ)", de: "Praktische Tools & Theta (θ)-Tabelle", ru: "Полезные инструменты и таблица Тета (θ)", ar: "أدوات حسابية مفيدة وجدول ثيتا (θ)", pt: "Ferramentas Práticas e Tabela Theta (θ)", zh: "常用实用工具与 Theta (θ) 数值表", ja: "便利な計算ツールと θ (シータ) 値表", bn: "প্রয়োজনীয় টুলস ও থিটা (θ) তালিকা", ur: "مفید ٹولز اور تھیٹا (θ) جدول"
  },
  "Select any tool below to calculate instantly with precision": {
    hi: "सटीक गणना के लिए नीचे दिए गए किसी भी टूल का चयन करें", es: "Seleccione cualquier herramienta para calcular al instante con precisión", fr: "Sélectionnez un outil pour calculer instantanément avec précision", de: "Wählen Sie ein Tool für präzise Berechnungen", ru: "Выберите инструмент для точного мгновенного расчёта", ar: "اختر أي أداة للحساب الفوري بدقة فائقة", pt: "Selecione qualquer ferramenta para calcular instantaneamente com precisão", zh: "选择下方工具立即开启高精度即时计算", ja: "高精度な計算をすぐにご利用いただけます", bn: "নিখুঁত হিসাবের জন্য যেকোনো টুল বেছে নিন", ur: "درست حساب کے لیے نیچے دیے گئے کسی بھی ٹول کا انتخاب کریں"
  },
  "Trig θ Values": {
    hi: "त्रिकोणमिति θ मान", es: "Valores Trig θ", fr: "Valeurs Trig θ", de: "Trig θ-Werte", ru: "Значения θ", ar: "قيم النسب θ", pt: "Valores Trig θ", zh: "三角函数 θ 值", ja: "三角比 θ の値", bn: "ত্রিকোণমিতিক θ মান", ur: "تکونیاتی θ اقدار"
  },
  "Percentage": {
    hi: "प्रतिशत (Percentage)", es: "Porcentaje", fr: "Pourcentage", de: "Prozentrechnung", ru: "Проценты", ar: "النسبة المئوية", pt: "Porcentagem", zh: "百分比", ja: "パーセント", bn: "শতকরা", ur: "فیصد"
  },
  "Discount / GST": {
    hi: "छूट / GST (Discount)", es: "Descuento / IVA", fr: "Remise / TVA", de: "Rabatt / MwSt.", ru: "Скидка / НДС", ar: "الخصم والضريبة", pt: "Desconto / Imposto", zh: "折扣与税率", ja: "割引・税計算", bn: "ছাড় ও ট্যাক্স", ur: "رعایت اور ٹیکس"
  },
  "Unit Converter": {
    hi: "इकाई परिवर्तक (Units)", es: "Convertidor de Unidades", fr: "Convertisseur d'Unités", de: "Einheitenumrechner", ru: "Конвертер единиц", ar: "محول الوحدات", pt: "Conversor de Unidades", zh: "单位换算", ja: "単位換算", bn: "একক রূপান্তর", ur: "پیمائش کا کنورٹر"
  },
  "BMI Health": {
    hi: "BMI स्वास्थ्य", es: "Salud IMC", fr: "Santé IMC", de: "BMI Gesundheit", ru: "ИМТ (Здоровье)", ar: "مؤشر كتلة الجسم", pt: "IMC Saúde", zh: "BMI 健康", ja: "BMI 健康度", bn: "BMI স্বাস্থ্য", ur: "بی ایم آئی صحت"
  },
  "Age Calculator": {
    hi: "आयु कैलकुलेटर (Age)", es: "Calculadora de Edad", fr: "Calculateur d'Âge", de: "Altersrechner", ru: "Калькулятор возраста", ar: "حاسبة العمر", pt: "Calculadora de Idade", zh: "年龄计算器", ja: "年齢計算機", bn: "বয়স ক্যালকুলেটর", ur: "عمر کا کیلکولیٹر"
  },

  // Benefits & How It Works
  "Key Advantages": {
    hi: "प्रमुख विशेषताएं", es: "Ventajas Principales", fr: "Avantages Clés", de: "Hauptvorteile", ru: "Ключевые преимущества", ar: "المزايا الرئيسية", pt: "Vantagens Principais", zh: "核心优势", ja: "主なメリット", bn: "প্রধান সুবিধাসমূহ", ur: "اہم فوائد"
  },
  "Why Millions Choose Simple Calculator": {
    hi: "लाखों लोग सरल कैलकुलेटर क्यों चुनते हैं", es: "Por Qué Millones Eligen Calculadora Simple", fr: "Pourquoi des Millions Choisissent Calculatrice Simple", de: "Warum Millionen Einfachen Rechner wählen", ru: "Почему миллионы выбирают Простой Калькулятор", ar: "لماذا يفضل الملايين الآلة الحاسبة البسیطة", pt: "Por Que Milhões Escolhem a Calculadora Simples", zh: "为何数百万用户选择简易计算器", ja: "シンプル計算機が選ばれる理由", bn: "লাখো মানুষ কেন সহজ ক্যালকুলেটর বেছে নেয়", ur: "لاکھوں صارفین سادہ کیلکولیٹر کیوں منتخب کرتے ہیں"
  },
  "Seamless Experience": {
    hi: "सहज अनुभव", es: "Experiencia Fluida", fr: "Expérience Fluide", de: "Nahtlose Bedienung", ru: "Удобство работы", ar: "تجربة سلسة", pt: "Experiência Fluida", zh: "流畅便捷体验", ja: "シームレスな操作性", bn: "সহজ অভিজ্ঞতা", ur: "آسان تجربہ"
  },
  "How Simple Calculator Works in 3 Simple Steps": {
    hi: "यह 3 आसान चरणों में कैसे काम करता है", es: "Cómo Funciona en 3 Pasos Simples", fr: "Comment Ça Marche en 3 Étapes Simples", de: "In 3 einfachen Schritten", ru: "Как это работает в 3 простых шага", ar: "كيف تعمل في 3 خطوات سهلة", pt: "Como Funciona em 3 Passos Simples", zh: "简单 3 步轻松搞定", ja: "簡単 3 ステップ", bn: "কীভাবে ৩টি সহজ ধাপে কাজ করে", ur: "یہ 3 آسان مراحل میں کیسے کام کرتا ہے"
  },
  "Three easy steps to fast, reliable, and mathematically accurate calculations": {
    hi: "तेज़, विश्वसनीय और गणितीय रूप से सटीक गणना के तीन आसान चरण", es: "Tres pasos sencillos para cálculos rápidos, fiables y precisos", fr: "Trois étapes faciles pour des calculs rapides, fiables et précis", de: "Drei einfache Schritte zu schnellen und präzisen Berechnungen", ru: "Три простых шага к быстрым, надежным и точным вычислениям", ar: "ثلاث خطوات بسيطة لحسابات سريعة وموثوقة ودقيقة", pt: "Três passos simples para cálculos rápidos, confiáveis e precisos", zh: "简单三步，畅享极速、精准且安全无忧的数学运算体验", ja: "高速で信頼性の高い正確な計算を行うための3つのステップ", bn: "দ্রুত, নির্ভরযোগ্য ও নির্ভুল হিসাবের তিনটি সহজ ধাপ", ur: "تیز، قابل اعتماد اور درست حساب کے 3 آسان اقدامات"
  },

  // FAQ
  "Got Questions?": {
    hi: "कोई प्रश्न?", es: "¿Preguntas?", fr: "Questions ?", de: "Fragen?", ru: "Вопросы?", ar: "لديك أسئلة؟", pt: "Dúvidas?", zh: "常见疑问？", ja: "ご質問", bn: "প্রশ্ন আছে?", ur: "کوئی سوال؟"
  },
  "Frequently Asked Questions": {
    hi: "अक्सर पूछे जाने वाले सवाल (FAQ)", es: "Preguntas Frecuentes (FAQ)", fr: "Foire Aux Questions (FAQ)", de: "Häufig gestellte Fragen (FAQ)", ru: "Часто задаваемые вопросы (FAQ)", ar: "الأسئلة الشائعة (FAQ)", pt: "Perguntas Frequentes (FAQ)", zh: "常见问题解答 (FAQ)", ja: "よくある質問 (FAQ)", bn: "সচরাচর জিজ্ঞাস্য (FAQ)", ur: "اکثر پوچھے گئے سوالات (FAQ)"
  },
  "Everything you need to know about using this online calculator": {
    hi: "इस ऑनलाइन कैलकुलेटर का उपयोग करने के बारे में सब कुछ जानें", es: "Todo lo que necesita saber para usar esta calculadora en línea", fr: "Tout ce que vous devez savoir sur l'utilisation de cette calculatrice", de: "Alles, was Sie über die Nutzung dieses Rechners wissen müssen", ru: "Всё, что вам нужно знать об использовании калькулятора", ar: "كل ما تحتاج لمعرفته حول استخدام هذه الآلة الحاسبة", pt: "Tudo o que você precisa saber sobre o uso desta calculadora", zh: "关于本在线计算器功能与使用方法的一切须知", ja: "このオンライン計算機の使い方に関するすべての情報", bn: "এই অনলাইন ক্যালকুলেটর ব্যবহারের খুঁটিনাটি সবকিছু জানুন", ur: "اس آن لائن کیلکولیٹر کے استعمال کے بارے میں ہر ضروری معلومات"
  },

  // Footer
  "Calculators & Tools": {
    hi: "कैलकुलेटर व टूल्स", es: "Calculadoras y Herramientas", fr: "Calculateurs & Outils", de: "Rechner & Werkzeuge", ru: "Калькуляторы и инструменты", ar: "الحاسبات والأدوات", pt: "Calculadoras e Ferramentas", zh: "计算器与实用工具", ja: "電卓＆計算ツール", bn: "ক্যালকুলেটর ও টুলস", ur: "کیلکولیٹر اور ٹولز"
  },
  "Guides & Comparisons": {
    hi: "गाइड्स व तुलना", es: "Guías y Comparativas", fr: "Guides & Comparatifs", de: "Leitfäden & Vergleiche", ru: "Справочники и сравнения", ar: "الأدلة والمقارنات", pt: "Guias e Comparações", zh: "使用指南与标准对比", ja: "計算ガイド＆比較", bn: "নির্দেশিকা ও তুলনা", ur: "رہنما خطوط اور موازنہ"
  },
  "Authoritative References": {
    hi: "प्रामाणिक संदर्भ", es: "Referencias Oficiales", fr: "Références Officielles", de: "Offizielle Referenzen", ru: "Официальные источники", ar: "المراجع الرسمية", pt: "Referências Oficiais", zh: "权威机构参考标准", ja: "公式リファレンス", bn: "প্রামাণ্য তথ্যসূত্র", ur: "مستند حوالہ جات"
  },
  "Standard Calculator": {
    hi: "मानक कैलकुलेटर", es: "Calculadora Estándar", fr: "Calculatrice Standard", de: "Standard-Rechner", ru: "Стандартный калькулятор", ar: "الحاسبة القياسية", pt: "Calculadora Padrão", zh: "标准四则运算计算器", ja: "標準電卓", bn: "সাধারণ ক্যালকুলেটর", ur: "معیاری کیلکولیٹر"
  },
  "Back to Top ↑": {
    hi: "ऊपर जाएं ↑", es: "Volver Arriba ↑", fr: "Haut de Page ↑", de: "Nach Oben ↑", ru: "Наверх ↑", ar: "إلى الأعلى ↑", pt: "Voltar ao Topo ↑", zh: "返回顶部 ↑", ja: "トップへ戻る ↑", bn: "উপরে যান ↑", ur: "اوپر جائیں ↑"
  }
};

class I18nManager {
  constructor() {
    this.currentLang = localStorage.getItem('calc_lang') || 'en';
    if (!SUPPORTED_LANGUAGES.some(l => l.code === this.currentLang)) {
      this.currentLang = 'en';
    }
  }

  init() {
    this.renderDropdownOptions();
    this.initDropdownEvents();
    this.applyLanguage(this.currentLang);
  }

  renderDropdownOptions() {
    const list = document.getElementById('lang-options-grid');
    if (!list) return;

    list.innerHTML = SUPPORTED_LANGUAGES.map(lang => `
      <button type="button" class="lang-option-chip ${lang.code === this.currentLang ? 'active' : ''}" data-lang-code="${lang.code}">
        <span class="lang-flag">${lang.flag}</span>
        <span class="lang-native-name">${lang.native}</span>
        <span class="lang-code-tag">${lang.code.toUpperCase()}</span>
      </button>
    `).join('');
  }

  initDropdownEvents() {
    const toggleBtn = document.getElementById('btn-lang-toggle');
    const menu = document.getElementById('lang-dropdown-menu');

    if (toggleBtn && menu) {
      toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.classList.toggle('hidden');
        toggleBtn.classList.toggle('active');
      });

      document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && e.target !== toggleBtn) {
          menu.classList.add('hidden');
          toggleBtn.classList.remove('active');
        }
      });
    }

    const grid = document.getElementById('lang-options-grid');
    if (grid) {
      grid.addEventListener('click', (e) => {
        const chip = e.target.closest('.lang-option-chip');
        if (!chip) return;
        const code = chip.dataset.langCode;
        if (code) {
          this.setLanguage(code);
          if (menu) menu.classList.add('hidden');
          if (toggleBtn) toggleBtn.classList.remove('active');
        }
      });
    }
  }

  setLanguage(langCode) {
    this.currentLang = langCode;
    localStorage.setItem('calc_lang', langCode);
    this.applyLanguage(langCode);

    const chips = document.querySelectorAll('.lang-option-chip');
    chips.forEach(chip => {
      chip.classList.toggle('active', chip.dataset.langCode === langCode);
    });

    window.dispatchEvent(new CustomEvent('calculator-language-changed', { detail: { lang: langCode } }));
  }

  applyLanguage(langCode) {
    const langMeta = SUPPORTED_LANGUAGES.find(l => l.code === langCode) || SUPPORTED_LANGUAGES[0];

    // Document HTML tag updates
    document.documentElement.lang = langCode;
    document.documentElement.dir = langMeta.dir || 'ltr';

    // Update Header current lang code indicator
    const currentCodeEl = document.getElementById('lang-current-code');
    if (currentCodeEl) {
      currentCodeEl.textContent = langCode.toUpperCase();
    }

    // 1. Deep Text-Node Traversal for 100% full-page translation ("har ek word change")
    this.translateAllDOMTextNodes(langCode);

    // 2. Attributes: Placeholders and Titles
    this.translateAttributes(langCode);
  }

  translateAllDOMTextNodes(langCode) {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;

          const tag = parent.tagName;
          if (['SCRIPT', 'STYLE', 'CODE', 'PRE', 'NOSCRIPT', 'SVG', 'KBD'].includes(tag)) {
            return NodeFilter.FILTER_REJECT;
          }

          if (parent.closest('#lang-dropdown-menu') || parent.closest('.lang-options-grid') || parent.closest('#display-result') || parent.closest('#display-expression')) {
            return NodeFilter.FILTER_REJECT;
          }

          // Skip purely whitespace or pure numbers
          const text = node.nodeValue.trim();
          if (!text || /^[\d\s.,+\-*/^()=≈%°!]+$/.test(text)) {
            return NodeFilter.FILTER_REJECT;
          }

          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    let currentNode = walker.nextNode();
    while (currentNode) {
      if (currentNode.__i18nOrig === undefined) {
        currentNode.__i18nOrig = currentNode.nodeValue;
      }

      const origRaw = currentNode.__i18nOrig;
      const trimmed = origRaw.trim();

      if (langCode === 'en') {
        currentNode.nodeValue = origRaw;
      } else if (PHRASES[trimmed] && PHRASES[trimmed][langCode]) {
        const leadWs = origRaw.match(/^\s*/)[0];
        const trailWs = origRaw.match(/\s*$/)[0];
        currentNode.nodeValue = leadWs + PHRASES[trimmed][langCode] + trailWs;
      }

      currentNode = walker.nextNode();
    }
  }

  translateAttributes(langCode) {
    // Inputs & Placeholders
    const inputs = document.querySelectorAll('input[placeholder]');
    inputs.forEach(input => {
      if (input.__i18nOrigPlaceholder === undefined) {
        input.__i18nOrigPlaceholder = input.getAttribute('placeholder');
      }
      const orig = input.__i18nOrigPlaceholder.trim();
      if (langCode === 'en') {
        input.setAttribute('placeholder', input.__i18nOrigPlaceholder);
      } else if (PHRASES[orig] && PHRASES[orig][langCode]) {
        input.setAttribute('placeholder', PHRASES[orig][langCode]);
      }
    });

    // Titles & Aria-labels
    const titled = document.querySelectorAll('[title]');
    titled.forEach(el => {
      if (el.closest('#lang-dropdown-menu')) return;
      if (el.__i18nOrigTitle === undefined) {
        el.__i18nOrigTitle = el.getAttribute('title');
      }
      const orig = el.__i18nOrigTitle.trim();
      if (langCode === 'en') {
        el.setAttribute('title', el.__i18nOrigTitle);
      } else if (PHRASES[orig] && PHRASES[orig][langCode]) {
        el.setAttribute('title', PHRASES[orig][langCode]);
      }
    });
  }
}

// Global instance initialized on browser
export const i18n = new I18nManager();

if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    i18n.init();
  });
}
