import { defineStore } from 'pinia';
import { ToastSeverity } from 'primevue/api';
import type { ToastMessageOptions } from 'primevue/toast';

import {
  cancelBookOrder,
  cancelExtendReservation,
  extendReservation,
  getBook,
  orderBook,
} from '@/api/books';
import { type Book } from '@/types/books';

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
      this.addToast('Reservation cancelled', ToastSeverity.WARN);
    },

    async get(id: number): Promise<Book> {
      this.book = await getBook(id);
      return this.book;
    },

    async extendReservation(id: number): Promise<void> {
      const { detail } = await extendReservation(id);
      this.addToast(detail);
    },

    async cancelExtendReservation(id: number): Promise<void> {
      await cancelExtendReservation(id);
      this.addToast('Reservation extension cancelled', ToastSeverity.WARN);
    },
  },
});
export default useBook;
