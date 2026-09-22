import type { Metadata } from "next";
import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import {
  IconArrowBack,
  IconHeart,
  IconLink,
  IconShield,
  IconUser,
  IconUsers,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "درباره ما",
  description:
    "آواژنگ؛ ۲۲ سال حضور در صنعت IT ایران با خط سیر کار گروهی، اتحاد، اعتماد و همبستگی.",
};

const VALUES = [
  { title: "کار گروهی", icon: IconUsers },
  { title: "اتحاد", icon: IconLink },
  { title: "اعتماد", icon: IconShield },
  { title: "همبستگی", icon: IconHeart },
];

const ABOUT_TEXT = `کار گروهی، اتحاد، اعتماد و همبستگی، خط سیر آواژنگ در طی ۲۲ سال از حیات و وجود آن در صنعت IT کشور بوده است. تفکر، منش و روحیه‌ای که به آن قدرت داده است تا در پیشگاه مخاطبینش، پیشرو، توانمند و قابل اطمینان باشد. نو بماند و نو کند.
آواژنگ کوشیده است که آشنایی همراه، صادق و همیشگی برای خود، دوستان، شرکا و مشتریان خود باشد تا در تمام فصول همراهی‌اش، تجربه‌ای متمایز و جامع را در اختیار آنها قرار دهد.`;

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="overflow-hidden rounded-3xl bg-gradient-to-l from-brand-900 via-brand-700 to-brand-600 p-6 text-white sm:p-8">
        <div className="flex items-center gap-4">
          <BrandLogo className="h-14 w-14 rounded-2xl" />
          <div>
            <h1 className="text-2xl font-extrabold sm:text-3xl">درباره آواژنگ</h1>
            <p className="mt-1 text-sm text-white/80">۲۲ سال حضور مستمر و قابل اعتماد در صنعت IT ایران</p>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
            <IconUser className="h-5 w-5" />
          </span>
          <h2 className="text-lg font-extrabold text-zinc-800">مسیر و باورهای آواژنگ</h2>
        </div>
        {ABOUT_TEXT.split("\n").map((p) => (
          <p key={p} className="mb-4 text-sm leading-8 text-zinc-600 last:mb-0 sm:text-base sm:leading-9">
            {p}
          </p>
        ))}
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {VALUES.map((v) => (
          <div
            key={v.title}
            className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white">
              <v.icon className="h-5 w-5" />
            </span>
            <span className="text-base font-extrabold text-zinc-800">{v.title}</span>
          </div>
        ))}
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