import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/AddToCartButton";
import { BuyBox } from "@/components/BuyBox";
import { ProductCard, ProductVisual } from "@/components/ProductCard";
import { ProductGrid, Section } from "@/components/Section";
import {
  IconBadge,
  IconCheck,
  IconChevronLeft,
  IconRefresh,
  IconShield,
  IconTruck,
} from "@/components/icons";
import { getProductBySlug, getSimilar, parseFeatures } from "@/lib/data";
import { faDigits, toman } from "@/lib/format";
import { productImageUrl } from "@/lib/product-images";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return {
    title: product ? `${product.title} | آواژنگ` : "محصول | آواژنگ",
    description: product?.description?.slice(0, 155),
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const [similar, features] = await Promise.all([getSimilar(product), parseFeatures(product.features)]);
  const inStock = product.stock > 0;
  const discount =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
      : 0;
  const line = {
    slug: product.slug,
    title: product.title,
    price: product.price,
    compareAtPrice: product.compareAtPrice ?? null,
    emoji: product.emoji,
    gradient: product.gradient,
  };
  const services = [
    { icon: IconShield, t: "ضمانت اصالت کالا" },
    { icon: IconBadge, t: "گارانتی ۱۲ ماهه" },
    { icon: IconRefresh, t: "۷ روز بازگشت" },
    { icon: IconTruck, t: "ارسال سریع" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 pt-6 pb-28 lg:pb-12">
      {/* breadcrumb */}
      <nav className="mb-4 flex flex-wrap items-center gap-1 text-xs text-zinc-500">
        <Link href="/" className="transition hover:text-brand-600">
          خانه
        </Link>
        <IconChevronLeft className="h-3.5 w-3.5 text-zinc-300" />
        <Link
          href={`/shop/category/${product.category?.slug ?? ""}`}
          className="transition hover:text-brand-600"
        >
          {product.category?.title ?? "فروشگاه"}
        </Link>
        <IconChevronLeft className="h-3.5 w-3.5 text-zinc-300" />
        <span className="line-clamp-1 font-medium text-zinc-700">{product.title}</span>
      </nav>

      {/* main grid */}
      <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
        {/* gallery */}
        <div className="lg:col-span-4">
          <div className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-5">
            <ProductVisual
              emoji={product.emoji}
              gradient={product.gradient}
              stock={product.stock}
              image={productImageUrl(product.slug)}
              alt={product.title}
              imageSizes="(max-width: 1024px) 90vw, 380px"
              className="mx-auto aspect-square w-full max-w-[380px] rounded-lg"
              emojiClass="text-7xl"
            />
          </div>
        </div>

        {/* middle column */}
        <div className="flex flex-col gap-6 lg:col-span-5">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-brand-600">{product.brand}</span>
              <span className="h-1 w-1 rounded-full bg-zinc-300" />
              <Link
                href={`/shop/category/${product.category?.slug ?? ""}`}
                className="text-xs font-medium text-zinc-500 transition hover:text-brand-600"
              >
                {product.category?.title}
              </Link>
            </div>
            <h1 className="text-lg font-extrabold leading-8 text-zinc-900 sm:text-xl sm:leading-8">
              {product.title}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 font-bold text-emerald-700">
                <IconCheck className="h-3.5 w-3.5" />
                {inStock
                  ? product.stock <= 5
                    ? `فقط ${faDigits(product.stock)} عدد در انبار`
                    : "در انبار آواژنگ"
                  : "ناموجود"}
              </span>
              <span className="rounded-full bg-zinc-100 px-2.5 py-1 font-medium text-zinc-600">
                کد کالا: {faDigits(product.id)}
              </span>
            </div>
          </div>

          {product.description && (
            <div>
              <p className="text-sm leading-7 text-zinc-600">{product.description}</p>
            </div>
          )}

          {features.length > 0 && (
            <div className="rounded-2xl border border-zinc-200 bg-white">
              <div className="px-5 py-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-extrabold text-zinc-900">امکانات کالا</h2>
                  {features.length > 5 && (
                    <a href="#specs" className="text-xs font-bold text-brand-600 transition hover:text-brand-800">
                      همهٔ مشخصات
                    </a>
                  )}
                </div>
              </div>
              <ul className="space-y-0 px-5 pb-4">
                {features.slice(0, 5).map((f) => (
                  <li
                    key={f.label}
                    className="flex items-start gap-2 border-b border-dashed border-zinc-100 py-2.5 text-sm last:border-0"
                  >
                    <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                    <span className="text-zinc-700">
                      {f.label}: <span className="font-semibold text-zinc-900">{f.value}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 md:grid-cols-4">
            {services.map((s) => (
              <div
                key={s.t}
                className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-[11px] font-bold text-zinc-700"
              >
                <s.icon className="h-5 w-5 shrink-0 text-brand-600" />
                <span>{s.t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* buy box */}
        <div className="lg:col-span-3">
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.05)] lg:sticky lg:top-24">
            <p className="mb-1 text-xs font-medium text-zinc-500">قیمت فروش</p>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-[27px]">
                {toman(product.price)}
              </span>
              {discount > 0 && (
                <span className="rounded-md bg-[#E63946] px-1.5 py-0.5 text-xs font-extrabold text-white">
                  ٪{faDigits(discount)}
                </span>
              )}
            </div>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs">
                <span className="text-zinc-400 line-through">{toman(product.compareAtPrice)}</span>
                <span className="font-bold text-emerald-600">
                  سود شما: {toman(product.compareAtPrice - product.price)}
                </span>
              </div>
            )}

            <div className="my-4 border-t border-dashed border-zinc-200" />

            <div className="mb-3 flex items-center justify-between text-xs">
              <span className="font-medium text-zinc-500">وضعیت</span>
              <span
                className={`font-bold ${
                  inStock ? (product.stock <= 5 ? "text-amber-700" : "text-emerald-700") : "text-rose-600"
                }`}
              >
                {inStock
                  ? product.stock <= 5
                    ? `فقط ${faDigits(product.stock)} عدد باقی مانده`
                    : "موجود در انبار"
                  : "ناموجود"}
              </span>
            </div>

            {inStock ? (
              <BuyBox line={line} />
            ) : (
              <button
                type="button"
                disabled
                className="flex h-12 w-full cursor-not-allowed items-center justify-center rounded-xl bg-zinc-200 px-5 text-sm font-bold text-zinc-500"
              >
                ناموجود
              </button>
            )}

            <div className="mt-5 space-y-2.5 border-t border-zinc-100 pt-4">
              <div className="flex items-center gap-2.5 text-xs text-zinc-600">
                <IconBadge className="h-5 w-5 shrink-0 text-brand-600" />
                <span>گارانتی ۱۲ ماهه آواژنگ</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-zinc-600">
                <IconShield className="h-5 w-5 shrink-0 text-brand-600" />
                <span>ضمانت اصالت و سلامت کالا</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-zinc-600">
                <IconTruck className="h-5 w-5 shrink-0 text-brand-600" />
                <span>ارسال سریع به سراسر کشور</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* specs + description */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {features.length > 0 && (
          <div id="specs" className="scroll-mt-24 rounded-2xl border border-zinc-200 bg-white">
            <div className="border-b border-zinc-100 px-5 py-4">
              <h2 className="text-sm font-extrabold text-zinc-900">مشخصات کالا</h2>
            </div>
            <dl className="divide-y divide-dashed divide-zinc-200">
              {features.map((f) => (
                <div key={f.label} className="flex items-baseline justify-between gap-5 px-5 py-3 text-sm">
                  <dt className="shrink-0 text-zinc-500">{f.label}</dt>
                  <dd className="text-left font-semibold text-zinc-800">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {product.description && (
          <div className="rounded-2xl border border-zinc-200 bg-white">
            <div className="border-b border-zinc-100 px-5 py-4">
              <h2 className="text-sm font-extrabold text-zinc-900">معرفی و توضیحات</h2>
            </div>
            <p className="px-5 py-4 text-sm leading-7 text-zinc-600">{product.description}</p>
          </div>
        )}
      </div>

      {/* related */}
      {similar.length > 0 && (
        <div className="pt-14">
          <Section title="کالاهای مرتبط">
            <ProductGrid>
              {similar.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </ProductGrid>
          </Section>
        </div>
      )}

      {/* mobile sticky buy bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-zinc-200 bg-white/95 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center gap-3">
          <div className="min-w-0 shrink-0">
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="block text-[11px] text-zinc-400 line-through">
                {toman(product.compareAtPrice)}
              </span>
            )}
            <span className="block text-lg font-extrabold text-zinc-900">{toman(product.price)}</span>
          </div>
          {inStock ? (
            <AddToCartButton
              line={line}
              label="افزودن به سبد خرید"
              className="h-11 flex-1 items-center justify-center rounded-xl bg-brand-600 px-4 text-sm font-bold text-white transition hover:bg-brand-700"
            />
          ) : (
            <span className="flex h-11 flex-1 items-center justify-center rounded-xl bg-zinc-200 px-4 text-sm font-bold text-zinc-500">
              ناموجود
            </span>
          )}
        </div>
      </div>
    </div>
  );
}