import { ToastSeverity } from 'primevue/api';
import { defineStore } from 'pinia';

import type { Book } from '@/types/books';
import { getBooks } from '@/api/books';

interface State {
  items: Book[];
  available: Book[];
  reserved: BookReserved[];
}

const useBooks = defineStore('books', {
  state: (): State => {
    return {
      items: [],
      available: [],
      reserved: [],
    };
  },

  actions: {
    addToast(detail: string, severity: ToastSeverity = ToastSeverity.SUCCESS) {
      window.$toast.add({
        severity,
        detail: detail,
        life: 3000,
      });
    },

    setBooks(books: Book[]): void {
      this.items = books;
    },

    setAvailable(books: Book[]): void {
      this.available = books;
    },

    setMemberReserved(books: Book[]): void {
      this.reserved = books;
    },

    async list(): Book[] {
      if (this.items.length > 0) {
        return this.items;
      }
      const books = await getBooks();
      this.setBooks(books);
      return this.items;
    },

    async listAvailable(): Book[] {
      const books = await getBooks({ available: true });
      this.setAvailable(books);
      return this.available;
    },

    async search(query: string): Book[] {
      const books = await getBooks({ query });
      this.setBooks(books);
      return this.items;
    },

    async listReservedByMember(): Book[] {
      const books = await getBooks({ reservedByMe: true });
      this.setMemberReserved(books);
      return this.reserved;
    },
  },
});
export default useBooks;
