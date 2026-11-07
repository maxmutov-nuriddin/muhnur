// Static SEO landing pages, one per service / search intent.
// Rendered to public/xizmatlar/<slug>/index.html by scripts/build-seo-pages.mjs.

const TERMS_FAQ = {
  q: "Buyurtma qanday beriladi?",
  a: "Saytdagi forma yoki Telegram orqali yozasiz. Vazifani muhokama qilamiz, muddat va narxni kelishamiz, so‘ng ishni bosqichma-bosqich ko‘rsatib boraman.",
};

const REMOTE_FAQ = {
  q: "Toshkentdan tashqarida ishlaysizmi?",
  a: "Ha. Butun O‘zbekiston va boshqa davlatlardagi mijozlar bilan onlayn ishlayman. Fayllar chop etish va internet uchun tayyor holda topshiriladi.",
};

export const SEO_PAGES = [
  {
    slug: "grafik-dizayner",
    title: "Grafik dizayner Toshkent — dizayn buyurtma qilish | Muhnur",
    description:
      "Muhnur — grafik dizayner Muhsina Boymatova. Logotip, brending, SMM, poligrafiya, qadoq va reklama dizaynini buyurtma qiling. Toshkent va onlayn.",
    h1: "Grafik dizayner: dizayn buyurtma qilish",
    intro: [
      "Muhnur — grafik dizayner Muhsina Boymatovaning studiyasi. Kichik biznes, do‘kon, o‘quv markazi, klinika va IT kompaniyalar uchun dizayn zakaz qilish mumkin bo‘lgan joy.",
      "Logotipdan to‘liq firma uslubigacha, Instagram postlardan bilboardgacha: brendingiz bir xil uslubda, tanib olinadigan va sotuvchi bo‘ladi.",
    ],
    includes: [
      "Logotip va firma uslubi, brandbook",
      "SMM dizayn: postlar, storislar, Reels muqovalari",
      "Poligrafiya: vizitka, flayer, buklet, menyu, katalog",
      "Qadoq, yorliq va nakleyka dizayni",
      "Tashqi reklama: banner, bilboard, lightbox",
    ],
    projectIds: ["muhnur", "stayl", "georush", "fortisweb", "napitka", "beydjik"],
    faq: [
      TERMS_FAQ,
      REMOTE_FAQ,
      {
        q: "Dizayn qancha vaqtda tayyor bo‘ladi?",
        a: "SMM va poligrafiya 2–5 kun, reklama 3–7 kun, logotip va brending 1–3 hafta. Aniq muddat vazifa hajmiga bog‘liq.",
      },
    ],
    ru: "Muhnur — графический дизайнер в Ташкенте. Заказать дизайн логотипа, фирменного стиля, брендбука, SMM-постов, полиграфии, упаковки и наружной рекламы.",
  },
  {
    slug: "logotip-dizayni",
    title: "Logotip dizayni buyurtma qilish, Toshkent | Muhnur",
    description:
      "Logotip zakaz qilish: noyob belgi, grid, ranglar va shrift. Muhnur — Muhsina Boymatova logotipni brend mohiyatidan yaratadi. Toshkent va onlayn.",
    h1: "Logotip dizayni buyurtma qilish",
    intro: [
      "Yaxshi logotip — brendning yuzi. U kichik ikonkada ham, katta bilboardda ham aniq o‘qilishi, raqobatchilardan ajralib turishi va biznes g‘oyasini bir qarashda aytishi kerak.",
      "Har bir logotipni brif, raqobatchilar tahlili va bir nechta kontsepsiyadan boshlayman. Tanlangan variant grid, xavfsiz hudud, ranglar va shrift bilan birga topshiriladi.",
    ],
    includes: [
      "Brif va raqobatchilar tahlili",
      "2–3 ta logotip kontsepsiyasi",
      "Grid, xavfsiz hudud va minimal o‘lcham",
      "Rang palitrasi va shriftlar",
      "Ilova ikonkasi va mockuplar",
      "AI, SVG, PDF, PNG fayllar",
    ],
    projectIds: ["alloplay", "muhnur", "stayl", "georush", "vizitka"],
    faq: [
      {
        q: "Logotip qancha vaqtda tayyor bo‘ladi?",
        a: "Odatda 1–2 hafta. Kontsepsiyalar, tuzatishlar va yakuniy fayllar shu muddatga kiradi.",
      },
      {
        q: "Qanday fayllarni olaman?",
        a: "Vektor (AI, SVG, PDF) va rastr (PNG, shaffof fon) fayllar, rangli, oq va qora variantlarda.",
      },
      TERMS_FAQ,
    ],
    ru: "Заказать логотип в Ташкенте: разработка уникального логотипа с сеткой, цветами и шрифтами. Файлы для печати и веба.",
  },
  {
    slug: "brending",
    title: "Brending va brandbook dizayni, firma uslubi | Muhnur",
    description:
      "Firma uslubi va brandbook buyurtma qilish: logotip, ranglar, shriftlar, paket, forma, SMM va reklama. Muhnur — brending bo‘yicha grafik dizayner.",
    h1: "Brending va brandbook dizayni",
    intro: [
      "Brending — logotipdan kattaroq narsa. Bu ranglar, shriftlar, naqshlar va qoidalar tizimi bo‘lib, brendingiz vitrinada, paketda, Instagramda va transportda bir xil ko‘rinadi.",
      "Brandbookda har bir element qanday ishlatilishi yozib qo‘yiladi, shunda keyingi dizaynerlar va bosmaxona ham uslubni buzmaydi.",
    ],
    includes: [
      "Logotip va uning variantlari",
      "Ranglar, shriftlar va naqsh (pattern)",
      "Vizitka, blank, paket va sovg‘a qutisi",
      "Forma va merch",
      "Fasad, viveska, bilboard va transport",
      "Brandbook (PDF)",
    ],
    projectIds: ["muhnur", "stayl", "georush"],
    faq: [
      {
        q: "Brandbook nima uchun kerak?",
        a: "U brendni boshqarish qo‘llanmasi: logotip, ranglar va shriftlar qayerda va qanday ishlatilishini belgilaydi. Shu sabab reklama va SMM har doim bir xil uslubda chiqadi.",
      },
      {
        q: "Brending qancha vaqt oladi?",
        a: "Hajmga qarab 1–3 hafta. To‘liq firma uslubi va 20+ sahifali brandbook uzoqroq vaqt oladi.",
      },
      TERMS_FAQ,
    ],
    ru: "Разработка фирменного стиля и брендбука в Ташкенте: логотип, цвета, шрифты, упаковка, униформа, вывески и наружная реклама.",
  },
  {
    slug: "smm-dizayn",
    title: "SMM dizayn: Instagram post va storis dizayni | Muhnur",
    description:
      "Instagram va Telegram uchun post, storis va Reels muqovalari dizayni. Muhnur — sotuvchi va bir xil uslubdagi SMM dizayn. Buyurtma bering.",
    h1: "SMM dizayn: post va storislar",
    intro: [
      "Instagram profil — ko‘pchilik mijoz brendingizni birinchi ko‘radigan joy. Bir xil uslubdagi postlar va storislar profilingizni professional qiladi va obunachini mijozga aylantiradi.",
      "Har bir loyiha uchun vizual kontsepsiya va shablonlar tizimi tuzaman: sarlavha bloki, ranglar va kompozitsiya. Shu sabab kontent tez chiqadi va tanib olinadi.",
    ],
    includes: [
      "Instagram postlar va karusellar",
      "Storislar va highlights muqovalari",
      "Reels muqovalari",
      "Aksiya va chegirma bannerlari",
      "Telegram kanal uchun postlar",
      "Tahrirlanadigan shablonlar",
    ],
    projectIds: ["fortisweb", "markaz", "tish", "krasovka", "burger"],
    faq: [
      {
        q: "Bir oylik kontent uchun dizayn qilasizmi?",
        a: "Ha. Oylik reja asosida postlar va storislar to‘plamini tayyorlash mumkin.",
      },
      {
        q: "SMM dizayn qancha vaqtda tayyor bo‘ladi?",
        a: "Odatda 2–5 kun, postlar soniga bog‘liq.",
      },
      TERMS_FAQ,
    ],
    ru: "SMM-дизайн в Ташкенте: оформление Instagram, посты, сторис, обложки Reels и шаблоны для Telegram-каналов.",
  },
  {
    slug: "poligrafiya",
    title: "Vizitka, flayer va poligrafiya dizayni | Muhnur",
    description:
      "Vizitka, flayer, buklet, menyu, katalog, beydjik va kitob muqovasi dizayni. Bosmaxonaga tayyor maket. Muhnur — poligrafiya dizayni, Toshkent.",
    h1: "Poligrafiya va print dizayn",
    intro: [
      "Bosma mahsulot qo‘lda qoladi va brendingizni eslatib turadi. Shuning uchun vizitka, flayer yoki menyu chiroyli bo‘lishi bilan birga to‘g‘ri tayyorlangan bo‘lishi kerak.",
      "Maketlarni bosmaxona talablari bilan tayyorlayman: CMYK, chekka (bleed), xavfsiz hudud va to‘g‘ri o‘lchamlar. Fayl to‘g‘ridan to‘g‘ri chop etishga beriladi.",
    ],
    includes: [
      "Vizitka (2 tomonlama)",
      "Flayer, listovka va buklet",
      "Menyu va katalog",
      "Beydjik va QR-kod bloki",
      "Kitob va jurnal muqovasi",
      "Bosmaxona uchun maket (PDF, CMYK)",
    ],
    projectIds: ["vizitka", "vizitka2", "travel", "beydjik", "kitob"],
    faq: [
      {
        q: "Chop etishni ham qilasizmi?",
        a: "Men dizayn va bosmaxonaga tayyor maketni topshiraman. Kerak bo‘lsa, ishonchli bosmaxonani tavsiya qilaman.",
      },
      {
        q: "Vizitka dizayni qancha vaqt oladi?",
        a: "Odatda 2–3 kun, katta poligrafiya (katalog, buklet) 5 kungacha.",
      },
      TERMS_FAQ,
    ],
    ru: "Дизайн полиграфии в Ташкенте: визитки, флаеры, буклеты, меню, каталоги, бейджи и обложки книг. Макеты готовы к печати.",
  },
  {
    slug: "qadoqlash-dizayni",
    title: "Qadoq, yorliq va nakleyka dizayni | Muhnur",
    description:
      "Qadoq (upakovka), yorliq, nakleyka va sovg‘a qutisi dizayni. Mahsulotingiz javonda ajralib tursin. Muhnur — qadoqlash dizayni, Toshkent.",
    h1: "Qadoq, yorliq va nakleyka dizayni",
    intro: [
      "Javonda xaridor mahsulotni bir necha soniyada tanlaydi. Qadoq brendni tanitishi, mahsulot haqida aytishi va qo‘lga olgisi keladigan bo‘lishi kerak.",
      "Stakan va idishlar uchun nakleykalar, sovg‘a qutilari, paketlar va yorliqlarni brendingiz uslubida, ishlab chiqarish texnologiyasiga mos qilib tayyorlayman.",
    ],
    includes: [
      "Qadoq va quti dizayni",
      "Yorliq (etiketka) va nakleyka",
      "Stakan va idish uchun dizayn",
      "Sovg‘a qutisi va paket",
      "3D mockuplar",
      "Ishlab chiqarish uchun maket",
    ],
    projectIds: ["napitka", "muhnur", "stayl"],
    faq: [
      {
        q: "Qadoq dizayni qancha vaqt oladi?",
        a: "Odatda 3–10 kun, mahsulotlar soni va qadoq turiga bog‘liq.",
      },
      TERMS_FAQ,
      REMOTE_FAQ,
    ],
    ru: "Дизайн упаковки, этикеток и наклеек в Ташкенте: коробки, пакеты, наклейки на стаканы и подарочная упаковка.",
  },
  {
    slug: "reklama-dizayni",
    title: "Reklama dizayni: banner, bilboard, poster | Muhnur",
    description:
      "Banner, bilboard, lightbox, poster va reklama vizuallari dizayni. Yo‘lovchi bir necha soniyada o‘qiydigan reklama. Muhnur, Toshkent.",
    h1: "Reklama va marketing dizayni",
    intro: [
      "Tashqi reklamani odamlar yurib yoki mashinada ketayotib ko‘radi. Shuning uchun asosiy taklif, kontakt va brend bir necha soniyada o‘qilishi kerak.",
      "Banner, bilboard, lightbox va posterlarni joylashuv va masofaga qarab, katta tipografika va aniq ierarxiya bilan tayyorlayman.",
    ],
    includes: [
      "Bilboard va banner",
      "Lightbox va ko‘cha posterlari",
      "Reklama posterlari va afishalar",
      "Aksiya vizuallari",
      "Shahar mockuplari",
      "Chop etish uchun katta formatli maket",
    ],
    projectIds: ["baner", "napitka", "krasovka", "travel"],
    faq: [
      {
        q: "Reklama dizayni qancha vaqt oladi?",
        a: "Odatda 3–7 kun, formatlar soniga bog‘liq.",
      },
      TERMS_FAQ,
      REMOTE_FAQ,
    ],
    ru: "Дизайн наружной рекламы в Ташкенте: билборды, баннеры, лайтбоксы, постеры и рекламные визуалы.",
  },
];
