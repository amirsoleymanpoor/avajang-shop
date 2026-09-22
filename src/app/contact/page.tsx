import type { Metadata } from "next";
import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { IconArrowBack, IconMail, IconPhone, IconPin } from "@/components/icons";

export const metadata: Metadata = {
  title: "تماس با آواژنگ",
  description:
    "شماره تماس و آدرس فروشگاه اینترنتی آواژنگ؛ پاسخگویی واحدهای فروش، خدمات پس از فروش و رضایت مشتریان.",
};

type Numbers = { label: string; tel: string; ext?: string }[];

const DEPARTMENTS: { title: string; desc: string; numbers: Numbers }[] = [
  {
    title: "رضایت مشتریان",
    desc: "پاسخگویی به انتقادها و پیشنهادهای شما",
    numbers: [
      { label: "۰۲۱ ۸۹۳۱۲۳۲۲", tel: "+982189312322" },
      { label: "۰۲۱ ۸۹۳۱۲۳۲۳", tel: "+982189312323" },
      { label: "۰۲۱ ۸۷۱۱۳", tel: "+982187113", ext: "داخلی‌های ۳۲۳ و ۳۲۲" },
    ],
  },
  {
    title: "خدمات پس از فروش",
    desc: "گارانتی، خدمات و تعمیرات تخصصی",
    numbers: [
      { label: "۰۲۱ ۸۹۳۱۲۴۳۰", tel: "+982189312430" },
      { label: "۰۲۱ ۸۷۱۱۳", tel: "+982187113", ext: "داخلی ۴۳۰" },
    ],
  },
  {
    title: "فروش",
    desc: "استعلام قیمت و ثبت سفارش",
    numbers: [
      { label: "۰۲۱ ۸۹۳۱۲۴۲۱", tel: "+982189312421" },
      { label: "۰۲۱ ۸۹۳۱۲۴۲۲", tel: "+982189312422" },
      { label: "۰۲۱ ۸۷۱۱۳", tel: "+982187113", ext: "داخلی‌های ۴۲۱ و ۴۲۲" },
    ],
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="overflow-hidden rounded-3xl bg-gradient-to-l from-brand-900 via-brand-700 to-brand-600 p-6 text-white sm:p-8">
        <div className="flex items-center gap-4">
          <BrandLogo className="h-14 w-14 rounded-2xl" />
          <div>
            <h1 className="text-2xl font-extrabold sm:text-3xl">تماس با آواژنگ</h1>
            <p className="mt-1 text-sm text-white/80">
              هر سوال، انتقاد یا پیشنهادی دارید، با ما در میان بگذارید؛ تیم آواژنگ پاسخگوی شماست.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {DEPARTMENTS.map((d) => (
          <div
            key={d.title}
            className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                <IconPhone className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-base font-extrabold text-zinc-800">{d.title}</h2>
                <p className="text-xs text-zinc-500">{d.desc}</p>
              </div>
            </div>
            <ul className="space-y-2">
              {d.numbers.map((n) => (
                <li key={n.label + (n.ext ?? "")} className="flex flex-wrap items-center gap-2">
                  <a
                    href={`tel:${n.tel}`}
                    dir="ltr"
                    className="rounded-lg bg-zinc-100 px-3 py-1.5 text-sm font-bold tabular-nums text-brand-700 transition hover:bg-brand-600 hover:text-white"
                  >
                    {n.label}
                  </a>
                  {n.ext && (
                    <span className="text-xs font-medium text-zinc-500">{n.ext}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
            <IconPin className="h-5 w-5" />
          </span>
          <div className="leading-8">
            <h2 className="text-base font-extrabold text-zinc-800">آدرس فروشگاه</h2>
            <p className="text-sm text-zinc-600">
              تهران، خیابان ولیعصر، حد فاصل خیابان طالقانی و میدان ولیعصر، خیابان دمشق، خیابان برادران مظفر شمالی،
              نبش بن‌بست کیا، پلاک ۱۰۰
            </p>
            <p className="mt-2 flex items-center gap-2 text-sm text-zinc-600">
              <span className="font-bold text-zinc-800">کد پستی:</span>
              <span dir="ltr" className="font-bold tabular-nums text-brand-700">
                ۱۴۱۶۷۳۴۳۸۴
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 rounded-2xl border border-brand-100 bg-brand-50 p-4 text-sm text-brand-800">
        <IconMail className="h-5 w-5 shrink-0 text-brand-600" />
        <span>
          برای پیگیری سریع‌تر سفارش، در گفتگو تلفنی شماره سفارش و نام کامل خود را همراه داشته باشید.
        </span>
      </div>

      <div className="mt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-zinc-800 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-700"
        >
          <IconArrowBack className="h-4 w-4" />
          بازگشت به فروشگاه
        </Link>
      </div>
    </div>
  );
}