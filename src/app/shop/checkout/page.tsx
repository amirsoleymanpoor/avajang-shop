import type { Metadata } from "next";
import { CheckoutForm } from "@/components/CheckoutForm";

export const metadata: Metadata = { title: "تکمیل سفارش | آواژنگ" };

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-1 text-2xl font-extrabold text-zinc-900">تکمیل سفارش</h1>
      <p className="mb-6 text-sm text-zinc-500">لطفاً اطلاعات گیرنده و آدرس ارسال را وارد کنید.</p>
      <CheckoutForm />
    </div>
  );
}