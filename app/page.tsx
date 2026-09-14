import { BOOKS } from "@/data/books";
import BookCatalog from "./components/BookCatalog";
import { Sparkles, Library } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen pb-20 bg-slate-50/50 dark:bg-slate-950 text-right transition-colors duration-300" dir="rtl">
      <section className="bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold px-3 py-1 rounded-md mb-4">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>نظام إدارة واستعارة الكتب الذكي</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-3">
               المكتبة الرقمية المركزية
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              ابحث في المراجع المتاحة، استعرض الأقسام التخصصية، وقدم طلبات الاستعارة بسهولة.
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-4 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-300">
            <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/40 border border-blue-100 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
              <Library className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white text-sm">أكثر من {BOOKS.length} مراجع علمية</div>
              <div className="text-slate-500 dark:text-slate-400">متاحة للاطلاع والاستعارة الفورية</div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 mt-8">
        <BookCatalog initialBooks={BOOKS} />
      </div>
    </main>
  );
}