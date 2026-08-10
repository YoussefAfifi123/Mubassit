import { DeviceType } from "./types";

export interface TranslationDictionary {
  brandTitle: string;
  brandSubtitle: string;
  textSizeLabel: string;
  normalTextBtn: string;
  extraClearTextBtn: string;
  homeBtn: string;
  designedWithCare: string;
  introTitle: string;
  introDesc: string;
  startBtn: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  savedSolutionsHeader: string;
  savedSolutionsSub: string;
  savedOn: string;
  open: string;
  remove: string;
  step1Of5: string;
  deviceScreenTitle: string;
  deviceScreenDesc: string;
  step2Of5: string;
  osScreenTitle: string;
  osScreenDesc: string;
  step3Of5: string;
  symptomsScreenTitle: string;
  symptomsScreenDesc: string;
  customSymptomLabel: string;
  customSymptomPlaceholder: string;
  step4Of5: string;
  negativesScreenTitle: string;
  negativesScreenDesc: string;
  negativesSkipTip: string;
  step5Of5: string;
  triedScreenTitle: string;
  triedScreenDesc: string;
  triedInputPlaceholder: string;
  addBtn: string;
  thingsTriedTitle: string;
  noPriorAttempts: string;
  getFixesBtn: string;
  backBtn: string;
  nextBtn: string;
  formulatingTitle: string;
  formulatingDesc: string;
  friendlyDiagnosisLabel: string;
  whatToDoHeader: string;
  visualGuideTab?: string;
  simpleTextTab?: string;
  hardwareMapTab?: string;
  guideViewLabel?: string;
  stepProgressLabel?: string;
  stepsCompletedLabel?: string;
  resetProgressBtn?: string;
  allStepsCompletedTitle?: string;
  allStepsCompletedSub?: string;
  prevStepBtn?: string;
  nextStepBtn?: string;
  saveSolutionText: string;
  saveSolutionBtn: string;
  saveToFavourites: string;
  savedToFavourites: string;
  favouritesHeader: string;
  favouritesSub: string;
  removeFromFavourites: string;
  favouriteSavedAlert: string;
  didThisFixHeader: string;
  didThisFixSub: string;
  yesFixedBtn: string;
  noBackupBtn: string;
  needAssistBtn: string;
  watchVideoHeader: string;
  watchVideoDesc: string;
  searchGoogleHeader: string;
  searchGoogleDesc: string;
  noteFamilyHeader: string;
  noteFamilyDesc: string;
  whoSendingLabel: string;
  whoSendingPlaceholder: string;
  updateNameBtn: string;
  copiedNoteAlert: string;
  copyNoteBtn: string;
  editSymptomsBtn: string;
  startOverBtn: string;
  footerText: string;
  footerLine1: string;
  footerLine2: string;
  footerLine3: string;
  identifyBrandTitle: string;
  yesAppleBtn: string;
  yesWindowsBtn: string;
  yesChromeBtn: string;
  itIsAppleBtn: string;
  itIsAndroidBtn: string;
  useInkCartridgeBtn: string;
  useTonerBtn: string;
  skipGuideBtn: string;
  appleMacLabel: string;
  appleMacDesc: string;
  windowsPcLabel: string;
  windowsPcDesc: string;
  chromebookLabel: string;
  chromebookDesc: string;
  applePhoneLabel: string;
  applePhoneDesc: string;
  androidPhoneLabel: string;
  androidPhoneDesc: string;
  inkjetPrinterLabel: string;
  inkjetPrinterDesc: string;
  laserPrinterLabel: string;
  laserPrinterDesc: string;
}

