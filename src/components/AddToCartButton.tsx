"use client";

import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { IconBag, IconCheck } from "@/components/icons";
import type { CartLine } from "@/lib/types";

type Props = {
  line: Omit<CartLine, "qty">;
  label?: string;
  qty?: number;
  disabled?: boolean;
  className?: string;
};

export function AddToCartButton({ line, label = "افزودن به سبد", qty = 1, disabled, className }: Props) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  function handle() {
    add(line, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  }

  return (
    <button
      type="button"
      onClick={handle}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60 ${className ?? ""}`}
    >
      {added ? (
        <>
          <IconCheck className="h-4 w-4" />
          افزوده شد
        </>
      ) : (
        <>
          <IconBag className="h-4 w-4" />
          {label}
        </>
      )}
    </button>
  );
}