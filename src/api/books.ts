import axios from '@/axios';
import { type Book, type BookEnqueued, type BookInList, type BookReserved } from '@/types/books';

type OrderResponse = {
  orderId: number;
  bookId: number;
  detail: string;
};

export interface BookQueryParams {
  query?: string;
  available?: boolean;
  reservedByMe?: boolean;
  enqueuedByMe?: boolean;
}

type OrderCancelResponse = {
  detail: string;
};

type ReservationExtendResponse = {
  detail: string;
};

export const getBooks = async ({
  query,
  available,
  reservedByMe,
  enqueuedByMe,
}: BookQueryParams = {}) => {
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

  return (await axios.get(url)).data as BookInList[] | BookReserved[] | BookEnqueued[];
};

export const getBook = async (id: number) => {
  const url = `/api/v1/books/${id}/`;

  return (await axios.get(url)).data as Book;
};

export const orderBook = async (id: number) => {
  const url = `/api/v1/books/${id}/order/`;

  return (await axios.post(url)).data as OrderResponse;
};

export const cancelBookOrder = async (id: number) => {
  const url = `/api/v1/books/${id}/order/`;

  return (await axios.delete(url)).data as OrderCancelResponse;
};

export const extendReservation = async (id: number) => {
  const url = `/api/v1/books/${id}/extend/`;

  return (await axios.post(url)).data as ReservationExtendResponse;
};
