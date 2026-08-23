"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BOOKS, Book } from "@/data/books";
import { 
  BookmarkCheck, 
  BookOpen, 
  RotateCcw, 
  Calendar, 
  ArrowLeft,
  User
} from "lucide-react";

export default function MyBooksPage() {
  const [borrowedBooks, setBorrowedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  // تحميل الكتب المستعارة من localStorage عند الفتح
  useEffect(() => {
    try {
      const storedIds = JSON.parse(localStorage.getItem("borrowedBooks") || "[]") as string[];
      // إذا كانت القائمة فارغة في أول مرة، يمكننا إدخال عينة تجريبية أو تركها كما هي
      const initialIds = storedIds.length > 0 ? storedIds : ["1", "3"]; 
      
      const filtered = BOOKS.filter((b) => initialIds.includes(b.id));
      setBorrowedBooks(filtered);
    } catch {
      setBorrowedBooks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // دالة إرجاع الكتاب
  const handleReturnBook = (id: string) => {
    const updatedBooks = borrowedBooks.filter((book) => book.id !== id);
    setBorrowedBooks(updatedBooks);

    // تحديث localStorage
    const updatedIds = updatedBooks.map((b) => b.id);
    localStorage.setItem("borrowedBooks", JSON.stringify(updatedIds));
  };

  if (loading) {
    return (
      <main className="min-h-screen p-6 md:p-8 bg-slate-50/50 dark:bg-slate-950 text-right" dir="rtl">
        <div className="max-w-5xl mx-auto animate-pulse space-y-4">
          <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-lg w-1/4"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-lg w-2/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-44 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
            <div className="h-44 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-6 md:p-8 bg-slate-50/50 dark:bg-slate-950 text-right transition-colors duration-300" dir="rtl">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold px-3 py-1 rounded-md mb-3">
              <BookmarkCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>سجل الاستعارات الشخصي</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              كتبي المستعارة
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
              إدارة المراجع المأخوذة حالياً ومتابعة فترة إرجاعها للمكتبة.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2.5 rounded-xl shadow-sm text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2 w-fit">
            <span>إجمالي المستعار:</span>
            <span className="bg-slate-900 dark:bg-blue-600 text-white px-2 py-0.5 rounded-md font-bold">
              {borrowedBooks.length}
            </span>
          </div>
        </div>

        {/* Content Section */}
        {borrowedBooks.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
            <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-xl flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-slate-900 dark:text-white font-bold text-base mb-1">
              لا توجد لديك أي كتب مستعارة حالياً
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs mb-6 max-w-sm mx-auto">
              يمكنك الاستفادة من آلاف المراجع المتاحة في الدليل الرئيسي وطلب استعارتها بضغطة زر.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-slate-900 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors shadow-sm"
            >
              <span>تصفح دليل الكتب</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {borrowedBooks.map((book) => (
              <div
                key={book.id}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition-all flex gap-4 items-start relative overflow-hidden group"
              >
                {/* Book Image */}
                <div className="relative w-24 h-36 shrink-0 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Book Info */}
                <div className="flex-1 flex flex-col justify-between h-36">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded-md">
                        {book.category}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] text-amber-600 dark:text-amber-400 font-bold bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-md border border-amber-200 dark:border-amber-800">
                        <Calendar className="w-3 h-3" />
                        متبقي 14 يوم
                      </span>
                    </div>

                    <Link href={`/books/${book.id}`}>
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        {book.title}
                      </h3>
                    </Link>

                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>{book.author}</span>
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <button
                      onClick={() => handleReturnBook(book.id)}
                      className="inline-flex items-center gap-1.5 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800/80 text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-900/60 transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>إرجاع الكتاب</span>
                    </button>

                    <Link
                      href={`/books/${book.id}`}
                      className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                      تفاصيل
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}