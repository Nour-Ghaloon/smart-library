export default function Loading() {
  return (
    <div className="min-h-screen p-8 max-w-6xl mx-auto text-right" dir="rtl">
      <div className="h-8 bg-gray-200 rounded-lg w-1/3 mb-4 animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded-lg w-1/2 mb-8 animate-pulse"></div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm animate-pulse">
            <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  );
}