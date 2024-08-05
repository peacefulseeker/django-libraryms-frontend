import { ToastSeverity } from 'primevue/api';
import { defineStore } from 'pinia';

import type { Book } from '@/types/books';
import { getBooks, getBook, orderBook, cancelBookOrder } from '@/api/books';

export interface State {
  items: Book[];
  available: Book[];
  reserved: Book[];
  book: Book;

  reservedByAnyone: () => boolean;
  reservable: () => boolean;
  bookedByMember: () => boolean;
  queuable: () => boolean;
}

const useBooks = defineStore('books', {
  state: (): State => {
    return {
      items: [],
      available: [],
      reserved: [],
      book: {},
    };
  },

  getters: {
    reservedByAnyone(state: State) {
      return !state.book.isAvailable;
    },

    bookedByMember(state: State) {
      return state.book.isReservedByMember || state.book.isQueuedByMember || state.book.isIssuedToMember;
    },

    reservable(state: State) {
      return !state.book.isReservedByMember && !state.book.isQueuedByMember && !state.book.isIssuedToMember;
    },

    queuable(): boolean {
      return this.reservedByAnyone && this.reservable;
    }
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

    setBook(book: Book): void {
      this.book = book;
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

    async order(id: number): void {
      const { detail } = await orderBook(id);
      if (this.book.isReserved || this.book.isIssued) {
        this.book.isQueuedByMember = true;
      } else {
        this.book.isReserved = true;
        this.book.isReservedByMember = true;
      }
      this.book.isAvailable = false;
      this.addToast(detail);
    },

    async orderCancel(id: number): void {
      await cancelBookOrder(id);
      if (this.book.isReservedByMember) {
        this.book.isAvailable = true;
      }
      this.book.isReservedByMember = false;
      this.book.isIssuedToMember = false;
      this.book.maxReservationsReached = false;
      this.book.isQueuedByMember = false;
      this.addToast('Reservation cancelled', ToastSeverity.WARN);
    },

    async get(id: number): Book {
      if (this.book.id === id) {
        return this.book;
      }
      const book = await getBook(id);
      this.setBook(book);
      return this.book;
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
