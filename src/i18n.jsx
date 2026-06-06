import { createContext, useContext, useState, useEffect } from 'react'
import * as EN from './data/portfolio'

/* ────────────────────────────────────────────────────────────────
   UI strings (interface chrome). Brand/tech names stay in English.
──────────────────────────────────────────────────────────────────── */
const UI = {
  en: {
    'nav.about': 'About', 'nav.projects': 'Projects', 'nav.experience': 'Experience',
    'nav.contact': 'Contact', 'nav.hire': 'Hire Me',

    'hero.available': 'Available for projects',
    'hero.hello': 'Hello', 'hero.im': "I'm", 'hero.name': 'Shaheer',
    'hero.titleL1': 'Full Stack', 'hero.titleL2': 'Developer',
    'hero.intro': 'I build Web & Mobile apps used by 50K+ people — currently shipping field-ops software in Riyadh.',
    'hero.ctaProject': 'Got a project?', 'hero.ctaResume': 'My resume',

    'about.eyebrow': 'Get to know me', 'about.titleA': 'About', 'about.titleB': 'Me',
    'about.languages': 'English & Urdu — C2 Proficiency',

    'projects.eyebrow': "What I've Built", 'projects.titleA': 'Featured', 'projects.titleB': 'Projects',
    'projects.subtitle': 'Real products in legal, fintech, education, and field services — shipped, not slideware.',
    'projects.filter.all': 'All', 'projects.filter.web': 'Web', 'projects.filter.mobile': 'Mobile',
    'projects.viewDetails': 'view details', 'projects.underConstruction': 'Under construction',
    'projects.keyHighlights': 'Key Highlights', 'projects.techStack': 'Tech Stack',
    'Live Site': 'Live Site', 'Play Store': 'Play Store', 'Web App': 'Web App',

    'exp.eyebrow': 'Career Path', 'exp.titleA': 'Work', 'exp.titleB': 'Experience',

    'contact.eyebrow': "Let's Connect", 'contact.titleA': 'Get In', 'contact.titleB': 'Touch',
    'contact.subtitle': "Open to exciting opportunities, collaborations, and interesting projects. Let's build something great together.",
    'contact.info': 'Contact Information', 'contact.findOnline': 'Find Me Online',
    'contact.label.email': 'Email', 'contact.label.phone': 'Phone', 'contact.label.location': 'Location',
    'contact.tab.message': 'Send Message', 'contact.tab.schedule': 'Schedule Interview',
    'form.name': 'Your Name', 'form.email': 'Your Email', 'form.message': 'Your message…',
    'form.send': 'Send Message', 'form.sending': 'Sending…',
    'form.successTitle': 'Message Sent!', 'form.successBody': "I'll get back to you within 24 hours.",
    'form.sendAnother': 'Send another',
    'footer.by': 'Designed & Built by',
  },
  ar: {
    'nav.about': 'نبذة', 'nav.projects': 'المشاريع', 'nav.experience': 'الخبرة',
    'nav.contact': 'تواصل', 'nav.hire': 'وظّفني',

    'hero.available': 'متاح للمشاريع',
    'hero.hello': 'مرحباً', 'hero.im': 'أنا', 'hero.name': 'شهير',
    'hero.titleL1': 'مطوّر', 'hero.titleL2': 'متكامل',
    'hero.intro': 'أبني تطبيقات ويب وموبايل يستخدمها أكثر من 50 ألف شخص — وأعمل حالياً على برمجيات العمليات الميدانية في الرياض.',
    'hero.ctaProject': 'لديك مشروع؟', 'hero.ctaResume': 'سيرتي الذاتية',

    'about.eyebrow': 'تعرّف عليّ', 'about.titleA': 'نبذة', 'about.titleB': 'عنّي',
    'about.languages': 'الإنجليزية والأردية — إتقان C2',

    'projects.eyebrow': 'ما الذي بنيته', 'projects.titleA': 'مشاريع', 'projects.titleB': 'مختارة',
    'projects.subtitle': 'منتجات حقيقية في القانون والتقنية المالية والتعليم والخدمات الميدانية — مُطلقة، لا مجرّد شرائح عرض.',
    'projects.filter.all': 'الكل', 'projects.filter.web': 'ويب', 'projects.filter.mobile': 'موبايل',
    'projects.viewDetails': 'عرض التفاصيل', 'projects.underConstruction': 'قيد الإنشاء',
    'projects.keyHighlights': 'أبرز النقاط', 'projects.techStack': 'التقنيات',
    'Live Site': 'الموقع المباشر', 'Play Store': 'متجر جوجل بلاي', 'Web App': 'تطبيق ويب',

    'exp.eyebrow': 'المسار المهني', 'exp.titleA': 'الخبرة', 'exp.titleB': 'العملية',

    'contact.eyebrow': 'لنتواصل', 'contact.titleA': 'تواصل', 'contact.titleB': 'معي',
    'contact.subtitle': 'منفتح على الفرص المثيرة والتعاونات والمشاريع الممتعة. لنبنِ شيئاً رائعاً معاً.',
    'contact.info': 'معلومات التواصل', 'contact.findOnline': 'تابعني عبر الإنترنت',
    'contact.label.email': 'البريد', 'contact.label.phone': 'الهاتف', 'contact.label.location': 'الموقع',
    'contact.tab.message': 'إرسال رسالة', 'contact.tab.schedule': 'حجز مقابلة',
    'form.name': 'اسمك', 'form.email': 'بريدك الإلكتروني', 'form.message': 'رسالتك…',
    'form.send': 'إرسال الرسالة', 'form.sending': 'جارٍ الإرسال…',
    'form.successTitle': 'تمّ إرسال الرسالة!', 'form.successBody': 'سأردّ عليك خلال 24 ساعة.',
    'form.sendAnother': 'إرسال رسالة أخرى',
    'footer.by': 'صُمّم وبُني بواسطة',
  },
}

