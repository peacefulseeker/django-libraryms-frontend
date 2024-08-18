import { ToastSeverity } from 'primevue/api';
import { defineStore } from 'pinia';
import type { ToastMessageOptions } from 'primevue/toast';

import { type Book } from '@/types/books';
import { getBook, orderBook, cancelBookOrder } from '@/api/books';

interface State {
  book: Book;
}

const useBook = defineStore('book', {
  state: (): State => {
    return {
      book: {} as Book,
    };
  },

  getters: {
    reservedByAnyone(state) {
      return !state.book.isAvailable;
    },

    bookedByMember(state) {
      return (
        state.book.isReservedByMember ||
        state.book.isEnqueuedByMember ||
        state.book.isIssuedToMember
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
    addToast(detail: string, severity = ToastSeverity.SUCCESS) {
      window.$toast.add({
        severity,
        detail: detail,
        life: 3000,
      } as ToastMessageOptions);
    },

    async order(id: number): Promise<void> {
      const { detail } = await orderBook(id);
      this.addToast(detail);
    },

    async orderCancel(id: number): Promise<void> {
      await cancelBookOrder(id);
      this.addToast('Reservation cancelled', 'warn' as 'warn');
    },

    async get(id: number | string) {
      this.book = await getBook(id);
      return this.book as Book;
    },
  },
});
export default useBook;
