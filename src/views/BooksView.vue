<script setup lang="ts">
import useBooks from '@/stores/books';

const books = useBooks();
books.list();
</script>

<template>
  <h1>Available Books</h1>
  <ul class="flex flex-row gap-8">
    <li v-for="book in books.items" :key="book.id" class="border-gray px-1- rounded border p-5">
      <ul>
        <li>{{ book.author.firstName }} {{ book.author.lastName }}</li>
        <li>
          <h3 class="bold mt-2 font-medium">{{ book.title }}</h3>
        </li>
      </ul>
      <RouterLink
        class="link text-blue-300 hover:text-blue-400"
        :to="{ name: 'book', params: { id: book.id } }"
        >View</RouterLink
      >
    </li>
  </ul>
</template>
