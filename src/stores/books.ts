import { useToast } from 'primevue/usetoast';
import { ToastSeverity } from 'primevue/api';
import { defineStore } from 'pinia';
import type Toast from 'primevue/toast';
import router from '@/router';
import type { Book } from '@/types/Book';
import { getBooks, getBook, orderBook, cancelBookOrder } from '@/api/books';

interface State {
  items: Book[];
  book: Book;
  toast: Toast;
}

const useBooks = defineStore('books', {
  state: (): State => {
    return {
      toast: useToast(),
      items: [],
      book: {}
    };
  },

  getters: {
    reservedByMember(state: State) {
      return state.book.isReservedByMember || state.book.isIssuedToMember;
    },

    bookReservable(state: State) {
      return !state.reservedByMember;
    },
  },


  actions: {
    addToast(detail: string, severity: ToastSeverity = ToastSeverity.SUCCESS) {
      this.toast.add({
        severity,
        detail: detail,
        life: 3000,
      });
    },
    setBooks(books: any) {
      this.items = books;
    },

    setBook(book: Book) {
      this.book = book;
    },

    async list() {
      if (this.items.length > 0) {
        return this.items;
      }
      const books = await getBooks();
      this.setBooks(books);
      return this.items;
    },

    async order(id: number) {
      const { detail } = await orderBook(id);
      this.book.isReservedByMember = true;
      this.book.isAvailable = false;
      this.addToast(detail);
    },

    async orderCancel(id: number) {
      await cancelBookOrder(id);
      this.book.isReservedByMember = false;
      this.book.isIssuedToMember = false;
      this.book.maxReservationsReached = false;
      this.addToast("Order cancelled", ToastSeverity.WARN);
    },

    async get(id: number) {
      if (this.book.id === id) {
        return this.book;
      }
      const book = await getBook(id);
      this.setBook(book)
    },
  },
});
export default useBooks;
