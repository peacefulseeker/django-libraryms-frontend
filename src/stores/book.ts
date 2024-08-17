import { ToastSeverity } from 'primevue/api';
import { defineStore } from 'pinia';

import type { Book } from '@/types/books';
import { getBook, orderBook, cancelBookOrder } from '@/api/books';

interface State {
  book: Book;

  reservedByAnyone: () => boolean;
  reservable: () => boolean;
  bookedByMember: () => boolean;
  queuable: () => boolean;
}

const useBook = defineStore('book', {
  state: (): State => {
    return {
      book: {},
    };
  },

  getters: {
    reservedByAnyone() {
      return !this.book.isAvailable;
    },

    bookedByMember() {
      return (
        this.book.isReservedByMember || this.book.isQueuedByMember || this.book.isIssuedToMember
      );
    },

    reservable(): boolean {
      return !this.bookedByMember;
    },

    queuable(): boolean {
      return this.reservedByAnyone && !this.bookedByMember;
    },
  },

  actions: {
    addToast(detail: string, severity: ToastSeverity = ToastSeverity.SUCCESS) {
      window.$toast.add({
        severity,
        detail: detail,
        life: 3000,
      });
    },

    async order(id: number): void {
      const { detail } = await orderBook(id);
      this.addToast(detail);
    },

    async orderCancel(id: number): void {
      await cancelBookOrder(id);
      this.addToast('Reservation cancelled', ToastSeverity.WARN);
    },

    async get(id: number): Book {
      this.book = await getBook(id);
      return this.book;
    },
  },
});
export default useBook;
