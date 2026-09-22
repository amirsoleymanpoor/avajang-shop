import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { IconBadge, IconPhone, IconRefresh, IconShield, IconTruck } from "@/components/icons";

const TRUST = [
  { icon: IconShield, title: "ضمانت اصالت", desc: "تضمین اورجینال بودن کالا" },
  { icon: IconTruck, title: "ارسال سریع", desc: "به سراسر کشور" },
  { icon: IconRefresh, title: "۷ روز بازگشت", desc: "بدون قید و شرط" },
  { icon: IconBadge, title: "پرداخت امن", desc: "درگاه معتبر بانکی" },
];

export default function Footer() {
  return (
    <footer className="mt-14 border-t border-zinc-200 bg-white">
<div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-2 gap-3 rounded-3xl bg-gradient-to-l from-brand-900 via-brand-700 to-brand-600 p-5 sm:grid-cols-4 sm:gap-4 sm:p-6">
          {TRUST.map((t) => (
            <div key={t.title} className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-white ring-1 ring-white/20 backdrop-blur">
                <t.icon className="h-5 w-5" />
              </span>
              <span className="flex flex-col">
                <span className="text-sm font-bold text-white">{t.title}</span>
                <span className="text-xs text-white/70">{t.desc}</span>
              </span>
            </div>
          ))}
        </div>

        <div className="grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <BrandLogo className="h-9 w-9" />
              <span className="text-lg font-extrabold text-brand-800">آواژنگ</span>
            </div>
            <p className="text-sm leading-7 text-zinc-500">
              فروشگاه اینترنتی آواژنگ؛ مرجع تخصصی خرید کالای دیجیتال با بهترین قیمت، ضمانت اصالت و ارسال سریع به سراسر
              کشور.
            </p>
            <a
              href="tel:+982187113"
              dir="ltr"
              className="mt-3 inline-flex items-center gap-2 rounded-xl bg-brand-50 px-3 py-2 text-sm font-bold tabular-nums text-brand-700 transition hover:bg-brand-600 hover:text-white"
            >
              <IconPhone className="h-4 w-4" />
              ۰۲۱ ۸۷۱۱۳
            </a>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-extrabold text-zinc-800">دسترسی سریع</h3>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li>
                <Link href="/shop" className="transition hover:text-brand-600">
                  همه محصولات
                </Link>
              </li>
              <li>
                <Link href="/shop/category/mobile" className="transition hover:text-brand-600">
                  موبایل
                </Link>
              </li>
              <li>
                <Link href="/shop/category/laptop" className="transition hover:text-brand-600">
                  لپ‌تاپ و تبلت
                </Link>
              </li>
              <li>
                <Link href="/shop/category/audio" className="transition hover:text-brand-600">
                  هدفون و هندزفری
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-extrabold text-zinc-800">خدمات مشتریان</h3>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li>پیگیری سفارش</li>
              <li>قوانین و مقررات</li>
              <li>شرایط عودت کالا</li>
              <li>
                <Link href="/contact" className="transition hover:text-brand-600">
                  تماس با ما
                </Link>
              </li>
              <li>
                <Link href="/about" className="transition hover:text-brand-600">
                  درباره ما
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-extrabold text-zinc-800">نماد اعتماد</h3>
            <div className="flex items-start gap-3">
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
                <BrandLogo src="/brand/trust-badge.jpg" className="h-full w-full rounded-none ring-0" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-zinc-100 py-6 text-center text-xs text-zinc-400 sm:flex-row sm:text-right">
          <p>© {new Date().getFullYear()} فروشگاه اینترنتی آواژنگ — تمامی حقوق محفوظ است.</p>
          <p>طراحی شده با عشق برای خرید بهتر ✦ نسخه نمایشی (MVP)</p>
        </div>
      </div>
    </footer>
  );
}