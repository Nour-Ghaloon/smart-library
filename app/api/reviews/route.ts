import { NextResponse } from "next/server";

// مصفوفة مؤقتة لتخزين المراجعات في الذاكرة
let reviews: { bookId: string; user: string; comment: string; rating: number }[] = [
  {
    bookId: "1",
    user: "أحمد علي",
    comment: "كتاب رائع جداً وشرح ميسر لأفكار الذكاء الاصطناعي.",
    rating: 5,
  },
];

export async function GET() {
  return NextResponse.json({ success: true, data: reviews });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { bookId, user, comment, rating } = body;

    if (!bookId || !comment || !user) {
      return NextResponse.json(
        { success: false, message: "جميع الحقول مطلوبة" },
        { status: 400 }
      );
    }

    const newReview = { bookId, user, comment, rating: Number(rating) };
    reviews.push(newReview);

    return NextResponse.json(
      { success: true, message: "تمت إضافة التقييم بنجاح!", data: newReview },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "حدث خطأ في السيرفر" },
      { status: 500 }
    );
  }
}