"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { PriceTag, ProductVisual } from "@/components/ProductCard";
import { IconCart, IconMinus, IconPlus, IconTrash } from "@/components/icons";
import { faDigits, toman } from "@/lib/format";
import { productImageUrl } from "@/lib/product-images";

const FREE_SHIPPING_THRESHOLD = 10_000_000;
const SHIPPING_FEE = 300_000;

export default function CartPage() {
  const { items, count, total, setQty, remove } = useCart();
  const shipping = items.length === 0 || total >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const remaining = FREE_SHIPPING_THRESHOLD - total;

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-24 text-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-3xl bg-brand-50 text-brand-600">
          <IconCart className="h-10 w-10" />
        </span>
        <h1 className="text-xl font-extrabold text-zinc-900">سبد خرید شما خالی است</h1>
        <p className="text-sm text-zinc-500">محصولاتی که دوست دارید را به سبد اضافه کنید.</p>
        <Link
          href="/shop"
          className="mt-2 rounded-xl bg-brand-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-200 transition hover:bg-brand-700"
        >
          شروع خرید
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-extrabold text-zinc-900">
        سبد خرید <span className="text-sm font-medium text-zinc-400">({faDigits(count)} کالا)</span>
      </h1>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-3 lg:col-span-2">
          {items.map((line) => (
            <div
              key={line.slug}
              className="flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-4"
            >
              <Link href={`/shop/product/${line.slug}`} className="shrink-0">
                <ProductVisual
                  emoji={line.emoji}
                  gradient={line.gradient}
                  image={productImageUrl(line.slug)}
                  alt={line.title}
                  className="h-20 w-20 rounded-xl"
                  emojiClass="text-3xl"
                />
              </Link>
              <div className="min-w-0 flex-1">
                <Link
                  href={`/shop/product/${line.slug}`}
                  className="line-clamp-2 text-sm font-bold text-zinc-800 transition hover:text-brand-600"
                >
                  {line.title}
                </Link>
                <div className="mt-1">
                  <PriceTag price={line.price} compareAtPrice={line.compareAtPrice} size="sm" />
                </div>
              </div>

              <div className="flex flex-col items-end gap-3">
                <div className="flex h-9 items-center overflow-hidden rounded-lg border border-zinc-300">
                  <button
                    type="button"
                    onClick={() => setQty(line.slug, line.qty + 1)}
                    className="flex h-full w-9 items-center justify-center text-zinc-600 transition hover:bg-brand-50"
                    aria-label="افزایش تعداد"
                  >
                    <IconPlus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-8 text-center text-sm font-bold tabular-nums">
                    {faDigits(line.qty)}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQty(line.slug, line.qty - 1)}
                    className="flex h-full w-9 items-center justify-center text-zinc-600 transition hover:bg-brand-50"
                    aria-label="کاهش تعداد"
                  >
                    <IconMinus className="h-3.5 w-3.5" />
                  </button>
                </div>
                <span className="text-sm font-extrabold text-zinc-900">
                  {toman(line.price * line.qty)}
                </span>
                <button
                  type="button"
                  onClick={() => remove(line.slug)}
                  className="flex items-center gap-1 text-xs text-zinc-400 transition hover:text-rose-500"
                >
                  <IconTrash className="h-3.5 w-3.5" />
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="h-fit rounded-2xl border border-zinc-200 bg-white p-5 lg:sticky lg:top-28">
          <h2 className="mb-4 text-base font-extrabold text-zinc-900">خلاصه سفارش</h2>
          <dl className="space-y-2.5 border-b border-dashed border-zinc-200 pb-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-zinc-500">تعداد کالا</dt>
              <dd className="font-bold text-zinc-800">{faDigits(count)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-zinc-500">جمع کالاها</dt>
              <dd className="font-bold text-zinc-800">{toman(total)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-zinc-500">هزینه ارسال</dt>
              <dd className={`font-bold ${shipping === 0 ? "text-emerald-600" : "text-zinc-800"}`}>
                {shipping === 0 ? "رایگان" : toman(shipping)}
              </dd>
            </div>
          </dl>
          {remaining > 0 ? (
            <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700">
              با خرید {toman(remaining)} بیشتر، ارسال رایگان می‌شود!
            </p>
          ) : (
            <p className="mt-3 rounded-lg bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
              🎉 ارسال سفارش شما رایگان است.
            </p>
          )}
          <div className="mt-4 flex justify-between text-base">
            <span className="font-bold text-zinc-900">مبلغ قابل پرداخت</span>
            <span className="font-extrabold text-brand-700">{toman(total + shipping)}</span>
          </div>
          <Link
            href="/shop/checkout"
            className="mt-5 flex h-12 w-full items-center justify-center rounded-xl bg-brand-600 text-sm font-bold text-white shadow-lg shadow-brand-200 transition hover:bg-brand-700"
          >
            ادامه فرایند خرید
          </Link>
          <Link
            href="/shop"
            className="mt-3 block text-center text-xs text-zinc-500 transition hover:text-brand-600"
          >
            ادامه خرید از فروشگاه
          </Link>
        </div>
      </div>
    </div>
  );
}