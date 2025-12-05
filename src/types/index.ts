export interface Book {
  id: string;
  slug: string;
  title: string;
  price: number;
  description: string;
  longDescription: string;
  authorNote?: string;
  author: string;
  authorSlug: string;
  category: string;
  tags: string[];
  inStock: boolean;
  image: string;
}

export interface CartItem {
  book: Book;
  quantity: number;
}

export interface Author {
  id: string;
  slug: string;
  name: string;
  bio: string;
  image?: string;
}
