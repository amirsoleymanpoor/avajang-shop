"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BrandLogo } from "@/components/BrandLogo";

export default function AdminLoginPage() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(null);
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/admin/login", { method: "POST", body: form });
    if (res.ok) {
      router.replace("/admin");
      return;
    }
    const data = await res.json().catch(() => null);
    setError(data?.error ?? "ورود انجام نشد. دوباره تلاش کنید.");
    setPending(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-900 via-brand-800 to-brand-600 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center gap-3 text-white">
          <BrandLogo className="h-14 w-14 rounded-2xl" />
          <div className="text-center">
            <h1 className="text-lg font-extrabold">پنل مدیریت آواژنگ</h1>
            <p className="text-xs text-white/70">برای ادامه، وارد شوید</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 shadow-2xl">
          <label className="mb-4 block">
            <span className="mb-1.5 block text-xs font-bold text-zinc-600">نام کاربری</span>
            <input
              name="username"
              required
              autoComplete="username"
              dir="ltr"
              spellCheck={false}
              autoCapitalize="none"
              className="h-11 w-full rounded-xl border border-zinc-300 px-4 text-left text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
            />
          </label>
          <label className="mb-5 block">
            <span className="mb-1.5 block text-xs font-bold text-zinc-600">رمز عبور</span>
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              dir="ltr"
              spellCheck={false}
              className="h-11 w-full rounded-xl border border-zinc-300 px-4 text-left text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
            />
          </label>

          {error && (
            <p className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-medium text-rose-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="h-12 w-full rounded-xl bg-brand-600 text-sm font-bold text-white shadow-lg shadow-brand-200 transition hover:bg-brand-700 disabled:opacity-60"
          >
            {pending ? "در حال ورود..." : "ورود به پنل"}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-white/60">
          برای تست: نام کاربری <span className="font-bold" dir="ltr">admin</span> و رمز{" "}
          <span className="font-bold" dir="ltr">admin1234</span>
        </p>
        <p className="mt-2 text-center text-[11px] text-white/40">
          دقت کنید صفحه‌کلید انگلیسی باشد (کیبورد فارسی حروف را عوض می‌کند).
        </p>
      </div>
    </div>
  );
}