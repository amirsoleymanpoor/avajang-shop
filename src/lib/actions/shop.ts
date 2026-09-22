"use server";

import { prisma } from "@/lib/db";
import type { CheckoutPayload } from "@/lib/types";

export type CreateOrderResult = { ok: true; code: string } | { ok: false; error: string };

export async function createOrder(payload: CheckoutPayload): Promise<CreateOrderResult> {
  const name = payload.customerName.trim();
  const phone = payload.phone.trim();
  const city = payload.city.trim();
  const address = payload.address.trim();
  if (!name || !phone || !city || !address) {
    return { ok: false, error: "لطفاً همه فیلدها را کامل کنید." };
  }
  if (!payload.lines.length) {
    return { ok: false, error: "سبد خرید خالی است." };
  }

  const slugs = [...new Set(payload.lines.map((l) => l.slug))];
  const products = await prisma.product.findMany({ where: { slug: { in: slugs } } });
  const bySlug = new Map(products.map((p) => [p.slug, p]));

  const items: { slug: string; title: string; price: number; qty: number }[] = [];
  let total = 0;

  for (const line of payload.lines) {
    const p = bySlug.get(line.slug);
    if (!p) return { ok: false, error: `کالای «${line.title}» دیگر موجود نیست.` };
    const qty = Math.max(1, Math.min(99, Math.floor(line.qty)));
    if (p.stock < qty) return { ok: false, error: `موجودی «${p.title}» کافی نیست (موجود: ${p.stock}).` };
    items.push({ slug: p.slug, title: p.title, price: p.price, qty });
    total += p.price * qty;
  }

  const code = `AV-${Math.floor(100000 + Math.random() * 900000)}`;

  await prisma.order.create({
    data: { code, customerName: name, phone, city, address, items, total, status: "pending" },
  });

  for (const it of items) {
    await prisma.product.update({
      where: { slug: it.slug },
      data: { stock: { decrement: it.qty } },
    });
  }

  return { ok: true, code };
}