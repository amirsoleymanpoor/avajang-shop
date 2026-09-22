"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ActionResult } from "@/lib/actions/admin";
import { ORDER_STATUS, ORDER_STATUS_LABELS, type OrderStatus } from "@/lib/types";

export function OrderStatusSelect({
  status,
  action,
}: {
  status: OrderStatus;
  action: (s: string) => Promise<ActionResult>;
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-1">
      <select
        value={status}
        disabled={pending}
        onChange={async (e) => {
          setPending(true);
          setError(null);
          try {
            const res = await action(e.target.value);
            if (res.ok) {
              router.refresh();
            } else {
              setError(res.error);
            }
          } finally {
            setPending(false);
          }
        }}
        className="h-9 rounded-lg border border-zinc-300 bg-white px-2.5 text-xs font-bold text-zinc-700 outline-none transition focus:border-brand-500 disabled:opacity-60"
      >
        {ORDER_STATUS.map((s) => (
          <option key={s} value={s}>
            {ORDER_STATUS_LABELS[s]}
          </option>
        ))}
      </select>
      {error && <p className="text-[10px] font-medium text-rose-600">{error}</p>}
    </div>
  );
}