import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { ShopFilters } from "@/components/ShopFilters";
import { getCatalog, getCategories } from "@/lib/data";
import { faDigits } from "@/lib/format";

export const metadata = { title: "همه محصولات" };

function first(v: string | string[] | undefined): string {
  return typeof v === "string" ? v : "";
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const q = first(sp.q);
  const category = first(sp.category);
  const sort = first(sp.sort);

  const [products, categories] = await Promise.all([
    getCatalog({ q, category, sort }),
    getCategories(),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <nav className="mb-5 text-xs text-zinc-500">
        <Link href="/" className="transition hover:text-brand-600">
          خانه
        </Link>
        <span className="mx-1.5">/</span>
        <span className="font-medium text-zinc-700">همه محصولات</span>
      </nav>

      <div className="mb-6 space-y-4">
        <h1 className="text-2xl font-extrabold text-zinc-900">
          {q ? `نتایج جستجوی «${q}»` : category ? "محصولات دسته‌بندی" : "همه محصولات"}
        </h1>
        <ShopFilters categories={categories} current={{ q, category, sort }} />
      </div>

      <p className="mb-4 text-xs text-zinc-500">{faDigits(products.length)} کالا یافت شد</p>

      {products.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-zinc-300 bg-white py-20 text-center">
          <span className="text-5xl">🔍</span>
          <p className="text-sm font-bold text-zinc-700">محصولی یافت نشد</p>
          <p className="text-xs text-zinc-500">عبارت دیگری را جستجو کنید یا فیلترها را تغییر دهید.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}