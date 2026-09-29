export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  rating: number;
  image: string;
  available: boolean;
  description?: string;
  pages?: number;
  publishedYear?: number;
}

export const BOOKS: Book[] = [
  {
    id: "1",
    title: "مقدمة في الذكاء الاصطناعي",
    author: "د. أحمد الخالد",
    category: "تكنولوجيا",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&auto=format&fit=crop",
    available: true,
    description: "كتاب شامل يشرح أساسيات الذكاء الاصطناعي وتعلم الآلة للمبتدئين والمتخصصين.",
    pages: 320,
    publishedYear: 2023,
  },
  {
    id: "2",
    title: "تصميم واجهات المستخدم الحديثة",
    author: "سارة العلي",
    category: "تصميم",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600&auto=format&fit=crop",
    available: false,
    description: "دليل عملي لتصميم واجهات مستخدم جذابة وتجارب مستخدم سلسة باستخدام أفضل الممارسات.",
    pages: 240,
    publishedYear: 2022,
  },
  {
    id: "3",
    title: "أساسيات برمجة الويب بـ Next.js",
    author: "مهندس محمد حسن",
    category: "تكنولوجيا",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop",
    available: true,
    description: "تعلم بناء تطبيقات وب كاملة وسريعة باستخدام إطار العمل Next.js و React.",
    pages: 410,
    publishedYear: 2024,
  },
  {
    id: "4",
    title: "قواعد البيانات والتصميم المعماري",
    author: "د. عمر الشامي",
    category: "تكنولوجيا",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=600&auto=format&fit=crop",
    available: true,
    description: "مرجع هام في تصميم قواعد البيانات العلاقاتية وغير العلاقاتية وتحسين الاستعلامات.",
    pages: 280,
    publishedYear: 2021,
  },
  {
    id: "5",
    title: "فن إدارة المشاريع البرمجية",
    author: "رائد السعيد",
    category: "إدارة",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop",
    available: false,
    description: "طرق وأساليب منهجية Agile و Scrum لتوجيه الفرق البرمجية بنجاح.",
    pages: 195,
    publishedYear: 2023,
  },
  {
    id: "6",
    title: "أمن المعلومات والأمن السبراني",
    author: "م. خالد منصور",
    category: "أمن معلومات",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600&auto=format&fit=crop",
    available: true,
    description: "دليل حماية الأنظمة والتطبيقات من الاختراقات والهجمات السبرانية الحديثة.",
    pages: 360,
    publishedYear: 2024,
  },
];