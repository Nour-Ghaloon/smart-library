"use client";

import { useState } from "react";
import { BOOKS } from "@/data/books";
import { Search } from "lucide-react";
import BookCard from "./BookCard";

export default function BookCatalog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("الكل");

  const categories = [
    "الكل",
    ...Array.from(
      new Set(
        (BOOKS || [])
          .map((b) => b?.category)
          .filter((cat): cat is string => Boolean(cat))
      )
    ),
  ];

  const filteredBooks = (BOOKS || []).filter((book) => {
    if (!book) return false;

    const matchesSearch =
      (book.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (book.author || "").toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "الكل" || book.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-8">
      {}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="ابحث باسم الكتاب أو المؤلف..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-10 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:border-blue-500 dark:focus:border-blue-500 transition-colors shadow-sm"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3.5" />
        </div>

        {}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-slate-900 dark:bg-blue-600 text-white shadow-sm"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {}
      {filteredBooks.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-sm text-slate-500 dark:text-slate-400 font-bold">
            لا توجد كتب تطابق بحثك حالياً.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) =>
            book && book.id ? <BookCard key={book.id} book={book} /> : null
          )}
        </div>
      )}
    </section>
  );
}