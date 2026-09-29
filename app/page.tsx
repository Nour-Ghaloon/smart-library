import BookCatalog from "./components/BookCatalog";
import { BookOpen, Sparkles } from "lucide-react";
import { BOOKS } from "@/data/books";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50/50 dark:bg-slate-950 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {}
        <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 md:p-12 shadow-sm mb-6">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>نظام إدارة واستعارة الكتب الذكي</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-3 leading-tight">
              المكتبة الرقمية المركزية
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">
              ابحث في المراجع المتاحة، استعرض الأقسام التخصصية، وقدم طلبات الاستعارة بسهولة.
            </p>
          </div>

          <div className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 items-center gap-4 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-700/50">
            <div className="w-12 h-12 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                إجمالي المراجع المتاحة
              </p>
              <p className="text-xl font-bold text-slate-900 dark:text-white">
                أكثر من {BOOKS?.length || 0} مراجع علمية
              </p>
            </div>
          </div>
        </div>
        {}
        <BookCatalog />
      </div>
    </main>
  );
}