export const TRANSLATIONS: Record<"en" | "ar", TranslationDictionary> = {
  en: {
    brandTitle: "Mubassitt",
    brandSubtitle: "Simplifying tech troubleshooting for everyone, step-by-step.",
    textSizeLabel: "Text Size:",
    normalTextBtn: "Normal",
    extraClearTextBtn: "Extra Clear",
    homeBtn: "Home",
    designedWithCare: "Designed with Patience and Care",
    introTitle: "You do not need to be a \"tech genius\" to fix your devices.",
    introDesc: "Technology can be overwhelming, and it's easy to feel stuck. This friendly helper walks you through your problem in simple, non-technical words. We focus on real things you can see and touch—with no confusing jargon.",
    startBtn: "Start Troubled Device Helper",
    step1Title: "Choose Your Device",
    step1Desc: "Select what is acting up—whether it's your laptop, tablet, Wi-Fi router, or printer.",
    step2Title: "Check What's Happening",
    step2Desc: "Point out symptoms. We'll also ask what you are 100% sure is working, which rules out mistakes!",
    step3Title: "Get Clear DIY Steps",
    step3Desc: "Follow 3 to 5 physical, simple steps. If it doesn't work, we'll give alternative fixes or create a friendly note to send to family.",
    savedSolutionsHeader: "My Saved Solutions Folder",
    savedSolutionsSub: "Solutions you've flagged as helpful in the past so you can quickly refer back to them.",
    savedOn: "Saved on",
    open: "Open",
    remove: "Remove",
    step1Of5: "Step 1 of 5",
    deviceScreenTitle: "Which device is acting up today?",
    deviceScreenDesc: "Tap on the picture that looks most like your troubled device.",
    step2Of5: "Step 2 of 5",
    osScreenTitle: "Do you know what brand or software it uses?",
    osScreenDesc: "Selecting the system helps us give more exact button locations and instructions.",
    step3Of5: "Step 3 of 5",
    symptomsScreenTitle: "What symptoms or weird behaviors are you seeing?",
    symptomsScreenDesc: "Check all that apply. You can also write down details in your own words below.",
    customSymptomLabel: "Describe the issue in your own words (Optional)",
    customSymptomPlaceholder: "Example: The computer screen works but when I click the blue email box, it spins forever and tells me connection failed...",
    step4Of5: "Step 4 of 5",
    negativesScreenTitle: "What are you 100% sure is NOT the issue?",
    negativesScreenDesc: "Ruling out what works perfectly is extremely powerful! It helps us skip basic checks and pinpoint the actual culprit.",
    negativesSkipTip: "Don't see your negative symptoms? No problem! You can skip this step or just check what is true.",
    step5Of5: "Step 5 of 5",
    triedScreenTitle: "Have you already tried any fixes?",
    triedScreenDesc: "If you already tried turning it off and on, unplugging a wire, or hitting a button, let us know! We won't repeat suggestions you've already attempted.",
    triedInputPlaceholder: "Example: Unplugged the wire from the wall...",
    addBtn: "Add",
    thingsTriedTitle: "Things you already tried:",
    noPriorAttempts: "No prior attempts listed yet. You can add something above, or just click \"Get My Fixes\" below!",
    getFixesBtn: "Get My Fixes",
    backBtn: "Go Back",
    nextBtn: "Next Step",
    formulatingTitle: "Formulating Simple Solution...",
    formulatingDesc: "We are analyzing your symptoms and ruling out negative indicators to give you the most comforting, step-by-step DIY steps.",
    friendlyDiagnosisLabel: "Friendly Diagnosis",
    whatToDoHeader: "What to do: Follow these steps slowly",
    visualGuideTab: "Visual Cards",
    simpleTextTab: "Simple Text List",
    hardwareMapTab: "Device Hardware Inspector",
    guideViewLabel: "View Mode:",
    stepProgressLabel: "Step-by-Step Progress",
    stepsCompletedLabel: "Steps Done",
    resetProgressBtn: "Reset Progress",
    allStepsCompletedTitle: "🎉 All Steps Completed!",
    allStepsCompletedSub: "Great job! You have gone through every step in this guide.",
    prevStepBtn: "Previous Step",
    nextStepBtn: "Next Step",
    saveSolutionText: "Would you like to keep this guide in your Saved Solutions chest for later?",
    saveSolutionBtn: "Save Solution to Folder",
    saveToFavourites: "Add to Favourite Fixes",
    savedToFavourites: "Saved in Favourites",
    favouritesHeader: "My Favourite Fixes",
    favouritesSub: "Your bookmarked guides that you can quickly view or reference anytime.",
    removeFromFavourites: "Remove from Favourites",
    favouriteSavedAlert: "Added to your Favourites chest! You can find it at the bottom of the home screen.",
    didThisFixHeader: "Did these steps change anything?",
    didThisFixSub: "Be honest! If it didn't change anything, we will record that as a failed attempt to try our alternative guide.",
    yesFixedBtn: "Yes, it is fully fixed!",
    noBackupBtn: "No, try the backup fix!",
    needAssistBtn: "I need a helper's assist",
    watchVideoHeader: "Watch Video Help on YouTube",
    watchVideoDesc: "Click to search YouTube for: \"{query}\" where friendly creators demonstrate it on screen.",
    searchGoogleHeader: "Search Google for Solutions",
    searchGoogleDesc: "Click to browse articles for: \"{query}\" compiled for beginners.",
    noteFamilyHeader: "Create a Helpful Note to Send to Family",
    noteFamilyDesc: "If you'd like your younger relative or local helper to help you, copy-paste this note into a text message or email. It already details exactly what you checked and tried, which will impress them and save time!",
    whoSendingLabel: "Who are you sending to?",
    whoSendingPlaceholder: "Name (e.g. Youssef)",
    updateNameBtn: "Update Name",
    copiedNoteAlert: "Copied Note!",
    copyNoteBtn: "Copy Note",
    editSymptomsBtn: "Edit Symptoms & Details",
    startOverBtn: "Start Over",
    footerText: "Friendly Tech Troubleshooter © {year}. Designed as an empowering, loving space for older adults and tech beginners. All advice is designed to be physically safe and non-destructive.",
    footerLine1: "No professional fees",
    footerLine2: "No technical degrees needed",
    footerLine3: "Empower yourself today!",
    identifyBrandTitle: "Simple Visual Guide: How to Identify Your Brand",
    yesAppleBtn: "Yes, I see the Apple!",
    yesWindowsBtn: "Yes, that is mine!",
    yesChromeBtn: "Yes, I have a Chrome!",
    itIsAppleBtn: "It's an Apple Device",
    itIsAndroidBtn: "It's one of these (Android)",
    useInkCartridgeBtn: "I use Ink Cartridges",
    useTonerBtn: "I use a large black Toner",
    skipGuideBtn: "Skip guide—I'm still not sure, let's keep going anyway!",
    appleMacLabel: "Apple Mac",
    appleMacDesc: "Look at the physical lid of your closed laptop, or the top left corner of your screen. Is there a sleek, glowing, or dark sticker of a bitten apple 🍎?",
    windowsPcLabel: "Windows PC",
    windowsPcDesc: "Does your computer have a brand name like HP, Dell, Lenovo, ASUS, Acer printed below the screen? When it starts up, do you see a blue window icon 🪟?",
    chromebookLabel: "Chromebook",
    chromebookDesc: "Does the cover have a colorful circle logo? Or when you turn it on, does it display a big \"Chrome\" or \"Google\" word across the screen?",
    applePhoneLabel: "Apple iPhone / iPad",
    applePhoneDesc: "Flip your phone or tablet on its back. If you see a silver or grey bitten apple logo 🍎 in the middle of the back case, this is an Apple device.",
    androidPhoneLabel: "Android",
    androidPhoneDesc: "Does your phone have a label on the back saying SAMSUNG, Pixel, Motorola, or LG? This means it runs Google's Android system.",
    inkjetPrinterLabel: "Inkjet (Liquid Cartridges)",
    inkjetPrinterDesc: "You open a door and snap in small plastic boxes of ink that shake or liquid inside. Common brands: HP ENVY, Canon PIXMA, Epson Expression.",
    laserPrinterLabel: "Laser (Toner Cylinder)",
    laserPrinterDesc: "You slide out a large, heavy, long black tube. This is dry dust ink (toner). It prints incredibly fast. Common brands: HP LaserJet, Brother HL.",
  },
  ar: {
    brandTitle: "مُبَسِّط | Mubassitt",
    brandSubtitle: "تبسيط التكنولوجيا والتعامل مع أجهزتك خطوة بخطوة.",
    textSizeLabel: "حجم الخط:",
    normalTextBtn: "عادي",
    extraClearTextBtn: "كبير وواضح جداً",
    homeBtn: "الرئيسية",
    designedWithCare: "اتصمم بكل صبر وحب عشانك",
    introTitle: "مش محتاج تكون \"عبقري تكنولوجيا\" عشان تصلح أجهزتك بنفسك.",
    introDesc: "التكنولوجيا ساعات بتبقى ملغبطة ومقلقة وممكن تحس إنك عاجز قدامها. المساعد اللطيف ده هيمشي معاك خطوة بخطوة في مشكلتك بكلام بسيط وسهل جداً، من غير أي مصطلحات معقدة. كلامنا كله عن حاجات حقيقية تقدر تشوفها وتلمسها بإيدك.",
    startBtn: "ابدأ مساعد حل أعطال الأجهزة",
    step1Title: "اختار جهازك",
    step1Desc: "حدد إيه اللي مضايقك وموقف شغلك اليوم، لابتوب، تليفون، راوتر النت، أو الطابعة.",
    step2Title: "قولنا إيه اللي بيحصل",
    step2Desc: "حدد الأعراض اللي بتظهر. وساعات هنسألك عن حاجات متأكد إنها شغالة تمام عشان نلغي الاحتمالات الغلط!",
    step3Title: "خطوات تصليح سهلة بنفسك",
    step3Desc: "اتبع من ٣ لـ ٥ خطوات عملية وبسيطة جداً. لو منفعش، هنديك حلول بديلة أو نعملك رسالة لطيفة تبعتها لأولادك أو أحفادك يساعدوك.",
    savedSolutionsHeader: "مجلد الحلول المحفوظة الخاصة بي",
    savedSolutionsSub: "الحلول اللي علمت عليها قبل كدة كـ مفيدة عشان ترجع لها بسرعة في أي وقت.",
    savedOn: "اتحفظت في",
    open: "افتح",
    remove: "إزالة",
    step1Of5: "الخطوة ١ من ٥",
    deviceScreenTitle: "إيه الجهاز اللي تعبك ومضايقك النهاردة؟",
    deviceScreenDesc: "اضغط على الصورة اللي شبه جهازك اللي فيه المشكلة.",
    step2Of5: "الخطوة ٢ من ٥",
    osScreenTitle: "تعرف نوع نظام التشغيل أو ماركة الجهاز إيه؟",
    osScreenDesc: "تحديد النظام بيساعدنا جداً ندلك على أماكن الزراير والتعليمات المظبوطة بالظبط.",
    step3Of5: "الخطوة ٣ من ٥",
    symptomsScreenTitle: "إيه الأعراض أو التصرفات الغريبة اللي بتشوفها في الجهاز؟",
    symptomsScreenDesc: "علم على كل الحاجات اللي بتحصل. وتقدر كمان تكتب المشكلة بطريقتك وبكلامك في المربع تحت.",
    customSymptomLabel: "اكتب المشكلة بكلامك وطريقتك الخاصة (اختياري)",
    customSymptomPlaceholder: "مثال: شاشة الكمبيوتر شغالة بس لما بفتح علبة الإيميل الزرقاء بتفضل تدور وتلف ومش بتفتح خالص...",
    step4Of5: "الخطوة ٤ من ٥",
    negativesScreenTitle: "إيه الحاجات اللي أنت متأكد ١٠٠٪ إنها سليمة ومش هي المشكلة؟",
    negativesScreenDesc: "لما بنلغي الحاجات السليمة اللي شغالة تمام، ده بيساعدنا نحدد العيب الأساسي بسرعة ونوفر وقت ومجهود كبير!",
    negativesSkipTip: "مش شايف الحاجات السليمة بتاعتك؟ مفيش مشكلة خالص! تقدر تتخطى الخطوة دي أو تعلم على الحاجات الحقيقية بس.",
    step5Of5: "الخطوة ٥ من ٥",
    triedScreenTitle: "هل جربت تعمل أي حاجة عشان تحلها قبل كدة؟",
    triedScreenDesc: "لو جربت تقفل الجهاز وتفتحه، أو تشد سلك وترجعه، أو تضغط على زرار معين، قولنا عليه! عشان منقعدش نكرر نفس الاقتراحات اللي أنت تعبت وعملتها.",
    triedInputPlaceholder: "مثال: شلت فيشة سلك الكهربا من الحيطة ورجعتها...",
    addBtn: "إضافة",
    thingsTriedTitle: "حاجات أنت جربت تعملها فعلاً:",
    noPriorAttempts: "مكتبتش أي محاولات تصليح سابقة لسه. تقدر تكتب حاجة فوق، أو تضغط على 'شغل المساعد وهات الحلول' تحت!",
    getFixesBtn: "شغل المساعد وهات الحلول",
    backBtn: "رجوع للخلف",
    nextBtn: "الخطوة التالية",
    formulatingTitle: "بنجهزلك حل بسيط وسهل...",
    formulatingDesc: "بنحلل الأعراض وبنشوف إيه اللي شغال وسليم عشان نديك خطوات تصليح واضحة ومريحة تعملها بنفسك خطوة بخطوة.",
    friendlyDiagnosisLabel: "تشخيص مبسط ولطيف",
    whatToDoHeader: "ما يجب فعله: اتبع هذه الخطوات ببطء وهدوء",
    visualGuideTab: "كروت بصرية مصورة",
    simpleTextTab: "قائمة نصية بسيطة",
    hardwareMapTab: "دليل فحص أجزاء الجهاز",
    guideViewLabel: "طريقة العرض:",
    stepProgressLabel: "نسبة التقدم خطوة بخطوة",
    stepsCompletedLabel: "خطوات مكتملة",
    resetProgressBtn: "إعادة ضبط التقدم",
    allStepsCompletedTitle: "🎉 عاش! أتممت جميع الخطوات بنجاح!",
    allStepsCompletedSub: "ممتاز جداً! لقد مررت بجميع خطوات الدليل بنجاح.",
    prevStepBtn: "الخطوة السابقة",
    nextStepBtn: "الخطوة التالية",
    saveSolutionText: "هل ترغب في حفظ هذا الحل في صندوق الحلول المحفوظة للرجوع إليه لاحقاً؟",
    saveSolutionBtn: "حفظ الحل في مجلدك الخاص",
    saveToFavourites: "إضافة إلى الحلول المفضلة",
    savedToFavourites: "محفوظ في المفضلة",
    favouritesHeader: "حلولي المفضلة",
    favouritesSub: "الحلول اللي حفظتها في المفضلة عشان ترجع لها وتراجعها بسرعة في أي وقت.",
    removeFromFavourites: "إزالة من المفضلة",
    favouriteSavedAlert: "تمت الإضافة لحلولك المفضلة! هتلاقيها تحت خالص في الشاشة الرئيسية.",
    didThisFixHeader: "هل الخطوات دي غيرت أي حاجة؟",
    didThisFixSub: "قولنا بصراحة! لو مغيرتش حاجة، هنسجل ده ونعرضلك الحل البديل والاحتياطي المكتوب عشان نساعدك وماتقلقش خالص.",
    yesFixedBtn: "أيوا، اتحلت تماماً والجهاز رجع يشتغل!",
    noBackupBtn: "لأ، اعرضلي الحل الاحتياطي البديل!",
    needAssistBtn: "محتاج مساعدة حد من العيلة",
    watchVideoHeader: "شاهد فيديو توضيحي على يوتيوب",
    watchVideoDesc: "اضغط عشان تبحث في يوتيوب عن: \"{query}\" وهتلاقي شروحات مصورة وبسيطة بالصوت والصورة.",
    searchGoogleHeader: "ابحث في جوجل عن حلول",
    searchGoogleDesc: "اضغط عشان تتصفح مقالات في جوجل عن: \"{query}\" مكتوبة للمبتدئين وبسيطة جداً.",
    noteFamilyHeader: "اعمل رسالة لطيفة تبعتها لعيلتك يساعدوك",
    noteFamilyDesc: "لو حابب حد من قرايبك أو حبايبك يساعدك، انسخ الرسالة دي وابعتها له في رسالة على الواتساب أو الإيميل. الرسالة مكتوب فيها بالظبط أنت جربت إيه وفحصت إيه، وده هيوفر عليهم وقت ومجهود كبير وهيفرحهم بيك جداً!",
    whoSendingLabel: "تبعت الرسالة لمين؟",
    whoSendingPlaceholder: "الاسم (مثال: يوسف)",
    updateNameBtn: "تحديث الاسم",
    copiedNoteAlert: "تم نسخ الرسالة بنجاح!",
    copyNoteBtn: "نسخ الرسالة",
    editSymptomsBtn: "تعديل الأعراض والتفاصيل",
    startOverBtn: "ابدأ من الأول جديد",
    footerText: "مصلح التكنولوجيا اللطيف © {year}. مصمم كـ مساحة تمكين وحب للمبتدئين وكبار السن. جميع النصائح مصممة لتكون آمنة تماماً وغير مدمرة للأجهزة.",
    footerLine1: "بدون أي رسوم",
    footerLine2: "لا تحتاج لشهادات تكنولوجية",
    footerLine3: "سهل التعامل جداً!",
    identifyBrandTitle: "دليل توضيحي بسيط: إزاي تعرف ماركة جهازك",
    yesAppleBtn: "أيوا، شايف التفاحة!",
    yesWindowsBtn: "أيوا، ده بتاعي!",
    yesChromeBtn: "أيوا، عندي كروم بوك!",
    itIsAppleBtn: "ده جهاز من أبل",
    itIsAndroidBtn: "أيوا، شغال بأندرويد",
    useInkCartridgeBtn: "بستخدم كارتريج حبر سائل",
    useTonerBtn: "بستخدم حبارة تونر سوداء كبيرة",
    skipGuideBtn: "تخطي الدليل - لسه مش متأكد، يلا نكمل على أي حال!",
    appleMacLabel: "أبل ماك (Mac)",
    appleMacDesc: "بص على ظهر شاشة اللابتوب وهو مقفول، أو في الركن الشمال فوق في الشاشة. هل فيه علامة تفاحة مقضومة 🍎 مميزة؟",
    windowsPcLabel: "ويندوز كمبيوتر (Windows)",
    windowsPcDesc: "هل مكتوب على الكمبيوتر ماركة زي HP أو Dell أو Lenovo أو ASUS أو Acer تحت الشاشة؟ ولما بيفتح بتشوف علامة شباك أزرق 🪟؟",
    chromebookLabel: "كروم بوك (Chromebook)",
    chromebookDesc: "هل على الغطاء فيه دايرة ملونة بألوان جوجل؟ أو لما بتفتحه بتلاقي كلمة Chrome أو Google واضحة على الشاشة؟",
    applePhoneLabel: "أيفون أو آيباد من أبل",
    applePhoneDesc: "اقلب الموبايل أو التابلت على ضهره. لو لقيت لوجو تفاحة مقضومة 🍎 لونها فضي أو رمادي في نص الضهر، يبقى جهازك أبل.",
    androidPhoneLabel: "أندرويد (سامسونج، بيكسل، إلخ)",
    androidPhoneDesc: "هل على ضهر التليفون مكتوب SAMSUNG أو Pixel أو Motorola أو LG؟ ده معناه إنه شغال بنظام أندرويد.",
    inkjetPrinterLabel: "طابعة حبر سائل (كارتريج)",
    inkjetPrinterDesc: "لما بتفتح باب الطابعة بتلاقي علب بلاستيك صغيرة فيها حبر سائل بيرج. من أشهر أنواعها HP ENVY و Canon PIXMA و Epson Expression.",
    laserPrinterLabel: "طابعة ليزر (حبارة سوداء كبيرة)",
    laserPrinterDesc: "لما بتفتحها بتسحب علبة سودة كبيرة اسطوانية تقيلة. ده حبر بودرة جاف (تونر). بتطبع بسرعة رهيبة جداً. من أشهرها HP LaserJet و Brother HL.",
  }
};

