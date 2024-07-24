import axios from '@/axios';

import { type Book } from '@/types/Book';

type OrderResponse = {
  orderId: number;
  bookId: number;
  detail: string;
};

type OrderCancelResponse = {
  detail: string;
};

export const getBooks = async () => {
  const url = `/api/v1/books/`;

  return (await axios.get(url)).data as BlockMap;
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
