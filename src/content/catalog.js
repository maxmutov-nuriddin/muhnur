import { WORK_IMAGES } from "./works.generated.js";

// Catalog page numbers (0-based flipbook index) used by nav buttons.
export const PAGE = {
  works: 4,
  get services() {
    return 4 + PROJECTS.length * 2;
  },
  get contact() {
    return 5 + PROJECTS.length * 2;
  },
};

// Rasmlar ISHLAR/ papkasidan `npm run works` orqali tayyorlanadi.
const images = (id) => {
  const list = WORK_IMAGES[id];
  if (!list?.length) throw new Error(`Loyiha rasmlari topilmadi: ${id}. "npm run works" ni ishga tushiring.`);
  return list;
};

// `light` swatches get a hairline border so they stay visible on paper.
// `client` yo'q bo'lsa ish konsept hisoblanadi va brendlar soniga qo'shilmaydi.
export const PROJECTS = [
  {
    id: "muhnur",
    kind: "Brending",
    title: "Muhnur perfume",
    client: "Muhnur, parfyumeriya do‘koni",
    year: "2026",
    task: "Atir do‘koni uchun to‘liq firma uslubi",
    text: "Belgi atir shishasining qopqog‘i va ikki yarim oydan yig‘ilgan «M» harfi. Chang-pushti va binafsha ranglar nafislik kayfiyatini beradi. Brandbook logotipdan tortib vitrina, forma, bilboard va transportgacha hamma narsani qamraydi.",
    deliverables: ["Logotip", "Brandbook, 26 sahifa", "Fasad va viveska", "Paket va sovg‘a qutisi", "Forma va merch", "SMM shablonlari", "Bilboard va transport"],
    palette: [{ hex: "#7B4A86" }, { hex: "#B98FB3" }, { hex: "#F6DDE3", light: true }, { hex: "#FFFFFF", light: true }],
    images: images("muhnur"),
  },
  {
    id: "stayl",
    kind: "Brending",
    title: "Stayl.uz Premium",
    client: "Stayl.uz, onlayn do‘kon",
    year: "2026",
    task: "Premium onlayn platforma uchun brandbook",
    text: "Ikki «S» harfi bir-biriga o‘ralib monogramma hosil qiladi: stil va sifat. To‘q ko‘k va oltin rang hashamat hissini beradi, Cinzel shrifti esa klassik nafislik qo‘shadi.",
    deliverables: ["Logotip va monogramma", "Pattern", "Ranglar va shriftlar", "Paket", "Vizitka", "Instagram profili"],
    palette: [{ hex: "#0F2347" }, { hex: "#C8A96A" }, { hex: "#E9D9A8", light: true }, { hex: "#F5F5F5", light: true }],
    images: images("stayl"),
  },
  {
    id: "georush",
    kind: "Brending",
    title: "GeoRush",
    client: "GeoRush, mobil o‘yin",
    year: "2026",
    task: "GPS o‘yin ilovasi uchun brend identifikatsiyasi",
    text: "GeoRush shahar ko‘chalarini real o‘yin maydoniga aylantiradi. Belgi yo‘nalish, lokatsiya, yo‘l va tezlikni bitta strelkaga jamlaydi. Neon yashil va qora tungi shahar va harakat energiyasini beradi.",
    deliverables: ["Logotip va grid", "Ikonkalar tizimi", "Ilova ikonkasi", "Mobil UI va splash", "SMM", "Merch"],
    palette: [{ hex: "#09FA97" }, { hex: "#000000" }, { hex: "#FFFFFF", light: true }],
    images: images("georush"),
  },
  {
    id: "alloplay",
    kind: "Logotip",
    title: "AlloPlay",
    client: "AlloPlay, onlayn kinoteatr",
    year: "2026",
    task: "Kino va video striming platformasi uchun logotip",
    text: "«AP» harflaridan tuzilgan belgi kino tasmasi va harakatni eslatadi. Qizil gradient kino zali va hayajonni, qora fon premium ko‘rinishni beradi. Logotip telefonda ham, Smart TV va katta ekranda ham aniq o‘qiladi.",
    deliverables: ["Logotip", "Grid va xavfsiz hudud", "Ranglar va shrift", "Ilova ikonkasi", "Mockuplar"],
    palette: [{ hex: "#B81C21" }, { hex: "#540E24" }, { hex: "#000000" }],
    images: images("alloplay"),
  },
  {
    id: "fortisweb",
    kind: "SMM dizayn",
    title: "FortisWeb storislari",
    client: "FortisWeb, IT va dizayn studiyasi",
    year: "2026",
    task: "IT studiya va uning mahsulotlari uchun storislar",
    text: "Studiya va uning mahsulotlari — GeoRush, CoddyCheck, Paramacho, Vela Armon — uchun 17 ta storis. Har bir mahsulot o‘z rangini oladi, lekin qora fon, neon nur va bir xil sarlavha bloki ularni bitta oilaga birlashtiradi.",
    deliverables: ["17 ta storis", "Brand cover", "Mahsulot anonslari", "Vizual kontsepsiya"],
    palette: [{ hex: "#05070C" }, { hex: "#1FE08F" }, { hex: "#2F6BFF" }, { hex: "#7B4DFF" }],
    images: images("fortisweb"),
  },
  {
    id: "markaz",
    kind: "SMM dizayn",
    title: "Aselce Türkçe",
    client: "Aselce Türkçe, turk tili markazi",
    year: "2026",
    task: "Turk tili o‘quv markazi uchun SMM kontent",
    text: "Ustozning shaxsiy brendi va kurslari uchun storis va Reels muqovalari. To‘q ko‘k to‘lqinlar va krem fon tanib olinadigan uslub yaratadi, sarlavhalar telefonda bir qarashda o‘qiladi.",
    deliverables: ["10 ta storis va muqova", "Kurs e’loni", "Reels muqovalari", "Ta’limiy postlar"],
    palette: [{ hex: "#12335F" }, { hex: "#F1E6D8", light: true }, { hex: "#C9A45C" }],
    images: images("markaz"),
  },
  {
    id: "tish",
    kind: "SMM dizayn",
    title: "Islam Dental Clinic",
    client: "Islam Dental Clinic",
    year: "2026",
    task: "Stomatologiya klinikasi uchun Reels muqovalari",
    text: "Shifokorlar ishtirokidagi videolar uchun 11 ta muqova. Yashil rang tozalik va sog‘liqni bildiradi, oq sarlavha bloklari bemor savoliga darhol javob beradi: implant, breket, tish pastasi, homiladorlikda davolash.",
    deliverables: ["11 ta Reels muqovasi", "Sarlavha uslubi", "Foto retush"],
    palette: [{ hex: "#0E5A3E" }, { hex: "#2E8B62" }, { hex: "#DCEFE6", light: true }, { hex: "#FFFFFF", light: true }],
    images: images("tish"),
  },
  {
    id: "krasovka",
    kind: "SMM dizayn",
    title: "Krossovka postlari",
    year: "2026",
    task: "Sport poyabzal do‘koni uchun sotuvchi postlar",
    text: "Katta tipografika, yorqin fon va havoda «suzayotgan» krossovka mahsulotni markazga qo‘yadi. Har post o‘z rangiga ega, chegirma va buyurtma bloki esa doim bir joyda turadi.",
    deliverables: ["4 ta post", "Chegirma bannerlari", "Retush va kompozitsiya"],
    palette: [{ hex: "#D7141A" }, { hex: "#F28C1A" }, { hex: "#1E1C1F" }, { hex: "#F7B9CF", light: true }],
    images: images("krasovka"),
  },
  {
    id: "burger",
    kind: "SMM dizayn",
    title: "Burger postlari",
    year: "2026",
    task: "Fast-food menyusi uchun Instagram postlar",
    text: "Oltita post profilda bitta katta afishaga aylanadi. To‘q sariq va qora fon ishtahani ochadi, qalin sarlavhalar — Juicy, Fresh-hot, Best seller — bir qarashda o‘qiladi.",
    deliverables: ["6 ta post", "SMM post", "Mahsulot retushi"],
    palette: [{ hex: "#F26A1B" }, { hex: "#121212" }, { hex: "#FFC23D" }],
    images: images("burger"),
  },
  {
    id: "napitka",
    kind: "Reklama",
    title: "M24 Megafood",
    client: "M24 Megafood",
    year: "2026",
    task: "Ichimliklar uchun reklama va nakleyka dizayni",
    text: "Mevali sharbatlar uchun reklama vizuali va brendlangan stakan. Shamlar va yog‘och fon iliqlik beradi, muz va ko‘k fon salqinlikni ko‘rsatadi. Stakandagi doira yorliq logotip va kontaktlarni bir joyga jamlaydi.",
    deliverables: ["Reklama posteri", "Nakleyka dizayni", "Mockuplar"],
    palette: [{ hex: "#F2A21A" }, { hex: "#C8202F" }, { hex: "#1D5FA8" }, { hex: "#8DBE2E" }],
    images: images("napitka"),
  },
  {
    id: "baner",
    kind: "Tashqi reklama",
    title: "Bolalar massaji",
    client: "Bolalar massaji xizmati",
    year: "2026",
    task: "Ko‘cha lightboxi uchun reklama",
    text: "Uyga kelib ko‘rsatiladigan bolalar massaji uchun ko‘cha posteri. Yashil va oq ishonch va tozalik beradi. Xizmatlar ikki ustunda, telefonlar pastda: yo‘lovchi uni bir necha soniyada o‘qiydi.",
    deliverables: ["Lightbox poster", "Shahar mokaplari"],
    palette: [{ hex: "#2E9E44" }, { hex: "#1C3B2A" }, { hex: "#FFFFFF", light: true }],
    images: images("baner"),
  },
  {
    id: "beydjik",
    kind: "Poligrafiya",
    title: "Rio Tours beydjigi",
    client: "Rio Tours, turizm agentligi",
    year: "2026",
    task: "Xodimlar uchun ikki tomonlama beydjik",
    text: "Ichki va tashqi turizm agentligi uchun beydjik. Ko‘k-qizil brend ranglari va samolyot yo‘li chizig‘i sayohatni eslatadi, QR-kodlar mijozni to‘g‘ridan to‘g‘ri ijtimoiy tarmoqlarga olib boradi.",
    deliverables: ["Beydjik, 2 tomon", "QR-kod bloki", "Mockup"],
    palette: [{ hex: "#1E4FA3" }, { hex: "#E2312B" }, { hex: "#FFFFFF", light: true }],
    images: images("beydjik"),
  },
  {
    id: "travel",
    kind: "Poligrafiya",
    title: "Mteniks tour flayeri",
    client: "Mteniks tour",
    year: "2026",
    task: "Aksiya uchun flayer",
    text: "«Tur sotib olsangiz 50$ vaucher» aksiyasi uchun flayer. To‘q ko‘k fon va to‘q sariq raqam taklifni birinchi o‘ringa chiqaradi, uchta manzil surati sayohat orzusini uyg‘otadi. Flayer chop etilib tarqatildi.",
    deliverables: ["Flayer", "Bosma uchun maket"],
    palette: [{ hex: "#0F2A4A" }, { hex: "#F57C20" }, { hex: "#FFFFFF", light: true }],
    images: images("travel"),
  },
  {
    id: "vizitka",
    kind: "Poligrafiya",
    title: "MN vizitkasi",
    client: "Nuriddin Maxmutov, frontend dasturchi",
    year: "2026",
    task: "Shaxsiy vizitka",
    text: "Ism bosh harflaridan yig‘ilgan «MN» monogrammasi. Qora fon va oq matn dasturchi uchun sodda va jiddiy ko‘rinish beradi, QR-kod portfolio saytiga olib boradi.",
    deliverables: ["Monogramma", "Vizitka, 2 tomon", "Mockuplar"],
    palette: [{ hex: "#111111" }, { hex: "#5A5A5A" }, { hex: "#FFFFFF", light: true }],
    images: images("vizitka"),
  },
  {
    id: "vizitka2",
    kind: "Poligrafiya",
    title: "FortisWeb vizitkasi",
    client: "FortisWeb, IT va dizayn studiyasi",
    year: "2026",
    task: "Studiya uchun vizitka",
    text: "Qora qog‘oz, kumushrang logotip va matn: texnologik studiya uchun jiddiy, zamonaviy ko‘rinish. Orqa tomonda xizmatlar, kontaktlar va QR-kod joylashgan.",
    deliverables: ["Vizitka, 2 tomon", "Mockuplar"],
    palette: [{ hex: "#0B0F17" }, { hex: "#1E2633" }, { hex: "#C9CED6", light: true }],
    images: images("vizitka2"),
  },
  {
    id: "kitob",
    kind: "Kitob muqovasi",
    title: "«Ko‘rlik» muqovasi",
    year: "2026",
    task: "Jose Saramago romani uchun muqova",
    text: "Qora-oq tasvir, girdob ichidan chiqib kelayotgan ko‘zlari bejo yuz romanning bosh g‘oyasini — ko‘rmaslik va qo‘rquvni — so‘zsiz aytadi. Sarlavha oq, sodda shriftda pastda turadi.",
    deliverables: ["Muqova", "Mockuplar"],
    palette: [{ hex: "#0D0D0D" }, { hex: "#6E6E6E" }, { hex: "#E6E6E6", light: true }],
    images: images("kitob"),
  },
];

