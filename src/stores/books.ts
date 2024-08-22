import { defineStore } from 'pinia';
import { ToastSeverity } from 'primevue/api';
import type { ToastMessageOptions } from 'primevue/toast';

import { getBooks } from '@/api/books';
import type { BookEnqueued, BookInList, BookReserved } from '@/types/books';

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

    setMemberEnqueued(books: BookEnqueued[]): void {
      this.enqueued = books;
    },

    async list(): Promise<BookInList[]> {
      if (this.items.length > 0) {
        return this.items;
      }
      const books = await getBooks();
      this.setBooks(books);
      return this.items;
    },

    async listAvailable(): Promise<BookInList[]> {
      const books = await getBooks({ available: true });
      this.setAvailable(books);
      return this.available;
    },

    async search(query: string): Promise<BookInList[]> {
      const books = await getBooks({ query });
      this.setBooks(books);
      return this.items;
    },

    async listReservedByMember(): Promise<void> {
      const books = await getBooks({ reservedByMe: true });
      this.setMemberReserved(books as BookReserved[]);
    },

    async listEnqueuedByMember(): Promise<void> {
      const books = await getBooks({ enqueuedByMe: true });
      this.setMemberEnqueued(books as BookEnqueued[]);
    },
  },
});
export default useBooks;
