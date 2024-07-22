import { defineStore } from 'pinia';
import { getBooks, getBook, orderBook, cancelBookOrder } from '@/api/books';
import type { Book } from '@/types/Book';

interface State {
  items: Book[];
}

const useBooks = defineStore('books', {
  state: (): State => {
    return {
      items: [],
    };
  },
  actions: {
    setBooks(books: any) {
      this.items = books;
    },

    async list() {
      if (this.items.length > 0) {
        return this.items;
      }
      const books = await getBooks();
      this.setBooks(books);
    },

    async order(id: number) {
      const { orderId, bookId, message } = await orderBook(id);
      console.log(message, orderId, bookId);
      return message;
    },

    async orderCancel(id: number) {
      const { message } = await cancelBookOrder(id);
      console.log('Order cancelled');
      return message;
    },

    async get(id: number) {
      const book = await getBook(id);
      return book;
    },
  },
});

export default useBooks;
