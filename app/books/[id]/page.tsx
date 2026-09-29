"use client";

import { BOOKS } from "@/data/books";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { 
  ArrowRight, 
  Star, 
  User, 
  BookOpen, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  RotateCcw
} from "lucide-react";
import AddReviewForm from "@/app/components/AddReviewForm";

export default function BookDetailPage() {
  const params = useParams();
  const rawId = params?.id;
  const bookId = Array.isArray(rawId) ? rawId[0] : rawId;

  const book = BOOKS.find((b) => String(b.id) === String(bookId));
  
  const [borrowed, setBorrowed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!bookId) return;

    try {
      const stored = JSON.parse(localStorage.getItem("borrowedBooks") || "[]");
      const isAlreadyBorrowed = stored.some((id: string | number) => String(id) === String(bookId));
      
      if (isAlreadyBorrowed) {
        setBorrowed(true);
      }
    } catch (e) {
      console.error("خطأ في قراءة localStorage:", e);
    }
  }, [bookId]);

  if (!book) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-right p-6 bg-slate-50 dark:bg-slate-950 transition-colors" dir="rtl">
        <div className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-900 flex items-center justify-center mb-4">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">عذراً، الكتاب غير موجود!</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">قد يكون تم تغيير المسار أو إزالة الكتاب من القائمة.</p>
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 bg-slate-900 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-500 text-white font-semibold text-xs px-4 py-2.5 rounded-lg transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة للكتالوج الرئيسي</span>
        </Link>
      </div>
    );
  }

 // دالة الاستعارة
const handleBorrow = () => {
  try {
    const existing = JSON.parse(localStorage.getItem("borrowedBooks") || "[]");
    const stringId = String(book.id);

    if (!existing.map(String).includes(stringId)) {
      const updated = [...existing, book.id];
      localStorage.setItem("borrowedBooks", JSON.stringify(updated));
    }
    setBorrowed(true);
  } catch (e) {
    console.error("خطأ في حفظ الاستعارة:", e);
  }
};

// دالة إرجاع الكتاب مباشرة من صفحة التفاصيل
const handleReturn = () => {
  try {
    const existing: (string | number)[] = JSON.parse(
      localStorage.getItem("borrowedBooks") || "[]"
    );
    const updated = existing.filter((id) => String(id) !== String(book.id));
    localStorage.setItem("borrowedBooks", JSON.stringify(updated));
    setBorrowed(false);
  } catch (e) {
    console.error("خطأ في إرجاع الكتاب:", e);
  }
};

  return (
    <main className="min-h-screen py-10 px-6 bg-slate-50/50 dark:bg-slate-950 text-right transition-colors duration-300" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs font-semibold mb-6 transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة إلى دليل الكتب</span>
        </Link>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 md:p-8 mb-8 transition-colors">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

            <div className="md:col-span-5 relative rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-80 md:h-96 object-cover"
              />
              <span className="absolute top-3 right-3 bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-md shadow-sm">
                {book.category}
              </span>
            </div>

            <div className="md:col-span-7 flex flex-col justify-between h-full">
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight mb-2">
                  {book.title}
                </h1>

                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
                    <User className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                    <span>المؤلف: {book.author}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1 font-bold text-slate-900 dark:text-white">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>{book.rating}</span>
                    <span className="text-slate-400 dark:text-slate-500 font-normal">(تقييم القراء)</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                    نبذة عن المرجع
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    {book.description}
                  </p>
                </div>
              </div>

              {}
              <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                {mounted && borrowed ? (
  <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3">
    <div className="flex items-center gap-2">
      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
      <span className="text-xs font-bold">
        هذا الكتاب مستعار حالياً لديك!
      </span>
    </div>
    
    <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
      <Link
        href="/my-books"
        className="text-xs font-bold underline text-emerald-700 dark:text-emerald-400 hover:opacity-80 whitespace-nowrap"
      >
        عرض في كتبي
      </Link>
      
      <button
        type="button"
        onClick={handleReturn}
        className="bg-rose-100 hover:bg-rose-200 dark:bg-rose-900/50 dark:hover:bg-rose-900 text-rose-700 dark:text-rose-300 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>إرجاع الكتاب</span>
      </button>
    </div>
  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className="text-slate-500 dark:text-slate-400">حالة المرجع:</span>
                      <span className={`inline-flex items-center gap-1 font-bold ${
                        book.available 
                          ? "text-emerald-600 dark:text-emerald-400" 
                          : "text-rose-600 dark:text-rose-400"
                      }`}>
                        {book.available ? (
                          <>
                            <CheckCircle2 className="w-4 h-4" /> متاح حالياً للطلب
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4" /> مستعار حالياً
                          </>
                        )}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleBorrow}
                      disabled={!book.available}
                      className={`w-full py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
                        book.available
                          ? "bg-slate-900 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-500 text-white shadow-sm cursor-pointer active:scale-95"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 border border-slate-200 dark:border-slate-700 cursor-not-allowed"
                      }`}
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>{book.available ? "طلب استعارة الكتاب" : "غير متاح للاستعارة حالياً"}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 md:p-8 transition-colors">
          <AddReviewForm bookId={book.id} />
        </div>
      </div>
    </main>
  );
}