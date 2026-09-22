import Link from "next/link";
import Image from "next/image";
import { BrandLogo } from "@/components/BrandLogo";
import { CategoryBar } from "@/components/CategoryBar";
import { DealCountdown } from "@/components/DealCountdown";
import { HeroSlider, type HeroSlide } from "@/components/HeroSlider";
import { ProductCard } from "@/components/ProductCard";
import { ProductGrid, Section } from "@/components/Section";
import { IconClock } from "@/components/icons";
import { getCategories, getDeals, getLatest } from "@/lib/data";

const slides: HeroSlide[] = [
  { image: "/banners/1.jpg", alt: "بنر تخفیف‌های ویژه آواژنگ", href: "/shop?sort=discount" },
  { image: "/banners/3.jpg", alt: "بنر فروشگاه آواژنگ", href: "/shop" },
  { image: "/banners/4.jpg", alt: "بنر فروشگاه آواژنگ", href: "/shop" },
  { image: "/banners/5.jpg", alt: "بنر تخفیف‌های ویژه آواژنگ", href: "/shop?sort=discount" },
  { image: "/banners/6.jpg", alt: "بنر فروشگاه آواژنگ", href: "/shop" },
  { image: "/banners/7.jpg", alt: "بنر فروشگاه آواژنگ", href: "/shop" },
  { image: "/banners/8.jpg", alt: "بنر فروشگاه آواژنگ", href: "/shop" },
  { image: "/banners/9.jpg", alt: "بنر فروشگاه آواژنگ", href: "/shop" },
];

export default async function Home() {
  const [categories, deals, latest] = await Promise.all([
    getCategories(),
    getDeals(),
    getLatest(),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4">
      <div className="pt-6">
        <HeroSlider slides={slides} />
      </div>

      <div className="pt-4">
        <CategoryBar categories={categories} />
      </div>

      {deals.length > 0 && (
        <section className="pb-12">
          <div className="mx-auto max-w-6xl rounded-2xl bg-gradient-to-l from-brand-700 via-brand-500 to-brand-400 p-2.5 shadow-soft sm:rounded-3xl sm:p-3.5">
            <div className="flex overflow-hidden rounded-xl bg-white sm:rounded-2xl">
              <div className="flex w-full shrink-0 flex-col justify-between gap-3 border-l border-brand-100 bg-gradient-to-b from-brand-50 via-white to-brand-50 p-4 md:w-48">
                <div className="flex items-center gap-2 text-brand-700">
                  <IconClock className="h-6 w-6 shrink-0" />
                  <h2 className="text-base font-black md:text-lg">فروش ویژه امروز</h2>
                </div>
                <p className="text-[11px] leading-5 text-zinc-500 md:text-xs">
                  تخفیف‌های امروز فقط تا پایان روز
                </p>
                <DealCountdown />
                <Link
                  href="/shop?sort=discount"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-brand-700"
                >
                  مشاهده همه تخفیف‌ها
                </Link>
              </div>
              <div className="min-w-0 flex-1 p-2.5 sm:p-3">
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-5">
                  {deals.slice(0, 5).map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="space-y-12 pb-4">
        <Image
          src="/banners/latest-campaign.png"
          alt="بنر جدیدترین محصولات آواژنگ"
          width={1000}
          height={167}
          className="h-auto w-full rounded-2xl shadow-soft"
          priority={false}
        />

        <Section
          title="جدیدترین محصولات"
          subtitle="تازه‌های رسیده به فروشگاه"
          actionHref="/shop"
          actionLabel="مشاهده همه"
        >
          <ProductGrid>
            {latest.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </ProductGrid>
        </Section>

        <Section title="چرا آواژنگ؟" actionLabel="">
          <div className="flex items-center gap-2 rounded-2xl border border-brand-100 bg-brand-50 p-5 text-sm text-brand-800">
            <BrandLogo src="/brand/logo-2.jpg" className="h-11 w-11 rounded-lg" />
            <span>
              همه کالاهای فروشگاه دارای گارانتی معتبر، امکان بازگشت تا ۷ روز و ارسال سریع به سراسر کشور هستند. نمونه
              اولیه (MVP) که الان می‌بینید فقط آغاز راه آواژنگ است.
            </span>
          </div>
        </Section>
      </div>
    </div>
  );
}