// Device dictionary for note translations
export const TRANSLATED_DEVICES: Record<"en" | "ar", Record<DeviceType, string>> = {
  en: {
    laptop_computer: "laptop or computer",
    phone_tablet: "phone or tablet",
    internet_wifi: "Wi-Fi router",
    printer: "printer",
    tv_remote: "TV or remote control",
    facebook: "Facebook",
    other: "device"
  },
  ar: {
    laptop_computer: "اللابتوب / الكمبيوتر",
    phone_tablet: "الموبايل / التابلت",
    internet_wifi: "راوتر الواي فاي والإنترنت",
    printer: "الطابعة",
    tv_remote: "التلفزيون / الريموت",
    facebook: "فيسبوك",
    other: "الجهاز"
  }
};

// Symptom dictionary for note translations
export const TRANSLATED_SYMPTOMS: Record<"en" | "ar", Record<string, string>> = {
  en: {
    frozen: "Everything is frozen / stuck",
    no_sound: "No sound / silent",
    black_screen: "Screen is completely black",
    no_internet: "Cannot connect to Wi-Fi / Internet",
    slow: "Running extremely slowly",
    popups: "Weird warnings or virus alerts",
    no_wifi: "Cannot connect to Wi-Fi",
    fast_drain: "Battery drains too fast",
    storage_full: "Storage Full warning",
    connected_no_internet: "Connected but no internet",
    slow_wifi: "Internet is extremely slow",
    blinking_red: "Red light blinking",
    wont_print: "Printer does absolutely nothing",
    paper_jam: "Paper is jammed inside",
    faded_print: "Pages are printing blank or faded",
    offline: "Computer says printer is Offline",
    remote_dead: "Remote doesn't do anything",
    no_signal: "No Signal or No Input",
    blurry_picture: "Picture is blurry or frozen",
    bluetooth_fail: "Cannot connect to Bluetooth",
    wont_turn_on: "Device won't turn on at all",
    not_working: "Not working properly",
    login_error: "Cannot log in / Forgot password",
    hacked_alert: "Scary 'Account Hacked' or lock message",
    not_loading: "Facebook app/website won't open at all",
    no_posts: "Feed won't update or photos won't load"
  },
  ar: {
    frozen: "الشاشة معلقة ومتجمدة ومش بتتحرك",
    no_sound: "مفيش أي صوت خالص",
    black_screen: "الشاشة سوداء وضلمة تماماً",
    no_internet: "الإنترنت مش راضي يوصل خالص",
    slow: "الجهاز بطيء جداً وبحركة تقيلة",
    popups: "ظهور إعلانات وتحذيرات فيروسات غريبة",
    no_wifi: "مش راضي يلقط واي فاي",
    fast_drain: "البطارية بتخلص بسرعة رهيبة",
    storage_full: "رسالة المساحة ممتلئة بتظهر علطول",
    connected_no_internet: "متصل بالواي فاي بس مفيش نت خالص",
    slow_wifi: "النت بطيء جداً والفيديو بيعلق",
    blinking_red: "فيه لمبة حمراء بتنور وتطفي في علبة النت",
    wont_print: "الطابعة مش بتتحرك ومفيش استجابة",
    paper_jam: "الورق محشور جوة بكرة الطابعة",
    faded_print: "الطباعة بهتانة وخفيفة أوي ومش واضحة",
    offline: "الكمبيوتر كاتب إن الطابعة غير متصلة",
    remote_dead: "الريموت مش شغال ومش بيغير أي حاجة",
    no_signal: "مكتوب لا توجد إشارة على الشاشة",
    blurry_picture: "الصورة مشوشة أو مكسرة لمربعات",
    bluetooth_fail: "مش راضي يوصل بالبلوتوث",
    wont_turn_on: "الجهاز مش راضي ينور أو يفتح خالص",
    not_working: "الجهاز مش شغال بشكل سليم ومظبوط",
    login_error: "مشكلة في تسجيل الدخول أو كلمة المرور",
    hacked_alert: "رسالة تحذير اختراق أو قفل الحساب",
    not_loading: "تطبيق أو موقع الفيس بوك مش بيفتح خالص",
    no_posts: "المنشورات والصور مش بتتحمل جديدة"
  }
};

