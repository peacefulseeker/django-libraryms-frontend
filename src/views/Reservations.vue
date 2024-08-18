<script setup lang="ts">
  import { ref, watch } from 'vue';

  import useBooks from '@/stores/books';
  import BookList from '@/components/BookList.vue';
  import Spinner from '@/components/Spinner.vue';
  import Banner from '@/components/HeroBanner.vue';
  import { useRouter } from 'vue-router';
  import type { BookEnqueued, BookReserved } from '@/types/books';

  const loading = ref(true);
  const reservedBooks = ref<BookReserved[]>([]);
  const enqueuedBooks = ref<BookEnqueued[]>([]);
  const hasReservations = ref(false);
  const router = useRouter();

  const fetchReservedBooks = async () => {
    const allReservations = await useBooks().listReservedByMember();
    hasReservations.value = allReservations.length > 0;
    allReservations.forEach((book) => {
      if (book.reservationId) {
        reservedBooks.value.push(book as BookReserved);
      } else {
        enqueuedBooks.value.push(book as BookEnqueued);
      }
    });
    loading.value = false;
  };
  watch(() => null, fetchReservedBooks, { immediate: true });
</script>

<template>
  <Banner>
    <h1>Your reservations</h1>
  </Banner>
  <main>
    <Spinner v-if="loading" />
    <div v-else>
      <h2 v-if="!hasReservations">
        No reservations, check out books:
        <a href="" @click.prevent="router.push({ name: 'books' })" class="link">here</a>
      </h2>
      <div v-if="reservedBooks.length" class="mb-20">
        <h2 class="mb-4 text-center">Reserved books</h2>
        <BookList :books="reservedBooks" />
      </div>
      <div v-if="enqueuedBooks.length">
        <h2 class="mb-4 text-center">Enqueued books</h2>
        <BookList :books="enqueuedBooks" />
      </div>
    </div>
  </main>
</template>
