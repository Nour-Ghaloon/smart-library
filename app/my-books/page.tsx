"use client";

import { useState } from "react";
import Link from "next/link";
import { BOOKS } from "@/data/books";

export default function MyBooksPage() {
  // افترضنا هنا وجود كتابين تم استعارتهما مسبقاً للتجربة
  const [borrowedBooks, setBorrowedBooks] = useState(
    BOOKS.filter((b) => b.id === "1" || b.id === "3")
  );

  const handleReturnBook = (id: string) => {
    setBorrowedBooks(borrowedBooks.filter((book) => book.id !== id));
  };

  return (
    <main className="min-h-screen p-6 md:p-8 text-right" dir="rtl">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
             كتبي المستعارة
          </h1>
          <p className="text-gray-600 text-sm">
            إدارة الكتب المستعارة حالياً وتاريخ الاستعارة المتبقي.
          </p>
        </div>

        {/* Content */}
        {borrowedBooks.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
            <p className="text-gray-500 text-lg mb-4">
              لا توجد لديك أي كتب مستعارة حالياً.
            </p>
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition font-medium"
            >
              تصفح المكتبة واستعر كتاباً
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {borrowedBooks.map((book) => (
              <div
                key={book.id}
                className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm flex gap-4 items-center"
              >
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-24 h-32 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1">
                  <span className="text-xs bg-blue-100 text-blue-800 font-medium px-2 py-0.5 rounded">
                    {book.category}
                  </span>
                  <h3 className="font-bold text-lg text-gray-800 mt-2 mb-1">
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    الكاتب: {book.author}
                  </p>
                  
                  <button
                    onClick={() => handleReturnBook(book.id)}
                    className="bg-red-50 text-red-600 border border-red-200 text-xs px-3 py-1.5 rounded-lg hover:bg-red-100 transition font-medium"
                  >
                    إرجاع الكتاب
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