export interface Book {
  id: number;
  title: string;
  author: {
    firstName: string;
    lastName: string;
  };
  publisher: {
    name: string;
  };
  publishedAt: number;
  language: string;
  isbn: string;
  pages: number;
}