const LISTS = {
  en: { 'about.soft': ['Problem-Solving', 'Communication', 'Teamwork', 'Collaboration', 'Adaptability', 'Time Management'] },
  ar: { 'about.soft': ['حلّ المشكلات', 'التواصل', 'العمل الجماعي', 'التعاون', 'المرونة', 'إدارة الوقت'] },
}

/* ────────────────────────────────────────────────────────────────
   Arabic content overrides (merged onto the English data structure).
──────────────────────────────────────────────────────────────────── */
const AR = {
  personal: {
    title: 'مطوّر متكامل · ريأكت و ريأكت نيتف',
    summary: 'مطوّر متكامل يتمتّع بخمس سنوات في إطلاق تطبيقات الويب والموبايل إلى الإنتاج. بنيتُ منصّات قانونية مدعومة بالذكاء الاصطناعي، وأنظمة مدارس متعدّدة المستأجرين، وأدوات للعمليات الميدانية — تطبيقات يستخدمها أشخاص حقيقيون، خمسون ألفاً منهم على منصّة واحدة فقط. أعمل اليوم في الرياض على بناء برمجيات الموظّفين والعمليات الميدانية لشركة سند. ما يهمّني أكثر هو الجزء غير اللامع: تطبيقات تبقى سريعة، وتصمد أمام الشبكات الضعيفة، ولا تتعطّل في الميدان.',
    location: 'الرياض، السعودية',
    statsLabels: ['سنوات الخبرة', 'المستخدمون', 'المشاريع المُنجزة', 'المؤسّسات'],
  },
  skillsCategories: {
    'Frontend': 'الواجهات الأمامية',
    'Backend & APIs': 'الخلفية وواجهات برمجة التطبيقات',
    'Databases': 'قواعد البيانات',
    'DevOps & Deploy': 'ديف أوبس والنشر',
    'Data Engineering': 'هندسة البيانات',
  },
  skillsLevels: { 'Advanced': 'متقدّم', 'Intermediate': 'متوسّط', 'Beginner': 'مبتدئ' },
  experience: [
    {
      role: 'مطوّر متكامل', location: 'الرياض، السعودية', period: 'يناير 2026 – حتى الآن', type: 'دوام كامل',
      highlights: [
        'بنيتُ بوابة الخدمة الذاتية للموظّفين ESS ‏(ريأكت + نود.جي إس) مع تسجيل دخول موحّد كيك لوك وتكامل أودو HR',
        'بنيتُ تطبيق سند للموبايل — تطبيق عمليات ميدانية بـ ريأكت نيتف لمسارات إف إل إم و سي آي تي',
        'نفّذتُ تنقّلاً ديناميكياً مُداراً من الخادم، وإدارة للتذاكر والرحلات، وقوائم تحقّق',
        'هندستُ رفعاً قابلاً للاستئناف للوسائط (تاس + إف تي بي)، وضغط الفيديو، والتعامل مع وضع عدم الاتصال',
      ],
    },
    {
      role: 'مطوّر متكامل', location: 'إسلام آباد، باكستان', period: 'سبتمبر 2023 – ديسمبر 2025', type: 'دوام كامل',
      highlights: [
        'صُنتُ قواعد بيانات ضخمة تضمّ ملايين السجلّات على منصّة Cayuse البحثية',
        'نفّذتُ ترحيل بيانات المستأجرين باستخدام بوستجري إس كيو إل و إيه دبليو إس إس 3',
        'أدرتُ لوحات باور بي آي متّصلة مباشرةً بـ بوستجري إس كيو إل',
        'شغّلتُ بيئات إيه دبليو إس عبر منصّة دوبلو كلاود لـ ديف أوبس',
      ],
    },
    {
      role: 'مطوّر إم إي آر إن ستاك', location: 'روالبندي، باكستان', period: 'يونيو 2020 – يونيو 2023', type: 'دوام كامل',
      highlights: [
        'بدأتُ متدرّباً في إم إي آر إن ثمّ ترقّيتُ إلى مطوّر بدوام كامل',
        'بنيتُ AI Attorney — منصّة ساس قانونية تخدم أكثر من 50 ألف مستخدم و200 مؤسّسة قانونية',
        'طوّرتُ HUMRAAH — تطبيق تنظيم أسرة بأكثر من 5 آلاف تنزيل على متجر جوجل بلاي',
        'بنيتُ SPO Campus Pro — نظام إي آر بي مدرسي متعدّد المستأجرين لأكثر من 20 مدرسة و15 ألف طالب',
        'نفّذتُ محادثة فورية، وتحديد المواقع، وتكاملات الذكاء الاصطناعي، ومدفوعات سترايب',
      ],
    },
  ],
  projects: {
    'Sanid Mobile App': {
      subtitle: 'تطبيق عمليات ميدانية', period: 'مارس 2026 – حتى الآن',
      description: 'احتاج الفنّيون الميدانيون تطبيقاً واحداً لمهمّتين مختلفتين تماماً (إف إل إم و سي آي تي). فبدلاً من بناءين منفصلين، يُدار التنقّل نفسه من الخادم ويُعاد بناؤه حسب الدور. إضافةً إلى ذلك: رفع قابل للاستئناف للشبكات الضعيفة في مواقع العمل، وإدارة للرحلات والتذاكر مع مرشّحات إس إل إيه، ودعم كامل للعربية و آر تي إل.',
      highlights: [
        'تنقّل سفلي ديناميكي مُدار من الخادم مع قائمة فائض تكيّفية',
        'إدارة التذاكر والرحلات: مرشّحات إس إل إيه، تحديث واعٍ بالموقع، مسارات الحالة، وإعادة التعيين',
        'رفع وسائط قابل للاستئناف (تاس + إف تي بي)، وضغط الفيديو، وأشرطة تقدّم',
        'التعامل مع عدم الاتصال، ودعم آر تي إل/العربية، ورسائل فايربيس وتقارير الأعطال',
      ],
      stats: { workflows: 'إف إل إم و سي آي تي', platform: 'آي أو إس و أندرويد' },
    },
    'ESS Portal': {
      subtitle: 'بوابة الخدمة الذاتية للموظّفين', period: 'يناير 2026 – مارس 2026',
      description: 'لم يكن لدى الموظّفين مكان واحد للاطّلاع على بياناتهم في الموارد البشرية. بنيتُ بوابة خدمة ذاتية مُحوّلة إلى دوكر تربط تسجيل الدخول الموحّد كيك لوك بنظام أودو لإدارة الموارد البشرية — تسجيل دخول آمن واحد لكشوف الرواتب والإجازات والحضور والمصروفات والسياسات والمستندات، مع بثّ ملفّات بي دي إف مباشرةً من المصدر.',
      highlights: [
        'تسجيل دخول موحّد كيك لوك مع التحقّق من الرموز في الواجهة وواجهة برمجة تطبيقات',
        'تكامل نظام أودو لإدارة الموارد البشرية كمصدر لبيانات الموظّفين وكشوف الرواتب',
        'إدارة المستندات: بثّ بي دي إف، والتنزيل، ورفع الملفّات',
        'تحويل إلى دوكر عبر دوكر كومبوز مع دليل نشر على إي سي 2',
      ],
      stats: { auth: 'تسجيل دخول موحّد كيك لوك', source: 'أودو لإدارة الموارد البشرية' },
    },
    'Xcelerate': {
      subtitle: 'منصّة خدمات ميدانية', period: 'فبراير 2025 – ديسمبر 2025',
      description: 'تطبيق خدمات ميدانية كان الفنّيون يُسجَّلون فيه عند مواقع العمل الخطأ — إذ كان السياج الجغرافي يقيس المسافة الإقليدية المسطّحة بدل صيغة هافرسين على أرضٍ كروية. أصلحتُ الحسابات، وأعدتُ بناء الإشعارات بـ نوتيفي لتعمل في حالات التطبيق الثلاث، وعالجتُ التقطّع باستخدام فليبر.',
      highlights: [
        'إصلاح خطأ حرج في صيغة السياج الجغرافي (هافرسين مقابل الإقليدية)',
        'استبدال نظام الإشعارات بـ نوتيفي لحالات التطبيق الثلاث',
        'تحليل الأداء باستخدام فليبر — وحلّ عدّة اختناقات',
        'تنفيذ واجهة دقيقة من فيغما إلى ريأكت نيتف',
      ],
      stats: { industry: 'السعودية', type: 'خدمات ميدانية' },
    },
    'Metro Pakistan': {
      subtitle: 'منصّة تجارة إلكترونية وتجزئة', period: '2024',
      description: 'ساهمتُ في منصّة الويب لإحدى أكبر سلاسل البيع بالجملة (الدفع والحمل) في باكستان — كتالوج المنتجات، وإدارة الطلبات، وتسعير الجملة، وكلّها تعمل في بيئة إنتاج عالية الحركة بحجم بيانات مؤسّسي.',
      highlights: [
        'منصّة تجارة إلكترونية واسعة لأكبر سلسلة جملة في باكستان',
        'كتالوج المنتجات وإدارة الطلبات وميزات تسعير الجملة',
        'بيئة إنتاج عالية الحركة بحجم بيانات مؤسّسي',
      ],
      stats: { scale: 'مؤسّسي', market: 'باكستان' },
    },
    'Cayuse': {
      subtitle: 'منصّة إدارة الأبحاث', period: 'سبتمبر 2023 – أكتوبر 2024',
      description: 'منصّة أبحاث تضمّ ملايين السجلّات عبر جامعات ومستشفيات. كان عملي في جانب البيانات: ترحيل المستأجرين باستخدام بوستجري إس كيو إل و إيه دبليو إس إس 3، ولوحات باور بي آي موصولة مباشرةً بقاعدة البيانات، وتجهيز البيئات عبر دوبلو كلاود.',
      highlights: [
        'صيانة ملايين السجلّات عبر عملاء مؤسّسيين',
        'ترحيل بيانات المستأجرين باستخدام بوستجري إس كيو إل و إيه دبليو إس إس 3',
        'لوحات باور بي آي موصولة مباشرةً بـ بوستجري إس كيو إل',
        'تجهيز البيئات عبر دوبلو كلاود ‏(إيه دبليو إس إي سي 2 + بوستجري إس كيو إل)',
      ],
      stats: { records: 'ملايين', clients: 'مؤسّسي' },
    },
    'AI Attorney': {
      subtitle: 'منصّة ساس قانونية بالذكاء الاصطناعي', period: 'مايو 2022 – يونيو 2023',
      description: 'البحث القانوني بطيء ومكلف. بنينا منصّة ساس تتيح للمحامين البحث في السوابق القضائية بلغة طبيعية — عبر خطّ آر إيه جي فوق باينكون و جي بي تي-4 — إضافةً إلى محادثة ذكية، ومفكّرة قضايا، وفوترة سترايب. ونمت إلى أكثر من 50 ألف مستخدم و200 مكتب محاماة.',
      highlights: [
        'خدمة أكثر من 50,000 مستخدم و200 مؤسّسة قانونية',
        'خطّ آر إيه جي: ‏باينكون + جي بي تي-4 للبحث الدلالي في القضايا',
        'بناء محادثة ذكية، ومفكّرة قضايا، ومدفوعات سترايب، وتقارير الأعطال',
        'ميزات فورية عبر سوكيت.آي أو + فايربيس',
      ],
      stats: { users: '+50 ألف', orgs: '+200' },
    },
    'HUMRAAH': {
      subtitle: 'تطبيق توعية بتنظيم الأسرة', period: 'أغسطس 2021 – مايو 2022',
      description: 'تطبيق تنظيم أسرة لمنظّمة غير ربحية في باكستان يربط الناس بالأطبّاء عبر محادثة مباشرة ويجد المرافق الصحّية القريبة حسب الموقع. الاتّصال غير موثوق هناك، لذا تُحفظ النماذج دون اتصال وتُرسَل تلقائياً فور عودة الإشارة. أكثر من 5,000 تنزيل.',
      highlights: [
        'أكثر من 5,000 تنزيل على متجر جوجل بلاي لمنصّة توعية غير ربحية',
        'محادثة فورية مع الأطبّاء بأسلوب واتساب عبر سوكيت.آي أو + فايربيس',
        'محدّد مرافق بالسياج الجغرافي باستخدام واجهة برمجة تطبيقات خرائط جوجل',
        'حفظ النماذج دون اتصال مع الإرسال التلقائي عبر أينك ستوريج + نت إنفو',
      ],
      stats: { users: '+5 آلاف', downloads: 'متجر جوجل بلاي' },
    },
    'SPO Campus Pro': {
      subtitle: 'نظام إي آر بي مدرسي متعدّد المستأجرين', period: 'ديسمبر 2020 – يوليو 2021',
      description: 'نظام إي آر بي مدرسي يكون فيه كلّ مدرسة مستأجراً معزولاً على بنية تحتية مشتركة. الحضور والجداول والرسوم والغرامات عبر الويب والموبايل — مع كشف التعارض في الجدولة. تمّ إدراج أكثر من 20 مدرسة و15,000 طالب، وأتمتة نحو 85% من العمل الإداري اليدوي.',
      highlights: [
        'إدراج أكثر من 20 مدرسة و15,000 طالب',
        'أتمتة أكثر من 85% من العمليات المدرسية اليدوية',
        'وحدات الحضور والجدول والرسوم والغرامات على الويب والموبايل',
        'كشف التعارض في جدولة المواعيد، وعمليات واجهات برمجة التطبيقات مجمّعة',
      ],
      stats: { schools: '+20', students: '+15 ألف' },
    },
  },
}

