import axios from '@/axios';

import { type BookInList } from '@/types/books';

type OrderResponse = {
  orderId: number;
  bookId: number;
  detail: string;
};

interface BookQueryParams {
  query: string | null;
  available: boolean;
  reservedByMe: boolean;
}

type OrderCancelResponse = {
  detail: string;
};

export const getBooks = async ({ query, available, reservedByMe }: BookQueryParams) => {
  let url = `/api/v1/books/`;
  if (query) {
    url += `?q=${query}`;
  } else if (available) {
    url += `?available`;
  } else if (reservedByMe) {
    url += `?reserved_by_me`;
  }

  return (await axios.get(url)).data as BookInList[];
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
