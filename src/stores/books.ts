import { defineStore } from 'pinia';
import type { ToastMessageOptions } from 'primevue/toast';
import { ToastSeverity } from 'primevue/api';

import type { BookEnqueued, BookInList, BookReserved } from '@/types/books';
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
    addToast(detail: string, severity = ToastSeverity.SUCCESS) {
      window.$toast.add({
        severity,
        detail: detail,
        life: 3000,
      } as ToastMessageOptions);
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

    async list(): Promise<BookInList[]> {
      if (this.items.length > 0) {
        return this.items;
      }
      const books = await getBooks();
      this.setBooks(books);
      return this.items;
    },

    async listAvailable() {
      const books = await getBooks({ available: true });
      this.setAvailable(books);
      return this.available as BookInList[];
    },

    async search(query: string): Promise<BookInList[]> {
      const books = (await getBooks({ query })) as BookInList[];
      this.setBooks(books);
      return this.items;
    },

    async listReservedByMember(): Promise<BookReserved[]> {
      const books = (await getBooks({ reservedByMe: true })) as BookReserved[];
      this.setMemberReserved(books);
      return this.reserved;
    },
  },
});
export default useBooks;
