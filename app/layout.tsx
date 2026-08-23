import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "نظام إدارة المكتبة الذكية",
  description: "منصة إلكترونية تتيح استكشاف وحجز الكتب والموارد التعليمية",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-300">
        <Navbar />
        {children}
      </body>
    </html>
  );
}