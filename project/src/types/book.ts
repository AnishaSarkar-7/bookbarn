export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  rating: number;
  reviews: number;
  description: string;
  coverUrl: string;
  publishedYear: number;
  isbn: string;
  pages: number;
  language: string;
  featured?: boolean;
}

export interface ReadingList {
  id: string;
  userId: string;
  books: Book[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: string;
  bookId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}