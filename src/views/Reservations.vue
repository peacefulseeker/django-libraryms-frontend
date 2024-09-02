<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { useRouter } from 'vue-router';

  import BookList from '@/components/BookList.vue';
  import Banner from '@/components/HeroBanner.vue';
  import Spinner from '@/components/Spinner.vue';
  import useBook from '@/stores/book';
  import useBooks from '@/stores/books';

  const loading = ref(true);
  const hasReservations = ref(false);
  const extensionProcessing = ref(false);
  const books = useBooks();
  const router = useRouter();
  const book = useBook();

  const fetchReservedBooks = async () => {
    await books.listReservedByMember();
    await books.listEnqueuedByMember();
    hasReservations.value = books.reserved.length > 0 || books.enqueued.length > 0;
    loading.value = false;
  };
  watch(() => null, fetchReservedBooks, { immediate: true });

  const swapReservationExtendProcessing = () => {
    extensionProcessing.value = !extensionProcessing.value;
  };

  const onReservationExtend = async (bookId: number): Promise<void> => {
    try {
      swapReservationExtendProcessing();
      await book.extendReservation(bookId);
      await books.listReservedByMember();
    } finally {
      swapReservationExtendProcessing();
    }
  };

  const onReservationExtendCancel = async (bookId: number): Promise<void> => {
    try {
      swapReservationExtendProcessing();
      await book.cancelExtendReservation(bookId);
      await books.listReservedByMember();
    } finally {
      swapReservationExtendProcessing();
    }
  };
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
        <BookList
          :books="books.reserved"
          :onReservationExtend="onReservationExtend"
          :onReservationExtendCancel="onReservationExtendCancel"
          :extensionProcessing="extensionProcessing" />
      </div>
      <div v-if="books.enqueued.length">
        <h2 class="mb-4 text-center">Enqueued books</h2>
        <BookList :books="books.enqueued" />
      </div>
    </div>
  </main>
</template>
