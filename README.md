# FIORA — فيورا | موقع ديكور المنزل الفاخر

## هيكل المشروع

```
fiora-website/
├── index.html          # الصفحة الرئيسية الكاملة
├── style.css           # كل التنسيقات + Responsive
├── script.js           # كل التفاعلات والانيميشن
├── assets/
│   └── images/         # مجلد الصور المحلية (اختياري)
└── README.md           # هذا الملف
```

## الأقسام

1. **Preloader** — شاشة تحميل بشعار الموقع
2. **Navbar** — شريط تنقل ثابت مع قائمة هامبرغر للموبايل
3. **Hero** — سلايدر بطولي ثلاثي مع إحصائيات
4. **Marquee Banner** — شريط إعلاني متحرك ذهبي
5. **Categories** — ٩ فئات بصور تفاعلية
6. **Feature Banner** — بانر ترويجي بتأثير Parallax
7. **Products** — ١٢ منتج مع فلترة ديناميكية
8. **About** — قصة العلامة مع صور متداخلة
9. **Services** — ٤ مزايا رئيسية
10. **Gallery** — معرض إلهام بتخطيط Masonry
11. **Testimonials** — آراء ٤ عملاء مع سلايدر
12. **Contact** — نموذج اتصال + معلومات التواصل
13. **Footer** — روابط، نشرة بريدية، وسائل دفع
14. **WhatsApp Button** — زر واتساب عائم ونابض
15. **Cart Sidebar** — سلة تسوق جانبية كاملة

## الألوان

| المتغير | القيمة | الاستخدام |
|---------|--------|-----------|
| `--navy` | `#071C2C` | الخلفية الرئيسية |
| `--navy-mid` | `#0D2942` | خلفية الأقسام |
| `--navy-light` | `#122F4B` | الكروت والعناصر |
| `--gold` | `#C8A46A` | النصوص الذهبية |
| `--gold-light` | `#DFC08A` | ذهبي فاتح |
| `--gold-dark` | `#A67C52` | ذهبي غامق |

## الخطوط

- **العناوين الكبيرة:** Amiri (Google Fonts) — خط عربي كلاسيكي
- **النصوص العامة:** Cairo (Google Fonts) — خط عربي حديث

## الريسبونسف

| الشاشة | العرض |
|--------|-------|
| 4K / Large | 1920px+ |
| Desktop | 1200px - 1919px |
| Laptop | 1024px - 1199px |
| Tablet | 768px - 1023px |
| Mobile | 480px - 767px |
| Small Mobile | max 479px |

## المميزات التقنية

- RTL كامل باللغة العربية
- Hero Slider تلقائي + نقاط التنقل
- فلترة المنتجات بدون إعادة تحميل
- سلة تسوق كاملة مع localStorage في الجلسة
- Scroll Reveal Animation بتأثير Stagger
- Active NavLink عند التمرير
- Testimonials Slider تلقائي
- Preloader أنيق
- WhatsApp Button نابض
- Toast notifications
- Parallax Banner (Desktop)
- Marquee Banner متحرك

## للتشغيل

افتح `index.html` مباشرة في المتصفح — لا يحتاج سيرفر.
للتطوير استخدم VS Code + Live Server Extension.

## تخصيص رقم الواتساب

في `index.html` ابحث عن:
```
wa.me/966551234567
```
واستبدل الرقم برقمك الحقيقي.

---
© 2025 FIORA Luxury Decor
