<script setup lang="ts">
  import type { BookInList, BookReserved } from '@/types/books';
  import BookCover from './BookCover.vue';

  defineProps<{
    books: BookInList[] | BookReserved[];
    showTerm?: boolean;
    showReservationId?: boolean;
  }>();
</script>

<template>
  <ul
    class="justify-space-around m-auto flex flex-wrap max-md:justify-center md:w-2/3"
    style="gap: 20px">
    <li v-for="book in books" :key="book.id" class="book-item">
      <RouterLink class="w-full" :to="{ name: 'book', params: { id: book.id } }">
        <BookCover :imageSrc="book.coverImageUrl" />
        <h3 class="mt-2 font-semibold">{{ book.title }}</h3>
      </RouterLink>
      <span v-if="book.author">{{ book.author.lastName }}, {{ book.author.firstName }}</span>
      <div class="mt-2">
        <em v-if="showTerm && book.isIssued">
          <span>Issued until: {{ book.reservationTerm }}</span>
          <br />
        </em>
        <em v-if="showReservationId" class="text-sm font-semibold"
          >Reservation ID: {{ book.reservationId }}</em
        >
      </div>
    </li>
  </ul>
</template>

<style scoped>
  .book-item {
    width: 160px;

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