// Loyihalardagi unikal mijozlar/brendlar ro'yxati
export const BRANDS = Array.from(
  new Set(PROJECTS.map((p) => p.client).filter(Boolean))
);

/**
 * Loyihalar va brendlar sonini formatlash:
 * 1 dan 5 gacha sonning o'zi ko'rinadi (1, 2, 3, 4, 5).
 * 5 dan oshgach har 5 tadan qadamda '+' bilan (5+, 10+, 15+, ...) ko'rinadi.
 *
 * @param {number} count
 * @returns {string}
 */
export function formatMilestoneCount(count) {
  if (count <= 0) return "0";
  if (count <= 5) return String(count);
  const milestone = Math.floor(count / 5) * 5;
  return `${milestone}+`;
}

/**
 * Tajriba yilini hisoblash:
 * - Joriyda (2026-yilda): 2+
 * - 2027-yil boshida: 3
 * - 2027-yildan o'tganda (o'rtasidan boshlab): 3+
 * - 2028-yilda 4, o'tganda 4+ va hokazo.
 *
 * @param {Date} [date=new Date()]
 * @returns {string}
 */
export function getExperienceValue(date = new Date()) {
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth(); // 0 = yanvar, 5 = iyun, 6 = iyul
  const years = currentYear - 2024;

  if (currentMonth >= 6) {
    return `${years}+`;
  }
  return `${years}`;
}

