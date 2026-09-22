import Link from "next/link";
import type { ReactNode } from "react";
import { IconChevronLeft } from "@/components/icons";

export function Section({
  title,
  subtitle,
  actionHref,
  actionLabel,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  actionHref?: string;
  actionLabel?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={className}>
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-extrabold text-zinc-900 sm:text-xl">{title}</h2>
          {subtitle && <p className="mt-0.5 text-sm text-zinc-500">{subtitle}</p>}
        </div>
        {actionHref && (
          <Link
            href={actionHref}
            className="inline-flex items-center gap-1 text-sm font-bold text-brand-600 transition hover:text-brand-800"
          >
            {actionLabel ?? "مشاهده همه"}
            <IconChevronLeft className="h-4 w-4" />
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

export function ProductGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
      {children}
    </div>
  );
}