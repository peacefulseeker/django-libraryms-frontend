<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { useRouter } from 'vue-router';

  import useBooks from '@/stores/books';
  import BookList from '@/components/BookList.vue';
  import Spinner from '@/components/Spinner.vue';
  import Banner from '@/components/HeroBanner.vue';

  const loading = ref(true);
  const hasReservations = ref(false);
  const books = useBooks();
  const router = useRouter();

  const fetchReservedBooks = async () => {
    await books.listReservedByMember();
    hasReservations.value = books.reserved.length > 0 || books.enqueued.length > 0;
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
      <div v-if="books.reserved.length" class="mb-20">
        <h2 class="mb-4 text-center">Reserved books</h2>
        <BookList :books="books.reserved" />
      </div>
      <div v-if="books.enqueued.length">
        <h2 class="mb-4 text-center">Enqueued books</h2>
        <BookList :books="books.enqueued" />
      </div>
    </div>
  </main>
</template>