// Negative symptom dictionary for note translations
export const TRANSLATED_NEGATIVES: Record<"en" | "ar", Record<string, string>> = {
  en: {
    has_power: "It has power / is plugged in",
    wifi_fine: "Home Wi-Fi is working on other devices",
    not_spilled: "Did not spill any liquid on it",
    has_charger: "Charging cable is plugged in tightly",
    no_water: "Device did not get wet",
    not_cracked: "Screen is NOT cracked",
    plugged_in: "Router/Device is plugged in",
    bill_paid: "Internet bill is paid",
    has_paper: "Paper tray has clean paper",
    has_ink: "Ink/Toner replaced recently",
    tv_on: "TV screen has power",
    close_enough: "Standing close to TV",
    know_password: "Writing password carefully",
    internet_fine: "Internet and other apps work fine",
    real_app: "Using official Facebook app"
  },
  ar: {
    has_power: "الكهربا واصلة والجهاز محطوط في الشاحن",
    wifi_fine: "الواي فاي شغال تمام على باقي الأجهزة التانية",
    not_spilled: "متأكد إن مفيش مياه وقعت عليه نهائي",
    has_charger: "سلك الشاحن داخل كويس وراكب للاخر",
    no_water: "الجهاز متعرضش لأي مياه أو رطوبة",
    not_cracked: "شاشة الإزاز سليمة ومفيهاش أي كسر",
    plugged_in: "الفيشة راكبة كويس ومنورة",
    bill_paid: "فاتورة النت مدفوعة تمام ومفيش متأخرات",
    has_paper: "درج الورق مترتب ومليان ورق سليم",
    has_ink: "الحبارة جديدة ومتغيرة قريب",
    tv_on: "الشاشة واصل لها كهربا ومسرية",
    close_enough: "واقف قريب جداً من الشاشة ومفيش عائق",
    know_password: "بكتب كلمة السر بحرص وبدون أخطاء",
    internet_fine: "النت والتطبيقات التانية شغالين تمام",
    real_app: "بستخدم تطبيق الفيس بوك الرسمي"
  }
};

