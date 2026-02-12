export type Language = 'uk' | 'en' | 'de';

export const translations = {
  uk: {
    // --- ЗАГАЛЬНЕ ---
    loading: "Завантаження...",
    error: "Помилка",
    
    // --- ПРОФІЛЬ (PUBLIC) ---
    copyLink: "Скопіювати посилання",
    linkCopied: "Посилання скопійовано! ✅",
    footer: "OwnTree by Elvz",
    monoAction: "Розбити",
    monoButton: "Поповнити",
    
    // --- АДМІНКА: ШАПКА ---
    adminTitle: "Адмін-панель",
    myPage: "Моя сторінка",
    logout: "Вийти",
    
    // --- АДМІНКА: СТАТИСТИКА ---
    statsViews: "Перегляди профілю",
    statsClicks: "Всього кліків",
    clicksLabel: "кліків",

    // --- АДМІНКА: PRO БАНЕР ---
    proUnlock: "Розблокуй PRO можливості! 🚀",
    proDesc: "Отримай доступ до віджету Монобанку, BuyMeCoffe, кастомних фонів та аналітики.",
    buyPro: "Купити PRO за 99 грн",
    supportBtn: "Підтримка",
    supportNote: "*Після оплати натисніть кнопку підтримки для активації.",
    proFeature: "PRO Feature",
    proLockDesc: "Доступно після оплати",

    // --- АДМІНКА: ФОРМИ ---
    addLinkTitle: "Додати посилання",
    inputTitlePlaceholder: "Назва (напр. Instagram)",
    inputUrlPlaceholder: "URL (https://...)",
    addBtn: "Додати",

    monoTitle: "Віджет Монобанку",
    monoNameLabel: "Назва збору",
    monoNamePlaceholder: "Напр: На мавік",
    monoUrlLabel: "Посилання на банку",
    monoUrlPlaceholder: "https://send.monobank.ua/jar/...",
    monoAddBtn: "Додати",
    
    priceTitle: "💰 Прайс-лист",
    priceLabelTitle: "Заголовок",
    pricePlaceholderTitle: "Напр: Прайс на фотосесію",
    priceLabelItems: "Послуги та ціни",
    servicePlaceholder: "Послуга (напр. Студія)",
    costPlaceholder: "Ціна (100€)",
    addServiceBtn: "+ Додати ще послугу",
    createPriceBtn: "Створити прайс-лист",
    saving: "Збереження...",

    // --- ІНШЕ ---
    delete: "Видалити",
    emptyLinks: "У вас ще немає посилань. Додайте перше!",
    
    profileSettings: "Налаштування профілю",
    labelName: "Ваше ім'я",
    labelColor: "Колір фону",
    placeholderName: "Напр. Олексій",
    saveBtn: "Зберегти зміни",
    avatarLabel: "Аватар",
    changePhoto: "Змінити фото",
    nickName: "Нікнейм",
    bgColor: "Обрати колір тла",
    
    // --- ГОЛОВНА СТОРІНКА (LANDING) ---
    heroTitle: "Єдине посилання для всього,",
    heroSubtitle: "Створи красиву сторінку для свого Instagram, TikTok та інших соцмереж. Безкоштовно. Швидко. Українською.",
    heroButtonCreate: "Створити свій OwnTree",
    heroButtonDemo: "Подивитись демо",
    footerCopyright: "OwnTree. Built with Next.js & Supabase.",

    // --- АВТОРИЗАЦІЯ (LOGIN / REGISTER) ---
    authLoginTitle: "Вхід в акаунт",
    authRegisterTitle: "Створення акаунту",
    tabLogin: "Увійти",
    tabRegister: "Реєстрація",
    
    emailLabel: "Email",
    passwordLabel: "Пароль",
    emailPlaceholder: "name@example.com",
    passwordPlaceholder: "Мінімум 6 символів",
    
    loginButton: "Увійти",
    registerButton: "Зареєструватися",
    googleButton: "Увійти через Google",
    orText: "або з поштою",
    
    successRegister: "🎉 Акаунт створено! Перевірте вашу пошту, щоб підтвердити email.",
    errorLogin: "Невірний логін або пароль.",
    errorGeneric: "Щось пішло не так. Спробуйте ще раз.",
    loadingLogin: "Обробка...",
    
    haveAccount: "Вже є акаунт?",
    noAccount: "Ще немає акаунту?",
    toLogin: "Увійти",
    toRegister: "Створити",
    
    loginGoogle: "Увійти через Google",

    bmcTitle: "Buy Me a Coffee",
    bmcLabel: "Ваш нікнейм",
    bmcPlaceholder: "https://buymeacoffee.com/username",
    bmcBtn: "Пригостити кавою",
    bmcAction: "Підтримати творчість",
    bmcAdd: "Додати кнопку кави",

    headerTitle: "Створити розділ",
    headerLabel: "Назва розділу",
    headerPlaceholder: "Напр. 🎵 Моя музика",
    headerAddBtn: "Додати заголовок",

    themesTitle: "Тема оформлення",
    themeMinimal: "Мінімалізм",
    themeMidnight: "Ніч",
    themeSunset: "Захід сонця",
    themeOcean: "Океан",

    betaTester: "БЕТА ТЕСТЕР",
    publicBeta: "Публічна Бета",
    betaTitle: "Усі PRO функції доступні",
    betaDesc: "Ми проводимо відкрите бета-тестування. Усі преміум-можливості (аналітика, теми, відсутність реклами) зараз безкоштовні для всіх користувачів.",

    bioTitle: "Біо",
    bioPlaceholder: "Напишіть пару слів про себе...",

    nickTerm: "* Тільки латиниця, цифри та символи - _",

    // ЛЕНДІНГ: ГЕРОЙ
    
    heroTitleSpan: "що ти робиш",
    
    heroBtn: "Створити своє owntree",
    
    // ЛЕНДІНГ: ПЕРЕВАГИ
    feat1Title: "Повна кастомізація",
    feat1Desc: "Змінюй кольори, теми та фон. Ніяких обмежень на дизайн.",
    feat2Title: "Розумні посилання",
    feat2Desc: "Автоматичне розпізнавання YouTube, Instagram, TikTok з красивими іконками.",
    feat3Title: "Аналітика",
    feat3Desc: "Слідкуй за переглядами та кліками безкоштовно.",
    
    // ЛЕНДІНГ: FAQ
    faqTitle: "Часті запитання",
    faq1Q: "Це справді безкоштовно?",
    faq1A: "Так! Проєкт створено як Open Source ініціативу. Всі функції, які інші продають за $10, тут безкоштовні.",
    faq2Q: "Чи можу я змінити нікнейм?",
    faq2A: "Звичайно. Ви можете редагувати свій профіль, нікнейм та URL у будь-який момент в адмін-панелі.",
    faq3Q: "Як додати свій домен?",
    faq3A: "Ця функція в розробці. Поки що ви отримуєте красиве посилання owntree.me/ваше_ім'я.",

    forgotPass: "Забули пароль?",
    backToLogin: "Повернутися до входу",
    resetTitle: "Відновлення паролю",
    sendLink: "Надіслати посилання",

    savePass: "Зберегти пароль",
    newPassPH: "Введіть новий пароль",
  },
  en: {
    loading: "Loading...",
    error: "Error",
    copyLink: "Copy link",
    linkCopied: "Link copied! ✅",
    footer: "OwnTree Clone by Elvz",
    monoAction: "Tap to donate",
    monoButton: "Donate",
    
    adminTitle: "Admin Panel",
    myPage: "My Page",
    logout: "Log out",
    
    statsViews: "Profile Views",
    statsClicks: "Total Clicks",
    clicksLabel: "clicks",

    proUnlock: "Unlock PRO features! 🚀",
    proDesc: "Get access to Monobank widget, BuyMeCoffe, custom backgrounds, and analytics.",
    buyPro: "Buy PRO for 99 UAH",
    supportBtn: "Support",
    supportNote: "*Click support button after payment to activate.",
    proFeature: "PRO Feature",
    proLockDesc: "Available after payment",

    addLinkTitle: "Add New Link",
    inputTitlePlaceholder: "Title (e.g. Instagram)",
    inputUrlPlaceholder: "URL (https://...)",
    addBtn: "Add",

    monoTitle: "Monobank Widget",
    monoNameLabel: "Jar Name",
    monoNamePlaceholder: "E.g. For Mavic",
    monoUrlLabel: "Jar Link",
    monoUrlPlaceholder: "https://send.monobank.ua/jar/...",
    monoAddBtn: "Add",
    
    priceTitle: "💰 Price List",
    priceLabelTitle: "Title",
    pricePlaceholderTitle: "E.g. Photo Session Price",
    priceLabelItems: "Services & Prices",
    servicePlaceholder: "Service (e.g. Studio)",
    costPlaceholder: "Price (100€)",
    addServiceBtn: "+ Add another service",
    createPriceBtn: "Create Price List",
    saving: "Saving...",

    delete: "Delete",
    emptyLinks: "No links yet. Add your first one!",
    
    profileSettings: "Profile Settings",
    labelName: "Display Name",
    labelColor: "Background Color",
    placeholderName: "E.g. Alex",
    saveBtn: "Save Changes",
    avatarLabel: "Avatar",
    changePhoto: "Change photo",
    nickName: "Name",
    bgColor: "Choose background color",
    
    heroTitle: "One link for everything",
    heroSubtitle: "Create a beautiful page for your Instagram, TikTok, and other socials. Free. Fast. Simple.",
    heroButtonCreate: "Create your Owntree",
    heroButtonDemo: "View Demo",
    footerCopyright: "OwnTree. Built with Next.js & Supabase.",

    authLoginTitle: "Welcome back",
    authRegisterTitle: "Create an account",
    tabLogin: "Log in",
    tabRegister: "Sign up",
    
    emailLabel: "Email",
    passwordLabel: "Password",
    emailPlaceholder: "name@example.com",
    passwordPlaceholder: "Min. 6 characters",
    
    loginButton: "Log in",
    registerButton: "Sign up",
    googleButton: "Continue with Google",
    orText: "or with email",
    
    successRegister: "🎉 Account created! Please check your email to confirm.",
    errorLogin: "Invalid login or password.",
    errorGeneric: "Something went wrong. Please try again.",
    loadingLogin: "Processing...",

    haveAccount: "Already have an account?",
    noAccount: "Don't have an account?",
    toLogin: "Log in",
    toRegister: "Sign up",
    
    loginGoogle: "Sign in with Google",

    bmcTitle: "Buy Me a Coffee",
    bmcLabel: "Your nickname",
    bmcPlaceholder: "https://buymeacoffee.com/username",
    bmcBtn: "Buy a Coffee",
    bmcAction: "Support my work",
    bmcAdd: "Add Coffee Button",

    headerTitle: "Create Section",
    headerLabel: "Section Title",
    headerPlaceholder: "E.g. 🎵 My Music",
    headerAddBtn: "Add Header",

    themesTitle: "Appearance Theme",
    themeMinimal: "Minimal",
    themeMidnight: "Midnight",
    themeSunset: "Sunset",
    themeOcean: "Ocean",

    betaTester: "BETA TESTER",
    publicBeta: "Public Beta",
    betaTitle: "All PRO features unlocked",
    betaDesc: "We are running an open beta test. All premium features (analytics, themes, no ads) are currently free for all users.",

    bioTitle: "Bio",
    bioPlaceholder: "Write a few words about yourself...",

    nickTerm: "* Only Latin letters, numbers and symbols - _",

    // LANDING: HERO
    
    heroTitleSpan: "you create",
    
    heroBtn: "Create your owntree",

    // LANDING: FEATURES
    feat1Title: "Fully Customizable",
    feat1Desc: "Change colors, themes, and backgrounds. No design limits.",
    feat2Title: "Smart Links",
    feat2Desc: "Auto-detects YouTube, Instagram, TikTok with beautiful icons.",
    feat3Title: "Analytics",
    feat3Desc: "Track views and clicks for free.",

    // LANDING: FAQ
    faqTitle: "Frequently Asked Questions",
    faq1Q: "Is it really free?",
    faq1A: "Yes! This project is Open Source. Features that others charge $10 for are free here.",
    faq2Q: "Can I change my username?",
    faq2A: "Sure. You can edit your profile, username, and URL anytime in the admin panel.",
    faq3Q: "Can I use my own domain?",
    faq3A: "This feature is in development. For now, you get a beautiful owntree.me/yourname link.",

    forgotPass: "Forgot password?",
    backToLogin: "Back to login",
    resetTitle: "Reset Password",
    sendLink: "Send Link",

    savePass: "Save password",
newPassPH: "Enter new password",
  },
  de: {
    loading: "Laden...",
    error: "Fehler",
    copyLink: "Link kopieren",
    linkCopied: "Link kopiert! ✅",
    footer: "OwnTree von Elvz",
    monoAction: "Tippen zum Spenden",
    monoButton: "Spenden",
    
    adminTitle: "Admin-Panel",
    myPage: "Meine Seite",
    logout: "Ausloggen",
    
    statsViews: "Profilansichten",
    statsClicks: "Gesamtklicks",
    clicksLabel: "Klicks",

    proUnlock: "PRO-Funktionen freischalten! 🚀",
    proDesc: "Zugang zum Monobank-Widget, BuyMeCoffe, benutzerdefinierten Hintergründen und Analysen.",
    buyPro: "PRO kaufen für 99 UAH",
    supportBtn: "Support",
    supportNote: "*Klicken Sie nach der Zahlung auf Support zur Aktivierung.",
    proFeature: "PRO-Funktion",
    proLockDesc: "Verfügbar nach Zahlung",

    addLinkTitle: "Neuen Link hinzufügen",
    inputTitlePlaceholder: "Titel (z.B. Instagram)",
    inputUrlPlaceholder: "URL (https://...)",
    addBtn: "Hinzufügen",

    monoTitle: "Monobank Widget",
    monoNameLabel: "Spendentitel",
    monoNamePlaceholder: "Z.B. Für Mavic",
    monoUrlLabel: "Glas-Link",
    monoUrlPlaceholder: "https://send.monobank.ua/jar/...",
    monoAddBtn: "Hinzufügen",
    
    priceTitle: "💰 Preisliste",
    priceLabelTitle: "Titel",
    pricePlaceholderTitle: "Z.B. Fotoshooting Preise",
    priceLabelItems: "Dienstleistungen & Preise",
    servicePlaceholder: "Dienstleistung (z.B. Studio)",
    costPlaceholder: "Preis (100€)",
    addServiceBtn: "+ Weitere Dienstleistung",
    createPriceBtn: "Preisliste erstellen",
    saving: "Speichern...",

    delete: "Löschen",
    emptyLinks: "Noch keine Links. Fügen Sie den ersten hinzu!",
    
    profileSettings: "Profileinstellungen",
    labelName: "Anzeigename",
    labelColor: "Hintergrundfarbe",
    placeholderName: "z.B. Alex",
    saveBtn: "Änderungen speichern",
    avatarLabel: "Avatar",
    changePhoto: "Foto ändern",
    nickName: "Name",
    bgColor: "Hintergrundfarbe auswählen",
    
    heroTitle: "Ein Link für alles,",
    heroSubtitle: "Erstelle eine schöne Seite für dein Instagram, TikTok und andere soziale Netzwerke. Kostenlos. Schnell. Einfach.",
    heroButtonCreate: "Erstelle deinen OwnTree",
    heroButtonDemo: "Demo ansehen",
    footerCopyright: "OwnTree. Erstellt mit Next.js & Supabase.",

    authLoginTitle: "Willkommen zurück",
    authRegisterTitle: "Konto erstellen",
    tabLogin: "Anmelden",
    tabRegister: "Registrieren",
    
    emailLabel: "E-Mail",
    passwordLabel: "Passwort",
    emailPlaceholder: "name@beispiel.com",
    passwordPlaceholder: "Mind. 6 Zeichen",
    
    loginButton: "Anmelden",
    registerButton: "Registrieren",
    googleButton: "Weiter mit Google",
    orText: "oder per E-Mail",
    
    successRegister: "🎉 Konto erstellt! Bitte überprüfe deine E-Mail zur Bestätigung.",
    errorLogin: "Ungültiger Login oder Passwort.",
    errorGeneric: "Etwas ist schiefgelaufen. Bitte versuche es erneut.",
    loadingLogin: "Verarbeitung...",

    haveAccount: "Hast du schon ein Konto?",
    noAccount: "Noch kein Konto?",
    toLogin: "Anmelden",
    toRegister: "Erstellen",
    
    loginGoogle: "Mit Google anmelden",
    
    bmcTitle: "Buy Me a Coffee",
    bmcLabel: "Dein Spitzname",
    bmcPlaceholder: "https://buymeacoffee.com/username",
    bmcBtn: "Kaffee spendieren",
    bmcAction: "Unterstütze meine Arbeit",
    bmcAdd: "Kaffee-Button hinzufügen",

    headerTitle: "Abschnitt erstellen",
    headerLabel: "Abschnittstitel",
    headerPlaceholder: "z.B. 🎵 Meine Musik",
    headerAddBtn: "Überschrift hinzufügen",

    themesTitle: "Erscheinungsbild",
    themeMinimal: "Minimalismus",
    themeMidnight: "Mitternacht",
    themeSunset: "Sonnenuntergang",
    themeOcean: "Ozean",

    // ... інші переклади
    betaTester: "BETA TESTER",
    publicBeta: "Öffentliche Beta",
    betaTitle: "Alle PRO-Funktionen freigeschaltet",
    betaDesc: "Wir führen einen offenen Beta-Test durch. Alle Premium-Funktionen (Analytics, Themes, keine Werbung) sind derzeit für alle Benutzer kostenlos.",

    bioTitle: "Bio",
    bioPlaceholder: "Schreiben Sie ein paar Worte über sich selbst...",

    nickTerm: "* Nur lateinische Buchstaben, Zahlen und Symbole - _",

    
    heroTitleSpan: "was du machst",
    heroBtn: "Erstelle dein Owntree",

    feat1Title: "Volle Anpassung",
    feat1Desc: "Ändere Farben, Themen und Hintergründe. Keine Design-Limits.",
    feat2Title: "Smarte Links",
    feat2Desc: "Automatische Erkennung von YouTube, Instagram, TikTok mit passenden Icons.",
    feat3Title: "Analytik",
    feat3Desc: "Verfolge Aufrufe und Klicks kostenlos.",

    faqTitle: "Häufig gestellte Fragen",
    faq1Q: "Ist es wirklich kostenlos?",
    faq1A: "Ja! Das Projekt ist Open Source. Funktionen, die andere für 10$ verkaufen, sind hier gratis.",
    faq2Q: "Kann ich meinen Benutzernamen ändern?",
    faq2A: "Natürlich. Du kannst dein Profil, Benutzernamen und URL jederzeit im Admin-Bereich ändern.",
    faq3Q: "Kann ich meine eigene Domain nutzen?",
    faq3A: "Diese Funktion ist in Entwicklung. Vorerst bekommst du einen schönen owntree.me/deinname Link.",
  
    forgotPass: "Passwort vergessen?",
    backToLogin: "Zurück zum Login",
    resetTitle: "Passwort zurücksetzen",
    sendLink: "Link senden",

    savePass: "Passwort speichern",
newPassPH: "Neues Passwort eingeben",
  },
};