import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "نظام إدارة المكتبة الذكية",
  description: "منصة إلكترونية تتيح استكشاف وحجز الكتب والموارد التعليمية",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="antialiased bg-gray-50 text-gray-900 font-sans">
        <Navbar />
        {children}
      </body>
    </html>
  );
}