/* ── merge helpers ──────────────────────────────────────────────── */
const localizePersonal = (lang) => lang === 'en' ? EN.personal : {
  ...EN.personal,
  title: AR.personal.title,
  summary: AR.personal.summary,
  location: AR.personal.location,
  stats: EN.personal.stats.map((s, i) => ({ ...s, label: AR.personal.statsLabels[i] })),
}

const localizeSkills = (lang) => lang === 'en' ? EN.skills : EN.skills.map(cat => ({
  ...cat,
  category: AR.skillsCategories[cat.category] ?? cat.category,
  items: cat.items.map(it => ({ ...it, level: AR.skillsLevels[it.level] ?? it.level })),
}))

const localizeExperience = (lang) => lang === 'en' ? EN.experience
  : EN.experience.map((job, i) => ({ ...job, ...(AR.experience[i] ?? {}) }))

const localizeProjects = (lang) => lang === 'en' ? EN.projects
  : EN.projects.map(p => {
      const overrides = AR.projects[p.name] ?? {}
      return { ...p, ...overrides, name: p.name }
    })

/* ── context ────────────────────────────────────────────────────── */
const I18nContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en')

  useEffect(() => {
    localStorage.setItem('lang', lang)
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [lang])

  const value = {
    lang,
    setLang,
    toggle: () => setLang(l => (l === 'en' ? 'ar' : 'en')),
    dir: lang === 'ar' ? 'rtl' : 'ltr',
    t: (key) => UI[lang][key] ?? UI.en[key] ?? key,
    tl: (key) => LISTS[lang][key] ?? LISTS.en[key] ?? [],
    personal: localizePersonal(lang),
    skills: localizeSkills(lang),
    experience: localizeExperience(lang),
    projects: localizeProjects(lang),
  }

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within LanguageProvider')
  return ctx
}
