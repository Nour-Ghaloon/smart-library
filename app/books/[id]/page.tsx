"use client";

import { BOOKS } from "@/data/books";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { 
  ArrowRight, 
  Star, 
  User, 
  BookOpen, 
  CheckCircle2, 
  XCircle, 
  AlertCircle 
} from "lucide-react";
import AddReviewForm from "@/app/components/AddReviewForm";

export default function BookDetailPage() {
  const params = useParams();
  const bookId = params.id;

  const book = BOOKS.find((b) => b.id === bookId);
  const [borrowed, setBorrowed] = useState(false);

  if (!book) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-right p-6" dir="rtl">
        <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">عذراً، الكتاب غير موجود!</h2>
        <p className="text-slate-500 text-sm mb-6">قد يكون تم تغيير المسار أو إزالة الكتاب من القائمة.</p>
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 bg-slate-900 hover:bg-blue-600 text-white font-semibold text-xs px-4 py-2.5 rounded-lg transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة للكتالوج الرئيسي</span>
        </Link>
      </div>
    );
  }

  const handleBorrow = () => {
    setBorrowed(true);
  };

  return (
    <main className="min-h-screen py-10 px-6 bg-slate-50/50 text-right" dir="rtl">
      <div className="max-w-4xl mx-auto">
        {/* Navigation Breadcrumb */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 text-xs font-semibold mb-6 transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة إلى دليل الكتب</span>
        </Link>

        {/* Main Card Container */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Book Image Cover */}
            <div className="md:col-span-5 relative rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-80 md:h-96 object-cover"
              />
              <span className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-md shadow-sm">
                {book.category}
              </span>
            </div>

            {/* Book Details Info */}
            <div className="md:col-span-7 flex flex-col justify-between h-full">
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight mb-2">
                  {book.title}
                </h1>

                <div className="flex items-center gap-4 text-xs text-slate-500 mb-6 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-1.5 font-medium text-slate-700">
                    <User className="w-4 h-4 text-slate-400" />
                    <span>المؤلف: {book.author}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1 font-bold text-slate-900">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>{book.rating}</span>
                    <span className="text-slate-400 font-normal">(تقييم القراء)</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    نبذة عن المرجع
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {book.description}
                  </p>
                </div>
              </div>

              {/* Status & Borrow Action Button */}
              <div className="pt-6 border-t border-slate-100">
                {borrowed ? (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span className="text-xs font-bold">
                      تم تقديم طلب استعارة هذا الكتاب بنجاح! سيتم التواصل معك لاستلامه.
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className="text-slate-500">حالة المرجع:</span>
                      <span className={`inline-flex items-center gap-1 font-bold ${book.available ? "text-emerald-600" : "text-rose-600"}`}>
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
                      onClick={handleBorrow}
                      disabled={!book.available}
                      className={`w-full py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
                        book.available
                          ? "bg-slate-900 hover:bg-blue-600 text-white shadow-sm"
                          : "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed"
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

        {/* Review Form Section */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
          <AddReviewForm bookId={book.id} />
        </div>
      </div>
    </main>
  );
}