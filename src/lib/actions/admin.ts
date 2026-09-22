"use server";

import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { slugify } from "@/lib/slug";
import { ORDER_STATUS } from "@/lib/types";
import type { OrderStatus, Spec } from "@/lib/types";

export type ActionResult = { ok: true } | { ok: false; error: string };

function normalizeSlug(slug: string | undefined, fallback: string): string {
  const s = slugify(slug || fallback);
  return s || `p-${Date.now().toString(36)}`;
}

export async function saveProduct(input: {
  id?: number;
  slug?: string;
  title: string;
  brand: string;
  price: number;
  compareAtPrice?: number | null;
  stock: number;
  emoji: string;
  gradient: string;
  description: string;
  features: Spec[];
  isFeatured: boolean;
  categoryId: number;
}): Promise<ActionResult> {
  if (!(await isAdmin())) return { ok: false, error: "دسترسی غیرمجاز." };

  const title = input.title.trim();
  const brand = input.brand.trim();
  if (!title || !brand) return { ok: false, error: "عنوان و برند الزامی است." };
  if (!input.categoryId) return { ok: false, error: "دسته‌بندی را انتخاب کنید." };
  if (!input.price || input.price <= 0) return { ok: false, error: "قیمت باید بزرگ‌تر از صفر باشد." };

  const slug = normalizeSlug(input.slug ?? input.title, input.title);
  const conflict = await prisma.product.findUnique({ where: { slug } });
  if (conflict && conflict.id !== input.id) {
    return { ok: false, error: "این اسلاگ قبلاً استفاده شده است." };
  }

  const data = {
    slug,
    title,
    brand,
    price: Math.round(input.price),
    compareAtPrice: input.compareAtPrice && input.compareAtPrice > 0 ? Math.round(input.compareAtPrice) : null,
    stock: Math.max(0, Math.round(input.stock)),
    emoji: input.emoji || "📦",
    gradient: input.gradient || "from-slate-400 to-slate-700",
    description: input.description.trim(),
    features: input.features.filter((f) => f.label.trim() && f.value.trim()),
    isFeatured: !!input.isFeatured,
    categoryId: Number(input.categoryId),
  };

  if (input.id) {
    await prisma.product.update({ where: { id: input.id }, data });
  } else {
    await prisma.product.create({ data });
  }

  revalidatePath("/");
  revalidatePath("/shop");
  revalidatePath("/admin/products");
  return { ok: true };
}

export async function deleteProduct(id: number): Promise<ActionResult> {
  if (!(await isAdmin())) return { ok: false, error: "دسترسی غیرمجاز." };
  await prisma.product.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/shop");
  revalidatePath("/admin/products");
  return { ok: true };
}

export async function saveCategory(input: {
  id?: number;
  slug?: string;
  title: string;
  emoji: string;
  color: string;
}): Promise<ActionResult> {
  if (!(await isAdmin())) return { ok: false, error: "دسترسی غیرمجاز." };
  const title = input.title.trim();
  if (!title) return { ok: false, error: "نام دسته‌بندی الزامی است." };

  const slug = normalizeSlug(input.slug ?? input.title, input.title);
  const conflict = await prisma.category.findUnique({ where: { slug } });
  if (conflict && conflict.id !== input.id) {
    return { ok: false, error: "این اسلاگ قبلاً استفاده شده است." };
  }
  const data = {
    slug,
    title,
    emoji: input.emoji || "🗂️",
    color: input.color || "from-slate-400 to-slate-700",
  };
  if (input.id) {
    await prisma.category.update({ where: { id: input.id }, data });
  } else {
    await prisma.category.create({ data });
  }
  revalidatePath("/");
  revalidatePath("/shop");
  revalidatePath("/admin/categories");
  return { ok: true };
}

export async function deleteCategory(id: number): Promise<ActionResult> {
  if (!(await isAdmin())) return { ok: false, error: "دسترسی غیرمجاز." };
  const count = await prisma.product.count({ where: { categoryId: id } });
  if (count > 0) return { ok: false, error: "این دسته حاوی محصول است؛ ابتدا محصولات آن را حذف یا منتقل کنید." };
  await prisma.category.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/shop");
  revalidatePath("/admin/categories");
  return { ok: true };
}

export async function updateOrderStatus(id: number, status: string): Promise<ActionResult> {
  if (!(await isAdmin())) return { ok: false, error: "دسترسی غیرمجاز." };
  if (!ORDER_STATUS.includes(status as OrderStatus)) return { ok: false, error: "وضعیت نامعتبر است." };
  await prisma.order.update({ where: { id }, data: { status } });
  revalidatePath("/admin/orders");
  return { ok: true };
}