/**
 * Tajriba yilini so'z shaklida ifodalash (masalan: Ikki, Uch, To‘rt...)
 *
 * @param {Date} [date=new Date()]
 * @returns {string}
 */
export function getExperienceYearsText(date = new Date()) {
  const years = Math.max(1, date.getFullYear() - 2024);
  const words = {
    1: "Bir",
    2: "Ikki",
    3: "Uch",
    4: "To‘rt",
    5: "Besh",
    6: "Olti",
    7: "Yetti",
    8: "Sakkiz",
    9: "To‘qqiz",
    10: "O‘n",
  };
  return words[years] || String(years);
}

export const STATS = [
  {
    get value() {
      return getExperienceValue();
    },
    label: "yil tajriba",
  },
  {
    get value() {
      return formatMilestoneCount(PROJECTS.length);
    },
    label: "loyiha",
  },
  {
    get value() {
      return formatMilestoneCount(BRANDS.length);
    },
    label: "brend",
  },
];

export const TIMELINE = [
  { year: "2021", title: "Mustaqil dizayner", text: "Logotip va ijtimoiy tarmoq dizayni bilan boshladim" },
  { year: "2022", title: "Reklama agentligi", text: "Poligrafiya va tashqi reklama, 60 dan ortiq buyurtma" },
  { year: "2024", title: "Brending studiyasi", text: "To‘liq firma uslubi va qadoqlash loyihalari" },
  { year: "2026", title: "O‘z studiyam", text: "Brendlar bilan to‘g‘ridan to‘g‘ri ishlayman" },
];

