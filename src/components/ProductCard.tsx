import Image from "next/image";
import Link from "next/link";
import type { ProductDTO } from "@/lib/data";
import { discountPercent, faDigits, toman } from "@/lib/format";
import { productImageUrl } from "@/lib/product-images";

export function ProductVisual({
  emoji,
  gradient,
  stock,
  discount,
  image,
  alt = "",
  className = "aspect-square",
  emojiClass = "text-7xl",
  discountClass,
  imageSizes = "(max-width: 768px) 50vw, 20vw",
}: {
  emoji: string;
  gradient: string;
  stock?: number;
  discount?: number;
  image?: string | null;
  alt?: string;
  className?: string;
  emojiClass?: string;
  discountClass?: string;
  imageSizes?: string;
}) {
  return (
    <div
      className={`relative flex w-full items-center justify-center overflow-hidden ${image ? "bg-white" : `bg-gradient-to-br ${gradient}`} ${className}`}
    >
      {image ? (
        <Image
          src={image}
          alt={alt}
          fill
          sizes={imageSizes}
          className="object-contain"
        />
      ) : (
        <span className={`drop-shadow-2xl ${emojiClass} transition-transform duration-300 group-hover:scale-110`}>
          {emoji}
        </span>
      )}
      {typeof stock === "number" && stock === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/55 backdrop-blur-[2px]">
          <span className="rounded-lg bg-zinc-900 px-3 py-1.5 text-sm font-bold text-white">ناموجود</span>
        </div>
      )}
      {typeof discount === "number" && discount > 0 && (
        <span className={discountClass ?? "absolute top-2.5 left-2.5 rounded-lg bg-rose-600 px-2 py-1 text-xs font-extrabold text-white shadow-md shadow-rose-900/20"}>
          ٪{faDigits(discount)}
        </span>
      )}
    </div>
  );
}

export function PriceTag({
  price,
  compareAtPrice,
  size = "md",
  align = "flex-col",
}: {
  price: number;
  compareAtPrice?: number | null;
  size?: "sm" | "md" | "lg";
  align?: "flex-col" | "flex-row";
}) {
  const pct = compareAtPrice ? discountPercent(price, compareAtPrice) : 0;
  const sizes = {
    sm: { price: "text-sm", old: "text-[11px]", badge: "h-5 min-w-5 text-[11px]" },
    md: { price: "text-base", old: "text-xs", badge: "h-6 min-w-6 text-xs" },
    lg: { price: "text-2xl", old: "text-sm", badge: "h-7 min-w-7 text-sm" },
  }[size];

  return (
    <div className={`flex ${align} gap-1.5`}>
      {pct > 0 && (
        <span
          className={`flex items-center justify-center rounded-md bg-rose-600 px-1 font-bold text-white ${sizes.badge}`}
        >
          ٪{faDigits(pct)}
        </span>
      )}
      <span className={`font-extrabold text-zinc-900 ${sizes.price}`}>{toman(price)}</span>
      {compareAtPrice && compareAtPrice > price && (
        <span className={`text-zinc-400 line-through ${sizes.old}`}>{toman(compareAtPrice)}</span>
      )}
    </div>
  );
}

export function ProductCard({ product }: { product: ProductDTO }) {
  const discount = product.compareAtPrice ? discountPercent(product.price, product.compareAtPrice) : 0;
  return (
    <div className="group flex h-[300px] w-full flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift">
      <Link href={`/shop/product/${product.slug}`} className="flex min-h-0 flex-col">
        <ProductVisual
          emoji={product.emoji}
          gradient={product.gradient}
          stock={product.stock}
          image={productImageUrl(product.slug)}
          alt={product.title}
          className="h-[140px] w-full"
          emojiClass="text-5xl"
        />
        <div className="flex h-[160px] flex-col p-3">
          <h3 className="line-clamp-2 mb-2 text-[13px] font-semibold leading-[1.4] text-zinc-800 transition group-hover:text-brand-700">
            {product.title}
          </h3>
          <div className="mt-auto">
            {discount > 0 && (
              <span className="mb-1.5 inline-block rounded bg-[#E63946] px-1.5 py-0.5 text-[11px] font-bold leading-none text-white">
                ٪{faDigits(discount)}
              </span>
            )}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-base font-bold text-brand-700">{toman(product.price)}</span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span className="text-xs text-zinc-400 line-through">{toman(product.compareAtPrice)}</span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}