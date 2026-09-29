"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Star, Heart, CheckCircle2, XCircle } from "lucide-react";

interface Book {
  id: number | string;
  title: string;
  author: string;
  category: string;
  rating: number;
  image: string;
  available: boolean;
}

export default function BookCard({ book }: { book: Book }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!book || !book.id) return;

    try {
      const favorites: (string | number)[] = JSON.parse(
        localStorage.getItem("favoriteBooks") || "[]"
      );
      setIsFavorite(favorites.some((id) => String(id) === String(book.id)));
    } catch (e) {
      console.error("خطأ في قراءة المفضلات:", e);
    }
  }, [book?.id]);

  if (!book) return null;

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!book || !book.id) return;

    try {
      const favorites: (string | number)[] = JSON.parse(
        localStorage.getItem("favoriteBooks") || "[]"
      );

      let updatedFavorites: (string | number)[];

      if (isFavorite) {
        updatedFavorites = favorites.filter(
          (id) => String(id) !== String(book.id)
        );
        setIsFavorite(false);
      } else {
        updatedFavorites = [...favorites, book.id];
        setIsFavorite(true);
      }

      localStorage.setItem("favoriteBooks", JSON.stringify(updatedFavorites));
      window.dispatchEvent(new Event("favoritesUpdated"));
    } catch (e) {
      console.error("خطأ في تغيير المفضلة:", e);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
      <div>
        <div className="relative h-52 bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {}
          <span className="absolute top-3 right-3 bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-sm text-white text-[10px] font-semibold px-2.5 py-1 rounded-md">
            {book.category}
          </span>

          {}
          <div className="absolute bottom-3 right-3">
            {book.available ? (
              <span className="inline-flex items-center gap-1 bg-emerald-500/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-md backdrop-blur-sm shadow-sm">
                <CheckCircle2 className="w-3 h-3" />
                متاح للإعارة
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 bg-rose-500/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-md backdrop-blur-sm shadow-sm">
                <XCircle className="w-3 h-3" />
                غير متاح حالياً
              </span>
            )}
          </div>

          {}
          {mounted && (
            <button
              type="button"
              onClick={toggleFavorite}
              title={isFavorite ? "إزالة من المفضلة" : "إضافة للمفضلة"}
              className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 flex items-center justify-center text-rose-500 hover:bg-white dark:hover:bg-slate-900 transition-all cursor-pointer shadow-sm active:scale-90"
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  isFavorite
                    ? "fill-rose-500 text-rose-500"
                    : "text-slate-400 dark:text-slate-500"
                }`}
              />
            </button>
          )}
        </div>

        <div className="p-5">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
            <span className="font-medium">{book.author}</span>
            <div className="flex items-center gap-1 font-bold text-slate-800 dark:text-slate-200">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{book.rating}</span>
            </div>
          </div>

          <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2 line-clamp-1">
            {book.title}
          </h3>
        </div>
      </div>

      <div className="p-5 pt-0">
        <Link
          href={`/books/${book.id}`}
          className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5 shadow-sm block"
        >
          <span>عرض التفاصيل</span>
        </Link>
      </div>
    </div>
  );
}