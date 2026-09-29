"use client";

import { useState, useEffect } from "react";
import { BOOKS } from "@/data/books";
import { Heart, ArrowRight } from "lucide-react";
import Link from "next/link";
import BookCard from "../components/BookCard";

export default function FavoritesPage() {
  const [favoriteBooks, setFavoriteBooks] = useState<typeof BOOKS>([]);
  const [mounted, setMounted] = useState(false);

  const loadFavorites = () => {
    try {
      const savedFavorites: (string | number)[] = JSON.parse(
        localStorage.getItem("favoriteBooks") || "[]"
      );
      
      const filtered = (BOOKS || []).filter((book) =>
        book && book.id && savedFavorites.some((id) => String(id) === String(book.id))
      );
      
      setFavoriteBooks(filtered);
    } catch (e) {
      console.error("خطأ في تحميل قائمة المفضلة:", e);
    }
  };

  useEffect(() => {
    setMounted(true);
    loadFavorites();

    const handleFavoritesUpdate = () => {
      loadFavorites();
    };

    window.addEventListener("favoritesUpdated", handleFavoritesUpdate);
    return () => {
      window.removeEventListener("favoritesUpdated", handleFavoritesUpdate);
    };
  }, []);

  if (!mounted) {
    return (
      <main className="min-h-screen bg-slate-50/50 dark:bg-slate-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-40 bg-slate-200 dark:bg-slate-800 rounded-3xl animate-pulse"></div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50/50 dark:bg-slate-950 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* البانر */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 mb-8 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-500 border border-rose-200 dark:border-rose-900">
              <Heart className="w-6 h-6 fill-rose-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                قائمة المفضلة
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                الكتب التي قمت بحفظها للرجوع إليها لاحقاً
              </p>
            </div>
          </div>
        </div>

        {/* عرض الكتب أو الرسالة الفارغة */}
        {favoriteBooks.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm max-w-md mx-auto">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              قائمة المفضلة فارغة
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              لم تقم بإضافة أي كتب إلى المفضلة بعد.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors"
            >
              <span>تصفح الكتب</span>
              <ArrowRight className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteBooks.map((book) =>
              book && book.id ? <BookCard key={book.id} book={book} /> : null
            )}
          </div>
        )}
      </div>
    </main>
  );
}