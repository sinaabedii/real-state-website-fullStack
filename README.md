# 🏠 املاک پلاس - پلتفرم مدرن املاک ایران

یک وبسایت کامل و مدرن برای خرید، فروش و اجاره املاک در ایران که با Next.js 14، TypeScript و Tailwind CSS ساخته شده است.

## ✨ ویژگی‌های کلیدی

### 🎨 طراحی و UI/UX
- **دارک مود اجباری** با طراحی مدرن و جذاب
- **کاملاً ریسپانسیو** برای تمام دستگاه‌ها
- **انیمیشن‌های نرم** با Framer Motion
- **سیستم دیزاین یکپارچه** با کامپوننت‌های قابل استفاده مجدد
- **استایل خاص و نوآورانه** الهام گرفته از بهترین سایت‌های دنیا

### 🏘️ قابلیت‌های املاک
- **جستجوی پیشرفته** با فیلترهای متنوع
- **نمایش تصاویر** با گالری تعاملی
- **اطلاعات کامل ملک** شامل متراژ، خواب، سرویس، پارکینگ
- **نقشه تعاملی** برای نمایش موقعیت املاک
- **امتیازدهی و نظرات** کاربران
- **علاقه‌مندی‌ها** و ذخیره املاک

### 👥 مدیریت کاربران
- **سه نقش کاربری**: کاربر عادی، مشاور املاک، مدیر
- **احراز هویت کامل** با OTP
- **داشبورد اختصاصی** برای هر نقش
- **پروفایل کاربری** با تنظیمات

### 🔍 جستجو و فیلترینگ
- **جستجوی هوشمند** بر اساس مکان
- **فیلترهای پیشرفته**: نوع ملک، قیمت، متراژ، امکانات
- **مرتب‌سازی** بر اساس قیمت، تاریخ، متراژ
- **نتایج بلادرنگ** با عملکرد بهینه

### 💬 تعامل و ارتباط
- **چت مستقیم** بین خریدار و فروشنده
- **تماس تلفنی** و پیام‌رسانی
- **درخواست بازدید** آنلاین
- **اشتراک‌گذاری** در شبکه‌های اجتماعی

## 🛠️ فناوری‌های استفاده شده

### Frontend
- **Next.js 14** - React Framework با SSR/SSG
- **TypeScript** - تایپ‌سیفتی و توسعه بهتر
- **Tailwind CSS** - استایلینگ سریع و مدرن
- **Framer Motion** - انیمیشن‌های نرم
- **Lucide React** - آیکون‌های مدرن

### Design System
- **کامپوننت‌های Atomic**: Button, Card, Input, Badge
- **تم یکپارچه** با متغیرهای CSS
- **ریسپانسیو** با Tailwind breakpoints
- **دارک مود** با class-based switching

### Mock Data & State
- **Zustand** - مدیریت state
- **Mock Data** - شبیه‌سازی backend
- **TypeScript Interfaces** - تایپ‌های کامل

## 📁 ساختار پروژه

```
real-estate-website/
├── app/                          # Next.js App Router
│   ├── auth/                     # صفحات احراز هویت
│   │   ├── login/
│   │   └── register/
│   ├── properties/               # صفحات املاک
│   │   ├── [id]/                # جزئیات ملک
│   │   └── page.tsx             # لیست املاک
│   ├── dashboard/               # داشبورد کاربران
│   ├── globals.css              # استایل‌های سراسری
│   ├── layout.tsx               # Layout اصلی
│   └── page.tsx                 # صفحه اصلی
├── components/                   # کامپوننت‌های عمومی
│   ├── layout/                  # Header, Footer
│   ├── PropertyCard.tsx         # کارت ملک
│   └── SearchBar.tsx            # نوار جستجو
├── design-system/               # سیستم دیزاین
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   ├── Badge.tsx
│   └── index.ts
├── lib/                         # ابزارها و داده‌ها
│   ├── utils.ts                 # توابع کمکی
│   └── mock-data.ts             # داده‌های نمونه
├── types/                       # تایپ‌های TypeScript
│   └── index.ts
└── public/                      # فایل‌های استاتیک
```

