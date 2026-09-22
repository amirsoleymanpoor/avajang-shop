"use client";

import { useState } from "react";
import { AddToCartButton } from "@/components/AddToCartButton";
import { IconMinus, IconPlus } from "@/components/icons";
import { faDigits } from "@/lib/format";
import type { CartLine } from "@/lib/types";

export function BuyBox({ line }: { line: Omit<CartLine, "qty"> }) {
  const [qty, setQty] = useState(1);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-medium text-zinc-500">تعداد</span>
        <div className="flex h-10 items-center overflow-hidden rounded-lg border border-zinc-300 bg-white">
          <button
            type="button"
            onClick={() => setQty((q) => Math.min(q + 1, 99))}
            className="flex h-full w-10 items-center justify-center text-zinc-600 transition hover:bg-brand-50 hover:text-brand-700"
            aria-label="افزایش تعداد"
          >
            <IconPlus className="h-4 w-4" />
          </button>
          <span className="w-10 text-center text-sm font-bold tabular-nums">{faDigits(qty)}</span>
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="flex h-full w-10 items-center justify-center text-zinc-600 transition hover:bg-brand-50 hover:text-brand-700"
            aria-label="کاهش تعداد"
          >
            <IconMinus className="h-4 w-4" />
          </button>
        </div>
      </div>
      <AddToCartButton
        line={line}
        qty={qty}
        label="افزودن به سبد خرید"
        className="h-12 w-full shadow-lg shadow-brand-200"
      />
    </div>
  );
}