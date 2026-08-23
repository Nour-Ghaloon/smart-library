export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  available: boolean;
  rating: number;
  image: string;
}

export const BOOKS: Book[] = [
  {
    id: "1",
    title: "مقدمة في الذكاء الاصطناعي",
    author: "د. أحمد الخالد",
    category: "تكنولوجيا",
    description: "دليل شامل لفهم أساسيات الذكاء الاصطناعي وتعلم الآلة.",
    available: true,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&q=80",
  },
  {
    id: "2",
    title: "أصول البرمجة الكائنية",
    author: "مهندس سارّة العلي",
    category: "برمجة",
    description: "تعلم مفاهيم الـ OOP وتطبيقها لبناء أنظمة برمجية قوية.",
    available: false,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&q=80",
  },
  {
    id: "3",
    title: "تصميم واجهات المستخدم الحديثة",
    author: "محمد الزهراني",
    category: "تصميم",
    description: "قواعد وأساسيات اختيار الألوان، الخطوط، وتجربة المستخدم.",
    available: true,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=500&q=80",
  },
];