## 🚀 راه‌اندازی پروژه

### پیش‌نیازها
- Node.js 18+
- npm یا yarn

### نصب و اجرا

```bash
# کلون پروژه
git clone [repository-url]
cd real-estate-website

# نصب وابستگی‌ها
npm install

# اجرای محیط توسعه
npm run dev

# ساخت برای production
npm run build

# اجرای production
npm start
```

پروژه روی `http://localhost:3000` در دسترس خواهد بود.

## 📱 ویژگی‌های ریسپانسیو

- **موبایل**: طراحی Mobile-first
- **تبلت**: بهینه‌سازی برای iPad و تبلت‌ها
- **دسکتاپ**: استفاده کامل از فضای صفحه

## 🎨 سیستم دیزاین

### رنگ‌ها
- **Primary**: آبی (#0ea5e9) - اعتماد و حرفه‌ای بودن
- **Secondary**: خاکستری (#64748b) - متعادل و مدرن
- **Accent**: سبز (#10b981) - موفقیت و رشد
- **Dark**: مشکی/خاکستری تیره - دارک مود

### فونت
- **Vazir** - فونت فارسی مدرن و خوانا

### کامپوننت‌ها
- **Button**: 4 variant، 4 size، حالت loading
- **Card**: Glass effect، Elevated، Bordered
- **Input**: Validation، Icons، Error states
- **Badge**: رنگ‌های متنوع، اندازه‌های مختلف

## 🔧 ویژگی‌های فنی

### Performance
- **Code Splitting** خودکار Next.js
- **Image Optimization** با Next.js Image
- **Lazy Loading** برای تصاویر
- **Bundle Analysis** برای بهینه‌سازی

### SEO
- **Server-Side Rendering** با Next.js
- **Meta Tags** کامل
- **Structured Data** برای موتورهای جستجو
- **Sitemap** خودکار
- **Alt Texts** برای تصاویر

### Accessibility
- **ARIA Labels** کامل
- **Keyboard Navigation** پشتیبانی
- **Screen Reader** سازگار
- **Color Contrast** استاندارد WCAG

## 🛡️ امنیت

### Frontend Security
- **Input Validation** در تمام فرم‌ها
- **XSS Protection** با sanitization
- **CSRF Protection** آماده
- **Secure Headers** در Next.js config

### Data Protection
- **Local Storage** امن برای توکن‌ها
- **Environment Variables** برای کلیدهای API
- **Rate Limiting** آماده برای API calls

## 📊 آمار و تحلیل

### Built-in Analytics
- **Page Views** tracking
- **User Interactions** monitoring
- **Performance Metrics** collection
- **Error Tracking** system

## 🔮 ویژگی‌های آینده

### Phase 2
- [ ] نقشه تعاملی با Leaflet
- [ ] چت بلادرنگ با WebSocket
- [ ] پرداخت آنلاین
- [ ] اپلیکیشن موبایل PWA

### Phase 3
- [ ] هوش مصنوعی برای پیشنهاد املاک
- [ ] تور مجازی 360 درجه
- [ ] تحلیل قیمت بازار
- [ ] API عمومی برای توسعه‌دهندگان

## 🤝 مشارکت

برای مشارکت در پروژه:

1. Fork کنید
2. Branch جدید بسازید (`git checkout -b feature/AmazingFeature`)
3. تغییرات را commit کنید (`git commit -m 'Add some AmazingFeature'`)
4. Push کنید (`git push origin feature/AmazingFeature`)
5. Pull Request ایجاد کنید

## 📄 مجوز

این پروژه تحت مجوز MIT منتشر شده است. فایل [LICENSE](LICENSE) را برای جزئیات بیشتر مطالعه کنید.

## 📞 تماس و پشتیبانی

- **ایمیل**: info@amlakplus.ir
- **تلفن**: 021-1234-5678
- **آدرس**: تهران، خیابان ولیعصر، پلاک 123

---

**املاک پلاس** - آینده املاک ایران 🏠✨
