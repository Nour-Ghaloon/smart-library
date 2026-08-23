"use client";

import Link from "next/link";
import { useState } from "react";
import { BookOpen, BookmarkCheck, Sun, Moon, Sparkles } from "lucide-react";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center" dir="rtl">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-md shadow-slate-900/10 group-hover:bg-blue-600 transition-colors">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg text-slate-900 leading-tight">
              المكتبة الذكية
            </span>
            <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
              Smart Library Platform
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-8 text-sm font-semibold text-slate-600">
          <Link
            href="/"
            className="flex items-center gap-2 hover:text-slate-900 transition-colors py-2 border-b-2 border-transparent hover:border-slate-900"
          >
            <BookOpen className="w-4 h-4 text-slate-400" />
            <span>الدليل العام</span>
          </Link>

          <Link
            href="/my-books"
            className="flex items-center gap-2 hover:text-slate-900 transition-colors py-2 border-b-2 border-transparent hover:border-slate-900"
          >
            <BookmarkCheck className="w-4 h-4 text-slate-400" />
            <span>كتبي المستعارة</span>
          </Link>

          <button
            onClick={toggleDarkMode}
            className="w-9 h-9 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all"
            aria-label="تغيير المظهر"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}