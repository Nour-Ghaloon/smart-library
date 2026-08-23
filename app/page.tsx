import { BOOKS } from "@/data/books";
import BookCatalog from "./components/BookCatalog";
import { Sparkles, Library } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen pb-20 bg-slate-50/50 text-right" dir="rtl">
      {/* Hero Header */}
      <section className="bg-white border-b border-slate-200/80 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold px-3 py-1 rounded-md mb-4">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>نظام إدارة واستعارة الكتب الذكي</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
              منصة المكتبة الرقمية المركزية
            </h1>
            <p className="text-slate-600 text-sm leading-relaxed font-normal">
              ابحث في المراجع المتاحة، استعرض الأقسام التخصصية، وقدم طلبات الاستعارة بسهولة وبشكل متكامل.
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-4 bg-slate-50 border border-slate-200 p-4 rounded-xl text-xs font-medium text-slate-600">
            <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
              <Library className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-sm">أكثر من {BOOKS.length} مراجع علمية</div>
              <div className="text-slate-500">متاحة للاطلاع والاستعارة الفورية</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog View */}
      <div className="max-w-7xl mx-auto px-6 mt-8">
        <BookCatalog initialBooks={BOOKS} />
      </div>
    </main>
  );
}