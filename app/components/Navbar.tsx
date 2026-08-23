"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { BookOpen, BookmarkCheck, Sun, Moon } from "lucide-react";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  // مزامنة حالة الدارك مود عند فتح الصفحة أول مرة
  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark";
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center" dir="rtl">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-blue-600 text-white flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="font-bold text-lg text-slate-900 dark:text-white">
            المكتبة الذكية
          </span>
        </Link>

        {/* Links & Toggle */}
        <div className="flex items-center gap-6 text-sm font-semibold">
          <Link href="/" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">
           الرئيسية
          </Link>
          <Link href="/my-books" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">
            كتبي المستعارة
          </Link>

          <button
            onClick={toggleDarkMode}
            className="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
            aria-label="تغيير المظهر"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}