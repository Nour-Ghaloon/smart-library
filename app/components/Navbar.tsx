"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { BookOpen, BookMarked, Heart } from "lucide-react";

export default function Navbar() {
  const [favCount, setFavCount] = useState(0);

  const updateFavCount = () => {
    try {
      const favs = JSON.parse(localStorage.getItem("favoriteBooks") || "[]");
      setFavCount(favs.length);
    } catch {
      setFavCount(0);
    }
  };

  useEffect(() => {
    updateFavCount();
    window.addEventListener("favoritesUpdated", updateFavCount);
    return () => window.removeEventListener("favoritesUpdated", updateFavCount);
  }, []);

  return (
    <nav className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 transition-colors">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between" dir="rtl">
        <Link href="/" className="flex items-center gap-2.5 font-extrabold text-lg text-slate-900 dark:text-white">
          <div className="w-9 h-9 rounded-xl bg-slate-900 dark:bg-blue-600 text-white flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <span>المكتبة الذكية</span>
        </Link>

        <div className="flex items-center gap-4 text-xs font-bold text-slate-600 dark:text-slate-300">
          <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            الرئيسية
          </Link>

          <Link href="/my-books" className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors">
            <BookMarked className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>كتبي المستعارة</span>
          </Link>

          <Link href="/favorites" className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors relative">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span>المفضلة</span>
            {favCount > 0 && (
              <span className="bg-rose-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {favCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}