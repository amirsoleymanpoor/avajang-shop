import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma/client";
import { hashPassword } from "../src/lib/password";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./prisma/dev.db",
});
const prisma = new PrismaClient({ adapter });

type Spec = { label: string; value: string };
type SeedProduct = {
  slug: string;
  title: string;
  brand: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  description: string;
  features: Spec[];
  emoji: string;
  gradient: string;
  isFeatured?: boolean;
  category: string;
};

const categories = [
  { slug: "mobile", title: "موبایل", emoji: "📱", color: "from-sky-500 to-blue-700" },
  { slug: "laptop", title: "لپ‌تاپ و تبلت", emoji: "💻", color: "from-emerald-600 to-green-800" },
  { slug: "audio", title: "هدفون و هندزفری", emoji: "🎧", color: "from-rose-500 to-red-700" },
  { slug: "wearable", title: "ساعت و بند هوشمند", emoji: "⌚", color: "from-indigo-500 to-violet-800" },
  { slug: "computer", title: "کامپیوتر و تجهیزات اداری", emoji: "🖥️", color: "from-slate-500 to-slate-800" },
  { slug: "network", title: "شبکه و ارتباطات", emoji: "📡", color: "from-cyan-500 to-blue-700" },
  { slug: "av", title: "صوتی و تصویری", emoji: "📺", color: "from-amber-500 to-orange-700" },
  { slug: "gaming", title: "گیمینگ", emoji: "🎮", color: "from-lime-500 to-green-700" },
];

