<script setup lang="ts">
import type { Book } from '@/types/Book';
import BookCover from './BookCover.vue';

defineProps<{ books: Book[] }>();
</script>

<template>
  <ul class="m-auto flex flex-wrap justify-center md:w-2/3" style="gap: 30px">
    <li v-for="book in books" :key="book.id" class="book-item">
      <RouterLink class="w-full" :to="{ name: 'book', params: { id: book.id } }">
        <BookCover :imageSrc="book.coverImageUrl" />
        <h3 class="mt-2 font-semibold">{{ book.title }}</h3>
      </RouterLink>
      <span v-if="book.author">{{ book.author.lastName }}, {{ book.author.firstName }}</span>
    </li>
  </ul>
</template>

<style scoped>
.book-item {
  width: 140px;

  &:hover .book-cover {
    &.no-cover {
      background-color: rgb(var(--primary-400));
    }

    &.has-cover {
      opacity: 0.8;
    }
  }
}
</style>