// OS Options Labels & Descriptions translation
export const TRANSLATED_OS_OPTIONS: Record<"en" | "ar", Record<string, { label: string; description: string }>> = {
  en: {
    windows: {
      label: "Windows PC",
      description: "HP, Dell, Lenovo, Samsung, or ASUS computers."
    },
    macos: {
      label: "Apple Mac / macOS",
      description: "Apple computers like iMacs, MacBooks, or Mac Minis."
    },
    chromebook: {
      label: "Google Chromebook",
      description: "A lightweight computer that runs Google Chrome software."
    },
    ios: {
      label: "Apple iPhone / iPad",
      description: "Devices with the silver Apple logo on the back."
    },
    android: {
      label: "Google Android",
      description: "Devices made by Samsung, Google, Motorola, LG, or Xiaomi."
    },
    standard_router: {
      label: "Home Internet Box (Router)",
      description: "The box supplied by your internet provider (Comcast, AT&T, Spectrum, etc.)."
    },
    inkjet: {
      label: "Inkjet Printer (with ink cartridges)",
      description: "Uses wet ink cartridges. Common for home printing and photos."
    },
    laser: {
      label: "Laser Printer (with dry toner)",
      description: "Uses dry powder (toner). Common for black-and-white documents."
    },
    smart_tv: {
      label: "Smart TV",
      description: "TV connected to the internet (Samsung, Sony, Roku, LG, Apple TV, Fire TV)."
    },
    cable_box: {
      label: "Cable / Satellite Box TV",
      description: "TV connected to a Comcast/Xfinity, Spectrum, or DirecTV box."
    },
    unknown: {
      label: "I am not sure / Help me find out!",
      description: "We will show you a simple guide with pictures to help you find out."
    }
  },
  ar: {
    windows: {
      label: "ويندوز (Windows)",
      description: "أجهزة كمبيوتر أو لابتوب HP، Dell، Lenovo، Samsung، أو ASUS."
    },
    macos: {
      label: "أبل ماك / macOS",
      description: "أجهزة كمبيوتر أبل مثل iMac أو MacBook أو Mac Mini."
    },
    chromebook: {
      label: "جوجل كروم بوك",
      description: "كمبيوتر خفيف الوزن يعمل بنظام تشغيل كروم من جوجل."
    },
    ios: {
      label: "أبل أيفون / آيباد",
      description: "الأجهزة التي تحمل لوجو التفاحة الفضي المميز في الخلف."
    },
    android: {
      label: "جوجل أندرويد",
      description: "أجهزة من صنع سامسونج، جوجل بكسل، موتورولا، إلخ."
    },
    standard_router: {
      label: "علبة الإنترنت المنزلي (الراوتر)",
      description: "الجهاز المزود من شركة الإنترنت الخاصة بك (المصرية للاتصالات، إلخ)."
    },
    inkjet: {
      label: "طابعة حبر سائل (Inkjet)",
      description: "تستخدم كارتريج الحبر السائل. شائعة للاستخدام المنزلي وطباعة الصور."
    },
    laser: {
      label: "طابعة ليزر (Laser)",
      description: "تستخدم بودرة جافة (تونر). شائعة للأوراق والمستندات السريعة."
    },
    smart_tv: {
      label: "تلفزيون ذكي (Smart TV)",
      description: "شاشة متصلة بالإنترنت (سامسونج، إل جي، روكو، أبل تي في، فاير تي في)."
    },
    cable_box: {
      label: "رسيفر التلفزيون / الدش",
      description: "شاشة تلفزيون متصلة بجهاز استقبال القنوات الفضائية أو الرسيفر."
    },
    unknown: {
      label: "مش متأكد / ساعدني أعرف!",
      description: "هنعرضلك دليل صور مبسط جداً عشان نساعدك تعرف بكل سهولة."
    }
  }
};

