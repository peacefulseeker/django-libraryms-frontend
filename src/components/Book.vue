<script setup lang="ts">
import type { Book } from '@/types/book';
import Card from 'primevue/card';
import { useRouter } from 'vue-router';

import useBooks from '@/stores/books';
import useAuth from '@/stores/auth';

defineProps<{
  book: Book;
}>();

const books = useBooks();
const auth = useAuth();
const router = useRouter();

const checkAuth = () => {
  if (auth.loggedOut) {
    router.push({ name: 'login', query: { redirect: router.currentRoute.value.fullPath } });
    return false;
  }
  return true;
};

const order = (bookId: int) => {
  if (checkAuth()) {
    books.order(bookId);
  }
};

const orderCancel = (bookId: int) => {
  if (checkAuth()) {
    books.orderCancel(bookId);
  }
};
</script>

<template>
  <ul>
    <li>{{ book.author.firstName }} {{ book.author.lastName }}</li>
    <li>
      <h3 class="bold mt-2 font-medium">{{ book.title }}</h3>
    </li>
    <li>Publisher: {{ book.publisher.name }}</li>
    <li>Published at: {{ book.publishedAt }}</li>
    <li>Pages: {{ book.pages }}</li>
    <li>Language: {{ book.language }}</li>
    <li>ISBN: {{ book.isbn }}</li>
    <li>Available: {{ book.isAvailable }}</li>
    <li v-if="book.isIssued">Term: {{ book.reservationTerm }}</li>
  </ul>
  <button
    v-if="books.bookReservable"
    :disabled="book.maxReservationsReached"
    @click="order(book.id)"
    class="transition-background-color mr-2 mt-2 rounded bg-primary-400 p-3 text-white enabled:hover:bg-primary-300 disabled:opacity-75">
    Reserve
  </button>
  <span v-if="book.maxReservationsReached && !books.reservedByMember" class="block text-xs"
    >Maximum reserations reached</span
  >
  <button
    v-if="books.reservedByMember"
    @click="orderCancel(book.id)"
    class="transition-background-color mt-2 rounded bg-red-400 p-3 text-white hover:bg-red-300">
    Cancel reservation
  </button>
  <br />
</template>

<style></style>
