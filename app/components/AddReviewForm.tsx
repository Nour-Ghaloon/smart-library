"use client";

import { useState } from "react";
import { 
  Star, 
  User, 
  MessageSquare, 
  Send, 
  Loader2, 
  CheckCircle2, 
  XCircle 
} from "lucide-react";

export default function AddReviewForm({ bookId }: { bookId: string }) {
  const [user, setUser] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId, user, comment, rating }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({ type: "success", message: "تم إرسال تقييمك بنجاح!" });
        setUser("");
        setComment("");
        setRating(5);
      } else {
        setStatus({ type: "error", message: data.message || "حدث خطأ أثناء إرسال التقييم" });
      }
    } catch {
      setStatus({ type: "error", message: "تعذر الاتصال بالسيرفر، يرجى المحاولة لاحقاً" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" dir="rtl">
      <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
        <MessageSquare className="w-5 h-5 text-slate-700 dark:text-slate-300" />
        <h3 className="font-bold text-base text-slate-900 dark:text-white">إضافة تقييم ومراجعة</h3>
      </div>

      {status && (
        <div
          className={`p-3.5 rounded-xl text-xs font-semibold flex items-center gap-2 border ${
            status.type === "success"
              ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300"
              : "bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300"
          }`}
        >
          {status.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          ) : (
            <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
          )}
          <span>{status.message}</span>
        </div>
      )}

      {/* Name Input */}
      <div>
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
          الاسم الكامل
        </label>
        <div className="relative">
          <input
            type="text"
            required
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="w-full pl-4 pr-9 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 dark:focus:ring-blue-500/20 focus:border-slate-900 dark:focus:border-blue-500 transition-all"
            placeholder="أدخل اسمك هنا..."
          />
          <User className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute right-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Interactive Star Rating Selector */}
      <div>
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
          تقييمك للمرجع
        </label>
        <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 rounded-lg w-fit">
          {[1, 2, 3, 4, 5].map((star) => {
            const isFilled = (hoveredRating !== null ? hoveredRating : rating) >= star;
            return (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(null)}
                className="p-1 transition-transform hover:scale-110 focus:outline-none"
              >
                <Star
                  className={`w-5 h-5 ${
                    isFilled
                      ? "fill-amber-400 text-amber-400"
                      : "text-slate-300 dark:text-slate-600 fill-slate-100 dark:fill-slate-700"
                  }`}
                />
              </button>
            );
          })}
          <span className="text-xs font-bold text-slate-600 dark:text-slate-400 mr-2">
            ({rating} من 5)
          </span>
        </div>
      </div>

      {/* Comment Input */}
      <div>
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
          التعليق والملاحظات
        </label>
        <textarea
          required
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 dark:focus:ring-blue-500/20 focus:border-slate-900 dark:focus:border-blue-500 transition-all leading-relaxed"
          placeholder="اكتب انطباعك أو مراجعتك المختصرة عن محتوى الكتاب..."
        ></textarea>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-slate-900 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold py-2.5 rounded-lg text-xs transition-colors flex items-center justify-center gap-2 shadow-sm disabled:bg-slate-300 dark:disabled:bg-slate-800 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>جاري إرسال التقييم...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>إرسال التقييم</span>
          </>
        )}
      </button>
    </form>
  );
}