// Device Selection labels translation
export const TRANSLATED_DEVICE_SELECTIONS: Record<"en" | "ar", Record<DeviceType, { label: string; description: string }>> = {
  en: {
    laptop_computer: {
      label: "Laptop or Computer",
      description: "Windows PCs, Apple MacBooks, Chromebooks, or desk computers."
    },
    phone_tablet: {
      label: "Phone or Tablet",
      description: "iPhones, iPads, Android phones, Samsung Galaxies, and tablets."
    },
    internet_wifi: {
      label: "Wi-Fi & Internet Router",
      description: "Your internet connection box, Wi-Fi network, or router."
    },
    printer: {
      label: "Printer",
      description: "For printing documents, photos, scanning, or copying."
    },
    tv_remote: {
      label: "TV or Remote Control",
      description: "Smart TVs, television screens, cable boxes, or remotes."
    },
    facebook: {
      label: "Facebook Help",
      description: "Logins, password recovery, scary locked screen warnings, or issues loading posts."
    },
    other: {
      label: "Something Else",
      description: "Smart speakers, smartwatches, digital cameras, or other devices."
    }
  },
  ar: {
    laptop_computer: {
      label: "لابتوب أو كمبيوتر مكتبي",
      description: "أجهزة ويندوز، أبل ماك بوك، كروم بوك، أو الكمبيوتر المكتبي الكبير الشاشة."
    },
    phone_tablet: {
      label: "موبايل أو تابلت",
      description: "أجهزة الآيفون، الآيباد، تليفونات أندرويد، سامسونج، والتابلت المتنوع."
    },
    internet_wifi: {
      label: "الواي فاي وجهاز الإنترنت",
      description: "علبة الإنترنت الأساسية في البيت، شبكة الواي فاي، أو راوتر الاتصال."
    },
    printer: {
      label: "الطابعة الأوراق",
      description: "لطباعة الأوراق والمستندات، الصور، مسح المستندات ضوئياً، أو تصويرها."
    },
    tv_remote: {
      label: "التلفزيون أو الريموت",
      description: "شاشات التلفزيون الذكية، رسيفر القنوات، أو ريموت التحكم عن بعد."
    },
    facebook: {
      label: "مساعدة فيس بوك",
      description: "مشاكل تسجيل الدخول، استرجاع كلمة السر، رسائل القفل والتحذيرات اللي بتخوف، أو عدم ظهور المنشورات."
    },
    other: {
      label: "حاجة تانية خالص",
      description: "سماعات ذكية، ساعات يد ذكية، كاميرات تصوير، أو أي أجهزة أخرى."
    }
  }
};
