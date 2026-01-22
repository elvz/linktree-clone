export type Language = 'uk' | 'en' | 'de';

export const translations = {
  uk: {
    // --- ЗАГАЛЬНЕ ---
    loading: "Завантаження...",
    error: "Помилка",
    
    // --- ПРОФІЛЬ (PUBLIC) ---
    copyLink: "Скопіювати посилання",
    linkCopied: "Посилання скопійовано! ✅",
    footer: "Linktree Clone by Elvz",
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
    heroTitle: "Усе, що ти є. В одному посиланні.",
    heroSubtitle: "Створи красиву сторінку для свого Instagram, TikTok та інших соцмереж. Безкоштовно. Швидко. Українською.",
    heroButtonCreate: "Створити свій Linktree",
    heroButtonDemo: "Подивитись демо",
    footerCopyright: "Linktree Clone. Built with Next.js & Supabase.",

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
    orText: "або поштою",
    
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
  },
  en: {
    loading: "Loading...",
    error: "Error",
    copyLink: "Copy link",
    linkCopied: "Link copied! ✅",
    footer: "Linktree Clone by Elvz",
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
    
    heroTitle: "Everything you are. In one link.",
    heroSubtitle: "Create a beautiful page for your Instagram, TikTok, and other socials. Free. Fast. Simple.",
    heroButtonCreate: "Create your Linktree",
    heroButtonDemo: "View Demo",
    footerCopyright: "Linktree Clone. Built with Next.js & Supabase.",

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
  },
  de: {
    loading: "Laden...",
    error: "Fehler",
    copyLink: "Link kopieren",
    linkCopied: "Link kopiert! ✅",
    footer: "Linktree Clone von Elvz",
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
    
    heroTitle: "Alles, was du bist. In einem Link.",
    heroSubtitle: "Erstelle eine schöne Seite für dein Instagram, TikTok und andere soziale Netzwerke. Kostenlos. Schnell. Einfach.",
    heroButtonCreate: "Erstelle deinen Linktree",
    heroButtonDemo: "Demo ansehen",
    footerCopyright: "Linktree Clone. Erstellt mit Next.js & Supabase.",

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
  },
};