const products: SeedProduct[] = [
  {
    slug: "gigabyte-b760m-ds3h-ddr4",
    title: "مادربرد گیگابایت B760M DS3H DDR4",
    brand: "گیگابایت",
    price: 9_800_000,
    compareAtPrice: 10_900_000,
    stock: 12,
    description:
      "مادربرد پرفروش گیگابایت برای نسل‌های ۱۲ تا ۱۴ اینتل با پشتیبانی کامل DDR4 و M.2. مناسب برای اسمبل سیستم‌های اقتصادی و گیمینگ.",
    features: [
      { label: "سوکت", value: "Intel LGA1700" },
      { label: "اسلات رم", value: "۴ اسلات DDR4" },
      { label: "حافظه", value: "۲ اسلات M.2 NVMe" },
      { label: "گارانتی", value: "۲۴ ماهه آواژنگ" },
    ],
    emoji: "🧩",
    gradient: "from-sky-500 to-blue-900",
    isFeatured: true,
    category: "computer",
  },
  {
    slug: "gigabyte-z790-eagle-ddr5",
    title: "مادربرد گیگابایت Z790 EAGLE DDR5",
    brand: "گیگابایت",
    price: 24_800_000,
    compareAtPrice: 27_500_000,
    stock: 7,
    description:
      "مادربرد حرفه‌ای گیگابایت با چیپ‌ست Z790 و پشتیبانی از DDR5 تا ۷۶۰۰ مگاهرتز، چهار اسلات PCIe و نورپردازی RGB قابل شخصی‌سازی.",
    features: [
      { label: "چیپ‌ست", value: "Intel Z790" },
      { label: "حافظه", value: "DDR5 تا ۷۶۰۰MHz" },
      { label: "اسلات توسعه", value: "۴ اسلات PCIe" },
      { label: "گارانتی", value: "۲۴ ماهه آواژنگ" },
    ],
    emoji: "🧩",
    gradient: "from-indigo-500 to-slate-900",
    category: "computer",
  },
  {
    slug: "gigabyte-rtx-5070-windforce",
    title: "کارت گرافیک گیگابایت GeForce RTX 5070 WINDFORCE 12G",
    brand: "گیگابایت",
    price: 88_000_000,
    compareAtPrice: 95_000_000,
    stock: 4,
    description:
      "کارت گرافیک قدرتمند گیگابایت با معماری Blackwell انویدیا، ۱۲ گیگابایت حافظه و سیستم خنک‌کننده WINDFORCE. مناسب ۴K گیمینگ و رندر.",
    features: [
      { label: "حافظه", value: "۱۲ گیگابایت GDDR7" },
      { label: "خنک‌کننده", value: "پنل‌های WINDFORCE" },
      { label: "رزولوشن", value: "تا ۸K" },
      { label: "گارانتی", value: "۲۴ ماهه آواژنگ" },
    ],
    emoji: "🖥️",
    gradient: "from-emerald-600 to-neutral-900",
    isFeatured: true,
    category: "computer",
  },
  {
    slug: "gigabyte-rtx-4060-d6",
    title: "کارت گرافیک گیگابایت GeForce RTX 4060 D6 8G",
    brand: "گیگابایت",
    price: 27_500_000,
    compareAtPrice: 30_000_000,
    stock: 9,
    description:
      "کارت گرافیک میان‌رده ایده‌آل برای گیمینگ ۱۰۸۰p و ورود به دنیای DLSS 3 با ۸ گیگابایت حافظه و مصرف پایین.",
    features: [
      { label: "حافظه", value: "۸ گیگابایت GDDR6" },
      { label: "فناوری", value: "DLSS 3" },
      { label: "گارانتی", value: "۲۴ ماهه آواژنگ" },
    ],
    emoji: "🖥️",
    gradient: "from-neutral-500 to-neutral-900",
    category: "computer",
  },
  {
    slug: "crucial-ddr4-16gb-3200",
    title: "رم دسکتاپ کروشیال DDR4 ۱۶ گیگابایت ۳۲۰۰ مگاهرتز",
    brand: "کروشیال",
    price: 3_100_000,
    compareAtPrice: 3_600_000,
    stock: 35,
    description:
      "رم باکیفیت کروشیال برای ارتقای دسکتاپ؛ سازگار با اکثر مادربردهای DDR4 بازار. گارانتی مادام‌العمر آواژنگ.",
    features: [
      { label: "ظرفیت", value: "۱۶ گیگابایت" },
      { label: "نوع", value: "DDR4 3200" },
      { label: "کم‌زمانی", value: "CL22" },
      { label: "گارانتی", value: "مادام‌العمر آواژنگ" },
    ],
    emoji: "🧠",
    gradient: "from-purple-500 to-violet-900",
    category: "computer",
  },
  {
    slug: "samsung-990-pro-1tb",
    title: "اس اس دی اینترنال سامسونگ ۹۹۰ PRO ۱ ترابایت PCIe 4.0",
    brand: "سامسونگ",
    price: 8_400_000,
    compareAtPrice: 9_400_000,
    stock: 20,
    description:
      "پرفروش‌ترین اس اس دی حرفه‌ای سامسونگ با سرعت فوق‌العاده بالا برای گیمینگ و پردازش حرفه‌ای.",
    features: [
      { label: "ظرفیت", value: "۱ ترابایت" },
      { label: "رابط", value: "M.2 NVMe PCIe 4.0" },
      { label: "سرعت خواندن", value: "۷۴۵۰MB/s" },
      { label: "گارانتی", value: "۲۴ ماهه آواژنگ" },
    ],
    emoji: "💾",
    gradient: "from-zinc-500 to-zinc-900",
    isFeatured: true,
    category: "computer",
  },
  {
    slug: "samsung-870-evo-500gb",
    title: "اس اس دی اینترنال سامسونگ ۸۷۰ EVO ۵۰۰ گیگابایت SATA III",
    brand: "سامسونگ",
    price: 2_950_000,
    compareAtPrice: 3_400_000,
    stock: 26,
    description:
      "اس اس دی SATA پرفروش سامسونگ برای ارتقای سرعت کامپیوترهای قدیمی و لپ‌تاپ؛ گزینه اقتصادی و مطمئن.",
    features: [
      { label: "ظرفیت", value: "۵۰۰ گیگابایت" },
      { label: "رابط", value: "SATA III 2.5 اینچ" },
      { label: "گارانتی", value: "۲۴ ماهه آواژنگ" },
    ],
    emoji: "💾",
    gradient: "from-teal-500 to-emerald-900",
    category: "computer",
  },
  {
    slug: "cooler-master-mwe-gold-650",
    title: "منبع تغذیه (پاور) Cooler Master MWE Gold 650 وات",
    brand: "کولر ماستر",
    price: 5_200_000,
    compareAtPrice: 5_900_000,
    stock: 15,
    description:
      "پاور ۶۵۰ وات ماژولار کولر ماستر با گواهینامه ۸۰+ Gold، نویز کم و پایداری عالی برای سیستم‌های گیمینگ.",
    features: [
      { label: "توان", value: "۶۵۰ وات" },
      { label: "گواهینامه", value: "80+ Gold" },
      { label: "کابل", value: "ماژولار" },
    ],
    emoji: "🔌",
    gradient: "from-amber-500 to-orange-800",
    category: "computer",
  },
  {
    slug: "cooler-master-q500l",
    title: "کیس کامپیوتر Cooler Master MasterBox Q500L",
    brand: "کولر ماستر",
    price: 4_400_000,
    compareAtPrice: 5_000_000,
    stock: 11,
    description:
      "کیس با طراحی مینیمال و ای‌تی‌ایکس‌سازگار از کولر ماستر با تهویه عالی و امکان نصب رادیاتور بزرگ.",
    features: [
      { label: "فورم‌فکتور", value: "ATX / Micro-ATX" },
      { label: "شیشه", value: "پرزیلینگ جلو" },
      { label: "گارانتی", value: "۲۴ ماهه آواژنگ" },
    ],
    emoji: "🗄️",
    gradient: "from-zinc-600 to-slate-900",
    category: "computer",
  },
  {
    slug: "logitech-mx-mechanical",
    title: "کیبورد مکانیکی لوگیتک MX Mechanical",
    brand: "لوگیتک",
    price: 5_800_000,
    compareAtPrice: 6_400_000,
    stock: 16,
    description:
      "کیبورد مکانیکی کم‌حجم لوگیتک با کلیدهای ترد و بی‌صدا، اتصال چنددستگاهی و نورپردازی هوشمند.",
    features: [
      { label: "نوع کلید", value: "Mechanical کم‌حجم" },
      { label: "اتصال", value: "بلوتوث + یواس‌بی" },
      { label: "نورپردازی", value: "Smart Backlight" },
    ],
    emoji: "⌨️",
    gradient: "from-neutral-400 to-neutral-800",
    category: "computer",
  },
  {
    slug: "gigabyte-aorus-16x",
    title: "لپ‌تاپ گیمینگ گیگابایت AORUS 16X 9KG-43UKC54SH",
    brand: "گیگابایت",
    price: 125_000_000,
    compareAtPrice: 135_000_000,
    stock: 5,
    description:
      "لپ‌تاپ گیمینگ پرچمدار گیگابایت با نمایشگر ۱۶ اینچی آکلیپس، پردازنده Core i9 و کارت گرافیک RTX سری ۴۰.",
    features: [
      { label: "پردازنده", value: "Intel Core i9" },
      { label: "کارت گرافیک", value: "RTX سری ۴۰" },
      { label: "صفحه‌نمایش", value: "۱۶ اینچ ۲٫۵K" },
      { label: "گارانتی", value: "۲۴ ماهه آواژنگ" },
    ],
    emoji: "💻",
    gradient: "from-slate-700 to-slate-950",
    isFeatured: true,
    category: "laptop",
  },
  {
    slug: "gigabyte-g6-mf",
    title: "لپ‌تاپ گیمینگ گیگابایت G6 MF-H2EE854KD",
    brand: "گیگابایت",
    price: 88_000_000,
    compareAtPrice: 95_000_000,
    stock: 6,
    description:
      "لپ‌تاپ گیمینگ مقرون‌به‌صرفه گیگابایت با خنک‌کننده اختصاصی WINDFORCE و نمایشگر ۱۶:۱۰ نرخ‌نوسازی بالا.",
    features: [
      { label: "پردازنده", value: "Intel Core i7" },
      { label: "کارت گرافیک", value: "RTX سری ۴۰" },
      { label: "صفحه‌نمایش", value: "۱۶ اینچ ۱۶۵Hz" },
    ],
    emoji: "💻",
    gradient: "from-cyan-600 to-blue-950",
    category: "laptop",
  },
  {
    slug: "anker-space-q45",
    title: "هدفون بلوتوثی انکر Soundcore Space Q45",
    brand: "انکر",
    price: 8_900_000,
    compareAtPrice: 10_000_000,
    stock: 18,
    description:
      "هدفون انکر با نویزکنسلینگ تطبیقی قدرتمند، صدای Hi-Res و باتری تا ۶۵ ساعت. گارانتی ۱۸ ماهه آواژنگ.",
    features: [
      { label: "نویزکنسلینگ", value: "تطبیقی ۵۰dB" },
      { label: "عمر باتری", value: "۶۵ ساعت" },
      { label: "صدای", value: "Hi-Res" },
      { label: "گارانتی", value: "۱۸ ماهه آواژنگ" },
    ],
    emoji: "🎧",
    gradient: "from-neutral-600 to-slate-900",
    isFeatured: true,
    category: "audio",
  },
  {
    slug: "anker-liberty-4-nc",
    title: "هندزفری بلوتوثی انکر Soundcore Liberty 4 NC",
    brand: "انکر",
    price: 6_500_000,
    compareAtPrice: 7_400_000,
    stock: 24,
    description:
      "هندزفری انکر با نویزکنسلینگ تطبیقی، صدای فضایی و ۴ میکروفون برای مکالمه شفاف.",
    features: [
      { label: "نویزکنسلینگ", value: "تطبیقی" },
      { label: "اتصال", value: "Bluetooth 5.3" },
      { label: "ضدآب", value: "IPX4" },
    ],
    emoji: "🎧",
    gradient: "from-sky-500 to-indigo-800",
    category: "audio",
  },
  {
    slug: "anker-r50i",
    title: "هندزفری بی‌سیم انکر SoundCore R50i",
    brand: "انکر",
    price: 1_750_000,
    compareAtPrice: 2_050_000,
    stock: 40,
    description:
      "هندزفری اقتصادی پرفروش انکر با صدای غنی و عمر باتری بالا؛ بهترین انتخاب روزمره.",
    features: [
      { label: "عمر باتری", value: "۳۰ ساعت با کیس" },
      { label: "بلوتوث", value: "5.3" },
      { label: "میکروفون", value: "تک‌میکروفون" },
    ],
    emoji: "🎧",
    gradient: "from-rose-400 to-red-800",
    category: "audio",
  },
  {
    slug: "anker-life-p2-mini",
    title: "هندزفری انکر Life P2 Mini",
    brand: "انکر",
    price: 1_950_000,
    compareAtPrice: 2_300_000,
    stock: 32,
    description:
      "هندزفری سبک و راحت انکر با کیس شارژ مقرون‌به‌صرفه و صدای واضح؛ مناسب مکالمه و موسیقی.",
    features: [
      { label: "عمر باتری", value: "۲۷ ساعت با کیس" },
      { label: "بلوتوث", value: "5.3" },
      { label: "مقاومت", value: "IPX5" },
    ],
    emoji: "🎧",
    gradient: "from-fuchsia-500 to-purple-900",
    category: "audio",
  },
  {
    slug: "gigabyte-m27q",
    title: "مانیتور گیمینگ گیگابایت M27Q ۲۷ اینچ QHD KVM",
    brand: "گیگابایت",
    price: 28_700_000,
    compareAtPrice: 31_500_000,
    stock: 8,
    description:
      "مانیتور گیمینگ ۲۷ اینچی گیگابایت با رزولوشن QHD، نرخ‌نوسازی ۱۷۰Hz و تکنولوژی KVM برای کنترل دو سیستم.",
    features: [
      { label: "اندازه", value: "۲۷ اینچ" },
      { label: "رزولوشن", value: "QHD 2K" },
      { label: "نرخ‌نوسازی", value: "170Hz" },
      { label: "گارانتی", value: "۲۴ ماهه آواژنگ" },
    ],
    emoji: "🖥️",
    gradient: "from-emerald-500 to-teal-900",
    isFeatured: true,
    category: "av",
  },
  {
    slug: "gigabyte-g24f-2",
    title: "مانیتور گیمینگ گیگابایت G24F 2 ۲۴ اینچ FHD",
    brand: "گیگابایت",
    price: 13_800_000,
    compareAtPrice: 15_200_000,
    stock: 14,
    description:
      "مانیتور گیمینگ ۲۴ اینچی گیگابایت با پنل ۱۶۵Hz و HDR؛ انتخاب ایده‌آل برای بازی‌های آنلاین.",
    features: [
      { label: "اندازه", value: "۲۴ اینچ IPS" },
      { label: "رزولوشن", value: "Full HD" },
      { label: "نرخ‌نوسازی", value: "165Hz" },
    ],
    emoji: "🖥️",
    gradient: "from-lime-500 to-green-900",
    category: "av",
  },
  {
    slug: "anker-soundcore-go3",
    title: "اسپیکر بلوتوثی انکر Soundcore Go 3",
    brand: "انکر",
    price: 3_300_000,
    compareAtPrice: 3_900_000,
    stock: 20,
    description:
      "اسپیکر فشرده انکر با پوشش ضدآب IPX7 و باتری ۱۲ ساعته؛ همراه عالی برای سفر و دورهمی.",
    features: [
      { label: "مقاومت", value: "IPX7 ضد آب" },
      { label: "باتری", value: "۱۲ ساعت" },
      { label: "صدای", value: "BassUp ۵ وات" },
    ],
    emoji: "🔊",
    gradient: "from-teal-400 to-emerald-800",
    category: "av",
  },
  {
    slug: "anker-soundcore-motion-plus",
    title: "اسپیکر بلوتوثی انکر Soundcore Motion+",
    brand: "انکر",
    price: 6_200_000,
    compareAtPrice: 7_000_000,
    stock: 12,
    description:
      "اسپیکر قدرتمند انکر با درایورهای دوگانه، صدای Hi-Res و ضدآب؛ ایده‌آل برای فضای باز.",
    features: [
      { label: "صدا", value: "Hi-Res ۲۴W" },
      { label: "مقاومت", value: "IPX7" },
      { label: "بلوتوث", value: "5.0" },
    ],
    emoji: "🔊",
    gradient: "from-orange-400 to-red-800",
    category: "av",
  },
  {
    slug: "mi-smart-band-10",
    title: "مچ‌بند هوشمند شیائومی Smart Band 10",
    brand: "شیائومی",
    price: 2_600_000,
    compareAtPrice: 3_000_000,
    stock: 40,
    description:
      "مچ‌بند اقتصادی با نمایشگر AMOLED روشن، پایش ضربان قلب، خواب و ۱۵۰+ حالت ورزشی.",
    features: [
      { label: "صفحه‌نمایش", value: "AMOLED ۱٫۶۲ اینچ" },
      { label: "عمر باتری", value: "۱۶ روز" },
      { label: "ضدآب", value: "ATM5" },
    ],
    emoji: "⌚",
    gradient: "from-emerald-400 to-teal-700",
    category: "wearable",
  },
  {
    slug: "redmi-watch-5",
    title: "ساعت هوشمند شیائومی Redmi Watch 5",
    brand: "شیائومی",
    price: 4_900_000,
    compareAtPrice: 5_600_000,
    stock: 25,
    description:
      "ساعت هوشمند مقرون‌به‌صرفه شیائومی با نمایشگر AMOLED بزرگ، جی‌پی‌اس داخلی و باتری ۱۸ روزه.",
    features: [
      { label: "صفحه‌نمایش", value: "AMOLED ۲ اینچ" },
      { label: "عمر باتری", value: "۱۸ روز" },
      { label: "موقعیت", value: "GPS داخلی" },
    ],
    emoji: "⌚",
    gradient: "from-sky-500 to-blue-700",
    category: "wearable",
  },
  {
    slug: "galaxy-watch-7",
    title: "ساعت هوشمند سامسونگ Galaxy Watch 7 44mm",
    brand: "سامسونگ",
    price: 19_900_000,
    compareAtPrice: 22_000_000,
    stock: 8,
    description:
      "ساعت هوشمند سامسونگ با نمایشگر Super AMOLED، پایش کامل سلامت و خواب و اسپیکر/میکروفون داخلی.",
    features: [
      { label: "صفحه‌نمایش", value: "۴۴ میلی‌متر Super AMOLED" },
      { label: "عمر باتری", value: "تا ۲ روز" },
      { label: "سلامت", value: "پایش قلب، خواب، استرس" },
      { label: "گارانتی", value: "۱۸ ماهه آواژنگ" },
    ],
    emoji: "⌚",
    gradient: "from-indigo-500 to-violet-800",
    category: "wearable",
  },
  {
    slug: "steelseries-siberia-200",
    title: "هدفون گیمینگ استیل سریز Siberia 200",
    brand: "استیل سریز",
    price: 5_400_000,
    compareAtPrice: 6_100_000,
    stock: 14,
    description:
      "هدفون مخصوص بازی با صدای فراگیر سینمایی و میکروفون نویزگیر؛ تجربه‌ای متفاوت در رقابت‌های آنلاین.",
    features: [
      { label: "صدا", value: "فراگیر سینمایی" },
      { label: "میکروفون", value: "نویزگیر" },
      { label: "اتصال", value: "۳٫۵ میلی‌متر" },
    ],
    emoji: "🎧",
    gradient: "from-red-500 to-rose-800",
    category: "gaming",
  },
  {
    slug: "gigabyte-aorus-h1",
    title: "هدست گیمینگ گیگابایت GP-AORUS H1",
    brand: "گیگابایت",
    price: 4_300_000,
    compareAtPrice: 4_900_000,
    stock: 17,
    description:
      "هدست گیمینگ گیگابایت با درایورهای ۵۰ میلی‌متری، میکروفون قابل قطع و سازگاری کامل با کنسول و PC.",
    features: [
      { label: "درایور", value: "۵۰ میلی‌متر" },
      { label: "میکروفون", value: "قابل قطع" },
      { label: "اتصال", value: "3.5mm + USB" },
    ],
    emoji: "🎧",
    gradient: "from-emerald-600 to-green-950",
    category: "gaming",
  },
  {
    slug: "gigabyte-aorus-k9",
    title: "کیبورد گیمینگ گیگابایت AORUS K9 Optical",
    brand: "گیگابایت",
    price: 6_700_000,
    compareAtPrice: 7_500_000,
    stock: 10,
    description:
      "کیبورد گیمینگ با سوئیچ‌های اپتیکال پرسرعت، نورپردازی RGB و کلیدهای ماکرو برای رقابت‌های حرفه‌ای.",
    features: [
      { label: "سوئیچ", value: "اپتیکال" },
      { label: "نورپردازی", value: "RGB بینهایت" },
      { label: "اتصال", value: "USB سیم‌دار" },
    ],
    emoji: "⌨️",
    gradient: "from-fuchsia-500 to-purple-900",
    category: "gaming",
  },
  {
    slug: "tp-link-archer-ax55",
    title: "روتر وای‌فای ۶ تی‌پی-لینک Archer AX55",
    brand: "تی‌پی-لینک",
    price: 5_500_000,
    compareAtPrice: 6_200_000,
    stock: 18,
    description:
      "روتر وای‌فای ۶ دو بانده با سرعت بالا و پوشش قوی؛ مناسب خانه، آپارتمان و کسب‌وکارهای کوچک.",
    features: [
      { label: "استاندارد", value: "Wi-Fi 6 (AX3000)" },
      { label: "باند", value: "دو بانده ۲٫۴ + ۵ گیگاهرتز" },
      { label: "درگاه", value: "گیگابیت ۴ پورت" },
    ],
    emoji: "📡",
    gradient: "from-cyan-500 to-blue-800",
    isFeatured: true,
    category: "network",
  },
  {
    slug: "tp-link-archer-ax23",
    title: "روتر وای‌فای ۶ تی‌پی-لینک Archer AX23",
    brand: "تی‌پی-لینک",
    price: 3_400_000,
    compareAtPrice: 3_900_000,
    stock: 22,
    description:
      "روتر وای‌فای ۶ اقتصادی تی‌پی-لینک با پوشش گسترده و مودم داخلی؛ انتخاب بهصرفه برای منزل.",
    features: [
      { label: "استاندارد", value: "Wi-Fi 6 (AX1800)" },
      { label: "باند", value: "دو بانده" },
      { label: "درگاه", value: "گیگابیت" },
    ],
    emoji: "📡",
    gradient: "from-sky-600 to-indigo-900",
    category: "network",
  },
  {
    slug: "gtelk-usb-lan",
    title: "کارت شبکه USB گیگابیت گیتک مدل OUTER PRO",
    brand: "گیتک",
    price: 1_250_000,
    compareAtPrice: 1_500_000,
    stock: 28,
    description:
      "تبدیل USB به شبکه با سرعت گیگابیت؛ راه‌حل آسان برای لپ‌تاپ‌های بدون پورت اترنت. سازگار با ویندوز، مک و لینوکس.",
    features: [
      { label: "رابط", value: "USB 3.0" },
      { label: "سرعت", value: "۱۰۰۰ Mbps" },
      { label: "سازگاری", value: "ویندوز / مک / لینوکس" },
    ],
    emoji: "📡",
    gradient: "from-sky-700 to-blue-900",
    category: "network",
  },
  {
    slug: "anker-10000-powerbank",
    title: "پاوربانک انکر PowerCore ۱۰۰۰۰ میلی‌آمپر",
    brand: "انکر",
    price: 2_850_000,
    compareAtPrice: 3_200_000,
    stock: 35,
    description:
      "پاوربانک فشرده انکر با شارژ سریع ۲۰ وات USB-C، نمایشگر LED و طراحی باریک مناسب همراه.",
    features: [
      { label: "ظرفیت", value: "۱۰۰۰۰ میلی‌آمپر" },
      { label: "شارژ سریع", value: "۲۰ وات PD" },
      { label: "درگاه", value: "USB-C + USB-A" },
    ],
    emoji: "🔌",
    gradient: "from-emerald-400 to-teal-700",
    category: "mobile",
  },
  {
    slug: "apple-20w-charger",
    title: "شارژر دیواری اپل ۲۰ وات مدل دو شاخه",
    brand: "اپل",
    price: 2_300_000,
    compareAtPrice: 2_700_000,
    stock: 26,
    description:
      "شارژر سریع و اورجینال اپل با خروجی ۲۰ وات؛ مناسب برای آیفون و آیپد. ضمانت اصالت کالا.",
    features: [
      { label: "توان", value: "۲۰ وات PD" },
      { label: "درگاه", value: "USB-C" },
      { label: "گارانتی", value: "۱۸ ماهه آواژنگ" },
    ],
    emoji: "🔌",
    gradient: "from-zinc-400 to-slate-800",
    category: "mobile",
  },
  {
    slug: "anker-323-33w",
    title: "شارژر دیواری انکر ۳۳ وات مدل A2331 Anker 323",
    brand: "انکر",
    price: 1_150_000,
    compareAtPrice: 1_400_000,
    stock: 38,
    description:
      "شارژر فشرده انکر با توان ۳۳ وات، پشتیبانی از فناوری GaNII و شارژ سریع گوشی‌های اندروید و اپل.",
    features: [
      { label: "توان", value: "۳۳ وات GaNII" },
      { label: "درگاه", value: "USB-C" },
      { label: "اندازه", value: "بسیار کوچک" },
    ],
    emoji: "🔌",
    gradient: "from-amber-400 to-yellow-900",
    category: "mobile",
  },
  {
    slug: "anker-737-120w",
    title: "شارژر دیواری انکر ۱۲۰ وات مدل A2148 Anker 737",
    brand: "انکر",
    price: 5_100_000,
    compareAtPrice: 5_800_000,
    stock: 12,
    description:
      "شارژر پرتوان انکر با ۳ پورت (۲ USB-C + 1 USB-A) و توان ۱۲۰ وات برای لپ‌تاپ، تبلت و گوشی.",
    features: [
      { label: "توان", value: "۱۲۰ وات" },
      { label: "درگاه", value: "۲×USB-C + USB-A" },
      { label: "فناوری", value: "GaN" },
    ],
    emoji: "🔌",
    gradient: "from-orange-500 to-red-900",
    category: "mobile",
  },
  {
    slug: "anker-wireless-charger",
    title: "پایه شارژر وایرلس انکر ۱۵ وات",
    brand: "انکر",
    price: 1_900_000,
    compareAtPrice: 2_300_000,
    stock: 26,
    description:
      "پایه آلومینیومی شارژ وایرلس ۱۵ وات مناسب گوشی‌های اپل و اندروید، با قابلیت نمای افقی و عمودی.",
    features: [
      { label: "قدرت", value: "۱۵ وات" },
      { label: "قابلیت", value: "نمای افقی/عمودی" },
      { label: "جنس", value: "آلومینیوم" },
    ],
    emoji: "🔌",
    gradient: "from-emerald-400 to-teal-700",
    category: "mobile",
  },
];

async function main() {
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});

  for (const c of categories) {
    await prisma.category.upsert({
      where: { slug: c.slug },
      update: { title: c.title, emoji: c.emoji, color: c.color },
      create: c,
    });
  }

  const bySlug = new Map(categories.map((c) => [c.slug, c]));
  for (const p of products) {
    if (!bySlug.has(p.category)) continue;
    const { category, ...data } = p;
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: { ...data },
      create: { ...data, category: { connect: { slug: category } } },
    });
  }

  const username = process.env.ADMIN_USERNAME ?? "admin";
  const password = process.env.ADMIN_PASSWORD ?? "admin1234";
  await prisma.adminUser.upsert({
    where: { username },
    update: { passwordHash: hashPassword(password) },
    create: { username, passwordHash: hashPassword(password) },
  });

  console.log(`Seed done. Admin: ${username} / ${password}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());