<script setup lang="ts">
import type { Book } from '@/types/book';
import useBooks from '@/stores/books';

const books = useBooks();

export interface Props {
  book: Book;
}

defineProps<Props>();
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
  </ul>
  <button
    @click="books.order(book.id)"
    class="mr-2 mt-2 rounded bg-sky-500 p-2 text-white hover:bg-sky-700">
    Order
  </button>
  <button
    @click="books.orderCancel(book.id)"
    class="mt-2 rounded bg-red-500 p-2 text-white hover:bg-red-700">
    Cancel Order
  </button>
  <br />
</template>

<style></style>