export const TOOLS = [
  { name: "Figma", desc: "UI/UX dizayn, SMM maketlari va taqdimotlar" },
  { name: "Photoshop", desc: "Rastr grafika, fotomontaj va vizual effektlar" },
  { name: "Illustrator", desc: "Vektor grafika, logotip va firma uslubi" },
  { name: "Canva", desc: "Tezkor vizual kontent va marketing shablonlari" },
];

/**
 * Loyihalardan avtomatik ravishda Mundarija (TOC) shakllantirish:
 * Har bir loyiha uchun sahifa raqami (5 + i * 2) tartibida avtomatik hisoblanadi.
 * Oxirida esa "Xizmatlar va bog‘lanish" sahifasi avtomatik ulanadi.
 */
export function getToc() {
  const items = PROJECTS.map((project, i) => ({
    title: project.title,
    kind: project.kind || (project.client ? project.client : "Loyiha"),
    page: 5 + i * 2,
  }));

  items.push({
    title: "Xizmatlar va bog‘lanish",
    page: 5 + PROJECTS.length * 2,
    small: true,
  });

  return items;
}

export const TOC = new Proxy([], {
  get(target, prop) {
    const list = getToc();
    if (prop === "length") return list.length;
    if (typeof list[prop] === "function") {
      return list[prop].bind(list);
    }
    if (prop === Symbol.iterator) {
      return list[Symbol.iterator].bind(list);
    }
    return list[prop];
  },
});

export const SERVICES = [
  {
    title: "Grafik dizayn va brending",
    time: "1–3 hafta",
    text: "Logotip, firma uslubi, shriftlar, ranglar va brandbook",
  },
  {
    title: "SMM dizayn",
    time: "2–5 kun",
    text: "Instagram, Telegram postlar, storislar va vizual to‘plam",
  },
  {
    title: "Poligrafiya va print dizayn",
    time: "2–5 kun",
    text: "Flayer, buklet, katalog, vizitka, menyu va bannerlar",
  },
  {
    title: "Reklama va marketing dizayni",
    time: "3–7 kun",
    text: "Tashqi reklama, kreativ posterlar va sotuvchi vizuallar",
  },
  {
    title: "Qadoqlash va qo‘shimcha xizmatlar",
    time: "3–10 kun",
    text: "Yorliqlar, sovg‘a qutilari, vektorlashtirish va taqdimotlar",
  },
];
