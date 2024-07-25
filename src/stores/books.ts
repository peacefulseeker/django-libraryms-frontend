import { useToast } from 'primevue/usetoast';
import { ToastSeverity } from 'primevue/api';
import { defineStore } from 'pinia';
import type Toast from 'primevue/toast';
import router from '@/router';
import type { Book } from '@/types/Book';
import { getBooks, getBook, orderBook, cancelBookOrder } from '@/api/books';

export interface State {
  items: Book[];
  available: Book[];
  reserved: Book[];
  book: Book;
  toast: Toast;
}

const useBooks = defineStore('books', {
  state: (): State => {
    return {
      toast: useToast(),
      items: [],
      available: [],
      reserved: [],
      book: {}
    };
  },

  getters: {
    reservedByMember(state: State) {
      return state.book.isReservedByMember || state.book.isIssuedToMember;
    },

    queuedByMember(state: State) {
      return state.book.isQueuedByMember;
    },

    bookReservable(state: State) {
      return !state.reservedByMember && !state.queuedByMember;
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

    setAvailable(books: any) {
      this.available = books;
    },

    setMemberReserved(books: any) {
      this.reserved = books;
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

    async listAvailable() {
      // if (this.available.length > 0) {
      //   return this.available;
      // }
      const books = await getBooks({available: true});
      this.setAvailable(books);
      return this.available;
    },

    async order(id: number) {
      const { detail } = await orderBook(id);
      if (this.book.isReserved || this.book.isIssued) {
        this.book.isQueuedByMember = true;
      } else {
        this.book.isReserved = true;
      }
      this.book.isReservedByMember = true;
      this.addToast(detail);
    },

    async orderCancel(id: number) {
      await cancelBookOrder(id);
      if (this.book.isReservedByMember) {
        this.book.isAvailable = true;
      }
      this.book.isReservedByMember = false;
      this.book.isIssuedToMember = false;
      this.book.maxReservationsReached = false;
      this.book.isQueuedByMember = false;
      this.addToast("Reservation cancelled", ToastSeverity.WARN);
    },

    async get(id: number) {
      if (this.book.id === id) {
        return this.book;
      }
      const book = await getBook(id);
      this.setBook(book)
      return this.book;
    },

    async search(query: string) {
      const books = await getBooks({query,});
      this.setBooks(books);
      return this.items;
    },

    async listReservedByMember() {
      const books = await getBooks({reservedByMe: true});
      this.setMemberReserved(books);
      return this.reserved;
    }
  },
});
export default useBooks;
