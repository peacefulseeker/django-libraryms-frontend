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

    setMemberReserved(books: BookReserved[] | BookEnqueued[]): void {
      const reserved = [];
      const enqueued = [];
      for (const book of books) {
        if (book.reservationId) {
          reserved.push(book as BookReserved);
        } else {
          enqueued.push(book as BookEnqueued);
        }
      }

      this.reserved = reserved;
      this.enqueued = enqueued;
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
      this.setMemberReserved(books as BookReserved[] | BookEnqueued[]);
    },
  },
});
export default useBooks;
