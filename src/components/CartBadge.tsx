"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { IconBag } from "@/components/icons";
import { faDigits } from "@/lib/format";

export function CartBadge() {
  const { count } = useCart();

  return (
    <Link
      href="/shop/cart"
      className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-700 transition hover:border-brand-300 hover:text-brand-600"
      aria-label="سبد خرید"
    >
      <IconBag className="h-5 w-5" />
      {count > 0 && (
        <span className="absolute -top-1.5 -left-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-600 px-1 text-[11px] font-bold text-white">
          {faDigits(count)}
        </span>
      )}
    </Link>
  );
}