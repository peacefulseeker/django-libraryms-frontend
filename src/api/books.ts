import axios from '@/axios';
import type { Book, BookEnqueued, BookInList, BookReserved } from '@/types/books';

export type OrderResponse = {
  orderId: number;
  bookId: number;
  detail: string;
};

export type ReservationExtendResponse = {
  detail: string;
};

export interface BookQueryParams {
  query?: string;
  available?: boolean;
  reservedByMe?: boolean;
  enqueuedByMe?: boolean;
}

export const getBooks = async ({
  query,
  available,
  reservedByMe,
  enqueuedByMe,
}: BookQueryParams = {}): Promise<BookInList[] | BookReserved[] | BookEnqueued[]> => {
  let url = `/api/v1/books/`;
  if (query) {
    url += `?q=${query}`;
  } else if (available) {
    url += `?available`;
  } else if (reservedByMe) {
    url += `?reserved_by_me`;
  } else if (enqueuedByMe) {
    url += `?enqueued_by_me`;
  }

  return (await axios.get(url)).data;
};

export const getBook = async (id: number): Promise<Book> => {
  const url = `/api/v1/books/${id}/`;

  return (await axios.get(url)).data;
};

export const orderBook = async (id: number): Promise<OrderResponse> => {
  const url = `/api/v1/books/${id}/order/`;

  return (await axios.post(url)).data;
};

export const cancelBookOrder = async (id: number): Promise<void> => {
  const url = `/api/v1/books/${id}/order/`;

  return (await axios.delete(url)).data;
};

export const extendReservation = async (id: number): Promise<ReservationExtendResponse> => {
  const url = `/api/v1/books/${id}/extend/`;

  return (await axios.post(url)).data;
};

export const cancelExtendReservation = async (id: number): Promise<ReservationExtendResponse> => {
  const url = `/api/v1/books/${id}/extend/`;

  return (await axios.delete(url)).data;
};
