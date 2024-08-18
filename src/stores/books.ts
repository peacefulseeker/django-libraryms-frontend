import { ToastSeverity } from 'primevue/api';
import { defineStore } from 'pinia';

import type { BookInList, BookReserved } from '@/types/books';
import { getBooks } from '@/api/books';

interface State {
  items: BookInList[];
  available: BookInList[];
  reserved: BookReserved[];
  enqueued: BookEnqueued[];
}

const useBooks = defineStore('books', {
  state: (): State => {
    return {
      items: [],
      available: [],
      reserved: [],
      enqueued: [],
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

    setBooks(books: BookInList[]): void {
      this.items = books;
    },

    setAvailable(books: BookInList[]): void {
      this.available = books;
    },

    setMemberReserved(books: BookReserved[]): void {
      this.reserved = books;
    },

    async list(): BookInList[] {
      if (this.items.length > 0) {
        return this.items;
      }
      const books = await getBooks();
      this.setBooks(books);
      return this.items;
    },

    async listAvailable(): BookInList[] {
      const books = await getBooks({ available: true });
      this.setAvailable(books);
      return this.available;
    },

    async search(query: string): BookInList[] {
      const books = await getBooks({ query });
      this.setBooks(books);
      return this.items;
    },

    async listReservedByMember(): BookReserved[] {
      const books = await getBooks({ reservedByMe: true });
      this.setMemberReserved(books);
      return this.reserved;
    },
  },
});
export default useBooks;
