"use client";

import { useState } from "react";
import { Book } from "@/data/books";
import Link from "next/link";
import { Search, Star, ArrowLeft, CheckCircle2, XCircle, SlidersHorizontal } from "lucide-react";

interface BookCatalogProps {
  initialBooks: Book[];
}

export default function BookCatalog({ initialBooks }: BookCatalogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("الكل");

  const categories = ["الكل", ...Array.from(new Set(initialBooks.map((b) => b.category)))];

  const filteredBooks = initialBooks.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "الكل" || book.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <section>
      {/* Control Panel */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-center justify-between transition-colors">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="البحث باسم الكتاب أو الكاتب..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-10 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 text-sm transition-all"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <SlidersHorizontal className="w-4 h-4 text-slate-400 ml-2 hidden md:block" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-slate-900 dark:bg-blue-600 text-white shadow-sm"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid List */}
      {filteredBooks.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-12 text-center">
          <Search className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <p className="text-slate-700 dark:text-slate-300 font-semibold mb-1">لم يتم العثور على نتائج</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
            >
              <div>
                <div className="relative h-48 bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 right-3 bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1 rounded-md">
                    {book.category}
                  </span>
                  <span className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {book.rating}
                  </span>
                </div>

                <div className="p-5">
                  <h2 className="font-bold text-slate-900 dark:text-white text-base mb-1 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {book.title}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 font-medium">
                    المؤلف: {book.author}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {book.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-md ${
                      book.available
                        ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
                        : "bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800"
                    }`}
                  >
                    {book.available ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                    {book.available ? "متاح" : "غير متاح"}
                  </span>

                  <Link
                    href={`/books/${book.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold bg-slate-900 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-500 text-white px-3.5 py-2 rounded-lg transition-colors"
                  >
                    <span>التفاصيل</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}