"use client";

import { useState } from "react";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import type { Category } from "@/generated/prisma/client";
import type { ActionResult } from "@/lib/actions/admin";

const COLORS = [
  "from-sky-500 to-blue-700",
  "from-emerald-600 to-green-800",
  "from-teal-500 to-emerald-700",
  "from-rose-500 to-red-700",
  "from-emerald-500 to-teal-700",
  "from-lime-500 to-green-700",
  "from-amber-500 to-orange-700",
  "from-cyan-500 to-sky-700",
  "from-slate-500 to-slate-900",
  "from-lime-500 to-green-700",
];

export function CategoryForm({
  initial,
  action,
}: {
  initial?: Category;
  action: (input: { id?: number; title: string; emoji: string; color: string }) => Promise<ActionResult>;
}) {
  const router = useRouter();
  const isEdit = !!initial;

  const [title, setTitle] = useState(initial?.title ?? "");
  const [emoji, setEmoji] = useState(initial?.emoji ?? "🗂️");
  const [color, setColor] = useState(initial?.color ?? COLORS[0]);

  const [state, formAction, pending] = useActionState(
    async (_prev: ActionResult | null): Promise<ActionResult> => {
      const res = await action({ id: initial?.id, title, emoji, color });
      if (res.ok) {
        router.push("/admin/categories");
        router.refresh();
      }
      return res;
    },
    null,
  );

  return (
    <form action={formAction} className="max-w-2xl space-y-5">
      <div className="rounded-2xl border border-zinc-200 bg-white p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <label>
            <span className="mb-1.5 block text-xs font-bold text-zinc-600">نام دسته‌بندی *</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="مثلاً: دوربین دیجیتال"
              required
              className="h-11 w-full rounded-xl border border-zinc-300 px-4 text-sm outline-none transition focus:border-brand-500"
            />
          </label>
          <label>
            <span className="mb-1.5 block text-xs font-bold text-zinc-600">ایموجی</span>
            <input
              value={emoji}
              onChange={(e) => setEmoji(e.target.value)}
              className="h-11 w-full rounded-xl border border-zinc-300 px-4 text-center text-xl outline-none transition focus:border-brand-500"
            />
          </label>
        </div>

        <span className="mt-5 block text-xs font-bold text-zinc-600">رنگ آیکون</span>
        <div className="mt-3 grid grid-cols-5 gap-2.5">
          {COLORS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColor(c)}
              aria-label={c}
              className={`flex h-12 items-center justify-center rounded-xl bg-gradient-to-br ${c} ${
                color === c ? "ring-2 ring-brand-600 ring-offset-2" : "opacity-70 hover:opacity-100"
              }`}
            >
              <span className="drop-shadow">{emoji}</span>
            </button>
          ))}
        </div>
      </div>

      {state && !state.ok && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
          {state.error}
        </div>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="flex h-12 items-center justify-center rounded-xl bg-brand-600 px-8 text-sm font-bold text-white shadow-lg shadow-brand-200 transition hover:bg-brand-700 disabled:opacity-60"
        >
          {pending ? "در حال ذخیره..." : isEdit ? "ذخیره تغییرات" : "ثبت دسته‌بندی"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/categories")}
          className="h-12 rounded-xl border border-zinc-300 px-6 text-sm font-bold text-zinc-600 transition hover:border-zinc-400"
        >
          انصراف
        </button>
      </div>
    </form>
  );
}