"use client";

import { BOOKS } from "@/data/books";
import Link from "next/link";
import { useState, useEffect } from "react";
import { BookOpen, RotateCcw, ArrowRight, BookMarked, ArrowLeft } from "lucide-react";

export default function MyBooksPage() {
  const [borrowedBooks, setBorrowedBooks] = useState<typeof BOOKS>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const storedIds: (string | number)[] = JSON.parse(
        localStorage.getItem("borrowedBooks") || "[]"
      );
      
      const filtered = BOOKS.filter((book) =>
        storedIds.some((id) => String(id) === String(book.id))
      );
      setBorrowedBooks(filtered);
    } catch (e) {
      console.error("خطأ في قراءة الكتب المستعارة:", e);
    }
  }, []);

  const handleReturnBook = (bookId: number | string) => {
    try {
      const storedIds: (string | number)[] = JSON.parse(
        localStorage.getItem("borrowedBooks") || "[]"
      );
      
      const updatedIds = storedIds.filter(
        (id) => String(id) !== String(bookId)
      );

      localStorage.setItem("borrowedBooks", JSON.stringify(updatedIds));
      setBorrowedBooks((prev) =>
        prev.filter((book) => String(book.id) !== String(bookId))
      );
    } catch (e) {
      console.error("خطأ في إرجاع الكتاب:", e);
    }
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen py-10 px-6 bg-slate-50/50 dark:bg-slate-950 text-right transition-colors duration-300" dir="rtl">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
              <BookMarked className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <span>كتبي المستعارة</span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              قائمة المراجع والكتب التي قمت بطلب استعارتها حالياً
            </p>
          </div>
          <span className="bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-900 text-xs font-bold px-3 py-1.5 rounded-lg">
            إجمالي المستعار: {borrowedBooks.length}
          </span>
        </div>

        {borrowedBooks.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center transition-colors shadow-sm">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              لا توجد كتب مستعارة حالياً
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 max-w-sm mx-auto leading-relaxed">
              لم تقم بطلب استعارة أي كتاب بعد. استكشف المكتبة واختر من بين عشرات المراجع المتاحة.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-slate-900 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all shadow-sm active:scale-95"
            >
              <span>تصفح المكتبة الآن</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {borrowedBooks.map((book) => (
              <div
                key={book.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 right-3 bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-sm text-white text-[10px] font-semibold px-2.5 py-1 rounded-md">
                      {book.category}
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1 line-clamp-1">
                      {book.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                      المؤلف: {book.author}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 flex flex-col gap-2">
                  <Link
                    href={`/books/${book.id}`}
                    className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>تفاصيل الكتاب</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleReturnBook(book.id)}
                    className="w-full py-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900 text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>إرجاع الكتاب</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}