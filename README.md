# Muhsina Boymatova — Portfolio Loyihasi

Grafik dizayner Muhsina Boymatovaning interaktiv 3D kitob (flipbook) portfoliossi.

---

## Yangi loyiha yoki brend qo‘shish bo‘yicha qo‘llanma

Barcha loyihalar va brendlar **bitta joyda** — [`src/content/catalog.js`](file:///Users/nuriddin/Desktop/muhnur/src/content/catalog.js) faylidagi `PROJECTS` massivida saqlanadi.

Siz yangi loyiha qo‘shganingizda quyidagilar **avtomatik** ravishda yangilanadi:
1. **Mundarija ("Ichida" sahifasi)** — yangi loyiha nomi va uning to‘g‘ri sahifa raqami avtomatik paydo bo‘ladi.
2. **Sahifa raqamlari (folio)** — barcha sahifalar o‘z-o‘zidan raqamlanadi.
3. **Bosh sahifa statistikasi** — loyihalar va brendlar soni avtomatik oshadi (5 gacha aniq son, 5 dan oshganda 5+, 10+, 15+...).
4. **Xizmatlar va Bog‘lanish sahifalari** — avtomatik tarzda kitobning eng oxiriga suriladi.

---

### Tayyor shablon (nusxa olib qo‘yish uchun)

[`src/content/catalog.js`](file:///Users/nuriddin/Desktop/muhnur/src/content/catalog.js) ichidagi `PROJECTS = [` ro‘yxatiga quyidagi blokni qo‘shing:

```javascript
  {
    id: "yangi-brend",                           // 1. Unikal identifikator (kichik lotin harflarda)
    kind: "Brending",                            // 2. Yo‘nalish turi (masalan: "Brending", "SMM dizayn", "Poligrafiya", "Qadoqlash", "Poster")
    title: "Brend yoki loyiha nomi",             // 3. Loyiha nomi (Mundarijada va sahifada chiqadi)
    client: "Mijoz yoki kompaniya nomi",         // 4. Mijoz (Statistikadagi brendlar sonini oshiradi)
    year: "2026",                                // 5. Bajarilgan yil
    task: "Loyiha oldiga qo‘yilgan asosiy vazifa",// 6. Vazifa qisqacha
    text: "Loyiha haqida batafsil ma’lumot, dizayn qarorlari va kontseptsiya tavsifi.", // 7. Tavsif
    deliverables: [                              // 8. Bajarilgan ishlar ro‘yxati
      "Logotip",
      "Brendbuk",
      "Vizitka",
      "Ijtimoiy tarmoq to‘plami",
    ],
    palette: [                                   // 9. Loyihada ishlatilgan asosiy ranglar
      { hex: "#121019" },                        // Asosiy fon rangi
      { hex: "#6A3CF0" },                        // Asosiy urg‘u rangi
      { hex: "#F3EFE9", light: true },           // Ochiq rang (ochiq bo‘lsa light: true yoziladi)
      { hex: "#9A98A3" },                        // Matn/qo‘shimcha rang
    ],
    // image: "/rasmlar/loyiha.webp",            // 10. (Ixtiyoriy) Agar tayyor rasm bo‘lsa yo‘li
  },
```

---

### Maydonlar bo‘yicha tushuntirish:

| Maydon | Majburiymi? | Tavsif |
| :--- | :---: | :--- |
| `id` | Ha | Loyihaning unikal kodi (masalan, `"sukunat"`, `"nur-cafe"`, `"brend-uz"`). |
| `kind` | Ha | Yo‘nalish turi: `"Brending"`, `"SMM dizayn"`, `"Poligrafiya"`, `"Print dizayn"`, `"Qadoqlash"`, `"Poster"`. |
| `title` | Ha | Loyihaning to‘liq nomi. Kitob mundarijasida va sahifa sarlavhasida chiqadi. |
| `client` | Ha | Mijoz yoki brend nomi. Bosh sahifadagi brendlar hisoblagichiga avtomatik qo‘shiladi. |
| `year` | Ha | Ish bajarilgan yil (masalan `"2025"`, `"2026"`). |
| `task` | Ha | Dizayner oldiga qo‘yilgan vazifa (masalan: *"Yangi restoran uchun to‘liq brending"*). |
| `text` | Ha | Loyihaning qisqacha mohiyati va g‘oyasi haqida 2-3 jumlalik matn. |
| `deliverables` | Ha | Mijozga topshirilgan natijalar ro‘yxati (array). |
| `palette` | Ha | Loyihaning ranglar kodi. Chap sahifadagi san’at asari va o‘ng sahifadagi rang doiralari shu ranglar asosida bo‘yaladi. |
| `image` | Yo‘q | Agar loyihaga mos tayyor rasm qo‘ymoqchi bo‘lsangiz, rasmni `public/` jildiga tashlab, yo‘lini yozasiz (masalan: `"/rasm.jpg"`). Agar rasm berilmasa, tizim avtomatik ravishda chiroyli professional vektor poster yaratadi. |

---

### Tezkor buyruqlar:

- **Saytni ishga tushirish (dev server)**:
  ```bash
  npm run dev
  ```
- **Testlarni tekshirish**:
  ```bash
  npm test
  ```
- **Saytni yig‘ish (production build)**:
  ```bash
  npm run build
  ```

