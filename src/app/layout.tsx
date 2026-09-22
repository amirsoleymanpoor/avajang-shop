import type { Metadata } from "next";
import localFont from "next/font/local";
import { CartProvider } from "@/components/CartProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const vazir = localFont({
  src: "./fonts/Vazirmatn-Variable.woff2",
  display: "swap",
  variable: "--font-vazir",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "فروشگاه آواژنگ | خرید آنلاین کالای دیجیتال",
    template: "%s | آواژنگ",
  },
  description:
    "فروشگاه اینترنتی آواژنگ؛ خرید آنلاین گوشی موبایل، لپ‌تاپ، تبلت و لوازم جانبی با ضمانت اصالت کالا و ارسال سریع.",
  icons: {
    icon: "/brand/logo-3.jpg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fa" dir="rtl" className={vazir.variable}>
      <body className="min-h-screen bg-surface text-ink antialiased">
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}