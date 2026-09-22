"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/BrandLogo";
import { IconCartCheck, IconDashboard, IconFolder, IconLogout, IconPackage } from "@/components/icons";
import { adminLogout } from "@/lib/actions/auth";

const LINKS = [
  { href: "/admin", label: "داشبورد", icon: IconDashboard },
  { href: "/admin/products", label: "محصولات", icon: IconPackage },
  { href: "/admin/categories", label: "دسته‌بندی‌ها", icon: IconFolder },
  { href: "/admin/orders", label: "سفارش‌ها", icon: IconCartCheck },
];

export function AdminNav() {
  const pathname = usePathname();

  const items = LINKS.map((l) => (
    <Link
      key={l.href}
      href={l.href}
      className={`flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-bold transition ${
        pathname === l.href || (l.href !== "/admin" && pathname.startsWith(l.href))
          ? "bg-brand-600 text-white shadow-md shadow-brand-200"
          : "text-zinc-600 hover:bg-brand-50 hover:text-brand-700"
      }`}
    >
      <l.icon className="h-4.5 w-4.5" />
      {l.label}
    </Link>
  ));

  return (
    <>
      <nav className="no-scrollbar mb-4 flex gap-2 overflow-x-auto md:hidden">{items}</nav>
      <nav className="hidden flex-col gap-1.5 md:flex">{items}</nav>
    </>
  );
}

export function AdminTopbar() {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <BrandLogo className="h-9 w-9" />
        <span className="text-sm font-extrabold text-zinc-800">
          آواژنگ <span className="font-medium text-zinc-400">| پنل مدیریت</span>
        </span>
      </div>
      <form
        action={adminLogout}
        className="flex h-10 items-center rounded-xl border border-zinc-200 bg-white px-3.5 text-sm font-bold text-zinc-600 transition hover:border-rose-200 hover:text-rose-600"
      >
        <button type="submit" className="flex items-center gap-2">
          <IconLogout className="h-4 w-4" />
          خروج
        </button>
      </form>
    </div>
  );
}